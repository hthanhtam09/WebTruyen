import useTrans from '@/hooks/useTrans';
import { capitalizeFirstLetter } from '@/utils/utils';
import React from 'react';

interface MobileMenuProps {
  visibile?: boolean;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ visibile }) => {
  const trans = useTrans();
  const navbarItemListData = [trans.home.home, trans.home.genre];

  if (!visibile) return null;
  return (
    <div className="bg-black w-56 absolute top-8 left-0 py-5 flex-col border-2 border-gray-800 flex">
      <div className="flex flex-col gap-4">
        {navbarItemListData.map((item) => (
          <div className="px-3 text-center text-white hover:underline" key={item}>
            {capitalizeFirstLetter(item)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileMenu;
