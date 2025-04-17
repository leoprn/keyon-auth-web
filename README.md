# Supabase Auth Redirects

Este proyecto maneja las redirecciones de autenticación para Supabase, específicamente para la verificación de email y el reseteo de contraseña.

## Configuración

1. Clona este repositorio
2. Instala las dependencias:
```bash
npm install
```

3. Copia el archivo de variables de entorno:
```bash
cp .env.example .env.local
```

4. Actualiza las variables en `.env.local` con tus credenciales de Supabase:
- `NEXT_PUBLIC_SUPABASE_URL`: La URL de tu proyecto en Supabase
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: La clave anónima de tu proyecto en Supabase

## Configuración en Supabase

1. En tu dashboard de Supabase, ve a Authentication > URL Configuration
2. Configura las siguientes URLs:
   - Site URL: `https://tu-dominio.vercel.app`
   - Redirect URLs:
     - `https://tu-dominio.vercel.app/auth/callback/verify-email`
     - `https://tu-dominio.vercel.app/auth/callback/reset-password`

## Desarrollo Local

```bash
npm run dev
```

## Despliegue en Vercel

1. Conecta tu repositorio a Vercel
2. Configura las variables de entorno en el dashboard de Vercel
3. ¡Despliega!

## Rutas Disponibles

- `/auth/callback/verify-email`: Maneja la verificación de email
- `/auth/callback/reset-password`: Maneja el reseteo de contraseña

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
