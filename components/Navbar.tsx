import { useCallback, useState } from 'react';
import { BsSearch, BsFacebook } from 'react-icons/bs';
import { TfiEmail } from 'react-icons/tfi';
import Image from 'next/image';
import Link from 'next/link';

import Search from './Search';
import NavbarItem from './NavbarItem';

const Navbar: React.FC = () => {
  // const trans = useTrans();
  // const router = useRouter();
  const navbarItemListData = [
    // trans.home.home,
    // trans.home.genre,
    'Trang chủ',
    'Thể loại',
    'Chiếu rạp',
  ];

  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);
  const [showAccountMenu, setShowAccountMenu] = useState<boolean>(false);
  const [showbBackground, setShowBackground] = useState<boolean>(false);
  const [isShowSearch, setIsShowSearch] = useState<boolean>(false);

  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu((prev) => !prev);
  }, []);

  const toggleAccountMenu = useCallback(() => {
    setShowAccountMenu((prev) => !prev);
  }, []);

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
      <div
        className={`px-4 md:px-16 py-6 flex flex-row items-center transition duration-500 bg-zinc-800 bg-opacity-90 ${
          showbBackground ? 'bg-zinc-900 bg-opacity-90' : ''
        }`}
      >
        <Link href={'/'}>
          <img className="bg-cover" src="/images/logo.png" alt="Logo" width={100} height={100} />
        </Link>
        <div className="flex flex-row ml-auto gap-7 items-center justify-between w-[50%]">
          {/* <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            <Language />
          </div> */}
          <div className="flex-row ml-8 gap-12 hidden lg:flex">
            {navbarItemListData.map((item) => (
              <NavbarItem label={item} key={item} />
            ))}
          </div>
          <div className="flex-row ml-8 gap-8 hidden lg:flex">
            <div
              className="text-gray-200 hover:text-gray-300 cursor-pointer transition"
              onClick={isOpenFacebook}
            >
              <BsFacebook />
            </div>
            <div
              className="text-gray-200 hover:text-gray-300 cursor-pointer transition"
              onClick={isOpenEmail}
            >
              <TfiEmail />
            </div>
            <div
              className="text-gray-200 hover:text-gray-300 cursor-pointer transition"
              onClick={isOpenSearch}
            >
              <BsSearch />
            </div>
          </div>
        </div>
      </div>
      {isShowSearch && <Search isOpenSearch={isOpenSearch} />}
    </nav>
  );
};

export default Navbar;
