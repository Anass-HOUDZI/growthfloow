
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Palette, Zap, Download, BarChart3, Eye, Settings } from 'lucide-react';
import { AuditResults } from './AuditResults';
import { MockupGenerator } from './MockupGenerator';

export const LandingPageConverter: React.FC = () => {
  const [url, setUrl] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState('audit');

  const analyzePage = async () => {
    if (!url) return;
    
    setIsAnalyzing(true);
    
    // Simulation d'analyse complète
    setTimeout(() => {
      const mockAnalysis = {
        overallScore: Math.floor(Math.random() * 30) + 60,
        elements: {
          headline: {
            score: Math.floor(Math.random() * 20) + 70,
            issues: ['Manque d\'urgence dans le message', 'Bénéfice principal peu clair'],
            recommendations: ['Ajouter un élément d\'urgence', 'Mettre en avant la valeur unique']
          },
          cta_buttons: {
            score: Math.floor(Math.random() * 25) + 55,
            issues: ['Couleur insuffisamment contrastée', 'Texte générique "En savoir plus"'],
            recommendations: ['Utiliser des couleurs plus vives', 'Texte orienté action "Commencer maintenant"']
          },
          form_optimization: {
            score: Math.floor(Math.random() * 30) + 45,
            issues: ['Trop de champs obligatoires (7)', 'Pas de validation en temps réel'],
            recommendations: ['Réduire à 3 champs essentiels', 'Ajouter validation instantanée']
          },
          trust_signals: {
            score: Math.floor(Math.random() * 15) + 80,
            issues: ['Témoignages sans photos', 'Logos partenaires peu visibles'],
            recommendations: ['Ajouter photos aux témoignages', 'Mettre en avant les logos de confiance']
          },
          page_speed: {
            score: Math.floor(Math.random() * 25) + 55,
            issues: ['Images non optimisées', 'Trop de scripts externes'],
            recommendations: ['Compresser les images', 'Différer le chargement des scripts non critiques']
          },
          mobile_ux: {
            score: Math.floor(Math.random() * 20) + 65,
            issues: ['Boutons trop petits', 'Texte difficile à lire'],
            recommendations: ['Augmenter la taille des boutons', 'Améliorer la lisibilité du texte']
          }
        },
        recommendations: [
          {
            priority: 'High' as const,
            element: 'CTA Buttons',
            issue: 'Améliorer le contraste et le texte d\'action',
            impact: '+25% taux de clic',
            effort: '2 heures'
          },
          {
            priority: 'High' as const,
            element: 'Form Fields',
            issue: 'Réduire la friction du formulaire',
            impact: '+40% completion',
            effort: '4 heures'
          },
          {
            priority: 'Medium' as const,
            element: 'Headlines',
            issue: 'Clarifier la proposition de valeur',
            impact: '+15% engagement',
            effort: '3 heures'
          },
          {
            priority: 'Medium' as const,
            element: 'Page Speed',
            issue: 'Optimiser les performances',
            impact: '+10% conversion',
            effort: '6 heures'
          },
          {
            priority: 'Low' as const,
            element: 'Trust Signals',
            issue: 'Renforcer les éléments de confiance',
            impact: '+8% crédibilité',
            effort: '2 heures'
          }
        ],
        technicalMetrics: {
          loadTime: +(Math.random() * 2 + 1).toFixed(1),
          mobileScore: Math.floor(Math.random() * 20) + 70,
          accessibilityScore: Math.floor(Math.random() * 25) + 65,
          seoScore: Math.floor(Math.random() * 30) + 60
        }
      };
      
      setAnalysis(mockAnalysis);
      setIsAnalyzing(false);
    }, 3000);
  };

  const exportReport = (format: 'pdf' | 'csv') => {
    if (!analysis) return;
    
    console.log(`Export en format ${format}:`, analysis);
    
    // Simulation d'export
    const filename = `landing-audit-${new Date().toISOString().split('T')[0]}.${format}`;
    console.log(`Rapport exporté: ${filename}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-violet-600 rounded-xl flex items-center justify-center mx-auto mb-4">
          <Palette className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Landing Page Converter</h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Audit UX/UI complet avec recommandations de conversion, scoring détaillé et mockups d'optimisation
        </p>
      </div>

      {/* Formulaire d'analyse */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="w-5 h-5" />
            <span>Configuration de l'Audit</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="url">URL de votre landing page *</Label>
              <div className="flex space-x-3 mt-2">
                <Input
                  id="url"
                  type="url"
                  placeholder="https://votre-landing-page.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="flex-1"
                />
                <Button
                  onClick={analyzePage}
                  disabled={!url || isAnalyzing}
                  className="bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700"
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
            </div>

            {isAnalyzing && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                  <div>
                    <p className="font-medium text-blue-800">Analyse en cours...</p>
                    <p className="text-sm text-blue-600">
                      Audit UX/UI, analyse technique et génération des recommandations
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Résultats */}
      {analysis && !isAnalyzing && (
        <div className="space-y-6">
          {/* Actions rapides */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="flex items-center space-x-1">
                    <Eye className="w-3 h-3" />
                    <span>Analysé: {url}</span>
                  </Badge>
                  <Badge className="bg-green-100 text-green-800">
                    Audit terminé
                  </Badge>
                </div>
                
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => exportReport('pdf')}
                    className="flex items-center space-x-1"
                  >
                    <Download className="w-4 h-4" />
                    <span>Export PDF</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => exportReport('csv')}
                    className="flex items-center space-x-1"
                  >
                    <BarChart3 className="w-4 h-4" />
                    <span>Export CSV</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs pour les résultats */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto">
              <TabsTrigger value="audit" className="flex items-center space-x-2">
                <BarChart3 className="w-4 h-4" />
                <span>Audit & Scoring</span>
              </TabsTrigger>
              <TabsTrigger value="mockups" className="flex items-center space-x-2">
                <Eye className="w-4 h-4" />
                <span>Mockups</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="audit" className="mt-6">
              <AuditResults analysis={analysis} />
            </TabsContent>

            <TabsContent value="mockups" className="mt-6">
              <MockupGenerator url={url} recommendations={analysis.recommendations} />
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
};
