import { cn } from '@/lib/utils';
import Link from 'next/link';
import React, { PropsWithChildren } from 'react';

import { useGetPages } from '@/hooks/useGetPages';
import { footerNavigationData } from '@/lib/constants';

export function Footer() {
  const { pages } = useGetPages();

  return (
    <footer className="mt-auto text-white bg-primary pt-10 pb-10">
      <div className="container space-y-8 lg:space-y-0 mb-12 grid md:grid-cols-2 lg:grid-cols-4">
        <p className="lg:max-w-[30ch] text-white/80">
          Este sitio web y su contenido se proporcionan &quot;tal como
          están&quot; y &quot;según estén disponibles&quot; sin ninguna garantía
          o representación de ningún tipo, ya sea expresa o implícita. La
          información sobre precios y disponibilidad está sujeta a cambios sin
          previo aviso.
        </p>

        <FooterListContainer title="Páginas">
          {pages.map(({ title, handle }) => (
            <FooterListItem key={handle} href={handle}>
              {title}
            </FooterListItem>
          ))}
        </FooterListContainer>
        <FooterListContainer title="ENLACES">
          {footerNavigationData.utils.map(({ name, href }) => (
            <FooterListItem key={href} href={href}>
              {name}
            </FooterListItem>
          ))}
        </FooterListContainer>

        <div className="flex flex-col gap-y-8">
          <FooterListContainer title="CONTACTO">
            {footerNavigationData.contact.map(({ name, href, icon: Icon }) => (
              <FooterListItem key={href} href={href}>
                <Icon /> {name}
              </FooterListItem>
            ))}
          </FooterListContainer>
          <FooterListContainer
            title="REDES SOCIALES"
            className="flex !space-y-0 gap-2 items-center"
          >
            {footerNavigationData.social.map(
              ({ name, href, icon: Icon, isExternal }) => (
                <FooterListItem
                  label={`Red Social ${name}`}
                  key={href}
                  href={href}
                  isExternal={isExternal}
                >
                  <div className="border p-2 rounded-full hover:bg-slate-800">
                    <Icon className="h-4 w-4" aria-hidden />
                  </div>
                </FooterListItem>
              )
            )}
          </FooterListContainer>
        </div>
      </div>

      <div className="container border-t pt-8  text-center">
        <p>
          © {new Date().getFullYear()} Tech Supreme. Todos los derechos
          reservados.
        </p>
      </div>
    </footer>
  );
}

interface FooterListContainerProps extends PropsWithChildren {
  title: string;
  className?: string;
}

function FooterListContainer({
  title,
  children,
  className,
}: FooterListContainerProps) {
  return (
    <div>
      <h4 className="font-bold mb-3 text-lg uppercase text-white/70">
        {title}
      </h4>
      <ul className={cn(className, 'text-base space-y-2')}>{children}</ul>
    </div>
  );
}

interface FooterListItemProps extends PropsWithChildren {
  href: string;
  isExternal?: boolean;
  label?: string;
}

function FooterListItem({
  children,
  label,
  href,
  isExternal,
}: FooterListItemProps) {
  return (
    <li>
      <Link
        href={href}
        target={isExternal ? '_blank' : undefined}
        referrerPolicy={isExternal ? 'no-referrer' : undefined}
        className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        aria-label={label}
      >
        {children}
      </Link>
    </li>
  );
}
