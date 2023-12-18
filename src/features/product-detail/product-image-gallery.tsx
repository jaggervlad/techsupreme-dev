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

  const handleThumbClick = (index: number) => {
    mainRef.current?.go(index);
  };

  return (
    <div
      aria-label="Carusel de imágenes de productos"
      className={cn(
        'flex flex-col-reverse h-[650px] md:flex-row w-full items-center gap-4',
        className
      )}
      {...props}
    >
      {/* THUMBNAILS ACA NECECSITO QUE LOS SINCRINICES CON EL SLIDER MAIN */}
      <ul
        ref={thumbsRef}
        className="flex items-center justify-center h-full gap-2 overflow-hidden list-none md:flex-col"
      >
        {images?.map(({ url, altText }, index) => {
          return (
            <li
              key={url}
              className={`border rounded-[5px] w-full  ${
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

      <div>
        {/* MAIN SLIDER */}
        <Splide
          options={mainOptions}
          ref={mainRef}
          aria-labelledby="thumbnail-slider-example"
          className="flex-grow w-full h-full"
        >
          {images.map((image, index) => (
            <SplideSlide
              key={index}
              className="border flex items-center justify-center rounded-[5px] h-[650px]"
            >
              <div className="aspect-square  lg:aspect-[4/5] lg:max-h-[550px] w-full relative">
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

              <span className="absolute left-5 bg-cblue rounded-[5px] text-white px-4 py-1 top-3">
                NUEVO
              </span>
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </div>
  );
}
