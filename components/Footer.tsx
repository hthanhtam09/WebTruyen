import React from 'react';

const Footer = () => {
  return (
    <footer className="relative w-screen h-[20vh] dark:bg-black bg-opacity-90 flex items-center justify-center">
      <div className="w-[40%] h-[1px] bg-white absolute left-0 top-[50%]" />
      <img className="bg-cover" src="/images/logo.png" alt="Logo" width={100} height={100} />
      <div className="w-[40%] h-[1px] bg-white absolute right-0 top-[50%]" />
    </footer>
  );
};

export default Footer;
