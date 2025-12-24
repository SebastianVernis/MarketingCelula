# 📧 Configuración de Email para Formularios

## 🎯 Resumen

Se ha implementado un sistema de envío de emails automático para todos los formularios del proyecto Marketing. Cuando un usuario llena el formulario, se envía:

1. ✅ Email a tu bandeja de entrada con los datos del lead
2. ✅ Evento a Google Tag Manager para tracking
3. ✅ Redirección a WhatsApp para contacto inmediato

---

## 🔧 Configuración Requerida

### Opción 1: Resend (Recomendado para Vercel) ⭐

**Ventajas:**
- ✅ Gratis hasta 3,000 emails/mes
- ✅ Fácil integración con Vercel
- ✅ Excelente deliverability
- ✅ API simple

**Pasos:**

1. **Crear cuenta en Resend:**
   - Ve a https://resend.com
   - Regístrate con tu email
   - Verifica tu cuenta

2. **Obtener API Key:**
   - Dashboard → API Keys
   - Click en "Create API Key"
   - Copia la key (empieza con `re_`)

3. **Configurar dominio (opcional pero recomendado):**
   - Dashboard → Domains
   - Add Domain → `grupomusicalcelula.com`
   - Agregar registros DNS:
     ```
     Tipo: TXT
     Nombre: _resend
     Valor: [valor proporcionado por Resend]
     ```

4. **Agregar variables de entorno en Vercel:**
   ```bash
   # En el proyecto Marketing en Vercel Dashboard
   Settings → Environment Variables → Add
   
   Name: RESEND_API_KEY
   Value: re_xxxxxxxxxxxxxxxxxx
   Environment: Production, Preview, Development
   ```

   ```bash
   Name: EMAIL_TO
   Value: contacto@grupomusicalcelula.com
   Environment: Production, Preview, Development
   ```

   ```bash
   Name: EMAIL_FROM
   Value: noreply@grupomusicalcelula.com
   Environment: Production, Preview, Development
   ```

5. **Redesplegar:**
   ```bash
   cd /home/sebastianvernis/MarketingCelula
   vercel --prod
   ```

---

### Opción 2: SendGrid

**Ventajas:**
- ✅ Gratis hasta 100 emails/día
- ✅ Muy confiable
- ✅ Buena documentación

**Pasos:**

1. **Crear cuenta en SendGrid:**
   - Ve a https://sendgrid.com
   - Regístrate (gratis)

2. **Obtener API Key:**
   - Settings → API Keys
   - Create API Key
   - Full Access
   - Copia la key (empieza con `SG.`)

3. **Verificar dominio:**
   - Settings → Sender Authentication
   - Authenticate Your Domain
   - Seguir instrucciones DNS

4. **Agregar variables de entorno en Vercel:**
   ```bash
   Name: SENDGRID_API_KEY
   Value: SG.xxxxxxxxxxxxxxxxxx
   Environment: Production, Preview, Development
   ```

   ```bash
   Name: EMAIL_TO
   Value: contacto@grupomusicalcelula.com
   Environment: Production, Preview, Development
   ```

   ```bash
   Name: EMAIL_FROM
   Value: noreply@grupomusicalcelula.com
   Environment: Production, Preview, Development
   ```

5. **Redesplegar:**
   ```bash
   vercel --prod
   ```

---

## 📋 Estructura del Email

### Asunto:
```
Nueva Solicitud: [Tipo de Evento] - [Nombre del Cliente]
```

Ejemplo: `Nueva Solicitud: Boda - Juan Pérez`

### Contenido HTML:

El email incluye:
- 🎵 Header con branding
- 📋 Badge de campaña (bodas, xv, privada)
- 👤 Nombre del cliente
- 📞 Teléfono
- 🎉 Tipo de evento
- 📅 Fecha del evento (formateada)
- 💬 Comentarios adicionales
- 📱 Botón directo a WhatsApp

### Vista Previa:

```
┌─────────────────────────────────────────┐
│  🎵 Nueva Solicitud de Evento           │
│  Campaña Especial Bodas                 │
├─────────────────────────────────────────┤
│  [Campaña: bodas]                       │
│                                         │
│  👤 Nombre:                             │
│  Juan Pérez García                      │
│                                         │
│  📞 Teléfono:                           │
│  5535412631                             │
│                                         │
│  🎉 Tipo de Evento:                     │
│  Boda                                   │
│                                         │
│  📅 Fecha del Evento:                   │
│  sábado, 15 de junio de 2025           │
│                                         │
│  💬 Comentarios:                        │
│  Buscamos música para ceremonia y       │
│  recepción. Aprox 150 invitados.        │
│                                         │
│  ─────────────────────────────────────  │
│                                         │
│  📱 Contactar por WhatsApp:             │
│  [Abrir WhatsApp] ← Botón verde         │
│                                         │
├─────────────────────────────────────────┤
│  Grupo Musical Versátil La Célula       │
│  Email generado desde Campaña Bodas     │
└─────────────────────────────────────────┘
```

---

## 🧪 Testing

### Test Local (sin email real):

```bash
cd /home/sebastianvernis/MarketingCelula
vercel dev
```

Luego en el navegador:
1. Ir a `http://localhost:3000/bodas`
2. Llenar formulario
3. Enviar
4. Verificar en la consola de Vercel Dev que se logea el email

### Test en Preview:

```bash
vercel
```

1. Ir a la URL de preview
2. Llenar formulario
3. Enviar
4. Verificar email en tu bandeja

### Test en Producción:

```bash
vercel --prod
```

1. Ir a `https://grupomusicalcelula.com/bodas`
2. Llenar formulario con datos reales
3. Enviar
4. Verificar email

---

## 📊 Monitoreo

### Ver logs de la API:

```bash
# En Vercel Dashboard
Proyecto Marketing → Deployments → [último deployment] → Functions → send-form
```

### Verificar emails enviados:

**Resend:**
- Dashboard → Emails
- Ver todos los emails enviados
- Status: Delivered, Bounced, etc.

**SendGrid:**
- Activity → Email Activity
- Ver todos los emails
- Filtrar por fecha, status, etc.

---

## 🔍 Troubleshooting

### Problema: No llegan emails

**Solución 1:** Verificar variables de entorno
```bash
# En Vercel Dashboard
Settings → Environment Variables
# Verificar que existan:
# - RESEND_API_KEY o SENDGRID_API_KEY
# - EMAIL_TO
# - EMAIL_FROM
```

**Solución 2:** Verificar logs
```bash
# En Vercel Dashboard
Functions → send-form → View Logs
# Buscar errores
```

**Solución 3:** Verificar dominio
- Asegúrate de que el dominio esté verificado en Resend/SendGrid
- Verifica registros DNS

### Problema: Emails van a spam

**Solución:**
1. Verificar dominio con SPF, DKIM, DMARC
2. Usar un dominio verificado (no @gmail.com)
3. Configurar Sender Authentication en SendGrid
4. Usar Resend con dominio propio

### Problema: Error 500 en la API

**Solución:**
1. Ver logs en Vercel
2. Verificar que la API key sea válida
3. Verificar formato del email (debe ser válido)
4. Verificar que el servicio (Resend/SendGrid) esté activo

---

## 📈 Métricas

### Emails a Monitorear:

1. **Total enviados:** Cuántos formularios se llenaron
2. **Delivery rate:** % de emails que llegaron
3. **Bounce rate:** % de emails que rebotaron
4. **Tiempo de entrega:** Cuánto tarda en llegar

### Dashboard Recomendado:

**Resend:**
- Dashboard → Analytics
- Ver gráficas de envíos, entregas, bounces

**SendGrid:**
- Stats → Overview
- Ver métricas detalladas

---

## 🔐 Seguridad

### Variables de Entorno:

✅ **NUNCA** commitear API keys al repositorio
✅ **SIEMPRE** usar variables de entorno en Vercel
✅ **ROTAR** API keys periódicamente (cada 6 meses)

### Rate Limiting:

La API tiene protección básica, pero considera agregar:
- Captcha (hCaptcha, reCAPTCHA)
- Rate limiting por IP
- Honeypot fields

---

## 💰 Costos

### Resend (Recomendado):
- **Gratis:** 3,000 emails/mes
- **Pro:** $20/mes → 50,000 emails/mes
- **Escala:** Según uso

### SendGrid:
- **Gratis:** 100 emails/día (3,000/mes)
- **Essentials:** $19.95/mes → 50,000 emails/mes
- **Pro:** $89.95/mes → 100,000 emails/mes

**Recomendación:** Empezar con plan gratuito de Resend

---

## 📝 Checklist de Configuración

- [ ] Crear cuenta en Resend o SendGrid
- [ ] Obtener API Key
- [ ] Verificar dominio (opcional pero recomendado)
- [ ] Agregar variables de entorno en Vercel:
  - [ ] `RESEND_API_KEY` o `SENDGRID_API_KEY`
  - [ ] `EMAIL_TO`
  - [ ] `EMAIL_FROM`
- [ ] Redesplegar proyecto: `vercel --prod`
- [ ] Probar formulario en producción
- [ ] Verificar que llegue el email
- [ ] Configurar alertas de monitoreo

---

## 🎯 Próximos Pasos

1. **Configurar servicio de email** (Resend recomendado)
2. **Agregar variables de entorno** en Vercel
3. **Redesplegar** el proyecto
4. **Probar** con datos reales
5. **Monitorear** deliverability
6. **Optimizar** según métricas

---

## 📞 Soporte

Si tienes problemas:

1. **Revisar logs** en Vercel Dashboard
2. **Consultar documentación:**
   - Resend: https://resend.com/docs
   - SendGrid: https://docs.sendgrid.com
3. **Verificar variables** de entorno
4. **Probar en local** con `vercel dev`

---

**Fecha de creación:** $(date)
**Versión:** 1.0
**Proyecto:** Marketing Célula - Email Integration
