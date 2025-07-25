
import React from 'react';
import { Star, Zap, Shield, Globe } from 'lucide-react';

interface DashboardHeaderProps {
  favoritesCount: number;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  favoritesCount
}) => {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'var(--gradient-primary)' }}>
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">GrowthFlow</h2>
              <p className="text-sm text-slate-500">Growth Suite</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
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
