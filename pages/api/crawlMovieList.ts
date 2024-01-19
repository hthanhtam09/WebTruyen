// pages/api/setup.js
import axios from 'axios';
import cron from 'node-cron';
import { NextApiRequest, NextApiResponse } from 'next';
import mongoClient from '@/lib/db';

let currentPage = 1;
const maxPages = 1044;

async function checkMovieData(slug: string): Promise<boolean> {
  const movieEndpoint = `https://ophim1.com/phim/${slug}`;

  try {
    const response = await axios.get(movieEndpoint);

    if (response.status === 200) {
      const movieData = response.data;

      if (
        movieData.movie.name !== '' &&
        movieData.movie.origin_name !== '' &&
        movieData.movie.content !== '' &&
        movieData.movie.type !== '' &&
        movieData.movie.thumb_url !== '' &&
        movieData.movie.trailer_url !== '' &&
        movieData.movie.time !== '' &&
        movieData.movie.episode_current !== '' &&
        movieData.movie.episode_total !== '' &&
        movieData.movie.quality !== '' &&
        movieData.movie.lang !== '' &&
        movieData.movie.slug !== '' &&
        movieData.movie.year !== undefined &&
        movieData.movie.poster_url !== '' &&
        movieData.episodes[0].server_name !== '' &&
        movieData.episodes[0].server_data.length > 0
      ) {
        return true;
      }
      return false;
    } else {
      return false;
    }
  } catch (error: any) {
    console.error(`Error fetching data for ${slug}: ${error.message}`);
    return false;
  }
}

async function crawlAndStoreData(page: number) {
  const endpoint = `https://ophim1.com/danh-sach/phim-moi-cap-nhat?page=${page}`;

  try {
    const response = await axios.get(endpoint);

    if (response.status === 200) {
      const movies = response.data.items;
      for (const movie of movies) {
        const slug = movie.slug;

        // Check movie data before processing
        const isValidMovie = await checkMovieData(slug);

        if (isValidMovie) {
          try {
            const moviesCollection = (await mongoClient).collection('movies')
            const existingMovie = await moviesCollection.findOne({
              _id:  movie._id
            });

            if (!existingMovie) {
              await moviesCollection.insertOne(movie);
              console.log('Movie Valid: ', movie._id);
            } else {
              console.log(`Bỏ qua: ${movie._id} - Movie already exists in the database`);
            }
          } catch (error: any) {
            console.error(`Error: ${error.message}`);
          }
        } else {
          console.log('Movie invalid');
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
  '*/2 * * * * *',
  () => {
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
    cronJob.start();
    return res.status(200).send({ message: 'Cron job is working!!!' });
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}
