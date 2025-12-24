# 🚀 Guía Rápida de Despliegue

**Tu sitio de marketing está listo para desplegarse en:** `marketing.grupomusicalcelula.com`

---

## ⚡ Despliegue en 3 Pasos

### 1️⃣ Build y Deploy
```bash
npm run build
vercel --prod
```

### 2️⃣ Configurar DNS
En tu proveedor de DNS, agrega:
```
Tipo: CNAME
Nombre: marketing
Valor: cname.vercel-dns.com.
```

### 3️⃣ Agregar Dominio en Vercel
1. Ve a Vercel Dashboard → Tu proyecto → Settings → Domains
2. Agrega: `marketing.grupomusicalcelula.com`
3. Espera el ✅ verde (SSL automático)

---

## ✅ Verificación Rápida

```bash
# Espera 5-30 minutos, luego verifica:
curl -I https://marketing.grupomusicalcelula.com/bodas

# Debe retornar: HTTP/2 200
```

---

## 🎯 URLs Finales

```
https://marketing.grupomusicalcelula.com/bodas
https://marketing.grupomusicalcelula.com/xv
https://marketing.grupomusicalcelula.com/privada
```

---

## 📚 Documentación Completa

| Documento | Propósito |
|-----------|-----------|
| `DEPLOYMENT_SUMMARY.md` | Checklist completo de despliegue |
| `SUBDOMAIN_SETUP.md` | Guía detallada del subdominio y DNS |
| `GTM_MIGRATION_COMPLETE.md` | Detalles de la migración a GTM |
| `AGENTS.md` | Documentación técnica completa |

---

## ⚙️ Tracking Configurado

- ✅ **GTM:** `GTM-5783XFN4` (publicado)
- ✅ **Google Ads:** Conversión `943484255/jZjxCKPzodYbEN_a8cED`
- ✅ **Variables:** formName, eventType, eventDate, formValue
- ✅ **Evento:** `form_submission`

---

## 🧪 Prueba en Producción

1. **Envía un formulario** en cualquier página
2. **Verifica con Tag Assistant:**
   - GTM carga ✅
   - Vinculador de conversiones se dispara ✅
   - Conversión se registra al enviar formulario ✅

---

## 📞 Necesitas Ayuda?

- **DNS:** Ver `SUBDOMAIN_SETUP.md` → Sección "Configurar DNS"
- **GTM:** Ver `GTM_MIGRATION_COMPLETE.md`
- **Código:** Ver `AGENTS.md`
- **Problemas:** Ver `DEPLOYMENT_SUMMARY.md` → "Troubleshooting"

---

**🎉 ¡Listo para despegar!** Ejecuta `npm run build && vercel --prod`
