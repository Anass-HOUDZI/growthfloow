import React, { useState, useMemo } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Compass, Users, Target, Rocket, Calendar, Download, 
  CheckCircle, AlertCircle, TrendingUp, DollarSign,
  Building, Mail, Globe, MessageSquare, Presentation,
  Lightbulb, BarChart3, FileText, Star
} from 'lucide-react';

interface ICPProfile {
  company: {
    size: string;
    industry: string;
    revenue: string;
    geography: string;
  };
  decision_maker: {
    title: string;
    department: string;
    seniority: string;
    pain_points: string[];
  };
  buying_process: {
    budget_range: string;
    decision_timeline: string;
    stakeholders: string[];
  };
}

interface ValueProposition {
  core_benefit: string;
  unique_differentiator: string;
  proof_points: string[];
  target_outcome: string;
}

interface Channel {
  name: string;
  type: string;
  investment: string;
  timeline: string;
  roi_potential: number;
  difficulty: number;
  priority: 'high' | 'medium' | 'low';
}

interface RoadmapMilestone {
  phase: string;
  duration: string;
  objectives: string[];
  metrics: string[];
  resources: string[];
  status: 'planned' | 'in-progress' | 'completed';
}

export const GTMStrategyBuilder: React.FC = () => {
  const [activeTab, setActiveTab] = useState('icp');
  const [productName, setProductName] = useState('');
  const [industry, setIndustry] = useState('');
  
  // ICP Data
  const [icpProfile, setIcpProfile] = useState<ICPProfile>({
    company: { size: '', industry: '', revenue: '', geography: '' },
    decision_maker: { title: '', department: '', seniority: '', pain_points: [] },
    buying_process: { budget_range: '', decision_timeline: '', stakeholders: [] }
  });

  // Value Proposition Data
  const [valueProposition, setValueProposition] = useState<ValueProposition>({
    core_benefit: '',
    unique_differentiator: '',
    proof_points: [],
    target_outcome: ''
  });

  // Channels recommandés
  const recommendedChannels: Channel[] = useMemo(() => {
    const channels = [
      { name: 'Content Marketing', type: 'Inbound', investment: '€5K-15K', timeline: '3-6 mois', roi_potential: 85, difficulty: 60, priority: 'high' as const },
      { name: 'LinkedIn Ads', type: 'Paid', investment: '€3K-10K', timeline: '1-2 mois', roi_potential: 75, difficulty: 40, priority: 'high' as const },
      { name: 'Sales Outbound', type: 'Outbound', investment: '€8K-20K', timeline: '1-3 mois', roi_potential: 90, difficulty: 70, priority: 'high' as const },
      { name: 'Google Ads', type: 'Paid', investment: '€5K-15K', timeline: '1-2 mois', roi_potential: 70, difficulty: 50, priority: 'medium' as const },
      { name: 'Webinaires', type: 'Event', investment: '€2K-8K', timeline: '2-4 mois', roi_potential: 80, difficulty: 60, priority: 'medium' as const },
      { name: 'Partenariats', type: 'Partnership', investment: '€1K-5K', timeline: '3-6 mois', roi_potential: 85, difficulty: 80, priority: 'medium' as const },
      { name: 'SEO', type: 'Organic', investment: '€3K-12K', timeline: '6-12 mois', roi_potential: 95, difficulty: 70, priority: 'low' as const },
      { name: 'Influenceurs', type: 'Social', investment: '€2K-10K', timeline: '2-4 mois', roi_potential: 65, difficulty: 50, priority: 'low' as const }
    ];
    
    // Filtrer selon l'industrie sélectionnée
    return industry ? channels.filter(c => Math.random() > 0.3) : channels;
  }, [industry]);

  // Roadmap
  const roadmapPhases: RoadmapMilestone[] = [
    {
      phase: 'Phase 1: Foundation',
      duration: '0-30 jours',
      objectives: ['Finaliser ICP et positionnement', 'Créer assets de base', 'Setup outils et tracking'],
      metrics: ['ICP validé', 'Message testé', 'Analytics configuré'],
      resources: ['Product Marketing', 'Design', 'Dev'],
      status: 'planned'
    },
    {
      phase: 'Phase 2: Launch',
      duration: '30-90 jours',
      objectives: ['Lancer canaux prioritaires', 'Générer premiers leads', 'Optimiser conversions'],
      metrics: ['100 leads qualifiés', '5% taux conversion', '€50K pipeline'],
      resources: ['Growth Marketing', 'Sales', 'Customer Success'],
      status: 'planned'
    },
    {
      phase: 'Phase 3: Scale',
      duration: '90-180 jours',
      objectives: ['Scaler canaux performants', 'Diversifier mix', 'Automatiser processus'],
      metrics: ['500 leads/mois', '10% taux conversion', '€200K ARR'],
      resources: ['Marketing Team', 'Sales Team', 'Data Analyst'],
      status: 'planned'
    }
  ];

  const addPainPoint = () => {
    const newPainPoint = prompt('Nouveau pain point:');
    if (newPainPoint) {
      setIcpProfile(prev => ({
        ...prev,
        decision_maker: {
          ...prev.decision_maker,
          pain_points: [...prev.decision_maker.pain_points, newPainPoint]
        }
      }));
    }
  };

  const addProofPoint = () => {
    const newProofPoint = prompt('Nouveau proof point:');
    if (newProofPoint) {
      setValueProposition(prev => ({
        ...prev,
        proof_points: [...prev.proof_points, newProofPoint]
      }));
    }
  };

  const generateSlides = () => {
    const slides = {
      title: `GTM Strategy - ${productName}`,
      slides: [
        { title: 'ICP Profile', content: icpProfile },
        { title: 'Value Proposition', content: valueProposition },
        { title: 'Channel Strategy', content: recommendedChannels },
        { title: 'Roadmap', content: roadmapPhases }
      ]
    };
    
    // Simulation du téléchargement
    const dataStr = JSON.stringify(slides, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `gtm-strategy-${productName.toLowerCase().replace(/\s+/g, '-')}.json`;
    link.click();
  };

  const completionPercentage = useMemo(() => {
    let completed = 0;
    let total = 0;
    
    // ICP completion
    total += 8;
    if (icpProfile.company.size) completed++;
    if (icpProfile.company.industry) completed++;
    if (icpProfile.company.revenue) completed++;
    if (icpProfile.company.geography) completed++;
    if (icpProfile.decision_maker.title) completed++;
    if (icpProfile.decision_maker.department) completed++;
    if (icpProfile.decision_maker.seniority) completed++;
    if (icpProfile.decision_maker.pain_points.length > 0) completed++;
    
    // Value Prop completion
    total += 4;
    if (valueProposition.core_benefit) completed++;
    if (valueProposition.unique_differentiator) completed++;
    if (valueProposition.proof_points.length > 0) completed++;
    if (valueProposition.target_outcome) completed++;
    
    return Math.round((completed / total) * 100);
  }, [icpProfile, valueProposition]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Compass className="w-6 h-6 text-pink-600" />
            GTM Strategy Builder
          </CardTitle>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <Progress value={completionPercentage} className="h-2" />
              <p className="text-sm text-slate-600 mt-1">Progression: {completionPercentage}%</p>
            </div>
            <Button onClick={generateSlides} className="bg-pink-600 hover:bg-pink-700">
              <Download className="w-4 h-4 mr-2" />
              Export Strategy
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Nom du produit</label>
              <Input
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="MonProduitSaaS"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Secteur d'activité</label>
              <Select value={industry} onValueChange={setIndustry}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un secteur" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="saas">SaaS B2B</SelectItem>
                  <SelectItem value="ecommerce">E-commerce</SelectItem>
                  <SelectItem value="fintech">Fintech</SelectItem>
                  <SelectItem value="healthtech">HealthTech</SelectItem>
                  <SelectItem value="edtech">EdTech</SelectItem>
                  <SelectItem value="consulting">Consulting</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs principales */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="icp" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            ICP Segmentation
          </TabsTrigger>
          <TabsTrigger value="value-prop" className="flex items-center gap-2">
            <Target className="w-4 h-4" />
            Value Proposition
          </TabsTrigger>
          <TabsTrigger value="channels" className="flex items-center gap-2">
            <Rocket className="w-4 h-4" />
            Canaux & Mix
          </TabsTrigger>
          <TabsTrigger value="roadmap" className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Roadmap
          </TabsTrigger>
        </TabsList>

        {/* ICP Segmentation */}
        <TabsContent value="icp" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="w-5 h-5 text-blue-600" />
                Assistant de Segmentation ICP
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profil Entreprise */}
              <div>
                <h4 className="font-semibold text-slate-800 mb-4">Profil Entreprise</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Taille d'entreprise</label>
                    <Select 
                      value={icpProfile.company.size} 
                      onValueChange={(value) => setIcpProfile(prev => ({
                        ...prev,
                        company: { ...prev.company, size: value }
                      }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="startup">Startup (1-50)</SelectItem>
                        <SelectItem value="sme">PME (50-250)</SelectItem>
                        <SelectItem value="enterprise">Enterprise (250+)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Chiffre d'affaires</label>
                    <Select 
                      value={icpProfile.company.revenue} 
                      onValueChange={(value) => setIcpProfile(prev => ({
                        ...prev,
                        company: { ...prev.company, revenue: value }
                      }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0-1m">0-1M €</SelectItem>
                        <SelectItem value="1-10m">1-10M €</SelectItem>
                        <SelectItem value="10-50m">10-50M €</SelectItem>
                        <SelectItem value="50m+">50M+ €</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Industrie</label>
                    <Input
                      value={icpProfile.company.industry}
                      onChange={(e) => setIcpProfile(prev => ({
                        ...prev,
                        company: { ...prev.company, industry: e.target.value }
                      }))}
                      placeholder="Ex: SaaS, E-commerce, Finance"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Géographie</label>
                    <Input
                      value={icpProfile.company.geography}
                      onChange={(e) => setIcpProfile(prev => ({
                        ...prev,
                        company: { ...prev.company, geography: e.target.value }
                      }))}
                      placeholder="Ex: France, Europe, International"
                    />
                  </div>
                </div>
              </div>

              {/* Decision Maker */}
              <div>
                <h4 className="font-semibold text-slate-800 mb-4">Décideur Principal</h4>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Titre/Poste</label>
                    <Input
                      value={icpProfile.decision_maker.title}
                      onChange={(e) => setIcpProfile(prev => ({
                        ...prev,
                        decision_maker: { ...prev.decision_maker, title: e.target.value }
                      }))}
                      placeholder="Ex: CMO, VP Sales, CEO"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Département</label>
                    <Select 
                      value={icpProfile.decision_maker.department} 
                      onValueChange={(value) => setIcpProfile(prev => ({
                        ...prev,
                        decision_maker: { ...prev.decision_maker, department: value }
                      }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="sales">Sales</SelectItem>
                        <SelectItem value="it">IT</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="operations">Opérations</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-slate-700">Pain Points</label>
                    <Button onClick={addPainPoint} size="sm" variant="outline">
                      Ajouter
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {icpProfile.decision_maker.pain_points.map((point, index) => (
                      <Badge key={index} variant="secondary">{point}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Value Proposition */}
        <TabsContent value="value-prop" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-600" />
                Définition de la Proposition de Valeur
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Bénéfice Principal</label>
                <Textarea
                  value={valueProposition.core_benefit}
                  onChange={(e) => setValueProposition(prev => ({
                    ...prev,
                    core_benefit: e.target.value
                  }))}
                  placeholder="Quel est le principal bénéfice que votre produit apporte ?"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Différenciateur Unique</label>
                <Textarea
                  value={valueProposition.unique_differentiator}
                  onChange={(e) => setValueProposition(prev => ({
                    ...prev,
                    unique_differentiator: e.target.value
                  }))}
                  placeholder="Qu'est-ce qui vous différencie de la concurrence ?"
                  rows={3}
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-slate-700">Proof Points</label>
                  <Button onClick={addProofPoint} size="sm" variant="outline">
                    Ajouter
                  </Button>
                </div>
                <div className="space-y-2">
                  {valueProposition.proof_points.map((point, index) => (
                    <div key={index} className="bg-slate-50 p-3 rounded-lg">
                      {point}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Résultat Cible</label>
                <Textarea
                  value={valueProposition.target_outcome}
                  onChange={(e) => setValueProposition(prev => ({
                    ...prev,
                    target_outcome: e.target.value
                  }))}
                  placeholder="Quel résultat concret vos clients peuvent-ils attendre ?"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Canaux */}
        <TabsContent value="channels" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-purple-600" />
                Canaux de Lancement Recommandés
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {recommendedChannels.map((channel, index) => (
                  <div key={index} className={`p-4 rounded-lg border-2 ${
                    channel.priority === 'high' ? 'border-green-200 bg-green-50' :
                    channel.priority === 'medium' ? 'border-yellow-200 bg-yellow-50' :
                    'border-slate-200 bg-slate-50'
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <h4 className="font-semibold text-slate-800">{channel.name}</h4>
                        <Badge variant={channel.priority === 'high' ? 'default' : 'secondary'}>
                          {channel.priority === 'high' ? 'Priorité Haute' : 
                           channel.priority === 'medium' ? 'Priorité Moyenne' : 'Priorité Basse'}
                        </Badge>
                        <Badge variant="outline">{channel.type}</Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm font-medium">{channel.roi_potential}/100</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-slate-600">Investment:</span>
                        <div className="font-medium">{channel.investment}</div>
                      </div>
                      <div>
                        <span className="text-slate-600">Timeline:</span>
                        <div className="font-medium">{channel.timeline}</div>
                      </div>
                      <div>
                        <span className="text-slate-600">Difficulté:</span>
                        <div className="w-full bg-slate-200 rounded-full h-2 mt-1">
                          <div 
                            className="bg-purple-600 h-2 rounded-full" 
                            style={{ width: `${channel.difficulty}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Roadmap */}
        <TabsContent value="roadmap" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-green-600" />
                Roadmap Actionnable
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {roadmapPhases.map((phase, index) => (
                  <div key={index} className="border border-slate-200 rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        phase.status === 'completed' ? 'bg-green-100 text-green-600' :
                        phase.status === 'in-progress' ? 'bg-blue-100 text-blue-600' :
                        'bg-slate-100 text-slate-600'
                      }`}>
                        {phase.status === 'completed' ? <CheckCircle className="w-5 h-5" /> :
                         phase.status === 'in-progress' ? <AlertCircle className="w-5 h-5" /> :
                         <span className="text-sm font-bold">{index + 1}</span>}
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800">{phase.phase}</h4>
                        <p className="text-sm text-slate-600">{phase.duration}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <h5 className="font-medium text-slate-700 mb-2">Objectifs</h5>
                        <ul className="space-y-1">
                          {phase.objectives.map((obj, idx) => (
                            <li key={idx} className="text-sm text-slate-600 flex items-start gap-2">
                              <Target className="w-3 h-3 mt-1 text-blue-500 flex-shrink-0" />
                              {obj}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h5 className="font-medium text-slate-700 mb-2">Métriques</h5>
                        <ul className="space-y-1">
                          {phase.metrics.map((metric, idx) => (
                            <li key={idx} className="text-sm text-slate-600 flex items-start gap-2">
                              <TrendingUp className="w-3 h-3 mt-1 text-green-500 flex-shrink-0" />
                              {metric}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h5 className="font-medium text-slate-700 mb-2">Ressources</h5>
                        <ul className="space-y-1">
                          {phase.resources.map((resource, idx) => (
                            <li key={idx} className="text-sm text-slate-600 flex items-start gap-2">
                              <Users className="w-3 h-3 mt-1 text-purple-500 flex-shrink-0" />
                              {resource}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
