import { useCallback, useEffect, useState } from 'react';
import { cn, createUrl } from '@/lib/utils';
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';
import { SearchIcon } from 'lucide-react';

type SearchProps = {
  className?: string;
  withButton?: boolean;
};

export function Search({ className, withButton = true }: SearchProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams?.get('q') || '');

  const handleSearch = useCallback(() => {
    const newParams = new URLSearchParams(searchParams.toString());
    if (query) {
      newParams.set('q', query);
    } else {
      newParams.delete('q');
    }

    router.push(createUrl('/search/all', newParams));
  }, [query, router, searchParams]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSearch();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleSearch]);

  return (
    <div className={cn('relative max-w-2xl mx-auto w-full', className)}>
      <input
        type="search"
        className="block p-2.5 h-12 w-full z-20 text-sm text-gray-900 rounded-lg border-input  border focus:ring-1  focus:outline-none focus:ring-ring focus:border-primary"
        placeholder="Buscador de productos"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {withButton && (
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          className="absolute top-0 w-12 flex items-center justify-center right-0 p-2.5 h-full text-sm font-medium text-white bg-primary rounded-r-lg border border-primary hover:bg-primary/90 focus:ring-4 focus:outline-none focus:ring-blue-300"
          aria-label="Buscar productos"
        >
          <SearchIcon aria-hidden />
        </button>
      )}
    </div>
  );
}
