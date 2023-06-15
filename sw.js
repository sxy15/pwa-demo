self.addEventListener('install', function(event) {
  console.log('SW Installed');
})

self.addEventListener('activate', function(event) {
  console.log('SW Activated');
})

self.addEventListener('fetch', function(event) {
  console.log('SW Fetching');
})