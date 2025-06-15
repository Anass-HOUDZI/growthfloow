
import React from "react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Clock } from "lucide-react";

interface IntentSignal {
  type: string;
  description: string;
  score: number;
  source: string;
  date: string;
  confidence: "low" | "medium" | "high";
}

function getConfidenceBadge(confidence: string) {
  const colors = {
    high: "bg-green-100 text-green-800",
    medium: "bg-yellow-100 text-yellow-800",
    low: "bg-gray-100 text-gray-800",
  };
  return colors[confidence as keyof typeof colors];
}

export function IntentSignalsList({
  signals,
}: {
  signals: IntentSignal[];
}) {
  // Timeline view: sorted signals
  const sorted = [...signals].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  return (
    <div>
      <div className="flex items-center mb-2 space-x-2">
        <TrendingUp className="w-5 h-5" />
        <span className="font-bold text-slate-800">Signaux détectés & Timeline</span>
      </div>
      <ol className="border-l-2 border-blue-200 space-y-4 ml-6">
        {sorted.map((signal, idx) => (
          <li key={idx} className="relative pl-4">
            <span className="absolute -left-[1.2rem] top-1.5 bg-blue-500 w-3 h-3 rounded-full shadow" />
            <div className="flex items-center space-x-2 mb-1">
              <strong className="text-slate-800">{signal.type}</strong>
              <Badge className={getConfidenceBadge(signal.confidence)}>
                {signal.confidence}
              </Badge>
              <span className="flex items-center gap-1 text-xs text-slate-500 ml-2">
                <Clock className="w-3 h-3 mr-1" /> {signal.date}
              </span>
            </div>
            <div className="text-sm text-slate-600 mb-1">{signal.description}</div>
            <div className="flex items-center space-x-3">
              <span className="text-xs text-slate-500">Source: {signal.source}</span>
              <Progress value={signal.score} className="w-16" />
              <span className="text-xs font-bold text-slate-800">{signal.score}</span>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
