import { Collection } from '@/lib/shopify/types';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

type CollectionsSectionProps = {
  collections: Collection[];
};

export const CollectionsSection = ({
  collections,
}: CollectionsSectionProps) => {
  return (
    <section className="grid gap-4 lg:grid-cols-3">
      {collections
        .filter((c) => c.title.toLowerCase() !== 'todos')
        .slice(0, 3)
        .map((c) => (
          <CollectionCard collection={c} key={c.path} />
        ))}
    </section>
  );
};

type CollectionCardProps = {
  collection: Collection;
};

export function CollectionCard({ collection }: CollectionCardProps) {
  return (
    <div className="relative max-h-80 w-full aspect-[4/6] ">
      <Image
        className="object-cover w-full h-full rounded-[10px]"
        fill
        alt={collection?.image?.altText || collection.title}
        src={collection?.image?.url || '/banner-example.png'}
      />

      <div className="absolute inset-0 bg-black/20 rounded-[10px]" />

      <div className="absolute flex items-center justify-between w-full px-4 pt-6 text-white bottom-6">
        <h3 className="text-3xl font-bold font-montserrat-bold">
          {collection.title}
        </h3>
        <Link
          className={
            'font-medium p-2 rounded-full border border-white hover:scale-105 text-base underline underline-offset-4 ml-auto'
          }
          href={collection.path}
        >
          <ArrowRight />
        </Link>
      </div>
    </div>
  );
}
