import { NextApiRequest, NextApiResponse } from 'next';
import { storiesClient, storiesDetailClient } from '@/lib/db';
import * as cheerio from 'cheerio';
import puppeteer, { Browser, Page } from 'puppeteer';

const uri = 'https://truyenfull.vn/danh-sach/truyen-moi';

async function processChapterURL(page: Page, detailsUrl: string, storiesDetailCollection: any) {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--disable-features=site-per-process'],
  });
  const chapterContents = [];
  let description = '';
  const genres: (string | undefined)[] = [];
  let imageUrl: string = '';
  let currentPage = 1;
  let status: string = '';

  while (true) {
    await page.goto(`${detailsUrl}trang-${currentPage}`, {
      waitUntil: 'domcontentloaded',
      timeout: 0,
    });
    const $ = cheerio.load(await page.content());
    description = $('.desc-text').text();
    imageUrl = $('.book').find('img').attr('src') as string;
    status = $('.info').find('div:last-child .text-success').text();
    $('.info')
      .find('a')
      .each((_, genreElement) => {
        const genreValue = $(genreElement).attr('title');
        genres.push(genreValue);
      });

    for (const element of $('.list-chapter li a').toArray()) {
      const chapterUrl = $(element).attr('href') as string;
      const chapterPage = await browser.newPage();
      await chapterPage.goto(chapterUrl, { waitUntil: 'domcontentloaded', timeout: 0 });
      const $details = cheerio.load(await chapterPage.content());

      const paragraphs = $details('.chapter-c').contents().text();
      const existingChapter = await storiesDetailCollection.findOne({
        chapterContents: paragraphs,
      });
      if (existingChapter) {
        console.log('Chapter already exists:', chapterUrl);
      } else {
        console.log('New chapter:', chapterUrl);
        chapterContents.push(paragraphs);
      }
      await chapterPage.close();
    }

    const hasNextPage = $('.pagination li.active + li:not(.active)').length > 0;
    const hasPageNav = $('.pagination li.active + li.page-nav').length > 0;
    if (!hasNextPage || hasPageNav) {
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
    imageUrl,
    status,
  };
}

async function scrapePage(page: Page, browser: Browser) {
  const $ = cheerio.load(await page.content());
  const statusLabels: string[] = [];

  const storiesCollection = (await storiesClient).collection('stories');
  const storiesDetailCollection = (await storiesDetailClient).collection('storiesDetail');

  for (const element of $('.list-truyen .row').toArray()) {
    const title = $(element).find('.truyen-title a').text();
    const chapterPage = await browser.newPage();
    const author = $(element).find('.author').text();
    $(element)
      .find('.label-title')
      .each((_, element) => {
        const classes = $(element).attr('class');
        if (classes) {
          const classList = classes.split(' ').filter((className) => className !== 'label-title');
          statusLabels.push(...classList);
        }
      });

    const detailsUrl = $(element).find('a').attr('href') as string;
    const storySlug = new URL(detailsUrl, uri).pathname.split('/')[1];
    const createdAt = new Date();
    const chapterStory = $(element).find('.text-info a').text();
    const { chapterContents, description, genres, imageUrl, status } = await processChapterURL(
      chapterPage,
      detailsUrl,
      storiesDetailCollection,
    );

    await chapterPage.close();

    storiesCollection.insertOne({
      title,
      author,
      imageUrl,
      storySlug,
      createdAt,
      chapterStory,
      statusLabels,
    });

    storiesDetailCollection.insertOne({
      title,
      author,
      imageUrl,
      chapterContents,
      description,
      genres,
      storySlug,
      status,
      createdAt,
    });
  }
}

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  try {
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--disable-features=site-per-process'],
    });
    const page = await browser.newPage();
    await page.setUserAgent(
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.88 Safari/537.36',
    );
    let currentPage = 3;
    while (true) {
      await page.goto(`${uri}/trang-${currentPage}`, {
        waitUntil: 'domcontentloaded',
        timeout: 0,
      });
      const $ = cheerio.load(await page.content());

      await scrapePage(page, browser);

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
    res.status(500).send({ error });
  }
}
