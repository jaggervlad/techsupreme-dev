import { TAGS } from '@/lib/constants';
import { getCollectionProductsQuery } from '../queries/collection';
import {
  getProductQuery,
  getProductRecommendationsQuery,
  getProductsQuery,
} from '../queries/product';
import {
  Product,
  ShopifyCollectionProductsOperation,
  ShopifyProductOperation,
  ShopifyProductRecommendationsOperation,
  ShopifyProductsOperation,
} from '../types';
import {
  shopifyFetch,
  reshapeProducts,
  removeEdgesAndNodes,
  reshapeProduct,
} from '../utils';

export async function getCollectionProducts({
  collection,
  reverse,
  sortKey,
  filters,
}: {
  collection: string;
  reverse?: boolean;
  sortKey?: string;
  filters?: { [key: string]: any };
}): Promise<Product[]> {
  const res = await shopifyFetch<ShopifyCollectionProductsOperation>({
    query: getCollectionProductsQuery,
    tags: [TAGS.collections, TAGS.products],
    variables: {
      filters,
      handle: collection,
      reverse,
      sortKey: sortKey === 'CREATED_AT' ? 'CREATED' : sortKey,
    },
  });

  if (!res.body.data.collection) {
    console.log(`No collection found for \`${collection}\``);
    return [];
  }

  return reshapeProducts(
    removeEdgesAndNodes(res.body.data.collection.products)
  );
}

export async function getProduct(handle: string): Promise<Product | undefined> {
  const res = await shopifyFetch<ShopifyProductOperation>({
    query: getProductQuery,
    tags: [TAGS.products],
    variables: {
      handle,
    },
  });

  return reshapeProduct(res.body.data.product, false);
}

export async function getProductRecommendations(
  productId: string
): Promise<Product[]> {
  const res = await shopifyFetch<ShopifyProductRecommendationsOperation>({
    query: getProductRecommendationsQuery,
    tags: [TAGS.products],
    variables: {
      productId,
    },
  });

  return reshapeProducts(res.body.data.productRecommendations);
}

export async function getProducts({
  query,
  reverse,
  sortKey,
  first = 250,
}: {
  query?: string;
  reverse?: boolean;
  sortKey?: string;
  first?: number;
} = {}): Promise<Product[]> {
  const res = await shopifyFetch<ShopifyProductsOperation>({
    query: getProductsQuery,
    tags: [TAGS.products],
    variables: {
      query,
      reverse,
      sortKey,
      first,
    },
  });

  return reshapeProducts(removeEdgesAndNodes(res.body.data.products));
}
