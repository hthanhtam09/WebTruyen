import {
  commentClientPromise,
  storiesClientPromise,
  userClientPromise,
  viewCountClientPromise,
} from './clientPromise';

const storiesClient = storiesClientPromise.then((res) => res.db('stories'));
const userClient = userClientPromise.then((res) => res.db('user'));
const commentDetailClient = commentClientPromise.then((res) => res.db('comment'));
const viewcountDetailClient = viewCountClientPromise.then((res) => res.db('viewCount'));

export {
  storiesClient,
  userClient,
  commentDetailClient,
  viewcountDetailClient,
};
