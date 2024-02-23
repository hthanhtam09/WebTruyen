import { NextApiRequest, NextApiResponse } from 'next';
import { mongoClient2 } from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).end();
    }
    const { storySlug } = req.query;
    const storiesCollection = (await mongoClient2).collection('storiesDetail');
    const story = await storiesCollection.findOne({ storySlug });
    return res.status(200).json(story);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}
