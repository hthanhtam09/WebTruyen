import clientPromise from './clientPromise';

const mongoClient = clientPromise.then((res) => res.db('WebTruyen'));

export default mongoClient;
