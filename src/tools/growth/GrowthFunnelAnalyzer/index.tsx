
import React, { useState, useMemo } from 'react';
import { TrendingUp, Download, BarChart3, AlertTriangle, Target, Zap } from 'lucide-react';

interface FunnelStep {
  name: string;
  visitors: number;
  conversions: number;
}

interface FunnelData {
  steps: FunnelStep[];
  period: string;
}

export const GrowthFunnelAnalyzer: React.FC = () => {
  const [funnelData, setFunnelData] = useState<FunnelData>({
    steps: [
      { name: 'Landing Page', visitors: 10000, conversions: 3500 },
      { name: 'Sign Up', visitors: 3500, conversions: 2100 },
      { name: 'Trial', visitors: 2100, conversions: 840 },
      { name: 'Payment', visitors: 840, conversions: 252 }
    ],
    period: 'last-month'
  });

  const [editingStep, setEditingStep] = useState<number | null>(null);

  // Calculs automatiques
  const analytics = useMemo(() => {
    const stepAnalytics = funnelData.steps.map((step, index) => {
      const conversionRate = step.visitors > 0 ? (step.conversions / step.visitors) * 100 : 0;
      const dropOffRate = step.visitors > 0 ? ((step.visitors - step.conversions) / step.visitors) * 100 : 0;
      
      let previousStepConversions = index === 0 ? step.visitors : funnelData.steps[index - 1]?.conversions || 0;
      const stepToStepRate = previousStepConversions > 0 ? (step.visitors / previousStepConversions) * 100 : 0;
      
      return {
        ...step,
        conversionRate,
        dropOffRate,
        stepToStepRate,
        isBottleneck: dropOffRate > 70
      };
    });

    const overallConversionRate = funnelData.steps.length > 0 && funnelData.steps[0].visitors > 0 
      ? (funnelData.steps[funnelData.steps.length - 1].conversions / funnelData.steps[0].visitors) * 100 
      : 0;

    const totalVisitors = funnelData.steps[0]?.visitors || 0;
    const totalConversions = funnelData.steps[funnelData.steps.length - 1]?.conversions || 0;

    return {
      steps: stepAnalytics,
      overallConversionRate,
      totalVisitors,
      totalConversions,
      bottlenecks: stepAnalytics.filter(step => step.isBottleneck)
    };
  }, [funnelData]);

  const addStep = () => {
    const lastStep = funnelData.steps[funnelData.steps.length - 1];
    const newStep: FunnelStep = {
      name: `Étape ${funnelData.steps.length + 1}`,
      visitors: lastStep?.conversions || 100,
      conversions: Math.floor((lastStep?.conversions || 100) * 0.6)
    };
    
    setFunnelData({
      ...funnelData,
      steps: [...funnelData.steps, newStep]
    });
  };

  const updateStep = (index: number, updatedStep: Partial<FunnelStep>) => {
    const newSteps = [...funnelData.steps];
    newSteps[index] = { ...newSteps[index], ...updatedStep };
    setFunnelData({ ...funnelData, steps: newSteps });
  };

  const removeStep = (index: number) => {
    if (funnelData.steps.length > 2) {
      const newSteps = funnelData.steps.filter((_, i) => i !== index);
      setFunnelData({ ...funnelData, steps: newSteps });
    }
  };

  const exportToPDF = () => {
    // Simulation d'export PDF
    const dataStr = JSON.stringify(analytics, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `funnel-analysis-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const getStepWidth = (visitors: number) => {
    const maxVisitors = funnelData.steps[0]?.visitors || 1;
    return Math.max((visitors / maxVisitors) * 100, 10);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-xl border border-green-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <TrendingUp className="w-8 h-8 text-green-600" />
            <div>
              <h3 className="text-2xl font-bold text-green-800">Growth Funnel Analyzer</h3>
              <p className="text-green-700">Analyse en temps réel des entonnoirs avec décomposition étape par étape</p>
            </div>
          </div>
          <button
            onClick={exportToPDF}
            className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export PDF</span>
          </button>
        </div>
      </div>

      {/* Métriques générales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
          <div className="flex items-center space-x-2 mb-2">
            <Target className="w-5 h-5 text-blue-600" />
            <span className="font-semibold text-slate-700">Taux global</span>
          </div>
          <div className="text-2xl font-bold text-blue-600">
            {analytics.overallConversionRate.toFixed(1)}%
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
          <div className="flex items-center space-x-2 mb-2">
            <BarChart3 className="w-5 h-5 text-green-600" />
            <span className="font-semibold text-slate-700">Visiteurs totaux</span>
          </div>
          <div className="text-2xl font-bold text-green-600">
            {analytics.totalVisitors.toLocaleString()}
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
          <div className="flex items-center space-x-2 mb-2">
            <Zap className="w-5 h-5 text-purple-600" />
            <span className="font-semibold text-slate-700">Conversions finales</span>
          </div>
          <div className="text-2xl font-bold text-purple-600">
            {analytics.totalConversions.toLocaleString()}
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
          <div className="flex items-center space-x-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <span className="font-semibold text-slate-700">Goulots</span>
          </div>
          <div className="text-2xl font-bold text-red-600">
            {analytics.bottlenecks.length}
          </div>
        </div>
      </div>

      {/* Visualisation du funnel */}
      <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
        <h4 className="text-lg font-semibold text-slate-800 mb-4">Visualisation interactive</h4>
        
        <div className="space-y-4">
          {analytics.steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="flex items-center space-x-4">
                <div className="w-32 text-sm font-medium text-slate-700 flex-shrink-0">
                  {editingStep === index ? (
                    <input
                      type="text"
                      value={step.name}
                      onChange={(e) => updateStep(index, { name: e.target.value })}
                      onBlur={() => setEditingStep(null)}
                      onKeyPress={(e) => e.key === 'Enter' && setEditingStep(null)}
                      className="w-full px-2 py-1 border border-slate-300 rounded text-xs"
                      autoFocus
                    />
                  ) : (
                    <span
                      onClick={() => setEditingStep(index)}
                      className="cursor-pointer hover:text-blue-600"
                    >
                      {step.name}
                    </span>
                  )}
                </div>

                <div className="flex-1">
                  <div 
                    className={`h-12 rounded-lg flex items-center justify-between px-4 text-white font-semibold transition-all duration-300 ${
                      step.isBottleneck ? 'bg-gradient-to-r from-red-500 to-red-600' : 'bg-gradient-to-r from-blue-500 to-purple-600'
                    }`}
                    style={{ width: `${getStepWidth(step.visitors)}%` }}
                  >
                    <span>{step.visitors.toLocaleString()} visiteurs</span>
                    <span>{step.conversionRate.toFixed(1)}%</span>
                  </div>
                </div>

                <div className="w-24 text-sm text-slate-600 text-right">
                  {step.conversions.toLocaleString()} conv.
                </div>

                {funnelData.steps.length > 2 && (
                  <button
                    onClick={() => removeStep(index)}
                    className="text-red-500 hover:text-red-700 text-sm px-2 py-1"
                  >
                    ✕
                  </button>
                )}
              </div>

              {step.isBottleneck && (
                <div className="mt-2 ml-32 text-xs text-red-600 bg-red-50 px-2 py-1 rounded">
                  ⚠️ Goulot d'étranglement détecté - Drop-off de {step.dropOffRate.toFixed(1)}%
                </div>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={addStep}
          className="mt-4 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors text-sm"
        >
          + Ajouter une étape
        </button>
      </div>

      {/* Recommandations */}
      {analytics.bottlenecks.length > 0 && (
        <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
          <h4 className="text-lg font-semibold text-yellow-800 mb-4">🚀 Recommandations d'optimisation</h4>
          <div className="space-y-3">
            {analytics.bottlenecks.map((bottleneck, index) => (
              <div key={index} className="bg-white p-4 rounded-lg border border-yellow-200">
                <h5 className="font-semibold text-slate-800 mb-2">{bottleneck.name}</h5>
                <p className="text-sm text-slate-600 mb-2">
                  Drop-off de {bottleneck.dropOffRate.toFixed(1)}% - {(bottleneck.visitors - bottleneck.conversions).toLocaleString()} utilisateurs perdus
                </p>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• Analyser les heatmaps et session recordings sur cette étape</li>
                  <li>• Simplifier le processus ou réduire les frictions</li>
                  <li>• A/B tester des variantes de l'interface</li>
                  <li>• Ajouter des éléments de réassurance ou d'aide</li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tableau détaillé */}
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200">
          <h4 className="text-lg font-semibold text-slate-800">Analyse détaillée par étape</h4>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-slate-600">Étape</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-slate-600">Visiteurs</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-slate-600">Conversions</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-slate-600">Taux conversion</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-slate-600">Drop-off</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-slate-600">Étape-à-étape</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {analytics.steps.map((step, index) => (
                <tr key={index} className={step.isBottleneck ? 'bg-red-50' : 'hover:bg-slate-50'}>
                  <td className="px-6 py-4 font-medium text-slate-800">{step.name}</td>
                  <td className="px-6 py-4 text-slate-600">{step.visitors.toLocaleString()}</td>
                  <td className="px-6 py-4 text-slate-600">{step.conversions.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      step.conversionRate > 50 ? 'bg-green-100 text-green-700' :
                      step.conversionRate > 30 ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {step.conversionRate.toFixed(1)}%
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      step.dropOffRate < 30 ? 'bg-green-100 text-green-700' :
                      step.dropOffRate < 70 ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {step.dropOffRate.toFixed(1)}%
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {index === 0 ? '100%' : `${step.stepToStepRate.toFixed(1)}%`}
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
