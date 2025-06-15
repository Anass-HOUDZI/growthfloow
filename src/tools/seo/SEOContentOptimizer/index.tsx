
import React, { useState, useMemo } from 'react';
import { Search, FileText, TrendingUp, Eye, Target, CheckCircle } from 'lucide-react';

interface ContentData {
  title: string;
  content: string;
  metaDescription: string;
  targetKeyword: string;
}

export const SEOContentOptimizer: React.FC = () => {
  const [contentData, setContentData] = useState<ContentData>({
    title: '',
    content: '',
    metaDescription: '',
    targetKeyword: ''
  });

  const analysis = useMemo(() => {
    const { title, content, metaDescription, targetKeyword } = contentData;
    const wordCount = content.split(/\s+/).filter(word => word.length > 0).length;
    const keywordDensity = targetKeyword ? 
      ((content.toLowerCase().match(new RegExp(targetKeyword.toLowerCase(), 'g')) || []).length / wordCount * 100) : 0;
    
    const seoScore = calculateSEOScore(contentData);
    const readabilityScore = calculateReadabilityScore(content);
    
    return {
      wordCount,
      keywordDensity: keywordDensity.toFixed(2),
      seoScore,
      readabilityScore,
      recommendations: generateRecommendations(contentData, seoScore)
    };
  }, [contentData]);

  const calculateSEOScore = (data: ContentData) => {
    let score = 0;
    
    // Title optimization (25 points)
    if (data.title.length >= 30 && data.title.length <= 60) score += 15;
    if (data.targetKeyword && data.title.toLowerCase().includes(data.targetKeyword.toLowerCase())) score += 10;
    
    // Content optimization (35 points)
    const wordCount = data.content.split(/\s+/).length;
    if (wordCount >= 300) score += 15;
    if (wordCount >= 1000) score += 10;
    if (data.targetKeyword) {
      const density = ((data.content.toLowerCase().match(new RegExp(data.targetKeyword.toLowerCase(), 'g')) || []).length / wordCount * 100);
      if (density >= 1 && density <= 3) score += 10;
    }
    
    // Meta description (15 points)
    if (data.metaDescription.length >= 120 && data.metaDescription.length <= 160) score += 15;
    
    // Keyword presence (25 points)
    if (data.targetKeyword) {
      if (data.title.toLowerCase().includes(data.targetKeyword.toLowerCase())) score += 8;
      if (data.content.toLowerCase().includes(data.targetKeyword.toLowerCase())) score += 9;
      if (data.metaDescription.toLowerCase().includes(data.targetKeyword.toLowerCase())) score += 8;
    }
    
    return Math.min(100, score);
  };

  const calculateReadabilityScore = (text: string) => {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
    const words = text.split(/\s+/).filter(w => w.length > 0).length;
    const syllables = text.split(/\s+/).reduce((acc, word) => acc + countSyllables(word), 0);
    
    if (sentences === 0 || words === 0) return 0;
    
    const fleschScore = 206.835 - (1.015 * (words / sentences)) - (84.6 * (syllables / words));
    return Math.max(0, Math.min(100, fleschScore));
  };

  const countSyllables = (word: string) => {
    return word.toLowerCase().replace(/[^a-z]/g, '').replace(/e$/, '').match(/[aeiouy]+/g)?.length || 1;
  };

  const generateRecommendations = (data: ContentData, score: number) => {
    const recommendations = [];
    
    if (data.title.length < 30) recommendations.push('Rallongez votre titre (30-60 caractères)');
    if (data.title.length > 60) recommendations.push('Raccourcissez votre titre (30-60 caractères)');
    if (data.metaDescription.length < 120) recommendations.push('Étoffez votre meta description (120-160 caractères)');
    if (data.metaDescription.length > 160) recommendations.push('Raccourcissez votre meta description (120-160 caractères)');
    
    const wordCount = data.content.split(/\s+/).length;
    if (wordCount < 300) recommendations.push('Ajoutez du contenu (minimum 300 mots)');
    
    if (data.targetKeyword) {
      const keywordDensity = ((data.content.toLowerCase().match(new RegExp(data.targetKeyword.toLowerCase(), 'g')) || []).length / wordCount * 100);
      if (keywordDensity < 1) recommendations.push('Augmentez la densité du mot-clé principal (1-3%)');
      if (keywordDensity > 3) recommendations.push('Réduisez la densité du mot-clé principal (1-3%)');
    }
    
    if (score < 70) recommendations.push('Optimisez la structure avec des sous-titres H2/H3');
    
    return recommendations;
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-200">
        <div className="flex items-center space-x-3 mb-4">
          <Search className="w-8 h-8 text-blue-600" />
          <h3 className="text-2xl font-bold text-blue-800">SEO Content Optimizer</h3>
        </div>
        <p className="text-blue-700">
          Optimisez votre contenu en temps réel avec l'analyse sémantique avancée
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-slate-800">Contenu à optimiser</h4>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Mot-clé principal</label>
            <input
              type="text"
              value={contentData.targetKeyword}
              onChange={(e) => setContentData({...contentData, targetKeyword: e.target.value})}
              className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ex: marketing digital"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Titre de l'article</label>
            <input
              type="text"
              value={contentData.title}
              onChange={(e) => setContentData({...contentData, title: e.target.value})}
              className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Titre optimisé SEO..."
            />
            <div className="text-xs text-slate-500 mt-1">{contentData.title.length}/60 caractères</div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Meta description</label>
            <textarea
              value={contentData.metaDescription}
              onChange={(e) => setContentData({...contentData, metaDescription: e.target.value})}
              className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
              placeholder="Description qui apparaîtra dans les résultats de recherche..."
            />
            <div className="text-xs text-slate-500 mt-1">{contentData.metaDescription.length}/160 caractères</div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Contenu de l'article</label>
            <textarea
              value={contentData.content}
              onChange={(e) => setContentData({...contentData, content: e.target.value})}
              className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={10}
              placeholder="Rédigez votre contenu ici..."
            />
            <div className="text-xs text-slate-500 mt-1">{analysis.wordCount} mots</div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-slate-800">Analyse SEO</h4>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg border border-slate-200">
              <div className="flex items-center space-x-2 mb-2">
                <Target className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-slate-600">Score SEO</span>
              </div>
              <div className={`text-2xl font-bold ${
                analysis.seoScore >= 80 ? 'text-green-600' :
                analysis.seoScore >= 60 ? 'text-yellow-600' : 'text-red-600'
              }`}>
                {analysis.seoScore}/100
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border border-slate-200">
              <div className="flex items-center space-x-2 mb-2">
                <Eye className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-slate-600">Lisibilité</span>
              </div>
              <div className={`text-2xl font-bold ${
                analysis.readabilityScore >= 60 ? 'text-green-600' :
                analysis.readabilityScore >= 30 ? 'text-yellow-600' : 'text-red-600'
              }`}>
                {analysis.readabilityScore.toFixed(0)}
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border border-slate-200">
              <div className="flex items-center space-x-2 mb-2">
                <FileText className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-medium text-slate-600">Mots</span>
              </div>
              <div className="text-2xl font-bold text-slate-800">{analysis.wordCount}</div>
            </div>

            <div className="bg-white p-4 rounded-lg border border-slate-200">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="w-5 h-5 text-orange-600" />
                <span className="text-sm font-medium text-slate-600">Densité KW</span>
              </div>
              <div className="text-2xl font-bold text-slate-800">{analysis.keywordDensity}%</div>
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-lg">
            <h5 className="font-semibold text-slate-800 mb-3 flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-blue-600" />
              <span>Recommandations</span>
            </h5>
            <div className="space-y-2">
              {analysis.recommendations.length > 0 ? (
                analysis.recommendations.map((rec, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-sm text-slate-600">{rec}</span>
                  </div>
                ))
              ) : (
                <div className="text-sm text-green-600">✅ Votre contenu est bien optimisé !</div>
              )}
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h5 className="font-semibold text-blue-800 mb-2">Prévisualisation SERP</h5>
            <div className="space-y-1">
              <div className="text-blue-600 text-lg font-medium line-clamp-1">
                {contentData.title || 'Titre de votre page...'}
              </div>
              <div className="text-green-600 text-sm">
                https://votre-site.com/article
              </div>
              <div className="text-slate-600 text-sm line-clamp-2">
                {contentData.metaDescription || 'Votre meta description apparaîtra ici...'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
