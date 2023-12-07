import { getPages } from '@/lib/shopify/services/pages';
import { Page } from '@/lib/shopify/types';
import { useEffect, useState } from 'react';

export function useGetPages() {
  const [pages, setPages] = useState<Page[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPages = async () => {
      setIsLoading(true);
      try {
        const data = await getPages();
        setPages(data);
      } catch (err: any) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPages();
  }, []);

  return { pages, isLoading, error };
}
