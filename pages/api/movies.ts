import { NextApiRequest, NextApiResponse } from "next";
import mongoClient from "@/lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).end();
    }
    const moviesCollection = (await mongoClient).collection('movies')
    const movies = await moviesCollection.find({}).toArray();

    return res.status(200).json(movies);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}

