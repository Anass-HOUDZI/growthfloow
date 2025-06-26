
import React, { useState, useCallback, useRef } from 'react';
import { ModernHeader } from '../components/layout/ModernHeader';
import { ModernToolCategories } from '../components/layout/ModernToolCategories';
import { ToolsGrid } from '../components/ToolsGrid';
import { ToolModal } from '../components/ToolModal';
import { ConnectionStatus } from '../components/ConnectionStatus';
import { HeroSection } from '../components/hero/HeroSection';
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
  const toolsRef = useRef<HTMLElement>(null);

  const handleToolSelect = useCallback((tool: any) => {
    console.log('Tool selected:', tool.name);
    setSelectedTool(tool);
    const updated = [tool.id, ...recentTools.filter((id: string) => id !== tool.id)].slice(0, 5);
    setRecentTools(updated);
  }, [recentTools, setRecentTools]);

  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category);
  }, []);

  const handleToggleFavorite = useCallback((toolId: string) => {
    toggleFavorite(toolId);
  }, [toggleFavorite]);

  const handleCloseModal = useCallback(() => {
    setSelectedTool(null);
  }, []);

  const scrollToTools = () => {
    toolsRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/30 flex flex-col">
      <ConnectionStatus />
      
      {/* Navigation */}
      <ModernHeader />

      {/* Contenu principal */}
      <div className="flex-1 flex flex-col">
        <main className="flex-1 w-full">
          {/* Hero Section avec marges réduites */}
          <HeroSection onScrollToTools={scrollToTools} />
          
          {/* Section Catégories et Outils */}
          <section ref={toolsRef} className={`${isMobile ? 'px-4 pb-8' : 'px-8 pb-16'}`}>
            <div className="max-w-7xl mx-auto">
              <ModernToolCategories 
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
                compact={!isMobile}
              />
              
              <div className="mt-12 mb-16">
                <ToolsGrid 
                  selectedCategory={selectedCategory}
                  searchTerm=""
                  favorites={favorites}
                  onToolSelect={handleToolSelect}
                  onToggleFavorite={handleToggleFavorite}
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
            onClose={handleCloseModal}
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
