// pages/api/comments/add.js
import { NextApiRequest, NextApiResponse } from 'next';
import { mongoClient2 } from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  try {
    if (method !== 'GET') return res.status(400).json({ error: 'Method not allowed' });
    const { storyId } = req.query;
    console.log('req.query', req.query)
    const chapterFollowCollection = (await mongoClient2).collection('chapterFollow');
    const chapterFollow = chapterFollowCollection.findOne({ storyId });

    res.status(201).json(chapterFollow);
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: 'Validation error', details: error.errors });
    } else {
      return res.status(400).json({ error: `Error adding comment: ${error.message}` });
    }
  }
}
