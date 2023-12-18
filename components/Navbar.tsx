/* eslint-disable @next/next/no-img-element */
import { ChangeEvent, KeyboardEvent, useCallback, useState } from 'react';
import MobileMenu from './MobileMenu';
import NavbarItem from './NavbarItem';
import { BsChevronDown, BsSearch, BsBell } from 'react-icons/bs';
import AccountMenu from './AccountMenu';
import Image from 'next/image';
import Language from './Language';
import useTrans from '@/hooks/useTrans';
import Link from 'next/link';
import useSearch from '@/hooks/useSearch';
import { Button } from '@material-ui/core';


const Navbar = () => {
  const trans = useTrans();

  const navbarItemListData = [
    trans.home.home,
    // trans.home.genre
  ];

  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);
  const [showAccountMenu, setShowAccountMenu] = useState<boolean>(false);
  const [showbBackground, setShowBackground] = useState<boolean>(false);
  const [isShowSearch, setIsShowSearch] = useState<boolean>(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // const { data: movieListSearch = [], mutate } = useSearch(searchKeyword);


  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu((prev) => !prev);
  }, []);

  const toggleAccountMenu = useCallback(() => {
    setShowAccountMenu((prev) => !prev);
  }, []);

  const handleShowSearch = useCallback(() => {
    setIsShowSearch((prev) => !prev);
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(event.target.value);
  };
  
  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSubmitSearch();
    }
  }

  const handleSubmitSearch = () => {
    console.log('Submit Search')
    // mutate(searchKeyword)
  }

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
          <div
            className="text-gray-200 hover:text-gray-300 cursor-pointer transition"
            onClick={handleShowSearch}
          >
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
      {isShowSearch && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="max-w-md w-[50vw] h-[6vh] mx-auto z-10">
            <div className="relative w-full h-full rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
              <input
                className="h-full w-full outline-none text-sm text-gray-700 px-4"
                type="text"
                id="search"
                placeholder="Tìm kiếm phim.."
                value={searchKeyword}
                onChange={handleChange}
                onKeyDown={onKeyDown}
              />
            </div>
          </div>
          <div
            className="absolute top-0 left-0 right-0 bottom-0 w-full h-full"
            onClick={handleShowSearch}
          />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
