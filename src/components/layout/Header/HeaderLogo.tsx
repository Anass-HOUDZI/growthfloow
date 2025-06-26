
import React from 'react';
import { Zap, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const HeaderLogo: React.FC = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <button 
      onClick={handleLogoClick} 
      className="flex items-center space-x-3 hover:opacity-80 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-xl p-2 group"
      aria-label="Retour à l'accueil"
    >
      <div className="relative">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
          <Zap className="w-6 h-6 text-white" />
        </div>
        <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-yellow-400 animate-pulse" />
      </div>
      <div className="hidden sm:block">
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent group-hover:scale-105 transition-transform">
          OpenToolsAI
        </h1>
        <p className="text-xs text-slate-500 font-medium">Growth Suite</p>
      </div>
    </button>
  );
};
