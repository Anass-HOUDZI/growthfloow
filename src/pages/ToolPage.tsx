import React, { useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppLayoutGlobal } from '../components/layout/AppLayoutGlobal';
import { ToolModal } from '../components/ToolModal';
import { toolsData } from '../data/toolsData';
import { useFavorites } from '../hooks/useFavorites';
import { useSearch } from '../hooks/useSearch';

const ToolPage: React.FC = () => {
  const { toolId } = useParams<{ toolId: string }>();
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useFavorites();
  const { searchTerm, setSearchTerm } = useSearch();

  const tool = toolsData.find(t => t.id === toolId);

  const handleClose = useCallback(() => {
    navigate('/');
  }, [navigate]);

  const handleLogoClick = useCallback(() => {
    navigate('/');
  }, [navigate]);

  if (!tool) {
    return (
      <AppLayoutGlobal
        onLogoClick={handleLogoClick}
      >
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-600 mb-4">
              Outil non trouvé
            </h1>
            <button 
              onClick={() => navigate('/')}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Retour à l'accueil
            </button>
          </div>
        </div>
      </AppLayoutGlobal>
    );
  }

  return (
    <AppLayoutGlobal
      currentTool={{ name: tool.name, category: tool.category }}
      onLogoClick={handleLogoClick}
      onBreadcrumbNavigate={(path) => {
        if (path === '/') {
          navigate('/');
        }
      }}
    >
      <ToolModal
        tool={tool}
        onClose={handleClose}
        isFavorite={favorites.includes(tool.id)}
        onToggleFavorite={() => toggleFavorite(tool.id)}
        
      />
    </AppLayoutGlobal>
  );
};

export default ToolPage;