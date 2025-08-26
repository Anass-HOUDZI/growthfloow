import React, { useState, useCallback, useRef, Suspense, lazy } from 'react';
import { useNavigate } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { GlobalHeader } from '../components/layout/GlobalHeader';
import { GlobalFooter } from '../components/layout/GlobalFooter';
import { ConnectionStatus } from '../components/ConnectionStatus';
import { LoadingState } from '../components/ui/loading-state';
import { ErrorFallback } from '../components/ui/ErrorFallback';
import { useFavorites } from '../hooks/useFavorites';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useResponsive } from '../hooks/useResponsive';
import { useSearch } from '../hooks/useSearch';

// Lazy loading des nouveaux composants épurés
const HorizontalCategoryBar = lazy(() => 
  import('../components/categories/HorizontalCategoryBar').then(module => ({
    default: module.HorizontalCategoryBar
  }))
);

const ToolsGridSimplified = lazy(() => 
  import('../components/ToolsGridSimplified').then(module => ({
    default: module.ToolsGridSimplified
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
  const { isMobile } = useResponsive();
  const { searchTerm, updateSuggestions, setSearchTerm } = useSearch();
  const toolsRef = useRef<HTMLElement>(null);

  const handleToolSelect = useCallback((tool: Tool) => {
    setSelectedTool(tool);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleToggleFavorite = useCallback((toolId: string) => {
    toggleFavorite(toolId);
  }, [toggleFavorite]);

  const handleCloseModal = useCallback(() => {
    setSelectedTool(null);
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
      
      <GlobalHeader 
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
                  <HorizontalCategoryBar 
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
                      <ToolsGridSimplified 
                        selectedCategory={selectedCategory}
                        searchTerm={searchTerm}
                        favorites={favorites}
                        onToolSelect={handleToolSelect}
                        onToggleFavorite={handleToggleFavorite}
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
      
      <GlobalFooter />
    </div>
  );
};

export default Index;
