
import React, { useState } from 'react';
import { Menu, X, Home, Settings, Heart, History } from 'lucide-react';
import { TouchOptimized } from '../ui/TouchOptimized';
import { useResponsive } from '../../hooks/useResponsive';

interface MobileNavProps {
  favoritesCount: number;
  recentCount: number;
}

export const MobileNav: React.FC<MobileNavProps> = ({ favoritesCount, recentCount }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isMobile } = useResponsive();

  if (!isMobile) return null;

  return (
    <>
      {/* Mobile Header Bar */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <TouchOptimized onTap={() => setIsOpen(true)} className="p-2 rounded-lg">
            <Menu className="w-6 h-6 text-slate-700" />
          </TouchOptimized>
          <h1 className="text-lg font-bold text-primary">
            GrowthFlow
          </h1>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          
          <div className="fixed left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <h2 className="text-xl font-bold text-slate-800">Menu</h2>
              <TouchOptimized onTap={() => setIsOpen(false)} className="p-2 rounded-lg">
                <X className="w-6 h-6 text-slate-600" />
              </TouchOptimized>
            </div>

            <nav className="p-6 space-y-4">
              <TouchOptimized 
                onTap={() => setIsOpen(false)}
                className="flex items-center space-x-4 p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Home className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">Accueil</h3>
                  <p className="text-sm text-slate-600">Tous les outils</p>
                </div>
              </TouchOptimized>

              <TouchOptimized 
                onTap={() => setIsOpen(false)}
                className="flex items-center space-x-4 p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors"
              >
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center relative">
                  <Heart className="w-6 h-6 text-red-600" />
                  {favoritesCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {favoritesCount}
                    </span>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">Favoris</h3>
                  <p className="text-sm text-slate-600">{favoritesCount} outils sauvegardés</p>
                </div>
              </TouchOptimized>

              <TouchOptimized 
                onTap={() => setIsOpen(false)}
                className="flex items-center space-x-4 p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors"
              >
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center relative">
                  <History className="w-6 h-6 text-green-600" />
                  {recentCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 text-white text-xs rounded-full flex items-center justify-center">
                      {recentCount}
                    </span>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">Récents</h3>
                  <p className="text-sm text-slate-600">{recentCount} utilisés récemment</p>
                </div>
              </TouchOptimized>

              <TouchOptimized 
                onTap={() => setIsOpen(false)}
                className="flex items-center space-x-4 p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors"
              >
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Settings className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">Paramètres</h3>
                  <p className="text-sm text-slate-600">Configuration</p>
                </div>
              </TouchOptimized>
            </nav>
          </div>
        </div>
      )}

      {/* Mobile Spacing */}
      <div className="h-16" />
    </>
  );
};
