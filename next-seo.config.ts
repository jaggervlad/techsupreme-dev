import { DefaultSeoProps } from 'next-seo';

const seoConfig: DefaultSeoProps = {
  title: 'Bienvenido',
  titleTemplate: 'TechSupreme - %s',
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: 'https://techsupreme.store',
    siteName: 'TechSupreme Ecommerce Website',
  },
};

export default seoConfig;
