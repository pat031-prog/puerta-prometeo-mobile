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
  "vercel.json"
];

await Promise.all(required.map((file) => access(new URL(`../${file}`, import.meta.url))));

const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
const app = await readFile(new URL("../app.js", import.meta.url), "utf8");
const sw = await readFile(new URL("../sw.js", import.meta.url), "utf8");
const manifest = JSON.parse(await readFile(new URL("../manifest.webmanifest", import.meta.url), "utf8"));

const sceneImageBlock = app.match(/const sceneImages = \{([\s\S]*?)\};/);

if (!sceneImageBlock) {
  throw new Error("Missing sceneImages map.");
}

const sceneImages = new Map(
  [...sceneImageBlock[1].matchAll(/^\s+([a-z0-9]+): "([^"]+)"/gm)].map((match) => [match[1], match[2]])
);
const usedImageKeys = [...app.matchAll(/image: "([^"]+)"/g)].map((match) => match[1]);

if (sceneImages.size < 12) {
  throw new Error("Expected a broad scene image set for the visual RPG flow.");
}

for (const key of usedImageKeys) {
  if (!sceneImages.has(key)) {
    throw new Error(`Scene references missing image key: ${key}`);
  }
}

await Promise.all(
  [...sceneImages.values()].map((path) => access(new URL(`..${path}`, import.meta.url)))
);

for (const path of sceneImages.values()) {
  if (!sw.includes(path)) {
    throw new Error(`Service worker does not precache scene image: ${path}`);
  }
}

if (!html.includes("viewport-fit=cover")) {
  throw new Error("Missing iPhone safe-area viewport setting.");
}

if (manifest.display !== "standalone") {
  throw new Error("Manifest must use standalone display mode.");
}

console.log("Static PWA validation passed.");
