export const getProductTagsQuery = /* GraphQL */ `
  query getProductTag($first: Int!) {
    productTags(first: $first) {
      edges {
        node
      }
    }
  }
`;
