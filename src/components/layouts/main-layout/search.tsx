import { cn, createUrl } from '@/lib/utils';
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
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
      className={cn(
        'relative font-montserrat-regular flex max-w-md mx-auto w-full',
        className
      )}
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const searchValue = formData.get('search');
        handleSearch(searchValue as string);
      }}
    >
      <div>
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <SearchIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
        </div>
        <input
          name="search"
          id="search"
          type="text"
          defaultValue={defaultValue}
          className="block w-[450px] active:outline-none focus-visible:outline-none rounded-md  h-12 py-1.5 pl-10 text-gray-900  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
          placeholder="Buscar productos..."
        />
      </div>
    </form>
  );
}
