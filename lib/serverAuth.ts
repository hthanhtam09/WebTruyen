import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import mongoClient from "./db";

const serverAuth = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return {}
  if (!session?.user?.email) {
    throw new Error('Not signed in');
  }
  const usersCollection = (await mongoClient).collection('users');
  const currentUser = await usersCollection.findOne({ email: session.user.email})
  
  if (!currentUser) {
    throw new Error('Not signed in');
    
  }

  return { currentUser };
}

export default serverAuth;