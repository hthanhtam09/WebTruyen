import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';

import StoryAlbum from '@/components/StoryAlbum';
import useStories from '@/hooks/useStories';
import Line from '@/components/Line';
import useCountView from '@/hooks/useCountView';
import { classifyStoriesByLabel } from '@/utils/utils';

const Home = () => {
  const { data: storiesData = [], isLoading } = useStories();
  const { countView } = useCountView();
  const newStories = [...new Set(classifyStoriesByLabel(storiesData).new)]
  const hotStories = [...new Set(classifyStoriesByLabel(storiesData).hot)]
  const fullStories = [...new Set(classifyStoriesByLabel(storiesData).full)]

  const [hasScrolledHalfPage, setHasScrolledHalfPage] = useState(false);
  const [deviceName, setDeviceName] = useState('');

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
    <>
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
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="WebTruyen" />
        <meta
          name="twitter:description"
          content="Khám phá thế giới truyện tuyệt vời tại WebTruyen - Nơi quy tụ hàng nghìn bộ truyện đa dạng và độc đáo. Tận hưởng trải nghiệm xem truyện tuyệt vời nhờ vào thư viện đa dạng của chúng tôi, nơi mỗi bộ truyện là một hành trình đặc sắc đầy ấn tượng. Hãy thưởng thức niềm đam mê điện ảnh tại WebTruyen, nơi mang đến cho bạn trải nghiệm xem truyện đỉnh cao và đa chiều."
        />
        <meta name="twitter:image" content="WebTruyen" />
      </Helmet>
      {/* <Billboard /> */}

      <section className="mt-16 h-[80vh]" id="moveStories">
        <StoryAlbum
          title={'Truyện mới cập nhật'}
          storiesData={newStories}
          isLoading={isLoading}
          itemsPerPage={6}
          isNavigate
        />
      </section>
      <Line />
      <section className="mt-6 h-[80vh]">
        <StoryAlbum
          title={'Truyện full tập'}
          storiesData={fullStories}
          isLoading={isLoading}
          itemsPerPage={6}
          isNavigate
        />
      </section>
      <section className="mt-6 h-[80vh]">
        <StoryAlbum
          title={'Truyện hot'}
          storiesData={hotStories}
          isLoading={isLoading}
          itemsPerPage={6}
          isNavigate
        />
      </section>
    </>
  );
};

export default Home;
