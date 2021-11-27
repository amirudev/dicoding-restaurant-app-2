const version = '1.0.0';
const CACHE_NAME = `mypwa-${version}`;
const assetsToCache = [
    '/',
    '/index.html',
    'manifest.json',
    '/bundle.js'
];

const { Workbox } = import('workbox-window');
const wb = new Workbox('/service-worker.js');

wb.addEventListener('installing', event => {
    console.log('Installing Service Worker ...');
});

wb.addEventListener('installed', (event) => {
    caches.open(CACHE_NAME).then((cache) => {
        caches.addAll(assetsToCache);
    });
});

wb.addEventListener('activating', event => {
    console.log('Activating Service Worker ...');
});

wb.addEventListener('activated', (event) => {
    caches.keys().then(cacheNames => Promise.all(cacheNames.filter(name => name !== CACHE_NAME).map(filteredName => caches.delete(filteredName))));
});

wb.addEventListener('message', (event) => {
    console.log(event);
});