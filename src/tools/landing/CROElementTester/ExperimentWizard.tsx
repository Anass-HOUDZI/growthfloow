
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ChevronRight, ChevronLeft, Target, Lightbulb, Calculator, CheckCircle } from 'lucide-react';

interface ExperimentWizardProps {
  onComplete: (experimentData: any) => void;
  onClose: () => void;
}

export const ExperimentWizard: React.FC<ExperimentWizardProps> = ({ onComplete, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [experimentData, setExperimentData] = useState({
    hypothesis: '',
    goal: '',
    metric: '',
    element: '',
    baseline: 0,
    targetImprovement: 0,
    audience: '',
    duration: 14,
    confidence: 95,
    description: ''
  });

  const steps = [
    { title: 'Objectif', icon: Target },
    { title: 'Hypothèse', icon: Lightbulb },
    { title: 'Configuration', icon: Calculator },
    { title: 'Validation', icon: CheckCircle }
  ];

  const updateData = (key: string, value: any) => {
    setExperimentData(prev => ({ ...prev, [key]: value }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    onComplete(experimentData);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-base font-medium">Quel est l'objectif de ce test ?</Label>
              <Select value={experimentData.goal} onValueChange={(value) => updateData('goal', value)}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Choisir un objectif" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="increase-conversions">Augmenter les conversions</SelectItem>
                  <SelectItem value="improve-engagement">Améliorer l'engagement</SelectItem>
                  <SelectItem value="reduce-bounce">Réduire le taux de rebond</SelectItem>
                  <SelectItem value="increase-signups">Augmenter les inscriptions</SelectItem>
                  <SelectItem value="improve-ux">Améliorer l'expérience utilisateur</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label className="text-base font-medium">Métrique principale à optimiser</Label>
              <Select value={experimentData.metric} onValueChange={(value) => updateData('metric', value)}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Choisir une métrique" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="conversion-rate">Taux de conversion</SelectItem>
                  <SelectItem value="click-through-rate">Taux de clic</SelectItem>
                  <SelectItem value="time-on-page">Temps sur la page</SelectItem>
                  <SelectItem value="form-completion">Complétion de formulaire</SelectItem>
                  <SelectItem value="purchase-rate">Taux d'achat</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-base font-medium">Valeur baseline actuelle (%)</Label>
              <Input
                type="number"
                min="0"
                max="100"
                step="0.1"
                value={experimentData.baseline}
                onChange={(e) => updateData('baseline', parseFloat(e.target.value))}
                className="mt-2"
                placeholder="Ex: 3.2"
              />
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-base font-medium">Formulez votre hypothèse</Label>
              <Textarea
                value={experimentData.hypothesis}
                onChange={(e) => updateData('hypothesis', e.target.value)}
                className="mt-2"
                rows={4}
                placeholder="Si je change [ÉLÉMENT] en [VARIANTE], alors [MÉTRIQUE] va [AMÉLIORATION] parce que [RAISON]"
              />
              <div className="mt-2 text-sm text-slate-600">
                <strong>Exemple :</strong> Si je change le bouton CTA de "Acheter maintenant" à "Commencer mon essai gratuit", 
                alors le taux de conversion va augmenter de 15% parce que cela réduit la friction et l'engagement financier perçu.
              </div>
            </div>

            <div>
              <Label className="text-base font-medium">Élément à tester</Label>
              <Select value={experimentData.element} onValueChange={(value) => updateData('element', value)}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Choisir un élément" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cta">Bouton CTA</SelectItem>
                  <SelectItem value="headline">Titre principal</SelectItem>
                  <SelectItem value="form">Formulaire</SelectItem>
                  <SelectItem value="pricing">Tarification</SelectItem>
                  <SelectItem value="testimonials">Témoignages</SelectItem>
                  <SelectItem value="images">Images/Visuels</SelectItem>
                  <SelectItem value="copy">Texte marketing</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-base font-medium">Amélioration attendue (%)</Label>
              <Input
                type="number"
                min="1"
                max="100"
                value={experimentData.targetImprovement}
                onChange={(e) => updateData('targetImprovement', parseInt(e.target.value))}
                className="mt-2"
                placeholder="Ex: 20"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-base font-medium">Audience cible</Label>
              <Select value={experimentData.audience} onValueChange={(value) => updateData('audience', value)}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Choisir une audience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les visiteurs</SelectItem>
                  <SelectItem value="new">Nouveaux visiteurs</SelectItem>
                  <SelectItem value="returning">Visiteurs récurrents</SelectItem>
                  <SelectItem value="mobile">Utilisateurs mobile</SelectItem>
                  <SelectItem value="desktop">Utilisateurs desktop</SelectItem>
                  <SelectItem value="segment">Segment spécifique</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-base font-medium">Durée du test (jours)</Label>
              <Input
                type="number"
                min="3"
                max="60"
                value={experimentData.duration}
                onChange={(e) => updateData('duration', parseInt(e.target.value))}
                className="mt-2"
                placeholder="14"
              />
            </div>

            <div>
              <Label className="text-base font-medium">Niveau de confiance</Label>
              <Select value={experimentData.confidence.toString()} onValueChange={(value) => updateData('confidence', parseInt(value))}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="90">90% (moins strict)</SelectItem>
                  <SelectItem value="95">95% (recommandé)</SelectItem>
                  <SelectItem value="99">99% (très strict)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-base font-medium">Description du test</Label>
              <Textarea
                value={experimentData.description}
                onChange={(e) => updateData('description', e.target.value)}
                className="mt-2"
                rows={3}
                placeholder="Description détaillée du test et du contexte"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-medium text-green-800 mb-2">✅ Configuration validée</h4>
              <p className="text-sm text-green-700">Votre expérience est prête à être lancée.</p>
            </div>

            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <h5 className="font-medium mb-2">Résumé de l'expérience</h5>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-slate-600">Objectif:</span>
                    <div className="font-medium">{experimentData.goal}</div>
                  </div>
                  <div>
                    <span className="text-slate-600">Métrique:</span>
                    <div className="font-medium">{experimentData.metric}</div>
                  </div>
                  <div>
                    <span className="text-slate-600">Élément:</span>
                    <div className="font-medium">{experimentData.element}</div>
                  </div>
                  <div>
                    <span className="text-slate-600">Amélioration attendue:</span>
                    <div className="font-medium">{experimentData.targetImprovement}%</div>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h5 className="font-medium mb-2">Hypothèse</h5>
                <p className="text-sm text-slate-700">{experimentData.hypothesis}</p>
              </div>

              <div className="border rounded-lg p-4">
                <h5 className="font-medium mb-2">Checklist de validation</h5>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Hypothèse clairement formulée</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Métrique principale définie</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Audience cible sélectionnée</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Durée de test appropriée</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const currentStepData = steps[currentStep];
  const StepIcon = currentStepData.icon;
  const progress = ((currentStep + 1) / steps.length) * 100;
  const isLastStep = currentStep === steps.length - 1;
  const canProceed = currentStep === 0 ? experimentData.goal && experimentData.metric :
                     currentStep === 1 ? experimentData.hypothesis && experimentData.element :
                     currentStep === 2 ? experimentData.audience : true;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        <div className="border-b border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-slate-800">Assistant de Conception d'Expérience</h2>
            <Button variant="outline" onClick={onClose}>✕</Button>
          </div>
          
          <div className="flex items-center space-x-4 mb-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    index <= currentStep ? 'bg-blue-500 text-white' : 'bg-slate-200 text-slate-600'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className={`ml-2 text-sm ${
                    index === currentStep ? 'font-medium text-slate-800' : 'text-slate-600'
                  }`}>
                    {step.title}
                  </span>
                  {index < steps.length - 1 && (
                    <ChevronRight className="w-4 h-4 text-slate-400 mx-2" />
                  )}
                </div>
              );
            })}
          </div>
          
          <Progress value={progress} className="h-2" />
        </div>

        <div className="p-6 max-h-[60vh] overflow-y-auto">
          <div className="flex items-center space-x-2 mb-6">
            <StepIcon className="w-6 h-6 text-blue-500" />
            <h3 className="text-lg font-semibold text-slate-800">{currentStepData.title}</h3>
          </div>
          
          {renderStepContent()}
        </div>

        <div className="border-t border-slate-200 p-6 flex justify-between">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0}
            className="flex items-center space-x-2"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Précédent</span>
          </Button>

          {isLastStep ? (
            <Button onClick={handleComplete} className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4" />
              <span>Créer l'expérience</span>
            </Button>
          ) : (
            <Button
              onClick={nextStep}
              disabled={!canProceed}
              className="flex items-center space-x-2"
            >
              <span>Suivant</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
