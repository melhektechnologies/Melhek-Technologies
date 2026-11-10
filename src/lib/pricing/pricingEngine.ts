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
  
  // Complexity score multiplier: 1.2% per score point (max ~36% at score 30)
  // Intentionally conservative to prevent runaway prices
  const complexityScaleMultiplier = 1 + (operationalComplexityScore * 0.012);

  // Apply user scale, design multiplier and complexity scale
  const afterComplexityUser = subtotalBeforeMultipliers * complexityScaleMultiplier * userMod.multiplier * designMod.multiplier;
  
  const strategicValueUpliftETB = Math.round(afterComplexityUser * (stratMod.multiplier - 1));
  const riskFactorETB = Math.round(afterComplexityUser * (urgencyMod.multiplier - 1));

  // Calculated Recommended Price
  const rawRecommendedPrice = Math.round(afterComplexityUser) + strategicValueUpliftETB + riskFactorETB;

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
  // Also never go below the category base price
  const minimumMarginFloor = Math.round(totalInternalCostETB * 1.4);
  const minimumRecommendedFloor = Math.round(recommendedPriceETB * 0.70);
  const minimumSafePriceETB = Math.max(minimumMarginFloor, minimumRecommendedFloor, category.basePriceETB);

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
  const isSubstantiallyBelowRecommended = !isBelowMinimumSafe && finalNegotiatedPriceETB < Math.round(recommendedPriceETB * 0.82);
  const isPremiumPositioned = finalNegotiatedPriceETB > Math.round(recommendedPriceETB * 1.12);

  let guardrailWarningMessage: string | undefined;
  let guardrailSuccessMessage: string | undefined;

  if (isBelowMinimumSafe) {
    guardrailWarningMessage = `⚠ MARGIN ALERT: Final price (${finalNegotiatedPriceETB.toLocaleString()} ETB) is below Melhek's minimum safe floor (${minimumSafePriceETB.toLocaleString()} ETB). Gross margin: ${estimatedGrossMarginPct}%.`;
  } else if (isSubstantiallyBelowRecommended) {
    guardrailWarningMessage = `Discount puts price (${finalNegotiatedPriceETB.toLocaleString()} ETB) substantially below recommendation (${recommendedPriceETB.toLocaleString()} ETB). Ensure commercial justification is documented.`;
  } else if (isPremiumPositioned) {
    guardrailSuccessMessage = `Premium positioning active — ${finalNegotiatedPriceETB.toLocaleString()} ETB reflects exceptional delivery scope and strategic value.`;
  } else {
    guardrailSuccessMessage = `Healthy margin of ${estimatedGrossMarginPct}% — commercial guardrail passed.`;
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
  const seen = new Set<string>();

  // Dependency-based recommendations
  category.defaultScope.forEach(item => {
    if (!selectedScopeIds.includes(item.id) && !seen.has(item.id)) {
      if (item.dependsOn && item.dependsOn.some(depId => selectedScopeIds.includes(depId))) {
        seen.add(item.id);
        recommendations.push({
          ...item,
          isRecommended: true,
          recommendedReason: 'Recommended based on your selected prerequisite features.'
        });
      }
    }
  });

  // Smart context-driven suggestions
  if (selectedScopeIds.some(id => id.includes('booking') || id.includes('res'))) {
    const cal = category.defaultScope.find(i => i.id.includes('calendar'));
    if (cal && !selectedScopeIds.includes(cal.id) && !seen.has(cal.id)) {
      seen.add(cal.id);
      recommendations.push({ ...cal, isRecommended: true, recommendedReason: 'Online booking works best with a visual reservation calendar.' });
    }
  }

  if (selectedScopeIds.some(id => id.includes('multi-branch') || id.includes('branch'))) {
    const audit = category.defaultScope.find(i => i.id.includes('audit'));
    if (audit && !selectedScopeIds.includes(audit.id) && !seen.has(audit.id)) {
      seen.add(audit.id);
      recommendations.push({ ...audit, isRecommended: true, recommendedReason: 'Multi-branch operations strongly require tamper-proof audit logging.' });
    }
  }

  if (selectedScopeIds.some(id => id.includes('pos') || id.includes('checkout'))) {
    const barcode = category.defaultScope.find(i => i.id.includes('barcode'));
    if (barcode && !selectedScopeIds.includes(barcode.id) && !seen.has(barcode.id)) {
      seen.add(barcode.id);
      recommendations.push({ ...barcode, isRecommended: true, recommendedReason: 'POS systems are significantly more efficient with barcode scanning.' });
    }
  }

  if (selectedScopeIds.some(id => id.includes('inventory') || id.includes('stock'))) {
    const supplier = category.defaultScope.find(i => i.id.includes('supplier') || i.id.includes('purchase'));
    if (supplier && !selectedScopeIds.includes(supplier.id) && !seen.has(supplier.id)) {
      seen.add(supplier.id);
      recommendations.push({ ...supplier, isRecommended: true, recommendedReason: 'Inventory management pairs well with supplier and purchase order tracking.' });
    }
  }

  return recommendations.slice(0, 4);
}

/**
 * Generates deterministic, data-driven insights for the internal quote review panel.
 * Every insight is based on actual quote data — no AI hallucinations.
 */
export function generateQuoteInsights(quote: Partial<Quote>, financials: FinancialBreakdown): QuoteInsight[] {
  const insights: QuoteInsight[] = [];
  const scopeCount = quote.selectedScopeIds?.length ?? 0;
  const customCount = quote.customScopeItems?.length ?? 0;

  // High complexity warning
  if (financials.operationalComplexityScore >= 15) {
    insights.push({
      type: 'warning',
      title: 'Very High Operational Complexity',
      description: `Score ${financials.operationalComplexityScore}/30. Recommend phased delivery, staging reviews, and comprehensive integration testing to de-risk this engagement.`
    });
  } else if (financials.operationalComplexityScore >= 9) {
    insights.push({
      type: 'info',
      title: 'Moderate-to-High Complexity Scope',
      description: `Complexity score is ${financials.operationalComplexityScore}/30. Budget adequate time for discovery, architecture planning, and QA cycles.`
    });
  }

  // Tier vs scope mismatch
  if (scopeCount >= 7 && (quote.tier === 'FOUNDATION' || quote.tier === 'PROFESSIONAL')) {
    insights.push({
      type: 'warning',
      title: 'Tier May Underrepresent Scope',
      description: `${scopeCount} modules at ${quote.tier} tier. Consider ADVANCED or ENTERPRISE for a more accurate commercial representation.`
    });
  }

  // Recurring revenue opportunity
  if (quote.tier === 'ENTERPRISE' || quote.tier === 'ADVANCED' || scopeCount >= 6) {
    insights.push({
      type: 'opportunity',
      title: 'Strong Recurring Revenue Potential',
      description: `This ${quote.tier} system has business-critical infrastructure. Pitch a Managed Maintenance + Priority SLA package in Step 6 to establish recurring revenue.`
    });
  }

  // Margin alert
  if (financials.isBelowMinimumSafe) {
    insights.push({
      type: 'warning',
      title: 'Margin Protection Alert',
      description: `Final price of ${financials.finalNegotiatedPriceETB.toLocaleString()} ETB yields only ${financials.estimatedGrossMarginPct}% gross margin — below Melhek's 35% target. Reduce scope, increase final price, or document the justification.`
    });
  } else if (financials.estimatedGrossMarginPct >= 50) {
    insights.push({
      type: 'success',
      title: 'Excellent Gross Margin',
      description: `${financials.estimatedGrossMarginPct}% gross margin. This quote strongly protects Melhek's engineering investment.`
    });
  }

  // Value framing based on client's primary driver
  const primaryVal = quote.client?.primaryValue;
  if (primaryVal === 'Cost Reduction' || primaryVal === 'Operational Efficiency') {
    insights.push({
      type: 'info',
      title: 'ROI-Driven Proposal Framing',
      description: `Client prioritizes ${primaryVal}. Frame the proposal around annual labor savings, error reduction, and automation ROI — not technical implementation hours.`
    });
  } else if (primaryVal === 'Revenue Growth') {
    insights.push({
      type: 'info',
      title: 'Revenue Impact Framing',
      description: 'Frame the proposal around customer acquisition improvements, booking conversion, and lead generation capability rather than code features.'
    });
  } else if (primaryVal === 'Management Visibility') {
    insights.push({
      type: 'info',
      title: 'Executive Decision Support Framing',
      description: 'Emphasize real-time analytics, management dashboards, and consolidated business intelligence as the core deliverable value.'
    });
  }

  // Large scope phasing
  if (scopeCount + customCount >= 9) {
    insights.push({
      type: 'info',
      title: 'Phased Delivery Recommended',
      description: `${scopeCount + customCount} scope modules selected. Propose a 2-phase delivery structure to reduce client risk and deliver early value.`
    });
  }

  // Strategic account upsell
  if (quote.commercial?.strategicValue === 'Strategic' || quote.commercial?.strategicValue === 'High') {
    insights.push({
      type: 'opportunity',
      title: 'Strategic Account Relationship',
      description: 'High-value client. Consider proposing a Preferred Technology Partner agreement with an annual retainer, priority support, and dedicated engineering capacity.'
    });
  }

  // Urgency flag
  if (quote.commercial?.urgency === 'Urgent') {
    insights.push({
      type: 'warning',
      title: 'Urgent Timeline — Validate Capacity',
      description: 'Urgent delivery selected. Confirm Melhek has available engineering capacity before committing. Urgency pricing premium (+40%) has been applied.'
    });
  }

  // AI API cost reminder
  if (quote.categoryId === 'ai-solution' || quote.selectedScopeIds?.some(id => id.includes('ai') || id.includes('chatbot'))) {
    insights.push({
      type: 'info',
      title: 'AI API Recurring Cost',
      description: 'This quote includes AI features. Ensure ongoing AI/API gateway costs are included in recurring services (Step 6) so Melhek is not absorbing token costs post-launch.'
    });
  }

  return insights.slice(0, 6);
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
