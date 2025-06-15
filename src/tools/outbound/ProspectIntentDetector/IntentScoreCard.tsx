
import React from "react";
import { Badge } from "@/components/ui/badge";

function getScoreColor(score: number) {
  if (score >= 80) return "bg-red-500";
  if (score >= 60) return "bg-orange-500";
  if (score >= 40) return "bg-yellow-500";
  return "bg-gray-400";
}

export function IntentScoreCard({
  name,
  company,
  title,
  score,
  recommendation,
}: {
  name: string;
  company: string;
  title: string;
  score: number;
  recommendation: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-28 h-28 mb-2">
        <svg className="w-28 h-28 transform -rotate-90">
          <circle
            cx="56"
            cy="56"
            r="48"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            className="text-gray-200"
          />
          <circle
            cx="56"
            cy="56"
            r="48"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            strokeDasharray={`${2 * Math.PI * 48}`}
            strokeDashoffset={`${2 * Math.PI * 48 * (1 - score / 100)}`}
            className={`${getScoreColor(score)} transition-all duration-1000`}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-slate-800">
          {score}
        </span>
      </div>
      <div>
        <div className="font-semibold text-slate-800">{name}</div>
        <div className="text-xs text-slate-500">{title}</div>
        <div className="text-xs text-slate-400">{company}</div>
      </div>
      <Badge className={`${getScoreColor(score)} text-white mt-3`}>
        {recommendation}
      </Badge>
    </div>
  );
}
