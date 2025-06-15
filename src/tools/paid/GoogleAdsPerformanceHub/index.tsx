
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, AreaChart, Area, ScatterChart, Scatter
} from 'recharts';
import { 
  Search, TrendingUp, Target, DollarSign, Eye, MousePointer,
  Zap, AlertTriangle, CheckCircle, Settings, Calendar, Trophy
} from 'lucide-react';

interface GoogleAdsAccount {
  id: string;
  name: string;
  campaigns: GoogleAdsCampaign[];
  total_spend: number;
  total_conversions: number;
}

interface GoogleAdsCampaign {
  id: string;
  name: string;
  type: 'Search' | 'Display' | 'Shopping' | 'YouTube' | 'Performance Max';
  status: 'enabled' | 'paused' | 'removed';
  budget: number;
  spend: number;
  impressions: number;
  clicks: number;
  conversions: number;
  conv_value: number;
  ctr: number;
  cpc: number;
  cpa: number;
  roas: number;
  quality_score: number;
  impression_share: number;
}

interface KeywordPerformance {
  keyword: string;
  match_type: 'Exact' | 'Phrase' | 'Broad';
  impressions: number;
  clicks: number;
  ctr: number;
  cpc: number;
  conversions: number;
  quality_score: number;
  position: number;
}

export const GoogleAdsPerformanceHub: React.FC = () => {
  const [selectedCampaignType, setSelectedCampaignType] = useState<string>('all');
  const [timeframe, setTimeframe] = useState<string>('30d');

  const [campaigns] = useState<GoogleAdsCampaign[]>([
    {
      id: '1',
      name: 'Brand Keywords - Exact Match',
      type: 'Search',
      status: 'enabled',
      budget: 800,
      spend: 745,
      impressions: 89000,
      clicks: 2890,
      conversions: 156,
      conv_value: 23400,
      ctr: 3.25,
      cpc: 0.26,
      cpa: 4.78,
      roas: 31.4,
      quality_score: 8.7,
      impression_share: 0.78
    },
    {
      id: '2',
      name: 'Product Categories - Shopping',
      type: 'Shopping',
      status: 'enabled',
      budget: 1200,
      spend: 1180,
      impressions: 245000,
      clicks: 4900,
      conversions: 245,
      conv_value: 36750,
      ctr: 2.0,
      cpc: 0.24,
      cpa: 4.82,
      roas: 31.1,
      quality_score: 0,
      impression_share: 0.65
    },
    {
      id: '3',
      name: 'Display Remarketing',
      type: 'Display',
      status: 'enabled',
      budget: 600,
      spend: 580,
      impressions: 850000,
      clicks: 3400,
      conversions: 89,
      conv_value: 13350,
      ctr: 0.4,
      cpc: 0.17,
      cpa: 6.52,
      roas: 23.0,
      quality_score: 6.8,
      impression_share: 0.42
    },
    {
      id: '4',
      name: 'YouTube Brand Awareness',
      type: 'YouTube',
      status: 'enabled',
      budget: 400,
      spend: 385,
      impressions: 1200000,
      clicks: 2400,
      conversions: 34,
      conv_value: 5100,
      ctr: 0.2,
      cpc: 0.16,
      cpa: 11.32,
      roas: 13.2,
      quality_score: 7.2,
      impression_share: 0.35
    },
    {
      id: '5',
      name: 'Performance Max - All Products',
      type: 'Performance Max',
      status: 'enabled',
      budget: 1000,
      spend: 980,
      impressions: 180000,
      clicks: 5400,
      conversions: 324,
      conv_value: 48600,
      ctr: 3.0,
      cpc: 0.18,
      cpa: 3.02,
      roas: 49.6,
      quality_score: 0,
      impression_share: 0.85
    }
  ]);

  const [topKeywords] = useState<KeywordPerformance[]>([
    {
      keyword: 'buy software online',
      match_type: 'Exact',
      impressions: 12000,
      clicks: 480,
      ctr: 4.0,
      cpc: 0.85,
      conversions: 24,
      quality_score: 9,
      position: 1.8
    },
    {
      keyword: 'best project management tool',
      match_type: 'Phrase',
      impressions: 8500,
      clicks: 255,
      ctr: 3.0,
      cpc: 1.20,
      conversions: 18,
      quality_score: 8,
      position: 2.1
    },
    {
      keyword: 'enterprise software solution',
      match_type: 'Broad',
      impressions: 15000,
      clicks: 300,
      ctr: 2.0,
      cpc: 0.95,
      conversions: 12,
      quality_score: 7,
      position: 2.8
    }
  ]);

  const totalMetrics = campaigns.reduce((acc, campaign) => ({
    spend: acc.spend + campaign.spend,
    impressions: acc.impressions + campaign.impressions,
    clicks: acc.clicks + campaign.clicks,
    conversions: acc.conversions + campaign.conversions,
    conv_value: acc.conv_value + campaign.conv_value
  }), { spend: 0, impressions: 0, clicks: 0, conversions: 0, conv_value: 0 });

  const avgCTR = (totalMetrics.clicks / totalMetrics.impressions * 100).toFixed(2);
  const avgCPC = (totalMetrics.spend / totalMetrics.clicks).toFixed(2);
  const totalROAS = (totalMetrics.conv_value / totalMetrics.spend).toFixed(1);
  const avgCPA = (totalMetrics.spend / totalMetrics.conversions).toFixed(2);

  const filteredCampaigns = selectedCampaignType === 'all' 
    ? campaigns 
    : campaigns.filter(c => c.type === selectedCampaignType);

  const performanceData = campaigns.map(campaign => ({
    name: campaign.name.substring(0, 15) + '...',
    ROAS: campaign.roas,
    CTR: campaign.ctr,
    CPC: campaign.cpc,
    'Quality Score': campaign.quality_score || 0,
    type: campaign.type
  }));

  const trendData = [
    { date: '2024-01', impressions: 2800000, clicks: 18400, conversions: 890, spend: 2890 },
    { date: '2024-02', impressions: 3200000, clicks: 21200, conversions: 1045, spend: 3180 },
    { date: '2024-03', impressions: 3600000, clicks: 24600, conversions: 1234, spen: 3620 },
    { date: '2024-04', impressions: 3900000, clicks: 26800, conversions: 1356, spend: 3890 },
    { date: '2024-05', impressions: 4100000, clicks: 28200, conversions: 1445, spend: 4050 },
    { date: '2024-06', impressions: 4300000, clicks: 29800, conversions: 1523, spend: 4200 }
  ];

  const campaignTypeData = campaigns.reduce((acc, campaign) => {
    const existing = acc.find(item => item.type === campaign.type);
    if (existing) {
      existing.spend += campaign.spend;
      existing.conversions += campaign.conversions;
      existing.campaigns += 1;
    } else {
      acc.push({
        type: campaign.type,
        spend: campaign.spend,
        conversions: campaign.conversions,
        campaigns: 1
      });
    }
    return acc;
  }, [] as { type: string; spend: number; conversions: number; campaigns: number }[]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'enabled': return 'bg-green-100 text-green-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'removed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCampaignTypeColor = (type: string) => {
    switch (type) {
      case 'Search': return 'bg-blue-100 text-blue-800';
      case 'Shopping': return 'bg-green-100 text-green-800';
      case 'Display': return 'bg-purple-100 text-purple-800';
      case 'YouTube': return 'bg-red-100 text-red-800';
      case 'Performance Max': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-slate-800 mb-2 flex items-center">
          <Search className="w-8 h-8 mr-3 text-blue-600" />
          Google Ads Performance Hub
        </h2>
        <p className="text-slate-600">Tableau de bord complet pour vos campagnes Google Ads</p>
      </div>

      {/* Métriques globales */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Dépenses</p>
                <p className="text-2xl font-bold text-slate-800">${totalMetrics.spend}</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">CTR</p>
                <p className="text-2xl font-bold text-slate-800">{avgCTR}%</p>
              </div>
              <MousePointer className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">CPC</p>
                <p className="text-2xl font-bold text-slate-800">${avgCPC}</p>
              </div>
              <Target className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">ROAS</p>
                <p className="text-2xl font-bold text-slate-800">{totalROAS}x</p>
              </div>
              <TrendingUp className="w-8 h-8 text-orange-500" />
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
              <Trophy className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="campaigns">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="campaigns">Campagnes</TabsTrigger>
          <TabsTrigger value="keywords">Mots-clés</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="trends">Tendances</TabsTrigger>
          <TabsTrigger value="optimization">Optimisation</TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Aperçu des Campagnes</h3>
            <div className="flex space-x-2">
              {['all', 'Search', 'Shopping', 'Display', 'YouTube', 'Performance Max'].map(type => (
                <Button
                  key={type}
                  variant={selectedCampaignType === type ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCampaignType(type)}
                >
                  {type === 'all' ? 'Toutes' : type}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredCampaigns.map((campaign) => (
              <Card key={campaign.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{campaign.name}</CardTitle>
                    <div className="flex space-x-2">
                      <Badge className={getCampaignTypeColor(campaign.type)}>
                        {campaign.type}
                      </Badge>
                      <Badge className={getStatusColor(campaign.status)}>
                        {campaign.status}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-slate-600">ROAS</p>
                      <p className="text-xl font-bold text-blue-600">{campaign.roas}x</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Conversions</p>
                      <p className="text-xl font-bold text-green-600">{campaign.conversions}</p>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">CTR</span>
                      <span className="font-medium">{campaign.ctr}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">CPC</span>
                      <span className="font-medium">${campaign.cpc}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">CPA</span>
                      <span className="font-medium">${campaign.cpa}</span>
                    </div>
                    {campaign.quality_score > 0 && (
                      <div className="flex justify-between">
                        <span className="text-slate-600">Quality Score</span>
                        <span className={`font-medium ${
                          campaign.quality_score >= 8 ? 'text-green-600' :
                          campaign.quality_score >= 6 ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {campaign.quality_score}/10
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-slate-600">Impr. Share</span>
                      <span className="font-medium">{(campaign.impression_share * 100).toFixed(0)}%</span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Budget utilisé</span>
                      <span>{((campaign.spend / campaign.budget) * 100).toFixed(0)}%</span>
                    </div>
                    <Progress value={(campaign.spend / campaign.budget) * 100} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="keywords" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Mots-clés Performants</CardTitle>
              <CardDescription>Analyse détaillée de vos meilleurs mots-clés</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Mot-clé</th>
                      <th className="text-left p-2">Type</th>
                      <th className="text-right p-2">CTR</th>
                      <th className="text-right p-2">CPC</th>
                      <th className="text-right p-2">Conversions</th>
                      <th className="text-right p-2">QS</th>
                      <th className="text-right p-2">Position</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topKeywords.map((keyword, index) => (
                      <tr key={index} className="border-b hover:bg-slate-50">
                        <td className="p-2 font-medium">{keyword.keyword}</td>
                        <td className="p-2">
                          <Badge variant="outline" className="text-xs">
                            {keyword.match_type}
                          </Badge>
                        </td>
                        <td className="p-2 text-right">{keyword.ctr}%</td>
                        <td className="p-2 text-right">${keyword.cpc}</td>
                        <td className="p-2 text-right">{keyword.conversions}</td>
                        <td className="p-2 text-right">
                          <span className={`font-medium ${
                            keyword.quality_score >= 8 ? 'text-green-600' :
                            keyword.quality_score >= 6 ? 'text-yellow-600' : 'text-red-600'
                          }`}>
                            {keyword.quality_score}
                          </span>
                        </td>
                        <td className="p-2 text-right">{keyword.position}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Performance par Type de Correspondance</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={topKeywords}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="keyword" angle={-45} textAnchor="end" height={100} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="ctr" fill="#8884d8" name="CTR %" />
                  <Bar dataKey="quality_score" fill="#82ca9d" name="Quality Score" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance">
          <Card>
            <CardHeader>
              <CardTitle>Analyse Comparative des Campagnes</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <ScatterChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="CTR" name="CTR" unit="%" />
                  <YAxis dataKey="ROAS" name="ROAS" unit="x" />
                  <Tooltip 
                    formatter={(value, name) => [value, name]}
                    labelFormatter={(label) => `Campaign: ${label}`}
                  />
                  <Scatter dataKey="ROAS" fill="#8884d8" />
                </ScatterChart>
              </ResponsiveContainer>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                {campaignTypeData.map((type, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <Badge className={getCampaignTypeColor(type.type)}>
                        {type.type}
                      </Badge>
                      <span className="text-sm text-slate-600">{type.campaigns} campagnes</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Dépenses</span>
                        <span className="font-medium">${type.spend}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Conversions</span>
                        <span className="font-medium">{type.conversions}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">CPA Moyen</span>
                        <span className="font-medium">${(type.spend / type.conversions).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends">
          <Card>
            <CardHeader>
              <CardTitle>Évolution des Performances</CardTitle>
              <CardDescription>Tendances sur les 6 derniers mois</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="conversions" 
                    stackId="1"
                    stroke="#8884d8" 
                    fill="#8884d8"
                    fillOpacity={0.6}
                    name="Conversions"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="spend" 
                    stackId="2"
                    stroke="#82ca9d" 
                    fill="#82ca9d"
                    fillOpacity={0.6}
                    name="Dépenses"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="optimization">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="w-5 h-5 mr-2" />
                  Recommandations d'Optimisation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border-l-4 border-l-green-500 bg-green-50">
                  <div className="flex items-center mb-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                    <span className="font-medium text-green-800">Performance Max Excellente</span>
                  </div>
                  <p className="text-green-700 text-sm mb-2">
                    ROAS de 49.6x - Augmenter le budget de 30-50%
                  </p>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    Appliquer
                  </Button>
                </div>

                <div className="p-4 border-l-4 border-l-yellow-500 bg-yellow-50">
                  <div className="flex items-center mb-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2" />
                    <span className="font-medium text-yellow-800">Impression Share Faible</span>
                  </div>
                  <p className="text-yellow-700 text-sm mb-2">
                    Display Remarketing à 42% - Augmenter les enchères
                  </p>
                  <Button size="sm" variant="outline" className="border-yellow-600 text-yellow-700">
                    Optimiser
                  </Button>
                </div>

                <div className="p-4 border-l-4 border-l-blue-500 bg-blue-50">
                  <div className="flex items-center mb-2">
                    <Settings className="w-5 h-5 text-blue-600 mr-2" />
                    <span className="font-medium text-blue-800">Quality Score Optimization</span>
                  </div>
                  <p className="text-blue-700 text-sm mb-2">
                    3 mots-clés avec QS lt 7 - Améliorer landing pages
                  </p>
                  <Button size="sm" variant="outline" className="border-blue-600 text-blue-700">
                    Analyser
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Opportunités Budget</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div>
                        <p className="font-medium text-green-800">Performance Max</p>
                        <p className="text-sm text-green-600">ROAS: 49.6x</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-600">+$500</p>
                        <p className="text-xs text-green-500">Recommandé</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div>
                        <p className="font-medium text-blue-800">Brand Keywords</p>
                        <p className="text-sm text-blue-600">ROAS: 31.4x</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-blue-600">+$200</p>
                        <p className="text-xs text-blue-500">Opportunité</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Actions Prioritaires</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center p-3 bg-red-50 rounded-lg">
                      <AlertTriangle className="w-5 h-5 text-red-600 mr-3" />
                      <div>
                        <p className="font-medium text-red-800">YouTube CPA élevé</p>
                        <p className="text-sm text-red-600">Revoir ciblage audience</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center p-3 bg-yellow-50 rounded-lg">
                      <Eye className="w-5 h-5 text-yellow-600 mr-3" />
                      <div>
                        <p className="font-medium text-yellow-800">Shopping Impression Share</p>
                        <p className="text-sm text-yellow-600">Optimiser feed produits</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
