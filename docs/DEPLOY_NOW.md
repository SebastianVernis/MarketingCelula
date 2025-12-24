# 🚀 Guía Rápida de Despliegue

## ⚡ Pasos Inmediatos (15 minutos)

### 1️⃣ Configurar Email (5 min)

```bash
# Opción A: Resend (Recomendado)
# 1. Ir a https://resend.com y crear cuenta
# 2. Obtener API Key del dashboard
# 3. En Vercel Dashboard del proyecto Marketing:
#    Settings → Environment Variables → Add:

RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxx
EMAIL_TO=contacto@grupomusicalcelula.com
EMAIL_FROM=noreply@grupomusicalcelula.com

# Aplicar a: Production, Preview, Development
```

### 2️⃣ Desplegar Proyecto Marketing (3 min)

```bash
cd /home/sebastianvernis/MarketingCelula
npm run build
vercel --prod
```

**Anota la URL:** `https://marketing-celula.vercel.app`

### 3️⃣ Desplegar Proyecto Principal (3 min)

```bash
cd /home/sebastianvernis/celula-chatbot-ia
vercel --prod
```

### 4️⃣ Verificar (4 min)

Abre en el navegador:
- ✅ https://grupomusicalcelula.com/bodas
- ✅ https://grupomusicalcelula.com/xv
- ✅ https://grupomusicalcelula.com/privada

Llena un formulario de prueba y verifica:
- ✅ Email llega a tu bandeja
- ✅ WhatsApp se abre
- ✅ No hay errores en consola

---

## 📋 Configurar GTM (30 minutos)

### 1. Ir a Google Tag Manager
https://tagmanager.google.com

### 2. Seleccionar Container GTM-5783XFN4

### 3. Crear Variables (10 min)

**Variables → New:**

1. **formName**
   - Type: Data Layer Variable
   - Data Layer Variable Name: `formName`

2. **eventType**
   - Type: Data Layer Variable
   - Data Layer Variable Name: `eventType`

3. **eventDate**
   - Type: Data Layer Variable
   - Data Layer Variable Name: `eventDate`

4. **formValue**
   - Type: Data Layer Variable
   - Data Layer Variable Name: `formValue`

### 4. Crear Triggers (5 min)

**Triggers → New:**

1. **Form Submission Trigger**
   - Type: Custom Event
   - Event name: `form_submission`

2. **Conversion Trigger**
   - Type: Custom Event
   - Event name: `conversion`

### 5. Crear Tags (15 min)

**Tags → New:**

1. **GA4 - Form Submission**
   - Type: Google Analytics: GA4 Event
   - Configuration Tag: [Tu GA4 Config]
   - Event Name: `form_submission`
   - Event Parameters:
     - `form_name`: `{{formName}}`
     - `event_type`: `{{eventType}}`
     - `event_date`: `{{eventDate}}`
     - `value`: `{{formValue}}`
   - Trigger: Form Submission Trigger

2. **Google Ads - Conversion**
   - Type: Google Ads Conversion Tracking
   - Conversion ID: `AW-943484255`
   - Conversion Label: [Tu label]
   - Conversion Value: `{{formValue}}`
   - Trigger: Form Submission Trigger

3. **Facebook Pixel - Lead** (si aplica)
   - Type: Custom HTML o Facebook Pixel
   - Event: Lead
   - Value: `{{formValue}}`
   - Trigger: Form Submission Trigger

### 6. Probar y Publicar

1. Click en **Preview**
2. Ingresar: `https://grupomusicalcelula.com/bodas`
3. Llenar y enviar formulario
4. Verificar que se disparen los tags
5. Si todo funciona → **Submit** → **Publish**

---

## ✅ Checklist Rápido

```
Configuración:
□ Variables de entorno agregadas en Vercel
□ Proyecto Marketing desplegado
□ Proyecto Principal desplegado
□ URLs verificadas (bodas, xv, privada)

GTM:
□ Variables creadas
□ Triggers creados
□ Tags creados
□ Probado en Preview Mode
□ Publicado

Testing:
□ Formulario enviado en cada página
□ Email recibido
□ WhatsApp abierto
□ Eventos GTM disparados
□ Sin errores en consola

Monitoreo:
□ Dashboard GA4 configurado
□ Conversiones Google Ads activas
□ Alertas configuradas
```

---

## 🆘 Si algo falla

### Email no llega:
```bash
# Ver logs en Vercel
Proyecto Marketing → Functions → send-form → View Logs
```

### Página no carga:
```bash
# Verificar rewrites
cd /home/sebastianvernis/celula-chatbot-ia
cat vercel.json | grep -A 10 "rewrites"
```

### GTM no dispara:
```javascript
// En consola del navegador
console.log(window.dataLayer);
```

---

## 📞 Recursos Rápidos

- **Resend:** https://resend.com
- **GTM:** https://tagmanager.google.com
- **Vercel:** https://vercel.com/dashboard
- **Docs completas:** Ver archivos en `/home/sebastianvernis/MarketingCelula/`

---

**¡Listo para desplegar!** 🚀
