
import React from 'react';
import { Star, Shield, Globe } from 'lucide-react';
import growthflowLogo from '../assets/growthflow-logo.png';

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
            <img 
              src={growthflowLogo} 
              alt="GrowthFlow" 
              className="h-8 w-auto object-contain"
            />
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
