
import React, { useState, useMemo } from 'react';
import { Search, FileText, Eye, TrendingUp, AlertCircle, CheckCircle, Zap } from 'lucide-react';

interface SEOAnalysis {
  content: string;
  targetKeyword: string;
  score: number;
  recommendations: string[];
  readabilityScore: number;
  keywordDensity: number;
  wordCount: number;
}

export const SEOContentOptimizer: React.FC = () => {
  const [content, setContent] = useState('');
  const [targetKeyword, setTargetKeyword] = useState('');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Analyse SEO en temps réel
  const analysis = useMemo(() => {
    if (!content || !targetKeyword) {
      return {
        content,
        targetKeyword,
        score: 0,
        recommendations: [],
        readabilityScore: 0,
        keywordDensity: 0,
        wordCount: 0
      };
    }

    const wordCount = content.split(/\s+/).filter(word => word.length > 0).length;
    const keywordOccurrences = (content.toLowerCase().match(new RegExp(targetKeyword.toLowerCase(), 'g')) || []).length;
    const keywordDensity = wordCount > 0 ? (keywordOccurrences / wordCount) * 100 : 0;
    
    // Score de lisibilité simplifié (basé sur la longueur des phrases)
    const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const avgWordsPerSentence = sentences.length > 0 ? wordCount / sentences.length : 0;
    const readabilityScore = Math.max(0, Math.min(100, 100 - (avgWordsPerSentence - 15) * 2));

    // Calcul du score SEO
    let score = 0;
    const recommendations: string[] = [];

    // Longueur du contenu
    if (wordCount >= 300) {
      score += 20;
    } else {
      recommendations.push(`Augmenter la longueur du contenu (${wordCount}/300 mots minimum)`);
    }

    // Densité des mots-clés
    if (keywordDensity >= 1 && keywordDensity <= 3) {
      score += 20;
    } else if (keywordDensity < 1) {
      recommendations.push(`Augmenter la densité du mot-clé principal (${keywordDensity.toFixed(2)}% - recommandé: 1-3%)`);
    } else {
      recommendations.push(`Réduire la densité du mot-clé principal (${keywordDensity.toFixed(2)}% - recommandé: 1-3%)`);
    }

    // Présence du mot-clé dans le titre
    if (metaTitle.toLowerCase().includes(targetKeyword.toLowerCase())) {
      score += 15;
    } else {
      recommendations.push('Inclure le mot-clé principal dans le titre');
    }

    // Longueur du titre
    if (metaTitle.length >= 30 && metaTitle.length <= 60) {
      score += 10;
    } else {
      recommendations.push(`Optimiser la longueur du titre (${metaTitle.length}/30-60 caractères)`);
    }

    // Meta description
    if (metaDescription.length >= 120 && metaDescription.length <= 160) {
      score += 10;
    } else {
      recommendations.push(`Optimiser la longueur de la meta description (${metaDescription.length}/120-160 caractères)`);
    }

    // Présence du mot-clé dans la meta description
    if (metaDescription.toLowerCase().includes(targetKeyword.toLowerCase())) {
      score += 10;
    } else {
      recommendations.push('Inclure le mot-clé principal dans la meta description');
    }

    // Structure H1, H2, H3
    const hasH1 = /<h1[^>]*>.*?<\/h1>/i.test(content) || /^#\s/.test(content);
    const hasH2 = /<h2[^>]*>.*?<\/h2>/i.test(content) || /^##\s/m.test(content);
    
    if (hasH1) {
      score += 8;
    } else {
      recommendations.push('Ajouter un titre H1 contenant le mot-clé principal');
    }

    if (hasH2) {
      score += 7;
    } else {
      recommendations.push('Structurer le contenu avec des sous-titres H2');
    }

    // Lisibilité
    if (readabilityScore >= 70) {
      score += 10;
    } else {
      recommendations.push('Améliorer la lisibilité en raccourcissant les phrases');
    }

    return {
      content,
      targetKeyword,
      score,
      recommendations,
      readabilityScore,
      keywordDensity,
      wordCount
    };
  }, [content, targetKeyword, metaTitle, metaDescription]);

  const performAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 1500);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const suggestedKeywords = useMemo(() => {
    if (!targetKeyword) return [];
    
    // Simulation de suggestions sémantiques
    const base = targetKeyword.toLowerCase();
    return [
      `${base} guide`,
      `meilleur ${base}`,
      `${base} 2024`,
      `comment ${base}`,
      `${base} gratuit`,
      `${base} avancé`
    ];
  }, [targetKeyword]);

  // Fonction pour extraire les mots-clés détectés
  const getDetectedKeywords = () => {
    if (!content) return [];
    
    const wordCounts: { [key: string]: number } = {};
    content.split(/\s+/)
      .filter(word => word.length > 3)
      .forEach(word => {
        const cleanWord = word.toLowerCase().replace(/[^\w]/g, '');
        wordCounts[cleanWord] = (wordCounts[cleanWord] || 0) + 1;
      });

    return Object.entries(wordCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-200">
        <div className="flex items-center space-x-3 mb-4">
          <Search className="w-8 h-8 text-blue-600" />
          <div>
            <h3 className="text-2xl font-bold text-blue-800">SEO Content Optimizer</h3>
            <p className="text-blue-700">Analysez et optimisez votre contenu en temps réel avec recommandations sémantiques</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Configuration */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-slate-800">Configuration SEO</h4>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Mot-clé principal</label>
            <input
              type="text"
              value={targetKeyword}
              onChange={(e) => setTargetKeyword(e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="marketing digital"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Titre (Title Tag)</label>
            <input
              type="text"
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Titre de votre page"
            />
            <div className="text-xs text-slate-500 mt-1">
              {metaTitle.length}/60 caractères
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Meta Description</label>
            <textarea
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-20 resize-none"
              placeholder="Description de votre page pour les moteurs de recherche"
            />
            <div className="text-xs text-slate-500 mt-1">
              {metaDescription.length}/160 caractères
            </div>
          </div>

          {/* Score SEO */}
          <div className="bg-white p-4 rounded-lg border border-slate-200">
            <div className="flex items-center justify-between mb-3">
              <span className="font-semibold text-slate-700">Score SEO Global</span>
              <span className={`px-3 py-1 rounded-full text-lg font-bold ${getScoreColor(analysis.score)}`}>
                {analysis.score}/100
              </span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-500 ${
                  analysis.score >= 80 ? 'bg-green-500' :
                  analysis.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${analysis.score}%` }}
              />
            </div>
          </div>

          {/* Métriques rapides */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white p-3 rounded-lg border border-slate-200 text-center">
              <div className="text-lg font-bold text-blue-600">{analysis.wordCount}</div>
              <div className="text-xs text-slate-600">Mots</div>
            </div>
            <div className="bg-white p-3 rounded-lg border border-slate-200 text-center">
              <div className="text-lg font-bold text-purple-600">{analysis.keywordDensity.toFixed(1)}%</div>
              <div className="text-xs text-slate-600">Densité</div>
            </div>
            <div className="bg-white p-3 rounded-lg border border-slate-200 text-center">
              <div className="text-lg font-bold text-green-600">{analysis.readabilityScore.toFixed(0)}</div>
              <div className="text-xs text-slate-600">Lisibilité</div>
            </div>
            <div className="bg-white p-3 rounded-lg border border-slate-200 text-center">
              <div className="text-lg font-bold text-orange-600">{analysis.recommendations.length}</div>
              <div className="text-xs text-slate-600">Actions</div>
            </div>
          </div>
        </div>

        {/* Éditeur de contenu */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold text-slate-800">Contenu à optimiser</h4>
            <button
              onClick={performAnalysis}
              disabled={isAnalyzing}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              <Zap className="w-4 h-4" />
              <span>{isAnalyzing ? 'Analyse...' : 'Analyser'}</span>
            </button>
          </div>
          
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-96 px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            placeholder="Collez votre contenu ici pour l'optimiser..."
          />

          {/* Prévisualisation SERP */}
          {metaTitle && metaDescription && (
            <div className="bg-white p-4 rounded-lg border border-slate-200">
              <h5 className="font-semibold text-slate-700 mb-3 flex items-center">
                <Eye className="w-4 h-4 mr-2" />
                Prévisualisation SERP
              </h5>
              <div className="bg-slate-50 p-4 rounded-lg">
                <div className="text-blue-600 text-lg font-medium hover:underline cursor-pointer line-clamp-1">
                  {metaTitle}
                </div>
                <div className="text-green-600 text-sm mt-1">
                  https://votre-site.com/page-exemple
                </div>
                <div className="text-slate-600 text-sm mt-2 line-clamp-2">
                  {metaDescription}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Recommandations et suggestions */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-slate-800">Recommandations</h4>
          
          {analysis.recommendations.length > 0 ? (
            <div className="space-y-3">
              {analysis.recommendations.map((recommendation, index) => (
                <div key={index} className="bg-yellow-50 p-3 rounded-lg border border-yellow-200 flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-yellow-800">{recommendation}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-green-50 p-4 rounded-lg border border-green-200 flex items-center space-x-3">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <span className="text-green-800 font-medium">Excellent ! Votre contenu est bien optimisé.</span>
            </div>
          )}

          {/* Suggestions de mots-clés */}
          {suggestedKeywords.length > 0 && (
            <div className="bg-white p-4 rounded-lg border border-slate-200">
              <h5 className="font-semibold text-slate-700 mb-3">Mots-clés sémantiques suggérés</h5>
              <div className="flex flex-wrap gap-2">
                {suggestedKeywords.map((keyword, index) => (
                  <span
                    key={index}
                    onClick={() => setTargetKeyword(keyword)}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm cursor-pointer hover:bg-blue-200 transition-colors"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Nuage de mots-clés détectés */}
          {content && (
            <div className="bg-white p-4 rounded-lg border border-slate-200">
              <h5 className="font-semibold text-slate-700 mb-3">Mots-clés détectés</h5>
              <div className="text-sm text-slate-600">
                {getDetectedKeywords().map(([word, count]) => (
                  <span key={word} className="inline-block px-2 py-1 bg-slate-100 rounded mr-2 mb-2">
                    {word} ({count})
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
