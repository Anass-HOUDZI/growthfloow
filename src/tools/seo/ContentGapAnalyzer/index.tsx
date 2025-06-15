
import React, { useState } from 'react';
import { Eye, Target, TrendingUp, Search, Users, BarChart3 } from 'lucide-react';

interface CompetitorData {
  name: string;
  url: string;
  domain_authority: number;
}

interface ContentGap {
  keyword: string;
  your_position: number | null;
  competitors: { name: string; position: number }[];
  search_volume: number;
  difficulty: number;
  opportunity_score: number;
}

export const ContentGapAnalyzer: React.FC =  () => {
  const [analysisData, setAnalysisData] = useState({
    yourDomain: '',
    competitors: ['', '', ''],
    niche: ''
  });

  const [gaps, setGaps] = useState<ContentGap[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const updateCompetitor = (index: number, value: string) => {
    const newCompetitors = [...analysisData.competitors];
    newCompetitors[index] = value;
    setAnalysisData({ ...analysisData, competitors: newCompetitors });
  };

  const analyzeGaps = async () => {
    if (!analysisData.yourDomain) return;
    
    setIsAnalyzing(true);
    
    // Simulation d'analyse de gaps
    setTimeout(() => {
      const mockGaps: ContentGap[] = [
        {
          keyword: 'guide marketing automation',
          your_position: null,
          competitors: [
            { name: 'hubspot.com', position: 3 },
            { name: 'mailchimp.com', position: 5 },
            { name: 'salesforce.com', position: 8 }
          ],
          search_volume: 3200,
          difficulty: 45,
          opportunity_score: 85
        },
        {
          keyword: 'outils lead generation',
          your_position: 15,
          competitors: [
            { name: 'hubspot.com', position: 1 },
            { name: 'pipedrive.com', position: 4 },
            { name: 'salesforce.com', position: 6 }
          ],
          search_volume: 2800,
          difficulty: 52,
          opportunity_score: 78
        },
        {
          keyword: 'crm pour pme',
          your_position: null,
          competitors: [
            { name: 'pipedrive.com', position: 2 },
            { name: 'hubspot.com', position: 4 },
            { name: 'zoho.com', position: 7 }
          ],
          search_volume: 1900,
          difficulty: 38,
          opportunity_score: 82
        },
        {
          keyword: 'email marketing b2b',
          your_position: 12,
          competitors: [
            { name: 'mailchimp.com', position: 1 },
            { name: 'sendinblue.com', position: 3 },
            { name: 'hubspot.com', position: 5 }
          ],
          search_volume: 2400,
          difficulty: 48,
          opportunity_score: 75
        },
        {
          keyword: 'strategie content marketing',
          your_position: null,
          competitors: [
            { name: 'contentmarketinginstitute.com', position: 2 },
            { name: 'hubspot.com', position: 4 },
            { name: 'semrush.com', position: 6 }
          ],
          search_volume: 1600,
          difficulty: 42,
          opportunity_score: 80
        }
      ];
      
      setGaps(mockGaps.sort((a, b) => b.opportunity_score - a.opportunity_score));
      setIsAnalyzing(false);
    }, 3000);
  };

  const getOpportunityColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
        <div className="flex items-center space-x-3 mb-4">
          <Eye className="w-8 h-8 text-purple-600" />
          <h3 className="text-2xl font-bold text-purple-800">Content Gap Analyzer</h3>
        </div>
        <p className="text-purple-700">
          Identifiez les opportunités de contenu que vos concurrents exploitent et que vous manquez
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-slate-800">Configuration de l'analyse</h4>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Votre domaine</label>
            <input
              type="url"
              value={analysisData.yourDomain}
              onChange={(e) => setAnalysisData({...analysisData, yourDomain: e.target.value})}
              className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="https://votre-site.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Secteur d'activité</label>
            <select
              value={analysisData.niche}
              onChange={(e) => setAnalysisData({...analysisData, niche: e.target.value})}
              className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">Sélectionnez un secteur</option>
              <option value="saas">SaaS & Logiciels</option>
              <option value="marketing">Marketing Digital</option>
              <option value="ecommerce">E-commerce</option>
              <option value="finance">Finance</option>
              <option value="sante">Santé</option>
              <option value="education">Education</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Concurrents principaux</label>
            {analysisData.competitors.map((competitor, index) => (
              <input
                key={index}
                type="url"
                value={competitor}
                onChange={(e) => updateCompetitor(index, e.target.value)}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent mb-2"
                placeholder={`https://concurrent-${index + 1}.com`}
              />
            ))}
          </div>

          <button
            onClick={analyzeGaps}
            disabled={!analysisData.yourDomain || isAnalyzing}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all duration-200 disabled:opacity-50"
          >
            {isAnalyzing ? 'Analyse en cours...' : 'Analyser les gaps'}
          </button>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <h4 className="text-lg font-semibold text-slate-800">Opportunités de contenu</h4>
          
          {gaps.length > 0 ? (
            <>
              <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Mot-clé</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Votre position</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Concurrents</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Volume</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Opportunité</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {gaps.map((gap, index) => (
                        <tr key={index} className="hover:bg-slate-50">
                          <td className="px-4 py-3 font-medium text-slate-800">{gap.keyword}</td>
                          <td className="px-4 py-3">
                            {gap.your_position ? (
                              <span className="text-slate-600">#{gap.your_position}</span>
                            ) : (
                              <span className="text-red-600 font-medium">Non classé</span>
                            )}
                          </td>
                          <td className="px-4 py-3">
                            <div className="space-y-1">
                              {gap.competitors.slice(0, 2).map((comp, i) => (
                                <div key={i} className="text-xs text-slate-600">
                                  {comp.name} (#{comp.position})
                                </div>
                              ))}
                            </div>
                          </td>
                          <td className="px-4 py-3 text-slate-600">
                            {gap.search_volume.toLocaleString()}/mois
                          </td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getOpportunityColor(gap.opportunity_score)}`}>
                              {gap.opportunity_score}/100
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <Target className="w-5 h-5 text-red-600" />
                    <span className="font-semibold text-red-800">Gaps critiques</span>
                  </div>
                  <div className="text-2xl font-bold text-red-800">
                    {gaps.filter(g => !g.your_position).length}
                  </div>
                  <div className="text-sm text-red-600">
                    Mots-clés non couverts
                  </div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-yellow-600" />
                    <span className="font-semibold text-yellow-800">À améliorer</span>
                  </div>
                  <div className="text-2xl font-bold text-yellow-800">
                    {gaps.filter(g => g.your_position && g.your_position > 10).length}
                  </div>
                  <div className="text-sm text-yellow-600">
                    Positions {">"} 10
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <BarChart3 className="w-5 h-5 text-green-600" />
                    <span className="font-semibold text-green-800">Potentiel total</span>
                  </div>
                  <div className="text-2xl font-bold text-green-800">
                    {gaps.reduce((sum, g) => sum + g.search_volume, 0).toLocaleString()}
                  </div>
                  <div className="text-sm text-green-600">
                    Trafic mensuel potentiel
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-12 text-slate-500">
              <Eye className="w-12 h-12 mx-auto mb-4 text-slate-300" />
              <p>Configurez votre analyse pour découvrir les gaps de contenu</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
