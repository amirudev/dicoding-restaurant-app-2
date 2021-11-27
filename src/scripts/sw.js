importScripts('workbox');

const version = '1.0.0';
const CACHE_NAME = `mypwa-${version}`;

workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);