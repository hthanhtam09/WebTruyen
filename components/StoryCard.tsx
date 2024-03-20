import React, { useCallback } from 'react';
import { useRouter } from 'next/router';
import { StoriesInterface } from '@/types';

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
        pathname: `/${data.storySlug}`,
      });
    },
    [router],
  );

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
    <span className='absolute top-[15%] left-1/2 opacity-30 pointer-events-none text-[8px] sm:text-base md:text-base lg:text-xl' style={{ transform: 'translate(-50%, -50%)', rotate: '-45deg' }}>webtruyen.io.vn</span>
    <p className="dark:text-white text-themeDark py-2 sm:py-3 md:py-4 text-sm sm:text-base transition duration-500">
      {data.title}
    </p>
  </div>
  
  
  ) : null;
};

export default StoryCard;
