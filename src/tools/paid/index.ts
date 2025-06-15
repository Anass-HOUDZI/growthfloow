
import { ToolModule } from '../../types/core';
import { 
  BarChart3, Calculator, Image, Users, 
  Facebook, Search
} from 'lucide-react';
import { AdPerformanceOptimizer } from './AdPerformanceOptimizer';
import { BidStrategyCalculator } from './BidStrategyCalculator';
import { AdCreativeAnalyzer } from './AdCreativeAnalyzer';
import { AudienceOverlapDetector } from './AudienceOverlapDetector';
import { FacebookAdsOptimizer } from './FacebookAdsOptimizer';
import { GoogleAdsPerformanceHub } from './GoogleAdsPerformanceHub';

export const paidMarketingTools: ToolModule[] = [
  {
    id: 'ad-performance-optimizer',
    name: 'Ad Performance Optimizer',
    category: 'paid',
    component: AdPerformanceOptimizer,
    config: {
      version: '1.0.0',
      description: 'Analyse multi-plateformes avec recommandations',
      features: [
        'Analyse cross-platform (Facebook, Google, LinkedIn)',
        'Détection automatique des sous-performances',
        'Recommandations d\'optimisation personnalisées', 
        'Prédiction d\'impact des changements'
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
    id: 'bid-strategy-calculator',
    name: 'Bid Strategy Calculator',
    category: 'paid',
    component: BidStrategyCalculator,
    config: {
      version: '1.0.0',
      description: 'Optimisation enchères selon objectifs',
      features: [
        'Calculateur de stratégies d\'enchères',
        'Simulation performance selon budget',
        'Recommandations basées sur historique',
        'Optimisation CPA/ROAS cible'
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
    id: 'ad-creative-analyzer',
    name: 'Ad Creative Analyzer',
    category: 'paid',
    component: AdCreativeAnalyzer,
    config: {
      version: '1.0.0',
      description: 'Scoring créatifs basé sur best practices',
      features: [
        'Analyse IA des éléments visuels et textuels',
        'Score de performance prédictif',
        'Recommandations d\'amélioration spécifiques',
        'Comparaison performance créatifs'
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
    id: 'audience-overlap-detector',
    name: 'Audience Overlap Detector',
    category: 'paid',
    component: AudienceOverlapDetector,
    config: {
      version: '1.0.0',
      description: 'Analyse de chevauchements cross-platform',
      features: [
        'Détection automatique des chevauchements',
        'Calcul d\'impact sur les coûts',
        'Recommandations d\'optimisation audiences',
        'Estimation des économies potentielles'
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
    id: 'facebook-ads-optimizer',
    name: 'Facebook Ads Optimizer',
    category: 'paid',
    component: FacebookAdsOptimizer,
    config: {
      version: '1.0.0',
      description: 'Optimisation spécifique Facebook Ads',
      features: [
        'Analyse détaillée des campagnes Facebook',
        'Monitoring score de pertinence et fréquence',
        'Recommandations budgets et ciblages',
        'Détection des opportunités d\'optimisation'
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
    id: 'google-ads-performance-hub',
    name: 'Google Ads Performance Hub',
    category: 'paid',
    component: GoogleAdsPerformanceHub,
    config: {
      version: '1.0.0',
      description: 'Hub de performance Google Ads complet',
      features: [
        'Dashboard unifié multi-campagnes',
        'Analyse détaillée des mots-clés',
        'Monitoring Quality Score et Impression Share',
        'Recommandations d\'optimisation automatisées'
      ],
      pricing: 'free',
      complexity: 'intermediate',
      estimatedTime: 12
    },
    apis: [],
    algorithms: [],
    dependencies: []
  }
];
