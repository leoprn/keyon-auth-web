'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Logo from '@/components/Logo'
import Link from 'next/link'

// Componente real que usa useSearchParams
function VerifyStatusContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const status = searchParams.get('status')
  const message = searchParams.get('message')
  const nextUrl = searchParams.get('next')

  // Estado para detectar si es móvil
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Detectar si es móvil en el cliente
    const userAgent = typeof window.navigator === "undefined" ? "" : navigator.userAgent;
    const mobile = /Mobi|Android|iPhone|iPad|iPod/i.test(userAgent);
    setIsMobile(mobile);
  }, []) // Ejecutar solo una vez al montar

  let content
  if (status === 'success') {
    content = (
      <>
        <h1 className="text-2xl font-bold text-green-700 mb-3">¡Tu email ya está verificado!</h1>
        <p className="text-gray-600 mb-4">La verificación se ha completado correctamente.</p>

        {/* Botón Deeplink para móviles */}
        {isMobile && (
          <div className="mb-4">
            <a 
              href="keyonapp://login"
              className="inline-block w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out font-medium"
            >
              Abrir App KeyOn
            </a>
          </div>
        )}
      </>
    )
  } else {
    // Traducir mensajes de error comunes
    let errorText = message || 'Ha ocurrido un error durante la verificación'
    if (errorText.includes('invalid') || errorText.includes('expired')) {
      errorText = 'El enlace no es válido o ha expirado'
    } else if (errorText.includes('JWT')) {
      errorText = 'El token de seguridad no es válido'
    } else if (errorText.includes('already verified')) {
      errorText = 'Este email ya ha sido verificado'
    }
    
    content = (
      <>
        <h1 className="text-2xl font-bold text-red-700 mb-3">Error de Verificación</h1>
        <p className="text-gray-600">{errorText}</p>
        <p className="text-gray-500 text-sm mt-4">
          Por favor, intenta de nuevo o contacta con soporte si el problema persiste.
        </p>
        <button
           onClick={() => router.push('/')} // Botón para volver al inicio
           className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
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