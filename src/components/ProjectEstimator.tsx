'use client'

import { useState, useActionState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calculator, CheckCircle2, ChevronRight, ChevronLeft, Calendar, Landmark, ArrowRight, ShieldAlert, Cpu, Laptop, Hotel, Network, HelpCircle, Briefcase, ChevronDown } from 'lucide-react'
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
    description: 'Informational homepages, attorney profiles, organization calendars, and intake inquiry funnels.',
    recommendedDivision: 'Melhek Digital (01 / DIVISION)',
    isCustom: false
  },
  {
    id: 'professional_website',
    name: 'Professional Platform',
    icon: Laptop,
    baseMin: 60000,
    baseMax: 300000,
    timelineMin: 4,
    timelineMax: 12,
    description: 'Interactive client portals, client-facing dashboards, custom API connections, and automation workflows.',
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
    description: 'Interactive restaurant menus, QR codes, POS sync, and kitchen routing screens.',
    recommendedDivision: 'Melhek Hospitality (02 / DIVISION)',
    isCustom: false
  },
  {
    id: 'business_system',
    name: 'Business Management System',
    icon: Network,
    baseMin: 100000,
    baseMax: 800000,
    timelineMin: 6,
    timelineMax: 16,
    description: 'Pharmacy stock alerts, barcode scanning registers, member registration tables, and multi-branch database sync.',
    recommendedDivision: 'Melhek Business Systems (03 / DIVISION)',
    isCustom: false
  },
  {
    id: 'hospitality_solutions',
    name: 'Hospitality Tech Solution',
    icon: Hotel,
    baseMin: 0,
    baseMax: 0,
    timelineMin: 0,
    timelineMax: 0,
    description: 'Custom hotel booking engines, room availability planning calendars, and unified guest management operations.',
    recommendedDivision: 'Melhek Hospitality (02 / DIVISION)',
    isCustom: true
  },
  {
    id: 'enterprise_platforms',
    name: 'Enterprise Platform',
    icon: Briefcase,
    baseMin: 0,
    baseMax: 0,
    timelineMin: 0,
    timelineMax: 0,
    description: 'High-volume checkout networks, multi-branch replication protocols, secure data systems, and enterprise architecture.',
    recommendedDivision: 'Melhek Infrastructure (06 / DIVISION)',
    isCustom: true
  },
  {
    id: 'ai_automation',
    name: 'AI & Automation Platform',
    icon: Cpu,
    baseMin: 0,
    baseMax: 0,
    timelineMin: 0,
    timelineMax: 0,
    description: 'Repetitive task automation scripts, file scrapers, localized search engines, and business analysis models.',
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
    name: 'User Accounts & Roles Control',
    price: 12000,
    timelineAdd: 1,
    description: 'Secure customer login portals, role-based access, and admin permissions dashboards.'
  },
  {
    id: 'payments',
    name: 'Online Payments Integration',
    price: 18000,
    timelineAdd: 1,
    description: 'Integrations with Chapa, Telebirr, CBE, or international credit card systems.'
  },
  {
    id: 'realtime',
    name: 'Real-Time Alerts & Sync',
    price: 10000,
    timelineAdd: 1,
    description: 'Live order updates, immediate email/Telegram alerts, and instant dashboard synchronization.'
  },
  {
    id: 'multibranch',
    name: 'Multi-Branch Database Replication',
    price: 45000,
    timelineAdd: 2,
    description: 'Central cloud server syncing stock counts and checkout totals from multiple store locations.'
  },
  {
    id: 'analytics',
    name: 'Analytics & Reporting Grid',
    price: 22000,
    timelineAdd: 1.5,
    description: 'Custom visual graphs, downloadable spreadsheets, and automated sales metrics summaries.'
  },
  {
    id: 'security',
    name: 'Security Audit & Field Encryption',
    price: 30000,
    timelineAdd: 2,
    description: 'Rigorous penetration testing, database field-level encryption, and complete vulnerability patches.'
  }
]

export default function ProjectEstimator() {
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
            Design your custom system parameters and receive an indicative investment range and solution timeline.
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
                              <span className="text-melhek-blue">+{feat.price.toLocaleString()} ETB</span>
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
                      value={estimate.isCustom ? 'Custom Pricing Required' : `${estimate.minPrice.toLocaleString()} - ${estimate.maxPrice.toLocaleString()} ETB`} 
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
                          placeholder="+251 ..."
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
                    {estimate.minPrice.toLocaleString()}
                  </span>
                  <span className="text-white/40 font-light mx-2">—</span>
                  <span className="text-2xl md:text-3xl font-display font-extrabold tracking-tighter">
                    {estimate.maxPrice.toLocaleString()}
                  </span>
                  <span className="text-xs text-melhek-blue uppercase tracking-widest font-mono font-bold ml-2">ETB</span>
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
          </div>
        </div>
      </div>
    </section>
  )
}
