import { NextApiRequest, NextApiResponse } from 'next';
import { storiesClient, storiesDetailClient } from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).end();
    }

    const storiesCollection = (await storiesClient).collection('stories');
    const storiesDetailCollection = (await storiesDetailClient).collection('storiesDetail');
    const deletedTitles = [];
    const title = ''

    await storiesCollection.deleteOne({ title });
    await storiesDetailCollection.deleteOne({ title });
    deletedTitles.push(title);


    return res.status(200).json({ deletedTitles });
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}
