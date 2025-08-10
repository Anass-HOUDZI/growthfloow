import React, { useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ModernHeader } from '../components/layout/ModernHeader';
import { ToolsGrid } from '../components/ToolsGrid';
import { ToolModal } from '../components/ToolModal';
import { ConnectionStatus } from '../components/ConnectionStatus';
import { Footer } from "../components/layout/Footer";
import { useFavorites } from '../hooks/useFavorites';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useResponsive } from '../hooks/useResponsive';
import { categories } from '../utils/constants';

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
    try {
      console.log('Outil sélectionné:', tool.name);
      setSelectedTool(tool);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      // Mise à jour des outils récents
      const updatedRecent = [tool.id, ...recentTools.filter((id: string) => id !== tool.id)].slice(0, 5);
      setRecentTools(updatedRecent);
    } catch (error) {
      console.error('Erreur lors de la sélection d\'outil:', error);
    }
  }, [recentTools, setRecentTools]);

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

  const handleLogoClick = useCallback(() => {
    try {
      navigate('/');
      console.log('Navigation vers l\'accueil');
    } catch (error) {
      console.error('Erreur lors de la navigation vers l\'accueil:', error);
    }
  }, [navigate]);

  const handleBreadcrumbNavigation = useCallback((path: string) => {
    try {
      if (path === '/') {
        navigate('/');
      } else if (path.startsWith('/category/')) {
        navigate(path);
      }
      console.log('Navigation breadcrumb vers:', path);
    } catch (error) {
      console.error('Erreur lors de la navigation breadcrumb:', error);
    }
  }, [navigate]);

  if (!category) {
    return <div>Catégorie non trouvée</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/30 flex flex-col">
      <ConnectionStatus />
      
      {/* Navigation */}
      <ModernHeader 
        currentTool={selectedTool ? { name: selectedTool.name, category: selectedTool.category } : undefined}
        currentCategory={{ name: category.name, id: category.id }}
        onLogoClick={handleLogoClick}
        onBreadcrumbNavigate={handleBreadcrumbNavigation}
      />

      {/* Contenu principal */}
      <div className="flex-1 flex flex-col">
        <main className="flex-1 w-full">
          {/* Section Catégorie */}
          {!selectedTool && (
            <section className={`${isMobile ? 'px-4 py-8' : 'px-8 py-16'}`}>
              <div className="max-w-full mx-auto">
                {/* En-tête de catégorie */}
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
                
                {/* Grille des outils */}
                <div className="mt-12">
                  <ToolsGrid 
                    selectedCategory={categoryId || 'all'}
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

export default CategoryPage;