
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

      <div className="flex-1 flex flex-col items-center justify-start">
        <main className={`w-full flex flex-col items-center ${isMobile ? 'px-3 py-4' : 'px-2 md:px-4 py-6'}`}>
          <div className={`mb-8 flex flex-col items-center justify-center text-center ${isMobile ? 'pt-2 pb-4' : 'pt-6 pb-6'} w-full`}>
            <h1 className={`${isMobile ? 'text-2xl' : 'text-3xl md:text-5xl'} font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-3 tracking-tight drop-shadow-lg`}>
              OpenToolsAI Growth Suite
            </h1>
            <p className={`${isMobile ? 'text-base' : 'text-lg md:text-xl'} text-slate-600 max-w-3xl mb-2 font-normal ${isMobile ? 'px-2' : ''}`}>
              50 outils pro de growth marketing, gratuits, 100% côté client. <br className="hidden md:block" />
              Privacy by design, performance optimale, accessibilité universelle.
            </p>
          </div>
          
          <div className="w-full flex flex-col items-center">
            <ToolCategories 
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              compact={!isMobile}
            />
            <ToolsGrid 
              selectedCategory={selectedCategory}
              searchTerm=""
              favorites={favorites}
              onToolSelect={handleToolSelect}
              onToggleFavorite={toggleFavorite}
              recentTools={recentTools}
            />
          </div>
        </main>

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
