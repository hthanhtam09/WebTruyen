import React from 'react';
import { isEmpty } from 'lodash';
import StoryCard from './StoryCard';
import { StoriesInterface } from '@/types';
import { motion } from 'framer-motion';
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
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-x-6 ">
        {data.map((story, index: number) => (
          <motion.div
            initial={{ translateX: -100, opacity: 0 }}
            animate={{ translateX: 0, opacity: 1 }}
            transition={{
              type: 'spring',
              delay: index * 0.2,
              duration: 5,
            }}
            key={`${story._id}`}
          >
            <StoryCard data={story} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default StoriesList;
