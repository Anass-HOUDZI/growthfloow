
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ExternalLink, Globe, Star, TrendingUp } from 'lucide-react';

interface SerpResult {
  position: number;
  title: string;
  url: string;
  domain: string;
  snippet: string;
  domainAuthority: number;
  pageAuthority: number;
  features: string[];
}

interface SerpAnalysisProps {
  keyword: string;
  results: SerpResult[];
  competitionLevel: 'low' | 'medium' | 'high';
  featuredSnippetOpportunity: boolean;
}

const getCompetitionColor = (level: string) => {
  switch (level) {
    case 'low': return 'bg-green-100 text-green-800';
    case 'medium': return 'bg-yellow-100 text-yellow-800';
    case 'high': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export const SerpAnalysis: React.FC<SerpAnalysisProps> = ({
  keyword,
  results,
  competitionLevel,
  featuredSnippetOpportunity
}) => {
  const avgDA = results.reduce((sum, r) => sum + r.domainAuthority, 0) / results.length;
  const avgPA = results.reduce((sum, r) => sum + r.pageAuthority, 0) / results.length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Globe className="w-5 h-5 text-blue-500" />
          <span>Analyse SERP pour "{keyword}"</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Métriques de concurrence */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-sm text-slate-600">Niveau de concurrence</p>
            <Badge className={getCompetitionColor(competitionLevel)}>
              {competitionLevel.toUpperCase()}
            </Badge>
          </div>
          <div className="text-center">
            <p className="text-sm text-slate-600">DA moyen</p>
            <p className="text-2xl font-bold">{Math.round(avgDA)}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-slate-600">PA moyen</p>
            <p className="text-2xl font-bold">{Math.round(avgPA)}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-slate-600">Featured Snippet</p>
            <div className="flex items-center justify-center">
              {featuredSnippetOpportunity ? (
                <div className="flex items-center space-x-1 text-green-600">
                  <Star className="w-4 h-4" />
                  <span className="text-sm font-medium">Opportunité</span>
                </div>
              ) : (
                <span className="text-sm text-slate-500">Occupé</span>
              )}
            </div>
          </div>
        </div>

        {/* Résultats SERP */}
        <div className="space-y-3">
          <h4 className="font-semibold text-slate-800">Top 10 des résultats</h4>
          {results.map((result, index) => (
            <div key={index} className="border rounded-lg p-4 hover:bg-slate-50 transition-colors">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
                    #{result.position}
                  </span>
                  <h5 className="font-medium text-slate-800 truncate max-w-md">
                    {result.title}
                  </h5>
                </div>
                <a 
                  href={result.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-700"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
              
              <p className="text-sm text-slate-600 mb-3 line-clamp-2">
                {result.snippet}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-slate-500">{result.domain}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-slate-400">DA:</span>
                    <Progress value={result.domainAuthority} className="w-12 h-2" />
                    <span className="text-xs font-medium">{result.domainAuthority}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-slate-400">PA:</span>
                    <Progress value={result.pageAuthority} className="w-12 h-2" />
                    <span className="text-xs font-medium">{result.pageAuthority}</span>
                  </div>
                </div>
                
                {result.features.length > 0 && (
                  <div className="flex space-x-1">
                    {result.features.map((feature, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Recommandations */}
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="w-5 h-5 text-blue-500" />
            <h4 className="font-semibold text-blue-800">Recommandations stratégiques</h4>
          </div>
          <ul className="text-sm text-blue-700 space-y-1">
            {avgDA > 60 && (
              <li>• Concurrence forte : misez sur la longue traîne et le contenu de niche</li>
            )}
            {featuredSnippetOpportunity && (
              <li>• Opportunité de featured snippet : structurez votre contenu en réponses directes</li>
            )}
            {avgPA < 40 && (
              <li>• Pages concurrentes faibles : opportunité d'optimisation on-page</li>
            )}
            <li>• Analysez les gaps de contenu des 3 premiers résultats pour vous différencier</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
