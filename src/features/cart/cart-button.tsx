import { ShoppingCart } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SheetTrigger } from '@/components/ui/sheet';

import { useCart } from '@/contexts/cart-context';
import { cn } from '@/lib/utils';

export const CartButton = () => {
  const { cart } = useCart();
  return (
    <SheetTrigger asChild>
      <Button
        variant="circle"
        size="icon"
        aria-label="Cart"
        className={cn('relative')}
      >
        {cart && cart?.lines.length > 0 && (
          <Badge
            variant="secondary"
            className="absolute flex items-center justify-center w-6 h-6 p-2 rounded-full bg-lemon-green border-border -top-3 -right-2 hover:bg-lemon-green"
          >
            {cart?.lines.length}
          </Badge>
        )}
        <ShoppingCart aria-hidden="true" className="w-5 h-5" />
      </Button>
    </SheetTrigger>
  );
};
