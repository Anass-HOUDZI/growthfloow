
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Edit, Plus, Trash2 } from 'lucide-react';

interface ElementVariantsProps {
  elementType: string;
  variants: Array<{
    id: string;
    name: string;
    description: string;
    content: any;
    isControl: boolean;
  }>;
  onVariantAdd: () => void;
  onVariantEdit: (variantId: string) => void;
  onVariantDelete: (variantId: string) => void;
}

export const ElementVariants: React.FC<ElementVariantsProps> = ({
  elementType,
  variants,
  onVariantAdd,
  onVariantEdit,
  onVariantDelete
}) => {
  const getElementTypeConfig = (type: string) => {
    const configs = {
      cta: {
        title: 'Call-to-Action',
        icon: '🎯',
        fields: ['text', 'color', 'size', 'position']
      },
      headline: {
        title: 'Titre Principal',
        icon: '📝',
        fields: ['text', 'font-size', 'color', 'alignment']
      },
      form: {
        title: 'Formulaire',
        icon: '📋',
        fields: ['fields', 'layout', 'validation', 'placeholder']
      },
      pricing: {
        title: 'Tarification',
        icon: '💰',
        fields: ['price', 'features', 'cta', 'highlight']
      },
      testimonials: {
        title: 'Témoignages',
        icon: '💬',
        fields: ['content', 'author', 'layout', 'rating']
      },
      features: {
        title: 'Fonctionnalités',
        icon: '⭐',
        fields: ['list', 'icons', 'layout', 'description']
      },
      images: {
        title: 'Images/Visuels',
        icon: '🖼️',
        fields: ['image', 'alt-text', 'size', 'position']
      },
      copy: {
        title: 'Texte Marketing',
        icon: '✍️',
        fields: ['content', 'tone', 'length', 'structure']
      }
    };
    return configs[type] || configs.cta;
  };

  const config = getElementTypeConfig(elementType);

  const renderVariantPreview = (variant: any) => {
    switch (elementType) {
      case 'cta':
        return (
          <div className="p-3 bg-slate-50 rounded-lg">
            <button 
              className={`px-4 py-2 rounded-lg font-medium ${
                variant.content?.color === 'green' ? 'bg-green-500 text-white' :
                variant.content?.color === 'blue' ? 'bg-blue-500 text-white' :
                variant.content?.color === 'red' ? 'bg-red-500 text-white' :
                'bg-gray-500 text-white'
              }`}
            >
              {variant.content?.text || variant.description}
            </button>
          </div>
        );
      
      case 'headline':
        return (
          <div className="p-3 bg-slate-50 rounded-lg">
            <h3 className={`font-bold ${
              variant.content?.size === 'large' ? 'text-2xl' :
              variant.content?.size === 'medium' ? 'text-xl' :
              'text-lg'
            }`}>
              {variant.content?.text || variant.description}
            </h3>
          </div>
        );
      
      case 'form':
        return (
          <div className="p-3 bg-slate-50 rounded-lg">
            <div className="space-y-2">
              {variant.content?.fields?.map((field: string, index: number) => (
                <input
                  key={index}
                  type="text"
                  placeholder={field}
                  className="w-full px-3 py-2 border border-slate-300 rounded text-sm"
                  disabled
                />
              )) || (
                <div className="text-sm text-slate-600">{variant.description}</div>
              )}
            </div>
          </div>
        );
      
      default:
        return (
          <div className="p-3 bg-slate-50 rounded-lg">
            <p className="text-sm text-slate-600">{variant.description}</p>
          </div>
        );
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <span className="text-2xl">{config.icon}</span>
            <span>Variants - {config.title}</span>
          </CardTitle>
          <Button onClick={onVariantAdd} size="sm" className="flex items-center space-x-1">
            <Plus className="w-4 h-4" />
            <span>Ajouter variant</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {variants.map((variant) => (
            <div key={variant.id} className="border border-slate-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <h4 className="font-medium text-slate-800">{variant.name}</h4>
                  {variant.isControl && (
                    <Badge variant="outline">Contrôle</Badge>
                  )}
                </div>
                <div className="flex items-center space-x-1">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onVariantEdit(variant.id)}
                    className="p-2"
                  >
                    <Edit className="w-3 h-3" />
                  </Button>
                  {!variant.isControl && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onVariantDelete(variant.id)}
                      className="p-2 text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  )}
                </div>
              </div>

              {renderVariantPreview(variant)}

              <div className="mt-3 space-y-1">
                <p className="text-xs text-slate-600">{variant.description}</p>
                <div className="flex flex-wrap gap-1">
                  {config.fields.map((field) => (
                    <Badge key={field} variant="secondary" className="text-xs">
                      {field}
                    </Badge>
                  ))}
                </div>
              </div>

              <Button 
                variant="outline" 
                size="sm" 
                className="w-full mt-3 flex items-center justify-center space-x-1"
              >
                <Eye className="w-3 h-3" />
                <span>Prévisualiser</span>
              </Button>
            </div>
          ))}
        </div>

        {variants.length === 0 && (
          <div className="text-center py-8 text-slate-500">
            <p>Aucun variant configuré</p>
            <p className="text-sm mt-1">Cliquez sur "Ajouter variant" pour commencer</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
