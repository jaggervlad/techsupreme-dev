import { MainLayout } from '@/components/layouts/main-layout';
import Prose from '@/components/prose';
import { getPage, getPages } from '@/lib/shopify/services/pages';
import { Page } from '@/lib/shopify/types';
import { GetStaticProps } from 'next';

export default function DynamicPages({ page }: { page: Page }) {
  return (
    <MainLayout
      seo={{
        title: page.seo?.title ?? page.title,
        description: page.seo?.description ?? `Página ${page.title}`,
      }}
    >
      <div className="max-w-6xl mx-auto py-14">
        <h1 className="mb-8 text-5xl font-bold">{page.title}</h1>
        <Prose className="mb-8" html={page.body as string} />
        <p className="text-sm italic" suppressHydrationWarning>
          {`Este documento fue actualizado por última vez el ${new Intl.DateTimeFormat(
            undefined,
            {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            }
          ).format(new Date(page.updatedAt))}.`}
        </p>
      </div>
    </MainLayout>
  );
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const pageParam = (ctx?.params?.page ?? '') as string;

  const page = await getPage(pageParam);

  if (!page) {
    return {
      notFound: true,
    };
  }

  return {
    props: { page },
    revalidate: 60 * 5,
  };
};

export const getStaticPaths = async () => {
  const pages = await getPages();

  const paths = pages
    .map((c) => {
      return { params: { page: c.handle } };
    })
    .filter((item) => item !== null);

  return {
    paths: paths,
    fallback: 'blocking',
  };
};
