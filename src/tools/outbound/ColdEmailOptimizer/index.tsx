
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Mail, CheckCircle, AlertTriangle, XCircle, Zap, Eye } from 'lucide-react';

interface EmailAnalysis {
  overallScore: number;
  deliverabilityScore: number;
  openRateScore: number;
  responseRateScore: number;
  issues: EmailIssue[];
  suggestions: string[];
  optimizedVersion: string;
}

interface EmailIssue {
  type: 'critical' | 'warning' | 'info';
  category: string;
  message: string;
  fix: string;
}

export const ColdEmailOptimizer = () => {
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');
  const [senderName, setSenderName] = useState('');
  const [senderDomain, setSenderDomain] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<EmailAnalysis | null>(null);

  const analyzeEmail = async () => {
    setIsAnalyzing(true);
    
    // Simulation d'analyse
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockIssues: EmailIssue[] = [
      {
        type: 'warning',
        category: 'Deliverability',
        message: 'Le sujet contient des mots susceptibles de déclencher les filtres spam',
        fix: 'Évitez des mots comme "gratuit", "urgent", "offre spéciale"'
      },
      {
        type: 'info',
        category: 'Personnalisation',
        message: 'Email manque de personnalisation avancée',
        fix: 'Ajoutez des références spécifiques à l\'entreprise du prospect'
      },
      {
        type: 'critical',
        category: 'Call-to-Action',
        message: 'CTA peu clair ou inexistant',
        fix: 'Ajoutez un CTA spécifique et actionnable'
      }
    ];

    const optimizedEmail = `Bonjour {firstName},

J'ai remarqué que {companyName} développe sa présence sur {specificMarket}. Impressionnant !

Beaucoup d'entreprises comme la vôtre font face à un défi : convertir le trafic web en leads qualifiés.

Question rapide : quel est votre plus gros challenge actuel pour générer plus de leads ?

J'ai aidé {similarCompany} à augmenter leurs conversions de 40% en 3 mois. Seriez-vous ouvert à voir leur approche exacte ?

Cordialement,
${senderName || '[Votre nom]'}`;

    setAnalysis({
      overallScore: 72,
      deliverabilityScore: 85,
      openRateScore: 68,
      responseRateScore: 63,
      issues: mockIssues,
      suggestions: [
        'Personnalisez le sujet avec le nom de l\'entreprise',
        'Ajoutez une ligne d\'accroche basée sur l\'actualité',
        'Raccourcissez le message (max 150 mots)',
        'Incluez une preuve sociale spécifique',
        'Ajoutez un CTA avec une alternative binaire'
      ],
      optimizedVersion: optimizedEmail
    });
    
    setIsAnalyzing(false);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBackground = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getIssueIcon = (type: string) => {
    switch (type) {
      case 'critical': return <XCircle className="w-4 h-4 text-red-500" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'info': return <CheckCircle className="w-4 h-4 text-blue-500" />;
      default: return <CheckCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getIssueColor = (type: string) => {
    switch (type) {
      case 'critical': return 'border-red-200 bg-red-50';
      case 'warning': return 'border-yellow-200 bg-yellow-50';
      case 'info': return 'border-blue-200 bg-blue-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center mx-auto">
          <Mail className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-slate-800">
          Cold Email Optimizer
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Optimisez vos emails de prospection avec des recommandations basées sur les meilleures pratiques et la prédiction de délivrabilité.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Configuration email */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Mail className="w-5 h-5" />
              <span>Votre Email à Optimiser</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sender-name">Nom de l'expéditeur</Label>
                <Input
                  id="sender-name"
                  placeholder="Jean Dupont"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sender-domain">Domaine d'envoi</Label>
                <Input
                  id="sender-domain"
                  placeholder="monentreprise.com"
                  value={senderDomain}
                  onChange={(e) => setSenderDomain(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email-subject">Sujet de l'email</Label>
              <Input
                id="email-subject"
                placeholder="Question rapide sur votre stratégie marketing"
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email-body">Corps de l'email</Label>
              <Textarea
                id="email-body"
                placeholder="Bonjour [Prénom],

J'ai vu que votre entreprise..."
                className="min-h-[200px]"
                value={emailBody}
                onChange={(e) => setEmailBody(e.target.value)}
              />
            </div>

            <Button 
              onClick={analyzeEmail}
              disabled={isAnalyzing || !emailSubject || !emailBody}
              className="w-full"
            >
              {isAnalyzing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Analyse en cours...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 mr-2" />
                  Analyser l'email
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Résultats d'analyse */}
        {analysis && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Eye className="w-5 h-5" />
                <span>Analyse de Performance</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Score global */}
              <div className="text-center space-y-4">
                <div className="relative w-24 h-24 mx-auto">
                  <svg className="w-24 h-24 transform -rotate-90">
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="6"
                      fill="none"
                      className="text-gray-200"
                    />
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="6"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 40}`}
                      strokeDashoffset={`${2 * Math.PI * 40 * (1 - analysis.overallScore / 100)}`}
                      className={`${getScoreBackground(analysis.overallScore)} transition-all duration-1000`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className={`text-xl font-bold ${getScoreColor(analysis.overallScore)}`}>
                      {analysis.overallScore}
                    </span>
                  </div>
                </div>
                <h3 className="font-semibold text-slate-800">Score Global</h3>
              </div>

              {/* Scores détaillés */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Délivrabilité</span>
                  <div className="flex items-center space-x-2">
                    <Progress value={analysis.deliverabilityScore} className="w-20" />
                    <span className={`text-sm font-medium ${getScoreColor(analysis.deliverabilityScore)}`}>
                      {analysis.deliverabilityScore}%
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Taux d'ouverture</span>
                  <div className="flex items-center space-x-2">
                    <Progress value={analysis.openRateScore} className="w-20" />
                    <span className={`text-sm font-medium ${getScoreColor(analysis.openRateScore)}`}>
                      {analysis.openRateScore}%
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Taux de réponse</span>
                  <div className="flex items-center space-x-2">
                    <Progress value={analysis.responseRateScore} className="w-20" />
                    <span className={`text-sm font-medium ${getScoreColor(analysis.responseRateScore)}`}>
                      {analysis.responseRateScore}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Prédictions */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div className="text-center">
                  <div className="text-lg font-bold text-blue-600">~{analysis.openRateScore}%</div>
                  <div className="text-xs text-slate-500">Taux d'ouverture estimé</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-green-600">~{Math.round(analysis.responseRateScore * 0.3)}%</div>
                  <div className="text-xs text-slate-500">Taux de réponse estimé</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Recommandations détaillées */}
      {analysis && (
        <Tabs defaultValue="issues" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="issues">Problèmes détectés</TabsTrigger>
            <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
            <TabsTrigger value="optimized">Version optimisée</TabsTrigger>
          </TabsList>

          <TabsContent value="issues" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Problèmes Détectés</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {analysis.issues.map((issue, index) => (
                  <div key={index} className={`p-4 border rounded-lg ${getIssueColor(issue.type)}`}>
                    <div className="flex items-start space-x-3">
                      {getIssueIcon(issue.type)}
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-medium text-slate-800">{issue.category}</h4>
                          <Badge variant="outline" className="text-xs">
                            {issue.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-600 mb-2">{issue.message}</p>
                        <p className="text-sm text-slate-500 font-medium">💡 {issue.fix}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="suggestions">
            <Card>
              <CardHeader>
                <CardTitle>Suggestions d'Amélioration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analysis.suggestions.map((suggestion, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-green-800">{suggestion}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="optimized">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Version Optimisée</CardTitle>
                  <Button variant="outline" size="sm">
                    Copier le texte
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-slate-50 p-4 rounded-lg">
                  <pre className="whitespace-pre-wrap text-sm text-slate-700">
                    {analysis.optimizedVersion}
                  </pre>
                </div>
                
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">Améliorations apportées :</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Personnalisation avancée avec variables dynamiques</li>
                    <li>• Structure AIDA (Attention, Intérêt, Désir, Action)</li>
                    <li>• Preuve sociale spécifique et mesurable</li>
                    <li>• CTA clair avec alternative binaire</li>
                    <li>• Longueur optimisée (120 mots)</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};
