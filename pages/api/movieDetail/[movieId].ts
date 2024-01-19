import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/db';
import mongoClient from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).end();
    }

    await clientPromise;
    const { movieId } = req.query;

    if (movieId) {
      const movieDetailsCollection = (await mongoClient).collection('moviedetails');
      const movie = movieDetailsCollection.findOne({ 'movie._id': movieId });

      return res.status(200).json(movie);
    } else {
      return res.status(404).json({ error: 'Movie not found' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).end();
  }
}
