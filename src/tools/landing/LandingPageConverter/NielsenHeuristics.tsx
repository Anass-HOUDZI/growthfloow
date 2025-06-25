
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Brain, CheckCircle, XCircle, AlertTriangle, Lightbulb } from 'lucide-react';

interface HeuristicResult {
  id: string;
  name: string;
  description: string;
  score: number;
  status: 'excellent' | 'good' | 'needs-improvement' | 'critical';
  findings: string[];
  recommendations: string[];
}

interface NielsenHeuristicsProps {
  results: HeuristicResult[];
}

export const NielsenHeuristics: React.FC<NielsenHeuristicsProps> = ({ results }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'good': return <CheckCircle className="w-5 h-5 text-blue-500" />;
      case 'needs-improvement': return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'critical': return <XCircle className="w-5 h-5 text-red-500" />;
      default: return <AlertTriangle className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-100 text-green-800 border-green-200';
      case 'good': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'needs-improvement': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const overallScore = Math.round(results.reduce((sum, result) => sum + result.score, 0) / results.length);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Brain className="w-5 h-5" />
          <span>Heuristiques UX de Nielsen</span>
        </CardTitle>
        <div className="flex items-center space-x-4">
          <div className="text-3xl font-bold text-purple-600">{overallScore}/100</div>
          <div className="flex-1">
            <Progress value={overallScore} className="h-3" />
            <p className="text-sm text-slate-600 mt-1">Score UX global</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {results.map((result) => (
            <Card key={result.id} className="border-l-4 border-l-purple-500">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    {getStatusIcon(result.status)}
                    <div>
                      <h4 className="font-semibold text-slate-800">{result.name}</h4>
                      <p className="text-sm text-slate-600 mt-1">{result.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(result.status)}>
                      {result.status.replace('-', ' ')}
                    </Badge>
                    <div className="text-lg font-bold text-slate-800">{result.score}/100</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <Progress value={result.score} className="h-2 mb-4" />
                
                {result.findings.length > 0 && (
                  <div className="mb-4">
                    <h5 className="text-sm font-medium text-slate-700 mb-2 flex items-center space-x-1">
                      <AlertTriangle className="w-4 h-4" />
                      <span>Observations</span>
                    </h5>
                    <div className="space-y-1">
                      {result.findings.map((finding, index) => (
                        <div key={index} className="text-sm text-slate-600 flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0" />
                          <span>{finding}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {result.recommendations.length > 0 && (
                  <div>
                    <h5 className="text-sm font-medium text-slate-700 mb-2 flex items-center space-x-1">
                      <Lightbulb className="w-4 h-4" />
                      <span>Recommandations</span>
                    </h5>
                    <div className="space-y-1">
                      {result.recommendations.map((rec, index) => (
                        <div key={index} className="text-sm text-green-700 flex items-start space-x-2">
                          <CheckCircle className="w-3 h-3 mt-0.5 flex-shrink-0" />
                          <span>{rec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
