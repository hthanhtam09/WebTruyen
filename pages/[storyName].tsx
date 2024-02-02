import React from 'react';
import { useRouter } from 'next/router';
import StoryAlbum from '@/components/StoryAlbum';

const StoryNameScreen = ({ isLoading = false }: any) => {
  const router = useRouter();
  const storiesData = router.query.movies && JSON.parse(router.query.movies as any);

  return (
    <div className="pt-[50px]">
      <StoryAlbum
        title={router.query.title as string}
        storiesData={storiesData}
        isLoading={isLoading}
        itemsPerPage={24}
        isPagination
      />
    </div>
  );
};

export default StoryNameScreen;
