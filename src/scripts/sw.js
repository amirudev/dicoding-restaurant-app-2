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

precacheAndRoute(self.__WB_MANIFEST);

if(CONFIG.MODE == 'PRODUCTION'){
  clientsClaim();
  self.skipWaiting();
  
  self.addEventListener('installed', event => {
    if(event.isUpdate){
      if(confirm('New app update is available, Click OK to refresh app')){
        window.location.reload();
      }
    }
  });
  
  registerRoute(
    new CacheHelper.cacheFontStylesheet(),
  );
  
  registerRoute(
    new CacheHelper.cacheFontWebfonts(),
  );
  
  registerRoute(
    new CacheHelper.cacheApiResponse(),
  );
  
  registerRoute(
    new CacheHelper.cacheAssetsImages(),
  );
  
  registerRoute(
    new CacheHelper.cacheAssetsResources(),
  )
} else {
  caches.keys()
  .then(cacheNames => {
    cacheNames.forEach(cacheName => {
      caches.delete(cacheName);
    });
  });

  console.log(`You're running on Development mode, caches are deleted and disabled, please refer to .env in root folder in order to change to Production mode`);
  console.log(`Mode: ${process.env.MODE}`);
}