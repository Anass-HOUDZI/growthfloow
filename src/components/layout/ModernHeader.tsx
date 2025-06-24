
import React from 'react';
import { ChevronRight, Home, Zap, Sparkles } from 'lucide-react';
import { useLocation } from 'react-router-dom';

interface BreadcrumbItem {
  label: string;
  path: string;
  icon?: React.ReactNode;
}

interface ModernHeaderProps {
  currentTool?: {
    name: string;
    category: string;
  };
}

export const ModernHeader: React.FC<ModernHeaderProps> = ({ currentTool }) => {
  const location = useLocation();
  
  const getBreadcrumbs = (): BreadcrumbItem[] => {
    const breadcrumbs: BreadcrumbItem[] = [
      { label: 'Accueil', path: '/', icon: <Home className="w-4 h-4" /> }
    ];

    if (currentTool) {
      breadcrumbs.push({ label: 'Outils', path: '/' });
      breadcrumbs.push({ label: getCategoryLabel(currentTool.category), path: '/' });
      breadcrumbs.push({ label: currentTool.name, path: location.pathname });
    }

    return breadcrumbs;
  };

  const getCategoryLabel = (category: string): string => {
    const categories = {
      'growth': 'Growth Marketing',
      'seo': 'SEO & Contenu',
      'landing': 'Landing Pages',
      'paid': 'Publicité Payante',
      'outbound': 'Outbound Sales',
      'cmo': 'CMO Tools'
    };
    return categories[category] || category;
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur-xl supports-[backdrop-filter]:bg-white/75">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo et Branding */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-yellow-400 animate-pulse" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  OpenToolsAI
                </h1>
                <p className="text-xs text-slate-500 font-medium">Growth Suite</p>
              </div>
            </div>
          </div>

          {/* Fil d'Ariane - Affiché seulement dans les pages d'outils */}
          {currentTool && (
            <nav className="hidden md:flex items-center space-x-2 text-sm">
              {breadcrumbs.map((item, index) => (
                <React.Fragment key={item.path}>
                  <div className="flex items-center space-x-2">
                    {item.icon}
                    <span className={`${
                      index === breadcrumbs.length - 1 
                        ? 'text-slate-900 font-medium' 
                        : 'text-slate-500 hover:text-slate-700 cursor-pointer transition-colors'
                    }`}>
                      {item.label}
                    </span>
                  </div>
                  {index < breadcrumbs.length - 1 && (
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  )}
                </React.Fragment>
              ))}
            </nav>
          )}

          {/* Badges d'info */}
          <div className="flex items-center space-x-3">
            <div className="hidden lg:flex items-center space-x-3 text-xs">
              <div className="flex items-center space-x-1 px-3 py-1.5 bg-green-50 text-green-700 rounded-full border border-green-200">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="font-medium">100% Gratuit</span>
              </div>
              <div className="flex items-center space-x-1 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full border border-blue-200">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <span className="font-medium">50 Outils</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
