'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Logo from '@/components/Logo'
import Link from 'next/link'


export default function LoginPage() {
  const router = useRouter()
  const supabase = createClientComponentClient()
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      
      if (error) {
        let errorMessage = 'Error al iniciar sesión'
        
        // Traducir mensajes comunes de error
        if (error.message.includes('Invalid login credentials')) {
          errorMessage = 'Credenciales inválidas. Verifica tu email y contraseña.'
        } else if (error.message.includes('Email not confirmed')) {
          errorMessage = 'Email no confirmado. Por favor verifica tu bandeja de entrada.'
        }
        
        setError(errorMessage)
      } else {
        // Redirigir al dashboard
        router.push('/dashboard')
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
          <h1 className="text-2xl font-bold text-gray-800 mt-4">Iniciar Sesión</h1>
          <p className="text-gray-600 mt-2">Accede a tu cuenta KeyOn</p>
        </div>
        
        {error && (
          <div className="p-4 mb-6 rounded-lg text-sm bg-red-100 text-red-700" role="alert">
            {error}
          </div>
        )}
        
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
              autoComplete="email"
            />
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-1">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <Link href="/auth/forgot-password" className="text-xs text-indigo-700 hover:text-indigo-600">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className={`w-full ${loading ? 'bg-indigo-400' : 'bg-indigo-700 hover:bg-indigo-800'} text-white py-2 px-4 rounded-lg transition-colors font-medium`}
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            ¿No tienes una cuenta?{' '}
            <Link href="/auth/register" className="text-indigo-700 hover:text-indigo-600 font-medium">
              Regístrate
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
} 