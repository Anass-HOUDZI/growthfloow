
import { 
  TrendingUp, BarChart3, Target, Zap, Calculator, PieChart,
  Search, FileText, Eye, Globe, Code, Link,
  Palette, MousePointer, Gauge, Smartphone, TestTube, Layout,
  Mail, Users, Phone, MessageSquare, UserCheck, Building,
  DollarSign, Presentation, CrosshairIcon, TrendingDown, 
  Settings, User, Trophy, BrainCircuit
} from 'lucide-react';

export const toolsData = [
  // Growth Marketing & Strategy (12 outils)
  {
    id: 'growth-metrics',
    name: 'Growth Metrics Calculator',
    description: 'Suite complète CAC/LTV/Payback/Cohort Analysis avec visualisations interactives',
    category: 'growth',
    icon: Calculator,
    isPremium: false
  },
  {
    id: 'growth-funnel',
    name: 'Growth Funnel Analyzer',
    description: 'Visualisation interactive des entonnoirs avec décomposition étape par étape',
    category: 'growth',
    icon: TrendingUp,
    isPremium: false
  },
  {
    id: 'experiment-designer',
    name: 'Growth Experiment Designer',
    description: 'Framework A/B test avec calculateur de significativité statistique',
    category: 'growth',
    icon: TestTube,
    isPremium: false
  },
  {
    id: 'channel-optimizer',
    name: 'Channel Performance Optimizer',
    description: 'Matrice de priorisation ICE score automatisée',
    category: 'growth',
    icon: Target,
    isPremium: false
  },
  {
    id: 'gtm-builder',
    name: 'GTM Strategy Builder',
    description: 'Templates go-to-market avec personnalisation sectorielle',
    category: 'growth',
    icon: Zap,
    isPremium: false
  },
  {
    id: 'conversion-predictor',
    name: 'Conversion Rate Predictor',
    description: 'Modèles prédictifs basés sur benchmarks sectoriels',
    category: 'growth',
    icon: PieChart,
    isPremium: true
  },

  // SEO & Content (10 outils)
  {
    id: 'seo-optimizer',
    name: 'SEO Content Optimizer',
    description: 'Analyse sémantique temps réel avec recommandations',
    category: 'seo',
    icon: Search,
    isPremium: false
  },
  {
    id: 'keyword-finder',
    name: 'Keyword Opportunity Finder',
    description: 'Détection longue traîne avec scoring de difficulté',
    category: 'seo',
    icon: FileText,
    isPremium: false
  },
  {
    id: 'content-gap',
    name: 'Content Gap Analyzer',
    description: 'Analyse concurrentielle de gaps de contenu',
    category: 'seo',
    icon: Eye,
    isPremium: false
  },
  {
    id: 'serp-tracker',
    name: 'SERP Feature Tracker',
    description: 'Monitoring des opportunités features SERP',
    category: 'seo',
    icon: Globe,
    isPremium: false
  },

  // Landing Pages & CRO (8 outils)
  {
    id: 'landing-converter',
    name: 'Landing Page Converter',
    description: 'Audit UX/UI avec recommandations de conversion',
    category: 'landing',
    icon: Palette,
    isPremium: false
  },
  {
    id: 'heatmap-simulator',
    name: 'Heatmap Simulator',
    description: 'Prédiction eye-tracking basée sur les patterns UX',
    category: 'landing',
    icon: MousePointer,
    isPremium: true
  },
  {
    id: 'cro-tester',
    name: 'CRO Element Tester',
    description: 'Framework de test d\'éléments de conversion',
    category: 'landing',
    icon: TestTube,
    isPremium: false
  },
  {
    id: 'speed-optimizer',
    name: 'Page Speed Optimizer',
    description: 'Audit technique avec recommandations d\'optimisation',
    category: 'landing',
    icon: Gauge,
    isPremium: false
  },

  // Outbound & ABM (8 outils)
  {
    id: 'prospect-intent-detector',
    name: 'Prospect Intent Detector',
    description: 'Identification de signaux d\'achat via APIs publiques',
    category: 'outbound',
    icon: UserCheck,
    isPremium: true
  },
  {
    id: 'outbound-sequence-generator',
    name: 'Outbound Sequence Generator',
    description: 'Templates de séquences avec personnalisation',
    category: 'outbound',
    icon: Mail,
    isPremium: false
  },
  {
    id: 'abm-account-scorer',
    name: 'ABM Account Scorer',
    description: 'Scoring automatique avec critères personnalisables',
    category: 'outbound',
    icon: Building,
    isPremium: false
  },
  {
    id: 'cold-email-optimizer',
    name: 'Cold Email Optimizer',
    description: 'Optimisation avec prédiction de deliverability',
    category: 'outbound',
    icon: MessageSquare,
    isPremium: false
  },
  {
    id: 'sales-intelligence-hub',
    name: 'Sales Intelligence Hub',
    description: 'Collecte et analyse des signaux d\'achat, données d\'entreprise et contacts clés',
    category: 'outbound',
    icon: BarChart3,
    isPremium: false
  },

  // Paid Marketing (6 outils)
  {
    id: 'ad-performance-optimizer',
    name: 'Ad Performance Optimizer',
    description: 'Analyse multi-plateformes avec recommandations automatisées',
    category: 'paid',
    icon: Presentation,
    isPremium: false
  },
  {
    id: 'bid-strategy-calculator',
    name: 'Bid Strategy Calculator',
    description: 'Optimisation enchères selon objectifs et budget',
    category: 'paid',
    icon: Calculator,
    isPremium: false
  },
  {
    id: 'ad-creative-analyzer',
    name: 'Ad Creative Analyzer',
    description: 'Scoring créatifs basé sur best practices et IA',
    category: 'paid',
    icon: CrosshairIcon,
    isPremium: true
  },
  {
    id: 'audience-overlap-detector',
    name: 'Audience Overlap Detector',
    description: 'Analyse de chevauchements cross-platform',
    category: 'paid',
    icon: Users,
    isPremium: false
  },
  {
    id: 'facebook-ads-optimizer',
    name: 'Facebook Ads Optimizer',
    description: 'Optimisation spécifique Facebook Ads avec recommandations',
    category: 'paid',
    icon: DollarSign,
    isPremium: false
  },
  {
    id: 'google-ads-performance-hub',
    name: 'Google Ads Performance Hub',
    description: 'Hub complet de performance Google Ads',
    category: 'paid',
    icon: BrainCircuit,
    isPremium: false
  },

  // CMO & Leadership (6 outils)
  {
    id: 'cmo-dashboard-builder',
    name: 'CMO Dashboard Builder',
    description: 'Tableaux de bord exécutifs personnalisables',
    category: 'cmo',
    icon: BarChart3,
    isPremium: false
  },
  {
    id: 'marketing-roi-tracker',
    name: 'Marketing ROI Tracker',
    description: 'Attribution multi-touch avec modélisation',
    category: 'cmo',
    icon: TrendingDown,
    isPremium: true
  },
  {
    id: 'budget-planner',
    name: 'Budget Planning Assistant',
    description: 'Planification avec scenarios et simulations',
    category: 'cmo',
    icon: Settings,
    isPremium: false
  },
  {
    id: 'maturity-assessor',
    name: 'Marketing Maturity Assessor',
    description: 'Framework d\'évaluation avec roadmap',
    category: 'cmo',
    icon: Trophy,
    isPremium: false
  }
];
