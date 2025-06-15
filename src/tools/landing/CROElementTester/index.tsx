
import React, { useState } from 'react';
import { TestTube, Play, BarChart3, CheckCircle, TrendingUp } from 'lucide-react';

export const CROElementTester: React.FC = () => {
  const [selectedElement, setSelectedElement] = useState('cta');
  const [testConfig, setTestConfig] = useState({
    trafficSplit: 50,
    duration: 14,
    significance: 95
  });
  const [testResults, setTestResults] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  const elements = {
    cta: {
      name: 'Call-to-Action',
      variations: [
        { id: 'control', name: 'Contrôle', description: 'Achetez maintenant', color: 'blue' },
        { id: 'variant1', name: 'Variante 1', description: 'Commandez aujourd\'hui', color: 'green' },
        { id: 'variant2', name: 'Variante 2', description: 'Obtenez le vôtre', color: 'purple' }
      ]
    },
    headline: {
      name: 'Titre Principal',
      variations: [
        { id: 'control', name: 'Contrôle', description: 'Solution innovante pour votre business' },
        { id: 'variant1', name: 'Variante 1', description: 'Révolutionnez votre business en 30 jours' },
        { id: 'variant2', name: 'Variante 2', description: 'La solution que vos concurrents redoutent' }
      ]
    },
    form: {
      name: 'Formulaire',
      variations: [
        { id: 'control', name: 'Contrôle', description: '5 champs (nom, email, téléphone, entreprise, message)' },
        { id: 'variant1', name: 'Variante 1', description: '3 champs (nom, email, entreprise)' },
        { id: 'variant2', name: 'Variante 2', description: '2 champs (email, entreprise)' }
      ]
    }
  };

  const runTest = () => {
    setIsRunning(true);
    
    // Simulate test results
    setTimeout(() => {
      setTestResults({
        winner: 'variant1',
        confidence: 96.5,
        improvement: 23.4,
        visitors: {
          control: 1245,
          variant1: 1267,
          variant2: 1233
        },
        conversions: {
          control: 87,
          variant1: 112,
          variant2: 94
        },
        conversionRates: {
          control: 6.99,
          variant1: 8.84,
          variant2: 7.62
        }
      });
      setIsRunning(false);
    }, 3000);
  };

  const getVariationColor = (variationId: string) => {
    if (testResults?.winner === variationId) return 'bg-green-100 border-green-500';
    return 'bg-white border-slate-200';
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center mx-auto mb-4">
          <TestTube className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">CRO Element Tester</h2>
        <p className="text-slate-600">Framework de test A/B pour éléments de conversion</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Configuration du test */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Configuration du Test</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Élément à tester
              </label>
              <select
                value={selectedElement}
                onChange={(e) => setSelectedElement(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {Object.entries(elements).map(([key, element]) => (
                  <option key={key} value={key}>{element.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Répartition du trafic: {testConfig.trafficSplit}% / {100 - testConfig.trafficSplit}%
              </label>
              <input
                type="range"
                min="20"
                max="80"
                value={testConfig.trafficSplit}
                onChange={(e) => setTestConfig({...testConfig, trafficSplit: parseInt(e.target.value)})}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Durée estimée (jours)
              </label>
              <input
                type="number"
                min="7"
                max="60"
                value={testConfig.duration}
                onChange={(e) => setTestConfig({...testConfig, duration: parseInt(e.target.value)})}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Niveau de confiance
              </label>
              <select
                value={testConfig.significance}
                onChange={(e) => setTestConfig({...testConfig, significance: parseInt(e.target.value)})}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="90">90%</option>
                <option value="95">95%</option>
                <option value="99">99%</option>
              </select>
            </div>

            <button
              onClick={runTest}
              disabled={isRunning}
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg hover:from-blue-600 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isRunning ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Test en cours...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  <span>Lancer le Test</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Variations */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">
            Variations - {elements[selectedElement].name}
          </h3>
          
          <div className="space-y-3">
            {elements[selectedElement].variations.map((variation) => (
              <div 
                key={variation.id} 
                className={`p-4 rounded-lg border-2 transition-colors ${getVariationColor(variation.id)}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-slate-800">{variation.name}</h4>
                  {testResults?.winner === variation.id && (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  )}
                </div>
                <p className="text-sm text-slate-600">{variation.description}</p>
                {testResults && (
                  <div className="mt-3 flex justify-between text-sm">
                    <span>Visiteurs: {testResults.visitors[variation.id]}</span>
                    <span>Conversions: {testResults.conversions[variation.id]}</span>
                    <span className="font-medium">
                      Taux: {testResults.conversionRates[variation.id]}%
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Résultats */}
      {testResults && (
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
            <BarChart3 className="w-5 h-5 mr-2" />
            Résultats du Test
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">
                +{testResults.improvement}%
              </div>
              <p className="text-sm text-slate-600">Amélioration</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">
                {testResults.confidence}%
              </div>
              <p className="text-sm text-slate-600">Confiance</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-purple-600 mb-1">
                Variante 1
              </div>
              <p className="text-sm text-slate-600">Gagnante</p>
            </div>
          </div>

          <div className="bg-slate-50 rounded-lg p-4">
            <h4 className="font-medium text-slate-800 mb-2 flex items-center">
              <TrendingUp className="w-4 h-4 mr-2" />
              Recommandations
            </h4>
            <ul className="text-sm text-slate-600 space-y-1">
              <li>• Implémenter la Variante 1 pour une amélioration de +23.4%</li>
              <li>• Le niveau de confiance de 96.5% valide statistiquement les résultats</li>
              <li>• Prévoir un test de suivi pour confirmer les résultats sur le long terme</li>
              <li>• Considérer l'application de ce principe à d'autres éléments similaires</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
