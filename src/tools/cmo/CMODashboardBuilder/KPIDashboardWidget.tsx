
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { BarChart, LineChart, PieChart } from "lucide-react";
import {
  BarChart as RBarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  ResponsiveContainer,
  LineChart as RLineChart,
  Line,
  PieChart as RPieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

type ChartType = "bar" | "line" | "pie";
type Color = string;

export interface KPIWidgetProps {
  title: string;
  color: Color;
  chartType: ChartType;
  data: { name: string; value: number }[];
}

const chartIcons = {
  bar: BarChart,
  line: LineChart,
  pie: PieChart,
};

const colors = ["#6366f1", "#34d399", "#fbbf24", "#ef4444", "#a78bfa"];

export const KPIDashboardWidget: React.FC<KPIWidgetProps> = ({
  title,
  color,
  chartType,
  data,
}) => {
  const Icon = chartIcons[chartType];

  return (
    <Card className="w-full max-w-xs shadow-lg hover:scale-105 transition-transform animate-fade-in hover:shadow-xl">
      <CardHeader className="flex flex-row items-center gap-2 pb-2">
        <span>
          <Icon className="w-5 h-5 text-blue-500" />
        </span>
        <CardTitle className="text-sm text-slate-700 truncate">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center pb-4 pt-1">
        <div className="w-full h-32">
          {chartType === "bar" && (
            <ResponsiveContainer>
              <RBarChart data={data}>
                <CartesianGrid strokeDasharray="2 2" stroke="#e0e7ef" />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Bar dataKey="value" fill={color} />
              </RBarChart>
            </ResponsiveContainer>
          )}
          {chartType === "line" && (
            <ResponsiveContainer>
              <RLineChart data={data}>
                <CartesianGrid strokeDasharray="2 2" stroke="#e0e7ef" />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2} />
              </RLineChart>
            </ResponsiveContainer>
          )}
          {chartType === "pie" && (
            <ResponsiveContainer>
              <RPieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={40}
                  innerRadius={20}
                  paddingAngle={2}
                >
                  {data.map((entry, idx) => (
                    <Cell key={`cell-${idx}`} fill={colors[idx % colors.length]} />
                  ))}
                </Pie>
                <Legend verticalAlign="bottom" height={24} iconType="circle" />
                <Tooltip />
              </RPieChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
