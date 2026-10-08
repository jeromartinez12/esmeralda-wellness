# Esmeralda Wellness — sitio

Sitio estático (HTML + CSS + JS, sin build). Se publica en Vercel tal cual está.

## ⚠️ Antes de publicar: configurar WhatsApp

Los dos botones de reserva apuntan a números de ejemplo. Editar las dos
constantes del principio de `assets/js/app.js`:

```js
const SEDES = {
  madero: { nombre: 'Puerto Madero',       whatsapp: '5491100000000' },
  leloir: { nombre: 'Thays Parque Leloir', whatsapp: '5491100000000' }
};
```

Formato internacional, sin `+`, sin espacios ni guiones. Ej.: `5491130410520`.
Todos los CTA del sitio (8 en total) se arman solos a partir de ahí, con el
mensaje ya escrito según desde dónde se tocó.

## Estructura

```
index.html                    todo el contenido
assets/css/app.css            sistema visual completo
assets/js/app.js              config + disciplinas + horarios + interacciones
assets/img/                   fotos reales del estudio (webp) + mapas + favicon
assets/fonts/                 Bodoni Moda y Jost (subset, solo los glifos usados)
vercel.json                   cache de assets y URLs limpias
```

## Dónde se edita cada cosa

| Qué | Dónde |
|---|---|
| Números de WhatsApp | `app.js` → `SEDES` |
| Disciplinas del carrusel | `app.js` → `FACETAS` |
| Grillas de horarios | `app.js` → `HORARIOS` |
| Textos, servicios de spa, FAQ, sedes | `index.html` |
| Colores y tipografía | `app.css` → `:root` |

Las grillas de horarios se arman solas desde `HORARIOS`: cada celda es
`G('Nombre', 'Nivel')`, o `G('Nombre', 'Nivel', 1)` si es prenatal (se pinta en
terracota), o `null` si no hay clase.

## Paleta

| | |
|---|---|
| Verde botella | `#0E3A28` |
| Verde profundo | `#072018` |
| Crema | `#F3EEE7` |
| Hueso (texto sobre verde) | `#F5F2EA` |
| Terracota (solo interacción) | `#9E3B2C` |
| Salvia (datos secundarios) | `#7E9678` |

El terracota aparece únicamente donde alguien puede hacer algo: hovers, el
círculo de la flecha, el ícono prenatal. Nunca como fondo de sección.

## Pendientes de contenido

- Números de WhatsApp de cada sede.
- Dirección exacta de Thays Parque Leloir (hoy figura la zona).
- Precios de las membresías (hoy todo va a "consultar por WhatsApp", igual que
  en sus redes).
- Reseñas de Google, si quieren sección de testimonios. No se inventó ninguna.
- Nombre comercial definitivo de las clases de yoga: el material de la marca usa
  "Hatha Vinyasa / Yoga Restaurativo" en el feed y "Vinyasa HIIT / Yoga
  Reconstructivo" en las membresías. En el sitio quedó el primero.

## Caché

`vercel.json` separa los tipos de asset a propósito:

- **fuentes** → caché de un año (`immutable`): el nombre del archivo identifica
  peso y estilo, nunca cambia de contenido.
- **imágenes** → un día, con revalidación en segundo plano.
- **CSS y JS** → siempre revalidar, porque los nombres no llevan hash.

Ojo con un detalle del CDN de Vercel: cachea por **ruta** e ignora el query
string, así que `?v=2` no sirve para invalidar. Si alguna vez quedara un asset
pegado, hay que **renombrar el archivo**. Con los headers actuales no debería
volver a pasar.

## Notas

- Las fotos se recortaron de capturas de Instagram, por eso tienen la resolución
  que tienen. Para producción conviene pedirle a la marca los originales.
- El logo es una reconstrucción vectorial, no el archivo maestro del diseñador.
- Accesibilidad: contraste AA, navegación por teclado en el selector de
  disciplinas y en las pestañas de horarios, `prefers-reduced-motion` respetado.
