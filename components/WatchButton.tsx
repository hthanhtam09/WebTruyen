import React from 'react';
import { BookOpenIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/router';

interface WatchButtonProps {
  redirectChapterDetail: () => void;
  text?: string;
}

const WatchButton: React.FC<WatchButtonProps> = ({ redirectChapterDetail, text }) => {
  const router = useRouter();
  return (
    <button
      onClick={redirectChapterDetail}
      className={` 
      border
      dark:border-white
      border-black
      rounded-md 
      w-40
      h-12
      p-4
      gap-2
      text-xs lg:text-lg 
      font-semibold
      flex
      flex-row
      items-center
      hover:opacity-70
      transition
      duration-500
      `}
    >
      <BookOpenIcon className="w-4 md:w-7 dark:text-white text-black mr-1" />
      {text ? <span className="dark:text-white text-black text-lg">{text}</span> : null}
    </button>
  );
};

export default WatchButton;
