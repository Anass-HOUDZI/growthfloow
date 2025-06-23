
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle, 
  Target,
  DollarSign,
  ArrowRight
} from 'lucide-react';

interface Recommendation {
  id: string;
  type: 'increase' | 'decrease' | 'reallocate' | 'optimize';
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  impact: number;
  confidence: number;
  currentValue: number;
  suggestedValue: number;
  channel?: string;
}

interface BudgetRecommendationsProps {
  recommendations: Recommendation[];
  onApplyRecommendation: (recommendationId: string) => void;
  onDismissRecommendation: (recommendationId: string) => void;
}

export const BudgetRecommendations: React.FC<BudgetRecommendationsProps> = ({
  recommendations,
  onApplyRecommendation,
  onDismissRecommendation
}) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'increase': return <TrendingUp className="w-5 h-5 text-green-600" />;
      case 'decrease': return <TrendingDown className="w-5 h-5 text-red-600" />;
      case 'reallocate': return <Target className="w-5 h-5 text-blue-600" />;
      case 'optimize': return <CheckCircle className="w-5 h-5 text-purple-600" />;
      default: return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'increase': return 'Augmenter';
      case 'decrease': return 'Réduire';
      case 'reallocate': return 'Réallouer';
      case 'optimize': return 'Optimiser';
      default: return 'Action';
    }
  };

  const sortedRecommendations = [...recommendations].sort((a, b) => {
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    return (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0);
  });

  const totalImpact = recommendations.reduce((sum, rec) => sum + rec.impact, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Recommandations d'Optimisation</h3>
          <p className="text-sm text-slate-600">
            Impact potentiel total: +{totalImpact.toLocaleString()}€
          </p>
        </div>
        <Badge variant="outline" className="text-blue-600">
          {recommendations.length} recommandations
        </Badge>
      </div>

      {/* Résumé des impacts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <DollarSign className="w-5 h-5 text-green-600" />
            Impact Potentiel
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['increase', 'decrease', 'reallocate', 'optimize'].map((type) => {
              const typeRecs = recommendations.filter(r => r.type === type);
              const typeImpact = typeRecs.reduce((sum, r) => sum + r.impact, 0);
              return (
                <div key={type} className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    {getTypeIcon(type)}
                  </div>
                  <div className="text-sm text-slate-600">{getTypeLabel(type)}</div>
                  <div className="font-semibold">+{typeImpact.toLocaleString()}€</div>
                  <div className="text-xs text-slate-500">{typeRecs.length} actions</div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Liste des recommandations */}
      <div className="space-y-4">
        {sortedRecommendations.map((recommendation) => (
          <Card key={recommendation.id} className="border-l-4 border-l-blue-500">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  {getTypeIcon(recommendation.type)}
                  <div>
                    <h4 className="font-semibold">{recommendation.title}</h4>
                    <p className="text-sm text-slate-600">{recommendation.description}</p>
                  </div>
                </div>
                <Badge className={getPriorityColor(recommendation.priority)}>
                  {recommendation.priority}
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <div className="text-xs text-slate-500 mb-1">Impact Estimé</div>
                  <div className="flex items-center">
                    <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                    <span className="font-semibold text-green-600">
                      +{recommendation.impact.toLocaleString()}€
                    </span>
                  </div>
                </div>

                <div>
                  <div className="text-xs text-slate-500 mb-1">Confiance</div>
                  <div className="flex items-center">
                    <Progress value={recommendation.confidence} className="flex-1 mr-2 h-2" />
                    <span className="text-sm font-medium">{recommendation.confidence}%</span>
                  </div>
                </div>

                <div>
                  <div className="text-xs text-slate-500 mb-1">Changement Suggéré</div>
                  <div className="flex items-center text-sm">
                    <span>{recommendation.currentValue.toLocaleString()}€</span>
                    <ArrowRight className="w-4 h-4 mx-2 text-slate-400" />
                    <span className="font-semibold">
                      {recommendation.suggestedValue.toLocaleString()}€
                    </span>
                  </div>
                </div>
              </div>

              {recommendation.channel && (
                <div className="mb-4">
                  <Badge variant="outline" className="text-blue-600">
                    Canal: {recommendation.channel}
                  </Badge>
                </div>
              )}

              <div className="flex gap-2">
                <Button 
                  onClick={() => onApplyRecommendation(recommendation.id)}
                  size="sm"
                >
                  Appliquer
                </Button>
                <Button 
                  onClick={() => onDismissRecommendation(recommendation.id)}
                  variant="outline" 
                  size="sm"
                >
                  Ignorer
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {recommendations.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Budget Optimisé!</h3>
            <p className="text-slate-600">
              Votre allocation budgétaire semble déjà optimale selon nos analyses.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
