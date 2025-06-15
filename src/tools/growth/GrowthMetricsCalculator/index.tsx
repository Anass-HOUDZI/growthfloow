
import React, { useState } from 'react';
import { Calculator, TrendingUp, DollarSign, Users, PieChart, BarChart3 } from 'lucide-react';

interface MetricsData {
  monthlyRevenue: number;
  acquisitionCost: number;
  churnRate: number;
  avgCustomerValue: number;
  cohortSize: number;
  retentionRates: number[];
}

export const GrowthMetricsCalculator: React.FC = () => {
  const [metricsData, setMetricsData] = useState<MetricsData>({
    monthlyRevenue: 0,
    acquisitionCost: 0,
    churnRate: 0,
    avgCustomerValue: 0,
    cohortSize: 1000,
    retentionRates: [100, 85, 75, 68, 62, 58]
  });

  const [results, setResults] = useState<any>(null);

  const calculateMetrics = () => {
    const { monthlyRevenue, acquisitionCost, churnRate, avgCustomerValue, cohortSize, retentionRates } = metricsData;
    
    // Calculs LTV
    const monthlyChurn = churnRate / 100;
    const customerLifetime = monthlyChurn > 0 ? 1 / monthlyChurn : 24; // en mois
    const ltv = avgCustomerValue * customerLifetime;
    
    // Calculs ratios
    const ltvCacRatio = acquisitionCost > 0 ? ltv / acquisitionCost : 0;
    const paybackPeriod = monthlyRevenue > 0 ? acquisitionCost / (avgCustomerValue * 12 / customerLifetime) : 0;
    
    // Analyse de cohortes
    const cohortAnalysis = retentionRates.map((rate, month) => ({
      month: month,
      retained: Math.round(cohortSize * rate / 100),
      churnedThisMonth: month === 0 ? 0 : Math.round(cohortSize * (retentionRates[month - 1] - rate) / 100),
      revenue: Math.round(cohortSize * rate / 100 * avgCustomerValue)
    }));
    
    const totalCohortRevenue = cohortAnalysis.reduce((sum, month) => sum + month.revenue, 0);
    const cohortLTV = totalCohortRevenue / cohortSize;
    
    // Métriques de croissance
    const growthRate = monthlyRevenue > 0 ? ((monthlyRevenue * 1.15 - monthlyRevenue) / monthlyRevenue * 100) : 0;
    
    setResults({
      ltv: ltv.toFixed(0),
      ltvCacRatio: ltvCacRatio.toFixed(1),
      paybackPeriod: paybackPeriod.toFixed(1),
      customerLifetime: customerLifetime.toFixed(1),
      cohortLTV: cohortLTV.toFixed(0),
      growthRate: growthRate.toFixed(1),
      cohortAnalysis,
      healthScore: calculateHealthScore(ltvCacRatio, paybackPeriod, monthlyChurn)
    });
  };

  const calculateHealthScore = (ltvcac: number, payback: number, churn: number) => {
    let score = 0;
    
    // LTV/CAC score (40 points max)
    if (ltvcac >= 3) score += 40;
    else if (ltvcac >= 2) score += 25;
    else if (ltvcac >= 1) score += 10;
    
    // Payback score (30 points max)
    if (payback <= 12) score += 30;
    else if (payback <= 18) score += 20;
    else if (payback <= 24) score += 10;
    
    // Churn score (30 points max)
    if (churn <= 0.05) score += 30;
    else if (churn <= 0.08) score += 20;
    else if (churn <= 0.12) score += 10;
    
    return Math.round(score);
  };

  const updateMetrics = (field: keyof MetricsData, value: number) => {
    setMetricsData(prev => ({ ...prev, [field]: value }));
  };

  const updateRetentionRate = (month: number, rate: number) => {
    const newRates = [...metricsData.retentionRates];
    newRates[month] = rate;
    setMetricsData(prev => ({ ...prev, retentionRates: newRates }));
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
        <div className="flex items-center space-x-3 mb-4">
          <Calculator className="w-8 h-8 text-green-600" />
          <h3 className="text-2xl font-bold text-green-800">Growth Metrics Calculator</h3>
        </div>
        <p className="text-green-700">
          Calculez et analysez vos métriques de croissance : CAC, LTV, Payback et Cohort Analysis
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-slate-800">Données de base</h4>
          
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">MRR (€)</label>
              <input
                type="number"
                value={metricsData.monthlyRevenue}
                onChange={(e) => updateMetrics('monthlyRevenue', parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                placeholder="50000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">CAC (€)</label>
              <input
                type="number"
                value={metricsData.acquisitionCost}
                onChange={(e) =>

 updateMetrics('acquisitionCost', parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                placeholder="200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Churn mensuel (%)</label>
              <input
                type="number"
                step="0.1"
                value={metricsData.churnRate}
                onChange={(e) => updateMetrics('churnRate', parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                placeholder="5"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">ARPU mensuel (€)</label>
              <input
                type="number"
                value={metricsData.avgCustomerValue}
                onChange={(e) => updateMetrics('avgCustomerValue', parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                placeholder="100"
              />
            </div>
          </div>

          <h5 className="font-semibold text-slate-800 mt-4">Analyse de cohorte</h5>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Taille de cohorte</label>
            <input
              type="number"
              value={metricsData.cohortSize}
              onChange={(e) => updateMetrics('cohortSize', parseInt(e.target.value) || 1000)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
              placeholder="1000"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">Rétention par mois (%)</label>
            {metricsData.retentionRates.map((rate, index) => (
              <div key={index} className="flex items-center space-x-2">
                <span className="text-xs text-slate-600 w-12">M{index}:</span>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={rate}
                  onChange={(e) => updateRetentionRate(index, parseFloat(e.target.value) || 0)}
                  className="flex-1 px-2 py-1 border border-slate-200 rounded text-sm focus:ring-1 focus:ring-green-500"
                />
                <span className="text-xs text-slate-600">%</span>
              </div>
            ))}
          </div>

          <button
            onClick={calculateMetrics}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold py-2 px-4 rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200 text-sm"
          >
            Calculer les métriques
          </button>
        </div>

        {results && (
          <>
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-slate-800">Métriques clés</h4>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white p-3 rounded-lg border border-slate-200">
                  <div className="flex items-center space-x-2 mb-1">
                    <DollarSign className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-slate-600">LTV</span>
                  </div>
                  <div className="text-xl font-bold text-slate-800">{results.ltv}€</div>
                </div>

                <div className="bg-white p-3 rounded-lg border border-slate-200">
                  <div className="flex items-center space-x-2 mb-1">
                    <TrendingUp className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-slate-600">LTV/CAC</span>
                  </div>
                  <div className="text-xl font-bold text-slate-800">{results.ltvCacRatio}</div>
                </div>

                <div className="bg-white p-3 rounded-lg border border-slate-200">
                  <div className="flex items-center space-x-2 mb-1">
                    <Users className="w-4 h-4 text-purple-600" />
                    <span className="text-sm font-medium text-slate-600">Payback</span>
                  </div>
                  <div className="text-xl font-bold text-slate-800">{results.paybackPeriod}m</div>
                </div>

                <div className="bg-white p-3 rounded-lg border border-slate-200">
                  <div className="flex items-center space-x-2 mb-1">
                    <BarChart3 className="w-4 h-4 text-orange-600" />
                    <span className="text-sm font-medium text-slate-600">Health Score</span>
                  </div>
                  <div className={`text-xl font-bold ${
                    results.healthScore >= 80 ? 'text-green-600' :
                    results.healthScore >= 60 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {results.healthScore}/100
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-lg">
                <h5 className="font-semibold text-slate-800 mb-2 text-sm">Benchmarks</h5>
                <div className="space-y-1 text-xs text-slate-600">
                  <div>• LTV/CAC optimal : 3:1 minimum</div>
                  <div>• Payback cible : {"<"} 12 mois</div>
                  <div>• Churn santé : {"<"} 5% mensuel</div>
                  <div>• Lifetime : {results.customerLifetime} mois</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-slate-800">Analyse de cohorte</h4>
              
              <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-3 py-2 text-left text-xs font-medium text-slate-600">Mois</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-slate-600">Retenus</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-slate-600">Churn</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-slate-600">Revenue</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {results.cohortAnalysis.map((month: any, index: number) => (
                        <tr key={index}>
                          <td className="px-3 py-2 font-medium text-slate-800">M{month.month}</td>
                          <td className="px-3 py-2 text-slate-600">{month.retained}</td>
                          <td className="px-3 py-2 text-slate-600">{month.churnedThisMonth}</td>
                          <td className="px-3 py-2 text-slate-600">{month.revenue.toLocaleString()}€</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                <h5 className="font-semibold text-green-800 mb-1 text-sm">LTV de cohorte</h5>
                <div className="text-2xl font-bold text-green-800">{results.cohortLTV}€</div>
                <p className="text-xs text-green-600 mt-1">
                  Revenue moyen par client sur 6 mois
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
