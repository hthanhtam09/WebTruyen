import Link from 'next/link';
import React, { ReactNode } from 'react';

interface NavbarItemProps {
  label: string;
  path: string;
}

const NavbarItem: React.FC<NavbarItemProps> = ({ label, path }) => {
  return (
    <Link
      href={path === 'TrangChủ' ? '/' : `/${path}`}
      className="dark:text-white text-themeDark cursor-pointer hover:text-gray-300 transition duration-500 text-lg"
    >
      {label}
    </Link>
  );
};

export default NavbarItem;
