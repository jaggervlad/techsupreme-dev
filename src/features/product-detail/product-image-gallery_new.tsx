import * as React from 'react';
import Image from 'next/image';

import { cn } from '@/lib/utils';
import { Image as ImageType } from '@/lib/shopify/types';

import Slider, { Settings } from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const mainSliderSettings: Settings = {
  dots: false,
  arrows: false,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: false,
  adaptiveHeight: true,
  centerPadding: '0',
};

const thumbsNailSliderSettings = (imageLength: number) => {
  let slidesToShow = 4;

  if (imageLength < 4) {
    slidesToShow = imageLength;
  }

  const settings: Settings = {
    slidesToShow: slidesToShow - 1,
    slidesToScroll: 1,
    arrows: false,
    infinite: true,
    vertical: true,
    verticalSwiping: true,
    swipeToSlide: true,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          vertical: false,
          verticalSwiping: false,
          slidesToShow: slidesToShow - 1,
        },
      },
    ],
  };

  return settings;
};

interface ProductImageCarouselProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  images: ImageType[];
  title: string;
}

export function ProductImageGalleryNew({
  images,
  className,
  title,
  ...props
}: ProductImageCarouselProps) {
  const [nav1, setNav1] = React.useState<any>(null);
  const [nav2, setNav2] = React.useState<any>(null);

  const slider1 = React.useRef<any>();
  const slider2 = React.useRef<any>();

  React.useEffect(() => {
    setNav1(slider1.current);
    setNav2(slider2.current);
  }, []);

  return (
    <div
      aria-label="Carusel de imágenes de productos"
      className={cn(
        'flex flex-col-reverse lg:flex-row lg:items-center justify-center w-full  gap-4',
        className
      )}
      {...props}
    >
      <div className="w-full lg:w-[20%]  relative">
        <Slider
          asNavFor={nav1}
          ref={slider2}
          {...thumbsNailSliderSettings(images.length)}
          className="space-y-5"
        >
          {images?.map(({ url, altText }, index) => {
            return (
              <div key={url} className="rounded-[8px]  border">
                <Image
                  src={url}
                  alt={altText}
                  width={100}
                  height={100}
                  className="my-2 h-[80px] mx-auto aspect-square"
                />
              </div>
            );
          })}
        </Slider>
      </div>

      {/* MAIN SLIDER */}
      <div className="border rounded-[8px] w-full lg:w-[80%] relative py-0">
        <Slider
          asNavFor={nav2}
          ref={slider1}
          {...mainSliderSettings}
          className="product-main-slider"
        >
          {images.map((image, index) => (
            <div
              key={image.url}
              className="h-[400px] md:h-[650px] flex items-center justify-center focus:outline-none"
            >
              <Image
                key={image.url}
                src={image?.url || ''}
                alt={image?.altText || title}
                role="group"
                className="w-full lg:h-[550px]  aspect-square"
                aria-roledescription="slide"
                priority
                quality={100}
                height={600}
                width={600}
                sizes="(min-width: 480px ) 50vw, 100vw"
              />
            </div>
          ))}
        </Slider>

        <span className="absolute left-5 bg-[#4332E2] rounded-[8px] text-white px-4 py-1 top-3">
          NUEVO
        </span>
      </div>
    </div>
  );
}

{
  /* <ul className="flex items-center justify-center h-full gap-2 overflow-hidden list-none md:flex-col">
  {images?.map(({ url, altText }, index) => {
    return (
      <li key={url} className={`border rounded-[8px] w-full`}>
        <button className="p-2">
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
</ul>; */
}
