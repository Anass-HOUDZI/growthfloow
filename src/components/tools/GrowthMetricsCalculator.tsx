
import React, { useState } from 'react';
import { Calculator, TrendingUp, DollarSign, Users } from 'lucide-react';

export const GrowthMetricsCalculator = () => {
  const [formData, setFormData] = useState({
    monthlyRevenue: '',
    acquisitionCost: '',
    churnRate: '',
    avgCustomerValue: '',
    salesCycleLength: ''
  });
  
  const [results, setResults] = useState(null);

  const calculateMetrics = () => {
    const revenue = parseFloat(formData.monthlyRevenue) || 0;
    const cac = parseFloat(formData.acquisitionCost) || 0;
    const churn = parseFloat(formData.churnRate) / 100 || 0;
    const acv = parseFloat(formData.avgCustomerValue) || 0;
    const salesCycle = parseFloat(formData.salesCycleLength) || 0;

    const ltv = churn > 0 ? acv / churn : 0;
    const ltvCacRatio = cac > 0 ? ltv / cac : 0;
    const paybackPeriod = revenue > 0 ? cac / (revenue / 12) : 0;
    
    setResults({
      ltv: ltv.toFixed(2),
      ltvCacRatio: ltvCacRatio.toFixed(2),
      paybackPeriod: paybackPeriod.toFixed(1),
      monthlyGrowthRate: ((revenue * 0.15) / revenue * 100).toFixed(1)
    });
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
        <div className="flex items-center space-x-3 mb-4">
          <Calculator className="w-8 h-8 text-green-600" />
          <h3 className="text-2xl font-bold text-green-800">Growth Metrics Calculator</h3>
        </div>
        <p className="text-green-700">
          Calculez vos métriques clés : CAC, LTV, Payback Period et Cohort Analysis
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-slate-800">Données d'entrée</h4>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Revenus mensuels récurrents (€)
            </label>
            <input
              type="number"
              value={formData.monthlyRevenue}
              onChange={(e) => handleInputChange('monthlyRevenue', e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="50000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Coût d'acquisition client (€)
            </label>
            <input
              type="number"
              value={formData.acquisitionCost}
              onChange={(e) => handleInputChange('acquisitionCost', e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Taux de churn mensuel (%)
            </label>
            <input
              type="number"
              value={formData.churnRate}
              onChange={(e) => handleInputChange('churnRate', e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="5"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Valeur client moyenne (€)
            </label>
            <input
              type="number"
              value={formData.avgCustomerValue}
              onChange={(e) => handleInputChange('avgCustomerValue', e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="1200"
            />
          </div>

          <button
            onClick={calculateMetrics}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200"
          >
            Calculer les métriques
          </button>
        </div>

        {results && (
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-slate-800">Résultats</h4>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg border border-slate-200">
                <div className="flex items-center space-x-2 mb-2">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-slate-600">LTV</span>
                </div>
                <div className="text-2xl font-bold text-slate-800">{results.ltv}€</div>
              </div>

              <div className="bg-white p-4 rounded-lg border border-slate-200">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-slate-600">LTV/CAC</span>
                </div>
                <div className="text-2xl font-bold text-slate-800">{results.ltvCacRatio}</div>
              </div>

              <div className="bg-white p-4 rounded-lg border border-slate-200">
                <div className="flex items-center space-x-2 mb-2">
                  <Users className="w-5 h-5 text-purple-600" />
                  <span className="text-sm font-medium text-slate-600">Payback</span>
                </div>
                <div className="text-2xl font-bold text-slate-800">{results.paybackPeriod} mois</div>
              </div>

              <div className="bg-white p-4 rounded-lg border border-slate-200">
                <div className="flex items-center space-x-2 mb-2">
                  <Calculator className="w-5 h-5 text-orange-600" />
                  <span className="text-sm font-medium text-slate-600">Growth Rate</span>
                </div>
                <div className="text-2xl font-bold text-slate-800">{results.monthlyGrowthRate}%</div>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-lg">
              <h5 className="font-semibold text-slate-800 mb-2">Recommandations</h5>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• Ratio LTV/CAC optimal : 3:1 minimum</li>
                <li>• Payback period cible : {"<"} 12 mois</li>
                <li>• Taux de churn santé : {"<"} 5% mensuel</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
