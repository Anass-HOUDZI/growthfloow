
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, AlertTriangle, XCircle, TrendingUp, Eye, Zap } from 'lucide-react';

interface AuditResultsProps {
  analysis: {
    overallScore: number;
    elements: {
      [key: string]: {
        score: number;
        issues: string[];
        recommendations: string[];
      };
    };
    recommendations: Array<{
      priority: 'High' | 'Medium' | 'Low';
      element: string;
      issue: string;
      impact: string;
      effort: string;
    }>;
    technicalMetrics: {
      loadTime: number;
      mobileScore: number;
      accessibilityScore: number;
      seoScore: number;
    };
  };
}

export const AuditResults: React.FC<AuditResultsProps> = ({ analysis }) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <CheckCircle className="w-5 h-5 text-green-500" />;
    if (score >= 60) return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
    return <XCircle className="w-5 h-5 text-red-500" />;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Score Global */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5" />
            <span>Score de Conversion Global</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center mb-6">
            <div className={`text-6xl font-bold ${getScoreColor(analysis.overallScore)}`}>
              {analysis.overallScore}
              <span className="text-2xl">/100</span>
            </div>
          </div>
          <Progress value={analysis.overallScore} className="h-3 mb-4" />
          <div className="text-center">
            <Badge variant={analysis.overallScore >= 80 ? "default" : analysis.overallScore >= 60 ? "secondary" : "destructive"}>
              {analysis.overallScore >= 80 ? 'Excellent' : 
               analysis.overallScore >= 60 ? 'Bon - Améliorable' : 'Critique - Action requise'}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Métriques Techniques */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="w-5 h-5" />
            <span>Métriques Techniques</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-slate-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{analysis.technicalMetrics.loadTime}s</div>
              <div className="text-sm text-slate-600">Temps de chargement</div>
            </div>
            <div className="text-center p-4 bg-slate-50 rounded-lg">
              <div className={`text-2xl font-bold ${getScoreColor(analysis.technicalMetrics.mobileScore)}`}>
                {analysis.technicalMetrics.mobileScore}
              </div>
              <div className="text-sm text-slate-600">Score Mobile</div>
            </div>
            <div className="text-center p-4 bg-slate-50 rounded-lg">
              <div className={`text-2xl font-bold ${getScoreColor(analysis.technicalMetrics.accessibilityScore)}`}>
                {analysis.technicalMetrics.accessibilityScore}
              </div>
              <div className="text-sm text-slate-600">Accessibilité</div>
            </div>
            <div className="text-center p-4 bg-slate-50 rounded-lg">
              <div className={`text-2xl font-bold ${getScoreColor(analysis.technicalMetrics.seoScore)}`}>
                {analysis.technicalMetrics.seoScore}
              </div>
              <div className="text-sm text-slate-600">SEO Technique</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Analyse par Élément */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Eye className="w-5 h-5" />
            <span>Analyse par Élément UX</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(analysis.elements).map(([key, element]) => (
              <div key={key} className="border border-slate-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    {getScoreIcon(element.score)}
                    <h4 className="font-semibold text-slate-800 capitalize">
                      {key.replace('_', ' ')}
                    </h4>
                  </div>
                  <div className={`text-xl font-bold ${getScoreColor(element.score)}`}>
                    {element.score}/100
                  </div>
                </div>
                
                <Progress value={element.score} className="h-2 mb-3" />
                
                <div className="space-y-2">
                  <div>
                    <h5 className="text-sm font-medium text-slate-700 mb-1">Problèmes identifiés :</h5>
                    {element.issues.map((issue, index) => (
                      <div key={index} className="text-xs text-red-600 flex items-start space-x-1">
                        <XCircle className="w-3 h-3 mt-0.5 flex-shrink-0" />
                        <span>{issue}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div>
                    <h5 className="text-sm font-medium text-slate-700 mb-1">Recommandations :</h5>
                    {element.recommendations.map((rec, index) => (
                      <div key={index} className="text-xs text-green-600 flex items-start space-x-1">
                        <CheckCircle className="w-3 h-3 mt-0.5 flex-shrink-0" />
                        <span>{rec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommandations Prioritaires */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5" />
            <span>Plan d'Action Prioritaire</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analysis.recommendations.map((rec, index) => (
              <div key={index} className="flex items-start space-x-4 p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                <div className="flex-shrink-0">
                  <Badge className={`${getPriorityColor(rec.priority)} text-xs`}>
                    {rec.priority}
                  </Badge>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-slate-800">{rec.element}</h4>
                      <p className="text-sm text-slate-600 mt-1">{rec.issue}</p>
                    </div>
                    
                    <div className="text-right ml-4 flex-shrink-0">
                      <div className="text-sm font-medium text-green-600">{rec.impact}</div>
                      <div className="text-xs text-slate-500">{rec.effort}</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex-shrink-0 text-slate-400 font-bold text-lg">
                  #{index + 1}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
