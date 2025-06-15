
import React, { useState } from 'react';
import { Search, FileText, Target, TrendingUp } from 'lucide-react';

export const SEOContentOptimizer = () => {
  const [content, setContent] = useState('');
  const [targetKeyword, setTargetKeyword] = useState('');
  const [analysis, setAnalysis] = useState(null);

  const analyzeContent = () => {
    const wordCount = content.split(' ').filter(word => word.length > 0).length;
    const keywordDensity = targetKeyword ? 
      (content.toLowerCase().split(targetKeyword.toLowerCase()).length - 1) / wordCount * 100 : 0;
    const readabilityScore = Math.max(0, Math.min(100, 100 - (content.split('.').length * 2) + (wordCount / 10)));
    const seoScore = Math.round((
      (wordCount > 300 ? 25 : wordCount / 300 * 25) +
      (keywordDensity > 0.5 && keywordDensity < 3 ? 25 : 0) +
      (content.includes(targetKeyword) ? 25 : 0) +
      (readabilityScore > 60 ? 25 : 0)
    ));

    setAnalysis({
      wordCount,
      keywordDensity: keywordDensity.toFixed(2),
      readabilityScore: readabilityScore.toFixed(0),
      seoScore,
      recommendations: generateRecommendations(wordCount, keywordDensity, content, targetKeyword)
    });
  };

  const generateRecommendations = (wordCount, density, content, keyword) => {
    const recs = [];
    if (wordCount < 300) recs.push("Augmentez la longueur du contenu (300+ mots recommandés)");
    if (density < 0.5) recs.push("Augmentez la densité du mot-clé principal");
    if (density > 3) recs.push("Réduisez la densité du mot-clé pour éviter le sur-optimisation");
    if (!content.includes(keyword)) recs.push("Incluez le mot-clé principal dans le contenu");
    if (!content.toLowerCase().includes(keyword + 's')) recs.push("Utilisez des variantes du mot-clé");
    return recs;
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[70vh] px-2 md:px-0">
      <div className="flex flex-col items-center">
        <div className="mb-5 mt-2">
          <div className="mx-auto flex items-center justify-center w-[58px] h-[58px] rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-200/25">
            <Search className="w-9 h-9 text-white" />
          </div>
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 text-center mb-1">
          SEO Content Optimizer
        </h2>
        <p className="text-base md:text-lg text-slate-500 text-center mb-6 max-w-xl">
          Analysez et optimisez votre contenu pour les moteurs de recherche
        </p>
      </div>

      <div className="w-full max-w-3xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Mot-clé principal
              </label>
              <input
                type="text"
                value={targetKeyword}
                onChange={(e) => setTargetKeyword(e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="marketing digital"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Contenu à analyser
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={10}
                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Collez votre contenu ici pour l'analyser..."
              />
            </div>
            <button
              onClick={analyzeContent}
              disabled={!content || !targetKeyword}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-600 hover:to-cyan-700 transition-all duration-200 disabled:opacity-50"
            >
              Analyser le contenu
            </button>
          </div>

          {analysis && (
            <div className="space-y-4 w-full">
              <h4 className="text-lg font-semibold text-slate-800 text-center">Analyse SEO</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg border border-slate-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-medium text-slate-600">Mots</span>
                  </div>
                  <div className="text-2xl font-bold text-slate-800">{analysis.wordCount}</div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-slate-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <Target className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-medium text-slate-600">Densité KW</span>
                  </div>
                  <div className="text-2xl font-bold text-slate-800">{analysis.keywordDensity}%</div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-slate-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-purple-600" />
                    <span className="text-sm font-medium text-slate-600">Lisibilité</span>
                  </div>
                  <div className="text-2xl font-bold text-slate-800">{analysis.readabilityScore}/100</div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-slate-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <Search className="w-5 h-5 text-orange-600" />
                    <span className="text-sm font-medium text-slate-600">Score SEO</span>
                  </div>
                  <div className="text-2xl font-bold text-slate-800">{analysis.seoScore}/100</div>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-lg">
                <h5 className="font-semibold text-slate-800 mb-3">Recommandations</h5>
                <div className="space-y-2">
                  {analysis.recommendations.map((rec, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-sm text-slate-600">{rec}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
