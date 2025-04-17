'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Logo from '@/components/Logo'

// Definimos las props que espera el componente
interface VerifyEmailFormProps {
  token_hash: string
  type: string
  next: string
}

export default function VerifyEmailForm({ token_hash, type, next }: VerifyEmailFormProps) {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    async function verifyToken() {
      if (!token_hash || !type) {
        setError('Token o tipo inválido.')
        return
      }

      if (type !== 'email') {
        setError('Tipo de token inválido para verificación de email.')
        return
      }

      setMessage('Verificando token...')

      const { error: verifyError } = await supabase.auth.verifyOtp({
        token_hash,
        type: 'email',
      })

      if (verifyError) {
        setError(`Error al verificar: ${verifyError.message}`)
        setMessage(null)
      } else {
        setMessage('Email verificado con éxito. Redirigiendo...')
        setError(null)
        // Redirige a la URL especificada en 'next' o al dashboard por defecto
        setTimeout(() => {
          router.push(next || '/dashboard')
        }, 2000)
      }
    }

    verifyToken()
  }, [token_hash, type, next, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="p-8 max-w-md w-full bg-white rounded-lg shadow-md">
        <div className="text-center mb-6">
          <Logo />
          <h1 className="text-2xl font-bold text-gray-800 mt-4">Verificación de Email</h1>
        </div>

        {message && (
          <div className="p-4 mb-4 rounded-lg text-sm bg-blue-100 text-blue-700">
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
      </div>
    </div>
  )
} 