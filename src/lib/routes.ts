export const ROUTES = {
  products: (slug?: string) => `/productos${slug ? `/${slug}` : ''}`,
  productBySlug: (slug: string) => `/producto/${slug}`,
};

export const AUTH_ROUTES = {
  profile: () => `/perfil`,
  orders: () => `/pedidos`,
};
