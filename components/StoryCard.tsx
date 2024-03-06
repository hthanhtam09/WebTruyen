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
    return (
      <div className="flex justify-center items-center border border-white rounded-md">
        {processLabels(data.statusLabels).map((label, index) => {
          return (
            <span
              key={index}
              className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
              style={getColor(label)}
            >
              {IconLabels(label)}
            </span>
          );
        })}
      </div>
    );
  }, []);

  return data ? (
    <div className="relative mt-4 sm:mt-6 md:mt-8 overflow-hidden">
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
          sm:h-[16vw]
          md:h-[14vw]
          hover:opacity-30
        "
      />
      {data.statusLabels.length > 0 ? renderLabels : null}
      <p className="dark:text-white text-themeDark py-2 sm:py-3 md:py-4 text-sm sm:text-base transition duration-500">
        {data.title}
      </p>
    </div>
  ) : null;
};

export default StoryCard;
