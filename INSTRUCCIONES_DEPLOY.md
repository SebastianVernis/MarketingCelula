# 🚀 Instrucciones de Deploy - Sistema de Formularios Corregido

## ✅ Cambios Realizados

### Problemas Corregidos
1. ✅ **xv.html** - Campaña identificada incorrectamente como "bodas" → Corregido a "xv"
2. ✅ **privada.html** - Campaña identificada incorrectamente como "bodas" → Corregido a "privada"
3. ✅ **send-form.js** - Plantillas HTML estáticas → Ahora dinámicas por campaña
4. ✅ **send-form.js** - Sin logging → Ahora con logging detallado para debugging
5. ✅ **send-form.js** - Manejo de errores básico → Ahora robusto con información específica

### Mejoras Implementadas
- 💍 **Bodas**: Email con diseño dorado y emoji 💍
- 👑 **XV Años**: Email con diseño rosa y emoji 👑
- 🎉 **Fiesta Privada**: Email con diseño púrpura y emoji 🎉
- 📊 Logging detallado en cada paso del proceso
- 🐛 Mejor información de errores para debugging
- 🧪 Scripts de prueba automatizados

---

## 📋 Variables de Entorno Configuradas

```bash
RESEND_API_KEY=re_6xgZehYV_B8w6GzLLU56LFScqxeaHZk6y
EMAIL_TO=kslacelula.admi2@gmail.com
```

**⚠️ IMPORTANTE:** Estas variables deben estar configuradas en Vercel para **Production**, **Preview** y **Development**.

---

## 🚀 Pasos para Deploy

### 1. Verificar Cambios Locales

```bash
# Ver archivos modificados
git status

# Debería mostrar:
# M  Marketing/privada.html
# M  Marketing/xv.html
# M  api/send-form.js
# M  package.json
# ?? CAMBIOS_REALIZADOS.md
# ?? CHECKLIST_DEPLOY.md
# ?? INSTRUCCIONES_DEPLOY.md
# ?? docs/VERIFICACION_PRODUCCION.md
# ?? scripts/verify-env.js
# ?? tests/test-campaigns.js
```

### 2. Commit de Cambios

```bash
git add .

git commit -m "fix: corregir identificación de campañas y mejorar handler de Resend

- Corregir data-campaign-name en xv.html (bodas → xv)
- Corregir data-campaign-name en privada.html (bodas → privada)
- Agregar plantillas HTML dinámicas por campaña con colores únicos
- Mejorar logging detallado para debugging en producción
- Agregar mejor manejo de errores con respuestas estructuradas
- Crear scripts de prueba automatizados (test:campaigns)
- Agregar documentación completa de verificación y deploy"
```

### 3. Push a Main (Deploy Automático)

```bash
git push origin main
```

Vercel detectará el push y hará el deploy automáticamente.

### 4. Verificar Variables en Vercel

**Mientras se hace el deploy, verifica en Vercel Dashboard:**

1. Ir a: https://vercel.com/dashboard
2. Seleccionar proyecto: **marketing-celula**
3. Ir a: **Settings → Environment Variables**
4. Verificar que existan:

```
RESEND_API_KEY = re_6xgZehYV_B8w6GzLLU56LFScqxeaHZk6y
EMAIL_TO = kslacelula.admi2@gmail.com
```

5. Verificar que estén marcadas para:
   - ✅ Production
   - ✅ Preview
   - ✅ Development

**Si no están configuradas:**
- Click en "Add New"
- Agregar cada variable
- Seleccionar los 3 ambientes
- Save

### 5. Esperar Deploy

Monitorear el deploy en Vercel Dashboard:
- Ir a: **Deployments**
- Ver el último deployment
- Esperar a que muestre: **Ready** ✅

---

## 🧪 Pruebas Post-Deploy

### Opción 1: Prueba Automatizada (Recomendado)

```bash
# Probar las 3 campañas automáticamente
npm run test:campaigns:prod
```

Esto probará:
- ✅ Campaña de Bodas
- ✅ Campaña de XV Años
- ✅ Campaña de Fiesta Privada

Y mostrará un resumen de resultados.

### Opción 2: Prueba Manual

#### Campaña de Bodas
1. Visitar: https://marketing.grupomusicalcelula.com/bodas
2. Llenar formulario:
   - Nombre: Tu nombre
   - Teléfono: 5512345678
   - Evento: Boda
   - Fecha: Fecha futura
   - Comentarios: Prueba de bodas
3. Click en "Enviar Solicitud"
4. Verificar:
   - ✅ Se abre WhatsApp con mensaje correcto
   - ✅ Recibes email en kslacelula.admi2@gmail.com
   - ✅ Email tiene diseño dorado 💍
   - ✅ Asunto: `💍 Nueva Solicitud: Boda - [Nombre] [Campaña Especial Bodas]`

#### Campaña de XV Años
1. Visitar: https://marketing.grupomusicalcelula.com/xv
2. Llenar formulario:
   - Nombre: Tu nombre
   - Teléfono: 5587654321
   - Evento: XV años
   - Fecha: Fecha futura
   - Comentarios: Prueba de XV años
3. Click en "Enviar Solicitud"
4. Verificar:
   - ✅ Se abre WhatsApp con mensaje correcto
   - ✅ Recibes email en kslacelula.admi2@gmail.com
   - ✅ Email tiene diseño rosa 👑
   - ✅ Asunto: `👑 Nueva Solicitud: XV años - [Nombre] [Campaña Especial XV Años]`

#### Campaña de Fiesta Privada
1. Visitar: https://marketing.grupomusicalcelula.com/privada
2. Llenar formulario:
   - Nombre: Tu nombre
   - Teléfono: 5598765432
   - Evento: Cumpleaños
   - Fecha: Fecha futura
   - Comentarios: Prueba de fiesta privada
3. Click en "Enviar Solicitud"
4. Verificar:
   - ✅ Se abre WhatsApp con mensaje correcto
   - ✅ Recibes email en kslacelula.admi2@gmail.com
   - ✅ Email tiene diseño púrpura 🎉
   - ✅ Asunto: `🎉 Nueva Solicitud: Cumpleaños - [Nombre] [Campaña Especial Fiesta Privada]`

---

## 📊 Verificar Logs en Vercel

### Ver Logs en Tiempo Real

```bash
vercel logs --follow
```

O en Vercel Dashboard:
1. Ir a: **Deployments**
2. Click en el último deployment
3. Click en: **Functions**
4. Click en: **/api/send-form**
5. Ver logs en tiempo real

### Logs Esperados (Exitosos)

```
📨 Recibiendo formulario: { campaignName: 'bodas', campaignTitle: 'Campaña Especial Bodas', evento: 'Boda', timestamp: '...' }
📧 Intentando enviar email a: kslacelula.admi2@gmail.com
🔑 Usando Resend API Key: re_6xgZehY...
📬 Respuesta de Resend: { status: 200, data: { id: '...' } }
✅ Email enviado exitosamente: [ID del email]
```

### Logs de Error (Si algo falla)

```
❌ Validación fallida: campos faltantes
❌ Error con Resend: [descripción del error]
❌ Error al enviar email: [descripción del error]
❌ Error en send-form: [descripción del error]
```

---

## 📧 Verificar en Resend Dashboard

1. Ir a: https://resend.com/emails
2. Deberías ver los 3 emails de prueba
3. Verificar estado de cada uno:
   - ✅ **Delivered** - Email entregado exitosamente
   - ⏳ **Queued** - En cola de envío
   - ❌ **Failed** - Falló (click para ver detalles)

---

## 🐛 Troubleshooting

### Problema: Email no llega

**Verificar:**
1. ✅ Carpeta de SPAM en kslacelula.admi2@gmail.com
2. ✅ Logs de Vercel muestran "✅ Email enviado exitosamente"
3. ✅ Dashboard de Resend muestra estado "Delivered"
4. ✅ Variable EMAIL_TO correcta en Vercel

### Problema: Error 500 en API

**Verificar:**
1. ✅ Variable RESEND_API_KEY configurada en Vercel
2. ✅ API Key válida (no expirada)
3. ✅ Logs de Vercel para ver error específico
4. ✅ Dashboard de Resend para ver si hay problemas

### Problema: Campaña incorrecta en email

**Verificar:**
1. ✅ Logs muestran campaignName correcto
2. ✅ HTML tiene data-campaign-name correcto
3. ✅ Cache del navegador (Ctrl+Shift+R para refrescar)

---

## ✅ Checklist Final

Antes de considerar el deploy completo:

- [ ] Deploy exitoso en Vercel (estado: Ready)
- [ ] Variables de entorno verificadas en Vercel
- [ ] Prueba automatizada ejecutada: `npm run test:campaigns:prod`
- [ ] 3 pruebas manuales completadas (bodas, xv, privada)
- [ ] 3 emails recibidos en kslacelula.admi2@gmail.com
- [ ] Cada email tiene el diseño correcto (dorado, rosa, púrpura)
- [ ] Asuntos de emails tienen emoji y campaña correcta
- [ ] WhatsApp funciona desde las 3 páginas
- [ ] Logs de Vercel sin errores
- [ ] Dashboard de Resend muestra emails "Delivered"

**Si todos los items están marcados: ¡Deploy exitoso! 🎉**

---

## 📞 Soporte

Si encuentras problemas:

1. **Revisar logs de Vercel** para ver errores específicos
2. **Revisar dashboard de Resend** para ver estado de emails
3. **Verificar variables de entorno** en Vercel
4. **Consultar documentación completa** en `docs/VERIFICACION_PRODUCCION.md`

---

## 📝 Archivos de Referencia

- `CAMBIOS_REALIZADOS.md` - Documentación detallada de todos los cambios
- `CHECKLIST_DEPLOY.md` - Checklist completo paso a paso
- `docs/VERIFICACION_PRODUCCION.md` - Guía completa de verificación
- `tests/test-campaigns.js` - Script de prueba automatizado

---

**¡Listo para deploy! 🚀**
