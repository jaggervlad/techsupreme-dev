import { cn } from '@/lib/utils';
import Link from 'next/link';
import React, { PropsWithChildren } from 'react';

import { useGetPages } from '@/hooks/useGetPages';
import { footerNavigationData } from '@/lib/constants';

export function Footer() {
  const { pages } = useGetPages();

  return (
    <footer className="mt-auto text-white bg-primary pt-10 pb-24">
      <div className="container space-y-8 lg:space-y-0 mb-12 grid md:grid-cols-2 lg:grid-cols-4">
        <FooterListContainer title="Páginas">
          {pages.map(({ title, handle }) => (
            <FooterListItem key={handle} href={handle}>
              {title}
            </FooterListItem>
          ))}
        </FooterListContainer>
        <FooterListContainer title="CONÓCENOS">
          {footerNavigationData.service.map(({ name, href, icon: Icon }) => (
            <FooterListItem key={href} href={href}>
              <Icon /> {name}
            </FooterListItem>
          ))}
        </FooterListContainer>

        <div className="flex flex-col gap-4">
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
                <FooterListItem key={href} href={href} isExternal={isExternal}>
                  <Icon className="h-6 w-6" />
                </FooterListItem>
              )
            )}
          </FooterListContainer>
        </div>
      </div>

      <div className="container border-t pt-8  text-center">
        <p>
          © {new Date().getFullYear()} Tech Store. Todos los derechos
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
      <h4 className="font-bold mb-3 text-lg uppercase">{title}</h4>
      <ul className={cn(className, 'text-base space-y-2')}>{children}</ul>
    </div>
  );
}

interface FooterListItemProps extends PropsWithChildren {
  href: string;
  isExternal?: boolean;
}

function FooterListItem({ children, href, isExternal }: FooterListItemProps) {
  return (
    <li>
      <Link
        href={href}
        target={isExternal ? '_blank' : undefined}
        referrerPolicy={isExternal ? 'no-referrer' : undefined}
        className="flex items-center gap-2"
      >
        {children}
      </Link>
    </li>
  );
}
