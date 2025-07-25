
import React, { useState } from 'react';
import { Menu, X, Home, Settings, Heart, History, Sparkles } from 'lucide-react';
import { TouchOptimized } from '../ui/TouchOptimized';
import { useResponsive } from '../../hooks/useResponsive';

interface ModernMobileNavProps {
  favoritesCount: number;
  recentCount: number;
}

export const ModernMobileNav: React.FC<ModernMobileNavProps> = ({ favoritesCount, recentCount }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isMobile } = useResponsive();

  if (!isMobile) return null;

  return (
    <>
      {/* Mobile Header Bar */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-b border-slate-200/50 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <TouchOptimized onTap={() => setIsOpen(true)} className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors">
            <Menu className="w-5 h-5 text-slate-700" />
          </TouchOptimized>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">F</span>
              </div>
              <Sparkles className="absolute -top-0.5 -right-0.5 w-3 h-3 text-yellow-400" />
            </div>
            <h1 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              GrowthFlow
            </h1>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          
          <div className="fixed left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white shadow-2xl overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-gradient-to-r from-blue-50 to-purple-50">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">F</span>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-800">GrowthFlow</h2>
                  <p className="text-sm text-slate-600">Growth Suite</p>
                </div>
              </div>
              <TouchOptimized onTap={() => setIsOpen(false)} className="p-2 rounded-xl bg-white/50 hover:bg-white/70 transition-colors">
                <X className="w-5 h-5 text-slate-600" />
              </TouchOptimized>
            </div>

            <nav className="p-6 space-y-3">
              <TouchOptimized 
                onTap={() => setIsOpen(false)}
                className="flex items-center space-x-4 p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 transition-all duration-200 transform hover:scale-[1.02]"
              >
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Home className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">Accueil</h3>
                  <p className="text-sm text-slate-600">Tous les outils</p>
                </div>
              </TouchOptimized>

              <TouchOptimized 
                onTap={() => setIsOpen(false)}
                className="flex items-center space-x-4 p-4 rounded-2xl bg-gradient-to-r from-red-50 to-pink-100 hover:from-red-100 hover:to-pink-200 transition-all duration-200 transform hover:scale-[1.02]"
              >
                <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center shadow-lg relative">
                  <Heart className="w-6 h-6 text-white" />
                  {favoritesCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 text-white text-xs rounded-full flex items-center justify-center font-medium">
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
                className="flex items-center space-x-4 p-4 rounded-2xl bg-gradient-to-r from-green-50 to-emerald-100 hover:from-green-100 hover:to-emerald-200 transition-all duration-200 transform hover:scale-[1.02]"
              >
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center shadow-lg relative">
                  <History className="w-6 h-6 text-white" />
                  {recentCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-green-600 text-white text-xs rounded-full flex items-center justify-center font-medium">
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
                className="flex items-center space-x-4 p-4 rounded-2xl bg-gradient-to-r from-purple-50 to-indigo-100 hover:from-purple-100 hover:to-indigo-200 transition-all duration-200 transform hover:scale-[1.02]"
              >
                <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Settings className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">Paramètres</h3>
                  <p className="text-sm text-slate-600">Configuration</p>
                </div>
              </TouchOptimized>
            </nav>

            {/* Footer du menu mobile */}
            <div className="mt-auto p-6 border-t border-slate-100 bg-slate-50">
              <div className="text-center">
                <p className="text-xs text-slate-500 mb-2">Growth Marketing Suite</p>
                <div className="flex justify-center space-x-4 text-xs">
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full">100% Gratuit</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full">50 Outils</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Spacing */}
      <div className="h-16" />
    </>
  );
};
