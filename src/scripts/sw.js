const version = '1.0.0';
const CACHE_NAME = `mypwa-${version}`;
const assetsToCache = [
    '/',
    '/index.html',
    'manifest.json',
    '/bundle.js'
];

self.addEventListener('installing', event => {
    console.log('Installing Service Worker ...');
});

self.addEventListener('installed', (event) => {
    caches.open(CACHE_NAME).then((cache) => {
        caches.addAll(assetsToCache);
    });
});

self.addEventListener('activating', event => {
    console.log('Activating Service Worker ...');
});

self.addEventListener('activated', (event) => {
    caches.keys().then(cacheNames => Promise.all(cacheNames.filter(name => name !== CACHE_NAME).map(filteredName => caches.delete(filteredName))));
});

self.addEventListener('message', (event) => {
    console.log(event);
});