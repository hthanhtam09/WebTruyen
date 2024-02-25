import React from 'react';
import { useRouter } from 'next/router';
import StoryAlbum from '@/components/StoryAlbum';

const StoryNameScreen = ({ isLoading = false }: any) => {
  const router = useRouter();
  const storiesData = router.query.stories && JSON.parse(router.query.stories as any);

  return (
    <div className="pt-[50px]">
      <StoryAlbum
        title={router.query.storyName as string}
        storiesData={storiesData}
        isLoading={isLoading}
        itemsPerPage={24}
        isPagination
      />
    </div>
  );
};

export default StoryNameScreen;
