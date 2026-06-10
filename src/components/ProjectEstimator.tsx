'use client'

import { useState, useActionState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calculator, CheckCircle2, ChevronRight, ChevronLeft, Calendar, DollarSign, ArrowRight, ShieldAlert, Cpu, Laptop, Hotel, Network, HelpCircle } from 'lucide-react'
import { submitEstimateLead, ActionState } from '@/app/actions/leads'

interface ProjectType {
  id: string
  name: string
  icon: any
  baseMin: number
  baseMax: number
  timelineMin: number
  timelineMax: number
  description: string
  recommendedDivision: string
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

const PROJECT_TYPES: ProjectType[] = [
  {
    id: 'digital',
    name: 'Corporate / Brand Website',
    icon: Laptop,
    baseMin: 1200,
    baseMax: 3500,
    timelineMin: 2,
    timelineMax: 6,
    description: 'High-speed, premium online presence, attorney profiles, organization calendars, and conversion funnels.',
    recommendedDivision: 'Melhek Digital (01 / DIVISION)'
  },
  {
    id: 'hospitality',
    name: 'Hospitality Booking Platform',
    icon: Hotel,
    baseMin: 2800,
    baseMax: 8500,
    timelineMin: 6,
    timelineMax: 16,
    description: 'Hotel room booking engines, restaurant interactive menus, POS systems, and kitchen display routing.',
    recommendedDivision: 'Melhek Hospitality (02 / DIVISION)'
  },
  {
    id: 'business',
    name: 'Custom Business System',
    icon: Network,
    baseMin: 3500,
    baseMax: 12000,
    timelineMin: 4,
    timelineMax: 12,
    description: 'Pharmacy inventory trackers, barcode cashier desks, gym memberships, and multi-branch database sync.',
    recommendedDivision: 'Melhek Business Systems (03 / DIVISION)'
  },
  {
    id: 'ai',
    name: 'AI Automation / Dashboard',
    icon: Cpu,
    baseMin: 4500,
    baseMax: 15000,
    timelineMin: 6,
    timelineMax: 16,
    description: 'Repetitive document scrapers, localized search indexes, predictive sales dashboards, and automated routines.',
    recommendedDivision: 'Melhek AI Labs (04 / DIVISION)'
  }
]

const COMPLEXITY_LEVELS: ComplexityLevel[] = [
  {
    id: 'standard',
    name: 'Standard Operations',
    multiplier: 1.0,
    timelineAdd: 0,
    description: 'Ready-to-deploy structured layout, clean data entry, and optimized operations for single-branch setups.'
  },
  {
    id: 'enhanced',
    name: 'Enhanced Features',
    multiplier: 1.4,
    timelineAdd: 2,
    description: 'Custom APIs, payment integrations, external synchronization, and client-focused dashboards.'
  },
  {
    id: 'enterprise',
    name: 'Enterprise Grid',
    multiplier: 2.0,
    timelineAdd: 4,
    description: 'High concurrency traffic patterns, robust database replication, maximum security compliance, and custom protocols.'
  }
]

const FEATURES_LIST: FeatureItem[] = [
  {
    id: 'auth',
    name: 'User Accounts & Access Control',
    price: 450,
    timelineAdd: 1,
    description: 'Secure customer login portals, role-based access, and admin permissions dashboards.'
  },
  {
    id: 'payments',
    name: 'Online Payments & Checkout',
    price: 600,
    timelineAdd: 1,
    description: 'Integrations with Chapa, Telebirr, CBE, or international credit card systems.'
  },
  {
    id: 'realtime',
    name: 'Real-Time Sync / Notifications',
    price: 500,
    timelineAdd: 1,
    description: 'Live order updates, immediate email/Telegram alerts, and instant dashboard synchronization.'
  },
  {
    id: 'multibranch',
    name: 'Multi-Branch Database Sync',
    price: 1200,
    timelineAdd: 2,
    description: 'Central cloud server syncing stock counts and checkout totals from multiple store locations.'
  },
  {
    id: 'analytics',
    name: 'Analytics & Reporting Grid',
    price: 750,
    timelineAdd: 1.5,
    description: 'Custom visual graphs, downloadable spreadsheets, and automated sales metrics summaries.'
  },
  {
    id: 'security',
    name: 'Security Audit & Encryption',
    price: 1000,
    timelineAdd: 2,
    description: 'Rigorous penetration testing, database field-level encryption, and complete vulnerability patches.'
  }
]

export default function ProjectEstimator() {
  const [currentStep, setCurrentStep] = useState(1)
  
  // Selections State
  const [selectedType, setSelectedType] = useState<string>('digital')
  const [selectedComplexity, setSelectedComplexity] = useState<string>('standard')
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])

  // Calculated Output State
  const [estimate, setEstimate] = useState({
    minPrice: 0,
    maxPrice: 0,
    minTimeline: 0,
    maxTimeline: 0,
  })

  // Recalculate whenever selections change
  useEffect(() => {
    const pType = PROJECT_TYPES.find(p => p.id === selectedType)
    const cLevel = COMPLEXITY_LEVELS.find(c => c.id === selectedComplexity)

    if (!pType || !cLevel) return

    // Calculate base modified by complexity
    let minPrice = pType.baseMin * cLevel.multiplier
    let maxPrice = pType.baseMax * cLevel.multiplier
    let minTimeline = pType.timelineMin + cLevel.timelineAdd
    let maxTimeline = pType.timelineMax + cLevel.timelineAdd

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
      maxTimeline
    })
  }, [selectedType, selectedComplexity, selectedFeatures])

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

  const selectedProjType = PROJECT_TYPES.find(p => p.id === selectedType)
  const selectedCompLevel = COMPLEXITY_LEVELS.find(c => c.id === selectedComplexity)

  return (
    <section className="glass rounded-[32px] border-white/10 p-6 md:p-10 relative overflow-hidden bg-melhek-navy/60">
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-melhek-blue/5 blur-[80px] -z-10" />

      {/* Estimator Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-8 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2 text-melhek-blue mb-2">
            <Calculator className="w-5 h-5" />
            <span className="text-xs uppercase tracking-[0.3em] font-bold font-mono">Operations Tool</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-display font-extrabold text-white">
            Project Blueprint Estimator
          </h3>
          <p className="text-white/40 text-xs mt-1 max-w-md">
            Calculate instant budget ranges and delivery timelines mapped to your exact operational requirements.
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
                className="space-y-4"
              >
                <h4 className="text-sm uppercase tracking-[0.2em] font-mono text-melhek-blue font-bold">
                  Step 1: Select Infrastructure Target
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {PROJECT_TYPES.map(type => {
                    const Icon = type.icon
                    return (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setSelectedType(type.id)}
                        className={`text-left p-5 rounded-2xl glass transition-all border flex flex-col justify-between h-[160px] cursor-pointer group ${
                          selectedType === type.id 
                            ? 'border-melhek-blue bg-melhek-blue/5 shadow-[0_0_20px_rgba(127,169,255,0.1)]' 
                            : 'border-white/5 hover:border-white/20'
                        }`}
                      >
                        <div className="flex justify-between items-start w-full">
                          <div className={`p-2.5 rounded-lg border transition-colors ${
                            selectedType === type.id ? 'bg-melhek-blue text-melhek-navy border-melhek-blue/20' : 'bg-white/5 text-white/50 border-white/5 group-hover:text-white'
                          }`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          {selectedType === type.id && (
                            <div className="w-5 h-5 rounded-full bg-melhek-blue text-melhek-navy flex items-center justify-center">
                              <CheckCircle2 className="w-4.5 h-4.5" />
                            </div>
                          )}
                        </div>
                        <div>
                          <h5 className="text-sm font-bold text-white mb-1">{type.name}</h5>
                          <p className="text-[11px] text-white/40 leading-normal line-clamp-2">{type.description}</p>
                        </div>
                      </button>
                    )
                  })}
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
                  Step 2: Determine Scope Complexity
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
                            {level.multiplier}x multiplier
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
                  Step 3: Select Advanced Integrations
                </h4>
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
                            <span className="text-melhek-blue">+${feat.price}</span>
                            <span className="text-white/40">+{feat.timelineAdd} wks</span>
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </div>
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
                  Step 4: Lock In Estimate & Request Contact
                </h4>
                
                {state.success ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-8 rounded-2xl glass border-melhek-blue/20 bg-melhek-blue/[0.02] text-center space-y-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-melhek-blue/10 flex items-center justify-center mx-auto border border-melhek-blue/20">
                      <CheckCircle2 className="w-8 h-8 text-melhek-blue animate-pulse" />
                    </div>
                    <div>
                      <h5 className="text-lg font-bold text-white">Estimate Logged Successfully</h5>
                      <p className="text-xs text-white/40 mt-1 max-w-sm mx-auto leading-relaxed">
                        Your configuration is queued. A Melhek engineer will contact you at your email in under 6 business hours.
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <form action={formAction} className="space-y-4">
                    {/* Hidden Estimate Details */}
                    <input type="hidden" name="projectType" value={selectedProjType?.name || ''} />
                    <input type="hidden" name="complexity" value={selectedCompLevel?.name || ''} />
                    <input type="hidden" name="features" value={JSON.stringify(selectedFeatures.map(f => FEATURES_LIST.find(feat => feat.id === f)?.name || ''))} />
                    <input type="hidden" name="budgetRange" value={`$${estimate.minPrice} - $${estimate.maxPrice}`} />
                    <input type="hidden" name="timelineRange" value={`${estimate.minTimeline} - ${estimate.maxTimeline} Weeks`} />

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
                        <label className="text-[10px] uppercase tracking-wider font-mono text-white/40">Phone Number (Optional)</label>
                        <input 
                          type="tel" 
                          name="phone" 
                          placeholder="+251 ..."
                          className="w-full bg-white/5 border border-white/5 focus:border-melhek-blue focus:outline-none rounded-xl px-4 py-3 text-xs text-white" 
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] uppercase tracking-wider font-mono text-white/40">Company / Entity (Optional)</label>
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
                        placeholder="Share any special integration needs or design directions..."
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
                        'Secure Calculated Estimate →'
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
            Live Calculation Projections
          </h4>

          {/* Pricing display */}
          <div className="space-y-6">
            <div>
              <span className="text-[10px] uppercase tracking-widest font-mono text-white/30 block mb-1">Indicative Budget Range</span>
              <div className="flex items-baseline gap-1 text-white">
                <DollarSign className="w-6 h-6 text-melhek-blue self-center -mr-1" />
                <span className="text-3xl md:text-4xl font-display font-extrabold tracking-tighter">
                  {estimate.minPrice.toLocaleString()}
                </span>
                <span className="text-white/40 font-light mx-2">—</span>
                <span className="text-3xl md:text-4xl font-display font-extrabold tracking-tighter">
                  {estimate.maxPrice.toLocaleString()}
                </span>
                <span className="text-xs text-white/40 uppercase tracking-widest font-mono font-bold ml-2">USD</span>
              </div>
              <span className="text-[10px] text-white/30 font-mono block mt-1">
                Equivalent to ~ {Math.round(estimate.minPrice * 120).toLocaleString()} – {Math.round(estimate.maxPrice * 120).toLocaleString()} ETB
              </span>
            </div>

            {/* Timeline display */}
            <div>
              <span className="text-[10px] uppercase tracking-widest font-mono text-white/30 block mb-1">Estimated Delivery</span>
              <div className="flex items-center gap-2 text-white">
                <Calendar className="w-5 h-5 text-melhek-blue" />
                <span className="text-xl font-display font-extrabold">{estimate.minTimeline} – {estimate.maxTimeline} Weeks</span>
              </div>
            </div>

            {/* Config details */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-3 text-[11px]">
              <div className="flex justify-between">
                <span className="text-white/40">Target Division</span>
                <span className="text-melhek-blue font-bold">{selectedProjType?.recommendedDivision.split(" (")[0]}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/40">Complexity Multiplier</span>
                <span className="text-white font-mono">{selectedCompLevel?.name} ({selectedCompLevel?.multiplier}x)</span>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-white/40">Feature Integrations</span>
                <span className="text-white text-right max-w-[150px] font-mono line-clamp-2">
                  {selectedFeatures.length > 0 
                    ? selectedFeatures.map(f => FEATURES_LIST.find(feat => feat.id === f)?.name).join(', ')
                    : 'Core Blueprint Only'
                  }
                </span>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-dashed border-white/5 bg-white/[0.01]">
              <span className="text-[10px] text-white/40 leading-relaxed block">
                💡 **Pro Tip**: Lock in this configuration setup. An engineer will review these specific modules prior to your blueprint session to save time.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
