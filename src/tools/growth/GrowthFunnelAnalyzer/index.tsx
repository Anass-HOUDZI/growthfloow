
import React, { useState, useMemo } from 'react';
import { TrendingUp, Users, Target, BarChart3 } from 'lucide-react';
import { GrowthMetrics } from '../../../lib/analytics/MetricsEngine';

interface FunnelStep {
  name: string;
  visitors: number;
  conversions: number;
}

interface FunnelData {
  steps: FunnelStep[];
  timeframe: string;
}

export const GrowthFunnelAnalyzer: React.FC = () => {
  const [funnelData, setFunnelData] = useState<FunnelData>({
    steps: [
      { name: 'Visiteurs', visitors: 10000, conversions: 10000 },
      { name: 'Intérêts', visitors: 10000, conversions: 3000 },
      { name: 'Leads', visitors: 3000, conversions: 1200 },
      { name: 'Clients', visitors: 1200, conversions: 300 }
    ],
    timeframe: '30 jours'
  });

  const analysis = useMemo(() => {
    const { steps } = funnelData;
    const conversionRates = steps.slice(1).map((step, index) => ({
      step: step.name,
      rate: GrowthMetrics.calculateConversionRate(steps[index].conversions, step.conversions),
      dropOff: steps[index].conversions - step.conversions
    }));

    const overallConversion = GrowthMetrics.calculateConversionRate(
      steps[0].conversions,
      steps[steps.length - 1].conversions
    );

    return {
      conversionRates,
      overallConversion,
      totalLeakage: steps[0].conversions - steps[steps.length - 1].conversions
    };
  }, [funnelData]);

  const handleStepChange = (index: number, field: 'visitors' | 'conversions', value: number) => {
    const newSteps = [...funnelData.steps];
    newSteps[index] = { ...newSteps[index], [field]: value };
    setFunnelData({ ...funnelData, steps: newSteps });
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
        <div className="flex items-center space-x-3 mb-4">
          <TrendingUp className="w-8 h-8 text-green-600" />
          <h3 className="text-2xl font-bold text-green-800">Growth Funnel Analyzer</h3>
        </div>
        <p className="text-green-700">
          Analysez votre entonnoir de conversion avec des métriques détaillées et des recommandations d'optimisation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="bg-white p-6 rounded-lg border border-slate-200">
          <h4 className="text-lg font-semibold text-slate-800 mb-4">Configuration de l'Entonnoir</h4>
          
          <div className="space-y-4">
            {funnelData.steps.map((step, index) => (
              <div key={index} className="grid grid-cols-3 gap-3 items-center">
                <div className="font-medium text-slate-700">{step.name}</div>
                <input
                  type="number"
                  value={step.visitors}
                  onChange={(e) => handleStepChange(index, 'visitors', parseInt(e.target.value) || 0)}
                  className="px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Visiteurs"
                />
                <input
                  type="number"
                  value={step.conversions}
                  onChange={(e) => handleStepChange(index, 'conversions', parseInt(e.target.value) || 0)}
                  className="px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Conversions"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Visualization */}
        <div className="bg-white p-6 rounded-lg border border-slate-200">
          <h4 className="text-lg font-semibold text-slate-800 mb-4">Visualisation Entonnoir</h4>
          
          <div className="space-y-3">
            {funnelData.steps.map((step, index) => {
              const width = (step.conversions / funnelData.steps[0].conversions) * 100;
              const conversionRate = index > 0 
                ? GrowthMetrics.calculateConversionRate(funnelData.steps[index - 1].conversions, step.conversions)
                : 100;

              return (
                <div key={index} className="relative">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-slate-700">{step.name}</span>
                    <span className="text-sm text-slate-500">
                      {step.conversions.toLocaleString()} ({conversionRate.toFixed(1)}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-8 relative overflow-hidden">
                    <div
                      className={`h-8 rounded-full transition-all duration-500 ${
                        index === 0 ? 'bg-gradient-to-r from-green-500 to-emerald-600' :
                        index === 1 ? 'bg-gradient-to-r from-blue-500 to-cyan-600' :
                        index === 2 ? 'bg-gradient-to-r from-yellow-500 to-orange-600' :
                        'bg-gradient-to-r from-purple-500 to-pink-600'
                      }`}
                      style={{ width: `${width}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Analysis Results */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg border border-slate-200">
          <div className="flex items-center space-x-3 mb-3">
            <Target className="w-6 h-6 text-green-600" />
            <h5 className="font-semibold text-slate-800">Conversion Globale</h5>
          </div>
          <div className="text-3xl font-bold text-green-600">
            {analysis.overallConversion.toFixed(2)}%
          </div>
          <p className="text-sm text-slate-600 mt-1">
            Du premier contact au client final
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-slate-200">
          <div className="flex items-center space-x-3 mb-3">
            <Users className="w-6 h-6 text-blue-600" />
            <h5 className="font-semibold text-slate-800">Pertes Totales</h5>
          </div>
          <div className="text-3xl font-bold text-red-600">
            {analysis.totalLeakage.toLocaleString()}
          </div>
          <p className="text-sm text-slate-600 mt-1">
            Visiteurs perdus dans l'entonnoir
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-slate-200">
          <div className="flex items-center space-x-3 mb-3">
            <BarChart3 className="w-6 h-6 text-purple-600" />
            <h5 className="font-semibold text-slate-800">Étape Critique</h5>
          </div>
          <div className="text-lg font-bold text-purple-600">
            {analysis.conversionRates.length > 0 
              ? analysis.conversionRates.reduce((min, current) => 
                  current.rate < min.rate ? current : min
                ).step
              : 'N/A'
            }
          </div>
          <p className="text-sm text-slate-600 mt-1">
            Plus fort taux de perte
          </p>
        </div>
      </div>

      {/* Detailed Analysis */}
      <div className="bg-white p-6 rounded-lg border border-slate-200">
        <h4 className="text-lg font-semibold text-slate-800 mb-4">Analyse Détaillée par Étape</h4>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Étape</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Taux de Conversion</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Abandons</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Recommandation</th>
              </tr>
            </thead>
            <tbody>
              {analysis.conversionRates.map((rate, index) => (
                <tr key={index} className="border-b border-slate-100">
                  <td className="py-3 px-4 text-slate-800">{rate.step}</td>
                  <td className="py-3 px-4">
                    <span className={`font-semibold ${
                      rate.rate > 30 ? 'text-green-600' : 
                      rate.rate > 15 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {rate.rate.toFixed(2)}%
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-600">
                    {rate.dropOff.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-sm text-slate-600">
                    {rate.rate < 15 
                      ? "🚨 Optimisation urgente requise"
                      : rate.rate < 30 
                        ? "⚠️ Amélioration recommandée"
                        : "✅ Performance satisfaisante"
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
