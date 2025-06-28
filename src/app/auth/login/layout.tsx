import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Iniciar Sesión',
  description: 'Accede a tu cuenta KeyOn para gestionar el control de accesos digital. Ingresa con tu email y contraseña de forma segura.',
  openGraph: {
    title: 'Iniciar Sesión - KeyOn',
    description: 'Accede a tu cuenta KeyOn para gestionar el control de accesos digital.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 