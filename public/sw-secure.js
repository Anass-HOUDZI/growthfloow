const CACHE_NAME = 'GrowthFlow-v1.0.0';
const STATIC_CACHE = 'static-cache-v1';
const DYNAMIC_CACHE = 'dynamic-cache-v1';
const API_CACHE = 'api-cache-v1';

// Security headers for all responses
const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:;"
};

// Secure logging function
const secureLog = (level, message, data = null) => {
  if ('development' === 'production') return;
  
  const logData = {
    level,
    message,
    timestamp: new Date().toISOString(),
    ...(data && { data })
  };
  
  console[level]('[SW-Secure]', logData);
};

// Critical resources to cache
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json',
  '/icon-192x192.png',
  '/icon-512x512.png'
];

// External APIs to cache with network-first strategy
const API_ENDPOINTS = [
  'https://api.example.com',
  'https://external-api.com'
];

// Service worker installation
self.addEventListener('install', (event) => {
  secureLog('info', 'Installing service worker');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        secureLog('info', 'Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        secureLog('info', 'Skip waiting');
        return self.skipWaiting();
      })
      .catch((error) => {
        secureLog('error', 'Installation failed', { error: error.message });
      })
  );
});

// Service worker activation
self.addEventListener('activate', (event) => {
  secureLog('info', 'Activating service worker');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && 
                cacheName !== DYNAMIC_CACHE && 
                cacheName !== API_CACHE) {
              secureLog('info', 'Deleting old cache', { cacheName });
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        secureLog('info', 'Claiming clients');
        return self.clients.claim();
      })
      .catch((error) => {
        secureLog('error', 'Activation failed', { error: error.message });
      })
  );
});

// Add security headers to response
function addSecurityHeaders(response) {
  const newHeaders = new Headers(response.headers);
  
  Object.entries(SECURITY_HEADERS).forEach(([key, value]) => {
    newHeaders.set(key, value);
  });
  
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders
  });
}

// Enhanced security-focused request interceptor
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Enhanced sensitive URL patterns
  const sensitivePatterns = [
    /\/api\//,
    /\/auth\//,
    /\/login/,
    /\/admin/,
    /\/secure/,
    /\/private/,
    /token/,
    /key/,
    /password/,
    /secret/,
    /session/,
    /oauth/,
    /credentials/
  ];
  
  const isSensitive = sensitivePatterns.some(pattern => pattern.test(url.pathname));
  
  // Security validation
  if (isSensitive) {
    secureLog('debug', 'Skipping cache for sensitive URL', { url: url.pathname });
    event.respondWith(
      fetch(request)
        .then(response => addSecurityHeaders(response))
        .catch(() => new Response('Service unavailable', { status: 503 }))
    );
    return;
  }

  // Validate request method
  const allowedMethods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];
  if (!allowedMethods.includes(request.method)) {
    event.respondWith(new Response('Method not allowed', { status: 405 }));
    return;
  }

  // Cache-first strategy for static assets
  if (STATIC_ASSETS.some(asset => request.url.includes(asset))) {
    event.respondWith(cacheFirst(request));
    return;
  }

  // Network-first strategy for external APIs
  if (API_ENDPOINTS.some(endpoint => request.url.includes(endpoint))) {
    event.respondWith(networkFirstSecure(request));
    return;
  }

  // Stale-while-revalidate strategy for the rest
  event.respondWith(staleWhileRevalidate(request));
});

// Cache-first strategy with security headers
async function cacheFirst(request) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return addSecurityHeaders(cachedResponse);
    }
    
    const networkResponse = await fetch(request);
    
    // Validate response before caching
    if (networkResponse.status === 200) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return addSecurityHeaders(networkResponse);
  } catch (error) {
    secureLog('error', 'Cache first failed', { error: error.message, url: request.url });
    return new Response('Offline content not available', { 
      status: 503,
      headers: SECURITY_HEADERS
    });
  }
}

// Enhanced secure network-first strategy
async function networkFirstSecure(request) {
  try {
    const networkResponse = await fetch(request);
    
    // Enhanced response validation
    if (networkResponse.status === 200 && 
        networkResponse.headers.get('content-type')) {
      
      const contentType = networkResponse.headers.get('content-type');
      const allowedTypes = [
        'application/json',
        'text/plain',
        'text/html',
        'application/javascript',
        'text/css',
        'image/'
      ];
      
      const isAllowedType = allowedTypes.some(type => contentType.includes(type));
      const hasIntegrity = networkResponse.headers.get('content-length');
      
      if (isAllowedType && hasIntegrity) {
        const cache = await caches.open(API_CACHE);
        cache.put(request, networkResponse.clone());
      }
    }
    
    return addSecurityHeaders(networkResponse);
  } catch (error) {
    secureLog('warn', 'Network first failed, trying cache', { error: error.message, url: request.url });
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return addSecurityHeaders(cachedResponse);
    }
    return new Response('Content not available offline', { 
      status: 503,
      headers: SECURITY_HEADERS
    });
  }
}

// Stale-while-revalidate with security headers
async function staleWhileRevalidate(request) {
  const cache = await caches.open(DYNAMIC_CACHE);
  const cachedResponse = await cache.match(request);
  
  const fetchPromise = fetch(request).then((networkResponse) => {
    if (networkResponse.status === 200) {
      cache.put(request, networkResponse.clone());
    }
    return addSecurityHeaders(networkResponse);
  }).catch((error) => {
    secureLog('warn', 'Network fetch failed in stale-while-revalidate', { 
      error: error.message, 
      url: request.url 
    });
    return null;
  });

  if (cachedResponse) {
    return addSecurityHeaders(cachedResponse);
  }
  
  return fetchPromise || new Response('Content not available', { 
    status: 503,
    headers: SECURITY_HEADERS
  });
}

// Enhanced background sync
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    secureLog('info', 'Background sync triggered');
    event.waitUntil(handleBackgroundSync());
  }
});

async function handleBackgroundSync() {
  try {
    const pendingData = await getPendingData();
    if (pendingData.length > 0) {
      await syncPendingData(pendingData);
      secureLog('info', 'Background sync completed', { items: pendingData.length });
    }
  } catch (error) {
    secureLog('error', 'Background sync failed', { error: error.message });
  }
}

// Enhanced push notifications with security
self.addEventListener('push', (event) => {
  let notificationData;
  
  try {
    notificationData = event.data ? JSON.parse(event.data.text()) : {};
  } catch (error) {
    secureLog('warn', 'Invalid push notification data', { error: error.message });
    notificationData = {};
  }
  
  const options = {
    body: notificationData.body || 'Nouvelle mise à jour disponible',
    icon: '/icon-192x192.png',
    badge: '/icon-72x72.png',
    requireInteraction: false,
    actions: [
      {
        action: 'view',
        title: 'Voir',
        icon: '/icon-72x72.png'
      },
      {
        action: 'dismiss',
        title: 'Ignorer'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('GrowthFlow', options)
      .catch((error) => {
        secureLog('error', 'Notification display failed', { error: error.message });
      })
  );
});

// Secure notification click handling
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'view') {
    event.waitUntil(
      clients.openWindow('/')
        .catch((error) => {
          secureLog('error', 'Failed to open window', { error: error.message });
        })
    );
  }
});

// Utility functions
async function getPendingData() {
  return [];
}

async function syncPendingData(data) {
  secureLog('debug', 'Syncing pending data', { itemCount: data.length });
}