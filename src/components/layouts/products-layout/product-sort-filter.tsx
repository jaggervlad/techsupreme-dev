import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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

export function SortByProducts() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const sort = (router.query?.sort as string) || 'all';

  const handleClick = (slug: string) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());

    newSearchParams.set('sort', slug);

    router.replace(createUrl(pathname, newSearchParams), undefined, {
      scroll: false,
    });
  };
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={'outline'}
            className="items-center hidden gap-2 md:inline-flex"
          >
            Ordernar por <ChevronDown className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-full">
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
