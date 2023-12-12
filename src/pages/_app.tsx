import '@/styles/globals.css';
import '@splidejs/react-splide/css';

import { CookiesProvider } from 'react-cookie';

import type { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';
import seoConfig from '../../next-seo.config';
import { Toaster } from 'sonner';
import { ThemeProvider } from '@/contexts/theme-provider';
import { WishListProvider } from '@/contexts/wishlist-context';
export default function App({ Component, pageProps }: AppProps) {
  return (
    <CookiesProvider>
      <DefaultSeo {...seoConfig} />
      <Toaster richColors duration={3000} />

      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        forcedTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        <WishListProvider>
          <Component {...pageProps} />
        </WishListProvider>
      </ThemeProvider>
    </CookiesProvider>
  );
}
