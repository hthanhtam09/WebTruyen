import React from 'react';

const Line = () => {
  return (
    <div className="w-[80vw] h-[1px] bg-white mx-auto relative">
      <img
        className="w-[50px] h-[50px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
        src="/images/sun-flower-icon.png"
        alt="icon"
      />
    </div>
  );
};

export default Line;
