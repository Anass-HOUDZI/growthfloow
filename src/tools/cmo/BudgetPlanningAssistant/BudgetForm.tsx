
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DollarSign, Target, Calendar } from 'lucide-react';

interface BudgetChannel {
  id: string;
  name: string;
  currentBudget: number;
  expectedROAS: number;
  confidence: number;
}

interface BudgetFormProps {
  totalBudget: number;
  timeframe: string;
  channels: BudgetChannel[];
  onBudgetChange: (budget: number) => void;
  onTimeframeChange: (timeframe: string) => void;
  onChannelUpdate: (channelId: string, field: keyof BudgetChannel, value: number) => void;
  onAddChannel: () => void;
}

export const BudgetForm: React.FC<BudgetFormProps> = ({
  totalBudget,
  timeframe,
  channels,
  onBudgetChange,
  onTimeframeChange,
  onChannelUpdate,
  onAddChannel
}) => {
  return (
    <div className="space-y-6">
      {/* Configuration générale */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-green-600" />
            Configuration Budgétaire
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Budget Total (€)</Label>
              <Input
                type="number"
                value={totalBudget}
                onChange={(e) => onBudgetChange(Number(e.target.value))}
                placeholder="50000"
              />
            </div>
            <div>
              <Label>Période</Label>
              <Select value={timeframe} onValueChange={onTimeframeChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Mensuel</SelectItem>
                  <SelectItem value="quarterly">Trimestriel</SelectItem>
                  <SelectItem value="yearly">Annuel</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Canaux de marketing */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-600" />
            Canaux Marketing
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {channels.map((channel) => (
              <div key={channel.id} className="p-4 border rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">{channel.name}</h4>
                  <div className="text-sm text-slate-500">
                    {((channel.currentBudget / totalBudget) * 100).toFixed(1)}% du budget
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <Label className="text-xs">Budget (€)</Label>
                    <Input
                      type="number"
                      value={channel.currentBudget}
                      onChange={(e) => onChannelUpdate(channel.id, 'currentBudget', Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label className="text-xs">ROAS Attendu</Label>
                    <Input
                      type="number"
                      step="0.1"
                      value={channel.expectedROAS}
                      onChange={(e) => onChannelUpdate(channel.id, 'expectedROAS', Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Confiance (%)</Label>
                    <Input
                      type="number"
                      value={channel.confidence}
                      onChange={(e) => onChannelUpdate(channel.id, 'confidence', Number(e.target.value))}
                    />
                  </div>
                </div>
              </div>
            ))}
            <Button onClick={onAddChannel} variant="outline" className="w-full">
              Ajouter un Canal
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
