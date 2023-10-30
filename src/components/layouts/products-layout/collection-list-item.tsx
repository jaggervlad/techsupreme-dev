import { Collection } from '@/lib/shopify/types';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface CollectionListItemProps {
  collection: Collection;
}

export function CollectionListItem({ collection }: CollectionListItemProps) {
  const pathname = usePathname();

  const active = pathname === collection.path;
  const DynamicTag = active ? 'p' : Link;

  return (
    <DynamicTag
      className={cn(
        'w-full text-sm underline-offset-4 hover:underline dark:hover:text-neutral-100',
        {
          'underline underline-offset-4': active,
        }
      )}
      key={collection.path}
      href={collection.path}
    >
      {collection.title}
    </DynamicTag>
  );
}
