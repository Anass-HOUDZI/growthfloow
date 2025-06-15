
import { ToolModule } from '../../types/core';
import { TrendingUp, Target, Zap, BarChart3, Users, PieChart, LineChart, Activity, DollarSign, Settings, Lightbulb, Gauge } from 'lucide-react';
import { GrowthFunnelAnalyzer } from './GrowthFunnelAnalyzer';

export const growthTools: ToolModule[] = [
  {
    id: 'growth-funnel-analyzer',
    name: 'Growth Funnel Analyzer',
    category: 'growth',
    component: GrowthFunnelAnalyzer,
    config: {
      version: '1.0.0',
      description: 'Visualisation interactive des entonnoirs avec décomposition étape par étape',
      features: [
        'Analyse en temps réel des taux de conversion',
        'Visualisation D3.js avec animations fluides',
        'Détection automatique des goulots d\'étranglement',
        'Export PDF avec graphiques vectoriels',
        'Comparaison temporelle avec overlay'
      ],
      pricing: 'free',
      complexity: 'intermediate',
      estimatedTime: 10
    },
    apis: [],
    algorithms: [
      {
        name: 'conversionRateCalculation',
        function: (visitors: number, conversions: number) => (conversions / visitors) * 100,
        dependencies: [],
        complexity: 'O(1)'
      }
    ],
    dependencies: []
  },
  // Placeholder pour les 11 autres outils Growth
  {
    id: 'growth-experiment-designer',
    name: 'Growth Experiment Designer',
    category: 'growth',
    component: () => <div>Growth Experiment Designer - Coming Soon</div>,
    config: {
      version: '1.0.0',
      description: 'Framework A/B test avec calculateur de significativité statistique',
      features: ['Moteur statistique', 'Calculateur d\'échantillon', 'Timeline interactive'],
      pricing: 'free',
      complexity: 'advanced',
      estimatedTime: 15
    },
    apis: [],
    algorithms: [],
    dependencies: []
  },
  {
    id: 'channel-performance-optimizer',
    name: 'Channel Performance Optimizer',
    category: 'growth',
    component: () => <div>Channel Performance Optimizer - Coming Soon</div>,
    config: {
      version: '1.0.0',
      description: 'Matrice de priorisation ICE score automatisée',
      features: ['Matrix ICE', 'Allocation budgétaire', 'Attribution multi-touch'],
      pricing: 'free',
      complexity: 'advanced',
      estimatedTime: 20
    },
    apis: [],
    algorithms: [],
    dependencies: []
  }
];
