/**
 * Test del endpoint /api/send-form en el dominio de producción
 */

const PRODUCTION_URL = 'https://marketing.grupomusicalcelula.com';

console.log('🧪 Probando API en Dominio de Producción\n');
console.log('URL:', PRODUCTION_URL);
console.log('Endpoint:', '/api/send-form');
console.log('\n' + '='.repeat(60) + '\n');

const testData = {
    nombre: 'Juan Pérez TEST COMPLETO',
    telefono: '5535412631',
    evento: 'Boda',
    fecha: '2025-06-15',
    comentarios: 'Esta es una prueba completa del formulario con envío de email',
    campaignTitle: 'Campaña Especial Bodas',
    campaignName: 'bodas'
};

console.log('📤 Enviando datos de prueba...\n');
console.log('Datos:', JSON.stringify(testData, null, 2));
console.log('\n' + '='.repeat(60) + '\n');

fetch(`${PRODUCTION_URL}/api/send-form`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(testData)
})
.then(async res => {
    const data = await res.json();
    
    console.log('📊 Status:', res.status, res.statusText);
    console.log('\n📨 Response:');
    console.log(JSON.stringify(data, null, 2));
    
    if (res.ok) {
        console.log('\n' + '='.repeat(60));
        console.log('✅ ¡API FUNCIONANDO CORRECTAMENTE!');
        console.log('='.repeat(60));
        console.log('\n📧 El email debería haber sido enviado a: kslacelula.admi2@gmail.com');
        console.log('📬 Verifica tu bandeja de entrada y carpeta de SPAM');
        console.log('\n💡 Si no recibes el email, revisa:');
        console.log('   1. Las variables de entorno en Vercel (RESEND_API_KEY, EMAIL_TO)');
        console.log('   2. Los logs de la función serverless en Vercel');
        console.log('   3. El dashboard de Resend: https://resend.com/emails');
    } else {
        console.log('\n' + '='.repeat(60));
        console.log('❌ ERROR EN LA API');
        console.log('='.repeat(60));
        console.log('\nMensaje:', data.message || data.error || 'Error desconocido');
        
        if (data.error) {
            console.log('\n🔍 Detalles del error:');
            console.log(JSON.stringify(data, null, 2));
        }
    }
})
.catch(err => {
    console.error('\n❌ Error de conexión:', err.message);
    console.error('\n🔍 Verifica que:');
    console.error('  1. El deployment esté activo');
    console.error('  2. Las variables de entorno estén configuradas en Vercel');
    console.error('  3. La API key de Resend sea válida');
});
