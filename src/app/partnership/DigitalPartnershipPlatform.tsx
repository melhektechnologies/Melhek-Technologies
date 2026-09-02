'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
  ArrowRight,
  Award,
  BarChart3,
  Bot,
  Building2,
  Calendar,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  FileSignature,
  Globe,
  HelpCircle,
  KeyRound,
  Layers,
  Lock,
  Mail,
  MessageSquare,
  Package,
  Server,
  Shield,
  ShieldCheck,
  Sparkles,
  UserCheck,
  Users,
  Wrench,
  Zap,
} from 'lucide-react'

// ── Types ────────────────────────────────────────────────────────────────────

type Stage =
  | 'welcome'
  | 'program'
  | 'why'
  | 'package'
  | 'growth'
  | 'timeline'
  | 'faq'
  | 'accept'
  | 'agreement'
  | 'confirmation'
  | 'discovery'
  | 'success'

interface GrowthItem {
  id: string
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
}

interface FaqItem {
  id: string
  question: string
  answer: string
}

interface DiscoveryData {
  businessName: string
  ownerName: string
  email: string
  phone: string
  industry: string
  primaryGoal: string
  targetAudience: string
  successOutcome: string
  pagesNeeded: string
  inScopeFeatures: string[]
  growthInterest: string[]
  brandAssets: string
  notes: string
}

// ── Constants ────────────────────────────────────────────────────────────────

const STAGES: Stage[] = [
  'welcome',
  'program',
  'why',
  'package',
  'growth',
  'timeline',
  'faq',
  'accept',
  'agreement',
  'confirmation',
  'discovery',
  'success',
]

const STAGE_LABELS: Record<Stage, string> = {
  welcome: 'Welcome',
  program: 'Program',
  why: 'Why you',
  package: 'Package',
  growth: 'Growth',
  timeline: 'Timeline',
  faq: 'FAQ',
  accept: 'Accept',
  agreement: 'Agreement',
  confirmation: 'Confirmed',
  discovery: 'Discovery',
  success: 'Complete',
}

const SPONSORED_INCLUDES = [
  { title: 'Discovery session', detail: 'Goals, audience, and content priorities mapped with you.' },
  { title: 'Website strategy', detail: 'Sitemap, structure, and conversion-focused information architecture.' },
  { title: 'UI/UX design', detail: 'Custom visual design aligned to your brand.' },
  { title: 'Responsive development', detail: 'Production-ready build that works across phones, tablets, and desktop.' },
  { title: 'Maximum 5 pages', detail: 'Hard scope limit. Additional pages are scoped separately.' },
  { title: 'Basic SEO', detail: 'Titles, meta descriptions, semantic structure, and indexable pages.' },
  { title: 'SSL', detail: 'Encrypted HTTPS for every visitor.' },
  { title: 'Contact form', detail: 'One lead-capture form connected to your preferred inbox or Telegram.' },
  { title: 'Deployment', detail: 'Live production release after review.' },
  { title: 'Hosting on *.vercel.app', detail: 'Your site launches on a Melhek-provisioned Vercel subdomain.' },
]

const GROWTH_ITEMS: GrowthItem[] = [
  { id: 'domain_com', title: 'Professional .com domain', description: 'Custom domain connected to your site when you are ready for a permanent brand address.', icon: Globe },
  { id: 'domain_et', title: '.et domain', description: 'Ethiopian domain registration and DNS configuration for local brand authority.', icon: Globe },
  { id: 'email', title: 'Professional email', description: 'Branded mailboxes (you@yourbrand.com) with proper deliverability setup.', icon: Mail },
  { id: 'ai_chat', title: 'AI chatbot', description: 'Amharic/English assistant trained on your business content for 24/7 inquiries.', icon: Bot },
  { id: 'crm', title: 'CRM', description: 'Lead pipeline, follow-ups, and client history in one workspace.', icon: Users },
  { id: 'erp', title: 'ERP', description: 'Operations software for finance, procurement, and multi-team workflows.', icon: Layers },
  { id: 'inventory', title: 'Inventory', description: 'Stock tracking, alerts, and multi-branch visibility.', icon: Package },
  { id: 'booking', title: 'Booking platform', description: 'Appointments, rooms, or services with calendar control.', icon: Calendar },
  { id: 'payments', title: 'Payment integration', description: 'Telebirr, CBE Birr, or card checkout — scoped as a dedicated project.', icon: CreditCard },
  { id: 'analytics', title: 'Analytics', description: 'Conversion and traffic dashboards beyond basic SEO setup.', icon: BarChart3 },
  { id: 'maintenance', title: 'Maintenance', description: 'Ongoing updates, monitoring, and content changes on a retainer.', icon: Wrench },
  { id: 'marketing', title: 'Marketing automation', description: 'Email, Telegram, and nurture sequences tied to your funnel.', icon: Zap },
  { id: 'landing', title: 'Landing pages', description: 'Campaign-specific pages beyond the sponsored five-page foundation.', icon: Sparkles },
  { id: 'portal', title: 'Customer portal', description: 'Logged-in experiences for clients, members, or partners.', icon: UserCheck },
  { id: 'auth', title: 'Authentication', description: 'Secure sign-in, roles, and account management.', icon: KeyRound },
  { id: 'custom', title: 'Custom software', description: 'Anything outside the sponsored foundation — properly scoped and priced.', icon: Server },
]

const SOFT_SELL_GROWTH_CARDS = [
  { id: 'Professional Domain', title: 'Professional Domain', desc: '.com / .et' },
  { id: 'Branded Email', title: 'Branded Email', desc: 'Professional business communication' },
  { id: 'AI Assistant', title: 'AI Assistant', desc: '24/7 customer support and business information' },
  { id: 'CRM / ERP', title: 'CRM / ERP', desc: 'Manage customers, operations and internal workflows' },
  { id: 'Booking & Payments', title: 'Booking & Payments', desc: 'Appointments, bookings and supported payment integrations' },
  { id: 'Automation & Maintenance', title: 'Automation & Maintenance', desc: 'Reduce repetitive work and keep your digital systems running' },
]

const TIMELINE = [
  { step: '01', title: 'Invitation', desc: 'You receive a private invitation to the Melhek Digital Partner Program.' },
  { step: '02', title: 'Accept & agree', desc: 'Review the program, accept the invitation, and sign the digital agreement.' },
  { step: '03', title: 'Business discovery', desc: 'Share goals, audience, brand assets, and page priorities.' },
  { step: '04', title: 'Strategy', desc: 'We define sitemap, messaging hierarchy, and UX structure.' },
  { step: '05', title: 'Design', desc: 'UI/UX design for up to five pages.' },
  { step: '06', title: 'Development', desc: 'Responsive build, contact form, basic SEO, and SSL.' },
  { step: '07', title: 'Review', desc: 'You preview the site and request in-scope refinements.' },
  { step: '08', title: 'Launch', desc: 'Deployed live on your *.vercel.app subdomain.' },
  { step: '09', title: 'Grow together', desc: 'Domain, email, software, and automation scoped as separate projects when you need them.' },
]

const FAQS: FaqItem[] = [
  {
    id: 'f1',
    question: 'What exactly is sponsored?',
    answer:
      'Only the foundation package: discovery, strategy, UI/UX, responsive development (maximum 5 pages), basic SEO, SSL, one contact form, deployment, and hosting on a *.vercel.app subdomain. Nothing else is included unless separately scoped.',
  },
  {
    id: 'f2',
    question: 'Why does Melhek sponsor the foundation?',
    answer:
      'Because long-term partnerships outperform one-off projects. We invest in a carefully selected cohort to build trust and a durable technology relationship. The sponsored website is the starting point — not the whole offer.',
  },
  {
    id: 'f3',
    question: 'Is this a free website program?',
    answer:
      'No. This is an invitation-only strategic partnership. The sponsored website is one benefit of that relationship. Growth work — domains, email, software, integrations — is scoped and priced as your business expands.',
  },
  {
    id: 'f4',
    question: 'Who owns the website and content?',
    answer:
      'You own your business content, brand assets, and the site deliverables produced for you. Melhek retains the right to reference the engagement in our portfolio unless you opt out in writing. Custom domains you purchase remain yours.',
  },
  {
    id: 'f5',
    question: 'Where will my site be hosted?',
    answer:
      'On a Melhek-provisioned *.vercel.app subdomain. Professional .com or .et domains, and branded email, are available as your business grows — they are not part of the sponsorship.',
  },
  {
    id: 'f6',
    question: 'What if I need more than 5 pages or custom software?',
    answer:
      'That becomes a separate, clearly scoped project with timeline and investment defined upfront. No hidden extras. No surprises mid-build.',
  },
  {
    id: 'f7',
    question: 'How long until launch?',
    answer:
      'After discovery is complete and assets are provided, typical foundation delivery is within 14 business days, subject to your review turnaround.',
  },
  {
    id: 'f8',
    question: 'Does sponsorship include maintenance?',
    answer:
      'No. Ongoing maintenance, content updates, and new features are available under a separate agreement when you need them.',
  },
]

const AGREEMENT_SECTIONS = [
  {
    title: '1. Nature of the relationship',
    body: 'This agreement establishes a strategic partnership between Melhek Technologies (“Melhek”) and the invited Partner. The sponsored website is one benefit of that partnership. It is not a free public website offer and does not create an employment, joint-venture, or agency relationship unless separately agreed in writing.',
  },
  {
    title: '2. Sponsored scope (exact boundary)',
    body: 'Melhek will provide, at no charge to the Partner for this sponsorship cycle: (a) one discovery session; (b) website strategy; (c) UI/UX design; (d) responsive development; (e) a maximum of five (5) pages; (f) basic SEO; (g) SSL; (h) one contact form; (i) deployment; and (j) hosting on a Melhek-provisioned *.vercel.app subdomain. Anything outside this list is excluded from the sponsorship.',
  },
  {
    title: '3. Available as your business grows',
    body: 'Professional domains (.com / .et), professional email, AI chatbot, CRM, ERP, inventory, booking platforms, payment integrations, analytics beyond basic SEO, maintenance, marketing automation, additional landing pages, customer portals, authentication, and any custom software are not included. These may be proposed later as separately scoped, priced projects.',
  },
  {
    title: '4. Partner responsibilities',
    body: 'The Partner will: complete the Business Discovery Form accurately; provide logos, copy, photos, and approvals in a timely manner; designate an authorized decision-maker; and communicate professionally. Delays in Partner assets or feedback extend delivery timelines accordingly.',
  },
  {
    title: '5. Melhek responsibilities',
    body: 'Melhek will deliver the sponsored scope to a professional standard, keep the Partner informed of progress, and host the foundation site on *.vercel.app for the sponsorship term. Melhek does not provide ongoing maintenance under this sponsorship unless a separate agreement is executed.',
  },
  {
    title: '6. Intellectual property & content',
    body: 'Partner retains ownership of Partner-supplied content, trademarks, and brand assets. Upon completion of the sponsored deliverables, Partner receives ownership of the custom page designs and front-end code produced specifically for Partner under this sponsorship, subject to Melhek’s retained rights in pre-existing tools, libraries, frameworks, and generic components.',
  },
  {
    title: '7. Domain & hosting ownership',
    body: 'The sponsored hosting environment is a Melhek-provisioned *.vercel.app subdomain. Custom domains purchased by Partner remain Partner property. Connecting a custom domain is outside sponsorship and requires a separate scope.',
  },
  {
    title: '8. Portfolio permission',
    body: 'Partner grants Melhek permission to display the completed website, brand name, and non-confidential screenshots in Melhek’s portfolio, case studies, and marketing. Partner may revoke this permission by written notice; Melhek will remove public references within a reasonable period.',
  },
  {
    title: '9. Privacy',
    body: 'Personal data collected through this onboarding flow (name, contact details, business information, signature record) is used solely to administer the partnership, deliver the sponsored work, and communicate about related services. Melhek will not sell Partner personal data to third parties.',
  },
  {
    title: '10. Third-party services',
    body: 'Hosting and related infrastructure may rely on third-party providers (including Vercel). Melhek is not liable for outages or changes outside Melhek’s reasonable control. Partner acknowledges third-party terms may apply to those services.',
  },
  {
    title: '11. Revisions & change control',
    body: 'In-scope design and content refinements are included during the review phase. Requests that add pages beyond five, new software features, integrations, or significant redesigns after approval are change requests and require a new scope.',
  },
  {
    title: '12. Professional conduct',
    body: 'Both parties agree to respectful, timely communication. Melhek may pause or terminate the sponsorship for abusive conduct, material misrepresentation, or sustained non-responsiveness that prevents delivery.',
  },
  {
    title: '13. Termination',
    body: 'Either party may terminate this sponsorship by written notice. If terminated before launch due to Partner non-responsiveness or breach, Melhek may withhold incomplete deliverables. If terminated by Melhek without Partner breach after substantial work, Melhek will transfer completed in-scope work product then available.',
  },
  {
    title: '14. No mandatory promotion',
    body: 'Partner is never required to post advertisements or endorsements for Melhek. Any public recommendation must be voluntary and authentic.',
  },
  {
    title: '15. Entire understanding',
    body: 'This digital agreement, together with the sponsored scope listed herein, constitutes the entire understanding for this sponsorship cycle. Amendments must be confirmed in writing (including email) by both parties.',
  },
]

const IN_SCOPE_FEATURES = [
  'Contact form',
  'About / story page',
  'Services or offerings overview',
  'Gallery or portfolio section',
  'Location / contact details',
]

const INDUSTRIES = [
  'Sales & marketing',
  'Real estate & property',
  'Business consulting',
  'Training & education',
  'Creator / media brand',
  'Professional services',
  'Retail & e-commerce',
  'Hospitality & tourism',
  'Healthcare & clinics',
  'Other',
]

const PRIMARY_GOALS = [
  'Build a credible digital presence',
  'Capture inquiries through a contact form',
  'Present services clearly',
  'Support offline brand with an online foundation',
]

// ── Component ────────────────────────────────────────────────────────────────

export default function DigitalPartnershipPlatform() {
  const [stage, setStage] = useState<Stage>('welcome')
  const [partnerId, setPartnerId] = useState('MDP-2026-001')
  const [expandedFaq, setExpandedFaq] = useState<string | null>('f1')

  // Partner Info state
  const [partnerName, setPartnerName] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [position, setPosition] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')

  // 5 Required Confirmations
  const [confirmScope, setConfirmScope] = useState(false)
  const [confirmDeliverables, setConfirmDeliverables] = useState(false)
  const [confirmApproval, setConfirmApproval] = useState(false)
  const [confirmFeedback, setConfirmFeedback] = useState(false)
  const [confirmPortfolio, setConfirmPortfolio] = useState(false)

  const [signatureMode, setSignatureMode] = useState<'draw' | 'type'>('type')
  const [signatureData, setSignatureData] = useState<string | null>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [discoveryStep, setDiscoveryStep] = useState(1)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const [discovery, setDiscovery] = useState<DiscoveryData>({
    businessName: '',
    ownerName: '',
    email: '',
    phone: '',
    industry: INDUSTRIES[0],
    primaryGoal: PRIMARY_GOALS[0],
    targetAudience: '',
    successOutcome: '',
    pagesNeeded: '3–5 pages — Recommended',
    inScopeFeatures: ['Contact form'],
    growthInterest: [],
    brandAssets: 'Logo available',
    notes: '',
  })

  useEffect(() => {
    const existing = localStorage.getItem('melhek_partner_id')
    if (existing) {
      setPartnerId(existing)
    } else {
      const id = `MDP-2026-${Math.floor(100 + Math.random() * 900)}`
      setPartnerId(id)
      localStorage.setItem('melhek_partner_id', id)
    }

    const signed = localStorage.getItem('melhek_partner_signed')
    let name = localStorage.getItem('melhek_partner_name') || ''
    let biz = localStorage.getItem('melhek_partner_company') || localStorage.getItem('melhek_partner_business') || ''
    let pos = localStorage.getItem('melhek_partner_position') || ''
    let ph = localStorage.getItem('melhek_partner_phone') || ''
    let em = localStorage.getItem('melhek_partner_email') || ''

    // Parse URL query parameters for pre-filled personal invitation links
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search)
      const qName = searchParams.get('name') || searchParams.get('partner')
      const qBiz = searchParams.get('company') || searchParams.get('biz')
      const qPos = searchParams.get('position') || searchParams.get('role')
      const qPhone = searchParams.get('phone') || searchParams.get('tel')
      const qEmail = searchParams.get('email')

      if (qName) name = qName
      if (qBiz) biz = qBiz
      if (qPos) pos = qPos
      if (qPhone) ph = qPhone
      if (qEmail) em = qEmail
    }

    if (name) setPartnerName(name)
    if (biz) setCompanyName(biz)
    if (pos) setPosition(pos)
    if (ph) setPhone(ph)
    if (em) setEmail(em)

    if (biz || name) {
      setDiscovery((d) => ({
        ...d,
        businessName: biz || d.businessName,
        ownerName: name || d.ownerName,
        email: em || d.email,
        phone: ph || d.phone,
      }))
    }

    const savedStage = localStorage.getItem('melhek_partner_stage') as Stage | null
    if (signed === 'true' && savedStage && STAGES.includes(savedStage)) {
      setStage(savedStage)
    }

    const savedDiscovery = localStorage.getItem('melhek_discovery_form')
    if (savedDiscovery) {
      try {
        setDiscovery(JSON.parse(savedDiscovery))
      } catch {
        /* ignore */
      }
    }
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [stage])

  const stageIndex = STAGES.indexOf(stage)
  const educationComplete = stageIndex >= STAGES.indexOf('accept')

  const goTo = (next: Stage) => {
    setStage(next)
    localStorage.setItem('melhek_partner_stage', next)
  }

  const goNext = () => {
    const i = STAGES.indexOf(stage)
    if (i < STAGES.length - 1) goTo(STAGES[i + 1])
  }

  const goBack = () => {
    const i = STAGES.indexOf(stage)
    if (i > 0) goTo(STAGES[i - 1])
  }

  const updateDiscovery = (patch: Partial<DiscoveryData>) => {
    setDiscovery((prev) => {
      const next = { ...prev, ...patch }
      localStorage.setItem('melhek_discovery_form', JSON.stringify(next))
      return next
    })
  }

  const clearSignature = () => {
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      ctx?.clearRect(0, 0, canvas.width, canvas.height)
    }
    setSignatureData(null)
  }

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true)
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const rect = canvas.getBoundingClientRect()
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height
    ctx.beginPath()
    ctx.moveTo((clientX - rect.left) * scaleX, (clientY - rect.top) * scaleY)
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const rect = canvas.getBoundingClientRect()
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height
    ctx.lineWidth = 2.5
    ctx.lineCap = 'round'
    ctx.strokeStyle = '#7FA9FF'
    ctx.lineTo((clientX - rect.left) * scaleX, (clientY - rect.top) * scaleY)
    ctx.stroke()
  }

  const stopDrawing = () => {
    if (!isDrawing) return
    setIsDrawing(false)
    const canvas = canvasRef.current
    if (canvas) setSignatureData(canvas.toDataURL())
  }

  const typedSignature = (name: string) => {
    const canvas = document.createElement('canvas')
    canvas.width = 600
    canvas.height = 120
    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.fillStyle = '#0B132B'
      ctx.fillRect(0, 0, 600, 120)
      ctx.font = 'italic 32px Georgia, serif'
      ctx.fillStyle = '#7FA9FF'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(name, 300, 60)
    }
    return canvas.toDataURL()
  }

  const submitPartnership = async (sig: string | null, discoveryOverride?: DiscoveryData) => {
    setSubmitError(null)
    setSubmitting(true)
    try {
      const signedDateStr = new Date().toLocaleDateString('en-GB')
      const res = await fetch('/api/partnership/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          partnerId,
          partnerFullName: partnerName || localStorage.getItem('melhek_partner_name') || '',
          companyName: companyName || localStorage.getItem('melhek_partner_company') || '',
          position: position || localStorage.getItem('melhek_partner_position') || '',
          email: email || localStorage.getItem('melhek_partner_email') || '',
          phone: phone || localStorage.getItem('melhek_partner_phone') || '',
          signatureData: sig,
          dateSigned: signedDateStr,
          confirmations: {
            confirmScope,
            confirmDeliverables,
            confirmApproval,
            confirmFeedback,
            confirmPortfolio,
          },
          discoveryData: discoveryOverride || discovery,
        }),
      })
      if (!res.ok) throw new Error('Submission failed. Please try again.')
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Submission failed.')
      throw err
    } finally {
      setSubmitting(false)
    }
  }

  const handleSign = async (e: React.FormEvent) => {
    e.preventDefault()

    const allConfirmed = confirmScope && confirmDeliverables && confirmApproval && confirmFeedback && confirmPortfolio
    if (!allConfirmed || !partnerName.trim() || !companyName.trim()) return

    let sig = signatureData
    if (signatureMode === 'type' || !sig) {
      sig = typedSignature(partnerName.trim())
      setSignatureData(sig)
    }

    const todayStr = new Date().toLocaleDateString('en-GB')

    localStorage.setItem('melhek_partner_signed', 'true')
    localStorage.setItem('melhek_partner_name', partnerName.trim())
    localStorage.setItem('melhek_partner_company', companyName.trim())
    localStorage.setItem('melhek_partner_business', companyName.trim())
    localStorage.setItem('melhek_partner_position', position.trim())
    localStorage.setItem('melhek_partner_phone', phone.trim())
    localStorage.setItem('melhek_partner_email', email.trim())
    localStorage.setItem('melhek_partner_signed_date', todayStr)

    const updatedDiscovery = {
      ...discovery,
      businessName: companyName.trim() || discovery.businessName,
      ownerName: partnerName.trim() || discovery.ownerName,
      email: email.trim() || discovery.email,
      phone: phone.trim() || discovery.phone,
    }
    updateDiscovery(updatedDiscovery)

    try {
      await submitPartnership(sig, updatedDiscovery)
      goTo('confirmation')
    } catch {
      // error surfaced via submitError
    }
  }

  const handleCompleteDiscovery = async () => {
    const payload = {
      ...discovery,
      businessName: discovery.businessName || companyName,
      ownerName: discovery.ownerName || partnerName,
    }
    localStorage.setItem('melhek_discovery_completed', 'true')
    localStorage.setItem('melhek_discovery_form', JSON.stringify(payload))
    try {
      await submitPartnership(signatureData, payload)
      goTo('success')
    } catch {
      // keep user on discovery with error
    }
  }

  const NavBackNext = ({
    nextLabel,
    onNext,
    disableNext,
  }: {
    nextLabel?: string
    onNext?: () => void
    disableNext?: boolean
  }) => (
    <div className="flex items-center justify-between gap-4 pt-10">
      <button
        type="button"
        onClick={goBack}
        className="btn-secondary !px-5 !py-3 text-xs font-mono uppercase tracking-wider inline-flex items-center gap-2"
      >
        <ChevronLeft className="w-4 h-4" /> Back
      </button>
      <button
        type="button"
        disabled={disableNext}
        onClick={onNext || goNext}
        className="btn-primary !px-6 !py-3 text-xs font-mono uppercase tracking-wider inline-flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {nextLabel || 'Continue'} <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  )

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
      <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-melhek-blue font-bold">{kicker}</span>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
        {title}
      </h2>
      {subtitle && <p className="text-sm sm:text-base text-white/65 font-light leading-relaxed">{subtitle}</p>}
    </div>
  )

  // Progress for education stages (welcome → accept)
  const educationStages = STAGES.slice(0, STAGES.indexOf('accept') + 1)
  const educationIndex = educationStages.indexOf(stage as (typeof educationStages)[number])

  return (
    <div className="min-h-screen bg-melhek-dark text-white selection:bg-melhek-blue selection:text-melhek-navy font-sans relative overflow-x-hidden">
      <div className="grain-overlay" aria-hidden />
      <div className="digital-grid" aria-hidden />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-melhek-navy/90 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-18 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-9 h-9 rounded-xl bg-melhek-blue/15 border border-melhek-blue/40 flex items-center justify-center text-melhek-blue">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="leading-tight">
              <span className="font-display font-extrabold text-sm tracking-tight block">Melhek</span>
              <span className="text-[10px] font-mono text-white/45 uppercase tracking-wider">Digital Partner Program</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-2 text-[10px] font-mono text-white/50">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Invitation only
            </span>
            <span className="px-2.5 py-1 rounded-lg border border-white/10 bg-black/30">
              Ref <span className="text-melhek-blue font-bold">{partnerId}</span>
            </span>
          </div>
        </div>

        {/* Education progress */}
        {educationIndex >= 0 && stage !== 'success' && (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-3">
            <div className="flex gap-1">
              {educationStages.map((s, i) => (
                <div
                  key={s}
                  className={`h-1 flex-1 rounded-full transition-colors ${
                    i <= educationIndex ? 'bg-melhek-blue' : 'bg-white/10'
                  }`}
                  title={STAGE_LABELS[s]}
                />
              ))}
            </div>
            <p className="mt-2 text-[10px] font-mono text-white/40 uppercase tracking-wider">
              {STAGE_LABELS[stage]} · Step {Math.min(educationIndex + 1, educationStages.length)} of {educationStages.length}
            </p>
          </div>
        )}
      </header>

      <main className={`pb-24 ${educationIndex >= 0 && stage !== 'success' ? 'pt-28 sm:pt-32' : 'pt-24'}`}>
        <AnimatePresence mode="wait">
          {/* ── WELCOME ── */}
          {stage === 'welcome' && (
            <motion.section
              key="welcome"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28 }}
              className="max-w-4xl mx-auto px-4 sm:px-6"
            >
              <div className="text-center space-y-6 py-8 sm:py-14">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-melhek-blue/30 bg-melhek-blue/10 text-melhek-blue text-[11px] font-mono uppercase tracking-[0.18em]">
                  <Sparkles className="w-3.5 h-3.5" /> Private invitation
                </div>
                <h1 className="text-4xl sm:text-6xl font-display font-extrabold tracking-tight leading-[1.08]">
                  Melhek Digital
                  <br />
                  <span className="text-gradient">Partner Program</span>
                </h1>
                <p className="text-base sm:text-lg text-white/70 font-light max-w-2xl mx-auto leading-relaxed">
                  You were invited into a selective technology partnership. The sponsored website is one benefit.
                  The relationship is the product.
                </p>

                <div className="glass rounded-3xl border-white/10 bg-melhek-navy/60 p-6 sm:p-8 text-left max-w-2xl mx-auto space-y-4">
                  <div className="flex gap-4">
                    <div className="w-11 h-11 rounded-2xl bg-melhek-blue/15 border border-melhek-blue/30 flex items-center justify-center text-melhek-blue shrink-0">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white">Not a free website program</h3>
                      <p className="text-sm text-white/60 font-light mt-1 leading-relaxed">
                        Melhek sponsors a clear digital foundation for selected partners — then grows with you through properly scoped projects. No hidden extras. No bait-and-switch.
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={goNext}
                  className="btn-primary inline-flex items-center gap-3 px-8 py-4 text-xs font-mono uppercase tracking-widest"
                >
                  Explore the program <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.section>
          )}

          {/* ── PROGRAM ── */}
          {stage === 'program' && (
            <motion.section
              key="program"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28 }}
              className="max-w-5xl mx-auto px-4 sm:px-6"
            >
              <SectionHeader
                kicker="The program"
                title="A strategic partnership — not a transaction"
                subtitle="Melhek Technologies builds long-term technology relationships with selected Ethiopian businesses and creators. We replace PDF proposals with a clear, guided onboarding experience."
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                {[
                  {
                    title: 'Educate & align',
                    desc: 'Understand the partnership, the sponsored foundation, and what comes later — before you sign anything.',
                    icon: Shield,
                  },
                  {
                    title: 'Foundation first',
                    desc: 'A sponsored website (max 5 pages) becomes your credible digital base on *.vercel.app.',
                    icon: Building2,
                  },
                  {
                    title: 'Grow with clarity',
                    desc: 'Domains, email, software, and integrations are scoped honestly as your business expands.',
                    icon: Layers,
                  },
                ].map((card) => {
                  const Icon = card.icon
                  return (
                    <div key={card.title} className="glass p-6 rounded-3xl border-white/10 bg-melhek-navy/50 space-y-3">
                      <div className="w-10 h-10 rounded-xl bg-melhek-blue/15 border border-melhek-blue/30 flex items-center justify-center text-melhek-blue">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-base font-bold text-white">{card.title}</h3>
                      <p className="text-sm text-white/60 font-light leading-relaxed">{card.desc}</p>
                    </div>
                  )
                })}
              </div>

              <NavBackNext nextLabel="Why you were invited" />
            </motion.section>
          )}

          {/* ── WHY YOU ── */}
          {stage === 'why' && (
            <motion.section
              key="why"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28 }}
              className="max-w-4xl mx-auto px-4 sm:px-6"
            >
              <SectionHeader
                kicker="Selection"
                title="You were not invited by chance"
                subtitle="We choose a limited cohort each year — partners whose reputation, impact, and long-term ambition align with how Melhek builds software."
              />

              <div className="glass rounded-[2rem] border-melhek-blue/25 bg-gradient-to-br from-melhek-blue/10 via-melhek-navy/80 to-transparent p-8 sm:p-10 space-y-6 mb-2">
                <p className="text-sm sm:text-base text-white/75 font-light leading-relaxed">
                  This invitation means we see you as someone worth investing engineering time into — not as a lead for a free website giveaway.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { t: 'Real market presence', d: 'You run a genuine business or brand with people who trust you.' },
                    { t: 'Standards matter', d: 'You care about quality, clarity, and how your brand shows up.' },
                    { t: 'Digital as leverage', d: 'You want a foundation that can grow into real systems later.' },
                    { t: 'Long-term alignment', d: 'You value a dedicated technology partner, not a one-week vendor.' },
                  ].map((item) => (
                    <div key={item.t} className="flex gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/8">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-bold text-white">{item.t}</h4>
                        <p className="text-xs text-white/55 mt-1 leading-relaxed">{item.d}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <NavBackNext nextLabel="Sponsored package" />
            </motion.section>
          )}

          {/* ── PACKAGE ── */}
          {stage === 'package' && (
            <motion.section
              key="package"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28 }}
              className="max-w-5xl mx-auto px-4 sm:px-6"
            >
              <SectionHeader
                kicker="Sponsored foundation"
                title="What Melhek sponsors — exactly"
                subtitle="This list is the complete sponsorship. If it is not listed here, it is not included."
              />

              <div className="glass rounded-[2rem] border-white/10 bg-melhek-navy/75 p-6 sm:p-10 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6">
                  <div>
                    <span className="text-[11px] font-mono text-emerald-400 font-bold uppercase tracking-wider">Sponsored by Melhek</span>
                    <h3 className="text-xl sm:text-2xl font-display font-bold text-white mt-1">Digital foundation package</h3>
                    <p className="text-sm text-white/55 mt-1">One benefit of the partnership — with hard boundaries.</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/30 px-5 py-4 text-right">
                    <span className="text-[10px] font-mono text-white/40 uppercase block">Partner investment for this scope</span>
                    <span className="text-2xl font-display font-extrabold text-white">Sponsored</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {SPONSORED_INCLUDES.map((item) => (
                    <div key={item.title} className="flex gap-3 p-4 rounded-2xl bg-white/[0.02] border border-white/8">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-bold text-white">{item.title}</h4>
                        <p className="text-xs text-white/50 mt-1 leading-relaxed">{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="rounded-2xl border border-amber-400/25 bg-amber-400/5 p-4 sm:p-5">
                  <p className="text-sm text-amber-100/90 leading-relaxed">
                    <strong className="text-amber-200">Scope boundary:</strong> Maximum five pages. Hosting on <span className="font-mono text-amber-100">*.vercel.app</span> only.
                    Custom domains, email, payments, chatbots, CRMs, and maintenance are not part of this sponsorship.
                  </p>
                </div>
              </div>

              <NavBackNext nextLabel="Growth opportunities" />
            </motion.section>
          )}

          {/* ── GROWTH ── */}
          {stage === 'growth' && (
            <motion.section
              key="growth"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28 }}
              className="max-w-6xl mx-auto px-4 sm:px-6"
            >
              <SectionHeader
                kicker="As you scale"
                title="Available as your business grows"
                subtitle="The sponsorship creates the digital foundation. Everything below becomes a properly scoped project when you need it — with clear timeline and investment."
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-2">
                {GROWTH_ITEMS.map((item) => {
                  const Icon = item.icon
                  return (
                    <div
                      key={item.id}
                      className="glass p-5 rounded-2xl border-white/10 bg-melhek-navy/45 space-y-3 hover:border-melhek-blue/35 transition-colors"
                    >
                      <div className="w-9 h-9 rounded-xl bg-melhek-blue/12 border border-melhek-blue/25 flex items-center justify-center text-melhek-blue">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h4 className="text-sm font-bold text-white leading-snug">{item.title}</h4>
                      <p className="text-xs text-white/55 font-light leading-relaxed">{item.description}</p>
                    </div>
                  )
                })}
              </div>

              <p className="text-center text-xs text-white/45 mt-6 font-light">
                Plus any custom software outside the defined sponsored scope.
              </p>

              <NavBackNext nextLabel="Timeline" />
            </motion.section>
          )}

          {/* ── TIMELINE ── */}
          {stage === 'timeline' && (
            <motion.section
              key="timeline"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28 }}
              className="max-w-3xl mx-auto px-4 sm:px-6"
            >
              <SectionHeader
                kicker="Execution"
                title="How onboarding works"
                subtitle="A clear path from invitation to launch — then optional growth projects when you are ready."
              />

              <div className="glass rounded-[2rem] border-white/10 bg-melhek-navy/60 p-6 sm:p-8 space-y-1">
                {TIMELINE.map((item, idx) => (
                  <div key={item.step} className="flex gap-4 py-4 border-b border-white/5 last:border-0">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-[11px] font-mono font-bold border shrink-0 ${
                        idx === 0
                          ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400'
                          : 'bg-white/5 border-white/15 text-white/50'
                      }`}
                    >
                      {item.step}
                    </div>
                    <div className="pt-1">
                      <h4 className="text-sm font-bold text-white">{item.title}</h4>
                      <p className="text-xs text-white/55 mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <NavBackNext nextLabel="FAQ" />
            </motion.section>
          )}

          {/* ── FAQ ── */}
          {stage === 'faq' && (
            <motion.section
              key="faq"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28 }}
              className="max-w-3xl mx-auto px-4 sm:px-6"
            >
              <SectionHeader
                kicker="Clarity"
                title="Questions worth answering now"
                subtitle="Read these before you accept. We would rather over-explain scope than under-deliver trust."
              />

              <div className="space-y-3">
                {FAQS.map((faq) => {
                  const open = expandedFaq === faq.id
                  return (
                    <div key={faq.id} className="glass rounded-2xl border-white/10 overflow-hidden bg-melhek-navy/50">
                      <button
                        type="button"
                        onClick={() => setExpandedFaq(open ? null : faq.id)}
                        className="w-full flex items-center justify-between gap-4 p-5 text-left"
                      >
                        <span className="flex items-start gap-3 text-sm font-bold text-white">
                          <HelpCircle className="w-4 h-4 text-melhek-blue shrink-0 mt-0.5" />
                          {faq.question}
                        </span>
                        <ChevronDown className={`w-4 h-4 text-white/40 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence initial={false}>
                        {open && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <p className="px-5 pb-5 pl-12 text-sm text-white/60 leading-relaxed font-light border-t border-white/5 pt-4">
                              {faq.answer}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                })}
              </div>

              <NavBackNext nextLabel="Accept invitation" />
            </motion.section>
          )}

          {/* ── ACCEPT INVITATION & ENTER DETAILS ── */}
          {stage === 'accept' && (
            <motion.section
              key="accept"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28 }}
              className="max-w-3xl mx-auto px-4 sm:px-6"
            >
              <SectionHeader
                kicker="Step 01 — Commitment"
                title="Accept your partnership invitation"
                subtitle="Review the partnership terms and confirm your details. Takes 2–3 minutes."
              />

              <div className="glass rounded-[2rem] border-white/10 bg-melhek-navy/70 p-6 sm:p-10 space-y-6">
                <ul className="space-y-3">
                  {[
                    'Invitation-only strategic partnership with Melhek Technologies.',
                    'Includes sponsored foundation website (max 5 pages, *.vercel.app hosting).',
                    'Domains, email, CRM, AI chatbot, and custom software available as your business grows.',
                  ].map((line) => (
                    <li key={line} className="flex gap-3 text-sm text-white/75 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      {line}
                    </li>
                  ))}
                </ul>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-white/10 pt-6">
                  <div>
                    <label className="text-[11px] font-mono text-white/40 uppercase block mb-1">Company / Brand Name *</label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => {
                        setCompanyName(e.target.value)
                        updateDiscovery({ businessName: e.target.value })
                      }}
                      placeholder="e.g. Acme Tech Solutions"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-melhek-blue"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-mono text-white/40 uppercase block mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      value={partnerName}
                      onChange={(e) => {
                        setPartnerName(e.target.value)
                        updateDiscovery({ ownerName: e.target.value })
                      }}
                      placeholder="e.g. Bethlehem Tilahun"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-melhek-blue"
                    />
                  </div>
                </div>
              </div>

              <NavBackNext
                nextLabel="Proceed to Agreement"
                disableNext={!companyName.trim() || !partnerName.trim()}
                onNext={() => {
                  localStorage.setItem('melhek_partner_company', companyName.trim())
                  localStorage.setItem('melhek_partner_business', companyName.trim())
                  localStorage.setItem('melhek_partner_name', partnerName.trim())
                  goTo('agreement')
                }}
              />
            </motion.section>
          )}

          {/* ── AGREEMENT ── */}
          {stage === 'agreement' && (
            <motion.section
              key="agreement"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28 }}
              className="max-w-3xl mx-auto px-4 sm:px-6"
            >
              <SectionHeader
                kicker="Digital Agreement"
                title="Partnership agreement"
                subtitle="Simple, transparent terms. Takes 2–3 minutes to review and sign."
              />

              <div className="glass rounded-[2rem] border-white/10 bg-melhek-navy/80 p-5 sm:p-8 space-y-6">
                <div className="flex flex-wrap gap-3 text-[11px] font-mono text-white/50">
                  <span className="px-3 py-1.5 rounded-lg border border-white/10 bg-black/30">
                    Ref <span className="text-melhek-blue font-bold">{partnerId}</span>
                  </span>
                  <span className="px-3 py-1.5 rounded-lg border border-white/10 bg-black/30">
                    Date: <span className="text-white">{new Date().toLocaleDateString('en-GB')}</span>
                  </span>
                </div>

                {/* Partner Information Inputs */}
                <div className="space-y-4 border-b border-white/10 pb-6">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-melhek-blue" /> Partner Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-mono text-white/40 uppercase block mb-1">Name *</label>
                      <input
                        type="text"
                        required
                        value={partnerName}
                        onChange={(e) => setPartnerName(e.target.value)}
                        placeholder="Full Name"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-melhek-blue"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-mono text-white/40 uppercase block mb-1">Company / Organization *</label>
                      <input
                        type="text"
                        required
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="Company Name"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-melhek-blue"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-mono text-white/40 uppercase block mb-1">Position / Role</label>
                      <input
                        type="text"
                        value={position}
                        onChange={(e) => setPosition(e.target.value)}
                        placeholder="e.g. Founder / CEO / Director"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-melhek-blue"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-mono text-white/40 uppercase block mb-1">Phone / Telegram *</label>
                      <input
                        type="text"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+251 9... or @username"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-melhek-blue"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-[11px] font-mono text-white/40 uppercase block mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@company.com"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-melhek-blue"
                      />
                    </div>
                  </div>
                </div>

                {/* Agreement Terms Scrollable Box */}
                <div className="space-y-2">
                  <span className="text-[11px] font-mono text-white/40 uppercase block">Agreement Terms</span>
                  <div className="h-60 overflow-y-auto rounded-2xl border border-white/10 bg-black/40 p-5 space-y-4 text-xs text-white/70 font-light leading-relaxed">
                    {AGREEMENT_SECTIONS.map((section) => (
                      <div key={section.title} className="space-y-1">
                        <h4 className="text-white font-bold text-xs">{section.title}</h4>
                        <p>{section.body}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Required Confirmations (5 Required Checkboxes) */}
                <form onSubmit={handleSign} className="space-y-5 pt-2 border-t border-white/10">
                  <div className="space-y-3">
                    <span className="text-[11px] font-mono text-white/40 uppercase block mb-1">Required Confirmations</span>

                    <label className="flex items-start gap-3 cursor-pointer p-2.5 rounded-xl hover:bg-white/[0.02] transition-colors">
                      <input
                        type="checkbox"
                        checked={confirmScope}
                        onChange={(e) => setConfirmScope(e.target.checked)}
                        className="mt-0.5 w-4 h-4 rounded border-white/20 bg-white/5 text-melhek-blue focus:ring-melhek-blue"
                      />
                      <span className="text-xs text-white/85">I have reviewed the partnership scope.</span>
                    </label>

                    <label className="flex items-start gap-3 cursor-pointer p-2.5 rounded-xl hover:bg-white/[0.02] transition-colors">
                      <input
                        type="checkbox"
                        checked={confirmDeliverables}
                        onChange={(e) => setConfirmDeliverables(e.target.checked)}
                        className="mt-0.5 w-4 h-4 rounded border-white/20 bg-white/5 text-melhek-blue focus:ring-melhek-blue"
                      />
                      <span className="text-xs text-white/85">I understand the sponsored package is limited to the stated deliverables.</span>
                    </label>

                    <label className="flex items-start gap-3 cursor-pointer p-2.5 rounded-xl hover:bg-white/[0.02] transition-colors">
                      <input
                        type="checkbox"
                        checked={confirmApproval}
                        onChange={(e) => setConfirmApproval(e.target.checked)}
                        className="mt-0.5 w-4 h-4 rounded border-white/20 bg-white/5 text-melhek-blue focus:ring-melhek-blue"
                      />
                      <span className="text-xs text-white/85">I understand additional services and third-party costs require separate approval.</span>
                    </label>

                    <label className="flex items-start gap-3 cursor-pointer p-2.5 rounded-xl hover:bg-white/[0.02] transition-colors">
                      <input
                        type="checkbox"
                        checked={confirmFeedback}
                        onChange={(e) => setConfirmFeedback(e.target.checked)}
                        className="mt-0.5 w-4 h-4 rounded border-white/20 bg-white/5 text-melhek-blue focus:ring-melhek-blue"
                      />
                      <span className="text-xs text-white/85">I agree to provide necessary content/assets and timely feedback.</span>
                    </label>

                    <label className="flex items-start gap-3 cursor-pointer p-2.5 rounded-xl hover:bg-white/[0.02] transition-colors">
                      <input
                        type="checkbox"
                        checked={confirmPortfolio}
                        onChange={(e) => setConfirmPortfolio(e.target.checked)}
                        className="mt-0.5 w-4 h-4 rounded border-white/20 bg-white/5 text-melhek-blue focus:ring-melhek-blue"
                      />
                      <span className="text-xs text-white/85">I understand Melhek may showcase the completed work in its portfolio.</span>
                    </label>
                  </div>

                  {/* Signature Mode */}
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between gap-3 flex-wrap">
                      <span className="text-[11px] font-mono text-white/40 uppercase inline-flex items-center gap-1.5">
                        <FileSignature className="w-3.5 h-3.5 text-melhek-blue" /> Signature
                      </span>
                      <div className="flex gap-1 p-1 rounded-xl bg-white/5 border border-white/10 text-xs font-mono">
                        <button
                          type="button"
                          onClick={() => setSignatureMode('type')}
                          className={`px-3 py-1.5 rounded-lg ${signatureMode === 'type' ? 'bg-melhek-blue text-melhek-navy font-bold' : 'text-white/60'}`}
                        >
                          Type Name
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setSignatureMode('draw')
                            clearSignature()
                          }}
                          className={`px-3 py-1.5 rounded-lg ${signatureMode === 'draw' ? 'bg-melhek-blue text-melhek-navy font-bold' : 'text-white/60'}`}
                        >
                          Optional Drawn
                        </button>
                      </div>
                    </div>

                    {signatureMode === 'type' ? (
                      <div className="rounded-2xl border border-white/10 bg-black/40 p-6 text-center">
                        {partnerName.trim() ? (
                          <span className="font-serif italic text-2xl text-melhek-blue">{partnerName}</span>
                        ) : (
                          <span className="text-xs font-mono text-white/30">Enter your name above to generate signature preview</span>
                        )}
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="flex justify-end">
                          <button type="button" onClick={clearSignature} className="text-[11px] font-mono text-red-400 hover:underline">
                            Clear canvas
                          </button>
                        </div>
                        <div className="relative rounded-2xl border border-white/15 bg-black/50 overflow-hidden">
                          <canvas
                            ref={canvasRef}
                            width={600}
                            height={120}
                            onMouseDown={startDrawing}
                            onMouseMove={draw}
                            onMouseUp={stopDrawing}
                            onMouseLeave={stopDrawing}
                            onTouchStart={startDrawing}
                            onTouchMove={draw}
                            onTouchEnd={stopDrawing}
                            className="w-full h-32 touch-none cursor-crosshair"
                          />
                          {!signatureData && (
                            <div className="absolute inset-0 pointer-events-none flex items-center justify-center text-white/25 text-xs font-mono">
                              Draw signature here
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {submitError && (
                    <p className="text-sm text-red-400 flex items-center gap-2">
                      <Lock className="w-4 h-4" /> {submitError}
                    </p>
                  )}

                  <div className="flex items-center justify-between gap-4 pt-4">
                    <button type="button" onClick={goBack} className="btn-secondary !px-5 !py-3 text-xs font-mono uppercase tracking-wider">
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={
                        submitting ||
                        !confirmScope ||
                        !confirmDeliverables ||
                        !confirmApproval ||
                        !confirmFeedback ||
                        !confirmPortfolio ||
                        !partnerName.trim() ||
                        !companyName.trim() ||
                        (signatureMode === 'draw' && !signatureData)
                      }
                      className="btn-primary !px-8 !py-3.5 text-xs font-mono uppercase tracking-widest inline-flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {submitting ? 'Registering…' : 'Accept Partnership'}
                      <Check className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              </div>
            </motion.section>
          )}

          {/* ── CONFIRMATION / WELCOME POST-ACCEPTANCE ── */}
          {stage === 'confirmation' && (
            <motion.section
              key="confirmation"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28 }}
              className="max-w-2xl mx-auto px-4 sm:px-6"
            >
              <div className="text-center space-y-4 mb-8">
                <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white">
                  Welcome to the Melhek Digital Partner Program
                </h2>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl border border-melhek-blue/30 bg-melhek-blue/10 text-melhek-blue font-mono font-bold text-sm">
                  Partner ID: {partnerId}
                </div>
                <p className="text-sm text-white/70 font-light max-w-md mx-auto leading-relaxed pt-1">
                  Your partnership has been successfully registered.
                </p>
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 max-w-md mx-auto">
                  <span className="text-xs text-emerald-400 font-bold font-mono">Next step: Complete your Business Discovery.</span>
                </div>
              </div>

              <div className="glass rounded-[2rem] border-white/10 bg-melhek-navy/80 overflow-hidden">
                <div className="p-6 sm:p-8 border-b border-white/10 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-melhek-blue/15 border border-melhek-blue/35 flex items-center justify-center text-melhek-blue shrink-0">
                    <Shield className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-display font-bold text-white">{companyName || discovery.businessName}</h3>
                    <p className="text-xs text-white/60">Representative: {partnerName}</p>
                  </div>
                </div>

                <div className="p-6 sm:p-8 space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-left">
                    <div>
                      <span className="text-[10px] font-mono text-white/40 uppercase block">Partner ID</span>
                      <span className="text-sm font-mono font-bold text-melhek-blue">{partnerId}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-white/40 uppercase block">Partnership Status</span>
                      <span className="text-xs font-mono text-emerald-400 font-bold inline-flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Accepted
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row gap-3">
                    <button
                      type="button"
                      onClick={() => goTo('discovery')}
                      className="btn-primary flex-1 justify-center py-3.5 text-xs font-mono uppercase tracking-widest inline-flex items-center gap-2"
                    >
                      Complete Business Discovery <ArrowRight className="w-4 h-4" />
                    </button>
                    <Link
                      href={`/partner/${partnerId}`}
                      className="btn-secondary flex-1 justify-center py-3.5 text-xs font-mono uppercase tracking-wider inline-flex items-center gap-2 text-center"
                    >
                      View Partner Dashboard
                    </Link>
                  </div>
                </div>
              </div>
            </motion.section>
          )}

          {/* ── DISCOVERY ── */}
          {stage === 'discovery' && (
            <motion.section
              key="discovery"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28 }}
              className="max-w-2xl mx-auto px-4 sm:px-6"
            >
              <SectionHeader
                kicker="Intake"
                title="Business discovery"
                subtitle="Help us design your foundation site. Features outside the sponsored scope are marked as growth interest only."
              />

              <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden mb-6 border border-white/10">
                <div
                  className="h-full bg-melhek-blue transition-all duration-300"
                  style={{ width: `${(discoveryStep / 4) * 100}%` }}
                />
              </div>

              <div className="glass rounded-[2rem] border-white/10 bg-melhek-navy/80 p-6 sm:p-8">
                {discoveryStep === 1 && (
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-white border-b border-white/10 pb-3 flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-melhek-blue" /> Contact
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[11px] font-mono text-white/40 uppercase block mb-1">Business name *</label>
                        <input
                          type="text"
                          value={discovery.businessName || companyName}
                          onChange={(e) => {
                            setCompanyName(e.target.value)
                            updateDiscovery({ businessName: e.target.value })
                          }}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-melhek-blue"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-mono text-white/40 uppercase block mb-1">Your name *</label>
                        <input
                          type="text"
                          value={discovery.ownerName || partnerName}
                          onChange={(e) => {
                            setPartnerName(e.target.value)
                            updateDiscovery({ ownerName: e.target.value })
                          }}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-melhek-blue"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-mono text-white/40 uppercase block mb-1">Email *</label>
                        <input
                          type="email"
                          value={discovery.email || email}
                          onChange={(e) => {
                            setEmail(e.target.value)
                            updateDiscovery({ email: e.target.value })
                          }}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-melhek-blue"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-mono text-white/40 uppercase block mb-1">Phone / Telegram *</label>
                        <input
                          type="text"
                          value={discovery.phone || phone}
                          onChange={(e) => {
                            setPhone(e.target.value)
                            updateDiscovery({ phone: e.target.value })
                          }}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-melhek-blue"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-[11px] font-mono text-white/40 uppercase block mb-1">Industry</label>
                      <select
                        value={discovery.industry}
                        onChange={(e) => updateDiscovery({ industry: e.target.value })}
                        className="w-full bg-melhek-navy border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-melhek-blue"
                      >
                        {INDUSTRIES.map((ind) => (
                          <option key={ind} value={ind}>
                            {ind}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

                {discoveryStep === 2 && (
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-white border-b border-white/10 pb-3">Goals</h3>
                    <div className="grid grid-cols-1 gap-2">
                      {PRIMARY_GOALS.map((goal) => (
                        <button
                          key={goal}
                          type="button"
                          onClick={() => updateDiscovery({ primaryGoal: goal })}
                          className={`p-3.5 rounded-xl border text-left text-sm transition-all ${
                            discovery.primaryGoal === goal
                              ? 'bg-melhek-blue/20 border-melhek-blue text-white font-bold'
                              : 'bg-white/5 border-white/10 text-white/65'
                          }`}
                        >
                          {goal}
                        </button>
                      ))}
                    </div>
                    <div>
                      <label className="text-[11px] font-mono text-white/40 uppercase block mb-1">Who is this site for?</label>
                      <textarea
                        rows={2}
                        value={discovery.targetAudience}
                        onChange={(e) => updateDiscovery({ targetAudience: e.target.value })}
                        placeholder="Customers, partners, visitors…"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-melhek-blue"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-mono text-white/40 uppercase block mb-1">Page Count Scope</label>
                      <select
                        value={discovery.pagesNeeded}
                        onChange={(e) => updateDiscovery({ pagesNeeded: e.target.value })}
                        className="w-full bg-melhek-navy border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-melhek-blue"
                      >
                        <optgroup label="Sponsored Website">
                          <option value="1–2 pages">1–2 pages</option>
                          <option value="3–5 pages — Recommended">3–5 pages — Recommended</option>
                        </optgroup>
                        <optgroup label="Beyond Sponsorship">
                          <option value="More than 5 pages — Separate project">More than 5 pages — Separate project</option>
                        </optgroup>
                      </select>
                    </div>
                  </div>
                )}

                {discoveryStep === 3 && (
                  <div className="space-y-5">
                    <div>
                      <h3 className="text-sm font-bold text-white mb-1">Foundation features (in sponsorship)</h3>
                      <p className="text-xs text-white/45 mb-3">Select what you want inside the five-page foundation.</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {IN_SCOPE_FEATURES.map((ft) => {
                          const selected = discovery.inScopeFeatures.includes(ft)
                          return (
                            <button
                              key={ft}
                              type="button"
                              onClick={() => {
                                const next = selected
                                  ? discovery.inScopeFeatures.filter((x) => x !== ft)
                                  : [...discovery.inScopeFeatures, ft]
                                updateDiscovery({ inScopeFeatures: next })
                              }}
                              className={`p-3 rounded-xl border text-left text-sm flex items-center justify-between ${
                                selected
                                  ? 'bg-melhek-blue/20 border-melhek-blue text-white font-bold'
                                  : 'bg-white/5 border-white/10 text-white/65'
                              }`}
                            >
                              {ft}
                              {selected && <Check className="w-3.5 h-3.5 text-melhek-blue" />}
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    <div className="border-t border-white/10 pt-4">
                      <h3 className="text-sm font-bold text-white mb-0.5">Where Could Your Business Grow Next?</h3>
                      <p className="text-xs text-white/45 mb-3">Optional — these are not included in the sponsored website.</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-60 overflow-y-auto pr-1">
                        {SOFT_SELL_GROWTH_CARDS.map((card) => {
                          const selected = discovery.growthInterest.includes(card.title)
                          return (
                            <button
                              key={card.id}
                              type="button"
                              onClick={() => {
                                const next = selected
                                  ? discovery.growthInterest.filter((x) => x !== card.title)
                                  : [...discovery.growthInterest, card.title]
                                updateDiscovery({ growthInterest: next })
                              }}
                              className={`p-3.5 rounded-xl border text-left flex flex-col justify-between transition-all ${
                                selected
                                  ? 'bg-melhek-blue/15 border-melhek-blue text-white'
                                  : 'bg-white/[0.03] border-white/8 text-white/65 hover:border-white/20'
                              }`}
                            >
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-xs font-bold text-white">{card.title}</span>
                                {selected && <span className="text-[9px] font-mono text-melhek-blue font-bold uppercase">Later</span>}
                              </div>
                              <span className="text-[11px] text-white/50 font-light mt-1 leading-snug">{card.desc}</span>
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {discoveryStep === 4 && (
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-white border-b border-white/10 pb-3">Strategic Vision & Assets</h3>

                    <div>
                      <label className="text-xs font-bold text-white block mb-1">
                        What would make this website a success for you?
                      </label>
                      <span className="text-[11px] text-white/45 block mb-1.5 font-light">
                        What is the one outcome you would most like this website to achieve?
                      </span>
                      <textarea
                        rows={2}
                        value={discovery.successOutcome}
                        onChange={(e) => updateDiscovery({ successOutcome: e.target.value })}
                        placeholder="e.g. Generate 15 direct inbound Telegram leads per month from enterprise clients…"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-melhek-blue"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-mono text-white/40 uppercase block mb-1">Brand Assets Status</label>
                      <select
                        value={discovery.brandAssets}
                        onChange={(e) => updateDiscovery({ brandAssets: e.target.value })}
                        className="w-full bg-melhek-navy border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-melhek-blue"
                      >
                        {[
                          'Logo available',
                          'Logo + brand colors',
                          'Full brand kit & photography',
                          'Need design help (separate scope)',
                        ].map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-[11px] font-mono text-white/40 uppercase block mb-1">Anything else we should know?</label>
                      <textarea
                        rows={3}
                        value={discovery.notes}
                        onChange={(e) => updateDiscovery({ notes: e.target.value })}
                        placeholder="Reference sites, tone, specific page ideas…"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-melhek-blue"
                      />
                    </div>
                  </div>
                )}

                {submitError && <p className="mt-4 text-sm text-red-400">{submitError}</p>}

                <div className="flex items-center justify-between pt-6 mt-6 border-t border-white/10">
                  {discoveryStep > 1 ? (
                    <button
                      type="button"
                      onClick={() => setDiscoveryStep((s) => s - 1)}
                      className="btn-secondary !px-5 !py-2.5 text-xs font-mono uppercase tracking-wider"
                    >
                      Previous
                    </button>
                  ) : (
                    <div />
                  )}

                  {discoveryStep < 4 ? (
                    <button
                      type="button"
                      onClick={() => setDiscoveryStep((s) => s + 1)}
                      disabled={
                        discoveryStep === 1 &&
                        !(discovery.businessName || companyName) &&
                        !(discovery.ownerName || partnerName)
                      }
                      className="btn-primary !px-5 !py-2.5 text-xs font-mono uppercase tracking-wider inline-flex items-center gap-1 disabled:opacity-40"
                    >
                      Next <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleCompleteDiscovery}
                      disabled={submitting}
                      className="btn-primary !px-6 !py-3 text-xs font-mono uppercase tracking-wider inline-flex items-center gap-2 disabled:opacity-40"
                    >
                      {submitting ? 'Submitting…' : 'Submit discovery'} <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </motion.section>
          )}

          {/* ── SUCCESS ── */}
          {stage === 'success' && (
            <motion.section
              key="success"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28 }}
              className="max-w-2xl mx-auto px-4 sm:px-6"
            >
              <div className="text-center space-y-5 py-6">
                <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-[0.2em] font-bold">Onboarding complete</span>
                <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white">You are in</h2>
                <p className="text-sm sm:text-base text-white/65 font-light leading-relaxed max-w-lg mx-auto">
                  Thank you, {partnerName || 'partner'}. Your agreement and discovery are with the Melhek team.
                  We will review your materials and follow up within one business day to begin strategy.
                </p>
              </div>

              <div className="glass rounded-[2rem] border-white/10 bg-melhek-navy/75 p-6 sm:p-8 space-y-5">
                <h3 className="text-sm font-bold text-white">What happens next</h3>
                <ul className="space-y-3">
                  {[
                    'We review your discovery and confirm page priorities (max 5).',
                    'We schedule or confirm the discovery/strategy session if needed.',
                    'Design and build proceed toward launch on your *.vercel.app subdomain.',
                    'When you are ready for domain, email, or software — we scope it clearly as a growth project.',
                  ].map((line) => (
                    <li key={line} className="flex gap-3 text-sm text-white/70 leading-relaxed">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      {line}
                    </li>
                  ))}
                </ul>

                <div className="rounded-2xl border border-white/10 bg-black/30 p-4 flex flex-wrap gap-4 text-xs font-mono text-white/50">
                  <span>
                    Ref <span className="text-melhek-blue font-bold">{partnerId}</span>
                  </span>
                  <span>{companyName || discovery.businessName}</span>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Link
                    href={`/partner/${partnerId}`}
                    className="btn-primary flex-1 justify-center py-3 text-xs font-mono uppercase tracking-wider inline-flex items-center gap-2 text-center"
                  >
                    View Partner Dashboard
                  </Link>
                  <a
                    href="mailto:melhektechnologies@gmail.com"
                    className="btn-secondary flex-1 justify-center py-3 text-xs font-mono uppercase tracking-wider inline-flex items-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" /> Contact Melhek
                  </a>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      {/* Mobile continue hint for early stages */}
      {['welcome'].includes(stage) === false && educationComplete === false && stage !== 'agreement' && stage !== 'confirmation' && stage !== 'discovery' && stage !== 'success' && (
        <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden border-t border-white/10 bg-melhek-navy/95 backdrop-blur-md p-3 safe-pb">
          <button
            type="button"
            onClick={goNext}
            disabled={stage === 'accept' && (!companyName.trim() || !partnerName.trim())}
            className="btn-primary w-full justify-center py-3.5 text-xs font-mono uppercase tracking-widest inline-flex items-center gap-2 disabled:opacity-40"
          >
            Continue <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  )
}

