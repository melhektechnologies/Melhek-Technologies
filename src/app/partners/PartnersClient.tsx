'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
  ArrowRight,
  BarChart3,
  Building2,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Code,
  Coins,
  Fingerprint,
  Globe,
  HelpCircle,
  ShieldCheck,
  Sparkles,
  Terminal,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react'

type ActiveTab = 'welcome' | 'calculator' | 'intake' | 'success'
type PartnershipModel = 'whitelabel' | 'referral'

interface ServiceOption {
  id: string
  name: string
  baseCost: number
  icon: React.ComponentType<{ className?: string }>
}

const SERVICE_OPTIONS: ServiceOption[] = [
  { id: 'web', name: 'Premium corporate websites', baseCost: 35000, icon: Globe },
  { id: 'ecommerce', name: 'E-commerce & booking engines', baseCost: 55000, icon: Zap },
  { id: 'crm', name: 'Custom CRM / operations dashboards', baseCost: 75000, icon: Users },
  { id: 'ai', name: 'AI chatbots & automations', baseCost: 45000, icon: Terminal },
]

const PARTNERSHIP_FAQ = [
  {
    id: 'f1',
    q: 'How does white-label work?',
    a: 'We act as your silent engineering team. We never contact your client as Melhek, our name does not appear on deliverables, and if contact is ever required we use your agency email addresses under your direction.',
  },
  {
    id: 'f2',
    q: 'Can I set my own prices?',
    a: 'Yes. Under white-label you receive a fixed wholesale cost. You set retail pricing and keep the markup — 50%, 100%, or whatever your market supports.',
  },
  {
    id: 'f3',
    q: 'What if I only want to refer clients?',
    a: 'Use Strategic Referral. You introduce the client to Melhek. We handle sales, scoping, delivery, and support. You earn 10% cash commission on the initial contract deposit.',
  },
  {
    id: 'f4',
    q: 'Who owns the code and IP?',
    a: 'On white-label projects, IP, source code, and deployment assets transfer to your agency. We sign NDAs before work begins.',
  },
  {
    id: 'f5',
    q: 'Will Melhek ever poach my clients?',
    a: 'No. White-label engagements are bound by NDA and non-solicit terms. Your client relationship stays yours. Referral clients are Melhek clients by design — you are compensated via commission, not retained ownership.',
  },
  {
    id: 'f6',
    q: 'What happens after I apply?',
    a: 'We review within one business day, schedule a short alignment call, agree on model and wholesale rates, sign NDA, then you can sell or refer immediately.',
  },
]

const TABS: ActiveTab[] = ['welcome', 'calculator', 'intake']
const TAB_LABELS: Record<Exclude<ActiveTab, 'success'>, string> = {
  welcome: 'Models',
  calculator: 'Calculator',
  intake: 'Apply',
}

export default function PartnersClient() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('welcome')
  const [openFaq, setOpenFaq] = useState<string | null>('f1')

  const [calcClients, setCalcClients] = useState(3)
  const [calcMarkup, setCalcMarkup] = useState(100)
  const [calcServices, setCalcServices] = useState<string[]>(['web', 'ai'])

  const [formData, setFormData] = useState({
    agencyName: '',
    website: '',
    contactName: '',
    email: '',
    phone: '',
    partnershipModel: 'whitelabel' as PartnershipModel,
    primaryInterest: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const totalBaseCost = calcServices.reduce((sum, serviceId) => {
    const service = SERVICE_OPTIONS.find((s) => s.id === serviceId)
    return sum + (service ? service.baseCost : 0)
  }, 0)

  const monthlyRevenue = totalBaseCost * calcClients * (1 + calcMarkup / 100)
  const monthlyProfit = totalBaseCost * calcClients * (calcMarkup / 100)
  const referralProfit = totalBaseCost * calcClients * 0.1

  const tabIndex = TABS.indexOf(activeTab === 'success' ? 'intake' : activeTab)

  const handleServiceToggle = (id: string) => {
    setCalcServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError(null)
    try {
      const res = await fetch('/api/partners/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Submission failed.')
      }
      setActiveTab('success')
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const SectionHeader = ({
    kicker,
    title,
    subtitle,
  }: {
    kicker: string
    title: string
    subtitle?: string
  }) => (
    <div className="text-center mb-10 space-y-3 max-w-3xl mx-auto">
      <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-melhek-blue font-bold">
        {kicker}
      </span>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm sm:text-base text-white/65 font-light leading-relaxed">{subtitle}</p>
      )}
    </div>
  )

  return (
    <div className="min-h-screen bg-melhek-dark text-white selection:bg-melhek-blue selection:text-melhek-navy font-sans relative overflow-x-hidden">
      <div className="grain-overlay" aria-hidden />
      <div className="digital-grid" aria-hidden />

      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-melhek-navy/90 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-[4.5rem] flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-9 h-9 rounded-xl bg-melhek-blue/15 border border-melhek-blue/40 flex items-center justify-center text-melhek-blue">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="leading-tight">
              <span className="font-display font-extrabold text-sm tracking-tight block">Melhek</span>
              <span className="text-[10px] font-mono text-white/45 uppercase tracking-wider">
                Agency Partner Program
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-2">
            {TABS.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-mono uppercase tracking-wider transition-colors ${
                  activeTab === tab || (activeTab === 'success' && tab === 'intake')
                    ? 'bg-melhek-blue/15 text-melhek-blue border border-melhek-blue/30'
                    : 'text-white/50 hover:text-white border border-transparent'
                }`}
              >
                {TAB_LABELS[tab]}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setActiveTab('intake')}
              className="btn-primary !px-5 !py-2.5 !text-[11px] font-mono uppercase tracking-wider ml-1"
            >
              Apply <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            type="button"
            onClick={() => setActiveTab('intake')}
            className="md:hidden btn-primary !px-4 !py-2 !text-[10px] font-mono uppercase tracking-wider"
          >
            Apply
          </button>
        </div>

        {activeTab !== 'success' && (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-3">
            <div className="flex gap-1">
              {TABS.map((tab, i) => (
                <div
                  key={tab}
                  className={`h-1 flex-1 rounded-full transition-colors ${
                    i <= tabIndex ? 'bg-melhek-blue' : 'bg-white/10'
                  }`}
                />
              ))}
            </div>
            <p className="mt-2 text-[10px] font-mono text-white/40 uppercase tracking-wider">
              {TAB_LABELS[activeTab === 'success' ? 'intake' : activeTab]} · Step{' '}
              {Math.min(tabIndex + 1, TABS.length)} of {TABS.length}
            </p>
          </div>
        )}
      </header>

      <main className={`pb-24 ${activeTab !== 'success' ? 'pt-28 sm:pt-32' : 'pt-24'}`}>
        <AnimatePresence mode="wait">
          {activeTab === 'welcome' && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28 }}
              className="space-y-20"
            >
              <section className="max-w-4xl mx-auto px-4 sm:px-6">
                <div className="text-center space-y-6 py-8 sm:py-14">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-melhek-blue/30 bg-melhek-blue/10 text-melhek-blue text-[11px] font-mono uppercase tracking-[0.18em]">
                    <Sparkles className="w-3.5 h-3.5" /> For marketing agencies
                  </div>
                  <h1 className="text-4xl sm:text-6xl font-display font-extrabold tracking-tight leading-[1.08]">
                    Melhek
                    <br />
                    <span className="text-gradient">Agency Partner Program</span>
                  </h1>
                  <p className="text-base sm:text-lg text-white/70 font-light max-w-2xl mx-auto leading-relaxed">
                    Sell premium websites, custom software, and AI under your brand — or refer clients and
                    earn commission. Melhek is your engineering partner. You keep the client relationship.
                  </p>

                  <div className="glass rounded-3xl border-white/10 bg-melhek-navy/60 p-6 sm:p-8 text-left max-w-2xl mx-auto space-y-4">
                    <div className="flex gap-4">
                      <div className="w-11 h-11 rounded-2xl bg-melhek-blue/15 border border-melhek-blue/30 flex items-center justify-center text-melhek-blue shrink-0">
                        <Building2 className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-white">Built for agencies that sell outcomes</h3>
                        <p className="text-sm text-white/60 font-light mt-1 leading-relaxed">
                          Two clear models. Fixed wholesale costs. NDAs before work. No Melhek branding on
                          your client deliverables under white-label.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setActiveTab('intake')}
                      className="btn-primary inline-flex items-center gap-3 px-8 py-4 text-xs font-mono uppercase tracking-widest"
                    >
                      Apply as partner <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('calculator')}
                      className="btn-secondary inline-flex items-center gap-3 px-8 py-4 text-xs font-mono uppercase tracking-widest"
                    >
                      <BarChart3 className="w-4 h-4" /> Estimate margins
                    </button>
                  </div>
                </div>
              </section>

              <section className="max-w-5xl mx-auto px-4 sm:px-6">
                <SectionHeader
                  kicker="How it works"
                  title="Three steps to start selling"
                  subtitle="No portals to learn first. Align, sign NDA, ship."
                />
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    {
                      step: '01',
                      title: 'Model & margins',
                      desc: 'Choose white-label or referral. Use the calculator to see wholesale vs. your markup.',
                    },
                    {
                      step: '02',
                      title: 'Apply',
                      desc: 'Share agency details and preferred model. We respond within one business day.',
                    },
                    {
                      step: '03',
                      title: 'NDA & sell',
                      desc: 'Sign mutual NDA, lock wholesale rates, then sell or refer with confidence.',
                    },
                  ].map((item) => (
                    <div
                      key={item.step}
                      className="glass p-6 rounded-3xl border-white/10 bg-melhek-navy/50 space-y-3"
                    >
                      <span className="text-[11px] font-mono font-bold text-melhek-blue">{item.step}</span>
                      <h3 className="text-base font-bold text-white">{item.title}</h3>
                      <p className="text-sm text-white/60 font-light leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="max-w-5xl mx-auto px-4 sm:px-6">
                <SectionHeader
                  kicker="Partnership models"
                  title="Choose how you work with Melhek"
                  subtitle="Both models are explicit about client ownership, pricing, and communication."
                />
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="glass rounded-[2rem] border-melhek-blue/25 bg-gradient-to-br from-melhek-blue/10 via-melhek-navy/80 to-transparent p-8 sm:p-10 space-y-6">
                    <div className="w-12 h-12 rounded-2xl bg-melhek-blue/15 border border-melhek-blue/30 flex items-center justify-center text-melhek-blue">
                      <Fingerprint className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-display font-bold text-white mb-3">White-label</h3>
                      <p className="text-sm text-white/65 font-light leading-relaxed">
                        Melhek builds. You present. Your brand on every deliverable. You set retail price and
                        keep 100% of the markup.
                      </p>
                    </div>
                    <ul className="space-y-3">
                      {[
                        'You own the client relationship',
                        'Fixed wholesale cost from Melhek',
                        'Mutual NDA before any work',
                        'IP & code transfer to your agency',
                      ].map((feature) => (
                        <li key={feature} className="flex items-start gap-3 text-sm text-white/80">
                          <CheckCircle2 className="w-4 h-4 text-melhek-blue shrink-0 mt-0.5" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="glass rounded-[2rem] border-white/10 bg-melhek-navy/70 p-8 sm:p-10 space-y-6">
                    <div className="w-12 h-12 rounded-2xl bg-melhek-blue/12 border border-melhek-blue/25 flex items-center justify-center text-melhek-blue">
                      <Coins className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-display font-bold text-white mb-3">Strategic referral</h3>
                      <p className="text-sm text-white/65 font-light leading-relaxed">
                        Introduce the client. Melhek scopes, sells, builds, and supports as Melhek. You earn
                        10% cash on the initial contract deposit.
                      </p>
                    </div>
                    <ul className="space-y-3">
                      {[
                        'Melhek handles client communication',
                        'We scope, pitch, and close',
                        '10% commission on deposit',
                        'Zero delivery overhead for you',
                      ].map((feature) => (
                        <li key={feature} className="flex items-start gap-3 text-sm text-white/80">
                          <CheckCircle2 className="w-4 h-4 text-melhek-blue shrink-0 mt-0.5" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

              <section className="max-w-5xl mx-auto px-4 sm:px-6">
                <div className="glass rounded-[2rem] border-white/10 bg-melhek-navy/60 p-8 sm:p-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div className="space-y-2 max-w-xl">
                    <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-melhek-blue font-bold">
                      Proof
                    </span>
                    <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
                      Review the work before you trust us with yours
                    </h3>
                    <p className="text-sm text-white/60 font-light leading-relaxed">
                      Live portfolio of websites, systems, and product work shipped for Ethiopian businesses.
                    </p>
                  </div>
                  <Link
                    href="/portfolio"
                    className="btn-secondary !px-6 !py-3 text-xs font-mono uppercase tracking-wider inline-flex items-center gap-2 shrink-0"
                  >
                    View portfolio <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </section>

              <section className="max-w-3xl mx-auto px-4 sm:px-6">
                <SectionHeader
                  kicker="FAQ"
                  title="Agency questions, answered"
                  subtitle="Client ownership, markup, IP, and what happens after you apply."
                />
                <div className="space-y-3">
                  {PARTNERSHIP_FAQ.map((faq) => {
                    const open = openFaq === faq.id
                    return (
                      <div
                        key={faq.id}
                        className="glass rounded-2xl border-white/10 overflow-hidden bg-melhek-navy/50"
                      >
                        <button
                          type="button"
                          onClick={() => setOpenFaq(open ? null : faq.id)}
                          className="w-full px-5 py-4 flex items-center justify-between gap-4 text-left"
                        >
                          <span className="flex items-start gap-3 text-sm font-bold text-white">
                            <HelpCircle className="w-4 h-4 text-melhek-blue shrink-0 mt-0.5" />
                            {faq.q}
                          </span>
                          <ChevronRight
                            className={`w-4 h-4 text-white/40 shrink-0 transition-transform ${
                              open ? 'rotate-90' : ''
                            }`}
                          />
                        </button>
                        <AnimatePresence initial={false}>
                          {open && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <p className="px-5 pb-5 pl-12 text-sm text-white/60 leading-relaxed font-light border-t border-white/5 pt-4">
                                {faq.a}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )
                  })}
                </div>

                <div className="flex items-center justify-between gap-4 pt-10">
                  <Link
                    href="/"
                    className="btn-secondary !px-5 !py-3 text-xs font-mono uppercase tracking-wider inline-flex items-center gap-2"
                  >
                    <ChevronLeft className="w-4 h-4" /> Melhek home
                  </Link>
                  <button
                    type="button"
                    onClick={() => setActiveTab('calculator')}
                    className="btn-primary !px-6 !py-3 text-xs font-mono uppercase tracking-wider inline-flex items-center gap-2"
                  >
                    Estimate margins <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </section>
            </motion.div>
          )}

          {activeTab === 'calculator' && (
            <motion.section
              key="calculator"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28 }}
              className="max-w-5xl mx-auto px-4 sm:px-6"
            >
              <SectionHeader
                kicker="Revenue calculator"
                title="Estimate white-label margins"
                subtitle="Illustrative wholesale floors in ETB. Final quotes are scoped per project after alignment."
              />

              <div className="grid lg:grid-cols-5 gap-6">
                <div className="lg:col-span-3 space-y-6">
                  <div className="glass rounded-[2rem] border-white/10 bg-melhek-navy/60 p-6 sm:p-8 space-y-5">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Code className="w-4 h-4 text-melhek-blue" />
                      Systems you want to offer
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {SERVICE_OPTIONS.map((service) => {
                        const selected = calcServices.includes(service.id)
                        const Icon = service.icon
                        return (
                          <button
                            key={service.id}
                            type="button"
                            onClick={() => handleServiceToggle(service.id)}
                            className={`p-4 rounded-2xl border text-left transition-all ${
                              selected
                                ? 'bg-melhek-blue/10 border-melhek-blue/40'
                                : 'bg-black/25 border-white/10 hover:border-white/25'
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <div
                                className={`p-2 rounded-xl ${
                                  selected
                                    ? 'bg-melhek-blue text-melhek-navy'
                                    : 'bg-white/10 text-white/60'
                                }`}
                              >
                                <Icon className="w-4 h-4" />
                              </div>
                              <div>
                                <div className={`text-sm font-semibold ${selected ? 'text-white' : 'text-white/80'}`}>
                                  {service.name}
                                </div>
                                <div className="text-xs font-mono text-white/45 mt-1">
                                  Wholesale from {service.baseCost.toLocaleString()} ETB
                                </div>
                              </div>
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  <div className="glass rounded-[2rem] border-white/10 bg-melhek-navy/60 p-6 sm:p-8 space-y-8">
                    <div className="space-y-3">
                      <div className="flex justify-between items-end">
                        <h3 className="text-sm font-bold text-white">Clients / month</h3>
                        <div className="text-xl font-display font-bold text-melhek-blue">{calcClients}</div>
                      </div>
                      <input
                        type="range"
                        min={1}
                        max={20}
                        value={calcClients}
                        onChange={(e) => setCalcClients(Number(e.target.value))}
                        className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#7FA9FF]"
                      />
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-end">
                        <h3 className="text-sm font-bold text-white">Your retail markup</h3>
                        <div className="text-xl font-display font-bold text-emerald-400">+{calcMarkup}%</div>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={300}
                        step={10}
                        value={calcMarkup}
                        onChange={(e) => setCalcMarkup(Number(e.target.value))}
                        className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#34d399]"
                      />
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-2 space-y-4">
                  <div className="glass rounded-[2rem] border-melhek-blue/25 bg-gradient-to-br from-melhek-blue/10 via-melhek-navy/80 to-transparent p-6 sm:p-8 space-y-5">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-melhek-blue" />
                      White-label projection
                    </h3>
                    <div>
                      <div className="text-[11px] font-mono uppercase text-white/45 mb-1">Retail revenue</div>
                      <div className="text-2xl font-display font-extrabold text-white">
                        {monthlyRevenue.toLocaleString()}{' '}
                        <span className="text-sm font-normal text-white/40">ETB / mo</span>
                      </div>
                    </div>
                    <div className="w-full h-px bg-white/10" />
                    <div>
                      <div className="text-[11px] font-mono uppercase text-white/45 mb-1">Melhek wholesale</div>
                      <div className="text-lg font-medium text-white/80">
                        {(totalBaseCost * calcClients).toLocaleString()}{' '}
                        <span className="text-sm text-white/40">ETB / mo</span>
                      </div>
                    </div>
                    <div className="w-full h-px bg-white/10" />
                    <div>
                      <div className="text-[11px] font-mono uppercase text-white/45 mb-2">Your agency profit</div>
                      <div className="text-4xl font-display font-extrabold text-gradient">
                        {monthlyProfit.toLocaleString()}
                      </div>
                      <div className="text-sm text-melhek-steel mt-1">ETB / month</div>
                    </div>
                  </div>

                  <div className="glass rounded-2xl border-white/10 bg-melhek-navy/50 p-5 space-y-2">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-white/50 flex items-center gap-2">
                      <Coins className="w-3.5 h-3.5 text-melhek-blue" /> Referral alternative
                    </h4>
                    <p className="text-xs text-white/55 font-light">
                      Same volume referred to Melhek at 10% commission:
                    </p>
                    <div className="text-xl font-display font-bold text-white">
                      {referralProfit.toLocaleString()}{' '}
                      <span className="text-sm font-normal text-white/40">ETB / mo</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setActiveTab('welcome')}
                      className="btn-secondary !px-5 !py-3 text-xs font-mono uppercase tracking-wider inline-flex items-center gap-2"
                    >
                      <ChevronLeft className="w-4 h-4" /> Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('intake')}
                      className="btn-primary !px-6 !py-3 text-xs font-mono uppercase tracking-wider inline-flex items-center gap-2"
                    >
                      Apply <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.section>
          )}

          {activeTab === 'intake' && (
            <motion.section
              key="intake"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28 }}
              className="max-w-3xl mx-auto px-4 sm:px-6"
            >
              <SectionHeader
                kicker="Application"
                title="Agency partner intake"
                subtitle="One form. We review within one business day and schedule an alignment call."
              />

              <div className="glass rounded-[2rem] border-white/10 bg-melhek-navy/70 p-6 sm:p-10 relative overflow-hidden">
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-melhek-blue/15 blur-[100px] rounded-full pointer-events-none" />

                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono text-white/40 uppercase block">Agency name *</label>
                      <input
                        type="text"
                        required
                        value={formData.agencyName}
                        onChange={(e) => setFormData({ ...formData, agencyName: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-melhek-blue"
                        placeholder="Apex Digital"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono text-white/40 uppercase block">Website</label>
                      <input
                        type="url"
                        value={formData.website}
                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-melhek-blue"
                        placeholder="https://"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono text-white/40 uppercase block">Contact name *</label>
                      <input
                        type="text"
                        required
                        value={formData.contactName}
                        onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-melhek-blue"
                        placeholder="Full name"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono text-white/40 uppercase block">Work email *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-melhek-blue"
                        placeholder="name@agency.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono text-white/40 uppercase block">Phone / Telegram</label>
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-melhek-blue"
                      placeholder="+251…"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-[11px] font-mono text-white/40 uppercase block">
                      Preferred model *
                    </label>
                    <div className="grid md:grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, partnershipModel: 'whitelabel' })}
                        className={`p-4 rounded-2xl border text-left transition-all ${
                          formData.partnershipModel === 'whitelabel'
                            ? 'bg-melhek-blue/10 border-melhek-blue/40'
                            : 'bg-white/5 border-white/10 hover:border-white/25'
                        }`}
                      >
                        <div className="font-bold text-white text-sm mb-1">White-label</div>
                        <div className="text-xs text-white/55 font-light">
                          You own the client. We build in the background.
                        </div>
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, partnershipModel: 'referral' })}
                        className={`p-4 rounded-2xl border text-left transition-all ${
                          formData.partnershipModel === 'referral'
                            ? 'bg-melhek-blue/10 border-melhek-blue/40'
                            : 'bg-white/5 border-white/10 hover:border-white/25'
                        }`}
                      >
                        <div className="font-bold text-white text-sm mb-1">Strategic referral</div>
                        <div className="text-xs text-white/55 font-light">
                          You refer. Melhek delivers. You earn 10%.
                        </div>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono text-white/40 uppercase block">
                      Primary goal or constraint *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={formData.primaryInterest}
                      onChange={(e) => setFormData({ ...formData, primaryInterest: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-melhek-blue resize-none"
                      placeholder="e.g. Clients ask for booking engines; we lack backend capacity…"
                    />
                  </div>

                  {submitError && (
                    <p className="text-sm text-red-300 bg-red-500/10 border border-red-500/25 rounded-xl px-4 py-3">
                      {submitError}
                    </p>
                  )}

                  <div className="flex items-center justify-between gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setActiveTab('calculator')}
                      className="btn-secondary !px-5 !py-3 text-xs font-mono uppercase tracking-wider inline-flex items-center gap-2"
                    >
                      <ChevronLeft className="w-4 h-4" /> Back
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary !px-6 !py-3 text-xs font-mono uppercase tracking-wider inline-flex items-center gap-2 disabled:opacity-50"
                    >
                      {isSubmitting ? 'Submitting…' : (
                        <>
                          Submit application <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </motion.section>
          )}

          {activeTab === 'success' && (
            <motion.section
              key="success"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl mx-auto px-4 sm:px-6 text-center py-16 sm:py-24"
            >
              <div className="w-20 h-20 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mx-auto mb-8">
                <CheckCircle2 className="w-10 h-10 text-emerald-400" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white mb-4">
                Application received
              </h2>
              <p className="text-base text-white/65 font-light leading-relaxed mb-10">
                Thank you, {formData.contactName || 'partner'}. We will review{' '}
                <span className="text-white font-medium">{formData.agencyName || 'your agency'}</span> and
                contact you within one business day to schedule the alignment call.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setActiveTab('welcome')}
                  className="btn-secondary !px-6 !py-3 text-xs font-mono uppercase tracking-wider"
                >
                  Back to overview
                </button>
                <Link
                  href="/portfolio"
                  className="btn-primary !px-6 !py-3 text-xs font-mono uppercase tracking-wider inline-flex items-center gap-2"
                >
                  Review portfolio <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}
