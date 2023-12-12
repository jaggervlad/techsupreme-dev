import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { HeartIcon } from 'lucide-react';
import { useWishListState } from '@/contexts/wishlist-context';
import { useEffect, useState } from 'react';

export function WishList() {
  const { hasItems, items } = useWishListState();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Button variant={'ghost'} className="relative hidden md:inline-flex">
      {hasItems && isClient ? (
        <span>
          <Badge
            variant="secondary"
            className="absolute top-0 flex items-center justify-center w-4 h-4 p-2 border rounded-full border-primary right-2"
          >
            {items.length}
          </Badge>
        </span>
      ) : null}
      <HeartIcon />
    </Button>
  );
}
