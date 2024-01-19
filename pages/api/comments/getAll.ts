import { NextApiRequest, NextApiResponse } from 'next';
import mongoClient from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  if (method !== 'GET') return res.status(400).json({ error: 'Method not allowed' });
  
  try {
    const commentsCollection = (await mongoClient).collection('comments');
    const comments = await commentsCollection.find({}).toArray();

    res.status(200).json(comments);
  } catch (error) {
    res.status(400).json({ error: 'Error fetching comments' });
  }
}
