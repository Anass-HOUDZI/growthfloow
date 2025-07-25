import React from 'react';
import { Link } from 'react-router-dom';
import { HeaderLogo } from './Header/HeaderLogo';
import { 
  TrendingUp, Search, MousePointer, Target, BarChart3, Users, Zap,
  Mail, Info, Linkedin
} from 'lucide-react';

const toolCategories = [
  { 
    id: 'growth', 
    name: 'Growth & Strategy', 
    icon: TrendingUp,
    tools: [
      { name: 'Funnel Analyzer', id: 'growth-funnel-analyzer' },
      { name: 'Metrics Calculator', id: 'growth-metrics-calculator' },
      { name: 'Experiment Designer', id: 'growth-experiment-designer' }
    ]
  },
  { 
    id: 'seo', 
    name: 'SEO & Content', 
    icon: Search,
    tools: [
      { name: 'Content Optimizer', id: 'seo-content-optimizer' },
      { name: 'Keyword Finder', id: 'keyword-opportunity-finder' },
      { name: 'SERP Tracker', id: 'serp-feature-tracker' }
    ]
  },
  { 
    id: 'landing', 
    name: 'Landing Pages', 
    icon: MousePointer,
    tools: [
      { name: 'Page Converter', id: 'landing-page-converter' },
      { name: 'CTA Optimizer', id: 'cta-optimizer' },
      { name: 'Form Optimizer', id: 'form-optimizer' }
    ]
  },
  { 
    id: 'outbound', 
    name: 'Outbound & ABM', 
    icon: Target,
    tools: [
      { name: 'Intent Detector', id: 'prospect-intent-detector' },
      { name: 'Email Optimizer', id: 'cold-email-optimizer' },
      { name: 'ABM Scorer', id: 'abm-account-scorer' }
    ]
  },
  { 
    id: 'paid', 
    name: 'Paid Marketing', 
    icon: BarChart3,
    tools: [
      { name: 'Ad Optimizer', id: 'ad-performance-optimizer' },
      { name: 'Bid Calculator', id: 'bid-strategy-calculator' },
      { name: 'Creative Analyzer', id: 'ad-creative-analyzer' }
    ]
  },
  { 
    id: 'cmo', 
    name: 'CMO & Leadership', 
    icon: Users,
    tools: [
      { name: 'Dashboard Builder', id: 'cmo-dashboard-builder' },
      { name: 'ROI Tracker', id: 'marketing-roi-tracker' },
      { name: 'Budget Assistant', id: 'budget-planning-assistant' }
    ]
  }
];

export const GlobalFooter: React.FC = () => {
  return (
    <footer className="bg-slate-50 dark:bg-gray-900 border-t border-slate-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo et description */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <HeaderLogo />
            </div>
            <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed mb-6">
              La suite complète d'outils growth marketing nouvelle génération. 
              100% gratuits, privacy-first et open source.
            </p>
            
            {/* Copyright */}
            <div className="text-sm text-slate-600 dark:text-gray-400">
              <p className="mb-2">
                Copyright © 2025{' '}
                <a 
                  href="https://www.linkedin.com/in/anasshoudzi/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 dark:text-blue-400 font-semibold hover:underline"
                >
                  Anass Houdzi
                </a>
                {' '}– Tous droits réservés.
              </p>
              <p className="text-xs text-slate-500 dark:text-gray-500">
                Privacy-first • Open Source
              </p>
            </div>
          </div>

          {/* Catégories d'outils */}
          <div className="lg:col-span-2">
            <h3 className="font-bold text-slate-900 dark:text-white mb-6 flex items-center space-x-2">
              <Zap className="w-5 h-5 text-blue-600" />
              <span style={{ background: 'var(--gradient-primary)', backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent', fontWeight: 'bold' }}>Nos outils</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {toolCategories.map((category) => (
                <div key={category.id} className="space-y-2">
                  <Link 
                    to={`/category/${category.id}`}
                    className="flex items-center space-x-2 text-slate-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium text-sm"
                  >
                    <category.icon className="w-4 h-4" />
                    <span>{category.name}</span>
                  </Link>
                  <ul className="space-y-1 ml-6">
                    {category.tools.map((tool, index) => (
                      <li key={index}>
                        <Link 
                          to={`/tool/${tool.id}`}
                          className="text-slate-500 dark:text-gray-500 text-xs hover:text-slate-700 dark:hover:text-gray-300 hover:underline transition-colors"
                        >
                          {tool.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Liens et contact */}
          <div className="lg:col-span-1">
            <h3 className="font-bold text-slate-900 dark:text-white mb-6">
              <span style={{ background: 'var(--gradient-primary)', backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent', fontWeight: 'bold' }}>Support & Contact</span>
            </h3>
            <div className="space-y-4">
              <Link 
                to="/about" 
                className="flex items-center space-x-2 text-slate-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors"
              >
                <Info className="w-4 h-4" />
                <span>À propos</span>
              </Link>
              <Link 
                to="/contact" 
                className="flex items-center space-x-2 text-slate-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>Contactez-nous</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};