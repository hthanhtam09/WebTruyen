import React from 'react';

interface LineProps {
  style?: string;
}

const Line = ({ style }: LineProps) => {
  return (
    <div className={`w-[80vw] h-[1px] dark:bg-themeLight bg-themeDark mx-auto relative transition duration-500 ${style}`}>
      <img
        className="w-[50px] h-[50px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
        src="/images/sun-flower-icon.png"
        alt="icon"
      />
    </div>
  );
};

export default Line;
