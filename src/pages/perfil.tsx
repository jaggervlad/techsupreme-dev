import { MainLayout } from '@/components/layouts/main-layout';
import { SidebarNav } from '@/components/layouts/auth-layout/sidebar-nav-profile';
import { AuthLayout } from '@/components/layouts/auth-layout';
import { ProfileForm } from '@/features/auth/profile-form';
import { Separator } from '@/components/ui/separator';

const sidebarNavItems = [
  {
    title: 'Perfil',
    href: '/perfil',
  },
  {
    title: 'Compras',
    href: '/orders',
  },
];

export default function ProfilePage() {
  return (
    <AuthLayout>
      <div>
        <h3 className="text-xl font-medium font-montserrat-semibold">Perfil</h3>
        <p className="text-base text-muted-foreground font-montserrat-regular">
          Administra la configuración de tu cuenta
        </p>
      </div>
      <Separator className="mt-2 mb-8" />
      <ProfileForm />
    </AuthLayout>
  );
}
