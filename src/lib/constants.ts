import { FacebookIcon, TwitterIcon } from '@/components/icons';
import { InstagramIcon } from 'lucide-react';

export type SortFilterItem = {
  title: string;
  slug: string;
  sortKey: 'RELEVANCE' | 'BEST_SELLING' | 'CREATED_AT' | 'PRICE';
  reverse: boolean;
};

export const defaultSort: SortFilterItem = {
  title: 'Relevancia',
  slug: 'all',
  sortKey: 'RELEVANCE',
  reverse: false,
};

export const sorting: SortFilterItem[] = [
  defaultSort,
  {
    title: 'Tendencias',
    slug: 'trending-desc',
    sortKey: 'BEST_SELLING',
    reverse: false,
  }, // asc
  {
    title: 'Últimas llegadas',
    slug: 'latest-desc',
    sortKey: 'CREATED_AT',
    reverse: true,
  },
  {
    title: 'Precio: De bajo a alto',
    slug: 'price-asc',
    sortKey: 'PRICE',
    reverse: false,
  }, // asc
  {
    title: 'Precio: De alto a bajo',
    slug: 'price-desc',
    sortKey: 'PRICE',
    reverse: true,
  },
];

export const TAGS = {
  collections: 'collections',
  products: 'products',
  cart: 'cart',
};

export const HIDDEN_PRODUCT_TAG = 'nextjs-frontend-hidden';
export const DEFAULT_OPTION = 'Default Title';
export const SHOPIFY_GRAPHQL_API_ENDPOINT = '/api/2023-01/graphql.json';

export const footerNavigationData = {
  social: [
    {
      name: 'Facebook',
      href: 'https://facebook.com',
      isExternal: true,
      icon: FacebookIcon,
    },
    {
      name: 'Instagram',
      href: 'https://instagram.com',
      isExternal: true,
      icon: InstagramIcon,
    },
    {
      name: 'Youtube',
      href: 'https://youtube.com',
      isExternal: true,
      icon: TwitterIcon,
    },
  ],
  contact: [
    {
      name: '+51 999 999 999',
      href: 'tel:+51999999999',
      isExternal: true,
    },
    {
      name: 'soporte@techsupreme.com',
      href: 'mailto:soporte@techsupreme.com',
      isExternal: true,
    },
  ],
  utils: [
    {
      name: 'Mapa del sitio',
      href: '/sitemap-0.xml',
      isExternal: true,
    },
    {
      name: 'Robots.txt',
      href: '/robots.txt',
      isExternal: true,
    },
  ],
};

export const multipleSliderOptions = {
  perPage: 4,
  perMove: 1,
  gap: '1rem',
  lazyLoad: 'sequential',
  arrows: true,
  pagination: false,
  rewind: true,
  autoplay: true,
  interval: 2000,
  breakpoints: {
    768: {
      perPage: 1,
      arrows: true,
      pagination: false,
    },
    850: {
      perPage: 2,
      arrows: true,
      pagination: false,
    },
    1024: {
      perPage: 3,
      arrows: true,
      pagination: false,
    },
    1280: {
      perPage: 4,
      arrows: true,
      pagination: false,
    },
  },
};
