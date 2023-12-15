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
    <Button variant="circle" size="icon" className="relative ">
      {hasItems && isClient ? (
        <span>
          <Badge
            variant="secondary"
            className="absolute flex items-center justify-center w-6 h-6 p-2 rounded-full bg-neo-green border-border -top-3 -right-2 hover:bg-neo-green"
          >
            {items.length}
          </Badge>
        </span>
      ) : null}
      <HeartIcon className="w-5 h-5" />
    </Button>
  );
}
