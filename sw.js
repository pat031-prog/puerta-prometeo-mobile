const CACHE_NAME = "puerta-prometeo-v3";
const ASSETS = [
  "/",
  "/index.html",
  "/styles.css",
  "/app.js",
  "/manifest.webmanifest",
  "/assets/icon.svg",
  "/assets/apple-touch-icon.png",
  "/assets/icon-192.png",
  "/assets/icon-512.png",
  "/assets/numogram.svg",
  "/assets/scenes/puerta-prometeo.webp",
  "/assets/scenes/archivo-echeverria.webp",
  "/assets/scenes/cthonfuego-datacenter.webp",
  "/assets/scenes/zona0-comunicado.webp",
  "/assets/scenes/puerto-ritual.webp",
  "/assets/scenes/hospital-rutina.webp",
  "/assets/scenes/bolsa-oraculo.webp",
  "/assets/scenes/fork-maquina.webp",
  "/assets/scenes/subsuelo-cthonfuego.webp",
  "/assets/scenes/catedral-derrame.webp",
  "/assets/scenes/frontera-yuyo.webp",
  "/assets/scenes/archivo-aleph.webp",
  "/assets/scenes/apertura-final.webp",
  "/assets/scenes/piedra-host.webp",
  "/assets/scenes/nota-al-pie.webp"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return response;
      });
    })
  );
});
