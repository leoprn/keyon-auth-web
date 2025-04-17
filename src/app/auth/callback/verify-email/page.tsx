'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function VerifyEmail() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  useEffect(() => {
    const token_hash = searchParams.get('token_hash')
    const type = searchParams.get('type')
    const next = searchParams.get('next') ?? '/'

    if (token_hash && type) {
      supabase.auth.verifyOtp({ token_hash, type })
        .then(({ error }) => {
          if (!error) {
            // Redirigir al usuario a la página principal o a donde especifique next
            router.push(next)
          } else {
            console.error('Error verificando email:', error.message)
            // Aquí podrías mostrar un mensaje de error
          }
        })
    }
  }, [searchParams, router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-4 max-w-md w-full bg-white rounded-lg shadow">
        <h1 className="text-2xl font-bold text-center mb-4">Verificando tu email...</h1>
        <p className="text-center text-gray-600">
          Por favor espera mientras verificamos tu dirección de email.
        </p>
      </div>
    </div>
  )
} 