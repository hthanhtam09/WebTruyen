'use client';

import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import ReactPlayer from 'react-player';

import moviesJson from '@/movies.json';

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
  // const { openModal } = useInfoModalStore();
  const router = useRouter();

  const randomMoviesIndex = Math.floor(Math.random() * moviesJson.length);

  const handleMoveListFilm = useCallback(() => {
    document.getElementById('moveTrending')?.scrollIntoView({ behavior: 'smooth' });
    history.replaceState({}, document.title, window.location.pathname);
  }, []);

  const VideoBackground = useMemo(() => {
    return (
      <ReactPlayer
        className="absolute top-0 bottom-0 left-0 right-0 pointer-events-none w-full brightness-[60%] object-cover h-full"
        url={`${moviesJson[randomMoviesIndex].videoUrl}`}
        width="100%"
        height="100%"
        playing
        controls={false}
        muted
      />
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="relative top-28 h-[90vh] w-screen bg-black">{VideoBackground}</div>
      <div className="absolute left-[5%] top-[55%] w-[50%]">
        <Content>
          <Title>Chào mừng bạn đến với CineShin</Title>
          <p className="text-xl mb-1 font-thin text-white mt-4">
            Trải nghiệm điện ảnh đỉnh cao với hàng ngàn bộ phim đa dạng. Hãy khám phá và chia sẻ
            niềm đam mê của bạn ngay hôm nay!
          </p>
          <div className="mt-12 py-4 text-lg font-bold transition-all duration-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 z-10 cursor-pointer hover:opacity-30">
            <Button className="text-white capitalize" onClick={handleMoveListFilm}>
              Khám Phá Ngay
            </Button>
          </div>
        </Content>
      </div>
    </>
  );
};

export default Billboard;
