'use client'

// Completamente desactivamos SSR
export const dynamic = 'force-dynamic'
export const runtime = 'edge'
export const preferredRegion = 'auto'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import ResetPasswordForm from '@/components/auth/ResetPasswordForm'

// Componente de carga local para evitar problemas de importación
function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-4 max-w-md w-full bg-white rounded-lg shadow">
        <h1 className="text-2xl font-bold text-center mb-4">Cargando...</h1>
      </div>
    </div>
  )
}

export default function ResetPasswordPage() {
  // Renderizado en dos pasos para evitar errores de hydration
  const [isClient, setIsClient] = useState(false)
  
  useEffect(() => {
    setIsClient(true)
  }, [])
  
  // Solo renderizamos el componente real en el cliente
  if (!isClient) {
    return <LoadingFallback />
  }
  
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ClientResetPassword />
    </Suspense>
  )
}

// Componente separado para asegurar que useSearchParams no se ejecute durante SSR
function ClientResetPassword() {
  const searchParams = useSearchParams()
  const token_hash = searchParams.get('token_hash') || ''
  const type = searchParams.get('type') || ''
  
  return <ResetPasswordForm />
} 