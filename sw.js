const CACHE = 'anacalc-v1';
const ASSETS = [
  './',
  './index.html',
  './css/calculator.css',
  './css/tabs.css',
  './js/calculator.js',
  './js/schematics.js',
  './js/diopter.js',
  './js/cbpFWTabs.js',
  './js/modernizr.custom.js',
  './img/calc.jpg',
  './img/diop.jpg',
  './img/crop.png',
  './img/reducer.png',
  './img/ana.png',
  './img/sf.png',
  './img/tklens.png',
  './img/favicon.ico',
  './img/icon-192.png',
  './img/icon-512.png',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
