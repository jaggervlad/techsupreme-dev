import { PropsWithChildren } from 'react';
import { Footer } from './footer';
import { Header } from './header';
import { CartProvider } from '@/contexts/cart-context';
import { NextSeo, NextSeoProps } from 'next-seo';

interface MainLayoutProps extends PropsWithChildren {
  seo?: NextSeoProps;
}

export const MainLayout = ({ children, seo }: MainLayoutProps) => {
  return (
    <CartProvider>
      <NextSeo {...seo} />
      <div className="flex flex-col min-h-screen">
        <Header />
        {children}
        <Footer />
      </div>
    </CartProvider>
  );
};
