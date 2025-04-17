'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Logo from '@/components/Logo'

// Definimos las props que espera el componente
interface ResetPasswordFormProps {
  token_hash: string
  type: string
}

export default function ResetPasswordForm({ token_hash, type }: ResetPasswordFormProps) {
  const router = useRouter()
  const [newPassword, setNewPassword] = useState('')
  const [message, setMessage] = useState<{ type: string; content: string } | null>(null)

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)

    // Usamos las props token_hash y type
    if (!token_hash || !type) {
      setMessage({ type: 'error', content: 'Token inválido o tipo no especificado.' })
      return
    }

    if (type === 'recovery') {
      const { error } = await supabase.auth.updateUser(
        { password: newPassword },
        { /* No se necesita access_token aquí, el flujo de recovery usa el token implícito */ }
      )
      if (error) {
        setMessage({ type: 'error', content: error.message })
      } else {
        setMessage({ type: 'success', content: 'Contraseña actualizada con éxito.' })
        // Redirigir después de un breve retraso
        setTimeout(() => {
          router.push('/auth/signin')
        }, 2000)
      }
    } else {
      setMessage({ type: 'error', content: 'Tipo de token no soportado.' })
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="p-8 max-w-md w-full bg-white rounded-lg shadow-md">
        <div className="text-center mb-6">
          <Logo />
          <h1 className="text-2xl font-bold text-gray-800 mt-4">Cambiar Contraseña</h1>
        </div>

        {message && (
          <div
            className={`p-4 mb-4 rounded-lg text-sm ${message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}
          >
            {message.content}
          </div>
        )}

        <form onSubmit={handleResetPassword} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Nueva Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm text-black"
              required
              minLength={6}
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
          >
            Actualizar Contraseña
          </button>
        </form>
      </div>
    </div>
  )
} 