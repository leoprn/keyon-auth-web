import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Crear Cuenta',
  description: 'Regístrate en KeyOn y obtén tu llave digital universal. Accede a barrios, oficinas, gimnasios y eventos con un simple código QR desde tu celular.',
  openGraph: {
    title: 'Crear Cuenta - KeyOn',
    description: 'Regístrate en KeyOn y obtén tu llave digital universal. Acceso seguro con código QR.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 