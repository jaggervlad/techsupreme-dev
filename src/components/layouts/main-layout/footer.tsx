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
    href: `/search/${c.handle}`,
  }));

  const mappedPages = pages.map((p) => ({
    name: p.title,
    href: p.handle,
    isExternal: false,
  }));

  return (
    <footer className="pb-8 mt-auto text-white md:pt-12 bg-primary">
      <div className="container relative grid mb-8 space-y-8 lg:space-y-0 md:grid-cols-2 lg:grid-cols-4">
        <ScrollToTopButton className="absolute top-0 hidden md:block right-8" />
        <div className="hidden md:block">
          <Link
            href="/"
            aria-label="TechSupreme Logo"
            className="flex-shrink-0"
          >
            <h4 className="text-3xl font-bold tracking-wide uppercase w-60">
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
        <FooterListContainer
          title="COLECCIONES"
          containerClassName="hidden md:block"
        >
          {mappedCollections.map(({ name, href }) => (
            <FooterListItem key={href} href={href}>
              {name}
            </FooterListItem>
          ))}
        </FooterListContainer>
        <FooterListContainer
          title="Páginas"
          containerClassName="hidden md:block"
        >
          {[...mappedPages, ...footerNavigationData.utils].map(
            ({ name, href, isExternal }) => (
              <FooterListItem key={href} href={href} isExternal={isExternal}>
                {name}
              </FooterListItem>
            )
          )}
        </FooterListContainer>
      </div>

      <div className="container md:hidden">
        <div className="flex justify-center gap-3 mb-8 md:hidden">
          {footerNavigationData.social.map(
            ({ name, href, icon: Icon, isExternal }) => (
              <FooterListItem
                label={`Red Social ${name}`}
                key={href}
                href={href}
                isExternal={isExternal}
                isListItem={false}
              >
                <div className="p-2 bg-white border rounded-full">
                  <Icon className="w-8 h-8 text-primary" aria-hidden />
                </div>
              </FooterListItem>
            )
          )}
        </div>

        <div className="flex items-center justify-between ">
          <Link href="/" aria-label="TechSupreme Logo" className="w-[225px]">
            <h4 className="text-2xl font-bold tracking-wide uppercase">
              Tech<span className="text-blue-600">Supreme</span>
            </h4>
          </Link>

          <ScrollToTopButton className="" />
        </div>
      </div>

      <div className="container flex justify-center pt-8 text-center md:justify-between">
        <p>© TECHSUPREME {new Date().getFullYear()}</p>

        <div className="hidden gap-3 md:flex">
          {footerNavigationData.social.map(
            ({ name, href, icon: Icon, isExternal }) => (
              <FooterListItem
                label={`Red Social ${name}`}
                key={href}
                href={href}
                isExternal={isExternal}
                isListItem={false}
              >
                <div className="p-2 bg-white border rounded-full">
                  <Icon className="w-6 h-6 text-primary" aria-hidden />
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
  containerClassName?: string;
}

function FooterListContainer({
  title,
  children,
  className,
  containerClassName,
}: FooterListContainerProps) {
  return (
    <div className={containerClassName}>
      <h4 className="mb-3 text-lg font-bold uppercase font-montserrat-bold text-white/70">
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
  const itemClassname =
    'flex items-center gap-2 font-montserrat-regular hover:underline hover:underline-offset-4';

  if (!isListItem) {
    return (
      <Link
        href={href}
        target={isExternal ? '_blank' : undefined}
        referrerPolicy={isExternal ? 'no-referrer' : undefined}
        className={itemClassname}
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
        className={itemClassname}
        aria-label={label}
      >
        {children}
      </Link>
    </li>
  );
}
