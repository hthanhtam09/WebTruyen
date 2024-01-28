import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import mongoClient from '@/lib/db';
import * as cheerio from 'cheerio';
import puppeteer from 'puppeteer';

const uri = 'https://truyenfull.vn';

async function getHTML(url: string) {
  const { data: html } = await axios.get(url);
  return html;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const html = await getHTML(uri);

    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    );

    const $ = cheerio.load(html);

    const storiesCollection = (await mongoClient).collection('stories');

    const storyPromises = [];

    for (const element of $('.index-intro > .item').toArray()) {
      const title = $(element).find('a .title h3').text();
      const existingStory = await storiesCollection.findOne({ title });

      if (!existingStory) {
        const image = $(element).find('a').find('img').attr('src');
        const detailsUrl = $(element).find('a').attr('href');
        const storySlug = new URL(detailsUrl as string, uri).pathname.split('/')[1];
        const createdAt = new Date();

        try {
          await page.goto(detailsUrl as string);
          await page.waitForSelector('.chapter_jump');
          await page.click('button.chapter_jump');

          await page.waitForSelector('select.chapter_jump option');

          const chapterUrls = await page.$$eval(
            'select.chapter_jump option',
            (options, storySlug, uri) => {
              return options.map((option) => {
                const value = option.getAttribute('value');
                return value ? `${uri}/${storySlug}/${value}/` : null;
              });
            },
            storySlug,
            uri,
          );

          // Instead of logging, you may want to collect the data into an array
          storyPromises.push({ title, image, detailsUrl, createdAt, chapterUrls, slug: storySlug });
          // await page.waitForNavigation({waitUntil: "domcontentloaded"});
        } catch (error) {
          console.error('Error during navigation:', error);
          // Handle errors as needed
        }

        // Introduce a 1-second delay before the next iteration
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } else {
        console.log('Story is already...')
      }
    }

    // Wait for all promises to resolve
    const stories = await Promise.all(storyPromises);

    // Instead of logging, you can use the 'stories' array for further processing or saving to the database
    console.log('All stories:', stories);
    storiesCollection.insertMany(stories);
    await browser.close()
    res.status(200).send({ message: 'Successfully' });
  } catch (error) {
    console.log(error);

    // Instead of returning a value, send an error response using res object
    res.status(500).end();
  }
}
