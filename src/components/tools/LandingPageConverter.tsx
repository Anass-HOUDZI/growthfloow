
import React, { useState } from 'react';
import { Palette, Gauge, MousePointer, Zap } from 'lucide-react';

export const LandingPageConverter = () => {
  const [url, setUrl] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzePage = async () => {
    setIsAnalyzing(true);
    
    // Simulation d'analyse (en production, utiliserait des APIs publiques)
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const score = Math.floor(Math.random() * 30) + 60; // Score entre 60-90
    
    setAnalysis({
      overallScore: score,
      loadTime: (Math.random() * 2 + 1).toFixed(1),
      conversionElements: {
        headline: Math.floor(Math.random() * 20) + 70,
        cta: Math.floor(Math.random() * 25) + 65,
        social_proof: Math.floor(Math.random() * 30) + 50,
        value_prop: Math.floor(Math.random() * 20) + 75
      },
      recommendations: [
        "Optimisez la vitesse de chargement des images",
        "Ajoutez des témoignages clients visibles",
        "Renforcez votre proposition de valeur principale",
        "Améliorez le contraste de vos boutons CTA",
        "Réduisez le nombre de champs dans vos formulaires"
      ]
    });
    
    setIsAnalyzing(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-50 to-violet-50 p-6 rounded-xl border border-purple-200">
        <div className="flex items-center space-x-3 mb-4">
          <Palette className="w-8 h-8 text-purple-600" />
          <h3 className="text-2xl font-bold text-purple-800">Landing Page Converter</h3>
        </div>
        <p className="text-purple-700">
          Auditez votre landing page et obtenez des recommandations pour améliorer les conversions
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            URL de votre landing page
          </label>
          <div className="flex space-x-3">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1 px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="https://votre-site.com/landing-page"
            />
            <button
              onClick={analyzePage}
              disabled={!url || isAnalyzing}
              className="bg-gradient-to-r from-purple-500 to-violet-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-purple-600 hover:to-violet-700 transition-all duration-200 disabled:opacity-50"
            >
              {isAnalyzing ? 'Analyse...' : 'Analyser'}
            </button>
          </div>
        </div>

        {isAnalyzing && (
          <div className="bg-white p-6 rounded-lg border border-slate-200">
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
              <span className="text-slate-600">Analyse en cours de votre landing page...</span>
            </div>
          </div>
        )}

        {analysis && !isAnalyzing && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-slate-200">
              <h4 className="text-lg font-semibold text-slate-800 mb-4">Score de Conversion</h4>
              <div className="flex items-center space-x-4">
                <div className="text-4xl font-bold text-purple-600">{analysis.overallScore}/100</div>
                <div className="flex-1">
                  <div className="w-full bg-slate-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-violet-600 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${analysis.overallScore}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-slate-600 mt-2">
                    {analysis.overallScore >= 80 ? 'Excellent' : 
                     analysis.overallScore >= 60 ? 'Bon' : 'À améliorer'}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg border border-slate-200">
                <div className="flex items-center space-x-2 mb-2">
                  <Gauge className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-slate-600">Temps de chargement</span>
                </div>
                <div className="text-2xl font-bold text-slate-800">{analysis.loadTime}s</div>
              </div>

              <div className="bg-white p-4 rounded-lg border border-slate-200">
                <div className="flex items-center space-x-2 mb-2">
                  <MousePointer className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-slate-600">Éléments CTA</span>
                </div>
                <div className="text-2xl font-bold text-slate-800">{analysis.conversionElements.cta}/100</div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-slate-200">
              <h5 className="font-semibold text-slate-800 mb-4">Analyse détaillée</h5>
              <div className="space-y-3">
                {Object.entries(analysis.conversionElements).map(([key, score]) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-sm text-slate-600 capitalize">
                      {key.replace('_', ' ')}
                    </span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-slate-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full"
                          style={{ width: `${score}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-slate-800 w-8">{score}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-50 p-6 rounded-lg">
              <h5 className="font-semibold text-slate-800 mb-4 flex items-center space-x-2">
                <Zap className="w-5 h-5 text-orange-500" />
                <span>Recommandations prioritaires</span>
              </h5>
              <div className="space-y-2">
                {analysis.recommendations.map((rec, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                      {index + 1}
                    </div>
                    <span className="text-sm text-slate-600">{rec}</span>
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
