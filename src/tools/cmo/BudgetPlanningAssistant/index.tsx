
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, Settings } from 'lucide-react';

export const BudgetPlanningAssistant: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-6 h-6 text-green-600" />
            Budget Planning Assistant
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-600 mb-4">Simulez différents scénarios et optimisez la planification budgétaire marketing à l’aide d’outils interactifs.</p>
          <div className="flex justify-center">
            <Settings className="w-10 h-10 text-blue-400" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
