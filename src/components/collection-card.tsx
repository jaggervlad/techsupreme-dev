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
    <Card>
      <CardHeader>
        <CardTitle>{collection.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative max-h-96 w-full aspect-[4/6]">
          <Image
            className="w-full h-full"
            fill
            alt={collection?.image?.altText || ''}
            src={collection?.image?.url || '/banner-example.png'}
          />
        </div>
      </CardContent>

      <CardFooter>
        <Link
          className={
            'font-medium text-base underline underline-offset-4 ml-auto'
          }
          href={collection.path}
        >
          Ver más
        </Link>
      </CardFooter>
    </Card>
  );
}
