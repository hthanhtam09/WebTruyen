import { NextApiRequest, NextApiResponse } from 'next';
import { mongoClient1 } from '@/lib/db';
import * as cheerio from 'cheerio';
import puppeteer, { Browser, Page } from 'puppeteer';

const uri = 'https://truyenfull.vn/danh-sach/truyen-moi';

async function processChapterURL(page: Page, detailsUrl: string) {
  const browser = await puppeteer.launch({ headless: 'new' });
  const chapterContents = [];
  let description = '';
  const genres: (string | undefined)[] = [];
  let currentPage = 1;

  while (true) {
    await page.goto(`${detailsUrl}trang-${currentPage}`, {
      waitUntil: 'domcontentloaded',
      timeout: 0,
    });
    const $ = cheerio.load(await page.content());
    description = $('.desc-text').text();
    $('.info')
      .find('a')
      .each((_, genreElement) => {
        const genreValue = $(genreElement).attr('title');
        genres.push(genreValue);
      });

    for (const element of $('.list-chapter li a').toArray()) {
      const chapterUrl = $(element).attr('href') as string;
      console.log('chapterUrl', chapterUrl);
      const chapterPage = await browser.newPage();
      await chapterPage.goto(chapterUrl, { waitUntil: 'domcontentloaded', timeout: 0 });
      const $details = cheerio.load(await chapterPage.content());

      const paragraphs = $details('.chapter-c').contents().text();
      chapterContents.push(paragraphs);
      await chapterPage.close();
    }

    // Check if there is a next page
    const hasNextPage = $('.pagination li.active + li:not(.active)').length > 0;
    const hasPageNav = $('.pagination li.active + li.page-nav').length > 0;
    if (!hasNextPage || hasPageNav) {
      // If there is no 'active' class or no next page, break out of the loop
      console.log('break loop');
      break;
    } else {
      currentPage++;
    }
  }

  return {
    chapterContents,
    description,
    genres,
  };
}

async function scrapePage(page: Page, url: string, browser: Browser) {
  await page.goto(`${url}`, { waitUntil: 'domcontentloaded', timeout: 0 });
  const $ = cheerio.load(await page.content());

  const storiesCollection = (await mongoClient1).collection('stories');

  for (const element of $('.list-truyen .row').toArray()) {
    const title = $(element).find('.truyen-title a').text();
    const existingStory = await storiesCollection.findOne({ title });
    if (!existingStory) {
      const chapterPage = await browser.newPage();

      const author = $(element).find('.author').text();
      const imageUrl = $(element).find('.col-xs-3 div[data-classname="cover"]').attr('data-image');
      const detailsUrl = $(element).find('a').attr('href') as string;
      const storySlug = new URL(detailsUrl, uri).pathname.split('/')[1];
      const createdAt = new Date();
      const chapterStory = $(element).find('.text-info a').text();
      const { chapterContents, description, genres } = await processChapterURL(
        chapterPage,
        detailsUrl,
      );
      await chapterPage.close();

      storiesCollection.insertOne({
        title,
        author,
        imageUrl,
        storySlug,
        description,
        genres,
        createdAt,
        chapterStory,
        chapterContents,
      });
    } else {
      console.log('Story is have already...');
    }
  }
}

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  try {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    await page.setUserAgent(
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.88 Safari/537.36',
    );
    let currentPage = 3;
    while (true) {
      await page.goto(`${uri}trang-${currentPage}`, {
        waitUntil: 'domcontentloaded',
        timeout: 0,
      });
      const $ = cheerio.load(await page.content());

      await scrapePage(page, uri, browser);

      // Check if there is a next page
      const hasNextPage = $('.pagination li.active + li:not(.active)').length > 0;
      const hasPageNav = $('.pagination li.active + li:not(.active):has(.page-nav)').length > 0;

      if (!hasNextPage || hasPageNav) {
        // If there is no 'active' class or no next page, break out of the loop
        console.log('break loop');
        break;
      } else {
        currentPage++;
      }
    }

    await browser.close();
    res.status(200).send({ message: 'Successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}
