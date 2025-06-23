// Forzar renderizado dinámico para todas las rutas API
export const dynamic = 'force-dynamic'

export default function ApiLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 