
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BarChart3, Target, TrendingUp, AlertCircle } from 'lucide-react';

interface BenchmarkMetrics {
  avgSearchVolume: number;
  avgDifficulty: number;
  avgCPC: number;
  topKeywordTypes: string[];
  seasonalTrends: { month: string; volume: number }[];
  competitorInsights: {
    strongCompetitors: number;
    contentGaps: number;
    opportunities: number;
  };
}

interface BenchmarkDataProps {
  industry: string;
  metrics: BenchmarkMetrics;
  userMetrics: {
    avgVolume: number;
    avgDifficulty: number;
    avgCPC: number;
  };
}

const industryBenchmarks = {
  'ecommerce': { name: 'E-commerce', difficulty: 65, cpc: 1.2, volume: 8500 },
  'saas': { name: 'SaaS/Tech', difficulty: 72, cpc: 3.8, volume: 3200 },
  'finance': { name: 'Finance', difficulty: 78, cpc: 4.5, volume: 12000 },
  'health': { name: 'Santé', difficulty: 68, cpc: 2.1, volume: 15000 },
  'education': { name: 'Éducation', difficulty: 55, cpc: 1.8, volume: 6800 },
  'travel': { name: 'Voyage', difficulty: 60, cpc: 1.5, volume: 22000 },
  'food': { name: 'Alimentation', difficulty: 45, cpc: 0.8, volume: 18000 },
  'fashion': { name: 'Mode', difficulty: 58, cpc: 1.1, volume: 14000 },
  'real-estate': { name: 'Immobilier', difficulty: 70, cpc: 2.8, volume: 9500 },
  'automotive': { name: 'Automobile', difficulty: 62, cpc: 2.2, volume: 11000 }
};

const getPerformanceColor = (user: number, benchmark: number, inverse = false) => {
  const ratio = user / benchmark;
  if (inverse) {
    if (ratio <= 0.8) return 'text-green-600';
    if (ratio <= 1.2) return 'text-yellow-600';
    return 'text-red-600';
  } else {
    if (ratio >= 1.2) return 'text-green-600';
    if (ratio >= 0.8) return 'text-yellow-600';
    return 'text-red-600';
  }
};

export const BenchmarkData: React.FC<BenchmarkDataProps> = ({
  industry,
  metrics,
  userMetrics
}) => {
  const benchmark = industryBenchmarks[industry] || industryBenchmarks['ecommerce'];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-purple-500" />
            <span>Benchmarks sectoriels - {benchmark.name}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Volume de recherche */}
            <div className="space-y-3">
              <h4 className="font-medium text-slate-800">Volume de recherche</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Votre moyenne</span>
                  <span className={`font-bold ${getPerformanceColor(userMetrics.avgVolume, benchmark.volume)}`}>
                    {userMetrics.avgVolume.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Benchmark secteur</span>
                  <span className="font-medium">{benchmark.volume.toLocaleString()}</span>
                </div>
                <Progress 
                  value={(userMetrics.avgVolume / benchmark.volume) * 100} 
                  className="h-2"
                />
              </div>
            </div>

            {/* Difficulté */}
            <div className="space-y-3">
              <h4 className="font-medium text-slate-800">Difficulté SEO</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Votre moyenne</span>
                  <span className={`font-bold ${getPerformanceColor(userMetrics.avgDifficulty, benchmark.difficulty, true)}`}>
                    {userMetrics.avgDifficulty.toFixed(0)}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Benchmark secteur</span>
                  <span className="font-medium">{benchmark.difficulty}%</span>
                </div>
                <Progress 
                  value={userMetrics.avgDifficulty} 
                  className="h-2"
                />
              </div>
            </div>

            {/* CPC */}
            <div className="space-y-3">
              <h4 className="font-medium text-slate-800">Coût par clic</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Votre moyenne</span>
                  <span className={`font-bold ${getPerformanceColor(userMetrics.avgCPC, benchmark.cpc)}`}>
                    €{userMetrics.avgCPC.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Benchmark secteur</span>
                  <span className="font-medium">€{benchmark.cpc.toFixed(2)}</span>
                </div>
                <Progress 
                  value={(userMetrics.avgCPC / benchmark.cpc) * 100} 
                  className="h-2"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Insights concurrentiels */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="w-5 h-5 text-green-500" />
            <span>Insights concurrentiels</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-red-600">{metrics.competitorInsights.strongCompetitors}</p>
              <p className="text-sm text-red-700">Concurrents forts</p>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <TrendingUp className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-yellow-600">{metrics.competitorInsights.contentGaps}</p>
              <p className="text-sm text-yellow-700">Gaps de contenu</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <Target className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-green-600">{metrics.competitorInsights.opportunities}</p>
              <p className="text-sm text-green-700">Opportunités</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Types de mots-clés populaires */}
      <Card>
        <CardHeader>
          <CardTitle>Types de mots-clés populaires dans votre secteur</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {metrics.topKeywordTypes.map((type, index) => (
              <Badge key={index} variant="outline" className="text-sm">
                {type}
              </Badge>
            ))}
          </div>
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-800 mb-2">💡 Conseil stratégique</h4>
            <p className="text-sm text-blue-700">
              Votre performance est{' '}
              {userMetrics.avgDifficulty < benchmark.difficulty ? 'excellente' : 'à optimiser'}{' '}
              par rapport aux standards du secteur {benchmark.name.toLowerCase()}.
              {userMetrics.avgVolume > benchmark.volume && ' Vous ciblez des mots-clés à fort volume, c\'est très bien !'}
              {userMetrics.avgDifficulty < benchmark.difficulty && ' Continuez à cibler des mots-clés moins concurrentiels.'}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
