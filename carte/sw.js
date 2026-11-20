/* Fonctionnement hors ligne de la carte.
   Page et listes de pays : réseau d'abord (pour recevoir les mises à jour), cache si hors ligne.
   Fond de carte, icônes, polices : cache d'abord. */
const CACHE = "carte-v9";
const SHELL = ["./", "index.html", "monde.json", "mes-pays.json", "manifest.webmanifest", "icon-180.png", "icon-192.png", "icon-512.png", "globe-nuit.jpg"];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith("carte-") && k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const req = e.request;
  if(req.method !== "GET") return;
  const url = new URL(req.url);
  const same = url.origin === self.location.origin;
  const fresh = same && (req.mode === "navigate" || url.pathname.endsWith("/") || url.pathname.endsWith(".html") || url.pathname.endsWith("mes-pays.json"));
  if(fresh){
    e.respondWith(fetch(req, { cache: "no-cache" }).then(res => {
      if(res.ok){ const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
      return res;
    }).catch(() => caches.match(req, { ignoreSearch: true }).then(r => r || caches.match("index.html"))));
    return;
  }
  e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => {
    if(res.ok || res.type === "opaque"){ const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
    return res;
  })));
});
