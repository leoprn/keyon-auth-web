'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Logo from '@/components/Logo'

export default function ResetPasswordForm() {
  const router = useRouter()
  const supabase = createClientComponentClient()
  const [newPassword, setNewPassword] = useState('')
  const [message, setMessage] = useState<{ type: string; content: string } | null>(null)

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)

    const { error } = await supabase.auth.updateUser({ password: newPassword })

    if (error) {
      console.error('Error al actualizar contraseña:', error)
      let errorMessage = error.message || 'Error al actualizar la contraseña.'
      if (error.message === 'New password should be different from the old password.') {
        errorMessage = 'La nueva contraseña debe ser diferente a la contraseña anterior.'
      }
      setMessage({ type: 'error', content: errorMessage })
    } else {
      setMessage({ type: 'success', content: '¡Contraseña actualizada con éxito!' })
    }
  }

  return (
    <>
      {message && (
        <div
          className={`p-4 mb-4 rounded-lg text-sm ${message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}
        >
          {message.content}
        </div>
      )}

      {message?.type !== 'success' && (
        <form onSubmit={handleUpdatePassword} className="space-y-4">
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
      )}
    </>
  )
} 