// pages/api/setup.js
import axios from 'axios';
import cron from 'node-cron';
import { Movie } from '@/pages/api/Models/MovieModel';
import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/db';

let currentPage = 1;
const maxPages = 1000;

async function crawlAndStoreData(page: number) {
  const endpoint = `https://ophim1.com/danh-sach/phim-moi-cap-nhat?page=${page}`;

  try {
    const response = await axios.get(endpoint);
    console.log('response', response.data.items);
    if (response.status === 200) {
      const movies = response.data.items;
      for (const movie of movies) {
        try {
          const existingMovie = await Movie.findOne({ _id: movie._id });

          if (!existingMovie) {
            const newMovie = new Movie(movie);
            await newMovie.save();
          } else {
            console.log(`Bỏ qua: ${movie._id} - Movie already exists in the database`);
          }
        } catch (error: any) {
          console.error(`Error: ${error.message}`);
        }
      }
    } else {
      console.error('Error:', response.status);
    }
  } catch (error: any) {
    console.error('Error:', error.message);
  }
}

const cronJob = cron.schedule(
  '*/10 * * * * *',
  () => {
    console.log('cron job');
    if (currentPage > maxPages) {
      console.log('Đã đạt tới số trang tối đa. Dừng cron job.');
      cronJob.stop();
      return;
    }
    crawlAndStoreData(currentPage);
    console.log('currentPage', currentPage);
    currentPage++;
  },
  {
    scheduled: false,
  },
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectDB();
    cronJob.start();
    return res.status(200).send({ message: 'Cron job is working!!!' });
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}
