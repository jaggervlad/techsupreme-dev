import { Collection } from '@/lib/shopify/types';
import { CollectionListItem } from './collection-list-item';

export function CollectionSidebar({
  collections,
}: {
  collections: Collection[];
}) {
  return (
    <aside className="w-56">
      <h4 className="font-bold text-sm text-primary/80 mb-2">Colecciones</h4>

      <ul className="flex flex-col space-y-2">
        {collections.map((c) => (
          <CollectionListItem collection={c} key={c.path} />
        ))}
      </ul>
    </aside>
  );
}
