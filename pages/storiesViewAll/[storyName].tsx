import React, { useCallback, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import useStories from '@/hooks/useStories';
import StoryAlbum from '@/components/StoryAlbum';
import { classifyStoriesByLabel } from '@/utils/utils';

const StoryNameScreen = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const { data = [], isLoading, fetchData } = useStories();
  const storiesData = data.stories
  const totalPages = data.totalPages
  const newStories = [...new Set(classifyStoriesByLabel(storiesData).new)]
  const hotStories = [...new Set(classifyStoriesByLabel(storiesData).hot)]
  const fullStories = [...new Set(classifyStoriesByLabel(storiesData).full)]

  const handlePaginationChange = useCallback(
    (_: React.ChangeEvent<unknown>, value: number) => {
      const action = value > page ? 'next' : 'previous';
      const newPage = action === 'next' ? page + 1 : page - 1;

      setPage(newPage);
      fetchData(newPage - 1) // because db return 0 so - 1 to exactly result
    },
    [page],
  );

  const getDataByStoryType = useCallback(() => {
    const { storyType } = router.query;
    switch (storyType) {
      case 'new':
        return newStories;
      case 'hot':
        return hotStories;
      case 'full':
        return fullStories;
      default:
        return [];
    }
  }, [router.query, newStories, hotStories, fullStories]);

  
  return (
    <div className="pt-[50px]">
      <StoryAlbum
        title={router.query.title as string}
        storiesData={getDataByStoryType()}
        isLoading={isLoading}
        isPagination
        totalPages={totalPages}
        handlePaginationChange={handlePaginationChange}
        page={page}
      />
    </div>
  );
};

export default StoryNameScreen;
