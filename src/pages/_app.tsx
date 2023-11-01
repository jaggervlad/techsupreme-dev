import '@/styles/globals.css';
import '@splidejs/react-splide/css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { CookiesProvider } from 'react-cookie';

import type { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';
import seoConfig from '../../next-seo.config';
import { Toaster } from 'sonner';
import { ThemeProvider } from '@/contexts/theme-provider';
export default function App({ Component, pageProps }: AppProps) {
  return (
    <CookiesProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        forcedTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        <DefaultSeo {...seoConfig} />
        <Toaster richColors duration={3000} />
        <Component {...pageProps} />
      </ThemeProvider>
    </CookiesProvider>
  );
}
