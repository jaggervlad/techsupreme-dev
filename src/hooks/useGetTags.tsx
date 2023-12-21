import { getProductTags } from '@/lib/shopify';
import { Tag } from '@/lib/shopify/types';
import { useEffect, useState } from 'react';

export function useGetTags() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setIsLoading(true);
    const fetchTags = async () => {
      try {
        const data = await getProductTags();
        setTags(data);
      } catch (err: any) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTags();
  }, []);

  return { tags, isLoading, error };
}
