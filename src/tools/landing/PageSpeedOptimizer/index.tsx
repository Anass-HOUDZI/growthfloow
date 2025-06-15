
import React, { useState } from 'react';
import { Gauge, Zap, AlertTriangle, CheckCircle, TrendingUp } from 'lucide-react';

export const PageSpeedOptimizer: React.FC = () => {
  const [url, setUrl] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeSpeed = () => {
    if (!url) return;
    
    setIsAnalyzing(true);
    
    // Simulate speed analysis
    setTimeout(() => {
      setAnalysis({
        scores: {
          mobile: 65,
          desktop: 78
        },
        metrics: {
          fcp: { mobile: 2.1, desktop: 1.4, good: 1.8 },
          lcp: { mobile: 3.8, desktop: 2.2, good: 2.5 },
          fid: { mobile: 45, desktop: 12, good: 100 },
          cls: { mobile: 0.15, desktop: 0.08, good: 0.1 }
        },
        issues: [
          {
            category: 'Images',
            severity: 'high',
            impact: 'Économie de 1.2s',
            issue: 'Images non optimisées (WebP manquant)',
            solution: 'Convertir les images en format WebP et ajouter lazy loading'
          },
          {
            category: 'JavaScript',
            severity: 'high',
            impact: 'Économie de 0.8s',
            issue: 'Scripts bloquants le rendu',
            solution: 'Différer le chargement des scripts non critiques'
          },
          {
            category: 'CSS',
            severity: 'medium',
            impact: 'Économie de 0.4s',
            issue: 'CSS non utilisé (45KB)',
            solution: 'Supprimer le CSS inutilisé et minifier'
          },
          {
            category: 'Serveur',
            severity: 'medium',
            impact: 'Économie de 0.3s',
            issue: 'Temps de réponse serveur lent',
            solution: 'Optimiser la configuration serveur et ajouter un CDN'
          }
        ],
        conversionImpact: {
          current: 3.2,
          optimized: 4.8,
          increase: 50
        }
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 50) return 'text-orange-600';
    return 'text-red-600';
  };

  const getScoreBackground = (score: number) => {
    if (score >= 90) return 'bg-green-100';
    if (score >= 50) return 'bg-orange-100';
    return 'bg-red-100';
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-orange-100 text-orange-800';
      default: return 'bg-green-100 text-green-800';
    }
  };

  const getMetricStatus = (current: number, good: number) => {
    return current <= good ? 'good' : current <= good * 1.5 ? 'needs-improvement' : 'poor';
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
          <Gauge className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Page Speed Optimizer</h2>
        <p className="text-slate-600">Audit technique avec recommandations d'optimisation</p>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <div className="flex space-x-4 mb-6">
          <input
            type="url"
            placeholder="https://votre-site.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={analyzeSpeed}
            disabled={!url || isAnalyzing}
            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
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
            {/* Scores globaux */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={`rounded-lg p-6 text-center ${getScoreBackground(analysis.scores.mobile)}`}>
                <div className={`text-3xl font-bold ${getScoreColor(analysis.scores.mobile)} mb-2`}>
                  {analysis.scores.mobile}
                </div>
                <p className="font-medium text-slate-800">Score Mobile</p>
              </div>
              <div className={`rounded-lg p-6 text-center ${getScoreBackground(analysis.scores.desktop)}`}>
                <div className={`text-3xl font-bold ${getScoreColor(analysis.scores.desktop)} mb-2`}>
                  {analysis.scores.desktop}
                </div>
                <p className="font-medium text-slate-800">Score Desktop</p>
              </div>
            </div>

            {/* Métriques Core Web Vitals */}
            <div className="bg-white border border-slate-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Core Web Vitals</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {Object.entries(analysis.metrics).map(([key, metric]: [string, any]) => {
                  const status = getMetricStatus(metric.mobile, metric.good);
                  return (
                    <div key={key} className="bg-slate-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-slate-800">{key.toUpperCase()}</h4>
                        {status === 'good' ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <AlertTriangle className="w-4 h-4 text-orange-500" />
                        )}
                      </div>
                      <div className="text-sm text-slate-600">
                        <div>Mobile: {key === 'fid' ? `${metric.mobile}ms` : key === 'cls' ? metric.mobile : `${metric.mobile}s`}</div>
                        <div>Desktop: {key === 'fid' ? `${metric.desktop}ms` : key === 'cls' ? metric.desktop : `${metric.desktop}s`}</div>
                        <div className="text-green-600 mt-1">
                          Objectif: {key === 'fid' ? `<${metric.good}ms` : key === 'cls' ? `<${metric.good}` : `<${metric.good}s`}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Problèmes identifiés */}
            <div className="bg-white border border-slate-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Opportunités d'Optimisation</h3>
              <div className="space-y-4">
                {analysis.issues.map((issue: any, index: number) => (
                  <div key={index} className="border border-slate-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(issue.severity)}`}>
                          {issue.severity === 'high' ? 'Priorité haute' : 'Priorité moyenne'}
                        </span>
                        <h4 className="font-medium text-slate-800">{issue.category}</h4>
                      </div>
                      <div className="text-green-600 font-medium text-sm">{issue.impact}</div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-slate-600 text-sm">
                        <strong>Problème:</strong> {issue.issue}
                      </p>
                      <p className="text-slate-600 text-sm">
                        <strong>Solution:</strong> {issue.solution}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Impact sur la conversion */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Impact sur la Conversion
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600 mb-1">
                    {analysis.conversionImpact.current}%
                  </div>
                  <p className="text-sm text-slate-600">Taux actuel</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    {analysis.conversionImpact.optimized}%
                  </div>
                  <p className="text-sm text-slate-600">Taux optimisé</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    +{analysis.conversionImpact.increase}%
                  </div>
                  <p className="text-sm text-slate-600">Amélioration</p>
                </div>
              </div>
              <div className="mt-4 text-sm text-slate-600">
                <p>
                  <strong>Estimation:</strong> Une amélioration de 1 seconde du temps de chargement 
                  peut augmenter les conversions de 7% en moyenne. Vos optimisations pourraient 
                  générer jusqu'à 50% de conversions supplémentaires.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
