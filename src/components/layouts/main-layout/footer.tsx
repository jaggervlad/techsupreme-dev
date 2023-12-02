import { cn } from '@/lib/utils';
import Link from 'next/link';
import React, { PropsWithChildren } from 'react';

import { useGetPages } from '@/hooks/useGetPages';
import { footerNavigationData } from '@/lib/constants';
import { useGetCollections } from '@/hooks/useGetCollections';
import { ScrollToTopButton } from '@/components/layouts/main-layout/scroll-to-top';

export function Footer() {
  const { pages } = useGetPages();
  const { collections } = useGetCollections();

  const mappedCollections = collections.map((c) => ({
    name: c.title,
    href: c.handle,
  }));

  const mappedPages = pages.map((p) => ({
    name: p.title,
    href: p.handle,
    isExternal: false,
  }));

  return (
    <footer className="mt-auto text-white bg-primary pt-16 pb-10">
      <div className="container relative space-y-8 lg:space-y-0 mb-12 grid md:grid-cols-2 lg:grid-cols-4">
        <ScrollToTopButton />
        <div>
          <Link
            href="/"
            aria-label="TechSupreme Logo"
            className="flex-shrink-0"
          >
            <h4 className="font-bold tracking-wide uppercase w-60 text-3xl">
              Tech<span className="text-blue-600">Supreme</span>
            </h4>
          </Link>
        </div>
        <FooterListContainer title="CONTACTO">
          {footerNavigationData.contact.map(({ name, href }) => (
            <FooterListItem key={href} href={href}>
              {name}
            </FooterListItem>
          ))}
        </FooterListContainer>
        <FooterListContainer title="COLECCIONES">
          {mappedCollections.map(({ name, href }) => (
            <FooterListItem key={href} href={href}>
              {name}
            </FooterListItem>
          ))}
        </FooterListContainer>
        <FooterListContainer title="Páginas">
          {[...mappedPages, ...footerNavigationData.utils].map(
            ({ name, href, isExternal }) => (
              <FooterListItem key={href} href={href} isExternal={isExternal}>
                {name}
              </FooterListItem>
            )
          )}
        </FooterListContainer>
      </div>

      <div className="container flex justify-between  pt-8  text-center">
        <p>© {new Date().getFullYear()} TECHSUPREME</p>

        <div className="flex gap-3">
          {footerNavigationData.social.map(
            ({ name, href, icon: Icon, isExternal }) => (
              <FooterListItem
                label={`Red Social ${name}`}
                key={href}
                href={href}
                isExternal={isExternal}
                isListItem={false}
              >
                <div className="border p-2 rounded-full bg-white">
                  <Icon className="h-4 w-4 text-primary" aria-hidden />
                </div>
              </FooterListItem>
            )
          )}
        </div>
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
  isListItem?: boolean;
}

function FooterListItem({
  children,
  label,
  href,
  isExternal,
  isListItem = true,
}: FooterListItemProps) {
  if (!isListItem) {
    return (
      <Link
        href={href}
        target={isExternal ? '_blank' : undefined}
        referrerPolicy={isExternal ? 'no-referrer' : undefined}
        className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        aria-label={label}
      >
        {children}
      </Link>
    );
  }

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
