import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useGetCollections } from '@/hooks/useGetCollections';
import { cn, createUrl } from '@/lib/utils';
import { ChevronDown, Loader2 } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Link from 'next/link';

export function ProductCollectionFilter() {
  const router = useRouter();
  const resCollections = useGetCollections();
  const defaultCollectionSelect = (router.query?.collection as string) || 'all';
  const searchParams = useSearchParams();
  const newSearchParams = new URLSearchParams(searchParams.toString());

  const handleClick = (url: string) => {
    router.replace(createUrl(url, newSearchParams), undefined, {
      scroll: false,
    });
  };

  return (
    <div className="p-4 border rounded-lg border-border-ligth">
      <h4 className="mb-3 text-lg font-medium">Categorías</h4>

      <div className="flex flex-col space-y-2">
        {resCollections.isLoading && (
          <div className="flex items-center justify-center h-44">
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
        )}

        {!resCollections.isLoading &&
          resCollections.collections.map((c, i) => {
            const collectionSlug = c.path.split('/')[2];
            const active = collectionSlug === defaultCollectionSelect;

            return (
              <Link
                key={i}
                href={`${createUrl(c.path, newSearchParams)}`}
                scroll={false}
                className={cn('hover:underline cursor-pointer', {
                  'underline font-medium': active,
                })}
              >
                {c.title}
              </Link>
            );
          })}
      </div>
    </div>
  );
}

// <DropdownMenu modal={false}>
//   <DropdownMenuTrigger asChild>
//     <Button className="items-center hidden gap-2 md:inline-flex">
//       Colección <ChevronDown className="w-4 h-4" />
//     </Button>
//   </DropdownMenuTrigger>
//   <DropdownMenuContent className="w-56" align="start">
//     <DropdownMenuRadioGroup value={defaultCollectionSelect}>
//       {resCollections.collections.map((c, i) => {
//         const collectionSlug = c.path.split('/')[2];
//         const active = collectionSlug === defaultCollectionSelect;

//         return (
//           <DropdownMenuRadioItem
//             key={i}
//             value={collectionSlug}
//             className={cn('hover:underline cursor-pointer', {
//               'underline font-medium': active,
//             })}
//             onSelect={() => handleClick(c.path)}
//           >
//             {c.title}
//           </DropdownMenuRadioItem>
//         );
//       })}
//     </DropdownMenuRadioGroup>
//   </DropdownMenuContent>
// </DropdownMenu>;

//  <Select
//    value={defaultCollectionSelect}
//    onValueChange={(v) => {
//      handleClick(v);
//    }}
//  >
//    <SelectTrigger className="w-full md:hidden">
//      <SelectValue placeholder="Filtrar por colección" />
//    </SelectTrigger>
//    <SelectContent>
//      <SelectGroup>
//        {resCollections.collections.map((c) => {
//          const collectionSlug = c.path.split('/')[2];

//          return (
//            <SelectItem value={collectionSlug} key={c.path}>
//              {c.title}
//            </SelectItem>
//          );
//        })}
//      </SelectGroup>
//    </SelectContent>
//  </Select>;
