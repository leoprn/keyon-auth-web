'use client'

import { Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Logo from '@/components/Logo'

// Componente real que usa useSearchParams
function ResetStatusContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const status = searchParams.get('status')
  const message = searchParams.get('message')

  // Asumimos que esta página solo se muestra en caso de error del callback
  const content = (
    <>
      <h1 className="text-2xl font-bold text-red-700 mb-3">Error al Iniciar Reseteo</h1>
      <p className="text-gray-600">{message || 'Ha ocurrido un error inesperado.'}</p>
      <p className="text-gray-500 text-sm mt-4">
        No pudimos procesar tu solicitud de cambio de contraseña. Por favor, intenta solicitar un nuevo enlace de reseteo.
      </p>
      <button
         onClick={() => router.push('/auth/forgot-password')} // Botón para ir a solicitar nuevo enlace
         className="mt-6 w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
      >
         Solicitar Nuevo Enlace
      </button>
    </>
  )

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="p-8 max-w-md w-full bg-white rounded-lg shadow-md text-center">
        <div className="mx-auto mb-6 w-fit">
           <Logo />
        </div>
        {content}
      </div>
    </div>
  )
}

// Componente de carga simple
function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Cargando estado...</p>
    </div>
  )
}

// Página principal que envuelve en Suspense
export default function ResetStatusPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ResetStatusContent />
    </Suspense>
  )
} 