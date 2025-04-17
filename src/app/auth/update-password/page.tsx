'use client'

import { Suspense, useEffect, useState } from 'react' // Importar Suspense
import { useSearchParams } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import ResetPasswordForm from '@/components/auth/ResetPasswordForm'
import Logo from '@/components/Logo'

// Componente de carga simple
function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Cargando formulario...</p>
    </div>
  )
}

// Envolvemos el formulario en Suspense por si acaso
function UpdatePasswordContent() {
  const searchParams = useSearchParams()
  const supabase = createClientComponentClient()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    async function processToken() {
      const token = searchParams.get('token')
      const token_hash = searchParams.get('token_hash')
      const type = searchParams.get('type')
      
      console.log('Parámetros recibidos:', { token, token_hash, type })
      
      if (token && type === 'recovery') {
        try {
          // Intercambiar el token por una sesión
          const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(token)
          
          if (exchangeError) {
            console.error('Error al intercambiar token por sesión:', exchangeError)
            setError('Error al procesar el token de recuperación: ' + exchangeError.message)
          }
        } catch (err) {
          console.error('Error inesperado al procesar el token:', err)
          setError('Error inesperado al procesar la solicitud')
        }
      } else if (token_hash && type === 'recovery') {
        try {
          // Verificar el token hash directamente
          const { error: verifyError } = await supabase.auth.verifyOtp({
            token_hash,
            type: 'recovery',
          })
          
          if (verifyError) {
            console.error('Error al verificar OTP:', verifyError)
            setError('Error al verificar el token: ' + verifyError.message)
          }
        } catch (err) {
          console.error('Error inesperado al verificar el token:', err)
          setError('Error inesperado al procesar la solicitud')
        }
      }
      
      setLoading(false)
    }
    
    processToken()
  }, [searchParams, supabase.auth])
  
  if (loading) {
    return (
      <div className="p-4 mb-4 rounded-lg text-sm bg-blue-100 text-blue-700">
        Verificando sesión...
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="p-4 mb-4 rounded-lg text-sm bg-red-100 text-red-700">
        {error}
      </div>
    )
  }
  
  return <ResetPasswordForm />;
}

export default function UpdatePasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="p-8 max-w-md w-full bg-white rounded-lg shadow-md">
        <div className="text-center mb-6">
          <Logo />
          <h1 className="text-2xl font-bold text-gray-800 mt-4">Establecer Nueva Contraseña</h1>
        </div>
        {/* Usamos Suspense aquí */}
        <Suspense fallback={<LoadingFallback />}>
          <UpdatePasswordContent />
        </Suspense>
      </div>
    </div>
  )
} 