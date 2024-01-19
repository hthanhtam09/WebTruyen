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
              <meta name="description" content="Phimhay" />
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
