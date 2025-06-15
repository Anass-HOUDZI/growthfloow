
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, Layout } from 'lucide-react';

export const CMODashboardBuilder: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-blue-600" />
            CMO Dashboard Builder
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-600 mb-4">Créez des tableaux de bord personnalisés pour vos KPIs marketing et partagez-les aux exécutifs.</p>
          <div className="flex justify-center">
            <Layout className="w-10 h-10 text-blue-400" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
