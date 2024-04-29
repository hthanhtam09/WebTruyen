import { NextApiRequest, NextApiResponse } from 'next';
import { storiesClient } from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).end();
    }

    const storiesCollection = (await storiesClient).collection('stories');
    const storiesDetailCollection = (await storiesClient).collection('storiesDetail');

    const distinctTitles = await storiesCollection.distinct('title');
    const distinctTitlesDetail = await storiesCollection.distinct('title');
    const deletedTitles = [];
    const deletedTitlesDetail = [];

    for (const title of distinctTitles) {
      const duplicateStories = await storiesCollection.find({ title }).toArray();
      for (let i = 1; i < duplicateStories.length; i++) {
        await storiesCollection.deleteOne({ _id: duplicateStories[i]._id });
        deletedTitles.push(title);
      }
    }

    for (const title of distinctTitlesDetail) {
      const duplicateStoriesDetail = await storiesDetailCollection.find({ title }).toArray();
      for (let i = 1; i < duplicateStoriesDetail.length; i++) {
        await storiesDetailCollection.deleteOne({ _id: duplicateStoriesDetail[i]._id });
        deletedTitlesDetail.push(title);
      }
    }

    return res.status(200).json({ deletedTitles, deletedTitlesDetail });
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}
