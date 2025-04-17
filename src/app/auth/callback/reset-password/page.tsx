'use client'

import dynamic from 'next/dynamic'
import LoadingFallback from '@/components/LoadingFallback'

// Cargamos el componente dinámicamente para evitar el pre-renderizado
const ResetPasswordForm = dynamic(
  () => import('@/components/auth/ResetPasswordForm'),
  {
    loading: () => <LoadingFallback />,
    ssr: false, // Importante: no renderizar en el servidor
  }
)

export default function ResetPasswordPage() {
  return <ResetPasswordForm />
} 