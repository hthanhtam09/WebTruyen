import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/db';
import { MovieDetail } from '@/pages/api/Models';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).end();
    }

    await connectDB();
    const { movieId } = req.query;

    if (movieId) {
      const movie = await MovieDetail.findOne({ 'movie._id': movieId });

      return res.status(200).json(movie);
    } else {
      return res.status(404).json({ error: 'Movie not found' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).end();
  }
}
