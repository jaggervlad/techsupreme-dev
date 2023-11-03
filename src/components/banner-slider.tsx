import { cn } from '@/lib/utils';
import Image from 'next/image';
import Slider from 'react-slick';

const settings = {
  dots: false,
  arrows: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
};

function SampleNextArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={cn(className, 'absolute block !right-5')}
      style={{
        ...style,
      }}
      onClick={onClick}
    ></div>
  );
}

function SamplePrevArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={cn(className, '!block !left-5 z-10')}
      style={{ ...style }}
      onClick={onClick}
    />
  );
}
export function BannerSlider() {
  return (
    <Slider {...settings}>
      <div className="aspect-video max-h-96 relative">
        <Image
          src="/banner-example.png "
          className="h-full w-full rounded-lg"
          alt=""
          fill
        />
      </div>
      <div className="aspect-video max-h-96 relative">
        <Image
          src="/banner-example.png "
          className="h-full w-full rounded-lg"
          alt=""
          fill
        />
      </div>
      <div className="aspect-video max-h-96 relative">
        <Image
          src="/banner-example.png "
          className="h-full w-full rounded-lg"
          alt=""
          fill
        />
      </div>
    </Slider>
  );
}
