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
  padding: 2em;
  max-width: 800px;
  margin: auto;
  text-align: center;
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
  padding: 1em 2em;
  width: fit-content;
  margin: auto;
  display: block;
`;

const Billboard: React.FC = () => {
  const randomMoviesIndex = useMemo(() => Math.floor(Math.random() * video.length), []);

  const handleMoveListStories = useCallback(() => {
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
  }, [randomMoviesIndex]);

  return (
    <>
      <div className="relative top-0 h-screen w-screen dark:bg-black bg-themeLight transition duration-500">
        {VideoBackground}
      </div>
      <div className="absolute inset-0 flex justify-center items-center">
        <Content>
          <Title>Chào mừng bạn đến với WebTruyen!!!</Title>
          <p className="text-xl mb-1 font-thin text-white mt-4">
            Với kho truyện hay và hấp dẫn. Đưa người đọc tới những thế giới mới mẻ đầy thú vị. Khám phá và chia sẻ niềm đam mê của bạn ngay hôm nay.
          </p>
          <div className="mt-12">
            <Button className="text-white capitalize" onClick={handleMoveListStories}>
              Đọc ngay
            </Button>
          </div>
        </Content>
      </div>
    </>
  );
};

export default Billboard;
