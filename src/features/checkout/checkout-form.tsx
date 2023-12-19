import { useState } from 'react';
import { RadioGroup } from '@headlessui/react';
import { CheckCircleIcon, TrashIcon } from '@heroicons/react/20/solid';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CreditCard } from 'lucide-react';
import { FaGooglePay } from 'react-icons/fa';

const formSchema = z.object({
  email: z.string().email(),
  fullName: z.string(),
  address: z.string(),
  phone: z.string(),
  country: z.string(),
  cardNumber: z.string(),
  nameOnCard: z.string(),
  experidationDateCard: z.string(),
  cvcCard: z.string(),
});

const deliveryMethods = [
  {
    id: 1,
    title: 'Tarjeta de credito',
    icon: CreditCard,
  },
  { id: 2, title: 'Google Pay', icon: FaGooglePay },
];

export const CheckoutForm = () => {
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(
    deliveryMethods[0]
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="lg:w-[50%] lg:pl-10"
      >
        <div className="">
          <h2 className="text-lg font-medium text-gray-900 sr-only">
            Shipping information
          </h2>
          <div className="grid grid-cols-1 mt-4 gap-y-6 ">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo electrónico</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre completo</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dirección</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pais</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Peru">Perú</SelectItem>
                      <SelectItem value="Ecuador">Ecuador</SelectItem>
                      <SelectItem value="Estados Unidos">
                        Estados Unidos
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Teléfono</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        {/* Payment */}
        <div className="pt-10 mt-10 border-t border-gray-200">
          <h2 className="text-lg font-medium text-gray-900 font-montserrat-semibold">
            Métodos de pagos
          </h2>
          <RadioGroup
            value={selectedDeliveryMethod}
            onChange={setSelectedDeliveryMethod}
            className={'col-span-2'}
          >
            <div className="grid grid-cols-1 mt-4 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
              {deliveryMethods.map((deliveryMethod) => (
                <RadioGroup.Option
                  key={deliveryMethod.id}
                  value={deliveryMethod.title}
                  className={({ checked, active }) =>
                    cn(
                      checked ? 'border-transparent' : 'border-gray-300',
                      active ? 'ring-2 ring-cblue' : '',
                      'relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none '
                    )
                  }
                >
                  {({ checked, active }) => {
                    const Icon = deliveryMethod.icon;

                    return (
                      <>
                        <span className="flex flex-1">
                          <span className="flex flex-col">
                            <RadioGroup.Label
                              as="span"
                              className="block text-sm font-medium font-montserrat-semibold"
                            >
                              <Icon className="w-10 h-10" />
                            </RadioGroup.Label>

                            <RadioGroup.Description
                              as="span"
                              className="mt-6 text-sm font-medium font-montserrat-semibold"
                            >
                              {deliveryMethod.title}
                            </RadioGroup.Description>
                          </span>
                        </span>
                        {checked ? (
                          <CheckCircleIcon
                            className="w-5 h-5 text-cblue"
                            aria-hidden="true"
                          />
                        ) : null}
                        <span
                          className={cn(
                            active ? 'border' : 'border-2',
                            checked ? 'border-cblue' : 'border-transparent',
                            'pointer-events-none absolute -inset-px rounded-lg'
                          )}
                          aria-hidden="true"
                        />
                      </>
                    );
                  }}
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>

          <div className="grid grid-cols-4 mt-6 gap-x-4 gap-y-6">
            <FormField
              control={form.control}
              name="cardNumber"
              render={({ field }) => (
                <FormItem className="col-span-4">
                  <FormLabel>Número de tarjeta</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nameOnCard"
              render={({ field }) => (
                <FormItem className="col-span-4">
                  <FormLabel>Nombre en la tarjeta</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="experidationDateCard"
              render={({ field }) => (
                <FormItem className="col-span-3">
                  <FormLabel>Fecha de expiración (MM/YY)</FormLabel>
                  <FormControl>
                    <Input type="month" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cvcCard"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel>CVC</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button className="w-full mt-10 bg-cblue">Pagar</Button>
      </form>
    </Form>
  );
};
