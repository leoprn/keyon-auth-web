# KeyOn - Control de Accesos Inteligente

Plataforma web para gestionar el sistema KeyOn de control de accesos.

## Estructura del Proyecto

Este proyecto está estructurado de la siguiente manera:

- **Landing Page**: La página principal del sitio (/) muestra información sobre el producto KeyOn.
- **Autenticación**: Sistema completo de autenticación con Supabase.
  - Login
  - Registro
  - Verificación de email
  - Recuperación de contraseña
  - Actualización de contraseña

## Configuración de Supabase

Para que el proyecto funcione correctamente, es necesario configurar Supabase con los siguientes parámetros:

### 1. URL Configuration

En Supabase, ve a Authentication > URL Configuration:

- **Site URL**: `https://tu-dominio.com` (URL base de tu aplicación)
- **Redirect URLs**: Añade las siguientes URLs permitidas:
  - `https://tu-dominio.com/auth/verify-email`
  - `https://tu-dominio.com/auth/update-password`
  - `https://tu-dominio.com/api/auth/callback/verify-email`
  - `https://tu-dominio.com/api/auth/callback/reset-password`

### 2. Email Templates

En Supabase, personaliza tus plantillas de correo electrónico:

#### Verificación de Email:

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td align="center" style="padding: 20px 0;">
                <table role="presentation" width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    <tr>
                        <td align="center" style="padding: 40px 40px 20px 40px;">                           
                            <h1 style="color: #1a1a1a; font-size: 24px; margin: 0 0 20px 0; font-family: Arial, sans-serif;">
                                Confirma tu correo electrónico
                            </h1>
                            
                            <p style="color: #4a4a4a; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                                Gracias por registrarte en KeyOn. Para activar tu cuenta, por favor confirma tu dirección de correo electrónico.
                            </p>
                            
                            <table role="presentation" border="0" cellspacing="0" cellpadding="0" style="margin: 30px 0;">
                                <tr>
                                    <td align="center">
                                        <a href="{{ .RedirectTo }}/api/auth/callback/verify-email?token_hash={{ .TokenHash }}&type=email"
                                           style="display: inline-block; background-color: #4F46E5; color: #ffffff; text-decoration: none; padding: 12px 30px; border-radius: 6px; font-weight: normal; font-family: Arial, sans-serif;">
                                            Confirmar correo
                                        </a>
                                    </td>
                                </tr>
                            </table>
                            
                            <p style="color: #666666; font-size: 14px; line-height: 1.4; margin: 0 0 10px 0;">
                                Si no creaste una cuenta en KeyOn, puedes ignorar este mensaje.
                            </p>
                            
                            <p style="color: #666666; font-size: 14px; line-height: 1.4; margin: 0;">
                                Este enlace expirará en 24 horas por seguridad.
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 20px 40px; text-align: center; border-top: 1px solid #e6e6e6;">
                            <p style="color: #666666; font-size: 12px; margin: 0;">
                                KeyOn - Control de Accesos
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
```

#### Recuperación de Contraseña:

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td align="center" style="padding: 20px 0;">
                <table role="presentation" width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    <tr>
                        <td align="center" style="padding: 40px 40px 20px 40px;">                           
                            <h1 style="color: #1a1a1a; font-size: 24px; margin: 0 0 20px 0; font-family: Arial, sans-serif;">
                                Restablecer tu contraseña
                            </h1>
                            
                            <p style="color: #4a4a4a; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                                Has solicitado restablecer tu contraseña en KeyOn. Haz clic en el botón de abajo para crear una nueva contraseña.
                            </p>
                            
                            <table role="presentation" border="0" cellspacing="0" cellpadding="0" style="margin: 30px 0;">
                                <tr>
                                    <td align="center">
                                        <a href="{{ .ConfirmationURL }}"
                                           style="display: inline-block; background-color: #4F46E5; color: #ffffff; text-decoration: none; padding: 12px 30px; border-radius: 6px; font-weight: normal; font-family: Arial, sans-serif;">
                                            Restablecer contraseña
                                        </a>
                                    </td>
                                </tr>
                            </table>
                            
                            <p style="color: #666666; font-size: 14px; line-height: 1.4; margin: 0 0 10px 0;">
                                Si no solicitaste restablecer tu contraseña, puedes ignorar este mensaje. Tu contraseña actual seguirá funcionando.
                            </p>
                            
                            <p style="color: #666666; font-size: 14px; line-height: 1.4; margin: 0;">
                                Este enlace expirará en 1 hora por seguridad.
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 20px 40px; text-align: center; border-top: 1px solid #e6e6e6;">
                            <p style="color: #666666; font-size: 12px; margin: 0;">
                                KeyOn - Control de Accesos
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
```

## Instrucciones de Implementación

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/keyon-web.git
cd keyon-web
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-clave-anonima
```

### 4. Ejecutar en desarrollo

```bash
npm run dev
```

### 5. Construir para producción

```bash
npm run build
npm start
```

## Flujos de Usuario

### Registro y Verificación

1. El usuario se registra en `/auth/register`
2. Recibe un email con link de verificación
3. Al hacer clic, se procesa en `/api/auth/callback/verify-email`
4. Se redirige a `/auth/verify-email` mostrando el estado de verificación

### Recuperación de Contraseña

1. El usuario solicita recuperación en `/auth/forgot-password`
2. Recibe un email con link de recuperación
3. Al hacer clic, se procesa en `/api/auth/callback/reset-password`
4. Se redirige a `/auth/update-password` para establecer nueva contraseña

## Desarrollo

Para extender la aplicación, se recomienda seguir la estructura de carpetas existente y mantener la separación entre la landing page y el sistema de autenticación.
