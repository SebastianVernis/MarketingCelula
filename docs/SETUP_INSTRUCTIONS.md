# 🚀 Instrucciones de Configuración Rápida

## Resumen

Tienes 2 proyectos en Vercel que se integrarán:

1. **Proyecto Marketing** (este repo) → `marketing-celula.vercel.app`
2. **Proyecto Principal** (otro repo) → `grupomusicalcelula.com`

El proyecto principal usará **rewrites** para servir las páginas de marketing.

---

## ⚡ Pasos Rápidos

### 1️⃣ En ESTE proyecto (Marketing)

```bash
# Ya está todo configurado ✅
# Solo despliega:
npm run build
vercel --prod

# Anota la URL que te da Vercel, ejemplo:
# https://marketing-celula-abc123.vercel.app
```

### 2️⃣ En el PROYECTO PRINCIPAL

Copia el contenido del archivo `vercel-main-project.json` que creé y:

**Opción A: Si ya tienes `vercel.json`**
- Agrega las secciones de `rewrites` al archivo existente
- Reemplaza `marketing-celula.vercel.app` con tu URL real

**Opción B: Si NO tienes `vercel.json`**
- Copia `vercel-main-project.json` como `vercel.json`
- Reemplaza `marketing-celula.vercel.app` con tu URL real

**Ejemplo de `vercel.json` en el proyecto principal:**

```json
{
  "version": 2,
  "rewrites": [
    {
      "source": "/bodas",
      "destination": "https://TU-URL-MARKETING.vercel.app/bodas"
    },
    {
      "source": "/xv",
      "destination": "https://TU-URL-MARKETING.vercel.app/xv"
    },
    {
      "source": "/privada",
      "destination": "https://TU-URL-MARKETING.vercel.app/privada"
    }
  ]
}
```

### 3️⃣ Despliega el proyecto principal

```bash
cd /ruta/al/proyecto-principal
vercel --prod
```

---

## ✅ Verificación

Después del despliegue, verifica que funcionen:

- ✅ `grupomusicalcelula.com/bodas` → Muestra página de bodas
- ✅ `grupomusicalcelula.com/xv` → Muestra página de XV años
- ✅ `grupomusicalcelula.com/privada` → Muestra página de eventos privados
- ✅ Los assets (imágenes, CSS, JS) cargan correctamente
- ✅ Los enlaces de navegación funcionan

---

## 🎯 Resultado Final

```
Usuario visita: grupomusicalcelula.com/bodas
                        ↓
Vercel rewrite a: marketing-celula.vercel.app/bodas
                        ↓
Usuario ve: Contenido de bodas.html
URL en navegador: grupomusicalcelula.com/bodas ✨
```

**El usuario nunca ve la URL del proyecto Marketing** - todo aparece como si fuera del dominio principal.

---

## 📁 Archivos de Referencia

He creado estos archivos para ayudarte:

1. **`INTEGRATION_GUIDE.md`** - Guía completa y detallada
2. **`MICROFRONTENDS_GUIDE.md`** - Explicación de conceptos
3. **`vercel-main-project.json`** - Configuración lista para copiar
4. **`SETUP_INSTRUCTIONS.md`** - Este archivo (resumen rápido)

---

## 🆘 ¿Necesitas ayuda?

Si algo no funciona:

1. Verifica que ambos proyectos estén desplegados
2. Verifica que la URL en los rewrites sea correcta
3. Revisa los logs en Vercel Dashboard
4. Consulta `INTEGRATION_GUIDE.md` para troubleshooting

---

## 💡 Tip Pro

Para facilitar actualizaciones futuras, considera usar una variable de entorno en el proyecto principal:

1. En Vercel Dashboard del proyecto principal
2. Settings → Environment Variables
3. Agrega: `MARKETING_URL` = `https://tu-url-marketing.vercel.app`

Luego puedes referenciarla en tu código (aunque no directamente en vercel.json).

---

¡Listo! Con esto deberías tener tus microfrontends funcionando perfectamente. 🎉
