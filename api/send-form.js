/**
 * Serverless Function para enviar formularios por email
 * Endpoint: /api/send-form
 */

export default async function handler(req, res) {
    // Solo permitir POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método no permitido' });
    }

    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        const { nombre, telefono, evento, fecha, comentarios, campaignTitle, campaignName } = req.body;

        // Validación básica
        if (!nombre || !telefono || !evento || !fecha) {
            return res.status(400).json({ 
                error: 'Faltan campos requeridos',
                required: ['nombre', 'telefono', 'evento', 'fecha']
            });
        }

        // Formatear fecha
        const formattedDate = new Date(fecha).toLocaleDateString('es-MX', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        // Preparar datos para el email
        const emailData = {
            to: process.env.EMAIL_TO || 'contacto@grupomusicalcelula.com',
            from: process.env.EMAIL_FROM || 'noreply@grupomusicalcelula.com',
            subject: `Nueva Solicitud: ${evento} - ${nombre}`,
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
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>🎵 Nueva Solicitud de Evento</h1>
                            <p>${campaignTitle || 'Campaña de Marketing'}</p>
                        </div>
                        <div class="content">
                            <div class="badge">Campaña: ${campaignName || 'general'}</div>
                            
                            <div class="field">
                                <div class="label">👤 Nombre:</div>
                                <div class="value">${nombre}</div>
                            </div>
                            
                            <div class="field">
                                <div class="label">📞 Teléfono:</div>
                                <div class="value">${telefono}</div>
                            </div>
                            
                            <div class="field">
                                <div class="label">🎉 Tipo de Evento:</div>
                                <div class="value">${evento}</div>
                            </div>
                            
                            <div class="field">
                                <div class="label">📅 Fecha del Evento:</div>
                                <div class="value">${formattedDate}</div>
                            </div>
                            
                            ${comentarios ? `
                            <div class="field">
                                <div class="label">💬 Comentarios:</div>
                                <div class="value">${comentarios}</div>
                            </div>
                            ` : ''}
                            
                            <div class="field" style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd;">
                                <div class="label">📱 Contactar por WhatsApp:</div>
                                <div class="value">
                                    <a href="https://wa.me/52${telefono}" style="background: #25D366; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 10px;">
                                        Abrir WhatsApp
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="footer">
                            <p>Grupo Musical Versátil La Célula</p>
                            <p>Este email fue generado automáticamente desde el formulario de ${campaignTitle || 'marketing'}</p>
                        </div>
                    </div>
                </body>
                </html>
            `,
            text: `
Nueva Solicitud de Evento - ${campaignTitle || 'Campaña de Marketing'}

Campaña: ${campaignName || 'general'}
Nombre: ${nombre}
Teléfono: ${telefono}
Tipo de Evento: ${evento}
Fecha: ${formattedDate}
${comentarios ? `Comentarios: ${comentarios}` : ''}

Contactar por WhatsApp: https://wa.me/52${telefono}
            `
        };

        // Enviar email usando el servicio configurado
        // Aquí puedes integrar con SendGrid, Resend, Nodemailer, etc.
        const emailSent = await sendEmail(emailData);

        if (emailSent) {
            // Registrar en GTM dataLayer
            return res.status(200).json({
                success: true,
                message: 'Formulario enviado correctamente',
                data: {
                    nombre,
                    evento,
                    fecha: formattedDate
                },
                gtmEvent: {
                    event: 'form_submission',
                    formName: campaignName,
                    eventType: evento,
                    eventDate: fecha
                }
            });
        } else {
            throw new Error('Error al enviar el email');
        }

    } catch (error) {
        console.error('Error en send-form:', error);
        return res.status(500).json({
            error: 'Error al procesar el formulario',
            message: error.message
        });
    }
}

/**
 * Función para enviar email
 * Puedes reemplazar esto con tu servicio preferido
 */
async function sendEmail(emailData) {
    // Opción 1: Usar Resend (recomendado para Vercel)
    if (process.env.RESEND_API_KEY) {
        try {
            const response = await fetch('https://api.resend.com/emails', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    from: emailData.from,
                    to: emailData.to,
                    subject: emailData.subject,
                    html: emailData.html
                })
            });

            if (!response.ok) {
                throw new Error(`Resend API error: ${response.statusText}`);
            }

            return true;
        } catch (error) {
            console.error('Error con Resend:', error);
            return false;
        }
    }

    // Opción 2: Usar SendGrid
    if (process.env.SENDGRID_API_KEY) {
        try {
            const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    personalizations: [{
                        to: [{ email: emailData.to }]
                    }],
                    from: { email: emailData.from },
                    subject: emailData.subject,
                    content: [{
                        type: 'text/html',
                        value: emailData.html
                    }]
                })
            });

            if (!response.ok) {
                throw new Error(`SendGrid API error: ${response.statusText}`);
            }

            return true;
        } catch (error) {
            console.error('Error con SendGrid:', error);
            return false;
        }
    }

    // Si no hay servicio configurado, solo logear
    console.log('Email data:', emailData);
    console.warn('No email service configured. Set RESEND_API_KEY or SENDGRID_API_KEY');
    
    // En desarrollo, retornar true para testing
    return process.env.NODE_ENV === 'development' || process.env.VERCEL_ENV === 'preview';
}
