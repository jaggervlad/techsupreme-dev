import * as React from 'react';

import { cn } from '@/lib/utils';
// @ts-ignore
import { Options, Splide, SplideSlide } from '@splidejs/react-splide';
import { Image as ImageType } from '@/lib/shopify/types';
import Image from 'next/image';

interface ProductImageCarouselProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  images: ImageType[];
  title: string;
}

export function ProductImageGallery({
  images,
  className,
  title,
  ...props
}: ProductImageCarouselProps) {
  const mainOptions: Options = {
    type: 'loop',
    perPage: 1,
    perMove: 1,
    gap: '1rem',
    pagination: false,
  };

  const thumbsOptions: Options = {
    type: 'slide',
    rewind: true,
    perPage: 3,
    perMove: 1,
    gap: '.5rem',
    pagination: false,
    cover: true,
    focus: 'center',
    isNavigation: true,
  };
  // Use state to manage the Splide instances.
  const mainRef = React.useRef<Splide | null>(null);
  const thumbsRef = React.useRef<Splide | null>(null);

  React.useEffect(() => {
    if (mainRef.current && thumbsRef.current && thumbsRef.current.splide) {
      mainRef.current.sync(thumbsRef.current.splide);
    }
  }, [mainRef, thumbsRef]);

  return (
    <div
      aria-label="Product image carousel"
      className={cn('flex flex-col gap-2', className)}
      {...props}
    >
      <Splide
        options={mainOptions}
        ref={mainRef}
        aria-labelledby="thumbnail-slider-example"
      >
        {images.map((image, index) => (
          <SplideSlide key={index}>
            <div className="aspect-square lg:aspect-[4/5] lg:max-h-[600px] w-full relative">
              <Image
                fill
                key={image.url}
                src={image?.url || ''}
                alt={image?.altText || title}
                role="group"
                className=""
                aria-roledescription="slide"
                priority
                quality={100}
              />
            </div>
          </SplideSlide>
        ))}
      </Splide>

      <Splide
        options={thumbsOptions}
        ref={thumbsRef}
        aria-label="The carousel with thumbnails. Selecting a thumbnail will change the main carousel"
      >
        {images.map((image, index) => (
          <SplideSlide key={index} className="relative aspect-square max-h-36">
            <Image
              key={image.url}
              src={image?.url || ''}
              alt={image?.altText || ''}
              role="group"
              aria-roledescription="slide"
              className="w-full h-full"
              fill
              priority
            />
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
}
