import React, { useState } from 'react';
import { TestTube, Calculator, Clock, Target, TrendingUp, AlertCircle, Users } from 'lucide-react';

interface ExperimentData {
  hypothesis: string;
  baselineConversion: number;
  expectedLift: number;
  trafficSplit: number;
  confidenceLevel: number;
  powerLevel: number;
  weeklyVisitors: number;
}

export const GrowthExperimentDesigner: React.FC = () => {
  const [experimentData, setExperimentData] = useState<ExperimentData>({
    hypothesis: '',
    baselineConversion: 2.5,
    expectedLift: 20,
    trafficSplit: 50,
    confidenceLevel: 95,
    powerLevel: 80,
    weeklyVisitors: 10000
  });

  const [results, setResults] = useState<any>(null);

  const calculateSampleSize = () => {
    const { baselineConversion, expectedLift, confidenceLevel, powerLevel } = experimentData;
    
    // Simplified sample size calculation
    const p1 = baselineConversion / 100;
    const p2 = p1 * (1 + expectedLift / 100);
    const pooledP = (p1 + p2) / 2;
    
    // Z-scores for confidence and power
    const zAlpha = confidenceLevel === 95 ? 1.96 : confidenceLevel === 99 ? 2.576 : 1.645;
    const zBeta = powerLevel === 80 ? 0.84 : powerLevel === 90 ? 1.28 : 0.675;
    
    const numerator = Math.pow(zAlpha + zBeta, 2) * 2 * pooledP * (1 - pooledP);
    const denominator = Math.pow(p2 - p1, 2);
    
    const sampleSizePerVariant = Math.ceil(numerator / denominator);
    const totalSampleSize = sampleSizePerVariant * 2;
    
    const durationWeeks = Math.ceil(totalSampleSize / (experimentData.weeklyVisitors * experimentData.trafficSplit / 100));
    
    setResults({
      sampleSizePerVariant,
      totalSampleSize,
      durationWeeks,
      minimumDetectableEffect: ((p2 - p1) / p1 * 100).toFixed(1),
      recommendedTrafficSplit: 50
    });
  };

  const updateField = (field: keyof ExperimentData, value: number | string) => {
    setExperimentData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-xl border border-purple-200">
        <div className="flex items-center space-x-3 mb-4">
          <TestTube className="w-8 h-8 text-purple-600" />
          <h3 className="text-2xl font-bold text-purple-800">Growth Experiment Designer</h3>
        </div>
        <p className="text-purple-700">
          Concevez des expériences A/B robustes avec calcul automatique de la significativité statistique
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-slate-800">Configuration de l'expérience</h4>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Hypothèse de test
            </label>
            <textarea
              value={experimentData.hypothesis}
              onChange={(e) => updateField('hypothesis', e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              rows={3}
              placeholder="Si nous modifions X, alors Y va augmenter de Z% car..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Conversion baseline (%)
              </label>
              <input
                type="number"
                step="0.1"
                value={experimentData.baselineConversion}
                onChange={(e) => updateField('baselineConversion', parseFloat(e.target.value))}
                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Lift attendu (%)
              </label>
              <input
                type="number"
                value={experimentData.expectedLift}
                onChange={(e) => updateField('expectedLift', parseInt(e.target.value))}
                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Visiteurs/semaine
              </label>
              <input
                type="number"
                value={experimentData.weeklyVisitors}
                onChange={(e) => updateField('weeklyVisitors', parseInt(e.target.value))}
                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Trafic test (%)
              </label>
              <input
                type="number"
                value={experimentData.trafficSplit}
                onChange={(e) => updateField('trafficSplit', parseInt(e.target.value))}
                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          <button
            onClick={calculateSampleSize}
            className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-purple-600 hover:to-indigo-700 transition-all duration-200"
          >
            Calculer les paramètres du test
          </button>
        </div>

        {results && (
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-slate-800">Résultats du calcul</h4>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg border border-slate-200">
                <div className="flex items-center space-x-2 mb-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-slate-600">Échantillon/variante</span>
                </div>
                <div className="text-2xl font-bold text-slate-800">{results.sampleSizePerVariant}</div>
              </div>

              <div className="bg-white p-4 rounded-lg border border-slate-200">
                <div className="flex items-center space-x-2 mb-2">
                  <Calculator className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-slate-600">Échantillon total</span>
                </div>
                <div className="text-2xl font-bold text-slate-800">{results.totalSampleSize}</div>
              </div>

              <div className="bg-white p-4 rounded-lg border border-slate-200">
                <div className="flex items-center space-x-2 mb-2">
                  <Clock className="w-5 h-5 text-purple-600" />
                  <span className="text-sm font-medium text-slate-600">Durée (semaines)</span>
                </div>
                <div className="text-2xl font-bold text-slate-800">{results.durationWeeks}</div>
              </div>

              <div className="bg-white p-4 rounded-lg border border-slate-200">
                <div className="flex items-center space-x-2 mb-2">
                  <Target className="w-5 h-5 text-orange-600" />
                  <span className="text-sm font-medium text-slate-600">MDE (%)</span>
                </div>
                <div className="text-2xl font-bold text-slate-800">{results.minimumDetectableEffect}</div>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-lg">
              <h5 className="font-semibold text-slate-800 mb-3 flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-blue-600" />
                <span>Recommandations</span>
              </h5>
              <div className="space-y-2 text-sm text-slate-600">
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                  <span>Durée minimale recommandée : {results.durationWeeks} semaines</span>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                  <span>Surveillez les métriques quotidiennement mais ne stoppez pas prématurément</span>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                  <span>Vérifiez l'homogénéité du trafic entre les variants</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
