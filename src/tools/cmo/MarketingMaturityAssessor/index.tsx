
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Trophy, 
  Gauge, 
  TrendingUp, 
  Target, 
  Users, 
  BarChart3, 
  Settings, 
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Star,
  Clock,
  DollarSign
} from 'lucide-react';

interface AssessmentQuestion {
  id: string;
  category: string;
  question: string;
  options: { value: number; label: string; description: string }[];
}

interface MaturityLevel {
  level: number;
  name: string;
  description: string;
  color: string;
  characteristics: string[];
}

interface RecommendationItem {
  id: string;
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  effort: 'high' | 'medium' | 'low';
  priority: number;
  category: string;
  timeline: string;
}

const assessmentQuestions: AssessmentQuestion[] = [
  // Strategy & Planning
  {
    id: 'strategy_planning',
    category: 'Stratégie & Planification',
    question: 'Comment décririez-vous votre approche de planification marketing ?',
    options: [
      { value: 1, label: 'Réactive', description: 'Actions marketing ponctuelles sans plan structuré' },
      { value: 2, label: 'Basique', description: 'Plan annuel simple avec révisions trimestrielles' },
      { value: 3, label: 'Structurée', description: 'Planification détaillée avec KPIs et budgets' },
      { value: 4, label: 'Intégrée', description: 'Planning aligné sur la stratégie business globale' },
      { value: 5, label: 'Prédictive', description: 'Planification basée sur data et modèles prédictifs' }
    ]
  },
  {
    id: 'data_analytics',
    category: 'Data & Analytics',
    question: 'Quel est votre niveau d\'utilisation des données marketing ?',
    options: [
      { value: 1, label: 'Minimal', description: 'Données basiques (trafic web, emails ouverts)' },
      { value: 2, label: 'Descriptif', description: 'Reporting régulier avec métriques standards' },
      { value: 3, label: 'Diagnostic', description: 'Analyse des performances et identification des causes' },
      { value: 4, label: 'Prédictif', description: 'Modèles prédictifs et segmentation avancée' },
      { value: 5, label: 'Prescriptif', description: 'IA et machine learning pour optimisation automatique' }
    ]
  },
  {
    id: 'customer_experience',
    category: 'Expérience Client',
    question: 'Comment gérez-vous l\'expérience client cross-canal ?',
    options: [
      { value: 1, label: 'Silotée', description: 'Chaque canal fonctionne indépendamment' },
      { value: 2, label: 'Coordonnée', description: 'Messages cohérents entre les canaux principaux' },
      { value: 3, label: 'Intégrée', description: 'Vue unifiée du client et parcours mappés' },
      { value: 4, label: 'Personnalisée', description: 'Expériences personnalisées en temps réel' },
      { value: 5, label: 'Prédictive', description: 'Anticipation des besoins et actions proactives' }
    ]
  },
  {
    id: 'technology_stack',
    category: 'Stack Technologique',
    question: 'Comment qualifiez-vous votre infrastructure marketing tech ?',
    options: [
      { value: 1, label: 'Basique', description: 'Outils isolés sans intégration' },
      { value: 2, label: 'Connectée', description: 'Intégrations basiques entre outils principaux' },
      { value: 3, label: 'Intégrée', description: 'Stack cohérente avec données centralisées' },
      { value: 4, label: 'Optimisée', description: 'Automatisation avancée et workflows intelligents' },
      { value: 5, label: 'Intelligente', description: 'IA intégrée et optimisation continue' }
    ]
  },
  {
    id: 'team_capabilities',
    category: 'Compétences Équipe',
    question: 'Quel est le niveau de maturité de votre équipe marketing ?',
    options: [
      { value: 1, label: 'Généraliste', description: 'Équipe polyvalente sans spécialisations' },
      { value: 2, label: 'Spécialisée', description: 'Rôles définis par canal ou fonction' },
      { value: 3, label: 'Cross-fonctionnelle', description: 'Collaboration fluide entre spécialités' },
      { value: 4, label: 'Data-driven', description: 'Compétences analytiques avancées intégrées' },
      { value: 5, label: 'Adaptive', description: 'Formation continue et adaptation aux nouvelles technologies' }
    ]
  },
  {
    id: 'content_strategy',
    category: 'Stratégie de Contenu',
    question: 'Comment organisez-vous votre création et distribution de contenu ?',
    options: [
      { value: 1, label: 'Ad-hoc', description: 'Contenu créé selon les besoins immédiats' },
      { value: 2, label: 'Planifiée', description: 'Calendrier éditorial et thèmes définis' },
      { value: 3, label: 'Stratégique', description: 'Contenu aligné sur le parcours client' },
      { value: 4, label: 'Personnalisée', description: 'Contenu adapté aux segments et comportements' },
      { value: 5, label: 'Intelligente', description: 'Optimisation automatique basée sur la performance' }
    ]
  }
];

const maturityLevels: MaturityLevel[] = [
  {
    level: 1,
    name: 'Débutant',
    description: 'Marketing réactif et basique',
    color: 'text-red-600 bg-red-50',
    characteristics: [
      'Actions marketing ponctuelles',
      'Peu de mesure de performance',
      'Outils basiques et isolés',
      'Équipe généraliste'
    ]
  },
  {
    level: 2,
    name: 'En développement',
    description: 'Structuration en cours',
    color: 'text-orange-600 bg-orange-50',
    characteristics: [
      'Plans marketing structurés',
      'Métriques de base trackées',
      'Premiers outils spécialisés',
      'Rôles qui se définissent'
    ]
  },
  {
    level: 3,
    name: 'Intermédiaire',
    description: 'Marketing organisé et efficace',
    color: 'text-yellow-600 bg-yellow-50',
    characteristics: [
      'Stratégie marketing claire',
      'Analyse régulière des performances',
      'Stack tech intégrée',
      'Équipe spécialisée'
    ]
  },
  {
    level: 4,
    name: 'Avancé',
    description: 'Marketing data-driven et optimisé',
    color: 'text-blue-600 bg-blue-50',
    characteristics: [
      'Optimisation basée sur les données',
      'Personnalisation à grande échelle',
      'Automatisation avancée',
      'Culture data-driven'
    ]
  },
  {
    level: 5,
    name: 'Expert',
    description: 'Marketing prédictif et intelligent',
    color: 'text-green-600 bg-green-50',
    characteristics: [
      'IA et machine learning intégrés',
      'Prédiction et recommandations automatiques',
      'Innovation continue',
      'Équipe adaptive et experte'
    ]
  }
];

export const MarketingMaturityAssessor: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [activeTab, setActiveTab] = useState('assessment');

  const handleAnswer = (questionId: string, value: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const nextQuestion = () => {
    if (currentStep < assessmentQuestions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResults(true);
      setActiveTab('results');
    }
  };

  const calculateMaturityScore = () => {
    const totalScore = Object.values(answers).reduce((sum, score) => sum + score, 0);
    const maxScore = assessmentQuestions.length * 5;
    return Math.round((totalScore / maxScore) * 100);
  };

  const getMaturityLevel = () => {
    const score = calculateMaturityScore();
    if (score >= 85) return maturityLevels[4];
    if (score >= 70) return maturityLevels[3];
    if (score >= 55) return maturityLevels[2];
    if (score >= 40) return maturityLevels[1];
    return maturityLevels[0];
  };

  const getCategoryScores = () => {
    const categories = ['Stratégie & Planification', 'Data & Analytics', 'Expérience Client', 'Stack Technologique', 'Compétences Équipe', 'Stratégie de Contenu'];
    return categories.map(category => {
      const categoryQuestions = assessmentQuestions.filter(q => q.category === category);
      const categoryScore = categoryQuestions.reduce((sum, q) => sum + (answers[q.id] || 0), 0);
      const maxCategoryScore = categoryQuestions.length * 5;
      return {
        category,
        score: Math.round((categoryScore / maxCategoryScore) * 100)
      };
    });
  };

  const generateRecommendations = (): RecommendationItem[] => {
    const categoryScores = getCategoryScores();
    const recommendations: RecommendationItem[] = [];

    categoryScores.forEach((cat, index) => {
      if (cat.score < 60) {
        switch (cat.category) {
          case 'Stratégie & Planification':
            recommendations.push({
              id: 'strategy_improvement',
              title: 'Développer une stratégie marketing structurée',
              description: 'Mettre en place un plan marketing annuel avec objectifs SMART et KPIs définis',
              impact: 'high',
              effort: 'medium',
              priority: 1,
              category: cat.category,
              timeline: '3-6 mois'
            });
            break;
          case 'Data & Analytics':
            recommendations.push({
              id: 'analytics_setup',
              title: 'Implémenter un système d\'analytics robuste',
              description: 'Déployer des outils de tracking et créer des dashboards de performance',
              impact: 'high',
              effort: 'high',
              priority: 2,
              category: cat.category,
              timeline: '2-4 mois'
            });
            break;
          case 'Expérience Client':
            recommendations.push({
              id: 'customer_journey',
              title: 'Mapper et optimiser le parcours client',
              description: 'Identifier les points de friction et créer une expérience cohérente cross-canal',
              impact: 'high',
              effort: 'medium',
              priority: 1,
              category: cat.category,
              timeline: '4-8 mois'
            });
            break;
          case 'Stack Technologique':
            recommendations.push({
              id: 'tech_integration',
              title: 'Intégrer et optimiser la stack marketing',
              description: 'Connecter les outils existants et éliminer les silos de données',
              impact: 'medium',
              effort: 'high',
              priority: 3,
              category: cat.category,
              timeline: '6-12 mois'
            });
            break;
          case 'Compétences Équipe':
            recommendations.push({
              id: 'team_training',
              title: 'Former l\'équipe aux compétences digitales',
              description: 'Développer les compétences analytiques et techniques de l\'équipe',
              impact: 'medium',
              effort: 'medium',
              priority: 2,
              category: cat.category,
              timeline: '3-6 mois'
            });
            break;
          case 'Stratégie de Contenu':
            recommendations.push({
              id: 'content_strategy',
              title: 'Structurer la stratégie de contenu',
              description: 'Créer un calendrier éditorial et aligner le contenu sur les objectifs business',
              impact: 'medium',
              effort: 'low',
              priority: 2,
              category: cat.category,
              timeline: '1-3 mois'
            });
            break;
        }
      }
    });

    return recommendations.sort((a, b) => a.priority - b.priority);
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-green-600 bg-green-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-blue-600 bg-blue-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getEffortColor = (effort: string) => {
    switch (effort) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const resetAssessment = () => {
    setCurrentStep(0);
    setAnswers({});
    setShowResults(false);
    setActiveTab('assessment');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gauge className="w-6 h-6 text-indigo-500" />
            Marketing Maturity Assessor
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-600 mb-6">
            Évaluez la maturité de votre organisation marketing et générez une roadmap personnalisée.
          </p>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="assessment">Assessment</TabsTrigger>
              <TabsTrigger value="results" disabled={!showResults}>Résultats</TabsTrigger>
              <TabsTrigger value="roadmap" disabled={!showResults}>Roadmap</TabsTrigger>
            </TabsList>

            <TabsContent value="assessment" className="space-y-6">
              {!showResults && (
                <div className="space-y-6">
                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-slate-600">
                      <span>Question {currentStep + 1} sur {assessmentQuestions.length}</span>
                      <span>{Math.round(((currentStep + 1) / assessmentQuestions.length) * 100)}%</span>
                    </div>
                    <Progress value={((currentStep + 1) / assessmentQuestions.length) * 100} className="h-2" />
                  </div>

                  {/* Current Question */}
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline">{assessmentQuestions[currentStep].category}</Badge>
                      </div>
                      <CardTitle className="text-xl">
                        {assessmentQuestions[currentStep].question}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {assessmentQuestions[currentStep].options.map((option) => (
                        <Card 
                          key={option.value}
                          className={`cursor-pointer transition-all hover:bg-slate-50 ${
                            answers[assessmentQuestions[currentStep].id] === option.value 
                              ? 'ring-2 ring-indigo-500 bg-indigo-50' 
                              : ''
                          }`}
                          onClick={() => handleAnswer(assessmentQuestions[currentStep].id, option.value)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start gap-3">
                              <div className="flex items-center gap-2">
                                {Array.from({ length: option.value }, (_, i) => (
                                  <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                                ))}
                              </div>
                              <div className="flex-1">
                                <h4 className="font-semibold text-slate-800">{option.label}</h4>
                                <p className="text-sm text-slate-600">{option.description}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}

                      <div className="flex justify-between pt-4">
                        <Button 
                          variant="outline" 
                          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                          disabled={currentStep === 0}
                        >
                          Précédent
                        </Button>
                        <Button 
                          onClick={nextQuestion}
                          disabled={!answers[assessmentQuestions[currentStep].id]}
                          className="flex items-center gap-2"
                        >
                          {currentStep === assessmentQuestions.length - 1 ? 'Voir les résultats' : 'Suivant'}
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </TabsContent>

            <TabsContent value="results" className="space-y-6">
              {showResults && (
                <div className="space-y-6">
                  {/* Overall Score */}
                  <Card>
                    <CardHeader className="text-center">
                      <div className="flex items-center justify-center gap-2 mb-4">
                        <Trophy className="w-8 h-8 text-yellow-500" />
                        <CardTitle className="text-2xl">Score de Maturité Marketing</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="text-center space-y-4">
                      <div className="text-6xl font-bold text-indigo-600">
                        {calculateMaturityScore()}%
                      </div>
                      <Badge className={`text-lg px-4 py-2 ${getMaturityLevel().color}`}>
                        Niveau {getMaturityLevel().level} - {getMaturityLevel().name}
                      </Badge>
                      <p className="text-slate-600 max-w-2xl mx-auto">
                        {getMaturityLevel().description}
                      </p>
                    </CardContent>
                  </Card>

                  {/* Category Breakdown */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="w-5 h-5" />
                        Analyse par Catégorie
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {getCategoryScores().map((cat) => (
                        <div key={cat.category} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-slate-700">{cat.category}</span>
                            <span className="text-sm font-semibold text-slate-600">{cat.score}%</span>
                          </div>
                          <Progress value={cat.score} className="h-3" />
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Characteristics */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5" />
                        Caractéristiques de votre niveau
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {getMaturityLevel().characteristics.map((characteristic, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                            <span className="text-slate-700">{characteristic}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <div className="flex justify-center">
                    <Button onClick={resetAssessment} variant="outline">
                      Refaire l'assessment
                    </Button>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="roadmap" className="space-y-6">
              {showResults && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="w-6 h-6 text-indigo-500" />
                        Roadmap d'Amélioration Personnalisée
                      </CardTitle>
                      <p className="text-slate-600">
                        Recommandations priorisées pour faire évoluer votre maturité marketing
                      </p>
                    </CardHeader>
                  </Card>

                  {/* Recommendations */}
                  <div className="space-y-4">
                    {generateRecommendations().map((rec, index) => (
                      <Card key={rec.id} className="border-l-4 border-l-indigo-500">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <Badge variant="outline" className="text-xs">
                                  Priorité {rec.priority}
                                </Badge>
                                <Badge className={getImpactColor(rec.impact)}>
                                  Impact {rec.impact}
                                </Badge>
                                <Badge className={getEffortColor(rec.effort)}>
                                  Effort {rec.effort}
                                </Badge>
                              </div>
                              <h3 className="text-lg font-semibold text-slate-800 mb-2">
                                {rec.title}
                              </h3>
                              <p className="text-slate-600 mb-3">
                                {rec.description}
                              </p>
                              <div className="flex items-center gap-4 text-sm text-slate-500">
                                <div className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  {rec.timeline}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Settings className="w-4 h-4" />
                                  {rec.category}
                                </div>
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                                <span className="text-indigo-600 font-semibold text-sm">
                                  {index + 1}
                                </span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* Quick Actions */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5" />
                        Actions Immédiates (0-30 jours)
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                        <span className="text-green-800">Auditer les outils marketing actuels</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                        <CheckCircle2 className="w-5 h-5 text-blue-600" />
                        <span className="text-blue-800">Identifier les KPIs prioritaires à tracker</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                        <CheckCircle2 className="w-5 h-5 text-purple-600" />
                        <span className="text-purple-800">Former l'équipe aux bonnes pratiques</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
