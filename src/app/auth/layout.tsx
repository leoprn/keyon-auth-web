// Forzar renderizado dinámico para todas las páginas de auth
export const dynamic = 'force-dynamic'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 