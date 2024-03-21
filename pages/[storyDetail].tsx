import { Suspense, useCallback, Fragment, useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Autoplay, EffectFade } from 'swiper/modules';
import { SwiperSlide, Swiper as SwiperContainer } from 'swiper/react';
import { Helmet } from 'react-helmet-async';
import { FiCommand } from 'react-icons/fi';
import { isMobile } from 'react-device-detect';

import WatchButton from '@/components/WatchButton';
import Line from '@/components/Line';
import StoryCard from '@/components/StoryCard';
import useStoryDetail from '@/hooks/useStoryDetail';
import Loading from '@/pages/loading';
import SkeletonLoading from '@/components/Skeleton';
import useStories from '@/hooks/useStories';
import { StoriesInterface } from '@/types';
import { getColor, processLabels } from '@/utils/utils';
import { IconLabels } from '@/components/IconLabels';
import Comment from '@/components/Comment';

import 'swiper/css';
import 'swiper/css/pagination';
// import useAddChapterFollow from '@/hooks/useAddChapterFollow';
// import useGetChapterFollow from '@/hooks/useGetChapterFollow';

const StoryDetailScreen = () => {
  const router = useRouter();
  const {
    data: storyData,
    isLoading,
    fetchMoreData,
  } = useStoryDetail(router.query.storyDetail as string);
  const [mergeStoryData, setMergeStoryData] = useState<StoriesInterface | null>(null);

  const { data = [] } = useStories();
  const storiesData = data.stories;
  // const { addChapterFollow } = useAddChapterFollow();
  // const { getChapterFollow } = useGetChapterFollow();
  const [page, setPage] = useState<number>(1);
  const uniqueGenresArray = [...new Set(storyData?.genres)];
  const uniqueMergeStoryData = [...new Set(mergeStoryData?.chapterContents)];

  const totalChapter = useMemo(
    () =>
      storiesData &&
      storiesData
        .filter((story: StoriesInterface) => story.title === storyData?.title)[0]
        ?.chapterStory.replace('Chương', '')
        .trim(),
    [storiesData, storyData],
  );

  const statusChapter = useMemo(
    () =>
      storiesData &&
      storiesData.filter((story: StoriesInterface) => story.title === storyData?.title)[0]
        ?.statusLabels,
    [storiesData, storyData],
  );

  const statusLabels = [...new Set(statusChapter)] as string[];

  const handleLoadMore = useCallback(async () => {
    fetchMoreData(router.query.storyDetail as string, page);
    setPage((prev) => prev + 1);
  }, [Object.keys(router.query)]);

  const redirectChapterDetail = useCallback(
    (stories: string[], chapter: number, totalChapter: number) => {
      const lastClickedChapterData = { storyData, stories, chapter, totalChapter };
      localStorage.setItem('lastClickedChapterData', JSON.stringify(lastClickedChapterData));
      router.push({
        pathname: `/${router.query.storyDetail}/chapter-${chapter}`,
      });
      setMergeStoryData(
        (prev) =>
          ({
            ...prev,
            chapterContents: [],
          } as StoriesInterface),
      );
      // handleAddChapterFollow();
    },
    [router.query.storyDetail, storyData],
  );

  const renderLabels = useMemo(() => {
    return processLabels(statusLabels).map((label, index) => {
      return (
        <span key={index} className="w-14 h-14" style={getColor(label)}>
          {IconLabels(label)}
        </span>
      );
    });
  }, [statusLabels]);

  useEffect(() => {
    if (storyData) {
      setMergeStoryData(
        (prev) =>
          ({
            ...prev,
            chapterContents: [
              ...(prev?.chapterContents || []),
              ...(storyData.chapterContents || []),
            ],
          } as StoriesInterface),
      );
    }
  }, [storyData]);
  // const lastClickedChapter = localStorage.getItem('lastClickedChapter');

  // const handleAddChapterFollow = useCallback(async () => {
  //   if (!storyData) return;
  //   await addChapterFollow({
  //     storyId: storyData._id,
  //     chapter: lastClickedChapter,
  //   });
  // }, []);

  return (
    <main className="flex flex-col justify-center mb-32">
      <Helmet>
        <title>{storyData?.title}</title>
        <meta name="description" content={storyData?.title} />
        <meta name="keywords" content="" />
        <meta name="author" content={storyData?.author} />
        <meta property="og:title" content={storyData?.title} />
        <meta property="og:description" content={storyData?.title} />
        <meta property="og:image" content={storyData?.imageUrl} />
        <meta property="og:url" content="webtruyen.io.vn" />
        <meta name="twitter:card" content={storyData?.title} />
        <meta name="twitter:title" content={storyData?.title} />
        <meta name="twitter:description" content={storyData?.title} />
        <meta name="twitter:image" content={storyData?.imageUrl} />
      </Helmet>
      <Suspense fallback={<Loading />}>
        <section className="relative flex-col pt-20 md:pt-32 px-4 md:px-16 py-6 flex items-start dark:bg-themeDark bg-themeLight bg-opacity-90 transition duration-500">
          {storyData ? (
            <div
              style={{
                backgroundImage: `url(${storyData.imageUrl})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
              }}
              className="absolute z-9 w-[45%] h-[80%] top-30 right-0 bg-cover bg-center shadow-[inset_-2px_-2px_15px_20px_#18181b] object-contain max-w-full max-h-full pointer-events-none hidden md:block"
            >
              <span
                className="absolute top-[40%] left-1/2 opacity-30 pointer-events-none text-[8px] sm:text-base md:text-base lg:text-xl"
                style={{ transform: 'translate(-50%, -50%)', rotate: '-45deg' }}
              >
                webtruyen.io.vn
              </span>
            </div>
          ) : (
            <SkeletonLoading width="42%" height="115%" style="absolute -top-14 right-10" />
          )}

          <div className="w-full md:w-[50%] z-10">
            {storyData ? (
              <p className="dark:text-white text-themeDark font-bold text-4xl transition duration-500">
                {storyData.title}
              </p>
            ) : (
              <SkeletonLoading width={'80%'} height={40} />
            )}

            <p className="dark:text-white text-themeDark font-normal text-lg py-2 transition duration-500">
              <span className="text-gray-400 inline-block w-[150px]">Tổng chương: </span>
              {storyData ? (
                <span>{totalChapter}</span>
              ) : (
                <SkeletonLoading width={'20%'} height={40} />
              )}
            </p>
            <p className="dark:text-white text-themeDark font-normal text-lg py-2 md:flex transition duration-500">
              <span className="text-gray-400 inline-block w-[150px]">Mô tả: </span>
              <span className="inline-block w-[300px] md:w-[600px]">
                {storyData ? storyData.description : <SkeletonLoading width={'100%'} height={40} />}
              </span>
            </p>

            <p className="dark:text-white text-themeDark font-normal text-lg py-2 flex items-center transition duration-500">
              <span className="text-gray-400 inline-block w-[100px] md:w-[150px]">Tác giả: </span>
              {storyData ? (
                <span>{storyData.author}</span>
              ) : (
                <SkeletonLoading width={'20%'} height={40} />
              )}
            </p>

            <p className="dark:text-white text-themeDark font-normal text-lg py-2 flex transition duration-500">
              <span className="text-gray-400 inline-block w-[150px]">Thể loại: </span>
              <span className="inline-block w-[300px] md:w-[600px]">
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

            <p className="dark:text-white text-themeDark font-normal text-lg py-2 flex items-center transition duration-500">
              <span className="text-gray-400 inline-block w-[150px]">Trạng thái: </span>
              {storyData ? renderLabels : <SkeletonLoading width={'100%'} height={40} />}
            </p>
          </div>
          {storyData ? (
            <div className="flex mt-6">
              <WatchButton
                redirectChapterDetail={() =>
                  redirectChapterDetail(
                    mergeStoryData ? mergeStoryData.chapterContents : [],
                    1,
                    +totalChapter,
                  )
                }
                text="Đọc ngay"
              />
            </div>
          ) : null}
        </section>
        {/* <section className="w-full mt-10 px-16 pb-10">
          <p className="mt-28 text-2xl font-bold">Chương đang theo dõi: </p>
          <div className="w-full mt-10">
            {Number(lastClickedChapter) === 0 ? 'Chưa xem' : `Chương ${Number(lastClickedChapter)}`}
          </div>
        </section> */}
        <Line style="top-10" />
        <section className="w-full mt-10 px-4 md:px-16 pb-10">
          <p className="mt-12 text-2xl font-bold">Danh sách chương: </p>
          <div className="w-full gap-5 md:gap-16 grid grid-cols-4 md:grid-cols-5 lg:grid-cols-8 grid-flow-row-dense mt-10">
            {uniqueMergeStoryData ? (
              <>
                {uniqueMergeStoryData?.map((_, index) => {
                  return (
                    <p
                      className={`w-16 md:w-32 text-[14px] md:text-base cursor-pointer hover:opacity-70 border rounded-lg dark:border-white border-black p-1 md:p-4 text-center`}
                      key={index}
                      onClick={() =>
                        redirectChapterDetail(
                          mergeStoryData ? mergeStoryData.chapterContents : [],
                          index + 1,
                          +totalChapter,
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
          {+totalChapter !== +uniqueMergeStoryData.length ? (
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
        </section>
      </Suspense>
      <Line />
      <Suspense fallback={<Loading />}>
        {storyData ? <Comment storyId={storyData._id} storySlug={storyData.storySlug} /> : null}
      </Suspense>
      <Line />
      <Suspense fallback={<Loading />}>
        <section className="w-full h-[20vh] lg:h-[40vh] mt-20 gap-16 px-4 md:px-16 mb-20">
          <p className="dark:text-white text-themeDark text-2xl font-bold transition duration-500">
            Truyện khác:
          </p>
          {storiesData && storiesData.length > 0 ? (
            <SwiperContainer
              loop
              autoplay={{ delay: 3000 }}
              slidesPerView={isMobile ? 2 : 5}
              spaceBetween={30}
              modules={[Autoplay, EffectFade]}
              touchEventsTarget="wrapper"
              className="mySwiper"
            >
              {storiesData.map((story: StoriesInterface, index: number) => (
                <SwiperSlide key={index}>
                  <StoryCard
                    data={story}
                    setMergeStoryData={setMergeStoryData}
                    setPage={setPage}
                    isStoryDetail
                  />
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
    </main>
  );
};

export default StoryDetailScreen;
