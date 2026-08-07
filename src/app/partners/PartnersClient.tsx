'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Code,
  Coins,
  ExternalLink,
  FileSignature,
  Fingerprint,
  Globe,
  HelpCircle,
  Lock,
  Mail,
  MessageCircle,
  Phone,
  Shield,
  ShieldCheck,
  Sparkles,
  Terminal,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react'
import { PROJECTS_DATA } from '@/data/projects'

type Stage =
  | 'welcome'
  | 'models'
  | 'proof'
  | 'operating'
  | 'calculator'
  | 'faq'
  | 'apply'
  | 'success'

type PartnershipModel = 'whitelabel' | 'referral'

interface ServiceOption {
  id: string
  name: string
  baseCost: number
  icon: React.ComponentType<{ className?: string }>
}

const STAGES: Stage[] = [
  'welcome',
  'models',
  'proof',
  'operating',
  'calculator',
  'faq',
  'apply',
]

const STAGE_LABELS: Record<Stage, string> = {
  welcome: 'Welcome',
  models: 'Models',
  proof: 'Proof',
  operating: 'Operating',
  calculator: 'Calculator',
  faq: 'FAQ',
  apply: 'Apply',
  success: 'Complete',
}

const SERVICE_OPTIONS: ServiceOption[] = [
  { id: 'web', name: 'Premium corporate websites', baseCost: 35000, icon: Globe },
  { id: 'ecommerce', name: 'E-commerce & booking engines', baseCost: 55000, icon: Zap },
  { id: 'crm', name: 'Custom CRM / operations dashboards', baseCost: 75000, icon: Users },
  { id: 'ai', name: 'AI chatbots & automations', baseCost: 45000, icon: Terminal },
]

const PROOF_SLUGS = [
  'hotel-booking',
  'healthcare-booking',
  'pharmacy-management',
  'belete-tasew-law',
  'corporate-business-website',
  'car-sales-showroom',
  'retail-management-system',
] as const

const PROOF_PROJECTS = PROOF_SLUGS.map((slug) =>
  PROJECTS_DATA.find((p) => p.slug === slug)
).filter(Boolean)

const CONTACT = {
  email: 'melhektechnologies@gmail.com',
  phoneDisplay: '+251 972 23 7318',
  phoneHref: 'tel:+251972237318',
  whatsapp: 'https://wa.me/251721237318',
  telegram: 'https://t.me/melhektechnologies',
}

const OPERATING = [
  {
    title: 'Client ownership',
    detail:
      'White-label: your client, your brand, your invoice. Melhek never markets to them. Referral: Melhek becomes the vendor; you are paid commission.',
    icon: Fingerprint,
  },
  {
    title: 'NDA before work',
    detail:
      'Mutual NDA and non-solicit terms are signed before scoping or code starts. No exception for first projects.',
    icon: FileSignature,
  },
  {
    title: 'Response SLA',
    detail:
      'Partner applications reviewed within 1 business day. Active project chat: first response within 4 business hours (EAT), Mon–Sat.',
    icon: Clock3,
  },
  {
    title: 'Delivery hyper-care',
    detail:
      '30 days complimentary hyper-care after launch (bugs, performance, staff handoff). Ongoing SLA retainer optional.',
    icon: Shield,
  },
  {
    title: 'Security baseline',
    detail:
      'SSL/TLS, environment isolation, hashed credentials, vaulted secrets. Full protocol published on our Security page.',
    icon: Lock,
  },
  {
    title: 'IP transfer',
    detail:
      'White-label deliverables, source, and deployment assets transfer to your agency on final payment.',
    icon: Code,
  },
]

const FAQS = [
  {
    id: 'f1',
    q: 'How does white-label work day-to-day?',
    a: 'You brief Melhek. We build under your project naming. Client-facing communication uses your agency email if needed, under your direction. Melhek branding never appears on deliverables.',
  },
  {
    id: 'f2',
    q: 'Can I set my own prices?',
    a: 'Yes. You receive a fixed wholesale cost. You set retail and keep 100% of the markup.',
  },
  {
    id: 'f3',
    q: 'How does referral commission work?',
    a: 'You introduce the client. Melhek scopes, closes, delivers, and supports as Melhek. You earn 10% cash on the initial contract deposit, paid after funds clear.',
  },
  {
    id: 'f4',
    q: 'Will Melhek poach my clients?',
    a: 'No on white-label — NDA + non-solicit. Referral clients are Melhek clients by design; your compensation is commission, not retained ownership.',
  },
  {
    id: 'f5',
    q: 'What if a deadline slips on my client’s launch?',
    a: 'Risks and milestones are written into the SOW before build. If Melhek causes delay, we communicate immediately and prioritize recovery. You stay the client’s single point of truth.',
  },
  {
    id: 'f6',
    q: 'What stack do you ship?',
    a: 'Modern web and product engineering — typically Next.js, secure APIs, and production hosting. Stack is confirmed per project in the SOW so your agency can support or hand off cleanly.',
  },
  {
    id: 'f7',
    q: 'What happens after I apply?',
    a: 'We review within one business day, book a short alignment call, agree model + wholesale floors, sign NDA, then you can sell or refer.',
  },
  {
    id: 'f8',
    q: 'Is there a minimum volume?',
    a: 'No monthly minimum to join. Capacity is reserved per active SOW so quality stays high.',
  },
]

const DRAFT_KEY = 'melhek_agency_partner_draft'
const stageMotion = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
  transition: { duration: 0.28 },
}

function isStage(value: string | null): value is Stage {
  return !!value && (STAGES.includes(value as Stage) || value === 'success')
}

export default function PartnersClient() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const stepParam = searchParams.get('step')

  const [stage, setStage] = useState<Stage>(() =>
    isStage(stepParam) ? stepParam : 'welcome'
  )
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
    yearsInBusiness: '',
    monthlyClients: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [reference, setReference] = useState<string | null>(null)
  const [draftReady, setDraftReady] = useState(false)

  useEffect(() => {
    if (isStage(stepParam) && stepParam !== stage) setStage(stepParam)
    if (!stepParam && stage !== 'welcome' && stage !== 'success') {
      // keep current stage when clearing happens via goTo
    }
  }, [stepParam]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    try {
      const raw = localStorage.getItem(DRAFT_KEY)
      if (raw) {
        const parsed = JSON.parse(raw)
        if (parsed?.formData) setFormData((prev) => ({ ...prev, ...parsed.formData }))
      }
    } catch {
      // ignore corrupt draft
    }
    setDraftReady(true)
  }, [])

  useEffect(() => {
    if (!draftReady) return
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify({ formData, updatedAt: Date.now() }))
    } catch {
      // ignore quota
    }
  }, [formData, draftReady])

  const goTo = (next: Stage) => {
    setStage(next)
    const params = new URLSearchParams(searchParams.toString())
    if (next === 'welcome') params.delete('step')
    else params.set('step', next)
    const qs = params.toString()
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: true })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const stageIndex = STAGES.indexOf(stage === 'success' ? 'apply' : stage)

  const totalBaseCost = calcServices.reduce((sum, serviceId) => {
    const service = SERVICE_OPTIONS.find((s) => s.id === serviceId)
    return sum + (service ? service.baseCost : 0)
  }, 0)
  const monthlyRevenue = totalBaseCost * calcClients * (1 + calcMarkup / 100)
  const monthlyProfit = totalBaseCost * calcClients * (calcMarkup / 100)
  const referralProfit = totalBaseCost * calcClients * 0.1

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
      if (!res.ok || !data.success) throw new Error(data.error || 'Submission failed.')
      setReference(data.reference || null)
      localStorage.removeItem(DRAFT_KEY)
      goTo('success')
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

  const NavBackNext = ({
    nextLabel,
    onNext,
    disableNext,
  }: {
    nextLabel?: string
    onNext?: () => void
    disableNext?: boolean
  }) => {
    const idx = STAGES.indexOf(stage as (typeof STAGES)[number])
    const prev = idx > 0 ? STAGES[idx - 1] : null
    return (
      <div className="flex items-center justify-between gap-4 pt-10">
        {prev ? (
          <button
            type="button"
            onClick={() => goTo(prev)}
            className="btn-secondary !px-5 !py-3 text-xs font-mono uppercase tracking-wider inline-flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" /> Back
          </button>
        ) : (
          <Link
            href="/"
            className="btn-secondary !px-5 !py-3 text-xs font-mono uppercase tracking-wider inline-flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" /> Melhek home
          </Link>
        )}
        <button
          type="button"
          disabled={disableNext}
          onClick={onNext || (() => {
            const next = STAGES[Math.min(idx + 1, STAGES.length - 1)]
            goTo(next)
          })}
          className="btn-primary !px-6 !py-3 text-xs font-mono uppercase tracking-wider inline-flex items-center gap-2 disabled:opacity-40"
        >
          {nextLabel || 'Continue'} <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    )
  }

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

          <div className="hidden lg:flex items-center gap-1.5">
            {STAGES.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => goTo(s)}
                className={`px-2.5 py-1.5 rounded-lg text-[10px] font-mono uppercase tracking-wider transition-colors ${
                  stage === s || (stage === 'success' && s === 'apply')
                    ? 'bg-melhek-blue/15 text-melhek-blue border border-melhek-blue/30'
                    : 'text-white/45 hover:text-white border border-transparent'
                }`}
              >
                {STAGE_LABELS[s]}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => goTo('apply')}
            className={`btn-primary !px-4 sm:!px-5 !py-2.5 !text-[10px] sm:!text-[11px] font-mono uppercase tracking-wider shrink-0 ${
              stage === 'success' ? 'invisible pointer-events-none' : ''
            }`}
          >
            Apply
          </button>
        </div>

        {stage !== 'success' && (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-3">
            <div className="flex gap-1">
              {STAGES.map((s, i) => (
                <button
                  key={s}
                  type="button"
                  aria-label={`Go to ${STAGE_LABELS[s]}`}
                  onClick={() => goTo(s)}
                  className={`h-1 flex-1 rounded-full transition-colors ${
                    i <= stageIndex ? 'bg-melhek-blue' : 'bg-white/10'
                  }`}
                />
              ))}
            </div>
            <p className="mt-2 text-[10px] font-mono text-white/40 uppercase tracking-wider">
              {STAGE_LABELS[stage]} · Step {Math.min(stageIndex + 1, STAGES.length)} of {STAGES.length}
            </p>
          </div>
        )}
      </header>

      <main className={`pb-28 ${stage !== 'success' ? 'pt-24 sm:pt-28' : 'pt-20'}`}>
        <AnimatePresence mode="wait">
          {stage === 'welcome' && (
            <motion.section
              key="welcome"
              {...stageMotion}
              className="max-w-4xl mx-auto px-4 sm:px-6"
            >
              <div className="text-center space-y-6 py-6 sm:py-10">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-melhek-blue/30 bg-melhek-blue/10 text-melhek-blue text-[11px] font-mono uppercase tracking-[0.18em]">
                  <Sparkles className="w-3.5 h-3.5" /> For marketing agencies
                </div>
                <h1 className="text-4xl sm:text-6xl font-display font-extrabold tracking-tight leading-[1.08]">
                  Melhek
                  <br />
                  <span className="text-gradient">Agency Partner Program</span>
                </h1>
                <p className="text-base sm:text-lg text-white/70 font-light max-w-2xl mx-auto leading-relaxed">
                  Sell premium websites, custom software, and AI under your brand — or refer clients
                  and earn commission. Melhek is the engineering partner. You keep the relationship.
                </p>

                <div className="glass rounded-3xl border-white/10 bg-melhek-navy/60 p-6 sm:p-8 text-left max-w-2xl mx-auto space-y-4">
                  <div className="flex gap-4">
                    <div className="w-11 h-11 rounded-2xl bg-melhek-blue/15 border border-melhek-blue/30 flex items-center justify-center text-melhek-blue shrink-0">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white">Built for agencies that sell outcomes</h3>
                      <p className="text-sm text-white/60 font-light mt-1 leading-relaxed">
                        Two models. Fixed wholesale floors. NDA before work. No Melhek branding on
                        white-label deliverables. IP transfers to your agency.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 max-w-xl mx-auto pt-2">
                  {[
                    { v: '50+', l: 'Projects' },
                    { v: '9', l: 'Industries' },
                    { v: '10%', l: 'Referral' },
                  ].map((s) => (
                    <div
                      key={s.l}
                      className="rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-4"
                    >
                      <div className="text-xl sm:text-2xl font-display font-extrabold text-melhek-blue">
                        {s.v}
                      </div>
                      <div className="text-[10px] font-mono uppercase tracking-wider text-white/40 mt-1">
                        {s.l}
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => goTo('models')}
                  className="btn-primary inline-flex items-center gap-3 px-8 py-4 text-xs font-mono uppercase tracking-widest"
                >
                  Explore the program <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.section>
          )}

          {stage === 'models' && (
            <motion.section key="models" {...stageMotion} className="max-w-5xl mx-auto px-4 sm:px-6">
              <SectionHeader
                kicker="Partnership models"
                title="Choose how you work with Melhek"
                subtitle="Client ownership, pricing, and communication are explicit before you apply."
              />
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="glass rounded-[2rem] border-melhek-blue/25 bg-gradient-to-br from-melhek-blue/10 via-melhek-navy/80 to-transparent p-8 sm:p-10 space-y-6">
                  <div className="w-12 h-12 rounded-2xl bg-melhek-blue/15 border border-melhek-blue/30 flex items-center justify-center text-melhek-blue">
                    <Fingerprint className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-display font-bold text-white mb-3">White-label</h3>
                    <p className="text-sm text-white/65 font-light leading-relaxed">
                      Melhek builds. You present. Your brand on every deliverable. You set retail and
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
                      Introduce the client. Melhek scopes, sells, builds, and supports as Melhek. You
                      earn 10% cash on the initial contract deposit.
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

              <div className="grid md:grid-cols-3 gap-3 mt-6">
                {[
                  { step: '01', title: 'Align', desc: 'Pick model. Review wholesale floors.' },
                  { step: '02', title: 'Apply', desc: 'One form. Response in one business day.' },
                  { step: '03', title: 'NDA & sell', desc: 'Sign terms. Sell or refer immediately.' },
                ].map((item) => (
                  <div
                    key={item.step}
                    className="glass p-5 rounded-2xl border-white/10 bg-melhek-navy/45 space-y-2"
                  >
                    <span className="text-[11px] font-mono font-bold text-melhek-blue">{item.step}</span>
                    <h4 className="text-sm font-bold text-white">{item.title}</h4>
                    <p className="text-xs text-white/55 font-light leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>

              <NavBackNext nextLabel="See proof" onNext={() => goTo('proof')} />
            </motion.section>
          )}

          {stage === 'proof' && (
            <motion.section key="proof" {...stageMotion} className="max-w-5xl mx-auto px-4 sm:px-6">
              <SectionHeader
                kicker="Proof"
                title="Work agencies can put in front of clients"
                subtitle="Real systems and sites Melhek has shipped. Review before you trust us with yours."
              />

              <div className="grid sm:grid-cols-2 gap-4">
                {PROOF_PROJECTS.map((project) =>
                  project ? (
                    <div
                      key={project.slug}
                      className="glass rounded-3xl border-white/10 bg-melhek-navy/50 overflow-hidden group hover:border-melhek-blue/35 transition-colors flex flex-col"
                    >
                      <a
                        href={project.link || `/portfolio/${project.slug}`}
                        target={project.link ? '_blank' : undefined}
                        rel={project.link ? 'noopener noreferrer' : undefined}
                        className="relative aspect-[16/10] bg-melhek-navy block"
                      >
                        {project.image ? (
                          <Image
                            src={project.image}
                            alt={project.name}
                            fill
                            priority
                            unoptimized
                            className="object-cover object-top opacity-95 group-hover:opacity-100 transition-opacity"
                            sizes="(max-width: 640px) 100vw, 50vw"
                          />
                        ) : (
                          <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`} />
                        )}
                        {project.link && (
                          <span className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/70 border border-white/15 text-[10px] font-mono uppercase tracking-wider text-emerald-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            Live
                          </span>
                        )}
                      </a>
                      <div className="p-5 space-y-3 flex-1 flex flex-col">
                        <div className="text-[10px] font-mono uppercase tracking-wider text-melhek-blue">
                          {project.category}
                        </div>
                        <h3 className="text-base font-bold text-white leading-snug">{project.name}</h3>
                        <p className="text-sm text-white/55 font-light leading-relaxed line-clamp-2 flex-1">
                          {project.businessOutcome}
                        </p>
                        <div className="flex flex-wrap gap-2 pt-1">
                          {project.link && (
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-melhek-blue/15 border border-melhek-blue/30 text-[10px] font-mono uppercase tracking-wider text-melhek-blue hover:bg-melhek-blue/25 transition-colors"
                            >
                              Open live demo <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                          <Link
                            href={`/portfolio/${project.slug}`}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/10 text-[10px] font-mono uppercase tracking-wider text-white/55 hover:text-white hover:border-white/25 transition-colors"
                          >
                            Case page
                          </Link>
                        </div>
                      </div>
                    </div>
                  ) : null
                )}
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/portfolio"
                  className="btn-secondary !px-6 !py-3 text-xs font-mono uppercase tracking-wider inline-flex items-center justify-center gap-2"
                >
                  Full portfolio <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/engineering"
                  className="btn-secondary !px-6 !py-3 text-xs font-mono uppercase tracking-wider inline-flex items-center justify-center gap-2"
                >
                  Engineering standards
                </Link>
              </div>

              <NavBackNext nextLabel="Operating terms" onNext={() => goTo('operating')} />
            </motion.section>
          )}

          {stage === 'operating' && (
            <motion.section key="operating" {...stageMotion} className="max-w-5xl mx-auto px-4 sm:px-6">
              <SectionHeader
                kicker="Operating terms"
                title="How risk, communication, and delivery work"
                subtitle="The questions agency owners ask before introducing Melhek to a client."
              />

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {OPERATING.map((item) => {
                  const Icon = item.icon
                  return (
                    <div
                      key={item.title}
                      className="glass p-5 rounded-2xl border-white/10 bg-melhek-navy/50 space-y-3"
                    >
                      <div className="w-9 h-9 rounded-xl bg-melhek-blue/12 border border-melhek-blue/25 flex items-center justify-center text-melhek-blue">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="text-sm font-bold text-white">{item.title}</h3>
                      <p className="text-xs text-white/55 font-light leading-relaxed">{item.detail}</p>
                    </div>
                  )
                })}
              </div>

              <div className="glass rounded-[2rem] border-white/10 bg-melhek-navy/60 p-6 sm:p-8 mt-6 space-y-4">
                <h3 className="text-sm font-bold text-white">Legal & security references</h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    { href: '/security', label: 'Security protocol' },
                    { href: '/terms', label: 'Terms of engagement' },
                    { href: '/privacy', label: 'Privacy policy' },
                  ].map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="px-3.5 py-2 rounded-xl border border-white/10 bg-black/25 text-[11px] font-mono uppercase tracking-wider text-white/70 hover:border-melhek-blue/40 hover:text-melhek-blue transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
                <p className="text-xs text-white/45 font-light leading-relaxed">
                  Formal NDA / SOW documents are issued on the alignment call — before any client work
                  begins. Engagements are governed by written scope, not verbal promises.
                </p>
              </div>

              <NavBackNext nextLabel="Estimate margins" onNext={() => goTo('calculator')} />
            </motion.section>
          )}

          {stage === 'calculator' && (
            <motion.section key="calculator" {...stageMotion} className="max-w-5xl mx-auto px-4 sm:px-6">
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
                                <div
                                  className={`text-sm font-semibold ${
                                    selected ? 'text-white' : 'text-white/80'
                                  }`}
                                >
                                  {service.name}
                                </div>
                                <div className="text-xs font-mono text-white/45 mt-1">
                                  From {service.baseCost.toLocaleString()} ETB
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
                      Same volume referred at 10% commission:
                    </p>
                    <div className="text-xl font-display font-bold text-white">
                      {referralProfit.toLocaleString()}{' '}
                      <span className="text-sm font-normal text-white/40">ETB / mo</span>
                    </div>
                  </div>
                </div>
              </div>

              <NavBackNext nextLabel="Read FAQ" onNext={() => goTo('faq')} />
            </motion.section>
          )}

          {stage === 'faq' && (
            <motion.section key="faq" {...stageMotion} className="max-w-3xl mx-auto px-4 sm:px-6">
              <SectionHeader
                kicker="FAQ"
                title="Agency questions, answered"
                subtitle="Ownership, markup, deadlines, stack, and what happens after you apply."
              />
              <div className="space-y-3">
                {FAQS.map((faq) => {
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
                        aria-expanded={open}
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
              <NavBackNext nextLabel="Apply now" onNext={() => goTo('apply')} />
            </motion.section>
          )}

          {stage === 'apply' && (
            <motion.section key="apply" {...stageMotion} className="max-w-3xl mx-auto px-4 sm:px-6">
              <SectionHeader
                kicker="Application"
                title="Agency partner intake"
                subtitle="Short form. Draft saves in your browser. We respond within one business day."
              />

              <div className="glass rounded-[2rem] border-white/10 bg-melhek-navy/70 p-6 sm:p-10 relative overflow-hidden">
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-melhek-blue/15 blur-[100px] rounded-full pointer-events-none" />

                <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                  <div className="grid md:grid-cols-2 gap-5">
                    <Field
                      label="Agency name *"
                      value={formData.agencyName}
                      onChange={(v) => setFormData({ ...formData, agencyName: v })}
                      required
                      placeholder="Apex Digital"
                    />
                    <Field
                      label="Website"
                      type="url"
                      value={formData.website}
                      onChange={(v) => setFormData({ ...formData, website: v })}
                      placeholder="https://"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <Field
                      label="Contact name *"
                      value={formData.contactName}
                      onChange={(v) => setFormData({ ...formData, contactName: v })}
                      required
                      placeholder="Full name"
                    />
                    <Field
                      label="Work email *"
                      type="email"
                      value={formData.email}
                      onChange={(v) => setFormData({ ...formData, email: v })}
                      required
                      placeholder="name@agency.com"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <Field
                      label="Phone / Telegram"
                      value={formData.phone}
                      onChange={(v) => setFormData({ ...formData, phone: v })}
                      placeholder="+251… or @handle"
                    />
                    <Field
                      label="Years in business"
                      value={formData.yearsInBusiness}
                      onChange={(v) => setFormData({ ...formData, yearsInBusiness: v })}
                      placeholder="e.g. 4"
                    />
                  </div>

                  <Field
                    label="Typical clients / month"
                    value={formData.monthlyClients}
                    onChange={(v) => setFormData({ ...formData, monthlyClients: v })}
                    placeholder="e.g. 3–5 web projects"
                  />

                  <div className="space-y-3">
                    <label className="text-[11px] font-mono text-white/40 uppercase block">
                      Preferred model *
                    </label>
                    <div className="grid md:grid-cols-2 gap-3">
                      {(
                        [
                          {
                            id: 'whitelabel' as const,
                            title: 'White-label',
                            desc: 'You own the client. We build in the background.',
                          },
                          {
                            id: 'referral' as const,
                            title: 'Strategic referral',
                            desc: 'You refer. Melhek delivers. You earn 10%.',
                          },
                        ] as const
                      ).map((model) => (
                        <button
                          key={model.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, partnershipModel: model.id })}
                          className={`p-4 rounded-2xl border text-left transition-all ${
                            formData.partnershipModel === model.id
                              ? 'bg-melhek-blue/10 border-melhek-blue/40'
                              : 'bg-white/5 border-white/10 hover:border-white/25'
                          }`}
                        >
                          <div className="font-bold text-white text-sm mb-1">{model.title}</div>
                          <div className="text-xs text-white/55 font-light">{model.desc}</div>
                        </button>
                      ))}
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
                      onChange={(e) =>
                        setFormData({ ...formData, primaryInterest: e.target.value })
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-melhek-blue resize-none"
                      placeholder="e.g. Clients ask for booking engines; we lack backend capacity…"
                    />
                  </div>

                  {submitError && (
                    <p className="text-sm text-red-300 bg-red-500/10 border border-red-500/25 rounded-xl px-4 py-3">
                      {submitError} — or email{' '}
                      <a href={`mailto:${CONTACT.email}`} className="underline text-white">
                        {CONTACT.email}
                      </a>
                    </p>
                  )}

                  <div className="flex items-center justify-between gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => goTo('faq')}
                      className="btn-secondary !px-5 !py-3 text-xs font-mono uppercase tracking-wider inline-flex items-center gap-2"
                    >
                      <ChevronLeft className="w-4 h-4" /> Back
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary !px-6 !py-3 text-xs font-mono uppercase tracking-wider inline-flex items-center gap-2 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        'Submitting…'
                      ) : (
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

          {stage === 'success' && (
            <motion.section
              key="success"
              {...stageMotion}
              className="max-w-2xl mx-auto px-4 sm:px-6 text-center py-12 sm:py-20"
            >
              <div className="w-20 h-20 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mx-auto mb-8">
                <CheckCircle2 className="w-10 h-10 text-emerald-400" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white mb-4">
                Application received
              </h2>
              <p className="text-base text-white/65 font-light leading-relaxed mb-6">
                Thank you, {formData.contactName || 'partner'}. We will review{' '}
                <span className="text-white font-medium">{formData.agencyName || 'your agency'}</span>{' '}
                and contact you within one business day to schedule the alignment call.
              </p>
              {reference && (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 bg-black/30 text-[11px] font-mono text-white/50 mb-8">
                  Ref <span className="text-melhek-blue font-bold">{reference}</span>
                </div>
              )}

              <div className="glass rounded-3xl border-white/10 bg-melhek-navy/60 p-6 text-left space-y-3 mb-8">
                <h3 className="text-sm font-bold text-white">What happens next</h3>
                <ul className="space-y-2 text-sm text-white/60 font-light">
                  <li className="flex gap-2">
                    <CheckCircle2 className="w-4 h-4 text-melhek-blue shrink-0 mt-0.5" />
                    Partnership review within 1 business day
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="w-4 h-4 text-melhek-blue shrink-0 mt-0.5" />
                    Alignment call — model, wholesale, capacity
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="w-4 h-4 text-melhek-blue shrink-0 mt-0.5" />
                    NDA / SOW issued before any client work
                  </li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3">
                <a
                  href={`mailto:${CONTACT.email}?subject=Agency%20Partner%20follow-up${
                    reference ? `%20${reference}` : ''
                  }`}
                  className="btn-primary !px-6 !py-3 text-xs font-mono uppercase tracking-wider inline-flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" /> Email Melhek
                </a>
                <a
                  href={CONTACT.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary !px-6 !py-3 text-xs font-mono uppercase tracking-wider inline-flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" /> WhatsApp
                </a>
                <a
                  href={CONTACT.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary !px-6 !py-3 text-xs font-mono uppercase tracking-wider inline-flex items-center gap-2"
                >
                  Telegram
                </a>
                <a
                  href={CONTACT.phoneHref}
                  className="btn-secondary !px-6 !py-3 text-xs font-mono uppercase tracking-wider inline-flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" /> {CONTACT.phoneDisplay}
                </a>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => goTo('welcome')}
                  className="btn-secondary !px-6 !py-3 text-xs font-mono uppercase tracking-wider"
                >
                  Back to overview
                </button>
                <Link
                  href="/portfolio"
                  className="btn-secondary !px-6 !py-3 text-xs font-mono uppercase tracking-wider inline-flex items-center gap-2"
                >
                  Review portfolio <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      {stage !== 'success' && stage !== 'apply' && stage !== 'welcome' && (
        <div className="fixed bottom-0 inset-x-0 z-40 border-t border-white/10 bg-melhek-navy/95 backdrop-blur-xl lg:hidden safe-pb">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
            <span className="text-[10px] font-mono uppercase tracking-wider text-white/40">
              {STAGE_LABELS[stage]}
            </span>
            <button
              type="button"
              onClick={() => {
                const idx = STAGES.indexOf(stage)
                goTo(STAGES[Math.min(idx + 1, STAGES.length - 1)])
              }}
              className="btn-primary !px-5 !py-2.5 !text-[11px] font-mono uppercase tracking-wider inline-flex items-center gap-2"
            >
              Continue <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  required,
  type = 'text',
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  required?: boolean
  type?: string
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-[11px] font-mono text-white/40 uppercase block">{label}</label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-melhek-blue"
        placeholder={placeholder}
      />
    </div>
  )
}
