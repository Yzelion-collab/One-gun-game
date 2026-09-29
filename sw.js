const V='ogs-v1',F=['./','index.html','manifest.json','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(F)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
// offline-first, refreshes the cache in the background so updates arrive on the next launch
self.addEventListener('fetch',e=>{if(e.request.method!='GET')return;
e.respondWith(caches.open(V).then(c=>c.match(e.request).then(r=>{const n=fetch(e.request).then(x=>{if(x.ok)c.put(e.request,x.clone());return x}).catch(()=>r);return r||n})))});
