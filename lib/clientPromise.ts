import { MongoClient } from "mongodb"

const uriStories = process.env.MONGODB_URL_STORIES;
const uriUser = process.env.MONGODB_URL_USER;
const uriComment = process.env.MONGODB_URL_COMMENT;
const uriViewCount = process.env.MONGODB_URL_VIEWCOUNT;

const options = {}

let storiesClient
let userClient
let commentClient
let viewCountClient

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientStoriesPromise) {
    storiesClient = new MongoClient(uriStories as string, options);
    global._mongoClientStoriesPromise = storiesClient.connect();
  }

  if (!global._mongoClientUserPromise) {
    userClient = new MongoClient(uriUser as string, options);
    global._mongoClientUserPromise = userClient.connect();
  }

  if (!global._mongoClientCommentPromise) {
    commentClient = new MongoClient(uriComment as string, options);
    global._mongoClientCommentPromise = commentClient.connect();
  }

  if (!global._mongoClientViewCountPromise) {
    viewCountClient = new MongoClient(uriViewCount as string, options);
    global._mongoClientViewCountPromise = viewCountClient.connect();
  }
} else {
  // In production mode, it's best to not use a global variable.
  storiesClient = new MongoClient(uriStories as string, options);
  userClient = new MongoClient(uriUser as string, options);
  commentClient = new MongoClient(uriComment as string, options);
  viewCountClient = new MongoClient(uriViewCount as string, options);
}

const storiesClientPromise = storiesClient ? storiesClient.connect() : global._mongoClientStoriesPromise;
const userClientPromise = userClient ? userClient.connect() : global._mongoClientUserPromise;
const commentClientPromise = commentClient ? commentClient.connect() : global._mongoClientCommentPromise;
const viewCountClientPromise = viewCountClient ? viewCountClient.connect() : global._mongoClientViewCountPromise;

export { storiesClientPromise, userClientPromise, commentClientPromise, viewCountClientPromise };