var CACHE_KEY = "barley-break-offline";

var offlineFallbackPage = "index.html";

self.addEventListener("install", function (event) {
  console.info("[ PWA ] Install Event processing");

  event.waitUntil(
    caches.open(CACHE_KEY).then(function (cache) {
      console.info("[ PWA ] Cached offline page during install");
      return cache.add(offlineFallbackPage);
    })
  );
}, {once: true, passive: true});

self.addEventListener("fetch", function (event) {
  if (event.request.method !== "GET" || event.request.url.indexOf('http') !== 0) {return;}

  event.respondWith(
    fetch(event.request)
      .then(function (response) {
        console.info("[ PWA ] add page to offline cache: " + response.url);
        event.waitUntil(updateCache(event.request, response.clone()));
        return response;
      })
      .catch(function (error) {
        console.info("[ PWA ] Network request Failed. Serving content from cache: " + error);
        return fromCache(event.request);
      })
  );
}, {passive: true});

function fromCache(request) {
  return caches.open(CACHE_KEY).then(function (cache) {
    return cache.match(request).then(function (matching) {
      if (!matching || matching.status === 404) {
        return Promise.reject("no-match");
      }

      return matching;
    });
  });
}

function updateCache(request, response) {
  return caches.open(CACHE_KEY).then(function (cache) {
    return cache.put(request, response).catch((err) => {
      console.log('\nrequest:');
      console.log(request);
      console.log('\nresponse:');
      console.log(response);
      console.log('\nerror:');
      console.log(err);
      console.log('==========================');
    });
  });
}
