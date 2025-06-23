
import React, { useState } from 'react';
import { Gauge, Zap, AlertTriangle, CheckCircle, TrendingUp, Download, FileText, Globe, Clock, Image, Code, Server, Wifi } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Progress } from '../../../components/ui/progress';
import { Badge } from '../../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';

interface PerformanceMetric {
  mobile: number;
  desktop: number;
  good: number;
  label: string;
  unit: string;
}

interface OptimizationIssue {
  category: string;
  severity: 'high' | 'medium' | 'low';
  impact: string;
  issue: string;
  solution: string;
  technicalDetails: string;
  priority: number;
  estimatedTime: string;
}

interface PerformanceAnalysis {
  scores: {
    mobile: number;
    desktop: number;
  };
  metrics: {
    fcp: PerformanceMetric;
    lcp: PerformanceMetric;
    fid: PerformanceMetric;
    cls: PerformanceMetric;
    ttfb: PerformanceMetric;
    si: PerformanceMetric;
  };
  issues: OptimizationIssue[];
  conversionImpact: {
    current: number;
    optimized: number;
    increase: number;
    revenueImpact: number;
  };
  technicalAudit: {
    imageOptimization: { score: number; issues: string[] };
    codeOptimization: { score: number; issues: string[] };
    serverOptimization: { score: number; issues: string[] };
    cacheOptimization: { score: number; issues: string[] };
  };
  recommendations: {
    immediate: string[];
    shortTerm: string[];
    longTerm: string[];
  };
  competitorBenchmark: {
    yourSite: number;
    industry: number;
    topPerformers: number;
  };
}

export const PageSpeedOptimizer: React.FC = () => {
  const [url, setUrl] = useState('');
  const [analysis, setAnalysis] = useState<PerformanceAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const analyzeSpeed = () => {
    if (!url) return;
    
    setIsAnalyzing(true);
    
    // Simulation d'analyse complète
    setTimeout(() => {
      setAnalysis({
        scores: {
          mobile: Math.floor(Math.random() * 40) + 50,
          desktop: Math.floor(Math.random() * 30) + 70
        },
        metrics: {
          fcp: { mobile: 2.1, desktop: 1.4, good: 1.8, label: 'First Contentful Paint', unit: 's' },
          lcp: { mobile: 3.8, desktop: 2.2, good: 2.5, label: 'Largest Contentful Paint', unit: 's' },
          fid: { mobile: 45, desktop: 12, good: 100, label: 'First Input Delay', unit: 'ms' },
          cls: { mobile: 0.15, desktop: 0.08, good: 0.1, label: 'Cumulative Layout Shift', unit: '' },
          ttfb: { mobile: 1.2, desktop: 0.8, good: 0.8, label: 'Time to First Byte', unit: 's' },
          si: { mobile: 4.5, desktop: 2.8, good: 3.4, label: 'Speed Index', unit: 's' }
        },
        issues: [
          {
            category: 'Images',
            severity: 'high',
            impact: 'Économie de 1.2s',
            issue: 'Images non optimisées (WebP manquant)',
            solution: 'Convertir les images en format WebP et ajouter lazy loading',
            technicalDetails: 'Détectées 15 images JPEG/PNG (2.3MB total) qui pourraient être réduites de 65% en WebP',
            priority: 1,
            estimatedTime: '2-4 heures'
          },
          {
            category: 'JavaScript',
            severity: 'high',
            impact: 'Économie de 0.8s',
            issue: 'Scripts bloquants le rendu',
            solution: 'Différer le chargement des scripts non critiques',
            technicalDetails: 'Identifiés 8 scripts JS (450KB) qui bloquent le thread principal',
            priority: 2,
            estimatedTime: '1-2 heures'
          },
          {
            category: 'CSS',
            severity: 'medium',
            impact: 'Économie de 0.4s',
            issue: 'CSS non utilisé (45KB)',
            solution: 'Supprimer le CSS inutilisé et minifier',
            technicalDetails: 'CSS inutilisé détecté dans 3 fichiers, représentant 35% du CSS total',
            priority: 3,
            estimatedTime: '30min-1h'
          },
          {
            category: 'Serveur',
            severity: 'medium',
            impact: 'Économie de 0.3s',
            issue: 'Temps de réponse serveur lent',
            solution: 'Optimiser la configuration serveur et ajouter un CDN',
            technicalDetails: 'TTFB moyen de 1.2s, recommandé <0.8s',
            priority: 4,
            estimatedTime: '4-8 heures'
          },
          {
            category: 'Cache',
            severity: 'low',
            impact: 'Économie de 0.2s',
            issue: 'Cache navigateur mal configuré',
            solution: 'Configurer les headers de cache appropriés',
            technicalDetails: 'Headers Cache-Control manquants sur 12 ressources statiques',
            priority: 5,
            estimatedTime: '15-30min'
          }
        ],
        conversionImpact: {
          current: 3.2,
          optimized: 4.8,
          increase: 50,
          revenueImpact: 125000
        },
        technicalAudit: {
          imageOptimization: {
            score: 45,
            issues: ['Format WebP non utilisé', 'Lazy loading manquant', 'Tailles inappropriées']
          },
          codeOptimization: {
            score: 60,
            issues: ['Code JavaScript non minifié', 'CSS inutilisé', 'Bundling sous-optimal']
          },
          serverOptimization: {
            score: 70,
            issues: ['TTFB élevé', 'Compression GZIP manquante', 'Headers de cache']
          },
          cacheOptimization: {
            score: 55,
            issues: ['CDN non configuré', 'Cache browser insuffisant', 'Cache serveur basique']
          }
        },
        recommendations: {
          immediate: [
            'Activer la compression GZIP/Brotli',
            'Minifier CSS et JavaScript',
            'Optimiser les images critiques'
          ],
          shortTerm: [
            'Implémenter le lazy loading',
            'Convertir les images en WebP',
            'Différer les scripts non critiques',
            'Configurer un CDN'
          ],
          longTerm: [
            'Optimiser l\'architecture serveur',
            'Implémenter le Server-Side Rendering',
            'Mise en place du HTTP/3',
            'Audit complet de l\'infrastructure'
          ]
        },
        competitorBenchmark: {
          yourSite: 65,
          industry: 78,
          topPerformers: 92
        }
      });
      setIsAnalyzing(false);
    }, 3000);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 50) return 'text-orange-600';
    return 'text-red-600';
  };

  const getScoreBackground = (score: number) => {
    if (score >= 90) return 'bg-green-100 border-green-200';
    if (score >= 50) return 'bg-orange-100 border-orange-200';
    return 'bg-red-100 border-red-200';
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-orange-500';
      default: return 'bg-green-500';
    }
  };

  const getSeverityLabel = (severity: string) => {
    switch (severity) {
      case 'high': return 'Critique';
      case 'medium': return 'Important';
      default: return 'Mineur';
    }
  };

  const getMetricStatus = (current: number, good: number, unit: string) => {
    const isGood = unit === '' ? current <= good : current <= good;
    return isGood ? 'good' : current <= good * 1.5 ? 'needs-improvement' : 'poor';
  };

  const generateReport = () => {
    if (!analysis) return;
    
    const reportData = {
      url,
      analysis,
      generatedAt: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(reportData, null, 2)], {
      type: 'application/json'
    });
    
    const url_download = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url_download;
    a.download = `page-speed-report-${new Date().getTime()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url_download);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
          <Gauge className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Page Speed Optimizer</h2>
        <p className="text-slate-600">Audit technique complet avec recommandations d'optimisation</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Globe className="w-5 h-5" />
            <span>Analyse de Performance</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4 mb-6">
            <Input
              type="url"
              placeholder="https://votre-site.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1"
            />
            <Button
              onClick={analyzeSpeed}
              disabled={!url || isAnalyzing}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              {isAnalyzing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Analyse...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 mr-2" />
                  Analyser
                </>
              )}
            </Button>
          </div>

          {analysis && (
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
                <TabsTrigger value="metrics">Métriques</TabsTrigger>
                <TabsTrigger value="issues">Problèmes</TabsTrigger>
                <TabsTrigger value="recommendations">Recommandations</TabsTrigger>
                <TabsTrigger value="benchmark">Benchmark</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* Scores globaux */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className={getScoreBackground(analysis.scores.mobile)}>
                    <CardContent className="pt-6 text-center">
                      <div className={`text-4xl font-bold ${getScoreColor(analysis.scores.mobile)} mb-2`}>
                        {analysis.scores.mobile}
                      </div>
                      <p className="font-medium text-slate-800 flex items-center justify-center">
                        <Gauge className="w-4 h-4 mr-2" />
                        Score Mobile
                      </p>
                    </CardContent>
                  </Card>
                  <Card className={getScoreBackground(analysis.scores.desktop)}>
                    <CardContent className="pt-6 text-center">
                      <div className={`text-4xl font-bold ${getScoreColor(analysis.scores.desktop)} mb-2`}>
                        {analysis.scores.desktop}
                      </div>
                      <p className="font-medium text-slate-800 flex items-center justify-center">
                        <Gauge className="w-4 h-4 mr-2" />
                        Score Desktop
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Impact sur la conversion */}
                <Card className="bg-gradient-to-r from-green-50 to-blue-50">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2" />
                      Impact Business Projeté
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-red-600 mb-1">
                          {analysis.conversionImpact.current}%
                        </div>
                        <p className="text-sm text-slate-600">Taux actuel</p>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600 mb-1">
                          {analysis.conversionImpact.optimized}%
                        </div>
                        <p className="text-sm text-slate-600">Taux optimisé</p>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600 mb-1">
                          +{analysis.conversionImpact.increase}%
                        </div>
                        <p className="text-sm text-slate-600">Amélioration</p>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600 mb-1">
                          €{analysis.conversionImpact.revenueImpact.toLocaleString()}
                        </div>
                        <p className="text-sm text-slate-600">Impact revenus/an</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="metrics" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Core Web Vitals & Métriques Détaillées</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {Object.entries(analysis.metrics).map(([key, metric]: [string, PerformanceMetric]) => {
                        const mobileStatus = getMetricStatus(metric.mobile, metric.good, metric.unit);
                        const desktopStatus = getMetricStatus(metric.desktop, metric.good, metric.unit);
                        
                        return (
                          <Card key={key} className="bg-slate-50">
                            <CardContent className="pt-4">
                              <div className="flex items-center justify-between mb-3">
                                <h4 className="font-medium text-slate-800">{metric.label}</h4>
                                <div className="flex space-x-1">
                                  {mobileStatus === 'good' ? (
                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                  ) : (
                                    <AlertTriangle className="w-4 h-4 text-orange-500" />
                                  )}
                                </div>
                              </div>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-slate-600">Mobile:</span>
                                  <span className={`font-medium ${mobileStatus === 'good' ? 'text-green-600' : 'text-orange-600'}`}>
                                    {metric.mobile}{metric.unit}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-slate-600">Desktop:</span>
                                  <span className={`font-medium ${desktopStatus === 'good' ? 'text-green-600' : 'text-orange-600'}`}>
                                    {metric.desktop}{metric.unit}
                                  </span>
                                </div>
                                <div className="flex justify-between pt-1 border-t">
                                  <span className="text-green-600 text-xs">Objectif:</span>
                                  <span className="text-green-600 text-xs">
                                    {metric.unit === '' ? `<${metric.good}` : `<${metric.good}${metric.unit}`}
                                  </span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="issues" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Opportunités d'Optimisation</h3>
                  <Badge variant="outline">{analysis.issues.length} problèmes détectés</Badge>
                </div>
                
                <div className="space-y-4">
                  {analysis.issues
                    .sort((a, b) => a.priority - b.priority)
                    .map((issue, index) => (
                    <Card key={index} className="border-l-4" style={{ borderLeftColor: getSeverityColor(issue.severity) }}>
                      <CardContent className="pt-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <Badge 
                              variant="outline" 
                              className={`${getSeverityColor(issue.severity)} text-white border-none`}
                            >
                              {getSeverityLabel(issue.severity)}
                            </Badge>
                            <div className="flex items-center space-x-2">
                              {issue.category === 'Images' && <Image className="w-4 h-4" />}
                              {issue.category === 'JavaScript' && <Code className="w-4 h-4" />}
                              {issue.category === 'CSS' && <FileText className="w-4 h-4" />}
                              {issue.category === 'Serveur' && <Server className="w-4 h-4" />}
                              {issue.category === 'Cache' && <Wifi className="w-4 h-4" />}
                              <h4 className="font-medium text-slate-800">{issue.category}</h4>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-green-600 font-medium text-sm">{issue.impact}</div>
                            <div className="text-slate-500 text-xs">{issue.estimatedTime}</div>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div>
                            <p className="text-slate-600 text-sm">
                              <strong className="text-red-600">Problème:</strong> {issue.issue}
                            </p>
                          </div>
                          <div>
                            <p className="text-slate-600 text-sm">
                              <strong className="text-blue-600">Solution:</strong> {issue.solution}
                            </p>
                          </div>
                          <div className="bg-slate-50 p-3 rounded">
                            <p className="text-slate-600 text-xs">
                              <strong>Détails techniques:</strong> {issue.technicalDetails}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="recommendations" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center text-red-600">
                        <AlertTriangle className="w-5 h-5 mr-2" />
                        Actions Immédiates
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {analysis.recommendations.immediate.map((rec, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <CheckCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-slate-700">{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center text-orange-600">
                        <Clock className="w-5 h-5 mr-2" />
                        Court Terme (1-4 semaines)
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {analysis.recommendations.shortTerm.map((rec, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <CheckCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-slate-700">{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center text-blue-600">
                        <TrendingUp className="w-5 h-5 mr-2" />
                        Long Terme (1-6 mois)
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {analysis.recommendations.longTerm.map((rec, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-slate-700">{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                {/* Audit technique détaillé */}
                <Card>
                  <CardHeader>
                    <CardTitle>Audit Technique Détaillé</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {Object.entries(analysis.technicalAudit).map(([category, audit]) => (
                        <div key={category} className="space-y-3">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium capitalize">
                              {category.replace(/([A-Z])/g, ' $1').toLowerCase()}
                            </h4>
                            <Badge variant={audit.score >= 80 ? 'default' : audit.score >= 60 ? 'secondary' : 'destructive'}>
                              {audit.score}/100
                            </Badge>
                          </div>
                          <Progress value={audit.score} className="h-2" />
                          <ul className="space-y-1">
                            {audit.issues.map((issue, idx) => (
                              <li key={idx} className="text-sm text-slate-600 flex items-start space-x-2">
                                <AlertTriangle className="w-3 h-3 text-orange-500 mt-0.5 flex-shrink-0" />
                                <span>{issue}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="benchmark" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Benchmark Concurrentiel</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-red-50 rounded-lg">
                          <div className="text-3xl font-bold text-red-600 mb-2">
                            {analysis.competitorBenchmark.yourSite}
                          </div>
                          <p className="text-sm text-slate-600">Votre Site</p>
                        </div>
                        <div className="text-center p-4 bg-orange-50 rounded-lg">
                          <div className="text-3xl font-bold text-orange-600 mb-2">
                            {analysis.competitorBenchmark.industry}
                          </div>
                          <p className="text-sm text-slate-600">Moyenne Secteur</p>
                        </div>
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                          <div className="text-3xl font-bold text-green-600 mb-2">
                            {analysis.competitorBenchmark.topPerformers}
                          </div>
                          <p className="text-sm text-slate-600">Top Performers</p>
                        </div>
                      </div>
                      
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-medium text-blue-900 mb-2">Analyse Comparative</h4>
                        <p className="text-sm text-blue-800">
                          Votre site performe {analysis.competitorBenchmark.yourSite < analysis.competitorBenchmark.industry ? 'en dessous' : 'au niveau'} de la moyenne du secteur. 
                          Pour atteindre le niveau des leaders, une amélioration de {analysis.competitorBenchmark.topPerformers - analysis.competitorBenchmark.yourSite} points est nécessaire.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}

          {analysis && (
            <div className="flex justify-center mt-6">
              <Button onClick={generateReport} variant="outline" className="flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Télécharger le Rapport Complet</span>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
