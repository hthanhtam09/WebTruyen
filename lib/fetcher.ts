import axios from 'axios';

const fetcher = (url: string, method: string = 'GET', data?: any) =>
  axios({
    method,
    url,
    data,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.data)
    .catch((err) => console.error('fetch error', err));

export default fetcher;
