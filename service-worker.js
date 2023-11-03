//Nombre del cache
const cacheName = 'proyecto';

//Archivos y recursos para almacenar en cache
const cacheAssets = [
    'index.html',
    'main.js',
    'pagina1.html',
    'pagina2.html',
    'servicios.html',
    'contacto.html',
    'img/cerebro.jpg',
    'img/cerebro1.jpg',
    'img/cerebro2.jpg',
    'img/cerebro3.jpg',
    'img/cerebro4.jpg',
    'img/cerebro5.jpeg',
    'img/cerebro6.jpeg',
    'img/cerebro7.png',
    'img/cerebro8.jpg',
    'img/cerebro9.png',
    'img/cerebro10.png',
    'img/cerebro11.png',
    'img/cerebro12.jpg',
    'img/ilustracion2.svg',
    'img/portada.jpg',
    'img/awp1.jpg',
    'img/img5.jpg',
    'img/img7.jpg',
    'img/favicon.ico',
    // Agrega más imágenes o recursos según sea necesario
];

// Instalar el service worker
self.addEventListener('install', (event) => {
    console.log('Service Worker: Instalado');
    
    // Precarga de los recursos para guardar en caché
    event.waitUntil(
        caches.open(cacheName)
        .then((cache) => {
            console.log('Service Worker: Cachear archivos.');
            return cache.addAll(cacheAssets);
        })
        .then(() => self.skipWaiting())
    );
});

// Activar el Service Worker
self.addEventListener('activate' , (event) => {
    console.log('Service Worker: Activado');

    // Eliminar caches antiguas
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all (
                cacheNames.map(cache => {
                    if (cache !== cacheName) {
                        console.log('Service Worker: Limpiando el caché antiguo');
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// Escuchamos el evento push para mostrar una notificación
self.addEventListener('push', function(event) {
    console.log('[Service Worker] Push Recibido');
    console.log(`[Service Worker] Datos del Push: "${event.data.text()}"`);

    // Usamos Const para manejar y controlar las notificaciones del service worker y la API Implementada.
    const title = 'No se duerman';
    const options = {
        body: event.data.text(),
        icon: 'icono.png',
        badge: 'insignia.png'
    };

    event.waitUntil(self.registration.showNotification(title, options));
});

// Manejamos peticiones
self.addEventListener('fetch', (event) => {
    console.log('Service Worker: Fetching');
    event.respondWith(
        fetch(event.request)
        .then(response => {
            const clonedResponse = response.clone();
            caches.open(cacheName).then(cache => {
                cache.put(event.request, clonedResponse);
            });
            return response;
        })
        .catch(() => caches.match(event.request).then(response => response))
    );
});
