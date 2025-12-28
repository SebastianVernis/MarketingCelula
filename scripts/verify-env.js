/**
 * Script para verificar que las variables de entorno estén configuradas
 * Uso: node scripts/verify-env.js
 */

console.log('🔍 Verificando Variables de Entorno\n');
console.log('═'.repeat(60));

const requiredVars = {
    'RESEND_API_KEY': {
        expected: 're_6xgZehYV_B8w6GzLLU56LFScqxeaHZk6y',
        description: 'API Key de Resend'
    },
    'EMAIL_TO': {
        expected: 'kslacelula.admi2@gmail.com',
        description: 'Email destinatario'
    }
};

let allCorrect = true;

for (const [varName, config] of Object.entries(requiredVars)) {
    const value = process.env[varName];
    const isConfigured = !!value;
    const isCorrect = value === config.expected;
    
    console.log(`\n📋 ${varName}`);
    console.log(`   Descripción: ${config.description}`);
    console.log(`   Configurada: ${isConfigured ? '✅' : '❌'}`);
    
    if (isConfigured) {
        console.log(`   Valor actual: ${value.substring(0, 20)}...`);
        console.log(`   Correcta: ${isCorrect ? '✅' : '⚠️'}`);
        
        if (!isCorrect) {
            console.log(`   ⚠️  Valor esperado: ${config.expected.substring(0, 20)}...`);
            allCorrect = false;
        }
    } else {
        console.log(`   ❌ NO CONFIGURADA`);
        console.log(`   Valor esperado: ${config.expected}`);
        allCorrect = false;
    }
}

console.log('\n' + '═'.repeat(60));

if (allCorrect) {
    console.log('\n✅ Todas las variables están correctamente configuradas\n');
    process.exit(0);
} else {
    console.log('\n⚠️  Algunas variables necesitan atención\n');
    console.log('📝 Para configurar en Vercel:');
    console.log('   1. Ir a: https://vercel.com/dashboard');
    console.log('   2. Seleccionar proyecto: marketing-celula');
    console.log('   3. Settings → Environment Variables');
    console.log('   4. Agregar/actualizar las variables mostradas arriba');
    console.log('   5. Hacer redeploy del proyecto\n');
    process.exit(1);
}
