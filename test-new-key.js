const RESEND_API_KEY = 're_6xgZehYV_B8w6GzLLU56LFScqxeaHZk6y';
const EMAIL_TO = 'kslacelula.admi2@gmail.com';

console.log('🧪 Probando con nueva API Key de Resend\n');
console.log('API Key:', RESEND_API_KEY.substring(0, 15) + '...');
console.log('Destinatario:', EMAIL_TO);
console.log('\n' + '='.repeat(60) + '\n');

console.log('📤 Enviando email de prueba...\n');

fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        from: 'onboarding@resend.dev',
        to: EMAIL_TO,
        subject: '🎵 Nueva Solicitud: Boda - Juan Pérez (TEST)',
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: linear-gradient(135deg, #000 0%, #1a1a1a 100%); color: white; padding: 20px; text-align: center; border-radius: 5px; }
                    .content { background: #f9f9f9; padding: 20px; border-radius: 5px; margin-top: 20px; }
                    .field { margin-bottom: 15px; padding: 10px; background: white; border-radius: 3px; }
                    .label { font-weight: bold; color: #555; font-size: 12px; text-transform: uppercase; }
                    .value { color: #000; margin-top: 5px; font-size: 16px; }
                    .badge { background: #FFD700; color: #000; padding: 5px 10px; border-radius: 3px; display: inline-block; margin-bottom: 10px; font-weight: bold; }
                    .whatsapp-btn { background: #25D366; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 10px; font-weight: bold; }
                    .footer { text-align: center; margin-top: 20px; color: #888; font-size: 12px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1 style="margin: 0; font-size: 24px;">🎵 Nueva Solicitud de Evento</h1>
                        <p style="margin: 10px 0 0 0; font-size: 14px;">Campaña Especial Bodas</p>
                    </div>
                    <div class="content">
                        <div class="badge">Campaña: bodas</div>
                        
                        <div class="field">
                            <div class="label">👤 Nombre</div>
                            <div class="value">Juan Pérez (TEST)</div>
                        </div>
                        
                        <div class="field">
                            <div class="label">📞 Teléfono</div>
                            <div class="value">5535412631</div>
                        </div>
                        
                        <div class="field">
                            <div class="label">🎉 Tipo de Evento</div>
                            <div class="value">Boda</div>
                        </div>
                        
                        <div class="field">
                            <div class="label">📅 Fecha del Evento</div>
                            <div class="value">Sábado, 15 de junio de 2025</div>
                        </div>
                        
                        <div class="field">
                            <div class="label">💬 Comentarios</div>
                            <div class="value">Esta es una prueba del sistema de envío de emails con Resend API</div>
                        </div>
                        
                        <div style="margin-top: 20px; padding-top: 20px; border-top: 2px solid #ddd; text-align: center;">
                            <p style="margin-bottom: 10px; font-weight: bold;">📱 Contactar por WhatsApp:</p>
                            <a href="https://wa.me/525535412631" class="whatsapp-btn">
                                Abrir WhatsApp
                            </a>
                        </div>
                    </div>
                    <div class="footer">
                        <p><strong>Grupo Musical Versátil La Célula</strong></p>
                        <p>Este email fue generado automáticamente desde el formulario de Campaña Especial Bodas</p>
                    </div>
                </div>
            </body>
            </html>
        `
    })
})
.then(async res => {
    const data = await res.json();
    
    console.log('📊 Status:', res.status, res.statusText);
    console.log('\n📨 Response:');
    console.log(JSON.stringify(data, null, 2));
    
    if (res.ok) {
        console.log('\n' + '='.repeat(60));
        console.log('✅ ¡EMAIL ENVIADO EXITOSAMENTE!');
        console.log('='.repeat(60));
        console.log('\n📧 Destinatario:', EMAIL_TO);
        console.log('🆔 Email ID:', data.id);
        console.log('📊 Ver en Resend: https://resend.com/emails/' + data.id);
        console.log('\n✉️  VERIFICA TU BANDEJA DE ENTRADA');
        console.log('📬 No olvides revisar la carpeta de SPAM');
        console.log('\n' + '='.repeat(60));
    } else {
        console.log('\n' + '='.repeat(60));
        console.log('❌ ERROR AL ENVIAR');
        console.log('='.repeat(60));
        console.log('\nMensaje:', data.message || 'Error desconocido');
    }
})
.catch(err => {
    console.error('\n❌ Error de conexión:', err.message);
});
