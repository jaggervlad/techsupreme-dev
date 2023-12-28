import { cn } from '@/lib/utils';
import Link from 'next/link';
import React, { PropsWithChildren } from 'react';

import { useGetPages } from '@/hooks/useGetPages';
import { footerNavigationData } from '@/lib/constants';
import { useGetCollections } from '@/hooks/useGetCollections';
import { ScrollToTopButton } from '@/components/layouts/main-layout/scroll-to-top';
import { ROUTES } from '@/lib/routes';
import { Logo, LogoDark } from '@/components/logo';
import { InstagramLogo } from '@/components/icons';

export function Footer() {
  const { pages } = useGetPages();
  const { collections } = useGetCollections();

  const mappedCollections = collections.map((c) => ({
    name: c.title,
    href: ROUTES.products(c.handle),
  }));

  const mappedPages = pages.map((p) => ({
    name: p.title,
    href: p.handle,
    isExternal: false,
  }));

  return (
    <footer className="pb-8 mt-auto  md:pt-12 bg-primary">
      <div className="container relative text-white grid mb-8 space-y-8 lg:space-y-0 md:grid-cols-2 lg:grid-cols-4">
        <ScrollToTopButton className="absolute top-0 hidden md:block right-8" />
        <div className="hidden md:block">
          <Link
            href="/"
            aria-label="TechSupreme Logo"
            className="flex-shrink-0"
          >
            <span className="sr-only">TECHSUPREME LOGO</span>
            <LogoDark />
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
        <SocialIcons className="flex justify-center gap-3 mb-8" />

        <div className="flex items-center justify-between">
          <Link href="/" aria-label="TechSupreme Logo">
            <LogoDark className="w-48" />
          </Link>

          <ScrollToTopButton className="" />
        </div>
      </div>

      <div className="container  flex justify-center pt-8 text-center md:justify-between">
        <p className="text-white">© TECHSUPREME {new Date().getFullYear()}</p>
        <SocialIcons className="gap-3 hidden md:flex" />
      </div>
    </footer>
  );
}

export function SocialIcons({ className }: { className?: string }) {
  return (
    <div className={className}>
      {footerNavigationData.social.map(
        ({ name, href, icon: Icon, isExternal }) => (
          <FooterListItem
            label={`Red Social ${name}`}
            key={name}
            href={href}
            isExternal={isExternal}
            isListItem={false}
          >
            <div className="p-2 border bg-white rounded-full">
              <Icon className="w-6 h-6" aria-hidden />
            </div>
          </FooterListItem>
        )
      )}
    </div>
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
