import { cn, createUrl } from '@/lib/utils';
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { Button } from '@/components/ui/button';
import { SearchIcon } from 'lucide-react';

type SearchProps = {
  className?: string;
};

export function Search({ className }: SearchProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultValue = searchParams?.get('q')?.toString();

  const handleSearch = useDebouncedCallback((value?: string) => {
    const newParams = new URLSearchParams();

    if (value) {
      newParams.set('q', value);
    } else {
      newParams.delete('q');
    }

    router.push(createUrl('/search', newParams));
  }, 500);

  return (
    <form
      className={cn('relative flex max-w-md mx-auto w-full', className)}
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const searchValue = formData.get('searchProducts');
        handleSearch(searchValue as string);
      }}
    >
      <input
        className="block px-2 w-full rounded-r-none z-20 text-sm text-gray-900 rounded-lg border-input  border focus:ring-1  focus:outline-none focus:ring-ring focus:border-primary"
        placeholder="Buscador de productos"
        name="searchProducts"
        defaultValue={defaultValue}
      />
      <Button className="rounded-l-none">
        <SearchIcon />
      </Button>
    </form>
  );
}
