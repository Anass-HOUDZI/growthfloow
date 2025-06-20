
import React, { useState } from 'react';
import { DashboardHeader } from '../components/DashboardHeader';
import { MobileNav } from '../components/layout/MobileNav';
import { ToolCategories } from '../components/ToolCategories';
import { ToolsGrid } from '../components/ToolsGrid';
import { ToolModal } from '../components/ToolModal';
import { ConnectionStatus } from '../components/ConnectionStatus';
import { useFavorites } from '../hooks/useFavorites';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useResponsive } from '../hooks/useResponsive';
import { Footer } from "../components/layout/Footer";
import { Sparkles, Zap } from 'lucide-react';

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTool, setSelectedTool] = useState(null);
  const { favorites, toggleFavorite } = useFavorites();
  const [recentTools, setRecentTools] = useLocalStorage('recentTools', []);
  const { isMobile } = useResponsive();

  const handleToolSelect = (tool) => {
    setSelectedTool(tool);
    const updated = [tool.id, ...recentTools.filter(id => id !== tool.id)].slice(0, 5);
    setRecentTools(updated);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex flex-col">
      <ConnectionStatus />
      
      {/* Navigation */}
      {isMobile ? (
        <MobileNav 
          favoritesCount={favorites.length}
          recentCount={recentTools.length}
        />
      ) : (
        <DashboardHeader 
          favoritesCount={favorites.length}
        />
      )}

      {/* Contenu principal */}
      <div className="flex-1 flex flex-col">
        <main className="flex-1 w-full">
          {/* Hero Section */}
          <section className={`relative overflow-hidden ${isMobile ? 'py-8 px-4' : 'py-16 px-8'}`}>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-indigo-600/5" />
            <div className="relative max-w-5xl mx-auto text-center">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Sparkles className="w-8 h-8 text-blue-600" />
                <span className="text-blue-600 font-semibold text-lg">OpenToolsAI</span>
                <Sparkles className="w-8 h-8 text-purple-600" />
              </div>
              
              <h1 className={`${isMobile ? 'text-3xl' : 'text-4xl md:text-6xl'} font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6 tracking-tight leading-tight`}>
                Growth Suite
              </h1>
              
              <p className={`${isMobile ? 'text-lg' : 'text-xl md:text-2xl'} text-slate-700 max-w-4xl mx-auto mb-6 leading-relaxed font-medium`}>
                50 outils professionnels de growth marketing
              </p>
              
              <div className="flex items-center justify-center space-x-6 text-sm">
                <div className="flex items-center space-x-2 text-green-600 bg-green-50 px-4 py-2 rounded-full">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="font-medium">100% gratuit</span>
                </div>
                <div className="flex items-center space-x-2 text-blue-600 bg-blue-50 px-4 py-2 rounded-full">
                  <Zap className="w-4 h-4" />
                  <span className="font-medium">Privacy by design</span>
                </div>
                <div className="flex items-center space-x-2 text-purple-600 bg-purple-50 px-4 py-2 rounded-full">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                  <span className="font-medium">Performance optimale</span>
                </div>
              </div>
            </div>
          </section>
          
          {/* Section Catégories et Outils */}
          <section className={`${isMobile ? 'px-4 pb-8' : 'px-8 pb-16'}`}>
            <div className="max-w-7xl mx-auto">
              <ToolCategories 
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                compact={!isMobile}
              />
              
              <div className="mt-12">
                <ToolsGrid 
                  selectedCategory={selectedCategory}
                  searchTerm=""
                  favorites={favorites}
                  onToolSelect={handleToolSelect}
                  onToggleFavorite={toggleFavorite}
                  recentTools={recentTools}
                />
              </div>
            </div>
          </section>
        </main>

        {/* Modal d'outil */}
        {selectedTool && (
          <ToolModal 
            tool={selectedTool}
            onClose={() => setSelectedTool(null)}
            isFavorite={favorites.includes(selectedTool.id)}
            onToggleFavorite={() => toggleFavorite(selectedTool.id)}
          />
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
