import { Suspense, useCallback, Fragment, useState } from 'react';
import { useRouter } from 'next/router';
import { Autoplay, EffectFade } from 'swiper/modules';
import { SwiperSlide, Swiper as SwiperContainer } from 'swiper/react';
import { Helmet } from 'react-helmet-async';
import { FiCommand } from 'react-icons/fi';
// import { NextSeo } from 'next-seo';

import WatchButton from '@/components/WatchButton';
import Line from '@/components/Line';
import StoryCard from '@/components/StoryCard';
import useStoryDetail from '@/hooks/useStoryDetail';
import Loading from '@/pages/loading';
import SkeletonLoading from '@/components/Skeleton';
import useStories from '@/hooks/useStories';
import { StoriesInterface } from '@/types';

import Comment from '@/components/Comment';

import 'swiper/css';
import 'swiper/css/pagination';
import useAddChapterFollow from '@/hooks/useAddChapterFollow';
import useGetChapterFollow from '@/hooks/useGetChapterFollow';

const INIT_CHAPTER = 48;

const StoryDetailScreen = () => {
  const router = useRouter();
  const { data: storyData } = useStoryDetail(Object.keys(router.query) as any as string);
  const { data: storiesData = [] } = useStories();
  const { addChapterFollow } = useAddChapterFollow();
  const { getChapterFollow } = useGetChapterFollow();

  const [visibleChapters, setVisibleChapters] = useState<number>(INIT_CHAPTER);
  const [isLoadmore, setIsLoadmore] = useState<boolean>(false);

  const uniqueGenresSet = new Set(storyData?.genres);
  const uniqueGenresArray = [...uniqueGenresSet];

  const handleLoadMore = useCallback(async () => {
    setIsLoadmore(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setVisibleChapters((prevVisibleChapter) => prevVisibleChapter + INIT_CHAPTER);
    setIsLoadmore(false);
  }, []);

  const redirectChapterDetail = useCallback(
    (title: string, author: string, stories: string[], chapter: number) => {
      if (storyData) {
        localStorage.setItem('lastClickedChapter', (chapter + 1).toString());
        router.push({
          pathname: `/chapterDetail/${chapter}`,
          query: { title, author, stories, chapter },
        });
        handleAddChapterFollow();
      }
    },
    [storyData],
  );

  const lastClickedChapter = localStorage.getItem('lastClickedChapter');

  const handleAddChapterFollow = useCallback(async () => {
    if (!storyData) return;
    await addChapterFollow({
      storyId: storyData._id,
      chapter: lastClickedChapter,
    });
  }, []);

  return (
    <div className="flex flex-col justify-center mb-32">
      <Helmet>
        <title>{storyData?.title}</title>
        <meta name="description" content={storyData?.description} />
        <meta name="keywords" content="" />
        <meta name="author" content={storyData?.author} />
        <meta property="og:title" content={storyData?.title} />
        <meta property="og:description" content={storyData?.description} />
        <meta property="og:image" content={storyData?.imageUrl} />
        <meta property="og:url" content="WebTruyen" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={storyData?.title} />
        <meta name="twitter:description" content={storyData?.description} />
        <meta name="twitter:image" content={storyData?.imageUrl} />
      </Helmet>
      {/* <NextSeo
        title={storyData?.title}
        description={storyData?.description}
        canonical={`webtruyen.io.vn/storyDetail/${storyData?.title}`}
      /> */}
      <Suspense fallback={<Loading />}>
        <section className="relative flex-col pt-32 px-4 md:px-16 py-6 flex items-start dark:bg-themeDark bg-themeLight bg-opacity-90 transition duration-500">
          {storyData ? (
            <div
              style={{
                backgroundImage: `url(${storyData.imageUrl})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
              }}
              className="absolute z-9 w-[45%] h-[80%] top-30 right-0 bg-cover bg-center shadow-[inset_-2px_-2px_15px_20px_#18181b] object-contain max-w-full max-h-full pointer-events-none"
            />
          ) : (
            <SkeletonLoading width="42%" height="115%" style="absolute -top-14 right-10" />
          )}

          <div className="w-[50%] z-10">
            {storyData ? (
              <p className="dark:text-white text-themeDark font-bold text-4xl transition duration-500">
                {storyData.title}
              </p>
            ) : (
              <SkeletonLoading width={'80%'} height={40} />
            )}

            <p className="dark:text-white text-themeDark font-normal text-lg py-2 transition duration-500">
              <span className="text-gray-400 inline-block w-[150px]">Tổng: </span>
              {storyData ? (
                <span>{storyData.chapterContents.length} chương</span>
              ) : (
                <SkeletonLoading width={'20%'} height={40} />
              )}
            </p>
            <p className="dark:text-white text-themeDark font-normal text-lg py-2 flex transition duration-500">
              <span className="text-gray-400 inline-block w-[150px]">Mô tả: </span>
              <span className="inline-block w-[600px]">
                {storyData ? storyData.description : <SkeletonLoading width={'100%'} height={40} />}
              </span>
            </p>

            <p className="dark:text-white text-themeDark font-normal text-lg py-2 flex items-center transition duration-500">
              <span className="text-gray-400 inline-block w-[150px]">Tác giả: </span>
              {storyData ? (
                <span>{storyData.author}</span>
              ) : (
                <SkeletonLoading width={'20%'} height={40} />
              )}
            </p>

            <p className="dark:text-white text-themeDark font-normal text-lg py-2 flex transition duration-500">
              <span className="text-gray-400 inline-block w-[150px]">Thể loại: </span>
              <span className="inline-block w-[600px]">
                {storyData ? (
                  uniqueGenresArray.map((item: any, index: number) => (
                    <Fragment key={index}>
                      {item}
                      {index === 0 && uniqueGenresArray.length === 1
                        ? '. '
                        : index !== uniqueGenresArray.length - 1
                        ? ', '
                        : '. '}
                    </Fragment>
                  ))
                ) : (
                  <SkeletonLoading width={'100%'} height={40} />
                )}
              </span>
            </p>
          </div>
          {storyData ? (
            <div className="flex mt-6">
              <WatchButton
                path={`/chapterDetail/0`}
                query={{ stories: storyData.chapterContents, chapter: 0 }}
                text="Đọc ngay"
              />
            </div>
          ) : null}
        </section>
        <Line style="top-10" />
        <section className="w-full mt-10 px-16 pb-10">
          <p className="mt-28 text-2xl font-bold">Chương đang theo dõi: </p>
          <div className="w-full mt-10">
            {Number(lastClickedChapter) === 0 ? 'Chưa xem' : `Chương ${Number(lastClickedChapter)}`}
          </div>
        </section>
        <Line style="top-10" />
        <section className="w-full mt-10 px-16 pb-10">
          <p className="mt-12 text-2xl font-bold">Danh sách chương: </p>
          <div className="w-full gap-16 grid grid-cols-8 grid-flow-row-dense mt-10">
            {storyData ? (
              <>
                {storyData.chapterContents.slice(0, visibleChapters).map((_, index) => {
                  return (
                    <p
                      className={`cursor-pointer hover:opacity-70 border rounded-lg dark:border-white border-black p-4 ${
                        Number(lastClickedChapter) === index + 1
                          ? 'dark:bg-white dark:text-black bg-themeLight-secondary text-white'
                          : ''
                      }`}
                      key={index}
                      onClick={() =>
                        redirectChapterDetail(
                          storyData.title,
                          storyData.author,
                          storyData.chapterContents,
                          index,
                        )
                      }
                    >
                      Chương {index + 1}
                    </p>
                  );
                })}
              </>
            ) : (
              <div className="h-screen">
                <Loading />
              </div>
            )}
          </div>
          {storyData && visibleChapters < storyData.chapterContents.length ? (
            <div className="mt-20 mb-10 text-center">
              <button
                onClick={handleLoadMore}
                className={`${
                  isLoadmore ? '' : 'border rounded-lg hover:opacity-70'
                } dark:text-white text-themeDark inline-block p-4 dark:border-white border-black`}
              >
                {isLoadmore ? (
                  <div className="flex items-center">
                    <FiCommand className="loading-icon mr-2 dark:text-white text-themeDark" />
                    <p>Đang tải...</p>
                  </div>
                ) : (
                  'Tải thêm...'
                )}
              </button>
            </div>
          ) : (
            <div className="mt-20 mb-10 text-center">
              <p className="dark:text-white text-themeDark">
                {storyData && storyData.chapterContents.length > 5
                  ? 'Bạn đã ở cuối danh sách rồi!!!'
                  : storyData && storyData.chapterContents.length === 0
                  ? 'Chưa ra chương mới, bạn chờ sau nhé!!!'
                  : ''}
              </p>
            </div>
          )}
        </section>
      </Suspense>
      <Line />
      <Suspense fallback={<Loading />}>
        {storyData ? <Comment storyId={storyData._id} storySlug={storyData.storySlug} /> : null}
      </Suspense>
      <Line />
      <Suspense fallback={<Loading />}>
        <section className="w-full h-[40vh] mt-20 gap-16 px-16 mb-20">
          <p className="dark:text-white text-themeDark text-2xl font-bold transition duration-500">
            Related Stories:
          </p>
          {storiesData.length > 0 ? (
            <SwiperContainer
              loop
              autoplay={{ delay: 3000 }}
              slidesPerView={5}
              spaceBetween={30}
              modules={[Autoplay, EffectFade]}
              touchEventsTarget="wrapper"
              className="mySwiper"
            >
              {storiesData.map((story: StoriesInterface, index: number) => (
                <SwiperSlide key={index}>
                  <StoryCard data={story} />
                </SwiperSlide>
              ))}
            </SwiperContainer>
          ) : (
            <div className="h-[40vh] relative">
              <Loading />
            </div>
          )}
        </section>
      </Suspense>
    </div>
  );
};

export default StoryDetailScreen;
