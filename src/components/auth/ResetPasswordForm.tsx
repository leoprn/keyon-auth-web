'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Logo from '@/components/Logo'

export default function ResetPasswordForm() {
  const router = useRouter()
  const supabase = createClientComponentClient()
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState<{ type: string; content: string } | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  // Detectar si estamos en un dispositivo móvil
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMobile(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
    }
  }, [])

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)

    // Validar que las contraseñas coincidan
    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', content: 'Las contraseñas no coinciden. Por favor verifica que sean idénticas.' })
      return
    }

    const { error } = await supabase.auth.updateUser({ password: newPassword })

    if (error) {
      console.error('Error al actualizar contraseña:', error)
      let errorMessage = error.message || 'Error al actualizar la contraseña.'
      
      // Traducir mensajes de error comunes
      if (error.message.includes('different from the old password')) {
        errorMessage = 'La nueva contraseña debe ser diferente a la contraseña anterior.'
      } else if (error.message.includes('password')) {
        errorMessage = 'Error en la contraseña: debe tener al menos 6 caracteres.'
      } else if (error.message.includes('session')) {
        errorMessage = 'Error de sesión. Por favor, solicita un nuevo enlace de recuperación.'
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
          className={`p-4 mb-4 rounded-lg ${message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}
        >
          {message.type === 'error' ? (
            <div>
              <p className="text-lg font-bold">Error al actualizar contraseña</p>
              <p>{message.content}</p>
            </div>
          ) : (
            <p className="text-xl font-bold">{message.content}</p>
          )}
        </div>
      )}

      {message?.type === 'success' && isMobile && (
        <div className="mt-6">
          <p className="text-sm text-gray-600 mb-3">
            ¿Tienes la app de KeyOn instalada? Ábrela directamente:
          </p>
          <a
            href="keyonapp://login"
            className="block w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors text-center font-medium">
            Abrir App KeyOn
          </a>
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
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-black"
              required
              minLength={6}
              placeholder="••••••••"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirmar Contraseña
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-black"
              required
              minLength={6}
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
          >
            Actualizar Contraseña
          </button>
        </form>
      )}

      {message?.type === 'success' && (
        <div className="mt-6">
          <button
            onClick={() => router.push('/auth/login')}
            className="w-full border border-blue-600 text-blue-600 py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors text-center font-medium"
          >
            Ir al Inicio de Sesión
          </button>
        </div>
      )}
    </>
  )
} 