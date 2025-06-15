import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell
} from 'recharts';
import { 
  Facebook, TrendingUp, Target, DollarSign, Eye, MousePointer,
  Zap, AlertTriangle, CheckCircle, Settings, Users, Calendar
} from 'lucide-react';

interface FacebookCampaign {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'draft';
  objective: string;
  budget: number;
  spend: number;
  impressions: number;
  clicks: number;
  conversions: number;
  ctr: number;
  cpc: number;
  cpm: number;
  roas: number;
  frequency: number;
  relevance_score: number;
}

interface OptimizationRecommendation {
  type: 'budget' | 'targeting' | 'creative' | 'bidding';
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  impact: string;
  action: string;
  campaign_id: string;
}

export const FacebookAdsOptimizer: React.FC = () => {
  const [selectedCampaign, setSelectedCampaign] = useState<string>('all');
  const [dateRange, setDateRange] = useState<string>('7d');

  const [campaigns] = useState<FacebookCampaign[]>([
    {
      id: '1',
      name: 'Summer Collection 2024',
      status: 'active',
      objective: 'Conversions',
      budget: 500,
      spend: 485,
      impressions: 125000,
      clicks: 3250,
      conversions: 89,
      ctr: 2.6,
      cpc: 0.15,
      cpm: 4.2,
      roas: 4.8,
      frequency: 1.8,
      relevance_score: 8.2
    },
    {
      id: '2',
      name: 'Retargeting Campaign',
      status: 'active',
      objective: 'Conversions',
      budget: 300,
      spend: 298,
      impressions: 45000,
      clicks: 1890,
      conversions: 156,
      ctr: 4.2,
      cpc: 0.16,
      cpm: 6.8,
      roas: 6.2,
      frequency: 3.2,
      relevance_score: 9.1
    },
    {
      id: '3',
      name: 'Brand Awareness',
      status: 'active',
      objective: 'Reach',
      budget: 200,
      spend: 195,
      impressions: 180000,
      clicks: 2160,
      conversions: 34,
      ctr: 1.2,
      cpc: 0.09,
      cpm: 1.1,
      roas: 2.1,
      frequency: 2.1,
      relevance_score: 7.8
    },
    {
      id: '4',
      name: 'Lead Generation B2B',
      status: 'paused',
      objective: 'Lead Generation',
      budget: 400,
      spend: 385,
      impressions: 89000,
      clicks: 1245,
      conversions: 67,
      ctr: 1.4,
      cpc: 0.31,
      cpm: 4.3,
      roas: 3.8,
      frequency: 1.6,
      relevance_score: 6.9
    }
  ]);

  const generateOptimizations = (): OptimizationRecommendation[] => {
    const recommendations: OptimizationRecommendation[] = [];

    campaigns.forEach(campaign => {
      // Budget recommendations
      if (campaign.roas > 4.0 && campaign.spend >= campaign.budget * 0.95) {
        recommendations.push({
          type: 'budget',
          priority: 'high',
          title: `Augmenter le budget - ${campaign.name}`,
          description: `ROAS de ${campaign.roas}x excellent, budget presque épuisé`,
          impact: `+25-40% de conversions estimées`,
          action: `Augmenter le budget de $${Math.round(campaign.budget * 0.3)}`,
          campaign_id: campaign.id
        });
      }

      // Frequency capping
      if (campaign.frequency > 3.0) {
        recommendations.push({
          type: 'targeting',
          priority: 'high',
          title: `Réduire la fréquence - ${campaign.name}`,
          description: `Fréquence de ${campaign.frequency} trop élevée, risque de fatigue publicitaire`,
          impact: `Amélioration CTR estimée de 15-25%`,
          action: `Élargir l'audience ou réduire le budget`,
          campaign_id: campaign.id
        });
      }

      // Relevance score
      if (campaign.relevance_score < 7.0) {
        recommendations.push({
          type: 'creative',
          priority: 'high',
          title: `Améliorer le score de pertinence - ${campaign.name}`,
          description: `Score de ${campaign.relevance_score}/10, créatifs peu performants`,
          impact: `Réduction CPC estimée de 20-30%`,
          action: `Tester de nouveaux créatifs et messages`,
          campaign_id: campaign.id
        });
      }

      // Low CTR
      if (campaign.ctr < 1.5 && campaign.objective !== 'Reach') {
        recommendations.push({
          type: 'creative',
          priority: 'medium',
          title: `Optimiser le CTR - ${campaign.name}`,
          description: `CTR de ${campaign.ctr}% en dessous des standards`,
          impact: `Amélioration performance globale`,
          action: `A/B tester headlines et visuels`,
          campaign_id: campaign.id
        });
      }
    });

    return recommendations.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  };

  const optimizations = generateOptimizations();

  const totalMetrics = campaigns.reduce((acc, campaign) => ({
    spend: acc.spend + campaign.spend,
    impressions: acc.impressions + campaign.impressions,
    clicks: acc.clicks + campaign.clicks,
    conversions: acc.conversions + campaign.conversions
  }), { spend: 0, impressions: 0, clicks: 0, conversions: 0 });

  const avgCTR = (totalMetrics.clicks / totalMetrics.impressions * 100).toFixed(2);
  const avgCPC = (totalMetrics.spend / totalMetrics.clicks).toFixed(2);
  const totalROAS = (totalMetrics.conversions * 50 / totalMetrics.spend).toFixed(1);

  const performanceData = campaigns.map(campaign => ({
    name: campaign.name.substring(0, 15) + '...',
    ROAS: campaign.roas,
    CTR: campaign.ctr,
    'Score Pertinence': campaign.relevance_score,
    Fréquence: campaign.frequency
  }));

  const budgetData = campaigns.map(campaign => ({
    name: campaign.name.substring(0, 10) + '...',
    Budget: campaign.budget,
    Dépensé: campaign.spend,
    Restant: campaign.budget - campaign.spend
  }));

  const objectiveData = campaigns.reduce((acc, campaign) => {
    const existing = acc.find(item => item.name === campaign.objective);
    if (existing) {
      existing.value += campaign.spend;
    } else {
      acc.push({ name: campaign.objective, value: campaign.spend });
    }
    return acc;
  }, [] as { name: string; value: number }[]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full px-2 md:px-0 py-8">
      <div className="flex flex-col items-center justify-center w-full max-w-3xl mb-8">
        <div className="mb-4">
          <div className="flex items-center justify-center w-[68px] h-[68px] rounded-2xl bg-gradient-to-br from-blue-700 to-blue-400 shadow-lg shadow-blue-200/25">
            <Facebook className="w-10 h-10 text-white" />
          </div>
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 text-center mb-2">
          Facebook Ads Optimizer
        </h2>
        <p className="text-lg md:text-xl text-slate-500 text-center max-w-2xl mb-2">
          Analysez, optimisez et boostez vos campagnes Facebook Ads en temps réel
        </p>
      </div>
      <div className="w-full max-w-6xl">
        <Tabs defaultValue="campaigns">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="campaigns">Campagnes</TabsTrigger>
            <TabsTrigger value="optimizations">Optimisations</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="budget">Budget</TabsTrigger>
          </TabsList>

          <TabsContent value="campaigns" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Aperçu des Campagnes</CardTitle>
                <CardDescription>Statut et métriques clés de vos campagnes Facebook</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {campaigns.map((campaign) => (
                    <div key={campaign.id} className="border rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold">{campaign.name}</h4>
                        <Badge className={getStatusColor(campaign.status)}>
                          {campaign.status}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-slate-600">Objectif</p>
                          <p className="font-medium">{campaign.objective}</p>
                        </div>
                        <div>
                          <p className="text-sm text-slate-600">Budget</p>
                          <p className="font-medium">${campaign.budget}</p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-slate-600">ROAS</span>
                          <span className="font-medium text-blue-600">{campaign.roas}x</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-slate-600">CTR</span>
                          <span className="font-medium">{campaign.ctr}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-slate-600">CPC</span>
                          <span className="font-medium">${campaign.cpc}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-slate-600">Score Pertinence</span>
                          <span className={`font-medium ${
                            campaign.relevance_score >= 8 ? 'text-green-600' :
                            campaign.relevance_score >= 6 ? 'text-yellow-600' : 'text-red-600'
                          }`}>
                            {campaign.relevance_score}/10
                          </span>
                        </div>
                      </div>

                      <div className="mt-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Budget utilisé</span>
                          <span>{((campaign.spend / campaign.budget) * 100).toFixed(0)}%</span>
                        </div>
                        <Progress value={(campaign.spend / campaign.budget) * 100} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="optimizations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="w-5 h-5 mr-2" />
                  Recommandations d'Optimisation ({optimizations.length})
                </CardTitle>
                <CardDescription>Actions prioritaires pour améliorer vos performances</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {optimizations.map((opt, index) => (
                    <div key={index} className="border rounded-lg p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0 mt-1">
                            {opt.priority === 'high' && <AlertTriangle className="w-5 h-5 text-red-500" />}
                            {opt.priority === 'medium' && <Settings className="w-5 h-5 text-yellow-500" />}
                            {opt.priority === 'low' && <CheckCircle className="w-5 h-5 text-blue-500" />}
                          </div>
                          <div>
                            <h4 className="font-semibold text-slate-800">{opt.title}</h4>
                            <p className="text-slate-600 mt-1">{opt.description}</p>
                          </div>
                        </div>
                        <Badge className={getPriorityColor(opt.priority)}>
                          {opt.priority}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <p className="text-sm font-medium text-blue-800 mb-1">Impact Estimé</p>
                          <p className="text-blue-700">{opt.impact}</p>
                        </div>
                        <div className="bg-green-50 p-3 rounded-lg">
                          <p className="text-sm font-medium text-green-800 mb-1">Action Recommandée</p>
                          <p className="text-green-700">{opt.action}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <Badge variant="outline">{opt.type}</Badge>
                        <Button size="sm">
                          Appliquer l'optimisation
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance">
            <Card>
              <CardHeader>
                <CardTitle>Analyse de Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="ROAS" fill="#8884d8" name="ROAS" />
                    <Bar dataKey="CTR" fill="#82ca9d" name="CTR %" />
                  </BarChart>
                </ResponsiveContainer>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Répartition par Objectif</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={objectiveData}
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {objectiveData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={`hsl(${index * 60}, 70%, 50%)`} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => `$${value}`} />
                        </PieChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  <div className="space-y-4">
                    <h4 className="font-semibold">Insights Clés</h4>
                    
                    <div className="p-4 bg-green-50 rounded-lg">
                      <div className="flex items-center mb-2">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                        <span className="font-medium text-green-800">Top Performer</span>
                      </div>
                      <p className="text-green-700 text-sm">
                        Retargeting Campaign avec un ROAS de 6.2x
                      </p>
                    </div>

                    <div className="p-4 bg-yellow-50 rounded-lg">
                      <div className="flex items-center mb-2">
                        <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2" />
                        <span className="font-medium text-yellow-800">Attention Requise</span>
                      </div>
                      <p className="text-yellow-700 text-sm">
                        Brand Awareness avec un CTR de seulement 1.2%
                      </p>
                    </div>

                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Eye className="w-5 h-5 text-blue-600 mr-2" />
                        <span className="font-medium text-blue-800">Opportunité</span>
                      </div>
                      <p className="text-blue-700 text-sm">
                        Lead Generation B2B en pause avec un bon potentiel
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="budget">
            <Card>
              <CardHeader>
                <CardTitle>Gestion du Budget</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={budgetData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="Budget" fill="#8884d8" name="Budget Alloué" />
                    <Bar dataKey="Dépensé" fill="#82ca9d" name="Dépensé" />
                  </BarChart>
                </ResponsiveContainer>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-slate-50 rounded-lg">
                    <p className="text-2xl font-bold text-slate-800">
                      ${campaigns.reduce((acc, c) => acc + c.budget, 0)}
                    </p>
                    <p className="text-sm text-slate-600">Budget Total</p>
                  </div>
                  <div className="text-center p-4 bg-slate-50 rounded-lg">
                    <p className="text-2xl font-bold text-slate-800">
                      ${totalMetrics.spend}
                    </p>
                    <p className="text-sm text-slate-600">Dépensé</p>
                  </div>
                  <div className="text-center p-4 bg-slate-50 rounded-lg">
                    <p className="text-2xl font-bold text-slate-800">
                      ${campaigns.reduce((acc, c) => acc + c.budget, 0) - totalMetrics.spend}
                    </p>
                    <p className="text-sm text-slate-600">Restant</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
