import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Loading from '../loading';
import useMoviesData from '@/hooks/useMoviesData';
import slugify from 'slugify';
import MovieList from '@/components/MovieList';
import moviesJson from '@/movies.json';
import ReactPlayer from 'react-player';

const MoviesSearch = () => {
  const router = useRouter();
  const { data: moviesData = [], isLoading } = useMoviesData();
  const [moviesFilter, setMoviesFilter] = useState([]);
  const randomMoviesIndex = Math.floor(Math.random() * moviesJson.length);

  useEffect(() => {
    (async () => {
      const normalizedKeyword = router.query.keyword
        ? slugify(router.query.keyword as string, { remove: /[-]/g, lower: true })
        : '';
      const resultFilter =
        moviesData.length > 0 &&
        moviesData.filter((movie: any) => {
          const normalizedSlug = slugify(movie.slug, { remove: /[-]/g, lower: true });

          return normalizedSlug.includes(normalizedKeyword);
        });
      setMoviesFilter(resultFilter);
    })();
  }, [moviesData, router.query.keyword]);

  return (
    <div className="relative h-screen w-screen bg-black">
      <ReactPlayer
        className="absolute top-0 bottom-0 left-0 right-0 pointer-events-none w-full brightness-[60%] object-cover h-full"
        url={`${moviesJson[randomMoviesIndex].videoUrl}`}
        width="100%"
        height="100%"
        playing
        controls={false}
        muted
      />
      {!isLoading ? (
        moviesFilter.length > 0 ? (
          <div className="absolute top-32 px-4 md:px-16">
            <MovieList
              title={`Kết quả tìm kiếm: ${router.query.keyword}`}
              data={moviesFilter.slice(0, 12)}
              style="mt-10 mb-20"
            />
          </div>
        ) : (
          <div className="bg-white">
            <p>Không có kết quả</p>
          </div>
        )
      ) : (
        <div className="h-[100vh]">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default MoviesSearch;
