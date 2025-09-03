const CACHE_NAME = 'supervision-jaen-v1';
const ASSETS = [
  '/', // si lo sirves desde la raíz
  '/Supervision_Reservorios_Jaen.html',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js'
];

self.addEventListener('install', ev => {
  ev.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)).then(()=> self.skipWaiting())
  );
});

self.addEventListener('activate', ev => {
  ev.waitUntil(clients.claim());
});

self.addEventListener('fetch', ev => {
  ev.respondWith(
    caches.match(ev.request).then(resp => resp || fetch(ev.request).catch(()=> caches.match('/Supervision_Reservorios_Jaen.html')))
  );
});
