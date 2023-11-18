import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { useGetCollections } from '@/hooks/useGetCollections';
import { sorting } from '@/lib/constants';
import { cn, createUrl } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCallback, useEffect, useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';

export function ProductHeaderFilters() {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center justify-between">
      <div className="flex flex-col md:flex-row gap-4 md:items-center">
        <span className="text-xl hidden md:block font-medium">Filtrar:</span>
        <CollectionsFilter />
        <PriceFilter />
      </div>

      <div>
        <SortByProducts />
      </div>
    </div>
  );
}

function PriceFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [min, setMin] = useState('');
  const [max, setMax] = useState('');

  const debouncedMin = useDebounce<string>(min, 500);
  const debouncedMax = useDebounce<string>(max, 500);

  const updateUrl = useCallback(() => {
    const newUrlSearchParams = new URLSearchParams(searchParams.toString());

    newUrlSearchParams.set('min', debouncedMin);
    newUrlSearchParams.set('max', debouncedMax);

    router.push(createUrl(pathname, newUrlSearchParams));
  }, [debouncedMin, debouncedMax, pathname, router, searchParams]);

  useEffect(() => {
    const newUrlSearchParams = new URLSearchParams(searchParams.toString());

    if (debouncedMin) {
      newUrlSearchParams.set('min', debouncedMin);
    }
  }, [debouncedMin]);

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant={'outline'}
          className="justify-between font-normal bg-white gap-2 items-center"
        >
          Precio <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-lg p-3" align="start">
        <div className="flex gap-4">
          <Input
            placeholder="S/ Desde"
            value={min}
            onChange={(e) => setMin(e.target.value)}
          />
          <Input
            placeholder="S/ Hasta"
            value={max}
            onChange={(e) => setMax(e.target.value)}
          />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function SortByProducts() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const sort = (router.query?.sort as string) || 'all';

  const handleClick = (slug: string) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());

    if (slug === 'all') {
      newSearchParams.delete('sort');
    } else {
      newSearchParams.set('sort', slug);
    }

    router.push(createUrl(pathname, newSearchParams), undefined, {
      scroll: false,
    });
  };
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="gap-2 w-full items-center hidden md:inline-flex">
            Ordernar por <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-full">
          {sorting.map((option) => {
            const active = option.slug === sort;

            return (
              <DropdownMenuItem
                key={option.slug}
                className={cn(
                  active && 'font-bold underline',
                  'hover:cursor-pointer hover:underline'
                )}
                onClick={() => handleClick(option.slug)}
              >
                {option.title}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>

      <Select
        value={sort}
        onValueChange={(v) => {
          handleClick(v);
        }}
      >
        <SelectTrigger className="w-full md:hidden">
          <SelectValue placeholder="Filtrar por colección" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {sorting.map((c) => {
              const collectionSlug = c.slug || 'all';

              return (
                <SelectItem
                  key={c.slug}
                  value={collectionSlug}
                  onChange={(e) => e.stopPropagation()}
                >
                  {c.title}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
}

function CollectionsFilter() {
  const router = useRouter();
  const resCollections = useGetCollections();
  const defaultCollectionSelect = (router.query?.collection as string) || 'all';
  const searchParams = useSearchParams();
  const newSearchParams = new URLSearchParams(searchParams.toString());

  const handleClick = (url: string) => {
    router.push(createUrl(url, newSearchParams));
  };

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button className="gap-2 items-center hidden md:inline-flex">
            Colección <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="start">
          <DropdownMenuRadioGroup value={defaultCollectionSelect}>
            {resCollections.collections.map((c) => {
              const collectionSlug = c.path.split('/')[2];
              const active = collectionSlug === defaultCollectionSelect;

              return (
                <DropdownMenuRadioItem
                  key={collectionSlug}
                  value={collectionSlug}
                  className={cn('hover:underline cursor-pointer', {
                    'underline font-medium': active,
                  })}
                  onSelect={() => handleClick(c.path)}
                >
                  {c.title}
                </DropdownMenuRadioItem>
              );
            })}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <Select
        value={defaultCollectionSelect}
        onValueChange={(v) => {
          handleClick(v);
        }}
      >
        <SelectTrigger className="w-full md:hidden">
          <SelectValue placeholder="Filtrar por colección" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {resCollections.collections.map((c) => {
              const collectionSlug = c.path.split('/')[2];

              return (
                <SelectItem value={collectionSlug} key={c.path}>
                  {c.title}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
}
