# 🚀 Guía de Despliegue en Vercel

## ✅ Verificación Pre-Despliegue

Antes de desplegar, asegúrate de que todo esté configurado correctamente:

### 1. Verificar que el build funciona

```bash
npm run build
```

Deberías ver:
```
✅ Build complete! Output in Marketing/
```

### 2. Verificar estructura de archivos

```bash
ls -la Marketing/
```

Debes tener:
- ✅ `index.html` (página principal)
- ✅ `bodas.html`
- ✅ `xv.html`
- ✅ `privada.html`
- ✅ `assets/` (directorio con recursos)
- ✅ `css/` (directorio con estilos)
- ✅ `js/` (directorio con scripts)

## 📦 Instalación de Vercel CLI

Si no tienes Vercel CLI instalado:

```bash
npm install -g vercel
```

## 🔐 Autenticación

Inicia sesión en Vercel:

```bash
vercel login
```

Sigue las instrucciones en el navegador para autenticarte.

## 🎯 Primer Despliegue

### Opción 1: Usando Vercel CLI (Recomendado)

1. **Despliegue de prueba (preview):**
   ```bash
   vercel
   ```

2. **Responde las preguntas:**
   - Set up and deploy? → `Y`
   - Which scope? → Selecciona tu cuenta/organización
   - Link to existing project? → `N` (primera vez)
   - What's your project's name? → `marketing-celula` (o el nombre que prefieras)
   - In which directory is your code located? → `./` (presiona Enter)
   - Want to override the settings? → `N`

3. **Vercel detectará automáticamente:**
   - Build Command: `npm run build`
   - Output Directory: `Marketing`
   - Install Command: `npm install`

4. **Espera a que termine el despliegue**
   - Recibirás una URL de preview como: `https://marketing-celula-xxx.vercel.app`

5. **Verifica el sitio en el navegador**
   - Abre la URL proporcionada
   - Verifica que todas las páginas funcionen:
     - `/` (index)
     - `/bodas`
     - `/xv`
     - `/privada`

### Opción 2: Usando el Dashboard de Vercel

1. Ve a [vercel.com](https://vercel.com)
2. Click en "Add New Project"
3. Importa tu repositorio de Git (GitHub, GitLab, Bitbucket)
4. Configura:
   - **Framework Preset:** Other
   - **Build Command:** `npm run build`
   - **Output Directory:** `Marketing`
   - **Install Command:** `npm install`
5. Click en "Deploy"

## 🌐 Despliegue a Producción

Una vez verificado que el preview funciona correctamente:

```bash
vercel --prod
```

O usando el script npm:

```bash
npm run deploy
```

## 🔧 Configuración de Dominio Personalizado

### En Vercel Dashboard:

1. Ve a tu proyecto en Vercel
2. Click en "Settings" → "Domains"
3. Agrega tu dominio: `grupomusicalcelula.com`
4. Sigue las instrucciones para configurar los DNS:

   **Para dominio raíz (grupomusicalcelula.com):**
   ```
   Tipo: A
   Nombre: @
   Valor: 76.76.21.21
   ```

   **Para www:**
   ```
   Tipo: CNAME
   Nombre: www
   Valor: cname.vercel-dns.com
   ```

5. Espera a que se propague el DNS (puede tomar hasta 48 horas, pero usualmente es más rápido)

## 🔄 Despliegues Automáticos

### Conectar con Git

Si conectaste tu repositorio de Git, Vercel desplegará automáticamente:

- **Commits a `main`/`master`** → Producción
- **Commits a otras ramas** → Preview deployments
- **Pull Requests** → Preview deployments con URL única

### Configurar Branch de Producción

1. Ve a "Settings" → "Git"
2. Configura "Production Branch" a `master` o `main`

## 📊 Monitoreo

### Analytics

El sitio ya incluye Vercel Analytics. Para verlo:

1. Ve a tu proyecto en Vercel
2. Click en "Analytics"
3. Verás métricas de tráfico y rendimiento

### Speed Insights

1. Ve a "Speed Insights" en el dashboard
2. Verás métricas de Core Web Vitals

## 🐛 Solución de Problemas

### Error: "Build failed"

```bash
# Limpia y reconstruye
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Error: "404 Not Found" en rutas

Verifica que `vercel.json` tenga las configuraciones de rewrites correctas.

### Assets no cargan

Verifica que:
1. El directorio `assets/` existe en la raíz
2. El build copió correctamente los assets a `Marketing/assets/`
3. Las rutas en HTML son relativas: `./assets/...` o `/assets/...`

### CSS/JS no cargan

Verifica las rutas en los archivos HTML:
- Deben ser relativas: `./css/main.css` o `/css/main.css`
- Los archivos existen en `Marketing/css/` y `Marketing/js/`

## 🔄 Actualizar el Sitio

### Desarrollo Local

1. Haz cambios en los archivos
2. Prueba localmente:
   ```bash
   npm run dev
   ```
3. Verifica en `http://localhost:3000`

### Desplegar Cambios

**Opción 1: Con Git (Automático)**
```bash
git add .
git commit -m "Descripción de cambios"
git push origin master
```

**Opción 2: Manual con Vercel CLI**
```bash
npm run build
vercel --prod
```

## 📝 Checklist de Despliegue

Antes de cada despliegue a producción:

- [ ] Build local exitoso (`npm run build`)
- [ ] Prueba local funciona (`npm run dev`)
- [ ] Todas las páginas cargan correctamente
- [ ] Assets (imágenes, CSS, JS) cargan correctamente
- [ ] Links internos funcionan
- [ ] Formularios funcionan (si aplica)
- [ ] Responsive design verificado
- [ ] SEO meta tags correctos
- [ ] Analytics configurado

## 🎉 ¡Listo!

Tu sitio debería estar desplegado y funcionando en Vercel.

**URLs de ejemplo:**
- Preview: `https://marketing-celula-xxx.vercel.app`
- Producción: `https://grupomusicalcelula.com`

Para más información, consulta la [documentación oficial de Vercel](https://vercel.com/docs).
