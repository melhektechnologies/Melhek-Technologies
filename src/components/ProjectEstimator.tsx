'use client'

import { useState, useActionState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calculator, CheckCircle2, ChevronRight, ChevronLeft, Calendar, ShieldAlert, Cpu, Laptop, Hotel, Network, HelpCircle, Briefcase, ChevronDown } from 'lucide-react'
import { submitEstimateLead, ActionState } from '@/app/actions/leads'

interface ProjectCategory {
  id: string
  name: string
  icon: any
  baseMin: number
  baseMax: number
  timelineMin: number
  timelineMax: number
  description: string
  recommendedDivision: string
  isCustom: boolean
}

interface BusinessSector {
  id: string
  name: string
  description: string
}

interface ComplexityLevel {
  id: string
  name: string
  multiplier: number
  timelineAdd: number
  description: string
}

interface FeatureItem {
  id: string
  name: string
  price: number
  timelineAdd: number
  description: string
}

const PROJECT_CATEGORIES: ProjectCategory[] = [
  {
    id: 'business_website',
    name: 'Business Website',
    icon: Laptop,
    baseMin: 35000,
    baseMax: 120000,
    timelineMin: 2,
    timelineMax: 6,
    description: 'Informational homepages, showcase portfolios, organization details, and simple contact forms.',
    recommendedDivision: 'Melhek Digital (01 / DIVISION)',
    isCustom: false
  },
  {
    id: 'professional_website',
    name: 'Custom Web Portal / Client Dashboard',
    icon: Laptop,
    baseMin: 60000,
    baseMax: 300000,
    timelineMin: 4,
    timelineMax: 12,
    description: 'Interactive client dashboards, custom logins, database tables, and automated notifications.',
    recommendedDivision: 'Melhek Digital (01 / DIVISION)',
    isCustom: false
  },
  {
    id: 'digital_menu',
    name: 'Digital Menu System',
    icon: Hotel,
    baseMin: 15000,
    baseMax: 150000,
    timelineMin: 3,
    timelineMax: 8,
    description: 'Interactive restaurant menus, QR codes, sales desk sync, and kitchen display views.',
    recommendedDivision: 'Melhek Hospitality (02 / DIVISION)',
    isCustom: false
  },
  {
    id: 'business_system',
    name: 'Sales & Inventory System (POS)',
    icon: Network,
    baseMin: 100000,
    baseMax: 800000,
    timelineMin: 6,
    timelineMax: 16,
    description: 'Store stock tracking, cashier checkouts, barcode scanning, client registers, and sales reports.',
    recommendedDivision: 'Melhek Business Systems (03 / DIVISION)',
    isCustom: false
  },
  {
    id: 'hospitality_solutions',
    name: 'Hotel Booking & Booking Management',
    icon: Hotel,
    baseMin: 0,
    baseMax: 0,
    timelineMin: 0,
    timelineMax: 0,
    description: 'Hotel room booking engines, front desk availability planners, and unified guest check-ins.',
    recommendedDivision: 'Melhek Hospitality (02 / DIVISION)',
    isCustom: true
  },
  {
    id: 'enterprise_platforms',
    name: 'Multi-branch Custom System',
    icon: Briefcase,
    baseMin: 0,
    baseMax: 0,
    timelineMin: 0,
    timelineMax: 0,
    description: 'High-volume checkout networks, multi-store stock sync, enterprise databases, and maximum security.',
    recommendedDivision: 'Melhek Infrastructure (06 / DIVISION)',
    isCustom: true
  },
  {
    id: 'ai_automation',
    name: 'AI Assistant & Task Automator',
    icon: Cpu,
    baseMin: 0,
    baseMax: 0,
    timelineMin: 0,
    timelineMax: 0,
    description: 'Automated task script routines, text database summaries, and custom AI chatbots.',
    recommendedDivision: 'Melhek AI Labs (04 / DIVISION)',
    isCustom: true
  }
]

const BUSINESS_SECTORS: BusinessSector[] = [
  { id: 'hospitality', name: 'Hospitality & Dining', description: 'Hotels, guest houses, restaurants, and cafés.' },
  { id: 'retail', name: 'Retail & Supermarket', description: 'Supermarkets, pharmacies, retail stores, and supply chain hubs.' },
  { id: 'healthcare', name: 'Healthcare & Clinics', description: 'Medical clinics, optical centers, and wellness facilities.' },
  { id: 'professional', name: 'Professional Services', description: 'Law firms, consultancies, agencies, and corporate offices.' },
  { id: 'other', name: 'General Business Operations', description: 'Manufacturing, logistics, real estate, and general entities.' }
]

const COMPLEXITY_LEVELS: ComplexityLevel[] = [
  {
    id: 'standard',
    name: 'Standard Infrastructure',
    multiplier: 1.0,
    timelineAdd: 0,
    description: 'Optimized operational layouts, clean database setups, and streamlined single-location operations.'
  },
  {
    id: 'enhanced',
    name: 'Enhanced Operations',
    multiplier: 1.4,
    timelineAdd: 2,
    description: 'Custom APIs, external system integrations, customer dashboards, and interactive portals.'
  },
  {
    id: 'enterprise',
    name: 'Enterprise Grid',
    multiplier: 2.0,
    timelineAdd: 4,
    description: 'High concurrency traffic patterns, database clustering/sync, maximum security compliance, and auditing.'
  }
]

const FEATURES_LIST: FeatureItem[] = [
  {
    id: 'auth',
    name: 'Staff Logins & Account Levels',
    price: 12000,
    timelineAdd: 1,
    description: 'Secure staff login portals, permission settings, and manager dashboards.'
  },
  {
    id: 'payments',
    name: 'Mobile & Card Payments',
    price: 18000,
    timelineAdd: 1,
    description: 'Integrate international credit cards or local mobile wallets (Telebirr, CBE, Chapa) seamlessly.'
  },
  {
    id: 'realtime',
    name: 'Instant Notifications',
    price: 10000,
    timelineAdd: 1,
    description: 'Real-time database updates, auto-emails, and instant notifications to Telegram channels.'
  },
  {
    id: 'multibranch',
    name: 'Multi-store Stock & Cashier Sync',
    price: 45000,
    timelineAdd: 2,
    description: 'Central cloud server syncing stock counts and checkout totals from multiple store locations.'
  },
  {
    id: 'analytics',
    name: 'Sales Charts & Excel Reports',
    price: 22000,
    timelineAdd: 1.5,
    description: 'Custom visual graphs, downloadable spreadsheets, and automated sales metrics summaries.'
  },
  {
    id: 'security',
    name: 'Data Security & Safe Storage',
    price: 30000,
    timelineAdd: 2,
    description: 'Rigorous penetration testing, database field-level encryption, and complete vulnerability patches.'
  }
]

interface ProjectEstimatorProps {
  currency?: 'ETB' | 'USD'
  exchangeRate?: number
}

export default function ProjectEstimator({ currency = 'ETB', exchangeRate = 120 }: ProjectEstimatorProps) {
  const [currentStep, setCurrentStep] = useState(1)
  
  // Selections State
  const [selectedCategory, setSelectedCategory] = useState<string>('business_website')
  const [selectedSector, setSelectedSector] = useState<string>('retail')
  const [selectedComplexity, setSelectedComplexity] = useState<string>('standard')
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])

  // Calculated Output State
  const [estimate, setEstimate] = useState({
    minPrice: 0,
    maxPrice: 0,
    minTimeline: 0,
    maxTimeline: 0,
    isCustom: false
  })

  // Format Helper
  const formatPrice = (amount: number) => {
    if (currency === 'USD') {
      const usdAmount = Math.round(amount / exchangeRate)
      if (usdAmount === 0) return '$0'
      // Rounded to nearest $5 or $10 for clean aesthetics
      if (usdAmount < 100) return `$${Math.round(usdAmount / 10) * 10} USD`
      return `$${Math.round(usdAmount / 25) * 25} USD`
    }
    return `${amount.toLocaleString()} ETB`
  }

  // Recalculate whenever selections change
  useEffect(() => {
    const category = PROJECT_CATEGORIES.find(c => c.id === selectedCategory)
    const complexity = COMPLEXITY_LEVELS.find(l => l.id === selectedComplexity)

    if (!category || !complexity) return

    if (category.isCustom) {
      setEstimate({
        minPrice: 0,
        maxPrice: 0,
        minTimeline: 0,
        maxTimeline: 0,
        isCustom: true
      })
      return
    }

    // Calculate base modified by complexity
    let minPrice = category.baseMin * complexity.multiplier
    let maxPrice = category.baseMax * complexity.multiplier
    let minTimeline = category.timelineMin + complexity.timelineAdd
    let maxTimeline = category.timelineMax + complexity.timelineAdd

    // Add selected features cost and timeline
    selectedFeatures.forEach(featId => {
      const feat = FEATURES_LIST.find(f => f.id === featId)
      if (feat) {
        minPrice += feat.price
        maxPrice += feat.price
        minTimeline += Math.floor(feat.timelineAdd)
        maxTimeline += Math.ceil(feat.timelineAdd)
      }
    })

    setEstimate({
      minPrice: Math.round(minPrice),
      maxPrice: Math.round(maxPrice),
      minTimeline,
      maxTimeline,
      isCustom: false
    })
  }, [selectedCategory, selectedComplexity, selectedFeatures])

  const toggleFeature = (featId: string) => {
    setSelectedFeatures(prev => 
      prev.includes(featId) 
        ? prev.filter(id => id !== featId) 
        : [...prev, featId]
    )
  }

  // Handle Form Submission ActionState
  const initialState: ActionState = {}
  const [state, formAction, isPending] = useActionState(submitEstimateLead, initialState)

  const handleNextStep = () => setCurrentStep(prev => Math.min(prev + 1, 4))
  const handlePrevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1))

  const activeCategoryData = PROJECT_CATEGORIES.find(c => c.id === selectedCategory)
  const activeSectorData = BUSINESS_SECTORS.find(s => s.id === selectedSector)
  const activeComplexityData = COMPLEXITY_LEVELS.find(l => l.id === selectedComplexity)

  // Calculate final budget display values
  const getMinDisplayPrice = () => {
    if (currency === 'USD') {
      return Math.round((estimate.minPrice / exchangeRate) / 25) * 25
    }
    return estimate.minPrice
  }

  const getMaxDisplayPrice = () => {
    if (currency === 'USD') {
      return Math.round((estimate.maxPrice / exchangeRate) / 25) * 25
    }
    return estimate.maxPrice
  }

  return (
    <section className="glass rounded-[32px] border-white/10 p-6 md:p-10 relative overflow-hidden bg-melhek-navy/60">
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-melhek-blue/5 blur-[80px] -z-10" />

      {/* Estimator Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-8 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2 text-melhek-blue mb-2">
            <Calculator className="w-5 h-5" />
            <span className="text-xs uppercase tracking-[0.3em] font-mono font-bold">Consultancy Tool</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-display font-extrabold text-white">
            Project Blueprint Estimator
          </h3>
          <p className="text-white/40 text-xs mt-1 max-w-md">
            Design your software layout parameters and receive an indicative investment range and solution timeline.
          </p>
        </div>

        {/* Progress Tracker */}
        <div className="flex items-center gap-3">
          {[1, 2, 3, 4].map(step => (
            <div key={step} className="flex items-center">
              <div 
                className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-mono font-bold transition-all ${
                  currentStep >= step 
                    ? 'bg-melhek-blue text-melhek-navy shadow-[0_0_15px_rgba(127,169,255,0.4)]' 
                    : 'bg-white/5 text-white/40 border border-white/5'
                }`}
              >
                0{step}
              </div>
              {step < 4 && (
                <div 
                  className={`w-8 h-[2px] transition-all ${
                    currentStep > step ? 'bg-melhek-blue' : 'bg-white/5'
                  }`} 
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Selection Area (Left / Steps) */}
        <div className="lg:col-span-7 space-y-6">
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="space-y-3">
                  <h4 className="text-sm uppercase tracking-[0.2em] font-mono text-melhek-blue font-bold">
                    Step 1A: Choose Project Category
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                    {PROJECT_CATEGORIES.map(category => {
                      const Icon = category.icon
                      const isSelected = selectedCategory === category.id
                      return (
                        <button
                          key={category.id}
                          type="button"
                          onClick={() => setSelectedCategory(category.id)}
                          className={`text-left p-4 rounded-xl glass transition-all border flex flex-col justify-between h-[120px] cursor-pointer group ${
                            isSelected 
                              ? 'border-melhek-blue bg-melhek-blue/5 shadow-[0_0_20px_rgba(127,169,255,0.05)]' 
                              : 'border-white/5 hover:border-white/10'
                          }`}
                        >
                          <div className="flex justify-between items-start w-full">
                            <div className={`p-2 rounded-lg border transition-colors ${
                              isSelected ? 'bg-melhek-blue text-melhek-navy border-melhek-blue/20' : 'bg-white/5 text-white/50 border-white/5 group-hover:text-white'
                            }`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            {isSelected && (
                              <div className="w-4 h-4 rounded-full bg-melhek-blue text-melhek-navy flex items-center justify-center">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                              </div>
                            )}
                          </div>
                          <div>
                            <h5 className="text-xs font-bold text-white mb-0.5">{category.name}</h5>
                            <p className="text-[10px] text-white/40 leading-normal line-clamp-1">{category.description}</p>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <h4 className="text-sm uppercase tracking-[0.2em] font-mono text-melhek-blue font-bold">
                    Step 1B: Select Business Sector
                  </h4>
                  <div className="relative">
                    <select
                      value={selectedSector}
                      onChange={(e) => setSelectedSector(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-xs text-white/80 focus:outline-none focus:border-melhek-blue transition-colors appearance-none cursor-pointer"
                    >
                      {BUSINESS_SECTORS.map(sector => (
                        <option key={sector.id} value={sector.id} className="bg-melhek-dark text-white">
                          {sector.name} — {sector.description}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-white/40">
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <h4 className="text-sm uppercase tracking-[0.2em] font-mono text-melhek-blue font-bold">
                  Step 2: Choose Complexity Threshold
                </h4>
                <div className="space-y-3">
                  {COMPLEXITY_LEVELS.map(level => (
                    <button
                      key={level.id}
                      type="button"
                      onClick={() => setSelectedComplexity(level.id)}
                      className={`text-left p-5 rounded-2xl glass transition-all border w-full flex items-center gap-5 cursor-pointer group ${
                        selectedComplexity === level.id 
                          ? 'border-melhek-blue bg-melhek-blue/5 shadow-[0_0_20px_rgba(127,169,255,0.1)]' 
                          : 'border-white/5 hover:border-white/20'
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-full border flex items-center justify-center flex-shrink-0 transition-colors ${
                        selectedComplexity === level.id ? 'border-melhek-blue text-melhek-blue' : 'border-white/20 text-transparent'
                      }`}>
                        <div className="w-3 h-3 rounded-full bg-current" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h5 className="text-sm font-bold text-white">{level.name}</h5>
                          <span className="text-[10px] font-mono px-2 py-0.5 bg-white/5 border border-white/5 rounded text-white/50">
                            {level.multiplier}x complexity scale
                          </span>
                        </div>
                        <p className="text-[11px] text-white/40 leading-relaxed max-w-lg">{level.description}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <h4 className="text-sm uppercase tracking-[0.2em] font-mono text-melhek-blue font-bold">
                  Step 3: Select Integration Requirements
                </h4>
                {activeCategoryData?.isCustom ? (
                  <div className="p-8 rounded-2xl border border-dashed border-white/10 text-center space-y-4">
                    <HelpCircle className="w-10 h-10 text-white/30 mx-auto" />
                    <div>
                      <h5 className="text-sm font-bold text-white">Advanced Architecture Options</h5>
                      <p className="text-[11px] text-white/40 mt-1 max-w-sm mx-auto leading-relaxed">
                        For {activeCategoryData.name} projects, integrations are custom-quoted during the blueprint mapping session. Proceed directly to the next step.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {FEATURES_LIST.map(feat => {
                      const isSelected = selectedFeatures.includes(feat.id)
                      return (
                        <button
                          key={feat.id}
                          type="button"
                          onClick={() => toggleFeature(feat.id)}
                          className={`text-left p-4 rounded-xl glass transition-all border flex flex-col justify-between cursor-pointer group ${
                            isSelected 
                              ? 'border-melhek-blue bg-melhek-blue/5 shadow-[0_0_20px_rgba(127,169,255,0.1)]' 
                              : 'border-white/5 hover:border-white/10'
                          }`}
                        >
                          <div className="flex justify-between items-start w-full mb-3">
                            <h5 className="text-xs font-bold text-white">{feat.name}</h5>
                            <div className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-colors ${
                              isSelected ? 'bg-melhek-blue border-melhek-blue text-melhek-navy' : 'border-white/20'
                            }`}>
                              {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                            </div>
                          </div>
                          <div>
                            <p className="text-[10px] text-white/30 leading-normal mb-2">{feat.description}</p>
                            <div className="flex justify-between items-center text-[10px] font-mono">
                              <span className="text-melhek-blue">+{formatPrice(feat.price)}</span>
                              <span className="text-white/40">+{feat.timelineAdd} wks</span>
                            </div>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                )}
              </motion.div>
            )}

            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <h4 className="text-sm uppercase tracking-[0.2em] font-mono text-melhek-blue font-bold">
                  Step 4: Register Estimate & Request Blueprint Session
                </h4>
                
                {state.success ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-8 rounded-2xl glass border-melhek-blue/20 bg-melhek-blue/[0.02] text-center space-y-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-melhek-blue/10 flex items-center justify-center mx-auto border border-melhek-blue/20">
                      <CheckCircle2 className="w-8 h-8 text-melhek-blue" />
                    </div>
                    <div>
                      <h5 className="text-lg font-bold text-white">Project Inquiry Captured</h5>
                      <p className="text-xs text-white/40 mt-1 max-w-sm mx-auto leading-relaxed">
                        Your configuration has been transmitted. A consulting engineer will follow up within 6 business hours.
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <form action={formAction} className="space-y-4">
                    {/* Hidden Estimate Details */}
                    <input type="hidden" name="projectType" value={activeCategoryData?.name || ''} />
                    <input type="hidden" name="complexity" value={`${activeComplexityData?.name} (${activeSectorData?.name})`} />
                    <input type="hidden" name="features" value={JSON.stringify(selectedFeatures.map(f => FEATURES_LIST.find(feat => feat.id === f)?.name || ''))} />
                    <input 
                      type="hidden" 
                      name="budgetRange" 
                      value={estimate.isCustom ? 'Custom Pricing Required' : (
                        currency === 'USD' 
                          ? `$${getMinDisplayPrice().toLocaleString()} - $${getMaxDisplayPrice().toLocaleString()} USD`
                          : `${getMinDisplayPrice().toLocaleString()} - ${getMaxDisplayPrice().toLocaleString()} ETB`
                      )} 
                    />
                    <input 
                      type="hidden" 
                      name="timelineRange" 
                      value={estimate.isCustom ? 'Custom Timeline' : `${estimate.minTimeline} - ${estimate.maxTimeline} Weeks`} 
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase tracking-wider font-mono text-white/40">Your Name *</label>
                        <input 
                          type="text" 
                          name="name" 
                          required 
                          placeholder="Client Name"
                          className="w-full bg-white/5 border border-white/5 focus:border-melhek-blue focus:outline-none rounded-xl px-4 py-3 text-xs text-white" 
                        />
                        {state.fieldErrors?.name && <span className="text-[10px] text-red-400">{state.fieldErrors.name}</span>}
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] uppercase tracking-wider font-mono text-white/40">Email Address *</label>
                        <input 
                          type="email" 
                          name="email" 
                          required 
                          placeholder="name@company.com"
                          className="w-full bg-white/5 border border-white/5 focus:border-melhek-blue focus:outline-none rounded-xl px-4 py-3 text-xs text-white" 
                        />
                        {state.fieldErrors?.email && <span className="text-[10px] text-red-400">{state.fieldErrors.email}</span>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase tracking-wider font-mono text-white/40">Phone Number</label>
                        <input 
                          type="tel" 
                          name="phone" 
                          placeholder="+..."
                          className="w-full bg-white/5 border border-white/5 focus:border-melhek-blue focus:outline-none rounded-xl px-4 py-3 text-xs text-white" 
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] uppercase tracking-wider font-mono text-white/40">Company / Organization</label>
                        <input 
                          type="text" 
                          name="company" 
                          placeholder="Organization Name"
                          className="w-full bg-white/5 border border-white/5 focus:border-melhek-blue focus:outline-none rounded-xl px-4 py-3 text-xs text-white" 
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-wider font-mono text-white/40">Project Summary / Special Notes (Optional)</label>
                      <textarea 
                        name="message" 
                        rows={3}
                        placeholder="Detail any timeline boundaries, specific features, or database sizes..."
                        className="w-full bg-white/5 border border-white/5 focus:border-melhek-blue focus:outline-none rounded-xl px-4 py-3 text-xs text-white resize-none" 
                      />
                    </div>

                    {state.error && (
                      <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-[11px] rounded-xl flex items-center gap-2">
                        <ShieldAlert className="w-4 h-4" />
                        {state.error}
                      </div>
                    )}

                    <button 
                      type="submit" 
                      disabled={isPending}
                      className="w-full btn-primary justify-center text-xs uppercase tracking-widest font-mono py-4 mt-2"
                    >
                      {isPending ? (
                        <div className="w-5 h-5 border-2 border-melhek-navy border-t-transparent rounded-full animate-spin" />
                      ) : (
                        'Request Project Blueprint Session →'
                      )}
                    </button>
                  </form>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Nav Controls */}
          <div className="flex justify-between items-center pt-6 border-t border-white/5">
            <button
              onClick={handlePrevStep}
              disabled={currentStep === 1}
              className="text-xs uppercase tracking-wider font-mono font-bold flex items-center gap-1 text-white/40 hover:text-white transition-colors disabled:opacity-20 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </button>
            
            {currentStep < 4 && (
              <button
                onClick={handleNextStep}
                className="text-xs uppercase tracking-wider font-mono font-bold flex items-center gap-1 text-melhek-blue hover:text-white transition-colors cursor-pointer"
              >
                Next Step <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Live Calculation Panel (Right) */}
        <div className="lg:col-span-5 glass rounded-2xl border-white/10 p-6 bg-white/[0.01] sticky top-28">
          <h4 className="text-xs uppercase tracking-[0.2em] font-mono text-white/40 font-bold mb-6 pb-2 border-b border-white/5">
            Investment Projection
          </h4>

          {/* Pricing display */}
          <div className="space-y-6">
            {estimate.isCustom ? (
              <div>
                <span className="text-[10px] uppercase tracking-widest font-mono text-white/30 block mb-1">Investment Framework</span>
                <span className="text-xl md:text-2xl font-display font-extrabold text-melhek-blue block">
                  Custom Quoted
                </span>
                <span className="text-[10px] text-white/30 leading-relaxed block mt-2">
                  Due to the highly specialized infrastructure required for {activeCategoryData?.name} integrations, pricing is tailored during an Architecture Review.
                </span>
              </div>
            ) : (
              <div>
                <span className="text-[10px] uppercase tracking-widest font-mono text-white/30 block mb-1">Indicative Investment Range</span>
                <div className="flex items-baseline gap-1 text-white">
                  <span className="text-2xl md:text-3xl font-display font-extrabold tracking-tighter">
                    {currency === 'USD' ? '$' : ''}{getMinDisplayPrice().toLocaleString()}
                  </span>
                  <span className="text-white/40 font-light mx-2">—</span>
                  <span className="text-2xl md:text-3xl font-display font-extrabold tracking-tighter">
                    {currency === 'USD' ? '$' : ''}{getMaxDisplayPrice().toLocaleString()}
                  </span>
                  <span className="text-xs text-melhek-blue uppercase tracking-widest font-mono font-bold ml-2">
                    {currency}
                  </span>
                </div>
                <span className="text-[10px] text-white/30 font-mono block mt-1">
                  Indicative value mapped to {activeCategoryData?.name} scale.
                </span>
              </div>
            )}

            {/* Timeline display */}
            <div>
              <span className="text-[10px] uppercase tracking-widest font-mono text-white/30 block mb-1">Estimated Timelines</span>
              <div className="flex items-center gap-2 text-white">
                <Calendar className="w-5 h-5 text-melhek-blue" />
                <span className="text-lg font-display font-bold">
                  {estimate.isCustom ? 'Custom Timeline' : `${estimate.minTimeline} – ${estimate.maxTimeline} Weeks`}
                </span>
              </div>
            </div>

            {/* Config details */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-3 text-[11px]">
              <div className="flex justify-between">
                <span className="text-white/40">Category</span>
                <span className="text-melhek-blue font-bold">{activeCategoryData?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/40">Business Sector</span>
                <span className="text-white font-medium">{activeSectorData?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/40">Complexity Threshold</span>
                <span className="text-white font-mono">{activeComplexityData?.name}</span>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-white/40">Key Integrations</span>
                <span className="text-white text-right max-w-[150px] font-mono line-clamp-2">
                  {selectedFeatures.length > 0 && !estimate.isCustom
                    ? selectedFeatures.map(f => FEATURES_LIST.find(feat => feat.id === f)?.name).join(', ')
                    : 'Standard Baseline Scope'
                  }
                </span>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-dashed border-white/5 bg-white/[0.01]">
              <span className="text-[10px] text-white/40 leading-relaxed block">
                💼 **Consultancy Path**: We recommend **{activeCategoryData?.recommendedDivision.split(" (")[0]}** for this profile. We will structure the technical blueprints during your initial consultation.
              </span>
            </div>

            {/* Blueprint Flowchart Canvas */}
            <div className="mt-6 pt-6 border-t border-white/5 space-y-4">
              <span className="text-[10px] uppercase tracking-widest font-mono text-white/30 block">
                Blueprint System Architecture
              </span>
              <div className="relative p-5 rounded-xl bg-black/40 border border-white/5 overflow-hidden flex flex-col gap-6 select-none min-h-[220px] justify-center">
                {/* Simulated connection lines */}
                <div className="absolute inset-x-1/2 top-10 bottom-10 w-[1px] bg-gradient-to-b from-melhek-blue/40 via-melhek-blue/25 to-melhek-blue/40 -translate-x-1/2 z-0" />
                
                {/* Horizontal lines for features */}
                {selectedFeatures.includes('payments') && (
                  <div className="absolute left-6 right-1/2 top-[108px] h-[1px] bg-gradient-to-r from-emerald-500/20 to-melhek-blue/40 z-0 animate-pulse" />
                )}
                {selectedFeatures.includes('realtime') && (
                  <div className="absolute right-6 left-1/2 top-[108px] h-[1px] bg-gradient-to-l from-indigo-500/20 to-melhek-blue/40 z-0 animate-pulse" />
                )}
                {selectedFeatures.includes('security') && (
                  <div className="absolute right-6 left-1/2 top-[176px] h-[1px] bg-gradient-to-l from-rose-500/20 to-melhek-blue/40 z-0 animate-pulse" />
                )}

                {/* Node 1: Client Front (Top) */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="px-3 py-1.5 rounded-lg bg-melhek-navy border border-white/10 text-[10px] font-mono text-white flex items-center gap-1.5 shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                    <Laptop className="w-3.5 h-3.5 text-melhek-blue" />
                    {(() => {
                      switch (selectedCategory) {
                        case 'business_website': return 'Marketing Frontend'
                        case 'professional_website': return 'Client Portal UI'
                        case 'digital_menu': return 'QR Menu Interface'
                        case 'business_system': return 'Cashier POS Screen'
                        case 'hospitality_solutions': return 'Hotel Reservation UI'
                        case 'enterprise_platforms': return 'Multi-Terminal Hub'
                        case 'ai_automation': return 'AI Chat Client'
                        default: return 'Web Frontend'
                      }
                    })()}
                  </div>
                  {/* Glowing down pulse */}
                  <div className="w-2 h-2 rounded-full bg-melhek-blue absolute -bottom-4 animate-ping" />
                </div>

                {/* Node 2: API Gateway / Core (Middle) */}
                <div className="relative z-10 flex items-center justify-center gap-6">
                  {/* Left Feature Node: Payments */}
                  {selectedFeatures.includes('payments') && (
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }} 
                      animate={{ scale: 1, opacity: 1 }}
                      className="px-2 py-1 rounded bg-[#061b11] border border-emerald-500/30 text-[9px] font-mono text-emerald-400 flex items-center gap-1 shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
                    >
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                      Payment Node
                    </motion.div>
                  )}

                  <div className="px-3 py-1.5 rounded-lg bg-melhek-navy border border-melhek-blue/30 text-[10px] font-mono text-melhek-blue flex items-center gap-1.5 shadow-[0_4px_12px_rgba(0,0,0,0.5),0_0_15px_rgba(127,169,255,0.15)]">
                    <Cpu className="w-3.5 h-3.5 text-melhek-blue animate-spin animate-duration-10000" />
                    {(() => {
                      switch (selectedCategory) {
                        case 'business_website': return 'Vercel Edge API'
                        case 'professional_website': return 'Secure Gateway API'
                        case 'digital_menu': return 'Kitchen routing hub'
                        case 'business_system': return 'POS Sync Service'
                        case 'hospitality_solutions': return 'Booking Controller'
                        case 'enterprise_platforms': return 'Clustered API Nodes'
                        case 'ai_automation': return 'NLP parser engine'
                        default: return 'Serverless Gateway'
                      }
                    })()}
                  </div>

                  {/* Right Feature Node: Realtime Notify */}
                  {selectedFeatures.includes('realtime') && (
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }} 
                      animate={{ scale: 1, opacity: 1 }}
                      className="px-2 py-1 rounded bg-[#0f1124] border border-indigo-500/30 text-[9px] font-mono text-indigo-400 flex items-center gap-1 shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
                    >
                      <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse" />
                      Notify Node
                    </motion.div>
                  )}
                </div>

                {/* Node 3: Database (Bottom) */}
                <div className="relative z-10 flex items-center justify-center gap-6">
                  <div className="px-3 py-1.5 rounded-lg bg-melhek-navy border border-white/10 text-[10px] font-mono text-white flex items-center gap-1.5 shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                    <Network className="w-3.5 h-3.5 text-melhek-blue" />
                    {(() => {
                      switch (selectedCategory) {
                        case 'business_website': return 'Static CMS Data'
                        case 'professional_website': return 'PostgreSQL Database'
                        case 'digital_menu': return 'Menu Schema Store'
                        case 'business_system': return 'Inventory Ledger'
                        case 'hospitality_solutions': return 'Room Occupancy DB'
                        case 'enterprise_platforms': return 'Centralized ERP Clustered DB'
                        case 'ai_automation': return 'Vector Database'
                        default: return 'Relational DB'
                      }
                    })()}
                  </div>

                  {/* Right Feature Node: Security Audit */}
                  {selectedFeatures.includes('security') && (
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }} 
                      animate={{ scale: 1, opacity: 1 }}
                      className="px-2 py-1 rounded bg-[#1f0d0e] border border-rose-500/30 text-[9px] font-mono text-rose-400 flex items-center gap-1 shadow-[0_2px_8px_rgba(0,0,0,0.5),0_0_10px_rgba(239,68,68,0.05)] absolute left-[calc(50%+90px)] animate-pulse"
                    >
                      <span className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-pulse" />
                      Crypto Guard
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
