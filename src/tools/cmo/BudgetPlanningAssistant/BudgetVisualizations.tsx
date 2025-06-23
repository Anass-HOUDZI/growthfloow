
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { TrendingUp, DollarSign, Target, AlertCircle } from 'lucide-react';

interface BudgetChannel {
  id: string;
  name: string;
  currentBudget: number;
  expectedROAS: number;
  confidence: number;
}

interface BudgetVisualizationsProps {
  channels: BudgetChannel[];
  totalBudget: number;
  scenarios: any[];
}

export const BudgetVisualizations: React.FC<BudgetVisualizationsProps> = ({
  channels,
  totalBudget,
  scenarios
}) => {
  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];

  // Données pour le graphique en secteurs
  const pieData = channels.map((channel, index) => ({
    name: channel.name,
    value: channel.currentBudget,
    percentage: ((channel.currentBudget / totalBudget) * 100).toFixed(1),
    color: COLORS[index % COLORS.length]
  }));

  // Données pour le graphique ROAS
  const roasData = channels.map((channel) => ({
    name: channel.name,
    roas: channel.expectedROAS,
    budget: channel.currentBudget,
    roi: (channel.expectedROAS - 1) * channel.currentBudget
  }));

  // Données de comparaison des scénarios
  const scenarioComparison = scenarios.map((scenario) => ({
    name: scenario.name,
    roi: scenario.projectedROI,
    revenue: scenario.projectedRevenue,
    risk: scenario.riskLevel === 'low' ? 1 : scenario.riskLevel === 'medium' ? 2 : 3
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-semibold">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.dataKey === 'value' ? 'Budget' : entry.dataKey}: {' '}
              {entry.dataKey === 'value' || entry.dataKey === 'budget' || entry.dataKey === 'revenue' 
                ? `${entry.value.toLocaleString()}€` 
                : entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const totalROI = channels.reduce((sum, channel) => 
    sum + ((channel.expectedROAS - 1) * channel.currentBudget), 0
  );

  const averageROAS = channels.length > 0 
    ? channels.reduce((sum, channel) => sum + channel.expectedROAS, 0) / channels.length 
    : 0;

  return (
    <div className="space-y-6">
      {/* Métriques clés */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Budget Total</p>
                <p className="text-2xl font-bold">{totalBudget.toLocaleString()}€</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">ROI Projeté</p>
                <p className="text-2xl font-bold text-green-600">
                  {totalROI.toLocaleString()}€
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">ROAS Moyen</p>
                <p className="text-2xl font-bold">{averageROAS.toFixed(1)}x</p>
              </div>
              <Target className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Canaux</p>
                <p className="text-2xl font-bold">{channels.length}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Répartition du budget */}
        <Card>
          <CardHeader>
            <CardTitle>Répartition du Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percentage }) => `${name}: ${percentage}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Performance ROAS par canal */}
        <Card>
          <CardHeader>
            <CardTitle>ROAS par Canal</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={roasData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="roas" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Comparaison des scénarios */}
      {scenarios.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Comparaison des Scénarios</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={scenarioComparison}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="roi" 
                  stroke="#10B981" 
                  strokeWidth={2}
                  name="ROI"
                />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  name="Revenus"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
