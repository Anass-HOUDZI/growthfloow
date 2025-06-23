
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, Eye, Palette, MousePointer, Type, Image, Layout } from 'lucide-react';

interface MockupGeneratorProps {
  url: string;
  recommendations: Array<{
    priority: 'High' | 'Medium' | 'Low';
    element: string;
    issue: string;
    impact: string;
  }>;
}

export const MockupGenerator: React.FC<MockupGeneratorProps> = ({ url, recommendations }) => {
  const [selectedOptimization, setSelectedOptimization] = useState('cta');
  
  const optimizations = {
    cta: {
      title: 'Optimisation CTA',
      icon: MousePointer,
      before: {
        description: 'CTA actuel avec faible contraste',
        features: ['Couleur peu visible', 'Texte générique', 'Position non optimale']
      },
      after: {
        description: 'CTA optimisé pour la conversion',
        features: ['Contraste élevé', 'Texte orienté action', 'Position stratégique', 'Urgence créée']
      }
    },
    headlines: {
      title: 'Titres & Headlines',
      icon: Type,
      before: {
        description: 'Titre générique sans impact',
        features: ['Manque de clarté', 'Pas de valeur ajoutée', 'Trop long']
      },
      after: {
        description: 'Titre percutant et clair',
        features: ['Bénéfice immédiat', 'Concis et impactant', 'Mots-clés pertinents']
      }
    },
    layout: {
      title: 'Structure & Layout',
      icon: Layout,
      before: {
        description: 'Mise en page non optimisée',
        features: ['Hiérarchie visuelle faible', 'Espacement insuffisant', 'Flux utilisateur confus']
      },
      after: {
        description: 'Layout optimisé pour la conversion',
        features: ['Hiérarchie claire', 'Espacement optimal', 'Parcours utilisateur fluide']
      }
    },
    visuals: {
      title: 'Éléments Visuels',
      icon: Image,
      before: {
        description: 'Images non optimisées',
        features: ['Qualité moyenne', 'Pas de focus produit', 'Chargement lent']
      },
      after: {
        description: 'Visuels haute conversion',
        features: ['Haute qualité', 'Focus sur les bénéfices', 'Optimisés pour la vitesse']
      }
    }
  };

  const generateMockup = (type: string) => {
    // Simulation de génération de mockup
    console.log(`Génération du mockup ${type} pour ${url}`);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Palette className="w-5 h-5" />
            <span>Mockups d'Optimisation</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedOptimization} onValueChange={setSelectedOptimization}>
            <TabsList className="grid grid-cols-4 w-full">
              {Object.entries(optimizations).map(([key, opt]) => {
                const Icon = opt.icon;
                return (
                  <TabsTrigger key={key} value={key} className="flex items-center space-x-1">
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{opt.title}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {Object.entries(optimizations).map(([key, opt]) => (
              <TabsContent key={key} value={key} className="mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Avant */}
                  <Card className="border-red-200">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">❌ Avant</CardTitle>
                        <Badge variant="destructive">À améliorer</Badge>
                      </div>
                      <p className="text-sm text-slate-600">{opt.before.description}</p>
                    </CardHeader>
                    <CardContent>
                      {/* Mockup visuel - Avant */}
                      <div className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-dashed border-red-200 rounded-lg p-8 text-center mb-4">
                        <Eye className="w-12 h-12 text-red-400 mx-auto mb-3" />
                        <p className="text-red-600 font-medium">Version Actuelle</p>
                        <p className="text-sm text-red-500">Conversion estimée: 2.1%</p>
                      </div>
                      
                      <div className="space-y-2">
                        <h5 className="font-medium text-slate-700">Problèmes identifiés :</h5>
                        {opt.before.features.map((feature, index) => (
                          <div key={index} className="flex items-center space-x-2 text-sm text-red-600">
                            <div className="w-2 h-2 bg-red-400 rounded-full flex-shrink-0" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Après */}
                  <Card className="border-green-200">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">✅ Après</CardTitle>
                        <Badge className="bg-green-100 text-green-800">Optimisé</Badge>
                      </div>
                      <p className="text-sm text-slate-600">{opt.after.description}</p>
                    </CardHeader>
                    <CardContent>
                      {/* Mockup visuel - Après */}
                      <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-dashed border-green-200 rounded-lg p-8 text-center mb-4">
                        <Eye className="w-12 h-12 text-green-500 mx-auto mb-3" />
                        <p className="text-green-700 font-medium">Version Optimisée</p>
                        <p className="text-sm text-green-600">Conversion projetée: 4.2%</p>
                        <Badge className="mt-2 bg-green-200 text-green-800">+100% conversion</Badge>
                      </div>
                      
                      <div className="space-y-2">
                        <h5 className="font-medium text-slate-700">Améliorations apportées :</h5>
                        {opt.after.features.map((feature, index) => (
                          <div key={index} className="flex items-center space-x-2 text-sm text-green-600">
                            <div className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Actions */}
                <div className="flex justify-center space-x-4 mt-6">
                  <Button 
                    onClick={() => generateMockup(key)}
                    className="flex items-center space-x-2"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Voir le mockup détaillé</span>
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => generateMockup(key)}
                    className="flex items-center space-x-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Télécharger les spécifications</span>
                  </Button>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {/* Recommandations liées */}
      <Card>
        <CardHeader>
          <CardTitle>Recommandations pour cette optimisation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recommendations
              .filter(rec => rec.element.toLowerCase().includes(selectedOptimization))
              .map((rec, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-slate-50 rounded-lg">
                  <Badge className={`text-xs ${
                    rec.priority === 'High' ? 'bg-red-100 text-red-800' :
                    rec.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {rec.priority}
                  </Badge>
                  <div className="flex-1">
                    <p className="text-sm text-slate-700">{rec.issue}</p>
                    <p className="text-xs text-green-600 mt-1">{rec.impact}</p>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
