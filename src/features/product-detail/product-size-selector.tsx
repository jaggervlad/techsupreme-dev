import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { createUrl } from '@/lib/utils';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

type ProductSizeSelectorProps = {
  sizes: string[];
};

export function ProductSizeSelector({ sizes }: ProductSizeSelectorProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [defaultValue, setDefaultValue] = useState(
    searchParams.get('talla') ?? sizes[0]
  );

  useEffect(() => {
    setDefaultValue(searchParams.get('talla') ?? sizes[0]);
  }, [searchParams, sizes]);

  return (
    <div className="flex items-center gap-3">
      <Label htmlFor="product-sizes" className="font-medium">
        Talla
      </Label>
      <Select
        name="product-sizes"
        value={defaultValue}
        onValueChange={(value) => {
          const optionSearchParams = new URLSearchParams(
            searchParams.toString()
          );

          optionSearchParams.set('talla', value);
          const newUrl = createUrl(pathname, optionSearchParams);

          router.replace(newUrl, undefined, { scroll: false });
        }}
      >
        <SelectTrigger className="w-20">
          <SelectValue placeholder="Tallas" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {sizes.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
