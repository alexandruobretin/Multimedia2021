const cacheName = "space-invaders"
const filesToCache = ['game.html', 'game.js', '/']

/* Start the service worker and cache app's resources */
self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(cacheName).then((cache) => {
            return cache.addAll(filesToCache);
        })
    );
});

/* Serve cached resources when offline */
self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((response) => {
            return response || fetch(e.request);
        })
    );
});