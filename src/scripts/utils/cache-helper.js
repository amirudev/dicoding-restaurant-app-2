// import { CacheableResponsePlugin } from "workbox-cacheable-response";
// import { ExpirationPlugin } from "workbox-expiration";
// import { NavigationRoute, registerRoute } from "workbox-routing";
// import { CacheFirst, StaleWhileRevalidate } from "workbox-strategies";
// import CONFIG from "../global/config";

// // const staleWhileRevalidate = new StaleWhileRevalidate();
// const CacheHelper = {
//     // async cachingAppShell(requests){
//     //     const cache = await this._openCache();
//     //     cache.addAll(requests);
//     // },

//     // async deleteOldCache(){
//     //     const cacheNames = await caches.keys();
//     //     cacheNames
//     //     .filter(name => name !== CONFIG.CACHE_NAME)
//     //     .map(filteredName => caches.delete(filteredName));
//     // },

//     // async revalidateCache(request){
//     //     const response = await caches.match(request);

//     //     if(response){
//     //         return response;
//     //     }

//     //     return this._fetchRequest(request);
//     // },

//     // async _openCache(){
//     //     return caches.open(CONFIG.CACHE_NAME);
//     // },

//     // async _fetchRequest(request){
//     //     const response = await fetch(request);

//     //     if(!response || response.status !== 200){
//     //         return response;
//     //     }

//     //     await this._addCache(request);
//     //     return response;
//     // },

//     // async _addCache(request){
//     //     const cache = await this._openCache();
//     //     cache.add(request);
//     // },

//     // async staleRevalidateCache(params) {
//     //     try {
//     //         return await staleWhileRevalidate.handle(params);
//     //     } catch (err) {
//     //         return caches.match(CONFIG.FALLBACK_HTML_URL, {
//     //             cacheName: CONFIG.CACHE_NAME,
//     //         });
//     //     }
//     // },

//     // async staleWhileRevalidate(){
//     //     return workbox.strategies.StaleWhileRevalidate();
//     // }
// }

// export default CacheHelper;