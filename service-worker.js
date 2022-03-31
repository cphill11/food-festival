// first step of process; list first four global constants are standard for this process
const APP_PREFIX = "FoodFest-";
const VERSION = "version_01";
// set cache as global constant to keep track of which cache to use
const CACHE_NAME = APP_PREFIX + VERSION;

// relative paths used in lieu of hardcoding b/c of production environment; do not include images 2/2 cache limit, prioritize caching JS & HTML
const FILES_TO_CACHE = [
  "./index.html",
  "./events.html",
  "./tickets.html",
  "./schedule.html",
  "./assets/css/style.css",
  "./assets/css/bootstrap.css",
  "./assets/css/tickets.css",
  "./dist/app.bundle.js",
  "./dist/events.bundle.js",
  "./dist/tickets.bundle.js",
  "./dist/schedule.bundle.js",
];

// standard 2nd step for this process; use self.addEventListener in place of window.addEventListener to have 'self' instatiate listeners on server worker
self.addEventListener("install", function (e) {
  // add event waitUntil() fxn to have app wait until work is complete to terminate service worker
  e.waitUntil(
    // use caches.open to find specific cache by name
    caches.open(CACHE_NAME).then(function (cache) {
      console.log("installing cache : " + CACHE_NAME);
      // add every file in FILES_TO_CACHE to array
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

// standard 3rd step for this process; event listener to activate event
self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (keyList) {
      // `keyList` contains all cache names under your username.github.io
      // filter out ones that has this app prefix to create keeplist
      let cacheKeeplist = keyList.filter(function (key) {
        return key.indexOf(APP_PREFIX);
      });
      // add current cache name to keeplist
      cacheKeeplist.push(CACHE_NAME);

      return Promise.all(
        keyList.map(function (key, i) {
          if (cacheKeeplist.indexOf(key) === -1) {
            console.log("deleting cache : " + keyList[i]);
            return caches.delete(keyList[i]);
          }
        })
      );
    })
  );
});

// standard 4th step for this process; listen for response of cached resources
self.addEventListener("fetch", function (e) {
  // listen for event, fetch event, log URL of requested resource
  console.log("fetch request : " + e.request.url);
  e.respondWith(
    // if resource matches one already saved in cache, URL will be logged
    caches.match(e.request).then(function (request) {
      if (request) {
        // if cache is available, respond with cache
        console.log("responding with cache : " + e.request.url);
        return request;
      } else {
        // if there are no cache, try fetching request from online network
        console.log("file is not cached, fetching : " + e.request.url);
        return fetch(e.request);
      }
    })
  );
});
