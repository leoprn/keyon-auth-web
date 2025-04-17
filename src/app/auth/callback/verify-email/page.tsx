'use client'

import dynamic from 'next/dynamic'
import LoadingFallback from '@/components/LoadingFallback'

// Cargamos el componente dinámicamente para evitar el pre-renderizado
const VerifyEmailForm = dynamic(
  () => import('@/components/auth/VerifyEmailForm'),
  {
    loading: () => <LoadingFallback />,
    ssr: false, // Importante: no renderizar en el servidor
  }
)

export default function VerifyEmailPage() {
  return <VerifyEmailForm />
} 