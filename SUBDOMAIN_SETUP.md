# 🌐 Configuración del Subdominio de Marketing

**Subdominio:** `marketing.grupomusicalcelula.com`  
**Estructura de URLs:** `https://marketing.grupomusicalcelula.com/{tipodeevento}`

---

## 📋 URLs Finales

```
Página principal:    https://marketing.grupomusicalcelula.com/
Bodas:              https://marketing.grupomusicalcelula.com/bodas
XV Años:            https://marketing.grupomusicalcelula.com/xv
Eventos Privados:   https://marketing.grupomusicalcelula.com/privada
```

---

## 🚀 Paso 1: Desplegar el Proyecto en Vercel

### Opción A: Desde CLI

```bash
# 1. Build del proyecto
npm run build

# 2. Desplegar (primera vez)
vercel

# Responde las preguntas:
# - Set up and deploy? → Y
# - Which scope? → [tu cuenta]
# - Link to existing project? → N
# - Project name? → marketing-celula
# - Directory? → ./ (Enter)
# - Override settings? → N

# 3. Desplegar a producción
vercel --prod
```

### Opción B: Desde Dashboard de Vercel

1. Ve a [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click en **"Add New Project"**
3. Importa el repositorio (si está en Git) o sube los archivos
4. Configura:
   - **Project Name:** `marketing-celula`
   - **Framework Preset:** Other
   - **Build Command:** `npm run build`
   - **Output Directory:** `Marketing`
   - **Install Command:** `npm install`
5. Click en **"Deploy"**

---

## 🌐 Paso 2: Configurar el Subdominio en Vercel

### En el Dashboard de Vercel:

1. Ve a tu proyecto **marketing-celula**
2. Click en **"Settings"** (arriba)
3. Click en **"Domains"** (menú lateral)
4. Click en **"Add Domain"**
5. Escribe: `marketing.grupomusicalcelula.com`
6. Click en **"Add"**

Vercel te mostrará las instrucciones de DNS.

---

## 🔧 Paso 3: Configurar DNS

Necesitas agregar un registro CNAME en tu proveedor de DNS (donde compraste el dominio).

### Configuración DNS Requerida:

```
Tipo:     CNAME
Nombre:   marketing
Valor:    cname.vercel-dns.com.
TTL:      3600 (o automático)
```

### Ejemplos por proveedor:

#### GoDaddy
1. Ve a **DNS Management**
2. Click en **"Add"**
3. Tipo: **CNAME**
4. Host: **marketing**
5. Points to: **cname.vercel-dns.com**
6. TTL: **1 Hour**
7. **Save**

#### Namecheap
1. Ve a **Advanced DNS**
2. Click en **"Add New Record"**
3. Type: **CNAME Record**
4. Host: **marketing**
5. Value: **cname.vercel-dns.com.**
6. TTL: **Automatic**
7. **Save**

#### Cloudflare
1. Ve a **DNS**
2. Click en **"Add record"**
3. Type: **CNAME**
4. Name: **marketing**
5. Target: **cname.vercel-dns.com**
6. Proxy status: **DNS only** (nube gris, no naranja)
7. **Save**

⚠️ **Importante en Cloudflare:** Desactiva el proxy (nube gris) para que Vercel pueda generar el certificado SSL.

---

## ⏱️ Paso 4: Esperar Propagación

- **Tiempo típico:** 5-30 minutos
- **Máximo:** 24-48 horas

### Verificar propagación:

```bash
# Comando para verificar DNS
nslookup marketing.grupomusicalcelula.com

# O usa herramientas online:
# https://dnschecker.org/
```

Deberías ver que apunta a los servidores de Vercel.

---

## 🔒 Paso 5: Verificar SSL

Una vez propagado el DNS:

1. Vercel generará automáticamente el certificado SSL (Let's Encrypt)
2. Verás un ✅ verde en el dashboard de Vercel junto al dominio
3. Podrás acceder a: `https://marketing.grupomusicalcelula.com`

---

## 🧪 Paso 6: Probar las URLs

Verifica que todas las URLs funcionen:

```bash
# Página principal
curl -I https://marketing.grupomusicalcelula.com/

# Bodas
curl -I https://marketing.grupomusicalcelula.com/bodas

# XV Años
curl -I https://marketing.grupomusicalcelula.com/xv

# Eventos Privados
curl -I https://marketing.grupomusicalcelula.com/privada

# API
curl -I https://marketing.grupomusicalcelula.com/api/send-form
```

Todos deberían retornar **200 OK** o **405 Method Not Allowed** (para la API).

---

## 📝 Actualizar URLs en el Código (Opcional)

Si quieres actualizar las URLs canónicas y Open Graph:

### bodas.html
```html
<!-- Antes -->
<link rel="canonical" href="https://www.grupomusicalcelula.com/boda.html">
<meta property="og:url" content="https://www.grupomusicalcelula.com/boda.html">

<!-- Después -->
<link rel="canonical" href="https://marketing.grupomusicalcelula.com/bodas">
<meta property="og:url" content="https://marketing.grupomusicalcelula.com/bodas">
```

### xv.html
```html
<link rel="canonical" href="https://marketing.grupomusicalcelula.com/xv">
<meta property="og:url" content="https://marketing.grupomusicalcelula.com/xv">
```

### privada.html
```html
<link rel="canonical" href="https://marketing.grupomusicalcelula.com/privada">
<meta property="og:url" content="https://marketing.grupomusicalcelula.com/privada">
```

---

## 🔗 Opcional: Integración con Sitio Principal

Si quieres que el sitio principal (`grupomusicalcelula.com`) redirija a las páginas de marketing:

### En el vercel.json del proyecto PRINCIPAL:

```json
{
  "redirects": [
    {
      "source": "/bodas",
      "destination": "https://marketing.grupomusicalcelula.com/bodas",
      "permanent": false
    },
    {
      "source": "/xv",
      "destination": "https://marketing.grupomusicalcelula.com/xv",
      "permanent": false
    },
    {
      "source": "/privada",
      "destination": "https://marketing.grupomusicalcelula.com/privada",
      "permanent": false
    }
  ]
}
```

Esto permite que si alguien visita `grupomusicalcelula.com/bodas`, sea redirigido automáticamente a `marketing.grupomusicalcelula.com/bodas`.

---

## 🎯 Configurar Google Tag Manager para el Subdominio

### En GTM (GTM-5783XFN4):

Si quieres tracking entre dominios (opcional):

1. Ve a la etiqueta **"Vinculador de conversiones"**
2. Marca **"Habilitar vinculación entre diferentes dominios"**
3. Agrega los dominios:
   ```
   grupomusicalcelula.com
   marketing.grupomusicalcelula.com
   ```

Esto permite que Google Ads rastree conversiones incluso si el usuario vino desde el sitio principal.

---

## 📊 Actualizar Google Ads

### Verificar Dominios en Google Ads:

1. Ve a Google Ads → Herramientas → Configuración
2. Ve a **"Detalles empresariales"**
3. Verifica que `marketing.grupomusicalcelula.com` esté agregado como dominio

### Actualizar URLs de Landing Pages:

Si tienes campañas activas, actualiza las URLs finales:
- **Antes:** `https://www.grupomusicalcelula.com/bodas`
- **Después:** `https://marketing.grupomusicalcelula.com/bodas`

---

## ✅ Checklist de Verificación

Antes de considerar el subdominio listo:

- [ ] Proyecto desplegado en Vercel
- [ ] Dominio `marketing.grupomusicalcelula.com` agregado en Vercel
- [ ] Registro CNAME configurado en DNS
- [ ] DNS propagado (verificado con `nslookup`)
- [ ] Certificado SSL activo (✅ verde en Vercel)
- [ ] Todas las URLs funcionan correctamente:
  - [ ] `/` (página principal)
  - [ ] `/bodas`
  - [ ] `/xv`
  - [ ] `/privada`
  - [ ] `/api/send-form` (debe retornar 405 en GET)
- [ ] Formularios envían correctamente
- [ ] GTM carga correctamente (verificar con Tag Assistant)
- [ ] Conversiones se registran en Google Ads
- [ ] URLs canónicas actualizadas (opcional)
- [ ] Google Ads actualizado con nuevas URLs (si aplica)

---

## 🐛 Solución de Problemas

### "Domain not found" en Vercel
- Verifica que el DNS esté correctamente configurado
- Espera más tiempo (puede tardar hasta 48 horas)
- Usa `nslookup` para verificar propagación

### "SSL Certificate Error"
- Espera a que Vercel genere el certificado (automático después de DNS)
- En Cloudflare, desactiva el proxy (nube gris)
- Puede tardar hasta 24 horas

### Páginas retornan 404
- Verifica que `vercel.json` tenga los rewrites correctos
- Verifica que los archivos HTML existan en `Marketing/`
- Haz un nuevo deploy: `vercel --prod`

### GTM no carga
- Verifica que el snippet de GTM esté en todas las páginas HTML
- Verifica el ID: `GTM-5783XFN4`
- Usa GTM Preview para debugging

### Conversiones no se registran
- Espera 24-48 horas para que aparezcan en Google Ads
- Verifica con Tag Assistant que las etiquetas se disparen
- Verifica que el ID de conversión sea correcto: `943484255`

---

## 📞 Contactos y Recursos

- **Vercel Dashboard:** https://vercel.com/dashboard
- **Vercel Docs:** https://vercel.com/docs
- **GTM:** https://tagmanager.google.com/ (GTM-5783XFN4)
- **Google Ads:** Cuenta 943484255
- **DNS Checker:** https://dnschecker.org/

---

## 🎉 Una vez completado

Tu sitio de marketing estará disponible en:
```
https://marketing.grupomusicalcelula.com/bodas
https://marketing.grupomusicalcelula.com/xv
https://marketing.grupomusicalcelula.com/privada
```

Con:
- ✅ SSL activo
- ✅ GTM configurado
- ✅ Conversiones funcionando
- ✅ URLs limpias sin .html
- ✅ API de envío de formularios activa

**¡Listo para recibir tráfico de campañas de marketing!** 🚀
