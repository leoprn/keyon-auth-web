import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@fontsource/inter";

// Forzar renderizado dinámico para toda la aplicación
export const dynamic = 'force-dynamic'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: '%s | KeyOn - Control de Accesos Digital',
    default: 'KeyOn - Tu Llave Digital Universal | Control de Accesos con QR'
  },
  description: "KeyOn es la solución de control de accesos más segura y fácil de usar. Accede a barrios, oficinas, gimnasios y eventos con un simple código QR desde tu celular. Seguro como una operación bancaria.",
  keywords: [
    "control de accesos",
    "código QR",
    "acceso digital",
    "seguridad",
    "KeyOn",
    "acceso barrios",
    "acceso oficinas",
    "acceso gimnasios",
    "control de entrada",
    "aplicación móvil",
    "tecnología de acceso",
    "llave digital"
  ],
  authors: [{ name: "KeyOn" }],
  creator: "KeyOn",
  publisher: "KeyOn",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://keyon.app'),
  openGraph: {
    title: 'KeyOn - Tu Llave Digital Universal',
    description: 'Accede a cualquier lugar con un código QR desde tu celular. Control de accesos seguro para barrios, oficinas, gimnasios y eventos.',
    url: '/',
    siteName: 'KeyOn',
    locale: 'es_ES',
    type: 'website',
    images: [
      {
        url: '/images/keyon-logo.png',
        width: 1200,
        height: 630,
        alt: 'KeyOn - Control de Accesos Digital',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KeyOn - Tu Llave Digital Universal',
    description: 'Accede a cualquier lugar con un código QR desde tu celular. Seguro, rápido y universal.',
    images: ['/images/keyon-logo.png'],
    creator: '@KeyOnApp',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code', // Agrega tu código de verificación
    // yandex: 'yandex-verification-code',
    // bing: 'msvalidate.01-code',
  },
  category: 'technology',
  classification: 'Tecnología de Control de Accesos',

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <link rel="canonical" href={process.env.NEXT_PUBLIC_SITE_URL || 'https://keyon.app'} />
        <link rel="alternate" hrefLang="es" href={process.env.NEXT_PUBLIC_SITE_URL || 'https://keyon.app'} />
        <meta name="geo.region" content="AR" />
        <meta name="geo.placename" content="Argentina" />
        <meta name="theme-color" content="#4F46E5" />
        
        {/* Structured Data for Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "KeyOn",
              "description": "Plataforma de control de accesos digital con tecnología QR",
              "url": process.env.NEXT_PUBLIC_SITE_URL || 'https://keyon.app',
              "logo": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://keyon.app'}/images/keyon-logo.png`,
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "areaServed": "AR",
                "availableLanguage": "Spanish"
              },
              "sameAs": [
                "https://twitter.com/KeyOnApp",
                "https://linkedin.com/company/keyon"
              ]
            })
          }}
        />
        
        {/* Structured Data for Software Application */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "KeyOn",
              "description": "Aplicación de control de accesos digital que permite el acceso seguro a edificios, barrios y espacios mediante códigos QR",
              "applicationCategory": "SecurityApplication",
              "operatingSystem": "iOS, Android, Web",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "ARS"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "ratingCount": "150"
              },
              "screenshot": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://keyon.app'}/images/KeyOn.png`
            })
          }}
        />
      </head>
      <body className="bg-[#fafafa] text-[#222] font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
