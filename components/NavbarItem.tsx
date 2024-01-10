import Link from 'next/link';
import React from 'react';

interface NavbarItemProps {
  label: string;
}

const NavbarItem: React.FC<NavbarItemProps> = ({ label }) => {
  return (
    <Link
      href={label === 'Home' ? '/' : `/${label}`}
      className="text-white cursor-pointer hover:text-gray-300 transition"
    >
      {label}
    </Link>
  );
};

export default NavbarItem;
