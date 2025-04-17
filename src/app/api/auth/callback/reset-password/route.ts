import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Aseguramos que esta ruta no sea cacheada estáticamente
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  // Log para saber que la ruta fue alcanzada
  console.log('[API Reset Callback] Ruta alcanzada.'); 
  
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code') // Supabase usa 'code' para el flujo PKCE de recuperación

  // Log para ver el código recibido
  console.log('[API Reset Callback] Código recibido:', code); 

  if (code) {
    const supabase = createRouteHandlerClient({ cookies })
    try {
      // Log antes de intercambiar el código
      console.log('[API Reset Callback] Intentando intercambiar código por sesión...');
      await supabase.auth.exchangeCodeForSession(code)
      // Log de éxito y redirección
      console.log('[API Reset Callback] Código intercambiado exitosamente. Redirigiendo a /auth/update-password');
      
      // Usar URL absoluta para la redirección
      const redirectUrl = new URL('/auth/update-password', requestUrl.origin); 
      return NextResponse.redirect(redirectUrl.toString())
    } catch (error) {
      // Log en caso de error durante el intercambio
      console.error('[API Reset Callback] Error al intercambiar código por sesión:', error);
      const redirectUrl = new URL('/auth/reset-status', requestUrl.origin);
      redirectUrl.searchParams.set('status', 'error');
      redirectUrl.searchParams.set('message', 'Error al validar el código de reseteo.');
      return NextResponse.redirect(redirectUrl.toString());
    }
  }

  // Log si no se encontró código
  console.error('[API Reset Callback] No se encontró código en la solicitud.');
  const redirectUrl = new URL('/auth/reset-status', request.url)
  redirectUrl.searchParams.set('status', 'error')
  redirectUrl.searchParams.set('message', 'No se proporcionó código de verificación a la API.')
  return NextResponse.redirect(redirectUrl.toString())
} 