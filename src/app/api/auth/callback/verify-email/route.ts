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

  // Log para depuración
  console.log('Callback de verificación de email:', { token_hash, type, next })

  const redirectToError = (message: string) => {
    const redirectUrl = new URL('/auth/verify-email', requestUrl.origin)
    redirectUrl.searchParams.set('error', message)
    return NextResponse.redirect(redirectUrl.toString())
  }

  if (token_hash && type) {
    if (type !== 'email' && type !== 'signup') { // Supabase usa 'email' o 'signup' para verificar email
      return redirectToError('Tipo de token inválido para verificación de email.')
    }

    try {
      const supabase = createRouteHandlerClient({ cookies })
      
      // Intentar verificar el token
      const { error } = await supabase.auth.verifyOtp({
        type: type as 'email' | 'signup', // Aseguramos el tipo correcto
        token_hash,
      })

      if (!error) {
        // Verificación exitosa, transferimos el control a la página de verificación
        // que mostrará el éxito y opciones para el usuario
        const successUrl = new URL('/auth/verify-email', requestUrl.origin)
        successUrl.searchParams.set('token_hash', token_hash)
        successUrl.searchParams.set('type', type)
        successUrl.searchParams.set('next', next)
        return NextResponse.redirect(successUrl.toString())
      }

      // Error al verificar
      console.error('Error al verificar OTP:', error)
      return redirectToError(error.message || 'Error al verificar el token.')
    } catch (err) {
      console.error('Error inesperado en callback de verificación:', err)
      return redirectToError('Error inesperado al procesar la verificación.')
    }
  }

  // Si faltan parámetros
  console.error('Callback de verificación invocado sin token_hash o type.')
  return redirectToError('Faltan parámetros de verificación.')
} 