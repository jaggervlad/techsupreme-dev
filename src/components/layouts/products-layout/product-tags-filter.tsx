import { useGetCollections } from '@/hooks/useGetCollections';
import { cn, createUrl } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/router';

import Link from 'next/link';
import { useGetTags } from '@/hooks/useGetTags';
import { usePathname } from 'next/navigation';

export function ProductTagsFilter() {
  const router = useRouter();
  const resTags = useGetTags();
  const defaultTag = router.query.tag;
  const newSearchParams = new URLSearchParams();
  const pathname = usePathname();

  return (
    <div className="p-4 border rounded-lg border-gray-light">
      <h4 className="mb-3 text-lg font-medium font-montserrat-semibold">
        Etiquetas
      </h4>

      <div className="flex flex-col items-start space-y-2">
        {resTags.isLoading && (
          <div className="flex items-center justify-center h-44">
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
        )}

        {!resTags.isLoading &&
          resTags.tags.map((t, i) => {
            const active = defaultTag === t;

            return (
              <Link
                key={i}
                href={`${createUrl(`/search?tag=${t}`, new URLSearchParams())}`}
                className={cn(
                  'after:contet-[""] capitilize inline-block after:w-0 after:h-[1px] after:block after:bg-black after:duration-300 hover:after:w-full transition-all duration-500 ease-in font-montserrat-regular cursor-pointer',
                  {
                    'font-montserrat-semibold font-medium after:w-full': active,
                  }
                )}
              >
                {t}
              </Link>
            );
          })}
      </div>
    </div>
  );
}
