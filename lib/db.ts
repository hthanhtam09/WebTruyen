import {
  commentClientPromise,
  storiesClientPromise,
  storiesDetailClientPromise,
  userClientPromise,
  viewCountClientPromise,
} from './clientPromise';

const storiesClient = storiesClientPromise.then((res) => res.db('stories'));
const storiesDetailClient = storiesDetailClientPromise.then((res) => res.db('storiesDetail'));
const userClient = userClientPromise.then((res) => res.db('user'));
const commentDetailClient = commentClientPromise.then((res) => res.db('comment'));
const viewcountDetailClient = viewCountClientPromise.then((res) => res.db('viewCount'));

export {
  storiesClient,
  storiesDetailClient,
  userClient,
  commentDetailClient,
  viewcountDetailClient,
};
