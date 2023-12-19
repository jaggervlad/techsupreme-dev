import productFragment from '../fragments/product';

export const getProductQuery = /* GraphQL */ `
  query getProduct($handle: String!) {
    product(handle: $handle) {
      ...product
      collections(first: 1) {
        edges {
          node {
            title
            handle
          }
        }
      }
    }
  }
  ${productFragment}
`;

export const getProductsQuery = /* GraphQL */ `
  query getProducts(
    $sortKey: ProductSortKeys
    $reverse: Boolean
    $query: String
    $first: Int
  ) {
    products(
      sortKey: $sortKey
      reverse: $reverse
      query: $query
      first: $first
    ) {
      edges {
        node {
          ...product
        }
      }
    }
  }
  ${productFragment}
`;

export const getProductRecommendationsQuery = /* GraphQL */ `
  query getProductRecommendations($productId: ID!) {
    productRecommendations(productId: $productId) {
      ...product
    }
  }
  ${productFragment}
`;
