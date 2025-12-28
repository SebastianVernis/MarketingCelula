/**
 * Test del endpoint /api/send-form en producción
 */

const PRODUCTION_URL = 'https://marketing-celula-ea8sucru8-chospa.vercel.app';

console.log('🧪 Probando API en Producción\n');
console.log('URL:', PRODUCTION_URL);
console.log('Endpoint:', '/api/send-form');
console.log('\n' + '='.repeat(60) + '\n');

const testData = {
    nombre: 'Juan Pérez TEST',
    telefono: '5535412631',
    evento: 'Boda',
    fecha: '2025-06-15',
    comentarios: 'Esta es una prueba del formulario en producción',
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
