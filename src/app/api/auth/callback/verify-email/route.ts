import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Aseguramos que esta ruta no sea cacheada estáticamente
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const token_hash = requestUrl.searchParams.get('token_hash')
  const type = requestUrl.searchParams.get('type')
  const next = requestUrl.searchParams.get('next') ?? '/' // fallback a la raíz

  const redirectToError = (message: string) => {
    const redirectUrl = new URL('/auth/verify-status', request.url)
    redirectUrl.searchParams.set('status', 'error')
    redirectUrl.searchParams.set('message', message)
    return NextResponse.redirect(redirectUrl.toString())
  }

  if (token_hash && type) {
    if (type !== 'email' && type !== 'signup') { // Supabase usa 'email' o 'signup' para verificar email
      return redirectToError('Tipo de token inválido para verificación de email.')
    }

    const supabase = createRouteHandlerClient({ cookies })
    const { error } = await supabase.auth.verifyOtp({
      type: type as 'email' | 'signup', // Aseguramos el tipo correcto
      token_hash,
    })

    if (!error) {
      // Verificación exitosa, redirigir a 'next' o al dashboard
      // Usamos una página de éxito intermedia para mostrar un mensaje antes de redirigir
      const successUrl = new URL('/auth/verify-status', request.url)
      successUrl.searchParams.set('status', 'success')
      successUrl.searchParams.set('next', next) // Pasamos la URL final a la página de estado
      return NextResponse.redirect(successUrl.toString())
    }

    // Error al verificar
    console.error('Error al verificar OTP:', error)
    return redirectToError(error.message || 'Error al verificar el token.')
  }

  // Si faltan parámetros
  console.error('Callback de verificación invocado sin token_hash o type.')
  return redirectToError('Faltan parámetros de verificación.')
} 