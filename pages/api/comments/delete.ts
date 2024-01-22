import { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';
import mongoClient from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req;

  try {
    if (method !== 'POST') {
      return res.status(400).json({ error: 'Method not allowed' });
    }

    const { id } = body;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid ObjectId' });
    }

    const commentsCollection = (await mongoClient).collection('comments')
    const deletedComment = await commentsCollection.findOneAndDelete({
      _id: new ObjectId(id),
    });

    res.status(200).json(deletedComment);
  } catch (error) {
    console.error('Error:', error);
    res.status(400).json({ error: 'Error deleting comment' });
  }
}
