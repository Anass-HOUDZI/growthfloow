
// Moteur de calculs statistiques pour les tests A/B
export class StatisticalEngine {
  // Calcul de la taille d'échantillon nécessaire
  static calculateSampleSize(
    alpha: number = 0.05, // Niveau de signification (5% par défaut)
    power: number = 0.8,  // Puissance statistique (80% par défaut)
    baselineRate: number, // Taux de conversion de base
    minimumDetectableEffect: number // Effet minimum détectable en pourcentage
  ): number {
    const effectSize = minimumDetectableEffect / 100;
    const p1 = baselineRate / 100;
    const p2 = p1 * (1 + effectSize);
    
    // Formule pour test bilatéral avec proportions
    const z_alpha = this.getZValue(alpha / 2);
    const z_beta = this.getZValue(1 - power);
    
    const pooledP = (p1 + p2) / 2;
    const sampleSize = Math.ceil(
      (Math.pow(z_alpha + z_beta, 2) * 2 * pooledP * (1 - pooledP)) /
      Math.pow(p2 - p1, 2)
    );
    
    return sampleSize;
  }

  // Calcul du test de significativité (test Z pour proportions)
  static calculateSignificance(
    controlConversions: number,
    controlVisitors: number,
    variantConversions: number,
    variantVisitors: number
  ): {
    pValue: number;
    zScore: number;
    isSignificant: boolean;
    confidenceInterval: [number, number];
  } {
    const p1 = controlConversions / controlVisitors;
    const p2 = variantConversions / variantVisitors;
    
    // Test Z pour différence de proportions
    const pooledP = (controlConversions + variantConversions) / (controlVisitors + variantVisitors);
    const standardError = Math.sqrt(pooledP * (1 - pooledP) * (1/controlVisitors + 1/variantVisitors));
    
    const zScore = (p2 - p1) / standardError;
    const pValue = 2 * (1 - this.normalCDF(Math.abs(zScore)));
    
    // Intervalle de confiance à 95%
    const diffSE = Math.sqrt((p1 * (1 - p1) / controlVisitors) + (p2 * (1 - p2) / variantVisitors));
    const margin = 1.96 * diffSE;
    const confidenceInterval: [number, number] = [
      ((p2 - p1) - margin) * 100,
      ((p2 - p1) + margin) * 100
    ];
    
    return {
      pValue,
      zScore,
      isSignificant: pValue < 0.05,
      confidenceInterval
    };
  }

  // Calcul de la puissance statistique du test
  static calculatePower(
    alpha: number,
    sampleSize: number,
    baselineRate: number,
    effectSize: number
  ): number {
    const p1 = baselineRate / 100;
    const p2 = p1 * (1 + effectSize / 100);
    
    const pooledP = (p1 + p2) / 2;
    const standardError = Math.sqrt(pooledP * (1 - pooledP) * (2 / sampleSize));
    
    const z_alpha = this.getZValue(alpha / 2);
    const delta = Math.abs(p2 - p1);
    
    const z_beta = (delta / standardError) - z_alpha;
    const power = this.normalCDF(z_beta);
    
    return Math.max(0, Math.min(100, power * 100));
  }

  // Estimation de la durée du test
  static estimateTestDuration(
    requiredSample: number,
    dailyTraffic: number,
    trafficSplit: number = 50
  ): number {
    const dailySamplePerVariant = (dailyTraffic * trafficSplit / 100) / 2;
    return Math.ceil(requiredSample / dailySamplePerVariant);
  }

  // Détection d'arrêt précoce
  static shouldStopEarly(
    currentPValue: number,
    currentSampleSize: number,
    minimumSampleSize: number,
    alpha: number = 0.05
  ): {
    shouldStop: boolean;
    reason: string;
  } {
    // Règle d'arrêt précoce avec correction pour tests multiples
    const adjustedAlpha = alpha * Math.sqrt(minimumSampleSize / currentSampleSize);
    
    if (currentSampleSize < minimumSampleSize * 0.5) {
      return {
        shouldStop: false,
        reason: 'Échantillon trop petit pour arrêt précoce'
      };
    }
    
    if (currentPValue < adjustedAlpha) {
      return {
        shouldStop: true,
        reason: 'Significativité atteinte avec ajustement pour tests multiples'
      };
    }
    
    return {
      shouldStop: false,
      reason: 'Continuer le test'
    };
  }

  // Fonction de répartition cumulative normale
  private static normalCDF(x: number): number {
    return 0.5 * (1 + this.erf(x / Math.sqrt(2)));
  }

  // Fonction d'erreur
  private static erf(x: number): number {
    const a1 =  0.254829592;
    const a2 = -0.284496736;
    const a3 =  1.421413741;
    const a4 = -1.453152027;
    const a5 =  1.061405429;
    const p  =  0.3275911;

    const sign = x >= 0 ? 1 : -1;
    x = Math.abs(x);

    const t = 1.0 / (1.0 + p * x);
    const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);

    return sign * y;
  }

  // Valeurs Z critiques
  private static getZValue(probability: number): number {
    const z_values: { [key: string]: number } = {
      '0.025': 1.96,
      '0.05': 1.645,
      '0.01': 2.326,
      '0.005': 2.576,
      '0.001': 3.090
    };
    
    const key = probability.toString();
    return z_values[key] || 1.96;
  }

  // Analyse de régression pour détecter les tendances
  static detectTrend(
    data: Array<{ day: number; rate: number }>
  ): {
    slope: number;
    trend: 'increasing' | 'decreasing' | 'stable';
    confidence: number;
  } {
    const n = data.length;
    const sumX = data.reduce((sum, point) => sum + point.day, 0);
    const sumY = data.reduce((sum, point) => sum + point.rate, 0);
    const sumXY = data.reduce((sum, point) => sum + point.day * point.rate, 0);
    const sumX2 = data.reduce((sum, point) => sum + point.day * point.day, 0);
    
    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    
    let trend: 'increasing' | 'decreasing' | 'stable' = 'stable';
    if (Math.abs(slope) > 0.01) {
      trend = slope > 0 ? 'increasing' : 'decreasing';
    }
    
    // Calcul du coefficient de détermination R²
    const meanY = sumY / n;
    const totalSumSquares = data.reduce((sum, point) => sum + Math.pow(point.rate - meanY, 2), 0);
    const predictedValues = data.map(point => (sumY - slope * sumX) / n + slope * point.day);
    const residualSumSquares = data.reduce((sum, point, i) => 
      sum + Math.pow(point.rate - predictedValues[i], 2), 0
    );
    
    const rSquared = 1 - (residualSumSquares / totalSumSquares);
    const confidence = Math.max(0, Math.min(100, rSquared * 100));
    
    return { slope, trend, confidence };
  }
}
