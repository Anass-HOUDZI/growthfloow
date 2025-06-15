
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Users, Building, TrendingUp, AlertCircle, Star, Calendar } from 'lucide-react';

interface CompanyIntelligence {
  companyName: string;
  industry: string;
  employees: string;
  revenue: string;
  growth: number;
  technologies: string[];
  recentNews: NewsItem[];
  keyContacts: Contact[];
  socialActivity: SocialMetric[];
  riskScore: number;
}

interface NewsItem {
  title: string;
  date: string;
  source: string;
  sentiment: 'positive' | 'neutral' | 'negative';
}

interface Contact {
  name: string;
  title: string;
  department: string;
  linkedin: string;
  recentActivity: string;
}

interface SocialMetric {
  platform: string;
  followers: number;
  engagement: number;
  recentPosts: number;
}

export const SalesIntelligenceHub = () => {
  const [companyName, setCompanyName] = useState('');
  const [isResearching, setIsResearching] = useState(false);
  const [intelligence, setIntelligence] = useState<CompanyIntelligence | null>(null);

  const researchCompany = async () => {
    setIsResearching(true);
    
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const mockIntelligence: CompanyIntelligence = {
      companyName: companyName || 'TechCorp Solutions',
      industry: 'SaaS/Technology',
      employees: '150-500',
      revenue: '€10M-50M',
      growth: 85,
      technologies: ['Salesforce', 'HubSpot', 'Google Analytics', 'Slack', 'AWS'],
      recentNews: [
        {
          title: 'TechCorp lève 15M€ en série B',
          date: '2024-01-10',
          source: 'TechCrunch',
          sentiment: 'positive'
        },
        {
          title: 'Nouveau partenariat avec Microsoft',
          date: '2024-01-05',
          source: 'Business Wire',
          sentiment: 'positive'
        },
        {
          title: 'Expansion européenne annoncée',
          date: '2023-12-20',
          source: 'Les Échos',
          sentiment: 'positive'
        }
      ],
      keyContacts: [
        {
          name: 'Sophie Martin',
          title: 'VP Marketing',
          department: 'Marketing',
          linkedin: '/in/sophie-martin',
          recentActivity: 'Post sur l\'IA en marketing il y a 2 jours'
        },
        {
          name: 'Pierre Dubois',
          title: 'CTO',
          department: 'Technology',
          linkedin: '/in/pierre-dubois',
          recentActivity: 'Conférence tech la semaine dernière'
        },
        {
          name: 'Marie Leroy',
          title: 'Head of Sales',
          department: 'Sales',
          linkedin: '/in/marie-leroy',
          recentActivity: 'Nouveau post sur LinkedIn hier'
        }
      ],
      socialActivity: [
        { platform: 'LinkedIn', followers: 15000, engagement: 4.2, recentPosts: 12 },
        { platform: 'Twitter', followers: 8500, engagement: 2.8, recentPosts: 25 },
        { platform: 'Instagram', followers: 3200, engagement: 3.5, recentPosts: 8 }
      ],
      riskScore: 25
    };

    setIntelligence(mockIntelligence);
    setIsResearching(false);
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'bg-green-100 text-green-800';
      case 'negative': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskColor = (score: number) => {
    if (score <= 30) return 'text-green-600';
    if (score <= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mx-auto">
          <Search className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-slate-800">
          Sales Intelligence Hub
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Collectez automatiquement des données stratégiques sur vos prospects avec une analyse complète de l'entreprise, des contacts clés et des signaux d'achat.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recherche d'Intelligence</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="company-name">Nom de l'entreprise</Label>
            <Input
              id="company-name"
              placeholder="TechCorp Solutions"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>
          
          <Button 
            onClick={researchCompany}
            disabled={isResearching || !companyName}
            className="w-full"
          >
            {isResearching ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Recherche en cours...
              </>
            ) : (
              <>
                <Search className="w-4 h-4 mr-2" />
                Lancer la recherche
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {intelligence && (
        <div className="space-y-6">
          {/* Vue d'ensemble */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{intelligence.companyName}</span>
                <Badge className="bg-green-100 text-green-800">
                  Croissance: {intelligence.growth}%
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{intelligence.employees}</div>
                  <div className="text-sm text-slate-500">Employés</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{intelligence.revenue}</div>
                  <div className="text-sm text-slate-500">Chiffre d'affaires</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{intelligence.industry}</div>
                  <div className="text-sm text-slate-500">Secteur</div>
                </div>
                <div className="text-center">
                  <div className={`text-2xl font-bold ${getRiskColor(intelligence.riskScore)}`}>
                    {intelligence.riskScore}%
                  </div>
                  <div className="text-sm text-slate-500">Score de risque</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="contacts" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="contacts">Contacts Clés</TabsTrigger>
              <TabsTrigger value="news">Actualités</TabsTrigger>
              <TabsTrigger value="technologies">Technologies</TabsTrigger>
              <TabsTrigger value="social">Social Media</TabsTrigger>
            </TabsList>

            <TabsContent value="contacts">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="w-5 h-5" />
                    <span>Contacts Clés Identifiés</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {intelligence.keyContacts.map((contact, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-medium text-slate-800">{contact.name}</h4>
                          <Badge variant="outline">{contact.title}</Badge>
                        </div>
                        <p className="text-sm text-slate-600 mb-1">{contact.department}</p>
                        <p className="text-xs text-slate-500">{contact.recentActivity}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Voir LinkedIn
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="news">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5" />
                    <span>Actualités Récentes</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {intelligence.recentNews.map((news, index) => (
                    <div key={index} className="p-4 border border-slate-200 rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-slate-800">{news.title}</h4>
                        <Badge className={getSentimentColor(news.sentiment)}>
                          {news.sentiment}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-slate-500">
                        <span>{news.source}</span>
                        <span>•</span>
                        <span>{news.date}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="technologies">
              <Card>
                <CardHeader>
                  <CardTitle>Stack Technologique</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {intelligence.technologies.map((tech, index) => (
                      <Badge key={index} variant="outline" className="text-sm">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-2">Opportunités détectées</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Utilise Salesforce - opportunité d'intégration</li>
                      <li>• Stack marketing mature - prêt pour des outils avancés</li>
                      <li>• Infrastructure cloud AWS - compatible</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="social">
              <Card>
                <CardHeader>
                  <CardTitle>Activité Social Media</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {intelligence.socialActivity.map((social, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="font-medium text-slate-800">{social.platform}</div>
                        <div className="text-sm text-slate-600">
                          {social.followers.toLocaleString()} followers
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-center">
                          <div className="text-sm font-medium text-slate-800">{social.engagement}%</div>
                          <div className="text-xs text-slate-500">Engagement</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm font-medium text-slate-800">{social.recentPosts}</div>
                          <div className="text-xs text-slate-500">Posts/mois</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
};
