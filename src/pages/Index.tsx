import React, { useState, useCallback, useRef, Suspense, lazy } from 'react';
import { useNavigate } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { ModernHeader } from '../components/layout/ModernHeader';
import { ConnectionStatus } from '../components/ConnectionStatus';
import { Footer } from "../components/layout/Footer";
import { LoadingState } from '../components/ui/loading-state';
import { ErrorFallback } from '../components/ui/ErrorFallback';
import { useFavorites } from '../hooks/useFavorites';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useResponsive } from '../hooks/useResponsive';

// Lazy loading des nouveaux composants épurés
const CleanPremiumToolCategories = lazy(() => 
  import('../components/layout/CleanPremiumToolCategories').then(module => ({
    default: module.CleanPremiumToolCategories
  }))
);

const ToolsGrid = lazy(() => 
  import('../components/ToolsGrid').then(module => ({
    default: module.ToolsGrid
  }))
);

const CleanHeroSection = lazy(() => 
  import('../components/hero/CleanHeroSection').then(module => ({
    default: module.CleanHeroSection
  }))
);

const ToolModal = lazy(() => 
  import('../components/ToolModal').then(module => ({
    default: module.ToolModal
  }))
);

interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: React.ComponentType;
}

const Index = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const { favorites, toggleFavorite } = useFavorites();
  const [recentTools, setRecentTools] = useLocalStorage<string[]>('recentTools', []);
  const { isMobile } = useResponsive();
  const toolsRef = useRef<HTMLElement>(null);

  const handleToolSelect = useCallback((tool: Tool) => {
    console.log('Outil sélectionné:', tool.name);
    setSelectedTool(tool);
    
    const updatedRecent = [tool.id, ...recentTools.filter((id: string) => id !== tool.id)].slice(0, 5);
    setRecentTools(updatedRecent);
  }, [recentTools, setRecentTools]);

  const handleCategoryChange = useCallback((category: string) => {
    console.log('Catégorie changée:', category);
    setSelectedCategory(category);
  }, []);

  const handleToggleFavorite = useCallback((toolId: string) => {
    toggleFavorite(toolId);
    console.log('Favori basculé pour l\'outil:', toolId);
  }, [toggleFavorite]);

  const handleCloseModal = useCallback(() => {
    setSelectedTool(null);
    console.log('Modal fermée');
  }, []);

  const scrollToTools = useCallback(() => {
    if (toolsRef.current) {
      toolsRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, []);

  const handleLogoClick = useCallback(() => {
    if (selectedTool) {
      setSelectedTool(null);
    }
    setSelectedCategory('all');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedTool]);

  const handleCategoryClick = useCallback((categoryId: string) => {
    navigate(`/category/${categoryId}`);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <ConnectionStatus />
      
      <ModernHeader 
        currentTool={selectedTool ? { name: selectedTool.name, category: selectedTool.category } : undefined}
        onLogoClick={handleLogoClick}
        onBreadcrumbNavigate={(path) => {
          if (path === '/') {
            handleLogoClick();
          }
        }}
      />

      <div className="flex-1 flex flex-col">
        <main className="flex-1 w-full">
          {!selectedTool && (
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <Suspense fallback={<LoadingState text="Chargement de la page d'accueil..." />}>
                <CleanHeroSection onScrollToTools={scrollToTools} />
              </Suspense>
            </ErrorBoundary>
          )}
          
          {!selectedTool && (
            <section ref={toolsRef}>
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                <Suspense fallback={<LoadingState text="Chargement des catégories..." />}>
                  <CleanPremiumToolCategories 
                    selectedCategory={selectedCategory}
                    onCategoryChange={handleCategoryChange}
                    onCategoryClick={handleCategoryClick}
                  />
                </Suspense>
              </ErrorBoundary>
              
              <div className="px-6 pb-20 bg-slate-50">
                <div className="max-w-7xl mx-auto">
                  <ErrorBoundary FallbackComponent={ErrorFallback}>
                    <Suspense fallback={<LoadingState text="Chargement des outils..." />}>
                      <ToolsGrid 
                        selectedCategory={selectedCategory}
                        searchTerm=""
                        favorites={favorites}
                        onToolSelect={handleToolSelect}
                        onToggleFavorite={handleToggleFavorite}
                        recentTools={recentTools}
                      />
                    </Suspense>
                  </ErrorBoundary>
                </div>
              </div>
            </section>
          )}
        </main>

        {selectedTool && (
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={<LoadingState fullScreen text="Chargement de l'outil..." />}>
              <ToolModal 
                tool={selectedTool}
                onClose={handleCloseModal}
                isFavorite={favorites.includes(selectedTool.id)}
                onToggleFavorite={() => handleToggleFavorite(selectedTool.id)}
              />
            </Suspense>
          </ErrorBoundary>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
