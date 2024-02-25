declare module globalThis {
    var _mongoClientStoriesPromise: Promise<MongoClient>
    var _mongoClientStoriesDetailPromise: Promise<MongoClient>
    var _mongoClientUserPromise: Promise<MongoClient>
    var _mongoClientCommentPromise: Promise<MongoClient>
    var _mongoClientViewCountPromise: Promise<MongoClient>
}