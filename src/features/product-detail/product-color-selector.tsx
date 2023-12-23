import { Label } from '@/components/ui/label';
import { createUrl } from '@/lib/utils';
import { Circle } from 'lucide-react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

type ProductColorSelectorProps = {
  colors: string[];
};
export function ProductColorSelector({ colors }: ProductColorSelectorProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [defaultValue, setDefaultValue] = useState(
    searchParams.get('color') ?? colors[0]
  );

  useEffect(() => {
    setDefaultValue(searchParams.get('color') ?? colors[0]);
  }, [searchParams, colors]);

  const mappedColors = colors.map((color) => {
    const colorValue = color.split('#')[1];

    return { name: color, value: colorValue ? `#${colorValue}` : '' };
  });

  return (
    <div className="flex items-center gap-3">
      <Label
        htmlFor="product-colors"
        className="font-medium font-montserrat-semibold"
      >
        Color
      </Label>

      <div className="flex gap-1">
        {mappedColors.map((c) => {
          const isActive = defaultValue === c.name;

          return (
            <button
              key={c.name}
              disabled={!isActive}
              className={`h-7 flex items-center justify-center w-7 rounded-full ${
                isActive ? 'border-2 border-black' : ''
              }`}
              onClick={() => {
                const optionSearchParams = new URLSearchParams(
                  searchParams.toString()
                );
                optionSearchParams.set('color', c.name);
                const newUrl = createUrl(pathname, optionSearchParams);

                router.replace(newUrl, undefined, { scroll: false });
              }}
            >
              <span className="sr-only">{c.name}</span>

              <Circle
                style={{ fill: c.value ? c.value : 'black', stroke: 'none' }}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
