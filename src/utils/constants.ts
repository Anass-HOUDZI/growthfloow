import { 
  TrendingUp, 
  Search, 
  MousePointer, 
  Target, 
  Users, 
  BarChart3,
  Sparkles
} from 'lucide-react';

export const categories = [
  { 
    id: 'all', 
    name: 'Tous les outils', 
    icon: Sparkles,
    description: 'Explorez tous nos outils de marketing digital',
    gradient: 'from-slate-300 to-slate-400',
    bgGradient: 'from-slate-50 to-slate-100',
    textColor: 'text-slate-600',
    selectedBg: 'bg-slate-100',
    selectedText: 'text-slate-700',
    selectedRing: 'ring-slate-300'
  },
  { 
    id: 'growth', 
    name: 'Growth Marketing', 
    icon: TrendingUp,
    description: 'Outils pour analyser et optimiser la croissance',
    gradient: 'from-blue-400 to-blue-500',
    bgGradient: 'bg-blue-50',
    textColor: 'text-blue-600',
    selectedBg: 'bg-blue-100',
    selectedText: 'text-blue-700',
    selectedRing: 'ring-blue-300'
  },
  { 
    id: 'seo', 
    name: 'SEO & Contenu', 
    icon: Search,
    description: 'Optimisez votre référencement et votre contenu',
    gradient: 'from-emerald-400 to-emerald-500',
    bgGradient: 'bg-emerald-50',
    textColor: 'text-emerald-600',
    selectedBg: 'bg-emerald-100',
    selectedText: 'text-emerald-700',
    selectedRing: 'ring-emerald-300'
  },
  { 
    id: 'landing', 
    name: 'Landing Pages', 
    icon: MousePointer,
    description: 'Analysez et optimisez vos pages de conversion',
    gradient: 'from-violet-400 to-violet-500',
    bgGradient: 'bg-violet-50',
    textColor: 'text-violet-600',
    selectedBg: 'bg-violet-100',
    selectedText: 'text-violet-700',
    selectedRing: 'ring-violet-300'
  },
  { 
    id: 'paid', 
    name: 'Publicité Payante', 
    icon: Target,
    description: 'Optimisez vos campagnes publicitaires payantes',
    gradient: 'from-rose-400 to-rose-500',
    bgGradient: 'bg-rose-50',
    textColor: 'text-rose-600',
    selectedBg: 'bg-rose-100',
    selectedText: 'text-rose-700',
    selectedRing: 'ring-rose-300'
  },
  { 
    id: 'outbound', 
    name: 'Outbound Sales', 
    icon: Users,
    description: 'Outils pour vos stratégies de vente sortante',
    gradient: 'from-amber-400 to-amber-500',
    bgGradient: 'bg-amber-50',
    textColor: 'text-amber-600',
    selectedBg: 'bg-amber-100',
    selectedText: 'text-amber-700',
    selectedRing: 'ring-amber-300'
  },
  { 
    id: 'cmo', 
    name: 'CMO Tools', 
    icon: BarChart3,
    description: 'Tableaux de bord et outils de direction marketing',
    gradient: 'from-indigo-400 to-indigo-500',
    bgGradient: 'bg-indigo-50',
    textColor: 'text-indigo-600',
    selectedBg: 'bg-indigo-100',
    selectedText: 'text-indigo-700',
    selectedRing: 'ring-indigo-300'
  }
];

export const getToolCount = (categoryId: string): number => {
  const counts: Record<string, number> = {
    'all': 50,
    'growth': 6,
    'seo': 4,
    'landing': 8,
    'paid': 6,
    'outbound': 8,
    'cmo': 4
  };
  return counts[categoryId] || 0;
};