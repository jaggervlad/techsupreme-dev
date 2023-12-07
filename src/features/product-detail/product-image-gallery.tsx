import '@splidejs/react-splide/css';

import * as React from 'react';
import Image from 'next/image';

import { cn } from '@/lib/utils';
import { Image as ImageType } from '@/lib/shopify/types';

// @ts-ignore
import { Options, Splide, SplideSlide } from '@splidejs/react-splide';

interface ProductImageCarouselProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  images: ImageType[];
  title: string;
}

const mainOptions: Options = {
  type: 'loop',
  perPage: 1,
  perMove: 1,
  gap: '1rem',
  pagination: false,
};

const thumbsOptions: Options = {
  arrows: false,
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

export function ProductImageGallery({
  images,
  className,
  title,
  ...props
}: ProductImageCarouselProps) {
  const mainRef = React.useRef<Splide | null>(null);
  const thumbsRef = React.useRef<Splide | null>(null);

  const [activeIdx, setActiveIdx] = React.useState(0);

  React.useEffect(() => {
    if (mainRef.current && thumbsRef.current && thumbsRef.current.splide) {
      mainRef.current.sync(thumbsRef.current.splide);
    }
  }, [mainRef, thumbsRef]);

  React.useEffect(() => {
    const currentMainRef = mainRef.current;

    const handleMove = () => {
      setActiveIdx(currentMainRef.splide.index);
    };

    if (currentMainRef && currentMainRef.splide) {
      currentMainRef.splide.on('moved', handleMove);
    }

    return () => {
      if (currentMainRef && currentMainRef.splide) {
        currentMainRef.splide.off('moved', handleMove);
      }
    };
  }, []);

  const handleThumbs = (id: number) => {
    if (mainRef.current) {
      mainRef.current.go(id);
    }
  };

  if (images.length > 1) {
    return (
      <div
        aria-label="Carusel de imágenes de productos"
        className={cn(
          'flex flex-col-reverse md:flex-row w-full h-full items-center gap-4',
          className
        )}
        {...props}
      >
        {/* THUMBNAILS */}
        <ul className="flex items-center justify-center gap-2 overflow-hidden list-none md:flex-col">
          {images?.map(({ url, altText }, index) => {
            return (
              <li
                key={url}
                className={`border rounded-[5px] w-full ${
                  index === activeIdx && 'border-blue-600/80 border-2 '
                }`}
              >
                <button onClick={() => handleThumbs(index)} className="p-2">
                  <Image
                    src={url}
                    alt={altText}
                    width={80}
                    height={80}
                    className="flex items-center justify-center w-20 h-20"
                  />
                </button>
              </li>
            );
          })}
        </ul>

        {/* MAIN SLIDER */}
        <Splide
          options={mainOptions}
          ref={mainRef}
          aria-labelledby="thumbnail-slider-example"
          className="flex-grow w-full h-full"
        >
          {images.map((image, index) => (
            <SplideSlide key={index} className="border rounded-[5px]">
              <div className="aspect-square lg:aspect-[4/5] lg:max-h-[600px] w-full relative">
                <Image
                  fill
                  key={image.url}
                  src={image?.url || ''}
                  alt={image?.altText || title}
                  role="group"
                  className="rounded-[5px]"
                  aria-roledescription="slide"
                  priority
                  quality={100}
                  sizes="(min-width: 480px ) 50vw,
                      100vw"
                />
              </div>

              <span className="absolute left-5 bg-[#4332E2] rounded-[5px] text-white px-4 py-1 top-3">
                NUEVO
              </span>
            </SplideSlide>
          ))}
        </Splide>
      </div>
    );
  }

  return (
    <div>
      <div
        key={images[0].url}
        className="aspect-square lg:aspect-[4/5] lg:max-h-[600px] w-full relative"
      >
        <Image
          src={images[0]?.url}
          alt={images[0]?.altText || title}
          className="border rounded-[5px]"
          sizes="(min-width:480px) 50vw, 100vw"
          fill
          priority
          quality={100}
        />
      </div>
    </div>
  );
}
