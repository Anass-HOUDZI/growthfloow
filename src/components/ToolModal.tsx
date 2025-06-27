
import React, { useEffect } from 'react';
import { ToolRenderer } from './ToolModal/ToolRenderer';
import { ModernHeader } from './layout/ModernHeader';
import { ToolActions } from './tools/ToolActions';

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
    // Empêcher le scroll du body
    document.body.style.overflow = 'hidden';
    
    // Fonction de nettoyage
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={handleBackdropClick}
        role="button"
        tabIndex={0}
        aria-label="Fermer la modal"
      />
      
      {/* Modal Content */}
      <div className="relative w-full bg-white shadow-2xl flex flex-col">
        {/* Header avec fil d'Ariane */}
        <ModernHeader 
          currentTool={{ name: tool.name, category: tool.category }}
          onLogoClick={onClose}
          onBreadcrumbNavigate={(path) => {
            if (path === '/') {
              onClose();
            }
          }}
        />
        
        {/* Actions Bar */}
        <ToolActions 
          tool={tool}
          isFavorite={isFavorite}
          onToggleFavorite={onToggleFavorite}
          onClose={onClose}
        />

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
