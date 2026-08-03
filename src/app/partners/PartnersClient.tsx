'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { 
  Briefcase, Globe, Users, TrendingUp, ShieldCheck, 
  Settings, Zap, CheckCircle2, ChevronRight, BarChart, 
  ArrowRight, Sparkles, Building2, Terminal, Code, 
  Server, Fingerprint, Coins, Rocket
} from 'lucide-react'

// ── TYPES & INTERFACES ──
type ActiveTab = 'welcome' | 'calculator' | 'intake' | 'success'
type PartnershipModel = 'whitelabel' | 'referral'

interface ServiceOption {
  id: string
  name: string
  baseCost: number
  icon: React.ComponentType<{ className?: string }>
}

const SERVICE_OPTIONS: ServiceOption[] = [
  { id: 'web', name: 'Premium Corporate Websites', baseCost: 35000, icon: Globe },
  { id: 'ecommerce', name: 'E-Commerce & Booking Engines', baseCost: 55000, icon: Zap },
  { id: 'crm', name: 'Custom CRM / Operations Dashboards', baseCost: 75000, icon: Users },
  { id: 'ai', name: 'AI Chatbots & Automations', baseCost: 45000, icon: Terminal }
]

const PARTNERSHIP_FAQ = [
  {
    q: 'How does the 100% White-Label model work?',
    a: 'We act as your silent engineering backroom. We never contact your client directly, our name is never on the code, and we use your agency\'s email addresses if client contact is ever required.'
  },
  {
    q: 'Can I set my own markup prices?',
    a: 'Absolutely. Under the white-label model, we give you a fixed base wholesale cost for a project. You are free to markup the price by 50%, 100%, or whatever your target market supports.'
  },
  {
    q: 'What if I just want to refer a client to you?',
    a: 'Use our Strategic Referral model. You introduce the client to Melhek, we handle all the sales, scoping, and project management directly, and we pay you a 10% cash commission upon the initial deposit.'
  },
  {
    q: 'How is code and intellectual property handled?',
    a: 'For white-label projects, all intellectual property, source code, and deployment assets are completely owned by your agency. We sign strict Non-Disclosure Agreements (NDAs) to protect your agency.'
  }
]

export default function PartnersClient() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('welcome')
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // Calculator State
  const [calcClients, setCalcClients] = useState<number>(3)
  const [calcMarkup, setCalcMarkup] = useState<number>(100) // 100% default markup
  const [calcServices, setCalcServices] = useState<string[]>(['web', 'ai'])

  // Intake Form State
  const [formData, setFormData] = useState({
    agencyName: '',
    website: '',
    contactName: '',
    email: '',
    phone: '',
    partnershipModel: 'whitelabel' as PartnershipModel,
    primaryInterest: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Derived Calculator Values
  const totalBaseCost = calcServices.reduce((sum, serviceId) => {
    const service = SERVICE_OPTIONS.find(s => s.id === serviceId)
    return sum + (service ? service.baseCost : 0)
  }, 0)
  
  const monthlyRevenue = totalBaseCost * calcClients * (1 + (calcMarkup / 100))
  const monthlyProfit = (totalBaseCost * calcClients * (calcMarkup / 100))
  const referralProfit = (totalBaseCost * calcClients) * 0.10 // 10% commission

  const handleServiceToggle = (id: string) => {
    setCalcServices(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate network request
    setTimeout(() => {
      setIsSubmitting(false)
      setActiveTab('success')
    }, 1500)
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-[#050505] text-melhek-text">
      {/* ── Fixed Premium Navigation ── */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-[#050505]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-melhek-brand to-blue-600 flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">Melhek <span className="text-white/40">For Agencies</span></h1>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <button onClick={() => setActiveTab('welcome')} className={`${activeTab === 'welcome' ? 'text-melhek-brand' : 'text-white/60 hover:text-white'} transition-colors`}>Models</button>
            <button onClick={() => setActiveTab('calculator')} className={`${activeTab === 'calculator' ? 'text-melhek-brand' : 'text-white/60 hover:text-white'} transition-colors`}>Revenue Calculator</button>
            <button 
              onClick={() => setActiveTab('intake')}
              className="px-6 py-2.5 rounded-full bg-white text-black hover:bg-gray-200 transition-colors font-semibold flex items-center gap-2"
            >
              Apply as Partner <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-24 px-6">
        <div className="max-w-6xl mx-auto">
          
          <AnimatePresence mode="wait">
            
            {/* ── STAGE 1: WELCOME & MODELS ── */}
            {activeTab === 'welcome' && (
              <motion.div
                key="welcome"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-24"
              >
                {/* Hero Section */}
                <div className="text-center max-w-4xl mx-auto space-y-8 pt-12">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-melhek-brand/10 border border-melhek-brand/20 text-melhek-brand text-sm font-medium"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Exclusive Digital Marketing Agency Program</span>
                  </motion.div>
                  <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight">
                    Scale Your Agency. <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-melhek-brand via-blue-500 to-purple-500">
                      Zero Technical Overhead.
                    </span>
                  </h1>
                  <p className="text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
                    Partner with Melhek Technologies to offer your clients ultra-premium web development, custom software, and AI automation—all perfectly executed under your agency's brand.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
                    <button 
                      onClick={() => setActiveTab('intake')}
                      className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-black hover:bg-gray-200 transition-colors font-bold text-lg flex items-center justify-center gap-2 group"
                    >
                      Become a Partner 
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button 
                      onClick={() => setActiveTab('calculator')}
                      className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors font-bold text-lg flex items-center justify-center gap-2"
                    >
                      <BarChart className="w-5 h-5" />
                      Calculate Profit Margin
                    </button>
                  </div>
                </div>

                {/* ── HOW IT WORKS: THE VISUAL MANUAL ── */}
                <div className="max-w-5xl mx-auto py-12">
                  <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-white mb-4">How Partnership Works</h2>
                    <p className="text-white/60">A frictionless onboarding process. No complex manuals required.</p>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-6 relative">
                    {/* Connecting Line */}
                    <div className="hidden md:block absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-y-1/2 z-0" />
                    
                    <div className="relative z-10 bg-[#0a0a0a] p-8 rounded-3xl border border-white/10 text-center space-y-4 hover:border-melhek-brand transition-colors">
                      <div className="w-14 h-14 mx-auto rounded-full bg-white/5 flex items-center justify-center border border-white/10 text-xl font-bold text-white">1</div>
                      <h3 className="text-xl font-bold text-white">Calculate Margins</h3>
                      <p className="text-sm text-white/60">Use our Profit Simulator to visualize exactly how much revenue your agency keeps.</p>
                    </div>

                    <div className="relative z-10 bg-[#0a0a0a] p-8 rounded-3xl border border-white/10 text-center space-y-4 hover:border-melhek-brand transition-colors">
                      <div className="w-14 h-14 mx-auto rounded-full bg-melhek-brand/20 flex items-center justify-center border border-melhek-brand/30 text-xl font-bold text-melhek-brand shadow-[0_0_20px_rgba(33,150,243,0.3)]">2</div>
                      <h3 className="text-xl font-bold text-white">Submit Application</h3>
                      <p className="text-sm text-white/60">Fill out our sleek Intake Wizard with your agency details and tech requirements.</p>
                    </div>

                    <div className="relative z-10 bg-[#0a0a0a] p-8 rounded-3xl border border-white/10 text-center space-y-4 hover:border-melhek-brand transition-colors">
                      <div className="w-14 h-14 mx-auto rounded-full bg-green-500/10 flex items-center justify-center border border-green-500/20 text-xl font-bold text-green-400">3</div>
                      <h3 className="text-xl font-bold text-white">Sign NDA & Scale</h3>
                      <p className="text-sm text-white/60">We sign a mutual NDA to protect your IP. You start selling; we start building.</p>
                    </div>
                  </div>
                </div>

                {/* The Two Models */}
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Model 1: White Label */}
                  <div className="relative group rounded-3xl bg-gradient-to-b from-white/[0.08] to-transparent p-[1px] overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-melhek-brand/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <div className="relative h-full bg-[#0a0a0a] rounded-[23px] p-8 md:p-12 space-y-8">
                      <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center">
                        <Fingerprint className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-3xl font-bold text-white mb-4">100% White-Label</h3>
                        <p className="text-white/60 leading-relaxed">
                          We become your silent engineering department. We build the systems, you present them to your clients under your own agency branding. Set your own pricing and keep 100% of the markup margins.
                        </p>
                      </div>
                      <ul className="space-y-4">
                        {[
                          'You control the client relationship completely',
                          'Set your own retail pricing and markup margins',
                          'We sign strict Non-Disclosure Agreements (NDAs)',
                          'Full IP & code ownership transferred to you'
                        ].map((feature, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-melhek-brand shrink-0 mt-0.5" />
                            <span className="text-white/80">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Model 2: Strategic Referral */}
                  <div className="relative group rounded-3xl bg-gradient-to-b from-white/[0.08] to-transparent p-[1px] overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <div className="relative h-full bg-[#0a0a0a] rounded-[23px] p-8 md:p-12 space-y-8">
                      <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center">
                        <Coins className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-3xl font-bold text-white mb-4">Strategic Referral</h3>
                        <p className="text-white/60 leading-relaxed">
                          You introduce the client to us, and we take it from there. We handle the scoping, technical sales, development, and support directly as Melhek Technologies.
                        </p>
                      </div>
                      <ul className="space-y-4">
                        {[
                          'Melhek handles all client communication & support',
                          'We scope, pitch, and close the technical sale',
                          'You earn a fixed 10% cash commission on the contract',
                          'Zero project management overhead for your agency'
                        ].map((feature, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                            <span className="text-white/80">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* FAQ Section */}
                <div className="max-w-3xl mx-auto space-y-12">
                  <div className="text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">Partnership FAQ</h2>
                    <p className="text-white/60">Everything you need to know about partnering with Melhek.</p>
                  </div>
                  <div className="space-y-4">
                    {PARTNERSHIP_FAQ.map((faq, idx) => (
                      <div key={idx} className="p-6 rounded-2xl bg-white/5 border border-white/10">
                        <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-3">
                          <span className="text-melhek-brand">Q.</span> {faq.q}
                        </h4>
                        <p className="text-white/70 leading-relaxed pl-7">{faq.a}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </motion.div>
            )}

            {/* ── STAGE 2: AGENCY REVENUE CALCULATOR ── */}
            {activeTab === 'calculator' && (
              <motion.div
                key="calculator"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="max-w-5xl mx-auto"
              >
                <div className="text-center mb-16 pt-8">
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Profit Growth Simulator</h2>
                  <p className="text-xl text-white/60">Calculate your agency's potential revenue scaling with our White-Label engineering.</p>
                </div>

                <div className="grid lg:grid-cols-5 gap-8">
                  {/* Controls */}
                  <div className="lg:col-span-3 space-y-10">
                    {/* Services Selector */}
                    <div className="p-8 rounded-3xl bg-white/5 border border-white/10 space-y-6">
                      <h3 className="text-xl font-bold text-white flex items-center gap-3">
                        <Code className="w-5 h-5 text-melhek-brand" />
                        What systems do you want to offer?
                      </h3>
                      <div className="grid sm:grid-cols-2 gap-4">
                        {SERVICE_OPTIONS.map(service => {
                          const isSelected = calcServices.includes(service.id)
                          const Icon = service.icon
                          return (
                            <button
                              key={service.id}
                              onClick={() => handleServiceToggle(service.id)}
                              className={`p-4 rounded-xl border text-left transition-all ${
                                isSelected 
                                  ? 'bg-melhek-brand/10 border-melhek-brand shadow-[0_0_20px_rgba(33,150,243,0.15)]' 
                                  : 'bg-black/50 border-white/10 hover:border-white/30'
                              }`}
                            >
                              <div className="flex items-start gap-3">
                                <div className={`p-2 rounded-lg ${isSelected ? 'bg-melhek-brand text-white' : 'bg-white/10 text-white/60'}`}>
                                  <Icon className="w-4 h-4" />
                                </div>
                                <div>
                                  <div className={`font-semibold ${isSelected ? 'text-white' : 'text-white/80'}`}>{service.name}</div>
                                  <div className="text-sm text-white/50 mt-1">Wholesale: {service.baseCost.toLocaleString()} ETB</div>
                                </div>
                              </div>
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    {/* Sliders */}
                    <div className="p-8 rounded-3xl bg-white/5 border border-white/10 space-y-10">
                      
                      {/* Clients per month */}
                      <div className="space-y-4">
                        <div className="flex justify-between items-end">
                          <h3 className="text-lg font-bold text-white">Clients per Month</h3>
                          <div className="text-2xl font-bold text-melhek-brand">{calcClients}</div>
                        </div>
                        <input 
                          type="range" 
                          min="1" max="20" 
                          value={calcClients}
                          onChange={(e) => setCalcClients(Number(e.target.value))}
                          className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-melhek-brand"
                        />
                        <div className="flex justify-between text-xs text-white/40">
                          <span>1 Client</span>
                          <span>20 Clients</span>
                        </div>
                      </div>

                      {/* Markup Margin */}
                      <div className="space-y-4">
                        <div className="flex justify-between items-end">
                          <h3 className="text-lg font-bold text-white">Your Retail Markup Margin</h3>
                          <div className="text-2xl font-bold text-green-400">+{calcMarkup}%</div>
                        </div>
                        <input 
                          type="range" 
                          min="0" max="300" step="10"
                          value={calcMarkup}
                          onChange={(e) => setCalcMarkup(Number(e.target.value))}
                          className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-green-400"
                        />
                        <div className="flex justify-between text-xs text-white/40">
                          <span>0% Markup (Cost)</span>
                          <span>300% Markup (Premium)</span>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Results Panel */}
                  <div className="lg:col-span-2 space-y-6">
                    <div className="p-8 rounded-3xl bg-gradient-to-br from-melhek-brand/20 via-blue-900/40 to-[#0a0a0a] border border-melhek-brand/30 relative overflow-hidden">
                      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-melhek-brand/30 blur-[80px] rounded-full pointer-events-none" />
                      
                      <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
                        <TrendingUp className="w-6 h-6 text-melhek-brand" />
                        White-Label Projection
                      </h3>
                      
                      <div className="space-y-6">
                        <div>
                          <div className="text-sm font-medium text-white/60 mb-1">Your Total Retail Revenue</div>
                          <div className="text-3xl font-bold text-white">{(monthlyRevenue).toLocaleString()} ETB <span className="text-lg font-normal text-white/40">/mo</span></div>
                        </div>

                        <div className="w-full h-px bg-white/10" />
                        
                        <div>
                          <div className="text-sm font-medium text-white/60 mb-1">Melhek Wholesale Cost</div>
                          <div className="text-xl font-medium text-white/80">{(totalBaseCost * calcClients).toLocaleString()} ETB <span className="text-sm text-white/40">/mo</span></div>
                        </div>

                        <div className="w-full h-px bg-white/10" />

                        <div>
                          <div className="text-sm font-medium text-white/60 mb-2">Your Pure Agency Profit</div>
                          <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600 drop-shadow-sm">
                            {(monthlyProfit).toLocaleString()} <span className="text-2xl font-bold text-green-500/80">ETB</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 rounded-3xl bg-white/5 border border-white/10 space-y-4">
                      <h4 className="font-semibold text-white/80 flex items-center gap-2">
                        <Coins className="w-4 h-4 text-purple-400" />
                        Referral Model Alternative
                      </h4>
                      <p className="text-sm text-white/60">If you don't want to manage the client at all, refer them to us and earn:</p>
                      <div className="text-2xl font-bold text-purple-400">
                        {referralProfit.toLocaleString()} ETB <span className="text-sm font-normal text-white/40">/mo</span>
                      </div>
                    </div>

                    <button 
                      onClick={() => setActiveTab('intake')}
                      className="w-full py-4 rounded-xl bg-white text-black hover:bg-gray-200 transition-colors font-bold text-lg flex items-center justify-center gap-2"
                    >
                      Start Partnership <ArrowRight className="w-5 h-5" />
                    </button>

                  </div>
                </div>
              </motion.div>
            )}

            {/* ── STAGE 3: INTAKE WIZARD ── */}
            {activeTab === 'intake' && (
              <motion.div
                key="intake"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className="max-w-3xl mx-auto"
              >
                <div className="bg-[#0a0a0a] border border-white/10 rounded-[2rem] p-8 md:p-12 relative overflow-hidden shadow-2xl">
                  {/* Decorative blur */}
                  <div className="absolute -top-20 -right-20 w-64 h-64 bg-melhek-brand/20 blur-[100px] rounded-full pointer-events-none" />
                  
                  <div className="mb-10 text-center relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center mx-auto mb-6">
                      <ShieldCheck className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Agency Alliance Application</h2>
                    <p className="text-white/60">Join the exclusive network of agencies scaling with Melhek Technologies.</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-white/80">Agency Name</label>
                        <input 
                          type="text" required
                          value={formData.agencyName}
                          onChange={e => setFormData({...formData, agencyName: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-melhek-brand focus:ring-1 focus:ring-melhek-brand outline-none transition-all"
                          placeholder="Apex Digital..."
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-white/80">Agency Website</label>
                        <input 
                          type="url" required
                          value={formData.website}
                          onChange={e => setFormData({...formData, website: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-melhek-brand focus:ring-1 focus:ring-melhek-brand outline-none transition-all"
                          placeholder="https://..."
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-white/80">Contact Person</label>
                        <input 
                          type="text" required
                          value={formData.contactName}
                          onChange={e => setFormData({...formData, contactName: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-melhek-brand focus:ring-1 focus:ring-melhek-brand outline-none transition-all"
                          placeholder="Full Name"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-white/80">Work Email</label>
                        <input 
                          type="email" required
                          value={formData.email}
                          onChange={e => setFormData({...formData, email: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-melhek-brand focus:ring-1 focus:ring-melhek-brand outline-none transition-all"
                          placeholder="name@agency.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <label className="text-sm font-medium text-white/80">Preferred Partnership Model</label>
                      <div className="grid md:grid-cols-2 gap-4">
                        <button
                          type="button"
                          onClick={() => setFormData({...formData, partnershipModel: 'whitelabel'})}
                          className={`p-4 rounded-xl border text-left transition-all ${
                            formData.partnershipModel === 'whitelabel'
                              ? 'bg-melhek-brand/10 border-melhek-brand'
                              : 'bg-white/5 border-white/10 hover:border-white/30'
                          }`}
                        >
                          <div className="font-bold text-white mb-1">100% White-Label</div>
                          <div className="text-sm text-white/60">You own the client relationship. We build in the background.</div>
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormData({...formData, partnershipModel: 'referral'})}
                          className={`p-4 rounded-xl border text-left transition-all ${
                            formData.partnershipModel === 'referral'
                              ? 'bg-purple-500/10 border-purple-500'
                              : 'bg-white/5 border-white/10 hover:border-white/30'
                          }`}
                        >
                          <div className="font-bold text-white mb-1">Strategic Referral</div>
                          <div className="text-sm text-white/60">You refer the client to us. You earn a 10% commission.</div>
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white/80">Primary Goal or Pain Point</label>
                      <textarea 
                        required rows={3}
                        value={formData.primaryInterest}
                        onChange={e => setFormData({...formData, primaryInterest: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-melhek-brand focus:ring-1 focus:ring-melhek-brand outline-none transition-all resize-none"
                        placeholder="E.g., We have clients asking for custom booking engines, but we lack the backend engineers..."
                      />
                    </div>

                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-xl bg-white text-black hover:bg-gray-200 transition-colors font-bold text-lg flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 rounded-full border-2 border-black/30 border-t-black animate-spin" />
                          Submitting Application...
                        </>
                      ) : (
                        <>Submit Partnership Application <ArrowRight className="w-5 h-5" /></>
                      )}
                    </button>

                  </form>
                </div>
              </motion.div>
            )}

            {/* ── STAGE 4: SUCCESS ── */}
            {activeTab === 'success' && (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl mx-auto text-center py-20"
              >
                <div className="w-24 h-24 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mx-auto mb-8">
                  <CheckCircle2 className="w-12 h-12 text-green-400" />
                </div>
                <h2 className="text-4xl font-bold text-white mb-4">Application Received.</h2>
                <p className="text-xl text-white/60 mb-10">
                  Thank you, {formData.contactName}. Our partnership team will review your application for <strong className="text-white">{formData.agencyName}</strong> and contact you within 24 hours to schedule our alignment call.
                </p>
                <button 
                  onClick={() => setActiveTab('welcome')}
                  className="px-8 py-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors font-semibold"
                >
                  Return to Partnership Overview
                </button>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </main>

    </div>
  )
}
