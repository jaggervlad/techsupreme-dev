import { MainLayout } from '@/components/layouts/main-layout';
import { CartContentCheckout } from '@/features/checkout/cart-content-checkout';
import { CheckoutForm } from '@/features/checkout/checkout-form';

export default function CheckoutPage() {
  return (
    <MainLayout>
      <div className="relative w-full h-full lg:py-10">
        <div className="absolute hidden lg:block bg- -z-10 w-[50%] top-0 bottom-0 left-0 bg-primary" />

        <div className="lg:hidden ">
          <div className="bg-primary py-10">
            <div className="container">
              <CartContentCheckout />
            </div>
          </div>

          <div className="container py-10">
            <CheckoutForm />
          </div>
        </div>

        <div className="container hidden lg:flex h-full">
          <CartContentCheckout />
          <CheckoutForm />
        </div>
      </div>
    </MainLayout>
  );
}
