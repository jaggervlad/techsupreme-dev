import { ProductOption, ProductVariant } from '@/lib/shopify/types';
type Combination = {
  id: string;
  availableForSale: boolean;
  [key: string]: string | boolean;
};

const getCombinations = (variants: ProductVariant[]): Combination[] =>
  variants.map((variant) => ({
    id: variant.id,
    availableForSale: variant.availableForSale,
    ...variant.selectedOptions.reduce(
      (accumulator, option) => ({
        ...accumulator,
        [option.name.toLowerCase()]: option.value,
      }),
      {}
    ),
  }));

const filterOptions = (
  combinations: Combination[],
  selectedOptions: Array<[string, string]>
): Combination[] =>
  combinations.filter((combination) =>
    selectedOptions.every(
      ([key, value]) =>
        combination[key] === value && combination.availableForSale
    )
  );

export const filterAvailableOptions = (
  product: { options: ProductOption[]; variants: ProductVariant[] },
  optionName: string,
  optionSearchParams: URLSearchParams
): string[] => {
  const option = product.options.find(
    (o) => o.name.toLowerCase() === optionName
  );

  if (!option) {
    return [];
  }

  const selectedOptions = Array.from(optionSearchParams.entries()).filter(
    ([key]) => key.toLowerCase() !== optionName
  ) as Array<[string, string]>;

  const combinations = getCombinations(product.variants);
  const filteredCombinations = filterOptions(combinations, selectedOptions);

  return option.values.filter((value) =>
    filteredCombinations.some(
      (combination) =>
        combination[optionName.toLowerCase()] === value &&
        combination.availableForSale
    )
  );
};
