import React from 'react';
import { PlayIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/router';

interface WatchButtonProps {
  path: string;
  text?: string;
  query?: string;
  style?: string;
}

const WatchButton: React.FC<WatchButtonProps> = ({ path, text, query, style }) => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push({ pathname: `${path}`, query })}
      className={` bg-white 
      rounded-md 
      py-1 md:py-2 
      px-2 md:px-4
      w-auto 
      text-xs lg:text-lg 
      font-semibold
      flex
      flex-row
      items-center
      hover:bg-neutral-300
      transition ${style}
      `}
    >
      <PlayIcon className="w-4 md:w-7 text-black mr-1" />
      {text ? text : null}
    </button>
  );
};

export default WatchButton;
