
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Phone, Mic, BarChart, TrendingUp, AlertCircle, Clock, Target } from 'lucide-react';

interface CallAnalysis {
  duration: number;
  talkRatio: number;
  sentiment: 'positive' | 'neutral' | 'negative';
  keyTopics: string[];
  objections: Objection[];
  nextSteps: string[];
  score: number;
  transcriptSummary: string;
  recommendations: string[];
}

interface Objection {
  topic: string;
  response: string;
  handled: boolean;
}

interface CallMetrics {
  totalCalls: number;
  avgDuration: number;
  winRate: number;
  avgScore: number;
  topIssues: string[];
}

export const SalesCallAnalyzer = () => {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<CallAnalysis | null>(null);
  const [callType, setCallType] = useState('discovery');

  const mockMetrics: CallMetrics = {
    totalCalls: 45,
    avgDuration: 28,
    winRate: 34,
    avgScore: 7.2,
    topIssues: ['Prix trop élevé', 'Timing', 'Fonctionnalités manquantes']
  };

  const analyzeCall = async () => {
    setIsAnalyzing(true);
    
    await new Promise(resolve => setTimeout(resolve, 4000));
    
    const mockAnalysis: CallAnalysis = {
      duration: 32,
      talkRatio: 65,
      sentiment: 'positive',
      keyTopics: ['Budget', 'Timeline', 'Decision makers', 'Competitors', 'ROI'],
      objections: [
        {
          topic: 'Prix',
          response: 'Client trouve le prix élevé par rapport à la concurrence',
          handled: false
        },
        {
          topic: 'Timing',
          response: 'Implémentation prévue pour Q2 seulement',
          handled: true
        }
      ],
      nextSteps: [
        'Envoyer proposition personnalisée',
        'Organiser démo technique',
        'Présenter ROI calculator'
      ],
      score: 8.2,
      transcriptSummary: 'Appel découverte avec Marie Dubois (VP Marketing). Discussion sur leurs défis actuels en attribution marketing. Budget alloué de 50K€. Décision finale avec le CMO. Intérêt confirmé pour notre solution.',
      recommendations: [
        'Préparer des cas d\'usage spécifiques au secteur SaaS',
        'Inclure le CMO dans le prochain appel',
        'Fournir une comparaison détaillée avec les concurrents',
        'Proposer un pilote gratuit de 30 jours'
      ]
    };

    setAnalysis(mockAnalysis);
    setIsAnalyzing(false);
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'bg-green-100 text-green-800';
      case 'negative': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600';
    if (score >= 6) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-xl flex items-center justify-center mx-auto">
          <Phone className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-slate-800">
          Sales Call Analyzer
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Analysez automatiquement vos appels de vente avec transcription IA, détection d'objections et recommandations d'amélioration personnalisées.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Métriques globales */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart className="w-5 h-5" />
              <span>Performance</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-slate-600">Appels analysés</span>
                <span className="font-medium">{mockMetrics.totalCalls}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-slate-600">Durée moyenne</span>
                <span className="font-medium">{mockMetrics.avgDuration}min</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-slate-600">Taux de conversion</span>
                <span className="font-medium text-green-600">{mockMetrics.winRate}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-slate-600">Score moyen</span>
                <span className="font-medium text-blue-600">{mockMetrics.avgScore}/10</span>
              </div>
            </div>
            
            <div className="pt-4 border-t">
              <h4 className="font-medium text-slate-800 mb-2">Objections fréquentes</h4>
              <div className="space-y-1">
                {mockMetrics.topIssues.map((issue, index) => (
                  <div key={index} className="text-sm text-slate-600">• {issue}</div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upload et analyse */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Mic className="w-5 h-5" />
              <span>Analyser un Appel</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="call-type">Type d'appel</Label>
              <select 
                id="call-type"
                value={callType}
                onChange={(e) => setCallType(e.target.value)}
                className="w-full p-2 border border-slate-300 rounded-md"
              >
                <option value="discovery">Appel découverte</option>
                <option value="demo">Démonstration</option>
                <option value="negotiation">Négociation</option>
                <option value="closing">Closing</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="audio-upload">Fichier audio</Label>
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center">
                <Mic className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-600 mb-2">Glissez votre fichier audio ici</p>
                <p className="text-sm text-slate-500 mb-4">MP3, WAV, M4A (max 100MB)</p>
                <Button variant="outline">
                  Choisir un fichier
                </Button>
              </div>
            </div>

            <Button 
              onClick={analyzeCall}
              disabled={isAnalyzing}
              className="w-full"
            >
              {isAnalyzing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Analyse en cours... (IA + Transcription)
                </>
              ) : (
                <>
                  <Target className="w-4 h-4 mr-2" />
                  Analyser l'appel
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>

      {analysis && (
        <div className="space-y-6">
          {/* Score et métriques */}
          <Card>
            <CardHeader>
              <CardTitle>Résultats de l'Analyse</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className={`text-3xl font-bold ${getScoreColor(analysis.score)}`}>
                    {analysis.score}/10
                  </div>
                  <div className="text-sm text-slate-500">Score global</div>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{analysis.duration}min</div>
                  <div className="text-sm text-slate-500">Durée totale</div>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{analysis.talkRatio}%</div>
                  <div className="text-sm text-slate-500">Temps de parole prospect</div>
                </div>
                
                <div className="text-center">
                  <Badge className={getSentimentColor(analysis.sentiment)}>
                    {analysis.sentiment}
                  </Badge>
                  <div className="text-sm text-slate-500 mt-1">Sentiment global</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="summary" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="summary">Résumé</TabsTrigger>
              <TabsTrigger value="objections">Objections</TabsTrigger>
              <TabsTrigger value="topics">Sujets clés</TabsTrigger>
              <TabsTrigger value="recommendations">Recommandations</TabsTrigger>
            </TabsList>

            <TabsContent value="summary">
              <Card>
                <CardHeader>
                  <CardTitle>Résumé de l'Appel</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-slate-50 p-4 rounded-lg">
                      <p className="text-slate-700">{analysis.transcriptSummary}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-slate-800 mb-2">Prochaines étapes identifiées</h4>
                      <ul className="space-y-1">
                        {analysis.nextSteps.map((step, index) => (
                          <li key={index} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span className="text-slate-700">{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="objections">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <AlertCircle className="w-5 h-5" />
                    <span>Objections Détectées</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {analysis.objections.map((objection, index) => (
                    <div key={index} className="p-4 border border-slate-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-slate-800">{objection.topic}</h4>
                        <Badge variant={objection.handled ? "default" : "destructive"}>
                          {objection.handled ? 'Traitée' : 'Non traitée'}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-600">{objection.response}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="topics">
              <Card>
                <CardHeader>
                  <CardTitle>Sujets Abordés</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {analysis.keyTopics.map((topic, index) => (
                      <Badge key={index} variant="outline" className="text-sm">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="recommendations">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5" />
                    <span>Recommandations d'Amélioration</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analysis.recommendations.map((recommendation, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                        <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-medium mt-0.5">
                          {index + 1}
                        </div>
                        <p className="text-blue-800 text-sm">{recommendation}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
};
