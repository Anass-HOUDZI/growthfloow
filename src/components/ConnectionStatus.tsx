
import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, CheckCircle } from 'lucide-react';
import { ModernCard } from './ui/modern-card';

export const ConnectionStatus: React.FC = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showStatus, setShowStatus] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowStatus(true);
      setTimeout(() => setShowStatus(false), 3000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowStatus(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!showStatus && isOnline) return null;

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in-up">
      <ModernCard 
        variant={isOnline ? 'success' : 'error'}
        className="flex items-center space-x-2 px-4 py-2 shadow-lg"
      >
        {isOnline ? (
          <>
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-800">Connecté</span>
          </>
        ) : (
          <>
            <WifiOff className="w-4 h-4 text-red-600" />
            <span className="text-sm font-medium text-red-800">Hors ligne</span>
          </>
        )}
      </ModernCard>
    </div>
  );
};
