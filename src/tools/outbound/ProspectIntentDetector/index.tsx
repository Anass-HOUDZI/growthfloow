import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Search, TrendingUp, AlertCircle, Users, Building, Calendar, ExternalLink } from 'lucide-react';
import { ProspectIntentForm } from "./ProspectIntentForm";
import { IntentScoreCard } from "./IntentScoreCard";
import { IntentSignalsList } from "./IntentSignalsList";
import { IntentRecommendations } from "./IntentRecommendations";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface IntentSignal {
  type: string;
  description: string;
  score: number;
  source: string;
  date: string;
  confidence: 'low' | 'medium' | 'high';
}

interface ProspectData {
  name: string;
  company: string;
  title: string;
  intentScore: number;
  signals: IntentSignal[];
  recommendation: string;
  bestTimeToContact: string;
}

export const ProspectIntentDetector = () => {
  const [prospectUrl, setProspectUrl] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<ProspectData | null>(null);

  const mockSignals: IntentSignal[] = [
    {
      type: 'Job Change',
      description: 'Nouveau poste de VP Marketing chez TechCorp',
      score: 85,
      source: 'LinkedIn',
      date: '2024-01-15',
      confidence: 'high'
    },
    {
      type: 'Company Growth',
      description: 'Levée de fonds Série B de 15M€',
      score: 75,
      source: 'Crunchbase',
      date: '2024-01-10',
      confidence: 'high'
    },
    {
      type: 'Technology Adoption',
      description: 'Recherche d\'outils marketing automation',
      score: 60,
      source: 'G2 Reviews',
      date: '2024-01-12',
      confidence: 'medium'
    },
    {
      type: 'Content Engagement',
      description: 'Téléchargement whitepaper sur la croissance',
      score: 45,
      source: 'Website Analytics',
      date: '2024-01-14',
      confidence: 'medium'
    }
  ];

  const analyzeProspect = async () => {
    setIsAnalyzing(true);
    
    // Simulation d'analyse
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const totalScore = mockSignals.reduce((sum, signal) => sum + signal.score, 0) / mockSignals.length;
    
    setAnalysisResult({
      name: 'Marie Dubois',
      company: companyName || 'TechCorp',
      title: 'VP Marketing',
      intentScore: Math.round(totalScore),
      signals: mockSignals,
      recommendation: totalScore > 70 ? 'Contact immédiat recommandé' : 
                     totalScore > 50 ? 'Contact dans les 48h' : 'Maintenir en veille',
      bestTimeToContact: 'Mardi-Jeudi 10h-16h'
    });
    
    setIsAnalyzing(false);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-red-500';
    if (score >= 60) return 'bg-orange-500';
    if (score >= 40) return 'bg-yellow-500';
    return 'bg-gray-400';
  };

  const getConfidenceBadge = (confidence: string) => {
    const colors = {
      high: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-gray-100 text-gray-800'
    };
    return colors[confidence as keyof typeof colors];
  };

  const exportPdf = () => {
    if (!analysisResult) return;
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Rapport d\'intention d\'achat prospect', 14, 16);
    doc.setFontSize(12);
    doc.text(`Nom : ${analysisResult.name}`, 14, 28);
    doc.text(`Entreprise : ${analysisResult.company}`, 14, 36);
    doc.text(`Titre : ${analysisResult.title}`, 14, 44);
    doc.text(`Score d'intention : ${analysisResult.intentScore}`, 14, 52);
    doc.text(`Recommandation : ${analysisResult.recommendation}`, 14, 60);

    // Signals table
    const signalsData = analysisResult.signals.map(s =>
      [s.type, s.description, s.source, s.date, s.score, s.confidence]
    );
    autoTable(doc, {
      startY: 70,
      head: [['Type', 'Description', 'Source', 'Date', 'Score', 'Confiance']],
      body: signalsData,
    });

    // Solution: Use doc.autoTable.previous.finalY after autoTable call
    // Fallback if not present
    let y = 80;
    // @ts-ignore
    if (doc.autoTable && doc.autoTable.previous && typeof doc.autoTable.previous.finalY === "number") {
      // @ts-ignore
      y = doc.autoTable.previous.finalY + 10;
    }

    doc.text('Recommandations :', 14, y);
    doc.setFontSize(11);
    doc.text(`Meilleur moment: ${analysisResult.bestTimeToContact}`, 14, y + 8);
    doc.text("Canal: LinkedIn + Email", 14, y + 16);
    doc.text("Angle: Croissance & Financement", 14, y + 24);

    // Message
    doc.setFontSize(10);
    doc.text(
      "Message d'approche suggéré :",
      14,
      y + 34
    );
    doc.text(
      "Félicitations pour votre nouveau poste de VP Marketing et la récente levée de fonds ! J'ai vu que vous recherchiez des solutions pour optimiser votre stack marketing. Aurions-nous 15 minutes cette semaine pour discuter de vos priorités croissance ?",
      14,
      y + 42,
      { maxWidth: 180 }
    );

    doc.save("rapport_intent_prospect.pdf");
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mx-auto">
          <Search className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-slate-800">
          Prospect Intent Detector
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Identifiez automatiquement les signaux d'intention d'achat de vos prospects via l'analyse de leurs activités digitales publiques.
        </p>
      </div>

      <div className="bg-white shadow rounded-xl p-4">
        <ProspectIntentForm
          prospectUrl={prospectUrl}
          companyName={companyName}
          isAnalyzing={isAnalyzing}
          onUrlChange={setProspectUrl}
          onCompanyChange={setCompanyName}
          onSubmit={analyzeProspect}
        />
      </div>

      {analysisResult && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="p-4 rounded-lg shadow bg-white flex flex-col items-center">
              <IntentScoreCard
                name={analysisResult.name}
                company={analysisResult.company}
                title={analysisResult.title}
                score={analysisResult.intentScore}
                recommendation={analysisResult.recommendation}
              />
              <button
                onClick={exportPdf}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
              >
                Exporter en PDF
              </button>
            </div>
            <div className="lg:col-span-2 p-4 rounded-lg shadow bg-white">
              <IntentSignalsList signals={analysisResult.signals} />
            </div>
          </div>
          <div className="p-4 rounded-lg shadow bg-white">
            <IntentRecommendations
              bestTimeToContact={analysisResult.bestTimeToContact}
              angle="Croissance & Financement"
              channel="LinkedIn + Email"
              message="Félicitations pour votre nouveau poste de VP Marketing et la récente levée de fonds ! J'ai vu que vous recherchiez des solutions pour optimiser votre stack marketing. Aurions-nous 15 minutes cette semaine pour discuter de vos priorités croissance ?"
            />
          </div>
        </div>
      )}
    </div>
  );
};
