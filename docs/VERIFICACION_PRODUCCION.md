# Verificación de Configuración en Producción (Vercel)

## ✅ Cambios Realizados

### 1. Corrección de Campañas en HTML
- ✅ **bodas.html**: `data-campaign-name="bodas"` y `data-campaign-title="Campaña Especial Bodas"`
- ✅ **xv.html**: `data-campaign-name="xv"` y `data-campaign-title="Campaña Especial XV Años"`
- ✅ **privada.html**: `data-campaign-name="privada"` y `data-campaign-title="Campaña Especial Fiesta Privada"`

### 2. Mejoras en el Handler de Resend (`/api/send-form.js`)
- ✅ Plantillas HTML dinámicas según campaña (colores, emojis, gradientes)
- ✅ Logging detallado para debugging en producción
- ✅ Mejor manejo de errores con información específica
- ✅ Respuestas estructuradas con `{ success, id, error }`

### 3. Configuración de Campañas
Cada campaña ahora tiene su propia identidad visual en los emails:

| Campaña | Emoji | Color | Gradiente |
|---------|-------|-------|-----------|
| Bodas | 💍 | #FFD700 (Dorado) | Dorado → Naranja |
| XV Años | 👑 | #FF69B4 (Rosa) | Rosa → Rosa Oscuro |
| Fiesta Privada | 🎉 | #9370DB (Púrpura) | Púrpura → Violeta |

---

## 🔍 Pasos para Verificar en Vercel

### 1. Verificar Variables de Entorno

Accede a tu proyecto en Vercel y verifica que estas variables estén configuradas:

```bash
# En Vercel Dashboard → Settings → Environment Variables
RESEND_API_KEY=re_6xgZehYV_B8w6GzLLU56LFScqxeaHZk6y
EMAIL_TO=kslacelula.admi2@gmail.com
```

**⚠️ IMPORTANTE:**
- La API Key debe empezar con `re_`
- Debe estar configurada para **Production**, **Preview** y **Development**
- El email `EMAIL_TO` debe ser el destinatario de los formularios

### 2. Verificar el Dominio "From" en Resend

El handler actualmente usa `onboarding@resend.dev` que es solo para testing.

**Para producción, debes:**

1. Ir a [Resend Dashboard](https://resend.com/domains)
2. Agregar y verificar tu dominio (ej: `grupomusicalcelula.com`)
3. Actualizar el código en `/api/send-form.js`:

```javascript
from: 'noreply@grupomusicalcelula.com', // Cambiar de onboarding@resend.dev
```

**Alternativa temporal:** Puedes seguir usando `onboarding@resend.dev` pero tiene límites de envío.

### 3. Revisar Logs en Vercel

Después de hacer un deploy, revisa los logs en tiempo real:

```bash
# Opción 1: Desde la terminal
vercel logs --follow

# Opción 2: En Vercel Dashboard
# Ir a: Deployments → [Tu deployment] → Functions → /api/send-form
```

**Busca estos mensajes:**
- ✅ `📨 Recibiendo formulario:` - Confirma que el handler recibe datos
- ✅ `🔑 Usando Resend API Key:` - Confirma que la API key está configurada
- ✅ `📬 Respuesta de Resend:` - Muestra la respuesta de la API
- ✅ `✅ Email enviado exitosamente:` - Confirma envío exitoso
- ❌ `❌ Error al enviar email:` - Indica problemas

### 4. Probar en Producción

1. **Hacer deploy de los cambios:**
   ```bash
   git add .
   git commit -m "fix: corregir campañas y mejorar handler de Resend"
   git push origin main
   ```

2. **Esperar a que Vercel haga el deploy automático**

3. **Probar cada campaña:**
   - https://marketing.grupomusicalcelula.com/bodas
   - https://marketing.grupomusicalcelula.com/xv
   - https://marketing.grupomusicalcelula.com/privada

4. **Llenar y enviar el formulario en cada página**

5. **Verificar:**
   - ✅ El formulario se envía sin errores
   - ✅ Recibes el email en `EMAIL_TO`
   - ✅ El email tiene el diseño correcto según la campaña
   - ✅ El asunto incluye el emoji y nombre de campaña correcto
   - ✅ Se abre WhatsApp con el mensaje correcto

---

## 🐛 Troubleshooting

### Problema: "No email service configured"

**Causa:** La variable `RESEND_API_KEY` no está configurada en Vercel.

**Solución:**
1. Ir a Vercel Dashboard → Settings → Environment Variables
2. Agregar `RESEND_API_KEY` con tu API key de Resend
3. Hacer redeploy del proyecto

### Problema: "Resend API error (401): Unauthorized"

**Causa:** La API key es inválida o expiró.

**Solución:**
1. Ir a [Resend Dashboard](https://resend.com/api-keys)
2. Generar una nueva API key
3. Actualizar en Vercel Environment Variables
4. Hacer redeploy

### Problema: "Resend API error (403): Forbidden"

**Causa:** El dominio "from" no está verificado en Resend.

**Solución:**
- **Opción 1 (temporal):** Usar `onboarding@resend.dev`
- **Opción 2 (recomendado):** Verificar tu dominio en Resend y usar tu propio email

### Problema: Los emails no llegan

**Verificar:**
1. ✅ Revisa la carpeta de SPAM
2. ✅ Verifica que `EMAIL_TO` esté correctamente configurado
3. ✅ Revisa los logs de Vercel para ver si hay errores
4. ✅ Verifica en [Resend Dashboard → Emails](https://resend.com/emails) el estado del envío

---

## 📊 Monitoreo

### Ver emails enviados en Resend

1. Ir a [Resend Dashboard → Emails](https://resend.com/emails)
2. Verás todos los emails enviados con su estado:
   - ✅ **Delivered** - Email entregado exitosamente
   - ⏳ **Queued** - En cola de envío
   - ❌ **Failed** - Falló el envío (ver detalles)

### Métricas en Vercel

1. Ir a Vercel Dashboard → Analytics
2. Revisar:
   - Invocaciones de la función `/api/send-form`
   - Errores 4xx y 5xx
   - Tiempo de respuesta

---

## 🔐 Seguridad

**⚠️ NUNCA commitear las API keys al repositorio**

Las API keys deben estar SOLO en:
- ✅ Vercel Environment Variables (producción)
- ✅ `.env.local` (desarrollo local - no commiteado)
- ❌ NUNCA en el código fuente
- ❌ NUNCA en `.env` (si está en .gitignore está bien)

---

## 📝 Próximos Pasos Recomendados

1. **Verificar dominio en Resend** para usar tu propio email "from"
2. **Configurar alertas** en Vercel para errores en la función
3. **Agregar rate limiting** para prevenir spam
4. **Implementar honeypot** en el formulario para prevenir bots
5. **Agregar confirmación por email** al usuario que envía el formulario

---

## 📞 Soporte

Si después de seguir estos pasos sigues teniendo problemas:

1. Revisa los logs de Vercel en detalle
2. Verifica el dashboard de Resend
3. Comparte los logs específicos del error para ayuda adicional
