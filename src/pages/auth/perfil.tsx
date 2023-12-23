import { AuthLayout } from '@/components/layouts/auth-layout';
import { Separator } from '@/components/ui/separator';
import { ProfileForm } from '@/features/auth/profile-form';

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
