
import { ToolModule } from '../../types/core';
import { Palette, MousePointer, TestTube, Gauge, Smartphone, Layout, Eye, Settings } from 'lucide-react';
import { LandingPageConverter } from './LandingPageConverter';
import { HeatmapSimulator } from './HeatmapSimulator';
import { CROElementTester } from './CROElementTester';
import { PageSpeedOptimizer } from './PageSpeedOptimizer';
import { MobileUXAnalyzer } from './MobileUXAnalyzer';
import { FormOptimizer } from './FormOptimizer';
import { TrustSignalAnalyzer } from './TrustSignalAnalyzer';
import { CTAOptimizer } from './CTAOptimizer';

export const landingTools: ToolModule[] = [
  {
    id: 'landing-page-converter',
    name: 'Landing Page Converter',
    category: 'landing',
    component: LandingPageConverter,
    config: {
      version: '1.0.0',
      description: 'Audit UX/UI avec recommandations de conversion',
      features: [
        'Analyse heuristique UX complète',
        'Score de conversion personnalisé',
        'Recommandations priorisées',
        'Mockups d\'optimisation'
      ],
      pricing: 'free',
      complexity: 'intermediate',
      estimatedTime: 10
    },
    apis: [],
    algorithms: [],
    dependencies: []
  },
  {
    id: 'heatmap-simulator',
    name: 'Heatmap Simulator',
    category: 'landing',
    component: HeatmapSimulator,
    config: {
      version: '1.0.0',
      description: 'Prédiction eye-tracking basée sur les patterns UX',
      features: [
        'Simulation de heatmap visuelle',
        'Analyse eye-tracking prédictive',
        'Zones d\'attention identifiées',
        'Recommandations de placement'
      ],
      pricing: 'premium',
      complexity: 'advanced',
      estimatedTime: 15
    },
    apis: [],
    algorithms: [],
    dependencies: []
  },
  {
    id: 'cro-element-tester',
    name: 'CRO Element Tester',
    category: 'landing',
    component: CROElementTester,
    config: {
      version: '1.0.0',
      description: 'Framework de test d\'éléments de conversion',
      features: [
        'Tests A/B d\'éléments spécifiques',
        'Calculateur de significativité',
        'Bibliothèque de variations',
        'Rapport de performance'
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
    id: 'page-speed-optimizer',
    name: 'Page Speed Optimizer',
    category: 'landing',
    component: PageSpeedOptimizer,
    config: {
      version: '1.0.0',
      description: 'Audit technique avec recommandations d\'optimisation',
      features: [
        'Analyse de performance complète',
        'Recommandations techniques',
        'Impact sur la conversion',
        'Plan d\'optimisation'
      ],
      pricing: 'free',
      complexity: 'advanced',
      estimatedTime: 8
    },
    apis: [],
    algorithms: [],
    dependencies: []
  },
  {
    id: 'mobile-ux-analyzer',
    name: 'Mobile UX Analyzer',
    category: 'landing',
    component: MobileUXAnalyzer,
    config: {
      version: '1.0.0',
      description: 'Optimisation expérience mobile spécialisée',
      features: [
        'Audit UX mobile complet',
        'Tests de responsive design',
        'Optimisation tactile',
        'Performance mobile'
      ],
      pricing: 'free',
      complexity: 'intermediate',
      estimatedTime: 10
    },
    apis: [],
    algorithms: [],
    dependencies: []
  },
  {
    id: 'form-optimizer',
    name: 'Form Optimizer',
    category: 'landing',
    component: FormOptimizer,
    config: {
      version: '1.0.0',
      description: 'Réduction friction formulaires avec analytics',
      features: [
        'Analyse de friction formulaire',
        'Optimisation des champs',
        'Tests de validation',
        'Amélioration du taux de completion'
      ],
      pricing: 'free',
      complexity: 'intermediate',
      estimatedTime: 8
    },
    apis: [],
    algorithms: [],
    dependencies: []
  },
  {
    id: 'trust-signal-analyzer',
    name: 'Trust Signal Analyzer',
    category: 'landing',
    component: TrustSignalAnalyzer,
    config: {
      version: '1.0.0',
      description: 'Optimisation signaux de confiance et crédibilité',
      features: [
        'Audit des signaux de confiance',
        'Recommandations de crédibilité',
        'Tests de témoignages',
        'Optimisation de la confiance'
      ],
      pricing: 'free',
      complexity: 'simple',
      estimatedTime: 6
    },
    apis: [],
    algorithms: [],
    dependencies: []
  },
  {
    id: 'cta-optimizer',
    name: 'CTA Optimizer',
    category: 'landing',
    component: CTAOptimizer,
    config: {
      version: '1.0.0',
      description: 'Optimisation boutons call-to-action avec A/B testing',
      features: [
        'Tests A/B de CTA',
        'Optimisation du wording',
        'Tests de couleurs et formes',
        'Analyse de performance'
      ],
      pricing: 'free',
      complexity: 'simple',
      estimatedTime: 5
    },
    apis: [],
    algorithms: [],
    dependencies: []
  }
];

// Export individual components for direct import
export { LandingPageConverter } from './LandingPageConverter';
export { HeatmapSimulator } from './HeatmapSimulator';
export { CROElementTester } from './CROElementTester';
export { PageSpeedOptimizer } from './PageSpeedOptimizer';
export { MobileUXAnalyzer } from './MobileUXAnalyzer';
export { FormOptimizer } from './FormOptimizer';
export { TrustSignalAnalyzer } from './TrustSignalAnalyzer';
export { CTAOptimizer } from './CTAOptimizer';
