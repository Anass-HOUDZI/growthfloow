
import { ToolModule } from '../../types/core';
import { Search, FileText, Eye, Globe, Code, Link, Users, BarChart3 } from 'lucide-react';
import { SEOContentOptimizer } from './SEOContentOptimizer';
import { KeywordOpportunityFinder } from './KeywordOpportunityFinder';
import { ContentGapAnalyzer } from './ContentGapAnalyzer';
import { SERPFeatureTracker } from './SERPFeatureTracker';

export const seoTools: ToolModule[] = [
  {
    id: 'seo-content-optimizer',
    name: 'SEO Content Optimizer',
    category: 'seo',
    component: SEOContentOptimizer,
    config: {
      version: '1.0.0',
      description: 'Analyse sémantique temps réel avec recommandations SEO avancées',
      features: [
        'Analyse TF-IDF en temps réel',
        'Suggestions de mots-clés longue traîne',
        'Score de lisibilité automatique',
        'Optimisation meta tags'
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
    id: 'keyword-opportunity-finder',
    name: 'Keyword Opportunity Finder',
    category: 'seo',
    component: KeywordOpportunityFinder,
    config: {
      version: '1.0.0',
      description: 'Détection longue traîne avec scoring de difficulté',
      features: [
        'Recherche de mots-clés longue traîne',
        'Score de difficulté SEO',
        'Volume de recherche estimé',
        'Analyse de la concurrence'
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
    id: 'content-gap-analyzer',
    name: 'Content Gap Analyzer',
    category: 'seo',
    component: ContentGapAnalyzer,
    config: {
      version: '1.0.0',
      description: 'Analyse concurrentielle de gaps de contenu',
      features: [
        'Analyse concurrentielle automatique',
        'Détection des gaps de contenu',
        'Opportunités de mots-clés',
        'Rapport de recommandations'
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
    id: 'serp-feature-tracker',
    name: 'SERP Feature Tracker',
    category: 'seo',
    component: SERPFeatureTracker,
    config: {
      version: '1.0.0',
      description: 'Monitoring des opportunités features SERP',
      features: [
        'Tracking des features SERP',
        'Alertes d\'opportunités',
        'Analyse de la position 0',
        'Monitoring de la concurrence'
      ],
      pricing: 'premium',
      complexity: 'advanced',
      estimatedTime: 12
    },
    apis: [],
    algorithms: [],
    dependencies: []
  }
];
