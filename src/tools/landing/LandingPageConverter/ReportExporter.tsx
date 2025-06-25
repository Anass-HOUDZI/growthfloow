
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, FileText, BarChart3, Image, Share2 } from 'lucide-react';

interface ReportExporterProps {
  analysis: any;
  url: string;
}

export const ReportExporter: React.FC<ReportExporterProps> = ({ analysis, url }) => {
  const generatePDFReport = () => {
    // Simulation de génération PDF
    console.log('Génération du rapport PDF...');
    
    const reportData = {
      url,
      timestamp: new Date().toISOString(),
      overallScore: analysis.overallScore,
      sections: [
        'Executive Summary',
        'Technical Analysis',
        'UX Heuristics Evaluation',
        'DOM Structure Analysis',
        'Performance Metrics',
        'Conversion Optimization Recommendations',
        'Implementation Roadmap'
      ],
      recommendations: analysis.recommendations,
      technicalMetrics: analysis.technicalMetrics
    };

    // En production, utiliserait jsPDF ou une API backend
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { 
      type: 'application/json' 
    });
    const url_blob = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url_blob;
    a.download = `landing-audit-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url_blob);
  };

  const generateCSVReport = () => {
    console.log('Génération du rapport CSV...');
    
    const csvData = [
      ['Métrique', 'Valeur', 'Score', 'Benchmark', 'Statut'],
      ['Score Global', analysis.overallScore, analysis.overallScore, '80+', analysis.overallScore >= 80 ? 'Bon' : 'À améliorer'],
      ['Temps de chargement', `${analysis.technicalMetrics?.loadTime || 'N/A'}s`, '', '<3s', ''],
      ['Score Mobile', analysis.technicalMetrics?.mobileScore || 'N/A', analysis.technicalMetrics?.mobileScore || 0, '90+', ''],
      ['Accessibilité', analysis.technicalMetrics?.accessibilityScore || 'N/A', analysis.technicalMetrics?.accessibilityScore || 0, '95+', ''],
      ['SEO Technique', analysis.technicalMetrics?.seoScore || 'N/A', analysis.technicalMetrics?.seoScore || 0, '85+', '']
    ];

    const csvContent = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url_blob = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url_blob;
    a.download = `landing-metrics-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url_blob);
  };

  const generateMockups = () => {
    console.log('Génération des mockups...');
    // Simulation de génération de mockups
    alert('Mockups générés ! (Fonctionnalité de démonstration)');
  };

  const shareReport = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Audit Landing Page',
        text: `Audit complet de ${url} - Score: ${analysis.overallScore}/100`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Lien copié dans le presse-papiers !');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Download className="w-5 h-5" />
          <span>Export & Partage</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button
            onClick={generatePDFReport}
            className="flex items-center space-x-2 h-auto p-4 justify-start"
            variant="outline"
          >
            <FileText className="w-5 h-5 text-red-600" />
            <div className="text-left">
              <div className="font-medium">Rapport PDF Complet</div>
              <div className="text-sm text-slate-600">Analyse détaillée + recommandations</div>
            </div>
          </Button>

          <Button
            onClick={generateCSVReport}
            className="flex items-center space-x-2 h-auto p-4 justify-start"
            variant="outline"
          >
            <BarChart3 className="w-5 h-5 text-green-600" />
            <div className="text-left">
              <div className="font-medium">Données CSV</div>
              <div className="text-sm text-slate-600">Métriques pour analyse</div>
            </div>
          </Button>

          <Button
            onClick={generateMockups}
            className="flex items-center space-x-2 h-auto p-4 justify-start"
            variant="outline"
          >
            <Image className="w-5 h-5 text-blue-600" />
            <div className="text-left">
              <div className="font-medium">Mockups HD</div>
              <div className="text-sm text-slate-600">Visuels avant/après</div>
            </div>
          </Button>

          <Button
            onClick={shareReport}
            className="flex items-center space-x-2 h-auto p-4 justify-start"
            variant="outline"
          >
            <Share2 className="w-5 h-5 text-purple-600" />
            <div className="text-left">
              <div className="font-medium">Partager</div>
              <div className="text-sm text-slate-600">Lien vers l'audit</div>
            </div>
          </Button>
        </div>

        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-medium text-blue-800 mb-2">Contenu du rapport PDF :</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Executive Summary avec score global</li>
            <li>• Analyse technique complète (Performance, SEO, Accessibilité)</li>
            <li>• Évaluation des heuristiques UX de Nielsen</li>
            <li>• Analyse DOM détaillée par élément</li>
            <li>• Plan d'action priorisé avec estimations d'effort</li>
            <li>• Mockups avant/après pour chaque optimisation</li>
            <li>• Roadmap d'implémentation sur 30/60/90 jours</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
