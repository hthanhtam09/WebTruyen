import React from 'react';

interface IconProps {
    children: React.ReactNode
    onClick?: () => void
}

const Icon: React.FC<IconProps> = ({ onClick, children }) => {
  return (
    <div className="hover:text-gray-300 cursor-pointer transition" onClick={onClick}>
      {children}
    </div>
  );
};

export default Icon;