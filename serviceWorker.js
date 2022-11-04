const staticQuizzApp = "quizz-app-site-v1"
const assets = [
    "/",
    "/index.html",
    "./src/css/style.css",
    "./src/css/lib.css",
    "./src/js/main.js",
    "./src/js/lib.js",
]

self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
    caches.open(staticQuizzApp).then(cache => {
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