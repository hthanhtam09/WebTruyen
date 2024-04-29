import { useCallback, useEffect, useRef, useState } from 'react';
import { BsSearch, BsFacebook, BsChevronDown } from 'react-icons/bs';
import { TfiEmail } from 'react-icons/tfi';
import Link from 'next/link';
import { useTheme } from 'next-themes';

import { EThemes } from '@/enum';
import Search from './Search';
import NavbarItem from './NavbarItem';
import IconTheme from './IconTheme';
import AccountMenu from './AccountUser';
import { convertToTitleCaseForDisplay, convertToTitleCaseForPath } from '@/utils/utils';
import useCurrentUser from '@/hooks/useCurrentUser';
import Icon from './Icon';
import Logo from './Logo';
import { Button } from './ui/button';
import { Bars4Icon, XMarkIcon } from '@heroicons/react/24/outline';

const navbarItemListData = ['Trang_chủ'];

const Navbar: React.FC = () => {
  const { data: userData } = useCurrentUser();
  const { theme } = useTheme();

  const [isShowSearch, setIsShowSearch] = useState<boolean>(false);
  const [showAccountUser, setShowAccountUser] = useState<boolean>(false);
  const [showNavbarMobile, setShowNavbarMobile] = useState<boolean>(false);
  const showNavbarMobileRef = useRef<HTMLDivElement>(null);
  const showAccountUserRef = useRef<HTMLDivElement>(null);

  const isOpenSearch = useCallback(() => {
    setIsShowSearch((prev) => !prev);
  }, []);

  const isOpenFacebook = useCallback(() => {
    window.location.href = 'https://www.facebook.com/hth9199';
  }, []);

  const isOpenEmail = useCallback(() => {
    window.location.href = 'mailto:hthanhtam0901@gmail.com';
  }, []);

  const toggleAccountUser = useCallback(() => {
    setShowAccountUser((prev) => !prev);
  }, []);

  const handleShowNavbarMobile = useCallback(() => {
    setShowNavbarMobile((prev) => !prev);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        ((showNavbarMobileRef.current &&
          !showNavbarMobileRef.current.contains(event.target as Node)) ||
          (showAccountUserRef.current &&
            !showAccountUserRef.current.contains(event.target as Node))) &&
        event.type === 'mousedown'
      ) {
        setShowNavbarMobile(false);
        setShowAccountUser(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showNavbarMobileRef, showAccountUserRef]);

  return (
    <nav className="w-full fixed z-40 top-0 ">
      <div className="h-[10vh] px-4 md:px-16 py-6 flex flex-row items-center bg-opacity-70 backdrop-blur-sm transition duration-500">
        <Link href={'/'}>
          <Logo />
        </Link>

        {/* PC, Tablet */}
        <div className="hidden md:flex flex-row ml-auto gap-7 items-center justify-between w-[50%]">
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
            <Icon onClick={isOpenFacebook}>
              <BsFacebook />
            </Icon>
            <Icon onClick={isOpenEmail}>
              <TfiEmail />
            </Icon>
            <Icon onClick={isOpenSearch}>
              <BsSearch />
            </Icon>
            <Icon>
              <IconTheme />
            </Icon>
            {userData ? (
              <div
                className="flex flex-row items-center gap-2 cursor-pointer relative"
                onClick={toggleAccountUser}
              >
                <div className="overflow-hidden">
                  <img
                    className="w-8 rounded-2xl"
                    src={`${userData.image ? userData.image : '/images/user.png'}`}
                    alt="Image_user"
                  />
                </div>
                <BsChevronDown
                  className={`text-white transition ${showAccountUser ? 'rotate-180' : 'rotate-0'}`}
                />
                <AccountMenu visible={showAccountUser} userData={userData} />
              </div>
            ) : null}
          </div>
        </div>

        {/* Mobile */}
        <div ref={showNavbarMobileRef} className="fixed md:hidden right-3 top-3">
          {!showNavbarMobile ? (
            <div className="flex items-center gap-4">
              <Icon onClick={isOpenSearch}>
                <BsSearch />
              </Icon>
              <Icon>
                <IconTheme />
              </Icon>
              <button onClick={handleShowNavbarMobile} className="bg-transparent z-30 transition">
                <Bars4Icon
                  className={`${
                    theme === EThemes.LIGHT ? 'text-black' : 'text-white'
                  } transition ease-in-out`}
                  width="40"
                  height="40"
                />
              </button>
              {userData ? (
                <div
                  className="flex flex-row items-center gap-2 cursor-pointer relative"
                  onClick={toggleAccountUser}
                >
                  <div className="overflow-hidden">
                    <img
                      className="w-8 rounded-2xl"
                      src={`${userData.image ? userData.image : '/images/user.png'}`}
                      alt="Image_user"
                    />
                  </div>
                  <BsChevronDown
                    className={`transition ${showAccountUser ? 'rotate-180' : 'rotate-0'} ${
                      theme === EThemes.LIGHT ? 'text-black' : 'text-white'
                    }`}
                  />
                  <AccountMenu visible={showAccountUser} userData={userData} />
                </div>
              ) : null}
            </div>
          ) : (
            <button onClick={handleShowNavbarMobile} className="bg-transparent z-30 transition">
              <XMarkIcon className="text-white" width="40" height="40" />
            </button>
          )}
        </div>
      </div>
      <div
        className={`top-16 left-0 right-0 h-[50vh] bg-opacity-70 backdrop-blur-sm transition md:p-10 md:pl-20 fixed z-30 ease-in-out duration-500 overflow-auto ${
          showNavbarMobile ? 'translate-y-0' : '-translate-y-[120%]'
        }`}
      >
        <div className="text-center mt-12">
          {navbarItemListData.map((item) => (
            <NavbarItem
              label={convertToTitleCaseForDisplay(item)}
              path={convertToTitleCaseForPath(item)}
              key={item}
            />
          ))}
          <hr className="bg-gray-600 border-0 h-px my-4" />
          <div className="flex justify-center items-center gap-8 mt-6">
            <Icon onClick={isOpenFacebook}>
              <BsFacebook />
            </Icon>
            <Icon onClick={isOpenEmail}>
              <TfiEmail />
            </Icon>
          </div>
        </div>
      </div>
      {isShowSearch && <Search isOpenSearch={isOpenSearch} />}
    </nav>
  );
};

export default Navbar;
