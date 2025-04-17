'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Logo from '@/components/Logo'

export default function VerifyEmailPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClientComponentClient()
  
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Detectar si estamos en un dispositivo móvil
    if (typeof window !== 'undefined') {
      setIsMobile(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
    }
  }, [])

  useEffect(() => {
    async function verifyToken() {
      const token_hash = searchParams.get('token_hash')
      const type = searchParams.get('type')
      const next = searchParams.get('next') || '/dashboard'

      if (!token_hash || !type) {
        setError('Token o tipo inválido.')
        return
      }

      if (type !== 'email') {
        setError('Tipo de token inválido para verificación de email.')
        return
      }

      setMessage('Verificando token...')

      try {
        const { error: verifyError } = await supabase.auth.verifyOtp({
          token_hash,
          type: 'email',
        })

        if (verifyError) {
          setError(`Error al verificar: ${verifyError.message}`)
          setMessage(null)
        } else {
          setMessage('Email verificado con éxito.')
          setError(null)
        }
      } catch (err) {
        setError(`Error inesperado: ${err instanceof Error ? err.message : 'Desconocido'}`)
        setMessage(null)
      }
    }

    verifyToken()
  }, [searchParams, supabase.auth])

  const handleOpenMobileApp = () => {
    window.location.href = 'keyon://login'
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="p-8 max-w-md w-full bg-white rounded-lg shadow-md">
        <div className="text-center mb-6">
          <Logo />
          <h1 className="text-2xl font-bold text-gray-800 mt-4">Verificación de Email</h1>
        </div>

        {message && (
          <div className="p-4 mb-4 rounded-lg text-sm bg-green-100 text-green-700">
            {message}
          </div>
        )}

        {error && (
          <div className="p-4 mb-4 rounded-lg text-sm bg-red-100 text-red-700">
            {error}
          </div>
        )}

        {!message && !error && (
          <div className="p-4 mb-4 rounded-lg text-sm bg-gray-100 text-gray-700">
            Procesando verificación...
          </div>
        )}

        {message && !error && isMobile && (
          <div className="mt-6">
            <p className="text-sm text-gray-600 mb-3">
              ¿Tienes la app de KeyOn instalada? Abrela directamente:
            </p>
            <button
              onClick={handleOpenMobileApp}
              className="w-full bg-indigo-700 text-white py-3 px-4 rounded-lg hover:bg-indigo-800 transition-colors text-center font-medium">
              Abrir App KeyOn
            </button>
          </div>
        )}

        <div className="mt-6">
          <button
            onClick={() => router.push('/')}
            className="w-full border border-indigo-700 text-indigo-700 py-2 px-4 rounded-lg hover:bg-indigo-50 transition-colors text-center font-medium">
            Volver al Inicio
          </button>
        </div>
      </div>
    </div>
  )
} 