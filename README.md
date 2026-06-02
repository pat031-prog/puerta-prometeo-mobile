# PUERTA PROMETEO: La Noche del 0

PWA mobile-first para dirigir el one-shot desde iPhone: escenas ilustradas estilo RPG viejo, decisiones ramificadas, cultos rivales, mapa rioplatense, cartas rituales, recursos y d10 numografico.

El prototipo incluye 15 laminas WebP optimizadas: las 3 atmosfericas iniciales mas 12 escenas nuevas para Zona 0, Puerto, Hospital, Bolsa, Fork, Subsuelo, Catedral, Frontera/Yuyo, Aleph, Apertura, Piedra y la nota al pie secreta.

## Ejecutar local

```bash
npm run dev
```

Abrir `http://localhost:4173`.

## Desplegar en Vercel

La app es estatica y no requiere backend ni variables de entorno.

```bash
vercel
vercel --prod
```

Tambien se puede conectar la carpeta a un repo GitHub y dejar que Vercel detecte el proyecto sin framework.

## iPhone

- Abrir la URL en Safari.
- Compartir.
- Agregar a pantalla de inicio.

El estado de la partida queda guardado en `localStorage` del dispositivo.

## Contenido interactivo

- La pestana RPG muestra escena, imagen, dialogos y decisiones.
- Cada distrito principal tiene lamina propia para reforzar el modo novela visual.
- Algunas decisiones desbloquean rutas ocultas y guinos literarios.
- Tocar varias veces el sigilo del encabezado abre una nota al pie secreta.
- Las imagenes generadas estan optimizadas como WebP en `assets/scenes/`.
