import type { AppProps } from 'next/app';
import '../styles/globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ClientOnly from './ClientOnly';
import Script from 'next/script';

function App({ Component, pageProps: { ...pageProps } }: AppProps) {
  return (
    <ClientOnly>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4979943891567316"
        strategy="lazyOnload"
        crossOrigin="anonymous"
      />
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </ClientOnly>
  );
}

export default App;
