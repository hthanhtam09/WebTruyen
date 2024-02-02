// pages/api/comments/add.js
import { NextApiRequest, NextApiResponse } from 'next';
import { clientPromise1 } from '@/lib/clientPromise';
import { mongoClient1 } from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req;
  await clientPromise1;
  if (method !== 'POST') return res.status(400).json({ error: 'Method not allowed' });

  try {
    const { movieId, content, nameUser, userId, createdAt } = body;
    const commentCollection = (await mongoClient1).collection('comments');
    const comment = commentCollection.insertOne({ movieId, content, nameUser, userId, createdAt });

    res.status(201).json(comment);
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: 'Validation error', details: error.errors });
    } else {
      return res.status(400).json({ error: `Error adding comment: ${error.message}` });
    }
  }
}
