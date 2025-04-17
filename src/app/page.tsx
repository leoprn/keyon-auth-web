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
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        // Si hay sesión al cargar la home, 
        // asumimos que viene del callback de reseteo exitoso.
        // Redirigimos a la página para actualizar contraseña.
        console.log('Sesión detectada en Home, redirigiendo a /auth/update-password');
        router.replace('/auth/update-password'); 
      } else {
        // Si no hay sesión, terminamos de cargar y mostramos la página normal
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
