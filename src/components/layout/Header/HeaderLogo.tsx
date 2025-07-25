
import React from 'react';
import { Zap, Sparkles } from 'lucide-react';

interface HeaderLogoProps {
  onClick?: () => void;
}

export const HeaderLogo: React.FC<HeaderLogoProps> = ({ onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      // Navigation par défaut vers l'accueil
      window.location.href = '/';
    }
  };

  return (
    <button 
      onClick={handleClick} 
      className="flex items-center space-x-3 hover:opacity-80 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-xl p-2 group"
      aria-label="Retour à l'accueil"
    >
      <div className="relative">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow" style={{ background: 'var(--gradient-primary)' }}>
          <Zap className="w-6 h-6 text-white" />
        </div>
        <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-yellow-400 animate-pulse" />
      </div>
      <div className="hidden sm:block">
        <h1 className="text-xl font-bold text-primary group-hover:scale-105 transition-transform">
          GrowthFlow
        </h1>
        <p className="text-xs text-slate-500 font-medium">Growth Suite</p>
      </div>
    </button>
  );
};
