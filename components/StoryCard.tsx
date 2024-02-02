
import React, { useCallback } from 'react';
import { useRouter } from 'next/router';
import { StoriesInterface } from '@/types';

interface StoryCardProps {
  data: StoriesInterface
}

// {
//   _id: '65b21e1c5d4d464d4d793f06',
//   title: 'Tự Cẩm',
//   image: 
//     'https://lh3.googleusercontent.com/pw/AIL4fc-BV58s_mFbXosakwhGx7lqwtD4g9zQ7_TLjLkSvx5zejJ2hzpbr6oWKD8LPs0NLJCwZpdLy_Rr5e7aDX6Q0PCAruHj8V6oh7J8K7v5AxQKbdkvANhGuafTrUUsS8hNSeHjX3rHXUF4drVko4g2rWBq=w215-h322-s-no?authuser=0',
//   detailsUrl: 'https://truyenfull.vn/tu-cam-270192/chuong-1/',
//   createdAt: '2024-01-25T08:34:20.265Z',
//   chapterUrls: Array(1672) [
//     'https://truyenfull.vn/tu-cam-270192/chuong-1/', 'https://truyenfull.vn/tu-cam-270192/chuong-2/',
//     'https://truyenfull.vn/tu-cam-270192/chuong-3/', 'https://truyenfull.vn/tu-cam-270192/chuong-4/',
//   ]
// },

const StoryCard: React.FC<StoryCardProps> = ({ data}) => {
  const router = useRouter();

  const redirectToStoryDetail = useCallback(
    (data: StoriesInterface) =>
      router.push({
        pathname: `/storyDetail`,
        // query: data.slug,
      }),
    [router],
  );

  const redirectWatchMovie = useCallback((movie: any) => router.push(movie.link_embed), [router]);

  return data ? (
    <div className="relative mt-10">
      <img
        // onClick={() => (isMovieDetail ? redirectWatchMovie(data) : redirectToAlbum(data))}
        src={
          data.image
        }
        alt="Movie"
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
