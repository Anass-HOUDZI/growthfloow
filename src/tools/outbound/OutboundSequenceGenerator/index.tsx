import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Mail, Calendar, MessageSquare, Copy, Download, Zap, Phone } from 'lucide-react';

interface SequenceStep {
  day: number;
  channel: 'email' | 'linkedin' | 'phone';
  subject: string;
  content: string;
  cta: string;
}

interface SequenceTemplate {
  name: string;
  industry: string;
  persona: string;
  steps: SequenceStep[];
  conversionRate: string;
}

export const OutboundSequenceGenerator = () => {
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [selectedPersona, setSelectedPersona] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [productName, setProductName] = useState('');
  const [generatedSequence, setGeneratedSequence] = useState<SequenceTemplate | null>(null);

  const sequenceTemplates: Record<string, SequenceTemplate> = {
    'saas-cmo': {
      name: 'SaaS CMO Sequence',
      industry: 'SaaS',
      persona: 'CMO',
      conversionRate: '12-15%',
      steps: [
        {
          day: 1,
          channel: 'email',
          subject: 'Question rapide sur votre stack marketing',
          content: `Bonjour {firstName},

J'ai remarqué que {companyName} connaît une belle croissance et j'imagine que l'alignement marketing-ventes devient crucial.

Beaucoup de CMOs comme vous font face au défi de prouver le ROI marketing. 

Question rapide : quel est votre plus gros challenge actuel pour mesurer l'impact de vos campagnes ?

Cordialement,
{senderName}`,
          cta: 'Répondre à la question'
        },
        {
          day: 4,
          channel: 'linkedin',
          subject: '',
          content: `Salut {firstName},

Je viens de voir votre post sur l'attribution marketing - excellent point sur la complexité du parcours client !

Nous aidons des CMOs comme chez {similarCompany} à résoudre exactement ce problème. 

Seriez-vous ouvert à un échange de 15 minutes cette semaine ?`,
          cta: 'Planifier un appel'
        },
        {
          day: 7,
          channel: 'email',
          subject: 'ROI marketing : étude de cas {similarCompany}',
          content: `Bonjour {firstName},

J'ai pensé à notre échange sur l'attribution marketing.

Voici comment {similarCompany} a augmenté son ROI marketing de 40% en 6 mois : [lien vers case study]

Cela résonne avec vos défis actuels ?

Si oui, j'ai 15 minutes mercredi ou jeudi pour vous montrer leur approche exacte.

Cordialement,
{senderName}`,
          cta: 'Voir l\'étude de cas'
        },
        {
          day: 11,
          channel: 'email',
          subject: 'Dernière tentative - attribution marketing',
          content: `Bonjour {firstName},

Je ne veux pas insister, mais je sais à quel point l'attribution marketing peut être frustrante.

Si jamais vous voulez voir comment d'autres CMOs ont résolu ce problème, je suis là.

Sinon, je vous laisse tranquille 😊

Bonne journée !
{senderName}`,
          cta: 'Dernière chance'
        }
      ]
    }
  };

  const generateSequence = () => {
    const key = `${selectedIndustry.toLowerCase()}-${selectedPersona.toLowerCase()}`;
    const template = sequenceTemplates[key] || sequenceTemplates['saas-cmo'];
    
    // Personnalisation avec les données fournies
    const personalizedSteps = template.steps.map(step => ({
      ...step,
      content: step.content
        .replace(/{companyName}/g, companyName || '[Nom de l\'entreprise]')
        .replace(/{productName}/g, productName || '[Nom du produit]')
    }));

    setGeneratedSequence({
      ...template,
      steps: personalizedSteps
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'email': return <Mail className="w-4 h-4" />;
      case 'linkedin': return <MessageSquare className="w-4 h-4" />;
      case 'phone': return <Phone className="w-4 h-4" />;
      default: return <Mail className="w-4 h-4" />;
    }
  };

  const getChannelColor = (channel: string) => {
    switch (channel) {
      case 'email': return 'bg-blue-100 text-blue-800';
      case 'linkedin': return 'bg-purple-100 text-purple-800';
      case 'phone': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center mx-auto">
          <Zap className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-slate-800">
          Outbound Sequence Generator
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Générez des séquences de prospection multi-canal personnalisées avec des templates optimisés par industrie et persona.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Configuration de la Séquence</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Industrie cible</Label>
              <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une industrie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="saas">SaaS / Tech</SelectItem>
                  <SelectItem value="ecommerce">E-commerce</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="healthcare">Santé</SelectItem>
                  <SelectItem value="manufacturing">Industrie</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Persona cible</Label>
              <Select value={selectedPersona} onValueChange={setSelectedPersona}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un persona" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cmo">CMO / VP Marketing</SelectItem>
                  <SelectItem value="cto">CTO / VP Tech</SelectItem>
                  <SelectItem value="cfo">CFO / VP Finance</SelectItem>
                  <SelectItem value="ceo">CEO / Founder</SelectItem>
                  <SelectItem value="manager">Manager / Director</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="company-name">Nom de votre entreprise</Label>
              <Input
                id="company-name"
                placeholder="GrowthTools"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="product-name">Nom de votre produit</Label>
              <Input
                id="product-name"
                placeholder="Marketing Analytics Suite"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>
          </div>

          <Button 
            onClick={generateSequence}
            disabled={!selectedIndustry || !selectedPersona}
            className="w-full"
          >
            <Zap className="w-4 h-4 mr-2" />
            Générer la séquence
          </Button>
        </CardContent>
      </Card>

      {generatedSequence && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{generatedSequence.name}</CardTitle>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">{generatedSequence.conversionRate} taux de conversion</Badge>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Exporter
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4 text-sm text-slate-600">
                <span>Industrie: {generatedSequence.industry}</span>
                <span>•</span>
                <span>Persona: {generatedSequence.persona}</span>
                <span>•</span>
                <span>{generatedSequence.steps.length} étapes</span>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="sequence" className="w-full">
            <TabsList>
              <TabsTrigger value="sequence">Séquence complète</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="sequence" className="space-y-4">
              {generatedSequence.steps.map((step, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <Badge className={getChannelColor(step.channel)}>
                              {getChannelIcon(step.channel)}
                              <span className="ml-1 capitalize">{step.channel}</span>
                            </Badge>
                            <span className="text-sm text-slate-500">Jour {step.day}</span>
                          </div>
                          {step.subject && (
                            <h3 className="font-medium text-slate-800 mt-1">{step.subject}</h3>
                          )}
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(step.content)}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-slate-50 p-4 rounded-lg mb-4">
                      <pre className="whitespace-pre-wrap text-sm text-slate-700">
                        {step.content}
                      </pre>
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">{step.cta}</Badge>
                      <span className="text-xs text-slate-500">
                        Temps d'attente: {index < generatedSequence.steps.length - 1 ? 
                          `${generatedSequence.steps[index + 1].day - step.day} jours` : 
                          'Fin de séquence'
                        }
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="timeline">
              <Card>
                <CardHeader>
                  <CardTitle>Timeline de la séquence</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {generatedSequence.steps.map((step, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <div className="flex flex-col items-center">
                          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                          {index < generatedSequence.steps.length - 1 && (
                            <div className="w-px h-12 bg-slate-200 mt-2"></div>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-medium">Jour {step.day}</span>
                            <Badge className={getChannelColor(step.channel)}>
                              {step.channel}
                            </Badge>
                          </div>
                          <p className="text-sm text-slate-600">
                            {step.subject || `Message ${step.channel}`}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Taux d'ouverture estimé</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-green-600">68%</div>
                    <p className="text-sm text-slate-500">Basé sur l'industrie {generatedSequence.industry}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Taux de réponse estimé</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-blue-600">{generatedSequence.conversionRate}</div>
                    <p className="text-sm text-slate-500">Optimisé pour {generatedSequence.persona}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Durée totale</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-purple-600">
                      {Math.max(...generatedSequence.steps.map(s => s.day))} jours
                    </div>
                    <p className="text-sm text-slate-500">{generatedSequence.steps.length} points de contact</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
};
