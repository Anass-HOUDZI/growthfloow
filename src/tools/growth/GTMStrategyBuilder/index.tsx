
import React, { useState } from 'react';
import { Zap, Target, Users, Calendar, CheckCircle } from 'lucide-react';

interface GTMStrategy {
  productType: string;
  targetMarket: string;
  timeline: string;
  budget: number;
  primaryChannels: string[];
  kpis: string[];
}

export const GTMStrategyBuilder: React.FC = () => {
  const [strategy, setStrategy] = useState<GTMStrategy>({
    productType: '',
    targetMarket: '',
    timeline: '',
    budget: 0,
    primaryChannels: [],
    kpis: []
  });

  const [generatedPlan, setGeneratedPlan] = useState<any>(null);

  const productTypes = [
    'SaaS B2B', 'SaaS B2C', 'E-commerce', 'Application Mobile', 
    'Service Professionnel', 'Produit Physique', 'Marketplace'
  ];

  const targetMarkets = [
    'PME France', 'Grandes Entreprises', 'Startups', 'Particuliers',
    'Freelances', 'E-commerce', 'Secteur Public'
  ];

  const channels = [
    'Content Marketing', 'Google Ads', 'LinkedIn Ads', 'SEO',
    'Email Marketing', 'Partenariats', 'Events', 'Cold Outbound',
    'Réseaux Sociaux', 'Influenceurs', 'PR/Médias', 'Webinaires'
  ];

  const kpiOptions = [
    'CAC', 'LTV', 'MRR Growth', 'Churn Rate', 'Product Qualified Leads',
    'Sales Qualified Leads', 'Trial to Paid', 'Organic Traffic', 'Brand Awareness'
  ];

  const generateStrategy = () => {
    const templates = {
      'SaaS B2B': {
        phases: [
          { phase: 'Pré-lancement (2 mois)', tasks: ['MVP validation', 'Landing page', 'Content strategy', 'Beta users'] },
          { phase: 'Soft Launch (1 mois)', tasks: ['Product Hunt', 'Early adopters', 'Feedback collection', 'Pricing validation'] },
          { phase: 'Growth Phase (3+ mois)', tasks: ['Paid acquisition', 'Content scaling', 'Partnership program', 'Sales team'] }
        ],
        recommendedChannels: ['Content Marketing', 'LinkedIn Ads', 'Cold Outbound', 'Partenariats'],
        keyMetrics: ['MRR Growth', 'CAC', 'LTV', 'Churn Rate'],
        budget_allocation: { content: 30, paid: 40, sales: 20, tools: 10 }
      },
      'E-commerce': {
        phases: [
          { phase: 'Setup (1 mois)', tasks: ['Product catalog', 'Website optimization', 'Payment setup', 'Inventory'] },
          { phase: 'Launch (2 mois)', tasks: ['Social media campaign', 'Influencer outreach', 'Google Ads', 'SEO basics'] },
          { phase: 'Scale (3+ mois)', tasks: ['Advanced targeting', 'Retargeting', 'Email automation', 'Marketplace expansion'] }
        ],
        recommendedChannels: ['Google Ads', 'Facebook Ads', 'Influenceurs', 'Email Marketing'],
        keyMetrics: ['ROAS', 'AOV', 'Conversion Rate', 'Customer Lifetime Value'],
        budget_allocation: { paid: 50, content: 20, influencers: 20, tools: 10 }
      }
    };

    const template = templates[strategy.productType as keyof typeof templates] || templates['SaaS B2B'];
    
    setGeneratedPlan({
      ...template,
      customization: {
        targetMarket: strategy.targetMarket,
        timeline: strategy.timeline,
        budget: strategy.budget,
        selectedChannels: strategy.primaryChannels,
        selectedKPIs: strategy.kpis
      }
    });
  };

  const toggleArrayItem = (array: string[], item: string, setter: (value: string[]) => void) => {
    if (array.includes(item)) {
      setter(array.filter(i => i !== item));
    } else {
      setter([...array, item]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-xl border border-orange-200">
        <div className="flex items-center space-x-3 mb-4">
          <Zap className="w-8 h-8 text-orange-600" />
          <h3 className="text-2xl font-bold text-orange-800">GTM Strategy Builder</h3>
        </div>
        <p className="text-orange-700">
          Créez votre stratégie go-to-market personnalisée avec des templates sectoriels
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-slate-800">Configuration de votre GTM</h4>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Type de produit</label>
            <select
              value={strategy.productType}
              onChange={(e) => setStrategy({...strategy, productType: e.target.value})}
              className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="">Sélectionnez un type</option>
              {productTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Marché cible</label>
            <select
              value={strategy.targetMarket}
              onChange={(e) => setStrategy({...strategy, targetMarket: e.target.value})}
              className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="">Sélectionnez un marché</option>
              {targetMarkets.map(market => (
                <option key={market} value={market}>{market}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Timeline</label>
              <select
                value={strategy.timeline}
                onChange={(e) => setStrategy({...strategy, timeline: e.target.value})}
                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="">Durée</option>
                <option value="3 mois">3 mois</option>
                <option value="6 mois">6 mois</option>
                <option value="12 mois">12 mois</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Budget (€)</label>
              <input
                type="number"
                value={strategy.budget}
                onChange={(e) => setStrategy({...strategy, budget: parseInt(e.target.value)})}
                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="50000"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Canaux prioritaires</label>
            <div className="grid grid-cols-2 gap-2">
              {channels.map(channel => (
                <label key={channel} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={strategy.primaryChannels.includes(channel)}
                    onChange={() => toggleArrayItem(strategy.primaryChannels, channel, 
                      (newChannels) => setStrategy({...strategy, primaryChannels: newChannels}))}
                    className="rounded border-slate-300 text-orange-600 focus:ring-orange-500"
                  />
                  <span className="text-sm text-slate-700">{channel}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">KPIs de suivi</label>
            <div className="grid grid-cols-2 gap-2">
              {kpiOptions.map(kpi => (
                <label key={kpi} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={strategy.kpis.includes(kpi)}
                    onChange={() => toggleArrayItem(strategy.kpis, kpi, 
                      (newKPIs) => setStrategy({...strategy, kpis: newKPIs}))}
                    className="rounded border-slate-300 text-orange-600 focus:ring-orange-500"
                  />
                  <span className="text-sm text-slate-700">{kpi}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            onClick={generateStrategy}
            disabled={!strategy.productType || !strategy.targetMarket}
            className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-orange-600 hover:to-red-700 transition-all duration-200 disabled:opacity-50"
          >
            Générer la stratégie GTM
          </button>
        </div>

        {generatedPlan && (
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-slate-800">Votre plan GTM personnalisé</h4>
            
            <div className="space-y-4">
              {generatedPlan.phases.map((phase: any, index: number) => (
                <div key={index} className="bg-white p-4 rounded-lg border border-slate-200">
                  <h5 className="font-semibold text-slate-800 mb-2 flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-orange-600" />
                    <span>{phase.phase}</span>
                  </h5>
                  <div className="space-y-1">
                    {phase.tasks.map((task: string, taskIndex: number) => (
                      <div key={taskIndex} className="flex items-center space-x-2 text-sm text-slate-600">
                        <CheckCircle className="w-3 h-3 text-green-600" />
                        <span>{task}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-slate-50 p-4 rounded-lg">
              <h5 className="font-semibold text-slate-800 mb-3">Recommandations</h5>
              <div className="space-y-2">
                <div>
                  <span className="text-sm font-medium text-slate-700">Canaux recommandés: </span>
                  <span className="text-sm text-slate-600">{generatedPlan.recommendedChannels.join(', ')}</span>
                </div>
                <div>
                  <span className="text-sm font-medium text-slate-700">Métriques clés: </span>
                  <span className="text-sm text-slate-600">{generatedPlan.keyMetrics.join(', ')}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
