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
        <h1 className="text-2xl font-bold text-green-700 mb-3">¡Email Verificado!</h1>
        <p className="text-gray-600 mb-4">Tu dirección de email ha sido verificada con éxito.</p>

        {/* Botón Deeplink para móviles */}
        {isMobile && (
          <a 
            href="com.keyonapp://login" // <-- Deep link actualizado
            className="mb-4 inline-block w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-150 ease-in-out font-medium"
          >
            Abrir en la App KeyOn
          </a>
        )}

        {/* Mensaje y enlace web (se muestra siempre, pero es más útil en escritorio) */}
        <p className="text-gray-500 text-sm">
          Puedes cerrar esta ventana o <Link href={nextUrl || '/'} className="underline text-indigo-600 hover:text-indigo-800">continuar a la aplicación web</Link>.
        </p>
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