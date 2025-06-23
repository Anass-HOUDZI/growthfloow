
import React, { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Target, Search, BarChart3, Globe } from "lucide-react";
import { KeywordForm } from './KeywordForm';
import { KeywordResults } from './KeywordResults';
import { SerpAnalysis } from './SerpAnalysis';
import { BenchmarkData } from './BenchmarkData';
import { 
  generateLongTailKeywords, 
  calculateKeywordDifficulty, 
  calculateOpportunityScore,
  generateMockSerpResults,
  exportToCSV,
  exportToExcel
} from './utils';

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

export const KeywordOpportunityFinder: React.FC = () => {
  const [seedKeyword, setSeedKeyword] = useState('');
  const [industry, setIndustry] = useState('ecommerce');
  const [country, setCountry] = useState('fr');
  const [isLoading, setIsLoading] = useState(false);
  const [keywords, setKeywords] = useState<Keyword[]>([]);
  const [selectedKeyword, setSelectedKeyword] = useState<string>('');
  const [serpResults, setSerpResults] = useState<any[]>([]);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);

  const handleAnalyze = async () => {
    if (!seedKeyword.trim()) return;
    
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate long-tail keywords
    const longTailKeywords = generateLongTailKeywords(seedKeyword, industry);
    
    // Generate keyword data with realistic metrics
    const keywordData: Keyword[] = [seedKeyword, ...longTailKeywords].map(keyword => {
      const searchVolume = Math.floor(Math.random() * 50000) + 100;
      const cpc = parseFloat((Math.random() * 5).toFixed(2));
      const competition = ['low', 'medium', 'high'][Math.floor(Math.random() * 3)] as 'low' | 'medium' | 'high';
      const difficulty = calculateKeywordDifficulty(searchVolume, competition, cpc, industry);
      const trend = Math.random() * 2 - 1; // -1 to 1
      const intent = ['informational', 'commercial', 'transactional', 'navigational'][Math.floor(Math.random() * 4)] as any;
      const opportunity = calculateOpportunityScore(searchVolume, difficulty, cpc, trend);
      
      return {
        keyword,
        searchVolume,
        difficulty,
        cpc,
        trend,
        intent,
        competition,
        opportunity: Math.round(opportunity)
      };
    });
    
    // Sort by opportunity score descending
    keywordData.sort((a, b) => b.opportunity - a.opportunity);
    
    setKeywords(keywordData);
    setSelectedKeyword(seedKeyword);
    setSerpResults(generateMockSerpResults(seedKeyword));
    setHasAnalyzed(true);
    setIsLoading(false);
  };

  const handleExport = (format: 'csv' | 'excel') => {
    if (format === 'csv') {
      exportToCSV(keywords);
    } else {
      exportToExcel(keywords);
    }
  };

  const benchmarkMetrics = {
    avgSearchVolume: keywords.length > 0 ? Math.round(keywords.reduce((sum, k) => sum + k.searchVolume, 0) / keywords.length) : 0,
    avgDifficulty: keywords.length > 0 ? Math.round(keywords.reduce((sum, k) => sum + k.difficulty, 0) / keywords.length) : 0,
    avgCPC: keywords.length > 0 ? keywords.reduce((sum, k) => sum + k.cpc, 0) / keywords.length : 0,
    topKeywordTypes: ['Long tail', 'Questions', 'Commerciaux', 'Informationnels', 'Locaux'],
    seasonalTrends: [],
    competitorInsights: {
      strongCompetitors: Math.floor(Math.random() * 5) + 3,
      contentGaps: Math.floor(Math.random() * 8) + 5,
      opportunities: Math.floor(Math.random() * 12) + 8
    }
  };

  const userMetrics = {
    avgVolume: benchmarkMetrics.avgSearchVolume,
    avgDifficulty: benchmarkMetrics.avgDifficulty,
    avgCPC: benchmarkMetrics.avgCPC
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-6 h-6 text-green-600" />
            Keyword Opportunity Finder
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-600 mb-6">
            Identifiez des opportunités de mots-clés à fort potentiel avec scoring de difficulté, 
            suggestions sémantiques et analyse SERP complète.
          </p>
          
          <KeywordForm
            seedKeyword={seedKeyword}
            setSeedKeyword={setSeedKeyword}
            industry={industry}
            setIndustry={setIndustry}
            country={country}
            setCountry={setCountry}
            onAnalyze={handleAnalyze}
            isLoading={isLoading}
          />
        </CardContent>
      </Card>

      {hasAnalyzed && (
        <Tabs defaultValue="keywords" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="keywords" className="flex items-center space-x-2">
              <Search className="w-4 h-4" />
              <span>Mots-clés</span>
            </TabsTrigger>
            <TabsTrigger value="serp" className="flex items-center space-x-2">
              <Globe className="w-4 h-4" />
              <span>Analyse SERP</span>
            </TabsTrigger>
            <TabsTrigger value="benchmarks" className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span>Benchmarks</span>
            </TabsTrigger>
            <TabsTrigger value="export" className="flex items-center space-x-2">
              <Target className="w-4 h-4" />
              <span>Export</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="keywords">
            <KeywordResults
              keywords={keywords}
              onExport={handleExport}
            />
          </TabsContent>

          <TabsContent value="serp">
            <SerpAnalysis
              keyword={selectedKeyword}
              results={serpResults}
              competitionLevel="medium"
              featuredSnippetOpportunity={Math.random() > 0.5}
            />
          </TabsContent>

          <TabsContent value="benchmarks">
            <BenchmarkData
              industry={industry}
              metrics={benchmarkMetrics}
              userMetrics={userMetrics}
            />
          </TabsContent>

          <TabsContent value="export">
            <Card>
              <CardHeader>
                <CardTitle>Export des données</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-slate-600">
                    Exportez vos résultats d'analyse de mots-clés dans le format de votre choix.
                  </p>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => handleExport('csv')}
                      className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      Télécharger CSV
                    </button>
                    <button
                      onClick={() => handleExport('excel')}
                      className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                    >
                      Télécharger Excel
                    </button>
                  </div>
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium mb-2">Données incluses dans l'export :</h4>
                    <ul className="text-sm text-slate-600 space-y-1">
                      <li>• Mots-clés générés ({keywords.length} total)</li>
                      <li>• Volume de recherche mensuel</li>
                      <li>• Score de difficulté SEO (KD%)</li>
                      <li>• Coût par clic (CPC)</li>
                      <li>• Intention de recherche</li>
                      <li>• Score d'opportunité calculé</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};
