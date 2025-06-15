
import React, { useState } from 'react';
import { Layout, AlertTriangle, CheckCircle, TrendingUp, Zap, Users } from 'lucide-react';

export const FormOptimizer: React.FC = () => {
  const [formHtml, setFormHtml] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeForm = () => {
    if (!formHtml.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate form analysis
    setTimeout(() => {
      setAnalysis({
        overallScore: 68,
        completionRate: {
          current: 45,
          optimized: 72,
          improvement: 60
        },
        fieldAnalysis: [
          {
            field: 'Email',
            score: 85,
            issues: [],
            suggestions: ['Excellent: type="email" utilisé', 'Autocomplete configuré']
          },
          {
            field: 'Nom complet',
            score: 60,
            issues: ['Champ trop long', 'Placeholder générique'],
            suggestions: ['Diviser en prénom/nom', 'Améliorer le placeholder']
          },
          {
            field: 'Téléphone',
            score: 40,
            issues: ['Type text au lieu de tel', 'Format non spécifié', 'Champ obligatoire non justifié'],
            suggestions: ['Utiliser type="tel"', 'Ajouter format hint', 'Rendre optionnel']
          },
          {
            field: 'Message',
            score: 55,
            issues: ['Zone trop petite', 'Compteur de caractères manquant'],
            suggestions: ['Agrandir la zone de texte', 'Ajouter un compteur']
          }
        ],
        frictionPoints: [
          {
            type: 'Trop de champs',
            severity: 'high',
            description: '6 champs détectés (recommandé: 3-4 max)',
            solution: 'Garder uniquement les champs essentiels',
            impact: '+25% completion'
          },
          {
            type: 'Validation manquante',
            severity: 'medium',
            description: 'Pas de validation en temps réel',
            solution: 'Ajouter validation inline avec feedback visuel',
            impact: '+15% satisfaction'
          },
          {
            type: 'CTA peu visible',
            severity: 'medium',
            description: 'Bouton submit peu contrasté',
            solution: 'Améliorer le contraste et la taille du bouton',
            impact: '+10% clics'
          }
        ],
        recommendations: [
          'Réduire à 3 champs essentiels: Email, Prénom, Entreprise',
          'Ajouter validation temps réel avec messages d\'erreur clairs',
          'Utiliser les types d\'input appropriés (email, tel)',
          'Configurer l\'autocomplete pour tous les champs',
          'Améliorer les placeholders et labels',
          'Ajouter un indicateur de progression si multi-étapes'
        ]
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-orange-600';
    return 'text-red-600';
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-orange-100 text-orange-800';
      default: return 'bg-green-100 text-green-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
          <Layout className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Form Optimizer</h2>
        <p className="text-slate-600">Réduction friction formulaires avec analytics</p>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Code HTML du formulaire à analyser
          </label>
          <textarea
            placeholder="Collez ici le code HTML de votre formulaire..."
            value={formHtml}
            onChange={(e) => setFormHtml(e.target.value)}
            rows={8}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
          />
        </div>

        <button
          onClick={analyzeForm}
          disabled={!formHtml.trim() || isAnalyzing}
          className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isAnalyzing ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>Analyse en cours...</span>
            </>
          ) : (
            <>
              <Zap className="w-4 h-4" />
              <span>Analyser le Formulaire</span>
            </>
          )}
        </button>

        {analysis && (
          <div className="mt-8 space-y-6">
            {/* Score et métriques */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-50 rounded-lg p-4 text-center">
                <div className={`text-2xl font-bold ${getScoreColor(analysis.overallScore)} mb-1`}>
                  {analysis.overallScore}/100
                </div>
                <p className="text-sm text-slate-600">Score Global</p>
              </div>
              <div className="bg-red-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-red-600 mb-1">
                  {analysis.completionRate.current}%
                </div>
                <p className="text-sm text-slate-600">Taux Actuel</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">
                  {analysis.completionRate.optimized}%
                </div>
                <p className="text-sm text-slate-600">Potentiel Optimisé</p>
              </div>
            </div>

            {/* Analyse par champ */}
            <div className="bg-white border border-slate-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Analyse par Champ</h3>
              <div className="space-y-4">
                {analysis.fieldAnalysis.map((field: any, index: number) => (
                  <div key={index} className="border border-slate-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-slate-800">{field.field}</h4>
                      <div className={`text-lg font-bold ${getScoreColor(field.score)}`}>
                        {field.score}/100
                      </div>
                    </div>
                    
                    {field.issues.length > 0 && (
                      <div className="mb-3">
                        <p className="text-sm font-medium text-red-700 mb-2">Problèmes identifiés:</p>
                        <ul className="space-y-1">
                          {field.issues.map((issue: string, i: number) => (
                            <li key={i} className="flex items-start space-x-2 text-sm">
                              <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                              <span className="text-slate-600">{issue}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div>
                      <p className="text-sm font-medium text-green-700 mb-2">Suggestions:</p>
                      <ul className="space-y-1">
                        {field.suggestions.map((suggestion: string, i: number) => (
                          <li key={i} className="flex items-start space-x-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-slate-600">{suggestion}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Points de friction */}
            <div className="bg-white border border-slate-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Points de Friction Détectés</h3>
              <div className="space-y-4">
                {analysis.frictionPoints.map((friction: any, index: number) => (
                  <div key={index} className="border border-slate-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(friction.severity)}`}>
                          {friction.severity === 'high' ? 'Critique' : 'Important'}
                        </span>
                        <h4 className="font-medium text-slate-800">{friction.type}</h4>
                      </div>
                      <div className="text-green-600 font-medium text-sm">{friction.impact}</div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-slate-600 text-sm">
                        <strong>Problème:</strong> {friction.description}
                      </p>
                      <p className="text-slate-600 text-sm">
                        <strong>Solution:</strong> {friction.solution}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Impact prévisionnel */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Impact Prévisionnel
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-slate-800 mb-3">Amélioration du Taux de Completion</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Taux actuel</span>
                      <span className="font-medium">{analysis.completionRate.current}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div 
                        className="bg-red-500 h-2 rounded-full" 
                        style={{ width: `${analysis.completionRate.current}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Taux optimisé</span>
                      <span className="font-medium text-green-600">{analysis.completionRate.optimized}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${analysis.completionRate.optimized}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      +{analysis.completionRate.improvement}%
                    </div>
                    <p className="text-slate-600">d'amélioration</p>
                    <div className="flex items-center justify-center mt-2 text-sm text-slate-500">
                      <Users className="w-4 h-4 mr-1" />
                      <span>Plus de leads qualifiés</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recommandations prioritaires */}
            <div className="bg-white border border-slate-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">
                Plan d'Action Recommandé
              </h3>
              <div className="space-y-3">
                {analysis.recommendations.map((rec: string, index: number) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-slate-50 rounded-lg">
                    <div className="w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                      {index + 1}
                    </div>
                    <span className="text-slate-700">{rec}</span>
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
