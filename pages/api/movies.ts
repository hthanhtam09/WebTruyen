import { NextApiRequest, NextApiResponse } from "next";
import { Movie } from '@/pages/api/Models/MovieModel';
import connectDB from "@/lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).end();
    }
    await connectDB()
    const movies = await Movie.find({});

    return res.status(200).json(movies);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}

