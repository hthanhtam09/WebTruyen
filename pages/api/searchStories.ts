import { NextApiRequest, NextApiResponse } from 'next';
import { storiesClient } from '@/lib/db';
import { INIT_STORIES } from '@/constants';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).end();
    }

    const { keyword } = req.query;

    const query = keyword ? { storySlug: { $regex: new RegExp(keyword as string, 'i') } } : {};
    const storiesCollection = (await storiesClient).collection('stories');
    const totalStories = await storiesCollection.countDocuments(query);
    const totalPages = Math.ceil(totalStories / INIT_STORIES);
    const stories = await storiesCollection.find(query).toArray();

    return res.status(200).json({ stories, totalPages });
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}
