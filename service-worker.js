"use strict";var precacheConfig=[["/stanford-pokemon/index.html","4d2e6ec87378738857b544430df6cec6"],["/stanford-pokemon/static/css/main.21ae89c0.css","ed72baf442353e44451f67a54075fbb0"],["/stanford-pokemon/static/js/main.6aaeef29.js","a7a9c2f862a40e6cf4755810c3a53d08"],["/stanford-pokemon/static/media/pkmndp-webfont.4c4afb8a.woff2","4c4afb8acd4cc7abf5f562f37e940cf4"],["/stanford-pokemon/static/media/pkmndp-webfont.70a5dcc4.woff","70a5dcc49df3656bd667f67a07fb9b4c"],["/stanford-pokemon/static/media/pkmndpb-webfont.04b7aa84.woff2","04b7aa84caed763e423c126d74bbed0a"],["/stanford-pokemon/static/media/pkmndpb-webfont.a305d3e7.woff","a305d3e7389109bbac5455bca9c65405"],["/stanford-pokemon/static/media/pkmnem-webfont.1803bdf0.woff2","1803bdf00d484a2a774851064a293be6"],["/stanford-pokemon/static/media/pkmnem-webfont.7080a22b.woff","7080a22bab9100167f08734e030a26c5"],["/stanford-pokemon/static/media/pkmnemn-webfont.a927dac7.woff","a927dac7edb29fedfaae614b2bc49d43"],["/stanford-pokemon/static/media/pkmnemn-webfont.e0e2159f.woff2","e0e2159f381484d755180291def70bc1"],["/stanford-pokemon/static/media/pkmnems-webfont.1d175c4c.woff","1d175c4ccba12fec26ded567533d78d9"],["/stanford-pokemon/static/media/pkmnems-webfont.4e159501.woff2","4e1595015605250c15afdb614550d110"],["/stanford-pokemon/static/media/pkmnfl-webfont.2bf6bb69.woff2","2bf6bb692088310fc0fb8b4497a0e52b"],["/stanford-pokemon/static/media/pkmnfl-webfont.2f0f284c.woff","2f0f284cf5599e2767e44877108b9aae"],["/stanford-pokemon/static/media/pkmnrs-webfont.3652aaa0.woff2","3652aaa0f3973161bad5df52f50562d8"],["/stanford-pokemon/static/media/pkmnrs-webfont.88f97b02.woff","88f97b021609a9bd8826458b9ccbfe07"],["/stanford-pokemon/static/media/pkmnrsi-webfont.b887d1fc.woff","b887d1fc0f9de7d932e790e681baa7ee"],["/stanford-pokemon/static/media/pkmnrsi-webfont.da88738b.woff2","da88738bb3a9dbcaec2a9dab600c1b81"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,n){var t=new URL(e);return"/"===t.pathname.slice(-1)&&(t.pathname+=n),t.toString()},cleanResponse=function(n){return n.redirected?("body"in n?Promise.resolve(n.body):n.blob()).then(function(e){return new Response(e,{headers:n.headers,status:n.status,statusText:n.statusText})}):Promise.resolve(n)},createCacheKey=function(e,n,t,a){var r=new URL(e);return a&&r.pathname.match(a)||(r.search+=(r.search?"&":"")+encodeURIComponent(n)+"="+encodeURIComponent(t)),r.toString()},isPathWhitelisted=function(e,n){if(0===e.length)return!0;var t=new URL(n).pathname;return e.some(function(e){return t.match(e)})},stripIgnoredUrlParameters=function(e,t){var n=new URL(e);return n.hash="",n.search=n.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(n){return t.every(function(e){return!e.test(n[0])})}).map(function(e){return e.join("=")}).join("&"),n.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var n=e[0],t=e[1],a=new URL(n,self.location),r=createCacheKey(a,hashParamName,t,/\.\w{8}\./);return[a.toString(),r]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(a){return setOfCachedUrls(a).then(function(t){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(n){if(!t.has(n)){var e=new Request(n,{credentials:"same-origin"});return fetch(e).then(function(e){if(!e.ok)throw new Error("Request for "+n+" returned a response with status "+e.status);return cleanResponse(e).then(function(e){return a.put(n,e)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var t=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(n){return n.keys().then(function(e){return Promise.all(e.map(function(e){if(!t.has(e.url))return n.delete(e)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(n){if("GET"===n.request.method){var e,t=stripIgnoredUrlParameters(n.request.url,ignoreUrlParametersMatching),a="index.html";(e=urlsToCacheKeys.has(t))||(t=addDirectoryIndex(t,a),e=urlsToCacheKeys.has(t));var r="/stanford-pokemon/index.html";!e&&"navigate"===n.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],n.request.url)&&(t=new URL(r,self.location).toString(),e=urlsToCacheKeys.has(t)),e&&n.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(t)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(e){return console.warn('Couldn\'t serve response for "%s" from cache: %O',n.request.url,e),fetch(n.request)}))}});