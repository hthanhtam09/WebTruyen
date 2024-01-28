import Line from '@/components/Line';
import StoryAlbum from '@/components/StoryAlbum';
import { EGenreType } from '@/enum';
import useStories from '@/hooks/useStories';
import { StoriesInterface } from '@/types';

import React, { useMemo } from 'react';

const UpCommingScreen = () => {
  const { data: storiesData = [], isLoading } = useStories();

  return (
    <div className='py-20'>
      {/* <section className="h-[60vh]">
        <StoryAlbum
          title={'Movie Theaters'}
          storiesData={filterSingleData}
          isLoading={isLoading}
          itemsPerPage={6}
          isNavigate
        />
      </section>
      <Line />
      <section className="h-[60vh]">
        <StoryAlbum
          title={'Movie Horror'}
          storiesData={filterSingleData}
          isLoading={isLoading}
          itemsPerPage={6}
          isNavigate
        />
      </section> */}
    </div>
  );
};

export default UpCommingScreen;
