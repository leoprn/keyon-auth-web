'use client'

import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Logo from '@/components/Logo'
import Link from 'next/link'

export default function RegisterPage() {
  const supabase = createClientComponentClient()
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setMessage(null)
    setLoading(true)
    
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/verify-email`
        }
      })
      
      if (error) {
        let errorMessage = 'Error al registrar usuario'
        
        // Traducir mensajes comunes de error
        if (error.message.includes('email already in use')) {
          errorMessage = 'Este correo electrónico ya está registrado.'
        } else if (error.message.includes('password')) {
          errorMessage = 'La contraseña debe tener al menos 6 caracteres.'
        }
        
        setError(errorMessage)
      } else {
        setMessage('¡Registro exitoso! Por favor verifica tu correo electrónico para activar tu cuenta.')
      }
    } catch (err) {
      setError('Error de conexión. Intenta nuevamente.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="p-8 max-w-md w-full bg-white rounded-lg shadow-md">
        <div className="text-center mb-6">
          <Logo />
          <h1 className="text-2xl font-bold text-gray-800 mt-4">Crear Cuenta</h1>
        </div>
        
        {error && (
          <div className="p-4 mb-6 rounded-lg text-sm bg-red-100 text-red-700">
            {error}
          </div>
        )}
        
        {message && (
          <div className="p-4 mb-6 rounded-lg text-sm bg-green-100 text-green-700">
            {message}
          </div>
        )}
        
        {!message && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Correo electrónico
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                placeholder="tu@email.com"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                placeholder="Mínimo 6 caracteres"
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className={`w-full ${loading ? 'bg-indigo-400' : 'bg-indigo-700 hover:bg-indigo-800'} text-white py-2 px-4 rounded-lg transition-colors font-medium`}
            >
              {loading ? 'Registrando...' : 'Crear Cuenta'}
            </button>
          </form>
        )}
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            ¿Ya tienes una cuenta?{' '}
            <Link href="/auth/login" className="text-indigo-700 hover:text-indigo-600 font-medium">
              Iniciar Sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
} 