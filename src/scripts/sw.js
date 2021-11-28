import 'regenerator-runtime';
import { precacheAndRoute } from "workbox-precaching";
import CONFIG from './global/config';
import CacheHelper from "./utils/cache-helper";

const assetsToCache = [
  '/index.html',
  '/manifest.json',
  '/bundle.js',
];
const cacheAvailable = 'caches' in self;

precacheAndRoute(self.__WB_MANIFEST);

self.addEventListener('install', (event) => {
  console.log('Installing service worker....');
  
  event.waitUntil(
    CacheHelper.cachingAppShell(assetsToCache),
  );
});

self.addEventListener('activate', (event) => {
  console.log('Activating service worker...');

  event.waitUntil(
    CacheHelper.deleteOldCache(),
  );
});

self.addEventListener('fetch', (event) => {
  console.log(event.request);
 
  event.respondWith(CacheHelper.revalidateCache(event.request));
});