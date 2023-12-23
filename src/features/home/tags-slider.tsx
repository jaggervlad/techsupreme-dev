import { Tag } from '@/lib/shopify/types';
import { useRef } from 'react';
import Slider, { Settings } from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ChevronLeft, ChevronRight, ShirtIcon } from 'lucide-react';
import Link from 'next/link';
import { ROUTES } from '@/lib/routes';

type TagsSliderProps = {
  tags: Tag[];
};

const settings: Settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
};

export const TagsSlider = ({ tags }: TagsSliderProps) => {
  const slider = useRef<any>(null);

  return (
    <section
      aria-label="Slider de etiquetas de productos"
      className="w-full hidden lg:block relative"
    >
      <button
        onClick={() => slider.current?.slickNext()}
        className="absolute text-[#3A3A3A] flex items-center justify-center z-10 -right-6 top-[50%] [transform:translateY(-50%)]"
      >
        <ChevronRight className="w-9 h-9" />
      </button>
      <button
        onClick={() => slider.current?.slickPrev()}
        className="absolute text-[#3A3A3A] flex items-center justify-center z-10 -left-6 top-[50%] [transform:translateY(-50%)]"
      >
        <ChevronLeft className="w-9 h-9" />
      </button>

      <Slider ref={slider} {...settings} className="w-full !mx-auto px-4">
        {tags.map((t) => (
          <Link key={t} href={`${ROUTES.products()}?tag=${t}`}>
            <div className="rounded-lg hover:bg-cblue hover:text-white group mx-auto flex flex-col gap-5 !w-[250px] justify-center  items-center p-6 bg-[#EFF2FF]">
              <ShirtIcon className="h-16 w-16 mx-auto text-[#393D46] group-hover:text-white" />
              <p className="text-xl font-montserrat-regular  capitalize">{t}</p>
            </div>
          </Link>
        ))}
      </Slider>
    </section>
  );
};
