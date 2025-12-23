# 📊 Reporte de Eventos GTM - Proyecto Marketing

## 🎯 Configuración de Google Tag Manager

### Proyecto Marketing
- **GTM ID:** `GTM-5783XFN4`
- **Páginas:** bodas.html, xv.html, privada.html, index.html
- **Dominio:** marketing-celula.vercel.app (integrado en grupomusicalcelula.com)

### Proyecto Principal
- **GTM ID:** `GTM-KTG6F589`
- **Páginas:** index.html, blog.html, cotizador.html, testimonios.html
- **Dominio:** grupomusicalcelula.com

---

## 📋 Eventos Configurados en el Proyecto Marketing

### 1. **form_submission** (Envío de Formulario)

**Trigger:** Cuando un usuario envía el formulario de contacto

**DataLayer Push:**
```javascript
window.dataLayer.push({
    event: 'form_submission',
    formName: 'bodas' | 'xv' | 'privada',  // Nombre de la campaña
    eventType: 'Boda' | 'XV años' | 'Cumpleaños' | etc.,  // Tipo de evento seleccionado
    eventDate: '2025-01-15',  // Fecha del evento
    formValue: 5.0  // Valor estimado del lead
});
```

**Variables a capturar en GTM:**
- `formName` → Identifica qué página de campaña generó el lead
- `eventType` → Tipo de evento que el cliente busca
- `eventDate` → Fecha del evento (útil para segmentación temporal)
- `formValue` → Valor monetario del lead para ROI

**Uso recomendado:**
- Crear conversión en Google Ads
- Tracking de Facebook Pixel
- Enviar a Google Analytics 4 como evento de conversión

---

### 2. **conversion** (Conversión de Google Ads)

**Trigger:** Clicks en CTAs y envío de formularios

**Función:**
```javascript
gtag_report_conversion(event_name, value, url)
```

**Eventos configurados:**

#### a) **Badge de Descuento - Bodas**
```javascript
gtag_report_conversion('badge_descuento_bodas', 0.5, '#contacto')
```
- **Valor:** 0.5 MXN
- **Acción:** Scroll a formulario de contacto

#### b) **CTA Hero - Bodas**
```javascript
gtag_report_conversion('cta_hero_bodas', 1.0, '#contacto')
```
- **Valor:** 1.0 MXN
- **Acción:** Scroll a formulario de contacto

#### c) **CTA Evento - Bodas**
```javascript
gtag_report_conversion('cta_event_bodas', 1.5, '#contacto')
```
- **Valor:** 1.5 MXN
- **Acción:** Scroll a formulario de contacto

#### d) **Envío de Formulario - Bodas**
```javascript
gtag_report_conversion('form_submit_bodas', 5.0)
```
- **Valor:** 5.0 MXN
- **Acción:** Lead generado

#### e) **WhatsApp Footer - Bodas**
```javascript
gtag_report_conversion('whatsapp_footer_bodas', 2.0, url)
```
- **Valor:** 2.0 MXN
- **Acción:** Click en WhatsApp

**Eventos similares para XV años y Privada:**
- `badge_descuento_xv`, `cta_hero_xv`, `form_submit_xv`, `whatsapp_footer_xv`
- `cta_hero_privada`, `form_submit_privada`, `whatsapp_footer_privada`

---

### 3. **Eventos de Navegación**

#### a) **Click en Enlaces del Menú**
- INICIO → grupomusicalcelula.com
- COTIZADOR → grupomusicalcelula.com/cotizador
- BLOG → grupomusicalcelula.com/blog

**Recomendación:** Configurar en GTM como eventos de click con:
```javascript
{
    event: 'navigation_click',
    linkText: 'INICIO' | 'COTIZADOR' | 'BLOG',
    linkUrl: 'https://grupomusicalcelula.com/...',
    pageSource: 'marketing_bodas' | 'marketing_xv' | 'marketing_privada'
}
```

#### b) **Click en Enlaces del Footer**
Posts del blog (post/0, post/1, etc.)

**Recomendación:** Configurar como:
```javascript
{
    event: 'footer_link_click',
    linkType: 'blog_post',
    postId: '0' | '1' | '2' | etc.,
    pageSource: 'marketing'
}
```

---

### 4. **Eventos de Interacción**

#### a) **Scroll Arrow Click**
```javascript
{
    event: 'scroll_arrow_click',
    targetSection: 'eventos',
    page: 'bodas' | 'xv' | 'privada'
}
```

#### b) **Mobile Menu Toggle**
```javascript
{
    event: 'mobile_menu_toggle',
    action: 'open' | 'close',
    page: 'bodas' | 'xv' | 'privada'
}
```

---

## 🔧 Configuración Recomendada en GTM

### Tags a Crear:

#### 1. **Google Ads Conversion - Form Submit**
- **Tipo:** Google Ads Conversion Tracking
- **Conversion ID:** AW-943484255
- **Conversion Label:** (según campaña)
- **Trigger:** Custom Event = `form_submission`
- **Valor:** `{{formValue}}`

#### 2. **GA4 Event - Form Submission**
- **Tipo:** Google Analytics: GA4 Event
- **Event Name:** `form_submission`
- **Parameters:**
  - `form_name`: `{{formName}}`
  - `event_type`: `{{eventType}}`
  - `event_date`: `{{eventDate}}`
  - `value`: `{{formValue}}`
- **Trigger:** Custom Event = `form_submission`

#### 3. **Facebook Pixel - Lead**
- **Tipo:** Facebook Pixel
- **Event:** Lead
- **Parameters:**
  - `content_name`: `{{formName}}`
  - `content_category`: `{{eventType}}`
  - `value`: `{{formValue}}`
  - `currency`: MXN
- **Trigger:** Custom Event = `form_submission`

---

### Variables a Crear:

1. **formName**
   - Tipo: Data Layer Variable
   - Data Layer Variable Name: `formName`

2. **eventType**
   - Tipo: Data Layer Variable
   - Data Layer Variable Name: `eventType`

3. **eventDate**
   - Tipo: Data Layer Variable
   - Data Layer Variable Name: `eventDate`

4. **formValue**
   - Tipo: Data Layer Variable
   - Data Layer Variable Name: `formValue`

5. **pageSource**
   - Tipo: JavaScript Variable
   - Variable Name: `PAGE_NAME`

---

### Triggers a Crear:

1. **Form Submission**
   - Tipo: Custom Event
   - Event Name: `form_submission`

2. **Conversion Events**
   - Tipo: Custom Event
   - Event Name: `conversion`

3. **Navigation Clicks**
   - Tipo: Click - All Elements
   - Condición: Click Classes contains `nav-link`

4. **Footer Links**
   - Tipo: Click - All Elements
   - Condición: Click URL contains `/post/`

---

## 📈 Métricas Clave a Monitorear

### 1. **Tasa de Conversión por Página**
```
Conversiones = form_submission events
Visitas = pageviews
Tasa = (Conversiones / Visitas) * 100
```

**Objetivo:** > 5% de conversión

### 2. **Valor por Lead**
```
Valor Promedio = Total formValue / Total form_submissions
```

**Objetivo:** Identificar qué campaña genera leads de mayor valor

### 3. **Embudo de Conversión**
```
1. Pageview (100%)
2. Scroll to Form (% que llegan al formulario)
3. Form Start (% que empiezan a llenar)
4. Form Submit (% que completan)
```

### 4. **Tiempo hasta Conversión**
```
Tiempo = Timestamp de form_submission - Timestamp de pageview
```

**Objetivo:** < 3 minutos promedio

### 5. **Dispositivo con Mayor Conversión**
```
Segmentar form_submission por:
- Desktop
- Mobile
- Tablet
```

---

## 🧪 Testing de Eventos GTM

### Modo Preview de GTM

1. Ir a GTM → Preview
2. Ingresar URL: `https://marketing-celula.vercel.app/bodas`
3. Verificar que se dispare:
   - ✅ GTM Container Loaded
   - ✅ Page View

### Test de Formulario

1. Llenar formulario con datos de prueba
2. Enviar formulario
3. Verificar en GTM Preview:
   - ✅ Event: `form_submission`
   - ✅ Variables: `formName`, `eventType`, `eventDate`, `formValue`
   - ✅ Tags disparados: GA4, Google Ads, Facebook Pixel

### Test de Conversiones

1. Click en cada CTA
2. Verificar en GTM Preview:
   - ✅ Event: `conversion`
   - ✅ Event Label correcto
   - ✅ Valor correcto

---

## 📊 Dashboard Recomendado en GA4

### Eventos Personalizados:
1. `form_submission` → Conversión principal
2. `conversion` → Micro-conversiones
3. `navigation_click` → Engagement
4. `footer_link_click` → Interés en contenido

### Dimensiones Personalizadas:
1. `form_name` → Campaña de origen
2. `event_type` → Tipo de evento solicitado
3. `page_source` → Página de marketing

### Métricas Calculadas:
1. **Valor por Usuario** = Total formValue / Total Users
2. **Tasa de Conversión** = form_submissions / pageviews
3. **ROI de Campaña** = (Ingresos - Costo) / Costo

---

## 🔍 Debugging

### Verificar DataLayer en Consola:

```javascript
// Ver todos los eventos
console.log(window.dataLayer);

// Ver último evento
console.log(window.dataLayer[window.dataLayer.length - 1]);

// Simular evento de prueba
window.dataLayer.push({
    event: 'form_submission',
    formName: 'test',
    eventType: 'Boda',
    eventDate: '2025-12-31',
    formValue: 5.0
});
```

### Verificar GTM está cargado:

```javascript
// Debe retornar true
console.log(typeof google_tag_manager !== 'undefined');

// Ver ID del contenedor
console.log(google_tag_manager['GTM-5783XFN4']);
```

---

## 📝 Checklist de Implementación

### Proyecto Marketing:
- [x] GTM-5783XFN4 instalado en todas las páginas
- [x] Script en `<head>`
- [x] Noscript en `<body>`
- [x] DataLayer push en form-handler.js
- [x] Eventos de conversión configurados
- [x] API de email integrada

### Proyecto Principal:
- [x] GTM-KTG6F589 instalado en todas las páginas
- [x] Script en `<head>`
- [x] Noscript en `<body>`
- [ ] Configurar eventos específicos del sitio principal

### GTM Container (GTM-5783XFN4):
- [ ] Tags creados (GA4, Google Ads, Facebook)
- [ ] Variables creadas (formName, eventType, etc.)
- [ ] Triggers creados (form_submission, conversion)
- [ ] Testing en Preview Mode
- [ ] Publicar versión

---

## 🎯 Próximos Pasos

1. **Configurar GTM Container** con los tags, variables y triggers listados
2. **Probar en Preview Mode** todos los eventos
3. **Publicar versión** de GTM
4. **Configurar conversiones** en Google Ads
5. **Configurar eventos** en Facebook Pixel
6. **Crear dashboard** en GA4
7. **Monitorear métricas** semanalmente

---

**Fecha de creación:** $(date)
**Versión:** 1.0
**Proyecto:** Marketing Célula - GTM Implementation
