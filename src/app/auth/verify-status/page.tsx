'use client'

import { Suspense, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Logo from '@/components/Logo'

// Componente real que usa useSearchParams
function VerifyStatusContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const status = searchParams.get('status')
  const message = searchParams.get('message')
  const nextUrl = searchParams.get('next')

  useEffect(() => {
    if (status === 'success' && nextUrl) {
      // Redirige automáticamente después de mostrar el mensaje de éxito
      const timer = setTimeout(() => {
        router.push(nextUrl)
      }, 3000) // Espera 3 segundos
      return () => clearTimeout(timer)
    }
  }, [status, nextUrl, router])

  let content
  if (status === 'success') {
    content = (
      <>
        <h1 className="text-2xl font-bold text-green-700 mb-3">¡Email Verificado!</h1>
        <p className="text-gray-600">Tu dirección de email ha sido verificada con éxito.</p>
        <p className="text-gray-500 text-sm mt-2">Serás redirigido en breve...</p>
      </>
    )
  } else {
    content = (
      <>
        <h1 className="text-2xl font-bold text-red-700 mb-3">Error de Verificación</h1>
        <p className="text-gray-600">{message || 'Ha ocurrido un error durante la verificación.'}</p>
        <p className="text-gray-500 text-sm mt-4">
          Por favor, intenta de nuevo o contacta con soporte si el problema persiste.
        </p>
        <button
           onClick={() => router.push('/')} // Botón para volver al inicio
           className="mt-6 w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
        >
           Volver al Inicio
        </button>
      </>
    )
  }

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
      <p>Cargando estado de verificación...</p>
    </div>
  )
}

// Página principal que envuelve en Suspense
export default function VerifyStatusPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <VerifyStatusContent />
    </Suspense>
  )
} 