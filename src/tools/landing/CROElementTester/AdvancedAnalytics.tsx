
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, Users, Calendar, Target, AlertTriangle, CheckCircle, Brain } from 'lucide-react';

interface AnalyticsData {
  dailyData: Array<{ day: number; controlRate: number; variantRate: number; visitors: number }>;
  segmentData: Array<{ segment: string; controlRate: number; variantRate: number; improvement: number }>;
  deviceData: Array<{ device: string; visitors: number; conversions: number; rate: number }>;
  timeData: Array<{ hour: number; rate: number; visitors: number }>;
}

interface AdvancedAnalyticsProps {
  testResults: any;
  analyticsData: AnalyticsData;
}

export const AdvancedAnalytics: React.FC<AdvancedAnalyticsProps> = ({ testResults, analyticsData }) => {
  const [selectedSegment, setSelectedSegment] = useState('all');

  const insights = [
    {
      type: 'trend',
      icon: TrendingUp,
      title: 'Tendance positive',
      description: 'La variante montre une amélioration constante depuis 3 jours',
      confidence: 'high',
      color: 'green'
    },
    {
      type: 'segment',
      icon: Users,
      title: 'Performance segmentée',
      description: 'Meilleurs résultats sur mobile (+35%) vs desktop (+12%)',
      confidence: 'medium',
      color: 'blue'
    },
    {
      type: 'timing',
      icon: Calendar,
      title: 'Effet temporel',
      description: 'Pic de performance entre 14h-18h (heures de bureau)',
      confidence: 'high',
      color: 'purple'
    },
    {
      type: 'warning',
      icon: AlertTriangle,
      title: 'Effet de nouveauté détecté',
      description: 'Possible diminution des performances après J+7',
      confidence: 'medium',
      color: 'yellow'
    }
  ];

  const deviceColors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

  const bayesianAnalysis = {
    probability: 0.87,
    expectedLift: 0.23,
    riskOfLoss: 0.13,
    valueAtRisk: 0.05
  };

  return (
    <div className="space-y-6">
      {/* Insights automatiques */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="w-5 h-5" />
            <span>Insights Automatiques</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {insights.map((insight, index) => {
              const Icon = insight.icon;
              return (
                <div key={index} className="border border-slate-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      insight.color === 'green' ? 'bg-green-100 text-green-600' :
                      insight.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                      insight.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                      'bg-yellow-100 text-yellow-600'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-slate-800">{insight.title}</h4>
                      <p className="text-sm text-slate-600 mt-1">{insight.description}</p>
                      <Badge 
                        className={`mt-2 ${
                          insight.confidence === 'high' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        Confiance {insight.confidence === 'high' ? 'élevée' : 'modérée'}
                      </Badge>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="trends" className="w-full">
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="trends">Tendances</TabsTrigger>
          <TabsTrigger value="segments">Segments</TabsTrigger>
          <TabsTrigger value="devices">Appareils</TabsTrigger>
          <TabsTrigger value="timing">Timing</TabsTrigger>
          <TabsTrigger value="bayesian">Analyse Bayésienne</TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Évolution des Taux de Conversion</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={analyticsData.dailyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="controlRate" 
                      stroke="#64748B" 
                      strokeWidth={2}
                      name="Contrôle"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="variantRate" 
                      stroke="#3B82F6" 
                      strokeWidth={2}
                      name="Variante"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="segments" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance par Segment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.segmentData.map((segment, index) => (
                  <div key={index} className="border border-slate-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-slate-800 capitalize">{segment.segment}</h4>
                      <Badge className={segment.improvement > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                        {segment.improvement > 0 ? '+' : ''}{segment.improvement}%
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-slate-600">Contrôle:</span>
                        <div className="font-medium">{segment.controlRate}%</div>
                      </div>
                      <div>
                        <span className="text-slate-600">Variante:</span>
                        <div className="font-medium">{segment.variantRate}%</div>
                      </div>
                      <div>
                        <span className="text-slate-600">Amélioration:</span>
                        <div className={`font-medium ${segment.improvement > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {segment.improvement > 0 ? '+' : ''}{segment.improvement}%
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="devices" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Répartition par Appareil</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={analyticsData.deviceData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="visitors"
                        label={({ device, percent }) => `${device} ${(percent * 100).toFixed(0)}%`}
                      >
                        {analyticsData.deviceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={deviceColors[index % deviceColors.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance par Appareil</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={analyticsData.deviceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="device" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="rate" fill="#3B82F6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="timing" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance par Heure</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={analyticsData.timeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="rate" 
                      stroke="#10B981" 
                      strokeWidth={2}
                      name="Taux de conversion"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bayesian" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Analyse Bayésienne</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Probabilité que la variante soit meilleure</span>
                      <span className="text-lg font-bold text-green-600">
                        {(bayesianAnalysis.probability * 100).toFixed(1)}%
                      </span>
                    </div>
                    <Progress value={bayesianAnalysis.probability * 100} className="h-2" />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Amélioration attendue</span>
                      <span className="text-lg font-bold text-blue-600">
                        +{(bayesianAnalysis.expectedLift * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Risque de perte</span>
                      <span className="text-lg font-bold text-red-600">
                        {(bayesianAnalysis.riskOfLoss * 100).toFixed(1)}%
                      </span>
                    </div>
                    <Progress value={bayesianAnalysis.riskOfLoss * 100} className="h-2" />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Valeur à risque</span>
                      <span className="text-lg font-bold text-orange-600">
                        {(bayesianAnalysis.valueAtRisk * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recommandations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                      <h5 className="font-medium text-green-800">Décision recommandée</h5>
                      <p className="text-sm text-green-700">
                        Implémenter la variante - probabilité de succès élevée
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                    <Target className="w-5 h-5 text-blue-500 mt-0.5" />
                    <div>
                      <h5 className="font-medium text-blue-800">Potentiel d'amélioration</h5>
                      <p className="text-sm text-blue-700">
                        Gain attendu de 23% avec un risque de perte limité à 13%
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5" />
                    <div>
                      <h5 className="font-medium text-yellow-800">Points d'attention</h5>
                      <p className="text-sm text-yellow-700">
                        Surveiller les performances post-implémentation pendant 2 semaines
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
