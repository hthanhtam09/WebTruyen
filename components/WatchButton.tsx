import React from 'react';
import { BookOpenIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/router';

interface WatchButtonProps {
  path: string;
  text?: string;
  query?: any;
  style?: string;
}

const WatchButton: React.FC<WatchButtonProps> = ({ path, text, query, style }) => {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        router.push({ pathname: `${path}`, query });
        localStorage.setItem('lastClickedChapter', '1');
      }}
      className={` 
      dark:bg-white
      bg-themeLight-secondary
      rounded-md 
      py-1 md:py-2 
      px-2 md:px-4
      w-auto 
      text-xs lg:text-lg 
      font-semibold
      flex
      flex-row
      items-center
      hover:opacity-70
      transition
      duration-500
      ${style}
      `}
    >
      <BookOpenIcon className="w-4 md:w-7 text-black mr-1" />
      {text ? <span className="text-black">{text}</span> : null}
    </button>
  );
};

export default WatchButton;
