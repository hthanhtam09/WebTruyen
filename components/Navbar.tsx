import { useCallback, useState } from 'react';
import { BsSearch, BsFacebook } from 'react-icons/bs';
import { TfiEmail } from 'react-icons/tfi';
import Link from 'next/link';
import { Tooltip, Typography } from '@material-tailwind/react';

import Search from './Search';
import NavbarItem from './NavbarItem';
import {
  convertToTitleCaseForDisplay,
  convertToTitleCaseForPath,
} from '@/utils/utils';
import Image from 'next/image';
import IconTheme from './IconTheme';

const Navbar: React.FC = () => {
  const navbarItemListData = ['Home', 'up_comming'];

  const [isShowSearch, setIsShowSearch] = useState<boolean>(false);

  const isOpenSearch = useCallback(() => {
    setIsShowSearch((prev) => !prev);
  }, []);

  const isOpenFacebook = useCallback(() => {
    window.location.href = 'https://www.facebook.com/hth9199';
  }, []);

  const isOpenEmail = useCallback(() => {
    window.location.href = 'mailto:hthanhtam0901@gmail.com';
  }, []);

  return (
    <nav className="w-full fixed z-40">
      <div className="h-[10vh] px-4 md:px-16 py-6 flex flex-row items-center dark:bg-themeDark bg-themeLight-secondary bg-opacity-90 transition duration-500">
        <Link href={'/'}>
          <img className="bg-cover" src="/images/logo.png" alt="Logo" width={100} height={100} />
        </Link>
        <div className="flex flex-row ml-auto gap-7 items-center justify-between w-[50%]">
          {/* <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            <Language />
          </div> */}
          <div className="flex-row ml-8 gap-12 hidden lg:flex">
            {navbarItemListData.map((item) => (
              <NavbarItem
                label={convertToTitleCaseForDisplay(item)}
                path={convertToTitleCaseForPath(item)}
                key={item}
              />
            ))}
          </div>
          <div className="flex items-center ml-8 gap-8 lg:flex">
            <div className="hover:text-gray-300 cursor-pointer transition" onClick={isOpenFacebook}>
              <BsFacebook />
            </div>
            <div className="hover:text-gray-300 cursor-pointer transition" onClick={isOpenEmail}>
              <TfiEmail />
            </div>
            <div className="hover:text-gray-300 cursor-pointer transition" onClick={isOpenSearch}>
              <BsSearch />
            </div>
            <div className="hover:text-gray-300 cursor-pointer transition">
              <IconTheme />
            </div>
            <Tooltip
              className="border border-blue-gray-50 bg-white px-4 py-2 shadow-xl shadow-black/10 z-[99999]"
              content={
                <Typography color="black">
                  Don&apos;t <span className="font-bold">touch</span> me !!!
                </Typography>
              }
            >
              <img
                src={'/images/gif/cat1.gif'}
                alt="GIF"
                width={100}
                height={100}
                className='cursor-not-allowed'
              />
            </Tooltip>
          </div>
        </div>
      </div>
      {isShowSearch && <Search isOpenSearch={isOpenSearch} />}
    </nav>
  );
};

export default Navbar;
