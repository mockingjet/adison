workbox.skipWaiting()
workbox.clientsClaim()

workbox.precaching.precacheAndRoute(self.__precacheManifest || [])


  // .catch(function (err) {
  //   return caches.open(CACHE_STATIC_NAME) 
  //     .then(function(cache){
  //       return cache.match('/offline.html')
  //     })
  // })
