import { access, readFile } from "node:fs/promises";

const required = [
  "index.html",
  "styles.css",
  "app.js",
  "sw.js",
  "manifest.webmanifest",
  "assets/apple-touch-icon.png",
  "assets/icon-192.png",
  "assets/icon-512.png",
  "assets/icon.svg",
  "assets/numogram.svg",
  "assets/scenes/puerta-prometeo.webp",
  "assets/scenes/archivo-echeverria.webp",
  "assets/scenes/cthonfuego-datacenter.webp",
  "vercel.json"
];

await Promise.all(required.map((file) => access(new URL(`../${file}`, import.meta.url))));

const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
const manifest = JSON.parse(await readFile(new URL("../manifest.webmanifest", import.meta.url), "utf8"));

if (!html.includes("viewport-fit=cover")) {
  throw new Error("Missing iPhone safe-area viewport setting.");
}

if (manifest.display !== "standalone") {
  throw new Error("Manifest must use standalone display mode.");
}

console.log("Static PWA validation passed.");
