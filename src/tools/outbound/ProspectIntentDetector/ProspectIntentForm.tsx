
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface FormProps {
  prospectUrl: string;
  companyName: string;
  isAnalyzing: boolean;
  onUrlChange: (val: string) => void;
  onCompanyChange: (val: string) => void;
  onSubmit: () => void;
}
export function ProspectIntentForm({
  prospectUrl,
  companyName,
  isAnalyzing,
  onUrlChange,
  onCompanyChange,
  onSubmit,
}: FormProps) {
  return (
    <form
      className="space-y-4"
      onSubmit={e => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="prospect-url">URL LinkedIn du prospect</Label>
          <Input
            id="prospect-url"
            placeholder="https://linkedin.com/in/marie-dubois"
            value={prospectUrl}
            onChange={e => onUrlChange(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="company-name">Nom de l'entreprise</Label>
          <Input
            id="company-name"
            placeholder="TechCorp"
            value={companyName}
            onChange={e => onCompanyChange(e.target.value)}
          />
        </div>
      </div>
      <Button
        type="submit"
        disabled={isAnalyzing || !prospectUrl}
        className="w-full"
      >
        {isAnalyzing ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
            Analyse en cours...
          </>
        ) : (
          <>
            <Search className="w-4 h-4 mr-2" />
            Analyser le prospect
          </>
        )}
      </Button>
    </form>
  );
}
