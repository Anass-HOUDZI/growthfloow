
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Download, TrendingUp, Target, Eye, Star } from 'lucide-react';

interface Keyword {
  keyword: string;
  searchVolume: number;
  difficulty: number;
  cpc: number;
  trend: number;
  intent: 'informational' | 'commercial' | 'transactional' | 'navigational';
  competition: 'low' | 'medium' | 'high';
  opportunity: number;
}

interface KeywordResultsProps {
  keywords: Keyword[];
  onExport: (format: 'csv' | 'excel') => void;
}

const getDifficultyColor = (difficulty: number) => {
  if (difficulty <= 30) return 'text-green-600 bg-green-100';
  if (difficulty <= 60) return 'text-yellow-600 bg-yellow-100';
  return 'text-red-600 bg-red-100';
};

const getIntentColor = (intent: string) => {
  switch (intent) {
    case 'transactional': return 'bg-green-100 text-green-800';
    case 'commercial': return 'bg-blue-100 text-blue-800';
    case 'informational': return 'bg-purple-100 text-purple-800';
    case 'navigational': return 'bg-gray-100 text-gray-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const formatNumber = (num: number) => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
};

export const KeywordResults: React.FC<KeywordResultsProps> = ({ keywords, onExport }) => {
  const totalOpportunity = keywords.reduce((sum, k) => sum + k.opportunity, 0);
  const avgDifficulty = keywords.reduce((sum, k) => sum + k.difficulty, 0) / keywords.length;
  const highOpportunityKeywords = keywords.filter(k => k.opportunity >= 70).length;

  return (
    <div className="space-y-6">
      {/* Métriques de synthèse */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm text-slate-600">Mots-clés trouvés</p>
                <p className="text-2xl font-bold">{keywords.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <div>
                <p className="text-sm text-slate-600">Opportunités fortes</p>
                <p className="text-2xl font-bold">{highOpportunityKeywords}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-sm text-slate-600">Score opportunité</p>
                <p className="text-2xl font-bold">{Math.round(totalOpportunity / keywords.length)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Eye className="w-5 h-5 text-purple-500" />
              <div>
                <p className="text-sm text-slate-600">Difficulté moy.</p>
                <p className="text-2xl font-bold">{Math.round(avgDifficulty)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions d'export */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Résultats de l'analyse</span>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={() => onExport('csv')}>
                <Download className="w-4 h-4 mr-2" />
                CSV
              </Button>
              <Button variant="outline" size="sm" onClick={() => onExport('excel')}>
                <Download className="w-4 h-4 mr-2" />
                Excel
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mot-clé</TableHead>
                <TableHead className="text-center">Volume</TableHead>
                <TableHead className="text-center">Difficulté</TableHead>
                <TableHead className="text-center">CPC</TableHead>
                <TableHead className="text-center">Intention</TableHead>
                <TableHead className="text-center">Opportunité</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {keywords.map((keyword, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{keyword.keyword}</TableCell>
                  <TableCell className="text-center">{formatNumber(keyword.searchVolume)}</TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <Badge className={getDifficultyColor(keyword.difficulty)}>
                        {keyword.difficulty}%
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">€{keyword.cpc.toFixed(2)}</TableCell>
                  <TableCell className="text-center">
                    <Badge className={getIntentColor(keyword.intent)}>
                      {keyword.intent}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <Progress value={keyword.opportunity} className="w-16" />
                      <span className="text-sm font-medium">{keyword.opportunity}%</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
