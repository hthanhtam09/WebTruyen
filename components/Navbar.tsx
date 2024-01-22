import { useCallback, useState } from 'react';
import { BsSearch, BsFacebook, BsChevronDown } from 'react-icons/bs';
import { TfiEmail } from 'react-icons/tfi';
import Link from 'next/link';
import { Tooltip, Typography } from '@material-tailwind/react';

import Search from './Search';
import NavbarItem from './NavbarItem';
import IconTheme from './IconTheme';
import AccountMenu from './AccountUser';
import { convertToTitleCaseForDisplay, convertToTitleCaseForPath } from '@/utils/utils';
import useCurrentUser from '@/hooks/useCurrentUser';
import Icon from './Icon';

const navbarItemListData = ['Home', 'up_comming'];

const Navbar: React.FC = () => {
  const { data: userData } = useCurrentUser();

  const [isShowSearch, setIsShowSearch] = useState<boolean>(false);
  const [showAccountUser, setShowAccountUser] = useState(false);

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
                className="cursor-not-allowed"
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
