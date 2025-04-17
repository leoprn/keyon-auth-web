'use client'

import { Suspense } from 'react' // Importar Suspense
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
    // Aquí ya no necesitamos token_hash ni type porque el usuario está autenticado
    // El componente ResetPasswordForm internamente llamará a supabase.auth.updateUser
    // que funcionará porque hay una sesión activa.
    // Necesitamos ajustar ResetPasswordForm para que no requiera token/type.
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