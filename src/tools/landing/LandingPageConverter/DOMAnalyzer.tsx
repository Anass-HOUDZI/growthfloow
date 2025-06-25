
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Code, Eye, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

interface DOMElement {
  tag: string;
  id?: string;
  classes: string[];
  text?: string;
  position: { x: number; y: number; width: number; height: number };
  issues: string[];
  score: number;
}

interface DOMAnalysisProps {
  url: string;
  elements: {
    headlines: DOMElement[];
    buttons: DOMElement[];
    forms: DOMElement[];
    images: DOMElement[];
    links: DOMElement[];
  };
}

export const DOMAnalyzer: React.FC<DOMAnalysisProps> = ({ url, elements }) => {
  const getElementIcon = (score: number) => {
    if (score >= 80) return <CheckCircle className="w-4 h-4 text-green-500" />;
    if (score >= 60) return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
    return <XCircle className="w-4 h-4 text-red-500" />;
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Code className="w-5 h-5" />
          <span>Analyse DOM & Structure</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Vue d'ensemble */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-slate-50 rounded-lg">
              <div className="text-2xl font-bold text-slate-800">
                {Object.values(elements).flat().length}
              </div>
              <div className="text-sm text-slate-600">Éléments analysés</div>
            </div>
            <div className="text-center p-4 bg-slate-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {Object.values(elements).flat().filter(el => el.score >= 80).length}
              </div>
              <div className="text-sm text-slate-600">Éléments optimisés</div>
            </div>
            <div className="text-center p-4 bg-slate-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">
                {Object.values(elements).flat().filter(el => el.score < 60).length}
              </div>
              <div className="text-sm text-slate-600">Éléments critiques</div>
            </div>
          </div>

          {/* Analyse par type d'élément */}
          {Object.entries(elements).map(([type, typeElements]) => (
            <div key={type} className="space-y-3">
              <h4 className="font-semibold text-slate-800 capitalize flex items-center space-x-2">
                <Eye className="w-4 h-4" />
                <span>{type} ({typeElements.length})</span>
              </h4>
              
              {typeElements.map((element, index) => (
                <div key={index} className="border border-slate-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      {getElementIcon(element.score)}
                      <div>
                        <div className="font-medium text-slate-800">
                          {element.tag}
                          {element.id && <span className="text-blue-600">#{element.id}</span>}
                        </div>
                        <div className="text-sm text-slate-600">
                          {element.classes.length > 0 && (
                            <span>.{element.classes.join(', .')}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className={`text-lg font-bold ${getScoreColor(element.score)}`}>
                      {element.score}/100
                    </div>
                  </div>

                  <Progress value={element.score} className="h-2 mb-3" />

                  {element.text && (
                    <div className="mb-3">
                      <span className="text-sm font-medium text-slate-700">Contenu : </span>
                      <span className="text-sm text-slate-600">
                        "{element.text.substring(0, 100)}{element.text.length > 100 ? '...' : ''}"
                      </span>
                    </div>
                  )}

                  <div className="mb-3">
                    <span className="text-sm font-medium text-slate-700">Position : </span>
                    <span className="text-sm text-slate-600">
                      x: {element.position.x}px, y: {element.position.y}px, 
                      taille: {element.position.width}×{element.position.height}px
                    </span>
                  </div>

                  {element.issues.length > 0 && (
                    <div className="space-y-1">
                      <span className="text-sm font-medium text-red-700">Problèmes détectés :</span>
                      {element.issues.map((issue, issueIndex) => (
                        <div key={issueIndex} className="flex items-start space-x-2">
                          <XCircle className="w-3 h-3 text-red-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-red-600">{issue}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
