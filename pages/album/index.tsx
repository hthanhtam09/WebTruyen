/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import { useRouter } from 'next/router';
import WatchButton from '@/components/WatchButton';
import Loading from '../loading';
import InfoModal from '@/components/InfoModal';
import useInfoModalStore from '@/hooks/useInfoModalStore';
import useMovie from '@/hooks/useMovie';

const MovieAlbumScreen = () => {
  const router = useRouter();
  const { data: movie, isLoading } = useMovie(
    router.query.slug ? (router.query.slug as string) : '',
  );

  const { isOpen, closeModal } = useInfoModalStore();
  
  return isLoading ? (
    <Loading />
  ) : (
    <>
      <div className="relative flex-col pt-32 px-4 md:px-16 py-6 flex items-start transition duration-500 bg-zinc-900 bg-opacity-90">
        <div
          style={{
            backgroundImage: `url(${movie?.movie.poster_url})`,
          }}
          className="absolute z-9 w-[45%] h-[80%] top-30 right-0 bg-cover bg-center shadow-[inset_-2px_-2px_15px_20px_#18181b] object-contain max-w-full max-h-full pointer-events-none"
       />
       

        <p className="text-white font-bold text-4xl z-10">
          {movie ? movie.movie.name : 'Đang cập nhật'}
          <span className="text-white font-bold text-2xl pl-2 z-10">
            ({movie ? movie.movie.origin_name : ''})
          </span>
        </p>

        <p className="text-white font-normal text-lg w-3/6 py-2 z-10">
          <span className="text-gray-400">Trạng thái: </span>
          {movie ? movie.movie.episode_current : 'Đang cập nhật'}
        </p>
        <p className="text-white font-normal text-lg w-3/6 py-2 z-10">
          <span className="text-gray-400">Mô tả: </span>
          {movie ? movie.movie.content : 'Đang cập nhật'}
        </p>
        <p className="text-white font-normal text-lg w-3/6 py-2 z-10">
          <span className="text-gray-400">Đạo diễn: </span>
          {movie
            ? movie.movie.director.map((item: any, index: number) => (
                <span key={index}>
                  {item}
                  {index !== movie.movie.director.length - 1 && ', '}
                </span>
              ))
            : 'Đang cập nhật'}
        </p>
        <p className="text-white font-normal text-lg w-3/6 py-2 z-10">
          <span className="text-gray-400">Diễn viên: </span>
          {movie
            ? movie.movie.actor.map((item: any, index: number) => (
                <span key={index}>
                  {item}
                  {index !== movie.movie.actor.length - 1 && ', '}
                </span>
              ))
            : 'Đang cập nhật'}
        </p>
        <p className="text-white font-normal text-lg w-3/6 py-2 z-10">
          <span className="text-gray-400">Năm phát hành: </span>
          {movie ? movie.movie.year : 'Đang cập nhật'}
        </p>
        <p className="text-white font-normal text-lg w-3/6 py-2 z-10">
          <span className="text-gray-400">Ngôn ngữ: </span>
          {movie ? movie.movie.lang : 'Đang cập nhật'}
        </p>
        <p className="text-white font-normal text-lg w-3/6 py-2 z-10">
          <span className="text-gray-400">Chất lượng: </span>
          {movie ? movie.movie.quality : 'Đang cập nhật'}
        </p>
        <p className="text-white font-normal text-lg w-3/6 py-2 z-10">
          <span className="text-gray-400">Thời gian: </span>
          {movie ? movie.movie.time : 'Đang cập nhật'}
        </p>
        <p className="text-white font-normal text-lg w-3/6 py-2 z-10">
          <span className="text-gray-400">Thể loại: </span>
          {movie ? movie.movie.type : 'Đang cập nhật'}
        </p>
        <p className="text-white font-normal text-lg w-3/6 py-2 z-10">
          <span className="text-gray-400">Quốc gia: </span>
          {movie
            ? movie.movie.country.map((item: any, index: number) => (
                <span key={index}>
                  {item.name}
                  {index !== movie.movie.country.length - 1 && ', '}
                </span>
              ))
            : 'Đang cập nhật'}
        </p>
        <div className="mt-6">
          <WatchButton path={movie?.movie.trailer_url} text="Trailer" />
        </div>
      </div>
      <div className="w-full h-[1px] bg-gray-300 mt-10" />
      <p className="text-white font-bold text-xl px-16 pt-12">Xem phim: </p>
      <div className="w-full flex flex-wrap mt-10 gap-16 px-16 pb-10">
        {movie?.episodes[0].server_data.map((link: any, index: number) => {
          return (
            <div key={index}>
              <img
                onClick={() => router.push(link.link_embed)}
                src={movie?.movie.poster_url}
                className="
                    cursor-pointer
                    object-cover
                    transition
                    duration
                    shadow-xl
                    rounded-md
                    group-hover:opacity-90
                    sm:group-hover:opacity-0
                    w-[15vw]
                    h-[20vw]
                    hover:opacity-70
                  "
                alt=""
              />
              <p className="text-white w-[15vw] pt-2">{link.filename}</p>
            </div>
          );
        })}
      </div>
      <InfoModal visible={isOpen} onClose={closeModal} />
    </>
  );
};

export default MovieAlbumScreen;
