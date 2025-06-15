
import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, Cloud, CloudOff, Zap, Clock, CheckCircle } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

interface PendingTask {
  id: string;
  type: string;
  description: string;
  timestamp: number;
}

export const ConnectionStatus: React.FC = () => {
  const { isOnline, isOffline, effectiveType, downlink } = useOnlineStatus();
  const [pendingTasks, setPendingTasks] = useState<PendingTask[]>([]);
  const [showDetails, setShowDetails] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null);

  useEffect(() => {
    // Simuler des tâches en attente quand offline
    if (isOffline && pendingTasks.length === 0) {
      const mockTasks: PendingTask[] = [
        {
          id: '1',
          type: 'analysis',
          description: 'Analyse SEO en attente',
          timestamp: Date.now()
        },
        {
          id: '2',
          type: 'export',
          description: 'Export PDF en attente',
          timestamp: Date.now()
        }
      ];
      setPendingTasks(mockTasks);
    }

    // Synchroniser quand la connexion revient
    if (isOnline && pendingTasks.length > 0) {
      setTimeout(() => {
        setPendingTasks([]);
        setLastSyncTime(new Date());
      }, 2000);
    }
  }, [isOnline, isOffline, pendingTasks.length]);

  const getConnectionQuality = () => {
    if (isOffline) return 'offline';
    if (!effectiveType) return 'unknown';
    
    switch (effectiveType) {
      case '4g':
        return 'excellent';
      case '3g':
        return 'good';
      case '2g':
        return 'poor';
      default:
        return 'unknown';
    }
  };

  const getConnectionIcon = () => {
    if (isOffline) return <WifiOff className="w-4 h-4 text-red-500" />;
    const quality = getConnectionQuality();
    switch (quality) {
      case 'excellent':
        return <Wifi className="w-4 h-4 text-green-500" />;
      case 'good':
        return <Wifi className="w-4 h-4 text-yellow-500" />;
      case 'poor':
        return <Wifi className="w-4 h-4 text-orange-500" />;
      default:
        return <Wifi className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = () => {
    if (isOffline) return 'bg-red-500';
    const quality = getConnectionQuality();
    switch (quality) {
      case 'excellent':
        return 'bg-green-500';
      case 'good':
        return 'bg-yellow-500';
      case 'poor':
        return 'bg-orange-500';
      default:
        return 'bg-gray-500';
    }
  };

  // Classes pour le positionnement ABSOLU EN BAS
  const wrapperClass = `
    absolute bottom-4 right-4 
    z-50
    ${showDetails ? 'w-[270px]' : 'w-auto'}
    transition-all
    `;

  if (!showDetails && isOnline && pendingTasks.length === 0) {
    // Mode compact quand tout va bien
    return (
      <div 
        className={`${wrapperClass}
          flex items-center space-x-2
          bg-white/90 backdrop-blur-sm
          border border-slate-200 
          rounded-lg px-2 py-1
          shadow-sm cursor-pointer hover:shadow-md transition-shadow
          text-xs
          min-h-[32px] max-w-[210px]
        `}
        onClick={() => setShowDetails(true)}
      >
        {getConnectionIcon()}
        <span className="text-xs text-slate-600">
          {isOnline ? 'En ligne' : 'Hors ligne'}
        </span>
        {downlink && (
          <span className="text-xs text-slate-400">
            {downlink.toFixed(1)} Mbps
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={`
      ${wrapperClass}
      bg-white/95
      backdrop-blur-md
      border border-slate-200
      rounded-lg shadow-lg
      p-2
      max-w-[270px] w-full
      min-h-[60px]
      flex flex-col
      text-xs
    `}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          {getConnectionIcon()}
          <span className="font-medium text-slate-800 text-xs">
            {isOnline ? 'En ligne' : 'Mode hors ligne'}
          </span>
          <div className={`w-2 h-2 rounded-full ${getStatusColor()}`} />
        </div>
        <button
          onClick={() => setShowDetails(false)}
          className="text-slate-400 hover:text-slate-600 text-xs"
          tabIndex={0}
        >
          ✕
        </button>
      </div>

      {isOnline && (
        <div className="space-y-1 text-xs text-slate-600">
          <div className="flex justify-between">
            <span>Type&nbsp;:</span>
            <span className="font-medium">{effectiveType || 'Inconnu'}</span>
          </div>
          {downlink && (
            <div className="flex justify-between">
              <span>Vitesse&nbsp;:</span>
              <span className="font-medium">{downlink.toFixed(1)} Mbps</span>
            </div>
          )}
          {lastSyncTime && (
            <div className="flex items-center space-x-1 text-green-600">
              <CheckCircle className="w-3 h-3" />
              <span className="text-xs">
                Dernière sync: {lastSyncTime.toLocaleTimeString()}
              </span>
            </div>
          )}
        </div>
      )}

      {isOffline && (
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-amber-600 bg-amber-50 rounded-lg p-1">
            <CloudOff className="w-4 h-4" />
            <span>Fonctionnalités limitées disponibles</span>
          </div>
          
          <div className="text-xs text-slate-600">
            <div className="font-medium mb-0.5">Outils offline :</div>
            <ul className="space-y-0.5 text-slate-500 pl-3 list-disc">
              <li>Analyseur de densité de mots-clés</li>
              <li>Générateur de méta descrip.</li>
              <li>Vérificateur de lisibilité</li>
              <li>Analyseur de structure HTML</li>
            </ul>
          </div>
        </div>
      )}

      {pendingTasks.length > 0 && (
        <div className="mt-2 pt-2 border-t border-slate-200">
          <div className="flex items-center space-x-2 mb-1">
            <Clock className="w-4 h-4 text-blue-500" />
            <span className="font-medium text-slate-700">
              {`Tâches en attente (${pendingTasks.length})`}
            </span>
          </div>
          <div className="space-y-0.5">
            {pendingTasks.map((task) => (
              <div key={task.id} className="text-xs text-slate-500 flex items-center space-x-2">
                <Zap className="w-3 h-3 text-orange-400" />
                <span>{task.description}</span>
              </div>
            ))}
          </div>
          <div className="text-xs text-slate-400 mt-1">
            Sync auto. dès le retour de la connexion
          </div>
        </div>
      )}
    </div>
  );
};

