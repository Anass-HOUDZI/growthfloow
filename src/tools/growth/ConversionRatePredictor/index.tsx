
import React, { useState } from 'react';
import { TrendingUp, Brain, Target, BarChart3, AlertCircle } from 'lucide-react';

interface PredictionData {
  industry: string;
  trafficSource: string;
  deviceType: string;
  currentTraffic: number;
  currentConversions: number;
  targetMetric: string;
}

export const ConversionRatePredictor: React.FC = () => {
  const [predictionData, setPredictionData] = useState<PredictionData>({
    industry: '',
    trafficSource: '',
    deviceType: '',
    currentTraffic: 0,
    currentConversions: 0,
    targetMetric: 'conversion_rate'
  });

  const [predictions, setPredictions] = useState<any>(null);

  const industries = [
    'E-commerce', 'SaaS', 'Services Financiers', 'Santé', 'Education',
    'Immobilier', 'Voyage', 'Technologie', 'Consulting', 'Autre'
  ];

  const trafficSources = [
    'Organic Search', 'Paid Search', 'Social Media', 'Direct',
    'Email', 'Referral', 'Display', 'Video'
  ];

  const deviceTypes = ['Desktop', 'Mobile', 'Tablet'];

  const benchmarks = {
    'E-commerce': { desktop: 2.8, mobile: 1.9, tablet: 2.1 },
    'SaaS': { desktop: 3.2, mobile: 2.1, tablet: 2.8 },
    'Services Financiers': { desktop: 5.1, mobile: 2.8, tablet: 3.4 },
    'Santé': { desktop: 3.8, mobile: 2.2, tablet: 2.9 },
    'Education': { desktop: 4.2, mobile: 2.6, tablet: 3.1 }
  };

  const generatePredictions = () => {
    const currentRate = (predictionData.currentConversions / predictionData.currentTraffic) * 100;
    const industryBenchmark = benchmarks[predictionData.industry as keyof typeof benchmarks];
    const deviceBenchmark = industryBenchmark?.[predictionData.deviceType.toLowerCase() as keyof typeof industryBenchmark] || 2.5;
    
    const potentialLift = Math.max(0, deviceBenchmark - currentRate);
    const confidenceScore = Math.min(95, 60 + (potentialLift * 5));
    
    // Simulation de prédictions ML
    const predictions = {
      currentRate: currentRate.toFixed(2),
      industryBenchmark: deviceBenchmark.toFixed(1),
      potentialLift: potentialLift.toFixed(1),
      confidenceScore: confidenceScore.toFixed(0),
      recommendations: generateRecommendations(currentRate, deviceBenchmark, predictionData),
      projectedImpact: {
        additionalConversions: Math.round((potentialLift / 100) * predictionData.currentTraffic),
        timeToAchieve: Math.ceil(potentialLift * 2) // semaines
      }
    };

    setPredictions(predictions);
  };

  const generateRecommendations = (current: number, benchmark: number, data: PredictionData) => {
    const recommendations = [];
    
    if (current < benchmark * 0.7) {
      recommendations.push('Optimisation UX urgente requise');
      recommendations.push('A/B test du processus de conversion');
      recommendations.push('Analyse des points de friction');
    }
    
    if (data.deviceType === 'Mobile' && current < 2) {
      recommendations.push('Optimisation mobile prioritaire');
      recommendations.push('Simplification du checkout mobile');
    }
    
    if (data.trafficSource === 'Paid Search') {
      recommendations.push('Amélioration de la cohérence annonce-landing');
      recommendations.push('Optimisation des mots-clés');
    }
    
    recommendations.push('Test de nouvelles propositions de valeur');
    recommendations.push('Optimisation des éléments de confiance');
    
    return recommendations;
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
        <div className="flex items-center space-x-3 mb-4">
          <Brain className="w-8 h-8 text-purple-600" />
          <h3 className="text-2xl font-bold text-purple-800">Conversion Rate Predictor</h3>
        </div>
        <p className="text-purple-700">
          Prédisez et optimisez vos taux de conversion avec l'IA et les benchmarks sectoriels
        </p>
        <div className="mt-2 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs inline-block">
          Premium Feature
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-slate-800">Données de base</h4>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Secteur</label>
              <select
                value={predictionData.industry}
                onChange={(e) => setPredictionData({...predictionData, industry: e.target.value})}
                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">Sélectionnez</option>
                {industries.map(industry => (
                  <option key={industry} value={industry}>{industry}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Source de trafic</label>
              <select
                value={predictionData.trafficSource}
                onChange={(e) => setPredictionData({...predictionData, trafficSource: e.target.value})}
                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">Sélectionnez</option>
                {trafficSources.map(source => (
                  <option key={source} value={source}>{source}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Type d'appareil</label>
              <select
                value={predictionData.deviceType}
                onChange={(e) => setPredictionData({...predictionData, deviceType: e.target.value})}
                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">Sélectionnez</option>
                {deviceTypes.map(device => (
                  <option key={device} value={device}>{device}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Trafic mensuel</label>
              <input
                type="number"
                value={predictionData.currentTraffic}
                onChange={(e) => setPredictionData({...predictionData, currentTraffic: parseInt(e.target.value)})}
                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="10000"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Conversions mensuelles</label>
            <input
              type="number"
              value={predictionData.currentConversions}
              onChange={(e) => setPredictionData({...predictionData, currentConversions: parseInt(e.target.value)})}
              className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="250"
            />
          </div>

          <button
            onClick={generatePredictions}
            disabled={!predictionData.industry || !predictionData.currentTraffic}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all duration-200 disabled:opacity-50"
          >
            Générer les prédictions
          </button>
        </div>

        {predictions && (
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-slate-800">Analyse prédictive</h4>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg border border-slate-200">
                <div className="flex items-center space-x-2 mb-2">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-slate-600">Taux actuel</span>
                </div>
                <div className="text-2xl font-bold text-slate-800">{predictions.currentRate}%</div>
              </div>

              <div className="bg-white p-4 rounded-lg border border-slate-200">
                <div className="flex items-center space-x-2 mb-2">
                  <Target className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-slate-600">Benchmark secteur</span>
                </div>
                <div className="text-2xl font-bold text-slate-800">{predictions.industryBenchmark}%</div>
              </div>

              <div className="bg-white p-4 rounded-lg border border-slate-200">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                  <span className="text-sm font-medium text-slate-600">Potentiel d'amélioration</span>
                </div>
                <div className="text-2xl font-bold text-slate-800">+{predictions.potentialLift}%</div>
              </div>

              <div className="bg-white p-4 rounded-lg border border-slate-200">
                <div className="flex items-center space-x-2 mb-2">
                  <Brain className="w-5 h-5 text-orange-600" />
                  <span className="text-sm font-medium text-slate-600">Score de confiance</span>
                </div>
                <div className="text-2xl font-bold text-slate-800">{predictions.confidenceScore}%</div>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-lg">
              <h5 className="font-semibold text-slate-800 mb-3 flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-blue-600" />
                <span>Recommandations IA</span>
              </h5>
              <div className="space-y-2">
                {predictions.recommendations.map((rec: string, index: number) => (
                  <div key={index} className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-sm text-slate-600">{rec}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-200">
              <h5 className="font-semibold text-purple-800 mb-2">Impact projeté</h5>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-purple-600">Conversions supplémentaires/mois:</span>
                  <div className="text-lg font-bold text-purple-800">+{predictions.projectedImpact.additionalConversions}</div>
                </div>
                <div>
                  <span className="text-purple-600">Temps d'implémentation:</span>
                  <div className="text-lg font-bold text-purple-800">{predictions.projectedImpact.timeToAchieve} semaines</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
