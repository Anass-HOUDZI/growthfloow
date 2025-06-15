
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Area, AreaChart
} from 'recharts';
import { 
  Target, DollarSign, TrendingUp, Calculator, 
  Zap, AlertCircle, CheckCircle, Info
} from 'lucide-react';

interface BidStrategy {
  name: string;
  description: string;
  objective: string;
  minBid: number;
  maxBid: number;
  targetCPA: number;
  targetROAS: number;
  budget: number;
}

interface BidRecommendation {
  strategy: string;
  bidAmount: number;
  estimatedCPC: number;
  estimatedClicks: number;
  estimatedConversions: number;
  estimatedCost: number;
  estimatedRevenue: number;
  confidence: number;
}

export const BidStrategyCalculator: React.FC = () => {
  const [selectedObjective, setSelectedObjective] = useState<string>('conversions');
  const [budget, setBudget] = useState<number>(1000);
  const [targetCPA, setTargetCPA] = useState<number>(50);
  const [targetROAS, setTargetROAS] = useState<number>(400);
  const [historicalCTR, setHistoricalCTR] = useState<number>(2.5);
  const [historicalCR, setHistoricalCR] = useState<number>(3.0);
  const [avgOrderValue, setAvgOrderValue] = useState<number>(150);

  const [bidRecommendations, setBidRecommendations] = useState<BidRecommendation[]>([]);

  const bidStrategies = [
    {
      name: 'Maximize Clicks',
      description: 'Maximise le nombre de clics dans votre budget',
      objective: 'traffic',
      minBid: 0.1,
      maxBid: 2.0,
      targetCPA: 0,
      targetROAS: 0,
      budget: budget
    },
    {
      name: 'Target CPA',
      description: 'Optimise pour un coût par acquisition cible',
      objective: 'conversions',
      minBid: 0.5,
      maxBid: 5.0,
      targetCPA: targetCPA,
      targetROAS: 0,
      budget: budget
    },
    {
      name: 'Target ROAS',
      description: 'Optimise pour un retour sur dépenses publicitaires cible',
      objective: 'revenue',
      minBid: 0.8,
      maxBid: 8.0,
      targetCPA: 0,
      targetROAS: targetROAS,
      budget: budget
    },
    {
      name: 'Maximize Conversions',
      description: 'Maximise les conversions dans votre budget',
      objective: 'conversions',
      minBid: 0.3,
      maxBid: 4.0,
      targetCPA: 0,
      targetROAS: 0,
      budget: budget
    }
  ];

  const calculateBidRecommendations = () => {
    const recommendations: BidRecommendation[] = [];

    bidStrategies.forEach(strategy => {
      let bidAmount = 1.0;
      let estimatedCPC = 1.0;
      let estimatedClicks = 0;
      let estimatedConversions = 0;
      let estimatedCost = 0;
      let estimatedRevenue = 0;
      let confidence = 80;

      switch (strategy.name) {
        case 'Maximize Clicks':
          bidAmount = Math.min(budget / 1000, strategy.maxBid);
          estimatedCPC = bidAmount * 0.8;
          estimatedClicks = budget / estimatedCPC;
          estimatedConversions = estimatedClicks * (historicalCR / 100);
          estimatedCost = budget;
          estimatedRevenue = estimatedConversions * avgOrderValue;
          confidence = 90;
          break;

        case 'Target CPA':
          bidAmount = targetCPA * (historicalCTR / 100) * (historicalCR / 100);
          estimatedCPC = bidAmount * 0.85;
          estimatedClicks = budget / estimatedCPC;
          estimatedConversions = budget / targetCPA;
          estimatedCost = budget;
          estimatedRevenue = estimatedConversions * avgOrderValue;
          confidence = 85;
          break;

        case 'Target ROAS':
          const targetROASDecimal = targetROAS / 100;
          bidAmount = (avgOrderValue * (historicalCR / 100) * (historicalCTR / 100)) / targetROASDecimal;
          estimatedCPC = bidAmount * 0.9;
          estimatedClicks = budget / estimatedCPC;
          estimatedConversions = estimatedClicks * (historicalCR / 100);
          estimatedCost = budget;
          estimatedRevenue = estimatedConversions * avgOrderValue;
          confidence = 75;
          break;

        case 'Maximize Conversions':
          bidAmount = Math.sqrt(targetCPA * (historicalCTR / 100));
          estimatedCPC = bidAmount * 0.95;
          estimatedClicks = budget / estimatedCPC;
          estimatedConversions = estimatedClicks * (historicalCR / 100);
          estimatedCost = budget;
          estimatedRevenue = estimatedConversions * avgOrderValue;
          confidence = 80;
          break;
      }

      recommendations.push({
        strategy: strategy.name,
        bidAmount: Math.min(Math.max(bidAmount, strategy.minBid), strategy.maxBid),
        estimatedCPC: estimatedCPC,
        estimatedClicks: Math.round(estimatedClicks),
        estimatedConversions: Math.round(estimatedConversions * 10) / 10,
        estimatedCost: Math.round(estimatedCost),
        estimatedRevenue: Math.round(estimatedRevenue),
        confidence: confidence
      });
    });

    setBidRecommendations(recommendations);
  };

  useEffect(() => {
    calculateBidRecommendations();
  }, [budget, targetCPA, targetROAS, historicalCTR, historicalCR, avgOrderValue]);

  const performanceData = bidRecommendations.map(rec => ({
    strategy: rec.strategy.replace(' ', '\n'),
    Clics: rec.estimatedClicks,
    Conversions: rec.estimatedConversions,
    Revenue: rec.estimatedRevenue / 100,
    CPC: rec.estimatedCPC,
    Confidence: rec.confidence
  }));

  const getBestStrategy = () => {
    if (bidRecommendations.length === 0) return null;
    
    switch (selectedObjective) {
      case 'traffic':
        return bidRecommendations.reduce((best, current) => 
          current.estimatedClicks > best.estimatedClicks ? current : best
        );
      case 'conversions':
        return bidRecommendations.reduce((best, current) => 
          current.estimatedConversions > best.estimatedConversions ? current : best
        );
      case 'revenue':
        return bidRecommendations.reduce((best, current) => 
          current.estimatedRevenue > best.estimatedRevenue ? current : best
        );
      default:
        return bidRecommendations[0];
    }
  };

  const bestStrategy = getBestStrategy();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Bid Strategy Calculator</h2>
        <p className="text-slate-600">Optimisez vos enchères selon vos objectifs marketing</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Configuration */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Configuration</CardTitle>
            <CardDescription>Paramètres de campagne</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label>Objectif Principal</Label>
              <div className="grid grid-cols-1 gap-2 mt-2">
                {['traffic', 'conversions', 'revenue'].map(obj => (
                  <Button
                    key={obj}
                    variant={selectedObjective === obj ? 'default' : 'outline'}
                    onClick={() => setSelectedObjective(obj)}
                    className="justify-start"
                  >
                    {obj === 'traffic' && <Target className="w-4 h-4 mr-2" />}
                    {obj === 'conversions' && <Zap className="w-4 h-4 mr-2" />}
                    {obj === 'revenue' && <DollarSign className="w-4 h-4 mr-2" />}
                    {obj === 'traffic' ? 'Trafic' : 
                     obj === 'conversions' ? 'Conversions' : 'Revenus'}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <Label>Budget Quotidien ($)</Label>
              <Input
                type="number"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="mt-2"
              />
            </div>

            <div>
              <Label>CPA Cible ($)</Label>
              <Input
                type="number"
                value={targetCPA}
                onChange={(e) => setTargetCPA(Number(e.target.value))}
                className="mt-2"
              />
            </div>

            <div>
              <Label>ROAS Cible (%)</Label>
              <Input
                type="number"
                value={targetROAS}
                onChange={(e) => setTargetROAS(Number(e.target.value))}
                className="mt-2"
              />
            </div>

            <div>
              <Label>CTR Historique (%)</Label>
              <div className="mt-2">
                <Slider
                  value={[historicalCTR]}
                  onValueChange={(value) => setHistoricalCTR(value[0])}
                  max={10}
                  min={0.1}
                  step={0.1}
                  className="w-full"
                />
                <div className="text-sm text-slate-600 mt-1">{historicalCTR}%</div>
              </div>
            </div>

            <div>
              <Label>Taux de Conversion (%)</Label>
              <div className="mt-2">
                <Slider
                  value={[historicalCR]}
                  onValueChange={(value) => setHistoricalCR(value[0])}
                  max={15}
                  min={0.1}
                  step={0.1}
                  className="w-full"
                />
                <div className="text-sm text-slate-600 mt-1">{historicalCR}%</div>
              </div>
            </div>

            <div>
              <Label>Valeur Moyenne Commande ($)</Label>
              <Input
                type="number"
                value={avgOrderValue}
                onChange={(e) => setAvgOrderValue(Number(e.target.value))}
                className="mt-2"
              />
            </div>
          </CardContent>
        </Card>

        {/* Résultats */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stratégie recommandée */}
          {bestStrategy && (
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-green-800">Stratégie Recommandée</CardTitle>
                  <Badge className="bg-green-600">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    {bestStrategy.confidence}% confiance
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-green-600">Stratégie</p>
                    <p className="font-semibold text-green-800">{bestStrategy.strategy}</p>
                  </div>
                  <div>
                    <p className="text-sm text-green-600">Enchère suggérée</p>
                    <p className="font-semibold text-green-800">${bestStrategy.bidAmount.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-green-600">Conversions estimées</p>
                    <p className="font-semibold text-green-800">{bestStrategy.estimatedConversions}</p>
                  </div>
                  <div>
                    <p className="text-sm text-green-600">Revenus estimés</p>
                    <p className="font-semibold text-green-800">${bestStrategy.estimate

Revenue}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Tabs defaultValue="strategies">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="strategies">Stratégies</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="simulation">Simulation</TabsTrigger>
            </TabsList>

            <TabsContent value="strategies" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {bidRecommendations.map((rec, index) => (
                  <Card key={index} className={rec === bestStrategy ? 'ring-2 ring-green-500' : ''}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{rec.strategy}</CardTitle>
                        <Badge variant={rec.confidence >= 85 ? 'default' : 'secondary'}>
                          {rec.confidence}%
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-slate-600">Enchère</span>
                          <span className="font-medium">${rec.bidAmount.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-slate-600">CPC estimé</span>
                          <span className="font-medium">${rec.estimatedCPC.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-slate-600">Clics</span>
                          <span className="font-medium">{rec.estimatedClicks}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-slate-600">Conversions</span>
                          <span className="font-medium">{rec.estimatedConversions}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-slate-600">ROI estimé</span>
                          <span className="font-medium text-blue-600">
                            {((rec.estimatedRevenue - rec.estimatedCost) / rec.estimatedCost * 100).toFixed(0)}%
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="performance">
              <Card>
                <CardHeader>
                  <CardTitle>Comparaison des Performances</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="strategy" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="Clics" fill="#8884d8" />
                      <Bar dataKey="Conversions" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="simulation">
              <Card>
                <CardHeader>
                  <CardTitle>Simulation de Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <AreaChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="strategy" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="Revenue" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                      <Area type="monotone" dataKey="Confidence" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
