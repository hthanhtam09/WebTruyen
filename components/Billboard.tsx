'use client';

import React, { useCallback, useRef, useState } from 'react';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
// import PlayButton from '@/components/PlayButton';
import useInfoModalStore from '@/hooks/useInfoModalStore';
import Loading from '@/pages/loading';
import useMovieList from '@/hooks/useMovieList';
import useMovie from '@/hooks/useMovie';
import Button from '@material-ui/core/Button';
import { handleRemoveTagHtml, isEndOfSentence } from '@/utils/utils';
import styled from 'styled-components';
import { useRouter } from 'next/router';

const Content = styled.div`
  backdrop-filter: blur(2px);
  border-radius: 20px;
  box-shadow: 0 0.5px 0 1px rgba(255, 255, 255, 0.23) inset,
    0 1px 0 0 rgba(255, 255, 255, 0.66) inset, 0 4px 16px rgba(0, 0, 0, 0.12);
  z-index: 10;
  padding: 32px;
`;

const Billboard: React.FC = () => {
  // const { openModal } = useInfoModalStore();
  const router = useRouter();
  const { data: movieList = [], isLoading } = useMovieList();
  const movieData = !isLoading && movieList != null && movieList.items != null && movieList.items.length > 0;
  const movieCount = (movieData && movieList.items.length) || 0;
  const randomIndex = Math.floor(Math.random() * movieCount);
  
  const { data } = useMovie(movieData ? movieList.items[randomIndex].slug : 'nguoi-doi-nhi');

  // const handleOpenModal = useCallback(() => {
  //   openModal(data?.id);
  // }, [openModal, data?.id]);

  function handleStringOverLine(
    inputString: string,
    maxCharsPerLine: number = 80,
    maxLines: number = 3,
  ) {
    var words = inputString.split(/\s+/);
    var lines = [];
    var currentLine = '';

    for (var i = 0; i < words.length; i++) {
      var word = words[i];

      if ((currentLine + ' ' + word).length >= maxCharsPerLine) {
        lines.push(currentLine.trim());
        currentLine = word;
      } else {
        currentLine += (currentLine ? ' ' : '') + word;
      }

      if (lines.length >= maxLines && !isEndOfSentence(word)) {
        lines.push('...');
        break;
      }
    }

    var resultString = lines.join(' ');

    return resultString;
  }

  const navigateAlbumScreen = useCallback(
    (movie: string) =>
      router.push({
        pathname: `/album`,
        query: movie,
      }),
    [router],
  );

  return isLoading ? (
    <div className="h-[56.25vw]">
      <Loading />
    </div>
  ) : (
    <>
      <div className="relative h-[90vh] flex-col md:px-16 py-6 transition duration-500 bg-zinc-900 opacity-50">
        <div
          style={{
            backgroundImage: `url(${data?.movie?.thumb_url})`,
          }}
          className="absolute z-9 w-[100%] h-[100%] top-28 right-0 left-0 bottom-0 bg-cover bg-center shadow-[inset_-2px_-2px_15px_20px_#18181b] object-contain max-w-full max-h-full pointer-events-none"
        ></div>
      </div>
      <div className="absolute left-[5%] top-[55%] w-[50%]">
        {data ? (
          <Content>
            <h1 className="text-[52px] font-bold text-white">{data.movie.name}</h1>
            <p className="text-xl mb-1 font-thin text-white mt-2">
              {handleStringOverLine(handleRemoveTagHtml(data.movie.content))}
            </p>
            <div
              className="relative inline-flex mt-4 w-full cursor-pointer"
              onClick={() => navigateAlbumScreen(data.movie)}
            >
              <div className="absolute transitiona-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1" />
              <div className="!mx-auto py-4 text-lg font-bold transition-all duration-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 z-10">
                <span className="text-white capitalize">Xem thêm</span>
              </div>
            </div>
          </Content>
        ) : (
          <div className="h-[182px]" />
        )}
      </div>
    </>
  );
};

export default Billboard;
