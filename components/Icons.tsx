import React, { PropsWithChildren } from 'react';

type Props = {
  children: React.ReactNode;
  onClick: () => void;
};

const Icons = ({ children, onClick }: PropsWithChildren<Props>) => {
  return (
    <div
      onClick={onClick}
      className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
    >
      {children}
    </div>
  );
};

export default Icons;
