var CACHE = "pwabuilder-offline";

var offlineFallbackPage = "index.html";

self.addEventListener("install", function (event) {
  console.info("[PWA Builder] Install Event processing");

  event.waitUntil(
    caches.open(CACHE).then(function (cache) {
      console.info("[PWA Builder] Cached offline page during install");      
      return cache.add(offlineFallbackPage);
    })
  );
});

self.addEventListener("fetch", function (event) {
  if (!(event.request.url.indexOf('http') === 0)) {console.log(event)}
  if (event.request.method !== "GET" || !(event.request.url.indexOf('http') === 0)) return;

  event.respondWith(
    fetch(event.request)
      .then(function (response) {
        console.info("[PWA Builder] add page to offline cache: " + response.url);
        event.waitUntil(updateCache(event.request, response.clone()));
        return response;
      })
      .catch(function (error) {
        console.info("[PWA Builder] Network request Failed. Serving content from cache: " + error);
        return fromCache(event.request);
      })
  );
});

function fromCache(request) {
  return caches.open(CACHE).then(function (cache) {
    return cache.match(request).then(function (matching) {
      if (!matching || matching.status === 404) {
        return Promise.reject("no-match");
      }

      return matching;
    });
  });
}

function updateCache(request, response) {
  return caches.open(CACHE).then(function (cache) {
    return cache.put(request, response);
  });
}
