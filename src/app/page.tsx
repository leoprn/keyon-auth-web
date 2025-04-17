'use client' // Convertir a Client Component

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Logo from "@/components/Logo";

export default function Home() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [loading, setLoading] = useState(true); // Estado de carga

  useEffect(() => {
    const checkSessionAndRedirect = async () => {
      // Verificación crítica para el flujo de reseteo de contraseña:
      // 1. Verificar si hay un hash de tipo "access_token" o "recovery" en la URL
      if (typeof window !== 'undefined') {
        const hasAuthHash = window.location.hash.includes('access_token') || 
                           window.location.hash.includes('type=recovery');
        
        if (hasAuthHash) {
          console.log('Home: Detectado hash de autenticación en URL. Esperando a Supabase...');
          
          // Permitir que Supabase procese el hash (necesita un pequeño delay)
          // El hash contiene el token que Supabase usará para establecer la sesión
          await new Promise(resolve => setTimeout(resolve, 500));
        }
      }
      
      // 2. Verificar si hay una sesión activa
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          // Si hay una sesión y el usuario acaba de completar un flujo de reseteo
          // Verificamos si la sesión parece reciente basándonos en el token
          const isJustAuthenticated = session.access_token && 
            (!localStorage.getItem('last_authentication_check') || 
             Date.now() - parseInt(localStorage.getItem('last_authentication_check') || '0') > 300000); // 5+ minutos
         
          if (isJustAuthenticated) {
            // Marcar esta verificación para evitar múltiples redirecciones
            localStorage.setItem('last_authentication_check', Date.now().toString());
            
            console.log('Home: Sesión detectada post-autenticación. Redirigiendo a cambio de contraseña...');
            router.replace('/auth/update-password');
            return;
          } else {
            // Si hay una sesión pero no es nueva, el usuario probablemente está iniciando sesión normalmente
            console.log('Home: Sesión existente detectada.');
            setLoading(false);
          }
        } else {
          // No hay sesión, mostrar la página normal
          console.log('Home: No se detectó ninguna sesión.');
          setLoading(false);
        }
      } catch (error) {
        console.error('Error al verificar sesión:', error);
        setLoading(false);
      }
    };

    checkSessionAndRedirect();
  }, [supabase, router]);

  // Mostrar un estado de carga mientras se verifica la sesión
  if (loading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-white">
         <Logo />
         <p className="mt-4 text-gray-600">Verificando...</p>
      </main>
    );
  }

  // Si no hay sesión (y no está cargando), muestra la Home normal
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-white">
      <div className="text-center">
        <div className="mb-12">
          <Logo />
        </div>

        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Bienvenido a KeyOn
        </h1>

        <p className="text-lg text-gray-600 mb-10">
          La solución inteligente para el control de accesos.
        </p>
      </div>
    </main>
  );
}
