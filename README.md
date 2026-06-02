# PUERTA PROMETEO: La Noche del 0

PWA mobile-first para dirigir el one-shot desde iPhone: escenas ilustradas estilo RPG viejo, decisiones ramificadas, cultos rivales, mapa rioplatense, cartas rituales, recursos y d10 numografico.

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

- La pestaña RPG muestra escena, imagen, dialogos y decisiones.
- Algunas decisiones desbloquean rutas ocultas y guinos literarios.
- Tocar varias veces el sigilo del encabezado abre una nota al pie secreta.
- Las imagenes generadas estan optimizadas como WebP en `assets/scenes/`.
