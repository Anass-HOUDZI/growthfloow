import React from 'react';
import { X, Star, Play } from 'lucide-react';

// Growth Tools
import { GrowthFunnelAnalyzer } from '../tools/growth/GrowthFunnelAnalyzer';
import { GrowthExperimentDesigner } from '../tools/growth/GrowthExperimentDesigner';
import { ChannelPerformanceOptimizer } from '../tools/growth/ChannelPerformanceOptimizer';
import { GTMStrategyBuilder } from '../tools/growth/GTMStrategyBuilder';
import { ConversionRatePredictor } from '../tools/growth/ConversionRatePredictor';
import { GrowthMetricsCalculator } from '../tools/growth/GrowthMetricsCalculator';

// SEO Tools
import { SEOContentOptimizer } from '../tools/seo/SEOContentOptimizer';
import { KeywordOpportunityFinder } from '../tools/seo/KeywordOpportunityFinder';
import { ContentGapAnalyzer } from '../tools/seo/ContentGapAnalyzer';
import { SERPFeatureTracker } from '../tools/seo/SERPFeatureTracker';

// Landing Page Tools
import { LandingPageConverter } from '../tools/landing/LandingPageConverter';
import { HeatmapSimulator } from '../tools/landing/HeatmapSimulator';
import { CROElementTester } from '../tools/landing/CROElementTester';
import { PageSpeedOptimizer } from '../tools/landing/PageSpeedOptimizer';
import { MobileUXAnalyzer } from '../tools/landing/MobileUXAnalyzer';
import { FormOptimizer } from '../tools/landing/FormOptimizer';
import { TrustSignalAnalyzer } from '../tools/landing/TrustSignalAnalyzer';
import { CTAOptimizer } from '../tools/landing/CTAOptimizer';

// Outbound Tools
import { ProspectIntentDetector } from '../tools/outbound/ProspectIntentDetector';
import { OutboundSequenceGenerator } from '../tools/outbound/OutboundSequenceGenerator';
import { ABMAccountScorer } from '../tools/outbound/ABMAccountScorer';
import { ColdEmailOptimizer } from '../tools/outbound/ColdEmailOptimizer';
import { SalesIntelligenceHub } from '../tools/outbound/SalesIntelligenceHub';
import { LinkedInAutomator } from '../tools/outbound/LinkedInAutomator';
import { SalesCallAnalyzer } from '../tools/outbound/SalesCallAnalyzer';
import { CRMIntegrationHub } from '../tools/outbound/CRMIntegrationHub';

// Paid Marketing Tools
import { AdPerformanceOptimizer } from '../tools/paid/AdPerformanceOptimizer';
import { BidStrategyCalculator } from '../tools/paid/BidStrategyCalculator';
import { AdCreativeAnalyzer } from '../tools/paid/AdCreativeAnalyzer';
import { AudienceOverlapDetector } from '../tools/paid/AudienceOverlapDetector';
import { FacebookAdsOptimizer } from '../tools/paid/FacebookAdsOptimizer';
import { GoogleAdsPerformanceHub } from '../tools/paid/GoogleAdsPerformanceHub';

// Legacy tools
import { GrowthMetricsCalculator as LegacyGrowthMetrics } from './tools/GrowthMetricsCalculator';
import { SEOContentOptimizer as LegacySEOOptimizer } from './tools/SEOContentOptimizer';
import { LandingPageConverter as LegacyLandingConverter } from './tools/LandingPageConverter';

// CMO Tools
import { CMODashboardBuilder } from '../tools/cmo/CMODashboardBuilder';
import { MarketingROITracker } from '../tools/cmo/MarketingROITracker';
import { BudgetPlanningAssistant } from '../tools/cmo/BudgetPlanningAssistant';

interface ToolModalProps {
  tool: any;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export const ToolModal: React.FC<ToolModalProps> = ({
  tool,
  onClose,
  isFavorite,
  onToggleFavorite
}) => {
  const renderToolComponent = () => {
    switch (tool.id) {
      // Growth Marketing Tools
      case 'growth-funnel':
        return <GrowthFunnelAnalyzer />;
      case 'experiment-designer':
        return <GrowthExperimentDesigner />;
      case 'channel-optimizer':
        return <ChannelPerformanceOptimizer />;
      case 'gtm-builder':
        return <GTMStrategyBuilder />;
      case 'conversion-predictor':
        return <ConversionRatePredictor />;
      case 'growth-metrics':
        return <GrowthMetricsCalculator />;
      
      // SEO & Content Tools
      case 'seo-optimizer':
        return <SEOContentOptimizer />;
      case 'keyword-finder':
        return <KeywordOpportunityFinder />;
      case 'content-gap':
        return <ContentGapAnalyzer />;
      case 'serp-tracker':
        return <SERPFeatureTracker />;
      
      // Landing Pages Tools  
      case 'landing-page-converter':
        return <LandingPageConverter />;
      case 'heatmap-simulator':
        return <HeatmapSimulator />;
      case 'cro-element-tester':
        return <CROElementTester />;
      case 'page-speed-optimizer':
        return <PageSpeedOptimizer />;
      case 'mobile-ux-analyzer':
        return <MobileUXAnalyzer />;
      case 'form-optimizer':
        return <FormOptimizer />;
      case 'trust-signal-analyzer':
        return <TrustSignalAnalyzer />;
      case 'cta-optimizer':
        return <CTAOptimizer />;
      
      // Outbound & ABM Tools
      case 'prospect-intent-detector':
        return <ProspectIntentDetector />;
      case 'outbound-sequence-generator':
        return <OutboundSequenceGenerator />;
      case 'abm-account-scorer':
        return <ABMAccountScorer />;
      case 'cold-email-optimizer':
        return <ColdEmailOptimizer />;
      case 'sales-intelligence-hub':
        return <SalesIntelligenceHub />;
      case 'linkedin-automator':
        return <LinkedInAutomator />;
      case 'sales-call-analyzer':
        return <SalesCallAnalyzer />;
      case 'crm-integration-hub':
        return <CRMIntegrationHub />;
      
      // Paid Marketing Tools
      case 'ad-performance-optimizer':
        return <AdPerformanceOptimizer />;
      case 'bid-strategy-calculator':
        return <BidStrategyCalculator />;
      case 'ad-creative-analyzer':
        return <AdCreativeAnalyzer />;
      case 'audience-overlap-detector':
        return <AudienceOverlapDetector />;
      case 'facebook-ads-optimizer':
        return <FacebookAdsOptimizer />;
      case 'google-ads-performance-hub':
        return <GoogleAdsPerformanceHub />;
      
      // CMO & Leadership Tools
      case 'cmo-dashboard-builder':
        return <CMODashboardBuilder />;
      case 'marketing-roi-tracker':
        return <MarketingROITracker />;
      case 'budget-planner':
        return <BudgetPlanningAssistant />;
      
      // Legacy tools (fallback)
      case 'growth-metrics-legacy':
        return <LegacyGrowthMetrics />;
      case 'seo-optimizer-legacy':
        return <LegacySEOOptimizer />;
      
      default:
        return (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Play className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Outil en développement</h3>
            <p className="text-slate-600">Cet outil sera disponible dans la prochaine mise à jour.</p>
            <p className="text-sm text-slate-500 mt-2">ID: {tool.id}</p>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />
        
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b border-slate-200">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <tool.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-800">{tool.name}</h2>
                <p className="text-slate-600">{tool.description}</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={onToggleFavorite}
                className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                <Star className={`w-5 h-5 ${isFavorite ? 'text-yellow-500 fill-current' : 'text-slate-400'}`} />
              </button>
              
              <button
                onClick={onClose}
                className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                <X className="w-5 h-5 text-slate-600" />
              </button>
            </div>
          </div>

          <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
            {renderToolComponent()}
          </div>
        </div>
      </div>
    </div>
  );
};
