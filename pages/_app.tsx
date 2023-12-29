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
        id="Script1"
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
      />
      <Script
        id="Script2"
        dangerouslySetInnerHTML={{
          __html: `
               (adsbygoogle = window.adsbygoogle || []).push({
                   google_ad_client: "ca-pub-4979943891567316",
                   enable_page_level_ads: true
              });
                `,
        }}
      />
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </ClientOnly>
  );
}

export default App;
