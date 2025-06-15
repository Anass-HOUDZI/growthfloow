
import React, { useState } from 'react';
import { Eye, Shield, Star, CheckCircle, AlertTriangle, TrendingUp, Users, Award } from 'lucide-react';

export const TrustSignalAnalyzer: React.FC = () => {
  const [url, setUrl] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeTrustSignals = () => {
    if (!url) return;
    
    setIsAnalyzing(true);
    
    // Simulate trust signals analysis
    setTimeout(() => {
      setAnalysis({
        overallScore: 78,
        trustLevel: 'Good',
        categories: {
          testimonials: {
            score: 85,
            present: true,
            issues: [
              { type: 'success', text: 'Témoignages clients avec photos' },
              { type: 'success', text: 'Citations authentiques et détaillées' },
              { type: 'warning', text: 'Manque de témoignages vidéo' }
            ]
          },
          credentials: {
            score: 92,
            present: true,
            issues: [
              { type: 'success', text: 'Certifications ISO affichées' },
              { type: 'success', text: 'Logos partenaires visibles' },
              { type: 'success', text: 'Récompenses mises en avant' }
            ]
          },
          security: {
            score: 70,
            present: true,
            issues: [
              { type: 'success', text: 'Certificat SSL (HTTPS)' },
              { type: 'warning', text: 'Badges de sécurité manquants' },
              { type: 'warning', text: 'Politique de confidentialité non mise en avant' }
            ]
          },
          social: {
            score: 65,
            present: true,
            issues: [
              { type: 'success', text: 'Nombre de followers affiché' },
              { type: 'warning', text: 'Avis Google/Facebook non intégrés' },
              { type: 'error', text: 'Preuves sociales statiques' }
            ]
          },
          contact: {
            score: 75,
            present: true,
            issues: [
              { type: 'success', text: 'Adresse physique visible' },
              { type: 'success', text: 'Numéro de téléphone affiché' },
              { type: 'warning', text: 'Photo de l\'équipe manquante' }
            ]
          }
        },
        missingElements: [
          {
            element: 'Témoignages vidéo',
            impact: 'High',
            description: 'Les témoignages vidéo augmentent la crédibilité de 34%',
            implementation: 'Filmer 2-3 témoignages clients authentiques'
          },
          {
            element: 'Badges de sécurité',
            impact: 'Medium',
            description: 'Norton, McAfee ou badges similaires rassurent',
            implementation: 'Ajouter badges de sécurité près du formulaire'
          },
          {
            element: 'Avis temps réel',
            impact: 'High',
            description: 'Notifications d\'avis en temps réel créent l\'urgence',
            implementation: 'Intégrer widget d\'avis dynamique'
          },
          {
            element: 'Garanties',
            impact: 'Medium',
            description: 'Garantie satisfait ou remboursé rassure',
            implementation: 'Afficher garantie avec icône sécurité'
          }
        ],
        recommendations: [
          'Ajouter des témoignages vidéo authentiques',
          'Intégrer des avis Google/Facebook en temps réel',
          'Mettre en avant les garanties et politiques',
          'Afficher des badges de sécurité reconnus',
          'Ajouter des photos de l\'équipe et dirigeants',
          'Créer une section "Ils nous font confiance"'
        ],
        conversionImpact: {
          current: 3.2,
          optimized: 4.5,
          increase: 41
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

  const getIssueIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-orange-500" />;
      case 'error': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default: return null;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-orange-100 text-orange-800';
      default: return 'bg-green-100 text-green-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'testimonials': return <Users className="w-5 h-5" />;
      case 'credentials': return <Award className="w-5 h-5" />;
      case 'security': return <Shield className="w-5 h-5" />;
      case 'social': return <Star className="w-5 h-5" />;
      case 'contact': return <Eye className="w-5 h-5" />;
      default: return <CheckCircle className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-4">
          <Shield className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Trust Signal Analyzer</h2>
        <p className="text-slate-600">Optimisation signaux de confiance et crédibilité</p>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <div className="flex space-x-4 mb-6">
          <input
            type="url"
            placeholder="https://votre-landing-page.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <button
            onClick={analyzeTrustSignals}
            disabled={!url || isAnalyzing}
            className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {isAnalyzing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Analyse...</span>
              </>
            ) : (
              <>
                <Eye className="w-4 h-4" />
                <span>Analyser Confiance</span>
              </>
            )}
          </button>
        </div>

        {analysis && (
          <div className="space-y-6">
            {/* Score global */}
            <div className="bg-slate-50 rounded-lg p-6 text-center">
              <div className={`text-4xl font-bold ${getScoreColor(analysis.overallScore)} mb-2`}>
                {analysis.overallScore}/100
              </div>
              <p className="font-medium text-slate-800 mb-1">Score de Confiance</p>
              <p className="text-sm text-slate-600">Niveau: {analysis.trustLevel}</p>
            </div>

            {/* Analyse par catégorie */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(analysis.categories).map(([category, data]: [string, any]) => (
                <div key={category} className="bg-white border border-slate-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      {getCategoryIcon(category)}
                      <h4 className="font-medium text-slate-800 capitalize">
                        {category === 'testimonials' ? 'Témoignages' :
                         category === 'credentials' ? 'Crédibilité' :
                         category === 'security' ? 'Sécurité' :
                         category === 'social' ? 'Social' : 'Contact'}
                      </h4>
                    </div>
                    <div className={`text-lg font-bold ${getScoreColor(data.score)}`}>
                      {data.score}
                    </div>
                  </div>
                  <div className="space-y-2">
                    {data.issues.map((issue: any, index: number) => (
                      <div key={index} className="flex items-start space-x-2 text-sm">
                        {getIssueIcon(issue.type)}
                        <span className="text-slate-600">{issue.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Éléments manquants */}
            <div className="bg-white border border-slate-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">
                Opportunités d'Amélioration
              </h3>
              <div className="space-y-4">
                {analysis.missingElements.map((element: any, index: number) => (
                  <div key={index} className="border border-slate-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(element.impact)}`}>
                          Impact {element.impact}
                        </span>
                        <h4 className="font-medium text-slate-800">{element.element}</h4>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-slate-600 text-sm">{element.description}</p>
                      <p className="text-blue-600 text-sm">
                        <strong>Action:</strong> {element.implementation}
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
            </div>

            {/* Recommandations */}
            <div className="bg-white border border-slate-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">
                Plan d'Action Prioritaire
              </h3>
              <div className="space-y-3">
                {analysis.recommendations.map((rec: string, index: number) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-slate-50 rounded-lg">
                    <div className="w-6 h-6 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                      {index + 1}
                    </div>
                    <span className="text-slate-700">{rec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bibliothèque d'exemples */}
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">
                💡 Exemples de Signaux de Confiance Efficaces
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-medium text-slate-800 mb-2">🎯 Témoignages</h4>
                  <ul className="space-y-1 text-slate-600">
                    <li>• "Résultats en 30 jours" - Jean D., CEO</li>
                    <li>• Témoignages vidéo de 60-90 secondes</li>
                    <li>• Photos réelles des clients</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-slate-800 mb-2">🏆 Crédibilité</h4>
                  <ul className="space-y-1 text-slate-600">
                    <li>• "Utilisé par 10,000+ entreprises"</li>
                    <li>• Logos de clients prestigieux</li>
                    <li>• Certifications ISO/qualité</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-slate-800 mb-2">🔒 Sécurité</h4>
                  <ul className="space-y-1 text-slate-600">
                    <li>• "Satisfait ou remboursé 30 jours"</li>
                    <li>• Badges SSL/Norton</li>
                    <li>• "Données sécurisées RG
PD"</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-slate-800 mb-2">👥 Social</h4>
                  <ul className="space-y-1 text-slate-600">
                    <li>• "127 personnes ont acheté aujourd'hui"</li>
                    <li>• Avis Google 4.8/5 (234 avis)</li>
                    <li>• Mentions presse récentes</li>
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
