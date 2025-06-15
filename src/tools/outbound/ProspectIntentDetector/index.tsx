
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Search, TrendingUp, AlertCircle, Users, Building, Calendar, ExternalLink } from 'lucide-react';

interface IntentSignal {
  type: string;
  description: string;
  score: number;
  source: string;
  date: string;
  confidence: 'low' | 'medium' | 'high';
}

interface ProspectData {
  name: string;
  company: string;
  title: string;
  intentScore: number;
  signals: IntentSignal[];
  recommendation: string;
  bestTimeToContact: string;
}

export const ProspectIntentDetector = () => {
  const [prospectUrl, setProspectUrl] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<ProspectData | null>(null);

  const mockSignals: IntentSignal[] = [
    {
      type: 'Job Change',
      description: 'Nouveau poste de VP Marketing chez TechCorp',
      score: 85,
      source: 'LinkedIn',
      date: '2024-01-15',
      confidence: 'high'
    },
    {
      type: 'Company Growth',
      description: 'Levée de fonds Série B de 15M€',
      score: 75,
      source: 'Crunchbase',
      date: '2024-01-10',
      confidence: 'high'
    },
    {
      type: 'Technology Adoption',
      description: 'Recherche d\'outils marketing automation',
      score: 60,
      source: 'G2 Reviews',
      date: '2024-01-12',
      confidence: 'medium'
    },
    {
      type: 'Content Engagement',
      description: 'Téléchargement whitepaper sur la croissance',
      score: 45,
      source: 'Website Analytics',
      date: '2024-01-14',
      confidence: 'medium'
    }
  ];

  const analyzeProspect = async () => {
    setIsAnalyzing(true);
    
    // Simulation d'analyse
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const totalScore = mockSignals.reduce((sum, signal) => sum + signal.score, 0) / mockSignals.length;
    
    setAnalysisResult({
      name: 'Marie Dubois',
      company: companyName || 'TechCorp',
      title: 'VP Marketing',
      intentScore: Math.round(totalScore),
      signals: mockSignals,
      recommendation: totalScore > 70 ? 'Contact immédiat recommandé' : 
                     totalScore > 50 ? 'Contact dans les 48h' : 'Maintenir en veille',
      bestTimeToContact: 'Mardi-Jeudi 10h-16h'
    });
    
    setIsAnalyzing(false);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-red-500';
    if (score >= 60) return 'bg-orange-500';
    if (score >= 40) return 'bg-yellow-500';
    return 'bg-gray-400';
  };

  const getConfidenceBadge = (confidence: string) => {
    const colors = {
      high: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-gray-100 text-gray-800'
    };
    return colors[confidence as keyof typeof colors];
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mx-auto">
          <Search className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-slate-800">
          Prospect Intent Detector
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Identifiez automatiquement les signaux d'intention d'achat de vos prospects via l'analyse de leurs activités digitales publiques.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="w-5 h-5" />
            <span>Analyser un Prospect</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="prospect-url">URL LinkedIn du prospect</Label>
              <Input
                id="prospect-url"
                placeholder="https://linkedin.com/in/marie-dubois"
                value={prospectUrl}
                onChange={(e) => setProspectUrl(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company-name">Nom de l'entreprise</Label>
              <Input
                id="company-name"
                placeholder="TechCorp"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>
          </div>
          
          <Button 
            onClick={analyzeProspect}
            disabled={isAnalyzing || !prospectUrl}
            className="w-full"
          >
            {isAnalyzing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Analyse en cours...
              </>
            ) : (
              <>
                <Search className="w-4 h-4 mr-2" />
                Analyser le prospect
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {analysisResult && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Score d'intention */}
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Score d'Intention</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="relative w-32 h-32 mx-auto">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-gray-200"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 56}`}
                    strokeDashoffset={`${2 * Math.PI * 56 * (1 - analysisResult.intentScore / 100)}`}
                    className={`${getScoreColor(analysisResult.intentScore)} transition-all duration-1000`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold text-slate-800">
                    {analysisResult.intentScore}
                  </span>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-slate-800">{analysisResult.name}</h3>
                <p className="text-slate-600">{analysisResult.title}</p>
                <p className="text-slate-500">{analysisResult.company}</p>
              </div>
              <Badge className={`${getScoreColor(analysisResult.intentScore)} text-white`}>
                {analysisResult.recommendation}
              </Badge>
            </CardContent>
          </Card>

          {/* Signaux détectés */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5" />
                <span>Signaux d'Intention Détectés</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {analysisResult.signals.map((signal, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-slate-50 rounded-lg"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-medium text-slate-800">{signal.type}</h4>
                      <Badge className={getConfidenceBadge(signal.confidence)}>
                        {signal.confidence}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-600 mb-2">{signal.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-slate-500">
                      <span>Source: {signal.source}</span>
                      <span>Date: {signal.date}</span>
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <div className="text-lg font-bold text-slate-800">{signal.score}</div>
                    <Progress value={signal.score} className="w-16" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recommandations */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertCircle className="w-5 h-5" />
                <span>Recommandations d'Action</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <h4 className="font-medium text-slate-800">Meilleur moment de contact</h4>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-slate-500" />
                    <span className="text-slate-600">{analysisResult.bestTimeToContact}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium text-slate-800">Canal recommandé</h4>
                  <div className="flex items-center space-x-2">
                    <ExternalLink className="w-4 h-4 text-slate-500" />
                    <span className="text-slate-600">LinkedIn + Email</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium text-slate-800">Angle d'approche</h4>
                  <div className="flex items-center space-x-2">
                    <Building className="w-4 h-4 text-slate-500" />
                    <span className="text-slate-600">Croissance & Financement</span>
                  </div>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">Message d'approche suggéré :</h4>
                <p className="text-blue-700 text-sm">
                  "Félicitations pour votre nouveau poste de VP Marketing et la récente levée de fonds ! 
                  J'ai vu que vous recherchiez des solutions pour optimiser votre stack marketing. 
                  Aurions-nous 15 minutes cette semaine pour discuter de vos priorités croissance ?"
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
