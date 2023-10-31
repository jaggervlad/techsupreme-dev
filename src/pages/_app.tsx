import '@/styles/globals.css';
import '@splidejs/react-splide/css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { CookiesProvider } from 'react-cookie';

import type { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';
import seoConfig from '../../next-seo.config';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CookiesProvider>
      <DefaultSeo {...seoConfig} />
      <Component {...pageProps} />
    </CookiesProvider>
  );
}
