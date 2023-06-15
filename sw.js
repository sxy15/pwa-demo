const cacheName = 'v1';
self.addEventListener('install', async (event) => {
  console.log('SW Installed');
  const cache = await caches.open(cacheName);
  await cache.addAll(['/', '/index.html', '/image/icon.png', '/index.css', '/manifest.json'])
  await self.skipWaiting();
})

self.addEventListener('activate', async (event) => {
  console.log('SW Activated');
  const keys = await caches.keys();
  keys.forEach(key => {
    if (key !== cacheName) {
      caches.delete(key);
    }
  })
  await self.clients.claim()
})

// http://localhost:8080/index.html
self.addEventListener('fetch', (event) => {
  console.log('SW Fetching');
  console.log(event.request.url);
  const req = event.request;
  event.respondWith(networkFirst(req));
})

async function cacheFirst(req) {}

async function networkFirst(req) {
  try {
   const fresh = await fetch(req);
    return fresh;
  } catch (error) {
    const cache = await caches.open(cacheName);
    const cached = await cache.match(req);
    return cached;
  }
}