
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Sparkles } from 'lucide-react';

interface KeywordFormProps {
  seedKeyword: string;
  setSeedKeyword: (value: string) => void;
  industry: string;
  setIndustry: (value: string) => void;
  country: string;
  setCountry: (value: string) => void;
  onAnalyze: () => void;
  isLoading: boolean;
}

const industries = [
  { value: 'ecommerce', label: 'E-commerce' },
  { value: 'saas', label: 'SaaS/Tech' },
  { value: 'finance', label: 'Finance' },
  { value: 'health', label: 'Santé' },
  { value: 'education', label: 'Éducation' },
  { value: 'travel', label: 'Voyage' },
  { value: 'food', label: 'Alimentation' },
  { value: 'fashion', label: 'Mode' },
  { value: 'real-estate', label: 'Immobilier' },
  { value: 'automotive', label: 'Automobile' }
];

const countries = [
  { value: 'fr', label: 'France' },
  { value: 'us', label: 'États-Unis' },
  { value: 'gb', label: 'Royaume-Uni' },
  { value: 'ca', label: 'Canada' },
  { value: 'de', label: 'Allemagne' },
  { value: 'es', label: 'Espagne' },
  { value: 'it', label: 'Italie' }
];

export const KeywordForm: React.FC<KeywordFormProps> = ({
  seedKeyword,
  setSeedKeyword,
  industry,
  setIndustry,
  country,
  setCountry,
  onAnalyze,
  isLoading
}) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Sparkles className="w-5 h-5 text-blue-500" />
              <h3 className="text-lg font-semibold text-slate-800">Configuration de l'analyse</h3>
            </div>
            <p className="text-sm text-slate-600">
              Entrez votre mot-clé principal et configurez les paramètres d'analyse
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="keyword">Mot-clé principal *</Label>
              <Input
                id="keyword"
                placeholder="ex: marketing digital"
                value={seedKeyword}
                onChange={(e) => setSeedKeyword(e.target.value)}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="industry">Secteur d'activité</Label>
              <Select value={industry} onValueChange={setIndustry}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez un secteur" />
                </SelectTrigger>
                <SelectContent>
                  {industries.map((ind) => (
                    <SelectItem key={ind.value} value={ind.value}>
                      {ind.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">Pays/Région</Label>
              <Select value={country} onValueChange={setCountry}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez un pays" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((c) => (
                    <SelectItem key={c.value} value={c.value}>
                      {c.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button 
                onClick={onAnalyze}
                disabled={!seedKeyword.trim() || isLoading}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                <Search className="w-4 h-4 mr-2" />
                {isLoading ? 'Analyse en cours...' : 'Analyser les mots-clés'}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
