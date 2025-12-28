/**
 * Script de prueba para verificar el envío de formularios desde las 3 campañas
 * Uso: node tests/test-campaigns.js [local|production]
 */

const testData = {
    bodas: {
        nombre: 'Juan Pérez',
        telefono: '5512345678',
        evento: 'Boda',
        fecha: '2025-06-15',
        comentarios: 'Prueba de campaña de bodas',
        campaignTitle: 'Campaña Especial Bodas',
        campaignName: 'bodas'
    },
    xv: {
        nombre: 'María González',
        telefono: '5587654321',
        evento: 'XV años',
        fecha: '2025-07-20',
        comentarios: 'Prueba de campaña de XV años',
        campaignTitle: 'Campaña Especial XV Años',
        campaignName: 'xv'
    },
    privada: {
        nombre: 'Carlos Rodríguez',
        telefono: '5598765432',
        evento: 'Cumpleaños',
        fecha: '2025-08-10',
        comentarios: 'Prueba de campaña de fiesta privada',
        campaignTitle: 'Campaña Especial Fiesta Privada',
        campaignName: 'privada'
    }
};

const environment = process.argv[2] || 'local';
const baseUrl = environment === 'production' 
    ? 'https://marketing.grupomusicalcelula.com'
    : 'http://localhost:3000';

console.log('🧪 Prueba de Campañas de Marketing\n');
console.log(`🌐 Entorno: ${environment}`);
console.log(`🔗 URL Base: ${baseUrl}\n`);
console.log('═'.repeat(60));

async function testCampaign(campaignName, data) {
    console.log(`\n📋 Probando campaña: ${campaignName.toUpperCase()}`);
    console.log('─'.repeat(60));
    
    try {
        const response = await fetch(`${baseUrl}/api/send-form`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        
        console.log(`📊 Status: ${response.status} ${response.statusText}`);
        
        if (response.ok) {
            console.log('✅ Resultado:', JSON.stringify(result, null, 2));
            console.log(`\n✨ Campaña: ${data.campaignTitle}`);
            console.log(`📧 Nombre: ${data.nombre}`);
            console.log(`🎉 Evento: ${data.evento}`);
            console.log(`📅 Fecha: ${data.fecha}`);
            
            if (result.gtmEvent) {
                console.log(`\n📊 GTM Event:`, JSON.stringify(result.gtmEvent, null, 2));
            }
        } else {
            console.log('❌ Error:', JSON.stringify(result, null, 2));
        }
        
        return { success: response.ok, campaignName, result };
        
    } catch (error) {
        console.log('❌ Error de conexión:', error.message);
        return { success: false, campaignName, error: error.message };
    }
}

async function runTests() {
    const results = [];
    
    // Probar cada campaña
    for (const [campaignName, data] of Object.entries(testData)) {
        const result = await testCampaign(campaignName, data);
        results.push(result);
        
        // Esperar 2 segundos entre pruebas
        if (campaignName !== 'privada') {
            console.log('\n⏳ Esperando 2 segundos...');
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
    }
    
    // Resumen
    console.log('\n' + '═'.repeat(60));
    console.log('📊 RESUMEN DE PRUEBAS');
    console.log('═'.repeat(60));
    
    const successful = results.filter(r => r.success).length;
    const failed = results.filter(r => !r.success).length;
    
    console.log(`\n✅ Exitosas: ${successful}/${results.length}`);
    console.log(`❌ Fallidas: ${failed}/${results.length}`);
    
    results.forEach(r => {
        const icon = r.success ? '✅' : '❌';
        console.log(`${icon} ${r.campaignName.toUpperCase()}`);
    });
    
    console.log('\n' + '═'.repeat(60));
    
    if (failed > 0) {
        console.log('\n⚠️  ACCIONES RECOMENDADAS:');
        console.log('1. Verifica que las variables de entorno estén configuradas:');
        console.log('   - RESEND_API_KEY');
        console.log('   - EMAIL_TO');
        console.log('2. Revisa los logs del servidor para más detalles');
        console.log('3. Verifica que el servidor esté corriendo en:', baseUrl);
        
        if (environment === 'production') {
            console.log('4. Revisa los logs en Vercel Dashboard');
            console.log('5. Verifica el dashboard de Resend: https://resend.com/emails');
        }
    } else {
        console.log('\n🎉 ¡Todas las pruebas pasaron exitosamente!');
        console.log('\n📧 Verifica tu email para confirmar que recibiste 3 emails:');
        console.log('   💍 Email de campaña de Bodas (dorado)');
        console.log('   👑 Email de campaña de XV Años (rosa)');
        console.log('   🎉 Email de campaña de Fiesta Privada (púrpura)');
        
        if (environment === 'production') {
            console.log('\n📊 Verifica en Resend Dashboard: https://resend.com/emails');
        }
    }
    
    console.log('\n');
}

// Ejecutar pruebas
runTests().catch(error => {
    console.error('❌ Error fatal:', error);
    process.exit(1);
});
