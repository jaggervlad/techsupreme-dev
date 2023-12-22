import { useGetCollections } from '@/hooks/useGetCollections';
import { cn, createUrl } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/router';

import Link from 'next/link';

export function ProductCollectionFilter() {
  const router = useRouter();
  const resCollections = useGetCollections();
  const defaultCollectionSelect = (router.query?.collection as string) || '';
  const newSearchParams = new URLSearchParams();

  return (
    <div className="p-4 border rounded-lg border-gray-light">
      <h4 className="mb-3 text-lg font-medium font-montserrat-semibold">
        Categorías
      </h4>

      <div className="flex flex-col items-start space-y-2">
        {resCollections.isLoading && (
          <div className="flex items-center justify-center h-44">
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
        )}

        {!resCollections.isLoading &&
          resCollections.collections.map((c, i) => {
            const collectionSlug = c.path.split('/')[2] ?? '';
            const active = collectionSlug === defaultCollectionSelect;

            return (
              <Link
                key={i}
                href={`${createUrl(c.path, newSearchParams)}`}
                className={cn(
                  'after:contet-[""] inline-block after:w-0 after:h-[1px] after:block after:bg-black after:duration-300 hover:after:w-full transition-all duration-500 ease-in font-montserrat-regular cursor-pointer',
                  {
                    'font-montserrat-semibold font-medium after:w-full': active,
                  }
                )}
              >
                {c.title}
              </Link>
            );
          })}
      </div>
    </div>
  );
}
