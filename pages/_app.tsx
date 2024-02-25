import type { AppProps } from 'next/app';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import { useRouter } from 'next/router';

import { Toaster } from '@/components/ui/toaster';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ClientOnly from './ClientOnly.mjs';

import '../styles/globals.css';
import { useEffect } from 'react';

function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('Service Worker registration successful:', registration.scope);
        })
        .catch((error) => {
          console.log('Service Worker registration failed:', error);
        });
    }
  }, []);

  return (
    <ClientOnly>
      <HelmetProvider>
        <SessionProvider session={session}>
          <ThemeProvider attribute="class" defaultTheme="dark">
            <Helmet titleTemplate="WebTruyen - %s" defaultTitle="WebTruyen">
              <meta
                name="description"
                content="Khám phá thế giới truyện tuyệt vời tại WebTruyen - Nơi quy tụ hàng nghìn bộ truyện đa dạng và độc đáo. Tận hưởng trải nghiệm xem truyện tuyệt vời nhờ vào thư viện đa dạng của chúng tôi, nơi mỗi bộ truyện là một hành trình đặc sắc đầy ấn tượng. Hãy thưởng thức niềm đam mê điện ảnh tại WebTruyen, nơi mang đến cho bạn trải nghiệm xem truyện đỉnh cao và đa chiều."
              />
              <link rel="shortcut icon" href="/images/favicon.ico" />
              <script src="https://upskittyan.com/pfe/current/tag.min.js?z=7136700" data-cfasync="false" async></script>
              <script src="https://upkoffingr.com/pfe/current/tag.min.js?z=7136739" data-cfasync="false" async></script>
            </Helmet>
            {router.pathname !== '/auth' && <Navbar />}
            <Component {...pageProps} />
            {router.pathname !== '/auth' && <Footer />}
            <Toaster />
          </ThemeProvider>
        </SessionProvider>
      </HelmetProvider>
    </ClientOnly>
  );
}

export default App;
