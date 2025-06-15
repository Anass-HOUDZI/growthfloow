
import { ToolModule } from '../../types/core';
import { Users, Mail, Target, MessageSquare, Linkedin, Calendar, Building, TrendingUp } from 'lucide-react';
import { ProspectIntentDetector } from './ProspectIntentDetector';
import { OutboundSequenceGenerator } from './OutboundSequenceGenerator';
import { ABMAccountScorer } from './ABMAccountScorer';
import { ColdEmailOptimizer } from './ColdEmailOptimizer';

export const outboundTools: ToolModule[] = [
  {
    id: 'prospect-intent-detector',
    name: 'Prospect Intent Detector',
    category: 'outbound',
    component: ProspectIntentDetector,
    config: {
      version: '1.0.0',
      description: 'Identification de signaux d\'achat via APIs publiques',
      features: [
        'Détection automatique de signaux d\'intention',
        'Scoring prédictif basé sur l\'activité',
        'Recommandations de timing de contact',
        'Surveillance multi-sources (LinkedIn, news, etc.)'
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
    id: 'outbound-sequence-generator',
    name: 'Outbound Sequence Generator',
    category: 'outbound',
    component: OutboundSequenceGenerator,
    config: {
      version: '1.0.0',
      description: 'Templates de séquences avec personnalisation',
      features: [
        'Templates optimisés par industrie/persona',
        'Séquences multi-canal (email, LinkedIn, phone)',
        'Personnalisation automatique avancée',
        'Analytics de performance intégrées'
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
    id: 'abm-account-scorer',
    name: 'ABM Account Scorer',
    category: 'outbound',
    component: ABMAccountScorer,
    config: {
      version: '1.0.0',
      description: 'Scoring automatique avec critères personnalisables',
      features: [
        'Système de scoring pondéré personnalisable',
        'Critères multiples (taille, secteur, technologie)',
        'Classification automatique en tiers (A/B/C/D)',
        'Recommandations d\'actions ABM'
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
    id: 'cold-email-optimizer',
    name: 'Cold Email Optimizer',
    category: 'outbound',
    component: ColdEmailOptimizer,
    config: {
      version: '1.0.0',
      description: 'Optimisation avec prédiction de deliverability',
      features: [
        'Analyse de délivrabilité avancée',
        'Prédiction des taux d\'ouverture/réponse',
        'Détection automatique des mots spam',
        'Génération de versions optimisées'
      ],
      pricing: 'free',
      complexity: 'intermediate',
      estimatedTime: 8
    },
    apis: [],
    algorithms: [],
    dependencies: []
  }
];
