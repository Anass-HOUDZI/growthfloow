
export class GrowthMetrics {
  static calculateCAC(totalCost: number, newCustomers: number): number {
    if (newCustomers === 0) return 0;
    return totalCost / newCustomers;
  }

  static calculateLTV(averageOrderValue: number, purchaseFrequency: number, customerLifespan: number): number {
    return averageOrderValue * purchaseFrequency * customerLifespan;
  }

  static calculatePaybackPeriod(cac: number, monthlyRecurringRevenue: number): number {
    if (monthlyRecurringRevenue === 0) return Infinity;
    return cac / monthlyRecurringRevenue;
  }

  static calculateChurnRate(customersAtStart: number, customersLost: number): number {
    if (customersAtStart === 0) return 0;
    return (customersLost / customersAtStart) * 100;
  }

  static calculateRetentionRate(customersAtStart: number, customersLost: number): number {
    return 100 - this.calculateChurnRate(customersAtStart, customersLost);
  }

  static calculateConversionRate(visitors: number, conversions: number): number {
    if (visitors === 0) return 0;
    return (conversions / visitors) * 100;
  }

  static calculateROAS(revenue: number, adSpend: number): number {
    if (adSpend === 0) return 0;
    return revenue / adSpend;
  }

  static calculateROI(gain: number, cost: number): number {
    if (cost === 0) return 0;
    return ((gain - cost) / cost) * 100;
  }
}

export class StatisticalAnalysis {
  static calculateConfidenceInterval(
    conversions: number, 
    visitors: number, 
    confidenceLevel: number = 0.95
  ): { lower: number; upper: number; margin: number } {
    const conversionRate = conversions / visitors;
    const z = this.getZScore(confidenceLevel);
    const standardError = Math.sqrt((conversionRate * (1 - conversionRate)) / visitors);
    const margin = z * standardError;

    return {
      lower: Math.max(0, conversionRate - margin),
      upper: Math.min(1, conversionRate + margin),
      margin: margin
    };
  }

  static calculateSampleSize(
    baselineRate: number,
    minimumDetectableEffect: number,
    alpha: number = 0.05,
    power: number = 0.8
  ): number {
    const z_alpha = this.getZScore(1 - alpha / 2);
    const z_beta = this.getZScore(power);
    
    const p1 = baselineRate;
    const p2 = baselineRate * (1 + minimumDetectableEffect);
    const p_pooled = (p1 + p2) / 2;
    
    const numerator = Math.pow(z_alpha + z_beta, 2) * 2 * p_pooled * (1 - p_pooled);
    const denominator = Math.pow(p2 - p1, 2);
    
    return Math.ceil(numerator / denominator);
  }

  static calculateSignificance(
    controlConversions: number,
    controlVisitors: number,
    treatmentConversions: number,
    treatmentVisitors: number
  ): { pValue: number; isSignificant: boolean; zScore: number } {
    const p1 = controlConversions / controlVisitors;
    const p2 = treatmentConversions / treatmentVisitors;
    const p_pooled = (controlConversions + treatmentConversions) / (controlVisitors + treatmentVisitors);
    
    const standardError = Math.sqrt(p_pooled * (1 - p_pooled) * (1/controlVisitors + 1/treatmentVisitors));
    const zScore = (p2 - p1) / standardError;
    const pValue = 2 * (1 - this.normalCDF(Math.abs(zScore)));
    
    return {
      pValue,
      isSignificant: pValue < 0.05,
      zScore
    };
  }

  private static getZScore(probability: number): number {
    // Approximation of inverse normal CDF
    if (probability === 0.95) return 1.96;
    if (probability === 0.90) return 1.645;
    if (probability === 0.99) return 2.576;
    if (probability === 0.80) return 0.842;
    
    // More precise calculation would use inverse normal CDF
    return 1.96; // Default to 95% confidence
  }

  private static normalCDF(x: number): number {
    // Approximation of standard normal CDF
    return 0.5 * (1 + this.erf(x / Math.sqrt(2)));
  }

  private static erf(x: number): number {
    // Approximation of error function
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
}
