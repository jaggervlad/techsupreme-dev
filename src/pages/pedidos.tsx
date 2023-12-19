import { AuthLayout } from '@/components/layouts/auth-layout';
import { MainLayout } from '@/components/layouts/main-layout';
import { Separator } from '@/components/ui/separator';

export default function OrdersPages() {
  return (
    <AuthLayout>
      <div className="">
        <div>
          <h3 className="text-xl font-medium font-montserrat-semibold">
            Compras
          </h3>
          <p className="text-base text-muted-foreground font-montserrat-regular">
            Gestiona tus compras
          </p>
        </div>

        <Separator className="mt-2 mb-8" />
      </div>
    </AuthLayout>
  );
}
