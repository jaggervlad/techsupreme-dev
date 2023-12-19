'use client';

import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import * as z from 'zod';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
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
import { toast } from 'sonner';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { BsGoogle } from 'react-icons/bs';

const profileFormSchema = z.object({
  fullName: z.string(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export function ProfileForm() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    mode: 'onChange',
  });

  function onSubmit(data: ProfileFormValues) {
    toast.success(
      <>
        You submitted the following values:
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      </>,
      {}
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-10 mx-auto w-[90%] p-2"
      >
        <div>
          <div>
            <h4 className="text-lg font-medium font-montserrat-semibold">
              Perfil
            </h4>
            <Separator className="mt-2" />
          </div>

          <div className="grid grid-cols-1 px-4 py-6 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="flex items-center col-span-full gap-x-8">
              <Avatar className="w-16 h-16">
                <AvatarImage src="" alt={'SA'} />
                <AvatarFallback>SA</AvatarFallback>
              </Avatar>
              <div>
                <Button type="button" variant="secondary">
                  Cambiar Foto
                </Button>
                <p className="mt-2 text-xs leading-5 text-gray-400">
                  JPG, GIF or PNG. 1MB max.
                </p>
              </div>
            </div>

            <div className="col-span-full">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre Completo</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        <div>
          <div className="">
            <h4 className="text-lg font-medium font-montserrat-semibold">
              Correos electrónicos
            </h4>
            <Separator className="mt-2" />
          </div>

          <div className="px-4 py-6 font-montserrat-regular">
            <ul className="mb-6">
              {[{ id: 2, email: 'prueba@dominio.com' }].map((e) => (
                <li key={e.id}>{e.email}</li>
              ))}
            </ul>

            <button className="text-cblue">
              + Agregar una dirección de correo electrónico
            </button>
          </div>
        </div>

        <div>
          <div className="">
            <h4 className="text-lg font-medium font-montserrat-semibold">
              Cuentas conectadas
            </h4>
            <Separator className="mt-2" />
          </div>

          <div className="px-4 py-6 font-montserrat-regular">
            <ul>
              {[{ id: 2, email: 'prueba@dominio.com' }].map((e) => (
                <li key={e.id} className="flex items-center gap-2">
                  <BsGoogle /> {e.email}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <div className="mt-4">
            <h4 className="text-lg font-medium font-montserrat-semibold">
              Contraseña
            </h4>
            <Separator className="mt-2" />
          </div>

          <div className="px-4 py-6 font-montserrat-regular">
            <button className="text-cblue">+ Configurar la clave</button>
          </div>
        </div>

        <Button type="submit">Guardar cambios</Button>
      </form>
    </Form>
  );
}
