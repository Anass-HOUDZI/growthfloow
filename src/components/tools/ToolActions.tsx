
import React from 'react';
import { X, Heart, Share2, Download } from 'lucide-react';

interface ToolActionsProps {
  tool: any;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onClose: () => void;
}

export const ToolActions: React.FC<ToolActionsProps> = ({
  tool,
  isFavorite,
  onToggleFavorite,
  onClose
}) => {
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
        await navigator.clipboard.writeText(window.location.href);
        console.log('Lien copié dans le presse-papiers !');
      }
    } catch (error) {
      console.log('Erreur lors du partage:', error);
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
  );
};
