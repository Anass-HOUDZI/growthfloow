import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell
} from 'recharts';
import { 
  TrendingUp, TrendingDown, AlertTriangle, CheckCircle, 
  Target, DollarSign, Eye, MousePointer, Users, Zap
} from 'lucide-react';

interface AdData {
  platform: string;
  campaign: string;
  impressions: number;
  clicks: number;
  spend: number;
  conversions: number;
  ctr: number;
  cpc: number;
  roas: number;
}

interface Recommendation {
  type: 'critical' | 'warning' | 'success';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  action: string;
}

export const AdPerformanceOptimizer: React.FC = () => {
  const [adData, setAdData] = useState<AdData[]>([
    {
      platform: 'Facebook',
      campaign: 'Summer Sale 2024',
      impressions: 125000,
      clicks: 3250,
      spend: 1500,
      conversions: 89,
      ctr: 2.6,
      cpc: 0.46,
      roas: 4.2
    },
    {
      platform: 'Google',
      campaign: 'Brand Keywords',
      impressions: 89000,
      clicks: 2890,
      spend: 2100,
      conversions: 156,
      ctr: 3.2,
      cpc: 0.73,
      roas: 5.8
    },
    {
      platform: 'LinkedIn',
      campaign: 'B2B Lead Gen',
      impressions: 45000,
      clicks: 890,
      spend: 1200,
      conversions: 34,
      ctr: 2.0,
      cpc: 1.35,
      roas: 2.8
    }
  ]);

  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');

  const generateRecommendations = (): Recommendation[] => {
    const recommendations: Recommendation[] = [];
    
    adData.forEach(ad => {
      if (ad.ctr < 2.0) {
        recommendations.push({
          type: 'critical',
          title: `CTR faible sur ${ad.platform}`,
          description: `CTR de ${ad.ctr}% en dessous des standards (2.5%+)`,
          impact: 'high',
          action: 'Optimiser le créatif et le ciblage'
        });
      }
      
      if (ad.roas < 3.0) {
        recommendations.push({
          type: 'warning',
          title: `ROAS suboptimal sur ${ad.platform}`,
          description: `ROAS de ${ad.roas}x pourrait être amélioré`,
          impact: 'medium',
          action: 'Ajuster les enchères et audiences'
        });
      }
      
      if (ad.roas > 4.0) {
        recommendations.push({
          type: 'success',
          title: `Performance excellente sur ${ad.platform}`,
          description: `ROAS de ${ad.roas}x très performant`,
          impact: 'high',
          action: 'Augmenter le budget de cette campagne'
        });
      }
    });

    return recommendations;
  };

  const filteredData = selectedPlatform === 'all' 
    ? adData 
    : adData.filter(ad => ad.platform.toLowerCase() === selectedPlatform);

  const totalMetrics = adData.reduce((acc, ad) => ({
    impressions: acc.impressions + ad.impressions,
    clicks: acc.clicks + ad.clicks,
    spend: acc.spend + ad.spend,
    conversions: acc.conversions + ad.conversions
  }), { impressions: 0, clicks: 0, spend: 0, conversions: 0 });

  const overallCTR = (totalMetrics.clicks / totalMetrics.impressions * 100).toFixed(2);
  const overallCPC = (totalMetrics.spend / totalMetrics.clicks).toFixed(2);
  const overallROAS = (totalMetrics.conversions * 50 / totalMetrics.spend).toFixed(1);

  const pieData = adData.map(ad => ({
    name: ad.platform,
    value: ad.spend,
    color: ad.platform === 'Facebook' ? '#1877F2' : 
           ad.platform === 'Google' ? '#4285F4' : '#0A66C2'
  }));

  const performanceData = adData.map(ad => ({
    platform: ad.platform,
    ROAS: ad.roas,
    CTR: ad.ctr,
    CPC: ad.cpc,
    Conversions: ad.conversions
  }));

  return (
    <div className="flex flex-col items-center justify-center w-full px-2 md:px-0 py-8">
      <div className="flex flex-col items-center justify-center w-full max-w-3xl mb-8">
        <div className="mb-4">
          <div className="flex items-center justify-center w-[68px] h-[68px] rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-200/25">
            <TrendingUp className="w-10 h-10 text-white" />
          </div>
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 text-center mb-2">
          Ad Performance Optimizer
        </h2>
        <p className="text-lg md:text-xl text-slate-500 text-center max-w-2xl mb-2">
          Analysez et optimisez vos performances publicitaires cross-platform
        </p>
      </div>
      {/* Métriques globales */}
      <div className="w-full max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">CTR Global</p>
                  <p className="text-2xl font-bold text-slate-800">{overallCTR}%</p>
                </div>
                <Eye className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">CPC Moyen</p>
                  <p className="text-2xl font-bold text-slate-800">${overallCPC}</p>
                </div>
                <MousePointer className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">ROAS Global</p>
                  <p className="text-2xl font-bold text-slate-800">{overallROAS}x</p>
                </div>
                <DollarSign className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Conversions</p>
                  <p className="text-2xl font-bold text-slate-800">{totalMetrics.conversions}</p>
                </div>
                <Target className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="recommendations">Recommandations</TabsTrigger>
            <TabsTrigger value="budget">Répartition Budget</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance par Plateforme</CardTitle>
                <CardDescription>Comparaison des métriques clés</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="platform" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="ROAS" fill="#8884d8" />
                    <Bar dataKey="CTR" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {adData.map((ad, index) => (
                <Card key={index}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">{ad.platform}</Badge>
                      <div className="flex items-center space-x-1">
                        {ad.roas >= 4 ? (
                          <TrendingUp className="w-4 h-4 text-green-500" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-red-500" />
                        )}
                      </div>
                    </div>
                    <CardTitle className="text-lg">{ad.campaign}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-600">Impressions</span>
                        <span className="font-medium">{ad.impressions.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-600">CTR</span>
                        <span className="font-medium">{ad.ctr}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-600">CPC</span>
                        <span className="font-medium">${ad.cpc}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-600">ROAS</span>
                        <span className="font-medium text-blue-600">{ad.roas}x</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Évolution des Performances</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="platform" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="ROAS" stroke="#8884d8" strokeWidth={2} />
                    <Line type="monotone" dataKey="CTR" stroke="#82ca9d" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-6">
            <div className="space-y-4">
              {generateRecommendations().map((rec, index) => (
                <Card key={index} className={`border-l-4 ${
                  rec.type === 'critical' ? 'border-l-red-500' :
                  rec.type === 'warning' ? 'border-l-yellow-500' : 'border-l-green-500'
                }`}>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        {rec.type === 'critical' && <AlertTriangle className="w-6 h-6 text-red-500" />}
                        {rec.type === 'warning' && <AlertTriangle className="w-6 h-6 text-yellow-500" />}
                        {rec.type === 'success' && <CheckCircle className="w-6 h-6 text-green-500" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-slate-800">{rec.title}</h3>
                          <Badge variant={rec.impact === 'high' ? 'default' : 'secondary'}>
                            Impact {rec.impact}
                          </Badge>
                        </div>
                        <p className="text-slate-600 mb-3">{rec.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-blue-600">{rec.action}</span>
                          <Button size="sm" variant="outline">
                            <Zap className="w-4 h-4 mr-1" />
                            Appliquer
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="budget" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Répartition du Budget</CardTitle>
                <CardDescription>Distribution des dépenses par plateforme</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `$${value}`} />
                    </PieChart>
                  </ResponsiveContainer>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-slate-800">Recommandations d'allocation</h4>
                    {adData.map((ad, index) => (
                      <div key={index} className="p-4 bg-slate-50 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">{ad.platform}</span>
                          <Badge variant={ad.roas >= 4 ? 'default' : 'secondary'}>
                            ROAS {ad.roas}x
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-600 mb-2">
                          Budget actuel: ${ad.spend}
                        </p>
                        <p className="text-sm font-medium text-blue-600">
                          {ad.roas >= 4 
                            ? `↗ Augmenter de 20-30%` 
                            : ad.roas >= 3 
                              ? `→ Maintenir le budget`
                              : `↘ Réduire de 15-25%`
                          }
                        </p>
                      </div>
                    ))}
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
