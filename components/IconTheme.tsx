'use client';

import React from 'react';
import { useTheme } from 'next-themes';
import { Typography } from '@material-tailwind/react';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { EThemes } from '@/enum';
import { Tooltip } from '@nextui-org/react';

const IconTheme = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;

  return (
    <>
      {currentTheme === EThemes.DARK ? (
        <Tooltip
          className="border rounded-sm bg-white px-4 py-2 shadow-xl shadow-black/10 z-[99999]"
          content={
            <Typography color="black">
              Modify to theme <span className="font-bold">Dark</span>
            </Typography>
          }
        >
          <MoonIcon className="w-[20px]" onClick={() => setTheme(EThemes.LIGHT)} />
        </Tooltip>
      ) : (
        <Tooltip
          className="border rounded-sm bg-white px-4 py-2 shadow-xl shadow-black/10 z-[99999]"
          content={
            <Typography color="black">
              Modify to theme <span className="font-bold">Light</span>
            </Typography>
          }
        >
          <SunIcon className="w-[20px] dark:text-white text-themeDark" onClick={() => setTheme(EThemes.DARK)} />
        </Tooltip>
      )}
    </>
  );
};

export default IconTheme;
