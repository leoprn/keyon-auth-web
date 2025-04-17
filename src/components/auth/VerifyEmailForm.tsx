'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { EmailOtpType } from '@supabase/supabase-js'
import Logo from '@/components/Logo'

interface VerifyEmailFormProps {
  token_hash: string
  type: string
  next: string
}

export default function VerifyEmailForm({ token_hash, type, next }: VerifyEmailFormProps) {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    const verifyEmail = async () => {
      if (token_hash && type) {
        try {
          const { error: verifyError } = await supabase.auth.verifyOtp({ 
            token_hash, 
            type: type as EmailOtpType 
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