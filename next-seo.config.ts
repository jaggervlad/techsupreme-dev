import { DefaultSeoProps } from 'next-seo';

const seoConfig: DefaultSeoProps = {
  title: 'Bienvenido',
  description:
    '¡Bienvenido a TechSupreme - Tu Destino de Compras en Línea! Explora nuestro extenso catálogo de productos de alta calidad y encuentra todo lo que necesitas para tu estilo de vida. Desde moda y accesorios de última tendencia hasta productos para el hogar y tecnología de vanguardia, en TechSupreme tenemos todo cubierto. Descubre ofertas exclusivas, envío rápido y un servicio al cliente excepcional. ¡Empieza a comprar hoy y experimenta la comodidad de comprar en línea con nosotros!',
  titleTemplate: 'TechSupreme - %s',
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: 'https://techsupreme.store',
    siteName: 'TechSupreme Ecommerce Website',
  },
};

export default seoConfig;
