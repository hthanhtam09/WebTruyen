import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import mongoClient from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).end();
    }

    const { email, name, password } = req.body;
    const usersCollection = (await mongoClient).collection('users')

    const existingUser = await usersCollection.findOne({ email });

    if (existingUser) {
      return res.status(422).json({ error: 'Email taken' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = {
      email,
      name,
      hashedPassword,
      image: '',
      emailVerified: new Date(),
    }
    await usersCollection.insertOne(newUser);
    return res.status(200).json(newUser);
  } catch (error: any) {
    return res.status(400).json({ error: `Something went wrong: ${error.message}` });
  }
}
