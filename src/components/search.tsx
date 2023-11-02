import { useEffect, useState } from 'react';

import { createUrl } from '@/lib/utils';
import { useRouter } from 'next/router';

import { useSearchParams } from 'next/navigation';
import { SearchIcon } from 'lucide-react';

export function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const newParams = new URLSearchParams(searchParams.toString());

        if (query) {
          newParams.set('q', query);
        } else {
          newParams.delete('q');
        }

        router.push(createUrl('/search', newParams));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [query, router, searchParams]);

  return (
    <div className="relative max-w-2xl mx-auto w-full">
      <input
        type="search"
        className="block p-2.5 h-12 w-full z-20 text-sm text-gray-900 rounded-r-lg border-input  border focus:ring-1  focus:outline-none focus:ring-primary focus:border-primary "
        placeholder="Buscador de productos"
        required
        value={searchParams?.get('q') || ''}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();

          const newParams = new URLSearchParams(searchParams.toString());

          if (query) {
            newParams.set('q', query);
          } else {
            newParams.delete('q');
          }

          router.push(createUrl('/search', newParams));
        }}
        className="absolute top-0 w-12 flex items-center justify-center right-0 p-2.5 h-full text-sm font-medium text-white bg-primary rounded-r-lg border border-primary hover:bg-primary/90 focus:ring-4 focus:outline-none focus:ring-blue-300"
        aria-label="Buscar productos"
      >
        <SearchIcon aria-hidden />
      </button>
    </div>
  );
}
