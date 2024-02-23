
import React, { useCallback } from 'react';
import { useRouter } from 'next/router';
import { StoriesInterface } from '@/types';

interface StoryCardProps {
  data: StoriesInterface
}

const StoryCard: React.FC<StoryCardProps> = ({ data}) => {
  const router = useRouter();

  const redirectToStoryDetail = useCallback(
    (data: StoriesInterface) =>
      router.push({
        pathname: `/storyDetail`,
        query: data.storySlug,
      }),
    [router],
  );

  return data ? (
    <div className="relative mt-10">
      <img
        onClick={() => redirectToStoryDetail(data)}
        src={
          data.imageUrl
        }
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
      <p className="dark:text-white text-themeDark py-4 text-sm transition duration-500">{data.title}</p>
    </div>
  ) : null;
};

export default StoryCard;
