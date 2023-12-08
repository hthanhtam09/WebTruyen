import Image from 'next/image';
import { useRef, useState } from 'react';
import { useRouter } from 'next/router';

export enum LANGUAGE_TYPE {
  VI = 'vi',
  EN = 'en',
}

const Language = () => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const isOpenLanguage = () => {
    setIsOpen((prev) => !prev);
  };

  const ref = useRef(null);

  const changeLanguage = async (lng: string) => {
    await router.push(router.pathname === '/' ? lng : `${router.pathname}/${lng}`, undefined, {
      shallow: true,
    });
    setIsOpen(false);
  };

  return (
    <div className="realative z-10 cursor-pointer" onClick={isOpenLanguage}>
      <div className="inline-flex items-center gap-1.5 py-1 pl-3 pr-2 rounded-md border border-[#e6e6e6] w-[77px] h-[34px]">
        <Image src={`/images/${router.locale}.png`} alt="Flag" width={22} height={22} />
        <div className="text-[#e6e6e6] text-[.9375rem] leading-[150%]">
          {router.locale?.toUpperCase()}
        </div>
      </div>

      {isOpen ? (
        <>
          <div
            ref={ref}
            className="absolute top-16 flex flex-col justify-center items-start w-[4.8125rem] bg-white rounded border-[#e6e6e6] cursor-pointer z-10"
          >
            <div
              onClick={() => changeLanguage(LANGUAGE_TYPE.VI)}
              className="flex items-center gap-1.5 py-1 pl-3 pr-2 hover:rounded hover:bg-[#e6e6e6] w-[77px] h-[34px]"
            >
              <Image src={`/images/vi.png`} alt="Flag" width={22} height={22} />
              <div className="gap-1 text-black text-sm leading-[1.375rem]">VI</div>
            </div>
            <div
              onClick={() => changeLanguage(LANGUAGE_TYPE.EN)}
              className="flex items-center gap-1.5 py-1 pl-3 pr-2 hover:rounded hover:bg-[#e6e6e6] w-[77px] h-[34px]"
            >
              <Image src={`/images/en.png`} alt="Flag" width={22} height={22} />
              <div className="gap-1 text-black text-sm leading-[1.375rem]">EN</div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Language;
