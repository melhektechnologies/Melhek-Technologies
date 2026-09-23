import {
  Quote,
  FinancialBreakdown,
  QuoteInsight,
  ScopeItem,
  InternalCostEstimation
} from './types';
import {
  PRICING_CATEGORIES,
  PRICING_TIER_CONFIG,
  COMPLEXITY_MODIFIERS,
  COMMERCIAL_MODIFIERS,
  DEFAULT_INTERNAL_HOURLY_RATE_ETB
} from './pricingConfig';

/**
 * Calculates the complete commercial financial breakdown for a quote.
 */
export function calculateQuoteFinancials(quote: Partial<Quote>): FinancialBreakdown {
  const category = PRICING_CATEGORIES.find(c => c.id === quote.categoryId) || PRICING_CATEGORIES[0];
  const tierConfig = PRICING_TIER_CONFIG[quote.tier || 'PROFESSIONAL'];

  // Base solution value
  const basePriceETB = category.basePriceETB;
  const tierMultiplier = tierConfig.multiplier;

  // Selected scope subtotal
  const allAvailableScope = [...category.defaultScope];
  const selectedScopeIds = quote.selectedScopeIds || [];
  const selectedScopeItems = allAvailableScope.filter(item => selectedScopeIds.includes(item.id));
  const scopeSubtotalETB = selectedScopeItems.reduce((sum, item) => sum + item.basePriceETB, 0);

  const customItems = quote.customScopeItems || [];
  const customSubtotalETB = customItems.reduce((sum, item) => sum + item.priceETB, 0);
  const totalScopeETB = scopeSubtotalETB + customSubtotalETB;

  // Complexity Modifiers
  const complexity = quote.complexity || {
    design: 'Professional',
    technical: 'Medium',
    integration: 'Basic',
    data: 'Simple',
    user: 'Small team',
    security: 'Standard',
    deployment: 'Standard deployment'
  };

  const designMod = COMPLEXITY_MODIFIERS.design[complexity.design] || COMPLEXITY_MODIFIERS.design.Professional;
  const techMod = COMPLEXITY_MODIFIERS.technical[complexity.technical] || COMPLEXITY_MODIFIERS.technical.Medium;
  const intMod = COMPLEXITY_MODIFIERS.integration[complexity.integration] || COMPLEXITY_MODIFIERS.integration.Basic;
  const dataMod = COMPLEXITY_MODIFIERS.data[complexity.data] || COMPLEXITY_MODIFIERS.data.Simple;
  const userMod = COMPLEXITY_MODIFIERS.user[complexity.user] || COMPLEXITY_MODIFIERS.user['Small team'];
  const secMod = COMPLEXITY_MODIFIERS.security[complexity.security] || COMPLEXITY_MODIFIERS.security.Standard;
  const depMod = COMPLEXITY_MODIFIERS.deployment[complexity.deployment] || COMPLEXITY_MODIFIERS.deployment['Standard deployment'];

  // Operational Complexity Score (1-30 scale)
  const operationalComplexityScore =
    techMod.score + intMod.score + dataMod.score + userMod.score + secMod.score;

  const complexityModifierETB =
    designMod.costETB +
    techMod.costETB +
    dataMod.costETB +
    secMod.costETB +
    depMod.costETB;

  const integrationModifierETB = intMod.costETB;

  // Strategic & Relationship Factors
  const commercial = quote.commercial || {
    urgency: 'Normal',
    timeline: '1 month',
    strategicValue: 'Moderate',
    relationship: 'New Client',
    commercialAdjustmentETB: 0,
    adjustmentReason: '',
    premiumPositioningUpliftPct: 0
  };

  const urgencyMod = COMMERCIAL_MODIFIERS.urgency[commercial.urgency] || COMMERCIAL_MODIFIERS.urgency.Normal;
  const stratMod = COMMERCIAL_MODIFIERS.strategicValue[commercial.strategicValue] || COMMERCIAL_MODIFIERS.strategicValue.Moderate;
  const relMod = COMMERCIAL_MODIFIERS.relationship[commercial.relationship] || COMMERCIAL_MODIFIERS.relationship['New Client'];

  // Base raw calculated price before commercial adjustment
  const subtotalBeforeMultipliers = (basePriceETB + totalScopeETB + complexityModifierETB + integrationModifierETB) * tierMultiplier;
  
  // Complexity score multiplier: higher operational complexity elevates the base value
  const complexityScaleMultiplier = 1 + (operationalComplexityScore * 0.025);
  
  const strategicValueUpliftETB = Math.round(subtotalBeforeMultipliers * (stratMod.multiplier - 1));
  const riskFactorETB = Math.round(subtotalBeforeMultipliers * (urgencyMod.multiplier - 1));

  // Calculated Recommended Price
  const rawRecommendedPrice = Math.round(
    subtotalBeforeMultipliers * complexityScaleMultiplier * userMod.multiplier * designMod.multiplier
  ) + strategicValueUpliftETB + riskFactorETB;

  // Strategic relationship adjustment
  const relationshipAdjustmentETB = Math.round(rawRecommendedPrice * relMod.modifierPct);
  const recommendedPriceETB = Math.max(category.basePriceETB, rawRecommendedPrice + relationshipAdjustmentETB);

  // Calculate Internal Cost
  const costs: InternalCostEstimation = quote.internalCosts || {
    designHours: 20,
    developmentHours: 60,
    testingHours: 15,
    deploymentHours: 10,
    projectManagementHours: 15,
    hourlyInternalRateETB: DEFAULT_INTERNAL_HOURLY_RATE_ETB,
    thirdPartyCostsETB: 0,
    apiCostsETB: 0,
    hostingCostsETB: 0,
    otherCostsETB: 0
  };

  const totalLaborHours =
    (costs.designHours || 0) +
    (costs.developmentHours || 0) +
    (costs.testingHours || 0) +
    (costs.deploymentHours || 0) +
    (costs.projectManagementHours || 0);

  const hourlyRate = costs.hourlyInternalRateETB || DEFAULT_INTERNAL_HOURLY_RATE_ETB;
  const laborCostETB = totalLaborHours * hourlyRate;
  const directThirdPartyCostETB =
    (costs.thirdPartyCostsETB || 0) +
    (costs.apiCostsETB || 0) +
    (costs.hostingCostsETB || 0) +
    (costs.otherCostsETB || 0);

  const totalInternalCostETB = Math.round(laborCostETB + directThirdPartyCostETB);

  // Minimum Safe Price = 1.4x internal cost OR 70% of recommended price (whichever is higher)
  const minimumMarginFloor = Math.round(totalInternalCostETB * 1.4);
  const minimumRecommendedFloor = Math.round(recommendedPriceETB * 0.75);
  const minimumSafePriceETB = Math.max(minimumMarginFloor, minimumRecommendedFloor);

  // Premium Opportunity Price = Recommended + 25% uplift
  const premiumOpportunityPriceETB = Math.round(recommendedPriceETB * 1.25);

  // Final Price
  const commercialAdjustmentETB = commercial.commercialAdjustmentETB || 0;
  const premiumPositioningETB = Math.round(recommendedPriceETB * ((commercial.premiumPositioningUpliftPct || 0) / 100));

  let finalNegotiatedPriceETB = recommendedPriceETB + premiumPositioningETB - commercialAdjustmentETB;
  if (finalNegotiatedPriceETB < 0) finalNegotiatedPriceETB = 0;

  // Margin & Gross Contribution
  const estimatedGrossContributionETB = Math.round(finalNegotiatedPriceETB - totalInternalCostETB);
  const estimatedGrossMarginPct = finalNegotiatedPriceETB > 0
    ? Math.round((estimatedGrossContributionETB / finalNegotiatedPriceETB) * 100)
    : 0;

  // Guardrails
  const isBelowMinimumSafe = finalNegotiatedPriceETB < minimumSafePriceETB;
  const isSubstantiallyBelowRecommended = finalNegotiatedPriceETB < Math.round(recommendedPriceETB * 0.85);
  const isPremiumPositioned = finalNegotiatedPriceETB > Math.round(recommendedPriceETB * 1.15);

  let guardrailWarningMessage: string | undefined;
  let guardrailSuccessMessage: string | undefined;

  if (isBelowMinimumSafe) {
    guardrailWarningMessage = `⚠ WARNING: Final price (${finalNegotiatedPriceETB.toLocaleString()} ETB) is below Melhek's minimum safe floor (${minimumSafePriceETB.toLocaleString()} ETB). Estimated gross margin is ${estimatedGrossMarginPct}%. Review project scope or commercial terms.`;
  } else if (isSubstantiallyBelowRecommended) {
    guardrailWarningMessage = `Notice: Discount applied puts price (${finalNegotiatedPriceETB.toLocaleString()} ETB) below standard recommendation (${recommendedPriceETB.toLocaleString()} ETB). Ensure strategic justification exists.`;
  } else if (isPremiumPositioned) {
    guardrailSuccessMessage = `Premium Positioning Active: Final investment (${finalNegotiatedPriceETB.toLocaleString()} ETB) reflects high value delivery and strategic scope.`;
  } else {
    guardrailSuccessMessage = `Commercial Guardrail Passed: Healthy projected margin of ${estimatedGrossMarginPct}%.`;
  }

  return {
    basePriceETB,
    tierMultiplier,
    scopeSubtotalETB: totalScopeETB,
    complexityModifierETB,
    integrationModifierETB,
    operationalComplexityScore,
    strategicValueUpliftETB,
    riskFactorETB,
    premiumPositioningETB,
    commercialAdjustmentETB,

    totalInternalCostETB,
    minimumSafePriceETB,
    recommendedPriceETB,
    premiumOpportunityPriceETB,
    finalNegotiatedPriceETB,

    estimatedGrossContributionETB,
    estimatedGrossMarginPct,

    isBelowMinimumSafe,
    isSubstantiallyBelowRecommended,
    isPremiumPositioned,
    guardrailWarningMessage,
    guardrailSuccessMessage
  };
}

/**
 * Returns dynamic feature recommendations and dependencies based on selected scope items.
 */
export function getRecommendedFeatures(selectedScopeIds: string[], categoryId: string): ScopeItem[] {
  const category = PRICING_CATEGORIES.find(c => c.id === categoryId);
  if (!category) return [];

  const recommendations: ScopeItem[] = [];

  // Check dependencies
  category.defaultScope.forEach(item => {
    if (!selectedScopeIds.includes(item.id)) {
      if (item.dependsOn && item.dependsOn.some(depId => selectedScopeIds.includes(depId))) {
        recommendations.push({
          ...item,
          isRecommended: true,
          recommendedReason: `Recommended addition for selected prerequisite features.`
        });
      }
    }
  });

  // Category specific intelligent suggestions
  if (selectedScopeIds.some(id => id.includes('booking') || id.includes('res'))) {
    const calendarItem = category.defaultScope.find(i => i.id.includes('calendar'));
    if (calendarItem && !selectedScopeIds.includes(calendarItem.id) && !recommendations.some(r => r.id === calendarItem.id)) {
      recommendations.push({
        ...calendarItem,
        isRecommended: true,
        recommendedReason: `Online booking workflow works best with visual reservation calendars.`
      });
    }
  }

  if (selectedScopeIds.some(id => id.includes('multi-branch'))) {
    const auditItem = category.defaultScope.find(i => i.id.includes('audit'));
    if (auditItem && !selectedScopeIds.includes(auditItem.id) && !recommendations.some(r => r.id === auditItem.id)) {
      recommendations.push({
        ...auditItem,
        isRecommended: true,
        recommendedReason: `Multi-branch implementations strongly require activity audit logs.`
      });
    }
  }

  return recommendations;
}

/**
 * Generates deterministic insights for the internal quote review.
 */
export function generateQuoteInsights(quote: Partial<Quote>, financials: FinancialBreakdown): QuoteInsight[] {
  const insights: QuoteInsight[] = [];

  if (financials.operationalComplexityScore >= 12) {
    insights.push({
      type: 'warning',
      title: 'High Operational Complexity',
      description: `Complexity score is ${financials.operationalComplexityScore}. Ensure multi-phase delivery, staging reviews, and thorough integration testing.`
    });
  }

  if (quote.tier === 'ENTERPRISE' || quote.tier === 'ADVANCED') {
    insights.push({
      type: 'opportunity',
      title: 'Strong Recurring Service Potential',
      description: `This ${quote.tier} implementation contains business-critical infrastructure. Pitch a monthly Managed Maintenance & SLA package.`
    });
  }

  if (financials.isBelowMinimumSafe) {
    insights.push({
      type: 'warning',
      title: 'Margin Protection Alert',
      description: `Final price of ${financials.finalNegotiatedPriceETB.toLocaleString()} ETB provides only ${financials.estimatedGrossMarginPct}% gross margin, which is below Melhek's target 35%+ minimum.`
    });
  }

  if (quote.client?.primaryValue === 'Cost Reduction' || quote.client?.primaryValue === 'Operational Efficiency') {
    insights.push({
      type: 'info',
      title: 'Value Framing Focus',
      description: `Client prioritizes ${quote.client.primaryValue}. Frame the proposal around annual labor savings and reduced manual error risk rather than technical code hours.`
    });
  }

  if (quote.selectedScopeIds && quote.selectedScopeIds.length >= 8) {
    insights.push({
      type: 'info',
      title: 'Broad Scope Execution',
      description: `${quote.selectedScopeIds.length} scope modules selected. Recommend a 2-phase rollout plan to deliver early value.`
    });
  }

  return insights;
}

/**
 * Estimate default labor hours based on category, scope count, and complexity.
 */
export function estimateDefaultLaborHours(
  categoryId: string,
  selectedScopeIds: string[],
  complexity: Quote['complexity']
): InternalCostEstimation {
  const scopeCount = selectedScopeIds.length;
  
  let designHours = 12 + scopeCount * 3;
  let devHours = 35 + scopeCount * 12;
  let testingHours = 10 + scopeCount * 2;
  let deployHours = 8 + (complexity?.deployment === 'Advanced deployment' ? 15 : 4);
  let pmHours = Math.round((designHours + devHours + testingHours + deployHours) * 0.15);

  if (complexity?.technical === 'High') devHours *= 1.3;
  if (complexity?.technical === 'Very High') devHours *= 1.6;

  return {
    designHours: Math.round(designHours),
    developmentHours: Math.round(devHours),
    testingHours: Math.round(testingHours),
    deploymentHours: Math.round(deployHours),
    projectManagementHours: Math.round(pmHours),
    hourlyInternalRateETB: DEFAULT_INTERNAL_HOURLY_RATE_ETB,
    thirdPartyCostsETB: 0,
    apiCostsETB: 0,
    hostingCostsETB: 0,
    otherCostsETB: 0
  };
}
