import React, { useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';
import { StoriesInterface } from '@/types';
import { getColor, processLabels } from '@/utils/utils';
import { IconLabels } from './IconLabels';

interface StoryCardProps {
  data: StoriesInterface;
  setMergeStoryData?: any;
  setPage?: any;
  isStoryDetail?: boolean;
}

const StoryCard: React.FC<StoryCardProps> = ({
  data,
  setMergeStoryData,
  setPage,
  isStoryDetail,
}) => {
  const router = useRouter();

  const redirectToStoryDetail = useCallback(
    (data: StoriesInterface) => {
      if (isStoryDetail) {
        setMergeStoryData([]);
        setPage(1);
      }
      router.push({
        pathname: `/storyDetail`,
        query: data.storySlug,
      });
    },
    [router],
  );

  const renderLabels = useMemo(() => {
    return processLabels(data.statusLabels).map((label, index) => {
      return (
        <span key={index} className="w-14 h-14" style={getColor(label)}>
          {IconLabels(label)}
        </span>
      );
    });
  }, []);

  return data ? (
    <div className="relative mt-10 overflow-hidden">
      <img
        onClick={() => redirectToStoryDetail(data)}
        src={data.imageUrl}
        alt={data.title}
        draggable={false}
        className="
          cursor-pointer
          object-cover
          transition
          duration
          shadow-xl
          rounded-md
          w-full
          h-[18vw]
          hover:opacity-30
        "
      />
      {data.statusLabels.length > 0 ? (
        <div className="absolute right-0 top-[15vw] left-0">
          <div className="bg-black bg-opacity-50 backdrop-blur-0 flex justify-center gap-4">
            {renderLabels}
          </div>
        </div>
      ) : null}
      <p className="dark:text-white text-themeDark py-4 text-sm transition duration-500">
        {data.title}
      </p>
    </div>
  ) : null;
};

export default StoryCard;
