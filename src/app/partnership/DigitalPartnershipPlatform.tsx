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
  SendHorizontal, AlertCircle, ShieldCheck, HelpCircle, ChevronDown, type LucideIcon
} from 'lucide-react'

// ── TYPES & INTERFACES ──
export type OnboardingStage = 
  | 'welcome'      // Phase 1: Immersive Dossier (Hero, Letter, Selected, Package, Sprints, FAQs)
  | 'agreement'    // Phase 2: High-Tech Agreement & E-Sign
  | 'success'      // Success splash
  | 'discovery'    // Phase 3: Intake scoping
  | 'dashboard'    // Phase 4: Live workspace & sprint kanban

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
    answer: 'You own 100% of your data, custom code, layouts, and domain assets. Melhek provides full code transfers and private cloud deployment with no lock-in fees.',
    category: 'Legal & IP'
  },
  {
    id: 'faq-3',
    question: 'What are the partner responsibilities under this agreement?',
    answer: 'Partners commit to timely feedback during discovery, providing authentic business info, and maintaining a professional relationship. There are no mandatory promotional posts or hidden charges.',
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
    answer: 'No. The sponsored package includes initial deployment on high-performance cloud infrastructure (Vercel/Cloudflare) with free SSL and hosting options. Advanced custom server hosting later is billed directly to your account with zero markup.',
    category: 'Technical'
  },
  {
    id: 'faq-6',
    question: 'What happens after the core website is launched?',
    answer: 'You transition into the active Partner Portal where you can request specialized growth modules (CRMs, AI tools, booking engines), track performance, and access priority SLA engineering support.',
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
  const [pseudoHash, setPseudoHash] = useState('SHA-256-PENDING-SIGNATURE-AUTH')

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

  // Table of Contents Active Item
  const [activeSection, setActiveSection] = useState('welcome-hero')

  // FAQ Expand state
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null)

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

  // Section Observer for Side Index
  useEffect(() => {
    if (activeStage !== 'welcome') return
    const sections = ['welcome-hero', 'founder-letter', 'program-vision', 'why-selected', 'sponsored-package', 'growth-services', 'timeline-roadmap', 'faqs']
    
    const handleScroll = () => {
      const scrollPos = window.scrollY + 220
      for (const section of sections) {
        const el = document.getElementById(section)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [activeStage])

  // Generate pseudo-cryptographic hash as user types name
  useEffect(() => {
    if (!partnerFullName) {
      setPseudoHash('SHA-256-PENDING-SIGNATURE-AUTH')
      return
    }
    let hash = 0
    for (let i = 0; i < partnerFullName.length; i++) {
      hash = (hash << 5) - hash + partnerFullName.charCodeAt(i)
      hash |= 0
    }
    const hex = Math.abs(hash).toString(16).toUpperCase().padStart(8, '0')
    setPseudoHash(`HEX-MD5-${hex}-SECURE-AUTH-ONBOARD-${partnerId}`)
  }, [partnerFullName, partnerId])

  // Scroll to section helper
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setActiveSection(id)
    }
  }

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
    submitPartnershipData()
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
    submitPartnershipData(formData)
  }

  const submitPartnershipData = async (updatedDiscovery?: DiscoveryFormData) => {
    try {
      await fetch('/api/partnership/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          partnerId,
          partnerFullName: partnerFullName || localStorage.getItem('melhek_partner_name') || '',
          signatureData,
          dateSigned: new Date().toLocaleDateString(),
          discoveryData: updatedDiscovery || formData,
        }),
      })
    } catch (err) {
      console.error('Error submitting partnership data:', err)
    }
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
                Melhek <span className="text-melhek-blue">Partner Hub</span>
              </span>
            </Link>
            <span className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono text-emerald-400 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Invitation Active
            </span>
          </div>

          {/* Core Onboarding Workflow Steps */}
          <div className="flex items-center gap-2.5">
            <div className="hidden md:flex items-center gap-1 bg-white/5 border border-white/10 rounded-full p-1 text-[11px] font-mono">
              <button
                onClick={() => setActiveStage('welcome')}
                className={`px-3 py-1 rounded-full transition-all cursor-pointer ${activeStage === 'welcome' ? 'bg-melhek-blue text-melhek-navy font-bold shadow' : 'text-white/60 hover:text-white'}`}
              >
                1. Explore the Program
              </button>
              <button
                onClick={() => setActiveStage('agreement')}
                className={`px-3 py-1 rounded-full transition-all cursor-pointer ${activeStage === 'agreement' ? 'bg-melhek-blue text-melhek-navy font-bold shadow' : 'text-white/60 hover:text-white'}`}
              >
                2. Accept the Partnership
              </button>
              {isSigned && (
                <button
                  onClick={() => setActiveStage('discovery')}
                  className={`px-3 py-1 rounded-full transition-all cursor-pointer ${activeStage === 'discovery' ? 'bg-melhek-blue text-melhek-navy font-bold shadow' : 'text-white/60 hover:text-white'}`}
                >
                  3. Tell Us About Your Business
                </button>
              )}
              {formCompleted && (
                <button
                  onClick={() => setActiveStage('dashboard')}
                  className={`px-3 py-1 rounded-full transition-all cursor-pointer ${activeStage === 'dashboard' ? 'bg-emerald-400 text-melhek-navy font-bold shadow' : 'text-white/60 hover:text-white'}`}
                >
                  4. Your Partner Workspace
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
                  {formCompleted ? 'Go to Portal' : 'Discovery Form'}
                </button>
              ) : (
                <button
                  onClick={() => setActiveStage('agreement')}
                  className="btn-primary !py-1.5 !px-4 !text-xs font-mono uppercase tracking-wider cursor-pointer animate-pulse"
                >
                  Sign & Start
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ── MAIN CONTENT ROUTER ── */}
      <main className="pt-20 sm:pt-24 pb-20">
        <AnimatePresence mode="wait">
          
          {/* ========================================================================= */}
          {/* PHASE 1: CONSOLIDATED OVERVIEW & SCOPE                                    */}
          {/* ========================================================================= */}
          {activeStage === 'welcome' && (
            <motion.section
              key="welcome"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="max-w-7xl mx-auto px-4 sm:px-6 pt-6"
            >
              
              {/* STICKY BOTTOM FLOATING ACTIONS BAR */}
              <div className="fixed bottom-0 left-0 right-0 z-40 bg-melhek-navy/95 border-t border-white/10 p-4 block md:hidden backdrop-blur-md">
                <button
                  onClick={() => setActiveStage('agreement')}
                  className="w-full btn-primary flex items-center justify-center gap-2 py-3.5 text-xs font-mono uppercase tracking-widest cursor-pointer"
                >
                  Proceed to Agreement <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Floating subtle bottom bar on desktop to surprise and pull action */}
              <div className="hidden md:flex fixed bottom-6 left-1/2 -translate-x-1/2 z-40 glass bg-melhek-navy/90 border border-melhek-blue/30 rounded-full px-6 py-3 items-center gap-6 shadow-2xl backdrop-blur-lg">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-melhek-blue animate-ping" />
                  <span className="text-[11px] font-mono text-white/70">Invitation Active ({partnerId}). Ready to execute agreement.</span>
                </div>
                <button
                  onClick={() => setActiveStage('agreement')}
                  className="btn-primary !px-5 !py-2 !text-[10px] font-mono uppercase tracking-widest cursor-pointer"
                >
                  Sign Agreement
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative items-start">
                
                {/* STICKY SIDE INDEX TABLE OF CONTENTS */}
                <div className="hidden lg:block lg:col-span-1 sticky top-28 space-y-4">
                  <div className="glass p-5 rounded-3xl border-white/10 bg-melhek-navy/55 space-y-4">
                    <div className="flex items-center gap-2">
                      <Shield className="w-3.5 h-3.5 text-melhek-blue" />
                      <span className="text-xs font-mono text-white/40 uppercase tracking-wider">Strategic Steps</span>
                    </div>
                    <div className="space-y-1">
                      {[
                        { id: 'welcome-hero', label: 'Program Invitation' },
                        { id: 'founder-letter', label: 'Founder Context' },
                        { id: 'program-vision', label: 'Mission & Vision' },
                        { id: 'why-selected', label: 'Why You Selected' },
                        { id: 'sponsored-package', label: 'Sponsorship Value' },
                        { id: 'growth-services', label: 'Growth Upgrades' },
                        { id: 'timeline-roadmap', label: 'Timeline & Sprints' },
                        { id: 'faqs', label: 'FAQ Registry' }
                      ].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => scrollToSection(item.id)}
                          className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left text-xs font-mono transition-all cursor-pointer ${
                            activeSection === item.id 
                              ? 'bg-melhek-blue/10 text-melhek-blue font-bold border border-melhek-blue/20' 
                              : 'text-white/50 hover:text-white/80 border border-transparent'
                          }`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full transition-colors ${
                            activeSection === item.id ? 'bg-melhek-blue' : 'bg-transparent'
                          }`} />
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Checklist Summary */}
                  <div className="glass p-5 rounded-3xl border-white/10 bg-melhek-navy/55 space-y-3 font-mono text-[10px] text-white/50">
                    <span className="text-white/30 uppercase block font-bold">Onboarding Status</span>
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 text-emerald-400 font-bold"><Check className="w-3.5 h-3.5" /> Invitation Active</div>
                      <div className="flex items-center gap-2"><div className="w-3 h-3 border border-white/20 rounded-full" /> Signed Agreement</div>
                      <div className="flex items-center gap-2"><div className="w-3 h-3 border border-white/20 rounded-full" /> Intake Scoping</div>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveStage('agreement')}
                    className="w-full btn-primary flex items-center justify-center gap-3 py-4 text-xs font-mono uppercase tracking-widest cursor-pointer shadow-lg shadow-melhek-blue/20"
                  >
                    Start Onboarding <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* STACKED CONTENT SECTIONS (RIGHT SIDE) */}
                <div className="lg:col-span-3 space-y-16 pb-12">
                  
                  {/* 1. WELCOME HERO SECTION */}
                  <div id="welcome-hero" className="scroll-mt-28 space-y-6 pt-4">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass border-melhek-blue/30 text-melhek-blue text-[10px] font-mono uppercase tracking-widest">
                      <Sparkles className="w-3.5 h-3.5" /> Selective Strategic Partnership Invitation
                    </div>
                    <h1 className="text-4xl sm:text-6xl font-display font-extrabold tracking-tight text-white leading-[1.1]">
                      Melhek Digital <br />
                      <span className="text-gradient">Partnership Program</span>
                    </h1>
                    <p className="text-sm sm:text-base text-white/70 font-light max-w-2xl leading-relaxed">
                      We provision sponsored enterprise-grade web applications and software systems at zero upfront capital for selected Ethiopian business leaders.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                      <button
                        onClick={() => setActiveStage('agreement')}
                        className="btn-primary flex items-center justify-center gap-3 px-8 py-3.5 text-xs font-mono uppercase tracking-widest cursor-pointer w-full sm:w-auto text-center"
                      >
                        Accept the Partnership <ArrowRight className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => scrollToSection('sponsored-package')}
                        className="btn-secondary flex items-center justify-center gap-2 px-8 py-3.5 text-xs font-mono uppercase tracking-widest cursor-pointer w-full sm:w-auto text-center"
                      >
                        View What's Included
                      </button>
                    </div>
                  </div>

                  {/* 2. WHY YOU WERE INVITED — FIRST EMOTIONAL HOOK */}
                  <div id="why-selected" className="scroll-mt-28 space-y-6">
                    <div className="p-8 sm:p-10 rounded-[2rem] bg-gradient-to-br from-melhek-blue/10 to-white/[0.01] border border-melhek-blue/20 space-y-6 relative overflow-hidden">
                      <div className="absolute -top-10 -right-10 w-48 h-48 bg-melhek-blue/5 rounded-full blur-3xl pointer-events-none" />
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-melhek-blue uppercase tracking-widest font-bold">Why You Were Invited</span>
                        <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">You were not selected by chance.</h2>
                      </div>
                      <p className="text-sm text-white/70 font-light leading-relaxed max-w-2xl">
                        We are building a carefully selected network of business leaders who are helping shape Ethiopia's professional and digital ecosystem.
                      </p>
                      <p className="text-sm text-white/70 font-light leading-relaxed max-w-2xl">
                        After reviewing your work, we believe your values, your audience, and your long-term vision align with the purpose of this program.
                      </p>
                      <p className="text-sm text-white/80 font-normal leading-relaxed max-w-2xl">
                        Rather than offering generic sponsorships, we choose a <span className="text-melhek-blue font-semibold">limited number of partners each year</span> whose success we believe we can genuinely contribute to.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                        {[
                          { title: 'Marketplace Impact', desc: 'You operate a validated business that delivers real value to real people in Ethiopia.' },
                          { title: 'Established Reputation', desc: 'Your brand carries integrity, client trust, and a professional standard.' },
                          { title: 'Growth Vision', desc: 'You think about digital tools as operational leverage, not surface-level presence.' },
                          { title: 'Long-Term Thinking', desc: 'You see the value in building a lasting relationship with a dedicated technology team.' }
                        ].map((item, i) => (
                          <div key={i} className="flex gap-3">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                            <div>
                              <h4 className="text-xs font-bold text-white">{item.title}</h4>
                              <p className="text-[11px] text-white/50 mt-0.5 leading-relaxed">{item.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* 3. FOUNDER LETTER SECTION */}
                  <div id="founder-letter" className="scroll-mt-28 glass p-6 sm:p-10 rounded-[2rem] border-white/10 bg-melhek-navy/40 space-y-5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-melhek-blue/5 rounded-full blur-2xl pointer-events-none" />
                    <h3 className="text-xs font-mono text-melhek-blue uppercase tracking-widest flex items-center gap-2">
                      <Building2 className="w-4 h-4" /> A Message from Our Founder
                    </h3>
                    <div className="space-y-4 text-xs sm:text-sm text-white/80 font-light leading-relaxed">
                      <p className="text-white font-normal">Dear Business Owner,</p>
                      <p>
                        Websites are no longer just digital brochures. Modern companies require digital infrastructure — operational backbones that capture customers, streamline inventories, handle bookings, and process payments automatically.
                      </p>
                      <p className="font-semibold text-white italic border-l-2 border-melhek-blue pl-4 py-1">
                        "We believe in long-term technology partnership. We invest our engineering capability into you today at zero upfront cost, establishing the trust needed to support and expand your digital systems as you scale tomorrow."
                      </p>
                      <p>
                        We welcome you to explore the program, accept the partnership agreement, and launch your digital backbone with us.
                      </p>
                    </div>
                    <div className="pt-2 font-mono text-xs">
                      <span className="text-white font-bold block">Founder & Lead Architect</span>
                      <span className="text-white/40">Melhek Technologies</span>
                    </div>
                  </div>

                  {/* 4. PROGRAM MISSION & VISION */}
                  <div id="program-vision" className="scroll-mt-28 space-y-6">
                    <h3 className="text-xs font-mono text-melhek-blue uppercase tracking-widest block">01 // The Architecture Vision</h3>
                    <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">How We Work Together</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="glass p-6 rounded-2xl border-white/5 bg-white/[0.01] space-y-2">
                        <h4 className="text-sm font-bold text-white">Our Commitment</h4>
                        <p className="text-xs text-white/50 leading-relaxed font-light">
                          We build, optimize, and deploy your custom digital system at zero upfront cost — removing the capital barrier that stops most businesses from going digital properly.
                        </p>
                      </div>
                      <div className="glass p-6 rounded-2xl border-white/5 bg-white/[0.01] space-y-2">
                        <h4 className="text-sm font-bold text-white">Your Advantage</h4>
                        <p className="text-xs text-white/50 leading-relaxed font-light">
                          A dedicated engineering team on call. Full IP ownership. A growing ecosystem of tools tailored to your specific business operations.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 5. SPONSORED PACKAGE VALUE */}
                  <div id="sponsored-package" className="scroll-mt-28 space-y-6">
                    <h3 className="text-xs font-mono text-melhek-blue uppercase tracking-widest block">03 // Financial Alignment</h3>
                    <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">Sponsored Infrastructure Scope</h2>
                    
                    <div className="glass rounded-[2rem] border-white/10 bg-melhek-navy/70 p-6 sm:p-8 space-y-6">
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-white/10 pb-6">
                        <div>
                          <span className="text-[10px] font-mono text-emerald-400 font-bold">100% Fully Sponsored</span>
                          <h4 className="text-lg font-bold text-white">Enterprise Presence Package</h4>
                        </div>
                        <div className="text-right bg-white/5 p-4 rounded-xl border border-white/10 flex items-center gap-3">
                          <span className="text-xs text-white/40 font-mono line-through">Est: ~45,000 ETB</span>
                          <span className="text-2xl font-display font-extrabold text-emerald-400">0 ETB</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                          'Discovery & UX Strategy Architecture',
                          'Custom UI/UX Prototypes (Figma)',
                          'Next.js & Tailwind responsive layout coding',
                          'Speed & Edge Performance tuning (100 score)',
                          'SEO configuration & Google Indexing setup',
                          'SSL security certifications & Cloud hosting',
                          'Codebase handover with full IP ownership'
                        ].map((item, idx) => (
                          <div key={idx} className="flex items-center gap-2.5 text-xs text-white/80">
                            <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* 6. AVAILABLE GROWTH UPGRADES */}
                  <div id="growth-services" className="scroll-mt-28 space-y-6">
                    <h3 className="text-xs font-mono text-melhek-blue uppercase tracking-widest block">04 // Scale Roadmap</h3>
                    <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">Available Operational Integrations</h2>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {GROWTH_SERVICES.slice(0, 4).map((g) => {
                        const Icon = g.icon
                        return (
                          <div key={g.id} className="glass p-5 rounded-2xl border-white/5 bg-white/[0.01] space-y-3 hover:border-melhek-blue/30 transition-all group">
                            <div className="w-9 h-9 rounded-lg bg-melhek-blue/10 border border-melhek-blue/20 flex items-center justify-center text-melhek-blue group-hover:scale-105 transition-transform">
                              <Icon className="w-4.5 h-4.5" />
                            </div>
                            <div>
                              <h4 className="text-sm font-bold text-white">{g.title}</h4>
                              <p className="text-[11px] text-white/40 font-mono mt-0.5">{g.tagline}</p>
                            </div>
                            <p className="text-xs text-white/60 font-light leading-relaxed">{g.description}</p>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* 7. TIMELINE & SPRINTS */}
                  <div id="timeline-roadmap" className="scroll-mt-28 space-y-6">
                    <h3 className="text-xs font-mono text-melhek-blue uppercase tracking-widest block">05 // Milestone Milestones</h3>
                    <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">Execution Timeline</h2>
                    
                    <div className="glass p-6 sm:p-8 rounded-[2rem] border-white/10 bg-melhek-navy/55 space-y-4">
                      {TIMELINE_STEPS.slice(0, 5).map((st, idx) => (
                        <div key={idx} className="flex items-center gap-3.5">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-mono border font-bold flex-shrink-0 ${
                            st.status === 'completed' 
                              ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
                              : st.status === 'current'
                              ? 'bg-melhek-blue/20 border-melhek-blue text-melhek-blue animate-pulse'
                              : 'bg-white/5 border-white/10 text-white/40'
                          }`}>
                            {st.step}
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-white">{st.title}</h4>
                            <p className="text-[10px] text-white/50">{st.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 8. FAQs */}
                  <div id="faqs" className="scroll-mt-28 space-y-6">
                    <h3 className="text-xs font-mono text-melhek-blue uppercase tracking-widest block">06 // FAQs</h3>
                    <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">Frequently Asked Questions</h2>
                    
                    <div className="space-y-3">
                      {FAQS.map((faq) => {
                        const isOpen = expandedFaq === faq.id
                        return (
                          <div key={faq.id} className="glass rounded-2xl border-white/5 bg-white/[0.01] overflow-hidden transition-all duration-300">
                            <button
                              onClick={() => setExpandedFaq(isOpen ? null : faq.id)}
                              className="w-full flex items-center justify-between p-5 text-left text-xs sm:text-sm font-bold text-white hover:bg-white/5 transition-colors cursor-pointer"
                            >
                              <span className="flex items-center gap-3">
                                <HelpCircle className="w-4 h-4 text-melhek-blue flex-shrink-0" />
                                {faq.question}
                              </span>
                              <ChevronDown className={`w-4 h-4 text-white/40 transition-transform duration-300 ${isOpen ? 'rotate-180 text-melhek-blue' : ''}`} />
                            </button>
                            <AnimatePresence initial={false}>
                              {isOpen && (
                                <motion.div
                                  initial={{ height: 0 }}
                                  animate={{ height: 'auto' }}
                                  exit={{ height: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="overflow-hidden"
                                >
                                  <div className="p-5 pt-0 text-xs text-white/60 leading-relaxed pl-12 border-t border-white/5 bg-black/10">
                                    {faq.answer}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* BOTTOM CORE CONVERSION BANNER */}
                  <div className="p-8 sm:p-10 rounded-[2rem] bg-gradient-to-r from-melhek-blue/15 to-emerald-500/5 border border-melhek-blue/20 text-center space-y-5 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-44 h-44 bg-melhek-blue/10 rounded-full blur-3xl pointer-events-none" />
                    <h3 className="text-xl font-display font-bold text-white">Ready to Establish Your Digital Backbone?</h3>
                    <p className="text-xs text-white/60 font-light max-w-lg mx-auto">
                      Step forward to the digital partnership terms and sign the agreement to kick off the design sprint.
                    </p>
                    <button
                      onClick={() => setActiveStage('agreement')}
                      className="btn-primary flex items-center justify-center gap-3 px-10 py-4 text-xs font-mono uppercase tracking-widest cursor-pointer mx-auto shadow-lg shadow-melhek-blue/35 hover:scale-105 transition-all"
                    >
                      Sign Partnership Agreement <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                </div>

              </div>

            </motion.section>
          )}

          {/* ========================================================================= */}
          {/* PHASE 2: AGREEMENT & SIGNATURE                                            */}
          {/* ========================================================================= */}
          {activeStage === 'agreement' && (
            <motion.section
              key="agreement"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 pb-16"
            >
              <div className="text-center mb-8 space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold">Step 2 of 4 // Partnership Alignment</span>
                <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white">Digital Partnership Agreement</h2>
                <p className="text-xs text-white/50 font-light max-w-xl mx-auto">
                  Review the aligned responsibilities and sign the electronic contract registry below.
                </p>
              </div>

              <div className="glass rounded-[2rem] border-white/10 bg-melhek-navy/85 p-6 sm:p-10 shadow-2xl space-y-6">
                
                {/* Aligned Responsibilities Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b border-white/10 pb-6">
                  <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-3">
                    <h4 className="text-xs font-bold text-melhek-blue uppercase font-mono tracking-wider flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" /> Melhek Commitments
                    </h4>
                    <ul className="space-y-2 text-[11px] text-white/60 font-light">
                      <li>• Custom Next.js codebase built to high speed scores</li>
                      <li>• Complete code transfer & 100% IP ownership</li>
                      <li>• Level-2 SLA strategic technical consulting desk</li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-3">
                    <h4 className="text-xs font-bold text-emerald-400 uppercase font-mono tracking-wider flex items-center gap-2">
                      <UserCheck className="w-4 h-4" /> Partner Commitments
                    </h4>
                    <ul className="space-y-2 text-[11px] text-white/60 font-light">
                      <li>• Complete the Business Intake Scoping Form</li>
                      <li>• Provide core logos, photos, and copy assets</li>
                      <li>• Maintain professional, responsive coordination</li>
                    </ul>
                  </div>
                </div>

                {/* Agreement Scroll Terms */}
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                    <div className="space-y-0.5">
                      <span className="text-[9px] font-mono text-white/30 uppercase block">Agreement ID</span>
                      <span className="text-[11px] font-mono text-melhek-blue font-bold">MDP-AGR-2026-{partnerId.replace('MDP-2026-', '')}</span>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[9px] font-mono text-white/30 uppercase block">Signed On</span>
                      <span className="text-[11px] font-mono text-white">{new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-[10px] font-mono text-emerald-400 font-bold">Verification Status: Verified</span>
                    </div>
                  </div>
                </div>

                {/* Agreement Scroll Terms */}
                <div className="space-y-3">
                  <div className="text-[9px] font-mono text-white/30 uppercase">Terms of Alignment</div>
                  <div className="h-44 overflow-y-auto pr-2 text-[11px] text-white/60 font-light leading-relaxed space-y-3 bg-black/40 p-4 rounded-xl border border-white/5 scrollbar-thin">
                    <p className="font-bold text-white">1. Core Platform Sponsorship</p>
                    <p>Melhek Technologies agrees to build, optimize, and deploy the core web application for the Partner at 0 ETB upfront cost. Market value is estimated at ~45,000 ETB.</p>
                    <p className="font-bold text-white">2. Full IP & Code Ownership</p>
                    <p>All source code, graphic designs, assets, and database credentials belong fully to the Partner upon build completion. No lock-in fees or platform dependencies apply.</p>
                    <p className="font-bold text-white">3. Professional Integrity & Reference</p>
                    <p>The Partner is never forced to share advertisements. All referrals are strictly voluntary and authentic.</p>
                    <p className="font-bold text-white">4. Confidentiality standards</p>
                    <p>Both parties agree to treat all scoping sheets, mockups, client lists, and strategic guidelines as proprietary and strictly confidential.</p>
                  </div>
                </div>

                {/* E-Signature Input & Pad Form */}
                <form onSubmit={handleSignAgreement} className="space-y-5 pt-4 border-t border-white/10">
                  
                  <div className="space-y-2.5">
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={agreeTerms}
                        onChange={(e) => setAgreeTerms(e.target.checked)}
                        className="mt-1 w-4 h-4 rounded border-white/20 bg-white/5 text-melhek-blue focus:ring-melhek-blue cursor-pointer"
                      />
                      <span className="text-xs text-white/70 group-hover:text-white transition-colors">
                        I read and accept the Melhek Digital Partner Program terms of strategic alignment.
                      </span>
                    </label>

                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={agreeAuthenticity}
                        onChange={(e) => setAgreeAuthenticity(e.target.checked)}
                        className="mt-1 w-4 h-4 rounded border-white/20 bg-white/5 text-melhek-blue focus:ring-melhek-blue cursor-pointer"
                      />
                      <span className="text-xs text-white/70 group-hover:text-white transition-colors">
                        I verify that I am authorized to execute this digital partnership registry.
                      </span>
                    </label>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[9px] font-mono text-white/40 uppercase block mb-1">Representative Full Name *</label>
                      <input
                        type="text"
                        required
                        value={partnerFullName}
                        onChange={(e) => setPartnerFullName(e.target.value)}
                        placeholder="e.g. Abebe Bikila"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-melhek-blue font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-[9px] font-mono text-white/40 uppercase block mb-1">Company Name or Role</label>
                      <input
                        type="text"
                        value={formData.businessName}
                        onChange={(e) => handleSaveFormData({ businessName: e.target.value })}
                        placeholder="e.g. Apex Hospitality Group"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-melhek-blue font-mono"
                      />
                    </div>
                  </div>


                  {/* Draw Signature Pad */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="text-[9px] font-mono text-white/40 uppercase flex items-center gap-1">
                          <FileSignature className="w-3.5 h-3.5 text-melhek-blue" /> Draw Electronic Signature Below *
                        </label>
                        <button
                          type="button"
                          onClick={clearSignature}
                          className="text-[9px] font-mono text-red-400 hover:underline cursor-pointer"
                        >
                          Clear Canvas
                        </button>
                      </div>

                      <div className="relative rounded-xl border border-white/20 bg-black/60 overflow-hidden">
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
                          <div className="absolute inset-0 pointer-events-none flex items-center justify-center text-white/20 text-xs font-mono">
                            [ Sign with mouse, trackpad, or touchscreen ]
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Live Signature font preview */}
                    <div className="glass p-4 rounded-xl border-white/5 bg-white/[0.01] flex flex-col justify-between">
                      <div>
                        <span className="text-[9px] font-mono text-white/30 uppercase block">Cursive Preview</span>
                        <div className="h-16 flex items-center justify-center border-b border-white/5">
                          {partnerFullName ? (
                            <span className="font-serif italic text-xl text-melhek-steel tracking-wide font-light select-none">
                              {partnerFullName}
                            </span>
                          ) : (
                            <span className="text-[10px] font-mono text-white/20">[ Awaiting input ]</span>
                          )}
                        </div>
                      </div>
                      <div className="text-[9px] font-mono text-white/40 leading-relaxed">
                        Securely compiled using your local device metadata.
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setActiveStage('welcome')}
                      className="btn-secondary !px-6 !py-2.5 text-xs font-mono uppercase tracking-wider cursor-pointer"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={!agreeTerms || !agreeAuthenticity || !partnerFullName.trim() || !signatureData}
                      className="btn-primary !px-8 !py-3.5 text-xs font-mono uppercase tracking-widest cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Sign & Continue <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              </div>
            </motion.section>
          )}

          {/* ========================================================================= */}
          {/* INTERMEDIATE SUCCESS STAGE                                                */}
          {/* ========================================================================= */}
          {activeStage === 'success' && (
            <motion.section
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="max-w-2xl mx-auto px-4 sm:px-6 pt-12 pb-16"
            >
              {/* Confirmation Banner */}
              <div className="text-center mb-8 space-y-2">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.15, type: 'spring', stiffness: 200 }}
                  className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto mb-4"
                >
                  <CheckCircle2 className="w-8 h-8" />
                </motion.div>
                <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-widest font-bold">Partnership Accepted</span>
                <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white">Welcome to the Program.</h2>
                <p className="text-xs text-white/50 max-w-xs mx-auto leading-relaxed">
                  Your submission has been received. Here is your official partner profile.
                </p>
              </div>

              {/* Partner Profile Card */}
              <div className="glass rounded-[2rem] border-white/10 bg-melhek-navy/90 overflow-hidden shadow-2xl">
                {/* Card Header */}
                <div className="bg-gradient-to-r from-melhek-blue/15 to-transparent border-b border-white/10 p-6 sm:p-8 flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-melhek-blue/20 border border-melhek-blue/30 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-7 h-7 text-melhek-blue" />
                  </div>
                  <div>
                    <h3 className="text-lg font-display font-extrabold text-white">{partnerFullName}</h3>
                    <span className="text-[10px] font-mono text-melhek-blue font-bold">Founding Digital Partner</span>
                  </div>
                  <div className="ml-auto">
                    <span className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-[10px] font-mono font-bold px-3 py-1.5 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Active
                    </span>
                  </div>
                </div>

                {/* Profile Details Grid */}
                <div className="p-6 sm:p-8 grid grid-cols-2 sm:grid-cols-3 gap-5">
                  {[
                    { label: 'Partner ID', value: partnerId, highlight: true },
                    { label: 'Status', value: 'Founding Digital Partner', highlight: false },
                    { label: 'Joined', value: new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric' }), highlight: false },
                    { label: 'Current Project', value: 'Sponsored Website Build', highlight: false },
                    { label: 'Relationship', value: 'Active', highlight: false },
                    { label: 'Next Step', value: 'Business Discovery', highlight: false },
                  ].map((item) => (
                    <div key={item.label} className="space-y-1">
                      <span className="text-[9px] font-mono text-white/30 uppercase block">{item.label}</span>
                      <span className={`text-xs font-bold block ${item.highlight ? 'text-melhek-blue' : 'text-white'}`}>{item.value}</span>
                    </div>
                  ))}
                </div>

                {/* Card Footer */}
                <div className="border-t border-white/10 p-6 sm:p-8">
                  <button
                    onClick={() => setActiveStage('discovery')}
                    className="btn-primary w-full flex items-center justify-center gap-3 py-4 text-xs font-mono uppercase tracking-widest cursor-pointer"
                  >
                    Tell Us About Your Business <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.section>
          )}

          {/* ========================================================================= */}
          {/* PHASE 3: BUSINESS INTAKE & DISCOVERY FORM                                 */}
          {/* ========================================================================= */}
          {activeStage === 'discovery' && (
            <motion.section
              key="discovery"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="max-w-3xl mx-auto px-4 sm:px-6 pt-6 pb-16"
            >
              <div className="text-center mb-8 space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-melhek-blue font-bold">Step 3 of 4 // Scope Sprint Intake</span>
                <h2 className="text-2xl font-display font-extrabold text-white">Business Discovery Form</h2>
                <p className="text-xs text-white/50 max-w-md mx-auto">
                  Provide your business goals and asset links so we can prepare your custom UI and software architecture.
                </p>
                {formSavedTime && (
                  <span className="inline-block text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                    Draft auto-saved at {formSavedTime}
                  </span>
                )}
              </div>

              {/* Progress Indicator */}
              <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden mb-6 max-w-md mx-auto border border-white/10">
                <div
                  className="bg-gradient-to-r from-melhek-blue to-emerald-400 h-full transition-all duration-300"
                  style={{ width: `${(discoveryStep / 4) * 100}%` }}
                />
              </div>

              <div className="glass rounded-[2rem] border-white/10 bg-melhek-navy/85 p-6 sm:p-8 shadow-2xl">
                
                {/* STEP 1: CONTACT PROFILE */}
                {discoveryStep === 1 && (
                  <div className="space-y-4">
                    <h3 className="text-xs font-bold text-white border-b border-white/10 pb-2.5 flex items-center gap-2 font-mono">
                      <Building2 className="w-4 h-4 text-melhek-blue" /> 01 // Contact & Brand Name
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[9px] font-mono text-white/40 uppercase block mb-1">Brand Name *</label>
                        <input
                          type="text"
                          value={formData.businessName}
                          onChange={(e) => handleSaveFormData({ businessName: e.target.value })}
                          placeholder="e.g. Apex Hospitality Group"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-melhek-blue"
                        />
                      </div>
                      <div>
                        <label className="text-[9px] font-mono text-white/40 uppercase block mb-1">Owner Name *</label>
                        <input
                          type="text"
                          value={formData.ownerName || partnerFullName}
                          onChange={(e) => handleSaveFormData({ ownerName: e.target.value })}
                          placeholder="e.g. Abebe Bikila"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-melhek-blue"
                        />
                      </div>
                      <div>
                        <label className="text-[9px] font-mono text-white/40 uppercase block mb-1">Email *</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleSaveFormData({ email: e.target.value })}
                          placeholder="e.g. contact@apexhospitality.et"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-melhek-blue"
                        />
                      </div>
                      <div>
                        <label className="text-[9px] font-mono text-white/40 uppercase block mb-1">Phone / Telegram *</label>
                        <input
                          type="text"
                          value={formData.phone}
                          onChange={(e) => handleSaveFormData({ phone: e.target.value })}
                          placeholder="e.g. +251 911 234 567"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-melhek-blue"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 2: OPERATIONAL TARGETS */}
                {discoveryStep === 2 && (
                  <div className="space-y-4">
                    <h3 className="text-xs font-bold text-white border-b border-white/10 pb-2.5 flex items-center gap-2 font-mono">
                      <TrendingUp className="w-4 h-4 text-melhek-blue" /> 02 // Goals & Target Audience
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <label className="text-[9px] font-mono text-white/40 uppercase block mb-1">What is the Primary Objective? *</label>
                        <select
                          value={formData.primaryGoal}
                          onChange={(e) => handleSaveFormData({ primaryGoal: e.target.value })}
                          className="w-full bg-melhek-navy border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-melhek-blue"
                        >
                          <option value="Establish Digital Authority & Client Acquisition">Establish Digital Authority & Client Acquisition</option>
                          <option value="Direct Room / Appointment Bookings">Direct Room / Appointment Bookings</option>
                          <option value="Automated Customer Inquiry & Support Handling">Automated Customer Inquiry & Support Handling</option>
                          <option value="Showcase High-End Product Catalog">Showcase High-End Product Catalog</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[9px] font-mono text-white/40 uppercase block mb-1">Target Customer Profile *</label>
                        <textarea
                          rows={3}
                          value={formData.targetAudience}
                          onChange={(e) => handleSaveFormData({ targetAudience: e.target.value })}
                          placeholder="Who are your ideal customers?"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-melhek-blue"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 3: SYSTEM CONFIG */}
                {discoveryStep === 3 && (
                  <div className="space-y-4">
                    <h3 className="text-xs font-bold text-white border-b border-white/10 pb-2.5 flex items-center gap-2 font-mono">
                      <Cpu className="w-4 h-4 text-melhek-blue" /> 03 // Desired Core Features
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {[
                        'Contact & Lead Intake Forms',
                        'Interactive Product / Service Showcase',
                        'Direct Telebirr / CBE Payment Integration',
                        'Appointment Booking Engine',
                        'Multi-Language Support (English / Amharic)',
                        'Customer Testimonial & Case Study Gallery'
                      ].map((ft) => {
                        const isSelected = formData.keyFeatures.includes(ft)
                        return (
                          <button
                            key={ft}
                            type="button"
                            onClick={() => {
                              const next = isSelected
                                ? formData.keyFeatures.filter(x => x !== ft)
                                : [...formData.keyFeatures, ft]
                              handleSaveFormData({ keyFeatures: next })
                            }}
                            className={`p-3 rounded-xl text-left border text-[11px] font-mono transition-all flex items-center justify-between cursor-pointer ${
                              isSelected 
                                ? 'bg-melhek-blue/15 border-melhek-blue text-white font-bold'
                                : 'bg-white/5 border-white/10 text-white/60 hover:text-white'
                            }`}
                          >
                            <span>{ft}</span>
                            {isSelected && <Check className="w-3.5 h-3.5 text-melhek-blue" />}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* STEP 4: ASSETS & NOTES */}
                {discoveryStep === 4 && (
                  <div className="space-y-4">
                    <h3 className="text-xs font-bold text-white border-b border-white/10 pb-2.5 flex items-center gap-2 font-mono">
                      <UploadCloud className="w-4 h-4 text-melhek-blue" /> 04 // Assets & Developer Notes
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <label className="text-[9px] font-mono text-white/40 uppercase block mb-1">Brand Assets Readiness</label>
                        <select
                          value={formData.brandAssetsAvailable}
                          onChange={(e) => handleSaveFormData({ brandAssetsAvailable: e.target.value })}
                          className="w-full bg-melhek-navy border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-melhek-blue"
                        >
                          <option value="Logo & Basic Brand Colors Available">Logo & Basic Brand Colors Available</option>
                          <option value="Full Brand Guidelines & High-Res Photography Ready">Full Brand Guidelines & High-Res Photography Ready</option>
                          <option value="Need Melhek Design Desk to Create/Refresh Logo & Assets">Need Melhek Design Desk to Create/Refresh Logo & Assets</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[9px] font-mono text-white/40 uppercase block mb-1">Additional Requirements / Special Integrations</label>
                        <textarea
                          rows={3}
                          value={formData.additionalNotes}
                          onChange={(e) => handleSaveFormData({ additionalNotes: e.target.value })}
                          placeholder="e.g. Branch locations, custom booking rules, database fields needed..."
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-melhek-blue"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Discovery Form Control Panel */}
                <div className="flex items-center justify-between pt-6 border-t border-white/10 mt-6">
                  {discoveryStep > 1 ? (
                    <button
                      onClick={() => setDiscoveryStep(prev => prev - 1)}
                      className="btn-secondary !px-5 !py-2.5 text-xs font-mono uppercase tracking-wider cursor-pointer"
                    >
                      Previous
                    </button>
                  ) : <div />}

                  {discoveryStep < 4 ? (
                    <button
                      onClick={() => setDiscoveryStep(prev => prev + 1)}
                      className="btn-primary !px-5 !py-2.5 text-xs font-mono uppercase tracking-wider cursor-pointer"
                    >
                      Next Step <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={handleCompleteDiscovery}
                      className="btn-primary !px-8 !py-3.5 text-xs font-mono uppercase tracking-widest cursor-pointer"
                    >
                      Complete & Enter Workspace <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </motion.section>
          )}

          {/* ========================================================================= */}
          {/* PHASE 4: LIVE PARTNER WORKSPACE DASHBOARD                                 */}
          {/* ========================================================================= */}
          {activeStage === 'dashboard' && (
            <motion.section
              key="dashboard"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="max-w-7xl mx-auto px-4 sm:px-6 pt-4 pb-16"
            >
              {/* Portal Header */}
              <div className="glass rounded-[2rem] border-white/10 bg-melhek-navy/85 p-6 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase">Active Partner Portal</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-display font-extrabold text-white mt-1">
                    {formData.businessName || 'Apex Hospitality Group'} Hub
                  </h2>
                  <p className="text-xs text-white/50">
                    Partner: {formData.ownerName || partnerFullName || 'Abebe Bikila'} | Reference ID: <span className="text-melhek-blue font-mono">{partnerId}</span>
                  </p>
                </div>

                <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/10 font-mono text-xs">
                  <div>
                    <span className="text-white/40 block text-[9px] uppercase">Sprint Phase</span>
                    <span className="text-white font-bold">04 // UX & Sitemap</span>
                  </div>
                  <div className="h-6 w-px bg-white/10" />
                  <div>
                    <span className="text-white/40 block text-[9px] uppercase">Estimated Beta</span>
                    <span className="text-emerald-400 font-bold">18 Sprints</span>
                  </div>
                </div>
              </div>

              {/* Portal Workspace Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                
                {/* Workspace Menu */}
                <div className="glass p-2.5 rounded-2xl border-white/10 bg-melhek-navy/60 h-fit space-y-1">
                  {([
                    { id: 'overview', label: 'Sprint Kanban', icon: LayoutDashboard },
                    { id: 'messages', label: 'Developer Chat', icon: MessageSquare },
                    { id: 'vault', label: 'Document Vault', icon: FileCheck },
                    { id: 'calendar', label: 'Consulting Sync', icon: Calendar },
                    { id: 'upgrades', label: 'Scale Integrations', icon: Zap }
                  ] as const).map((tab) => {
                    const Icon = tab.icon
                    const isActive = dashboardTab === tab.id
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setDashboardTab(tab.id)}
                        className={`w-full flex items-center gap-3 px-4.5 py-3 rounded-xl text-xs font-mono font-bold transition-all text-left cursor-pointer ${
                          isActive 
                            ? 'bg-melhek-blue text-melhek-navy shadow-md shadow-melhek-blue/10'
                            : 'text-white/60 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <Icon className="w-4 h-4 flex-shrink-0" />
                        <span>{tab.label}</span>
                      </button>
                    )
                  })}
                </div>

                {/* Workspace Panel */}
                <div className="lg:col-span-3">
                  
                  {/* OVERVIEW TAB: MILESTONE TRACKER */}
                  {dashboardTab === 'overview' && (
                    <div className="space-y-6">

                      {/* Human-readable Milestone Tracker */}
                      <div className="glass p-6 sm:p-8 rounded-2xl border-white/10 bg-melhek-navy/55 space-y-5">
                        <div className="flex items-center justify-between border-b border-white/10 pb-4">
                          <h3 className="text-xs font-mono text-white/40 uppercase flex items-center gap-2">
                            <Award className="w-4 h-4 text-melhek-blue" /> Your Project Milestones
                          </h3>
                          <span className="text-[10px] font-mono text-melhek-blue bg-melhek-blue/10 border border-melhek-blue/20 px-2.5 py-1 rounded-full">Design Phase</span>
                        </div>

                        <div className="space-y-4">
                          {[
                            { label: 'Discovery Complete', sub: 'Business goals and scope captured', done: true },
                            { label: 'Strategy Approved', sub: 'Sitemap, user flow, and technical plan confirmed', done: true },
                            { label: 'Design in Progress', sub: 'High-fidelity Figma prototypes are being built', active: true },
                            { label: 'Development', sub: 'Next.js build, animations, and integrations', done: false },
                            { label: 'Review', sub: 'Beta preview with quality checks and partner feedback', done: false },
                            { label: 'Launch', sub: 'Production deployment, domain mapping, and SSL', done: false },
                          ].map((m, idx) => (
                            <div key={idx} className="flex items-start gap-4">
                              {/* Status Icon */}
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border mt-0.5 ${
                                m.done
                                  ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400'
                                  : (m as any).active
                                  ? 'bg-melhek-blue/20 border-melhek-blue text-melhek-blue animate-pulse'
                                  : 'bg-white/5 border-white/10 text-white/20'
                              }`}>
                                {m.done ? (
                                  <Check className="w-4 h-4" />
                                ) : (m as any).active ? (
                                  <Clock className="w-4 h-4" />
                                ) : (
                                  <span className="text-[10px] font-mono font-bold">{String(idx + 1).padStart(2, '0')}</span>
                                )}
                              </div>
                              {/* Label */}
                              <div className="flex-1 pt-1">
                                <div className="flex items-center justify-between">
                                  <h4 className={`text-xs font-bold ${
                                    m.done ? 'text-white' : (m as any).active ? 'text-melhek-blue' : 'text-white/40'
                                  }`}>
                                    {m.label}
                                    {m.done && <span className="ml-2 text-[9px] font-mono text-emerald-400">✓</span>}
                                  </h4>
                                </div>
                                <p className={`text-[11px] mt-0.5 ${
                                  m.done ? 'text-white/50' : (m as any).active ? 'text-white/70' : 'text-white/25'
                                }`}>{m.sub}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Log */}
                      <div className="glass p-6 rounded-2xl border-white/10 bg-melhek-navy/55 space-y-3">
                        <h3 className="text-xs font-mono text-white/40 uppercase flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 text-melhek-blue" /> Action Ledger & Registry
                        </h3>
                        <div className="space-y-2.5">
                          <div className="p-3.5 rounded-xl bg-white/[0.01] border border-white/5 flex gap-3 text-xs">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5" />
                            <div>
                              <p className="font-bold text-white">Discovery Intake Form Logged</p>
                              <span className="text-[10px] text-white/40 font-mono">Assigned to engineering desk.</span>
                            </div>
                          </div>
                          <div className="p-3.5 rounded-xl bg-white/[0.01] border border-white/5 flex gap-3 text-xs">
                            <FileSignature className="w-4 h-4 text-melhek-blue mt-0.5" />
                            <div>
                              <p className="font-bold text-white">Partnership Agreement Locked</p>
                              <span className="text-[10px] text-white/40 font-mono">Ref {partnerId} verified by {partnerFullName}.</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* DEVELOPER CHAT TAB */}
                  {dashboardTab === 'messages' && (
                    <div className="glass p-6 rounded-2xl border-white/10 bg-melhek-navy/55 space-y-4">
                      <div className="flex items-center justify-between border-b border-white/10 pb-3">
                        <h3 className="text-xs font-mono text-white/40 uppercase flex items-center gap-2">
                          <MessageSquare className="w-4 h-4 text-melhek-blue" /> Direct Strategist Desk
                        </h3>
                        <span className="text-[9px] font-mono text-emerald-400 font-bold">Online SLA: &lt; 2hr</span>
                      </div>
                      <div className="h-72 overflow-y-auto space-y-3 pr-1.5 scrollbar-thin">
                        {messages.map((msg, i) => (
                          <div key={i} className={`flex flex-col ${msg.sender.includes('Melhek') ? 'items-start' : 'items-end'}`}>
                            <div className={`p-3.5 rounded-xl max-w-sm text-xs leading-relaxed ${
                              msg.sender.includes('Melhek')
                                ? 'bg-melhek-blue/15 border border-melhek-blue/30 text-white rounded-tl-none'
                                : 'bg-emerald-500/20 border border-emerald-500/30 text-white rounded-tr-none'
                            }`}>
                              <span className="text-[8px] font-mono text-melhek-blue font-bold block mb-1">{msg.sender}</span>
                              {msg.text}
                              <span className="text-[8px] text-white/30 font-mono block text-right mt-1">{msg.time}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      <form onSubmit={handleSendMessage} className="flex gap-2 pt-3 border-t border-white/10">
                        <input
                          type="text"
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          placeholder="Type notes, assets, or scopes for the engineering desk..."
                          className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-melhek-blue"
                        />
                        <button
                          type="submit"
                          className="btn-primary !px-4 !py-2.5 text-xs font-mono uppercase tracking-wider cursor-pointer flex items-center gap-1.5"
                        >
                          Send <SendHorizontal className="w-3.5 h-3.5" />
                        </button>
                      </form>
                    </div>
                  )}

                  {/* DOCUMENT VAULT TAB */}
                  {dashboardTab === 'vault' && (
                    <div className="glass p-6 rounded-2xl border-white/10 bg-melhek-navy/55 space-y-4">
                      <h3 className="text-xs font-mono text-white/40 uppercase border-b border-white/10 pb-3 flex items-center gap-2">
                        <FileCheck className="w-4 h-4 text-melhek-blue" /> Validated Documents & Assets
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <FileSignature className="w-5 h-5 text-emerald-400" />
                            <div>
                              <p className="text-xs text-white font-bold">Signed Agreement</p>
                              <span className="text-[9px] text-white/40 font-mono">{partnerId}</span>
                            </div>
                          </div>
                          <span className="text-[9px] text-emerald-400 font-mono font-bold bg-emerald-500/10 px-2 py-0.5 rounded">Locked</span>
                        </div>
                        <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <FileText className="w-5 h-5 text-melhek-blue" />
                            <div>
                              <p className="text-xs text-white font-bold">Discovery Intake Scoping</p>
                              <span className="text-[9px] text-white/40 font-mono">JSON Database Entry</span>
                            </div>
                          </div>
                          <span className="text-[9px] text-melhek-blue font-mono font-bold bg-melhek-blue/10 px-2 py-0.5 rounded">Saved</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* CONSULTING SYNC TAB */}
                  {dashboardTab === 'calendar' && (
                    <div className="glass p-6 rounded-2xl border-white/10 bg-melhek-navy/55 space-y-4">
                      <h3 className="text-xs font-mono text-white/40 uppercase border-b border-white/10 pb-3 flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-melhek-blue" /> Strategic Consulting Calendar
                      </h3>
                      <div className="p-5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                        <div className="space-y-0.5">
                          <span className="text-[8px] font-mono text-melhek-blue uppercase">Design Sprint 1</span>
                          <h4 className="text-xs font-bold text-white">Figma Blueprint Review Sync</h4>
                          <p className="text-[11px] text-white/40">30-min strategy presentation & scope lock</p>
                        </div>
                        <button className="btn-secondary !px-3 !py-1.5 text-[9px] font-mono uppercase tracking-wider cursor-pointer">
                          Add Meeting
                        </button>
                      </div>
                    </div>
                  )}

                  {/* SCALE INTEGRATIONS TAB */}
                  {dashboardTab === 'upgrades' && (
                    <div className="glass p-6 rounded-2xl border-white/10 bg-melhek-navy/55 space-y-4">
                      <h3 className="text-xs font-mono text-white/40 uppercase border-b border-white/10 pb-3 flex items-center gap-2">
                        <Zap className="w-4 h-4 text-melhek-blue" /> Available Software Scale Upgrades
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {GROWTH_SERVICES.slice(0, 4).map((g) => {
                          const Icon = g.icon
                          return (
                            <div key={g.id} className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col justify-between space-y-3">
                              <div className="space-y-1.5">
                                <div className="w-7 h-7 rounded-lg bg-melhek-blue/10 border border-melhek-blue/20 flex items-center justify-center text-melhek-blue">
                                  <Icon className="w-4 h-4" />
                                </div>
                                <h4 className="text-xs font-bold text-white">{g.title}</h4>
                                <p className="text-[11px] text-white/50 leading-relaxed font-light">{g.description}</p>
                              </div>
                              <button className="btn-secondary !py-1.5 !px-3 !text-[9px] font-mono uppercase tracking-wider w-full justify-center cursor-pointer">
                                Scoping Inquiry
                              </button>
                            </div>
                          )
                        })}
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
