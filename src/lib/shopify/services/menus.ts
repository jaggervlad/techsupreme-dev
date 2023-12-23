import { TAGS } from '@/lib/constants';
import { getMenuQuery } from '../queries/menu';
import { Menu, ShopifyMenuOperation } from '../types';
import { shopifyFetch, domain } from '../utils';
import { ROUTES } from '@/lib/routes';

export async function getMenu(handle: string): Promise<Menu[]> {
  const res = await shopifyFetch<ShopifyMenuOperation>({
    query: getMenuQuery,
    tags: [TAGS.collections],
    variables: {
      handle,
    },
  });

  return (
    res.body?.data?.menu?.items.map(
      (item: {
        title: string;
        url: string;
        items?: { title: string; url: string }[];
      }) => ({
        title: item.title,
        path: item.url
          .replace(domain, '')
          .replace('/collections', ROUTES.products())
          .replace('/pages', ''),
        items: item.items
          ? item.items.map((i) => ({
              title: i.title,
              path: i.url
                .replace(domain, '')
                .replace('/collections', ROUTES.products())
                .replace('/pages', ''),
            }))
          : [],
      })
    ) || []
  );
}
