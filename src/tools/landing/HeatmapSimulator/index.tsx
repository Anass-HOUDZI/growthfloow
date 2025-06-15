
import React, { useState } from 'react';
import { MousePointer, Eye, Target, Zap } from 'lucide-react';

export const HeatmapSimulator: React.FC = () => {
  const [url, setUrl] = useState('');
  const [heatmapData, setHeatmapData] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedView, setSelectedView] = useState('clicks');

  const generateHeatmap = () => {
    if (!url) return;
    
    setIsGenerating(true);
    
    // Simulate heatmap generation
    setTimeout(() => {
      setHeatmapData({
        clicks: [
          { x: 45, y: 20, intensity: 90, element: 'CTA Principal' },
          { x: 25, y: 15, intensity: 75, element: 'Logo' },
          { x: 60, y: 35, intensity: 85, element: 'Témoignage' },
          { x: 50, y: 60, intensity: 65, element: 'Formulaire' },
          { x: 70, y: 80, intensity: 40, element: 'Footer Links' }
        ],
        attention: [
          { x: 50, y: 25, intensity: 95, duration: 3.2, element: 'Headline Principal' },
          { x: 45, y: 35, intensity: 80, duration: 2.1, element: 'Sous-titre' },
          { x: 30, y: 50, intensity: 70, duration: 1.8, element: 'Image Produit' },
          { x: 65, y: 45, intensity: 60, duration: 1.5, element: 'Liste Bénéfices' }
        ],
        scroll: {
          dropOff: [
            { position: 20, percentage: 100 },
            { position: 40, percentage: 85 },
            { position: 60, percentage: 65 },
            { position: 80, percentage: 45 },
            { position: 100, percentage: 25 }
          ]
        }
      });
      setIsGenerating(false);
    }, 2000);
  };

  const getIntensityColor = (intensity: number) => {
    if (intensity >= 80) return 'bg-red-500';
    if (intensity >= 60) return 'bg-orange-500';
    if (intensity >= 40) return 'bg-yellow-500';
    return 'bg-blue-500';
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center mx-auto mb-4">
          <MousePointer className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Heatmap Simulator</h2>
        <p className="text-slate-600">Prédiction eye-tracking basée sur les patterns UX</p>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <div className="flex space-x-4 mb-6">
          <input
            type="url"
            placeholder="https://votre-landing-page.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
          <button
            onClick={generateHeatmap}
            disabled={!url || isGenerating}
            className="px-6 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg hover:from-orange-600 hover:to-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {isGenerating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Génération...</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4" />
                <span>Générer Heatmap</span>
              </>
            )}
          </button>
        </div>

        {heatmapData && (
          <div className="space-y-6">
            {/* Navigation des vues */}
            <div className="flex space-x-2 border-b border-slate-200">
              {['clicks', 'attention', 'scroll'].map((view) => (
                <button
                  key={view}
                  onClick={() => setSelectedView(view)}
                  className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
                    selectedView === view
                      ? 'bg-orange-500 text-white'
                      : 'text-slate-600 hover:text-slate-800'
                  }`}
                >
                  {view === 'clicks' && 'Clics'}
                  {view === 'attention' && 'Attention'}
                  {view === 'scroll' && 'Scroll'}
                </button>
              ))}
            </div>

            {/* Vue Clics */}
            {selectedView === 'clicks' && (
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
                  <Target className="w-5 h-5 mr-2" />
                  Zones de Clics Prédites
                </h3>
                <div className="relative bg-slate-100 rounded-lg p-8 min-h-96">
                  {heatmapData.clicks.map((point: any, index: number) => (
                    <div
                      key={index}
                      className={`absolute w-8 h-8 rounded-full ${getIntensityColor(point.intensity)} opacity-70 flex items-center justify-center text-white text-xs font-bold`}
                      style={{ left: `${point.x}%`, top: `${point.y}%` }}
                      title={`${point.element}: ${point.intensity}% intensité`}
                    >
                      {point.intensity}
                    </div>
                  ))}
                </div>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {heatmapData.clicks.map((point: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <span className="font-medium text-slate-800">{point.element}</span>
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${getIntensityColor(point.intensity)}`}></div>
                        <span className="text-sm text-slate-600">{point.intensity}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Vue Attention */}
            {selectedView === 'attention' && (
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
                  <Eye className="w-5 h-5 mr-2" />
                  Zones d'Attention Eye-Tracking
                </h3>
                <div className="space-y-4">
                  {heatmapData.attention.map((zone: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-slate-800">{zone.element}</h4>
                        <p className="text-sm text-slate-600">Durée moyenne: {zone.duration}s</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-20 bg-slate-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${getIntensityColor(zone.intensity)}`}
                            style={{ width: `${zone.intensity}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-slate-800">{zone.intensity}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Vue Scroll */}
            {selectedView === 'scroll' && (
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-4">
                  Comportement de Scroll
                </h3>
                <div className="bg-slate-50 rounded-lg p-6">
                  <div className="space-y-3">
                    {heatmapData.scroll.dropOff.map((point: any, index: number) => (
                      <div key={index} className="flex items-center space-x-4">
                        <div className="w-16 text-sm text-slate-600">{point.position}%</div>
                        <div className="flex-1 bg-slate-200 rounded-full h-4 relative">
                          <div 
                            className="bg-gradient-to-r from-green-500 to-red-500 h-4 rounded-full"
                            style={{ width: `${point.percentage}%` }}
                          ></div>
                        </div>
                        <div className="w-12 text-sm font-medium text-slate-800">{point.percentage}%</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
