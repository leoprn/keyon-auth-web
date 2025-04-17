// Mantenemos esta página como Server Component

import { Suspense } from 'react'
import ClientResetPassword from './ClientResetPassword' // Nuevo componente cliente

// Componente de carga
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
  // El Server Component solo renderiza Suspense
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ClientResetPassword />
    </Suspense>
  )
} 