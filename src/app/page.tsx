'use client'

import { useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Logo from "@/components/Logo";
import Link from 'next/link';
import Image from 'next/image';

// Forzar renderizado dinámico
export const dynamic = 'force-dynamic'

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
      {/* Datos estructurados específicos para la landing page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "KeyOn",
            "description": "Sistema de control de accesos digital que permite acceder a barrios, oficinas, gimnasios y eventos mediante códigos QR desde dispositivos móviles",
            "category": "Control de Accesos Digital",
            "brand": {
              "@type": "Brand",
              "name": "KeyOn"
            },
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "ARS",
              "availability": "https://schema.org/InStock",
              "priceValidUntil": "2025-12-31"
            },
            "features": [
              "Acceso con código QR",
              "Compatible con todos los dispositivos",
              "Seguridad bancaria",
              "Gestión de usuarios",
              "Trazabilidad completa",
              "Configuración de horarios",
              "Panel administrativo"
            ],
            "applicationCategory": "SecurityApplication",
            "operatingSystem": "iOS, Android, Web Browser"
          })
        }}
      />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "¿Cómo funciona KeyOn?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "KeyOn funciona de manera simple: abres la app, muestras tu código QR y accedes automáticamente. El sistema detecta si tienes permisos para ingresar a ese barrio, oficina, gimnasio o evento."
                }
              },
              {
                "@type": "Question", 
                "name": "¿Es seguro KeyOn?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Sí, KeyOn es tan seguro como una operación bancaria. Utiliza encriptación de nivel empresarial y autenticación de múltiples factores para proteger los accesos."
                }
              },
              {
                "@type": "Question",
                "name": "¿En qué dispositivos funciona KeyOn?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "KeyOn es compatible con todos los dispositivos: iOS, Android y navegadores web. Funciona tanto en smartphones como en tablets."
                }
              },
              {
                "@type": "Question",
                "name": "¿Qué tipos de lugares puedo acceder con KeyOn?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Con KeyOn puedes acceder a barrios privados, oficinas corporativas, gimnasios, coworkings, eventos, estacionamientos y cualquier espacio que implemente el sistema."
                }
              }
            ]
          })
        }}
      />

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
      <section className="relative py-20 px-4 overflow-hidden bg-white" itemScope itemType="https://schema.org/WebPageElement">
        <div className="container mx-auto max-w-4xl flex flex-col lg:flex-row items-center gap-12 relative z-10 px-8 lg:px-16">
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight" itemProp="headline">
              Tu celular es tu <span className="text-indigo-700">llave digital universal</span>
            </h1>
            <p className="text-xl text-gray-500 mb-8 max-w-xl mx-auto lg:mx-0" itemProp="description">
              Abrís la app, mostrás tu QR y accedés a barrios, oficinas, gimnasios, eventos y cualquier espacio. 
              <strong className="text-gray-900">Un solo gesto, como pagar con el celular.</strong>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link 
                href="#como-funciona" 
                className="border border-indigo-700 text-indigo-700 hover:bg-indigo-50 px-8 py-4 rounded-xl font-semibold text-center transition-colors text-lg shadow-sm"
                aria-label="Ver cómo funciona KeyOn - Navegar a la sección de explicación">
                Ver Cómo Funciona
              </Link>
            </div>
            <p className="text-gray-400 text-sm mt-4">
              <span className="inline-flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                Seguro como una operación bancaria
              </span>
              {" • "}
              <span className="inline-flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd" />
                </svg>
                Compatible con todos los dispositivos
              </span>
            </p>
          </div>
          <div className="flex-1 relative flex justify-center items-center">
            <div className="w-full max-w-md mx-auto">
              <Image
                src="/images/KeyOn.png"
                alt="Interfaz de la aplicación KeyOn mostrando panel de control de accesos digital con códigos QR para acceder a diferentes ubicaciones como barrios, oficinas y gimnasios"
                width={400}
                height={300}
                className="rounded-lg shadow-2xl object-cover w-full h-auto"
                priority
                itemProp="image"
              />
            </div>
            {/* Elementos decorativos alrededor de la imagen */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-indigo-200 rounded-lg z-0" aria-hidden="true"></div>
            <div className="absolute -top-4 -left-4 w-16 h-16 bg-indigo-100 rounded-full z-0" aria-hidden="true"></div>
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
                <div className="w-full max-w-md mx-auto">
                  <Image
                    src="/images/keyOn_users.jpeg"
                    alt="Usuarios utilizando la aplicación KeyOn: personas accediendo a edificios y espacios mediante códigos QR desde sus teléfonos móviles, mostrando la facilidad de uso del sistema"
                    width={400}
                    height={300}
                    className="rounded-xl shadow-xl object-cover w-full h-auto bg-gray-50"
                    priority
                  />
                </div>
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
                <div className="w-full max-w-md mx-auto">
                  <Image
                    src="/images/key_admin.png"
                    alt="Panel administrativo de KeyOn mostrando interfaz de gestión: lista de usuarios, configuración de permisos, horarios de acceso y trazabilidad de ingresos para administradores de edificios y espacios"
                    width={400}
                    height={300}
                    className="rounded-xl shadow-xl object-contain p-2 w-full h-auto bg-gray-50"
                    priority
                  />
                </div>
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
      <section id="beneficios" className="py-20 px-4 bg-[#fafafa]">
        <div className="container mx-auto max-w-4xl px-8 lg:px-16">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Tecnología, seguridad y fluidez urbana
            </h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">
              Compatible con cerraduras electrónicas, barreras, molinetes y sistemas existentes. 
              Un paso hacia la ciudad inteligente.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Tarjeta 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-200 flex flex-col items-start gap-4">
              <div className="w-14 h-14 bg-indigo-50 rounded-xl flex items-center justify-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">Una única identidad digital</h3>
              <p className="text-gray-500">
                Tu celular se convierte en tu llave universal. Un solo QR para acceder a barrios, oficinas, gimnasios, eventos y más.
              </p>
            </div>
            {/* Tarjeta 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-200 flex flex-col items-start gap-4">
              <div className="w-14 h-14 bg-indigo-50 rounded-xl flex items-center justify-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">Seguro como el banco</h3>
              <p className="text-gray-500">
                Tecnología de cifrado bancario, autenticación biométrica y protocolos de seguridad de nivel empresarial.
              </p>
            </div>
            {/* Tarjeta 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-200 flex flex-col items-start gap-4">
              <div className="w-14 h-14 bg-indigo-50 rounded-xl flex items-center justify-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">Compatible con todo</h3>
              <p className="text-gray-500">
                Funciona con cerraduras electrónicas, barreras, molinetes y cualquier sistema de acceso existente gracias a nuestras integraciones IoT.
              </p>
            </div>
            {/* Tarjeta 4 */}
            <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-200 flex flex-col items-start gap-4">
              <div className="w-14 h-14 bg-indigo-50 rounded-xl flex items-center justify-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">Gestión como WhatsApp</h3>
              <p className="text-gray-500">
                Administrá permisos de acceso tan fácil como gestionar un grupo de chat. Agregás, quitás, definís horarios desde tu celular.
              </p>
            </div>

            {/* Tarjeta 6 */}
            <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-200 flex flex-col items-start gap-4">
              <div className="w-14 h-14 bg-indigo-50 rounded-xl flex items-center justify-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">Detección automática</h3>
              <p className="text-gray-500">
                No necesitás buscar permisos ni validar manualmente. KeyOn detecta automáticamente a qué lugares tenés autorización de acceso.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de visión futurista */}
      <section className="py-20 px-4 bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 relative overflow-hidden">
        {/* Elementos decorativos de fondo */}
        <div className="absolute inset-0 bg-black bg-opacity-10"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-white bg-opacity-10 rounded-full -translate-x-48 -translate-y-48"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-white bg-opacity-10 rounded-full translate-x-40 translate-y-40"></div>
        
        <div className="container mx-auto max-w-4xl px-8 lg:px-16 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-white bg-opacity-20 rounded-full text-indigo-700 text-sm font-semibold mb-8 backdrop-blur-sm border border-white border-opacity-20">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              El futuro está aquí
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold !text-white mb-8 leading-tight drop-shadow-lg">
              Visión de <span className="!text-white">ciudad inteligente</span>
            </h2>
            
            <p className="text-xl md:text-2xl !text-white mb-12 max-w-4xl mx-auto leading-relaxed font-light drop-shadow-md">
              Imaginate un futuro donde mostrás un QR para peajes, transporte público, hospitales. 
              <strong className="!text-white font-semibold">KeyOn es el primer paso hacia esa realidad.</strong>
            </p>
            
                         {/* Grid de iconos futuristas */}
             <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
               <div className="text-center">
                 <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm border border-white border-opacity-20">
                   <svg className="w-8 h-8 text-indigo-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                   </svg>
                 </div>
                 <p className="!text-white text-sm font-semibold drop-shadow-md">Peajes automáticos</p>
               </div>
               
               <div className="text-center">
                 <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm border border-white border-opacity-20">
                   <svg className="w-8 h-8 text-indigo-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                   </svg>
                 </div>
                 <p className="!text-white text-sm font-semibold drop-shadow-md">Transporte público</p>
               </div>
               
               <div className="text-center">
                 <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm border border-white border-opacity-20">
                   <svg className="w-8 h-8 text-indigo-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                   </svg>
                 </div>
                 <p className="!text-white text-sm font-semibold drop-shadow-md">Servicios de salud</p>
               </div>
               
               <div className="text-center">
                 <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm border border-white border-opacity-20">
                   <svg className="w-8 h-8 text-indigo-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                   </svg>
                 </div>
                 <p className="!text-white text-sm font-semibold drop-shadow-md">Servicios municipales</p>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* Sección de llamada a la acción / gratuita */}
      <section className="py-16 flex justify-center bg-[#fafafa]">
        <div className="w-full max-w-2xl bg-white rounded-3xl shadow-lg px-10 py-12 text-center border border-gray-200 font-sans">
          <h2 className="text-4xl font-bold mb-4 text-gray-900 tracking-tight">
            Accedé gratis
          </h2>
          <p className="text-lg text-gray-500 mb-10 font-normal">
            KeyOn es una aplicación abierta y gratuita para todos los usuarios. Disfrutá de todas las funcionalidades sin costo.<br/>
            Si sos una empresa y querés promocionar tus servicios o productos dentro de la app, contactanos para conocer nuestras opciones de publicidad.
          </p>
          <a
            href="#"
            className="inline-block px-8 py-4 rounded-xl border border-indigo-700 text-indigo-700 font-semibold text-lg bg-white hover:bg-indigo-50 transition-colors shadow-sm"
          >
            Descargar KeyOn
          </a>
        </div>
      </section>

      {/* Sección de contacto */}
      <section id="contacto" className="py-20 px-4 bg-[#fafafa]">
        <div className="container mx-auto max-w-4xl px-8 lg:px-16">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 flex flex-col md:flex-row">
            <div className="md:w-1/2 bg-indigo-700 p-12 flex flex-col justify-center rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none">
              <h2 className="text-3xl font-bold mb-6 !text-white">Contáctanos</h2>
              <p className="!text-white mb-8 text-lg font-medium">
                Nuestro equipo está listo para responder tus dudas y ayudarte a encontrar la mejor solución para tu negocio.
              </p>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </span>
                  <div>
                    <h3 className="font-semibold text-lg !text-white">Email</h3>
                    <p className="!text-white font-medium">info@keyon.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </span>
                  <div>
                    <h3 className="font-semibold text-lg !text-white">Teléfonos</h3>
                    <p className="!text-white font-medium">+54 9 261 538 1131</p>
                    <p className="!text-white font-medium">+54 9 261 614 3039</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </span>
                  <div>
                    <h3 className="font-semibold text-lg !text-white">Oficina</h3>
                    <p className="!text-white font-medium">9 de Julio 500, Ciudad de Mendoza</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 p-12 flex flex-col justify-center bg-gray-50">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Solicita información</h3>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Nombre completo
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Ingresá tu nombre completo"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 bg-white transition-all duration-200 hover:border-gray-400 text-base shadow-sm"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 bg-white transition-all duration-200 hover:border-gray-400 text-base shadow-sm"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    placeholder="Contanos cómo podemos ayudarte..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 bg-white transition-all duration-200 hover:border-gray-400 text-base resize-none shadow-sm"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-indigo-700 hover:bg-indigo-800 text-white py-3 px-6 rounded-lg font-semibold text-base transition-all duration-200 shadow-md"
                >
                  Enviar mensaje
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
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
              <h3 className="text-lg font-semibold mb-6">Navegación</h3>
              <ul className="space-y-4">
                <li><Link href="#como-funciona" className="text-gray-400 hover:text-white transition-colors">Cómo Funciona</Link></li>
                <li><Link href="#beneficios" className="text-gray-400 hover:text-white transition-colors">Beneficios</Link></li>
                <li><Link href="#contacto" className="text-gray-400 hover:text-white transition-colors">Contacto</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-6">Contacto</h3>
              <ul className="space-y-4">
                <li><span className="text-gray-400">info@keyon.com</span></li>
                <li><span className="text-gray-400">+54 9 261 538 1131</span></li>
                <li><span className="text-gray-400">+54 9 261 614 3039</span></li>
                <li><span className="text-gray-400">9 de Julio 500, Ciudad de Mendoza</span></li>
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
