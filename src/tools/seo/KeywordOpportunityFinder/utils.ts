
// Utility functions for keyword analysis

export const generateLongTailKeywords = (seedKeyword: string, industry: string): string[] => {
  const modifiers = {
    ecommerce: ['pas cher', 'livraison gratuite', 'avis', 'comparatif', 'meilleur', 'promotion'],
    saas: ['outil', 'logiciel', 'solution', 'plateforme', 'gratuit', 'prix'],
    finance: ['crédit', 'taux', 'simulation', 'comparateur', 'conseils', 'investissement'],
    health: ['symptômes', 'traitement', 'médecin', 'remède', 'prévention', 'consultation'],
    education: ['cours', 'formation', 'apprentissage', 'diplôme', 'certification', 'école'],
    travel: ['voyage', 'séjour', 'réservation', 'prix', 'guide', 'destination'],
    food: ['recette', 'restaurant', 'livraison', 'ingrédients', 'cuisine', 'menu'],
    fashion: ['mode', 'tendance', 'collection', 'style', 'marque', 'outfit'],
    'real-estate': ['immobilier', 'achat', 'vente', 'location', 'prix', 'estimation'],
    automotive: ['voiture', 'occasion', 'neuve', 'prix', 'essai', 'comparatif']
  };

  const questionWords = ['comment', 'pourquoi', 'quand', 'où', 'quel', 'quelle'];
  const prepositions = ['pour', 'sans', 'avec', 'en', 'de', 'à'];
  
  const industryModifiers = modifiers[industry] || modifiers.ecommerce;
  const longTailKeywords: string[] = [];

  // Generate combinations
  industryModifiers.forEach(modifier => {
    longTailKeywords.push(`${seedKeyword} ${modifier}`);
    longTailKeywords.push(`${modifier} ${seedKeyword}`);
  });

  questionWords.forEach(question => {
    longTailKeywords.push(`${question} ${seedKeyword}`);
  });

  prepositions.forEach(prep => {
    industryModifiers.forEach(modifier => {
      longTailKeywords.push(`${seedKeyword} ${prep} ${modifier}`);
    });
  });

  return longTailKeywords.slice(0, 50); // Limit to 50 suggestions
};

export const calculateKeywordDifficulty = (
  searchVolume: number,
  competition: string,
  cpc: number,
  industry: string
): number => {
  let baseDifficulty = 30;
  
  // Volume factor
  if (searchVolume > 10000) baseDifficulty += 25;
  else if (searchVolume > 1000) baseDifficulty += 15;
  else if (searchVolume > 100) baseDifficulty += 5;
  
  // Competition factor
  switch (competition) {
    case 'high': baseDifficulty += 20; break;
    case 'medium': baseDifficulty += 10; break;
    case 'low': baseDifficulty += 0; break;
  }
  
  // CPC factor (higher CPC = more competitive)
  if (cpc > 3) baseDifficulty += 15;
  else if (cpc > 1) baseDifficulty += 8;
  else if (cpc > 0.5) baseDifficulty += 3;
  
  // Industry factor
  const industryDifficulty = {
    finance: 15,
    saas: 12,
    'real-estate': 10,
    health: 8,
    ecommerce: 5,
    automotive: 5,
    travel: 3,
    education: 2,
    fashion: 0,
    food: -2
  };
  
  baseDifficulty += industryDifficulty[industry] || 0;
  
  return Math.min(Math.max(baseDifficulty, 10), 95);
};

export const calculateOpportunityScore = (
  searchVolume: number,
  difficulty: number,
  cpc: number,
  trend: number
): number => {
  const volumeScore = Math.min((searchVolume / 1000) * 10, 40);
  const difficultyScore = Math.max(0, (100 - difficulty) * 0.3);
  const cpcScore = Math.min(cpc * 5, 20);
  const trendScore = Math.max(0, trend * 10);
  
  return Math.min(volumeScore + difficultyScore + cpcScore + trendScore, 100);
};

export const generateMockSerpResults = (keyword: string) => {
  const domains = [
    'wikipedia.org', 'lemonde.fr', 'figaro.fr', 'journaldunet.com',
    'huffingtonpost.fr', 'challenges.fr', 'usinenouvelle.com',
    'zdnet.fr', 'clubic.com', 'commentcamarche.net'
  ];
  
  const features = ['Featured Snippet', 'People Also Ask', 'Images', 'Videos', 'News'];
  
  return Array.from({ length: 10 }, (_, index) => ({
    position: index + 1,
    title: `${keyword} - Guide complet ${index + 1}`,
    url: `https://${domains[index % domains.length]}/article-${keyword.replace(' ', '-')}`,
    domain: domains[index % domains.length],
    snippet: `Guide complet sur ${keyword}. Découvrez tout ce qu'il faut savoir sur ${keyword} avec des conseils d'experts et des exemples pratiques.`,
    domainAuthority: Math.floor(Math.random() * 40) + 40,
    pageAuthority: Math.floor(Math.random() * 30) + 20,
    features: index < 3 ? [features[Math.floor(Math.random() * features.length)]] : []
  }));
};

export const exportToCSV = (keywords: any[]) => {
  const headers = ['Mot-clé', 'Volume', 'Difficulté', 'CPC', 'Intention', 'Opportunité'];
  const rows = keywords.map(k => [
    k.keyword,
    k.searchVolume,
    k.difficulty,
    k.cpc,
    k.intent,
    k.opportunity
  ]);
  
  const csvContent = [headers, ...rows]
    .map(row => row.map(cell => `"${cell}"`).join(','))
    .join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', 'keyword-opportunities.csv');
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportToExcel = (keywords: any[]) => {
  // Pour une vraie implémentation Excel, vous pourriez utiliser SheetJS
  // Pour maintenant, on exporte en CSV avec extension .xlsx
  const headers = ['Mot-clé', 'Volume', 'Difficulté (%)', 'CPC (€)', 'Intention', 'Score opportunité (%)'];
  const rows = keywords.map(k => [
    k.keyword,
    k.searchVolume,
    k.difficulty,
    k.cpc.toFixed(2),
    k.intent,
    k.opportunity
  ]);
  
  const csvContent = [headers, ...rows]
    .map(row => row.map(cell => `"${cell}"`).join(','))
    .join('\n');
  
  const blob = new Blob([csvContent], { type: 'application/vnd.ms-excel;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', 'keyword-opportunities.xlsx');
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
