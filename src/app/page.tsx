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
              <Link href="#como-funciona" className="text-gray-700 hover:text-indigo-700 font-medium">
                Cómo Funciona
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
              Tu celular es tu <span className="text-indigo-700">llave digital universal</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0">
              Abrís la app, mostrás tu QR y accedés a barrios, oficinas, gimnasios, eventos y cualquier espacio. 
              <strong className="text-gray-900">Un solo gesto, como pagar con el celular.</strong>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link 
                href="#como-funciona" 
                className="border border-indigo-700 text-indigo-700 hover:bg-indigo-50 px-8 py-4 rounded-lg font-medium text-center transition-colors text-lg">
                Ver Cómo Funciona
              </Link>
            </div>
            <p className="text-gray-500 text-sm mt-4">Seguro como una operación bancaria • Compatible con todos los dispositivos</p>
          </div>
          <div className="flex-1 relative flex justify-center items-center">
            <div className="relative max-w-md w-full">
              <Image
                src="https://yulkmmjwjvoavpbteoxg.supabase.co/storage/v1/object/public/assets//keyOn_1.png"
                alt="Dashboard KeyOn"
                width={400}
                height={300}
                className="w-full h-auto rounded-lg shadow-2xl"
                priority
              />
            </div>
            {/* Elementos decorativos alrededor de la imagen */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-indigo-200 rounded-lg z-0"></div>
            <div className="absolute -top-4 -left-4 w-16 h-16 bg-indigo-100 rounded-full z-0"></div>
          </div>
        </div>
      </section>

      {/* Sección de características principales */}
      <section id="como-funciona" className="py-20 px-4 relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-50 rounded-full opacity-70 -mr-40 -mb-40"></div>
        <div className="absolute top-20 left-0 w-64 h-64 bg-indigo-50 rounded-full opacity-70 -ml-32"></div>
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Simple para usuarios, poderoso para administradores
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              KeyOn detecta automáticamente a qué lugares tenés acceso. No necesitás buscar permisos ni validar manualmente.
            </p>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-12 items-center mb-24">
            <div className="flex-1">
              <div className="relative w-full h-[400px] rounded-xl shadow-xl overflow-hidden bg-gray-50">
                <Image
                  src="https://yulkmmjwjvoavpbteoxg.supabase.co/storage/v1/object/public/assets//keyOn_users.jpeg"
                  alt="Panel de control KeyOn"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Para usuarios: Acceso con un QR
              </h3>
              <p className="text-gray-600 mb-8">
                Abrís la app KeyOn y mostrás tu código QR. El sistema detecta automáticamente si podés acceder a ese barrio, oficina, gimnasio o evento. Es tan simple como pagar con el celular.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-indigo-700 font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Abrís la app</h4>
                    <p className="text-gray-600">Un toque en tu pantalla de inicio</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-indigo-700 font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Mostrás tu QR</h4>
                    <p className="text-gray-600">Tu código único aparece automáticamente</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-indigo-700 font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Accedés</h4>
                    <p className="text-gray-600">El sistema valida y autoriza tu ingreso</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row-reverse gap-12 items-center">
            <div className="flex-1">
              <div className="relative w-full h-[400px] rounded-xl shadow-xl overflow-hidden bg-gray-50">
                <Image
                  src="https://yulkmmjwjvoavpbteoxg.supabase.co/storage/v1/object/public/assets//key_admin.png"
                  alt="Panel administrativo KeyOn"
                  fill
                  className="object-contain p-2"
                  priority
                />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Para administradores: Fácil como WhatsApp
              </h3>
              <p className="text-gray-600 mb-8">
                Gestionás accesos como si fueran grupos de WhatsApp: agregás personas, definís horarios, asignás permisos. Todo desde tu celular con trazabilidad completa.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Agregás y quitás personas</h4>
                    <p className="text-gray-600">Como en un grupo de chat, pero para accesos físicos</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Definís horarios y permisos</h4>
                    <p className="text-gray-600">Control granular de cuándo y dónde pueden acceder</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Trazabilidad completa</h4>
                    <p className="text-gray-600">Registro de cada acceso con fecha, hora y ubicación</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de beneficios */}
      <section id="beneficios" className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Tecnología, seguridad y fluidez urbana
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Compatible con cerraduras electrónicas, barreras, molinetes y sistemas existentes. 
              Un paso hacia la ciudad inteligente.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Tarjeta 1 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Una única identidad digital</h3>
              <p className="text-gray-600">
                Tu celular se convierte en tu llave universal. Un solo QR para acceder a barrios, oficinas, gimnasios, eventos y más.
              </p>
            </div>
            
            {/* Tarjeta 2 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Seguro como el banco</h3>
              <p className="text-gray-600">
                Tecnología de cifrado bancario, autenticación biométrica y protocolos de seguridad de nivel empresarial.
              </p>
            </div>
            
            {/* Tarjeta 3 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Compatible con todo</h3>
              <p className="text-gray-600">
                Funciona con cerraduras electrónicas, barreras, molinetes y cualquier sistema de acceso existente gracias a nuestras integraciones IoT.
              </p>
            </div>
            
            {/* Tarjeta 4 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Gestión como WhatsApp</h3>
              <p className="text-gray-600">
                Administrá permisos de acceso tan fácil como gestionar un grupo de chat. Agregás, quitás, definís horarios desde tu celular.
              </p>
            </div>
            
            {/* Tarjeta 5 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Visión de ciudad inteligente</h3>
              <p className="text-gray-600">
                Imaginate un futuro donde mostrás un QR para peajes, transporte público, hospitales. KeyOn es el primer paso hacia esa realidad.
              </p>
            </div>
            
            {/* Tarjeta 6 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Detección automática</h3>
              <p className="text-gray-600">
                No necesitás buscar permisos ni validar manualmente. KeyOn detecta automáticamente a qué lugares tenés autorización de acceso.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de prueba gratuita / garantía */}
      <section className="py-16 bg-indigo-700 text-white text-center">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="text-3xl font-bold mb-6">
            Comenzá gratis y escalá cuando necesites más
          </h2>
          <p className="text-indigo-100 mb-8 text-lg">
            Modelo freemium: empezás sin costo y solo pagás cuando tu negocio crece. 
            La aplicación ya está lista para pruebas piloto.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#contacto"
              className="inline-block bg-white text-indigo-700 hover:bg-indigo-50 px-8 py-4 rounded-lg font-bold text-lg transition-colors shadow-lg">
              Solicitar Prueba Piloto
            </Link>
            <Link
              href="#contacto"
              className="inline-block border border-white text-white hover:bg-white hover:text-indigo-700 px-8 py-4 rounded-lg font-bold text-lg transition-colors">
              Hablar con un Asesor
            </Link>
          </div>
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
                KeyOn es tecnología, seguridad y fluidez urbana. Tu llave digital hacia la ciudad inteligente.
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
                <li><Link href="#como-funciona" className="text-gray-400 hover:text-white transition-colors">Cómo Funciona</Link></li>
                <li><Link href="#beneficios" className="text-gray-400 hover:text-white transition-colors">Beneficios</Link></li>
                <li><Link href="#precios" className="text-gray-400 hover:text-white transition-colors">Precios</Link></li>
                <li><Link href="#contacto" className="text-gray-400 hover:text-white transition-colors">Demo</Link></li>
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
