const CACHE_NAME = 'todo-pwa-cache-v1';
const urlsToCache = [
  '',
  '/to-do-PWA/assets/imgs/to-do-list.png',
  '/to-do-PWA/html/index.html',
  '/to-do-PWA/css/style.css',
  '/to-do-PWA/js/app.js',
  '/to-do-PWA/manifest.json',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});