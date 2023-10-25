import axios from 'axios';

const fetcher = (url: string) =>
  axios
    .get(url)
    .then((res) => res.data)
    .catch((err) => console.log('fetch error', err));

export default fetcher;
