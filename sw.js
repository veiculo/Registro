const CACHE_NAME = 'veiculos-v2';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './styles.css',
  './app.js',
  './icon-192.png',
  './icon-512.png'
];

// Instalação: Cache de recursos essenciais
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
  );
});

// Ativação: Limpeza de caches antigos
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      );
    })
  );
});

// Fetch: Estratégia Cache First com atualização
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request)
      .then(cachedRes => {
        const fetchPromise = fetch(e.request).then(networkRes => {
          // Atualiza o cache em segundo plano
          caches.open(CACHE_NAME).then(cache => cache.put(e.request, networkRes));
          return networkRes.clone();
        });
        return cachedRes || fetchPromise;
      })
      .catch(() => {
        // Fallback para páginas offline
        if (e.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      })
  );
});