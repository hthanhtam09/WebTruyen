import type { AppProps } from 'next/app';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { SessionProvider } from 'next-auth/react';

import { Toaster } from '@/components/ui/toaster';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ClientOnly from './ClientOnly';
import { ThemeProvider } from 'next-themes';

import '../styles/globals.css';
import { useRouter } from 'next/router';

function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const router = useRouter();

  return (
    <ClientOnly>
      <HelmetProvider>
        <SessionProvider session={session}>
          <ThemeProvider attribute="class">
            <Helmet titleTemplate="Cineshin - %s" defaultTitle="Cineshin">
              <meta
                name="description"
                content="Khám phá thế giới phim tuyệt vời tại Cineshin - Nơi quy tụ hàng nghìn bộ phim đa dạng và độc đáo. Với Cineshin, bạn sẽ đắm chìm trong không gian giải trí độc đáo với những tác phẩm điện ảnh đỉnh cao từ mọi thể loại. Tận hưởng trải nghiệm xem phim tuyệt vời nhờ vào thư viện đa dạng của chúng tôi, nơi mỗi bộ phim là một hành trình đặc sắc đầy ấn tượng. Hãy thưởng thức niềm đam mê điện ảnh tại Cineshin, nơi mang đến cho bạn trải nghiệm xem phim đỉnh cao và đa chiều."
              />
              <link rel="shortcut icon" href="/images/favicon.ico" />
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
