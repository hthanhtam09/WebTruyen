import axios from 'axios';

const poster = (data: any, url?: string) =>
  axios
    .post(url as string, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      console.log('POST SUCCESS', response.data);
      return response.data; 
    })
    .catch((error) => {
      console.error('Error POST: ', error);
      throw error;
    });

export default poster;
