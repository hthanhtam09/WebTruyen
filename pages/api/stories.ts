import { NextApiRequest, NextApiResponse } from 'next';
import { storiesClient } from '@/lib/db';
import { INIT_STORIES } from '@/constants';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).end();
    }
    const { page } = req.query;
    const skip = page ? +page * INIT_STORIES : 0;

    const storiesCollection = (await storiesClient).collection('stories');
    const totalStories = await storiesCollection.countDocuments({});
    const totalPages = Math.ceil(totalStories / INIT_STORIES);
    const stories = await storiesCollection.find({}).skip(skip).limit(INIT_STORIES).toArray();

    return res.status(200).json({ stories, totalPages });
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}
