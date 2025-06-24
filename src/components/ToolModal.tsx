
import React, { useEffect } from 'react';
import { X, Heart, Share2, Download } from 'lucide-react';
import { ToolRenderer } from './ToolModal/ToolRenderer';
import { ModernHeader } from './layout/ModernHeader';

interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
}

interface ToolModalProps {
  tool: Tool;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export const ToolModal: React.FC<ToolModalProps> = ({
  tool,
  onClose,
  isFavorite,
  onToggleFavorite
}) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={handleBackdropClick}
      />
      
      {/* Modal Content */}
      <div className="relative w-full bg-white shadow-2xl flex flex-col">
        {/* Header avec fil d'Ariane */}
        <ModernHeader currentTool={{ name: tool.name, category: tool.category }} />
        
        {/* Actions Bar */}
        <div className="border-b border-slate-200 px-6 py-4 bg-slate-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={onClose}
                className="flex items-center space-x-2 px-4 py-2 text-slate-600 hover:text-slate-800 hover:bg-white rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
                <span className="hidden sm:inline">Fermer</span>
              </button>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={onToggleFavorite}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                  isFavorite
                    ? 'bg-red-50 text-red-600 hover:bg-red-100'
                    : 'bg-white text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
                <span className="hidden sm:inline text-sm">
                  {isFavorite ? 'Favoris' : 'Ajouter'}
                </span>
              </button>
              
              <button className="flex items-center space-x-1 px-3 py-2 bg-white text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                <Share2 className="w-4 h-4" />
                <span className="hidden sm:inline text-sm">Partager</span>
              </button>
              
              <button className="flex items-center space-x-1 px-3 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded-lg transition-colors">
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline text-sm">Exporter</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tool Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="container mx-auto px-6 py-8 pb-16">
            <ToolRenderer toolId={tool.id} />
          </div>
        </div>
      </div>
    </div>
  );
};
