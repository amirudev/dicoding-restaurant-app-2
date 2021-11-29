const { CONFIG } = require("../global/config")

const CacheHelper = {
    async cacheFontStylesheet(){
        ({url}) => url.origin === CONFIG.FONT_STYLESHEET_URL,
        new StaleWhileRevalidate({
            cacheName: `${CONFIG.CACHE_NAME}-google-fonts-stylesheets`,
        })
    },

    async cacheFontWebfonts(){
        ({url}) => url.origin === CONFIG.FONT_WEBFONT_URL,
        new CacheFirst({
            cacheName: `${CONFIG.CACHE_NAME}-google-fonts-webfonts`,
            plugins: [
                new CacheableResponsePlugin({
                    statuses: [0, 200],
                }),
                new ExpirationPlugin({
                    maxAgeSeconds: CONFIG.DEFAULT_CACHE_EXPIRED,
                }),
            ],
        })
    },

    async cacheApiResponse(){
        new RegExp(CONFIG.BASE_URL),
        new StaleWhileRevalidate({
            cacheName: `${CONFIG.CACHE_NAME}-api-response`,
            plugins: [
                new CacheableResponsePlugin({
                    statuses: [0, 200],
                })
            ]
        })
    },

    async cacheAssetsImages(){
        ({request}) => request.destination == 'image',
        new CacheFirst({
            cacheName: `${CONFIG.CACHE_NAME}-images`,
            plugins: [
                new CacheableResponsePlugin({
                    statuses: [0, 200]
                }),
                new ExpirationPlugin({
                    maxAgeSeconds: CONFIG.DEFAULT_CACHE_EXPIRED,
                }),
            ]
        })
    },

    async cacheAssetsResources(){
        ({request}) => request.destination === 'script' || request.destination === 'style',
        new StaleWhileRevalidate({
            cacheName: `${CONFIG.CACHE_NAME}-static-resources`
        })
    }
}

export default CacheHelper;