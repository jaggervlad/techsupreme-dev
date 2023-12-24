import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Image from 'next/image';
import Slider, { Settings } from 'react-slick';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { useRef } from 'react';

const settings: Settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  dotsClass: 'slick-dots banner-slider-dots',
};

export function BannerSlider() {
  const slider = useRef<any>(null);

  return (
    <div className="relative overflow-hidden">
      <button
        onClick={() => slider.current?.slickNext()}
        className="absolute bg-[#2E2E2EB2] h-6 lg:h-14 w-6 lg:w-14 flex items-center justify-center rounded-full z-10 right-2 lg:right-10 top-[50%] [transform:translateY(-50%)]"
      >
        <ChevronRight className="w-4 h-4 text-white lg:w-7 lg:h-7" />
      </button>
      <button
        onClick={() => slider.current?.slickPrev()}
        className="absolute bg-[#2E2E2EB2] h-6 lg:h-14 w-6 lg:w-14 flex items-center justify-center rounded-full z-10 left-2 lg:left-10 top-[50%] [transform:translateY(-50%)]"
      >
        <ChevronLeft className="w-4 h-4 text-white lg:w-7 lg:h-7" />
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
