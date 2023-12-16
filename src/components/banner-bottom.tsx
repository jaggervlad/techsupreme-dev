import Image from 'next/image';
import Link from 'next/link';

export const BannerBottom = () => {
  return (
    <div className="py-20">
      <Link href="/">
        <Image alt="" width={1685} height={250} src={'/bottom-banner.png'} />
      </Link>
    </div>
  );
};
