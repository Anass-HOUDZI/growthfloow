
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
  const [searchTerm, setSearchTerm] = useState('');
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
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          favoritesCount={favorites.length}
        />
        <main className="w-full flex flex-col items-center px-2 md:px-4 py-8">
          <div className="mb-16 flex flex-col items-center justify-center text-center py-14 w-full">
            <h1 className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-8 tracking-tight drop-shadow-lg">
              OpenToolsAI Growth Suite
            </h1>
            <p className="text-2xl md:text-3xl text-slate-600 max-w-4xl mb-6">
              50 outils professionnels de growth marketing gratuits et fonctionnant 100% côté client. 
              Privacy by design, performance optimale, accessibilité universelle.
            </p>
          </div>
          <div className="w-full flex flex-col items-center">
            <ToolCategories 
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
            <ToolsGrid 
              selectedCategory={selectedCategory}
              searchTerm={searchTerm}
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
