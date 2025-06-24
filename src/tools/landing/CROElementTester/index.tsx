
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { TestTube, Play, Pause, RotateCcw, Download, BarChart3 } from 'lucide-react';
import { TestConfiguration } from './TestConfiguration';
import { ElementVariants } from './ElementVariants';
import { TestResults } from './TestResults';
import { TestVariantBuilder } from './TestVariantBuilder';
import { LiveTestRunner } from './LiveTestRunner';
import { StatisticalEngine } from './StatisticalEngine';
import { TestVariant, TestConfig, TestResults as TestResultsType } from './types';

export const CROElementTester: React.FC = () => {
  const [activeTab, setActiveTab] = useState('config');
  const [testStatus, setTestStatus] = useState<'idle' | 'running' | 'paused' | 'completed'>('idle');
  const [testConfig, setTestConfig] = useState<TestConfig>({
    element: 'cta',
    trafficSplit: 50,
    duration: 14,
    significance: 95,
    minimumDetectableEffect: 20,
    currentConversionRate: 3.2,
    dailyTraffic: 1000
  });

  const [variants, setVariants] = useState<TestVariant[]>([
    {
      id: 'control',
      name: 'Contrôle',
      description: 'Version actuelle',
      content: { text: 'Acheter maintenant', color: 'blue', size: 'medium' },
      isControl: true
    },
    {
      id: 'variant1',
      name: 'Variante 1',
      description: 'Version optimisée',
      content: { text: 'Commencer aujourd\'hui', color: 'green', size: 'medium' },
      isControl: false
    }
  ]);

  const [testResults, setTestResults] = useState<TestResultsType>({
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

  // Calculs statistiques en temps réel
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

  const handleResultsUpdate = (results: TestResultsType) => {
    setTestResults(results);
  };

  const resetTest = () => {
    setTestStatus('idle');
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
    setActiveTab('config');
  };

  const exportResults = () => {
    const data = {
      testConfig,
      variants,
      results: testResults,
      sampleSize: sampleSizeCalculation,
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cro-test-results-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const canStartTest = variants.length >= 2 && testConfig.element && testConfig.dailyTraffic > 0;

  return (
    <div className="space-y-6 pb-16">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center mx-auto mb-4">
          <TestTube className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">CRO Element Tester</h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Framework complet de test A/B pour optimisation des conversions avec analyse statistique en temps réel
        </p>
      </div>

      {/* Contrôles du test */}
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        <Button
          onClick={() => setActiveTab('live')}
          disabled={!canStartTest}
          className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
        >
          <Play className="w-4 h-4" />
          <span>Lancer le test</span>
        </Button>
        
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

        <Button 
          onClick={() => setActiveTab('results')} 
          variant="outline" 
          className="flex items-center space-x-2"
          disabled={testStatus === 'idle'}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Voir résultats</span>
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-5 w-full max-w-2xl mx-auto">
          <TabsTrigger value="config">Configuration</TabsTrigger>
          <TabsTrigger value="variants">Variantes</TabsTrigger>
          <TabsTrigger value="elements">Éléments</TabsTrigger>
          <TabsTrigger value="live" disabled={!canStartTest}>Test Live</TabsTrigger>
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
          <TestVariantBuilder
            elementType={testConfig.element}
            variants={variants}
            onVariantsChange={setVariants}
          />
        </TabsContent>

        <TabsContent value="elements" className="mt-6">
          <ElementVariants
            elementType={testConfig.element}
            variants={variants}
            onVariantAdd={() => {}}
            onVariantEdit={() => {}}
            onVariantDelete={() => {}}
          />
        </TabsContent>

        <TabsContent value="live" className="mt-6">
          {canStartTest ? (
            <LiveTestRunner
              variants={variants}
              testConfig={testConfig}
              onResultsUpdate={handleResultsUpdate}
            />
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-500">Configurez votre test avant de le lancer</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="results" className="mt-6">
          <TestResults
            results={testResults}
            testDuration={0}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};
