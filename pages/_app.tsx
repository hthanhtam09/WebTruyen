import type { AppProps } from 'next/app';
import '../styles/globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ClientOnly from './ClientOnly';
// import { useEffect } from 'react';
// import Script from 'next/script';

function App({ Component, pageProps: { ...pageProps } }: AppProps) {
  // useEffect(() => {
  //   (async () => {
  //     try {
  //       if ('serviceWorker' in navigator) {
  //         const registration1 = await navigator.serviceWorker.register('/sw1.js');
  //         console.log('Service Worker 1 registered with scope:', registration1.scope);

  //         const registration2 = await navigator.serviceWorker.register('/sw2.js');
  //         console.log('Service Worker 2 registered with scope:', registration2.scope);
  //       }
  //     } catch (error) {
  //       console.error('Service Worker registration failed:', error);
  //     }
  //   })();
  // }, []);

  return (
    <ClientOnly>
      {/* <Script data-cfasync="false" src="//thubanoa.com/1?z=6835935" /> */}
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </ClientOnly>
  );
}

export default App;
