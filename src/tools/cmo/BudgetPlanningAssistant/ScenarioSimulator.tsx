
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle } from 'lucide-react';

interface Scenario {
  id: string;
  name: string;
  description: string;
  allocation: Record<string, number>;
  projectedROI: number;
  projectedRevenue: number;
  riskLevel: 'low' | 'medium' | 'high';
  confidence: number;
}

interface ScenarioSimulatorProps {
  scenarios: Scenario[];
  activeScenario: string | null;
  onScenarioSelect: (scenarioId: string) => void;
  onScenarioCreate: () => void;
  onScenarioOptimize: () => void;
}

export const ScenarioSimulator: React.FC<ScenarioSimulatorProps> = ({
  scenarios,
  activeScenario,
  onScenarioSelect,
  onScenarioCreate,
  onScenarioOptimize
}) => {
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-red-600 bg-red-100';
      default: return 'text-slate-600 bg-slate-100';
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'low': return <CheckCircle className="w-4 h-4" />;
      case 'medium': return <AlertTriangle className="w-4 h-4" />;
      case 'high': return <TrendingDown className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Scénarios de Budget</h3>
        <div className="space-x-2">
          <Button onClick={onScenarioCreate} variant="outline">
            Créer Scénario
          </Button>
          <Button onClick={onScenarioOptimize}>
            Optimiser Auto
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {scenarios.map((scenario) => (
          <Card 
            key={scenario.id}
            className={`cursor-pointer transition-all ${
              activeScenario === scenario.id 
                ? 'ring-2 ring-blue-500 bg-blue-50' 
                : 'hover:shadow-md'
            }`}
            onClick={() => onScenarioSelect(scenario.id)}
          >
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{scenario.name}</CardTitle>
                <Badge className={getRiskColor(scenario.riskLevel)}>
                  {getRiskIcon(scenario.riskLevel)}
                  <span className="ml-1 capitalize">{scenario.riskLevel}</span>
                </Badge>
              </div>
              <p className="text-sm text-slate-600">{scenario.description}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Métriques clés */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-slate-500">ROI Projeté</div>
                  <div className="flex items-center">
                    <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                    <span className="font-semibold text-green-600">
                      {scenario.projectedROI.toFixed(1)}x
                    </span>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-500">Revenus</div>
                  <div className="font-semibold">
                    {scenario.projectedRevenue.toLocaleString()}€
                  </div>
                </div>
              </div>

              {/* Niveau de confiance */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Confiance</span>
                  <span>{scenario.confidence}%</span>
                </div>
                <Progress value={scenario.confidence} className="h-2" />
              </div>

              {/* Allocation par canal */}
              <div>
                <div className="text-xs text-slate-500 mb-2">Allocation Budget</div>
                <div className="space-y-1">
                  {Object.entries(scenario.allocation).map(([channel, percentage]) => (
                    <div key={channel} className="flex justify-between text-xs">
                      <span className="capitalize">{channel}</span>
                      <span>{percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {scenarios.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <div className="text-slate-500 mb-4">
              Aucun scénario créé pour le moment
            </div>
            <Button onClick={onScenarioCreate}>
              Créer votre premier scénario
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
