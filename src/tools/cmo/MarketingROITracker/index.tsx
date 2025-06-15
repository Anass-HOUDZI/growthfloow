
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, DollarSign, TrendingUp } from 'lucide-react';

export const MarketingROITracker: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-purple-500" />
            Marketing ROI Tracker
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-600 mb-4">Surveillez le retour sur investissement de toutes vos actions marketing, avec calcul d'attribution multi-touch et rapport consolidé.</p>
          <div className="text-center">
            <Trophy className="mx-auto text-yellow-500 w-10 h-10 mb-2" />
            <p className="text-2xl font-bold text-slate-800">ROI : 342%</p>
            <p className="text-slate-500">Dernière période analysée</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
