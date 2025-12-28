# Cambios Realizados - Sistema de Formularios y Campañas

## 📋 Resumen

Se corrigieron y mejoraron los formularios de las 3 campañas de marketing (Bodas, XV Años, Fiesta Privada) para que:
1. Cada campaña se identifique correctamente
2. Los emails tengan diseños personalizados según la campaña
3. Haya mejor logging y debugging en producción
4. Se manejen errores de forma más robusta

---

## ✅ Archivos Modificados

### 1. `/Marketing/xv.html`
**Cambio:** Corregir identificadores de campaña

```html
<!-- ANTES -->
<form class="evento-form" id="eventoForm" 
      data-campaign-title="Campaña Especial Bodas"
      data-campaign-name="bodas">

<!-- DESPUÉS -->
<form class="evento-form" id="eventoForm" 
      data-campaign-title="Campaña Especial XV Años"
      data-campaign-name="xv">
```

### 2. `/Marketing/privada.html`
**Cambio:** Corregir identificadores de campaña

```html
<!-- ANTES -->
<form class="evento-form" id="eventoForm" 
      data-campaign-title="Campaña Especial Bodas"
      data-campaign-name="bodas">

<!-- DESPUÉS -->
<form class="evento-form" id="eventoForm" 
      data-campaign-title="Campaña Especial Fiesta Privada"
      data-campaign-name="privada">
```

### 3. `/api/send-form.js`
**Cambios principales:**

#### a) Logging mejorado para debugging
```javascript
// Nuevo logging al inicio
console.log('📨 Recibiendo formulario:', {
    campaignName,
    campaignTitle,
    evento,
    timestamp: new Date().toISOString()
});
```

#### b) Configuración dinámica de diseño por campaña
```javascript
const campaignConfig = {
    bodas: {
        emoji: '💍',
        color: '#FFD700',
        gradient: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)'
    },
    xv: {
        emoji: '👑',
        color: '#FF69B4',
        gradient: 'linear-gradient(135deg, #FF69B4 0%, #FF1493 100%)'
    },
    privada: {
        emoji: '🎉',
        color: '#9370DB',
        gradient: 'linear-gradient(135deg, #9370DB 0%, #8A2BE2 100%)'
    }
};
```

#### c) Plantilla HTML dinámica
```javascript
// El header del email ahora usa el gradiente de la campaña
.header { background: ${config.gradient}; ... }

// El asunto incluye el emoji de la campaña
subject: `${config.emoji} Nueva Solicitud: ${evento} - ${nombre} [${campaignTitle}]`
```

#### d) Mejor manejo de errores
```javascript
// La función sendEmail ahora retorna un objeto estructurado
return {
    success: true,
    id: responseData.id
};

// O en caso de error:
return {
    success: false,
    error: 'Descripción del error'
};
```

#### e) Logging detallado de Resend
```javascript
console.log('🔑 Usando Resend API Key:', process.env.RESEND_API_KEY.substring(0, 10) + '...');
console.log('📬 Respuesta de Resend:', { status: response.status, data: responseData });
console.log('✅ Email enviado exitosamente:', emailSent.id);
```

### 4. `/package.json`
**Cambio:** Agregar scripts de prueba

```json
"scripts": {
  "test:campaigns": "node tests/test-campaigns.js local",
  "test:campaigns:prod": "node tests/test-campaigns.js production"
}
```

---

## 📁 Archivos Nuevos

### 1. `/docs/VERIFICACION_PRODUCCION.md`
Guía completa para:
- Verificar configuración en Vercel
- Configurar variables de entorno
- Troubleshooting de problemas comunes
- Monitoreo de emails enviados

### 2. `/tests/test-campaigns.js`
Script de prueba automatizado que:
- Prueba las 3 campañas (bodas, xv, privada)
- Verifica que cada una envíe correctamente
- Muestra un resumen de resultados
- Funciona en local y producción

---

## 🎨 Diseño de Emails por Campaña

### Bodas 💍
- **Color principal:** Dorado (#FFD700)
- **Gradiente:** Dorado → Naranja
- **Emoji:** 💍
- **Asunto:** `💍 Nueva Solicitud: [Evento] - [Nombre] [Campaña Especial Bodas]`

### XV Años 👑
- **Color principal:** Rosa (#FF69B4)
- **Gradiente:** Rosa → Rosa Oscuro
- **Emoji:** 👑
- **Asunto:** `👑 Nueva Solicitud: [Evento] - [Nombre] [Campaña Especial XV Años]`

### Fiesta Privada 🎉
- **Color principal:** Púrpura (#9370DB)
- **Gradiente:** Púrpura → Violeta
- **Emoji:** 🎉
- **Asunto:** `🎉 Nueva Solicitud: [Evento] - [Nombre] [Campaña Especial Fiesta Privada]`

---

## 🧪 Cómo Probar

### Prueba Local
```bash
# 1. Iniciar servidor de desarrollo
npm run dev

# 2. En otra terminal, ejecutar pruebas
npm run test:campaigns
```

### Prueba en Producción
```bash
# Después de hacer deploy
npm run test:campaigns:prod
```

### Prueba Manual
1. Visitar cada página:
   - https://marketing.grupomusicalcelula.com/bodas
   - https://marketing.grupomusicalcelula.com/xv
   - https://marketing.grupomusicalcelula.com/privada

2. Llenar y enviar el formulario

3. Verificar:
   - ✅ Email recibido con diseño correcto
   - ✅ Asunto con emoji y campaña correcta
   - ✅ WhatsApp se abre correctamente
   - ✅ Logs en Vercel muestran el proceso

---

## 🔍 Debugging en Producción

### Ver Logs en Vercel
```bash
# Opción 1: CLI
vercel logs --follow

# Opción 2: Dashboard
# Vercel → Deployments → [Tu deployment] → Functions → /api/send-form
```

### Logs a Buscar
- ✅ `📨 Recibiendo formulario:` - Handler recibe datos
- ✅ `🔑 Usando Resend API Key:` - API key configurada
- ✅ `📬 Respuesta de Resend:` - Respuesta de la API
- ✅ `✅ Email enviado exitosamente:` - Envío exitoso
- ❌ `❌ Error al enviar email:` - Problemas detectados

### Ver Emails en Resend
1. Ir a: https://resend.com/emails
2. Verificar estado de cada email:
   - ✅ **Delivered** - Entregado
   - ⏳ **Queued** - En cola
   - ❌ **Failed** - Falló (ver detalles)

---

## ⚠️ Problemas Conocidos y Soluciones

### 1. "No email service configured"
**Causa:** Variable `RESEND_API_KEY` no configurada

**Solución:**
1. Ir a Vercel → Settings → Environment Variables
2. Agregar `RESEND_API_KEY` con tu API key
3. Redeploy

### 2. "Resend API error (401)"
**Causa:** API key inválida

**Solución:**
1. Generar nueva API key en Resend
2. Actualizar en Vercel
3. Redeploy

### 3. "Resend API error (403)"
**Causa:** Dominio "from" no verificado

**Solución:**
- Temporal: Usar `onboarding@resend.dev`
- Permanente: Verificar dominio en Resend

### 4. Emails no llegan
**Verificar:**
1. Carpeta de SPAM
2. Variable `EMAIL_TO` correcta
3. Logs de Vercel
4. Dashboard de Resend

---

## 📊 Variables de Entorno Requeridas

```bash
# En Vercel → Settings → Environment Variables

# API Key de Resend (obligatorio)
RESEND_API_KEY=re_6xgZehYV_B8w6GzLLU56LFScqxeaHZk6y

# Email destinatario (obligatorio)
EMAIL_TO=kslacelula.admi2@gmail.com

# Opcional: Email remitente (si tienes dominio verificado)
EMAIL_FROM=noreply@grupomusicalcelula.com
```

---

## 🚀 Próximos Pasos Recomendados

1. ✅ **Verificar dominio en Resend** para usar email propio
2. ⏳ **Configurar alertas** en Vercel para errores
3. ⏳ **Agregar rate limiting** para prevenir spam
4. ⏳ **Implementar honeypot** anti-bots en formulario
5. ⏳ **Email de confirmación** al usuario

---

## 📝 Notas Adicionales

- Los cambios son **backward compatible** - bodas.html ya tenía la configuración correcta
- El logging NO expone información sensible (API keys se muestran parcialmente)
- Los errores se manejan de forma segura sin exponer detalles internos al usuario
- El sistema funciona tanto con Resend como con SendGrid (si se configura)

---

## 🔗 Enlaces Útiles

- [Resend Dashboard](https://resend.com/emails)
- [Resend API Keys](https://resend.com/api-keys)
- [Resend Domains](https://resend.com/domains)
- [Vercel Dashboard](https://vercel.com/dashboard)
- [Documentación Completa](./docs/VERIFICACION_PRODUCCION.md)
