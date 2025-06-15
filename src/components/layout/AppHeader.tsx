
import React from 'react';
import { Bell, User } from 'lucide-react';

export const AppHeader: React.FC = () => {
  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-800">Tableau de Bord</h1>
          <p className="text-sm text-slate-600">Gérez vos outils de croissance marketing</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="p-2 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg">
            <Bell className="w-5 h-5" />
          </button>
          <button className="p-2 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg">
            <User className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};
