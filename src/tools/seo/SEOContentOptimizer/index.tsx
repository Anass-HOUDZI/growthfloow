
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Search, FileText } from "lucide-react";

export const SEOContentOptimizer: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-6 h-6 text-blue-600" />
            SEO Content Optimizer
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-600 mb-4">
            Analysez et optimisez votre contenu en temps réel avec recommandations sémantiques, score SEO, et prévisualisation SERP.
          </p>
          <div className="flex justify-center">
            <FileText className="w-10 h-10 text-blue-400" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-base text-slate-700">Fonctionnalités à venir :</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <ul className="list-disc pl-5 text-slate-600 text-sm">
            <li>Analyse sémantique temps réel</li>
            <li>Score SEO global</li>
            <li>Recommandations optimisées</li>
            <li>Nuage de mots clés</li>
            <li>Prévisualisation SERP</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};
