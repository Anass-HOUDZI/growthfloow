
import React, { useState } from 'react';
import { Target, DollarSign, TrendingUp, BarChart3, PieChart } from 'lucide-react';

interface Channel {
  id: string;
  name: string;
  budget: number;
  impact: number;
  confidence: number;
  ease: number;
  currentROAS: number;
  currentCAC: number;
}

export const ChannelPerformanceOptimizer: React.FC = () => {
  const [channels, setChannels] = useState<Channel[]>([
    { id: '1', name: 'Google Ads', budget: 10000, impact: 8, confidence: 9, ease: 7, currentROAS: 3.2, currentCAC: 45 },
    { id: '2', name: 'Facebook Ads', budget: 8000, impact: 7, confidence: 8, ease: 8, currentROAS: 2.8, currentCAC: 52 },
    { id: '3', name: 'LinkedIn Ads', budget: 5000, impact: 6, confidence: 7, ease: 6, currentROAS: 2.1, currentCAC: 85 },
    { id: '4', name: 'SEO Organique', budget: 3000, impact: 9, confidence: 6, ease: 4, currentROAS: 8.5, currentCAC: 12 },
    { id: '5', name: 'Email Marketing', budget: 2000, impact: 8, confidence: 9, ease: 9, currentROAS: 12.3, currentCAC: 8 }
  ]);

  const [newChannel, setNewChannel] = useState<Partial<Channel>>({
    name: '',
    budget: 0,
    impact: 5,
    confidence: 5,
    ease: 5,
    currentROAS: 0,
    currentCAC: 0
  });

  const calculateICEScore = (channel: Channel) => {
    return ((channel.impact + channel.confidence + channel.ease) / 3).toFixed(1);
  };

  const calculateEfficiencyScore = (channel: Channel) => {
    const roasWeight = 0.6;
    const cacWeight = 0.4;
    const normalizedROAS = Math.min(channel.currentROAS / 10, 1) * 10;
    const normalizedCAC = Math.max(0, (100 - channel.currentCAC) / 10);
    return (normalizedROAS * roasWeight + normalizedCAC * cacWeight).toFixed(1);
  };

  const addChannel = () => {
    if (newChannel.name && newChannel.budget) {
      const channel: Channel = {
        id: Date.now().toString(),
        name: newChannel.name,
        budget: newChannel.budget,
        impact: newChannel.impact || 5,
        confidence: newChannel.confidence || 5,
        ease: newChannel.ease || 5,
        currentROAS: newChannel.currentROAS || 0,
        currentCAC: newChannel.currentCAC || 0
      };
      setChannels([...channels, channel]);
      setNewChannel({ name: '', budget: 0, impact: 5, confidence: 5, ease: 5, currentROAS: 0, currentCAC: 0 });
    }
  };

  const updateChannel = (id: string, field: keyof Channel, value: number) => {
    setChannels(channels.map(channel => 
      channel.id === id ? { ...channel, [field]: value } : channel
    ));
  };

  const totalBudget = channels.reduce((sum, channel) => sum + channel.budget, 0);
  const avgROAS = channels.reduce((sum, channel) => sum + channel.currentROAS, 0) / channels.length;

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-200">
        <div className="flex items-center space-x-3 mb-4">
          <Target className="w-8 h-8 text-blue-600" />
          <h3 className="text-2xl font-bold text-blue-800">Channel Performance Optimizer</h3>
        </div>
        <p className="text-blue-700">
          Optimisez l'allocation de vos budgets marketing avec la matrice ICE et l'analyse de performance
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <h4 className="text-lg font-semibold text-slate-800">Matrice de Performance ICE</h4>
          
          <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Canal</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Budget</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Impact</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Confiance</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Facilité</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Score ICE</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">ROAS</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">CAC</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {channels.map((channel) => (
                    <tr key={channel.id}>
                      <td className="px-4 py-3 font-medium text-slate-800">{channel.name}</td>
                      <td className="px-4 py-3 text-slate-600">{channel.budget}€</td>
                      <td className="px-4 py-3">
                        <input
                          type="range"
                          min="1"
                          max="10"
                          value={channel.impact}
                          onChange={(e) => updateChannel(channel.id, 'impact', parseInt(e.target.value))}
                          className="w-16"
                        />
                        <span className="ml-2 text-sm">{channel.impact}</span>
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="range"
                          min="1"
                          max="10"
                          value={channel.confidence}
                          onChange={(e) => updateChannel(channel.id, 'confidence', parseInt(e.target.value))}
                          className="w-16"
                        />
                        <span className="ml-2 text-sm">{channel.confidence}</span>
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="range"
                          min="1"
                          max="10"
                          value={channel.ease}
                          onChange={(e) => updateChannel(channel.id, 'ease', parseInt(e.target.value))}
                          className="w-16"
                        />
                        <span className="ml-2 text-sm">{channel.ease}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          parseFloat(calculateICEScore(channel)) >= 7 ? 'bg-green-100 text-green-800' :
                          parseFloat(calculateICEScore(channel)) >= 5 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {calculateICEScore(channel)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-600">{channel.currentROAS}x</td>
                      <td className="px-4 py-3 text-slate-600">{channel.currentCAC}€</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-slate-800">Ajouter un canal</h4>
          
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Nom du canal"
              value={newChannel.name || ''}
              onChange={(e) => setNewChannel({ ...newChannel, name: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
            
            <input
              type="number"
              placeholder="Budget (€)"
              value={newChannel.budget || ''}
              onChange={(e) => setNewChannel({ ...newChannel, budget: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="text-xs text-slate-600">Impact</label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={newChannel.impact || 5}
                  onChange={(e) => setNewChannel({ ...newChannel, impact: parseInt(e.target.value) })}
                  className="w-full"
                />
                <span className="text-xs">{newChannel.impact}</span>
              </div>
              <div>
                <label className="text-xs text-slate-600">Confiance</label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={newChannel.confidence || 5}
                  onChange={(e) => setNewChannel({ ...newChannel, confidence: parseInt(e.target.value) })}
                  className="w-full"
                />
                <span className="text-xs">{newChannel.confidence}</span>
              </div>
              <div>
                <label className="text-xs text-slate-600">Facilité</label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={newChannel.ease || 5}
                  onChange={(e) => setNewChannel({ ...newChannel, ease: parseInt(e.target.value) })}
                  className="w-full"
                />
                <span className="text-xs">{newChannel.ease}</span>
              </div>
            </div>

            <button
              onClick={addChannel}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 text-white font-semibold py-2 px-4 rounded-lg hover:from-blue-600 hover:to-cyan-700 transition-all duration-200 text-sm"
            >
              Ajouter le canal
            </button>
          </div>

          <div className="space-y-3">
            <h5 className="font-semibold text-slate-800">Métriques globales</h5>
            
            <div className="bg-white p-3 rounded-lg border border-slate-200">
              <div className="flex items-center space-x-2 mb-1">
                <DollarSign className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-slate-600">Budget total</span>
              </div>
              <div className="text-xl font-bold text-slate-800">{totalBudget.toLocaleString()}€</div>
            </div>

            <div className="bg-white p-3 rounded-lg border border-slate-200">
              <div className="flex items-center space-x-2 mb-1">
                <TrendingUp className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-slate-600">ROAS moyen</span>
              </div>
              <div className="text-xl font-bold text-slate-800">{avgROAS.toFixed(1)}x</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
