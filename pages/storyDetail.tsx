import { Suspense } from 'react';
import { useRouter } from 'next/router';
import { Autoplay, EffectFade } from 'swiper/modules';
import { SwiperSlide, Swiper as SwiperContainer } from 'swiper/react';
import { Helmet } from 'react-helmet-async';

import WatchButton from '@/components/WatchButton';
import Line from '@/components/Line';
import StoriesList from '@/components/StoriesList';
import StoryCard from '@/components/StoryCard';
import useStoryDetail from '@/hooks/useStoryDetail';
import Loading from '@/pages/loading';
import SkeletonLoading from '@/components/Skeleton';
import useStories from '@/hooks/useStories';
import { StoriesInterface } from '@/types';

import Comment from '@/components/Comment';

import 'swiper/css';
import 'swiper/css/pagination';

const StoryDetailScreen = () => {
  const router = useRouter();
  const { data: storyData } = useStoryDetail(Object.keys(router.query) as any as string);
  const { data: storiesData = [], isLoading } = useStories();
  const uniqueGenresSet = new Set(storyData?.genres);
  const uniqueGenresArray = [...uniqueGenresSet];

  return (
    <>
      <Helmet>
        <title>{storyData?.title}</title>
        <meta name="description" content={storyData?.description} />
        {/* Các thẻ khác liên quan đến SEO */}
        <meta name="keywords" content="" />
        <meta name="author" content={storyData?.author} />
        {/* Các thẻ Open Graph */}
        <meta property="og:title" content={storyData?.title} />
        <meta property="og:description" content={storyData?.description} />
        <meta property="og:image" content={storyData?.imageUrl} />
        <meta property="og:url" content={window.location.href} />
        {/* Các thẻ Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={storyData?.title} />
        <meta name="twitter:description" content={storyData?.description} />
        <meta name="twitter:image" content={storyData?.imageUrl} />
      </Helmet>
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
              <span className="text-gray-400 inline-block w-[150px]">Total chapters: </span>
              {storyData ? (
                <span>{storyData.chapterContents.length} chapters</span>
              ) : (
                <SkeletonLoading width={'20%'} height={40} />
              )}
            </p>
            <p className="dark:text-white text-themeDark font-normal text-lg py-2 flex transition duration-500">
              <span className="text-gray-400 inline-block w-[150px]">Description: </span>
              <span className="inline-block w-[600px]">
                {storyData ? storyData.description : <SkeletonLoading width={'100%'} height={40} />}
              </span>
            </p>

            <p className="dark:text-white text-themeDark font-normal text-lg py-2 flex items-center transition duration-500">
              <span className="text-gray-400 inline-block w-[150px]">Author: </span>
              {storyData ? (
                <span>{storyData.author}</span>
              ) : (
                <SkeletonLoading width={'20%'} height={40} />
              )}
            </p>

            <p className="dark:text-white text-themeDark font-normal text-lg py-2 transition duration-500">
              <span className="text-gray-400 inline-block w-[150px]">Language: </span>
              {storyData ? 'Vietnamese' : <SkeletonLoading width={'20%'} height={40} />}
            </p>
            <p className="dark:text-white text-themeDark font-normal text-lg py-2 flex transition duration-500">
              <span className="text-gray-400 inline-block w-[150px]">Genre: </span>
              <span className="inline-block w-[600px]">
                {storyData ? uniqueGenresArray.map((item: any, index: number) => (
                   <>
                    {item}
                    {index === 0 && uniqueGenresArray.length === 1
                      ? '. '
                      : index !== uniqueGenresArray.length - 1
                      ? ', '
                      : '. '}
                   </>
                )) : <SkeletonLoading width={'100%'} height={40} />}
              </span>
            </p>
          </div>
          <div className="flex mt-6">{/* <WatchButton path={storyData.} text="Read" /> */}</div>
        </section>
        <Line style="top-10" />
        <section className="w-full mt-10 px-16 pb-10">
          <p className='mt-28 text-2xl font-bold'>Chapters: </p>
          <div className="w-full gap-16 flex flex-wrap mt-10">
            {storyData ? (
              <>
                {storyData.chapterContents.map((story, index) => {
                  return <p key={index}>Chương {index + 1}</p>;
                })}
              </>
            ) : (
              <div className="h-screen">
                <Loading />
              </div>
            )}
          </div>
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
    </>
  );
};

export default StoryDetailScreen;
