// api/countView.ts

import { mongoClient1 } from '@/lib/db';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const countViewCollection = (await mongoClient1).collection('countView');
      const { deviceName } = req.body;

      const existingCount = await countViewCollection.findOne();

      if (existingCount) {
        await countViewCollection.updateOne({}, { 
          $inc: { viewCount: 1 },
          $set: { deviceName }
        });
      } else {
        await countViewCollection.insertOne({ 
          viewCount: 1,
          deviceName
        });
      }

      const updatedCount = await countViewCollection.findOne();
      const viewCount = updatedCount?.viewCount || 0;

      res.status(200).json({ viewCount });
    } catch (error) {
      console.error('Error counting view:', error);
      res.status(500).json({ error: 'Error counting view' });
    }
  } else {
    res.status(404).end();
  }
}
