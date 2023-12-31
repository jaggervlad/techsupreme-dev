import '@/styles/globals.css';
import '@/styles/nprogress.css';
import '@splidejs/react-splide/css';

import { CookiesProvider } from 'react-cookie';
import { Toaster } from 'sonner';
import { DefaultSeo } from 'next-seo';

import { ThemeProvider } from '@/contexts/theme-provider';
import { WishListProvider } from '@/contexts/wishlist-context';
import {
  MontserratBold,
  MontserratRegular,
  MontserratSemiBold,
  NexaBold,
  NexaLight,
} from '@/lib/fonts';
import Progress from '@/components/progress';

import seoConfig from '../../next-seo.config';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CookiesProvider>
      <style jsx global>
        {`
          :root {
            --font-nexa-bold: ${NexaBold.style.fontFamily};
            --font-nexa-light: ${NexaLight.style.fontFamily};

            --font-montserrat-bold: ${MontserratBold.style.fontFamily};
            --font-montserrat-regular: ${MontserratRegular.style.fontFamily};
            --font-montserrat-semibold: ${MontserratSemiBold.style.fontFamily};
          }
        `}
      </style>

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

      <Progress />
    </CookiesProvider>
  );
}
