
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Eye, Code, Download, Copy, Palette, Type, Layout, Settings } from 'lucide-react';
import { TestVariant, VariantContent } from './types';

interface VisualElementEditorProps {
  variant: TestVariant;
  elementType: string;
  onVariantUpdate: (variant: TestVariant) => void;
  onClose: () => void;
}

export const VisualElementEditor: React.FC<VisualElementEditorProps> = ({
  variant,
  elementType,
  onVariantUpdate,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState('design');
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const updateContent = (updates: Partial<VariantContent>) => {
    const updatedVariant = {
      ...variant,
      content: { ...variant.content, ...updates }
    };
    onVariantUpdate(updatedVariant);
  };

  const generateCSS = () => {
    const { content } = variant;
    let css = '';
    
    switch (elementType) {
      case 'cta':
        css = `
.cta-button {
  background-color: ${content.color || 'blue'};
  color: white;
  padding: ${content.size === 'small' ? '8px 16px' : content.size === 'large' ? '16px 32px' : '12px 24px'};
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.cta-button:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}
        `;
        break;
      case 'headline':
        css = `
.headline {
  font-size: ${content.size === 'xl' ? '3rem' : content.size === 'large' ? '2.5rem' : '2rem'};
  font-weight: ${content.weight || 'bold'};
  color: #1a1a1a;
  line-height: 1.2;
  margin-bottom: 1rem;
}
        `;
        break;
    }
    
    return css.trim();
  };

  const generateHTML = () => {
    const { content } = variant;
    
    switch (elementType) {
      case 'cta':
        return `<button class="cta-button">${content.text || 'Button Text'}</button>`;
      case 'headline':
        return `<h1 class="headline">${content.text || 'Headline Text'}</h1>`;
      case 'form':
        return `
<form class="form">
  ${content.fields?.map(field => `
  <div class="form-field">
    <label>${field}</label>
    <input type="${field === 'email' ? 'email' : 'text'}" placeholder="Your ${field}" />
  </div>`).join('\n') || ''}
  <button type="submit" class="submit-button">${content.submitText || 'Submit'}</button>
</form>
        `.trim();
      default:
        return `<div class="element">${content.text || 'Content'}</div>`;
    }
  };

  const renderDesignControls = () => {
    switch (elementType) {
      case 'cta':
        return (
          <div className="space-y-6">
            <div>
              <Label>Texte du bouton</Label>
              <Input
                value={variant.content.text || ''}
                onChange={(e) => updateContent({ text: e.target.value })}
                placeholder="Texte du CTA"
                className="mt-2"
              />
            </div>

            <div>
              <Label>Couleur</Label>
              <div className="mt-2 grid grid-cols-5 gap-2">
                {['blue', 'green', 'red', 'orange', 'purple'].map(color => (
                  <button
                    key={color}
                    onClick={() => updateContent({ color })}
                    className={`w-12 h-12 rounded-lg border-2 ${
                      variant.content.color === color ? 'border-slate-800' : 'border-slate-300'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            <div>
              <Label>Taille</Label>
              <Select
                value={variant.content.size || 'medium'}
                onValueChange={(value) => updateContent({ size: value })}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Petit</SelectItem>
                  <SelectItem value="medium">Moyen</SelectItem>
                  <SelectItem value="large">Grand</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Style</Label>
              <Select
                value={variant.content.style || 'filled'}
                onValueChange={(value) => updateContent({ style: value })}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="filled">Rempli</SelectItem>
                  <SelectItem value="outline">Contour</SelectItem>
                  <SelectItem value="ghost">Fantôme</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 'headline':
        return (
          <div className="space-y-6">
            <div>
              <Label>Titre</Label>
              <Textarea
                value={variant.content.text || ''}
                onChange={(e) => updateContent({ text: e.target.value })}
                placeholder="Votre titre principal"
                rows={3}
                className="mt-2"
              />
            </div>

            <div>
              <Label>Taille</Label>
              <div className="mt-2">
                <Slider
                  value={[Number(variant.content['font-size'] || 32)]}
                  onValueChange={([value]) => updateContent({ 'font-size': value.toString() })}
                  min={16}
                  max={72}
                  step={2}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>16px</span>
                  <span>{variant.content['font-size'] || 32}px</span>
                  <span>72px</span>
                </div>
              </div>
            </div>

            <div>
              <Label>Poids de police</Label>
              <Select
                value={variant.content.weight || 'bold'}
                onValueChange={(value) => updateContent({ weight: value })}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="semibold">Semi-gras</SelectItem>
                  <SelectItem value="bold">Gras</SelectItem>
                  <SelectItem value="extrabold">Extra-gras</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Alignement</Label>
              <Select
                value={variant.content.alignment || 'left'}
                onValueChange={(value) => updateContent({ alignment: value })}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="left">Gauche</SelectItem>
                  <SelectItem value="center">Centre</SelectItem>
                  <SelectItem value="right">Droite</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-8 text-slate-500">
            <p>Éditeur visuel en cours de développement pour ce type d'élément</p>
          </div>
        );
    }
  };

  const renderPreview = () => {
    const previewSizes = {
      desktop: 'w-full max-w-4xl',
      tablet: 'w-full max-w-2xl',
      mobile: 'w-full max-w-sm'
    };

    return (
      <div className={`mx-auto ${previewSizes[previewMode]} transition-all duration-300`}>
        <div className="bg-white border border-slate-200 rounded-lg p-8 min-h-[300px] flex items-center justify-center">
          {elementType === 'cta' && (
            <button
              className={`px-6 py-3 rounded-lg font-semibold transition-all hover:opacity-90 ${
                variant.content.size === 'small' ? 'px-4 py-2 text-sm' :
                variant.content.size === 'large' ? 'px-8 py-4 text-lg' :
                'px-6 py-3'
              }`}
              style={{
                backgroundColor: variant.content.color || 'blue',
                color: 'white'
              }}
            >
              {variant.content.text || 'Button Text'}
            </button>
          )}
          
          {elementType === 'headline' && (
            <h1
              className="text-center"
              style={{
                fontSize: `${variant.content['font-size'] || 32}px`,
                fontWeight: variant.content.weight || 'bold',
                textAlign: variant.content.alignment as any || 'left'
              }}
            >
              {variant.content.text || 'Votre titre principal'}
            </h1>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-6xl h-[90vh] overflow-hidden flex flex-col">
        <div className="border-b border-slate-200 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Éditeur Visuel</h2>
            <p className="text-slate-600">Édition de: {variant.name}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={() => navigator.clipboard.writeText(generateHTML())}>
              <Copy className="w-4 h-4 mr-2" />
              Copier HTML
            </Button>
            <Button variant="outline" onClick={onClose}>✕</Button>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Panneau de contrôles */}
          <div className="w-80 border-r border-slate-200 overflow-y-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-3 w-full p-1 m-4">
                <TabsTrigger value="design" className="flex items-center space-x-1">
                  <Palette className="w-4 h-4" />
                  <span>Design</span>
                </TabsTrigger>
                <TabsTrigger value="layout" className="flex items-center space-x-1">
                  <Layout className="w-4 h-4" />
                  <span>Layout</span>
                </TabsTrigger>
                <TabsTrigger value="code" className="flex items-center space-x-1">
                  <Code className="w-4 h-4" />
                  <span>Code</span>
                </TabsTrigger>
              </TabsList>

              <div className="p-4">
                <TabsContent value="design" className="mt-0">
                  {renderDesignControls()}
                </TabsContent>

                <TabsContent value="layout" className="mt-0">
                  <div className="space-y-4">
                    <div>
                      <Label>Position</Label>
                      <Select
                        value={variant.content.position || 'center'}
                        onValueChange={(value) => updateContent({ position: value })}
                      >
                        <SelectTrigger className="mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="left">Gauche</SelectItem>
                          <SelectItem value="center">Centre</SelectItem>
                          <SelectItem value="right">Droite</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="code" className="mt-0">
                  <div className="space-y-4">
                    <div>
                      <Label>HTML</Label>
                      <Textarea
                        value={generateHTML()}
                        readOnly
                        rows={8}
                        className="mt-2 font-mono text-xs"
                      />
                    </div>
                    <div>
                      <Label>CSS</Label>
                      <Textarea
                        value={generateCSS()}
                        readOnly
                        rows={12}
                        className="mt-2 font-mono text-xs"
                      />
                    </div>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>

          {/* Zone de prévisualisation */}
          <div className="flex-1 flex flex-col">
            <div className="border-b border-slate-200 p-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Eye className="w-4 h-4 text-slate-600" />
                <span className="text-sm font-medium">Prévisualisation</span>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant={previewMode === 'desktop' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setPreviewMode('desktop')}
                >
                  Desktop
                </Button>
                <Button
                  variant={previewMode === 'tablet' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setPreviewMode('tablet')}
                >
                  Tablet
                </Button>
                <Button
                  variant={previewMode === 'mobile' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setPreviewMode('mobile')}
                >
                  Mobile
                </Button>
              </div>
            </div>

            <div className="flex-1 p-8 bg-slate-50 flex items-center justify-center overflow-auto">
              {renderPreview()}
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 p-4 flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button onClick={onClose}>
            Sauvegarder
          </Button>
        </div>
      </div>
    </div>
  );
};
