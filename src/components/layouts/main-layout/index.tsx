import { PropsWithChildren } from 'react';
import { Footer } from './footer';
import { Header } from './header';
import { Collection } from '@/lib/shopify/types';
import { CartProvider } from '@/contexts/cart-context';
import { ScrollToTopButton } from '@/components/scroll-to-top';

interface MainLayoutProps extends PropsWithChildren {
  collections: Collection[];
}

export const MainLayout = ({ children, collections }: MainLayoutProps) => {
  return (
    <CartProvider>
      <div className="flex bg-slate-50 flex-col min-h-screen">
        <Header collections={collections} />
        {children}
        <Footer />

        <ScrollToTopButton />
      </div>
    </CartProvider>
  );
};
