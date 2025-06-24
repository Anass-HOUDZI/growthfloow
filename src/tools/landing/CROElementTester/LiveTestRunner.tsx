import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, Square, BarChart3, Users, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { TestVariant, TestResults, VariantResult } from './types';

interface LiveTestRunnerProps {
  variants: TestVariant[];
  testConfig: any;
  onResultsUpdate: (results: TestResults) => void;
}

export const LiveTestRunner: React.FC<LiveTestRunnerProps> = ({
  variants,
  testConfig,
  onResultsUpdate
}) => {
  const [testStatus, setTestStatus] = useState<'idle' | 'running' | 'paused' | 'completed'>('idle');
  const [testDuration, setTestDuration] = useState(0);
  const [liveData, setLiveData] = useState<any>({});

  // Simulation de test en temps réel
  useEffect(() => {
    if (testStatus === 'running') {
      const interval = setInterval(() => {
        setTestDuration(prev => prev + 1);
        
        // Génération de données simulées
        const newData = generateLiveData(testDuration);
        setLiveData(newData);
        
        // Calcul de la significativité statistique
        const significance = calculateSignificance(newData);
        
        const results: TestResults = {
          isComplete: significance.isSignificant && testDuration >= 7,
          winner: newData.winner,
          confidence: significance.confidence,
          improvement: newData.improvement,
          pValue: significance.pValue,
          variants: {
            control: newData.control,
            variant1: newData.variant
          },
          statisticalSignificance: significance.isSignificant,
          recommendations: generateRecommendations(significance, newData.improvement, testDuration),
          riskAssessment: generateRiskAssessment(significance, newData.improvement)
        };
        
        onResultsUpdate(results);
        
        if (results.isComplete) {
          setTestStatus('completed');
        }
      }, 3000); // Update every 3 seconds for demo

      return () => clearInterval(interval);
    }
  }, [testStatus, testDuration]);

  const generateLiveData = (duration: number) => {
    const baseTraffic = testConfig.dailyTraffic / 24; // Trafic par heure
    const hoursElapsed = duration;
    
    const controlData: VariantResult = {
      visitors: Math.floor(baseTraffic * hoursElapsed * 0.5 + Math.random() * 50),
      conversions: 0,
      conversionRate: 0,
      confidenceInterval: [0, 0] as [number, number]
    };
    controlData.conversions = Math.floor(controlData.visitors * (testConfig.currentConversionRate / 100) * (0.9 + Math.random() * 0.2));
    controlData.conversionRate = (controlData.conversions / controlData.visitors) * 100;

    const variantData: VariantResult = {
      visitors: Math.floor(baseTraffic * hoursElapsed * 0.5 + Math.random() * 50),
      conversions: 0,
      conversionRate: 0,
      confidenceInterval: [0, 0] as [number, number]
    };
    
    // Simulation d'amélioration pour la variante
    const improvementFactor = 1 + (testConfig.minimumDetectableEffect / 100) * (0.8 + Math.random() * 0.4);
    variantData.conversions = Math.floor(variantData.visitors * (testConfig.currentConversionRate / 100) * improvementFactor);
    variantData.conversionRate = (variantData.conversions / variantData.visitors) * 100;

    const improvement = ((variantData.conversionRate - controlData.conversionRate) / controlData.conversionRate) * 100;

    return {
      control: controlData,
      variant: variantData,
      improvement,
      winner: variantData.conversionRate > controlData.conversionRate ? 'variant' : 'control'
    };
  };

  const calculateSignificance = (data: any) => {
    // Simulation du calcul de significativité
    const { control, variant } = data;
    const totalVisitors = control.visitors + variant.visitors;
    const confidenceThreshold = testConfig.significance / 100;
    
    // Mock calculation - in real app would use proper statistical tests
    const zScore = Math.abs(variant.conversionRate - control.conversionRate) / 
                   Math.sqrt((control.conversionRate * (100 - control.conversionRate)) / totalVisitors);
    
    const pValue = Math.max(0.001, 0.1 - (zScore * 0.02)); // Simplified p-value calculation
    const confidence = (1 - pValue) * 100;
    const isSignificant = pValue < (1 - confidenceThreshold);

    return {
      isSignificant,
      confidence,
      pValue,
      zScore
    };
  };

  const generateRecommendations = (significance: any, improvement: number, duration: number) => {
    const recommendations = [];
    
    if (significance.isSignificant) {
      recommendations.push('✅ Résultats statistiquement significatifs');
      if (improvement > 15) {
        recommendations.push('🚀 Implémentation immédiate recommandée');
      } else if (improvement > 5) {
        recommendations.push('📈 Amélioration modérée - Validation recommandée');
      }
    } else {
      recommendations.push('⏳ Continuez le test - Plus de données nécessaires');
      if (duration < 7) {
        recommendations.push('📅 Minimum 7 jours recommandé');
      }
    }
    
    if (duration > 14) {
      recommendations.push('⚠️ Test long - Risque d\'effet de nouveauté diminué');
    }
    
    return recommendations;
  };

  const generateRiskAssessment = (significance: any, improvement: number) => {
    if (significance.isSignificant) {
      if (improvement > 20) {
        return 'Risque faible - Forte amélioration avec significativité élevée';
      } else if (improvement > 10) {
        return 'Risque modéré - Amélioration significative, surveillance post-implémentation recommandée';
      } else {
        return 'Risque modéré à élevé - Amélioration marginale';
      }
    }
    return 'Risque élevé - Résultats non concluants';
  };

  const startTest = () => {
    setTestStatus('running');
    setTestDuration(0);
  };

  const pauseTest = () => {
    setTestStatus('paused');
  };

  const stopTest = () => {
    setTestStatus('completed');
  };

  const progress = Math.min((testDuration / (testConfig.duration * 24)) * 100, 100);

  return (
    <div className="space-y-6">
      {/* Contrôles du test */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Contrôle du Test</span>
            <Badge 
              className={
                testStatus === 'running' ? 'bg-green-100 text-green-800' :
                testStatus === 'completed' ? 'bg-blue-100 text-blue-800' :
                testStatus === 'paused' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'
              }
            >
              {testStatus === 'running' ? 'En cours' :
               testStatus === 'completed' ? 'Terminé' :
               testStatus === 'paused' ? 'En pause' : 'Arrêté'}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex space-x-2">
                {testStatus === 'idle' || testStatus === 'paused' ? (
                  <Button onClick={startTest} className="flex items-center space-x-2">
                    <Play className="w-4 h-4" />
                    <span>{testStatus === 'idle' ? 'Démarrer' : 'Reprendre'}</span>
                  </Button>
                ) : null}
                
                {testStatus === 'running' && (
                  <Button onClick={pauseTest} variant="outline" className="flex items-center space-x-2">
                    <Pause className="w-4 h-4" />
                    <span>Pause</span>
                  </Button>
                )}
                
                {testStatus !== 'idle' && (
                  <Button onClick={stopTest} variant="outline" className="flex items-center space-x-2">
                    <Square className="w-4 h-4" />
                    <span>Arrêter</span>
                  </Button>
                )}
              </div>
              
              <div className="text-sm text-slate-600">
                Durée: {Math.floor(testDuration / 24)}j {testDuration % 24}h
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progression du test</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="w-full" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Résultats en temps réel */}
      {testStatus !== 'idle' && liveData.control && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Variante Contrôle */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span>Contrôle</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-slate-800">{liveData.control.visitors}</div>
                    <div className="text-sm text-slate-600">Visiteurs</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-slate-800">{liveData.control.conversions}</div>
                    <div className="text-sm text-slate-600">Conversions</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">
                      {liveData.control.conversionRate.toFixed(2)}%
                    </div>
                    <div className="text-sm text-slate-600">Taux de conversion</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Variante Test */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>Variante</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-slate-800">{liveData.variant.visitors}</div>
                    <div className="text-sm text-slate-600">Visiteurs</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-slate-800">{liveData.variant.conversions}</div>
                    <div className="text-sm text-slate-600">Conversions</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">
                      {liveData.variant.conversionRate.toFixed(2)}%
                    </div>
                    <div className="text-sm text-slate-600">Taux de conversion</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Métriques de performance */}
      {testStatus !== 'idle' && liveData.improvement !== undefined && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5" />
              <span>Performance en Temps Réel</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className={`text-3xl font-bold ${
                  liveData.improvement > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {liveData.improvement > 0 ? '+' : ''}{liveData.improvement.toFixed(1)}%
                </div>
                <div className="text-sm text-slate-600">Amélioration</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">
                  {testDuration >= 7 ? '95' : Math.floor(60 + (testDuration / 7) * 35)}%
                </div>
                <div className="text-sm text-slate-600">Confiance</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-800">
                  {Math.max(0, testConfig.duration - Math.floor(testDuration / 24))}
                </div>
                <div className="text-sm text-slate-600">Jours restants</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
