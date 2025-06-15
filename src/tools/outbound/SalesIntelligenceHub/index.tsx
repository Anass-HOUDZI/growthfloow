
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Users, Search, BarChart } from "lucide-react";

export const SalesIntelligenceHub: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart className="w-6 h-6 text-blue-600" />
            Sales Intelligence Hub
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-600 mb-4">
            Collectez et analysez les signaux d'achat, données d'entreprise et contacts clés : tout pour booster votre intelligence commerciale.
          </p>
          <div className="flex justify-center">
            <Users className="w-10 h-10 text-blue-400" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-base text-slate-700">Fonctionnalités à venir :</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <ul className="list-disc pl-5 text-slate-600 text-sm">
            <li>Recherche automatique d'informations prospects</li>
            <li>Timeline d'activités détectées</li>
            <li>Détection de signaux d'achat et scoring</li>
            <li>Profilage des contacts décisifs</li>
            <li>Recommandations de contact & actions</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};
