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
    tools: ['Funnel Analyzer', 'Metrics Calculator', 'Experiment Designer']
  },
  { 
    id: 'seo', 
    name: 'SEO & Content', 
    icon: Search,
    tools: ['Content Optimizer', 'Keyword Finder', 'SERP Tracker']
  },
  { 
    id: 'landing', 
    name: 'Landing Pages', 
    icon: MousePointer,
    tools: ['Page Converter', 'CTA Optimizer', 'Form Optimizer']
  },
  { 
    id: 'outbound', 
    name: 'Outbound & ABM', 
    icon: Target,
    tools: ['Intent Detector', 'Email Optimizer', 'ABM Scorer']
  },
  { 
    id: 'paid', 
    name: 'Paid Marketing', 
    icon: BarChart3,
    tools: ['Ad Optimizer', 'Bid Calculator', 'Creative Analyzer']
  },
  { 
    id: 'cmo', 
    name: 'CMO & Leadership', 
    icon: Users,
    tools: ['Dashboard Builder', 'ROI Tracker', 'Budget Assistant']
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
            
            {/* Attribution créateur */}
            <div className="flex items-center space-x-2 p-3 bg-white dark:bg-gray-800 border-2 border-blue-200 dark:border-blue-700 rounded-lg">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <div>
                <p className="text-xs text-slate-600 dark:text-gray-400">Créé par</p>
                <a 
                  href="https://linkedin.com/in/anas" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 dark:text-blue-400 font-semibold text-sm flex items-center space-x-1 hover:underline"
                >
                  <span>Anas</span>
                  <Linkedin className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Catégories d'outils */}
          <div className="lg:col-span-2">
            <h3 className="font-bold text-slate-900 dark:text-white mb-6 flex items-center space-x-2">
              <Zap className="w-5 h-5 text-blue-600" />
              <span>Nos outils</span>
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
                        <span className="text-slate-500 dark:text-gray-500 text-xs hover:text-slate-700 dark:hover:text-gray-300 cursor-pointer">
                          {tool}
                        </span>
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
              Support & Contact
            </h3>
            <div className="space-y-4">
              <a 
                href="/about" 
                className="flex items-center space-x-2 text-slate-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm"
              >
                <Info className="w-4 h-4" />
                <span>À propos</span>
              </a>
              <a 
                href="mailto:contact@opentoolsai.com" 
                className="flex items-center space-x-2 text-slate-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm"
              >
                <Mail className="w-4 h-4" />
                <span>Contactez-nous</span>
              </a>
              
              <div className="pt-4 border-t border-slate-200 dark:border-gray-700">
                <p className="text-xs text-slate-500 dark:text-gray-500">
                  Privacy-first • Open Source
                </p>
                <p className="text-xs text-slate-500 dark:text-gray-500 mt-1">
                  © 2024 OpenToolsAI. Tous droits réservés.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};