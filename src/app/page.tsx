'use client'

import { useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Logo from "@/components/Logo";
import Link from 'next/link';
import Image from 'next/image';

// Componente de carga para mostrar mientras suspendemos
function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="p-8 max-w-md w-full bg-white rounded-lg shadow-md text-center">
        <Logo className="h-12 w-auto mb-4" />
        <p className="text-gray-700">Cargando...</p>
      </div>
    </div>
  )
}

// Componente que utiliza useSearchParams
function HomeContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClientComponentClient()
  
  // Verificar si hay un código de reset password en la URL y redirigir a la página de actualización de contraseña
  useEffect(() => {
    async function checkResetCode() {
      // Comprobar si hay un parámetro de 'code' (usado por Supabase para resetear contraseña)
      const code = searchParams.get('code')
      const type = searchParams.get('type')
      
      if (code && type === 'recovery') {
        console.log('Detectado código de reseteo de contraseña, redirigiendo...')
        try {
          // Intercambiar el código por una sesión
          const { error } = await supabase.auth.exchangeCodeForSession(code)
          
          if (error) {
            console.error('Error al intercambiar código:', error)
            return
          }
          
          // Redirigir al usuario a la página de actualización de contraseña
          router.push('/auth/update-password')
        } catch (err) {
          console.error('Error al procesar código de reseteo:', err)
        }
      }
    }
    
    checkResetCode()
  }, [searchParams, supabase.auth, router])
  
  return (
    <main className="min-h-screen bg-white overflow-hidden">
      {/* Barra de navegación */}
      <nav className="bg-white py-4 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Logo className="h-10 w-auto" />
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-6">
              <Link href="#caracteristicas" className="text-gray-700 hover:text-indigo-700 font-medium">
                Características
              </Link>
              <Link href="#beneficios" className="text-gray-700 hover:text-indigo-700 font-medium">
                Beneficios
              </Link>
              <Link href="#precios" className="text-gray-700 hover:text-indigo-700 font-medium">
                Planes
              </Link>
              <Link href="#contacto" className="text-gray-700 hover:text-indigo-700 font-medium">
                Contacto
              </Link>
            </div>
            <div className="flex gap-3">
              {/* Botón de Iniciar Sesión - Comentado temporalmente */}
              {/* <Link 
                href="/auth/login" 
                className="text-indigo-700 hover:text-indigo-800 border border-indigo-700 px-4 py-2 rounded-lg font-medium transition-colors">
                Iniciar Sesión
              </Link> */}
              
              {/* Botón de Probar Gratis - Comentado temporalmente */}
              {/* <Link 
                href="/auth/register" 
                className="bg-indigo-700 hover:bg-indigo-800 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                Probar Gratis
              </Link> */}
            </div>
          </div>
          <button className="md:hidden text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Formas decorativas estilo Accessin */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-100 rounded-full opacity-20 -mr-32 -mt-32 z-0"></div>
      <div className="absolute bottom-48 left-0 w-96 h-96 bg-indigo-100 rounded-full opacity-20 -ml-48 z-0"></div>

      {/* Header / Hero */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="container mx-auto max-w-6xl flex flex-col lg:flex-row items-center gap-12 relative z-10">
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Digitaliza y gestiona el control de accesos con KeyOn
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0">
              Automatiza los accesos, aumenta la seguridad y mejora la experiencia con una solución inteligente todo en uno.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              {/*
              <Link 
                href="/auth/register" 
                className="bg-indigo-700 hover:bg-indigo-800 text-white px-8 py-4 rounded-lg font-medium text-center transition-colors text-lg shadow-lg hover:shadow-xl">
                Probar Gratis
              </Link>
              */}
              <Link 
                href="#contacto" 
                className="border border-indigo-700 text-indigo-700 hover:bg-indigo-50 px-8 py-4 rounded-lg font-medium text-center transition-colors text-lg">
                Contactar un Asesor
              </Link>
            </div>
            <p className="text-gray-500 text-sm mt-4">Implementación rápida y soporte 24/7</p>
          </div>
          <div className="flex-1 relative">
            <div className="relative w-full h-[400px] rounded-lg shadow-2xl overflow-hidden">
              <Image
                src="/images/dashboard-example.png"
                alt="Dashboard KeyOn"
                fill
                className="object-cover"
                priority
              />
            </div>
            {/* Elementos decorativos alrededor de la imagen */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-indigo-200 rounded-lg z-0"></div>
            <div className="absolute -top-4 -left-4 w-16 h-16 bg-indigo-100 rounded-full z-0"></div>
          </div>
        </div>
      </section>

      {/* Banner de confianza */}
      <section className="bg-gray-50 py-6 border-y border-gray-200">
        <div className="container mx-auto max-w-6xl text-center">
          <p className="text-gray-700 font-medium">
            Confían en nosotros empresas de todos los tamaños
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 mt-6 opacity-60">
            <div className="h-8 w-auto">
              <div className="h-full w-20 bg-gray-400 rounded"></div>
            </div>
            <div className="h-8 w-auto">
              <div className="h-full w-24 bg-gray-400 rounded"></div>
            </div>
            <div className="h-8 w-auto">
              <div className="h-full w-16 bg-gray-400 rounded"></div>
            </div>
            <div className="h-8 w-auto">
              <div className="h-full w-28 bg-gray-400 rounded"></div>
            </div>
            <div className="h-8 w-auto">
              <div className="h-full w-20 bg-gray-400 rounded"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de características principales */}
      <section id="caracteristicas" className="py-20 px-4 relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-50 rounded-full opacity-70 -mr-40 -mb-40"></div>
        <div className="absolute top-20 left-0 w-64 h-64 bg-indigo-50 rounded-full opacity-70 -ml-32"></div>
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Optimiza tu gestión de accesos
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Facilita tus tareas con herramientas integradas para registro, control y monitoreo de accesos sin complicaciones.
            </p>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-12 items-center mb-24">
            <div className="flex-1">
              <div className="relative w-full h-[400px] rounded-xl shadow-xl overflow-hidden">
                <Image
                  src="/images/control-panel.png"
                  alt="Panel de control KeyOn"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Una plataforma diseñada para tu tranquilidad y seguridad
              </h3>
              <p className="text-gray-600 mb-8">
                Simplifica la seguridad y los procesos de tu negocio con un ecosistema digital que te brinda la información y el control que necesitas.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Control en tiempo real</h4>
                    <p className="text-gray-600">Monitorea todos los accesos desde cualquier lugar y en todo momento.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Seguridad avanzada</h4>
                    <p className="text-gray-600">Tecnología biométrica y cifrado de datos para la máxima protección.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Reportes detallados</h4>
                    <p className="text-gray-600">Análisis y estadísticas para tomar mejores decisiones basadas en datos.</p>
                  </div>
                </div>
              </div>
              <Link
                href="#contacto"
                className="inline-block mt-8 bg-indigo-700 hover:bg-indigo-800 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                Solicitar demostración
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de beneficios */}
      <section id="beneficios" className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Beneficios que transforman tu negocio
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Un ecosistema completo diseñado para simplificar la gestión de accesos y mejorar la seguridad.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Tarjeta 1 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Control de Acceso Inteligente</h3>
              <p className="text-gray-600">
                Gestiona quién entra y sale con códigos QR temporales. Registros automáticos en tiempo real.
              </p>
            </div>
            
            {/* Tarjeta 2 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Notificaciones y Alertas</h3>
              <p className="text-gray-600">
                Recibe notificaciones instantáneas de cada acceso. Configura alertas para eventos específicos y previene accesos no autorizados.
              </p>
            </div>
            
            {/* Tarjeta 3 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Aplicación Móvil</h3>
              <p className="text-gray-600">
                Gestiona todo desde tu smartphone. Monitorea actividad y recibe notificaciones al instante.
              </p>
            </div>
            
            {/* Tarjeta 4 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Estadísticas y Reportes</h3>
              <p className="text-gray-600">
                Analiza patrones de acceso, crea informes personalizados y exporta datos para una mejor gestión y cumplimiento.
              </p>
            </div>
            
            {/* Tarjeta 5 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Gestión de Usuarios</h3>
              <p className="text-gray-600">
                Administra fácilmente permisos y niveles de acceso. Asigna roles específicos a cada persona según sus necesidades.
              </p>
            </div>
            
            {/* Tarjeta 6 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Integración Total</h3>
              <p className="text-gray-600">
                Conecta con tus sistemas existentes, desde cerraduras inteligentes hasta software de gestión empresarial.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de prueba gratuita / garantía */}
      <section className="py-16 bg-indigo-700 text-white text-center">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="text-3xl font-bold mb-6">
            Usa KeyOn 90 días y si no cumple tus expectativas, te devolvemos el 100% del pago.
          </h2>
          <p className="text-indigo-100 mb-8 text-lg">
            Sin compromisos, sin riesgos. Queremos que estés completamente satisfecho.
          </p>
          {/*
          <Link
            href="/auth/register"
            className="inline-block bg-white text-indigo-700 hover:bg-indigo-50 px-8 py-4 rounded-lg font-bold text-lg transition-colors shadow-lg">
            Comenzar Prueba Gratuita
          </Link>
          */}
        </div>
      </section>

      {/* Sección de planes */}
      <section id="precios" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Planes flexibles para cada necesidad
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Elige el plan que mejor se adapte a las necesidades de tu negocio.
            </p>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Plan Básico */}
            <div className="flex-1 bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="text-center pb-8 border-b border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Plan Básico</h3>
                <p className="text-gray-600 mb-6">Ideal para negocios pequeños</p>
                <div className="text-4xl font-bold text-indigo-700 mb-1">$1000</div>
                <p className="text-gray-500 text-sm">por año</p>
              </div>
              <ul className="mt-8 space-y-4">
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Control de accesos</span>
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">App móvil</span>
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Reportes básicos</span>
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Soporte técnico 8/5</span>
                </li>
              </ul>
              <div className="mt-8 text-center">
                <Link href="#contacto" className="inline-block w-full py-3 px-6 rounded-lg border border-indigo-700 text-indigo-700 hover:bg-indigo-50 transition-colors font-medium">
                  Contactar
                </Link>
              </div>
            </div>
            
            {/* Plan Professional */}
            <div className="flex-1 bg-indigo-700 p-8 rounded-xl shadow-2xl relative">
              <div className="absolute top-0 right-0 bg-yellow-400 text-xs font-bold uppercase py-1 px-2 -mt-2 rounded">Popular</div>
              <div className="text-center pb-8 border-b border-indigo-600">
                <h3 className="text-xl font-bold text-white mb-2">Plan Professional</h3>
                <p className="text-indigo-200 mb-6">Ideal para medianas empresas</p>
                <div className="text-4xl font-bold text-white mb-1">$1490</div>
                <p className="text-indigo-200 text-sm">por año</p>
              </div>
              <ul className="mt-8 space-y-4">
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-300 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-white">Todo lo del Plan Básico</span>
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-300 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-white">Reportes avanzados</span>
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-300 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-white">Integraciones</span>
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-300 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-white">Soporte técnico 24/7</span>
                </li>
              </ul>
              <div className="mt-8 text-center">
                <Link href="#contacto" className="inline-block w-full py-3 px-6 rounded-lg bg-white text-indigo-700 hover:bg-indigo-50 transition-colors font-medium shadow-md">
                  Contactar
                </Link>
              </div>
            </div>
            
            {/* Plan Enterprise */}
            <div className="flex-1 bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="text-center pb-8 border-b border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Plan Enterprise</h3>
                <p className="text-gray-600 mb-6">Para grandes organizaciones</p>
                <div className="text-4xl font-bold text-indigo-700 mb-1">Personalizado</div>
                <p className="text-gray-500 text-sm">contacta para más detalles</p>
              </div>
              <ul className="mt-8 space-y-4">
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Todo lo del Plan Professional</span>
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">API personalizada</span>
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Personalización completa</span>
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Gerente de cuenta dedicado</span>
                </li>
              </ul>
              <div className="mt-8 text-center">
                <Link href="#contacto" className="inline-block w-full py-3 px-6 rounded-lg border border-indigo-700 text-indigo-700 hover:bg-indigo-50 transition-colors font-medium">
                  Contactar
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de contacto */}
      <section id="contacto" className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 bg-indigo-700 text-white p-12">
                <h2 className="text-3xl font-bold mb-6">Contáctanos</h2>
                <p className="text-indigo-100 mb-8">
                  Nuestro equipo está listo para responder tus dudas y ayudarte a encontrar la mejor solución para tu negocio.
                </p>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-indigo-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <h3 className="font-semibold text-lg">Email</h3>
                      <p className="text-indigo-200">info@keyon.com</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-indigo-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <div>
                      <h3 className="font-semibold text-lg">Teléfono</h3>
                      <p className="text-indigo-200">+123 456 7890</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-indigo-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <h3 className="font-semibold text-lg">Oficinas</h3>
                      <p className="text-indigo-200">Argentina - Uruguay - España - USA</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 p-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Solicita información</h3>
                <form className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre completo
                    </label>
                    <input
                      id="name"
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Mensaje
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-indigo-700 hover:bg-indigo-800 text-white py-3 px-6 rounded-lg font-medium transition-colors shadow-md"
                  >
                    Enviar mensaje
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center justify-center md:justify-start mb-6">
                <div className="bg-white p-2 rounded-xl">
                  <Logo className="h-24 w-auto" />
                </div>
              </div>
              <p className="text-gray-400 mb-6">
                Transformando la gestión de acceso con tecnología inteligente
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-6">Producto</h3>
              <ul className="space-y-4">
                <li><Link href="#caracteristicas" className="text-gray-400 hover:text-white transition-colors">Características</Link></li>
                <li><Link href="#beneficios" className="text-gray-400 hover:text-white transition-colors">Beneficios</Link></li>
                <li><Link href="#precios" className="text-gray-400 hover:text-white transition-colors">Precios</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Demo</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-6">Soporte</h3>
              <ul className="space-y-4">
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Centro de Ayuda</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Tutoriales</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Documentación</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Contacto</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-6">Legal</h3>
              <ul className="space-y-4">
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Términos de Servicio</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Política de Privacidad</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Seguridad</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500">
            <p>© {new Date().getFullYear()} KeyOn. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}

// Componente principal que envuelve el contenido en Suspense
export default function Home() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <HomeContent />
    </Suspense>
  )
}
