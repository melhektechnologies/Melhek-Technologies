export type IndustryType =
  | 'Hotel'
  | 'Restaurant'
  | 'Café'
  | 'Retail'
  | 'Supermarket'
  | 'Pharmacy'
  | 'Gym'
  | 'Law Firm'
  | 'School'
  | 'Clinic'
  | 'NGO'
  | 'Religious Organization'
  | 'Real Estate'
  | 'Automotive'
  | 'Professional Services'
  | 'Startup'
  | 'Other';

export type BusinessSize =
  | 'Individual / Micro'
  | 'Small Business'
  | 'Medium Business'
  | 'Large Business'
  | 'Enterprise';

export type LeadSource =
  | 'Direct Outreach'
  | 'Referral'
  | 'Website'
  | 'Social Media'
  | 'Event / Exhibition'
  | 'Existing Client'
  | 'Partner'
  | 'Other';

export type PrimaryBusinessValue =
  | 'Revenue Growth'
  | 'Cost Reduction'
  | 'Operational Efficiency'
  | 'Customer Experience'
  | 'Risk Reduction'
  | 'Management Visibility'
  | 'Automation'
  | 'Digital Presence'
  | 'Scalability';

export interface ClientDetails {
  clientName: string;
  businessName: string;
  industry: IndustryType;
  contactPerson: string;
  email: string;
  phone: string;
  location: string;
  businessSize: BusinessSize;
  isExistingClient: boolean;
  leadSource: LeadSource;
  primaryValue: PrimaryBusinessValue;
  notes: string;
}

export type ProjectDivision =
  | 'Melhek Digital & AI Labs'
  | 'Melhek Hospitality & Business Systems'
  | 'Melhek Enterprise Solutions'
  | 'Melhek Infrastructure & Cloud';

export type ProjectCategoryId =
  | 'website'
  | 'web-application'
  | 'business-management-system'
  | 'erp-enterprise'
  | 'hospitality-system'
  | 'ecommerce'
  | 'ai-solution'
  | 'business-automation'
  | 'mobile-application'
  | 'custom-digital-platform'
  | 'infrastructure-networking'
  | 'cybersecurity'
  | 'digital-transformation'
  | 'other-custom';

export type ProjectTier = 'FOUNDATION' | 'PROFESSIONAL' | 'ADVANCED' | 'ENTERPRISE';

export interface ScopeItem {
  id: string;
  name: string;
  category: string;
  basePriceETB: number;
  description: string;
  isRecommended?: boolean;
  recommendedReason?: string;
  dependsOn?: string[];
}

export type DesignComplexity = 'Standard' | 'Professional' | 'Premium' | 'Highly Custom';
export type TechnicalComplexity = 'Low' | 'Medium' | 'High' | 'Very High';
export type IntegrationComplexity = 'None' | 'Basic' | 'Multiple' | 'Advanced';
export type DataComplexity = 'Simple' | 'Existing data migration' | 'Large dataset' | 'Complex migration';
export type UserComplexity = 'Single user' | 'Small team' | 'Multi-role' | 'Multi-branch' | 'Enterprise';
export type SecurityRequirement = 'Standard' | 'Enhanced' | 'High' | 'Enterprise';
export type DeploymentType = 'Standard deployment' | 'Custom infrastructure' | 'Advanced deployment';

export interface ComplexityConfig {
  design: DesignComplexity;
  technical: TechnicalComplexity;
  integration: IntegrationComplexity;
  data: DataComplexity;
  user: UserComplexity;
  security: SecurityRequirement;
  deployment: DeploymentType;
}

export type UrgencyLevel = 'Normal' | 'Priority' | 'Urgent';
export type ProjectTimeline = '2 weeks' | '1 month' | '2 months' | '3 months' | '6+ months';
export type StrategicClientValue = 'Low' | 'Moderate' | 'High' | 'Strategic';
export type RelationshipType = 'New Client' | 'Returning Client' | 'Strategic Partner';

export interface CommercialFactors {
  urgency: UrgencyLevel;
  timeline: ProjectTimeline;
  strategicValue: StrategicClientValue;
  relationship: RelationshipType;
  commercialAdjustmentETB: number;
  adjustmentReason: string;
  premiumPositioningUpliftPct: number;
}

export interface InternalCostEstimation {
  designHours: number;
  developmentHours: number;
  testingHours: number;
  deploymentHours: number;
  projectManagementHours: number;
  hourlyInternalRateETB: number;
  thirdPartyCostsETB: number;
  apiCostsETB: number;
  hostingCostsETB: number;
  otherCostsETB: number;
}

export type BillingCycle = 'Monthly' | 'Quarterly' | 'Annual';

export interface RecurringServiceItem {
  id: string;
  name: string;
  cycle: BillingCycle;
  priceETB: number;
  description: string;
  selected: boolean;
}

export interface PaymentScheduleMilestone {
  label: string;
  percentage: number;
  amountETB: number;
  dueCondition: string;
}

export type QuoteStatus =
  | 'Draft'
  | 'Sent'
  | 'Negotiating'
  | 'Accepted'
  | 'Rejected'
  | 'Expired'
  | 'Completed';

export interface FinancialBreakdown {
  basePriceETB: number;
  tierMultiplier: number;
  scopeSubtotalETB: number;
  complexityModifierETB: number;
  integrationModifierETB: number;
  operationalComplexityScore: number;
  strategicValueUpliftETB: number;
  riskFactorETB: number;
  premiumPositioningETB: number;
  commercialAdjustmentETB: number;

  totalInternalCostETB: number;
  minimumSafePriceETB: number;
  recommendedPriceETB: number;
  premiumOpportunityPriceETB: number;
  finalNegotiatedPriceETB: number;

  estimatedGrossContributionETB: number;
  estimatedGrossMarginPct: number;

  isBelowMinimumSafe: boolean;
  isSubstantiallyBelowRecommended: boolean;
  isPremiumPositioned: boolean;
  guardrailWarningMessage?: string;
  guardrailSuccessMessage?: string;
}

export interface QuoteInsight {
  type: 'info' | 'warning' | 'opportunity' | 'success';
  title: string;
  description: string;
}

export interface Quote {
  id: string;
  createdAt: string;
  updatedAt: string;
  status: QuoteStatus;
  validUntilDays: number;
  
  client: ClientDetails;
  
  division: ProjectDivision;
  categoryId: ProjectCategoryId;
  tier: ProjectTier;
  objectives: string[];
  
  selectedScopeIds: string[];
  customScopeItems: Array<{ name: string; priceETB: number }>;
  
  complexity: ComplexityConfig;
  commercial: CommercialFactors;
  internalCosts: InternalCostEstimation;
  
  recurringServices: RecurringServiceItem[];
  paymentSchedule: PaymentScheduleMilestone[];
  
  financials: FinancialBreakdown;
  insights: QuoteInsight[];
}

export interface PricingCategoryConfig {
  id: ProjectCategoryId;
  name: string;
  division: ProjectDivision;
  basePriceETB: number;
  description: string;
  defaultScope: ScopeItem[];
  commonObjectives: string[];
}

export interface SalesDashboardMetrics {
  quotesThisMonth: number;
  totalQuotedValueETB: number;
  acceptedValueETB: number;
  averageQuoteValueETB: number;
  conversionRatePct: number;
  pendingQuotesCount: number;
}
