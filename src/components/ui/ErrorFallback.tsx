
import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error, resetErrorBoundary }) => {
  console.error('Tool Error:', error);

  return (
    <div className="flex items-center justify-center min-h-64 p-6">
      <div className="bg-white rounded-lg border border-red-200 p-8 max-w-md text-center">
        <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        
        <h3 className="text-lg font-semibold text-slate-800 mb-2">
          Erreur dans l'outil
        </h3>
        
        <p className="text-slate-600 mb-6 text-sm">
          Une erreur s'est produite lors du chargement de cet outil. 
          Cela peut être dû à une API temporairement indisponible.
        </p>
        
        <button
          onClick={resetErrorBoundary}
          className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Réessayer</span>
        </button>
        
        <details className="mt-4 text-left">
          <summary className="text-xs text-slate-500 cursor-pointer">
            Détails techniques
          </summary>
          <pre className="text-xs text-red-600 mt-2 p-2 bg-red-50 rounded border overflow-auto">
            {error.message}
          </pre>
        </details>
      </div>
    </div>
  );
};
