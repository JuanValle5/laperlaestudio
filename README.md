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

El logo es provisional. Falta confirmar la dirección exacta y los días de atención.

## Archivos locales

`.gitignore` incluye únicamente el sitio, sus recursos web y este documento. Las notas `informacion.md`, fotografías JPEG originales, archivos temporales y configuraciones locales no se suben. Si añades otro archivo público o una subcarpeta, actualiza las excepciones de `.gitignore`.
