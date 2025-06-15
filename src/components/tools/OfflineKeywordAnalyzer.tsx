
import React, { useState, useMemo } from 'react';
import { Target, BarChart3, TrendingUp, FileText } from 'lucide-react';

interface KeywordAnalysis {
  keyword: string;
  count: number;
  density: number;
  positions: number[];
}

export const OfflineKeywordAnalyzer: React.FC = () => {
  const [content, setContent] = useState('');
  const [targetKeywords, setTargetKeywords] = useState('');
  const [analysis, setAnalysis] = useState<KeywordAnalysis[]>([]);

  const analyzeKeywords = useMemo(() => {
    if (!content || !targetKeywords) {
      setAnalysis([]);
      return;
    }

    const words = content.toLowerCase().split(/\s+/).filter(word => word.length > 0);
    const keywords = targetKeywords.toLowerCase().split(',').map(k => k.trim());
    const totalWords = words.length;

    const results: KeywordAnalysis[] = keywords.map(keyword => {
      const positions: number[] = [];
      let count = 0;

      words.forEach((word, index) => {
        if (word.includes(keyword) || keyword.includes(word)) {
          count++;
          positions.push(index);
        }
      });

      const density = totalWords > 0 ? (count / totalWords) * 100 : 0;

      return {
        keyword,
        count,
        density,
        positions
      };
    });

    setAnalysis(results);
  }, [content, targetKeywords]);

  const getKeywordRecommendation = (density: number) => {
    if (density < 0.5) return { status: 'low', message: 'Densité trop faible', color: 'text-red-500' };
    if (density > 3) return { status: 'high', message: 'Risque de sur-optimisation', color: 'text-orange-500' };
    return { status: 'good', message: 'Densité optimale', color: 'text-green-500' };
  };

  const totalWordCount = content.split(/\s+/).filter(word => word.length > 0).length;
  const readabilityScore = content ? Math.max(0, Math.min(100, 100 - (content.split('.').length * 2) + (totalWordCount / 10))) : 0;

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[70vh] px-2 md:px-0">
      <div className="w-full flex flex-col items-center justify-center mb-8">
        <div className="mb-4 mt-4">
          <div className="mx-auto flex items-center justify-center w-[68px] h-[68px] rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 shadow-lg shadow-green-200/25">
            <Target className="w-10 h-10 text-white" />
          </div>
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 text-center mb-2">
          Analyseur de Mots-Clés Offline
        </h2>
        <p className="text-lg md:text-xl text-slate-500 text-center mb-2 max-w-2xl">
          Analysez la densité de vos mots-clés sans connexion internet
        </p>
        <div className="flex items-center justify-center space-x-2 text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full">
          <div className="w-2 h-2 bg-green-500 rounded-full" />
          <span>Disponible hors ligne</span>
        </div>
      </div>

      <div className="w-full max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2 text-center">
                Mots-clés cibles (séparés par des virgules)
              </label>
              <input
                type="text"
                value={targetKeywords}
                onChange={(e) => setTargetKeywords(e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="marketing digital, SEO, stratégie"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2 text-center">
                Contenu à analyser
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={12}
                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Collez votre contenu ici pour analyser la densité des mots-clés..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg border border-slate-200 text-center">
                <FileText className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                <div className="text-lg font-bold text-slate-800">{totalWordCount}</div>
                <div className="text-sm text-slate-600">Mots total</div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-slate-200 text-center">
                <TrendingUp className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                <div className="text-lg font-bold text-slate-800">{readabilityScore.toFixed(0)}/100</div>
                <div className="text-sm text-slate-600">Lisibilité</div>
              </div>
            </div>
          </div>

          {analysis.length > 0 && (
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-slate-800 text-center">Analyse des Mots-Clés</h4>
              
              <div className="space-y-3">
                {analysis.map((item, index) => {
                  const recommendation = getKeywordRecommendation(item.density);
                  return (
                    <div key={index} className="bg-white p-4 rounded-lg border border-slate-200">
                      <div className="flex justify-between items-start mb-2">
                        <div className="font-medium text-slate-800 capitalize">
                          {item.keyword}
                        </div>
                        <div className={`text-sm ${recommendation.color}`}>
                          {recommendation.message}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-600">Occurrences:</span>
                          <span className="font-medium">{item.count}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Densité:</span>
                          <span className="font-medium">{item.density.toFixed(2)}%</span>
                        </div>
                      </div>

                      <div className="mt-3">
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              recommendation.status === 'good' ? 'bg-green-500' : 
                              recommendation.status === 'low' ? 'bg-red-500' : 'bg-orange-500'
                            }`}
                            style={{ width: `${Math.min(item.density * 20, 100)}%` }}
                          />
                        </div>
                      </div>

                      {item.positions.length > 0 && (
                        <div className="mt-2 text-xs text-slate-500">
                          Positions: {item.positions.slice(0, 5).join(', ')}
                          {item.positions.length > 5 && ` (+${item.positions.length - 5} autres)`}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="bg-slate-50 p-4 rounded-lg">
                <h5 className="font-semibold text-slate-800 mb-2 text-center">Recommandations</h5>
                <div className="space-y-1 text-sm text-slate-600">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span>Densité optimale: 0.5% - 3%</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <span>Utilisez des variantes et synonymes</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full" />
                    <span>Répartissez naturellement dans le texte</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
