import React from 'react';

import { isEmpty } from 'lodash';
import MovieCard from './MovieCard';
import { MovieDetailInterface } from '@/types';

interface MovieListProps {
  data: MovieDetailInterface[];
  title?: string;
  style?: string;
  isMovieDetail?: boolean;
  posterDetailUrl?: string;
}

const MovieList: React.FC<MovieListProps> = ({ data, title, style, isMovieDetail, posterDetailUrl }) => {
  if (isEmpty(data)) {
    return null;
  }

  return (
    <div className={style}>
        {title ? <p className="dark:text-white text-themeDark text-2xl font-bold transition duration-500">{title}</p> : null}
        <div className='grid grid-cols-6 gap-x-6 '>
          {data.map((movie: any, index: number) => (
            <MovieCard key={index} index={index} data={movie} isMovieDetail={isMovieDetail} posterDetailUrl={posterDetailUrl}/>
          ))}
        </div>
    </div>
  );
};

export default MovieList;
