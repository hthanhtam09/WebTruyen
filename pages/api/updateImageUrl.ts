import { NextApiRequest, NextApiResponse } from 'next';
import { storiesClient, storiesDetailClient } from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const storiesCollection = (await storiesClient).collection('stories');
    const storiesDetailCollection = (await storiesDetailClient).collection('storiesDetail');

    const stories = await storiesCollection.find({}, { projection: { imageUrl: 1 } }).toArray();
    const storiesDetail = await storiesDetailCollection.find({}, { projection: { imageUrl: 1 } }).toArray();
    
    for (const story of stories) {
      if (story.imageUrl) {
        await storiesCollection.updateOne(
          { _id: story._id },
          { $set: { imageUrl: 'newImageUrl' } }
        );
      }
    }

    for (const storyDetail of storiesDetail) {
      if (storyDetail.imageUrl) {
        await storiesDetailCollection.updateOne(
          { _id: storyDetail._id },
          { $set: { imageUrl: 'newImageUrl' } }
        );
      }
    }

    res.status(200).json({ message: 'Database updated successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
