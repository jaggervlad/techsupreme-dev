import { PropsWithChildren } from 'react';
import { MainLayout } from '../main-layout';
import { SidebarNav } from './sidebar-nav-profile';
const sidebarNavItems = [
  {
    title: 'Perfil',
    href: '/perfil',
  },
  {
    title: 'Compras',
    href: '/pedidos',
  },
];

type AuthPageProps = {} & PropsWithChildren;

export function AuthLayout({ children }: AuthPageProps) {
  return (
    <MainLayout>
      <div className="container py-10">
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1">{children}</div>
        </div>
      </div>
    </MainLayout>
  );
}
