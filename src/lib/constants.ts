import { FaFacebook } from 'react-icons/fa';
import { AlertOctagon, BookOpen, HelpCircle, Info, Mail } from 'lucide-react';
import { BsInstagram, BsYoutube } from 'react-icons/bs';

export type SortFilterItem = {
  title: string;
  slug: string | null;
  sortKey: 'RELEVANCE' | 'BEST_SELLING' | 'CREATED_AT' | 'PRICE';
  reverse: boolean;
};

export const defaultSort: SortFilterItem = {
  title: 'Relevance',
  slug: null,
  sortKey: 'RELEVANCE',
  reverse: false,
};

export const sorting: SortFilterItem[] = [
  defaultSort,
  {
    title: 'Trending',
    slug: 'trending-desc',
    sortKey: 'BEST_SELLING',
    reverse: false,
  }, // asc
  {
    title: 'Latest arrivals',
    slug: 'latest-desc',
    sortKey: 'CREATED_AT',
    reverse: true,
  },
  {
    title: 'Price: Low to high',
    slug: 'price-asc',
    sortKey: 'PRICE',
    reverse: false,
  }, // asc
  {
    title: 'Price: High to low',
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
  aboutUs: [
    { name: 'Acerca de nosotros', href: '/nosotros', icon: Info },
    { name: 'Preguntas frecuentes', href: '/faq', icon: HelpCircle },
    {
      name: 'Terminos y condiciones',
      href: '/terminos-y-condiciones',
      icon: BookOpen,
    },
  ],
  service: [
    { name: 'Contacto', href: '/contacto', icon: AlertOctagon },
    { name: 'Soporte', href: '/Soporte', icon: AlertOctagon },
  ],
  social: [
    {
      name: '',
      href: 'https://facebook.com',
      isExternal: true,
      icon: FaFacebook,
    },
    {
      name: '',
      href: 'https://instagram.com',
      isExternal: true,
      icon: BsInstagram,
    },
    {
      name: '',
      href: 'https://youtube.com',
      isExternal: true,
      icon: BsYoutube,
    },
  ],
  contact: [
    {
      name: 'soporte@techsupreme.com',
      href: 'mailto:soporte@techsupreme.com',
      isExternal: true,
      icon: Mail,
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
