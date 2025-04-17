'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Logo from '@/components/Logo'

export default function VerifyEmailForm() {
  const searchParams = useSearchParams()
  const token_hash = searchParams.get('token_hash') || ''
  const type = searchParams.get('type') || ''
  const next = searchParams.get('next') || '/'

  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    const verifyEmail = async () => {
      if (!token_hash || !type) {
        setError('Parámetros de verificación inválidos')
        return
      }

      try {
        const { error: verifyError } = await supabase.auth.verifyOtp({
          token_hash,
          type: 'signup'
        })

        if (verifyError) {
          setError('Error al verificar el email: ' + verifyError.message)
        } else {
          router.push(next)
        }
      } catch (err) {
        setError('Error inesperado al verificar el email')
      }
    }

    verifyEmail()
  }, [token_hash, type, next, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-6 max-w-sm w-full bg-white rounded-xl shadow-lg">
        <Logo />
        <h2 className="text-2xl font-bold text-center mb-3 text-gray-800">
          Verificando tu email...
        </h2>
        {error ? (
          <p className="text-center text-red-600 text-base">
            {error}
          </p>
        ) : (
          <p className="text-center text-gray-600 text-base">
            Por favor espera mientras verificamos tu dirección de email.
          </p>
        )}
      </div>
    </div>
  )
} 