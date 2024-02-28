'use client';

import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import ReactPlayer from 'react-player';

import video from '@/video.json';

const Content = styled.div`
  backdrop-filter: blur(2px);
  border-radius: 20px;
  box-shadow: 0 0.5px 0 1px rgba(255, 255, 255, 0.23) inset,
    0 1px 0 0 rgba(255, 255, 255, 0.66) inset, 0 4px 16px rgba(0, 0, 0, 0.12);
  z-index: 10;
  padding: 32px;
`;

const Title = styled.h1`
  font-family: 'Scope One', serif;
  font-size: 3em;
  font-weight: bold;
  color: white;
`;

const Button = styled.span`
  backdrop-filter: blur(2px);
  border-radius: 20px;
  box-shadow: 0 0.5px 0 1px rgba(255, 255, 255, 0.23) inset,
    0 1px 0 0 rgba(255, 255, 255, 0.66) inset, 0 4px 16px rgba(0, 0, 0, 0.12);
  padding: 32px;
  width: 100vw;
`;

const Billboard: React.FC = () => {
  const randomMoviesIndex = Math.floor(Math.random() * video.length);

  const handleMoveListFilm = useCallback(() => {
    document.getElementById('moveStories')?.scrollIntoView({ behavior: 'smooth' });
    history.replaceState({}, document.title, window.location.pathname);
  }, []);

  const VideoBackground = useMemo(() => {
    return (
      <ReactPlayer
        className="absolute top-0 bottom-0 left-0 right-0 pointer-events-none w-full brightness-[60%] object-cover h-full"
        url={`${video[randomMoviesIndex].videoUrl}`}
        width="100%"
        height="100%"
        playing
        controls={false}
        muted
      />
    );
  }, []);

  return (
    <>
      <div className="relative top-0 h-screen w-screen dark:bg-black bg-themeLight transition duration-500">{VideoBackground}</div>
      <div className="absolute left-[5%] top-[55%] w-[55%]">
        <Content>
          <Title>Chào mừng bạn đến với WebTruyen!!!</Title>
         
          <p className="text-xl mb-1 font-thin text-white mt-4">
            Với kho truyện hay và hấp dẫn. Đưa người đọc tới những thế giới mới mẻ đầy thú vị. Khám phá và chia sẻ niềm đam mê của bạn ngay hôm nay.
          </p>
          <div className="mt-12 py-4 text-lg font-bold transition-all duration-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 z-10 cursor-pointer hover:opacity-30">
            <Button className="text-white capitalize" onClick={handleMoveListFilm}>
              Đọc ngay
            </Button>
          </div>
        </Content>
      </div>
    </>
  );
};

export default Billboard;