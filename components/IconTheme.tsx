'use client';
import React from 'react';
import { useTheme } from 'next-themes';
import { Tooltip, Typography } from '@material-tailwind/react';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';

const IconTheme = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;

  return (
    <>
      {currentTheme === 'dark' ? (
        <Tooltip
          className="border border-blue-gray-50 bg-white px-4 py-2 shadow-xl shadow-black/10 z-[99999]"
          content={
            <Typography color="black">
              Modify to theme <span className="font-bold">Dark</span>
            </Typography>
          }
        >
          <MoonIcon className="w-[20px]" onClick={() => setTheme('light')} />
        </Tooltip>
      ) : (
        <Tooltip
          className="border border-blue-gray-50 bg-white px-4 py-2 shadow-xl shadow-black/10 z-[99999]"
          content={
            <Typography color="black">
              Modify to theme <span className="font-bold">Light</span>
            </Typography>
          }
        >
          <SunIcon className="w-[20px]" onClick={() => setTheme('dark')} />
        </Tooltip>
      )}
    </>
  );
};

export default IconTheme;
