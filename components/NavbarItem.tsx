import useTrans from '@/hooks/useTrans';
import { capitalizeFirstLetter } from '@/utils/utils';
import Link from 'next/link';
import React from 'react';

interface NavbarItemProps {
  label: string;
}

const NavbarItem: React.FC<NavbarItemProps> = ({ label }) => {
  return (
    <Link
      href={label === 'home' ? '/' : `/${label}`}
      className="text-white cursor-pointer hover:text-gray-300 transition"
    >
      {capitalizeFirstLetter(label)}
    </Link>
  );
};

export default NavbarItem;
