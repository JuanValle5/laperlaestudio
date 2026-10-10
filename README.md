# La Perla

Página de servicios de belleza en Buga, Colombia. HTML, CSS y JavaScript sin frameworks ni pasos de compilación.

## Vista local

Abre `index.html` o ejecuta desde esta carpeta:

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

Visita http://127.0.0.1:4173.

## Archivos

- `index.html`: contenido, servicios, precios, portafolio y datos del negocio.
- `styles.css`: diseño adaptable y paleta de colores.
- `script.js`: WhatsApp, navegación, filtros y galería ampliable.
- `img/*.webp`: fotografías optimizadas en dos tamaños.

El número de WhatsApp se configura en `WHATSAPP_NUMBER`, dentro de `script.js`.

Para alojarla, publica los tres archivos del sitio y la carpeta `img`, manteniendo sus rutas. Las fuentes de Google y el mapa requieren conexión a Internet.

Falta confirmar la dirección exacta y los días de atención.

## Archivos locales

`.gitignore` incluye únicamente el sitio, sus recursos web y este documento. Las notas `informacion.md`, fotografías JPEG originales, archivos temporales y configuraciones locales no se suben. Si añades otro archivo público o una subcarpeta, actualiza las excepciones de `.gitignore`.

## Identidad visual

- `img/la-perla-logo.svg`: composición completa en marrón, usada en portada, encabezado y pie.
- `img/la-perla-icon.svg`: la P original en crema sobre marrón, usada como favicon.

Ambos SVG son trazados vectoriales con curvas obtenidas del logo original, sin JPEG incrustados ni máscaras rasterizadas. Conservan la composición y las proporciones de las letras. El fondo es transparente en el logo completo. Para cambiar el color, edita el `fill` de los trazados de cada SVG.

Los tres JPEG de referencia en `img/logo/` se conservan localmente y siguen ignorados. Los SVG son autónomos y están incluidos por las reglas actuales de `.gitignore`; no necesitan los JPEG para funcionar.
