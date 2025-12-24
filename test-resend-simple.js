// Prueba simple de Resend
const RESEND_API_KEY = 're_67m23uAi_Cxey8XRQeZRy3UBXcSzUzSXE';

console.log('🧪 Prueba Simple de Resend API\n');
console.log('API Key:', RESEND_API_KEY.substring(0, 15) + '...\n');

fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        from: 'onboarding@resend.dev',
        to: 'kslacelula.admi2@gmail.com',
        subject: 'Test desde Marketing Célula',
        html: '<h1>¡Hola!</h1><p>Este es un email de prueba desde el sistema de Marketing Célula.</p>'
    })
})
.then(async res => {
    const data = await res.json();
    console.log('Status:', res.status);
    console.log('Response:', JSON.stringify(data, null, 2));
    
    if (res.ok) {
        console.log('\n✅ EMAIL ENVIADO!');
        console.log('Revisa tu bandeja:', 'kslacelula.admi2@gmail.com');
    } else {
        console.log('\n❌ ERROR:', data.message);
    }
})
.catch(err => console.error('Error:', err));
