import Link from 'next/link';

import { CartSheet } from '@/components/layouts/main-layout/cart-sheet';
import { Search } from './search';

import { MobileNav } from './mobile-nav';
import { useGetMenu } from '@/hooks/useGetMenu';
import { WishList } from './whish-list';
import { SecondaryHeader } from './secondary-header';

export function Header() {
  const { menu } = useGetMenu('main-menu');

  return (
    <>
      <header className="">
        <nav>
          <div className="container flex items-center justify-between h-24 py-4 overflow-hidden">
            <Link
              href="/"
              aria-label="TechSupreme Logo"
              className="flex-shrink-0"
            >
              <h1 className="text-2xl font-bold tracking-wide uppercase md:w-60 md:text-4xl">
                Tech<span className="text-blue-600">Supreme</span>
              </h1>
            </Link>

            <div className="flex-grow hidden md:block">
              <Search />
            </div>

            <div className="flex items-center md:ml-auto">
              <WishList />
              <CartSheet />
            </div>
          </div>

          <SecondaryHeader menu={menu} />
        </nav>
      </header>
    </>
  );
}
