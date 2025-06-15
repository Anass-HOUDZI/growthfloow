
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { Database, Zap, Settings, CheckCircle, AlertCircle, RefreshCw, BarChart } from 'lucide-react';

interface CRMIntegration {
  id: string;
  name: string;
  status: 'connected' | 'disconnected' | 'syncing' | 'error';
  lastSync: string;
  recordsCount: number;
  enabled: boolean;
}

interface SyncRule {
  id: string;
  name: string;
  source: string;
  destination: string;
  frequency: string;
  enabled: boolean;
  lastRun: string;
}

interface DataMetrics {
  totalContacts: number;
  totalDeals: number;
  syncedToday: number;
  errors: number;
}

export const CRMIntegrationHub = () => {
  const [integrations, setIntegrations] = useState<CRMIntegration[]>([
    {
      id: 'salesforce',
      name: 'Salesforce',
      status: 'connected',
      lastSync: '2024-01-15 14:30',
      recordsCount: 2450,
      enabled: true
    },
    {
      id: 'hubspot',
      name: 'HubSpot',
      status: 'connected',
      lastSync: '2024-01-15 14:25',
      recordsCount: 1820,
      enabled: true
    },
    {
      id: 'pipedrive',
      name: 'Pipedrive',
      status: 'disconnected',
      lastSync: '2024-01-10 09:15',
      recordsCount: 0,
      enabled: false
    }
  ]);

  const [syncRules, setSyncRules] = useState<SyncRule[]>([
    {
      id: '1',
      name: 'Prospects vers Salesforce',
      source: 'Outbound Tools',
      destination: 'Salesforce',
      frequency: 'Temps réel',
      enabled: true,
      lastRun: '2024-01-15 14:30'
    },
    {
      id: '2',
      name: 'Leads LinkedIn vers HubSpot',
      source: 'LinkedIn Automator',
      destination: 'HubSpot',
      frequency: 'Toutes les heures',
      enabled: true,
      lastRun: '2024-01-15 14:00'
    },
    {
      id: '3',
      name: 'Analyse des appels vers CRM',
      source: 'Call Analyzer',
      destination: 'Salesforce',
      frequency: 'Quotidienne',
      enabled: false,
      lastRun: '2024-01-14 08:00'
    }
  ]);

  const mockMetrics: DataMetrics = {
    totalContacts: 4270,
    totalDeals: 245,
    syncedToday: 156,
    errors: 3
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'bg-green-100 text-green-800';
      case 'syncing': return 'bg-blue-100 text-blue-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return <CheckCircle className="w-4 h-4" />;
      case 'syncing': return <RefreshCw className="w-4 h-4 animate-spin" />;
      case 'error': return <AlertCircle className="w-4 h-4" />;
      default: return <Database className="w-4 h-4" />;
    }
  };

  const toggleIntegration = (id: string) => {
    setIntegrations(prev =>
      prev.map(integration =>
        integration.id === id ? { ...integration, enabled: !integration.enabled } : integration
      )
    );
  };

  const toggleSyncRule = (id: string) => {
    setSyncRules(prev =>
      prev.map(rule =>
        rule.id === id ? { ...rule, enabled: !rule.enabled } : rule
      )
    );
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center mx-auto">
          <Database className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-slate-800">
          CRM Integration Hub
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Centralisez et synchronisez vos données entre tous vos outils de prospection et votre CRM avec des règles de synchronisation intelligentes.
        </p>
      </div>

      {/* Métriques globales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-blue-600">{mockMetrics.totalContacts.toLocaleString()}</div>
            <div className="text-sm text-slate-500">Contacts synchronisés</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-green-600">{mockMetrics.totalDeals}</div>
            <div className="text-sm text-slate-500">Opportunités actives</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-purple-600">{mockMetrics.syncedToday}</div>
            <div className="text-sm text-slate-500">Sync aujourd'hui</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-red-600">{mockMetrics.errors}</div>
            <div className="text-sm text-slate-500">Erreurs à traiter</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="integrations" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="integrations">Intégrations</TabsTrigger>
          <TabsTrigger value="sync-rules">Règles de Sync</TabsTrigger>
          <TabsTrigger value="mapping">Mapping Champs</TabsTrigger>
          <TabsTrigger value="logs">Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="integrations">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Database className="w-5 h-5" />
                <span>Intégrations CRM</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {integrations.map((integration) => (
                <div key={integration.id} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                      {getStatusIcon(integration.status)}
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-800">{integration.name}</h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge className={getStatusColor(integration.status)}>
                          {integration.status}
                        </Badge>
                        <span className="text-sm text-slate-500">
                          {integration.recordsCount.toLocaleString()} contacts
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        Dernière sync: {integration.lastSync}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Switch
                      checked={integration.enabled}
                      onCheckedChange={() => toggleIntegration(integration.id)}
                    />
                    <Button variant="outline" size="sm">
                      <Settings className="w-4 h-4 mr-2" />
                      Configurer
                    </Button>
                  </div>
                </div>
              ))}
              
              <Button className="w-full" variant="outline">
                <Zap className="w-4 h-4 mr-2" />
                Ajouter une nouvelle intégration
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sync-rules">
          <Card>
            <CardHeader>
              <CardTitle>Règles de Synchronisation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {syncRules.map((rule) => (
                <div key={rule.id} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <Switch
                        checked={rule.enabled}
                        onCheckedChange={() => toggleSyncRule(rule.id)}
                      />
                      <h4 className="font-medium text-slate-800">{rule.name}</h4>
                      <Badge variant={rule.enabled ? "default" : "secondary"}>
                        {rule.enabled ? 'Actif' : 'Inactif'}
                      </Badge>
                    </div>
                    <div className="ml-8 space-y-1">
                      <p className="text-sm text-slate-600">
                        <span className="font-medium">Source:</span> {rule.source}
                      </p>
                      <p className="text-sm text-slate-600">
                        <span className="font-medium">Destination:</span> {rule.destination}
                      </p>
                      <p className="text-sm text-slate-500">
                        Fréquence: {rule.frequency} • Dernière exécution: {rule.lastRun}
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Modifier
                  </Button>
                </div>
              ))}
              
              <Button className="w-full" variant="outline">
                Créer une nouvelle règle
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mapping">
          <Card>
            <CardHeader>
              <CardTitle>Mapping des Champs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4 p-4 bg-slate-50 rounded-lg">
                  <div className="font-medium text-slate-800">Champ Source</div>
                  <div className="font-medium text-slate-800">Champ CRM</div>
                  <div className="font-medium text-slate-800">Action</div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 p-4 border border-slate-200 rounded-lg">
                  <div className="text-slate-600">prospect_name</div>
                  <div className="text-slate-600">First_Name__c</div>
                  <Button variant="outline" size="sm">Modifier</Button>
                </div>
                
                <div className="grid grid-cols-3 gap-4 p-4 border border-slate-200 rounded-lg">
                  <div className="text-slate-600">company_name</div>
                  <div className="text-slate-600">Account_Name__c</div>
                  <Button variant="outline" size="sm">Modifier</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart className="w-5 h-5" />
                <span>Logs de Synchronisation</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <div>
                      <div className="font-medium text-green-800">Sync Salesforce réussie</div>
                      <div className="text-sm text-green-600">45 contacts synchronisés</div>
                    </div>
                  </div>
                  <div className="text-sm text-green-600">14:30</div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <RefreshCw className="w-5 h-5 text-blue-600" />
                    <div>
                      <div className="font-medium text-blue-800">Sync HubSpot en cours</div>
                      <div className="text-sm text-blue-600">12 contacts en attente</div>
                    </div>
                  </div>
                  <div className="text-sm text-blue-600">14:25</div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    <div>
                      <div className="font-medium text-red-800">Erreur mapping Pipedrive</div>
                      <div className="text-sm text-red-600">Champ 'company_size' non trouvé</div>
                    </div>
                  </div>
                  <div className="text-sm text-red-600">12:15</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
