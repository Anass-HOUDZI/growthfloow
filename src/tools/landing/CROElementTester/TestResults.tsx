
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, TrendingUp, AlertTriangle, BarChart3, Target } from 'lucide-react';

interface TestResultsProps {
  results: {
    isComplete: boolean;
    winner: string | null;
    confidence: number;
    improvement: number;
    pValue: number;
    variants: {
      [key: string]: {
        visitors: number;
        conversions: number;
        conversionRate: number;
        confidenceInterval: [number, number];
      };
    };
    statisticalSignificance: boolean;
    recommendations: string[];
    riskAssessment: string;
  };
  testDuration: number;
}

export const TestResults: React.FC<TestResultsProps> = ({ results, testDuration }) => {
  const getSignificanceColor = (pValue: number) => {
    if (pValue <= 0.01) return 'text-green-600';
    if (pValue <= 0.05) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getConfidenceLevel = (pValue: number) => {
    if (pValue <= 0.01) return '99%';
    if (pValue <= 0.05) return '95%';
    return '< 95%';
  };

  const getVariantColor = (variantId: string) => {
    if (results.winner === variantId) return 'bg-green-100 border-green-500';
    return 'bg-white border-slate-200';
  };

  return (
    <div className="space-y-6">
      {/* Résumé des résultats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5" />
            <span>Résultats du Test</span>
            {results.isComplete && (
              <Badge className="bg-green-100 text-green-800">Terminé</Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4 text-center">
              <TrendingUp className="w-6 h-6 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-600">
                {results.improvement > 0 ? '+' : ''}{results.improvement.toFixed(1)}%
              </div>
              <p className="text-sm text-slate-600">Amélioration</p>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4 text-center">
              <Target className="w-6 h-6 text-blue-500 mx-auto mb-2" />
              <div className={`text-2xl font-bold ${getSignificanceColor(results.pValue)}`}>
                {getConfidenceLevel(results.pValue)}
              </div>
              <p className="text-sm text-slate-600">Confiance</p>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">
                {results.pValue.toFixed(3)}
              </div>
              <p className="text-sm text-slate-600">P-value</p>
            </div>

            <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">
                {testDuration}j
              </div>
              <p className="text-sm text-slate-600">Durée</p>
            </div>
          </div>

          {/* Statut de significativité */}
          <div className={`p-4 rounded-lg border-l-4 ${
            results.statisticalSignificance 
              ? 'bg-green-50 border-green-400' 
              : 'bg-yellow-50 border-yellow-400'
          }`}>
            <div className="flex items-center space-x-2">
              {results.statisticalSignificance ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-yellow-500" />
              )}
              <h4 className="font-medium">
                {results.statisticalSignificance 
                  ? 'Résultats statistiquement significatifs' 
                  : 'Résultats non significatifs'}
              </h4>
            </div>
            <p className="text-sm text-slate-600 mt-1">
              {results.statisticalSignificance
                ? 'Les résultats sont fiables et peuvent être implémentés.'
                : 'Continuez le test ou augmentez la taille de l\'échantillon.'}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Détail des variants */}
      <Card>
        <CardHeader>
          <CardTitle>Performance des Variants</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(results.variants).map(([variantId, data]) => (
              <div 
                key={variantId} 
                className={`p-4 rounded-lg border-2 transition-colors ${getVariantColor(variantId)}`}
              >
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-semibold text-slate-800 capitalize">
                      {variantId === 'control' ? 'Contrôle' : `Variante ${variantId.slice(-1)}`}
                    </h4>
                    {results.winner === variantId && (
                      <Badge className="bg-green-100 text-green-800">Gagnant</Badge>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-slate-800">
                      {data.conversionRate.toFixed(2)}%
                    </div>
                    <div className="text-xs text-slate-500">
                      IC: {data.confidenceInterval[0].toFixed(2)}% - {data.confidenceInterval[1].toFixed(2)}%
                    </div>
                  </div>
                </div>

                <Progress value={data.conversionRate * 10} className="h-2 mb-3" />

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-slate-600">Visiteurs:</span>
                    <span className="font-medium ml-2">{data.visitors.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-slate-600">Conversions:</span>
                    <span className="font-medium ml-2">{data.conversions.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommandations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5" />
            <span>Recommandations</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {results.recommendations.map((recommendation, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-slate-50 rounded-lg">
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-medium text-blue-600">{index + 1}</span>
                </div>
                <p className="text-sm text-slate-700">{recommendation}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
            <h5 className="font-medium text-amber-800 mb-2">Évaluation des risques</h5>
            <p className="text-sm text-amber-700">{results.riskAssessment}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
