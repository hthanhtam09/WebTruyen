import clientPromise from './clientPromise';

const mongoClient = clientPromise.then((res) => res.db('truyenhaynhat'));

export default mongoClient;
