import { Suspense } from 'react';
import { useRouter } from 'next/router';
import { Autoplay, EffectFade } from 'swiper/modules';
import { SwiperSlide, Swiper as SwiperContainer } from 'swiper/react';
import { Helmet } from 'react-helmet-async';

import WatchButton from '@/components/WatchButton';
import Line from '@/components/Line';
import MovieList from '@/components/MovieList';
import MovieCard from '@/components/MovieCard';
import useMoviesDetail from '@/hooks/useMovieDetail';
import { handleRemoveTagHtml } from '@/utils/utils';
import Loading from '@/pages/loading';
import SkeletonLoading from '@/components/Skeleton';
import useMovie from '@/hooks/useMovie';
import { MovieDetailInterface } from '@/types';

import 'swiper/css';
import 'swiper/css/pagination';
import Comment from '@/components/Comment';

const MovieAlbumScreen = () => {
  const router = useRouter();

  const { data: movie } = useMoviesDetail(Object.keys(router.query) as any as string);
  const { data: moviesRelatedData = [] } = useMovie();

  return (
    <>
      <Helmet>
        <title>{movie?.movie.name}</title>
      </Helmet>
      <Suspense fallback={<Loading />}>
        <section className="relative flex-col pt-32 px-4 md:px-16 py-6 flex items-start dark:bg-themeDark bg-themeLight bg-opacity-90 transition duration-500">
          {movie ? (
            <div
              style={{
                backgroundImage: `url(${movie?.movie.poster_url})`,
              }}
              className="absolute z-9 w-[45%] h-[80%] top-30 right-0 bg-cover bg-center shadow-[inset_-2px_-2px_15px_20px_#18181b] object-contain max-w-full max-h-full pointer-events-none"
            />
          ) : (
            <SkeletonLoading width="42%" height="115%" style="absolute -top-14 right-10" />
          )}

          <div className="w-[50%] z-10">
            {movie ? (
              <p className="dark:text-white text-themeDark font-bold text-4xl transition duration-500">
                {movie.movie.name}
                <span className="dark:text-white text-themeDark font-bold text-2xl pl-2 transition duration-500">
                  ({movie.movie.origin_name})
                </span>
              </p>
            ) : (
              <SkeletonLoading width={'80%'} height={40} />
            )}

            <p className="dark:text-white text-themeDark font-normal text-lg py-2 transition duration-500">
              <span className="text-gray-400 inline-block w-[150px]">Status: </span>
              {movie ? movie.movie.episode_current : <SkeletonLoading width={'20%'} height={40} />}
            </p>

            <p className="dark:text-white text-themeDark font-normal text-lg py-2 flex items-center transition duration-500">
              <span className="text-gray-400 inline-block w-[150px]">Description: </span>
              <span className="inline-block w-[600px]">
                {movie ? (
                  handleRemoveTagHtml(movie.movie.content)
                ) : (
                  <SkeletonLoading width={'100%'} height={40} />
                )}
              </span>
            </p>

            <p className="dark:text-white text-themeDark font-normal text-lg py-2 flex items-center transition duration-500">
              <span className="text-gray-400 inline-block w-[150px]">Director: </span>
              {movie ? (
                movie.movie.director.map((item: any, index: number) => (
                  <span key={index}>
                    {item}
                    {index === 0 && movie.movie.director.length === 1
                      ? '. '
                      : index !== movie.movie.director.length - 1
                      ? ', '
                      : '. '}
                  </span>
                ))
              ) : (
                <SkeletonLoading width={'20%'} height={40} />
              )}
            </p>

            <p className="dark:text-white text-themeDark font-normal text-lg py-2 flex items-center transition duration-500">
              <span className="text-gray-400 inline-block w-[150px]">Actor: </span>
              <span className="inline-block w-[600px]">
                {movie ? (
                  movie.movie.actor.map((item: any, index: number) => (
                    <span key={index}>
                      {item}
                      {index === 0 && movie.movie.actor.length === 1
                        ? '. '
                        : index !== movie.movie.actor.length - 1
                        ? ', '
                        : '. '}
                    </span>
                  ))
                ) : (
                  <SkeletonLoading width={'100%'} height={40} />
                )}
              </span>
            </p>

            <p className="dark:text-white text-themeDark font-normal text-lg py-2 transition duration-500">
              <span className="text-gray-400 inline-block w-[150px]">Year: </span>
              {movie ? movie.movie.year : <SkeletonLoading width={'20%'} height={40} />}
            </p>

            <p className="dark:text-white text-themeDark font-normal text-lg py-2 transition duration-500">
              <span className="text-gray-400 inline-block w-[150px]">Language: </span>
              {movie ? movie.movie.lang : <SkeletonLoading width={'20%'} height={40} />}
            </p>

            <p className="dark:text-white text-themeDark font-normal text-lg py-2 transition duration-500">
              <span className="text-gray-400 inline-block w-[150px]">Quality: </span>
              {movie ? movie.movie.quality : <SkeletonLoading width={'20%'} height={40} />}
            </p>

            <p className="dark:text-white text-themeDark font-normal text-lg py-2 transition duration-500">
              <span className="text-gray-400 inline-block w-[150px]">Time: </span>
              {movie ? movie.movie.time : <SkeletonLoading width={'20%'} height={40} />}
            </p>

            <p className="dark:text-white text-themeDark font-normal text-lg py-2 transition duration-500">
              <span className="text-gray-400 inline-block w-[150px]">Genre: </span>
              {movie ? movie.movie.type : <SkeletonLoading width={'20%'} height={40} />}
            </p>

            <p className="dark:text-white text-themeDark font-normal text-lg py-2 transition duration-500">
              <span className="text-gray-400 inline-block w-[150px]">Country: </span>
              {movie ? (
                movie.movie.country.map((item: any, index: number) => (
                  <span key={index}>
                    {item.name}
                    {index !== movie.movie.country.length - 1 && ', '}
                  </span>
                ))
              ) : (
                <SkeletonLoading width={'20%'} height={40} />
              )}
            </p>
          </div>
          <div className="flex mt-6">
            <WatchButton path={movie?.episodes[0].server_data[0].link_embed} text="Watch" />
            <WatchButton style="ml-4" path={movie?.movie.trailer_url} text="Trailer" />
          </div>
        </section>
        <Line style="top-10" />
        <section className="w-full flex flex-wrap mt-10 gap-16 px-16 pb-10">
          {movie ? (
            <MovieList
              title="Episodes: "
              data={movie.episodes[0].server_data}
              posterDetailUrl={movie.movie.poster_url}
              style="mt-10 mb-20"
              isMovieDetail
            />
          ) : (
            <div className="h-screen">
              <Loading />
            </div>
          )}
        </section>
      </Suspense>
      <Line />
      <Suspense fallback={<Loading />}>
        <Comment movieId={movie?.movie._id} />
      </Suspense>
      <Line />
      <Suspense fallback={<Loading />}>
        <section className="w-full h-[40vh] mt-20 gap-16 px-16 mb-20">
          <p className="dark:text-white text-themeDark text-2xl font-bold transition duration-500">
            Related Movies:
          </p>
          {moviesRelatedData.length > 0 ? (
            <SwiperContainer
              loop
              autoplay={{ delay: 3000 }}
              slidesPerView={5}
              spaceBetween={30}
              modules={[Autoplay, EffectFade]}
              touchEventsTarget="wrapper"
              className="mySwiper"
            >
              {moviesRelatedData.map((movie: MovieDetailInterface, index: number) => (
                <SwiperSlide key={index}>
                  <MovieCard data={movie} />
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

export default MovieAlbumScreen;
