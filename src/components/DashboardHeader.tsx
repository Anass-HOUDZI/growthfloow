
import React from 'react';
import { Search, Star, Zap, Shield, Globe } from 'lucide-react';

interface DashboardHeaderProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  favoritesCount: number;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  searchTerm,
  onSearchChange,
  favoritesCount
}) => {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">OpenToolsAI</h2>
              <p className="text-sm text-slate-500">Growth Suite</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher un outil..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 pr-4 py-2 w-80 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/90"
              />
            </div>

            <div className="flex items-center space-x-2 text-sm text-slate-600">
              <Star className="w-4 h-4" />
              <span>{favoritesCount} favoris</span>
            </div>

            <div className="flex items-center space-x-4 text-sm text-slate-500">
              <div className="flex items-center space-x-1">
                <Shield className="w-4 h-4" />
                <span>100% Private</span>
              </div>
              <div className="flex items-center space-x-1">
                <Globe className="w-4 h-4" />
                <span>Client-Side</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
