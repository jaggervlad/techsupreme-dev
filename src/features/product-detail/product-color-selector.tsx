import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { createUrl } from '@/lib/utils';
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

  return (
    <div className="flex items-center gap-3">
      <Label
        htmlFor="product-colors"
        className="font-medium font-montserrat-semibold"
      >
        Color
      </Label>

      <RadioGroup
        name="product-colors"
        className="flex"
        defaultValue={defaultValue}
        onValueChange={(value) => {
          const optionSearchParams = new URLSearchParams(
            searchParams.toString()
          );
          optionSearchParams.set('color', value);
          const newUrl = createUrl(pathname, optionSearchParams);

          router.replace(newUrl, undefined, { scroll: false });
        }}
      >
        {colors.map((c) => (
          <RadioGroupItem
            className="w-5 h-5 text-blue-600 [&>span>svg]:h-4 [&>span>svg]:w-4"
            value={c}
            id={c}
            key={c}
          />
        ))}
      </RadioGroup>
    </div>
  );
}
