import { NextApiRequest, NextApiResponse } from 'next';
import { storiesDetailClient } from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).end();
    }
    const { storySlug } = req.query;
    const storiesCollection = (await storiesDetailClient).collection('storiesDetail');
    const story = await storiesCollection.findOne({ storySlug });
    return res.status(200).json(story);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}
