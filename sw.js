const CACHE_NAME = 'my-pwa-cache-v1';
const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/styles/styles.css',

  '/scripts/about.js',
  '/scripts/add_cash_flow.js',
  '/scripts/androidPipeline.js',
  '/scripts/collections.js',
  '/scripts/db.js',
  '/scripts/donation.js',
  '/scripts/edit_cash_flow.js',
  '/scripts/home.js',
  '/scripts/import_export.js',
  '/scripts/setCurrency.js',
  '/scripts/splash.js',
  '/scripts/stat.js',
  '/scripts/translate.js',

  '/libs/afro.js',
  '/libs/jsstore.js',
  '/libs/jsstore.worker.js',

  '/icons/icon-192.png',
  '/icons/icon-512.png',

  '/assets/fonts/Raleway-Black.ttf',
  '/assets/fonts/Raleway-Regular.ttf',

  '/assets/images/add.svg',
  '/assets/images/afro.svg',
  '/assets/images/back.svg',
  '/assets/images/close.svg',
  '/assets/images/collection.svg',
  '/assets/images/copy.svg',
  '/assets/images/db.svg',
  '/assets/images/delete.svg',
  '/assets/images/dropdown.svg',
  '/assets/images/email.svg',
  '/assets/images/empty.svg',
  '/assets/images/export.svg',
  '/assets/images/hidden.svg',
  '/assets/images/import.svg',
  '/assets/images/info.svg',
  '/assets/images/like.svg',
  '/assets/images/msg_delete.svg',
  '/assets/images/msg_edit.svg',
  '/assets/images/mtn.png',
  '/assets/images/orange.png',
  '/assets/images/sekhmet_fav.png',
  '/assets/images/sekhmet.svg',
  '/assets/images/stat.svg',
  '/assets/images/visible.svg',
  '/assets/images/wa.svg',
];

// Install event: cache all files initially
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting(); // activate new service worker immediately
});

// Activate event: clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim(); // take control of all pages immediately
});

// Fetch event: network-first strategy
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Successful response – update cache
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, responseClone));
        return response;
      })
      .catch(() => {
        // If network fails, try cache
        return caches.match(event.request);
      })
  );
});