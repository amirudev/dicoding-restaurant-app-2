// importScripts('workbox-precaching');
import { precacheAndRoute } from "workbox-precaching";

const version = '1.0.0';
const CACHE_NAME = `mypwa-${version}`;
const assetsToCache = [
    '/',
    '/index.html',
    '/manifest.json',
    '/bundle.js',
    // .......
   ];

precacheAndRoute(self.__WB_MANIFEST);
    
self.addEventListener('install', (event) => {
  console.log('Installing service worker....');
  
  self.skipWaiting();
  
  // menyimpan appshell ke caches API
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(assetsToCache),),
  );

  console.log(event);
});

self.addEventListener('activate', (event) => {
  console.log('Activating service worker...');
  
  // menghapus caches lama
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => Promise.all(
        cacheNames.filter((name) => name !== CACHE_NAME)
          .map((filteredName) => caches.delete(filteredName))
      )),
  );
 });