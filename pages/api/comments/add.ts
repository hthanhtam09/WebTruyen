// pages/api/comments/add.js
import { NextApiRequest, NextApiResponse } from 'next';
import { Comment } from '@/pages/api/Models';
import connectDB from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req;
  await connectDB();
  if (method !== 'POST') return res.status(400).json({error: 'Method not allowed'});

  try {
    const { id, movieId, content, nameUser, userId, createdAt } = body;
    const comment = new Comment({ id ,movieId, content, nameUser, userId, createdAt });
    const savedComment = await comment.save();

    res.status(201).json(savedComment);

  } catch (error: any) {
     if (error.name === 'ValidationError') {
      return res.status(400).json({ error: 'Validation error', details: error.errors });
    } else {
      return res.status(400).json({ error: `Error adding comment: ${error.message}` });
    }
  }
}
