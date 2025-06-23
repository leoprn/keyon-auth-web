/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Configuración de imágenes externas
  images: {
    domains: ['yulkmmjwjvoavpbteoxg.supabase.co'],
  },
  // Configuración experimental para Next.js
  experimental: {
    // Habilita las Server Actions
    serverActions: {
      allowedOrigins: ['localhost:3000', 'keyon-web-auth.vercel.app'],
    }
  },
  // Configuración para deshabilitar la generación estática/SSR en ciertas páginas
  skipTrailingSlashRedirect: true,
  trailingSlash: false,
  // Configuración para ignorar errores de ESLint en producción
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Ignorar errores de TypeScript en producción
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig; 