const BASE = new URL('./', self.location.href);
const PREFIX = 'laufstark-pwa-' + encodeURIComponent(BASE.pathname) + '-';
const CACHE = PREFIX + '54b8e1fb0e84';
const ASSETS = ["index.html", "app.js", "data.js", "pwa.js", "manifest.webmanifest", "icon-180.png", "icon-192.png", "icon-512.png"].map(path => new URL(path, BASE).href);
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS.map(url => new Request(url, {cache: 'reload'})))));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith(PREFIX) && key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== BASE.origin || !url.pathname.startsWith(BASE.pathname)) return;
  url.search = ''; url.hash = '';
  const isEntry = event.request.mode === 'navigate' && (url.pathname === BASE.pathname || url.pathname === BASE.pathname + 'index.html');
  const target = isEntry ? ASSETS[0] : url.href;
  if (!ASSETS.includes(target)) return;
  event.respondWith(caches.open(CACHE).then(cache => cache.match(target)).then(cached => cached || fetch(event.request)));
});
