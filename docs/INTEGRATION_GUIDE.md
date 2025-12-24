# 🔗 Guía de Integración: Proyecto Marketing con Proyecto Principal

## Arquitectura de Microfrontends

```
┌─────────────────────────────────────────────────────────────┐
│  grupomusicalcelula.com (Proyecto Principal)                │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  /                    → Sitio principal              │   │
│  │  /blog                → Blog del sitio               │   │
│  │  /cotizador           → Cotizador                    │   │
│  │  /post/:id            → Posts del blog               │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  REWRITES A PROYECTO MARKETING                       │   │
│  │  /bodas      → marketing.vercel.app/bodas            │   │
│  │  /xv         → marketing.vercel.app/xv               │   │
│  │  /privada    → marketing.vercel.app/privada          │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## 📝 Paso 1: Desplegar el Proyecto Marketing

### En este proyecto (MarketingCelula):

```bash
# 1. Build del proyecto
npm run build

# 2. Desplegar a Vercel
vercel --prod

# 3. Anota la URL de producción
# Ejemplo: https://marketing-celula.vercel.app
```

**Importante:** Guarda la URL de producción que te da Vercel. La necesitarás para el siguiente paso.

---

## 📝 Paso 2: Configurar el Proyecto Principal

### En el proyecto principal (grupomusicalcelula.com):

Crea o modifica el archivo `vercel.json` con esta configuración:

```json
{
  "version": 2,
  "rewrites": [
    {
      "source": "/bodas",
      "destination": "https://marketing-celula.vercel.app/bodas"
    },
    {
      "source": "/xv",
      "destination": "https://marketing-celula.vercel.app/xv"
    },
    {
      "source": "/privada",
      "destination": "https://marketing-celula.vercel.app/privada"
    },
    {
      "source": "/assets/marketing/:path*",
      "destination": "https://marketing-celula.vercel.app/assets/:path*"
    },
    {
      "source": "/css/marketing/:path*",
      "destination": "https://marketing-celula.vercel.app/css/:path*"
    },
    {
      "source": "/js/marketing/:path*",
      "destination": "https://marketing-celula.vercel.app/js/:path*"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

**Reemplaza** `marketing-celula.vercel.app` con la URL real de tu proyecto Marketing.

---

## 📝 Paso 3: Ajustar rutas de assets en el Proyecto Marketing

### Opción A: Usar rutas absolutas (Recomendado)

En los archivos HTML del proyecto Marketing, asegúrate de que los assets usen rutas absolutas:

```html
<!-- ✅ CORRECTO -->
<link rel="stylesheet" href="/css/common.css">
<script src="/js/common.js"></script>
<img src="/assets/gallery/banda-1.webp">

<!-- ❌ INCORRECTO -->
<link rel="stylesheet" href="./css/common.css">
<link rel="stylesheet" href="../css/common.css">
```

### Opción B: Usar variable de entorno para el base path

Si necesitas más flexibilidad, puedes usar una variable de entorno:

```javascript
// En el proyecto Marketing, crea un archivo config.js
const BASE_PATH = process.env.BASE_PATH || '';

// Luego en tus scripts:
const assetPath = `${BASE_PATH}/assets/image.webp`;
```

---

## 📝 Paso 4: Configurar CORS (si es necesario)

### En el proyecto Marketing, agrega headers CORS en `vercel.json`:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Access-Control-Allow-Origin",
          "value": "https://grupomusicalcelula.com"
        },
        {
          "key": "Access-Control-Allow-Methods",
          "value": "GET, OPTIONS"
        }
      ]
    }
  ]
}
```

---

## 🧪 Paso 5: Probar la integración

### 1. Verifica que el proyecto Marketing funciona independientemente:

```bash
# Visita directamente:
https://marketing-celula.vercel.app/bodas
https://marketing-celula.vercel.app/xv
https://marketing-celula.vercel.app/privada
```

### 2. Despliega el proyecto principal:

```bash
cd /ruta/al/proyecto-principal
vercel --prod
```

### 3. Verifica que los rewrites funcionan:

```bash
# Estas URLs deberían mostrar el contenido del proyecto Marketing:
https://grupomusicalcelula.com/bodas
https://grupomusicalcelula.com/xv
https://grupomusicalcelula.com/privada
```

---

## 🔧 Configuración Avanzada

### Usar variables de entorno en Vercel

En el proyecto principal, puedes usar variables de entorno para la URL del proyecto Marketing:

1. Ve a tu proyecto en Vercel Dashboard
2. Settings → Environment Variables
3. Agrega:
   - **Name:** `MARKETING_URL`
   - **Value:** `https://marketing-celula.vercel.app`
   - **Environment:** Production, Preview, Development

Luego en `vercel.json`:

```json
{
  "rewrites": [
    {
      "source": "/bodas",
      "destination": "$MARKETING_URL/bodas"
    }
  ]
}
```

**Nota:** Vercel no soporta variables de entorno en `vercel.json` directamente. Necesitarías usar Edge Middleware para esto.

---

## 🚀 Alternativa: Edge Middleware

Para mayor control, puedes usar Edge Middleware en el proyecto principal:

### Crea `middleware.js` en el proyecto principal:

```javascript
import { NextResponse } from 'next/server';

export function middleware(request) {
  const url = request.nextUrl.clone();
  
  // Rutas de marketing
  const marketingRoutes = ['/bodas', '/xv', '/privada'];
  
  if (marketingRoutes.includes(url.pathname)) {
    const marketingUrl = process.env.MARKETING_URL || 'https://marketing-celula.vercel.app';
    url.href = `${marketingUrl}${url.pathname}`;
    return NextResponse.rewrite(url);
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/bodas', '/xv', '/privada'],
};
```

---

## 📊 Ventajas de esta arquitectura

✅ **Despliegues independientes:** Puedes actualizar Marketing sin tocar el proyecto principal
✅ **Equipos separados:** Diferentes equipos pueden trabajar en cada proyecto
✅ **Tecnologías diferentes:** Cada proyecto puede usar su stack preferido
✅ **Escalabilidad:** Fácil agregar más microfrontends
✅ **Gratis en Vercel:** Ambos proyectos entran en el plan Free

---

## 🎯 Checklist de Integración

- [ ] Proyecto Marketing desplegado en Vercel
- [ ] URL de producción anotada
- [ ] `vercel.json` del proyecto principal actualizado con rewrites
- [ ] Assets usan rutas absolutas en proyecto Marketing
- [ ] Headers CORS configurados (si es necesario)
- [ ] Proyecto principal desplegado
- [ ] Rutas probadas y funcionando
- [ ] Analytics configurado en ambos proyectos
- [ ] SEO verificado (meta tags, canonical URLs)

---

## 🐛 Troubleshooting

### Problema: Assets no cargan (404)

**Solución:** Verifica que los rewrites incluyan las rutas de assets:

```json
{
  "source": "/assets/:path*",
  "destination": "https://marketing-celula.vercel.app/assets/:path*"
}
```

### Problema: Estilos no se aplican

**Solución:** Verifica que las rutas CSS sean absolutas y estén en los rewrites.

### Problema: CORS errors

**Solución:** Agrega headers CORS en el proyecto Marketing.

### Problema: Analytics duplicados

**Solución:** Configura diferentes IDs de Analytics para cada proyecto.

---

## 📞 Siguiente paso

Una vez configurado todo, deberías poder acceder a:

- `grupomusicalcelula.com/` → Proyecto Principal
- `grupomusicalcelula.com/blog` → Proyecto Principal
- `grupomusicalcelula.com/cotizador` → Proyecto Principal
- `grupomusicalcelula.com/bodas` → Proyecto Marketing (via rewrite)
- `grupomusicalcelula.com/xv` → Proyecto Marketing (via rewrite)
- `grupomusicalcelula.com/privada` → Proyecto Marketing (via rewrite)

¡Y todo desde el mismo dominio! 🎉
