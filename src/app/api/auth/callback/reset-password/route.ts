import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Aseguramos que esta ruta no sea cacheada estáticamente
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code') // Supabase usa 'code' para el flujo PKCE de recuperación

  if (code) {
    const supabase = createRouteHandlerClient({ cookies })
    // Intercambiamos el código por una sesión
    await supabase.auth.exchangeCodeForSession(code)
    // Redirigimos al usuario a la página donde PUEDE cambiar la contraseña
    // Esta página ahora estará protegida y tendrá acceso a la sesión del usuario
    return NextResponse.redirect(new URL('/auth/update-password', request.url).toString())
  }

  // Si no hay código, redirigir a una página de error
  console.error('Callback de reseteo de contraseña invocado sin código.')
  const redirectUrl = new URL('/auth/reset-status', request.url)
  redirectUrl.searchParams.set('status', 'error')
  redirectUrl.searchParams.set('message', 'No se proporcionó código de verificación.')
  return NextResponse.redirect(redirectUrl.toString())
} 