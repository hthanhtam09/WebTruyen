import React, { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Helmet } from 'react-helmet-async';

import Search from '@/components/Search';
import Loading from '@/pages/loading';
import useSearchStories from '@/hooks/useSearchStories';
import StoryAlbum from '@/components/StoryAlbum';

const StoriesSearch = () => {
  const router = useRouter();
  const keyWordSearch = router.query.keyword ? router.query.keyword.toString() : '';
  const { data: storiesData = [], isLoading, fetchData } = useSearchStories(keyWordSearch);
  const totalPages = storiesData.totalPages;

  const [page, setPage] = useState(1);
  const [isShowSearch, setIsShowSearch] = useState<boolean>(false);

  const handlePaginationChange = useCallback(
    (_: React.ChangeEvent<unknown>, value: number) => {
      setPage(value);
      fetchData(value - 1); // because db return 0 so - 1 to exactly result
    },
    [page],
  );

  const isOpenSearch = useCallback(() => {
    setIsShowSearch((prev) => !prev);
  }, []);

  const navigateHomeScreen = useCallback(() => {
    router.push('/');
  }, [router]);

  return (
    <main className='min-h-screen flex flex-col justify-between'>
      <Helmet prioritizeSeoTags>
        <title>Tìm kiếm</title>
        <meta name="description" content="Tìm kiếm WebTruyen" />
        <meta name="keywords" content="WebTruyen, tìm kiếm" />
        <meta name="author" content="WebTruyen" />
        <meta property="og:title" content="WebTruyen" />
        <meta
          property="og:description"
          content="Khám phá thế giới truyện tuyệt vời tại WebTruyen - Nơi quy tụ hàng nghìn bộ truyện đa dạng và độc đáo. Tận hưởng trải nghiệm xem truyện tuyệt vời nhờ vào thư viện đa dạng của chúng tôi, nơi mỗi bộ truyện là một hành trình đặc sắc đầy ấn tượng. Hãy thưởng thức niềm đam mê điện ảnh tại WebTruyen, nơi mang đến cho bạn trải nghiệm xem truyện đỉnh cao và đa chiều."
        />
        <meta property="og:image" content="WebTruyen" />
        <meta property="og:url" content="WebTruyen" />
        <meta name="twitter:card" content="WebTruyen" />
        <meta name="twitter:title" content="WebTruyen" />
        <meta
          name="twitter:description"
          content="Khám phá thế giới truyện tuyệt vời tại WebTruyen - Nơi quy tụ hàng nghìn bộ truyện đa dạng và độc đáo. Tận hưởng trải nghiệm xem truyện tuyệt vời nhờ vào thư viện đa dạng của chúng tôi, nơi mỗi bộ truyện là một hành trình đặc sắc đầy ấn tượng. Hãy thưởng thức niềm đam mê điện ảnh tại WebTruyen, nơi mang đến cho bạn trải nghiệm xem truyện đỉnh cao và đa chiều."
        />
        <meta name="twitter:image" content="WebTruyen" />
      </Helmet>
      <div className="dark:bg-black bg-themeLight min-h-[80vh] flex flex-col">
        {!isLoading ? (
          storiesData.stories.length > 0 ? (
              <StoryAlbum
                title={'Danh sách tìm kiếm'}
                storiesData={storiesData.stories}
                isLoading={isLoading}
                isPagination
                totalPages={totalPages}
                handlePaginationChange={handlePaginationChange}
                page={page}
              />
          ) : (
            <div className="absolute top-[45%] md:top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white dark:bg-black shadow-xl border rounded-xl p-8 w-[80vw] md:max-w-sm mx-auto">
              <>
                <p className="dark:text-white text-themeDark text-2xl font-bold text-center transition duration-500">
                  Không tìm thấy kết quả cho: {keyWordSearch}
                </p>
                <p className="dark:text-white text-themeDark text-xl mt-2 text-center transition duration-500">
                  Vui lòng trở về trang chủ hoặc tìm kiếm truyện khác.
                </p>
                <p className="dark:text-white text-themeDark text-xl mt-2 text-center transition duration-500">
                  Cảm ơn!!!
                </p>
              </>
              <Image
                src={'/images/gif/not-found.gif'}
                alt="GIF"
                width={200}
                height={200}
                style={{ width: 'auto', height: 'auto', display: 'block', margin: '0 auto' }}
                priority={true}
              />
              <div className="flex justify-between items-center">
                <div
                  className="relative inline-flex mt-4 cursor-pointer w-30"
                  onClick={navigateHomeScreen}
                >
                  <div className="absolute transitiona-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1" />
                  <div className="!mx-auto py-4 text-lg font-bold transition-all duration-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 z-10">
                    <span className="dark:text-white text-themeDark capitalize transition duration-500">
                      Trang chủ
                    </span>
                  </div>
                </div>
                <div
                  className="relative inline-flex mt-4 cursor-pointer w-30"
                  onClick={isOpenSearch}
                >
                  <div className="absolute transitiona-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1" />
                  <div className="!mx-auto py-4 text-lg font-bold transition-all duration-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 z-10">
                    <span className="dark:text-white text-themeDark capitalize transition duration-500">
                      Tìm kiếm
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )
        ) : (
          <div className="h-[100vh]">
            <Loading />
          </div>
        )}

        {isShowSearch && <Search isOpenSearch={isOpenSearch} />}
      </div>
    </main>
  );
};

export default StoriesSearch;
