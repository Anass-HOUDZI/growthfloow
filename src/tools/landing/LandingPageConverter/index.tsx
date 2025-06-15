
import React, { useState } from 'react';
import { Palette, CheckCircle, AlertTriangle, TrendingUp, Star, Zap } from 'lucide-react';

export const LandingPageConverter: React.FC = () => {
  const [url, setUrl] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzePage = () => {
    if (!url) return;
    
    setIsAnalyzing(true);
    
    // Simulate analysis
    setTimeout(() => {
      setAnalysis({
        score: 72,
        elements: {
          headline: { score: 85, issues: ['Manque d\'urgence', 'Trop générique'] },
          cta: { score: 60, issues: ['Couleur peu contrastée', 'Position non optimale'] },
          form: { score: 45, issues: ['Trop de champs', 'Pas de validation visuelle'] },
          trust: { score: 90, issues: ['Excellent use de témoignages'] },
          speed: { score: 55, issues: ['Images non optimisées', 'Trop de scripts'] }
        },
        recommendations: [
          { priority: 'High', element: 'CTA Button', issue: 'Améliorer le contraste et la position', impact: '+15% conversion' },
          { priority: 'High', element: 'Form Fields', issue: 'Réduire à 3 champs essentiels', impact: '+25% completion' },
          { priority: 'Medium', element: 'Headlines', issue: 'Ajouter de l\'urgence et bénéfices', impact: '+8% engagement' },
          { priority: 'Low', element: 'Page Speed', issue: 'Optimiser les images', impact: '+5% conversion' }
        ]
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-green-100 text-green-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-violet-600 rounded-xl flex items-center justify-center mx-auto mb-4">
          <Palette className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Landing Page Converter</h2>
        <p className="text-slate-600">Audit UX/UI complet avec recommandations de conversion</p>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <div className="flex space-x-4 mb-6">
          <input
            type="url"
            placeholder="https://votre-landing-page.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <button
            onClick={analyzePage}
            disabled={!url || isAnalyzing}
            className="px-6 py-2 bg-gradient-to-r from-purple-500 to-violet-600 text-white rounded-lg hover:from-purple-600 hover:to-violet-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {isAnalyzing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Analyse...</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4" />
                <span>Analyser</span>
              </>
            )}
          </button>
        </div>

        {analysis && (
          <div className="space-y-6">
            {/* Score global */}
            <div className="bg-slate-50 rounded-lg p-6 text-center">
              <div className={`text-4xl font-bold ${getScoreColor(analysis.score)} mb-2`}>
                {analysis.score}/100
              </div>
              <p className="text-slate-600">Score de Conversion Global</p>
            </div>

            {/* Détail par élément */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(analysis.elements).map(([key, element]: [string, any]) => (
                <div key={key} className="bg-white border border-slate-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-slate-800 capitalize">{key}</h4>
                    <div className={`text-lg font-bold ${getScoreColor(element.score)}`}>
                      {element.score}
                    </div>
                  </div>
                  <div className="space-y-2">
                    {element.issues.map((issue: string, index: number) => (
                      <div key={index} className="flex items-start space-x-2 text-sm">
                        {element.score >= 80 ? (
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        ) : (
                          <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                        )}
                        <span className="text-slate-600">{issue}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Recommandations */}
            <div className="bg-white border border-slate-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Recommandations Prioritaires
              </h3>
              <div className="space-y-4">
                {analysis.recommendations.map((rec: any, index: number) => (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-slate-50 rounded-lg">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(rec.priority)}`}>
                      {rec.priority}
                    </span>
                    <div className="flex-1">
                      <h4 className="font-medium text-slate-800">{rec.element}</h4>
                      <p className="text-slate-600 text-sm mt-1">{rec.issue}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-green-600 font-medium text-sm">{rec.impact}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
