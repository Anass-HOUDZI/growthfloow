
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Search, Target } from "lucide-react";

export const KeywordOpportunityFinder: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-6 h-6 text-green-600" />
            Keyword Opportunity Finder
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-600 mb-4">
            Identifiez des opportunités de mots-clés à fort potentiel avec scoring de difficulté, suggestions sémantiques et export CSV.
          </p>
          <div className="flex justify-center">
            <Search className="w-10 h-10 text-green-400" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-base text-slate-700">Fonctionnalités à venir :</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <ul className="list-disc pl-5 text-slate-600 text-sm">
            <li>Suggestion longue traîne automatique</li>
            <li>Scoring de difficulté SEO (KD%)</li>
            <li>Analyse SERP concurrentielle</li>
            <li>Export CSV/Excel</li>
            <li>Benchmarks sectoriels intégrés</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};
