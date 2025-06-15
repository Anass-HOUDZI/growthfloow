
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';
import { 
  Image, Type, Palette, Eye, Zap, AlertCircle, 
  CheckCircle, Upload, TrendingUp, Star, Target
} from 'lucide-react';

interface CreativeAnalysis {
  overall_score: number;
  visual_elements: {
    color_harmony: number;
    contrast: number;
    composition: number;
    brand_consistency: number;
  };
  text_elements: {
    readability: number;
    message_clarity: number;
    call_to_action: number;
    length_optimization: number;
  };
  performance_indicators: {
    attention_grabbing: number;
    emotional_appeal: number;
    trust_signals: number;
    mobile_optimization: number;
  };
  recommendations: string[];
  improvements: string[];
}

interface Creative {
  id: string;
  name: string;
  type: 'image' | 'video' | 'carousel';
  platform: 'facebook' | 'instagram' | 'google' | 'linkedin';
  analysis: CreativeAnalysis;
  performance: {
    ctr: number;
    cpc: number;
    impressions: number;
    clicks: number;
  };
}

export const AdCreativeAnalyzer: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedCreative, setSelectedCreative] = useState<Creative | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const [creatives] = useState<Creative[]>([
    {
      id: '1',
      name: 'Summer Sale Banner',
      type: 'image',
      platform: 'facebook',
      analysis: {
        overall_score: 87,
        visual_elements: {
          color_harmony: 92,
          contrast: 85,
          composition: 89,
          brand_consistency: 94
        },
        text_elements: {
          readability: 88,
          message_clarity: 91,
          call_to_action: 85,
          length_optimization: 82
        },
        performance_indicators: {
          attention_grabbing: 89,
          emotional_appeal: 86,
          trust_signals: 78,
          mobile_optimization: 91
        },
        recommendations: [
          'Augmenter le contraste du CTA',
          'Ajouter des éléments de confiance',
          'Optimiser le texte pour mobile'
        ],
        improvements: [
          'Tester différentes couleurs pour le bouton',
          'Inclure des témoignages clients',
          'Réduire le nombre de mots'
        ]
      },
      performance: {
        ctr: 3.2,
        cpc: 0.45,
        impressions: 125000,
        clicks: 4000
      }
    },
    {
      id: '2',
      name: 'Product Showcase',
      type: 'carousel',
      platform: 'instagram',
      analysis: {
        overall_score: 74,
        visual_elements: {
          color_harmony: 78,
          contrast: 72,
          composition: 81,
          brand_consistency: 85
        },
        text_elements: {
          readability: 75,
          message_clarity: 73,
          call_to_action: 68,
          length_optimization: 79
        },
        performance_indicators: {
          attention_grabbing: 76,
          emotional_appeal: 71,
          trust_signals: 69,
          mobile_optimization: 84
        },
        recommendations: [
          'Améliorer la lisibilité du texte',
          'Renforcer le call-to-action',
          'Augmenter l\'impact émotionnel'
        ],
        improvements: [
          'Utiliser une police plus large',
          'Tester des CTAs plus directs',
          'Ajouter des éléments humains'
        ]
      },
      performance: {
        ctr: 2.1,
        cpc: 0.62,
        impressions: 89000,
        clicks: 1869
      }
    }
  ]);

  const handleFileUpload = () => {
    setIsAnalyzing(true);
    // Simulation d'analyse
    setTimeout(() => {
      setIsAnalyzing(false);
      // Ici on ajouterait la nouvelle analyse
    }, 3000);
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBadge = (score: number) => {
    if (score >= 85) return 'Excellent';
    if (score >= 70) return 'Bon';
    if (score >= 50) return 'Moyen';
    return 'Faible';
  };

  const radarData = selectedCreative ? [
    { subject: 'Harmonie', A: selectedCreative.analysis.visual_elements.color_harmony },
    { subject: 'Contraste', A: selectedCreative.analysis.visual_elements.contrast },
    { subject: 'Composition', A: selectedCreative.analysis.visual_elements.composition },
    { subject: 'Lisibilité', A: selectedCreative.analysis.text_elements.readability },
    { subject: 'Clarté', A: selectedCreative.analysis.text_elements.message_clarity },
    { subject: 'CTA', A: selectedCreative.analysis.text_elements.call_to_action },
    { subject: 'Attention', A: selectedCreative.analysis.performance_indicators.attention_grabbing },
    { subject: 'Émotion', A: selectedCreative.analysis.performance_indicators.emotional_appeal }
  ] : [];

  const performanceData = creatives.map(creative => ({
    name: creative.name,
    CTR: creative.performance.ctr,
    Score: creative.analysis.overall_score,
    CPC: creative.performance.cpc
  }));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Ad Creative Analyzer</h2>
        <p className="text-slate-600">Analysez et optimisez vos créatifs publicitaires avec l'IA</p>
      </div>

      {/* Upload zone */}
      <Card className="border-dashed border-2 border-slate-300">
        <CardContent className="p-8">
          <div className="text-center">
            <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-800 mb-2">
              Analyser un nouveau créatif
            </h3>
            <p className="text-slate-600 mb-4">
              Uploadez votre image ou vidéo pour une analyse complète
            </p>
            <Button 
              onClick={() => fileInputRef.current?.click()}
              disabled={isAnalyzing}
              className="mb-2"
            >
              {isAnalyzing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Analyse en cours...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Choisir un fichier
                </>
              )}
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,video/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            <p className="text-xs text-slate-500">
              Formats supportés: JPG, PNG, MP4, GIF (max 10MB)
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Vue d'ensemble des créatifs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Créatifs Analysés</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {creatives.map((creative) => (
                <div
                  key={creative.id}
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    selectedCreative?.id === creative.id 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                  onClick={() => setSelectedCreative(creative)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{creative.name}</h4>
                    <Badge className={getScoreColor(creative.analysis.overall_score)}>
                      {creative.analysis.overall_score}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-slate-600">
                    <span className="flex items-center">
                      {creative.type === 'image' && <Image className="w-3 h-3 mr-1" />}
                      {creative.type === 'video' && <Eye className="w-3 h-3 mr-1" />}
                      {creative.type === 'carousel' && <Palette className="w-3 h-3 mr-1" />}
                      {creative.type}
                    </span>
                    <span className="capitalize">{creative.platform}</span>
                  </div>
                  <div className="mt-2">
                    <div className="flex justify-between text-xs text-slate-500 mb-1">
                      <span>Performance</span>
                      <span>{getScoreBadge(creative.analysis.overall_score)}</span>
                    </div>
                    <Progress value={creative.analysis.overall_score} className="h-2" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          {selectedCreative ? (
            <Tabs defaultValue="analysis">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="analysis">Analyse</TabsTrigger>
                <TabsTrigger value="performance">Performance</TabsTrigger>
                <TabsTrigger value="recommendations">Conseils</TabsTrigger>
                <TabsTrigger value="comparison">Comparaison</TabsTrigger>
              </TabsList>

              <TabsContent value="analysis" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>{selectedCreative.name}</CardTitle>
                      <Badge variant="outline" className={getScoreColor(selectedCreative.analysis.overall_score)}>
                        Score global: {selectedCreative.analysis.overall_score}/100
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Éléments visuels */}
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center">
                          <Palette className="w-4 h-4 mr-2" />
                          Éléments Visuels
                        </h4>
                        <div className="space-y-3">
                          {Object.entries(selectedCreative.analysis.visual_elements).map(([key, value]) => (
                            <div key={key}>
                              <div className="flex justify-between text-sm mb-1">
                                <span className="capitalize">{key.replace('_', ' ')}</span>
                                <span className={getScoreColor(value)}>{value}</span>
                              </div>
                              <Progress value={value} className="h-2" />
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Éléments textuels */}
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center">
                          <Type className="w-4 h-4 mr-2" />
                          Éléments Textuels
                        </h4>
                        <div className="space-y-3">
                          {Object.entries(selectedCreative.analysis.text_elements).map(([key, value]) => (
                            <div key={key}>
                              <div className="flex justify-between text-sm mb-1">
                                <span className="capitalize">{key.replace('_', ' ')}</span>
                                <span className={getScoreColor(value)}>{value}</span>
                              </div>
                              <Progress value={value} className="h-2" />
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Indicateurs de performance */}
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center">
                          <Target className="w-4 h-4 mr-2" />
                          Indicateurs Performance
                        </h4>
                        <div className="space-y-3">
                          {Object.entries(selectedCreative.analysis.performance_indicators).map(([key, value]) => (
                            <div key={key}>
                              <div className="flex justify-between text-sm mb-1">
                                <span className="capitalize">{key.replace('_', ' ')}</span>
                                <span className={getScoreColor(value)}>{value}</span>
                              </div>
                              <Progress value={value} className="h-2" />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Analyse Radar</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <RadarChart data={radarData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="subject" />
                        <PolarRadiusAxis angle={90} domain={[0, 100]} />
                        <Radar
                          name="Score"
                          dataKey="A"
                          stroke="#8884d8"
                          fill="#8884d8"
                          fillOpacity={0.3}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="performance">
                <Card>
                  <CardHeader>
                    <CardTitle>Performance du Créatif</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-blue-600">{selectedCreative.performance.ctr}%</p>
                        <p className="text-sm text-slate-600">CTR</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-green-600">${selectedCreative.performance.cpc}</p>
                        <p className="text-sm text-slate-600">CPC</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-purple-600">{selectedCreative.performance.impressions.toLocaleString()}</p>
                        <p className="text-sm text-slate-600">Impressions</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-orange-600">{selectedCreative.performance.clicks.toLocaleString()}</p>
                        <p className="text-sm text-slate-600">Clics</p>
                      </div>
                    </div>

                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={performanceData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="CTR" fill="#8884d8" />
                        <Bar dataKey="Score" fill="#82ca9d" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="recommendations" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Zap className="w-5 h-5 mr-2" />
                      Recommandations Prioritaires
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {selectedCreative.analysis.recommendations.map((rec, index) => (
                        <div key={index} className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                          <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium text-yellow-800">{rec}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Star className="w-5 h-5 mr-2" />
                      Améliorations Suggérées
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {selectedCreative.analysis.improvements.map((imp, index) => (
                        <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium text-blue-800">{imp}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="comparison">
                <Card>
                  <CardHeader>
                    <CardTitle>Comparaison des Créatifs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={performanceData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="CTR" fill="#8884d8" name="CTR (%)" />
                        <Bar dataKey="Score" fill="#82ca9d" name="Score" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <Eye className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-600 mb-2">
                  Sélectionnez un créatif à analyser
                </h3>
                <p className="text-slate-500">
                  Choisissez un créatif dans la liste pour voir son analyse détaillée
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
