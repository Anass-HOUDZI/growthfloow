
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { DollarSign, TrendingUp, Target, BarChart3, Lightbulb, Download } from 'lucide-react';
import { BudgetForm } from './BudgetForm';
import { ScenarioSimulator } from './ScenarioSimulator';
import { BudgetVisualizations } from './BudgetVisualizations';
import { BudgetRecommendations } from './BudgetRecommendations';

interface BudgetChannel {
  id: string;
  name: string;
  currentBudget: number;
  expectedROAS: number;
  confidence: number;
}

interface Scenario {
  id: string;
  name: string;
  description: string;
  allocation: Record<string, number>;
  projectedROI: number;
  projectedRevenue: number;
  riskLevel: 'low' | 'medium' | 'high';
  confidence: number;
}

interface Recommendation {
  id: string;
  type: 'increase' | 'decrease' | 'reallocate' | 'optimize';
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  impact: number;
  confidence: number;
  currentValue: number;
  suggestedValue: number;
  channel?: string;
}

export const BudgetPlanningAssistant: React.FC = () => {
  const [totalBudget, setTotalBudget] = useState(50000);
  const [timeframe, setTimeframe] = useState('monthly');
  const [channels, setChannels] = useState<BudgetChannel[]>([
    {
      id: 'google-ads',
      name: 'Google Ads',
      currentBudget: 20000,
      expectedROAS: 3.5,
      confidence: 85
    },
    {
      id: 'facebook-ads',
      name: 'Facebook Ads',
      currentBudget: 15000,
      expectedROAS: 2.8,
      confidence: 75
    },
    {
      id: 'linkedin-ads',
      name: 'LinkedIn Ads',
      currentBudget: 8000,
      expectedROAS: 4.2,
      confidence: 70
    },
    {
      id: 'seo',
      name: 'SEO/Content',
      currentBudget: 7000,
      expectedROAS: 5.0,
      confidence: 90
    }
  ]);

  const [scenarios, setScenarios] = useState<Scenario[]>([
    {
      id: 'balanced',
      name: 'Équilibré',
      description: 'Répartition équilibrée avec focus sur la performance',
      allocation: {
        'google-ads': 40,
        'facebook-ads': 30,
        'linkedin-ads': 16,
        'seo': 14
      },
      projectedROI: 3.4,
      projectedRevenue: 170000,
      riskLevel: 'medium',
      confidence: 80
    },
    {
      id: 'aggressive',
      name: 'Agressif',
      description: 'Focus sur les canaux haute performance',
      allocation: {
        'google-ads': 45,
        'facebook-ads': 20,
        'linkedin-ads': 20,
        'seo': 15
      },
      projectedROI: 3.8,
      projectedRevenue: 190000,
      riskLevel: 'high',
      confidence: 70
    },
    {
      id: 'conservative',
      name: 'Conservateur',
      description: 'Minimisation des risques avec ROI stable',
      allocation: {
        'google-ads': 35,
        'facebook-ads': 25,
        'linkedin-ads': 15,
        'seo': 25
      },
      projectedROI: 3.2,
      projectedRevenue: 160000,
      riskLevel: 'low',
      confidence: 90
    }
  ]);

  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [activeScenario, setActiveScenario] = useState<string | null>('balanced');
  const [activeTab, setActiveTab] = useState('configuration');

  // Générer des recommandations basées sur l'analyse
  const generateRecommendations = () => {
    const newRecommendations: Recommendation[] = [];

    channels.forEach(channel => {
      const budgetPercentage = (channel.currentBudget / totalBudget) * 100;
      
      // Recommandation pour les canaux haute performance sous-utilisés
      if (channel.expectedROAS > 4.0 && budgetPercentage < 25) {
        newRecommendations.push({
          id: `increase-${channel.id}`,
          type: 'increase',
          priority: 'high',
          title: `Augmenter le budget ${channel.name}`,
          description: `Canal haute performance (ROAS ${channel.expectedROAS}x) avec allocation faible`,
          impact: (channel.expectedROAS - 1) * 5000,
          confidence: channel.confidence,
          currentValue: channel.currentBudget,
          suggestedValue: channel.currentBudget + 5000,
          channel: channel.name
        });
      }

      // Recommandation pour les canaux sous-performants
      if (channel.expectedROAS < 2.5 && budgetPercentage > 20) {
        newRecommendations.push({
          id: `decrease-${channel.id}`,
          type: 'decrease',
          priority: 'medium',
          title: `Réduire le budget ${channel.name}`,
          description: `Performance faible (ROAS ${channel.expectedROAS}x) avec allocation élevée`,
          impact: 3000,
          confidence: channel.confidence,
          currentValue: channel.currentBudget,
          suggestedValue: Math.max(channel.currentBudget - 3000, 1000),
          channel: channel.name
        });
      }

      // Recommandation d'optimisation pour faible confiance
      if (channel.confidence < 75) {
        newRecommendations.push({
          id: `optimize-${channel.id}`,
          type: 'optimize',
          priority: 'low',
          title: `Optimiser le suivi ${channel.name}`,
          description: `Faible niveau de confiance (${channel.confidence}%) nécessite une meilleure mesure`,
          impact: 2000,
          confidence: 60,
          currentValue: channel.confidence,
          suggestedValue: 85,
          channel: channel.name
        });
      }
    });

    setRecommendations(newRecommendations);
  };

  useEffect(() => {
    generateRecommendations();
  }, [channels, totalBudget]);

  const handleBudgetChange = (budget: number) => {
    setTotalBudget(budget);
    toast({
      title: "Budget mis à jour",
      description: `Nouveau budget total: ${budget.toLocaleString()}€`
    });
  };

  const handleTimeframeChange = (newTimeframe: string) => {
    setTimeframe(newTimeframe);
    toast({
      title: "Période mise à jour",
      description: `Nouvelle période: ${newTimeframe}`
    });
  };

  const handleChannelUpdate = (channelId: string, field: keyof BudgetChannel, value: number) => {
    setChannels(prevChannels =>
      prevChannels.map(channel =>
        channel.id === channelId
          ? { ...channel, [field]: value }
          : channel
      )
    );
  };

  const handleAddChannel = () => {
    const newChannel: BudgetChannel = {
      id: `channel-${Date.now()}`,
      name: 'Nouveau Canal',
      currentBudget: 0,
      expectedROAS: 3.0,
      confidence: 70
    };
    setChannels([...channels, newChannel]);
    toast({
      title: "Canal ajouté",
      description: "Nouveau canal marketing créé"
    });
  };

  const handleScenarioSelect = (scenarioId: string) => {
    setActiveScenario(scenarioId);
    const scenario = scenarios.find(s => s.id === scenarioId);
    if (scenario) {
      toast({
        title: "Scénario sélectionné",
        description: `${scenario.name} - ROI projeté: ${scenario.projectedROI}x`
      });
    }
  };

  const handleScenarioCreate = () => {
    const newScenario: Scenario = {
      id: `scenario-${Date.now()}`,
      name: 'Nouveau Scénario',
      description: 'Scénario personnalisé',
      allocation: {
        'google-ads': 25,
        'facebook-ads': 25,
        'linkedin-ads': 25,
        'seo': 25
      },
      projectedROI: 3.0,
      projectedRevenue: 150000,
      riskLevel: 'medium',
      confidence: 75
    };
    setScenarios([...scenarios, newScenario]);
    setActiveScenario(newScenario.id);
    toast({
      title: "Scénario créé",
      description: "Nouveau scénario de budget généré"
    });
  };

  const handleScenarioOptimize = () => {
    // Algorithme d'optimisation simple basé sur le ROAS
    const sortedChannels = [...channels].sort((a, b) => b.expectedROAS - a.expectedROAS);
    const optimizedAllocation: Record<string, number> = {};
    
    let remainingBudget = 100;
    sortedChannels.forEach((channel, index) => {
      const baseAllocation = Math.max(10, 40 - (index * 10));
      const allocation = Math.min(baseAllocation, remainingBudget);
      optimizedAllocation[channel.id] = allocation;
      remainingBudget -= allocation;
    });

    const optimizedScenario: Scenario = {
      id: `optimized-${Date.now()}`,
      name: 'Optimisé Auto',
      description: 'Allocation optimisée par l\'algorithme basé sur le ROAS',
      allocation: optimizedAllocation,
      projectedROI: 4.1,
      projectedRevenue: 205000,
      riskLevel: 'medium',
      confidence: 85
    };

    setScenarios([...scenarios, optimizedScenario]);
    setActiveScenario(optimizedScenario.id);
    toast({
      title: "Optimisation terminée",
      description: "Scénario optimisé généré avec succès"
    });
  };

  const handleApplyRecommendation = (recommendationId: string) => {
    const recommendation = recommendations.find(r => r.id === recommendationId);
    if (!recommendation) return;

    if (recommendation.type === 'increase' || recommendation.type === 'decrease') {
      const channelId = recommendation.channel?.toLowerCase().replace(/\s+/g, '-');
      if (channelId) {
        handleChannelUpdate(channelId, 'currentBudget', recommendation.suggestedValue);
      }
    }

    setRecommendations(prev => prev.filter(r => r.id !== recommendationId));
    toast({
      title: "Recommandation appliquée",
      description: recommendation.title
    });
  };

  const handleDismissRecommendation = (recommendationId: string) => {
    setRecommendations(prev => prev.filter(r => r.id !== recommendationId));
    toast({
      title: "Recommandation ignorée",
      description: "Recommandation supprimée"
    });
  };

  const handleExportReport = () => {
    const reportData = {
      budget: totalBudget,
      timeframe,
      channels,
      scenarios,
      recommendations,
      activeScenario
    };
    
    const dataStr = JSON.stringify(reportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `budget-planning-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();

    toast({
      title: "Rapport exporté",
      description: "Données de planification budgétaire exportées"
    });
  };

  const totalAllocated = channels.reduce((sum, channel) => sum + channel.currentBudget, 0);
  const budgetVariance = totalBudget - totalAllocated;

  return (
    <div className="space-y-6">
      {/* En-tête avec métriques clés */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl">Budget Planning Assistant</CardTitle>
                <p className="text-slate-600">Simulez et optimisez votre allocation budgétaire marketing</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant={budgetVariance === 0 ? "default" : budgetVariance > 0 ? "secondary" : "destructive"}>
                {budgetVariance === 0 ? "Budget équilibré" : 
                 budgetVariance > 0 ? `${budgetVariance.toLocaleString()}€ restant` : 
                 `${Math.abs(budgetVariance).toLocaleString()}€ dépassé`}
              </Badge>
              <Button onClick={handleExportReport} variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Exporter
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Onglets principaux */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="configuration" className="flex items-center gap-2">
            <Target className="w-4 h-4" />
            Configuration
          </TabsTrigger>
          <TabsTrigger value="scenarios" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Scénarios
          </TabsTrigger>
          <TabsTrigger value="visualizations" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Visualisations
          </TabsTrigger>
          <TabsTrigger value="recommendations" className="flex items-center gap-2">
            <Lightbulb className="w-4 h-4" />
            Recommandations
          </TabsTrigger>
        </TabsList>

        <TabsContent value="configuration" className="space-y-6">
          <BudgetForm
            totalBudget={totalBudget}
            timeframe={timeframe}
            channels={channels}
            onBudgetChange={handleBudgetChange}
            onTimeframeChange={handleTimeframeChange}
            onChannelUpdate={handleChannelUpdate}
            onAddChannel={handleAddChannel}
          />
        </TabsContent>

        <TabsContent value="scenarios" className="space-y-6">
          <ScenarioSimulator
            scenarios={scenarios}
            activeScenario={activeScenario}
            onScenarioSelect={handleScenarioSelect}
            onScenarioCreate={handleScenarioCreate}
            onScenarioOptimize={handleScenarioOptimize}
          />
        </TabsContent>

        <TabsContent value="visualizations" className="space-y-6">
          <BudgetVisualizations
            channels={channels}
            totalBudget={totalBudget}
            scenarios={scenarios}
          />
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-6">
          <BudgetRecommendations
            recommendations={recommendations}
            onApplyRecommendation={handleApplyRecommendation}
            onDismissRecommendation={handleDismissRecommendation}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};
