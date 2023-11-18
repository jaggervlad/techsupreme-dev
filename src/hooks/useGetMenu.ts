import { getMenu } from '@/lib/shopify';
import { Menu } from '@/lib/shopify/types';
import { useEffect, useState } from 'react';

export function useGetMenu(handle: string) {
  const [menu, setMenu] = useState<Menu[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchMenu = async () => {
      setIsLoading(true);
      try {
        const data = await getMenu(handle);
        setMenu(data);
      } catch (err: any) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMenu();
  }, [handle]);

  return { menu, isLoading, error };
}
