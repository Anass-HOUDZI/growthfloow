
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  DollarSign, 
  Target, 
  BarChart3, 
  PieChart,
  AlertCircle,
  CheckCircle,
  ArrowUp,
  ArrowDown,
  Download
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ChannelData {
  name: string;
  budget: number;
  impressions: number;
  clicks: number;
  conversions: number;
  revenue: number;
  attribution: {
    firstTouch: number;
    lastTouch: number;
    linear: number;
    timeDecay: number;
  };
}

interface ROIMetrics {
  roi: number;
  roas: number;
  cac: number;
  ltv: number;
  paybackPeriod: number;
  contributionMargin: number;
}

export const MarketingROITracker: React.FC = () => {
  const { toast } = useToast();
  const [channels, setChannels] = useState<ChannelData[]>([
    {
      name: 'Google Ads',
      budget: 10000,
      impressions: 500000,
      clicks: 25000,
      conversions: 500,
      revenue: 50000,
      attribution: { firstTouch: 20, lastTouch: 40, linear: 25, timeDecay: 30 }
    },
    {
      name: 'Facebook Ads',
      budget: 8000,
      impressions: 400000,
      clicks: 20000,
      conversions: 300,
      revenue: 30000,
      attribution: { firstTouch: 15, lastTouch: 25, linear: 20, timeDecay: 22 }
    },
    {
      name: 'LinkedIn Ads',
      budget: 5000,
      impressions: 150000,
      clicks: 7500,
      conversions: 150,
      revenue: 45000,
      attribution: { firstTouch: 10, lastTouch: 8, linear: 12, timeDecay: 11 }
    }
  ]);

  const [attributionModel, setAttributionModel] = useState<keyof ChannelData['attribution']>('linear');
  const [timeRange, setTimeRange] = useState('last30days');
  const [newChannel, setNewChannel] = useState({
    name: '',
    budget: 0,
    impressions: 0,
    clicks: 0,
    conversions: 0,
    revenue: 0
  });

  const calculateChannelMetrics = (channel: ChannelData): ROIMetrics => {
    const roi = channel.budget > 0 ? ((channel.revenue - channel.budget) / channel.budget) * 100 : 0;
    const roas = channel.budget > 0 ? channel.revenue / channel.budget : 0;
    const cac = channel.conversions > 0 ? channel.budget / channel.conversions : 0;
    const ltv = 2000; // Valeur moyenne estimée
    const paybackPeriod = cac > 0 && ltv > 0 ? cac / (ltv / 12) : 0;
    const contributionMargin = (channel.revenue * 0.7) - channel.budget; // 70% margin

    return { roi, roas, cac, ltv, paybackPeriod, contributionMargin };
  };

  const getGlobalMetrics = () => {
    const totalBudget = channels.reduce((sum, channel) => sum + channel.budget, 0);
    const totalRevenue = channels.reduce((sum, channel) => sum + channel.revenue, 0);
    const totalConversions = channels.reduce((sum, channel) => sum + channel.conversions, 0);
    
    const globalROI = totalBudget > 0 ? ((totalRevenue - totalBudget) / totalBudget) * 100 : 0;
    const globalROAS = totalBudget > 0 ? totalRevenue / totalBudget : 0;
    const globalCAC = totalConversions > 0 ? totalBudget / totalConversions : 0;

    return { globalROI, globalROAS, globalCAC, totalBudget, totalRevenue, totalConversions };
  };

  const addChannel = () => {
    if (!newChannel.name || newChannel.budget === 0) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir au moins le nom et le budget du canal",
        variant: "destructive"
      });
      return;
    }

    const channelWithAttribution: ChannelData = {
      ...newChannel,
      attribution: { firstTouch: 0, lastTouch: 0, linear: 0, timeDecay: 0 }
    };

    setChannels([...channels, channelWithAttribution]);
    setNewChannel({ name: '', budget: 0, impressions: 0, clicks: 0, conversions: 0, revenue: 0 });
    
    toast({
      title: "Canal ajouté",
      description: `${newChannel.name} a été ajouté à l'analyse`,
    });
  };

  const removeChannel = (index: number) => {
    setChannels(channels.filter((_, i) => i !== index));
  };

  const generateRecommendations = () => {
    const recommendations = [];
    
    channels.forEach(channel => {
      const metrics = calculateChannelMetrics(channel);
      
      if (metrics.roi < 100) {
        recommendations.push({
          type: 'warning',
          channel: channel.name,
          message: `ROI faible (${metrics.roi.toFixed(1)}%). Considérez l'optimisation ou la réallocation du budget.`
        });
      }
      
      if (metrics.roas > 4) {
        recommendations.push({
          type: 'success',
          channel: channel.name,
          message: `Excellent ROAS (${metrics.roas.toFixed(1)}). Considérez l'augmentation du budget.`
        });
      }
      
      if (metrics.cac > 200) {
        recommendations.push({
          type: 'warning',
          channel: channel.name,
          message: `CAC élevé (${metrics.cac.toFixed(0)}€). Optimisez le targeting ou les créatifs.`
        });
      }
    });

    return recommendations;
  };

  const exportReport = () => {
    const globalMetrics = getGlobalMetrics();
    const reportData = {
      period: timeRange,
      attributionModel,
      globalMetrics,
      channels: channels.map(channel => ({
        ...channel,
        metrics: calculateChannelMetrics(channel)
      })),
      recommendations: generateRecommendations(),
      generatedAt: new Date().toISOString()
    };

    const dataStr = JSON.stringify(reportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `roi-report-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Rapport exporté",
      description: "Le rapport ROI a été téléchargé avec succès",
    });
  };

  const globalMetrics = getGlobalMetrics();
  const recommendations = generateRecommendations();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-purple-500" />
            Marketing ROI Tracker
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-600 mb-4">
            Surveillez le retour sur investissement de toutes vos actions marketing, avec calcul d'attribution multi-touch et rapport consolidé.
          </p>

          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <Label>Période d'analyse</Label>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last7days">7 derniers jours</SelectItem>
                  <SelectItem value="last30days">30 derniers jours</SelectItem>
                  <SelectItem value="last90days">90 derniers jours</SelectItem>
                  <SelectItem value="lastyear">Dernière année</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1">
              <Label>Modèle d'attribution</Label>
              <Select value={attributionModel} onValueChange={(value: keyof ChannelData['attribution']) => setAttributionModel(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="firstTouch">First Touch</SelectItem>
                  <SelectItem value="lastTouch">Last Touch</SelectItem>
                  <SelectItem value="linear">Linéaire</SelectItem>
                  <SelectItem value="timeDecay">Time Decay</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={exportReport} variant="outline" className="mt-6">
              <Download className="w-4 h-4 mr-2" />
              Exporter
            </Button>
          </div>

          <Tabs defaultValue="overview">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
              <TabsTrigger value="channels">Canaux détaillés</TabsTrigger>
              <TabsTrigger value="attribution">Attribution</TabsTrigger>
              <TabsTrigger value="recommendations">Recommandations</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-600">ROI Global</p>
                        <p className="text-2xl font-bold text-slate-900">
                          {globalMetrics.globalROI.toFixed(1)}%
                        </p>
                      </div>
                      <div className={`p-2 rounded-full ${globalMetrics.globalROI > 100 ? 'bg-green-100' : 'bg-red-100'}`}>
                        {globalMetrics.globalROI > 100 ? 
                          <ArrowUp className="w-5 h-5 text-green-600" /> : 
                          <ArrowDown className="w-5 h-5 text-red-600" />
                        }
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-600">ROAS Global</p>
                        <p className="text-2xl font-bold text-slate-900">
                          {globalMetrics.globalROAS.toFixed(2)}x
                        </p>
                      </div>
                      <DollarSign className="w-8 h-8 text-blue-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-600">CAC Moyen</p>
                        <p className="text-2xl font-bold text-slate-900">
                          {globalMetrics.globalCAC.toFixed(0)}€
                        </p>
                      </div>
                      <Target className="w-8 h-8 text-purple-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5" />
                      Performance par canal
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {channels.map((channel, index) => {
                        const metrics = calculateChannelMetrics(channel);
                        return (
                          <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                            <div>
                              <p className="font-medium">{channel.name}</p>
                              <p className="text-sm text-slate-600">Budget: {channel.budget.toLocaleString()}€</p>
                            </div>
                            <div className="text-right">
                              <p className={`font-bold ${metrics.roi > 100 ? 'text-green-600' : 'text-red-600'}`}>
                                ROI: {metrics.roi.toFixed(1)}%
                              </p>
                              <p className="text-sm text-slate-600">
                                ROAS: {metrics.roas.toFixed(2)}x
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <PieChart className="w-5 h-5" />
                      Répartition du budget
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {channels.map((channel, index) => {
                        const percentage = (channel.budget / globalMetrics.totalBudget) * 100;
                        return (
                          <div key={index}>
                            <div className="flex justify-between text-sm mb-1">
                              <span>{channel.name}</span>
                              <span>{percentage.toFixed(1)}%</span>
                            </div>
                            <div className="w-full bg-slate-200 rounded-full h-2">
                              <div 
                                className="bg-purple-500 h-2 rounded-full" 
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="channels" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Ajouter un canal</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <Label>Nom du canal</Label>
                      <Input
                        value={newChannel.name}
                        onChange={(e) => setNewChannel({...newChannel, name: e.target.value})}
                        placeholder="Ex: Instagram Ads"
                      />
                    </div>
                    <div>
                      <Label>Budget (€)</Label>
                      <Input
                        type="number"
                        value={newChannel.budget}
                        onChange={(e) => setNewChannel({...newChannel, budget: Number(e.target.value)})}
                      />
                    </div>
                    <div>
                      <Label>Impressions</Label>
                      <Input
                        type="number"
                        value={newChannel.impressions}
                        onChange={(e) => setNewChannel({...newChannel, impressions: Number(e.target.value)})}
                      />
                    </div>
                    <div>
                      <Label>Clics</Label>
                      <Input
                        type="number"
                        value={newChannel.clicks}
                        onChange={(e) => setNewChannel({...newChannel, clicks: Number(e.target.value)})}
                      />
                    </div>
                    <div>
                      <Label>Conversions</Label>
                      <Input
                        type="number"
                        value={newChannel.conversions}
                        onChange={(e) => setNewChannel({...newChannel, conversions: Number(e.target.value)})}
                      />
                    </div>
                    <div>
                      <Label>Revenus (€)</Label>
                      <Input
                        type="number"
                        value={newChannel.revenue}
                        onChange={(e) => setNewChannel({...newChannel, revenue: Number(e.target.value)})}
                      />
                    </div>
                  </div>
                  <Button onClick={addChannel} className="mt-4">
                    Ajouter le canal
                  </Button>
                </CardContent>
              </Card>

              <div className="grid gap-4">
                {channels.map((channel, index) => {
                  const metrics = calculateChannelMetrics(channel);
                  return (
                    <Card key={index}>
                      <CardHeader>
                        <div className="flex justify-between items-center">
                          <CardTitle>{channel.name}</CardTitle>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => removeChannel(index)}
                          >
                            Supprimer
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div>
                            <p className="text-sm text-slate-600">ROI</p>
                            <p className={`text-lg font-bold ${metrics.roi > 100 ? 'text-green-600' : 'text-red-600'}`}>
                              {metrics.roi.toFixed(1)}%
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-slate-600">ROAS</p>
                            <p className="text-lg font-bold">{metrics.roas.toFixed(2)}x</p>
                          </div>
                          <div>
                            <p className="text-sm text-slate-600">CAC</p>
                            <p className="text-lg font-bold">{metrics.cac.toFixed(0)}€</p>
                          </div>
                          <div>
                            <p className="text-sm text-slate-600">Marge</p>
                            <p className={`text-lg font-bold ${metrics.contributionMargin > 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {metrics.contributionMargin.toFixed(0)}€
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="attribution" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Analyse d'attribution - Modèle: {attributionModel}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {channels.map((channel, index) => (
                      <div key={index} className="p-4 border border-slate-200 rounded-lg">
                        <h4 className="font-semibold mb-3">{channel.name}</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div>
                            <p className="text-sm text-slate-600">First Touch</p>
                            <p className="font-bold">{channel.attribution.firstTouch}%</p>
                          </div>
                          <div>
                            <p className="text-sm text-slate-600">Last Touch</p>
                            <p className="font-bold">{channel.attribution.lastTouch}%</p>
                          </div>
                          <div>
                            <p className="text-sm text-slate-600">Linéaire</p>
                            <p className="font-bold">{channel.attribution.linear}%</p>
                          </div>
                          <div>
                            <p className="text-sm text-slate-600">Time Decay</p>
                            <p className="font-bold">{channel.attribution.timeDecay}%</p>
                          </div>
                        </div>
                        <div className="mt-3">
                          <p className="text-sm text-slate-600">Attribution actuelle ({attributionModel})</p>
                          <p className="text-lg font-bold text-purple-600">
                            {channel.attribution[attributionModel]}% du total des conversions
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="recommendations" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recommandations d'optimisation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recommendations.length === 0 ? (
                      <div className="text-center py-8">
                        <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                        <p className="text-lg font-semibold">Excellente performance !</p>
                        <p className="text-slate-600">Aucune optimisation critique détectée.</p>
                      </div>
                    ) : (
                      recommendations.map((rec, index) => (
                        <div key={index} className={`p-4 rounded-lg border-l-4 ${
                          rec.type === 'warning' ? 'bg-yellow-50 border-yellow-400' : 'bg-green-50 border-green-400'
                        }`}>
                          <div className="flex items-start gap-3">
                            {rec.type === 'warning' ? 
                              <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" /> :
                              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                            }
                            <div>
                              <p className="font-semibold">{rec.channel}</p>
                              <p className="text-sm text-slate-700">{rec.message}</p>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">Actions recommandées</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Réallouez le budget des canaux peu performants vers les plus rentables</li>
                      <li>• Testez différents modèles d'attribution pour optimiser la mesure</li>
                      <li>• Surveillez les tendances mensuelles pour détecter les variations saisonnières</li>
                      <li>• Implémentez un tracking plus précis pour améliorer l'attribution</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
