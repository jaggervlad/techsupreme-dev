import { PropsWithChildren } from 'react';
import { Footer } from './footer';
import { Header } from './header';
import { Collection } from '@/lib/shopify/types';
import { CartProvider } from '@/contexts/cart-context';
import { ScrollToTopButton } from '@/components/scroll-to-top';
import { NextSeo, NextSeoProps } from 'next-seo';

interface MainLayoutProps extends PropsWithChildren {
  collections: Collection[];
  seo?: NextSeoProps;
}

export const MainLayout = ({ children, collections, seo }: MainLayoutProps) => {
  return (
    <CartProvider>
      <NextSeo {...seo} />
      <div className="flex bg-slate-100 flex-col min-h-screen">
        <Header collections={collections} />
        {children}
        <Footer />

        <ScrollToTopButton />
      </div>
    </CartProvider>
  );
};
