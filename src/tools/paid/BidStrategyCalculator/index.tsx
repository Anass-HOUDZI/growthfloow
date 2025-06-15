import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell
} from 'recharts';
import { 
  Calculator, TrendingUp, Target, DollarSign, 
  Zap, AlertTriangle, CheckCircle, Settings
} from 'lucide-react';

interface BidStrategy {
  id: string;
  name: string;
  type: 'manual_cpc' | 'enhanced_cpc' | 'target_cpa' | 'target_roas' | 'maximize_clicks' | 'maximize_conversions';
  target_metric?: number;
  predicted_performance: {
    clicks: number;
    conversions: number;
    cost: number;
    ctr: number;
    cpc: number;
    cpa: number;
    roas: number;
  };
}

interface Campaign {
  id: string;
  name: string;
  current_strategy: string;
  budget: number;
  current_performance: {
    clicks: number;
    conversions: number;
    cost: number;
    ctr: number;
    cpc: number;
    cpa: number;
    roas: number;
  };
}

export const BidStrategyCalculator: React.FC = () => {
  const [selectedCampaign, setSelectedCampaign] = useState<string>('1');
  const [budgetAmount, setBudgetAmount] = useState<number>(1000);
  const [targetMetric, setTargetMetric] = useState<number>(50);
  const [selectedStrategy, setSelectedStrategy] = useState<string>('target_cpa');

  const [campaigns] = useState<Campaign[]>([
    {
      id: '1',
      name: 'Brand Keywords Campaign',
      current_strategy: 'Enhanced CPC',
      budget: 1000,
      current_performance: {
        clicks: 2500,
        conversions: 125,
        cost: 950,
        ctr: 3.2,
        cpc: 0.38,
        cpa: 7.60,
        roas: 18.4
      }
    },
    {
      id: '2',
      name: 'Product Categories',
      current_strategy: 'Manual CPC',
      budget: 1500,
      current_performance: {
        clicks: 3200,
        conversions: 180,
        cost: 1420,
        ctr: 2.8,
        cpc: 0.44,
        cpa: 7.89,
        roas: 15.2
      }
    }
  ]);

  const [bidStrategies] = useState<BidStrategy[]>([
    {
      id: '1',
      name: 'Manual CPC',
      type: 'manual_cpc',
      predicted_performance: {
        clicks: 2400,
        conversions: 120,
        cost: 960,
        ctr: 3.0,
        cpc: 0.40,
        cpa: 8.00,
        roas: 17.5
      }
    },
    {
      id: '2',
      name: 'Enhanced CPC',
      type: 'enhanced_cpc',
      predicted_performance: {
        clicks: 2600,
        conversions: 140,
        cost: 980,
        ctr: 3.3,
        cpc: 0.37,
        cpa: 7.00,
        roas: 20.0
      }
    },
    {
      id: '3',
      name: 'Target CPA',
      type: 'target_cpa',
      target_metric: 6.50,
      predicted_performance: {
        clicks: 2800,
        conversions: 155,
        cost: 1007,
        ctr: 3.5,
        cpc: 0.36,
        cpa: 6.50,
        roas: 21.5
      }
    },
    {
      id: '4',
      name: 'Target ROAS',
      type: 'target_roas',
      target_metric: 25.0,
      predicted_performance: {
        clicks: 2300,
        conversions: 138,
        cost: 920,
        ctr: 2.9,
        cpc: 0.40,
        cpa: 6.67,
        roas: 25.0
      }
    },
    {
      id: '5',
      name: 'Maximize Clicks',
      type: 'maximize_clicks',
      predicted_performance: {
        clicks: 3200,
        conversions: 144,
        cost: 1000,
        ctr: 4.0,
        cpc: 0.31,
        cpa: 6.94,
        roas: 20.2
      }
    },
    {
      id: '6',
      name: 'Maximize Conversions',
      type: 'maximize_conversions',
      predicted_performance: {
        clicks: 2700,
        conversions: 162,
        cost: 1000,
        ctr: 3.4,
        cpc: 0.37,
        cpa: 6.17,
        roas: 22.7
      }
    }
  ]);

  const selectedCampaignData = campaigns.find(c => c.id === selectedCampaign);
  
  const comparisonData = bidStrategies.map(strategy => ({
    name: strategy.name,
    'CPA Actuel': selectedCampaignData?.current_performance.cpa || 0,
    'CPA Prédit': strategy.predicted_performance.cpa,
    'ROAS Actuel': selectedCampaignData?.current_performance.roas || 0,
    'ROAS Prédit': strategy.predicted_performance.roas,
    'Conversions Prédites': strategy.predicted_performance.conversions
  }));

  const budgetAllocationData = bidStrategies.slice(0, 4).map(strategy => ({
    name: strategy.name,
    budget: Math.round(budgetAmount * (strategy.predicted_performance.roas / 100)),
    conversions: strategy.predicted_performance.conversions,
    roas: strategy.predicted_performance.roas
  }));

  const performanceColors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#8dd1e1', '#d084d0'];

  const getStrategyRecommendation = (strategy: BidStrategy) => {
    if (strategy.predicted_performance.roas > 22) return 'Excellent';
    if (strategy.predicted_performance.roas > 18) return 'Bon';
    if (strategy.predicted_performance.roas > 15) return 'Moyen';
    return 'Faible';
  };

  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case 'Excellent': return 'bg-green-100 text-green-800';
      case 'Bon': return 'bg-blue-100 text-blue-800';
      case 'Moyen': return 'bg-yellow-100 text-yellow-800';
      case 'Faible': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full px-2 md:px-0 py-8">
      <div className="flex flex-col items-center justify-center w-full max-w-3xl mb-8">
        <div className="mb-4">
          <div className="flex items-center justify-center w-[68px] h-[68px] rounded-2xl bg-gradient-to-br from-green-500 to-teal-500 shadow-lg shadow-green-200/25">
            <Calculator className="w-10 h-10 text-white" />
          </div>
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 text-center mb-2 flex items-center">
          Bid Strategy Calculator
        </h2>
        <p className="text-lg md:text-xl text-slate-500 text-center max-w-2xl mb-2">
          Optimisez vos stratégies d'enchères selon vos objectifs
        </p>
      </div>
      <div className="w-full max-w-6xl">
        {/* Configuration */}
        <Card>
          <CardHeader>
            <CardTitle>Configuration</CardTitle>
            <CardDescription>Sélectionnez votre campagne et définissez vos paramètres</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Campagne</label>
                <select 
                  className="w-full p-2 border rounded-lg"
                  value={selectedCampaign}
                  onChange={(e) => setSelectedCampaign(e.target.value)}
                >
                  {campaigns.map(campaign => (
                    <option key={campaign.id} value={campaign.id}>
                      {campaign.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Budget ($)</label>
                <input
                  type="number"
                  className="w-full p-2 border rounded-lg"
                  value={budgetAmount}
                  onChange={(e) => setBudgetAmount(Number(e.target.value))}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Target CPA ($)</label>
                <input
                  type="number"
                  step="0.1"
                  className="w-full p-2 border rounded-lg"
                  value={targetMetric}
                  onChange={(e) => setTargetMetric(Number(e.target.value))}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Stratégie Préférée</label>
                <select 
                  className="w-full p-2 border rounded-lg"
                  value={selectedStrategy}
                  onChange={(e) => setSelectedStrategy(e.target.value)}
                >
                  <option value="target_cpa">Target CPA</option>
                  <option value="target_roas">Target ROAS</option>
                  <option value="maximize_conversions">Maximize Conversions</option>
                  <option value="maximize_clicks">Maximize Clicks</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="strategies">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="strategies">Stratégies</TabsTrigger>
            <TabsTrigger value="comparison">Comparaison</TabsTrigger>
            <TabsTrigger value="simulation">Simulation</TabsTrigger>
            <TabsTrigger value="recommendations">Recommandations</TabsTrigger>
          </TabsList>

          <TabsContent value="strategies" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bidStrategies.map((strategy, index) => (
                <Card key={strategy.id} className="relative">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{strategy.name}</CardTitle>
                      <Badge className={getRecommendationColor(getStrategyRecommendation(strategy))}>
                        {getStrategyRecommendation(strategy)}
                      </Badge>
                    </div>
                    {strategy.target_metric && (
                      <p className="text-sm text-slate-600">
                        Target: {strategy.type === 'target_cpa' ? '$' : ''}{strategy.target_metric}{strategy.type === 'target_roas' ? 'x' : ''}
                      </p>
                    )}
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-slate-600">Conversions</p>
                          <p className="text-xl font-bold text-blue-600">{strategy.predicted_performance.conversions}</p>
                        </div>
                        <div>
                          <p className="text-sm text-slate-600">ROAS</p>
                          <p className="text-xl font-bold text-green-600">{strategy.predicted_performance.roas}x</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-600">Clicks</span>
                          <span className="font-medium">{strategy.predicted_performance.clicks}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">CTR</span>
                          <span className="font-medium">{strategy.predicted_performance.ctr}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">CPC</span>
                          <span className="font-medium">${strategy.predicted_performance.cpc}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">CPA</span>
                          <span className="font-medium">${strategy.predicted_performance.cpa}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Coût</span>
                          <span className="font-medium">${strategy.predicted_performance.cost}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="comparison">
            <Card>
              <CardHeader>
                <CardTitle>Comparaison des Performances</CardTitle>
                <CardDescription>Performance actuelle vs prédictions par stratégie</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={comparisonData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="CPA Actuel" fill="#8884d8" name="CPA Actuel" />
                    <Bar dataKey="CPA Prédit" fill="#82ca9d" name="CPA Prédit" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="simulation">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Simulation Budget</CardTitle>
                  <CardDescription>Allocation optimale selon les performances prédites</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={budgetAllocationData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="budget"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {budgetAllocationData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={performanceColors[index % performanceColors.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {budgetAllocationData.map((allocation, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{allocation.name}</h4>
                        <Badge style={{ backgroundColor: performanceColors[index % performanceColors.length] }}>
                          ${allocation.budget}
                        </Badge>
                      </div>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-600">Conversions prédites</span>
                          <span className="font-medium">{allocation.conversions}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">ROAS prédit</span>
                          <span className="font-medium">{allocation.roas}x</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="recommendations">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Zap className="w-5 h-5 mr-2" />
                    Recommandations Personnalisées
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 border-l-4 border-l-green-500 bg-green-50">
                    <div className="flex items-center mb-2">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                      <span className="font-medium text-green-800">Stratégie Recommandée</span>
                    </div>
                    <p className="text-green-700 text-sm mb-2">
                      Target CPA à $6.50 - Meilleur équilibre coût/performance
                    </p>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      Appliquer
                    </Button>
                  </div>

                  <div className="p-4 border-l-4 border-l-blue-500 bg-blue-50">
                    <div className="flex items-center mb-2">
                      <Target className="w-5 h-5 text-blue-600 mr-2" />
                      <span className="font-medium text-blue-800">Optimisation Budget</span>
                    </div>
                    <p className="text-blue-700 text-sm mb-2">
                      Augmenter le budget de 20% pour Maximize Conversions
                    </p>
                    <Button size="sm" variant="outline" className="border-blue-600 text-blue-700">
                      Analyser
                    </Button>
                  </div>

                  <div className="p-4 border-l-4 border-l-yellow-500 bg-yellow-50">
                    <div className="flex items-center mb-2">
                      <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2" />
                      <span className="font-medium text-yellow-800">Attention</span>
                    </div>
                    <p className="text-yellow-700 text-sm mb-2">
                      Manual CPC sous-performe - Passer à Enhanced CPC
                    </p>
                    <Button size="sm" variant="outline" className="border-yellow-600 text-yellow-700">
                      Optimiser
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Actions Prioritaires</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center p-3 bg-green-50 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                        <div>
                          <p className="font-medium text-green-800">Tester Target CPA</p>
                          <p className="text-sm text-green-600">Impact: +24% conversions</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                        <TrendingUp className="w-5 h-5 text-blue-600 mr-3" />
                        <div>
                          <p className="font-medium text-blue-800">Optimiser Enhanced CPC</p>
                          <p className="text-sm text-blue-600">Impact: +12% ROAS</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Métriques Cibles</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>CPA Target</span>
                          <span>$6.50</span>
                        </div>
                        <Progress value={75} className="h-2" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>ROAS Target</span>
                          <span>22x</span>
                        </div>
                        <Progress value={85} className="h-2" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Budget Efficiency</span>
                          <span>92%</span>
                        </div>
                        <Progress value={92} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
