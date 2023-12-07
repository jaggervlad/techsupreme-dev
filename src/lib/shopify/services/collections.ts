import { TAGS } from '@/lib/constants';
import { getCollectionQuery, getCollectionsQuery } from '../queries/collection';
import {
  Collection,
  ShopifyCollectionOperation,
  ShopifyCollectionsOperation,
} from '../types';
import {
  shopifyFetch,
  reshapeCollection,
  removeEdgesAndNodes,
  reshapeCollections,
} from '../utils';

export async function getCollection(
  handle: string
): Promise<Collection | undefined> {
  const res = await shopifyFetch<ShopifyCollectionOperation>({
    query: getCollectionQuery,
    tags: [TAGS.collections],
    variables: {
      handle,
    },
  });

  return reshapeCollection(res.body.data.collection);
}

export async function getCollections(): Promise<Collection[]> {
  const res = await shopifyFetch<ShopifyCollectionsOperation>({
    query: getCollectionsQuery,
    tags: [TAGS.collections],
  });
  const shopifyCollections = removeEdgesAndNodes(res.body?.data?.collections);
  const collections = [
    {
      handle: '',
      title: 'Todos',
      description: 'Todos productos',
      seo: {
        title: 'Todos',
        description: 'Todos productos',
      },
      path: '/search',
      updatedAt: new Date().toISOString(),
    },
    // Filter out the `hidden` collections.
    // Collections that start with `hidden-*` need to be hidden on the search page.
    ...reshapeCollections(shopifyCollections).filter(
      (collection) => !collection.handle.startsWith('hidden')
    ),
  ];

  return collections;
}
