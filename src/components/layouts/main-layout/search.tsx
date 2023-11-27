import { cn, createUrl } from '@/lib/utils';
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

type SearchProps = {
  className?: string;
};

export function Search({ className }: SearchProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultValue = searchParams?.get('q')?.toString();

  const handleSearch = useDebouncedCallback((value: string) => {
    const newParams = new URLSearchParams();

    if (value) {
      newParams.set('q', value);
    } else {
      newParams.delete('q');
    }

    router.push(createUrl('/search/all', newParams));
  }, 500);

  return (
    <div className={cn('relative max-w-2xl mx-auto w-full', className)}>
      <form action="">
        <input
          type="search"
          className="block p-2.5 h-12 w-full z-20 text-sm text-gray-900 rounded-lg border-input  border focus:ring-1  focus:outline-none focus:ring-ring focus:border-primary"
          placeholder="Buscador de productos"
          defaultValue={defaultValue}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </form>
    </div>
  );
}
