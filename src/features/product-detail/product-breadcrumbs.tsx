import { ROUTES } from '@/lib/routes';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type ProductBreadcrumbsProps = {
  pages: { name: string; href: string }[];
};

export function ProductBreadcrumbs({ pages }: ProductBreadcrumbsProps) {
  return (
    <nav className="flex" aria-label="Navegación de producto">
      <ol role="list" className="flex items-center space-x-1">
        <li>
          <div>
            <Link
              href={ROUTES.products()}
              className="font-medium font-montserrat-semibold text-muted-foreground hover:text-foreground"
            >
              Tienda
            </Link>
          </div>
        </li>
        {pages.map((page, index) => (
          <BreadcrumbItem key={index} {...page} />
        ))}
      </ol>
    </nav>
  );
}

type BreadcrumbItemProps = {
  href: string;
  name: string;
};

function BreadcrumbItem({ href, name }: BreadcrumbItemProps) {
  const pathname = usePathname();

  const currentPathname = pathname.split('/')[2];
  const currentHref = href.split('/')[2];

  const isActive = currentPathname === currentHref;

  return (
    <li>
      <div className="flex items-center">
        <svg
          className="flex-shrink-0 w-5 h-5 text-muted-foreground"
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
        </svg>
        <Link
          href={href}
          className={cn(
            'ml-2 capitalize font-montserrat-semibold font-medium text-muted-foreground hover:text-foreground',
            isActive && 'font-bold text-foreground font-montserrat-bold'
          )}
          aria-current={isActive ? 'page' : undefined}
        >
          {name}
        </Link>
      </div>
    </li>
  );
}
