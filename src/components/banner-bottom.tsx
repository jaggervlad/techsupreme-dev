import Image from 'next/image';
import Link from 'next/link';

export const BannerBottom = () => {
  return (
    <div className="py-20">
      <Link href="/">
        <Image
          alt=""
          className="w-full h-[100px] md:max-h-96 md:h-full md:aspect-[14/3]"
          width={1685}
          height={400}
          src={'/bottom-banner.png'}
        />
      </Link>
    </div>
  );
};
