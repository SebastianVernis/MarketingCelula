# 🧪 Guía de Testing del API de Formularios

Esta guía te ayudará a probar el endpoint `/api/send-form` con **Resend** localmente.

---

## 📋 Pre-requisitos

### 1. Obtener API Key de Resend

1. Ve a [resend.com](https://resend.com)
2. Crea una cuenta (es gratis)
3. Ve a **API Keys** en el dashboard
4. Haz clic en **"Create API Key"**
5. Dale un nombre: `Marketing Celula Dev`
6. Copia la clave (empieza con `re_`)

---

## ⚙️ Configuración

### 1. Editar `.env.local`

Abre el archivo `.env.local` y agrega tu API key:

```bash
# Email Service Configuration
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Email Configuration
EMAIL_TO=contacto@grupomusicalcelula.com
EMAIL_FROM=noreply@grupomusicalcelula.com
```

⚠️ **Importante:** 
- El email `EMAIL_FROM` debe estar verificado en Resend
- Para pruebas, Resend permite enviar a cualquier email sin verificar dominio
- Para producción, necesitas verificar tu dominio

---

## 🚀 Prueba Rápida (Recomendado)

### Opción 1: Script de Prueba Automatizado

```bash
# 1. Inicia el servidor de desarrollo
npm run dev

# 2. En otra terminal, ejecuta el script de prueba
node test-api.js
```

El script:
- ✅ Verifica que las variables de entorno estén configuradas
- ✅ Envía un formulario de prueba
- ✅ Muestra la respuesta del servidor
- ✅ Indica si el email se envió correctamente

**Salida esperada:**
```
🔍 Verificando configuración de variables de entorno:

✅ RESEND_API_KEY: re_xxxxxxx...
✅ EMAIL_TO: contacto@grupomusicalcelula.com
✅ EMAIL_FROM: noreply@grupomusicalcelula.com

============================================================

🧪 Probando API endpoint de envío de formularios

Base URL: http://localhost:3000

📤 Enviando datos de prueba:
{
  "nombre": "Juan Pérez (TEST)",
  "telefono": "5535412631",
  "evento": "Boda",
  "fecha": "2025-06-15",
  "comentarios": "Esta es una prueba del sistema...",
  "campaignTitle": "Campaña Especial Bodas",
  "campaignName": "bodas"
}

⏳ Esperando respuesta...

📊 Status Code: 200 OK

✅ ÉXITO - Formulario enviado correctamente
```

---

## 🧪 Prueba Manual (Alternativa)

### Opción 2: Con cURL

```bash
# 1. Inicia el servidor
npm run dev

# 2. En otra terminal, envía una petición
curl -X POST http://localhost:3000/api/send-form \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Test User",
    "telefono": "5535412631",
    "evento": "Boda",
    "fecha": "2025-06-15",
    "comentarios": "Prueba de email",
    "campaignTitle": "Campaña Bodas",
    "campaignName": "bodas"
  }'
```

### Opción 3: Con el Navegador

1. Inicia el servidor: `npm run dev`
2. Abre: http://localhost:3000/bodas
3. Llena el formulario
4. Click en "Enviar Solicitud"
5. Verifica:
   - ✅ Se abre WhatsApp
   - ✅ No hay errores en consola
   - ✅ Recibes el email

---

## 📧 Verificar el Email

### En Resend Dashboard:

1. Ve a [resend.com/emails](https://resend.com/emails)
2. Deberías ver tu email enviado
3. Click para ver detalles:
   - **Status:** `delivered`
   - **To:** contacto@grupomusicalcelula.com
   - **From:** noreply@grupomusicalcelula.com
   - **Subject:** Nueva Solicitud: Boda - [Nombre]

### En tu Bandeja de Entrada:

Revisa el email en `contacto@grupomusicalcelula.com`:

```
Asunto: Nueva Solicitud: Boda - Juan Pérez (TEST)

🎵 Nueva Solicitud de Evento
Campaña Especial Bodas

Campaña: bodas

👤 Nombre: Juan Pérez (TEST)
📞 Teléfono: 5535412631
🎉 Tipo de Evento: Boda
📅 Fecha del Evento: jueves, 15 de junio de 2025
💬 Comentarios: Esta es una prueba...

[Botón: Abrir WhatsApp]
```

---

## 🐛 Troubleshooting

### Error: "RESEND_API_KEY not configured"

**Causa:** La variable de entorno no está configurada

**Solución:**
```bash
# 1. Verifica que .env.local existe
cat .env.local

# 2. Agrega tu API key
echo 'RESEND_API_KEY=re_xxxxxxxxxxxx' >> .env.local

# 3. Reinicia el servidor
# Ctrl+C para detener
npm run dev
```

---

### Error: "Resend API error: 403 Forbidden"

**Causa:** API key inválida o dominio no verificado

**Solución:**
1. Verifica que la API key sea correcta en `.env.local`
2. En Resend, verifica tu dominio:
   - Ve a **Domains** → **Add Domain**
   - Agrega: `grupomusicalcelula.com`
   - Configura los registros DNS mostrados
3. O usa un email de prueba de Resend: `onboarding@resend.dev`

```bash
# Prueba con email de Resend (funciona sin verificar dominio)
EMAIL_FROM=onboarding@resend.dev npm run dev
```

---

### Error: "fetch failed" o "ECONNREFUSED"

**Causa:** El servidor no está corriendo

**Solución:**
```bash
# Inicia el servidor en una terminal
npm run dev

# Ejecuta el test en OTRA terminal
node test-api.js
```

---

### Email no llega

**Checklist:**
1. ✅ Verifica status en Resend dashboard
2. ✅ Revisa carpeta de SPAM
3. ✅ Verifica que `EMAIL_TO` sea correcto
4. ✅ Espera unos minutos (puede tardar)

**Ver logs en Resend:**
- Dashboard → Emails → Click en el email
- Verás delivery status y errores si los hay

---

## ✅ Respuestas Esperadas

### ✅ Éxito (200 OK)

```json
{
  "success": true,
  "message": "Formulario enviado correctamente",
  "data": {
    "nombre": "Juan Pérez (TEST)",
    "evento": "Boda",
    "fecha": "jueves, 15 de junio de 2025"
  },
  "gtmEvent": {
    "event": "form_submission",
    "formName": "bodas",
    "eventType": "Boda",
    "eventDate": "2025-06-15"
  }
}
```

### ❌ Error de Validación (400 Bad Request)

```json
{
  "error": "Faltan campos requeridos",
  "required": ["nombre", "telefono", "evento", "fecha"]
}
```

### ❌ Error del Servidor (500 Internal Server Error)

```json
{
  "error": "Error al procesar el formulario",
  "message": "Resend API error: ..."
}
```

---

## 📝 Verificar Variables en Producción (Vercel)

### Configurar en Vercel Dashboard:

1. Ve a tu proyecto en Vercel
2. **Settings** → **Environment Variables**
3. Agrega las variables:

```
RESEND_API_KEY = re_xxxxxxxxxxxxxxxxxxxxxxxxxxxx
EMAIL_TO = contacto@grupomusicalcelula.com
EMAIL_FROM = noreply@grupomusicalcelula.com
```

4. Selecciona los environments:
   - ✅ Production
   - ✅ Preview
   - ✅ Development

5. **Save**

6. **Re-deploy** para que tome las nuevas variables

---

## 🎯 Checklist de Testing

Antes de dar por probado el API:

- [ ] Variables de entorno configuradas en `.env.local`
- [ ] Servidor corriendo (`npm run dev`)
- [ ] Script de prueba ejecutado: `node test-api.js`
- [ ] Status 200 OK recibido
- [ ] Email visible en Resend dashboard
- [ ] Email recibido en bandeja de entrada
- [ ] Contenido del email correcto (nombre, teléfono, evento, fecha)
- [ ] Botón de WhatsApp funciona en el email
- [ ] Sin errores en consola del servidor

---

## 🚀 Testing en Producción

Una vez desplegado:

```bash
# Probar endpoint de producción
node test-api.js https://marketing.grupomusicalcelula.com
```

O con cURL:

```bash
curl -X POST https://marketing.grupomusicalcelula.com/api/send-form \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Test Producción",
    "telefono": "5535412631",
    "evento": "Boda",
    "fecha": "2025-06-15",
    "comentarios": "Prueba desde producción",
    "campaignTitle": "Campaña Bodas",
    "campaignName": "bodas"
  }'
```

---

## 📞 Recursos

- **Resend Dashboard:** https://resend.com/dashboard
- **Resend Docs:** https://resend.com/docs
- **Verificar Dominio:** https://resend.com/docs/dashboard/domains/introduction
- **API Reference:** https://resend.com/docs/api-reference/emails/send-email

---

**¿Listo para probar?** 🚀

1. Obtén tu API key de Resend
2. Agrégala a `.env.local`
3. Ejecuta: `npm run dev`
4. En otra terminal: `node test-api.js`
