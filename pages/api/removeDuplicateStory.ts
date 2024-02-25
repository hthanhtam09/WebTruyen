import { NextApiRequest, NextApiResponse } from 'next';
import { storiesClient } from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).end();
    }

    const storiesCollection = (await storiesClient).collection('stories');
    const distinctTitles = await storiesCollection.distinct('title');
    const deletedTitles = [];

    for (const title of distinctTitles) {
      const duplicateStories = await storiesCollection.find({ title }).toArray();
      for (let i = 1; i < duplicateStories.length; i++) {
        await storiesCollection.deleteOne({ _id: duplicateStories[i]._id });
        deletedTitles.push(title);
      }
    }
    return res.status(200).json({ deletedTitles });
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}
