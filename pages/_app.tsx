import type { AppProps } from 'next/app';
import { HelmetProvider, Helmet } from 'react-helmet-async';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ClientOnly from './ClientOnly';
import { ThemeProvider } from 'next-themes';

import '../styles/globals.css';

function App({ Component, pageProps: { ...pageProps } }: AppProps) {
  return (
    <ClientOnly>
      <HelmetProvider>
        <ThemeProvider attribute="class">
          <Helmet titleTemplate="Cineshin - %s" defaultTitle="Cineshin">
            <meta name="description" content="Phimhay" />
            <link rel="shortcut icon" href="/images/favicon.ico" />
          </Helmet>
          <Navbar />
          <Component {...pageProps} />
          <Footer />
        </ThemeProvider>
      </HelmetProvider>
    </ClientOnly>
  );
}

export default App;
