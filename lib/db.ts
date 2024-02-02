import { clientPromise1, clientPromise2 } from './clientPromise';

const mongoClient1 = clientPromise1.then((res) => res.db('WebTruyen'));
const mongoClient2 = clientPromise2.then((res) => res.db('WebTruyen2'));

export { mongoClient1, mongoClient2 };
