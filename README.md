# Marketing Célula - Sitio Web

Sitio web oficial del Grupo Musical Versátil La Célula.

## 🚀 Despliegue en Vercel

### Configuración Inicial

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Instalar Vercel CLI (si no lo tienes):**
   ```bash
   npm install -g vercel
   ```

3. **Login en Vercel:**
   ```bash
   vercel login
   ```

### Despliegue

#### Despliegue de Desarrollo (Preview)
```bash
vercel
```

#### Despliegue a Producción
```bash
npm run deploy
# o
vercel --prod
```

### Desarrollo Local

Para probar el sitio localmente con el entorno de Vercel:

```bash
npm run dev
```

Esto iniciará el servidor de desarrollo de Vercel en `http://localhost:3000`

### Build Local

Para construir el proyecto localmente:

```bash
npm run build
```

Esto copiará todos los archivos necesarios al directorio `Marketing/`.

## 📁 Estructura del Proyecto

```
MarketingCelula/
├── Marketing/          # Directorio de salida (output)
│   ├── index.html     # Página principal
│   ├── bodas.html     # Página de bodas
│   ├── xv.html        # Página de XV años
│   ├── privada.html   # Página de eventos privados
│   ├── css/           # Estilos
│   ├── js/            # Scripts
│   └── assets/        # Recursos (copiados desde /assets)
├── assets/            # Recursos originales
│   ├── images/
│   ├── gallery/
│   ├── logo/
│   └── ...
├── build.js           # Script de build
├── vercel.json        # Configuración de Vercel
└── package.json       # Dependencias y scripts
```

## ⚙️ Configuración de Vercel

El archivo `vercel.json` está configurado con:

- **Build Command:** `npm run build`
- **Output Directory:** `Marketing`
- **Clean URLs:** Habilitado (sin .html en las URLs)
- **Headers de Seguridad:** X-Content-Type-Options, X-Frame-Options, X-XSS-Protection
- **Cache:** Configurado para assets estáticos (1 año)
- **Redirects:** De URLs con .html a URLs limpias
- **Rewrites:** Para servir archivos .html sin la extensión

## 🔧 Scripts Disponibles

- `npm run dev` - Inicia servidor de desarrollo de Vercel
- `npm run build` - Construye el proyecto
- `npm run deploy` - Despliega a producción en Vercel
- `npm run lint` - Ejecuta ESLint

## 📝 Notas Importantes

1. **Assets:** Los archivos en `/assets` se copian automáticamente a `/Marketing/assets` durante el build.

2. **URLs Limpias:** El sitio usa URLs sin extensión .html:
   - `/bodas` en lugar de `/bodas.html`
   - `/xv` en lugar de `/xv.html`
   - `/privada` en lugar de `/privada.html`

3. **Analytics:** El sitio incluye Vercel Analytics y Speed Insights.

4. **Node Version:** El proyecto requiere Node.js >= 18.0.0

## 🌐 URLs

- **Producción:** https://www.grupomusicalcelula.com
- **Preview:** Se genera automáticamente en cada push

## 📞 Soporte

Para problemas o preguntas sobre el despliegue, contacta al equipo de desarrollo.
