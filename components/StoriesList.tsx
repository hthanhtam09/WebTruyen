import React from 'react';
import { isEmpty } from 'lodash';
import StoryCard from './StoryCard';
import { StoriesInterface } from '@/types';

interface StoriesListProps {
  data: StoriesInterface[];
  title?: string;
  style?: string;
  isMovieDetail?: boolean;
  posterDetailUrl?: string;
}

const StoriesList: React.FC<StoriesListProps> = ({ data, title, style }) => {
  if (isEmpty(data)) {
    return null;
  }

  return (
    <div className={style}>
      {title && (
        <p className="dark:text-white text-themeDark text-2xl font-bold transition duration-500">
          {title}
        </p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-x-6 ">
        {data.map((story: any, index: number) => (
          <StoryCard key={index} data={story} />
        ))}
      </div>
    </div>
  );
};

export default StoriesList;
