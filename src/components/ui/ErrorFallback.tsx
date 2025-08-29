
import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { ModernCard } from './modern-card';
import { logger } from '../../utils/logger';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error, resetErrorBoundary }) => {
  // Use secure logger instead of direct console.error
  logger.reportError(error, { context: 'ErrorFallback', userAgent: navigator.userAgent });

  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="flex items-center justify-center min-h-64 p-6">
      <ModernCard variant="error" className="p-8 max-w-md text-center">
        <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        
        <h3 className="text-lg font-semibold text-slate-800 mb-2">
          Oups, une erreur s'est produite
        </h3>
        
        <p className="text-slate-600 mb-6 text-sm">
          Ne vous inquiétez pas, cela arrive parfois. Vous pouvez réessayer ou retourner à l'accueil.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={resetErrorBoundary}
            className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Réessayer</span>
          </button>
          
          <button
            onClick={handleGoHome}
            className="inline-flex items-center space-x-2 bg-slate-100 text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-200 transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Accueil</span>
          </button>
        </div>
        
        <details className="mt-4 text-left">
          <summary className="text-xs text-slate-500 cursor-pointer hover:text-slate-700">
            Détails techniques
          </summary>
          <pre className="text-xs text-red-600 mt-2 p-2 bg-red-50 rounded border overflow-auto max-h-32">
            {error.message}
            {error.stack && (
              <>
                {'\n\nStack trace:\n'}
                {error.stack}
              </>
            )}
          </pre>
        </details>
      </ModernCard>
    </div>
  );
};
