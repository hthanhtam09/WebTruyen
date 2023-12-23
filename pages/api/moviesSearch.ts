import { NextApiRequest, NextApiResponse } from "next";
import { Movie } from '@/pages/api/Models/MovieModel';
import connectDB from "@/lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log('req', req)
    console.log('res', res)
    // if (req.method !== 'POST') {
    //   return res.status(405).end(); 
    // }

    await connectDB();

    const movieName = req.query.keyword;
    console.log('movieName', movieName);

    if (!movieName || !Array.isArray(movieName)) {
      return res.status(400).json({ error: 'Invalid query parameters' });
    }

    const movies = await Movie.find({ name: { $in: movieName } });

    return res.status(200).json(movies);
  } catch (error) {
    console.error(error);
    return res.status(500).end();
  }
}
