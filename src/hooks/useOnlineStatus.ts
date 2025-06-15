
import { useState, useEffect } from 'react';

export interface OnlineStatus {
  isOnline: boolean;
  isOffline: boolean;
  connectionType: string | null;
  effectiveType: string | null;
  downlink: number | null;
  rtt: number | null;
}

export const useOnlineStatus = (): OnlineStatus => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [connectionInfo, setConnectionInfo] = useState({
    connectionType: null as string | null,
    effectiveType: null as string | null,
    downlink: null as number | null,
    rtt: null as number | null,
  });

  useEffect(() => {
    const updateOnlineStatus = () => {
      setIsOnline(navigator.onLine);
      
      // Obtenir les informations de connexion si disponibles
      const connection = (navigator as any).connection || 
                        (navigator as any).mozConnection || 
                        (navigator as any).webkitConnection;
      
      if (connection) {
        setConnectionInfo({
          connectionType: connection.type || null,
          effectiveType: connection.effectiveType || null,
          downlink: connection.downlink || null,
          rtt: connection.rtt || null,
        });
      }
    };

    const handleOnline = () => {
      console.log('Connection restored');
      updateOnlineStatus();
      // Déclencher la synchronisation des données en attente
      if ('serviceWorker' in navigator && 'sync' in (window as any).ServiceWorkerRegistration.prototype) {
        navigator.serviceWorker.ready.then((registration) => {
          return (registration as any).sync.register('background-sync');
        });
      }
    };

    const handleOffline = () => {
      console.log('Connection lost');
      updateOnlineStatus();
    };

    const handleConnectionChange = () => {
      updateOnlineStatus();
    };

    // Événements de connexion
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Événements de changement de connexion
    const connection = (navigator as any).connection || 
                      (navigator as any).mozConnection || 
                      (navigator as any).webkitConnection;
    
    if (connection) {
      connection.addEventListener('change', handleConnectionChange);
    }

    // Mise à jour initiale
    updateOnlineStatus();

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      
      if (connection) {
        connection.removeEventListener('change', handleConnectionChange);
      }
    };
  }, []);

  return {
    isOnline,
    isOffline: !isOnline,
    connectionType: connectionInfo.connectionType,
    effectiveType: connectionInfo.effectiveType,
    downlink: connectionInfo.downlink,
    rtt: connectionInfo.rtt,
  };
};
