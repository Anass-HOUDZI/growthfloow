
import React from "react";
import { Calendar, ExternalLink, Building, AlertCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function IntentRecommendations({
  bestTimeToContact,
  angle,
  channel,
  message,
}: {
  bestTimeToContact: string;
  angle: string;
  channel: string;
  message: string;
}) {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="space-y-1">
          <span className="font-medium text-slate-800">Meilleur moment de contact</span>
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-slate-500" />
            <span className="text-slate-600">{bestTimeToContact}</span>
          </div>
        </div>
        <div className="space-y-1">
          <span className="font-medium text-slate-800">Canal recommandé</span>
          <div className="flex items-center space-x-2">
            <ExternalLink className="w-4 h-4 text-slate-500" />
            <span className="text-slate-600">{channel}</span>
          </div>
        </div>
        <div className="space-y-1">
          <span className="font-medium text-slate-800">Angle d'approche</span>
          <div className="flex items-center space-x-2">
            <Building className="w-4 h-4 text-slate-500" />
            <span className="text-slate-600">{angle}</span>
          </div>
        </div>
      </div>
      <Separator className="my-4" />
      <div className="bg-blue-50 p-4 rounded-lg">
        <div className="flex items-center text-blue-800 mb-1">
          <AlertCircle className="w-4 h-4 mr-2" />
          <span className="font-medium">Message d'approche suggéré :</span>
        </div>
        <p className="text-blue-700 text-sm">{message}</p>
      </div>
    </div>
  );
}
