
import React, { useState } from 'react';
import { Target, Play, BarChart3, Palette, Type, MousePointer } from 'lucide-react';

export const CTAOptimizer: React.FC = () => {
  const [selectedTest, setSelectedTest] = useState('color');
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState(null);

  const testTypes = {
    color: {
      name: 'Test de Couleurs',
      description: 'Comparer différentes couleurs de bouton CTA',
      variations: [
        { name: 'Bleu', color: 'bg-blue-600', rate: 3.2 },
        { name: 'Vert', color: 'bg-green-600', rate: 4.1 },
        { name: 'Orange', color: 'bg-orange-600', rate: 4.8 },
        { name: 'Rouge', color: 'bg-red-600', rate: 3.9 }
      ]
    },
    text: {
      name: 'Test de Texte',
      description: 'Optimiser le wording du bouton',
      variations: [
        { name: 'Acheter maintenant', rate: 3.2 },
        { name: 'Obtenir le mien', rate: 4.5 },
        { name: 'Commencer gratuitement', rate: 5.1 },
        { name: 'Découvrir l\'offre', rate: 2.8 }
      ]
    },
    size: {
      name: 'Test de Taille',
      description: 'Optimiser la taille et forme du bouton',
      variations: [
        { name: 'Petit', size: 'px-4 py-2 text-sm', rate: 3.2 },
        { name: 'Moyen', size: 'px-6 py-3 text-base', rate: 4.1 },
        { name: 'Grand', size: 'px-8 py-4 text-lg', rate: 4.6 },
        { name: 'Très grand', size: 'px-10 py-5 text-xl', rate: 4.2 }
      ]
    },
    position: {
      name: 'Test de Position',
      description: 'Tester différents emplacements',
      variations: [
        { name: 'En haut', rate: 3.8 },
        { name: 'Au centre', rate: 4.2 },
        { name: 'En bas', rate: 3.9 },
        { name: 'Sticky', rate: 5.0 }
      ]
    }
  };

  const runTest = () => {
    setIsRunning(true);
    
    setTimeout(() => {
      const testData = testTypes[selectedTest];
      const winner = testData.variations.reduce((prev, current) => 
        (prev.rate > current.rate) ? prev : current
      );
      
      setResults({
        testType: selectedTest,
        winner: winner,
        improvement: ((winner.rate - 3.2) / 3.2 * 100).toFixed(1),
        confidence: 94.2,
        duration: '14 jours',
        visitors: 2847,
        variations: testData.variations
      });
      setIsRunning(false);
    }, 2000);
  };

  const bestPractices = [
    {
      category: 'Couleur',
      tips: [
        'Orange et rouge performent généralement mieux',
        'Contraste élevé avec l\'arrière-plan',
        'Éviter le bleu sur fond blanc'
      ]
    },
    {
      category: 'Texte',
      tips: [
        'Utiliser des verbes d\'action forts',
        'Créer un sentiment d\'urgence',
        'Personnaliser selon l\'audience'
      ]
    },
    {
      category: 'Design',
      tips: [
        'Boutons plus grands = plus de clics',
        'Ombres portées augmentent le relief',
        'Coins arrondis vs carrés selon le style'
      ]
    },
    {
      category: 'Position',
      tips: [
        'Above the fold ET en bas de page',
        'CTA sticky pour pages longues',
        'Répéter le CTA principal 2-3 fois'
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-4">
          <Target className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">CTA Optimizer</h2>
        <p className="text-slate-600">Optimisation boutons call-to-action avec A/B testing</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Configuration du test */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Configurateur de Test CTA</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Type de test
              </label>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(testTypes).map(([key, test]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedTest(key)}
                    className={`p-3 text-left rounded-lg border transition-colors ${
                      selectedTest === key 
                        ? 'border-red-500 bg-red-50 text-red-700' 
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="font-medium text-sm">{test.name}</div>
                    <div className="text-xs text-slate-500 mt-1">{test.description}</div>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={runTest}
              disabled={isRunning}
              className="w-full py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-lg hover:from-red-600 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isRunning ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Test en cours...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  <span>Lancer le Test A/B</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Aperçu des variations */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">
            Aperçu - {testTypes[selectedTest].name}
          </h3>
          
          <div className="space-y-4">
            {selectedTest === 'color' && (
              <div className="space-y-3">
                {testTypes.color.variations.map((variation, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <button className={`${variation.color} text-white px-6 py-2 rounded-lg font-medium`}>
                      Commencer maintenant
                    </button>
                    <span className="text-sm text-slate-600">{variation.name}</span>
                  </div>
                ))}
              </div>
            )}

            {selectedTest === 'text' && (
              <div className="space-y-3">
                {testTypes.text.variations.map((variation, index) => (
                  <div key={index} className="text-center">
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium">
                      {variation.name}
                    </button>
                  </div>
                ))}
              </div>
            )}

            {selectedTest === 'size' && (
              <div className="space-y-3 text-center">
                {testTypes.size.variations.map((variation, index) => (
                  <div key={index}>
                    <button className={`bg-blue-600 text-white rounded-lg font-medium ${variation.size}`}>
                      Commencer maintenant
                    </button>
                  </div>
                ))}
              </div>
            )}

            {selectedTest === 'position' && (
              <div className="space-y-3">
                {testTypes.position.variations.map((variation, index) => (
                  <div key={index} className="p-3 bg-slate-50 rounded border-2 border-dashed border-slate-300 text-center">
                    <div className="text-sm text-slate-600 mb-2">Position: {variation.name}</div>
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium">
                      CTA Button
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Résultats */}
      {results && (
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
            <BarChart3 className="w-5 h-5 mr-2" />
            Résultats du Test A/B
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">
                +{results.improvement}%
              </div>
              <p className="text-sm text-slate-600">Amélioration</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">
                {results.confidence}%
              </div>
              <p className="text-sm text-slate-600">Confiance</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 text-center">
              <div className="text-lg font-bold text-purple-600 mb-1">
                {results.duration}
              </div>
              <p className="text-sm text-slate-600">Durée</p>
            </div>
            <div className="bg-orange-50 rounded-lg p-4 text-center">
              <div className="text-lg font-bold text-orange-600 mb-1">
                {results.visitors}
              </div>
              <p className="text-sm text-slate-600">Visiteurs</p>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium text-slate-800">Performance par variation:</h4>
            {results.variations.map((variation, index) => (
              <div key={index} className={`flex items-center justify-between p-3 rounded-lg ${
                variation === results.winner ? 'bg-green-50 border border-green-200' : 'bg-slate-50'
              }`}>
                <div className="flex items-center space-x-3">
                  {variation === results.winner && (
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  )}
                  <span className="font-medium">{variation.name}</span>
                  {variation === results.winner && (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                      Gagnant
                    </span>
                  )}
                </div>
                <div className="text-right">
                  <div className="font-medium">{variation.rate}%</div>
                  <div className="text-xs text-slate-500">Taux de conversion</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Best Practices */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
          <MousePointer className="w-5 h-5 mr-2" />
          Meilleures Pratiques CTA
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bestPractices.map((practice, index) => (
            <div key={index} className="space-y-3">
              <div className="flex items-center space-x-2">
                {practice.category === 'Couleur' && <Palette className="w-4 h-4 text-purple-500" />}
                {practice.category === 'Texte' && <Type className="w-4 h-4 text-blue-500" />}
                {practice.category === 'Design' && <MousePointer className="w-4 h-4 text-green-500" />}
                {practice.category === 'Position' && <Target className="w-4 h-4 text-red-500" />}
                <h4 className="font-medium text-slate-800">{practice.category}</h4>
              </div>
              <ul className="space-y-1 text-sm text-slate-600">
                {practice.tips.map((tip, tipIndex) => (
                  <li key={tipIndex}>• {tip}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Templates CTA */}
      <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">
          🎯 Templates CTA High-Converting
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 border border-red-100">
            <h4 className="font-medium text-slate-800 mb-2">Urgence</h4>
            <div className="space-y-2 text-sm">
              <div className="bg-red-600 text-white px-3 py-1.5 rounded text-center font-medium">
                Offre limitée - 48h seulement
              </div>
              <div className="bg-orange-600 text-white px-3 py-1.5 rounded text-center font-medium">
                Dernières heures - 50% OFF
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-green-100">
            <h4 className="font-medium text-slate-800 mb-2">Gratuit</h4>
            <div className="space-y-2 text-sm">
              <div className="bg-green-600 text-white px-3 py-1.5 rounded text-center font-medium">
                Commencer gratuitement
              </div>
              <div className="bg-blue-600 text-white px-3 py-1.5 rounded text-center font-medium">
                Essai gratuit 14 jours
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-purple-100">
            <h4 className="font-medium text-slate-800 mb-2">Bénéfice</h4>
            <div className="space-y-2 text-sm">
              <div className="bg-purple-600 text-white px-3 py-1.5 rounded text-center font-medium">
                Obtenir mes résultats
              </div>
              <div className="bg-indigo-600 text-white px-3 py-1.5 rounded text-center font-medium">
                Doubler mes ventes
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
