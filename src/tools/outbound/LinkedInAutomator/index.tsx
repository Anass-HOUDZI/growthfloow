
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Linkedin, Users, MessageSquare, UserPlus, BarChart, Calendar } from 'lucide-react';

interface CampaignMetrics {
  sent: number;
  accepted: number;
  responded: number;
  meetings: number;
  acceptanceRate: number;
  responseRate: number;
}

interface AutomationRule {
  id: string;
  name: string;
  trigger: string;
  action: string;
  enabled: boolean;
  delay: number;
}

export const LinkedInAutomator = () => {
  const [campaignName, setCampaignName] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [connectionMessage, setConnectionMessage] = useState('');
  const [followUpMessage, setFollowUpMessage] = useState('');
  const [selectedCampaignType, setSelectedCampaignType] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  
  const [automationRules, setAutomationRules] = useState<AutomationRule[]>([
    {
      id: '1',
      name: 'Suivi automatique après acceptation',
      trigger: 'Connection acceptée',
      action: 'Envoyer message de remerciement',
      enabled: true,
      delay: 24
    },
    {
      id: '2',
      name: 'Relance après 1 semaine',
      trigger: 'Pas de réponse après 7 jours',
      action: 'Envoyer message de suivi',
      enabled: false,
      delay: 168
    },
    {
      id: '3',
      name: 'Engagement sur posts',
      trigger: 'Nouveau post du prospect',
      action: 'Liker et commenter automatiquement',
      enabled: true,
      delay: 2
    }
  ]);

  const mockMetrics: CampaignMetrics = {
    sent: 150,
    accepted: 48,
    responded: 12,
    meetings: 3,
    acceptanceRate: 32,
    responseRate: 25
  };

  const launchCampaign = () => {
    setIsRunning(true);
    // Simulation
    setTimeout(() => setIsRunning(false), 3000);
  };

  const toggleRule = (ruleId: string) => {
    setAutomationRules(prev =>
      prev.map(rule =>
        rule.id === ruleId ? { ...rule, enabled: !rule.enabled } : rule
      )
    );
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl flex items-center justify-center mx-auto">
          <Linkedin className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-slate-800">
          LinkedIn Automator
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Automatisez vos campagnes de prospection LinkedIn avec des règles intelligentes et des messages personnalisés.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Métriques temps réel */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart className="w-5 h-5" />
              <span>Performance</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{mockMetrics.sent}</div>
                <div className="text-xs text-slate-500">Invitations envoyées</div>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{mockMetrics.accepted}</div>
                <div className="text-xs text-slate-500">Acceptées</div>
              </div>
              <div className="text-center p-3 bg-yellow-50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">{mockMetrics.responded}</div>
                <div className="text-xs text-slate-500">Réponses</div>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{mockMetrics.meetings}</div>
                <div className="text-xs text-slate-500">RDV obtenus</div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Taux d'acceptation</span>
                <span className="font-medium">{mockMetrics.acceptanceRate}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Taux de réponse</span>
                <span className="font-medium">{mockMetrics.responseRate}%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Configuration campagne */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Nouvelle Campagne</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="campaign-name">Nom de la campagne</Label>
                <Input
                  id="campaign-name"
                  placeholder="Prospection CMO SaaS Q1"
                  value={campaignName}
                  onChange={(e) => setCampaignName(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Type de campagne</Label>
                <Select value={selectedCampaignType} onValueChange={setSelectedCampaignType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cold-outreach">Cold Outreach</SelectItem>
                    <SelectItem value="warm-connections">Connexions chaudes</SelectItem>
                    <SelectItem value="event-follow-up">Suivi événement</SelectItem>
                    <SelectItem value="content-engagement">Engagement contenu</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="target-audience">Audience cible</Label>
              <Input
                id="target-audience"
                placeholder="CMO, VP Marketing dans le SaaS, 100-500 employés, France"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="connection-message">Message d'invitation</Label>
              <Textarea
                id="connection-message"
                placeholder="Bonjour {firstName}, j'ai vu votre profil et serais intéressé par un échange sur..."
                className="min-h-[80px]"
                value={connectionMessage}
                onChange={(e) => setConnectionMessage(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="follow-up-message">Message de suivi</Label>
              <Textarea
                id="follow-up-message"
                placeholder="Merci {firstName} d'avoir accepté ma connexion. J'espère que..."
                className="min-h-[80px]"
                value={followUpMessage}
                onChange={(e) => setFollowUpMessage(e.target.value)}
              />
            </div>

            <Button 
              onClick={launchCampaign}
              disabled={isRunning || !campaignName || !connectionMessage}
              className="w-full"
            >
              {isRunning ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Lancement en cours...
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Lancer la campagne
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Règles d'automatisation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageSquare className="w-5 h-5" />
            <span>Règles d'Automatisation</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {automationRules.map((rule) => (
            <div key={rule.id} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <Switch
                    checked={rule.enabled}
                    onCheckedChange={() => toggleRule(rule.id)}
                  />
                  <h4 className="font-medium text-slate-800">{rule.name}</h4>
                  <Badge variant={rule.enabled ? "default" : "secondary"}>
                    {rule.enabled ? 'Activé' : 'Désactivé'}
                  </Badge>
                </div>
                <div className="text-sm text-slate-600 ml-8">
                  <p><strong>Déclencheur:</strong> {rule.trigger}</p>
                  <p><strong>Action:</strong> {rule.action}</p>
                  <p><strong>Délai:</strong> {rule.delay}h après déclenchement</p>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Campagnes actives */}
      <Tabs defaultValue="active" className="w-full">
        <TabsList>
          <TabsTrigger value="active">Campagnes Actives</TabsTrigger>
          <TabsTrigger value="history">Historique</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          <Card>
            <CardHeader>
              <CardTitle>Campagnes en Cours</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                  <div>
                    <h4 className="font-medium text-slate-800">Prospection CMO SaaS Q1</h4>
                    <p className="text-sm text-slate-600">Lancée il y a 5 jours • 45 invitations envoyées</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-green-100 text-green-800">En cours</Badge>
                    <Button variant="outline" size="sm">Voir détails</Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                  <div>
                    <h4 className="font-medium text-slate-800">Suivi Salon Marketing</h4>
                    <p className="text-sm text-slate-600">Lancée il y a 2 jours • 28 invitations envoyées</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-green-100 text-green-800">En cours</Badge>
                    <Button variant="outline" size="sm">Voir détails</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Historique des Campagnes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                  <div>
                    <h4 className="font-medium text-slate-800">Prospection Directeurs IT</h4>
                    <p className="text-sm text-slate-600">Terminée • 150 invitations • 32% acceptation</p>
                  </div>
                  <Badge className="bg-gray-100 text-gray-800">Terminée</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates">
          <Card>
            <CardHeader>
              <CardTitle>Templates de Messages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border border-slate-200 rounded-lg">
                  <h4 className="font-medium mb-2">Approche directe B2B</h4>
                  <p className="text-sm text-slate-600 mb-3">Pour les prospects sans connexion commune</p>
                  <Button variant="outline" size="sm">Utiliser ce template</Button>
                </div>
                
                <div className="p-4 border border-slate-200 rounded-lg">
                  <h4 className="font-medium mb-2">Suivi événement</h4>
                  <p className="text-sm text-slate-600 mb-3">Pour les prospects rencontrés en événement</p>
                  <Button variant="outline" size="sm">Utiliser ce template</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
