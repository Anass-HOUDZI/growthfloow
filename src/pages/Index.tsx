
import React, { useState } from 'react';
import { DashboardHeader } from '../components/DashboardHeader';
import { ToolCategories } from '../components/ToolCategories';
import { ToolsGrid } from '../components/ToolsGrid';
import { ToolModal } from '../components/ToolModal';
import { useFavorites } from '../hooks/useFavorites';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Footer } from "../components/layout/Footer";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTool, setSelectedTool] = useState(null);
  // Suppression du searchTerm et de son usage
  const { favorites, toggleFavorite } = useFavorites();
  const [recentTools, setRecentTools] = useLocalStorage('recentTools', []);

  const handleToolSelect = (tool) => {
    setSelectedTool(tool);
    // Add to recent tools
    const updated = [tool.id, ...recentTools.filter(id => id !== tool.id)].slice(0, 5);
    setRecentTools(updated);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-start">
        <DashboardHeader 
          favoritesCount={favorites.length}
        />
        <main className="w-full flex flex-col items-center px-2 md:px-4 py-6">
          <div className="mb-8 flex flex-col items-center justify-center text-center pt-6 pb-6 w-full">
            <h1 className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-3 tracking-tight drop-shadow-lg">
              OpenToolsAI Growth Suite
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mb-2 font-normal">
              50 outils pro de growth marketing, gratuits, 100% côté client. <br className="hidden md:block" />
              Privacy by design, performance optimale, accessibilité universelle.
            </p>
          </div>
          <div className="w-full flex flex-col items-center">
            <ToolCategories 
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              compact // ajout d'une prop pour compacter les catégories
            />
            <ToolsGrid 
              selectedCategory={selectedCategory}
              searchTerm={""} // Passer une string vide, car la prop reste nécessaire pour ToolsGrid mais la recherche est désactivée
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
