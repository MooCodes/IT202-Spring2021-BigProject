const cacheName = "ali-baig-it202-big-project"
const assets = [
    "./",
    "./index.html",
    "./my_db.js",
    "./player_compare.js"
]

self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
        caches.open(cacheName).then(cache => {
            cache.addAll(assets)
        })
    )
})

self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
        caches.match(fetchEvent.request).then(res => {
            return res || fetch(fetchEvent.request)
        })
    )
})