
export interface KPIItem {
  id: string;
  label: string;
  color: string;
  defaultChart: "bar" | "line" | "pie";
  mockData: { name: string; value: number }[];
  description?: string;
}

export const KPI_LIBRARY: KPIItem[] = [
  {
    id: "roas",
    label: "ROAS (Return on Ad Spend)",
    color: "#34d399",
    defaultChart: "bar",
    mockData: [
      { name: "Jan", value: 2.5 },
      { name: "Fév", value: 4.0 },
      { name: "Mars", value: 3.2 },
      { name: "Avr", value: 5.2 },
    ],
    description: "Retour sur dépenses publicitaires mensuel.",
  },
  {
    id: "cac",
    label: "CAC (Coût Acquisition Client)",
    color: "#6366f1",
    defaultChart: "line",
    mockData: [
      { name: "T1", value: 295 },
      { name: "T2", value: 310 },
      { name: "T3", value: 278 },
      { name: "T4", value: 330 },
    ],
    description: "Coût d’acquisition client (moyenne trimestrielle).",
  },
  {
    id: "mql",
    label: "MQLs générés",
    color: "#fbbf24",
    defaultChart: "bar",
    mockData: [
      { name: "S1", value: 34 },
      { name: "S2", value: 56 },
      { name: "S3", value: 43 },
      { name: "S4", value: 67 },
    ],
    description: "Nombre de Marketing Qualified Leads par semaine.",
  },
  {
    id: "pipeline",
    label: "Pipeline projeté",
    color: "#a78bfa",
    defaultChart: "line",
    mockData: [
      { name: "S1", value: 52000 },
      { name: "S2", value: 48000 },
      { name: "S3", value: 61000 },
      { name: "S4", value: 73000 },
    ],
    description: "Valeur totale du pipeline commercial par semaine (€).",
  },
  {
    id: "sessions",
    label: "Sessions Website",
    color: "#ef4444",
    defaultChart: "bar",
    mockData: [
      { name: "Jan", value: 14500 },
      { name: "Fév", value: 18800 },
      { name: "Mars", value: 16200 },
      { name: "Avr", value: 21000 },
    ],
    description: "Nombre total de sessions sur le site.",
  },
];
