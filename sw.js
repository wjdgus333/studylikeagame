// 오프라인 실행용. 인터넷이 되면 항상 최신 파일을 받고(캐시 문제 방지), 안 되면 저장된 파일로 실행
const CACHE = 'levelup-v26';
const LANGS = ['en', 'ja', 'es', 'pt', 'fr', 'de', 'id', 'vi', 'th', 'ru', 'tr', 'hi'];
const FILES = ['./', './index.html', './hero.js', './manifest.webmanifest', './icon.svg', './icon-192.png', './icon-512.png',
  './lang/keys.js', ...LANGS.map(l => `./lang/${l}.js`),
  ...[1, 2, 3, 4, 5, 6, 7].map(i => `./images/samtaegeuk-${i}.png`), ...[1, 2, 3, 4, 5].map(i => `./images/goryeo-${i}.png`)];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request, { cache: 'no-cache' })
      .then(res => {
        if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); }
        return res;
      })
      .catch(() => caches.match(e.request, { ignoreSearch: true }))
  );
});
