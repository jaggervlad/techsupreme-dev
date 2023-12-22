import { ChevronDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';

import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useDebouncedCallback } from 'use-debounce';
import { createUrl } from '@/lib/utils';

export function ProductsPriceFilter() {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const defaultMin = searchParams.get('min')?.toString();
  const defaultMax = searchParams.get('max')?.toString();

  const handleChange = useDebouncedCallback((value: string, key: string) => {
    const params = new URLSearchParams(searchParams);

    params.set(key, value);

    replace(createUrl(pathname, params), undefined, { scroll: false });
  }, 300);

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant={'outline'}
          className="justify-between bg-white gap-2 items-center"
        >
          Precio <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-lg p-3" align="start">
        <div className="flex gap-4">
          <Input
            placeholder="S/ Desde"
            defaultValue={defaultMin}
            onChange={(e) => {
              handleChange(e.target.value, 'min');
            }}
          />
          <Input
            placeholder="S/ Hasta"
            defaultValue={defaultMax}
            onChange={(e) => {
              handleChange(e.target.value, 'max');
            }}
          />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
