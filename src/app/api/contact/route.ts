import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

// Función para enviar email de agradecimiento al usuario
async function sendThankYouEmail(contactData: any) {
  if (process.env.RESEND_API_KEY) {
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`
        },
        body: JSON.stringify({
          from: 'KeyOn <hola@keyonapp.com>',
          to: [contactData.email],
          subject: '¡Gracias por contactarte con KeyOn! 🔑',
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
              <!-- Header con logo y gradiente -->
              <div style="background: linear-gradient(135deg, #4f46e5 0%, #6366f1 100%); padding: 40px 30px; text-align: center; border-radius: 12px 12px 0 0;">
                <div style="background-color: white; padding: 16px; border-radius: 12px; display: inline-block; margin-bottom: 20px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                  <h1 style="color: #4f46e5; font-size: 28px; font-weight: bold; margin: 0; letter-spacing: -0.5px;">KeyOn</h1>
                </div>
                <h2 style="color: white; font-size: 24px; font-weight: 600; margin: 0; line-height: 1.3;">¡Gracias por contactarte!</h2>
              </div>
              
              <!-- Contenido principal -->
              <div style="padding: 40px 30px; background-color: #ffffff;">
                <p style="font-size: 18px; color: #1f2937; margin: 0 0 20px 0; line-height: 1.6;">
                  Hola <strong style="color: #4f46e5;">${contactData.name}</strong>,
                </p>
                
                <p style="font-size: 16px; color: #4b5563; margin: 0 0 25px 0; line-height: 1.6;">
                  Recibimos tu mensaje y queremos agradecerte por tu interés en <strong>KeyOn</strong>, tu llave digital universal.
                </p>
                
                <div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); padding: 25px; border-radius: 12px; border-left: 4px solid #4f46e5; margin: 25px 0;">
                  <h3 style="color: #374151; font-size: 18px; font-weight: 600; margin: 0 0 15px 0;">Tu mensaje:</h3>
                  <p style="color: #6b7280; font-style: italic; margin: 0; line-height: 1.6; font-size: 15px;">
                    "${contactData.message}"
                  </p>
                </div>
                
                <p style="font-size: 16px; color: #4b5563; margin: 25px 0; line-height: 1.6;">
                  Nuestro equipo está revisando tu consulta y <strong style="color: #4f46e5;">nos estaremos contactando contigo a la brevedad</strong> para brindarte toda la información que necesitás.
                </p>
                
                <!-- Beneficios clave -->
                <div style="background-color: #f9fafb; padding: 25px; border-radius: 12px; margin: 25px 0;">
                  <h3 style="color: #374151; font-size: 18px; font-weight: 600; margin: 0 0 20px 0; text-align: center;">¿Por qué elegir KeyOn?</h3>
                  
                  <div style="display: flex; flex-wrap: wrap; gap: 15px; justify-content: center;">
                    <div style="background: white; padding: 15px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); flex: 1; min-width: 160px; text-align: center;">
                      <div style="font-size: 24px; margin-bottom: 8px;">📱</div>
                      <h4 style="color: #4f46e5; font-size: 14px; font-weight: 600; margin: 0 0 5px 0;">Universal</h4>
                      <p style="color: #6b7280; font-size: 12px; margin: 0; line-height: 1.4;">Un solo celular para todos tus accesos</p>
                    </div>
                    
                    <div style="background: white; padding: 15px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); flex: 1; min-width: 160px; text-align: center;">
                      <div style="font-size: 24px; margin-bottom: 8px;">🔒</div>
                      <h4 style="color: #4f46e5; font-size: 14px; font-weight: 600; margin: 0 0 5px 0;">Seguro</h4>
                      <p style="color: #6b7280; font-size: 12px; margin: 0; line-height: 1.4;">Seguridad nivel bancario</p>
                    </div>
                    
                    <div style="background: white; padding: 15px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); flex: 1; min-width: 160px; text-align: center;">
                      <div style="font-size: 24px; margin-bottom: 8px;">⚡</div>
                      <h4 style="color: #4f46e5; font-size: 14px; font-weight: 600; margin: 0 0 5px 0;">Instantáneo</h4>
                      <p style="color: #6b7280; font-size: 12px; margin: 0; line-height: 1.4;">Un gesto y ya estás adentro</p>
                    </div>
                  </div>
                </div>                
              </div>
              
              <!-- Footer -->
              <div style="background-color: #f9fafb; padding: 30px; text-align: center; border-radius: 0 0 12px 12px; border-top: 1px solid #e5e7eb;">
                <p style="color: #6b7280; font-size: 14px; margin: 0 0 10px 0; line-height: 1.5;">
                  <strong style="color: #374151;">KeyOn</strong> - Tu llave digital universal
                </p>
                <p style="color: #9ca3af; font-size: 12px; margin: 0 0 15px 0;">
                  Vicente Zapata 203, Dorrego, Mendoza, Argentina
                </p>
                <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                  Este email fue enviado porque completaste nuestro formulario de contacto.<br/>
                  Si tenés alguna pregunta, simplemente respondé este email.
                </p>
              </div>
            </div>
          `
        })
      });

      const data = await res.json();
      console.log(`✅ Email de agradecimiento enviado a ${contactData.email}`, data);
      return;
    } catch (error) {
      console.error('❌ Error enviando email de agradecimiento:', error);
      // No hacer throw para que no falle la operación principal
    }
  }
}

// Función para enviar email de notificación
async function sendNotificationEmail(contactData: any) {
  // Usar fetch directamente como la función que funciona
  if (process.env.RESEND_API_KEY) {
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`
        },
        body: JSON.stringify({
          from: 'Contacto desde KeyOn <contacto@keyonapp.com>',
          to: [process.env.NOTIFICATION_EMAIL || 'leoprn@gmail.com'],
          subject: '🔔 Nuevo mensaje de contacto en KeyOn',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #4f46e5;">Nuevo mensaje de contacto</h2>
              <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #374151; margin-top: 0;">Datos del contacto:</h3>
                <p><strong>Nombre:</strong> ${contactData.name}</p>
                <p><strong>Email:</strong> ${contactData.email}</p>
                <p><strong>Fecha:</strong> ${new Date(contactData.created_at).toLocaleString('es-AR')}</p>
                <p><strong>IP:</strong> ${contactData.ip_address}</p>
              </div>
              <div style="background: #fff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
                <h3 style="color: #374151; margin-top: 0;">Mensaje:</h3>
                <p style="white-space: pre-wrap; line-height: 1.6;">${contactData.message}</p>
              </div>
              <div style="margin-top: 20px; padding: 15px; background: #fef3c7; border-radius: 6px;">
                <p style="margin: 0; color: #92400e;">
                  <strong>💡 Acción requerida:</strong> Responde a ${contactData.email} lo antes posible.
                </p>
              </div>
            </div>
          `
        })
      });

      const data = await res.json();
      console.log(`✅ Email de notificación enviado a ${process.env.NOTIFICATION_EMAIL || 'leoprn@gmail.com'}`, data);
      return;
    } catch (error) {
      console.error('❌ Error enviando email:', error);
      throw error;
    }
  }

  // Fallback usando fetch para servicio externo (opcional)
  if (process.env.NOTIFICATION_WEBHOOK_URL) {
    // Webhook solo para notificación al admin (el agradecimiento al usuario requiere template específico)
    await fetch(process.env.NOTIFICATION_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: process.env.NOTIFICATION_EMAIL || 'leoprn@gmail.com',
        subject: '🔔 Nuevo mensaje de contacto en KeyOn',
        contactData
      })
    });
    
    console.log(`✅ Notificación enviada via webhook a ${process.env.NOTIFICATION_EMAIL || 'leoprn@gmail.com'}`);
    console.log(`⚠️ Email de agradecimiento al usuario requiere configurar RESEND_API_KEY`);
    return;
  }

  console.log(`⚠️ No hay configuración de email. Mensaje guardado solo en Supabase. Configure RESEND_API_KEY y NOTIFICATION_EMAIL para enviar:
    • Email de agradecimiento al usuario
    • Email de notificación al administrador`);
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactForm = await request.json();
    
    // Validación básica
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: 'Todos los campos son requeridos' },
        { status: 400 }
      );
    }

    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Email no válido' },
        { status: 400 }
      );
    }

    // Preparar datos para Supabase
    const messageData = {
      name: body.name.trim(),
      email: body.email.trim().toLowerCase(),
      message: body.message.trim(),
      status: 'new',
      ip_address: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
    };

    console.log('📧 MENSAJE DE CONTACTO RECIBIDO:', messageData);

    // Crear cliente de Supabase (sin autenticación para tabla pública)
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { data, error } = await supabase
      .from('contact_messages')
      .insert(messageData)
      .select()
      .single();

    if (error) {
      console.error('Error al guardar en Supabase:', error);
      return NextResponse.json(
        { error: 'Error al procesar el mensaje: ' + error.message },
        { status: 500 }
      );
    }

    console.log('✅ Mensaje guardado en Supabase:', data);

    // Enviar emails simultáneamente (agradecimiento al usuario y notificación al admin)
    try {
      await Promise.all([
        sendThankYouEmail(data),    // Email de agradecimiento al usuario
        sendNotificationEmail(data)  // Email de notificación al admin
      ]);
    } catch (emailError) {
      console.error('Error enviando emails:', emailError);
      // No fallar la request si los emails fallan
    }

    return NextResponse.json(
      { 
        message: 'Mensaje enviado correctamente. Revisá tu email para confirmar que lo recibimos y te contactaremos pronto.',
        id: data.id
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error en formulario de contacto:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
} 