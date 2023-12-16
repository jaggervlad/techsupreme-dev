import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useGetCollections } from '@/hooks/useGetCollections';
import { cn } from '@/lib/utils';
import { ChevronDown, TruckIcon } from 'lucide-react';
import Link from 'next/link';

type CategoriesSelectorProps = {
  className?: string;
  contentClassName?: string;
};

export const CategoriesSelector = ({
  className,
  contentClassName,
}: CategoriesSelectorProps) => {
  const { collections } = useGetCollections();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className={cn(
            'flex w-64 justify-between h-full rounded-none',
            className
          )}
        >
          Categorias
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="center"
        className={cn('w-64 bg-primary', contentClassName)}
        sideOffset={0}
      >
        {collections
          .filter((c) => c.title.toLowerCase() !== 'todos')
          .map((c) => (
            <DropdownMenuItem key={c.title} className="text-white" asChild>
              <Link href={c.path}>{c.title}</Link>
            </DropdownMenuItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
