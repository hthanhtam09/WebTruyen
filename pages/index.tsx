import React, { useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import useStories from '@/hooks/useStories';
import useCountView from '@/hooks/useCountView';
import { useFirstMount } from './provider';
import InitialTransition from '@/components/PageTransition/InitialTransition';
import { fadeIn } from '@/lib/motion';
import dynamic from 'next/dynamic';

const Navbar = dynamic(() => import('@/components/Navbar').then((mod) => mod.default), {
  ssr: false,
});

const Footer = dynamic(() => import('@/components/Footer').then((mod) => mod.default), {
  ssr: false,
});

const Billboard = dynamic(() => import('@/components/Billboard').then((mod) => mod.default), {
  ssr: false,
});

const StoryAlbum = dynamic(() => import('@/components/StoryAlbum').then((mod) => mod.default), {
  ssr: false,
});

const Home = () => {
  const { data = [], isLoading, fetchData } = useStories();
  const storiesData = data.stories;
  const { countView } = useCountView();
  const { isFirstMount } = useFirstMount();

  const [hasScrolledHalfPage, setHasScrolledHalfPage] = useState(false);
  const [deviceName, setDeviceName] = useState('');
  const [page, setPage] = useState(1);
  const totalPages = data.totalPages;

  const handlePaginationChange = useCallback(
    (_: React.ChangeEvent<unknown>, value: number) => {
      setPage(value);
      fetchData(value - 1); // because db return 0 so - 1 to exactly result
    },
    [page],
  );

  useEffect(() => {
    const userAgent = navigator.userAgent;
    let deviceName;

    switch (true) {
      case /Android/i.test(userAgent):
        deviceName = 'Android';
        break;
      case /iPhone|iPad|iPod/i.test(userAgent):
        deviceName = 'iOS';
        break;
      case /Windows Phone/i.test(userAgent):
        deviceName = 'Windows Phone';
        break;
      case /Macintosh/i.test(userAgent):
        deviceName = 'Macintosh';
        break;
      case /Windows/i.test(userAgent):
        deviceName = 'Windows';
        break;
      case /Linux/i.test(userAgent):
        deviceName = 'Linux';
        break;
      default:
        deviceName = 'Unknown';
    }

    setDeviceName(deviceName);
  }, []);

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      const handleScroll = () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const halfPage = window.innerHeight / 2;

        if (!hasScrolledHalfPage && scrollTop >= halfPage) {
          setHasScrolledHalfPage(true);
          countView({ deviceName });
        }
      };

      window.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [hasScrolledHalfPage, deviceName]);

  return (
    <motion.main exit={{ opacity: 0 }} className="min-h-screen flex flex-col justify-between">
      <Helmet prioritizeSeoTags>
        <title>Trang chủ</title>
        <meta name="description" content="Trang chủ WebTruyen" />
        <meta name="keywords" content="WebTruyen, Home" />
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
      {isFirstMount ? (
        <InitialTransition />
      ) : (
        <>
          <Navbar />
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 5 }}
            className="hidden sm:block"
          >
            <Billboard />
          </motion.section>

          <motion.section
            variants={fadeIn('left', 'spring', 0.5, 0.75)}
            className="min-h-[80vh]"
            id="moveStories"
          >
            <StoryAlbum
              title={'Truyện full tập'}
              storiesData={storiesData}
              isLoading={isLoading}
              isPagination
              totalPages={totalPages}
              handlePaginationChange={handlePaginationChange}
              page={page}
            />
          </motion.section>
          <Footer />
        </>
      )}
    </motion.main>
  );
};

export default Home;
