import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Image from 'next/image';
import Slider, { Settings } from 'react-slick';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { useRef } from 'react';
import { cn } from '@/lib/utils';

const settings: Settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  dotsClass: 'slick-dots banner-slider-dots',
};

const className =
  'absolute bg-[#2E2E2EB2]/50 h-6 w-6 lg:h-12 lg:w-12 flex items-center justify-center rounded-full z-10  top-[50%] [transform:translateY(-50%)]';

const classNameIcon = 'w-4 h-4 text-white lg:w-7 lg:h-7';

export function BannerSlider() {
  const slider = useRef<any>(null);

  return (
    <div className="relative overflow-hidden">
      <button
        onClick={() => slider.current?.slickNext()}
        className={cn(className, 'right-2 lg:right-10')}
      >
        <ChevronRight className={classNameIcon} />
      </button>
      <button
        onClick={() => slider.current?.slickPrev()}
        className={cn(className, 'left-2 lg:left-10')}
      >
        <ChevronLeft className={classNameIcon} />
      </button>

      <Slider ref={slider} {...settings} className="">
        <div className="aspect-video max-h-[500px]">
          <Image
            src="/banner-example.png"
            className="w-full h-full"
            width={1400}
            height={600}
            alt=""
          />
        </div>
        <div className="aspect-video max-h-[500px]">
          <Image
            src="/banner-example.png"
            className="w-full h-full"
            width={1400}
            height={600}
            alt=""
          />
        </div>
        <div className="aspect-video max-h-[500px]">
          <Image
            src="/banner-example.png"
            className="w-full h-full"
            width={1400}
            height={600}
            alt=""
          />
        </div>
      </Slider>
    </div>
  );
}
