
import React, { useState } from 'react';
import { Globe, Target, TrendingUp, Eye, AlertCircle, Star } from 'lucide-react';

interface SERPFeature {
  keyword: string;
  feature_type: string;
  current_holder: string;
  opportunity_score: number;
  search_volume: number;
  trend: string;
  competition_level: string;
}

export const SERPFeatureTracker: React.FC = () => {
  const [trackingData, setTrackingData] = useState({
    keywords: '',
    domain: '',
    competitors: ['', ''],
    location: 'France'
  });

  const [features, setFeatures] = useState<SERPFeature[]>([]);
  const [isTracking, setIsTracking] = useState(false);

  const trackFeatures = async () => {
    if (!trackingData.keywords || !trackingData.domain) return;
    
    setIsTracking(true);
    
    // Simulation du tracking SERP
    setTimeout(() => {
      const keywords = trackingData.keywords.split('\n').filter(k => k.trim());
      const mockFeatures: SERPFeature[] = keywords.flatMap(keyword => [
        {
          keyword: keyword.trim(),
          feature_type: 'Featured Snippet',
          current_holder: 'wikipedia.org',
          opportunity_score: 75,
          search_volume: Math.floor(Math.random() * 5000) + 500,
          trend: 'stable',
          competition_level: 'medium'
        },
        {
          keyword: `${keyword.trim()} guide`,
          feature_type: 'People Also Ask',
          current_holder: 'hubspot.com',
          opportunity_score: 60,
          search_volume: Math.floor(Math.random() * 2000) + 200,
          trend: 'growing',
          competition_level: 'low'
        },
        {
          keyword: `meilleur ${keyword.trim()}`,
          feature_type: 'Top Stories',
          current_holder: 'lemonde.fr',
          opportunity_score: 45,
          search_volume: Math.floor(Math.random() * 1500) + 300,
          trend: 'declining',
          competition_level: 'high'
        }
      ]);
      
      setFeatures(mockFeatures.sort((a, b) => b.opportunity_score - a.opportunity_score));
      setIsTracking(false);
    }, 2500);
  };

  const getFeatureIcon = (featureType: string) => {
    switch (featureType) {
      case 'Featured Snippet': return '📝';
      case 'People Also Ask': return '❓';
      case 'Top Stories': return '📰';
      case 'Local Pack': return '📍';
      case 'Knowledge Panel': return '📊';
      case 'Image Pack': return '🖼️';
      default: return '🔍';
    }
  };

  const getOpportunityColor = (score: number) => {
    if (score >= 70) return 'text-green-600 bg-green-100';
    if (score >= 50) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getCompetitionColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-red-600 bg-red-100';
      default: return 'text-slate-600 bg-slate-100';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl border border-indigo-200">
        <div className="flex items-center space-x-3 mb-4">
          <Globe className="w-8 h-8 text-indigo-600" />
          <h3 className="text-2xl font-bold text-indigo-800">SERP Feature Tracker</h3>
        </div>
        <p className="text-indigo-700">
          Surveillez les opportunités de features SERP et optimisez votre visibilité
        </p>
        <div className="mt-2 bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs inline-block">
          Premium Feature
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-slate-800">Configuration du tracking</h4>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Votre domaine</label>
            <input
              type="url"
              value={trackingData.domain}
              onChange={(e) => setTrackingData({...trackingData, domain: e.target.value})}
              className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="https://votre-site.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Mots-clés à tracker</label>
            <textarea
              value={trackingData.keywords}
              onChange={(e) => setTrackingData({...trackingData, keywords: e.target.value})}
              className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              rows={5}
              placeholder="marketing digital&#10;seo gratuit&#10;outils marketing&#10;(un mot-clé par ligne)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Localisation</label>
            <select
              value={trackingData.location}
              onChange={(e) => setTrackingData({...trackingData, location: e.target.value})}
              className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="France">France</option>
              <option value="Canada">Canada</option>
              <option value="Belgique">Belgique</option>
              <option value="Suisse">Suisse</option>
            </select>
          </div>

          <button
            onClick={trackFeatures}
            disabled={!trackingData.keywords || !trackingData.domain || isTracking}
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 disabled:opacity-50"
          >
            {isTracking ? 'Analyse SERP...' : 'Démarrer le tracking'}
          </button>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <h4 className="text-lg font-semibold text-slate-800">Opportunités SERP Features</h4>
          
          {features.length > 0 ? (
            <>
              <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Mot-clé</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Feature</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Détenteur</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Volume</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Opportunité</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Compétition</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {features.map((feature, index) => (
                        <tr key={index} className="hover:bg-slate-50">
                          <td className="px-4 py-3 font-medium text-slate-800">{feature.keyword}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center space-x-2">
                              <span>{getFeatureIcon(feature.feature_type)}</span>
                              <span className="text-sm text-slate-600">{feature.feature_type}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-slate-600 text-sm">{feature.current_holder}</td>
                          <td className="px-4 py-3 text-slate-600">{feature.search_volume.toLocaleString()}</td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getOpportunityColor(feature.opportunity_score)}`}>
                              {feature.opportunity_score}/100
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCompetitionColor(feature.competition_level)}`}>
                              {feature.competition_level}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <Star className="w-5 h-5 text-blue-600" />
                    <span className="font-semibold text-blue-800">Featured Snippets</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-800">
                    {features.filter(f => f.feature_type === 'Featured Snippet').length}
                  </div>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <Eye className="w-5 h-5 text-purple-600" />
                    <span className="font-semibold text-purple-800">People Also Ask</span>
                  </div>
                  <div className="text-2xl font-bold text-purple-800">
                    {features.filter(f => f.feature_type === 'People Also Ask').length}
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <Target className="w-5 h-5 text-green-600" />
                    <span className="font-semibold text-green-800">Haute opportunité</span>
                  </div>
                  <div className="text-2xl font-bold text-green-800">
                    {features.filter(f => f.opportunity_score >= 70).length}
                  </div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-yellow-600" />
                    <span className="font-semibold text-yellow-800">Tendance positive</span>
                  </div>
                  <div className="text-2xl font-bold text-yellow-800">
                    {features.filter(f => f.trend === 'growing').length}
                  </div>
                </div>
              </div>

              <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
                <h5 className="font-semibold text-indigo-800 mb-3 flex items-center space-x-2">
                  <AlertCircle className="w-5 h-5" />
                  <span>Recommandations stratégiques</span>
                </h5>
                <div className="space-y-2 text-sm text-indigo-700">
                  <div>• Priorisez les Featured Snippets avec un score d'opportunité {">"} 70</div>
                  <div>• Créez du contenu FAQ pour cibler les "People Also Ask"</div>
                  <div>• Optimisez vos titres et structures pour les features SERP</div>
                  <div>• Surveillez les concurrents qui perdent des positions</div>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-12 text-slate-500">
              <Globe className="w-12 h-12 mx-auto mb-4 text-slate-300" />
              <p>Configurez le tracking pour analyser les features SERP</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
