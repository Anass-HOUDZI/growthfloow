
import React from 'react';
import { ToolModalHeader } from './ToolModal/ToolModalHeader';
import { ToolRenderer } from './ToolModal/ToolRenderer';

interface ToolModalProps {
  tool: any;
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
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />
        
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
          <ToolModalHeader
            tool={tool}
            isFavorite={isFavorite}
            onToggleFavorite={onToggleFavorite}
            onClose={onClose}
          />

          <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
            <ToolRenderer toolId={tool.id} />
          </div>
        </div>
      </div>
    </div>
  );
};
