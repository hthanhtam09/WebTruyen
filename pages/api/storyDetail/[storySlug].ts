import { NextApiRequest, NextApiResponse } from 'next';
import { storiesClient } from '@/lib/db';
import { INIT_CHAPTER } from '@/constants';
import pako from 'pako';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).end();
    }

    const { storySlug, page } = req.query;
    const storiesCollection = (await storiesClient).collection('storiesDetail');
    const skip = page ? +page * INIT_CHAPTER : 0;
    const story = await storiesCollection.aggregate([{ $match: { storySlug } }]).toArray();

    if (!story || story.length === 0) {
      return res.status(404).json({ error: 'Story not found' });
    }

    const storyDetail = story[0];

    const compressedData = Buffer.from(storyDetail.chapterContents, 'base64');
    const inflatedData = pako.inflate(compressedData, { to: 'string' });
    const chapterContents = JSON.parse(inflatedData);

    const startIdx = skip;
    const endIdx = Math.min(startIdx + INIT_CHAPTER, chapterContents.length);
    const paginatedContents = chapterContents.slice(startIdx, endIdx);
    storyDetail.chapterContents = paginatedContents;

    return res.status(200).json(storyDetail);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}
