'use client';

import clsx from 'clsx';
import { ProductOption, ProductVariant } from '@/lib/shopify/types';
import { createUrl } from '@/lib/utils';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

type Combination = {
  id: string;
  availableForSale: boolean;
  [key: string]: string | boolean; // ie. { color: 'Red', size: 'Large', ... }
};

export function VariantSelector({
  options,
  variants,
}: {
  options: ProductOption[];
  variants: ProductVariant[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const hasNoOptionsOrJustOneOption =
    !options.length ||
    (options.length === 1 && options[0]?.values.length === 1);

  useEffect(() => {
    const initialAsPath = router.asPath;
    const hasQueryParameters = initialAsPath.includes('?');

    if (!hasQueryParameters) {
      const newSearchParams = new URLSearchParams();

      const defaultsOptions = options.map((o) => ({
        name: o.name,
        defaultValue: o.values[0],
      }));

      defaultsOptions.forEach((d) => {
        newSearchParams.set(d.name.toLowerCase(), d.defaultValue);
      });

      router.replace(createUrl(pathname, newSearchParams), undefined, {
        scroll: false,
      });
    }
  }, [options, searchParams, pathname, router]);

  if (hasNoOptionsOrJustOneOption) {
    return null;
  }

  const combinations: Combination[] = variants.map((variant) => ({
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

  return options.map((option) => (
    <dl className="mb-8" key={option.id}>
      <dt className="mb-4 text-sm font-bold uppercase tracking-wide">
        {option.name}
      </dt>
      <dd className="flex flex-wrap gap-3">
        {option.values.map((value) => {
          const optionNameLowerCase = option.name.toLowerCase();

          // Base option params on current params so we can preserve any other param state in the url.
          const optionSearchParams = new URLSearchParams(
            searchParams.toString()
          );

          // Update the option params using the current option to reflect how the url *would* change,
          // if the option was clicked.
          optionSearchParams.set(optionNameLowerCase, value);
          const optionUrl = createUrl(pathname, optionSearchParams);

          // In order to determine if an option is available for sale, we need to:
          //
          // 1. Filter out all other param state
          // 2. Filter out invalid options
          // 3. Check if the option combination is available for sale
          //
          // This is the "magic" that will cross check possible variant combinations and preemptively
          // disable combinations that are not available. For example, if the color gray is only available in size medium,
          // then all other sizes should be disabled.
          const filtered = Array.from(optionSearchParams.entries()).filter(
            ([key, value]) =>
              options.find(
                (option) =>
                  option.name.toLowerCase() === key &&
                  option.values.includes(value)
              )
          );
          const isAvailableForSale = combinations.find((combination) =>
            filtered.every(
              ([key, value]) =>
                combination[key] === value && combination.availableForSale
            )
          );

          // The option is active if it's in the url params.
          const isActive = searchParams.get(optionNameLowerCase) === value;

          return (
            <button
              key={value}
              aria-disabled={!isAvailableForSale}
              disabled={!isAvailableForSale}
              onClick={() => {
                router.replace(optionUrl, undefined, { scroll: false });
              }}
              title={`${option.name} ${value}${
                !isAvailableForSale ? ' (Out of Stock)' : ''
              }`}
              className={clsx(
                'flex min-w-[48px] items-center justify-center rounded-full border bg-slate-100 px-2 py-1 text-sm dark:border-slate-800 dark:bg-slate-900',
                {
                  'cursor-default ring-2 !bg-primary text-white ring-primary':
                    isActive,
                  'ring-1  ring-transparent transition duration-300 ease-in-out hover:scale-110 hover:ring-primary ':
                    !isActive && isAvailableForSale,
                  'relative z-10 cursor-not-allowed overflow-hidden bg-slate-200 text-slate-500 ring-1 ring-slate-300 before:absolute before:inset-x-0 before:-z-10 before:h-px before:-rotate-45 before:bg-slate-300 before:transition-transform dark:bg-slate-900 dark:text-slate-400 dark:ring-slate-700 before:dark:bg-slate-700':
                    !isAvailableForSale,
                }
              )}
            >
              {value}
            </button>
          );
        })}
      </dd>
    </dl>
  ));
}
