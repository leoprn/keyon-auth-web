'use client' // Convertir a Client Component

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Logo from "@/components/Logo";
import Link from 'next/link';

export default function Home() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [loading, setLoading] = useState(true);
  const [hasSession, setHasSession] = useState(false);
  const [diagnosticInfo, setDiagnosticInfo] = useState<any>({
    hash: '',
    urlParams: '',
    hasToken: false,
    hasSession: false
  });

  useEffect(() => {
    const checkSessionAndRedirect = async () => {
      let info: any = {
        hash: '',
        urlParams: '',
        hasToken: false,
        hasSession: false
      };

      if (typeof window !== 'undefined') {
        // Capturar información de diagnóstico
        info.hash = window.location.hash;
        info.urlParams = window.location.search;
        
        // Comprobar explícitamente todos los parámetros
        const urlParams = new URLSearchParams(window.location.search);
        info.hasTypeParam = urlParams.has('type');
        info.typeValue = urlParams.get('type');
        
        const fullUrl = window.location.href;
        info.fullUrl = fullUrl;
        
        // Buscar cualquier indicio de token
        const hasAuthToken = 
          window.location.hash.length > 0 || 
          fullUrl.includes('access_token') || 
          fullUrl.includes('type=recovery') ||
          fullUrl.includes('token=') ||
          urlParams.has('token');
          
        info.hasToken = hasAuthToken;
        
        if (hasAuthToken) {
          console.log('Home: Detectado posible token. Esperando procesamiento...');
          // Esperar más tiempo para dispositivos móviles
          await new Promise(resolve => setTimeout(resolve, 1500));
        }
        
        // Forzar una verificación extra de Supabase
        try {
          // Intentar forzar el procesamiento del hash si existe
          if (window.location.hash.length > 0) {
            await supabase.auth.getUser();
          }
        } catch (e) {
          console.log('Error al pre-procesar hash:', e);
        }
      }
      
      try {
        // Intentar múltiples veces obtener la sesión (a veces tarda en establecerse)
        let session = null;
        for (let i = 0; i < 3; i++) {
          const { data } = await supabase.auth.getSession();
          session = data.session;
          
          if (session) {
            break;
          } else if (i < 2) { // No esperar en el último intento
            await new Promise(resolve => setTimeout(resolve, 500));
          }
        }
        
        if (session) {
          info.hasSession = true;
          info.userId = session.user?.id;
          info.email = session.user?.email;
          
          console.log('Home: Sesión detectada:', info);
          setHasSession(true);
          
          // Intento directo de redirección
          router.replace('/auth/update-password');
        } else {
          console.log('Home: No se detectó sesión después de múltiples intentos');
          info.hasSession = false;
        }
      } catch (error) {
        console.error('Error al verificar sesión:', error);
        info.error = String(error);
      }
      
      // Actualizar información de diagnóstico y finalizar carga
      setDiagnosticInfo(info);
      setLoading(false);
    };

    checkSessionAndRedirect();
  }, [supabase, router]);

  const manualRedirect = () => {
    router.push('/auth/update-password');
  };

  // Mostrar estado de carga con diagnóstico
  if (loading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-white">
         <Logo />
         <p className="mt-4 text-gray-600">Verificando sesión...</p>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-white">
      <div className="text-center max-w-md">
        <div className="mb-6">
          <Logo />
        </div>

        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Bienvenido a KeyOn
        </h1>

        <p className="text-lg text-gray-600 mb-6">
          La solución inteligente para el control de accesos.
        </p>
        
        {/* Información de diagnóstico */}
        <div className="my-4 p-4 bg-gray-100 rounded text-left text-xs text-gray-700 overflow-hidden">
          <p><strong>Diagnóstico:</strong></p>
          <p>¿Sesión activa?: {diagnosticInfo.hasSession ? 'Sí' : 'No'}</p>
          <p>¿Token en URL?: {diagnosticInfo.hasToken ? 'Sí' : 'No'}</p>
          {diagnosticInfo.typeValue && <p>Tipo: {diagnosticInfo.typeValue}</p>}
          {diagnosticInfo.email && <p>Email: {diagnosticInfo.email}</p>}
        </div>
        
        {/* Botón visible siempre */}
        <div className="mt-6">
          <p className="text-sm text-indigo-600 mb-2">
            {hasSession 
              ? "Detectamos una sesión. Haz clic para cambiar tu contraseña:" 
              : "¿Vienes del email de recuperación? Intenta este botón:"}
          </p>
          <button 
            onClick={manualRedirect}
            className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors duration-200 text-center font-medium">
              Ir a Cambiar Mi Contraseña
          </button>
        </div>
      </div>
    </main>
  );
}
