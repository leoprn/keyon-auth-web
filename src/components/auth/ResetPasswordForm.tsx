'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Logo from '@/components/Logo'

export default function ResetPasswordForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token_hash = searchParams.get('token_hash') || ''
  const type = searchParams.get('type') || ''
  const [newPassword, setNewPassword] = useState('')
  const [message, setMessage] = useState<{ type: string; content: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)
    
    try {
      // Primero verificamos el token
      const { error: verifyError } = await supabase.auth.verifyOtp({
        token_hash,
        type: 'recovery'
      })

      if (verifyError) {
        setMessage({ type: 'error', content: 'Token inválido o expirado' })
        return
      }

      // Si el token es válido, actualizamos la contraseña
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      })

      if (error) {
        setMessage({ type: 'error', content: error.message })
      } else {
        setMessage({ type: 'success', content: 'Contraseña actualizada correctamente' })
        setTimeout(() => router.push('/'), 2000)
      }
    } catch (error) {
      setMessage({ type: 'error', content: 'Error al actualizar la contraseña' })
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-6 max-w-sm w-full bg-white rounded-xl shadow-lg">
        <Logo />
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Cambiar Contraseña
        </h2>
        
        {message && (
          <div className={`p-3 mb-4 rounded-lg text-sm ${
            message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
          }`}>
            {message.content}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Nueva Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              required
              minLength={6}
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 font-medium text-base transition-colors duration-200"
          >
            Actualizar Contraseña
          </button>
        </form>
      </div>
    </div>
  )
} 