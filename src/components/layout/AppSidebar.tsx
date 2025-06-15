
import React from 'react';
import { Home, Settings } from 'lucide-react';

export const AppSidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
      <div className="p-4 border-b border-slate-200">
        <h2 className="text-lg font-semibold text-slate-800">Growth Marketing Suite</h2>
      </div>
      
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          <a href="/" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100">
            <Home className="w-5 h-5" />
            <span>Accueil</span>
          </a>
          <a href="/settings" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100">
            <Settings className="w-5 h-5" />
            <span>Paramètres</span>
          </a>
        </div>
      </nav>
    </aside>
  );
};
