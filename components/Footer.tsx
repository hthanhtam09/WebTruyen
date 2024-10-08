import React from 'react';
import Logo from './Logo';
import { isMobile } from 'react-device-detect';
import { cn } from '@/lib/utils';

const imageArray = [
  '/images/cartoon1.png',
  '/images/cartoon2.png',
  '/images/cartoon3.png',
  '/images/cartoon4.png',
];

const Footer = () => {
  const randomImage = Math.ceil(Math.random() * imageArray.length - 1);
  const imageFooter = imageArray[randomImage];

  return (
    <footer className="relative w-screen h-[20vh] dark:bg-black bg-themeLight-secondary bg-opacity-90 flex items-center justify-center transition duration-500">
      <img
        className={cn(
          'absolute left-[50%] translate-x-[-50%] translate-y-[-50%] z-10',
          isMobile ? '-top-8 w-[180px] h-[150px]' : '-top-14 w-[280px] h-[250px]',
        )}
        src={imageFooter}
        alt="cartoon1"
      />
      <img
        className={cn(
          'absolute left-[50%] translate-x-[-50%] translate-y-[-50%]',
          isMobile ? 'top-2 w-[300px] h-[100px]' : '-top-2 w-[400px] h-[200px]',
        )}
        src={'/images/bg-cartoon.png'}
        alt="cartoon1"
      />

      <div
        className={cn(
          ' h-[1px] dark:bg-white bg-black absolute left-0 top-[50%]',
          isMobile ? 'w-[30%]' : 'w-[40%]',
        )}
      />
      <Logo />
      <div
        className={cn(
          ' h-[1px] dark:bg-white bg-black absolute right-0 top-[50%]',
          isMobile ? 'w-[30%]' : 'w-[40%]',
        )}
      />
    </footer>
  );
};

export default Footer;
