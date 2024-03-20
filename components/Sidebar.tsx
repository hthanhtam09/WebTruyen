import useStoryDetail from '@/hooks/useStoryDetail';
import { StoriesInterface } from '@/types';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Bars4Icon } from '@heroicons/react/24/outline';
import { FiCommand } from 'react-icons/fi';

import SkeletonLoading from './Skeleton';
import { useRouter } from 'next/router';
import Loading from '@/pages/loading';
import { Button } from './ui/button';

type SidebarProps = {
  storySlug: string;
  totalChapter: number;
  showSidebar: boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

const Sidebar = ({ storySlug, totalChapter, showSidebar, setShowSidebar }: SidebarProps) => {
  const router = useRouter();
  const { data: storyData, isLoading, fetchMoreData } = useStoryDetail(storySlug);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState<number>(1);
  const [mergeStoryData, setMergeStoryData] = useState<StoriesInterface>(
    storyData as StoriesInterface,
  );

  const uniqueMergeStoryData = [...new Set(mergeStoryData?.chapterContents)];

  const handleLoadMore = useCallback(async () => {
    fetchMoreData(storySlug, page);
    setPage((prev) => prev + 1);
  }, [page, storySlug]);

  const redirectChapterDetail = useCallback(
    (stories: string[], chapter: number, totalChapter: number) => {
      const lastClickedChapterData = { storyData, stories, chapter, totalChapter };
      localStorage.setItem('lastClickedChapterData', JSON.stringify(lastClickedChapterData));
      router.push({
        pathname: `/${router.query.storyDetail}/chapter-${chapter}`,
      });
      // handleAddChapterFollow();
    },
    [router.query.storyDetail, storyData],
  );

  const handleShowSidebar = useCallback(() => {
    setShowSidebar((prev) => !prev);
  }, []);

  useEffect(() => {
    if (storyData) {
      setMergeStoryData((prev) => ({
        ...prev,
        chapterContents: [...(prev?.chapterContents || []), ...(storyData.chapterContents || [])],
      }));
    }
  }, [storyData]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        event.type === 'mousedown'
      ) {
        setShowSidebar(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sidebarRef]);

  return (
    <div ref={sidebarRef} className="fixed right-10 bottom-24">
      {!showSidebar ? (
        <Button className="bg-transparent border border-white z-30">
          <Bars4Icon onClick={handleShowSidebar} className="text-white" width="40" height="40" />
        </Button>
      ) : null}
      <div
        className={`bottom-0 left-0 right-0 w-screen md:w-[100vw] h-[50vh] bg-opacity-70 backdrop-blur-sm transition md:p-10 md:pl-20 text-white fixed z-30 ease-in-out duration-500 overflow-auto ${
          showSidebar ? 'translate-y-0 ' : 'translate-y-full'
        }`}
      >
        <h3 className="mt-32 mb-10 text-2xl md:text-4xl font-semibold text-white text-center">
          Danh sách chương
        </h3>

        {uniqueMergeStoryData ? (
          <div className="flex justify-center items-center flex-wrap gap-4">
            {uniqueMergeStoryData?.map((item, index) => {
              return (
                <p
                  className={`cursor-pointer hover:opacity-70 border rounded-lg dark:border-white border-black p-1 md:p-4 w-20 md:w-32 text-center`}
                  key={index}
                  onClick={() =>
                    redirectChapterDetail(mergeStoryData.chapterContents, index + 1, +totalChapter)
                  }
                >
                  Chương {index + 1}
                </p>
              );
            })}
          </div>
        ) : (
          <div className="h-screen">
            <Loading />
          </div>
        )}
        {totalChapter !== uniqueMergeStoryData.length ? (
          <div className="mt-20 mb-10 text-center">
            <button
              onClick={handleLoadMore}
              className={`${
                isLoading ? '' : 'border rounded-lg hover:opacity-70'
              } dark:text-white text-themeDark inline-block p-4 dark:border-white border-black`}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <FiCommand className="loading-icon mr-2 dark:text-white text-themeDark" />
                  <p>Đang tải...</p>
                </div>
              ) : (
                'Tải thêm...'
              )}
            </button>
          </div>
        ) : storyData?.chapterContents.length === 0 ? (
          <SkeletonLoading width={'20%'} height={40} />
        ) : (
          <div className="mt-20 mb-10 text-center">
            <p className="dark:text-white text-themeDark">Bạn đã ở cuối danh sách rồi!!!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
