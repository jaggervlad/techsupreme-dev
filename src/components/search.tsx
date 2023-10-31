import { useEffect, useState } from 'react';

import { createUrl } from '@/lib/utils';
import { useRouter } from 'next/router';

import { useSearchParams } from 'next/navigation';

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
        id="search-products"
        className="block p-2.5 h-12 w-full z-20 text-sm text-gray-900 rounded-r-lg border-input  border focus:ring-1  focus:outline-none focus:ring-primary focus:border-primary "
        placeholder="Buscador de productos"
        required
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
      >
        <svg
          className="w-4 h-4"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
      </button>
    </div>
  );
}
