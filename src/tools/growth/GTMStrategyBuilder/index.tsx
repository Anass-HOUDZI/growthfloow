
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Layers, Compass } from "lucide-react";

export const GTMStrategyBuilder: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Compass className="w-6 h-6 text-pink-600" />
            GTM Strategy Builder
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-600 mb-4">
            Créez et structurez votre stratégie Go-To-Market étape par étape grâce à des templates sectoriels, des checklists, et un export PDF.
          </p>
          <div className="flex justify-center">
            <Layers className="w-10 h-10 text-pink-400" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-base text-slate-700">Fonctionnalités à venir :</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <ul className="list-disc pl-5 text-slate-600 text-sm">
            <li>Assistant de segmentation ICP</li>
            <li>Définition de la proposition de valeur</li>
            <li>Canaux de lancement recommandés</li>
            <li>Roadmap actionnable</li>
            <li>Export et génération slides auto</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};
