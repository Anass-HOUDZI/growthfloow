
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, Edit3, Eye, Copy } from 'lucide-react';
import { TestVariant, VariantContent } from './types';

interface TestVariantBuilderProps {
  elementType: string;
  variants: TestVariant[];
  onVariantsChange: (variants: TestVariant[]) => void;
}

export const TestVariantBuilder: React.FC<TestVariantBuilderProps> = ({
  elementType,
  variants,
  onVariantsChange
}) => {
  const [editingVariant, setEditingVariant] = useState<string | null>(null);

  const getDefaultContent = (type: string): VariantContent => {
    switch (type) {
      case 'cta':
        return { 
          text: 'Commencer maintenant',
          color: 'blue',
          size: 'medium',
          style: 'filled'
        };
      case 'headline':
        return { 
          text: 'Transformez votre business',
          size: 'large',
          weight: 'bold'
        };
      case 'form':
        return { 
          fields: ['email'],
          layout: 'vertical',
          submitText: 'S\'inscrire'
        };
      case 'pricing':
        return { 
          price: '29€',
          period: 'mois',
          features: ['Feature 1', 'Feature 2']
        };
      default:
        return { text: 'Nouveau contenu' };
    }
  };

  const addVariant = () => {
    const newVariant: TestVariant = {
      id: `variant${Date.now()}`,
      name: `Variante ${variants.length}`,
      description: 'Nouvelle variante de test',
      content: getDefaultContent(elementType),
      isControl: false
    };
    onVariantsChange([...variants, newVariant]);
    setEditingVariant(newVariant.id);
  };

  const updateVariant = (variantId: string, updates: Partial<TestVariant>) => {
    const updatedVariants = variants.map(v => 
      v.id === variantId ? { ...v, ...updates } : v
    );
    onVariantsChange(updatedVariants);
  };

  const deleteVariant = (variantId: string) => {
    if (variants.length <= 2) return; // Minimum 2 variants
    onVariantsChange(variants.filter(v => v.id !== variantId));
  };

  const duplicateVariant = (variant: TestVariant) => {
    const newVariant: TestVariant = {
      ...variant,
      id: `variant${Date.now()}`,
      name: `${variant.name} (Copie)`,
      isControl: false
    };
    onVariantsChange([...variants, newVariant]);
  };

  const renderContentEditor = (variant: TestVariant) => {
    const updateContent = (updates: Partial<VariantContent>) => {
      updateVariant(variant.id, {
        content: { ...variant.content, ...updates }
      });
    };

    switch (elementType) {
      case 'cta':
        return (
          <div className="space-y-4">
            <div>
              <Label>Texte du bouton</Label>
              <Input
                value={variant.content.text || ''}
                onChange={(e) => updateContent({ text: e.target.value })}
                placeholder="Texte du CTA"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Couleur</Label>
                <Select
                  value={variant.content.color || 'blue'}
                  onValueChange={(value) => updateContent({ color: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="blue">Bleu</SelectItem>
                    <SelectItem value="green">Vert</SelectItem>
                    <SelectItem value="red">Rouge</SelectItem>
                    <SelectItem value="orange">Orange</SelectItem>
                    <SelectItem value="purple">Violet</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Taille</Label>
                <Select
                  value={variant.content.size || 'medium'}
                  onValueChange={(value) => updateContent({ size: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Petit</SelectItem>
                    <SelectItem value="medium">Moyen</SelectItem>
                    <SelectItem value="large">Grand</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 'headline':
        return (
          <div className="space-y-4">
            <div>
              <Label>Titre</Label>
              <Textarea
                value={variant.content.text || ''}
                onChange={(e) => updateContent({ text: e.target.value })}
                placeholder="Votre titre principal"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Taille</Label>
                <Select
                  value={variant.content.size || 'large'}
                  onValueChange={(value) => updateContent({ size: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="medium">Moyen</SelectItem>
                    <SelectItem value="large">Grand</SelectItem>
                    <SelectItem value="xl">Très grand</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Poids</Label>
                <Select
                  value={variant.content.weight || 'bold'}
                  onValueChange={(value) => updateContent({ weight: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="semibold">Semi-gras</SelectItem>
                    <SelectItem value="bold">Gras</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 'form':
        return (
          <div className="space-y-4">
            <div>
              <Label>Champs du formulaire</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {variant.content.fields?.map((field, index) => (
                  <Badge key={index} variant="outline" className="flex items-center gap-1">
                    {field}
                    <button
                      onClick={() => {
                        const newFields = variant.content.fields?.filter((_, i) => i !== index) || [];
                        updateContent({ fields: newFields });
                      }}
                      className="ml-1 text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <Label>Texte du bouton submit</Label>
              <Input
                value={variant.content.submitText || ''}
                onChange={(e) => updateContent({ submitText: e.target.value })}
                placeholder="Texte du bouton"
              />
            </div>
          </div>
        );

      default:
        return (
          <div>
            <Label>Contenu</Label>
            <Textarea
              value={variant.content.text || ''}
              onChange={(e) => updateContent({ text: e.target.value })}
              placeholder="Contenu de l'élément"
              rows={4}
            />
          </div>
        );
    }
  };

  const renderVariantPreview = (variant: TestVariant) => {
    switch (elementType) {
      case 'cta':
        const ctaColors = {
          blue: 'bg-blue-500 text-white',
          green: 'bg-green-500 text-white',
          red: 'bg-red-500 text-white',
          orange: 'bg-orange-500 text-white',
          purple: 'bg-purple-500 text-white'
        };
        const ctaSizes = {
          small: 'px-3 py-1.5 text-sm',
          medium: 'px-4 py-2',
          large: 'px-6 py-3 text-lg'
        };
        return (
          <button
            className={`rounded-lg font-semibold transition-colors ${
              ctaColors[variant.content.color as keyof typeof ctaColors] || ctaColors.blue
            } ${
              ctaSizes[variant.content.size as keyof typeof ctaSizes] || ctaSizes.medium
            }`}
          >
            {variant.content.text || 'CTA Button'}
          </button>
        );

      case 'headline':
        const headlineSizes = {
          medium: 'text-2xl',
          large: 'text-3xl',
          xl: 'text-4xl'
        };
        const headlineWeights = {
          normal: 'font-normal',
          semibold: 'font-semibold',
          bold: 'font-bold'
        };
        return (
          <h1
            className={`${
              headlineSizes[variant.content.size as keyof typeof headlineSizes] || headlineSizes.large
            } ${
              headlineWeights[variant.content.weight as keyof typeof headlineWeights] || headlineWeights.bold
            } text-slate-800`}
          >
            {variant.content.text || 'Titre principal'}
          </h1>
        );

      case 'form':
        return (
          <div className="space-y-3 max-w-sm">
            {variant.content.fields?.map((field, index) => (
              <div key={index}>
                <label className="block text-sm font-medium text-slate-700 mb-1 capitalize">
                  {field}
                </label>
                <input
                  type={field === 'email' ? 'email' : 'text'}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md"
                  placeholder={`Votre ${field}`}
                />
              </div>
            ))}
            <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-md font-semibold">
              {variant.content.submitText || 'Envoyer'}
            </button>
          </div>
        );

      default:
        return (
          <div className="p-4 bg-slate-100 rounded-lg text-slate-700">
            {variant.content.text || 'Aperçu du contenu'}
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-800">Variantes de Test</h3>
        <Button onClick={addVariant} className="flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Ajouter une variante</span>
        </Button>
      </div>

      <div className="grid gap-6">
        {variants.map((variant, index) => (
          <Card key={variant.id} className={`${variant.isControl ? 'border-blue-200 bg-blue-50' : ''}`}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <CardTitle className="text-base">
                    {variant.name}
                    {variant.isControl && (
                      <Badge variant="outline" className="ml-2 text-blue-600 border-blue-300">
                        Contrôle
                      </Badge>
                    )}
                  </CardTitle>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingVariant(
                      editingVariant === variant.id ? null : variant.id
                    )}
                  >
                    <Edit3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => duplicateVariant(variant)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  {!variant.isControl && variants.length > 2 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteVariant(variant.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
              <p className="text-sm text-slate-600">{variant.description}</p>
            </CardHeader>
            <CardContent>
              {editingVariant === variant.id ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Nom de la variante</Label>
                      <Input
                        value={variant.name}
                        onChange={(e) => updateVariant(variant.id, { name: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>Description</Label>
                      <Input
                        value={variant.description}
                        onChange={(e) => updateVariant(variant.id, { description: e.target.value })}
                      />
                    </div>
                  </div>
                  {renderContentEditor(variant)}
                  <div className="flex justify-end space-x-2 pt-4 border-t">
                    <Button
                      variant="outline"
                      onClick={() => setEditingVariant(null)}
                    >
                      Annuler
                    </Button>
                    <Button onClick={() => setEditingVariant(null)}>
                      Sauvegarder
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 text-sm text-slate-600">
                    <Eye className="w-4 h-4" />
                    <span>Aperçu:</span>
                  </div>
                  <div className="p-4 bg-white border border-slate-200 rounded-lg">
                    {renderVariantPreview(variant)}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
