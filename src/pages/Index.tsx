
import React, { useState, useCallback, useRef } from 'react';
import { ModernHeader } from '../components/layout/ModernHeader';
import { ModernToolCategories } from '../components/layout/ModernToolCategories';
import { ToolsGrid } from '../components/ToolsGrid';
import { ToolModal } from '../components/ToolModal';
import { ConnectionStatus } from '../components/ConnectionStatus';
import { HeroSection } from '../components/hero/HeroSection';
import { Footer } from "../components/layout/Footer";
import { useFavorites } from '../hooks/useFavorites';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useResponsive } from '../hooks/useResponsive';

interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: React.ComponentType;
}

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const { favorites, toggleFavorite } = useFavorites();
  const [recentTools, setRecentTools] = useLocalStorage<string[]>('recentTools', []);
  const { isMobile } = useResponsive();
  const toolsRef = useRef<HTMLElement>(null);

  const handleToolSelect = useCallback((tool: Tool) => {
    try {
      console.log('Outil sélectionné:', tool.name);
      setSelectedTool(tool);
      
      // Mise à jour des outils récents
      const updatedRecent = [tool.id, ...recentTools.filter((id: string) => id !== tool.id)].slice(0, 5);
      setRecentTools(updatedRecent);
    } catch (error) {
      console.error('Erreur lors de la sélection d\'outil:', error);
    }
  }, [recentTools, setRecentTools]);

  const handleCategoryChange = useCallback((category: string) => {
    try {
      console.log('Catégorie changée:', category);
      setSelectedCategory(category);
    } catch (error) {
      console.error('Erreur lors du changement de catégorie:', error);
    }
  }, []);

  const handleToggleFavorite = useCallback((toolId: string) => {
    try {
      toggleFavorite(toolId);
      console.log('Favori basculé pour l\'outil:', toolId);
    } catch (error) {
      console.error('Erreur lors de la gestion des favoris:', error);
    }
  }, [toggleFavorite]);

  const handleCloseModal = useCallback(() => {
    try {
      setSelectedTool(null);
      console.log('Modal fermée');
    } catch (error) {
      console.error('Erreur lors de la fermeture de la modal:', error);
    }
  }, []);

  const scrollToTools = useCallback(() => {
    try {
      if (toolsRef.current) {
        toolsRef.current.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
        console.log('Scroll vers les outils effectué');
      }
    } catch (error) {
      console.error('Erreur lors du scroll:', error);
    }
  }, []);

  const handleLogoClick = useCallback(() => {
    try {
      // Fermer la modal si ouverte
      if (selectedTool) {
        setSelectedTool(null);
      }
      
      // Réinitialiser les filtres
      setSelectedCategory('all');
      
      // Scroll vers le haut
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      console.log('Navigation vers l\'accueil');
    } catch (error) {
      console.error('Erreur lors de la navigation vers l\'accueil:', error);
    }
  }, [selectedTool]);

  const handleBreadcrumbNavigation = useCallback((path: string) => {
    try {
      if (path === '/') {
        handleLogoClick();
      }
      console.log('Navigation breadcrumb vers:', path);
    } catch (error) {
      console.error('Erreur lors de la navigation breadcrumb:', error);
    }
  }, [handleLogoClick]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/30 flex flex-col">
      <ConnectionStatus />
      
      {/* Navigation */}
      <ModernHeader 
        currentTool={selectedTool ? { name: selectedTool.name, category: selectedTool.category } : undefined}
        onLogoClick={handleLogoClick}
        onBreadcrumbNavigate={handleBreadcrumbNavigation}
      />

      {/* Contenu principal */}
      <div className="flex-1 flex flex-col">
        <main className="flex-1 w-full">
          {/* Hero Section - uniquement sur l'accueil */}
          {!selectedTool && (
            <HeroSection onScrollToTools={scrollToTools} />
          )}
          
          {/* Section Catégories et Outils - uniquement sur l'accueil */}
          {!selectedTool && (
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
          )}
        </main>

        {/* Modal d'outil */}
        {selectedTool && (
          <ToolModal 
            tool={selectedTool}
            onClose={handleCloseModal}
            isFavorite={favorites.includes(selectedTool.id)}
            onToggleFavorite={() => handleToggleFavorite(selectedTool.id)}
          />
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
