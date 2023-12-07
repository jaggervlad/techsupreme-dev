import { getCollections } from '@/lib/shopify/services/collections';
import { Collection } from '@/lib/shopify/types';
import { useEffect, useState } from 'react';

export function useGetCollections() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCollections = async () => {
      setIsLoading(true);
      try {
        const data = await getCollections();
        setCollections(data);
      } catch (err: any) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCollections();
  }, []);

  return { collections, isLoading, error };
}
