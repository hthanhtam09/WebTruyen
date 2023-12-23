import axios from 'axios';

const poster = (data: any, url?: string) =>
  axios
    .post(url as string, data)
    .then((response) => {
      console.log('POST SUCCESS', response);
    })
    .catch((error: any) => {
      console.error('Error POST: ', error);
    });

export default poster;
