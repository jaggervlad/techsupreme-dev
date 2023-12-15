import Link from 'next/link';

import { CartSheet } from '@/components/layouts/main-layout/cart-sheet';
import { Search } from './search';

import { MobileNav } from './mobile-nav';
import { useGetMenu } from '@/hooks/useGetMenu';
import { WishList } from './whish-list';
import { SecondaryHeader } from './secondary-header';
import { CategoriesSelector } from './categories-selector';
import { Button } from '@/components/ui/button';
import { SearchIcon } from 'lucide-react';

export function Header() {
  const { menu } = useGetMenu('main-menu');

  return (
    <>
      <header className="">
        <nav>
          <div className="max-w-[1400px] mx-auto w-full flex items-center px-4 justify-between md:h-24 py-3 md:py-4 overflow-hidden">
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

            <div className="flex items-center gap-1 md:ml-auto">
              <Button size="icon" variant="circle" className="md:hidden">
                <SearchIcon className="w-5 h-5" />
              </Button>
              <WishList />
              <CartSheet />
            </div>
          </div>

          <div className="lg:hidden">
            <CategoriesSelector
              className="w-full "
              contentClassName="w-[100vw] border-none rounded-none"
            />
          </div>

          <SecondaryHeader menu={menu} />
        </nav>
      </header>
    </>
  );
}
