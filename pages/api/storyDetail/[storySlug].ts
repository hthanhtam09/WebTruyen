import { NextApiRequest, NextApiResponse } from 'next';
import { storiesDetailClient } from '@/lib/db';
import { INIT_CHAPTER } from '@/constants';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).end();
    }

    const { storySlug, page } = req.query;
    const storiesCollection = (await storiesDetailClient).collection('storiesDetail');
    const skip = page ? +page * INIT_CHAPTER : 0;
    const story = await storiesCollection.aggregate([
      { $match: { storySlug } },
      {
        $addFields: {
          "chapterContents": { $slice: ["$chapterContents", skip, INIT_CHAPTER] }
        }
      }
    ]).toArray();

    return res.status(200).json(story[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}
