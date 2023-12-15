/* eslint-disable @next/next/no-img-element */
import { useCallback, useEffect, useState } from 'react';
import MobileMenu from './MobileMenu';
import NavbarItem from './NavbarItem';
import { BsChevronDown, BsSearch, BsBell } from 'react-icons/bs';
import AccountMenu from './AccountMenu';
import Image from 'next/image';
import Language from './Language';
import useTrans from '@/hooks/useTrans';
import Link from 'next/link';

const TOP_OFFSET = 66;

const Navbar = () => {
  const trans = useTrans();

  const navbarItemListData = [
    trans.home.home, 
    // trans.home.genre
  ];

  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showbBackground, setShowBackground] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= TOP_OFFSET) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu((prev) => !prev);
  }, []);

  const toggleAccountMenu = useCallback(() => {
    setShowAccountMenu((prev) => !prev);
  }, []);

  return (
    <nav className="w-full fixed z-40">
      <div
        className={`px-4 md:px-16 py-6 flex flex-row items-center transition duration-500 bg-zinc-900 bg-opacity-90 ${
          showbBackground ? 'bg-zinc-900 bg-opacity-90' : ''
        }`}
      >
        <Link href={'/'}>
          <Image className="bg-cover" src="/images/logo.png" alt="Logo" width={100} height={100} />
        </Link>
        <div className="flex-row ml-8 gap-7 hidden lg:flex">
          {navbarItemListData.map((item) => (
            <NavbarItem label={item} key={item} />
          ))}
        </div>
        <div
          onClick={toggleMobileMenu}
          className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative"
        >
          <p className="text-white text-sm">Browse</p>
          <BsChevronDown
            className={`text-white transition ${showMobileMenu ? 'rotate-180' : 'rotate-0'}`}
          />
          <MobileMenu visibile={showMobileMenu} />
        </div>
        <div className="flex flex-row ml-auto gap-7 items-center">
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            <Language />
          </div>
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            <BsSearch />
          </div>
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            <BsBell />
          </div>
          {/* <div
            className="flex flex-row items-center gap-2 cursor-pointer relative"
            onClick={toggleAccountMenu}
          >
            <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
              <img src="/images/default-blue.png" alt="" />
            </div>
            <BsChevronDown
              className={`text-white transition ${showAccountMenu ? 'rotate-180' : 'rotate-0'}`}
            />
            <AccountMenu visible={showAccountMenu} />
          </div> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
