import 'regenerator-runtime';
import { clientsClaim } from 'workbox-core';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { ExpirationPlugin } from 'workbox-expiration';
import { precacheAndRoute } from "workbox-precaching";
import { NavigationRoute, registerRoute } from 'workbox-routing';
import { CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';
import CONFIG from './global/config';
// import CacheHelper from "./cache-helper";

const assetsToCache = [
  '/index.html',
  '/manifest.json',
  '/bundle.js',
];
const cacheAvailable = 'caches' in self;

clientsClaim();
self.skipWaiting();
precacheAndRoute(self.__WB_MANIFEST);

self.addEventListener('installed', event => {
  if(event.isUpdate){
    if(confirm('New app update is available, Click OK to refresh app')){
      window.location.reload();
    }
  }
});

// self.addEventListener('install', (event) => {
//   console.log('Installing service worker....');
  
//   event.waitUntil(
//     // CacheHelper.cachingAppShell(assetsToCache),
//     caches.open(CONFIG.CACHE_NAME)
//     .then(cache => cache.add(CONFIG.FALLBACK_HTML_URL))
//   );
// });

// self.addEventListener('activate', (event) => {
//   console.log('Activating service worker...');

//   event.waitUntil(
//     // CacheHelper.deleteOldCache(),
//   );
// });

// self.addEventListener('fetch', (event) => {
//   console.log(event.request);
 
//   // event.respondWith(CacheHelper.revalidateCache(event.request));
// });

registerRoute(
  ({url}) => url.origin === 'https://fonts.googleapis.com',
  new StaleWhileRevalidate({
    cacheName: `${CONFIG.CACHE_NAME}-google-fonts-stylesheets`,
  })
);

registerRoute(
  ({url}) => url.origin === 'https://fonts.gstatic.com',
  new CacheFirst({
    cacheName: `${CONFIG.CACHE_NAME}-google-fonts-webfonts`,
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30,
      }),
    ],
  })
);

// registerRoute(
//   ({url}) => url.origin === CONFIG.BASE_URL && url.pathname.startsWith('/list'),
//   new StaleWhileRevalidate({
//     cacheName: `${CONFIG.CACHE_NAME}-api-response`,
//     plugins:[
//       new CacheableResponsePlugin({
//         statuses: [0, 200]
//       }),
//       new ExpirationPlugin({
//         maxEntries: 60,
//         maxAgeSeconds: 60 * 60 * 24 * 30,
//       }),
//     ]
//   })
// );

registerRoute(
  ({url}) => url.origin === CONFIG.BASE_URL &&
             url.pathname.startsWith('/'),
  new CacheFirst({
    cacheName: `${CONFIG.CACHE_NAME}-api-response`,
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      })
    ]
  })
);

registerRoute(
  ({request}) => request.destination == 'image',
  new CacheFirst({
    cacheName: `${CONFIG.CACHE_NAME}-images`,
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200]
      }),
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 60 * 60 * 24 * 30,
      }),
    ]
  })
);

registerRoute(
  ({request}) => request.destination === 'script' || request.destination === 'style',
  new StaleWhileRevalidate({
    cacheName: `${CONFIG.CACHE_NAME}-static-resources`
  })
)