import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Loading from '../loading';
import useMoviesData from '@/hooks/useMoviesData';
import slugify from 'slugify';
import MovieList from '@/components/MovieList';

const MoviesSearch = () => {
  const router = useRouter();
  const { data: moviesData = [], isLoading } = useMoviesData();
  const [moviesFilter, setMoviesFilter] = useState([]);

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
    <div className="h-screen w-screen bg-black">
      <div className="pt-32 px-16">
        {!isLoading ? (
          moviesFilter.length > 0 ? (
            <div className="flex-col px-4 md:px-16 py-6 flex items-start transition duration-500 bg-zinc-900 bg-opacity-90">
              <MovieList title={`Kết quả tìm kiếm: ${router.query.keyword}`} data={moviesFilter} style="mt-10 mb-20" />
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
    </div>
  );
};

export default MoviesSearch;
