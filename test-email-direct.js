#!/usr/bin/env node
/**
 * Prueba directa del envío de email usando Resend
 * Sin necesidad de servidor
 */

// Configurar variables de entorno
process.env.RESEND_API_KEY = 're_67m23uAi_Cxey8XRQeZRy3UBXcSzUzSXE';
process.env.EMAIL_TO = 'kslacelula.admi2@gmail.com';
process.env.EMAIL_FROM = 'noreply@grupomusicalcelula.com';

console.log('🧪 Prueba Directa de Envío de Email con Resend\n');
console.log('Configuración:');
console.log(`- API Key: ${process.env.RESEND_API_KEY.substring(0, 15)}...`);
console.log(`- From: ${process.env.EMAIL_FROM}`);
console.log(`- To: ${process.env.EMAIL_TO}`);
console.log('\n' + '='.repeat(60) + '\n');

const testData = {
    nombre: "Juan Pérez (TEST)",
    telefono: "5535412631",
    evento: "Boda",
    fecha: "2025-06-15",
    comentarios: "Esta es una prueba del sistema de envío de emails con Resend",
    campaignTitle: "Campaña Especial Bodas",
    campaignName: "bodas"
};

// Formatear fecha
const formattedDate = new Date(testData.fecha).toLocaleDateString('es-MX', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
});

// Preparar email
const emailData = {
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_TO,
    subject: `Nueva Solicitud: ${testData.evento} - ${testData.nombre}`,
    html: `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #000 0%, #1a1a1a 100%); color: white; padding: 20px; text-align: center; }
                .content { background: #f9f9f9; padding: 20px; border-radius: 5px; margin-top: 20px; }
                .field { margin-bottom: 15px; }
                .label { font-weight: bold; color: #555; }
                .value { color: #000; margin-top: 5px; }
                .footer { text-align: center; margin-top: 20px; color: #888; font-size: 12px; }
                .badge { background: #FFD700; color: #000; padding: 5px 10px; border-radius: 3px; display: inline-block; margin-bottom: 10px; }
                .whatsapp-btn { background: #25D366; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 10px; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>🎵 Nueva Solicitud de Evento</h1>
                    <p>${testData.campaignTitle}</p>
                </div>
                <div class="content">
                    <div class="badge">Campaña: ${testData.campaignName}</div>
                    
                    <div class="field">
                        <div class="label">👤 Nombre:</div>
                        <div class="value">${testData.nombre}</div>
                    </div>
                    
                    <div class="field">
                        <div class="label">📞 Teléfono:</div>
                        <div class="value">${testData.telefono}</div>
                    </div>
                    
                    <div class="field">
                        <div class="label">🎉 Tipo de Evento:</div>
                        <div class="value">${testData.evento}</div>
                    </div>
                    
                    <div class="field">
                        <div class="label">📅 Fecha del Evento:</div>
                        <div class="value">${formattedDate}</div>
                    </div>
                    
                    <div class="field">
                        <div class="label">💬 Comentarios:</div>
                        <div class="value">${testData.comentarios}</div>
                    </div>
                    
                    <div class="field" style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd;">
                        <div class="label">📱 Contactar por WhatsApp:</div>
                        <div class="value">
                            <a href="https://wa.me/52${testData.telefono}" class="whatsapp-btn">
                                Abrir WhatsApp
                            </a>
                        </div>
                    </div>
                </div>
                <div class="footer">
                    <p>Grupo Musical Versátil La Célula</p>
                    <p>Este email fue generado automáticamente desde el formulario de ${testData.campaignTitle}</p>
                </div>
            </div>
        </body>
        </html>
    `
};

console.log('📧 Preparando email...');
console.log(`   Asunto: ${emailData.subject}`);
console.log(`   De: ${emailData.from}`);
console.log(`   Para: ${emailData.to}`);
console.log('\n⏳ Enviando a través de Resend...\n');

// Enviar email
async function sendEmail() {
    try {
        const response = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(emailData)
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(`Resend API error: ${response.status} ${response.statusText} - ${JSON.stringify(result)}`);
        }

        console.log('✅ EMAIL ENVIADO EXITOSAMENTE!\n');
        console.log('📨 Respuesta de Resend:');
        console.log(JSON.stringify(result, null, 2));
        console.log('\n' + '='.repeat(60));
        console.log('✉️  Verifica tu email en: ' + process.env.EMAIL_TO);
        console.log('📊 Dashboard de Resend: https://resend.com/emails');
        console.log('🎯 ID del Email:', result.id);
        console.log('='.repeat(60) + '\n');

        return true;
    } catch (error) {
        console.error('❌ ERROR AL ENVIAR EMAIL\n');
        console.error('Detalles:', error.message);
        
        if (error.cause) {
            console.error('Causa:', error.cause);
        }

        console.log('\n💡 Posibles soluciones:');
        console.log('1. Verifica que tu RESEND_API_KEY sea correcta');
        console.log('2. Verifica que el email FROM esté verificado en Resend');
        console.log('3. Para pruebas, usa: onboarding@resend.dev como FROM');
        console.log('4. Revisa tu cuenta en: https://resend.com/dashboard\n');

        return false;
    }
}

// Ejecutar
sendEmail()
    .then(success => {
        if (success) {
            console.log('✅ Prueba completada exitosamente\n');
            process.exit(0);
        } else {
            console.log('❌ Prueba falló\n');
            process.exit(1);
        }
    })
    .catch(error => {
        console.error('❌ Error inesperado:', error);
        process.exit(1);
    });
