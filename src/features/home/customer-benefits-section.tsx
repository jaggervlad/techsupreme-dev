import { Card } from '@/components/ui/card';
import { CreditCard, Headphones, TruckIcon } from 'lucide-react';

const customerBenefitsData = [
  {
    id: 1,
    title: 'Free Delivery',
    description: 'This free shipping only for selected region',
    icon: TruckIcon,
  },
  {
    id: 2,
    title: 'Payment Method',
    description: 'This free shipping only for selected region',
    icon: CreditCard,
  },
  {
    id: 3,
    title: 'Warranty',
    description: 'This free shipping only for selected region',
    icon: TruckIcon,
  },
  {
    id: 4,
    title: 'Customer Support ',
    description: 'This free shipping only for selected region',
    icon: Headphones,
  },
];

export const CustomerBenefitsSection = () => {
  return (
    <section className="py-24 bg-[#F2F2F2]">
      <div className="container grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
        {customerBenefitsData.map(({ id, title, description, icon: Icon }) => (
          <div className="flex items-center gap-10" key={id}>
            <Icon className="w-12 h-12" />

            <div>
              <h5 className="text-lg font-bold">{title}</h5>
              <p className="text-lg max-w-[200px]">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
