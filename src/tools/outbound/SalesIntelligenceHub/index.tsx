
import React, { useState, useMemo } from 'react';
import { BarChart3, Users, Search, TrendingUp, Building, Mail, Phone, LinkedinIcon, DollarSign, Target, AlertCircle } from 'lucide-react';

interface Company {
  id: string;
  name: string;
  domain: string;
  industry: string;
  size: string;
  revenue: string;
  location: string;
  buyingSignals: BuyingSignal[];
  contacts: Contact[];
  score: number;
}

interface BuyingSignal {
  type: 'funding' | 'hiring' | 'technology' | 'content' | 'event';
  description: string;
  date: string;
  strength: 'low' | 'medium' | 'high';
}

interface Contact {
  id: string;
  name: string;
  title: string;
  email?: string;
  linkedin?: string;
  phone?: string;
  role: 'decision_maker' | 'influencer' | 'user';
}

export const SalesIntelligenceHub: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Données simulées
  const [companies] = useState<Company[]>([
    {
      id: '1',
      name: 'TechCorp Solutions',
      domain: 'techcorp.com',
      industry: 'SaaS',
      size: '100-500',
      revenue: '10M-50M',
      location: 'Paris, France',
      score: 85,
      buyingSignals: [
        {
          type: 'funding',
          description: 'Série A de 15M€ levée récemment',
          date: '2024-01-15',
          strength: 'high'
        },
        {
          type: 'hiring',
          description: '5 postes marketing ouverts',
          date: '2024-01-10',
          strength: 'medium'
        },
        {
          type: 'technology',
          description: 'Migration vers AWS annoncée',
          date: '2024-01-08',
          strength: 'medium'
        }
      ],
      contacts: [
        {
          id: '1',
          name: 'Marie Dubois',
          title: 'CMO',
          email: 'marie.dubois@techcorp.com',
          linkedin: 'marie-dubois',
          role: 'decision_maker'
        },
        {
          id: '2',
          name: 'Pierre Martin',
          title: 'Head of Growth',
          email: 'pierre.martin@techcorp.com',
          linkedin: 'pierre-martin',
          role: 'influencer'
        }
      ]
    },
    {
      id: '2',
      name: 'InnovateLab',
      domain: 'innovatelab.io',
      industry: 'FinTech',
      size: '50-100',
      revenue: '5M-10M',
      location: 'Lyon, France',
      score: 72,
      buyingSignals: [
        {
          type: 'content',
          description: 'Article sur l\'automatisation marketing publié',
          date: '2024-01-12',
          strength: 'low'
        },
        {
          type: 'event',
          description: 'Participation au salon Marketing Tech',
          date: '2024-01-05',
          strength: 'medium'
        }
      ],
      contacts: [
        {
          id: '3',
          name: 'Sophie Laurent',
          title: 'CEO',
          linkedin: 'sophie-laurent',
          role: 'decision_maker'
        }
      ]
    }
  ]);

  const searchCompany = async () => {
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    // Simulation d'appel API
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const filteredCompanies = useMemo(() => {
    if (!searchQuery) return companies;
    return companies.filter(company => 
      company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.industry.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [companies, searchQuery]);

  const getSignalColor = (strength: string) => {
    switch (strength) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getSignalIcon = (type: string) => {
    switch (type) {
      case 'funding': return <DollarSign className="w-4 h-4" />;
      case 'hiring': return <Users className="w-4 h-4" />;
      case 'technology': return <Target className="w-4 h-4" />;
      case 'content': return <Search className="w-4 h-4" />;
      case 'event': return <Building className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'decision_maker': return 'bg-purple-100 text-purple-700';
      case 'influencer': return 'bg-blue-100 text-blue-700';
      case 'user': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
        <div className="flex items-center space-x-3 mb-4">
          <BarChart3 className="w-8 h-8 text-blue-600" />
          <div>
            <h3 className="text-2xl font-bold text-blue-800">Sales Intelligence Hub</h3>
            <p className="text-blue-700">Collectez et analysez les signaux d'achat, données d'entreprise et contacts clés</p>
          </div>
        </div>
      </div>

      {/* Recherche */}
      <div className="bg-white p-6 rounded-lg border border-slate-200">
        <div className="flex space-x-4">
          <div className="flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Rechercher une entreprise par nom, domaine ou secteur..."
            />
          </div>
          <button
            onClick={searchCompany}
            disabled={isLoading}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center space-x-2"
          >
            <Search className="w-4 h-4" />
            <span>{isLoading ? 'Recherche...' : 'Rechercher'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Liste des entreprises */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-slate-800">Entreprises prospects ({filteredCompanies.length})</h4>
          
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {filteredCompanies.map((company) => (
              <div
                key={company.id}
                onClick={() => setSelectedCompany(company)}
                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                  selectedCompany?.id === company.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h5 className="font-semibold text-slate-800">{company.name}</h5>
                    <p className="text-sm text-slate-600">{company.domain}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      company.score >= 80 ? 'bg-green-100 text-green-700' :
                      company.score >= 60 ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      Score: {company.score}
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 mb-2">
                  <span>📍 {company.location}</span>
                  <span>🏢 {company.size} employés</span>
                  <span>💰 {company.revenue}</span>
                  <span>🏷️ {company.industry}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">
                    {company.buyingSignals.length} signaux • {company.contacts.length} contacts
                  </span>
                  <div className="flex space-x-1">
                    {company.buyingSignals.slice(0, 3).map((signal, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full ${
                          signal.strength === 'high' ? 'bg-red-500' :
                          signal.strength === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Détails de l'entreprise sélectionnée */}
        <div className="space-y-4">
          {selectedCompany ? (
            <>
              <div className="bg-white p-6 rounded-lg border border-slate-200">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-xl font-bold text-slate-800">{selectedCompany.name}</h4>
                    <p className="text-slate-600">{selectedCompany.domain}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    selectedCompany.score >= 80 ? 'bg-green-100 text-green-700' :
                    selectedCompany.score >= 60 ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    Score Intent: {selectedCompany.score}/100
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-slate-700">Secteur:</span>
                    <span className="ml-2 text-slate-600">{selectedCompany.industry}</span>
                  </div>
                  <div>
                    <span className="font-medium text-slate-700">Taille:</span>
                    <span className="ml-2 text-slate-600">{selectedCompany.size} employés</span>
                  </div>
                  <div>
                    <span className="font-medium text-slate-700">Chiffre d'affaires:</span>
                    <span className="ml-2 text-slate-600">{selectedCompany.revenue}</span>
                  </div>
                  <div>
                    <span className="font-medium text-slate-700">Localisation:</span>
                    <span className="ml-2 text-slate-600">{selectedCompany.location}</span>
                  </div>
                </div>
              </div>

              {/* Signaux d'achat */}
              <div className="bg-white p-6 rounded-lg border border-slate-200">
                <h5 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Signaux d'achat ({selectedCompany.buyingSignals.length})
                </h5>
                
                <div className="space-y-3">
                  {selectedCompany.buyingSignals.map((signal, index) => (
                    <div key={index} className={`p-3 rounded-lg border ${getSignalColor(signal.strength)}`}>
                      <div className="flex items-start space-x-3">
                        {getSignalIcon(signal.type)}
                        <div className="flex-1">
                          <p className="text-sm font-medium">{signal.description}</p>
                          <div className="flex items-center space-x-4 mt-1">
                            <span className="text-xs">{new Date(signal.date).toLocaleDateString('fr-FR')}</span>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${getSignalColor(signal.strength)}`}>
                              {signal.strength === 'high' ? 'Fort' : signal.strength === 'medium' ? 'Moyen' : 'Faible'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contacts clés */}
              <div className="bg-white p-6 rounded-lg border border-slate-200">
                <h5 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Contacts clés ({selectedCompany.contacts.length})
                </h5>
                
                <div className="space-y-3">
                  {selectedCompany.contacts.map((contact) => (
                    <div key={contact.id} className="p-4 bg-slate-50 rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h6 className="font-semibold text-slate-800">{contact.name}</h6>
                          <p className="text-sm text-slate-600">{contact.title}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(contact.role)}`}>
                          {contact.role === 'decision_maker' ? 'Décideur' :
                           contact.role === 'influencer' ? 'Influenceur' : 'Utilisateur'}
                        </span>
                      </div>
                      
                      <div className="flex space-x-4 text-sm">
                        {contact.email && (
                          <a href={`mailto:${contact.email}`} className="flex items-center space-x-1 text-blue-600 hover:text-blue-700">
                            <Mail className="w-4 h-4" />
                            <span>Email</span>
                          </a>
                        )}
                        {contact.linkedin && (
                          <a href={`https://linkedin.com/in/${contact.linkedin}`} className="flex items-center space-x-1 text-blue-600 hover:text-blue-700">
                            <LinkedinIcon className="w-4 h-4" />
                            <span>LinkedIn</span>
                          </a>
                        )}
                        {contact.phone && (
                          <a href={`tel:${contact.phone}`} className="flex items-center space-x-1 text-blue-600 hover:text-blue-700">
                            <Phone className="w-4 h-4" />
                            <span>Téléphone</span>
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommandations d'actions */}
              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border border-green-200">
                <h5 className="text-lg font-semibold text-green-800 mb-4">🎯 Recommandations d'actions</h5>
                <div className="space-y-2 text-sm text-green-700">
                  <p>• Contacter Marie Dubois (CMO) concernant la récente levée de fonds</p>
                  <p>• Proposer une solution pour optimiser leurs campagnes marketing post-financement</p>
                  <p>• Mentionner leur croissance d'équipe marketing dans l'approche</p>
                  <p>• Planifier un follow-up dans 2 semaines sur leur migration AWS</p>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-slate-50 p-12 rounded-lg border-2 border-dashed border-slate-300 text-center">
              <Building className="w-12 h-12 mx-auto mb-4 text-slate-400" />
              <p className="text-slate-600">Sélectionnez une entreprise pour voir les détails</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
