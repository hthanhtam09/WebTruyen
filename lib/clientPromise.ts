import { MongoClient } from "mongodb"

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}

const uri1 = process.env.MONGODB_URI;
const uri2 = process.env.MONGODB_URI_2;
const options = {}

let client1
let client2

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise1) {
    client1 = new MongoClient(uri1 as string, options);
    global._mongoClientPromise1 = client1.connect();
  }

  if (!global._mongoClientPromise2) {
    client2 = new MongoClient(uri2 as string, options);
    global._mongoClientPromise2 = client2.connect();
  }
} else {
  // In production mode, it's best to not use a global variable.
  client1 = new MongoClient(uri1 as string, options);
  client2 = new MongoClient(uri2 as string, options);
}

const clientPromise1 = client1 ? client1.connect() : global._mongoClientPromise1;
const clientPromise2 = client2 ? client2.connect() : global._mongoClientPromise2;

export { clientPromise1, clientPromise2 };