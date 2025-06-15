
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Gauge } from 'lucide-react';

export const MarketingMaturityAssessor: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gauge className="w-6 h-6 text-indigo-500" />
            Marketing Maturity Assessor
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-600 mb-4">Évaluez la maturité de votre organisation marketing et générez une roadmap personnalisée.</p>
          <div className="flex justify-center">
            <Trophy className="w-10 h-10 text-yellow-500" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
