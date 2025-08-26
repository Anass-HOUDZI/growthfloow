import React, { useState, useCallback, lazy, Suspense } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { ConnectionStatus } from '../components/ConnectionStatus';
import { LoadingState } from '../components/ui/loading-state';
import { ErrorFallback } from '../components/ui/ErrorFallback';
import { useFavorites } from '../hooks/useFavorites';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useResponsive } from '../hooks/useResponsive';
import { categories } from '../utils/constants';

// Lazy load components for better performance
const ModernHeader = lazy(() => import('../components/layout/ModernHeader').then(module => ({
  default: module.ModernHeader
})));
const ToolsGrid = lazy(() => import('../components/ToolsGrid').then(module => ({
  default: module.ToolsGrid
})));
const ToolModal = lazy(() => import('../components/ToolModal').then(module => ({
  default: module.ToolModal
})));
const Footer = lazy(() => import('../components/layout/Footer').then(module => ({
  default: module.Footer
})));

interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: React.ComponentType;
}

const CategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const { favorites, toggleFavorite } = useFavorites();
  const [recentTools, setRecentTools] = useLocalStorage<string[]>('recentTools', []);
  const { isMobile } = useResponsive();

  const category = categories.find(cat => cat.id === categoryId);

  const handleToolSelect = useCallback((tool: Tool) => {
    setSelectedTool(tool);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Update recent tools efficiently
    setRecentTools(prev => [tool.id, ...prev.filter(id => id !== tool.id)].slice(0, 5));
  }, [setRecentTools]);

  const handleToggleFavorite = useCallback((toolId: string) => {
    toggleFavorite(toolId);
  }, [toggleFavorite]);

  const handleCloseModal = useCallback(() => {
    setSelectedTool(null);
  }, []);

  const handleLogoClick = useCallback(() => {
    navigate('/');
  }, [navigate]);

  const handleBreadcrumbNavigation = useCallback((path: string) => {
    navigate(path);
  }, [navigate]);

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-600 mb-4">
            Catégorie non trouvée
          </h1>
          <button 
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retour à l'accueil
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/30 flex flex-col">
      <ConnectionStatus />
      
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<LoadingState text="Chargement de l'en-tête..." />}>
          <ModernHeader 
            currentTool={selectedTool ? { name: selectedTool.name, category: selectedTool.category } : undefined}
            currentCategory={{ name: category.name, id: category.id }}
            onLogoClick={handleLogoClick}
            onBreadcrumbNavigate={handleBreadcrumbNavigation}
          />
        </Suspense>
      </ErrorBoundary>

      <div className="flex-1 flex flex-col">
        <main className="flex-1 w-full">
          {!selectedTool && (
            <section className={`${isMobile ? 'px-4 py-8' : 'px-8 py-16'}`}>
              <div className="max-w-full mx-auto">
                <div className="text-center mb-12">
                  <div className="inline-flex items-center space-x-3 mb-6 px-6 py-3 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200/50 rounded-full shadow-sm">
                    <category.icon className="w-6 h-6 text-blue-600" />
                    <span className="text-blue-700 font-semibold text-lg">{category.name}</span>
                  </div>
                  <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
                    Outils {category.name}
                  </h1>
                  <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                    Découvrez notre collection d'outils spécialisés pour {category.name.toLowerCase()}
                  </p>
                </div>
                
                <div className="mt-12">
                  <ErrorBoundary FallbackComponent={ErrorFallback}>
                    <Suspense fallback={<LoadingState text="Chargement des outils..." />}>
                      <ToolsGrid 
                        selectedCategory={categoryId || 'all'}
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
      
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<LoadingState text="Chargement du footer..." />}>
          <Footer />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default CategoryPage;