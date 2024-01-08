import React from 'react';

const Footer = () => {
  return (
    <footer className="relative w-screen h-[20vh] dark:bg-black bg-opacity-90 flex items-center justify-center">
      <div className="w-[40%] h-[1px] bg-white absolute left-0 top-[50%]">
        <img
          className="w-[50px] h-[50px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
          src="/images/sun-flower-icon.png"
          alt="icon"
        />
      </div>
      <img className="bg-cover" src="/images/logo.png" alt="Logo" width={100} height={100} />
      <div className="w-[40%] h-[1px] bg-white absolute right-0 top-[50%]">
        <img
          className="w-[50px] h-[50px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
          src="/images/sun-flower-icon.png"
          alt="icon"
        />
      </div>
      <div className="absolute right-4 bottom-4">
         <span className='text-white'>Since 2023</span>
      </div>
    </footer>
  );
};

export default Footer;
