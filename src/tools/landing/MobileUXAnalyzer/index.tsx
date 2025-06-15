
import React, { useState } from 'react';
import { Smartphone, CheckCircle, AlertTriangle, Zap, TrendingUp } from 'lucide-react';

export const MobileUXAnalyzer: React.FC = () => {
  const [url, setUrl] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeMobileUX = () => {
    if (!url) return;
    
    setIsAnalyzing(true);
    
    // Simulate mobile UX analysis
    setTimeout(() => {
      setAnalysis({
        overallScore: 74,
        categories: {
          usability: {
            score: 82,
            issues: [
              { type: 'success', text: 'Boutons suffisamment grands (>44px)' },
              { type: 'warning', text: 'Espacement entre éléments cliquables insuffisant' },
              { type: 'success', text: 'Police lisible sur mobile (>16px)' }
            ]
          },
          responsive: {
            score: 68,
            issues: [
              { type: 'error', text: 'Débordement horizontal détecté' },
              { type: 'warning', text: 'Images non adaptées aux écrans Retina' },
              { type: 'success', text: 'Breakpoints correctement définis' }
            ]
          },
          performance: {
            score: 71,
            issues: [
              { type: 'warning', text: 'Temps de chargement 3.2s (objectif: <3s)' },
              { type: 'error', text: 'Images trop lourdes pour mobile' },
              { type: 'success', text: 'Compression gzip activée' }
            ]
          },
          forms: {
            score: 65,
            issues: [
              { type: 'error', text: 'Types d\'input non optimisés (email, tel)' },
              { type: 'warning', text: 'Validation en temps réel manquante' },
              { type: 'warning', text: 'Autocomplete non configuré' }
            ]
          }
        },
        recommendations: [
          {
            priority: 'High',
            category: 'Responsive Design',
            issue: 'Corriger le débordement horizontal',
            solution: 'Ajuster les largeurs fixes et utiliser max-width: 100%',
            impact: '+12% engagement mobile'
          },
          {
            priority: 'High',
            category: 'Formulaires',
            issue: 'Optimiser les types d\'input',
            solution: 'Utiliser type="email", type="tel", autocomplete, inputmode',
            impact: '+18% completion mobile'
          },
          {
            priority: 'Medium',
            category: 'Performance',
            issue: 'Optimiser les images pour mobile',
            solution: 'Servir des images responsive avec srcset',
            impact: '+8% vitesse de chargement'
          },
          {
            priority: 'Medium',
            category: 'UX',
            issue: 'Améliorer l\'espacement tactile',
            solution: 'Augmenter l\'espacement entre éléments cliquables',
            impact: '+5% précision des clics'
          }
        ],
        deviceTests: {
          'iPhone 13': { score: 78, issues: 2 },
          'Samsung Galaxy S21': { score: 72, issues: 3 },
          'iPad': { score: 85, issues: 1 },
          'iPhone SE': { score: 65, issues: 4 }
        }
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-orange-600';
    return 'text-red-600';
  };

  const getScoreBackground = (score: number) => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-orange-100';
    return 'bg-red-100';
  };

  const getIssueIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-orange-500" />;
      case 'error': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default: return null;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-orange-100 text-orange-800';
      default: return 'bg-green-100 text-green-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
          <Smartphone className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Mobile UX Analyzer</h2>
        <p className="text-slate-600">Optimisation expérience mobile spécialisée</p>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <div className="flex space-x-4 mb-6">
          <input
            type="url"
            placeholder="https://votre-site.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <button
            onClick={analyzeMobileUX}
            disabled={!url || isAnalyzing}
            className="px-6 py-2 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-lg hover:from-green-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {isAnalyzing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Analyse...</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4" />
                <span>Analyser Mobile UX</span>
              </>
            )}
          </button>
        </div>

        {analysis && (
          <div className="space-y-6">
            {/* Score global */}
            <div className={`rounded-lg p-6 text-center ${getScoreBackground(analysis.overallScore)}`}>
              <div className={`text-4xl font-bold ${getScoreColor(analysis.overallScore)} mb-2`}>
                {analysis.overallScore}/100
              </div>
              <p className="font-medium text-slate-800">Score Mobile UX Global</p>
            </div>

            {/* Scores par catégorie */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.entries(analysis.categories).map(([category, data]: [string, any]) => (
                <div key={category} className="bg-white border border-slate-200 rounded-lg p-4">
                  <div className="text-center mb-3">
                    <div className={`text-2xl font-bold ${getScoreColor(data.score)} mb-1`}>
                      {data.score}
                    </div>
                    <p className="text-sm font-medium text-slate-800 capitalize">
                      {category === 'usability' ? 'Utilisabilité' :
                       category === 'responsive' ? 'Responsive' :
                       category === 'performance' ? 'Performance' : 'Formulaires'}
                    </p>
                  </div>
                  <div className="space-y-2">
                    {data.issues.map((issue: any, index: number) => (
                      <div key={index} className="flex items-start space-x-2 text-xs">
                        {getIssueIcon(issue.type)}
                        <span className="text-slate-600">{issue.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Tests par device */}
            <div className="bg-white border border-slate-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Tests par Appareil</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {Object.entries(analysis.deviceTests).map(([device, data]: [string, any]) => (
                  <div key={device} className="bg-slate-50 rounded-lg p-4 text-center">
                    <h4 className="font-medium text-slate-800 mb-2">{device}</h4>
                    <div className={`text-xl font-bold ${getScoreColor(data.score)} mb-1`}>
                      {data.score}
                    </div>
                    <p className="text-xs text-slate-600">{data.issues} problème(s)</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommandations */}
            <div className="bg-white border border-slate-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Recommandations d'Optimisation Mobile
              </h3>
              <div className="space-y-4">
                {analysis.recommendations.map((rec: any, index: number) => (
                  <div key={index} className="border border-slate-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(rec.priority)}`}>
                          {rec.priority === 'High' ? 'Priorité haute' : 'Priorité moyenne'}
                        </span>
                        <h4 className="font-medium text-slate-800">{rec.category}</h4>
                      </div>
                      <div className="text-green-600 font-medium text-sm">{rec.impact}</div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-slate-600 text-sm">
                        <strong>Problème:</strong> {rec.issue}
                      </p>
                      <p className="text-slate-600 text-sm">
                        <strong>Solution:</strong> {rec.solution}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Conseils généraux */}
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Conseils Mobile UX Essentiels
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-600">
                <div>
                  <h4 className="font-medium text-slate-800 mb-2">🎯 Ergonomie Tactile</h4>
                  <ul className="space-y-1">
                    <li>• Boutons min. 44x44px</li>
                    <li>• Espacement 8px minimum</li>
                    <li>• Zone de pouce accessible</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-slate-800 mb-2">📱 Responsive Design</h4>
                  <ul className="space-y-1">
                    <li>• Mobile-first approach</li>
                    <li>• Images adaptatives</li>
                    <li>• Typography scalable</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-slate-800 mb-2">⚡ Performance</h4>
                  <ul className="space-y-1">
                    <li>• Chargement < 3 secondes</li>
                    <li>• Images optimisées</li>
                    <li>• Cache browser</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-slate-800 mb-2">📝 Formulaires</h4>
                  <ul className="space-y-1">
                    <li>• Types d'input adaptés</li>
                    <li>• Autocomplete activé</li>
                    <li>• Validation temps réel</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
