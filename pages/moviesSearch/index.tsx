import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Loading from '../loading';
import useMoviesData from '@/hooks/useMoviesData';
import useSearch from '@/hooks/useSearch';
import slugify from 'slugify';

const MoviesSearch = () => {
  const router = useRouter();
  const { data: moviesData = [], isLoading } = useMoviesData();
  const [moviesFilter, setMoviesFilter] = useState([]);

  useEffect(() => {
    (async () => {
      const normalizedKeyword = router.query.keyword
        ? slugify(router.query.keyword as string, { remove: /[-]/g, lower: true })
        : '';
      const resultFilter = moviesData.length > 0 && moviesData.filter((movie: any) => {
        const normalizedSlug = slugify(movie.slug, { remove: /[-]/g, lower: true });

        return normalizedSlug.includes(normalizedKeyword);
      });
      setMoviesFilter(resultFilter);
    })();
  }, [moviesData, router.query.keyword]);

  return isLoading ? (
    <div className="h-[100vh]">
      <Loading />
    </div>
  ) : (
    <div className="h-screen w-screen bg-black">
      <div className="pt-32 px-16">
        <div>
          <p className="text-white">Kết quả tìm kiếm: {router.query.keyword}</p>
        </div>
        {moviesFilter.length > 0
          ? moviesFilter.map((movie: any, index) => (
              <div key={index} className="bg-white">
                {movie.name}
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default MoviesSearch;
