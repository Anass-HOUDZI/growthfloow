
import React from 'react';
import { X, Star } from 'lucide-react';

interface ToolModalHeaderProps {
  tool: any;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onClose: () => void;
}

export const ToolModalHeader: React.FC<ToolModalHeaderProps> = ({
  tool,
  isFavorite,
  onToggleFavorite,
  onClose
}) => {
  return (
    <div className="flex items-center justify-between p-6 border-b border-slate-200">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'var(--gradient-primary)' }}>
          <tool.icon className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-800">{tool.name}</h2>
          <p className="text-slate-600">{tool.description}</p>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={onToggleFavorite}
          className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors"
        >
          <Star className={`w-5 h-5 ${isFavorite ? 'text-yellow-500 fill-current' : 'text-slate-400'}`} />
        </button>
        
        <button
          onClick={onClose}
          className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors"
        >
          <X className="w-5 h-5 text-slate-600" />
        </button>
      </div>
    </div>
  );
};
