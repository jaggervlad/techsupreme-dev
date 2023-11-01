import Link from 'next/link';
import { Button, buttonVariants } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

type Props = {
  statusCode: number | undefined;
};

const Error: NextPage<Props> = ({ statusCode }) => {
  const router = useRouter();
  return (
    <main className="grid h-screen place-items-center bg-background px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-slate-900 dark:text-slate-300">
          404
        </p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
          Página no encontrada
        </h1>
        <p className="dark:text-white-400 mt-6 text-base leading-7 text-slate-600">
          Lo sentimos, no pudimos encontrar la página que estás buscando.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button size="lg" onClick={(e) => router.back()}>
            Regresar
          </Button>
        </div>
      </div>
    </main>
  );
};

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
