import 'regenerator-runtime';
import { clientsClaim } from 'workbox-core';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { ExpirationPlugin } from 'workbox-expiration';
import { precacheAndRoute } from "workbox-precaching";
import { NavigationRoute, registerRoute } from 'workbox-routing';
import { CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';
import CONFIG from './global/config';

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

registerRoute(
  new RegExp(CONFIG.BASE_URL),
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