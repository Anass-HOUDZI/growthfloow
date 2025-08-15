
import React from 'react';
import { Play } from 'lucide-react';
import * as Tools from './toolImports';

interface ToolRendererProps {
  toolId: string;
}

export const ToolRenderer: React.FC<ToolRendererProps> = ({ toolId }) => {
  const renderToolComponent = () => {
    switch (toolId) {
      // Growth Marketing Tools
      case 'growth-metrics':
      case 'growth-metrics-calculator':
        return <Tools.GrowthMetricsCalculator />;
      case 'growth-funnel':
      case 'growth-funnel-analyzer':
        return <Tools.GrowthFunnelAnalyzer />;
      case 'experiment-designer':
      case 'growth-experiment-designer':
        return <Tools.GrowthExperimentDesigner />;
      case 'channel-optimizer':
      case 'channel-performance-optimizer':
        return <Tools.ChannelPerformanceOptimizer />;
      case 'gtm-builder':
      case 'gtm-strategy-builder':
        return <Tools.GTMStrategyBuilder />;
      case 'conversion-predictor':
      case 'conversion-rate-predictor':
        return <Tools.ConversionRatePredictor />;
      
      // SEO & Content Tools
      case 'seo-optimizer':
      case 'seo-content-optimizer':
        return <Tools.SEOContentOptimizer />;
      case 'keyword-finder':
      case 'keyword-opportunity-finder':
        return <Tools.KeywordOpportunityFinder />;
      case 'content-gap':
      case 'content-gap-analyzer':
        return <Tools.ContentGapAnalyzer />;
      case 'serp-tracker':
      case 'serp-feature-tracker':
        return <Tools.SERPFeatureTracker />;
      
      // Landing Pages Tools  
      case 'landing-converter':
      case 'landing-page-converter':
        return <Tools.LandingPageConverter />;
      case 'heatmap-simulator':
        return <Tools.HeatmapSimulator />;
      case 'cro-tester':
      case 'cro-element-tester':
        return <Tools.CROElementTester />;
      case 'speed-optimizer':
      case 'page-speed-optimizer':
        return <Tools.PageSpeedOptimizer />;
      case 'mobile-ux-analyzer':
        return <Tools.MobileUXAnalyzer />;
      case 'form-optimizer':
        return <Tools.FormOptimizer />;
      case 'trust-signal-analyzer':
        return <Tools.TrustSignalAnalyzer />;
      case 'cta-optimizer':
        return <Tools.CTAOptimizer />;
      
      // Outbound & ABM Tools
      case 'prospect-intent-detector':
        return <Tools.ProspectIntentDetector />;
      case 'outbound-sequence-generator':
        return <Tools.OutboundSequenceGenerator />;
      case 'abm-account-scorer':
        return <Tools.ABMAccountScorer />;
      case 'cold-email-optimizer':
        return <Tools.ColdEmailOptimizer />;
      case 'sales-intelligence-hub':
        return <Tools.SalesIntelligenceHub />;
      case 'linkedin-automator':
        return <Tools.LinkedInAutomator />;
      case 'sales-call-analyzer':
        return <Tools.SalesCallAnalyzer />;
      case 'crm-integration-hub':
        return <Tools.CRMIntegrationHub />;
      
      // Paid Marketing Tools
      case 'ad-performance-optimizer':
        return <Tools.AdPerformanceOptimizer />;
      case 'bid-strategy-calculator':
        return <Tools.BidStrategyCalculator />;
      case 'ad-creative-analyzer':
        return <Tools.AdCreativeAnalyzer />;
      case 'audience-overlap-detector':
        return <Tools.AudienceOverlapDetector />;
      case 'facebook-ads-optimizer':
        return <Tools.FacebookAdsOptimizer />;
      case 'google-ads-performance-hub':
        return <Tools.GoogleAdsPerformanceHub />;
      
      // CMO & Leadership Tools
      case 'cmo-dashboard-builder':
        return <Tools.CMODashboardBuilder />;
      case 'marketing-roi-tracker':
        return <Tools.MarketingROITracker />;
      case 'budget-planner':
      case 'budget-planning-assistant':
        return <Tools.BudgetPlanningAssistant />;
      case 'maturity-assessor':
      case 'marketing-maturity-assessor':
        return <Tools.MarketingMaturityAssessor />;
      
      // Legacy tools (fallback)
      case 'growth-metrics-legacy':
        return <Tools.LegacyGrowthMetrics />;
      case 'seo-optimizer-legacy':
        return <Tools.LegacySEOOptimizer />;
      
      default:
        return (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ background: 'var(--gradient-primary)' }}>
              <Play className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Outil en développement</h3>
            <p className="text-slate-600">Cet outil sera disponible dans la prochaine mise à jour.</p>
            <p className="text-sm text-slate-500 mt-2">ID: {toolId}</p>
          </div>
        );
    }
  };

  return <>{renderToolComponent()}</>;
};
