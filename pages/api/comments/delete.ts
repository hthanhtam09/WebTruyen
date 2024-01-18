import { NextApiRequest, NextApiResponse } from 'next';
import { Comment } from '@/pages/api/Models';
import connectDB from '@/lib/db';
import mongoose from 'mongoose';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req;
  await connectDB();
  if (method !== 'POST') return res.status(400).json({ error: 'Method not allowed' });

  try {
    const { id } = body;
  
    if (!mongoose.Types.ObjectId.isValid(id as string)) {
      return res.status(400).json({ error: 'Invalid ObjectId' });
    }

    const deletedComment = await Comment.findByIdAndDelete(id);

    if (!deletedComment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    res.status(200).json(deletedComment);
  } catch (error) {
    res.status(400).json({ error: 'Error deleting comment' });
  }
}
