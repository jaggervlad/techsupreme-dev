import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Collection } from '@/lib/shopify/types';
import Image from 'next/image';
import Link from 'next/link';

interface CollectionCardProps {
  collection: Collection;
}

export function CollectionCard({ collection }: CollectionCardProps) {
  return (
    <div className="pb-6 border rounded-lg !bg-white hover:shadow-lg">
      <Link href={collection.path}>
        <div className="relative max-h-96 w-full aspect-[4/6]">
          <Image
            className="w-full h-full rounded-t-lg border"
            fill
            alt={collection?.image?.altText || collection.title}
            src={collection?.image?.url || '/banner-example.png'}
          />
        </div>
      </Link>

      <div className="flex  justify-between pt-6 px-4">
        <h3 className="text-xl font-bold">{collection.title}</h3>
        <Link
          className={
            'font-medium hover:scale-105 text-base underline underline-offset-4 ml-auto'
          }
          href={collection.path}
        >
          Ver más
        </Link>
      </div>
    </div>
  );
}
