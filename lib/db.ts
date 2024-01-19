import clientPromise from './clientPromise';

const mongoClient = clientPromise.then((res) => res.db('Cineshin'));

export default mongoClient;
