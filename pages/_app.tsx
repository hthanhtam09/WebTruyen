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
            <Helmet titleTemplate="TruyenHayNhat - %s" defaultTitle="TruyenHayNhat">
              <meta
                name="description"
                content="Khám phá thế giới truyện tuyệt vời tại TruyenHayNhat - Nơi tập trung hàng ngàn câu chuyện đặc sắc và đa dạng. Với TruyenHayNhat, bạn sẽ được thưởng thức những câu chuyện full chữ hấp dẫn nhất, từ tiểu thuyết đến truyện ngắn, mà không phải lựa chọn giữa hàng ngàn truyện tranh. Duyệt qua thư viện truyện đồ sộ của chúng tôi, mỗi câu chuyện là một hành trình mới đầy kỳ diệu và ghi điểm sâu sắc. Hãy đồng hành cùng TruyenHayNhat, nơi mang đến cho bạn trải nghiệm đọc truyện tốt nhất."
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
