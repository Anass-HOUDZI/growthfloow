
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { TestTube, Play, Pause, RotateCcw, Download } from 'lucide-react';
import { TestConfiguration } from './TestConfiguration';
import { ElementVariants } from './ElementVariants';
import { TestResults } from './TestResults';
import { StatisticalEngine } from './StatisticalEngine';

export const CROElementTester: React.FC = () => {
  const [activeTab, setActiveTab] = useState('config');
  const [testStatus, setTestStatus] = useState<'idle' | 'running' | 'paused' | 'completed'>('idle');
  const [testConfig, setTestConfig] = useState({
    element: 'cta',
    trafficSplit: 50,
    duration: 14,
    significance: 95,
    minimumDetectableEffect: 20,
    currentConversionRate: 3.2,
    dailyTraffic: 1000
  });

  const [variants, setVariants] = useState([
    {
      id: 'control',
      name: 'Contrôle',
      description: 'Version actuelle',
      content: { text: 'Acheter maintenant', color: 'blue' },
      isControl: true
    },
    {
      id: 'variant1',
      name: 'Variante 1',
      description: 'Version optimisée',
      content: { text: 'Commandez aujourd\'hui', color: 'green' },
      isControl: false
    }
  ]);

  const [testResults, setTestResults] = useState({
    isComplete: false,
    winner: null,
    confidence: 0,
    improvement: 0,
    pValue: 1,
    variants: {
      control: {
        visitors: 0,
        conversions: 0,
        conversionRate: 0,
        confidenceInterval: [0, 0] as [number, number]
      },
      variant1: {
        visitors: 0,
        conversions: 0,
        conversionRate: 0,
        confidenceInterval: [0, 0] as [number, number]
      }
    },
    statisticalSignificance: false,
    recommendations: [],
    riskAssessment: ''
  });

  const [testDuration, setTestDuration] = useState(0);

  // Calculs statistiques
  const sampleSizeCalculation = React.useMemo(() => {
    const requiredSample = StatisticalEngine.calculateSampleSize(
      (100 - testConfig.significance) / 100,
      0.8,
      testConfig.currentConversionRate,
      testConfig.minimumDetectableEffect
    );

    const daysToComplete = StatisticalEngine.estimateTestDuration(
      requiredSample,
      testConfig.dailyTraffic,
      testConfig.trafficSplit
    );

    const power = StatisticalEngine.calculatePower(
      (100 - testConfig.significance) / 100,
      requiredSample,
      testConfig.currentConversionRate,
      testConfig.minimumDetectableEffect
    );

    return {
      requiredSample,
      daysToComplete,
      power: Math.round(power)
    };
  }, [testConfig]);

  // Simulation du test en cours
  useEffect(() => {
    if (testStatus === 'running') {
      const interval = setInterval(() => {
        setTestDuration(prev => prev + 1);
        
        // Simulation des données de test
        const controlVisitors = Math.floor(Math.random() * 100) + testDuration * 50;
        const variantVisitors = Math.floor(Math.random() * 100) + testDuration * 52;
        const controlConversions = Math.floor(controlVisitors * (testConfig.currentConversionRate + Math.random() * 0.5) / 100);
        const variantConversions = Math.floor(variantVisitors * (testConfig.currentConversionRate * 1.2 + Math.random() * 0.5) / 100);

        const significance = StatisticalEngine.calculateSignificance(
          controlConversions,
          controlVisitors,
          variantConversions,
          variantVisitors
        );

        const controlRate = (controlConversions / controlVisitors) * 100;
        const variantRate = (variantConversions / variantVisitors) * 100;
        const improvement = ((variantRate - controlRate) / controlRate) * 100;

        setTestResults({
          isComplete: significance.isSignificant && testDuration >= 7,
          winner: variantRate > controlRate ? 'variant1' : 'control',
          confidence: (1 - significance.pValue) * 100,
          improvement: improvement,
          pValue: significance.pValue,
          variants: {
            control: {
              visitors: controlVisitors,
              conversions: controlConversions,
              conversionRate: controlRate,
              confidenceInterval: [controlRate - 0.5, controlRate + 0.5]
            },
            variant1: {
              visitors: variantVisitors,
              conversions: variantConversions,
              conversionRate: variantRate,
              confidenceInterval: significance.confidenceInterval
            }
          },
          statisticalSignificance: significance.isSignificant,
          recommendations: generateRecommendations(significance, improvement, testDuration),
          riskAssessment: generateRiskAssessment(significance, improvement)
        });

        if (significance.isSignificant && testDuration >= 7) {
          setTestStatus('completed');
        }
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [testStatus, testDuration, testConfig]);

  const generateRecommendations = (significance: any, improvement: number, duration: number) => {
    const recommendations = [];
    
    if (significance.isSignificant) {
      recommendations.push('✅ Les résultats sont statistiquement significatifs');
      if (improvement > 10) {
        recommendations.push('🚀 Implémentez immédiatement la variante gagnante');
        recommendations.push('📊 Documentez cette amélioration pour référence future');
      }
    } else {
      recommendations.push('⏳ Continuez le test pour obtenir plus de données');
      if (duration < 7) {
        recommendations.push('📅 Attendez au moins 7 jours pour couvrir un cycle complet');
      }
    }
    
    recommendations.push('🔄 Planifiez un test de suivi pour confirmer les résultats');
    recommendations.push('📈 Analysez les segments d\'audience pour des insights plus profonds');
    
    return recommendations;
  };

  const generateRiskAssessment = (significance: any, improvement: number) => {
    if (significance.isSignificant) {
      if (improvement > 20) {
        return 'Risque faible - Les résultats montrent une amélioration substantielle avec une forte significativité statistique.';
      } else if (improvement > 10) {
        return 'Risque modéré - Amélioration significative mais surveillez les performances post-implémentation.';
      } else {
        return 'Risque modéré à élevé - Amélioration marginale, considérez des tests additionnels.';
      }
    } else {
      return 'Risque élevé - Résultats non concluants, ne pas implémenter sans données supplémentaires.';
    }
  };

  const startTest = () => {
    setTestStatus('running');
    setTestDuration(0);
    setActiveTab('results');
  };

  const pauseTest = () => {
    setTestStatus('paused');
  };

  const resetTest = () => {
    setTestStatus('idle');
    setTestDuration(0);
    setTestResults({
      isComplete: false,
      winner: null,
      confidence: 0,
      improvement: 0,
      pValue: 1,
      variants: {
        control: { visitors: 0, conversions: 0, conversionRate: 0, confidenceInterval: [0, 0] },
        variant1: { visitors: 0, conversions: 0, conversionRate: 0, confidenceInterval: [0, 0] }
      },
      statisticalSignificance: false,
      recommendations: [],
      riskAssessment: ''
    });
  };

  const exportResults = () => {
    const data = {
      testConfig,
      results: testResults,
      duration: testDuration,
      sampleSize: sampleSizeCalculation
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cro-test-results-${Date.now()}.json`;
    a.click();
  };

  const addVariant = () => {
    const newVariant = {
      id: `variant${variants.length}`,
      name: `Variante ${variants.length}`,
      description: 'Nouvelle variante',
      content: {},
      isControl: false
    };
    setVariants([...variants, newVariant]);
  };

  const editVariant = (variantId: string) => {
    console.log('Edit variant:', variantId);
  };

  const deleteVariant = (variantId: string) => {
    setVariants(variants.filter(v => v.id !== variantId));
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center mx-auto mb-4">
          <TestTube className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">CRO Element Tester</h2>
        <p className="text-slate-600">Framework complet de test A/B pour optimisation des conversions</p>
      </div>

      {/* Contrôles du test */}
      <div className="flex justify-center space-x-4 mb-6">
        <Button
          onClick={startTest}
          disabled={testStatus === 'running'}
          className="flex items-center space-x-2"
        >
          <Play className="w-4 h-4" />
          <span>{testStatus === 'idle' ? 'Démarrer le test' : 'Reprendre'}</span>
        </Button>
        
        {testStatus === 'running' && (
          <Button onClick={pauseTest} variant="outline" className="flex items-center space-x-2">
            <Pause className="w-4 h-4" />
            <span>Pause</span>
          </Button>
        )}
        
        <Button onClick={resetTest} variant="outline" className="flex items-center space-x-2">
          <RotateCcw className="w-4 h-4" />
          <span>Reset</span>
        </Button>
        
        {testResults.isComplete && (
          <Button onClick={exportResults} variant="outline" className="flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Exporter</span>
          </Button>
        )}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="config">Configuration</TabsTrigger>
          <TabsTrigger value="variants">Variants</TabsTrigger>
          <TabsTrigger value="results">Résultats</TabsTrigger>
        </TabsList>

        <TabsContent value="config" className="mt-6">
          <TestConfiguration
            config={testConfig}
            onConfigChange={setTestConfig}
            sampleSizeCalculation={sampleSizeCalculation}
          />
        </TabsContent>

        <TabsContent value="variants" className="mt-6">
          <ElementVariants
            elementType={testConfig.element}
            variants={variants}
            onVariantAdd={addVariant}
            onVariantEdit={editVariant}
            onVariantDelete={deleteVariant}
          />
        </TabsContent>

        <TabsContent value="results" className="mt-6">
          <TestResults
            results={testResults}
            testDuration={testDuration}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};
