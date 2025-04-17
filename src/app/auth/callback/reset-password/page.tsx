'use client'

import { Suspense, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { EmailOtpType } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'
export const revalidate = 0

function ResetPasswordContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [newPassword, setNewPassword] = useState('')
  const [message, setMessage] = useState({ type: '', content: '' })

  useEffect(() => {
    // Verificar el token cuando la página carga
    const token_hash = searchParams.get('token_hash')
    const type = searchParams.get('type')
    
    if (token_hash && type === 'recovery') {
      // Solo verificamos que el token sea válido
      supabase.auth.verifyOtp({ 
        token_hash, 
        type: type as EmailOtpType 
      })
        .then(({ error }) => {
          if (error) {
            setMessage({ type: 'error', content: 'Token inválido o expirado' })
          }
        })
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const { error } = await supabase.auth.updateUser({
      password: newPassword
    })

    if (error) {
      setMessage({ type: 'error', content: error.message })
    } else {
      setMessage({ type: 'success', content: 'Contraseña actualizada correctamente' })
      // Redirigir después de un breve delay
      setTimeout(() => router.push('/'), 2000)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="p-8 max-w-md w-full bg-white rounded-lg shadow">
        <h1 className="text-2xl font-bold text-center mb-6">Cambiar Contraseña</h1>
        
        {message.content && (
          <div className={`p-4 mb-4 rounded ${
            message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
          }`}>
            {message.content}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Nueva Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
              minLength={6}
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Actualizar Contraseña
          </button>
        </form>
      </div>
    </div>
  )
}

export default function ResetPassword() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="p-4 max-w-md w-full bg-white rounded-lg shadow">
          <h1 className="text-2xl font-bold text-center mb-4">Cargando...</h1>
        </div>
      </div>
    }>
      <ResetPasswordContent />
    </Suspense>
  )
} 