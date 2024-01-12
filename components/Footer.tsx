import React from 'react';

const imageArray = [
  '/images/cartoon1.png',
  '/images/cartoon2.png',
  '/images/cartoon3.png',
  '/images/cartoon4.png',
]

const Footer = () => {
  const randomImage = Math.ceil(Math.random() * imageArray.length - 1);
  const imageFooter = imageArray[randomImage];

  return (
    <footer className="relative w-screen h-[20vh] dark:bg-black bg-themeLight-secondary bg-opacity-90 flex items-center justify-center transition duration-500">
       <img
        className={`absolute -top-14 left-[50%] translate-x-[-50%] translate-y-[-50%]  z-10`}
        style={{
          width: '280px',
          height: '250px'
        }}
        src={imageFooter}
        alt="cartoon1"
      />
      <img
        className={`absolute -top-2 left-[50%] translate-x-[-50%] translate-y-[-50%]`}
        style={{
          width: '400px',
          height: '200px'
        }}
        src={'/images/bg-cartoon.png'}
        alt="cartoon1"
      />
      
      <div className="w-[40%] h-[1px] bg-white absolute left-0 top-[50%]" />
      <img className="bg-cover" src="/images/logo.png" alt="Logo" width={100} height={100} />
      <div className="w-[40%] h-[1px] bg-white absolute right-0 top-[50%]" />
    </footer>
  );
};

export default Footer;
