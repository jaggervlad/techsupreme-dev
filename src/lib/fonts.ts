import localFont from '@next/font/local';

export const NexaBold = localFont({
  src: [
    {
      path: '../../public/fonts/nexa/nexa_bold-webfont.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/nexa/nexa_bold-webfont.woff',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-nexa-bold',
});
export const NexaLight = localFont({
  src: [
    {
      path: '../../public/fonts/nexa/nexa_light-webfont.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/nexa/nexa_light-webfont.woff',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-nexa-light',
});

// MONTSERRAT

export const MontserratBold = localFont({
  src: [
    {
      path: '../../public/fonts/montserrat/Montserrat-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/montserrat/Montserrat-Bold.woff',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-montserrat-bold',
});
export const MontserratSemiBold = localFont({
  src: [
    {
      path: '../../public/fonts/montserrat/Montserrat-SemiBold.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/montserrat/Montserrat-SemiBold.woff',
      weight: '500',
      style: 'normal',
    },
  ],
  variable: '--font-montserrat-semibold',
});

export const MontserratRegular = localFont({
  src: [
    {
      path: '../../public/fonts/montserrat/Montserrat-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/montserrat/Montserrat-Regular.woff',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-montserrat-regular',
});
