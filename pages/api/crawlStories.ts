import { NextApiRequest, NextApiResponse } from 'next';
import { storiesClient } from '@/lib/db';
import * as cheerio from 'cheerio';
import puppeteer, { Page } from 'puppeteer';
import pako from 'pako';
import { checkStoryOverLimit } from '@/utils/utils';

const imageArray = [
  '/images/ImageStories/image_1.jpg',
  '/images/ImageStories/image_2.jpg',
  '/images/ImageStories/image_3.jpg',
  '/images/ImageStories/image_4.jpg',
  '/images/ImageStories/image_5.jpg',
  '/images/ImageStories/image_6.jpg',
  '/images/ImageStories/image_7.jpg',
  '/images/ImageStories/image_8.jpg',
  '/images/ImageStories/image_9.jpg',
  '/images/ImageStories/image_10.jpg',
  '/images/ImageStories/image_11.jpg',
  '/images/ImageStories/image_12.jpg',
  '/images/ImageStories/image_13.jpg',
  '/images/ImageStories/image_14.jpg',
  '/images/ImageStories/image_15.jpg',
  '/images/ImageStories/image_16.jpg',
  '/images/ImageStories/image_17.jpg',
  '/images/ImageStories/image_18.jpg',
  '/images/ImageStories/image_19.jpg',
  '/images/ImageStories/image_20.jpg',
  '/images/ImageStories/image_21.jpg',
  '/images/ImageStories/image_22.jpg',
  '/images/ImageStories/image_23.jpg',
  '/images/ImageStories/image_24.jpg',
  '/images/ImageStories/image_25.jpg',
  '/images/ImageStories/image_26.jpg',
  '/images/ImageStories/image_27.jpg',
  '/images/ImageStories/image_28.jpg',
  '/images/ImageStories/image_29.jpg',
  '/images/ImageStories/image_30.jpg',
  '/images/ImageStories/image_31.jpg',
  '/images/ImageStories/image_32.jpg',
  '/images/ImageStories/image_33.jpg',
  '/images/ImageStories/image_34.jpg',
  '/images/ImageStories/image_35.jpg',
  '/images/ImageStories/image_36.jpg',
  '/images/ImageStories/image_37.jpg',
  '/images/ImageStories/image_38.jpg',
  '/images/ImageStories/image_39.jpg',
  '/images/ImageStories/image_40.jpeg',
  '/images/ImageStories/image_41.jpg',
  '/images/ImageStories/image_42.jpg',
  '/images/ImageStories/image_43.jpg',
  '/images/ImageStories/image_44.jpg',
  '/images/ImageStories/image_45.jpg',
  '/images/ImageStories/image_46.jpg',
  '/images/ImageStories/image_47.jpg',
  '/images/ImageStories/image_48.jpg',
  '/images/ImageStories/image_49.jpg',
  '/images/ImageStories/image_50.jpg',
];

const uri = 'https://truyenfull.vn/danh-sach/truyen-hot';

async function processChapterURL(page: Page, detailsUrl: string) {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: [
      '--disable-infobars',
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-gpu=False',
      '--enable-webgl',
      '--window-size=1600,900',
      '--start-maximized',
      '--disable-features=site-per-process'
    ],
    timeout: 30_000, // 10 seconds
    protocolTimeout: 20_000, // 20 seconds
  });
  const chapterPage = await browser.newPage();
  const chapterContents = [];
  let description: string = '';
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
    const randomImage = Math.ceil(Math.random() * imageArray.length - 1);
    const imageUrlRandom = imageArray[randomImage];
    imageUrl = imageUrlRandom;
    status = $('.info').find('div:last-child .text-success').text();
    $('.info')
      .find('a')
      .each((_, genreElement) => {
        const genreValue = $(genreElement).attr('title');
        genres.push(genreValue);
      });

    for (const element of $('.list-chapter li a').toArray()) {
      const chapterUrl = $(element).attr('href') as string;
      await chapterPage.goto(chapterUrl, { waitUntil: 'domcontentloaded', timeout: 0 });
      const $details = cheerio.load(await chapterPage.content());

      const paragraphs = $details('.chapter-c').contents().text();

      console.log('New chapter:', chapterUrl);
      chapterContents.push(paragraphs);
      await new Promise(resolve => setTimeout(resolve, 500));
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

  await chapterPage.close();

  return {
    chapterContents,
    description,
    genres,
    imageUrl,
    status,
  };
}

async function scrapePage(page: Page) {
  const $ = cheerio.load(await page.content());
  const statusLabels: string[] = [];

  const storiesCollection = (await storiesClient).collection('stories');
  const storiesDetailCollection = (await storiesClient).collection('storiesDetail');

  for (const element of $('.list-truyen .row').toArray()) {
    const title = $(element).find('.truyen-title a').text();
    const existingStories = await storiesCollection.findOne({
      title,
    });
    if (existingStories == null) {
      const chapterStory = $(element).find('.text-info a').text();
      // const checkStoryLimit = checkStoryOverLimit(chapterStory);
      // if (checkStoryLimit) {
        const author = $(element).find('.author').text();
        $(element)
          .find('.label-title')
          .each((_, element) => {
            const classes = $(element).attr('class');
            if (classes) {
              const classList = classes
                .split(' ')
                .filter((className) => className !== 'label-title');
              statusLabels.push(...classList);
            }
          });

        const detailsUrl = $(element).find('a').attr('href') as string;
        const storySlug = new URL(detailsUrl, uri).pathname.split('/')[1];
        const createdAt = new Date();
        const chapterBrowser = await puppeteer.launch({
          headless: 'new',
          args: [
            '--disable-infobars',
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-gpu=False',
            '--enable-webgl',
            '--window-size=1600,900',
            '--start-maximized',
            '--disable-features=site-per-process'
          ],
          timeout: 30_000, // 10 seconds
          protocolTimeout: 20_000, // 20 seconds
        });
        const chapterPage = await chapterBrowser.newPage();
        const { chapterContents, description, genres, imageUrl, status } = await processChapterURL(
          chapterPage,
          detailsUrl,
        );

        // compress data chapter contents
        const compressedChapterContents = pako.gzip(JSON.stringify(chapterContents), { level: 5 });
        const base64CompressedData = Buffer.from(compressedChapterContents).toString('base64');

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
          chapterContents: base64CompressedData,
          description,
          genres,
          storySlug,
          status,
          createdAt,
        });

        await chapterBrowser.close();
      } else {
        console.log('Story is over limit 1000!!!', title);
      }
    } 
  //   else {
  //     console.log('Story is existing!!!', title);
  //   }
  // }
}

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  _req.setMaxListeners(100);
  res.setMaxListeners(100);
  try {
    const browser = await puppeteer.launch({
      headless: 'new',
      args: [
        '--disable-infobars',
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-gpu=False',
        '--enable-webgl',
        '--window-size=1600,900',
        '--start-maximized',
        '--disable-features=site-per-process'
      ],
      timeout: 30_000, // 10 seconds
      protocolTimeout: 20_000, // 20 seconds
    });
 
    const page = await browser.newPage();
    await page.setUserAgent(
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.88 Safari/537.36',
    );
    
    let currentPage = 1;
    while (true) {
      await page.goto(`${uri}/trang-${currentPage}`, {
        waitUntil: 'domcontentloaded',
        timeout: 0,
      });
      const $ = cheerio.load(await page.content());

      await scrapePage(page);

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
