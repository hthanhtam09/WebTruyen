import type { AppProps } from 'next/app';
import '../styles/globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ClientOnly from './ClientOnly';
import Script from 'next/script';

function App({ Component, pageProps: { ...pageProps } }: AppProps) {

  return (
    <ClientOnly>
      <Script src='../sw.js' />
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </ClientOnly>
  );
}

export default App;
