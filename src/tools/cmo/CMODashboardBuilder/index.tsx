
import React, { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Layout, Plus, Trash, Loader2 } from "lucide-react";
import { KPI_LIBRARY, KPIItem } from "./kpis";
import { KPIDashboardWidget } from "./KPIDashboardWidget";
import { Button } from "@/components/ui/button";
import { Table, TableHead, TableRow, TableCell, TableBody, TableHeader } from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";

type ChartType = "bar" | "line" | "pie";

type UserKPIConfig = {
  id: string; // KPI id
  chartType: ChartType;
};

export const CMODashboardBuilder: React.FC = () => {
  const [dashboardKPIs, setDashboardKPIs] = useState<UserKPIConfig[]>([
    { id: "roas", chartType: "bar" },
    { id: "cac", chartType: "line" },
  ]);
  const [adding, setAdding] = useState(false);
  const selectRef = useRef<HTMLSelectElement>(null);

  const availableKPIs = KPI_LIBRARY.filter(
    (kpi) => !dashboardKPIs.some((item) => item.id === kpi.id)
  );

  function handleAddKPI(id: string) {
    const kpi = KPI_LIBRARY.find((k) => k.id === id);
    if (!kpi) return;
    setAdding(true);
    setTimeout(() => {
      setDashboardKPIs((prev) => [
        ...prev,
        { id, chartType: kpi.defaultChart },
      ]);
      setAdding(false);
      toast({ title: "KPI ajouté au dashboard", description: kpi.label });
    }, 800); // petit délai pour animation
  }

  function handleRemoveKPI(id: string) {
    setDashboardKPIs((prev) => prev.filter((kpi) => kpi.id !== id));
    toast({ title: "KPI retiré", description: "Vous pouvez le réajouter via le +." });
  }

  function handleChangeChartType(id: string, chartType: ChartType) {
    setDashboardKPIs((prev) =>
      prev.map((kpi) => (kpi.id === id ? { ...kpi, chartType } : kpi))
    );
    const label = KPI_LIBRARY.find((kpi) => kpi.id === id)?.label || id;
    toast({ title: "Type de graphique modifié", description: label });
  }

  function getKPIItem(id: string): KPIItem | undefined {
    return KPI_LIBRARY.find((kpi) => kpi.id === id);
  }

  return (
    <div className="space-y-6">
      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Layout className="w-6 h-6 text-blue-600" />
            CMO Dashboard Builder
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-600 mb-4">
            Créez des tableaux de bord interactifs pour vos KPIs marketing stratégiques.&nbsp;
            <span className="hidden xl:inline">
              Ajoutez, configurez et visualisez les metrics clés de la direction marketing.
            </span>
          </p>
          <div className="flex gap-4 items-end flex-wrap">
            <div>
              <label className="font-semibold text-slate-700 text-sm mb-2 block">Ajouter un KPI</label>
              <div className="flex gap-2">
                <select
                  ref={selectRef}
                  className="rounded-md border px-3 py-2 text-sm"
                  disabled={adding || availableKPIs.length === 0}
                  defaultValue=""
                  onChange={(e) => {
                    if (e.target.value) handleAddKPI(e.target.value);
                  }}
                >
                  <option value="">Sélectionner…</option>
                  {availableKPIs.map((kpi) => (
                    <option key={kpi.id} value={kpi.id}>{kpi.label}</option>
                  ))}
                </select>
                <Button
                  onClick={() => {
                    if (selectRef.current && selectRef.current.value) {
                      handleAddKPI(selectRef.current.value);
                    }
                  }}
                  disabled={adding || availableKPIs.length === 0}
                  size="sm"
                  variant="outline"
                  className="gap-1"
                >
                  {adding ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                  Ajouter
                </Button>
              </div>
            </div>
            <div className="text-xs text-slate-500 ml-2">
              {dashboardKPIs.length > 0 ? "Personnalisez vos widgets 👇" : "Ajoutez un widget pour démarrer."}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Widgets dashboard */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {dashboardKPIs.length === 0 && (
          <div className="col-span-3 text-center text-slate-500 animate-fade-in">
            <span className="text-2xl">➕</span>
            <div>Ajoutez des KPIs au dashboard pour démarrer</div>
          </div>
        )}
        {dashboardKPIs.map(({ id, chartType }) => {
          const kpi = getKPIItem(id);
          if (!kpi) return null;
          return (
            <div key={id} className="flex flex-col items-center">
              <KPIDashboardWidget
                title={kpi.label}
                color={kpi.color}
                chartType={chartType}
                data={kpi.mockData}
              />
              <div className="flex gap-2 mt-2">
                <Button
                  size="sm"
                  variant={chartType === "bar" ? "default" : "outline"}
                  onClick={() => handleChangeChartType(id, "bar")}
                >
                  Barres
                </Button>
                <Button
                  size="sm"
                  variant={chartType === "line" ? "default" : "outline"}
                  onClick={() => handleChangeChartType(id, "line")}
                >
                  Ligne
                </Button>
                <Button
                  size="sm"
                  variant={chartType === "pie" ? "default" : "outline"}
                  onClick={() => handleChangeChartType(id, "pie")}
                >
                  Donut
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleRemoveKPI(id)}
                  className="hover:bg-red-50"
                  title="Retirer widget"
                >
                  <Trash className="w-4 h-4 text-red-400" />
                </Button>
              </div>
              <div className="text-xs text-muted-foreground mt-1">{kpi.description}</div>
            </div>
          );
        })}
      </div>

      {/* Synthèse tabulaire */}
      {dashboardKPIs.length > 0 && (
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              Synthèse des KPIs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>KPI</TableHead>
                  <TableHead>Dernière valeur</TableHead>
                  <TableHead>Type de graphique</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dashboardKPIs.map(({ id, chartType }) => {
                  const kpi = getKPIItem(id);
                  if (!kpi) return null;
                  const lastValue = kpi.mockData[kpi.mockData.length - 1]?.value ?? "-";
                  return (
                    <TableRow key={id}>
                      <TableCell className="font-medium">{kpi.label}</TableCell>
                      <TableCell>{lastValue}</TableCell>
                      <TableCell>
                        {chartType === "bar" ? "Barres" : chartType === "line" ? "Ligne" : "Donut"}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
