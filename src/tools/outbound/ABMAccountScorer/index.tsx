
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Building, Users, DollarSign, Target, TrendingUp, AlertCircle } from 'lucide-react';

interface ScoringCriteria {
  id: string;
  name: string;
  weight: number;
  enabled: boolean;
  description: string;
}

interface AccountScore {
  companyName: string;
  totalScore: number;
  tier: 'A' | 'B' | 'C' | 'D';
  criteria: Record<string, number>;
  recommendation: string;
  priority: 'high' | 'medium' | 'low';
}

export const ABMAccountScorer = () => {
  const [companyName, setCompanyName] = useState('');
  const [isScoring, setIsScoring] = useState(false);
  const [accountScore, setAccountScore] = useState<AccountScore | null>(null);
  
  const [scoringCriteria, setScoringCriteria] = useState<ScoringCriteria[]>([
    {
      id: 'company_size',
      name: 'Taille de l\'entreprise',
      weight: 25,
      enabled: true,
      description: 'Nombre d\'employés et chiffre d\'affaires'
    },
    {
      id: 'industry_fit',
      name: 'Adéquation secteur',
      weight: 20,
      enabled: true,
      description: 'Alignement avec votre marché cible'
    },
    {
      id: 'technology_stack',
      name: 'Stack technologique',
      weight: 15,
      enabled: true,
      description: 'Technologies utilisées et maturité'
    },
    {
      id: 'growth_signals',
      name: 'Signaux de croissance',
      weight: 15,
      enabled: true,
      description: 'Financement, embauches, expansion'
    },
    {
      id: 'engagement_level',
      name: 'Niveau d\'engagement',
      weight: 10,
      enabled: true,
      description: 'Interactions avec votre contenu'
    },
    {
      id: 'competitive_landscape',
      name: 'Paysage concurrentiel',
      weight: 10,
      enabled: true,
      description: 'Solutions concurrentes utilisées'
    },
    {
      id: 'decision_makers',
      name: 'Décideurs identifiés',
      weight: 5,
      enabled: true,
      description: 'Contacts clés accessibles'
    }
  ]);

  const updateCriteriaWeight = (id: string, weight: number) => {
    setScoringCriteria(prev => 
      prev.map(criteria => 
        criteria.id === id ? { ...criteria, weight } : criteria
      )
    );
  };

  const toggleCriteria = (id: string) => {
    setScoringCriteria(prev =>
      prev.map(criteria =>
        criteria.id === id ? { ...criteria, enabled: !criteria.enabled } : criteria
      )
    );
  };

  const scoreAccount = async () => {
    setIsScoring(true);
    
    // Simulation du scoring
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockScores = {
      company_size: 85,
      industry_fit: 75,
      technology_stack: 60,
      growth_signals: 90,
      engagement_level: 45,
      competitive_landscape: 70,
      decision_makers: 80
    };

    // Calcul du score pondéré
    const enabledCriteria = scoringCriteria.filter(c => c.enabled);
    const totalWeight = enabledCriteria.reduce((sum, c) => sum + c.weight, 0);
    
    const weightedScore = enabledCriteria.reduce((sum, criteria) => {
      const score = mockScores[criteria.id as keyof typeof mockScores] || 0;
      return sum + (score * criteria.weight / totalWeight);
    }, 0);

    const tier = weightedScore >= 80 ? 'A' : 
                 weightedScore >= 65 ? 'B' : 
                 weightedScore >= 50 ? 'C' : 'D';

    const priority = tier === 'A' ? 'high' : tier === 'B' ? 'medium' : 'low';

    setAccountScore({
      companyName: companyName || 'Entreprise Cible',
      totalScore: Math.round(weightedScore),
      tier,
      criteria: mockScores,
      recommendation: getRecommendation(tier),
      priority
    });

    setIsScoring(false);
  };

  const getRecommendation = (tier: string) => {
    switch (tier) {
      case 'A': return 'Compte prioritaire - Engagement ABM complet recommandé';
      case 'B': return 'Compte qualifié - Approche personnalisée conseillée';
      case 'C': return 'Compte potentiel - Nurturing à moyen terme';
      case 'D': return 'Compte à faible priorité - Surveillance passive';
      default: return '';
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'A': return 'bg-green-500';
      case 'B': return 'bg-blue-500';
      case 'C': return 'bg-yellow-500';
      case 'D': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto">
          <Target className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-slate-800">
          ABM Account Scorer
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Évaluez automatiquement vos comptes cibles avec un système de scoring personnalisable basé sur vos critères métier.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Configuration du scoring */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Building className="w-5 h-5" />
              <span>Configuration du Scoring</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="company-name">Nom de l'entreprise à évaluer</Label>
              <Input
                id="company-name"
                placeholder="TechCorp Inc."
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>

            <div className="space-y-4">
              <h3 className="font-medium text-slate-800">Critères de scoring</h3>
              {scoringCriteria.map((criteria) => (
                <div key={criteria.id} className="space-y-2 p-4 border border-slate-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={criteria.enabled}
                        onCheckedChange={() => toggleCriteria(criteria.id)}
                      />
                      <span className="font-medium text-slate-800">{criteria.name}</span>
                    </div>
                    <Badge variant="outline">{criteria.weight}%</Badge>
                  </div>
                  
                  <p className="text-sm text-slate-600">{criteria.description}</p>
                  
                  {criteria.enabled && (
                    <div className="space-y-2">
                      <Label className="text-xs">Pondération: {criteria.weight}%</Label>
                      <Slider
                        value={[criteria.weight]}
                        onValueChange={(value) => updateCriteriaWeight(criteria.id, value[0])}
                        max={50}
                        step={5}
                        className="w-full"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <Button 
              onClick={scoreAccount}
              disabled={isScoring || !companyName}
              className="w-full"
            >
              {isScoring ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Évaluation en cours...
                </>
              ) : (
                <>
                  <Target className="w-4 h-4 mr-2" />
                  Évaluer le compte
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Résultats du scoring */}
        {accountScore && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5" />
                <span>Résultat du Scoring</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Score global */}
              <div className="text-center space-y-4">
                <h3 className="text-xl font-semibold text-slate-800">{accountScore.companyName}</h3>
                
                <div className="relative w-32 h-32 mx-auto">
                  <svg className="w-32 h-32 transform -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      className="text-gray-200"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 56}`}
                      strokeDashoffset={`${2 * Math.PI * 56 * (1 - accountScore.totalScore / 100)}`}
                      className={`${getTierColor(accountScore.tier)} transition-all duration-1000`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-slate-800">{accountScore.totalScore}</div>
                      <div className="text-lg font-semibold">{accountScore.tier}</div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <Badge className={getPriorityColor(accountScore.priority)}>
                    Priorité {accountScore.priority}
                  </Badge>
                </div>
              </div>

              {/* Détail par critère */}
              <div className="space-y-3">
                <h4 className="font-medium text-slate-800">Détail par critère</h4>
                {scoringCriteria
                  .filter(c => c.enabled)
                  .map((criteria) => (
                    <div key={criteria.id} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">{criteria.name}</span>
                        <span className="font-medium">
                          {accountScore.criteria[criteria.id]}/100
                        </span>
                      </div>
                      <Progress 
                        value={accountScore.criteria[criteria.id]} 
                        className="h-2"
                      />
                    </div>
                  ))}
              </div>

              {/* Recommandation */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-800">Recommandation</h4>
                    <p className="text-blue-700 text-sm mt-1">{accountScore.recommendation}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Actions recommandées */}
      {accountScore && (
        <Card>
          <CardHeader>
            <CardTitle>Actions Recommandées</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {accountScore.tier === 'A' && (
                <>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-green-800">ABM Complet</h4>
                    <p className="text-green-700 text-sm">Campagne personnalisée multi-canal</p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-800">Executive Briefing</h4>
                    <p className="text-blue-700 text-sm">Présentation C-level personnalisée</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-medium text-purple-800">Events VIP</h4>
                    <p className="text-purple-700 text-sm">Invitations événements exclusifs</p>
                  </div>
                </>
              )}
              
              {accountScore.tier === 'B' && (
                <>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-800">Outbound Personnalisé</h4>
                    <p className="text-blue-700 text-sm">Séquences multi-touch ciblées</p>
                  </div>
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <h4 className="font-medium text-yellow-800">Content Syndication</h4>
                    <p className="text-yellow-700 text-sm">Contenu premium sectoriel</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-green-800">Webinars</h4>
                    <p className="text-green-700 text-sm">Sessions éducatives ciblées</p>
                  </div>
                </>
              )}

              {(accountScore.tier === 'C' || accountScore.tier === 'D') && (
                <>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-800">Nurturing Email</h4>
                    <p className="text-gray-700 text-sm">Campagnes éducatives longues</p>
                  </div>
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <h4 className="font-medium text-yellow-800">Social Listening</h4>
                    <p className="text-yellow-700 text-sm">Surveillance des signaux</p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-800">Remarketing</h4>
                    <p className="text-blue-700 text-sm">Publicités ciblées basiques</p>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
