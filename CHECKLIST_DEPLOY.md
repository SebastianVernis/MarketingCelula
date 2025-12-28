# ✅ Checklist de Deploy - Sistema de Formularios

## 📋 Antes de Hacer Deploy

### 1. Verificar Cambios Locales
- [ ] Revisar archivos modificados con `git status`
- [ ] Verificar sintaxis de JavaScript (ya verificado ✅)
- [ ] Revisar que no haya API keys hardcodeadas en el código

### 2. Variables de Entorno en Vercel
- [ ] `RESEND_API_KEY=re_6xgZehYV_B8w6GzLLU56LFScqxeaHZk6y` configurada
- [ ] `EMAIL_TO=kslacelula.admi2@gmail.com` configurada
- [ ] Variables configuradas para **Production**, **Preview** y **Development**

### 3. Configuración de Resend
- [ ] API Key válida y activa
- [ ] Dominio verificado (o usar `onboarding@resend.dev` temporalmente)
- [ ] Límites de envío no excedidos

---

## 🚀 Deploy

### Opción 1: Deploy Automático (Recomendado)
```bash
# 1. Agregar cambios
git add .

# 2. Commit con mensaje descriptivo
git commit -m "fix: corregir identificación de campañas y mejorar handler de Resend

- Corregir data-campaign-name en xv.html (bodas → xv)
- Corregir data-campaign-name en privada.html (bodas → privada)
- Agregar plantillas HTML dinámicas por campaña
- Mejorar logging para debugging en producción
- Agregar mejor manejo de errores
- Crear scripts de prueba automatizados"

# 3. Push a main (deploy automático en Vercel)
git push origin main
```

### Opción 2: Deploy Manual
```bash
# Deploy directo con Vercel CLI
npm run deploy
```

---

## 🧪 Después del Deploy

### 1. Verificar Deploy en Vercel
- [ ] Deploy completado sin errores
- [ ] Build exitoso
- [ ] Functions desplegadas correctamente

### 2. Pruebas Automatizadas
```bash
# Probar las 3 campañas en producción
npm run test:campaigns:prod
```

### 3. Pruebas Manuales

#### Campaña de Bodas
- [ ] Visitar: https://marketing.grupomusicalcelula.com/bodas
- [ ] Llenar formulario con datos de prueba
- [ ] Verificar que se abre WhatsApp correctamente
- [ ] Verificar email recibido con diseño dorado 💍
- [ ] Verificar asunto: `💍 Nueva Solicitud: ... [Campaña Especial Bodas]`

#### Campaña de XV Años
- [ ] Visitar: https://marketing.grupomusicalcelula.com/xv
- [ ] Llenar formulario con datos de prueba
- [ ] Verificar que se abre WhatsApp correctamente
- [ ] Verificar email recibido con diseño rosa 👑
- [ ] Verificar asunto: `👑 Nueva Solicitud: ... [Campaña Especial XV Años]`

#### Campaña de Fiesta Privada
- [ ] Visitar: https://marketing.grupomusicalcelula.com/privada
- [ ] Llenar formulario con datos de prueba
- [ ] Verificar que se abre WhatsApp correctamente
- [ ] Verificar email recibido con diseño púrpura 🎉
- [ ] Verificar asunto: `🎉 Nueva Solicitud: ... [Campaña Especial Fiesta Privada]`

### 4. Verificar Logs en Vercel
```bash
# Ver logs en tiempo real
vercel logs --follow
```

**Buscar estos mensajes:**
- [ ] `📨 Recibiendo formulario:` con campaignName correcto
- [ ] `🔑 Usando Resend API Key:` (parcialmente oculto)
- [ ] `📬 Respuesta de Resend:` con status 200
- [ ] `✅ Email enviado exitosamente:` con ID del email

### 5. Verificar en Resend Dashboard
- [ ] Ir a: https://resend.com/emails
- [ ] Verificar que aparecen los 3 emails de prueba
- [ ] Verificar estado: **Delivered** ✅
- [ ] Verificar que cada email tiene el asunto correcto

---

## 🐛 Si Algo Sale Mal

### Problema: Formulario no envía
1. [ ] Abrir DevTools (F12) → Console
2. [ ] Buscar errores en rojo
3. [ ] Verificar que el POST a `/api/send-form` se ejecuta
4. [ ] Revisar respuesta del servidor

### Problema: Email no llega
1. [ ] Revisar carpeta de SPAM
2. [ ] Verificar logs de Vercel
3. [ ] Verificar dashboard de Resend
4. [ ] Verificar variable `EMAIL_TO` en Vercel

### Problema: Error 500 en API
1. [ ] Revisar logs de Vercel en detalle
2. [ ] Verificar que `RESEND_API_KEY` esté configurada
3. [ ] Verificar que la API key sea válida
4. [ ] Revisar respuesta de Resend en logs

### Problema: Campaña incorrecta en email
1. [ ] Verificar `data-campaign-name` en el HTML
2. [ ] Verificar que el formulario envía el campo correcto
3. [ ] Revisar logs: `📨 Recibiendo formulario:` debe mostrar campaignName correcto

---

## 📊 Monitoreo Post-Deploy

### Primeras 24 horas
- [ ] Revisar Analytics de Vercel
- [ ] Verificar tasa de error en Functions
- [ ] Revisar dashboard de Resend para emails enviados
- [ ] Verificar que no hay errores 4xx o 5xx

### Primera semana
- [ ] Revisar métricas de conversión en GTM
- [ ] Verificar que los emails llegan correctamente
- [ ] Recopilar feedback de usuarios
- [ ] Ajustar si es necesario

---

## 🎯 Métricas de Éxito

### Técnicas
- ✅ 0 errores en deploy
- ✅ 100% de emails entregados
- ✅ Tiempo de respuesta < 2 segundos
- ✅ 0 errores 5xx en producción

### Funcionales
- ✅ Cada campaña identifica correctamente su origen
- ✅ Emails tienen diseño personalizado por campaña
- ✅ WhatsApp se abre con mensaje correcto
- ✅ GTM registra eventos correctamente

### Negocio
- ✅ Leads recibidos por email
- ✅ Conversaciones iniciadas en WhatsApp
- ✅ Tasa de conversión por campaña medible

---

## 📝 Notas Finales

- **Rollback:** Si algo sale mal, puedes hacer rollback en Vercel Dashboard
- **Logs:** Los logs se mantienen por 7 días en el plan gratuito
- **Rate Limits:** Resend tiene límites de envío según tu plan
- **Costos:** Vercel Functions tienen límites de invocaciones gratuitas

---

## 🔗 Enlaces Rápidos

- [Vercel Dashboard](https://vercel.com/dashboard)
- [Vercel Logs](https://vercel.com/dashboard)
- [Resend Dashboard](https://resend.com/emails)
- [Resend API Keys](https://resend.com/api-keys)
- [GTM Container](https://tagmanager.google.com/)

---

## ✅ Checklist Final

Antes de considerar el deploy completo:

- [ ] Deploy exitoso en Vercel
- [ ] 3 pruebas manuales completadas (bodas, xv, privada)
- [ ] 3 emails recibidos con diseños correctos
- [ ] Logs de Vercel sin errores
- [ ] Dashboard de Resend muestra emails entregados
- [ ] WhatsApp funciona correctamente desde las 3 páginas
- [ ] GTM registra eventos correctamente

**Si todos los items están marcados: ¡Deploy exitoso! 🎉**
