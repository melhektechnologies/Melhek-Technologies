'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { 
  Shield, Zap, Globe, Cpu, Users, BarChart3, Layers, Check, 
  Calendar, FileText, X, Server, MessageSquare, Key, Terminal, 
  Send, CreditCard, RefreshCw, Lock, ArrowRight, Award, Sparkles, 
  Clock, FileCheck, CheckCircle2, ChevronRight, TrendingUp, 
  UserCheck, FileSignature, LayoutDashboard, Building2, UploadCloud, 
  SendHorizontal, AlertCircle, ShieldCheck, type LucideIcon
} from 'lucide-react'

// ── TYPES & INTERFACES ──
export type OnboardingStage = 
  | 'welcome'
  | 'founder'
  | 'vision'
  | 'selection'
  | 'package'
  | 'growth'
  | 'principles'
  | 'responsibilities'
  | 'timeline'
  | 'faq'
  | 'agreement'
  | 'success'
  | 'discovery'
  | 'dashboard'

interface GrowthService {
  id: string
  title: string
  icon: LucideIcon
  tagline: string
  description: string
  impact: string
  category: string
}

interface FAQItem {
  id: string
  question: string
  answer: string
  category: 'Legal & IP' | 'Technical' | 'Investment' | 'Process'
}

interface DiscoveryFormData {
  businessName: string
  ownerName: string
  email: string
  phone: string
  currentWebsite: string
  industry: string
  primaryGoal: string
  targetAudience: string
  keyFeatures: string[]
  competitorInspiration: string
  brandAssetsAvailable: string
  preferredTimeline: string
  additionalNotes: string
}

const GROWTH_SERVICES: GrowthService[] = [
  {
    id: 'ai_chatbot',
    title: 'Custom AI Assistant & Knowledge Base',
    icon: Cpu,
    tagline: '24/7 Automated Customer Support & Lead Qualification',
    description: 'Bespoke AI chatbot trained on your company documentation, answering inquiries in Amharic and English instantly across web, WhatsApp, and Telegram.',
    impact: 'Reduces support response times by 95% and captures qualified leads automatically.',
    category: 'Automation & AI'
  },
  {
    id: 'crm_system',
    title: 'Custom CRM & Client Pipeline',
    icon: Users,
    tagline: 'Centralized Customer Relationship Management',
    description: 'Track leads, client histories, quotes, and communication logs in a unified dashboard built specifically for your team workflow.',
    impact: 'Prevents lead drop-off and increases client conversion rates.',
    category: 'Operations'
  },
  {
    id: 'erp_inventory',
    title: 'Inventory & ERP Ledger Systems',
    icon: Layers,
    tagline: 'Real-Time Stock & Multi-Branch Management',
    description: 'Cloud-synced inventory tracking with barcode scanning, re-order threshold alerts, and automated purchase orders.',
    impact: 'Eliminates stock discrepancies and manual inventory counts.',
    category: 'Operations'
  },
  {
    id: 'booking_engine',
    title: 'Smart Booking & Calendar Engine',
    icon: Calendar,
    tagline: 'Automated Scheduling & Local Payment Locks',
    description: 'Direct appointment and room booking system integrated with Telebirr and CBE Birr deposit confirmations.',
    impact: 'Eliminates double-bookings and collects non-refundable deposits upfront.',
    category: 'E-Commerce'
  },
  {
    id: 'workflow_automation',
    title: 'Business Process Automation',
    icon: Zap,
    tagline: 'Zero-Manual Administrative Pipelines',
    description: 'Connect internal spreadsheets, PDF invoicing, SMS notifications, and accounting software into automated sync loops.',
    impact: 'Saves 15+ hours per week in manual office administration.',
    category: 'Automation'
  },
  {
    id: 'analytics_engine',
    title: 'Executive Analytics & BI Dashboard',
    icon: BarChart3,
    tagline: 'Real-Time Revenue & User Behavior Insights',
    description: 'Custom metric dashboards visualizing conversion funnels, daily revenue trends, and operational bottlenecks.',
    impact: 'Empowers data-driven executive decision-making.',
    category: 'Analytics'
  },
  {
    id: 'domain_email',
    title: 'Enterprise Domain & Google Workspace',
    icon: Globe,
    tagline: 'Custom Corporate Email & Security Setup',
    description: 'Professional domain acquisition, SPF/DKIM security configuration, and corporate email desk deployment.',
    impact: 'Establishes instant digital authority with corporate clients.',
    category: 'Infrastructure'
  },
  {
    id: 'marketing_automation',
    title: 'Multi-Channel Marketing Engine',
    icon: Send,
    tagline: 'Automated Telegram & Email Nurturing',
    description: 'Scheduled broadcast campaigns and lead re-engagement triggers tailored to the Ethiopian business ecosystem.',
    impact: 'Drives repeat business without manual outreach.',
    category: 'Growth'
  }
]

const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'Why is Melhek sponsoring the core digital presence package at 0 ETB?',
    answer: 'We believe long-term alignment outperforms short-term transactional web development. By investing our engineering capabilities upfront into select business leaders, we build trusted partnerships. As your business scales and requires specialized software (AI chatbots, CRMs, ERPs), Melhek becomes your trusted technology anchor.',
    category: 'Investment'
  },
  {
    id: 'faq-2',
    question: 'Who owns the intellectual property and code of built systems?',
    answer: 'You own 100% of your business data, custom code, graphics, and domain assets upon deployment. Melhek provides full code transfers and private cloud deployment with no lock-in fees.',
    category: 'Legal & IP'
  },
  {
    id: 'faq-3',
    question: 'What are the partner responsibilities under this agreement?',
    answer: 'Partners commit to timely feedback during discovery, providing authentic business information, and maintaining an active, professional relationship. There are no mandatory promotional posts, fake endorsements, or hidden monthly fees.',
    category: 'Process'
  },
  {
    id: 'faq-4',
    question: 'How fast is the digital presence package deployed?',
    answer: 'Once the Business Discovery Form is completed, our standard agile sprint delivers the initial beta deployment within 14 to 21 business days.',
    category: 'Process'
  },
  {
    id: 'faq-5',
    question: 'Are there any hidden hosting or maintenance charges later?',
    answer: 'No. The sponsored package includes initial deployment on high-performance cloud infrastructure (Vercel/Cloudflare) with free SSL and hosting options. If you choose specialized custom server clustering later, hosting costs are billed directly to your account with zero markup.',
    category: 'Technical'
  },
  {
    id: 'faq-6',
    question: 'What happens after the core website is launched?',
    answer: 'You transition into the active Partner Portal where you can request specialized growth modules (CRMs, AI tools, booking engines), track performance, schedule quarterly strategy reviews, and access priority SLA engineering support.',
    category: 'Process'
  }
]

const TIMELINE_STEPS = [
  { step: '01', title: 'Invitation', desc: 'Selective invitation to the Melhek Digital Partner Program', status: 'completed' },
  { step: '02', title: 'Agreement', desc: 'Digital partnership alignment & E-signature execution', status: 'current' },
  { step: '03', title: 'Discovery', desc: 'Comprehensive business goal & asset intake form', status: 'upcoming' },
  { step: '04', title: 'Strategy', desc: 'UX architecture, sitemap & technical blueprinting', status: 'upcoming' },
  { step: '05', title: 'Design', desc: 'High-fidelity UI prototype with modern micro-animations', status: 'upcoming' },
  { step: '06', title: 'Development', desc: 'Next.js & Tailwind CSS high-performance engineering', status: 'upcoming' },
  { step: '07', title: 'Review', desc: 'Partner beta preview & quality assurance testing', status: 'upcoming' },
  { step: '08', title: 'Launch', desc: 'Production deployment, SSL security & domain mapping', status: 'upcoming' },
  { step: '09', title: 'Growth', desc: 'Ongoing strategic roadmap & specialized module additions', status: 'upcoming' }
]

export default function DigitalPartnershipPlatform() {
  const [activeStage, setActiveStage] = useState<OnboardingStage>('welcome')
  const [partnerId, setPartnerId] = useState<string>('MDP-2026-001')
  
  // Agreement State
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [agreeAuthenticity, setAgreeAuthenticity] = useState(false)
  const [partnerFullName, setPartnerFullName] = useState('')
  const [signatureData, setSignatureData] = useState<string | null>(null)
  const [isSigned, setIsSigned] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [isDrawing, setIsDrawing] = useState(false)

  // Discovery Form State
  const [discoveryStep, setDiscoveryStep] = useState<number>(1)
  const [formData, setFormData] = useState<DiscoveryFormData>({
    businessName: '',
    ownerName: '',
    email: '',
    phone: '',
    currentWebsite: '',
    industry: 'Technology & Business Services',
    primaryGoal: 'Establish Digital Authority & Client Acquisition',
    targetAudience: '',
    keyFeatures: ['Contact Form', 'Service Showcase', 'SEO Setup'],
    competitorInspiration: '',
    brandAssetsAvailable: 'Logo & Basic Brand Colors Available',
    preferredTimeline: 'Standard (2 - 3 Weeks)',
    additionalNotes: ''
  })
  const [formSavedTime, setFormSavedTime] = useState<string | null>(null)
  const [formCompleted, setFormCompleted] = useState(false)

  // Dashboard Tab State
  const [dashboardTab, setDashboardTab] = useState<'overview' | 'messages' | 'vault' | 'calendar' | 'upgrades'>('overview')
  const [messages, setMessages] = useState([
    { sender: 'Melhek Engineering Desk', text: 'Welcome to the Melhek Digital Partner Program! Your dedicated technical strategist will review your Discovery Intake within 24 hours.', time: '09:30 AM' }
  ])
  const [newMessage, setNewMessage] = useState('')

  // Load persisted state on mount
  useEffect(() => {
    const savedPartnerId = localStorage.getItem('melhek_partner_id')
    if (savedPartnerId) {
      setPartnerId(savedPartnerId)
    } else {
      const genId = `MDP-2026-${Math.floor(100 + Math.random() * 900)}`
      setPartnerId(genId)
      localStorage.setItem('melhek_partner_id', genId)
    }

    const savedSigned = localStorage.getItem('melhek_partner_signed')
    if (savedSigned === 'true') {
      setIsSigned(true)
      setPartnerFullName(localStorage.getItem('melhek_partner_name') || '')
    }

    const savedForm = localStorage.getItem('melhek_discovery_form')
    if (savedForm) {
      try {
        setFormData(JSON.parse(savedForm))
        setFormCompleted(localStorage.getItem('melhek_discovery_completed') === 'true')
      } catch (e) {
        // Fallback
      }
    }
  }, [])

  // Signature Canvas Drawing Logic
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true)
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const rect = canvas.getBoundingClientRect()
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY
    ctx.beginPath()
    ctx.moveTo(clientX - rect.left, clientY - rect.top)
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
    ctx.lineWidth = 2.5
    ctx.lineCap = 'round'
    ctx.strokeStyle = '#7FA9FF'
    ctx.lineTo(clientX - rect.left, clientY - rect.top)
    ctx.stroke()
  }

  const stopDrawing = () => {
    if (!isDrawing) return
    setIsDrawing(false)
    const canvas = canvasRef.current
    if (canvas) {
      setSignatureData(canvas.toDataURL())
    }
  }

  const clearSignature = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      setSignatureData(null)
    }
  }

  const handleSignAgreement = (e: React.FormEvent) => {
    e.preventDefault()
    if (!agreeTerms || !agreeAuthenticity || !partnerFullName.trim() || !signatureData) return
    setIsSigned(true)
    localStorage.setItem('melhek_partner_signed', 'true')
    localStorage.setItem('melhek_partner_name', partnerFullName)
    setActiveStage('success')
  }

  const handleSaveFormData = (updated: Partial<DiscoveryFormData>) => {
    const next = { ...formData, ...updated }
    setFormData(next)
    localStorage.setItem('melhek_discovery_form', JSON.stringify(next))
    setFormSavedTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
  }

  const handleCompleteDiscovery = () => {
    setFormCompleted(true)
    localStorage.setItem('melhek_discovery_completed', 'true')
    setActiveStage('dashboard')
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return
    const userMsg = { sender: partnerFullName || 'Partner', text: newMessage, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    setMessages(prev => [...prev, userMsg])
    const prompt = newMessage
    setNewMessage('')
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          sender: 'Melhek Engineering Desk',
          text: `Thank you for your message regarding "${prompt.slice(0, 25)}...". Our senior technical architect has received this update.`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ])
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-melhek-dark text-white selection:bg-melhek-blue selection:text-melhek-navy font-sans relative overflow-x-hidden">
      <div className="grain-overlay" aria-hidden />
      <div className="digital-grid" aria-hidden />

      {/* ── TOP PLATFORM NAVIGATION BAR ── */}
      <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10 bg-melhek-navy/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 group cursor-pointer">
              <div className="w-8 h-8 rounded-xl bg-melhek-blue/10 border border-melhek-blue/30 flex items-center justify-center text-melhek-blue group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-4.5 h-4.5" />
              </div>
              <span className="font-display font-extrabold text-sm sm:text-base tracking-tight text-white">
                Melhek <span className="text-melhek-blue">Digital Partner Program</span>
              </span>
            </Link>
            <span className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono text-emerald-400 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Invitation Active
            </span>
          </div>

          {/* Onboarding Stage Selector & Quick Jump */}
          <div className="flex items-center gap-2">
            <div className="hidden lg:flex items-center gap-1 bg-white/5 border border-white/10 rounded-full p-1 text-[11px] font-mono">
              <button
                onClick={() => setActiveStage('welcome')}
                className={`px-3 py-1 rounded-full transition-all cursor-pointer ${activeStage === 'welcome' ? 'bg-melhek-blue text-melhek-navy font-bold shadow' : 'text-white/60 hover:text-white'}`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveStage('package')}
                className={`px-3 py-1 rounded-full transition-all cursor-pointer ${activeStage === 'package' ? 'bg-melhek-blue text-melhek-navy font-bold shadow' : 'text-white/60 hover:text-white'}`}
              >
                Package
              </button>
              <button
                onClick={() => setActiveStage('agreement')}
                className={`px-3 py-1 rounded-full transition-all cursor-pointer ${activeStage === 'agreement' ? 'bg-melhek-blue text-melhek-navy font-bold shadow' : 'text-white/60 hover:text-white'}`}
              >
                Agreement
              </button>
              {isSigned && (
                <button
                  onClick={() => setActiveStage('discovery')}
                  className={`px-3 py-1 rounded-full transition-all cursor-pointer ${activeStage === 'discovery' ? 'bg-melhek-blue text-melhek-navy font-bold shadow' : 'text-white/60 hover:text-white'}`}
                >
                  Discovery
                </button>
              )}
              {formCompleted && (
                <button
                  onClick={() => setActiveStage('dashboard')}
                  className={`px-3 py-1 rounded-full transition-all cursor-pointer ${activeStage === 'dashboard' ? 'bg-emerald-400 text-melhek-navy font-bold shadow' : 'text-white/60 hover:text-white'}`}
                >
                  Portal
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-white/40 border border-white/10 rounded-lg px-2.5 py-1.5 bg-black/40">
                ID: <span className="text-melhek-blue font-bold">{partnerId}</span>
              </span>
              {isSigned ? (
                <button
                  onClick={() => setActiveStage(formCompleted ? 'dashboard' : 'discovery')}
                  className="btn-primary !py-1.5 !px-4 !text-xs font-mono uppercase tracking-wider cursor-pointer"
                >
                  {formCompleted ? 'Access Portal' : 'Continue Intake'}
                </button>
              ) : (
                <button
                  onClick={() => setActiveStage('agreement')}
                  className="btn-primary !py-1.5 !px-4 !text-xs font-mono uppercase tracking-wider cursor-pointer"
                >
                  Sign Agreement
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ── MAIN CONTENT STAGE ROUTER ── */}
      <main className="pt-24 sm:pt-28 pb-20">
        <AnimatePresence mode="wait">
          
          {/* ========================================================================= */}
          {/* SECTION 1: WELCOME HERO PAGE                                              */}
          {/* ========================================================================= */}
          {activeStage === 'welcome' && (
            <motion.section
              key="welcome"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-16"
            >
              <div className="text-center space-y-6 max-w-4xl mx-auto">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border-melhek-blue/30 text-melhek-blue text-xs font-mono uppercase tracking-widest">
                  <Sparkles className="w-3.5 h-3.5" /> Private Invitation-Only Strategic Partnership
                </div>

                <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-extrabold tracking-tight text-white leading-[1.08]">
                  Welcome to the <br />
                  <span className="text-gradient">Melhek Digital Partner Program</span>
                </h1>

                <p className="text-base sm:text-xl text-white/70 font-light max-w-2xl mx-auto leading-relaxed">
                  Building Ethiopia’s most trusted network of business creators, industry pioneers, and digital innovators.
                </p>

                <div className="glass p-6 sm:p-8 rounded-3xl border-white/10 text-left bg-melhek-navy/50 max-w-3xl mx-auto space-y-4 my-8">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-2xl bg-melhek-blue/10 border border-melhek-blue/20 text-melhek-blue flex-shrink-0">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">An Exclusive Strategic Alliance</h3>
                      <p className="text-xs sm:text-sm text-white/60 font-light mt-1 leading-relaxed">
                        This is an invitation-only strategic partnership program created for carefully selected businesses and creators who are making a meaningful impact within the Ethiopian business ecosystem.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                  <button
                    onClick={() => setActiveStage('founder')}
                    className="btn-primary flex items-center gap-3 px-8 py-4 text-xs font-mono uppercase tracking-widest cursor-pointer w-full sm:w-auto text-center justify-center"
                  >
                    Explore the Program <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setActiveStage('package')}
                    className="btn-secondary flex items-center gap-2 px-8 py-4 text-xs font-mono uppercase tracking-widest cursor-pointer w-full sm:w-auto text-center justify-center"
                  >
                    View Sponsored Package
                  </button>
                </div>
              </div>

              {/* Ecosystem Highlight Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
                <div className="glass p-6 rounded-2xl border-white/5 bg-white/[0.01]">
                  <span className="text-[10px] font-mono uppercase text-melhek-blue tracking-wider block mb-2 font-bold">01 // Zero Capital Barrier</span>
                  <h4 className="text-lg font-bold text-white">Sponsored Infrastructure</h4>
                  <p className="text-xs text-white/50 font-light mt-2 leading-relaxed">
                    Full custom digital presence engineering (~45,000 ETB estimated value) provided at 0 ETB partner investment.
                  </p>
                </div>
                <div className="glass p-6 rounded-2xl border-white/5 bg-white/[0.01]">
                  <span className="text-[10px] font-mono uppercase text-melhek-blue tracking-wider block mb-2 font-bold">02 // Long-Term Alignment</span>
                  <h4 className="text-lg font-bold text-white">Beyond Web Development</h4>
                  <p className="text-xs text-white/50 font-light mt-2 leading-relaxed">
                    Access custom CRMs, AI chatbots, inventory engines, and automated workflows as your business expands.
                  </p>
                </div>
                <div className="glass p-6 rounded-2xl border-white/5 bg-white/[0.01]">
                  <span className="text-[10px] font-mono uppercase text-melhek-blue tracking-wider block mb-2 font-bold">03 // Full Ownership</span>
                  <h4 className="text-lg font-bold text-white">Your Data & Assets</h4>
                  <p className="text-xs text-white/50 font-light mt-2 leading-relaxed">
                    100% ownership of source code, domains, and business files. Zero mandatory promotional posts or lock-in fees.
                  </p>
                </div>
              </div>
            </motion.section>
          )}

          {/* ========================================================================= */}
          {/* SECTION 2: FOUNDER LETTER                                                 */}
          {/* ========================================================================= */}
          {activeStage === 'founder' && (
            <motion.section
              key="founder"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 pb-16"
            >
              <div className="glass rounded-[2.5rem] border-white/10 p-8 sm:p-12 bg-melhek-navy/60 relative overflow-hidden shadow-2xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-8">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-melhek-blue font-bold">Strategic Context</span>
                    <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white mt-1">A Letter from Our Founder</h2>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-melhek-blue/10 border border-melhek-blue/20 flex items-center justify-center text-melhek-blue">
                    <Building2 className="w-6 h-6" />
                  </div>
                </div>

                <div className="space-y-6 text-sm sm:text-base text-white/80 font-light leading-relaxed">
                  <p className="text-white font-normal text-lg">
                    Dear Business Creator,
                  </p>
                  <p>
                    Over the past several years, we have observed a fundamental shift in the Ethiopian economic landscape. Traditional digital marketing and static brochure websites are no longer sufficient to build sustainable digital authority.
                  </p>
                  <p>
                    Modern enterprises require digital infrastructure—systems that don’t just display information, but capture qualified leads, automate manual operations, process local payments, and handle real-time inventory.
                  </p>

                  <div className="p-6 rounded-2xl bg-melhek-blue/5 border-l-2 border-melhek-blue my-6 text-white font-medium italic">
                    "We believe long-term partnerships outperform one-time transactional software projects. When we invest in your foundation today, we build the trust required to scale together tomorrow."
                  </div>

                  <p>
                    Why are we sponsoring the core digital presence package? Because we know that when ambitious business leaders are backed by world-class software engineering, their growth accelerates. And as your business grows, Melhek stands ready as your long-term technology anchor.
                  </p>

                  <p>
                    We welcome you to explore the program details, sign the alignment agreement, and begin your digital transformation.
                  </p>
                </div>

                <div className="mt-10 pt-8 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <h4 className="font-display font-bold text-white text-base">Founder & Lead Architect</h4>
                    <p className="text-xs text-melhek-blue font-mono mt-0.5">Melhek Technologies</p>
                  </div>
                  <button
                    onClick={() => setActiveStage('vision')}
                    className="btn-primary !px-6 !py-3 text-xs font-mono uppercase tracking-wider cursor-pointer"
                  >
                    Next: Program Vision <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.section>
          )}

          {/* ========================================================================= */}
          {/* SECTION 3: PROGRAM VISION                                                 */}
          {/* ========================================================================= */}
          {activeStage === 'vision' && (
            <motion.section
              key="vision"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 pb-16"
            >
              <div className="text-center mb-12 space-y-3">
                <span className="text-[10px] font-mono uppercase tracking-widest text-melhek-blue font-bold">Ecosystem Strategy</span>
                <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white">The Website Is Only The Beginning</h2>
                <p className="text-sm text-white/60 font-light max-w-2xl mx-auto">
                  Our strategic mission is to build scalable digital backbones for Ethiopian industry leaders.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="glass p-8 rounded-3xl border-white/10 bg-melhek-navy/40 space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-melhek-blue/10 border border-melhek-blue/20 flex items-center justify-center text-melhek-blue font-bold">
                    01
                  </div>
                  <h3 className="text-lg font-bold text-white">Mission</h3>
                  <p className="text-xs text-white/60 font-light leading-relaxed">
                    To eliminate technical barriers for high-impact Ethiopian businesses by provisioning enterprise-grade software infrastructure.
                  </p>
                </div>

                <div className="glass p-8 rounded-3xl border-white/10 bg-melhek-navy/40 space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-melhek-blue/10 border border-melhek-blue/20 flex items-center justify-center text-melhek-blue font-bold">
                    02
                  </div>
                  <h3 className="text-lg font-bold text-white">Vision</h3>
                  <p className="text-xs text-white/60 font-light leading-relaxed">
                    A interconnected digital business ecosystem where Ethiopian brands operate with international speed, security, and operational intelligence.
                  </p>
                </div>

                <div className="glass p-8 rounded-3xl border-white/10 bg-melhek-navy/40 space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-melhek-blue/10 border border-melhek-blue/20 flex items-center justify-center text-melhek-blue font-bold">
                    03
                  </div>
                  <h3 className="text-lg font-bold text-white">Long-Term Ecosystem</h3>
                  <p className="text-xs text-white/60 font-light leading-relaxed">
                    From core web presence to automated customer intake, local mobile checkout integration, and custom administrative management software.
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center pt-6">
                <button
                  onClick={() => setActiveStage('founder')}
                  className="btn-secondary !px-6 !py-3 text-xs font-mono uppercase tracking-wider cursor-pointer"
                >
                  Back
                </button>
                <button
                  onClick={() => setActiveStage('selection')}
                  className="btn-primary !px-6 !py-3 text-xs font-mono uppercase tracking-wider cursor-pointer"
                >
                  Why You Were Selected <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.section>
          )}

          {/* ========================================================================= */}
          {/* SECTION 4: WHY YOU WERE SELECTED                                           */}
          {/* ========================================================================= */}
          {activeStage === 'selection' && (
            <motion.section
              key="selection"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 pb-16"
            >
              <div className="text-center mb-12 space-y-3">
                <span className="text-[10px] font-mono uppercase tracking-widest text-melhek-blue font-bold">Selection Criteria</span>
                <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white">Why Your Business Was Invited</h2>
                <p className="text-sm text-white/60 font-light max-w-2xl mx-auto">
                  Melhek selects partners based on reputation, trust, and long-term business impact—never superficial vanity metrics.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                <div className="glass p-8 rounded-3xl border-white/10 bg-melhek-navy/50 flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex-shrink-0">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Real Business Impact</h3>
                    <p className="text-xs text-white/60 font-light mt-1 leading-relaxed">
                      You operate an active enterprise that delivers real goods, services, or economic value to your clients.
                    </p>
                  </div>
                </div>

                <div className="glass p-8 rounded-3xl border-white/10 bg-melhek-navy/50 flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex-shrink-0">
                    <UserCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Audience & Client Trust</h3>
                    <p className="text-xs text-white/60 font-light mt-1 leading-relaxed">
                      Your business has earned a strong local reputation built on integrity, quality execution, and customer service.
                    </p>
                  </div>
                </div>

                <div className="glass p-8 rounded-3xl border-white/10 bg-melhek-navy/50 flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex-shrink-0">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Professional Reputation</h3>
                    <p className="text-xs text-white/60 font-light mt-1 leading-relaxed">
                      You represent a standard of professional excellence in your market sector.
                    </p>
                  </div>
                </div>

                <div className="glass p-8 rounded-3xl border-white/10 bg-melhek-navy/50 flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex-shrink-0">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Long-Term Mindset</h3>
                    <p className="text-xs text-white/60 font-light mt-1 leading-relaxed">
                      You understand that technology is an evolving operational asset, not a one-time static purchase.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center pt-6">
                <button
                  onClick={() => setActiveStage('vision')}
                  className="btn-secondary !px-6 !py-3 text-xs font-mono uppercase tracking-wider cursor-pointer"
                >
                  Back
                </button>
                <button
                  onClick={() => setActiveStage('package')}
                  className="btn-primary !px-6 !py-3 text-xs font-mono uppercase tracking-wider cursor-pointer"
                >
                  View Sponsored Package <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.section>
          )}

          {/* ========================================================================= */}
          {/* SECTION 5: SPONSORED DIGITAL PRESENCE PACKAGE                              */}
          {/* ========================================================================= */}
          {activeStage === 'package' && (
            <motion.section
              key="package"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 pb-16"
            >
              <div className="text-center mb-10 space-y-3">
                <span className="text-[10px] font-mono uppercase tracking-widest text-melhek-blue font-bold">Package Breakdown</span>
                <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white">Sponsored Digital Presence Package</h2>
                <p className="text-sm text-white/60 font-light max-w-2xl mx-auto">
                  A high-performance corporate web infrastructure engineered by Melhek Technologies at zero upfront cost to selected partners.
                </p>
              </div>

              {/* Pricing & Scope Table */}
              <div className="glass rounded-[2.5rem] border-white/10 bg-melhek-navy/80 p-8 sm:p-12 shadow-2xl space-y-8">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-b border-white/10 pb-8">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold">100% Fully Sponsored</span>
                    <h3 className="text-2xl font-display font-bold text-white mt-1">Enterprise Digital Presence Engine</h3>
                    <p className="text-xs text-white/50 font-light mt-1">Includes custom design, Next.js engineering, performance tuning, and SSL deployment.</p>
                  </div>
                  <div className="text-right sm:text-right w-full sm:w-auto bg-white/5 p-6 rounded-2xl border border-white/10">
                    <span className="text-xs text-white/40 font-mono block line-through">Est. Value: ~45,000 ETB</span>
                    <span className="text-3xl font-display font-extrabold text-emerald-400">0 ETB</span>
                    <span className="text-[10px] text-white/40 font-mono block mt-1">Sponsored by Melhek Technologies</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { title: 'Discovery & UX Architecture Strategy', value: '4,500 ETB' },
                    { title: 'Custom UI/UX Interface Design (Figma)', value: '12,000 ETB' },
                    { title: 'Next.js & Tailwind Responsive Frontend Engineering', value: '16,000 ETB' },
                    { title: 'Speed & Edge Performance Tuning (100 Score)', value: '3,500 ETB' },
                    { title: 'SEO Technical Foundation & Metadata Indexing', value: '4,000 ETB' },
                    { title: 'Global Cloud Deployment & Vercel Hosting Setup', value: '3,000 ETB' },
                    { title: 'SSL Encryption Certificate & Domain Setup', value: '2,000 ETB' },
                    { title: 'Cross-Device Quality Assurance Testing', value: '1,500 ETB' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5">
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        <span className="text-xs text-white/80 font-medium">{item.title}</span>
                      </div>
                      <span className="text-[10px] font-mono text-white/40">{item.value}</span>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between text-xs text-emerald-300 font-mono">
                  <span>Total Estimated Market Value</span>
                  <span className="font-bold">≈ 45,000 ETB</span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-8">
                <button
                  onClick={() => setActiveStage('selection')}
                  className="btn-secondary !px-6 !py-3 text-xs font-mono uppercase tracking-wider cursor-pointer"
                >
                  Back
                </button>
                <button
                  onClick={() => setActiveStage('growth')}
                  className="btn-primary !px-6 !py-3 text-xs font-mono uppercase tracking-wider cursor-pointer"
                >
                  Available Growth Services <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.section>
          )}

          {/* ========================================================================= */}
          {/* SECTION 6: AVAILABLE GROWTH SERVICES                                      */}
          {/* ========================================================================= */}
          {activeStage === 'growth' && (
            <motion.section
              key="growth"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 pb-16"
            >
              <div className="text-center mb-12 space-y-3">
                <span className="text-[10px] font-mono uppercase tracking-widest text-melhek-blue font-bold">Scalable Infrastructure</span>
                <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white">Available As Your Business Grows</h2>
                <p className="text-sm text-white/60 font-light max-w-2xl mx-auto">
                  When your operational complexity increases, Melhek provisions specialized software modules tailored to your workflow.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {GROWTH_SERVICES.map((srv) => {
                  const Icon = srv.icon
                  return (
                    <div key={srv.id} className="glass p-6 rounded-3xl border-white/10 bg-melhek-navy/40 flex flex-col justify-between hover:border-melhek-blue/40 transition-all group">
                      <div className="space-y-4">
                        <div className="w-10 h-10 rounded-xl bg-melhek-blue/10 border border-melhek-blue/20 flex items-center justify-center text-melhek-blue group-hover:scale-110 transition-transform">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-[9px] font-mono text-white/40 uppercase tracking-wider block">{srv.category}</span>
                          <h4 className="text-base font-bold text-white mt-0.5">{srv.title}</h4>
                          <p className="text-xs text-melhek-blue font-mono mt-1 font-semibold">{srv.tagline}</p>
                        </div>
                        <p className="text-xs text-white/60 font-light leading-relaxed">
                          {srv.description}
                        </p>
                      </div>

                      <div className="mt-6 pt-4 border-t border-white/5">
                        <span className="text-[10px] text-emerald-400 font-mono font-medium block">
                          Impact: {srv.impact}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="flex justify-between items-center pt-4">
                <button
                  onClick={() => setActiveStage('package')}
                  className="btn-secondary !px-6 !py-3 text-xs font-mono uppercase tracking-wider cursor-pointer"
                >
                  Back
                </button>
                <button
                  onClick={() => setActiveStage('principles')}
                  className="btn-primary !px-6 !py-3 text-xs font-mono uppercase tracking-wider cursor-pointer"
                >
                  Partnership Principles <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.section>
          )}

          {/* ========================================================================= */}
          {/* SECTION 7: PARTNERSHIP PRINCIPLES                                         */}
          {/* ========================================================================= */}
          {activeStage === 'principles' && (
            <motion.section
              key="principles"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 pb-16"
            >
              <div className="text-center mb-12 space-y-3">
                <span className="text-[10px] font-mono uppercase tracking-widest text-melhek-blue font-bold">Core Directives</span>
                <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white">Partnership Principles</h2>
                <p className="text-sm text-white/60 font-light max-w-2xl mx-auto">
                  Our strategic relationship is built on explicit, professional standards of ethics and mutual respect.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {[
                  { title: 'Mutual Value Creation', desc: 'Both parties must gain measurable value from the relationship. We invest software engineering; you bring operational excellence.' },
                  { title: 'Radical Transparency', desc: 'Zero hidden fees, zero locked source code, and clear communication at every sprint stage.' },
                  { title: 'Professionalism & Quality', desc: 'We deliver software built to international standards, and expect prompt communication during discovery.' },
                  { title: 'No Mandatory Promotions', desc: 'We will never force you to post social media endorsements or promotional ads. Recommendations must be 100% authentic.' },
                ].map((item, i) => (
                  <div key={i} className="glass p-8 rounded-3xl border-white/10 bg-melhek-navy/50 space-y-3">
                    <div className="flex items-center gap-3 text-melhek-blue font-mono font-bold text-sm">
                      <ShieldCheck className="w-5 h-5" /> 0{i + 1} // Principle
                    </div>
                    <h3 className="text-lg font-bold text-white">{item.title}</h3>
                    <p className="text-xs text-white/60 font-light leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center pt-4">
                <button
                  onClick={() => setActiveStage('growth')}
                  className="btn-secondary !px-6 !py-3 text-xs font-mono uppercase tracking-wider cursor-pointer"
                >
                  Back
                </button>
                <button
                  onClick={() => setActiveStage('responsibilities')}
                  className="btn-primary !px-6 !py-3 text-xs font-mono uppercase tracking-wider cursor-pointer"
                >
                  Partner Responsibilities <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.section>
          )}

          {/* ========================================================================= */}
          {/* SECTION 8: PARTNER RESPONSIBILITIES                                       */}
          {/* ========================================================================= */}
          {activeStage === 'responsibilities' && (
            <motion.section
              key="responsibilities"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 pb-16"
            >
              <div className="text-center mb-12 space-y-3">
                <span className="text-[10px] font-mono uppercase tracking-widest text-melhek-blue font-bold">Mutual Commitments</span>
                <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white">Partner Responsibilities</h2>
                <p className="text-sm text-white/60 font-light max-w-2xl mx-auto">
                  A balanced comparison layout mapping what Melhek commits to versus what you commit to.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {/* Melhek Commitments */}
                <div className="glass p-8 rounded-3xl border-melhek-blue/20 bg-melhek-navy/80 space-y-6">
                  <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                    <div className="p-2.5 rounded-xl bg-melhek-blue/10 border border-melhek-blue/30 text-melhek-blue">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">Melhek Commits To</h3>
                      <span className="text-[10px] font-mono text-melhek-blue">Our Software & Engineering SLA</span>
                    </div>
                  </div>

                  <ul className="space-y-4">
                    {[
                      'Engineer custom Next.js web application with 100/100 performance scores',
                      'Provision sponsored deployment, SSL encryption, and Vercel cloud setup',
                      'Provide private Git codebase transfer with 100% partner IP ownership',
                      'Provide ongoing Level-2 SLA engineering desk support for growth modules',
                      'Maintain complete confidentiality under non-disclosure standards'
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-xs text-white/80 font-light">
                        <CheckCircle2 className="w-4 h-4 text-melhek-blue flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Partner Commitments */}
                <div className="glass p-8 rounded-3xl border-emerald-500/20 bg-melhek-navy/80 space-y-6">
                  <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                    <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                      <UserCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">Partner Commits To</h3>
                      <span className="text-[10px] font-mono text-emerald-400">Your Operational Collaboration</span>
                    </div>
                  </div>

                  <ul className="space-y-4">
                    {[
                      'Complete the Business Discovery Form with accurate business intake details',
                      'Provide brand logos, high-resolution media, and text copy during sprint 1',
                      'Participate in a 30-minute beta preview review call before official launch',
                      'Maintain a professional, responsive relationship with our engineering desk',
                      'Provide honest, authentic feedback on built software infrastructure'
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-xs text-white/80 font-light">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4">
                <button
                  onClick={() => setActiveStage('principles')}
                  className="btn-secondary !px-6 !py-3 text-xs font-mono uppercase tracking-wider cursor-pointer"
                >
                  Back
                </button>
                <button
                  onClick={() => setActiveStage('timeline')}
                  className="btn-primary !px-6 !py-3 text-xs font-mono uppercase tracking-wider cursor-pointer"
                >
                  View Program Timeline <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.section>
          )}

          {/* ========================================================================= */}
          {/* SECTION 9: TIMELINE                                                       */}
          {/* ========================================================================= */}
          {activeStage === 'timeline' && (
            <motion.section
              key="timeline"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 pb-16"
            >
              <div className="text-center mb-12 space-y-3">
                <span className="text-[10px] font-mono uppercase tracking-widest text-melhek-blue font-bold">Execution Roadmap</span>
                <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white">Partnership Timeline</h2>
                <p className="text-sm text-white/60 font-light max-w-2xl mx-auto">
                  From initial invitation to live production launch and long-term scaling.
                </p>
              </div>

              <div className="glass p-8 sm:p-12 rounded-[2.5rem] border-white/10 bg-melhek-navy/80 mb-12">
                <div className="space-y-6">
                  {TIMELINE_STEPS.map((st, i) => (
                    <div key={i} className="flex items-center gap-4 sm:gap-6 group">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-mono text-xs font-bold border flex-shrink-0 transition-colors ${
                        st.status === 'completed' 
                          ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' 
                          : st.status === 'current'
                          ? 'bg-melhek-blue/20 border-melhek-blue text-melhek-blue animate-pulse'
                          : 'bg-white/5 border-white/10 text-white/40'
                      }`}>
                        {st.step}
                      </div>

                      <div className="flex-1 glass p-4 rounded-2xl border-white/5 bg-white/[0.01] group-hover:border-white/20 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <h4 className="text-sm font-bold text-white">{st.title}</h4>
                          <p className="text-xs text-white/50 font-light mt-0.5">{st.desc}</p>
                        </div>
                        <span className={`text-[10px] font-mono px-3 py-1 rounded-full uppercase tracking-wider w-fit ${
                          st.status === 'completed'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : st.status === 'current'
                            ? 'bg-melhek-blue/10 text-melhek-blue border border-melhek-blue/20'
                            : 'bg-white/5 text-white/30 border border-white/10'
                        }`}>
                          {st.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center pt-4">
                <button
                  onClick={() => setActiveStage('responsibilities')}
                  className="btn-secondary !px-6 !py-3 text-xs font-mono uppercase tracking-wider cursor-pointer"
                >
                  Back
                </button>
                <button
                  onClick={() => setActiveStage('faq')}
                  className="btn-primary !px-6 !py-3 text-xs font-mono uppercase tracking-wider cursor-pointer"
                >
                  Read FAQs <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.section>
          )}

          {/* ========================================================================= */}
          {/* SECTION 10: FAQ                                                           */}
          {/* ========================================================================= */}
          {activeStage === 'faq' && (
            <motion.section
              key="faq"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 pb-16"
            >
              <div className="text-center mb-12 space-y-3">
                <span className="text-[10px] font-mono uppercase tracking-widest text-melhek-blue font-bold">Objection Clearance</span>
                <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white">Frequently Asked Questions</h2>
                <p className="text-sm text-white/60 font-light max-w-2xl mx-auto">
                  Complete transparency regarding intellectual property, timelines, hosting, and long-term commitments.
                </p>
              </div>

              <div className="space-y-4 mb-12">
                {FAQS.map((faq) => (
                  <div key={faq.id} className="glass p-6 sm:p-8 rounded-3xl border-white/10 bg-melhek-navy/60 space-y-3 text-left">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-mono text-melhek-blue uppercase tracking-widest px-2.5 py-1 rounded bg-melhek-blue/10 border border-melhek-blue/20">
                        {faq.category}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white">{faq.question}</h3>
                    <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed pt-1">{faq.answer}</p>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center pt-4">
                <button
                  onClick={() => setActiveStage('timeline')}
                  className="btn-secondary !px-6 !py-3 text-xs font-mono uppercase tracking-wider cursor-pointer"
                >
                  Back
                </button>
                <button
                  onClick={() => setActiveStage('agreement')}
                  className="btn-primary !px-6 !py-3 text-xs font-mono uppercase tracking-wider cursor-pointer"
                >
                  Proceed to Digital Agreement <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.section>
          )}

          {/* ========================================================================= */}
          {/* SECTION 11: DIGITAL AGREEMENT & E-SIGNATURE                                */}
          {/* ========================================================================= */}
          {activeStage === 'agreement' && (
            <motion.section
              key="agreement"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 pb-16"
            >
              <div className="text-center mb-8 space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold">Official Alignment</span>
                <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white">Digital Partnership Agreement</h2>
                <p className="text-xs text-white/50 font-light max-w-xl mx-auto">
                  Please review the formal agreement parameters below and execute your electronic signature to enroll.
                </p>
              </div>

              <div className="glass rounded-[2.5rem] border-white/10 bg-melhek-navy/80 p-6 sm:p-10 shadow-2xl space-y-8">
                
                {/* Scrollable Agreement Terms */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div>
                      <span className="text-[10px] font-mono text-melhek-blue uppercase">Contract Ref: {partnerId}</span>
                      <h4 className="text-base font-bold text-white">Melhek Digital Partner Terms of Strategic Alliance</h4>
                    </div>
                    <span className="text-[10px] font-mono text-white/40">Effective Date: {new Date().toLocaleDateString()}</span>
                  </div>

                  <div className="h-64 overflow-y-auto pr-4 text-xs text-white/70 font-light leading-relaxed space-y-4 bg-black/40 p-6 rounded-2xl border border-white/5 scrollbar-thin scrollbar-thumb-white/20">
                    <p className="font-bold text-white">1. PURPOSE & SCOPE OF SPONSORSHIP</p>
                    <p>
                      Melhek Technologies hereby agrees to engineer, deploy, and host a custom Next.js digital presence application for Partner at 0 ETB upfront cost. Estimated market value of baseline engineering is ~45,000 ETB.
                    </p>

                    <p className="font-bold text-white">2. INTELLECTUAL PROPERTY & DATA OWNERSHIP</p>
                    <p>
                      Partner retains 100% ownership of all brand names, logos, customer lists, and business copy provided. Upon project launch, full source code rights and domain configurations belong exclusively to Partner.
                    </p>

                    <p className="font-bold text-white">3. CONFIDENTIALITY & NON-DISCLOSURE</p>
                    <p>
                      Both parties agree to hold in confidence all proprietary business data, client lists, software architecture, and financial figures disclosed during the partnership.
                    </p>

                    <p className="font-bold text-white">4. NO MANDATORY ENDORSEMENTS</p>
                    <p>
                      Partner is not obligated to publish promotional posts or fake recommendations. Any client referrals or testimonials shared by Partner shall be strictly authentic.
                    </p>

                    <p className="font-bold text-white">5. SERVICE LEVEL AGREEMENT & EXPANSION</p>
                    <p>
                      Melhek provides ongoing Level-2 support for deployed software. Optional growth modules (CRMs, AI chatbots, ERPs) shall be provisioned upon Partner request under separate sprint agreements.
                    </p>
                  </div>
                </div>

                {/* Agreement Form */}
                <form onSubmit={handleSignAgreement} className="space-y-6 pt-4 border-t border-white/10">
                  
                  {/* Checkboxes */}
                  <div className="space-y-3">
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={agreeTerms}
                        onChange={(e) => setAgreeTerms(e.target.checked)}
                        className="mt-1 w-4 h-4 rounded border-white/20 bg-white/5 text-melhek-blue focus:ring-melhek-blue cursor-pointer"
                      />
                      <span className="text-xs text-white/80 group-hover:text-white transition-colors">
                        I have read, understood, and accept the Melhek Digital Partner Program terms and conditions.
                      </span>
                    </label>

                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={agreeAuthenticity}
                        onChange={(e) => setAgreeAuthenticity(e.target.checked)}
                        className="mt-1 w-4 h-4 rounded border-white/20 bg-white/5 text-melhek-blue focus:ring-melhek-blue cursor-pointer"
                      />
                      <span className="text-xs text-white/80 group-hover:text-white transition-colors">
                        I confirm that I am an authorized representative of my business to execute this partnership alignment.
                      </span>
                    </label>
                  </div>

                  {/* Partner Name Input */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-mono text-white/40 uppercase tracking-wider block mb-1.5">Authorized Representative Full Name *</label>
                      <input
                        type="text"
                        required
                        value={partnerFullName}
                        onChange={(e) => setPartnerFullName(e.target.value)}
                        placeholder="e.g. Abebe Bikila"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-melhek-blue transition-colors font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono text-white/40 uppercase tracking-wider block mb-1.5">Execution Date</label>
                      <input
                        type="text"
                        disabled
                        value={new Date().toLocaleDateString()}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white/40 font-mono"
                      />
                    </div>
                  </div>

                  {/* HTML5 Canvas E-Signature Pad */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-[10px] font-mono text-white/40 uppercase tracking-wider flex items-center gap-2">
                        <FileSignature className="w-3.5 h-3.5 text-melhek-blue" /> Draw Electronic Signature Below *
                      </label>
                      <button
                        type="button"
                        onClick={clearSignature}
                        className="text-[10px] font-mono text-red-400 hover:underline cursor-pointer"
                      >
                        Clear Canvas
                      </button>
                    </div>

                    <div className="relative rounded-2xl border border-white/20 bg-black/60 overflow-hidden">
                      <canvas
                        ref={canvasRef}
                        width={600}
                        height={160}
                        onMouseDown={startDrawing}
                        onMouseMove={draw}
                        onMouseUp={stopDrawing}
                        onMouseLeave={stopDrawing}
                        onTouchStart={startDrawing}
                        onTouchMove={draw}
                        onTouchEnd={stopDrawing}
                        className="w-full h-40 touch-none cursor-crosshair"
                      />
                      {!signatureData && (
                        <div className="absolute inset-0 pointer-events-none flex items-center justify-center text-white/20 text-xs font-mono">
                          [ Sign with your mouse or touchscreen here ]
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Submission Action */}
                  <div className="pt-4 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setActiveStage('faq')}
                      className="btn-secondary !px-6 !py-3 text-xs font-mono uppercase tracking-wider cursor-pointer"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={!agreeTerms || !agreeAuthenticity || !partnerFullName.trim() || !signatureData}
                      className="btn-primary !px-8 !py-4 text-xs font-mono uppercase tracking-widest cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Execute Agreement & Enroll <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              </div>
            </motion.section>
          )}

          {/* ========================================================================= */}
          {/* SECTION 12: SUCCESS PAGE                                                  */}
          {/* ========================================================================= */}
          {activeStage === 'success' && (
            <motion.section
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="max-w-3xl mx-auto px-4 sm:px-6 pt-12 pb-16 text-center"
            >
              <div className="glass rounded-[2.5rem] border-emerald-500/30 bg-melhek-navy/90 p-8 sm:p-12 shadow-2xl space-y-6">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto animate-bounce">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold">Partner Registration Confirmed</span>
                  <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white">Welcome to the Partner Network!</h2>
                  <p className="text-xs sm:text-sm text-white/60 font-light max-w-lg mx-auto">
                    Your partnership agreement has been signed and officially recorded into the Melhek registry.
                  </p>
                </div>

                {/* Partner Badge */}
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 max-w-md mx-auto space-y-2 font-mono text-left">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-white/40">Partner ID:</span>
                    <span className="text-melhek-blue font-bold">{partnerId}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-white/40">Partner Name:</span>
                    <span className="text-white font-medium">{partnerFullName}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-white/40">Agreement Status:</span>
                    <span className="text-emerald-400 font-bold">Executed & Valid</span>
                  </div>
                </div>

                <div className="pt-4 space-y-4">
                  <p className="text-xs text-white/50 font-light">
                    Next Step: Complete the 4-step Business Discovery Form so our engineering team can begin your UX architecture sprint.
                  </p>
                  <button
                    onClick={() => setActiveStage('discovery')}
                    className="btn-primary !px-8 !py-4 text-xs font-mono uppercase tracking-widest cursor-pointer w-full sm:w-auto"
                  >
                    Complete Business Discovery Form <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.section>
          )}

          {/* ========================================================================= */}
          {/* SECTION 13: DISCOVERY FORM                                                */}
          {/* ========================================================================= */}
          {activeStage === 'discovery' && (
            <motion.section
              key="discovery"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 pb-16"
            >
              <div className="text-center mb-8 space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-melhek-blue font-bold">Intake Sprint // Step {discoveryStep} of 4</span>
                <h2 className="text-3xl font-display font-extrabold text-white">Business Discovery Form</h2>
                <p className="text-xs text-white/50 font-light max-w-xl mx-auto">
                  Provide your business goals, target audience, and feature preferences so we can engineer your custom presence engine.
                </p>

                {formSavedTime && (
                  <span className="inline-block text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 mt-2">
                    Auto-saved at {formSavedTime}
                  </span>
                )}
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden mb-8 max-w-2xl mx-auto border border-white/10">
                <div
                  className="bg-gradient-to-r from-melhek-blue to-emerald-400 h-full transition-all duration-500"
                  style={{ width: `${(discoveryStep / 4) * 100}%` }}
                />
              </div>

              <div className="glass rounded-[2.5rem] border-white/10 bg-melhek-navy/80 p-6 sm:p-10 shadow-2xl">
                
                {/* STEP 1: BUSINESS PROFILE */}
                {discoveryStep === 1 && (
                  <div className="space-y-6">
                    <h3 className="text-base font-bold text-white border-b border-white/10 pb-3 flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-melhek-blue" /> Step 1: Business Profile & Contact Information
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-mono text-white/40 uppercase block mb-1">Company / Brand Name *</label>
                        <input
                          type="text"
                          value={formData.businessName}
                          onChange={(e) => handleSaveFormData({ businessName: e.target.value })}
                          placeholder="e.g. Apex Hospitality Group"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-melhek-blue"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-mono text-white/40 uppercase block mb-1">Owner / Primary Contact Name *</label>
                        <input
                          type="text"
                          value={formData.ownerName || partnerFullName}
                          onChange={(e) => handleSaveFormData({ ownerName: e.target.value })}
                          placeholder="e.g. Abebe Bikila"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-melhek-blue"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-mono text-white/40 uppercase block mb-1">Corporate Email Address *</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleSaveFormData({ email: e.target.value })}
                          placeholder="e.g. contact@apexhospitality.et"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-melhek-blue"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-mono text-white/40 uppercase block mb-1">Direct Phone / Telegram *</label>
                        <input
                          type="text"
                          value={formData.phone}
                          onChange={(e) => handleSaveFormData({ phone: e.target.value })}
                          placeholder="e.g. +251 911 234 567"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-melhek-blue"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-mono text-white/40 uppercase block mb-1">Industry Sector</label>
                        <select
                          value={formData.industry}
                          onChange={(e) => handleSaveFormData({ industry: e.target.value })}
                          className="w-full bg-melhek-navy border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-melhek-blue"
                        >
                          <option value="Hospitality & Hotel">Hospitality & Hotel</option>
                          <option value="Healthcare & Optics">Healthcare & Optics</option>
                          <option value="Retail & E-Commerce">Retail & E-Commerce</option>
                          <option value="Automotive & Importers">Automotive & Importers</option>
                          <option value="Professional Consulting">Professional Consulting</option>
                          <option value="Technology & Business Services">Technology & Business Services</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[10px] font-mono text-white/40 uppercase block mb-1">Existing Website URL (if any)</label>
                        <input
                          type="text"
                          value={formData.currentWebsite}
                          onChange={(e) => handleSaveFormData({ currentWebsite: e.target.value })}
                          placeholder="e.g. https://apexhospitality.et"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-melhek-blue"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 2: OPERATIONAL GOALS */}
                {discoveryStep === 2 && (
                  <div className="space-y-6">
                    <h3 className="text-base font-bold text-white border-b border-white/10 pb-3 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-melhek-blue" /> Step 2: Strategic Goals & Target Audience
                    </h3>

                    <div className="space-y-4">
                      <div>
                        <label className="text-[10px] font-mono text-white/40 uppercase block mb-1">Primary Objective of Digital Presence *</label>
                        <select
                          value={formData.primaryGoal}
                          onChange={(e) => handleSaveFormData({ primaryGoal: e.target.value })}
                          className="w-full bg-melhek-navy border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-melhek-blue"
                        >
                          <option value="Establish Digital Authority & Client Acquisition">Establish Digital Authority & Client Acquisition</option>
                          <option value="Direct Room / Appointment Bookings">Direct Room / Appointment Bookings</option>
                          <option value="Automated Customer Inquiry & Support Handling">Automated Customer Inquiry & Support Handling</option>
                          <option value="Showcase High-End Product Catalog">Showcase High-End Product Catalog</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[10px] font-mono text-white/40 uppercase block mb-1">Target Customer Profile / Audience *</label>
                        <textarea
                          rows={3}
                          value={formData.targetAudience}
                          onChange={(e) => handleSaveFormData({ targetAudience: e.target.value })}
                          placeholder="Describe your ideal clients (e.g. Corporate executives, local diaspora, hotel guests, eye clinic patients)..."
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-melhek-blue"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-mono text-white/40 uppercase block mb-1">Competitor / Benchmark Websites You Admire</label>
                        <input
                          type="text"
                          value={formData.competitorInspiration}
                          onChange={(e) => handleSaveFormData({ competitorInspiration: e.target.value })}
                          placeholder="e.g. stripe.com, linear.app, hyatt.com"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-melhek-blue"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 3: KEY FEATURES */}
                {discoveryStep === 3 && (
                  <div className="space-y-6">
                    <h3 className="text-base font-bold text-white border-b border-white/10 pb-3 flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-melhek-blue" /> Step 3: Required System Features & Components
                    </h3>

                    <div>
                      <label className="text-[10px] font-mono text-white/40 uppercase block mb-3">Select Desired Features for Initial Deployment</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                          'Contact & Lead Intake Forms',
                          'Interactive Product / Service Showcase',
                          'Direct Telebirr / CBE Payment Integration',
                          'Appointment Booking Engine',
                          'Multi-Language Support (English / Amharic)',
                          'Customer Testimonial & Case Study Gallery',
                          'Blog / News Updates Section',
                          'Google Maps Location & Branch Finder'
                        ].map((ft) => {
                          const isSelected = formData.keyFeatures.includes(ft)
                          return (
                            <button
                              key={ft}
                              type="button"
                              onClick={() => {
                                const nextFt = isSelected
                                  ? formData.keyFeatures.filter(x => x !== ft)
                                  : [...formData.keyFeatures, ft]
                                handleSaveFormData({ keyFeatures: nextFt })
                              }}
                              className={`p-3.5 rounded-xl text-left border text-xs font-mono transition-all flex items-center justify-between cursor-pointer ${
                                isSelected 
                                  ? 'bg-melhek-blue/15 border-melhek-blue text-white font-bold'
                                  : 'bg-white/5 border-white/10 text-white/60 hover:text-white'
                              }`}
                            >
                              <span>{ft}</span>
                              {isSelected && <Check className="w-4 h-4 text-melhek-blue" />}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 4: BRAND ASSETS */}
                {discoveryStep === 4 && (
                  <div className="space-y-6">
                    <h3 className="text-base font-bold text-white border-b border-white/10 pb-3 flex items-center gap-2">
                      <UploadCloud className="w-4 h-4 text-melhek-blue" /> Step 4: Brand Assets & Final Sprint Notes
                    </h3>

                    <div className="space-y-4">
                      <div>
                        <label className="text-[10px] font-mono text-white/40 uppercase block mb-1">Brand Assets Readiness</label>
                        <select
                          value={formData.brandAssetsAvailable}
                          onChange={(e) => handleSaveFormData({ brandAssetsAvailable: e.target.value })}
                          className="w-full bg-melhek-navy border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-melhek-blue"
                        >
                          <option value="Logo & Basic Brand Colors Available">Logo & Basic Brand Colors Available</option>
                          <option value="Full Brand Guidelines & High-Res Photography Ready">Full Brand Guidelines & High-Res Photography Ready</option>
                          <option value="Need Melhek Design Desk to Create/Refresh Logo & Assets">Need Melhek Design Desk to Create/Refresh Logo & Assets</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[10px] font-mono text-white/40 uppercase block mb-1">Additional Requirements or Special Notes</label>
                        <textarea
                          rows={4}
                          value={formData.additionalNotes}
                          onChange={(e) => handleSaveFormData({ additionalNotes: e.target.value })}
                          placeholder="Detail any custom database requirements, branch details, or specific integrations required..."
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-melhek-blue"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step Navigation Controls */}
                <div className="flex items-center justify-between pt-8 border-t border-white/10 mt-8">
                  {discoveryStep > 1 ? (
                    <button
                      onClick={() => setDiscoveryStep(prev => prev - 1)}
                      className="btn-secondary !px-6 !py-3 text-xs font-mono uppercase tracking-wider cursor-pointer"
                    >
                      Previous Step
                    </button>
                  ) : <div />}

                  {discoveryStep < 4 ? (
                    <button
                      onClick={() => setDiscoveryStep(prev => prev + 1)}
                      className="btn-primary !px-6 !py-3 text-xs font-mono uppercase tracking-wider cursor-pointer"
                    >
                      Next Step <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={handleCompleteDiscovery}
                      className="btn-primary !px-8 !py-4 text-xs font-mono uppercase tracking-widest cursor-pointer"
                    >
                      Submit Intake & Enter Partner Portal <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </motion.section>
          )}

          {/* ========================================================================= */}
          {/* SECTION 14: PARTNER PORTAL DASHBOARD                                      */}
          {/* ========================================================================= */}
          {activeStage === 'dashboard' && (
            <motion.section
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="max-w-7xl mx-auto px-4 sm:px-6 pt-4 pb-16"
            >
              {/* Dashboard Top Header Banner */}
              <div className="glass rounded-[2rem] border-white/10 bg-melhek-navy/80 p-6 sm:p-8 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-widest">Active Partner Workspace</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white mt-1">
                    {formData.businessName || 'Apex Hospitality Group'} Portal
                  </h2>
                  <p className="text-xs text-white/50 font-light mt-0.5">
                    Managing Partner: {formData.ownerName || partnerFullName || 'Abebe Bikila'} | ID: <span className="text-melhek-blue font-mono">{partnerId}</span>
                  </p>
                </div>

                <div className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/10 font-mono text-xs">
                  <div>
                    <span className="text-white/40 block text-[9px] uppercase">Current Sprint Stage</span>
                    <span className="text-white font-bold">Stage 04 // UX Architecture</span>
                  </div>
                  <div className="h-8 w-px bg-white/10" />
                  <div>
                    <span className="text-white/40 block text-[9px] uppercase">Target Launch</span>
                    <span className="text-emerald-400 font-bold">18 Business Days</span>
                  </div>
                </div>
              </div>

              {/* Dashboard Tabs & Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                
                {/* Dashboard Sidebar Nav */}
                <div className="glass p-3 rounded-3xl border-white/10 bg-melhek-navy/60 h-fit space-y-1">
                  {([
                    { id: 'overview', label: 'Overview & Stage Progress', icon: LayoutDashboard },
                    { id: 'messages', label: 'Engineering Desk Chat', icon: MessageSquare },
                    { id: 'vault', label: 'File & Agreement Vault', icon: FileCheck },
                    { id: 'calendar', label: 'Scoping Meetings', icon: Calendar },
                    { id: 'upgrades', label: 'Growth Upgrades', icon: Zap }
                  ] as const).map((tab) => {
                    const Icon = tab.icon
                    const isActive = dashboardTab === tab.id
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setDashboardTab(tab.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-xs font-mono font-bold transition-all text-left cursor-pointer ${
                          isActive 
                            ? 'bg-melhek-blue text-melhek-navy shadow-lg shadow-melhek-blue/10'
                            : 'text-white/60 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <Icon className="w-4 h-4 flex-shrink-0" />
                        <span>{tab.label}</span>
                      </button>
                    )
                  })}
                </div>

                {/* Dashboard Main Workspace Panel */}
                <div className="lg:col-span-3">
                  
                  {/* OVERVIEW TAB */}
                  {dashboardTab === 'overview' && (
                    <div className="space-y-6">
                      
                      {/* Active Stage Tracker Card */}
                      <div className="glass p-6 sm:p-8 rounded-[2rem] border-white/10 bg-melhek-navy/60 space-y-6">
                        <div className="flex items-center justify-between border-b border-white/10 pb-4">
                          <h3 className="text-base font-bold text-white flex items-center gap-2">
                            <Clock className="w-4 h-4 text-melhek-blue" /> Production Sprint Progress
                          </h3>
                          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                            Sprint 1 Active
                          </span>
                        </div>

                        {/* Visual Stage Progress Steps */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          {[
                            { name: 'Agreement Executed', status: 'done' },
                            { name: 'Discovery Intake', status: 'done' },
                            { name: 'UX & Sitemap Blueprint', status: 'active' },
                            { name: 'Next.js Dev Sprint', status: 'pending' },
                          ].map((stg, idx) => (
                            <div key={idx} className={`p-4 rounded-2xl border text-left space-y-2 ${
                              stg.status === 'done'
                                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                                : stg.status === 'active'
                                ? 'bg-melhek-blue/15 border-melhek-blue text-white animate-pulse'
                                : 'bg-white/5 border-white/10 text-white/30'
                            }`}>
                              <span className="text-[9px] font-mono uppercase block">Stage 0{idx + 1}</span>
                              <span className="text-xs font-bold block">{stg.name}</span>
                            </div>
                          ))}
                        </div>

                        <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-white/70 font-light flex items-center justify-between">
                          <span>Next Sprint Milestone: <strong>Figma Interactive UI Prototype Presentation</strong></span>
                          <span className="font-mono text-melhek-blue">Scheduled: Friday</span>
                        </div>
                      </div>

                      {/* System Notifications */}
                      <div className="glass p-6 sm:p-8 rounded-[2rem] border-white/10 bg-melhek-navy/60 space-y-4">
                        <h3 className="text-base font-bold text-white flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 text-melhek-blue" /> Recent Notifications & Activity Log
                        </h3>
                        <div className="space-y-3">
                          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-start gap-3">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="text-xs text-white font-medium">Business Discovery Form Submitted</p>
                              <span className="text-[10px] text-white/40 font-mono">Recorded in Melhek engineering database.</span>
                            </div>
                          </div>
                          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-start gap-3">
                            <FileSignature className="w-4 h-4 text-melhek-blue flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="text-xs text-white font-medium">Partnership Agreement Executed</p>
                              <span className="text-[10px] text-white/40 font-mono">Contract Ref {partnerId} signed by {partnerFullName || 'Partner'}.</span>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                  )}

                  {/* MESSAGES TAB */}
                  {dashboardTab === 'messages' && (
                    <div className="glass p-6 sm:p-8 rounded-[2rem] border-white/10 bg-melhek-navy/60 space-y-6">
                      <div className="flex items-center justify-between border-b border-white/10 pb-4">
                        <h3 className="text-base font-bold text-white flex items-center gap-2">
                          <MessageSquare className="w-4 h-4 text-melhek-blue" /> Level-2 SLA Engineering Desk Chat
                        </h3>
                        <span className="text-[10px] font-mono text-emerald-400">Response SLA: &lt; 2 Hours</span>
                      </div>

                      <div className="h-80 overflow-y-auto space-y-4 pr-2">
                        {messages.map((msg, i) => (
                          <div key={i} className={`flex flex-col ${msg.sender.includes('Melhek') ? 'items-start' : 'items-end'}`}>
                            <div className={`p-4 rounded-2xl max-w-md text-xs leading-relaxed ${
                              msg.sender.includes('Melhek')
                                ? 'bg-melhek-blue/15 border border-melhek-blue/30 text-white rounded-tl-none'
                                : 'bg-emerald-500/20 border border-emerald-500/30 text-white rounded-tr-none'
                            }`}>
                              <span className="text-[9px] font-mono text-melhek-blue font-bold block mb-1">{msg.sender}</span>
                              {msg.text}
                              <span className="text-[9px] text-white/30 font-mono block text-right mt-1">{msg.time}</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      <form onSubmit={handleSendMessage} className="flex gap-3 pt-4 border-t border-white/10">
                        <input
                          type="text"
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          placeholder="Type your question or request to the engineering desk..."
                          className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-melhek-blue"
                        />
                        <button
                          type="submit"
                          className="btn-primary !px-5 !py-3 text-xs font-mono uppercase tracking-wider cursor-pointer flex items-center gap-2"
                        >
                          Send <SendHorizontal className="w-4 h-4" />
                        </button>
                      </form>
                    </div>
                  )}

                  {/* VAULT TAB */}
                  {dashboardTab === 'vault' && (
                    <div className="glass p-6 sm:p-8 rounded-[2rem] border-white/10 bg-melhek-navy/60 space-y-6">
                      <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-white/10 pb-4">
                        <FileCheck className="w-4 h-4 text-melhek-blue" /> Uploaded Assets & Executed Documents
                      </h3>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <FileSignature className="w-5 h-5 text-emerald-400" />
                            <div>
                              <p className="text-xs text-white font-bold">Signed Partnership Agreement</p>
                              <span className="text-[10px] text-white/40 font-mono">PDF Document | {partnerId}</span>
                            </div>
                          </div>
                          <span className="text-[10px] text-emerald-400 font-mono font-bold bg-emerald-500/10 px-2 py-1 rounded">Verified</span>
                        </div>

                        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <FileText className="w-5 h-5 text-melhek-blue" />
                            <div>
                              <p className="text-xs text-white font-bold">Business Discovery Intake</p>
                              <span className="text-[10px] text-white/40 font-mono">JSON / Summary Copy</span>
                            </div>
                          </div>
                          <span className="text-[10px] text-melhek-blue font-mono font-bold bg-melhek-blue/10 px-2 py-1 rounded">Completed</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* CALENDAR TAB */}
                  {dashboardTab === 'calendar' && (
                    <div className="glass p-6 sm:p-8 rounded-[2rem] border-white/10 bg-melhek-navy/60 space-y-6">
                      <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-white/10 pb-4">
                        <Calendar className="w-4 h-4 text-melhek-blue" /> Upcoming Strategy & Review Meetings
                      </h3>

                      <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                        <div className="space-y-1">
                          <span className="text-[9px] font-mono text-melhek-blue uppercase">Sprint 1 Review</span>
                          <h4 className="text-sm font-bold text-white">Figma Prototype & Site Structure Presentation</h4>
                          <p className="text-xs text-white/50 font-light">With Melhek Lead Architect & Design Team</p>
                        </div>
                        <button className="btn-secondary !px-4 !py-2 text-[10px] font-mono uppercase tracking-wider cursor-pointer">
                          Add to Calendar
                        </button>
                      </div>
                    </div>
                  )}

                  {/* UPGRADES TAB */}
                  {dashboardTab === 'upgrades' && (
                    <div className="space-y-6">
                      <div className="glass p-6 sm:p-8 rounded-[2rem] border-white/10 bg-melhek-navy/60 space-y-4">
                        <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-white/10 pb-4">
                          <Zap className="w-4 h-4 text-melhek-blue" /> Recommended Infrastructure Upgrades
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {GROWTH_SERVICES.slice(0, 4).map((g) => {
                            const Icon = g.icon
                            return (
                              <div key={g.id} className="p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between space-y-4">
                                <div className="space-y-2">
                                  <div className="w-8 h-8 rounded-lg bg-melhek-blue/10 border border-melhek-blue/20 flex items-center justify-center text-melhek-blue">
                                    <Icon className="w-4 h-4" />
                                  </div>
                                  <h4 className="text-sm font-bold text-white">{g.title}</h4>
                                  <p className="text-xs text-white/60 font-light">{g.description}</p>
                                </div>
                                <button className="btn-secondary !py-2 !px-4 !text-[10px] font-mono uppercase tracking-wider w-full justify-center cursor-pointer">
                                  Request Scoping Quote
                                </button>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </motion.section>
          )}

        </AnimatePresence>
      </main>
    </div>
  )
}
