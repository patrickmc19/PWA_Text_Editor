const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
}); 

warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// the code below implements caching for the assets
registerRoute(
    ({ request }) => request.destination === 'script' || request.destination === 'style' || request.destination === 'worker',
    new CacheFirst({
        cacheName: 'assets-cache',
        plugins: [
            new CacheableResponsePlugin({
                statuses: [0, 200],
            }),
        ],
    })
);

offlineFallback({
    pageFallback: '/index.html',
    imageFallback: '/images/logo.png',
    pageFallbackPath: '/index.html',
    imageFallbackPath: '/images/logo.png',
    cacheImages: true,
    cacheFallbackPath: '/index.html',
    cacheName: 'offline-fallback',
    fallbackURL: '/index.html',
    cacheableResponse: { statuses: [0, 200] },
    broadcastUpdate: {
        channelName: 'offline-fallback',
    },
    plugins: [
        new CacheableResponsePlugin({
            statuses: [0, 200],
        }),
    ],
});