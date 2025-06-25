
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Zap, Smartphone, Globe, Shield, Code } from 'lucide-react';

interface TechnicalMetric {
  name: string;
  value: number | string;
  score: number;
  unit?: string;
  benchmark: string;
  impact: 'high' | 'medium' | 'low';
  recommendations: string[];
}

interface TechnicalAnalysisProps {
  metrics: {
    performance: TechnicalMetric[];
    accessibility: TechnicalMetric[];
    seo: TechnicalMetric[];
    security: TechnicalMetric[];
    mobile: TechnicalMetric[];
  };
}

export const TechnicalAnalysis: React.FC<TechnicalAnalysisProps> = ({ metrics }) => {
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const categories = [
    { key: 'performance', name: 'Performance', icon: Zap, color: 'bg-blue-500' },
    { key: 'mobile', name: 'Mobile UX', icon: Smartphone, color: 'bg-green-500' },
    { key: 'accessibility', name: 'Accessibilité', icon: Globe, color: 'bg-purple-500' },
    { key: 'seo', name: 'SEO Technique', icon: Code, color: 'bg-orange-500' },
    { key: 'security', name: 'Sécurité', icon: Shield, color: 'bg-red-500' }
  ];

  return (
    <div className="space-y-6">
      {categories.map((category) => {
        const categoryMetrics = metrics[category.key as keyof typeof metrics];
        const avgScore = Math.round(categoryMetrics.reduce((sum, metric) => sum + metric.score, 0) / categoryMetrics.length);
        const Icon = category.icon;

        return (
          <Card key={category.key}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <div className={`w-8 h-8 ${category.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <span>{category.name}</span>
                <Badge className={`ml-auto ${getScoreColor(avgScore).replace('text-', 'bg-').replace('-600', '-100')} ${getScoreColor(avgScore).replace('-600', '-800')}`}>
                  {avgScore}/100
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {categoryMetrics.map((metric, index) => (
                  <div key={index} className="border border-slate-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-slate-800">{metric.name}</h4>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-lg font-bold text-slate-900">
                            {metric.value}{metric.unit}
                          </span>
                          <Badge className={getImpactColor(metric.impact)}>
                            Impact {metric.impact}
                          </Badge>
                        </div>
                      </div>
                      <div className={`text-2xl font-bold ${getScoreColor(metric.score)}`}>
                        {metric.score}/100
                      </div>
                    </div>

                    <Progress value={metric.score} className="h-2 mb-3" />

                    <div className="text-sm text-slate-600 mb-3">
                      <span className="font-medium">Benchmark : </span>
                      {metric.benchmark}
                    </div>

                    {metric.recommendations.length > 0 && (
                      <div>
                        <h5 className="text-sm font-medium text-slate-700 mb-2">Recommandations :</h5>
                        <div className="space-y-1">
                          {metric.recommendations.map((rec, recIndex) => (
                            <div key={recIndex} className="text-sm text-slate-600 flex items-start space-x-2">
                              <div className="w-1 h-1 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                              <span>{rec}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
