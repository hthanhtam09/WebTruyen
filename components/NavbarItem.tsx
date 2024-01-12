import Link from 'next/link';
import React from 'react';

interface NavbarItemProps {
  label: string;
}

const NavbarItem: React.FC<NavbarItemProps> = ({ label }) => {
  return (
    <Link
      href={label === 'Home' ? '/' : `/${label}`}
      className="dark:text-white text-themeDark cursor-pointer hover:text-gray-300 transition duration-500"
    >
      {label}
    </Link>
  );
};

export default NavbarItem;
