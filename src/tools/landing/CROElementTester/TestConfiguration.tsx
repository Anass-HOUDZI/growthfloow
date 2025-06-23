
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Settings, Calculator, Users, Clock } from 'lucide-react';

interface TestConfigurationProps {
  config: {
    element: string;
    trafficSplit: number;
    duration: number;
    significance: number;
    minimumDetectableEffect: number;
    currentConversionRate: number;
  };
  onConfigChange: (config: any) => void;
  sampleSizeCalculation: {
    requiredSample: number;
    daysToComplete: number;
    power: number;
  };
}

export const TestConfiguration: React.FC<TestConfigurationProps> = ({
  config,
  onConfigChange,
  sampleSizeCalculation
}) => {
  const elements = {
    cta: 'Call-to-Action',
    headline: 'Titre Principal',
    form: 'Formulaire',
    pricing: 'Tarification',
    testimonials: 'Témoignages',
    features: 'Fonctionnalités',
    images: 'Images/Visuels',
    copy: 'Texte Marketing'
  };

  const updateConfig = (key: string, value: any) => {
    onConfigChange({
      ...config,
      [key]: value
    });
  };

  const getPowerColor = (power: number) => {
    if (power >= 80) return 'text-green-600';
    if (power >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="w-5 h-5" />
            <span>Configuration du Test</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Élément à tester
            </label>
            <select
              value={config.element}
              onChange={(e) => updateConfig('element', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {Object.entries(elements).map(([key, name]) => (
                <option key={key} value={key}>{name}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Taux de conversion actuel (%)
              </label>
              <input
                type="number"
                min="0.1"
                max="100"
                step="0.1"
                value={config.currentConversionRate}
                onChange={(e) => updateConfig('currentConversionRate', parseFloat(e.target.value))}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Effet minimum détectable (%)
              </label>
              <input
                type="number"
                min="1"
                max="100"
                value={config.minimumDetectableEffect}
                onChange={(e) => updateConfig('minimumDetectableEffect', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Répartition du trafic: {config.trafficSplit}% / {100 - config.trafficSplit}%
            </label>
            <input
              type="range"
              min="20"
              max="80"
              value={config.trafficSplit}
              onChange={(e) => updateConfig('trafficSplit', parseInt(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>20%</span>
              <span>50%</span>
              <span>80%</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Niveau de confiance
            </label>
            <select
              value={config.significance}
              onChange={(e) => updateConfig('significance', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="90">90% (moins strict)</option>
              <option value="95">95% (recommandé)</option>
              <option value="99">99% (très strict)</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Calculs statistiques */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calculator className="w-5 h-5" />
            <span>Calculs Statistiques</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <Users className="w-6 h-6 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">
                {sampleSizeCalculation.requiredSample.toLocaleString()}
              </div>
              <p className="text-sm text-slate-600">Visiteurs requis</p>
            </div>
            
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <Clock className="w-6 h-6 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-600">
                {sampleSizeCalculation.daysToComplete}
              </div>
              <p className="text-sm text-slate-600">Jours estimés</p>
            </div>
            
            <div className="bg-purple-50 rounded-lg p-4 text-center">
              <div className={`text-2xl font-bold ${getPowerColor(sampleSizeCalculation.power)}`}>
                {sampleSizeCalculation.power}%
              </div>
              <p className="text-sm text-slate-600">Puissance statistique</p>
            </div>
          </div>

          <div className="mt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-slate-700">Puissance du test</span>
              <Badge className={
                sampleSizeCalculation.power >= 80 ? 'bg-green-100 text-green-800' :
                sampleSizeCalculation.power >= 70 ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }>
                {sampleSizeCalculation.power >= 80 ? 'Excellent' :
                 sampleSizeCalculation.power >= 70 ? 'Acceptable' : 'Insuffisant'}
              </Badge>
            </div>
            <Progress value={sampleSizeCalculation.power} className="h-2" />
            <p className="text-xs text-slate-500 mt-1">
              Recommandé: ≥80% pour des résultats fiables
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
