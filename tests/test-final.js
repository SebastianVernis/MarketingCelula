const RESEND_API_KEY = 're_67m23uAi_Cxey8XRQeZRy3UBXcSzUzSXE';
const EMAIL_TO = 'kslacelula.admi2@gmail.com';

console.log('🧪 Prueba Final de Email\n');

fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        from: 'onboarding@resend.dev',
        to: EMAIL_TO,
        subject: 'Nueva Solicitud: Boda - Juan Pérez (TEST)',
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
                    .badge { background: #FFD700; color: #000; padding: 5px 10px; border-radius: 3px; display: inline-block; margin-bottom: 10px; }
                    .whatsapp-btn { background: #25D366; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 10px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>🎵 Nueva Solicitud de Evento</h1>
                        <p>Campaña Especial Bodas</p>
                    </div>
                    <div class="content">
                        <div class="badge">Campaña: bodas</div>
                        
                        <div class="field">
                            <div class="label">👤 Nombre:</div>
                            <div class="value">Juan Pérez (TEST)</div>
                        </div>
                        
                        <div class="field">
                            <div class="label">📞 Teléfono:</div>
                            <div class="value">5535412631</div>
                        </div>
                        
                        <div class="field">
                            <div class="label">🎉 Tipo de Evento:</div>
                            <div class="value">Boda</div>
                        </div>
                        
                        <div class="field">
                            <div class="label">📅 Fecha del Evento:</div>
                            <div class="value">sábado, 15 de junio de 2025</div>
                        </div>
                        
                        <div class="field">
                            <div class="label">💬 Comentarios:</div>
                            <div class="value">Esta es una prueba del sistema de envío de emails</div>
                        </div>
                        
                        <div class="field" style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd;">
                            <div class="label">📱 Contactar por WhatsApp:</div>
                            <div class="value">
                                <a href="https://wa.me/525535412631" class="whatsapp-btn">
                                    Abrir WhatsApp
                                </a>
                            </div>
                        </div>
                    </div>
                    <div style="text-align: center; margin-top: 20px; color: #888; font-size: 12px;">
                        <p>Grupo Musical Versátil La Célula</p>
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
    console.log('Status:', res.status, res.statusText);
    console.log('\nResponse:', JSON.stringify(data, null, 2));
    
    if (res.ok) {
        console.log('\n✅ ¡EMAIL ENVIADO EXITOSAMENTE!');
        console.log('\n📧 Destinatario:', EMAIL_TO);
        console.log('🆔 Email ID:', data.id);
        console.log('📊 Revisa en Resend: https://resend.com/emails/' + data.id);
        console.log('\n✉️  Verifica tu bandeja de entrada (y SPAM)');
    } else {
        console.log('\n❌ ERROR:', data.message);
    }
})
.catch(err => console.error('\n❌ Error de red:', err.message));
