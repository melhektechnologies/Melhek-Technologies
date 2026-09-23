import { Quote, SalesDashboardMetrics } from './types';
import { PRICING_CATEGORIES, DEFAULT_RECURRING_SERVICES } from './pricingConfig';
import { calculateQuoteFinancials, estimateDefaultLaborHours, generateQuoteInsights } from './pricingEngine';

const STORAGE_KEY = 'melhek_quotes_db_v1';
const SETTINGS_KEY = 'melhek_pricing_settings_v1';

export function createBlankQuote(): Quote {
  const defaultCategory = PRICING_CATEGORIES[0];
  const defaultScopeIds = defaultCategory.defaultScope.slice(0, 5).map(s => s.id);
  const now = new Date().toISOString();
  
  const initialComplexity: Quote['complexity'] = {
    design: 'Professional',
    technical: 'Medium',
    integration: 'Basic',
    data: 'Simple',
    user: 'Small team',
    security: 'Standard',
    deployment: 'Standard deployment'
  };

  const initialCommercial: Quote['commercial'] = {
    urgency: 'Normal',
    timeline: '1 month',
    strategicValue: 'Moderate',
    relationship: 'New Client',
    commercialAdjustmentETB: 0,
    adjustmentReason: '',
    premiumPositioningUpliftPct: 0
  };

  const internalCosts = estimateDefaultLaborHours(defaultCategory.id, defaultScopeIds, initialComplexity);

  const partialQuote: Partial<Quote> = {
    id: generateQuoteId(),
    createdAt: now,
    updatedAt: now,
    status: 'Draft',
    validUntilDays: 30,
    client: {
      clientName: '',
      businessName: '',
      industry: 'Professional Services',
      contactPerson: '',
      email: '',
      phone: '',
      location: 'Addis Ababa, Ethiopia',
      businessSize: 'Small Business',
      isExistingClient: false,
      leadSource: 'Direct Outreach',
      primaryValue: 'Operational Efficiency',
      notes: ''
    },
    division: defaultCategory.division,
    categoryId: defaultCategory.id,
    tier: 'PROFESSIONAL',
    objectives: defaultCategory.commonObjectives.slice(0, 3),
    selectedScopeIds: defaultScopeIds,
    customScopeItems: [],
    complexity: initialComplexity,
    commercial: initialCommercial,
    internalCosts,
    recurringServices: DEFAULT_RECURRING_SERVICES.map(s => ({ ...s })),
    paymentSchedule: [
      { label: 'Commencement Deposit', percentage: 50, amountETB: 0, dueCondition: 'Upon signing engagement agreement & project kickoff' },
      { label: 'Milestone / Beta Review', percentage: 30, amountETB: 0, dueCondition: 'Upon user acceptance testing & staging review' },
      { label: 'Final Delivery & Launch', percentage: 20, amountETB: 0, dueCondition: 'Upon production deployment & handover' }
    ]
  };

  const financials = calculateQuoteFinancials(partialQuote);
  const insights = generateQuoteInsights(partialQuote, financials);

  // Recalculate payment schedule amounts
  const updatedSchedule = partialQuote.paymentSchedule!.map(m => ({
    ...m,
    amountETB: Math.round(financials.finalNegotiatedPriceETB * (m.percentage / 100))
  }));

  return {
    ...partialQuote,
    financials,
    insights,
    paymentSchedule: updatedSchedule
  } as Quote;
}

export function generateQuoteId(): string {
  const year = new Date().getFullYear();
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `MT-Q-${year}-${randomNum}`;
}

export function getLocalQuotes(): Quote[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveLocalQuote(quote: Quote): Quote {
  if (typeof window === 'undefined') return quote;
  const quotes = getLocalQuotes();
  const existingIdx = quotes.findIndex(q => q.id === quote.id);
  
  const updatedQuote = {
    ...quote,
    updatedAt: new Date().toISOString()
  };

  if (existingIdx >= 0) {
    quotes[existingIdx] = updatedQuote;
  } else {
    quotes.unshift(updatedQuote);
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(quotes));

  // Sync to API asynchronously
  fetch('/api/pricing/quotes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedQuote)
  }).catch(() => {});

  return updatedQuote;
}

export function deleteLocalQuote(id: string): void {
  if (typeof window === 'undefined') return;
  const quotes = getLocalQuotes().filter(q => q.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(quotes));

  fetch(`/api/pricing/quotes?id=${id}`, {
    method: 'DELETE'
  }).catch(() => {});
}

export function calculateDashboardMetrics(quotes: Quote[]): SalesDashboardMetrics {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const thisMonthQuotes = quotes.filter(q => {
    const d = new Date(q.createdAt);
    return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
  });

  const totalQuotedValueETB = quotes.reduce((sum, q) => sum + q.financials.finalNegotiatedPriceETB, 0);
  
  const acceptedQuotes = quotes.filter(q => q.status === 'Accepted' || q.status === 'Completed');
  const acceptedValueETB = acceptedQuotes.reduce((sum, q) => sum + q.financials.finalNegotiatedPriceETB, 0);

  const averageQuoteValueETB = quotes.length > 0 ? Math.round(totalQuotedValueETB / quotes.length) : 0;
  
  const conversionRatePct = quotes.length > 0
    ? Math.round((acceptedQuotes.length / quotes.length) * 100)
    : 0;

  const pendingQuotesCount = quotes.filter(q => q.status === 'Sent' || q.status === 'Negotiating').length;

  return {
    quotesThisMonth: thisMonthQuotes.length,
    totalQuotedValueETB,
    acceptedValueETB,
    averageQuoteValueETB,
    conversionRatePct,
    pendingQuotesCount
  };
}
