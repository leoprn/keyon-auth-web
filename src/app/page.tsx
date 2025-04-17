'use client' // Convertir a Client Component

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Logo from "@/components/Logo";
import Link from 'next/link';

export default function Home() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [loading, setLoading] = useState(true); // Estado de carga
  const [hasSession, setHasSession] = useState(false); // Estado para saber si hay sesión (para el botón)

  useEffect(() => {
    const checkSessionAndRedirect = async () => {
      // Verificación crítica para el flujo de reseteo de contraseña:
      // 1. Verificar si hay un hash de tipo "access_token" o "recovery" en la URL
      if (typeof window !== 'undefined') {
        // Intentar ser más permisivo con la detección del hash
        const fullUrl = window.location.href;
        const hasAuthHash = window.location.hash.length > 0 || 
                           fullUrl.includes('access_token') || 
                           fullUrl.includes('type=recovery') ||
                           fullUrl.includes('token=');
        
        if (hasAuthHash) {
          console.log('Home: Detectado posible hash de autenticación. Esperando a Supabase...');
          // Mayor tiempo de espera para dispositivos móviles
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }
      
      // 2. Verificar SIEMPRE si hay una sesión activa
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          console.log('Home: Sesión detectada con token:', session.access_token ? 'Sí' : 'No');
          setHasSession(true); // Activar el estado de sesión para mostrar el botón
          
          // Intento inmediato de redirección (a veces funciona directamente)
          try {
            router.replace('/auth/update-password');
            // Esperamos un momento para ver si la redirección funciona
            await new Promise(resolve => setTimeout(resolve, 300));
          } catch (redirectError) {
            console.error('Error al intentar redirección automática:', redirectError);
          }
          
          // De cualquier forma, terminamos el loading para mostrar la UI con el botón
          setLoading(false);
        } else {
          console.log('Home: No se detectó ninguna sesión.');
          setHasSession(false);
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

  // UI principal con o sin el botón según el estado de la sesión
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-white">
      <div className="text-center">
        <div className="mb-8">
          <Logo />
        </div>

        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Bienvenido a KeyOn
        </h1>

        <p className="text-lg text-gray-600 mb-6">
          La solución inteligente para el control de accesos.
        </p>
        
        {/* Mostrar el botón explícito de cambio de contraseña si hay sesión */}
        {hasSession && (
          <div className="mt-8">
            <p className="text-sm text-indigo-600 mb-2">
              ¿Vienes de un email de recuperación de contraseña?
            </p>
            <Link 
              href="/auth/update-password" 
              className="block w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors duration-200 text-center font-medium">
                Ir a Cambiar Mi Contraseña
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
