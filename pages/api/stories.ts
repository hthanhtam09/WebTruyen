import { NextApiRequest, NextApiResponse } from "next";
import mongoClient from "@/lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).end();
    }
    const storiesCollection = (await mongoClient).collection('stories')
    const stories = await storiesCollection.find({}).toArray();

    return res.status(200).json(stories);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}

