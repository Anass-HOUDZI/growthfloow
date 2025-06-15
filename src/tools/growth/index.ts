import { ToolModule } from '../../types/core';
import { TrendingUp, Target, Zap, BarChart3, Users, PieChart, LineChart, Activity, DollarSign, Settings, Lightbulb, Gauge } from 'lucide-react';
import { GrowthFunnelAnalyzer } from './GrowthFunnelAnalyzer';
import { GrowthExperimentDesigner } from './GrowthExperimentDesigner';
import { ChannelPerformanceOptimizer } from './ChannelPerformanceOptimizer';
import { GTMStrategyBuilder } from './GTMStrategyBuilder';
import { ConversionRatePredictor } from './ConversionRatePredictor';
import { GrowthMetricsCalculator } from './GrowthMetricsCalculator';

export { GrowthFunnelAnalyzer } from './GrowthFunnelAnalyzer';
export { GrowthExperimentDesigner } from './GrowthExperimentDesigner';
export { ChannelPerformanceOptimizer } from './ChannelPerformanceOptimizer';
export { GTMStrategyBuilder } from './GTMStrategyBuilder';
export { ConversionRatePredictor } from './ConversionRatePredictor';
export { GrowthMetricsCalculator } from './GrowthMetricsCalculator';

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
  {
    id: 'growth-experiment-designer',
    name: 'Growth Experiment Designer',
    category: 'growth',
    component: GrowthExperimentDesigner,
    config: {
      version: '1.0.0',
      description: 'Framework A/B test avec calculateur de significativité statistique',
      features: [
        'Moteur statistique complet',
        'Calculateur d\'échantillon automatique',
        'Timeline interactive avec milestones',
        'Templates d\'hypothèses pré-configurés'
      ],
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
    component: ChannelPerformanceOptimizer,
    config: {
      version: '1.0.0',
      description: 'Matrice de priorisation ICE score automatisée',
      features: [
        'Matrix ICE interactive',
        'Allocation budgétaire optimisée',
        'Attribution multi-touch',
        'Simulation Monte Carlo'
      ],
      pricing: 'free',
      complexity: 'advanced',
      estimatedTime: 20
    },
    apis: [],
    algorithms: [],
    dependencies: []
  },
  {
    id: 'gtm-strategy-builder',
    name: 'GTM Strategy Builder',
    category: 'growth',
    component: GTMStrategyBuilder,
    config: {
      version: '1.0.0',
      description: 'Templates go-to-market avec personnalisation sectorielle',
      features: [
        'Templates sectoriels',
        'Personnalisation avancée',
        'Timeline de lancement',
        'Métriques de suivi'
      ],
      pricing: 'free',
      complexity: 'intermediate',
      estimatedTime: 12
    },
    apis: [],
    algorithms: [],
    dependencies: []
  },
  {
    id: 'conversion-rate-predictor',
    name: 'Conversion Rate Predictor',
    category: 'growth',
    component: ConversionRatePredictor,
    config: {
      version: '1.0.0',
      description: 'Modèles prédictifs basés sur benchmarks sectoriels',
      features: [
        'Modèles ML prédictifs',
        'Benchmarks sectoriels',
        'Analyse prédictive',
        'Recommandations automatiques'
      ],
      pricing: 'premium',
      complexity: 'advanced',
      estimatedTime: 18
    },
    apis: [],
    algorithms: [],
    dependencies: []
  },
  {
    id: 'growth-metrics-calculator',
    name: 'Growth Metrics Calculator',
    category: 'growth',
    component: GrowthMetricsCalculator,
    config: {
      version: '1.0.0',
      description: 'Suite complète CAC/LTV/Payback/Cohort Analysis',
      features: [
        'Calcul CAC/LTV automatique',
        'Analyse de cohortes',
        'Payback period analysis',
        'Visualisations interactives'
      ],
      pricing: 'free',
      complexity: 'intermediate',
      estimatedTime: 10
    },
    apis: [],
    algorithms: [],
    dependencies: []
  }
];
