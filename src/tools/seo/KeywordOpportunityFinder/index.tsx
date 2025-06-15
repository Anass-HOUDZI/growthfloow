
import React, { useState } from 'react';
import { Search, TrendingUp, Target, Eye, BarChart3 } from 'lucide-react';

interface KeywordData {
  mainKeyword: string;
  niche: string;
  location: string;
}

interface KeywordOpportunity {
  keyword: string;
  searchVolume: number;
  difficulty: number;
  cpc: number;
  trend: string;
  intent: string;
}

export const KeywordOpportunityFinder: React.FC = () => {
  const [keywordData, setKeywordData] = useState<KeywordData>({
    mainKeyword: '',
    niche: '',
    location: 'France'
  });

  const [opportunities, setOpportunities] = useState<KeywordOpportunity[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const generateOpportunities = async () => {
    if (!keywordData.mainKeyword) return;
    
    setIsAnalyzing(true);
    
    // Simulation d'analyse de mots-clés
    setTimeout(() => {
      const mockOpportunities: KeywordOpportunity[] = [
        {
          keyword: `${keywordData.mainKeyword} gratuit`,
          searchVolume: 2400,
          difficulty: 25,
          cpc: 0.45,
          trend: 'stable',
          intent: 'informational'
        },
        {
          keyword: `meilleur ${keywordData.mainKeyword}`,
          searchVolume: 1800,
          difficulty: 45,
          cpc: 1.20,
          trend: 'growing',
          intent: 'commercial'
        },
        {
          keyword: `${keywordData.mainKeyword} pas cher`,
          searchVolume: 1200,
          difficulty: 35,
          cpc: 0.85,
          trend: 'stable',
          intent: 'commercial'
        },
        {
          keyword: `comment utiliser ${keywordData.mainKeyword}`,
          searchVolume: 950,
          difficulty: 20,
          cpc: 0.35,
          trend: 'growing',
          intent: 'informational'
        },
        {
          keyword: `${keywordData.mainKeyword} vs alternative`,
          searchVolume: 800,
          difficulty: 30,
          cpc: 0.95,
          trend: 'stable',
          intent: 'commercial'
        },
        {
          keyword: `guide ${keywordData.mainKeyword} débutant`,
          searchVolume: 720,
          difficulty: 15,
          cpc: 0.25,
          trend: 'growing',
          intent: 'informational'
        }
      ];
      
      setOpportunities(mockOpportunities);
      setIsAnalyzing(false);
    }, 2000);
  };

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty <= 30) return 'text-green-600 bg-green-100';
    if (difficulty <= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getTrendIcon = (trend: string) => {
    return trend === 'growing' ? '📈' : trend === 'declining' ? '📉' : '➡️';
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
        <div className="flex items-center space-x-3 mb-4">
          <Search className="w-8 h-8 text-green-600" />
          <h3 className="text-2xl font-bold text-green-800">Keyword Opportunity Finder</h3>
        </div>
        <p className="text-green-700">
          Découvrez des opportunités de mots-clés longue traîne avec analyse de difficulté
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-slate-800">Paramètres de recherche</h4>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Mot-clé principal</label>
            <input
              type="text"
              value={keywordData.mainKeyword}
              onChange={(e) => setKeywordData({...keywordData, mainKeyword: e.target.value})}
              className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Ex: logiciel CRM"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Secteur/Niche</label>
            <select
              value={keywordData.niche}
              onChange={(e) => setKeywordData({...keywordData, niche: e.target.value})}
              className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">Sélectionnez un secteur</option>
              <option value="saas">SaaS & Logiciels</option>
              <option value="ecommerce">E-commerce</option>
              <option value="services">Services</option>
              <option value="formation">Formation & Education</option>
              <option value="sante">Santé & Bien-être</option>
              <option value="finance">Finance</option>
              <option value="immobilier">Immobilier</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Localisation</label>
            <select
              value={keywordData.location}
              onChange={(e) => setKeywordData({...keywordData, location: e.target.value})}
              className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="France">France</option>
              <option value="Canada">Canada</option>
              <option value="Belgique">Belgique</option>
              <option value="Suisse">Suisse</option>
            </select>
          </div>

          <button
            onClick={generateOpportunities}
            disabled={!keywordData.mainKeyword || isAnalyzing}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200 disabled:opacity-50"
          >
            {isAnalyzing ? 'Analyse en cours...' : 'Trouver des opportunités'}
          </button>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <h4 className="text-lg font-semibold text-slate-800">Opportunités détectées</h4>
          
          {opportunities.length > 0 ? (
            <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Mot-clé</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Volume</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Difficulté</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">CPC</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Tendance</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Intent</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {opportunities.map((opp, index) => (
                      <tr key={index} className="hover:bg-slate-50">
                        <td className="px-4 py-3 font-medium text-slate-800">{opp.keyword}</td>
                        <td className="px-4 py-3 text-slate-600">
                          <div className="flex items-center space-x-1">
                            <BarChart3 className="w-4 h-4 text-blue-600" />
                            <span>{opp.searchVolume.toLocaleString()}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(opp.difficulty)}`}>
                            {opp.difficulty}/100
                          </span>
                        </td>
                        <td className="px-4 py-3 text-slate-600">{opp.cpc}€</td>
                        <td className="px-4 py-3">
                          <span className="flex items-center space-x-1">
                            <span>{getTrendIcon(opp.trend)}</span>
                            <span className="text-sm text-slate-600 capitalize">{opp.trend}</span>
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            opp.intent === 'commercial' ? 'bg-purple-100 text-purple-800' :
                            opp.intent === 'transactional' ? 'bg-green-100 text-green-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {opp.intent}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-slate-500">
              <Search className="w-12 h-12 mx-auto mb-4 text-slate-300" />
              <p>Entrez un mot-clé principal pour découvrir des opportunités</p>
            </div>
          )}

          {opportunities.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <div className="flex items-center space-x-2 mb-2">
                  <Target className="w-5 h-5 text-green-600" />
                  <span className="font-semibold text-green-800">Facilité</span>
                </div>
                <div className="text-sm text-green-700">
                  {opportunities.filter(o => o.difficulty <= 30).length} mots-clés faciles à cibler
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold text-blue-800">Volume total</span>
                </div>
                <div className="text-sm text-blue-700">
                  {opportunities.reduce((sum, o) => sum + o.searchVolume, 0).toLocaleString()} recherches/mois
                </div>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <div className="flex items-center space-x-2 mb-2">
                  <Eye className="w-5 h-5 text-purple-600" />
                  <span className="font-semibold text-purple-800">Commercial</span>
                </div>
                <div className="text-sm text-purple-700">
                  {opportunities.filter(o => o.intent === 'commercial').length} mots-clés à fort potentiel
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
