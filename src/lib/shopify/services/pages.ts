import { getPageQuery, getPagesQuery } from '../queries/page';
import { Page, ShopifyPageOperation, ShopifyPagesOperation } from '../types';
import { shopifyFetch, removeEdgesAndNodes } from '../utils';

export async function getPage(handle: string): Promise<Page> {
  const res = await shopifyFetch<ShopifyPageOperation>({
    query: getPageQuery,
    variables: { handle },
  });

  return res.body.data.pageByHandle;
}

export async function getPages(): Promise<Page[]> {
  const res = await shopifyFetch<ShopifyPagesOperation>({
    query: getPagesQuery,
  });

  return removeEdgesAndNodes(res.body.data.pages);
}
