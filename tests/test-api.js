#!/usr/bin/env node
/**
 * Script de prueba para el API endpoint /api/send-form
 * 
 * Uso:
 *   node test-api.js
 * 
 * O si el servidor ya está corriendo:
 *   node test-api.js http://localhost:3000
 */

const testFormSubmission = async (baseUrl = 'http://localhost:3000') => {
    console.log('🧪 Probando API endpoint de envío de formularios\n');
    console.log(`Base URL: ${baseUrl}\n`);

    const testData = {
        nombre: "Juan Pérez (TEST)",
        telefono: "5535412631",
        evento: "Boda",
        fecha: "2025-06-15",
        comentarios: "Esta es una prueba del sistema de envío de emails con Resend",
        campaignTitle: "Campaña Especial Bodas",
        campaignName: "bodas"
    };

    console.log('📤 Enviando datos de prueba:');
    console.log(JSON.stringify(testData, null, 2));
    console.log('\n⏳ Esperando respuesta...\n');

    try {
        const response = await fetch(`${baseUrl}/api/send-form`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(testData)
        });

        const contentType = response.headers.get('content-type');
        let result;

        if (contentType && contentType.includes('application/json')) {
            result = await response.json();
        } else {
            const text = await response.text();
            result = { error: 'Respuesta no es JSON', text };
        }

        console.log(`📊 Status Code: ${response.status} ${response.statusText}\n`);

        if (response.ok) {
            console.log('✅ ÉXITO - Formulario enviado correctamente\n');
            console.log('📨 Respuesta del servidor:');
            console.log(JSON.stringify(result, null, 2));
            
            if (result.gtmEvent) {
                console.log('\n📊 Evento GTM generado:');
                console.log(JSON.stringify(result.gtmEvent, null, 2));
            }

            console.log('\n✉️  Verifica tu email:', testData.campaignName);
            console.log('📧 Destinatario:', process.env.EMAIL_TO || 'contacto@grupomusicalcelula.com');
        } else {
            console.log('❌ ERROR - La petición falló\n');
            console.log('📨 Respuesta del servidor:');
            console.log(JSON.stringify(result, null, 2));
        }

        return result;
    } catch (error) {
        console.log('❌ ERROR - No se pudo conectar al servidor\n');
        console.error('Detalles del error:', error.message);
        
        if (error.cause) {
            console.error('Causa:', error.cause);
        }

        console.log('\n💡 Sugerencias:');
        console.log('1. Verifica que el servidor esté corriendo: npm run dev');
        console.log('2. Verifica la URL correcta:', baseUrl);
        console.log('3. Verifica que el puerto 3000 esté disponible');
        
        return null;
    }
};

// Verificar variables de entorno
console.log('🔍 Verificando configuración de variables de entorno:\n');

const checks = [
    {
        name: 'RESEND_API_KEY',
        value: process.env.RESEND_API_KEY,
        required: true
    },
    {
        name: 'EMAIL_TO',
        value: process.env.EMAIL_TO,
        required: false,
        default: 'contacto@grupomusicalcelula.com'
    },
    {
        name: 'EMAIL_FROM',
        value: process.env.EMAIL_FROM,
        required: false,
        default: 'noreply@grupomusicalcelula.com'
    }
];

let allGood = true;
checks.forEach(check => {
    const value = check.value;
    const hasValue = value && value.length > 0;
    
    if (check.required && !hasValue) {
        console.log(`❌ ${check.name}: NO CONFIGURADA (requerida)`);
        allGood = false;
    } else if (hasValue) {
        const displayValue = check.name.includes('KEY') 
            ? value.substring(0, 10) + '...' 
            : value;
        console.log(`✅ ${check.name}: ${displayValue}`);
    } else {
        console.log(`⚠️  ${check.name}: Usando default (${check.default})`);
    }
});

console.log('\n' + '='.repeat(60) + '\n');

if (!allGood) {
    console.log('❌ Faltan variables de entorno requeridas\n');
    console.log('Para configurar:');
    console.log('1. Edita el archivo .env.local');
    console.log('2. Agrega tu RESEND_API_KEY');
    console.log('3. Reinicia el servidor: npm run dev\n');
    console.log('Ejemplo de .env.local:');
    console.log('RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxx');
    console.log('EMAIL_TO=contacto@grupomusicalcelula.com');
    console.log('EMAIL_FROM=noreply@grupomusicalcelula.com\n');
    process.exit(1);
}

// Obtener URL base de los argumentos o usar default
const baseUrl = process.argv[2] || 'http://localhost:3000';

// Ejecutar prueba
testFormSubmission(baseUrl)
    .then(() => {
        console.log('\n✅ Prueba completada');
        process.exit(0);
    })
    .catch(error => {
        console.error('\n❌ Error inesperado:', error);
        process.exit(1);
    });
