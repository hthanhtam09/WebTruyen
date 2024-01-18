import { NextApiRequest, NextApiResponse } from 'next';
import { Comment } from '@/pages/api/Models';
import connectDB from '@/lib/db';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  await connectDB();

  switch (method) {
    case 'GET':
      try {
        const comments = await Comment.find();
        res.status(200).json(comments);
      } catch (error) {
        res.status(400).json({ error: 'Error fetching comments' });
      }
      break;
    default:
      res.status(405).json({ error: `Method ${method} not allowed` });
      break;
  }
}
