# 🎯 Guía de Microfrontends con Vercel

## ¿Qué son los Microfrontends en Vercel?

Vercel permite dividir tu aplicación en múltiples proyectos independientes que se integran en un solo dominio usando **Rewrites** o **Multi-Zones**.

## Opción 1: Proyecto Único (Actual) ✅ RECOMENDADO

**Ventajas:**
- ✅ Más simple de mantener
- ✅ Un solo despliegue
- ✅ Sin configuración adicional
- ✅ Gratis en plan Free

**Configuración actual:**
```json
// vercel.json (ya configurado)
{
  "rewrites": [
    { "source": "/bodas", "destination": "/bodas.html" },
    { "source": "/xv", "destination": "/xv.html" },
    { "source": "/privada", "destination": "/privada.html" }
  ]
}
```

**URLs resultantes:**
- `grupomusicalcelula.com/` → index.html
- `grupomusicalcelula.com/bodas` → bodas.html
- `grupomusicalcelula.com/xv` → xv.html
- `grupomusicalcelula.com/privada` → privada.html

---

## Opción 2: Multi-Zones (Proyectos Separados)

**Ventajas:**
- ✅ Equipos independientes pueden trabajar en cada zona
- ✅ Despliegues independientes
- ✅ Tecnologías diferentes por zona

**Desventajas:**
- ❌ Más complejo de configurar
- ❌ Requiere múltiples proyectos en Vercel
- ❌ Puede consumir más recursos

### Paso 1: Crear dos proyectos en Vercel

1. **Proyecto Principal** (`grupomusicalcelula-main`)
   - Contiene: Blog, Cotizador, etc.
   - Dominio: `grupomusicalcelula.com`

2. **Proyecto Marketing** (`grupomusicalcelula-marketing`)
   - Contiene: Bodas, XV, Privada
   - Dominio temporal: `grupomusicalcelula-marketing.vercel.app`

### Paso 2: Configurar el proyecto principal

En el proyecto principal, crea/modifica `vercel.json`:

```json
{
  "rewrites": [
    {
      "source": "/bodas",
      "destination": "https://grupomusicalcelula-marketing.vercel.app/bodas"
    },
    {
      "source": "/xv",
      "destination": "https://grupomusicalcelula-marketing.vercel.app/xv"
    },
    {
      "source": "/privada",
      "destination": "https://grupomusicalcelula-marketing.vercel.app/privada"
    },
    {
      "source": "/marketing/:path*",
      "destination": "https://grupomusicalcelula-marketing.vercel.app/:path*"
    }
  ]
}
```

### Paso 3: Configurar el proyecto Marketing

En este proyecto (actual), el `vercel.json` ya está bien configurado.

### Paso 4: Desplegar ambos proyectos

```bash
# En el proyecto Marketing
cd MarketingCelula
vercel --prod

# En el proyecto Principal
cd ../ProyectoPrincipal
vercel --prod
```

---

## Opción 3: Monorepo con Turborepo

Si tienes múltiples aplicaciones y quieres gestionarlas en un solo repositorio:

### Estructura:
```
grupomusicalcelula/
├── apps/
│   ├── main/          # Sitio principal
│   ├── marketing/     # Páginas de marketing
│   └── blog/          # Blog
├── packages/
│   ├── ui/            # Componentes compartidos
│   └── config/        # Configuración compartida
├── turbo.json
└── package.json
```

### Configuración de Vercel:

Cada app en `apps/` se despliega como un proyecto separado en Vercel, pero comparten código en `packages/`.

---

## 🎯 Recomendación para tu caso

**Usa la Opción 1 (Proyecto Único)** porque:

1. ✅ Ya está configurado y funcionando
2. ✅ Es más simple de mantener
3. ✅ No necesitas equipos separados
4. ✅ Todas las páginas están relacionadas (mismo negocio)
5. ✅ Gratis en Vercel Free tier

**Solo usa Multi-Zones si:**
- Tienes equipos diferentes trabajando en cada sección
- Necesitas desplegar independientemente cada sección
- Las secciones usan tecnologías muy diferentes (ej: React + Vue)

---

## 📝 Configuración actual (No cambiar)

Tu `vercel.json` actual es perfecto para un proyecto único:

```json
{
  "version": 2,
  "buildCommand": "npm run build",
  "outputDirectory": "Marketing",
  "cleanUrls": true,
  "rewrites": [
    { "source": "/bodas", "destination": "/bodas.html" },
    { "source": "/privada", "destination": "/privada.html" },
    { "source": "/xv", "destination": "/xv.html" }
  ],
  "redirects": [
    { "source": "/bodas.html", "destination": "/bodas", "permanent": true },
    { "source": "/privada.html", "destination": "/privada", "permanent": true },
    { "source": "/xv.html", "destination": "/xv", "permanent": true }
  ]
}
```

---

## 🚀 Próximos pasos

1. ✅ Mantén la configuración actual
2. ✅ Despliega con: `npm run deploy`
3. ✅ Verifica que todas las rutas funcionen
4. ✅ Configura tu dominio personalizado en Vercel

**No necesitas crear un archivo `microfrontends.json`** - Vercel no usa ese archivo. Todo se maneja con `vercel.json`.
