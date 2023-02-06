module.exports = {
  pwa: {
    workboxOptions: {
      runtimeCaching:[{
        urlPattern: /\.png$/,
        handler: 'CacheFirst',
        options: {
          cacheName: 'png-cache',
          expiration: {
            maxEntries: 10, // 총 파일 10개까지 캐시
            maxAgeSeconds: 60 * 60 * 24 * 365, // 1년 캐시
          }
        }
      },
      {
        urlPattern:/\.json$/,
        handler: 'StleWhileRevalidate',
        options: {
          cacheName:'icon-cache',
          cacheableResponse: {
            status:[200]
          }
        },
      }
    ],
  }
},

// transpileDependencies: 