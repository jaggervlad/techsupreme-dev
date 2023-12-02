import { getCollections, getPages, getProducts } from '@/lib/shopify';
import { getServerSideSitemap, ISitemapField } from 'next-sitemap';

export default function Site() {}

export const getServerSideProps = async (ctx: any) => {
  const products = await getProducts({});
  const collections = await getCollections();
  const pages = await getPages();

  const fields: ISitemapField[] = collections.map((collection) => ({
    loc: `https://techsupreme.store/search/${collection.handle}`,
    lastmod: new Date().toISOString(),
  }));
  const fieldsProducts: ISitemapField[] = products.map((product) => ({
    loc: `https://techsupreme.store/producto/${product.handle}`,
    lastmod: new Date().toISOString(),
  }));
  const fieldsPages: ISitemapField[] = pages.map((page) => ({
    loc: `https://techsupreme.store/${page.handle}`,
    lastmod: new Date().toISOString(),
  }));

  return getServerSideSitemap(ctx, [
    ...fields,
    ...fieldsProducts,
    ...fieldsPages,
  ]);
};
