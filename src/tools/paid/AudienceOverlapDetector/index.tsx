import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Tooltip, ResponsiveContainer, Cell,
  PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts';
import { 
  Users, AlertTriangle, CheckCircle, Target, 
  TrendingUp, GitMerge, Zap, Info, Plus
} from 'lucide-react';

interface AudienceSegment {
  id: string;
  name: string;
  platform: 'facebook' | 'google' | 'linkedin' | 'twitter';
  size: number;
  reach: number;
  overlap_percentage: number;
  performance: {
    ctr: number;
    cpc: number;
    conversion_rate: number;
  };
  demographics: {
    age_groups: { [key: string]: number };
    gender: { [key: string]: number };
  };
}

interface OverlapAnalysis {
  segments: string[];
  overlap_size: number;
  overlap_percentage: number;
  cost_impact: number;
  recommendation: 'merge' | 'separate' | 'optimize' | 'maintain';
  reason: string;
}

export const AudienceOverlapDetector: React.FC = () => {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['facebook', 'google']);
  
  const [audiences] = useState<AudienceSegment[]>([
    {
      id: '1',
      name: 'Millennials Tech Enthusiasts',
      platform: 'facebook',
      size: 2500000,
      reach: 180000,
      overlap_percentage: 35,
      performance: {
        ctr: 3.2,
        cpc: 0.85,
        conversion_rate: 4.1
      },
      demographics: {
        age_groups: { '25-34': 45, '35-44': 35, '18-24': 20 },
        gender: { 'M': 60, 'F': 40 }
      }
    },
    {
      id: '2',
      name: 'Professional Software Users',
      platform: 'google',
      size: 1800000,
      reach: 145000,
      overlap_percentage: 42,
      performance: {
        ctr: 2.8,
        cpc: 1.25,
        conversion_rate: 5.2
      },
      demographics: {
        age_groups: { '25-34': 40, '35-44': 45, '45-54': 15 },
        gender: { 'M': 65, 'F': 35 }
      }
    },
    {
      id: '3',
      name: 'B2B Decision Makers',
      platform: 'linkedin',
      size: 850000,
      reach: 65000,
      overlap_percentage: 28,
      performance: {
        ctr: 1.9,
        cpc: 2.15,
        conversion_rate: 7.8
      },
      demographics: {
        age_groups: { '35-44': 40, '45-54': 35, '25-34': 25 },
        gender: { 'M': 55, 'F': 45 }
      }
    },
    {
      id: '4',
      name: 'Tech Early Adopters',
      platform: 'facebook',
      size: 950000,
      reach: 89000,
      overlap_percentage: 51,
      performance: {
        ctr: 4.1,
        cpc: 0.92,
        conversion_rate: 3.8
      },
      demographics: {
        age_groups: { '18-24': 30, '25-34': 50, '35-44': 20 },
        gender: { 'M': 70, 'F': 30 }
      }
    }
  ]);

  const generateOverlapAnalysis = (): OverlapAnalysis[] => {
    const analyses: OverlapAnalysis[] = [];
    
    // Détection Facebook audiences overlap
    const facebookAudiences = audiences.filter(a => a.platform === 'facebook');
    if (facebookAudiences.length >= 2) {
      analyses.push({
        segments: facebookAudiences.map(a => a.name),
        overlap_size: 245000,
        overlap_percentage: 43,
        cost_impact: 18,
        recommendation: 'optimize',
        reason: 'Chevauchement significatif entre audiences Facebook - risque de surenchère'
      });
    }

    // Cross-platform overlap
    analyses.push({
      segments: ['Millennials Tech Enthusiasts', 'Professional Software Users'],
      overlap_size: 156000,
      overlap_percentage: 32,
      cost_impact: 12,
      recommendation: 'separate',
      reason: 'Segmentation cross-platform recommandée pour optimiser le ciblage'
    });

    return analyses;
  };

  const overlapAnalyses = generateOverlapAnalysis();

  const getRecommendationColor = (rec: string) => {
    switch (rec) {
      case 'merge': return 'bg-blue-100 text-blue-800';
      case 'separate': return 'bg-orange-100 text-orange-800';
      case 'optimize': return 'bg-yellow-100 text-yellow-800';
      case 'maintain': return 'bg-green-100 text-green-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  const platformColors = {
    facebook: '#1877F2',
    google: '#4285F4',
    linkedin: '#0A66C2',
    twitter: '#1DA1F2'
  };

  const audienceData = audiences.map(audience => ({
    name: audience.name,
    size: audience.size / 1000000,
    overlap: audience.overlap_percentage,
    platform: audience.platform
  }));

  const overlapData = [
    { name: 'Audience Unique', value: 65, color: '#10B981' },
    { name: 'Chevauchement Modéré', value: 25, color: '#F59E0B' },
    { name: 'Chevauchement Élevé', value: 10, color: '#EF4444' }
  ];

  const performanceComparison = audiences.map(audience => ({
    name: audience.name.substring(0, 15) + '...',
    CTR: audience.performance.ctr,
    CPC: audience.performance.cpc,
    'Conv Rate': audience.performance.conversion_rate,
    platform: audience.platform
  }));

  return (
    <div className="flex flex-col items-center justify-center w-full px-2 md:px-0 py-8">
      <div className="flex flex-col items-center justify-center w-full max-w-3xl mb-8">
        <div className="mb-4">
          <div className="flex items-center justify-center w-[68px] h-[68px] rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-500 shadow-lg shadow-indigo-200/25">
            <Users className="w-10 h-10 text-white" />
          </div>
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 text-center mb-2">
          Audience Overlap Detector
        </h2>
        <p className="text-lg md:text-xl text-slate-500 text-center max-w-2xl mb-2">
          Identifiez et optimisez les chevauchements d'audiences cross-platform
        </p>
      </div>
      <div className="w-full max-w-6xl">
        {/* Métriques de synthèse */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Audiences Totales</p>
                  <p className="text-2xl font-bold text-slate-800">{audiences.length}</p>
                </div>
                <Users className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Chevauchement Moyen</p>
                  <p className="text-2xl font-bold text-slate-800">
                    {Math.round(audiences.reduce((acc, a) => acc + a.overlap_percentage, 0) / audiences.length)}%
                  </p>
                </div>
                <GitMerge className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Reach Total</p>
                  <p className="text-2xl font-bold text-slate-800">
                    {(audiences.reduce((acc, a) => acc + a.reach, 0) / 1000000).toFixed(1)}M
                  </p>
                </div>
                <Target className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Économies Potentielles</p>
                  <p className="text-2xl font-bold text-slate-800">15%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="analysis">Analyse Détaillée</TabsTrigger>
            <TabsTrigger value="recommendations">Recommandations</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Distribution des Chevauchements</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={overlapData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {overlapData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Taille vs Chevauchement</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={audienceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="size" fill="#8884d8" name="Taille (M)" />
                      <Bar dataKey="overlap" fill="#82ca9d" name="Chevauchement %" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Audiences par Plateforme</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {audiences.map((audience) => (
                    <div key={audience.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <Badge 
                          style={{ backgroundColor: platformColors[audience.platform] }}
                          className="text-white"
                        >
                          {audience.platform}
                        </Badge>
                        <div className="flex items-center text-sm">
                          {audience.overlap_percentage > 40 ? (
                            <AlertTriangle className="w-4 h-4 text-orange-500" />
                          ) : (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          )}
                        </div>
                      </div>
                      
                      <h4 className="font-semibold text-sm mb-3">{audience.name}</h4>
                      
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span className="text-slate-600">Taille</span>
                          <span className="font-medium">{(audience.size / 1000000).toFixed(1)}M</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Reach</span>
                          <span className="font-medium">{(audience.reach / 1000).toFixed(0)}K</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Chevauchement</span>
                          <span className={`font-medium ${
                            audience.overlap_percentage > 40 ? 'text-orange-600' : 'text-green-600'
                          }`}>
                            {audience.overlap_percentage}%
                          </span>
                        </div>
                      </div>

                      <div className="mt-3">
                        <div className="flex justify-between text-xs mb-1">
                          <span>Niveau de chevauchement</span>
                        </div>
                        <Progress 
                          value={audience.overlap_percentage} 
                          className="h-2"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analysis" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Analyse des Chevauchements Détectés</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {overlapAnalyses.map((analysis, index) => (
                    <div key={index} className="border rounded-lg p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="font-semibold text-lg mb-2">
                            Chevauchement #{index + 1}
                          </h4>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {analysis.segments.map((segment, idx) => (
                              <Badge key={idx} variant="outline">{segment}</Badge>
                            ))}
                          </div>
                        </div>
                        <Badge className={getRecommendationColor(analysis.recommendation)}>
                          {analysis.recommendation === 'merge' && 'Fusionner'}
                          {analysis.recommendation === 'separate' && 'Séparer'}
                          {analysis.recommendation === 'optimize' && 'Optimiser'}
                          {analysis.recommendation === 'maintain' && 'Maintenir'}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="text-center p-3 bg-slate-50 rounded-lg">
                          <p className="text-2xl font-bold text-slate-800">
                            {analysis.overlap_size.toLocaleString()}
                          </p>
                          <p className="text-sm text-slate-600">Utilisateurs en commun</p>
                        </div>
                        <div className="text-center p-3 bg-slate-50 rounded-lg">
                          <p className="text-2xl font-bold text-orange-600">
                            {analysis.overlap_percentage}%
                          </p>
                          <p className="text-sm text-slate-600">Taux de chevauchement</p>
                        </div>
                        <div className="text-center p-3 bg-slate-50 rounded-lg">
                          <p className="text-2xl font-bold text-red-600">
                            +{analysis.cost_impact}%
                          </p>
                          <p className="text-sm text-slate-600">Impact sur les coûts</p>
                        </div>
                      </div>

                      <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="flex items-start space-x-3">
                          <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium text-blue-800 mb-1">Recommandation</p>
                            <p className="text-blue-700">{analysis.reason}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Zap className="w-5 h-5 mr-2" />
                    Actions Prioritaires
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 border-l-4 border-l-red-500 bg-red-50">
                    <h4 className="font-semibold text-red-800 mb-2">Critique - Action Immédiate</h4>
                    <p className="text-red-700 mb-3">
                      Chevauchement de 43% entre les audiences Facebook principales
                    </p>
                    <Button size="sm" className="bg-red-600 hover:bg-red-700">
                      Optimiser maintenant
                    </Button>
                  </div>

                  <div className="p-4 border-l-4 border-l-yellow-500 bg-yellow-50">
                    <h4 className="font-semibold text-yellow-800 mb-2">Important - Cette semaine</h4>
                    <p className="text-yellow-700 mb-3">
                      Segmentation cross-platform Google/Facebook à revoir
                    </p>
                    <Button size="sm" variant="outline" className="border-yellow-600 text-yellow-700">
                      Planifier révision
                    </Button>
                  </div>

                  <div className="p-4 border-l-4 border-l-blue-500 bg-blue-50">
                    <h4 className="font-semibold text-blue-800 mb-2">Optimisation - Ce mois</h4>
                    <p className="text-blue-700 mb-3">
                      Créer des lookalike audiences exclusives
                    </p>
                    <Button size="sm" variant="outline" className="border-blue-600 text-blue-700">
                      <Plus className="w-4 h-4 mr-1" />
                      Créer audiences
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Impact Économique Estimé</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="font-medium text-green-800">Économies potentielles</span>
                      <span className="text-xl font-bold text-green-600">$2,340/mois</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="font-medium text-blue-800">Reach optimisé</span>
                      <span className="text-xl font-bold text-blue-600">+28%</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                      <span className="font-medium text-purple-800">Réduction CPC</span>
                      <span className="text-xl font-bold text-purple-600">-15%</span>
                    </div>

                    <div className="mt-6 p-4 bg-slate-50 rounded-lg">
                      <h4 className="font-semibold mb-3">Plan d'action recommandé :</h4>
                      <ol className="list-decimal list-inside space-y-2 text-sm">
                        <li>Créer des exclusions d'audience cross-platform</li>
                        <li>Segmenter par comportement plutôt que par démographie</li>
                        <li>Implémenter un système de fréquence capping global</li>
                        <li>Monitorer les performances post-optimisation</li>
                      </ol>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance">
            <Card>
              <CardHeader>
                <CardTitle>Comparaison des Performances par Audience</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={performanceComparison}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="CTR" fill="#8884d8" name="CTR %" />
                    <Bar dataKey="Conv Rate" fill="#82ca9d" name="Taux Conv %" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
