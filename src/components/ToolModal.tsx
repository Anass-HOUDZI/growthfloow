
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

  const handleShare = async () => {
    const shareData = {
      title: `${tool.name} - OpenToolsAI`,
      text: tool.description,
      url: window.location.href
    };

    try {
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
        console.log('Contenu partagé avec succès');
      } else {
        // Fallback : copier le lien
        await navigator.clipboard.writeText(window.location.href);
        // Vous pouvez ajouter une notification toast ici
        console.log('Lien copié dans le presse-papiers !');
      }
    } catch (error) {
      console.log('Erreur lors du partage:', error);
      // Fallback : copier le lien
      try {
        await navigator.clipboard.writeText(window.location.href);
        console.log('Lien copié dans le presse-papiers !');
      } catch (clipboardError) {
        console.log('Erreur lors de la copie:', clipboardError);
      }
    }
  };

  const handleExport = () => {
    const exportData = {
      tool: tool.name,
      category: tool.category,
      description: tool.description,
      exportDate: new Date().toISOString(),
      url: window.location.href,
      timestamp: Date.now(),
      metadata: {
        version: '1.0',
        format: 'OpenToolsAI Export'
      }
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { 
      type: 'application/json' 
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${tool.name.toLowerCase().replace(/\s+/g, '-')}-export-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    console.log('Export réussi:', tool.name);
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
        <div className="border-b border-slate-200 px-6 py-4 bg-gradient-to-r from-slate-50 to-blue-50/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={onClose}
                className="flex items-center space-x-2 px-4 py-2 text-slate-600 hover:text-slate-800 hover:bg-white rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <X className="w-4 h-4" />
                <span className="hidden sm:inline font-medium">Fermer</span>
              </button>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={onToggleFavorite}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-1 ${
                  isFavorite
                    ? 'bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 focus:ring-red-500'
                    : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200 hover:border-slate-300 focus:ring-blue-500'
                }`}
              >
                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
                <span className="hidden sm:inline text-sm font-medium">
                  {isFavorite ? 'Favoris' : 'Ajouter'}
                </span>
              </button>
              
              <button 
                onClick={handleShare}
                className="flex items-center space-x-2 px-4 py-2 bg-white text-slate-600 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all duration-200 transform hover:scale-105 border border-slate-200 hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
              >
                <Share2 className="w-4 h-4" />
                <span className="hidden sm:inline text-sm font-medium">Partager</span>
              </button>
              
              <button 
                onClick={handleExport}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline text-sm font-medium">Exporter</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tool Content */}
        <div className="flex-1 overflow-y-auto bg-slate-50">
          <div className="container mx-auto px-6 py-8 pb-16">
            <ToolRenderer toolId={tool.id} />
          </div>
        </div>
      </div>
    </div>
  );
};
