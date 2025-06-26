
import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface BreadcrumbItem {
  label: string;
  path: string;
  icon?: React.ReactNode;
}

interface BreadcrumbProps {
  currentTool?: {
    name: string;
    category: string;
  };
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ currentTool }) => {
  const navigate = useNavigate();
  
  const getCategoryLabel = (category: string): string => {
    const categories = {
      'growth': 'Growth Marketing',
      'seo': 'SEO & Contenu',
      'landing': 'Landing Pages',
      'paid': 'Publicité Payante',
      'outbound': 'Outbound Sales',
      'cmo': 'CMO Tools'
    };
    return categories[category as keyof typeof categories] || category;
  };

  const getBreadcrumbs = (): BreadcrumbItem[] => {
    const breadcrumbs: BreadcrumbItem[] = [
      { label: 'Accueil', path: '/', icon: <Home className="w-4 h-4" /> }
    ];

    if (currentTool) {
      breadcrumbs.push({ label: 'Outils', path: '/' });
      breadcrumbs.push({ label: getCategoryLabel(currentTool.category), path: '/' });
      breadcrumbs.push({ label: currentTool.name, path: window.location.pathname });
    }

    return breadcrumbs;
  };

  const handleBreadcrumbClick = (path: string) => {
    navigate(path);
  };

  if (!currentTool) return null;

  const breadcrumbs = getBreadcrumbs();

  return (
    <nav className="hidden md:flex items-center space-x-2 text-sm" aria-label="Fil d'Ariane">
      {breadcrumbs.map((item, index) => (
        <React.Fragment key={item.path}>
          <div className="flex items-center space-x-2">
            {item.icon}
            <button
              onClick={() => handleBreadcrumbClick(item.path)}
              className={`transition-all duration-200 px-3 py-2 rounded-lg font-medium ${
                index === breadcrumbs.length - 1 
                  ? 'text-slate-900 cursor-default bg-blue-50 border border-blue-200' 
                  : 'text-slate-600 hover:text-blue-600 hover:bg-blue-50 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transform hover:scale-105'
              }`}
              disabled={index === breadcrumbs.length - 1}
              aria-current={index === breadcrumbs.length - 1 ? 'page' : undefined}
            >
              {item.label}
            </button>
          </div>
          {index < breadcrumbs.length - 1 && (
            <ChevronRight className="w-4 h-4 text-slate-400" />
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};
