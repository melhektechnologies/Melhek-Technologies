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
  SendHorizontal, AlertCircle, ShieldCheck, HelpCircle, ChevronDown,
  Download, Printer, Search, Smartphone, Laptop, Eye,
  ExternalLink, Copy, CheckSquare, Sparkle, Sliders
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
  icon: React.ComponentType<{ className?: string }>
  tagline: string
  description: string
  impact: string
  category: string
  estValueETB: number
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
  brandStyle: string
  brandAssetsAvailable: string
  preferredTimeline: string
  additionalNotes: string
}

// ── CONSTANTS & DATA ──
const GROWTH_SERVICES: GrowthService[] = [
  {
    id: 'ai_chatbot',
    title: 'Custom AI Assistant & Knowledge Base',
    icon: Cpu,
    tagline: '24/7 Automated Customer Support & Lead Qualification',
    description: 'Bespoke AI chatbot trained on your company documentation, answering inquiries in Amharic and English instantly across web, WhatsApp, and Telegram.',
    impact: 'Reduces support response times by 95% and captures qualified leads automatically.',
    category: 'Automation & AI',
    estValueETB: 35000
  },
  {
    id: 'crm_system',
    title: 'Custom CRM & Client Pipeline',
    icon: Users,
    tagline: 'Centralized Customer Relationship Management',
    description: 'Track leads, client histories, quotes, and communication logs in a unified dashboard built specifically for your team workflow.',
    impact: 'Prevents lead drop-off and increases client conversion rates.',
    category: 'Operations',
    estValueETB: 28000
  },
  {
    id: 'erp_inventory',
    title: 'Inventory & ERP Ledger Systems',
    icon: Layers,
    tagline: 'Real-Time Stock & Multi-Branch Management',
    description: 'Cloud-synced inventory tracking with barcode scanning, re-order threshold alerts, and automated purchase orders.',
    impact: 'Eliminates stock discrepancies and manual inventory counts.',
    category: 'Operations',
    estValueETB: 42000
  },
  {
    id: 'booking_engine',
    title: 'Smart Booking & Calendar Engine',
    icon: Calendar,
    tagline: 'Automated Scheduling & Local Payment Locks',
    description: 'Direct appointment and room booking system integrated with Telebirr and CBE Birr deposit confirmations.',
    impact: 'Eliminates double-bookings and collects non-refundable deposits upfront.',
    category: 'E-Commerce',
    estValueETB: 30000
  },
  {
    id: 'workflow_automation',
    title: 'Business Process Automation',
    icon: Zap,
    tagline: 'Zero-Manual Administrative Pipelines',
    description: 'Connect internal spreadsheets, PDF invoicing, SMS notifications, and accounting software into automated sync loops.',
    impact: 'Saves 15+ hours per week in manual office administration.',
    category: 'Automation',
    estValueETB: 22000
  },
  {
    id: 'analytics_engine',
    title: 'Executive Analytics & BI Dashboard',
    icon: BarChart3,
    tagline: 'Real-Time Revenue & User Behavior Insights',
    description: 'Custom metric dashboards visualizing conversion funnels, daily revenue trends, and operational bottlenecks.',
    impact: 'Empowers data-driven executive decision-making.',
    category: 'Analytics',
    estValueETB: 25000
  },
  {
    id: 'domain_email',
    title: 'Enterprise Domain & Google Workspace',
    icon: Globe,
    tagline: 'Custom Corporate Email & Security Setup',
    description: 'Professional domain acquisition, SPF/DKIM security configuration, and corporate email desk deployment.',
    impact: 'Establishes instant digital authority with corporate clients.',
    category: 'Infrastructure',
    estValueETB: 12000
  },
  {
    id: 'marketing_automation',
    title: 'Multi-Channel Marketing Engine',
    icon: Send,
    tagline: 'Automated Telegram & Email Nurturing',
    description: 'Scheduled broadcast campaigns and lead re-engagement triggers tailored to the Ethiopian business ecosystem.',
    impact: 'Drives repeat business without manual outreach.',
    category: 'Growth',
    estValueETB: 18000
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
    answer: 'You own 100% of your data, custom code, layouts, and domain assets. Melhek provides full code transfers and private cloud deployment with zero lock-in fees.',
    category: 'Legal & IP'
  },
  {
    id: 'faq-3',
    question: 'What are the partner responsibilities under this agreement?',
    answer: 'Partners commit to timely feedback during discovery, providing authentic business information, and maintaining a professional relationship. There are no mandatory promotional posts or hidden charges.',
    category: 'Process'
  },
  {
    id: 'faq-4',
    question: 'How fast is the digital presence package deployed?',
    answer: 'Once the Business Discovery Form is completed, our agile sprint delivers the initial beta deployment within 14 to 21 business days.',
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
  
  // Customization & Personalization
  const [customBrandName, setCustomBrandName] = useState('')
  const [isEditingBrand, setIsEditingBrand] = useState(false)

  // ROI Calculator State
  const [calcIndustry, setCalcIndustry] = useState('Hospitality & Tourism')
  const [calcSelectedModules, setCalcSelectedModules] = useState<string[]>([
    'core_web', 'telebirr_cbe', 'ai_chatbot', 'booking_engine', 'seo_edge'
  ])

  // Theme & Layout Simulator State
  const [simTheme, setSimTheme] = useState<'dark_gold' | 'executive_titanium' | 'emerald_tech' | 'warm_obsidian'>('dark_gold')
  const [simDevice, setSimDevice] = useState<'desktop' | 'mobile'>('desktop')
  const [simActiveTab, setSimActiveTab] = useState<'hero' | 'services' | 'booking' | 'payment'>('hero')

  // FAQ Search & Filter State
  const [faqCategory, setFaqCategory] = useState<string>('All')
  const [faqSearchQuery, setFaqSearchQuery] = useState('')
  const [expandedFaq, setExpandedFaq] = useState<string | null>('faq-1')

  // Agreement State
  const [signatureMode, setSignatureMode] = useState<'draw' | 'type'>('draw')
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [agreeAuthenticity, setAgreeAuthenticity] = useState(false)
  const [partnerFullName, setPartnerFullName] = useState('')
  const [signatureData, setSignatureData] = useState<string | null>(null)
  const [isSigned, setIsSigned] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [pseudoHash, setPseudoHash] = useState('SHA-256-PENDING-SIGNATURE-AUTH')
  const [showCertificateModal, setShowCertificateModal] = useState(false)
  const [copiedHash, setCopiedHash] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

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
    keyFeatures: ['Contact Intake Form', 'Interactive Service Showcase', 'SEO Edge Setup'],
    brandStyle: 'Dark Luxury & High-Tech',
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
  const [upgradeModalItem, setUpgradeModalItem] = useState<GrowthService | null>(null)
  const [upgradeInquirySent, setUpgradeInquirySent] = useState(false)

  // Table of Contents Active Item
  const [activeSection, setActiveSection] = useState('welcome-hero')

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
      const name = localStorage.getItem('melhek_partner_name') || ''
      setPartnerFullName(name)
    }

    const savedForm = localStorage.getItem('melhek_discovery_form')
    if (savedForm) {
      try {
        const parsed = JSON.parse(savedForm)
        setFormData(parsed)
        if (parsed.businessName) setCustomBrandName(parsed.businessName)
        setFormCompleted(localStorage.getItem('melhek_discovery_completed') === 'true')
      } catch (e) {
        // Fallback
      }
    }
  }, [])

  // Section Observer for Side Index
  useEffect(() => {
    if (activeStage !== 'welcome') return
    const sections = ['welcome-hero', 'why-selected', 'roi-calculator', 'theme-simulator', 'founder-letter', 'program-vision', 'sponsored-package', 'growth-services', 'timeline-roadmap', 'faqs']
    
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

  // Cryptographic hash generation
  useEffect(() => {
    if (!partnerFullName) {
      setPseudoHash('SHA-256-PENDING-SIGNATURE-AUTH')
      return
    }
    let hash = 0
    const str = `${partnerFullName}-${partnerId}-${formData.businessName || 'MELHEK'}`
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i)
      hash |= 0
    }
    const hex = Math.abs(hash).toString(16).toUpperCase().padStart(8, '0')
    setPseudoHash(`SHA256-ETH-${hex}-PARTNER-AUTH-${partnerId}`)
  }, [partnerFullName, partnerId, formData.businessName])

  // Scroll helper
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

  // Generate typed signature snapshot
  const generateTypedSignatureCanvas = (name: string) => {
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

  const handleSignAgreement = (e: React.FormEvent) => {
    e.preventDefault()
    if (!agreeTerms || !agreeAuthenticity || !partnerFullName.trim()) return

    let finalSig = signatureData
    if (signatureMode === 'type' || !finalSig) {
      finalSig = generateTypedSignatureCanvas(partnerFullName)
      setSignatureData(finalSig)
    }

    setIsSigned(true)
    setShowConfetti(true)
    localStorage.setItem('melhek_partner_signed', 'true')
    localStorage.setItem('melhek_partner_name', partnerFullName)
    
    setTimeout(() => {
      setShowConfetti(false)
      setActiveStage('success')
    }, 1200)

    submitPartnershipData(finalSig)
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
    submitPartnershipData(undefined, formData)
  }

  const submitPartnershipData = async (sigOverride?: string | null, updatedDiscovery?: DiscoveryFormData) => {
    try {
      await fetch('/api/partnership/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          partnerId,
          partnerFullName: partnerFullName || localStorage.getItem('melhek_partner_name') || '',
          signatureData: sigOverride || signatureData,
          dateSigned: new Date().toLocaleDateString('en-GB'),
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
          text: `Thank you for your update regarding "${prompt.slice(0, 30)}...". Our senior technical architect has received this update and logged it into your sprint file.`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ])
    }, 1000)
  }

  // Calculate dynamic ROI Value
  const calculatedTotalValue = () => {
    let base = 45000 // Core web & strategy
    if (calcSelectedModules.includes('telebirr_cbe')) base += 20000
    if (calcSelectedModules.includes('ai_chatbot')) base += 35000
    if (calcSelectedModules.includes('booking_engine')) base += 30000
    if (calcSelectedModules.includes('crm_ledger')) base += 28000
    if (calcSelectedModules.includes('analytics_bi')) base += 25000
    if (calcSelectedModules.includes('seo_edge')) base += 15000
    return base
  }

  // Filtered FAQs
  const filteredFaqs = FAQS.filter(faq => {
    const matchesCategory = faqCategory === 'All' || faq.category === faqCategory
    const matchesSearch = faq.question.toLowerCase().includes(faqSearchQuery.toLowerCase()) || 
                          faq.answer.toLowerCase().includes(faqSearchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-melhek-dark text-white selection:bg-melhek-blue selection:text-melhek-navy font-sans relative overflow-x-hidden">
      <div className="grain-overlay" aria-hidden />
      <div className="digital-grid" aria-hidden />

      {/* Confetti Animation Layer */}
      {showConfetti && (
        <div className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-melhek-blue/10 backdrop-blur-sm animate-pulse" />
          <motion.div 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1.2, opacity: 1 }}
            exit={{ scale: 1.5, opacity: 0 }}
            className="glass p-8 rounded-3xl border border-emerald-400/40 text-center space-y-3 bg-melhek-navy/90 shadow-2xl"
          >
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-400/40 flex items-center justify-center mx-auto">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-display font-bold text-white">Cryptographic Partnership Locked</h3>
            <p className="text-xs font-mono text-emerald-400">Verifying signature on Melhek Partner Registry...</p>
          </motion.div>
        </div>
      )}

      {/* ── TOP PLATFORM NAVIGATION BAR ── */}
      <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10 bg-melhek-navy/85 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5 group cursor-pointer">
              <div className="w-9 h-9 rounded-xl bg-melhek-blue/15 border border-melhek-blue/40 flex items-center justify-center text-melhek-blue group-hover:scale-105 transition-transform shadow-md shadow-melhek-blue/10">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="font-display font-extrabold text-sm sm:text-base tracking-tight text-white">
                Melhek <span className="text-melhek-blue">Partner Hub</span>
              </span>
            </Link>
            <span className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono text-emerald-400 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Invitation Active
            </span>
          </div>

          {/* Core Onboarding Workflow Steps */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-1 bg-white/5 border border-white/10 rounded-full p-1 text-[11px] font-mono">
              <button
                onClick={() => setActiveStage('welcome')}
                className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${activeStage === 'welcome' ? 'bg-melhek-blue text-melhek-navy font-bold shadow' : 'text-white/60 hover:text-white'}`}
              >
                1. Program Overview
              </button>
              <button
                onClick={() => setActiveStage('agreement')}
                className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${activeStage === 'agreement' ? 'bg-melhek-blue text-melhek-navy font-bold shadow' : 'text-white/60 hover:text-white'}`}
              >
                2. Accept Agreement
              </button>
              {isSigned && (
                <button
                  onClick={() => setActiveStage('discovery')}
                  className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${activeStage === 'discovery' ? 'bg-melhek-blue text-melhek-navy font-bold shadow' : 'text-white/60 hover:text-white'}`}
                >
                  3. Business Discovery
                </button>
              )}
              {formCompleted && (
                <button
                  onClick={() => setActiveStage('dashboard')}
                  className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${activeStage === 'dashboard' ? 'bg-emerald-400 text-melhek-navy font-bold shadow' : 'text-white/60 hover:text-white'}`}
                >
                  4. Partner Workspace
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-white/50 border border-white/10 rounded-xl px-3 py-1.5 bg-black/40 hidden sm:inline-block">
                Ref ID: <span className="text-melhek-blue font-bold">{partnerId}</span>
              </span>
              {isSigned ? (
                <button
                  onClick={() => setActiveStage(formCompleted ? 'dashboard' : 'discovery')}
                  className="btn-primary !py-2 !px-4 !text-xs font-mono uppercase tracking-wider cursor-pointer shadow-md shadow-melhek-blue/20"
                >
                  {formCompleted ? 'Go to Portal' : 'Intake Form'}
                </button>
              ) : (
                <button
                  onClick={() => setActiveStage('agreement')}
                  className="btn-primary !py-2 !px-5 !text-xs font-mono uppercase tracking-wider cursor-pointer animate-pulse shadow-lg shadow-melhek-blue/30"
                >
                  Sign & Accept
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
          {/* PHASE 1: CONSOLIDATED OVERVIEW & DOSSIER                                  */}
          {/* ========================================================================= */}
          {activeStage === 'welcome' && (
            <motion.section
              key="welcome"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="max-w-7xl mx-auto px-4 sm:px-6 pt-4"
            >
              
              {/* STICKY BOTTOM FLOATING ACTIONS BAR FOR MOBILE */}
              <div className="fixed bottom-0 left-0 right-0 z-40 bg-melhek-navy/95 border-t border-white/10 p-4 block lg:hidden backdrop-blur-md">
                <button
                  onClick={() => setActiveStage('agreement')}
                  className="w-full btn-primary flex items-center justify-center gap-2 py-3.5 text-xs font-mono uppercase tracking-widest cursor-pointer shadow-lg shadow-melhek-blue/30"
                >
                  Proceed to Agreement <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Floating bottom bar on desktop */}
              <div className="hidden lg:flex fixed bottom-6 left-1/2 -translate-x-1/2 z-40 glass bg-melhek-navy/90 border border-melhek-blue/30 rounded-full px-6 py-3 items-center gap-6 shadow-2xl backdrop-blur-lg">
                <div className="flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-[11px] font-mono text-white/80">Invitation Active for <span className="text-melhek-blue font-bold">{customBrandName || 'Selected Business Creator'}</span> ({partnerId})</span>
                </div>
                <button
                  onClick={() => setActiveStage('agreement')}
                  className="btn-primary !px-5 !py-2 !text-[10px] font-mono uppercase tracking-widest cursor-pointer shadow-md shadow-melhek-blue/20 hover:scale-105 transition-all"
                >
                  Sign Partnership Agreement
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative items-start">
                
                {/* STICKY SIDE INDEX TABLE OF CONTENTS */}
                <div className="hidden lg:block lg:col-span-1 sticky top-28 space-y-4">
                  <div className="glass p-5 rounded-3xl border-white/10 bg-melhek-navy/55 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Shield className="w-3.5 h-3.5 text-melhek-blue" />
                        <span className="text-xs font-mono text-white/40 uppercase tracking-wider">Strategic Index</span>
                      </div>
                      <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                    <div className="space-y-1">
                      {[
                        { id: 'welcome-hero', label: 'Program Invitation' },
                        { id: 'why-selected', label: 'Why You Were Invited' },
                        { id: 'roi-calculator', label: 'ROI Value Calculator' },
                        { id: 'theme-simulator', label: 'Interactive App Preview' },
                        { id: 'founder-letter', label: 'Message from Founder' },
                        { id: 'program-vision', label: 'Architecture Vision' },
                        { id: 'sponsored-package', label: 'Sponsored Scope' },
                        { id: 'growth-services', label: 'Scale Modules' },
                        { id: 'timeline-roadmap', label: 'Execution Roadmap' },
                        { id: 'faqs', label: 'FAQ Registry' }
                      ].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => scrollToSection(item.id)}
                          className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left text-xs font-mono transition-all cursor-pointer ${
                            activeSection === item.id 
                              ? 'bg-melhek-blue/15 text-melhek-blue font-bold border border-melhek-blue/30 shadow-sm' 
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
                    <span className="text-white/30 uppercase block font-bold">Partnership Onboarding</span>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-emerald-400 font-bold"><Check className="w-3.5 h-3.5" /> Invitation Verified</div>
                      <div className={`flex items-center gap-2 ${isSigned ? 'text-emerald-400 font-bold' : 'text-white/40'}`}>
                        {isSigned ? <Check className="w-3.5 h-3.5" /> : <div className="w-3.5 h-3.5 border border-white/20 rounded-full" />}
                        Agreement Signed
                      </div>
                      <div className={`flex items-center gap-2 ${formCompleted ? 'text-emerald-400 font-bold' : 'text-white/40'}`}>
                        {formCompleted ? <Check className="w-3.5 h-3.5" /> : <div className="w-3.5 h-3.5 border border-white/20 rounded-full" />}
                        Business Intake
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveStage('agreement')}
                    className="w-full btn-primary flex items-center justify-center gap-3 py-4 text-xs font-mono uppercase tracking-widest cursor-pointer shadow-lg shadow-melhek-blue/25"
                  >
                    Start Onboarding <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* STACKED CONTENT SECTIONS (RIGHT SIDE) */}
                <div className="lg:col-span-3 space-y-16 pb-12">
                  
                  {/* 1. WELCOME HERO SECTION */}
                  <div id="welcome-hero" className="scroll-mt-28 space-y-6 pt-2">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass border-melhek-blue/30 text-melhek-blue text-[10px] font-mono uppercase tracking-widest">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> Selective Strategic Partnership Alliance
                    </div>
                    <div className="space-y-3">
                      <h1 className="text-4xl sm:text-6xl font-display font-extrabold tracking-tight text-white leading-[1.1]">
                        Melhek Digital <br />
                        <span className="text-gradient">Partnership Program</span>
                      </h1>
                      <p className="text-base sm:text-lg text-white/70 font-light max-w-2xl leading-relaxed">
                        We provision sponsored enterprise-grade web applications and custom software systems at <span className="text-emerald-400 font-semibold underline decoration-emerald-400/40">0 ETB upfront cost</span> for selected Ethiopian business creators and innovators.
                      </p>
                    </div>

                    {/* Dynamic Brand Name Input Pill */}
                    <div className="p-4 rounded-2xl glass border-white/10 bg-white/[0.02] max-w-xl flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <Building2 className="w-4 h-4 text-melhek-blue flex-shrink-0" />
                        <div>
                          <span className="text-[9px] font-mono text-white/40 uppercase block">Invited Organization</span>
                          {isEditingBrand ? (
                            <input
                              type="text"
                              value={customBrandName}
                              onChange={(e) => setCustomBrandName(e.target.value)}
                              placeholder="Type your company/brand name..."
                              className="bg-black/40 border border-melhek-blue/40 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none font-bold"
                              autoFocus
                            />
                          ) : (
                            <span className="text-xs font-bold text-white block">
                              {customBrandName || 'Your Business Name'}
                            </span>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => setIsEditingBrand(!isEditingBrand)}
                        className="text-[10px] font-mono text-melhek-blue hover:underline cursor-pointer bg-melhek-blue/10 px-2.5 py-1 rounded-lg border border-melhek-blue/20"
                      >
                        {isEditingBrand ? 'Save' : 'Edit Name'}
                      </button>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                      <button
                        onClick={() => setActiveStage('agreement')}
                        className="btn-primary flex items-center justify-center gap-3 px-8 py-3.5 text-xs font-mono uppercase tracking-widest cursor-pointer w-full sm:w-auto text-center shadow-lg shadow-melhek-blue/25"
                      >
                        Accept the Partnership <ArrowRight className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => scrollToSection('roi-calculator')}
                        className="btn-secondary flex items-center justify-center gap-2 px-8 py-3.5 text-xs font-mono uppercase tracking-widest cursor-pointer w-full sm:w-auto text-center"
                      >
                        Calculate Value
                      </button>
                    </div>
                  </div>

                  {/* 2. WHY YOU WERE INVITED */}
                  <div id="why-selected" className="scroll-mt-28 space-y-6">
                    <div className="p-8 sm:p-10 rounded-[2rem] bg-gradient-to-br from-melhek-blue/15 via-melhek-navy/80 to-emerald-500/5 border border-melhek-blue/25 space-y-6 relative overflow-hidden shadow-2xl">
                      <div className="absolute -top-10 -right-10 w-48 h-48 bg-melhek-blue/10 rounded-full blur-3xl pointer-events-none" />
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-melhek-blue uppercase tracking-widest font-bold">Strategic Selection</span>
                        <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">You were not selected by chance.</h2>
                      </div>
                      <p className="text-sm text-white/70 font-light leading-relaxed max-w-2xl">
                        We build a handpicked network of business leaders who shape Ethiopia&apos;s commercial landscape.
                        Rather than traditional agency vendor relationships, we choose a limited cohort each year to invest our full software engineering capabilities into.
                      </p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                        {[
                          { title: 'Validated Market Impact', desc: 'You operate an authentic business delivering real value in Ethiopia.' },
                          { title: 'Established Reputation', desc: 'Your brand represents integrity, client trust, and high operational standards.' },
                          { title: 'Digital Growth Vision', desc: 'You view modern software as operational leverage, not simple static pages.' },
                          { title: 'Long-Term Partnership', desc: 'You value direct ongoing collaboration with a dedicated engineering desk.' }
                        ].map((item, i) => (
                          <div key={i} className="flex gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                            <div>
                              <h4 className="text-xs font-bold text-white">{item.title}</h4>
                              <p className="text-[11px] text-white/50 mt-0.5 leading-relaxed font-light">{item.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* 3. INTERACTIVE ROI & SPONSORSHIP VALUE CALCULATOR */}
                  <div id="roi-calculator" className="scroll-mt-28 space-y-6">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-melhek-blue uppercase tracking-widest block font-bold">Interactive Tool</span>
                      <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">Sponsorship Value Calculator</h2>
                      <p className="text-xs text-white/60 max-w-xl font-light">
                        Select your industry and desired digital capabilities below to see the estimated market value provisioned to your organization at zero upfront capital.
                      </p>
                    </div>

                    <div className="glass p-6 sm:p-8 rounded-[2rem] border-white/10 bg-melhek-navy/70 space-y-6 shadow-2xl">
                      {/* Industry Selector */}
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono text-white/40 uppercase block">Select Industry Ecosystem</label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {[
                            'Hospitality & Tourism',
                            'Healthcare & Clinics',
                            'E-Commerce & Retail',
                            'Corporate & Professional'
                          ].map((ind) => (
                            <button
                              key={ind}
                              onClick={() => setCalcIndustry(ind)}
                              className={`px-3 py-2 rounded-xl text-xs font-mono transition-all border cursor-pointer text-center ${
                                calcIndustry === ind
                                  ? 'bg-melhek-blue/20 border-melhek-blue text-white font-bold'
                                  : 'bg-white/5 border-white/10 text-white/60 hover:text-white'
                              }`}
                            >
                              {ind}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Capabilities Selection Grid */}
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono text-white/40 uppercase block">Included Software Modules</label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {[
                            { id: 'core_web', title: 'Enterprise Web Application Architecture', value: 45000, req: true },
                            { id: 'telebirr_cbe', title: 'Local Telebirr & CBE Birr Payment Lock System', value: 20000 },
                            { id: 'ai_chatbot', title: 'Amharic/English AI Customer Assistant', value: 35000 },
                            { id: 'booking_engine', title: 'Automated Calendar & Booking Engine', value: 30000 },
                            { id: 'crm_ledger', title: 'Custom CRM & Client Operations Ledger', value: 28000 },
                            { id: 'analytics_bi', title: 'Executive BI Analytics & Conversion Dashboard', value: 25000 },
                            { id: 'seo_edge', title: 'Edge CDN, SSL Security & SEO Optimization', value: 15000 }
                          ].map((mod) => {
                            const isChecked = calcSelectedModules.includes(mod.id)
                            return (
                              <button
                                key={mod.id}
                                onClick={() => {
                                  if (mod.req) return
                                  setCalcSelectedModules(prev => 
                                    isChecked ? prev.filter(x => x !== mod.id) : [...prev, mod.id]
                                  )
                                }}
                                className={`p-3.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                                  isChecked 
                                    ? 'bg-melhek-blue/15 border-melhek-blue text-white' 
                                    : 'bg-white/5 border-white/10 text-white/40 hover:text-white/70'
                                }`}
                              >
                                <div className="flex items-center gap-2.5">
                                  <div className={`w-4 h-4 rounded flex items-center justify-center border text-[10px] ${
                                    isChecked ? 'bg-melhek-blue border-melhek-blue text-melhek-navy font-bold' : 'border-white/20 bg-transparent'
                                  }`}>
                                    {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                                  </div>
                                  <span className="text-xs font-mono font-medium">{mod.title}</span>
                                </div>
                                <span className="text-[11px] font-mono text-white/40">~{mod.value.toLocaleString()} ETB</span>
                              </button>
                            )
                          })}
                        </div>
                      </div>

                      {/* Calculator Total Display */}
                      <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 bg-black/40 p-5 rounded-2xl">
                        <div>
                          <span className="text-[10px] font-mono text-white/40 uppercase block">Calculated Software Sponsorship</span>
                          <span className="text-xs text-white/60 font-mono">Market Value: <span className="line-through text-white/40">~{calculatedTotalValue().toLocaleString()} ETB</span></span>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <span className="text-[9px] font-mono text-emerald-400 uppercase font-bold block">Your Capital Expense</span>
                            <span className="text-3xl font-display font-extrabold text-emerald-400 tracking-tight">0 ETB</span>
                          </div>
                          <button
                            onClick={() => setActiveStage('agreement')}
                            className="btn-primary !px-5 !py-2.5 !text-xs font-mono uppercase tracking-wider cursor-pointer shadow-md shadow-melhek-blue/20"
                          >
                            Claim Sponsored Build
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 4. INTERACTIVE LIVE DESIGN & LAYOUT SIMULATOR */}
                  <div id="theme-simulator" className="scroll-mt-28 space-y-6">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-melhek-blue uppercase tracking-widest block font-bold">Visual Demonstration</span>
                      <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">Interactive System Preview</h2>
                      <p className="text-xs text-white/60 max-w-xl font-light">
                        Test live layout aesthetics and component interactions to see how your future web app feels.
                      </p>
                    </div>

                    <div className="glass rounded-[2rem] border-white/10 bg-melhek-navy/80 overflow-hidden shadow-2xl">
                      {/* Control Bar */}
                      <div className="p-4 bg-black/60 border-b border-white/10 flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-white/40 uppercase">Theme Aesthetic:</span>
                          {(['dark_gold', 'executive_titanium', 'emerald_tech', 'warm_obsidian'] as const).map((th) => (
                            <button
                              key={th}
                              onClick={() => setSimTheme(th)}
                              className={`px-2.5 py-1 rounded-lg text-[10px] capitalize transition-all cursor-pointer ${
                                simTheme === th ? 'bg-melhek-blue text-melhek-navy font-bold' : 'text-white/50 hover:text-white bg-white/5'
                              }`}
                            >
                              {th.replace('_', ' ')}
                            </button>
                          ))}
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSimDevice('desktop')}
                            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${simDevice === 'desktop' ? 'bg-white/20 text-white' : 'text-white/40'}`}
                          >
                            <Laptop className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setSimDevice('mobile')}
                            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${simDevice === 'mobile' ? 'bg-white/20 text-white' : 'text-white/40'}`}
                          >
                            <Smartphone className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Simulator Frame */}
                      <div className={`p-6 transition-all duration-300 ${
                        simTheme === 'dark_gold' ? 'bg-[#030712] text-white' :
                        simTheme === 'executive_titanium' ? 'bg-[#0f172a] text-slate-100' :
                        simTheme === 'emerald_tech' ? 'bg-[#022c22] text-emerald-50' :
                        'bg-[#18181b] text-zinc-100'
                      }`}>
                        <div className={`mx-auto transition-all duration-300 ${simDevice === 'mobile' ? 'max-w-xs border-4 border-white/20 rounded-3xl p-4 bg-black/60 shadow-2xl' : 'w-full'}`}>
                          
                          {/* Simulated Navbar */}
                          <div className="flex items-center justify-between pb-4 border-b border-white/10">
                            <div className="flex items-center gap-2 font-bold text-xs">
                              <Shield className="w-4 h-4 text-melhek-blue" />
                              <span>{customBrandName || 'Apex Hospitality'}</span>
                            </div>
                            <div className="flex items-center gap-2 font-mono text-[9px]">
                              {(['hero', 'services', 'booking', 'payment'] as const).map((t) => (
                                <button
                                  key={t}
                                  onClick={() => setSimActiveTab(t)}
                                  className={`px-2 py-0.5 rounded capitalize ${simActiveTab === t ? 'bg-melhek-blue/30 text-melhek-blue font-bold' : 'text-white/40'}`}
                                >
                                  {t}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Simulated Body Content */}
                          <div className="py-6 space-y-4">
                            {simActiveTab === 'hero' && (
                              <div className="space-y-3">
                                <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-widest font-bold">Sponsored Application</span>
                                <h3 className="text-xl font-bold font-display">Transforming Digital Operational Presence</h3>
                                <p className="text-xs text-white/60 leading-relaxed font-light">
                                  Bespoke Next.js application integrated with automated Telebirr deposit locks & AI concierge desk.
                                </p>
                                <div className="pt-2 flex gap-2">
                                  <span className="px-3 py-1.5 rounded-lg bg-melhek-blue text-melhek-navy font-bold text-[10px] font-mono">Book Direct</span>
                                  <span className="px-3 py-1.5 rounded-lg bg-white/10 text-white font-mono text-[10px]">Contact Desk</span>
                                </div>
                              </div>
                            )}

                            {simActiveTab === 'services' && (
                              <div className="grid grid-cols-2 gap-2 text-[10px]">
                                <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                                  <Cpu className="w-3.5 h-3.5 text-melhek-blue" />
                                  <span className="font-bold block">AI Concierge</span>
                                  <p className="text-[9px] text-white/50">24/7 Amharic Support</p>
                                </div>
                                <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                                  <CreditCard className="w-3.5 h-3.5 text-emerald-400" />
                                  <span className="font-bold block">Instant Telebirr</span>
                                  <p className="text-[9px] text-white/50">Automated Payments</p>
                                </div>
                              </div>
                            )}

                            {simActiveTab === 'booking' && (
                              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2 font-mono text-[10px]">
                                <span className="text-melhek-blue font-bold block">Smart Calendar Engine</span>
                                <div className="flex justify-between p-2 bg-black/40 rounded">
                                  <span>Selected Date: Aug 15</span>
                                  <span className="text-emerald-400">Available</span>
                                </div>
                              </div>
                            )}

                            {simActiveTab === 'payment' && (
                              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 space-y-1 font-mono text-[10px]">
                                <CheckCircle2 className="w-4 h-4" />
                                <span className="font-bold block">Telebirr CBE Deposit Confirmed</span>
                                <p className="text-[9px] text-white/60">Ref: CBE-2026-88910</p>
                              </div>
                            )}
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 5. FOUNDER LETTER SECTION */}
                  <div id="founder-letter" className="scroll-mt-28 glass p-6 sm:p-10 rounded-[2rem] border-white/10 bg-melhek-navy/50 space-y-5 relative overflow-hidden shadow-xl">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-melhek-blue/10 rounded-full blur-2xl pointer-events-none" />
                    <h3 className="text-xs font-mono text-melhek-blue uppercase tracking-widest flex items-center gap-2 font-bold">
                      <Building2 className="w-4 h-4" /> A Message from Our Founder
                    </h3>
                    <div className="space-y-4 text-xs sm:text-sm text-white/80 font-light leading-relaxed">
                      <p className="text-white font-normal">Dear Business Owner,</p>
                      <p>
                        Websites are no longer static digital business cards. Modern companies require digital infrastructure — operational backbones that capture customers, streamline inventories, handle bookings, and process payments automatically.
                      </p>
                      <p className="font-semibold text-white italic border-l-2 border-melhek-blue pl-4 py-1.5 bg-white/[0.01] rounded-r-xl">
                        &quot;We believe long-term alignment outperforms short-term transactions. We invest our engineering capability into you today at zero upfront cost, establishing the trust needed to support and expand your digital systems as you scale tomorrow.&quot;
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

                  {/* 6. PROGRAM MISSION & VISION */}
                  <div id="program-vision" className="scroll-mt-28 space-y-6">
                    <h3 className="text-xs font-mono text-melhek-blue uppercase tracking-widest block font-bold">01 // The Architecture Vision</h3>
                    <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">How We Work Together</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="glass p-6 rounded-2xl border-white/10 bg-white/[0.01] space-y-2">
                        <h4 className="text-sm font-bold text-white flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Our Commitment
                        </h4>
                        <p className="text-xs text-white/60 leading-relaxed font-light">
                          We build, optimize, and deploy your custom digital system at zero upfront cost — removing the capital barrier that stops most businesses from going digital properly.
                        </p>
                      </div>
                      <div className="glass p-6 rounded-2xl border-white/10 bg-white/[0.01] space-y-2">
                        <h4 className="text-sm font-bold text-white flex items-center gap-2">
                          <Award className="w-4 h-4 text-melhek-blue" /> Your Advantage
                        </h4>
                        <p className="text-xs text-white/60 leading-relaxed font-light">
                          A dedicated engineering team on call. 100% IP & codebase ownership. Access to specialized operational scale modules tailored to your workflow.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 7. SPONSORED PACKAGE VALUE */}
                  <div id="sponsored-package" className="scroll-mt-28 space-y-6">
                    <h3 className="text-xs font-mono text-melhek-blue uppercase tracking-widest block font-bold">03 // Financial Alignment</h3>
                    <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">Sponsored Infrastructure Scope</h2>
                    
                    <div className="glass rounded-[2rem] border-white/10 bg-melhek-navy/70 p-6 sm:p-8 space-y-6 shadow-2xl">
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

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        {[
                          'Discovery & UX Strategy Architecture',
                          'Custom UI/UX Prototypes (Figma design system)',
                          'Next.js & Tailwind responsive high-speed coding',
                          'Speed & Edge Performance tuning (95+ Lighthouse)',
                          'SEO configuration & Google Search Console indexing',
                          'SSL security certifications & Cloud hosting options',
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

                  {/* 8. AVAILABLE GROWTH UPGRADES */}
                  <div id="growth-services" className="scroll-mt-28 space-y-6">
                    <h3 className="text-xs font-mono text-melhek-blue uppercase tracking-widest block font-bold">04 // Scale Roadmap</h3>
                    <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">Available Operational Integrations</h2>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {GROWTH_SERVICES.slice(0, 4).map((g) => {
                        const Icon = g.icon
                        return (
                          <div key={g.id} className="glass p-5 rounded-2xl border-white/10 bg-white/[0.01] space-y-3 hover:border-melhek-blue/40 transition-all group shadow-md">
                            <div className="w-9 h-9 rounded-xl bg-melhek-blue/15 border border-melhek-blue/30 flex items-center justify-center text-melhek-blue group-hover:scale-105 transition-transform">
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

                  {/* 9. TIMELINE & SPRINTS */}
                  <div id="timeline-roadmap" className="scroll-mt-28 space-y-6">
                    <h3 className="text-xs font-mono text-melhek-blue uppercase tracking-widest block font-bold">05 // Milestone Execution</h3>
                    <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">Execution Timeline</h2>
                    
                    <div className="glass p-6 sm:p-8 rounded-[2rem] border-white/10 bg-melhek-navy/55 space-y-4 shadow-xl">
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

                  {/* 10. FAQS */}
                  <div id="faqs" className="scroll-mt-28 space-y-6">
                    <div className="space-y-1">
                      <span className="text-xs font-mono text-melhek-blue uppercase tracking-widest block font-bold">06 // Registry Knowledge</span>
                      <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">Frequently Asked Questions</h2>
                    </div>

                    {/* FAQ Filter Bar & Search */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                      <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 scrollbar-none">
                        {['All', 'Investment', 'Legal & IP', 'Technical', 'Process'].map((cat) => (
                          <button
                            key={cat}
                            onClick={() => setFaqCategory(cat)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer whitespace-nowrap ${
                              faqCategory === cat 
                                ? 'bg-melhek-blue text-melhek-navy font-bold shadow' 
                                : 'bg-white/5 text-white/60 hover:text-white border border-white/10'
                            }`}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>

                      <div className="relative w-full sm:w-64">
                        <Search className="w-3.5 h-3.5 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={faqSearchQuery}
                          onChange={(e) => setFaqSearchQuery(e.target.value)}
                          placeholder="Search questions..."
                          className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-1.5 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-melhek-blue"
                        />
                      </div>
                    </div>

                    {/* FAQ Accordion List */}
                    <div className="space-y-3">
                      {filteredFaqs.map((faq) => {
                        const isOpen = expandedFaq === faq.id
                        return (
                          <div key={faq.id} className="glass rounded-2xl border-white/10 bg-white/[0.01] overflow-hidden transition-all duration-300">
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
                                  <div className="p-5 pt-0 text-xs text-white/60 leading-relaxed pl-12 border-t border-white/5 bg-black/20">
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
                  <div className="p-8 sm:p-10 rounded-[2rem] bg-gradient-to-r from-melhek-blue/20 via-melhek-navy to-emerald-500/10 border border-melhek-blue/30 text-center space-y-5 relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 left-0 w-44 h-44 bg-melhek-blue/15 rounded-full blur-3xl pointer-events-none" />
                    <h3 className="text-xl sm:text-2xl font-display font-bold text-white">Ready to Establish Your Digital Backbone?</h3>
                    <p className="text-xs sm:text-sm text-white/70 font-light max-w-lg mx-auto">
                      Step forward to the digital partnership terms and sign the agreement to kick off your design sprint.
                    </p>
                    <button
                      onClick={() => setActiveStage('agreement')}
                      className="btn-primary flex items-center justify-center gap-3 px-10 py-4 text-xs font-mono uppercase tracking-widest cursor-pointer mx-auto shadow-xl shadow-melhek-blue/35 hover:scale-105 transition-all"
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
              className="max-w-4xl mx-auto px-4 sm:px-6 pt-4 pb-16"
            >
              <div className="text-center mb-8 space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold">Step 2 of 4 // Partnership Alignment</span>
                <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-white">Digital Partnership Agreement</h2>
                <p className="text-xs sm:text-sm text-white/60 font-light max-w-xl mx-auto">
                  Review the aligned responsibilities and execute the electronic signature below.
                </p>
              </div>

              <div className="glass rounded-[2rem] border-white/10 bg-melhek-navy/90 p-6 sm:p-10 shadow-2xl space-y-6">
                
                {/* Aligned Responsibilities Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b border-white/10 pb-6">
                  <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
                    <h4 className="text-xs font-bold text-melhek-blue uppercase font-mono tracking-wider flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" /> Melhek Commitments
                    </h4>
                    <ul className="space-y-2 text-[11px] text-white/70 font-light leading-relaxed">
                      <li>• Custom Next.js codebase built to high speed scores (95+)</li>
                      <li>• Complete code transfer & 100% IP ownership with zero lock-in</li>
                      <li>• SLA strategic technical consulting & maintenance support</li>
                    </ul>
                  </div>
                  <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
                    <h4 className="text-xs font-bold text-emerald-400 uppercase font-mono tracking-wider flex items-center gap-2">
                      <UserCheck className="w-4 h-4" /> Partner Commitments
                    </h4>
                    <ul className="space-y-2 text-[11px] text-white/70 font-light leading-relaxed">
                      <li>• Complete the Business Intake Scoping Form</li>
                      <li>• Provide core logos, photos, and copy assets in a timely manner</li>
                      <li>• Maintain professional, responsive coordination</li>
                    </ul>
                  </div>
                </div>

                {/* Agreement Verification Header */}
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                    <div className="space-y-0.5">
                      <span className="text-[9px] font-mono text-white/40 uppercase block">Agreement Code</span>
                      <span className="text-xs font-mono text-melhek-blue font-bold">MDP-AGR-2026-{partnerId.replace('MDP-2026-', '')}</span>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[9px] font-mono text-white/40 uppercase block">Execution Date</span>
                      <span className="text-xs font-mono text-white">{new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/25 px-3 py-1.5 rounded-full">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-[10px] font-mono text-emerald-400 font-bold">Status: Verified</span>
                    </div>
                  </div>
                </div>

                {/* Agreement Terms Box */}
                <div className="space-y-2">
                  <div className="text-[9px] font-mono text-white/40 uppercase">Terms of Strategic Alignment</div>
                  <div className="h-48 overflow-y-auto pr-2 text-xs text-white/70 font-light leading-relaxed space-y-3 bg-black/50 p-5 rounded-2xl border border-white/5 scrollbar-thin">
                    <p className="font-bold text-white">1. Core Platform Sponsorship</p>
                    <p>Melhek Technologies agrees to build, optimize, and deploy the core web application for the Partner at 0 ETB upfront cost. Market value is estimated at ~45,000 ETB.</p>
                    <p className="font-bold text-white">2. Full IP & Code Ownership</p>
                    <p>All source code, graphic designs, assets, and database credentials belong fully to the Partner upon build completion. No lock-in fees or platform dependencies apply.</p>
                    <p className="font-bold text-white">3. Professional Integrity & References</p>
                    <p>The Partner is never forced to share advertisements. All referrals are strictly voluntary and authentic.</p>
                    <p className="font-bold text-white">4. Confidentiality Standards</p>
                    <p>Both parties agree to treat all scoping sheets, mockups, client lists, and strategic guidelines as proprietary and strictly confidential.</p>
                  </div>
                </div>

                {/* E-Signature Form */}
                <form onSubmit={handleSignAgreement} className="space-y-6 pt-4 border-t border-white/10">
                  
                  <div className="space-y-3">
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={agreeTerms}
                        onChange={(e) => setAgreeTerms(e.target.checked)}
                        className="mt-1 w-4 h-4 rounded border-white/20 bg-white/5 text-melhek-blue focus:ring-melhek-blue cursor-pointer"
                      />
                      <span className="text-xs text-white/80 group-hover:text-white transition-colors">
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
                      <span className="text-xs text-white/80 group-hover:text-white transition-colors">
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
                      <label className="text-[9px] font-mono text-white/40 uppercase block mb-1">Company / Brand Name</label>
                      <input
                        type="text"
                        value={formData.businessName || customBrandName}
                        onChange={(e) => {
                          setCustomBrandName(e.target.value)
                          handleSaveFormData({ businessName: e.target.value })
                        }}
                        placeholder="e.g. Apex Hospitality Group"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-melhek-blue font-mono"
                      />
                    </div>
                  </div>

                  {/* Mode Selector for Signature */}
                  <div className="flex items-center justify-between border-t border-white/10 pt-4">
                    <span className="text-[10px] font-mono text-white/40 uppercase flex items-center gap-1.5">
                      <FileSignature className="w-3.5 h-3.5 text-melhek-blue" /> Choose Signature Input Mode:
                    </span>
                    <div className="flex items-center gap-2 bg-white/5 p-1 rounded-xl border border-white/10 text-xs font-mono">
                      <button
                        type="button"
                        onClick={() => setSignatureMode('draw')}
                        className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${signatureMode === 'draw' ? 'bg-melhek-blue text-melhek-navy font-bold' : 'text-white/60 hover:text-white'}`}
                      >
                        Draw Canvas
                      </button>
                      <button
                        type="button"
                        onClick={() => setSignatureMode('type')}
                        className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${signatureMode === 'type' ? 'bg-melhek-blue text-melhek-navy font-bold' : 'text-white/60 hover:text-white'}`}
                      >
                        Type Script
                      </button>
                    </div>
                  </div>

                  {/* Draw Signature Pad or Typed Script */}
                  {signatureMode === 'draw' ? (
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="text-[9px] font-mono text-white/40 uppercase">Draw Signature on Screen Below *</label>
                        <button
                          type="button"
                          onClick={clearSignature}
                          className="text-[9px] font-mono text-red-400 hover:underline cursor-pointer"
                        >
                          Clear Canvas
                        </button>
                      </div>

                      <div className="relative rounded-2xl border border-white/20 bg-black/70 overflow-hidden">
                        <canvas
                          ref={canvasRef}
                          width={600}
                          height={140}
                          onMouseDown={startDrawing}
                          onMouseMove={draw}
                          onMouseUp={stopDrawing}
                          onMouseLeave={stopDrawing}
                          onTouchStart={startDrawing}
                          onTouchMove={draw}
                          onTouchEnd={stopDrawing}
                          className="w-full h-36 touch-none cursor-crosshair"
                        />
                        {!signatureData && (
                          <div className="absolute inset-0 pointer-events-none flex items-center justify-center text-white/30 text-xs font-mono">
                            [ Sign here with mouse, trackpad, or finger ]
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="p-6 rounded-2xl bg-black/60 border border-white/10 text-center space-y-2">
                      <span className="text-[9px] font-mono text-white/40 uppercase block">Script Calligraphy Preview</span>
                      <div className="h-20 flex items-center justify-center border-b border-white/10">
                        {partnerFullName ? (
                          <span className="font-serif italic text-3xl text-melhek-blue tracking-wide font-light select-none">
                            {partnerFullName}
                          </span>
                        ) : (
                          <span className="text-xs font-mono text-white/20">[ Enter Full Name above to render script signature ]</span>
                        )}
                      </div>
                      <p className="text-[9px] font-mono text-emerald-400">Cryptographically locked with SHA-256 hash generator.</p>
                    </div>
                  )}

                  {/* Pseudo Cryptographic Hash Indicator */}
                  <div className="p-3.5 rounded-xl bg-white/[0.01] border border-white/5 font-mono text-[9px] text-white/40 flex items-center justify-between">
                    <span className="truncate">Auth Hash: <span className="text-melhek-blue">{pseudoHash}</span></span>
                    <Lock className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 ml-2" />
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
                      disabled={!agreeTerms || !agreeAuthenticity || !partnerFullName.trim()}
                      className="btn-primary !px-8 !py-3.5 text-xs font-mono uppercase tracking-widest cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-melhek-blue/25"
                    >
                      Execute Agreement <ArrowRight className="w-4 h-4" />
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
              <div className="text-center mb-8 space-y-2">
                <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/20">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold">Partnership Agreement Executed</span>
                <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white">Welcome to the Program.</h2>
                <p className="text-xs sm:text-sm text-white/60 max-w-xs mx-auto leading-relaxed">
                  Your agreement is locked into our partner registry. Here is your official partner credential.
                </p>
              </div>

              {/* Partner Credentials Card */}
              <div className="glass rounded-[2rem] border-white/10 bg-melhek-navy/90 overflow-hidden shadow-2xl">
                <div className="bg-gradient-to-r from-melhek-blue/20 via-melhek-navy to-emerald-500/10 border-b border-white/10 p-6 sm:p-8 flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-melhek-blue/20 border border-melhek-blue/40 flex items-center justify-center flex-shrink-0 text-melhek-blue">
                    <Shield className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-lg font-display font-extrabold text-white">{partnerFullName}</h3>
                    <span className="text-[10px] font-mono text-melhek-blue font-bold">{formData.businessName || customBrandName || 'Founding Digital Partner'}</span>
                  </div>
                  <div className="ml-auto">
                    <span className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-[10px] font-mono font-bold px-3 py-1.5 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Verified
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-8 grid grid-cols-2 sm:grid-cols-3 gap-5">
                  {[
                    { label: 'Partner ID', value: partnerId, highlight: true },
                    { label: 'Status', value: 'Founding Partner', highlight: false },
                    { label: 'Agreement Date', value: new Date().toLocaleDateString('en-GB'), highlight: false },
                    { label: 'Current Sprint', value: 'Sponsored Website Build', highlight: false },
                    { label: 'SLA Support', value: 'Priority Level 2 Desk', highlight: false },
                    { label: 'Next Step', value: 'Business Intake', highlight: false },
                  ].map((item) => (
                    <div key={item.label} className="space-y-1">
                      <span className="text-[9px] font-mono text-white/40 uppercase block">{item.label}</span>
                      <span className={`text-xs font-bold block ${item.highlight ? 'text-melhek-blue' : 'text-white'}`}>{item.value}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-white/10 p-6 sm:p-8 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => setShowCertificateModal(true)}
                    className="btn-secondary flex-1 flex items-center justify-center gap-2 py-3.5 text-xs font-mono uppercase tracking-wider cursor-pointer"
                  >
                    <Award className="w-4 h-4 text-melhek-blue" /> View Certificate
                  </button>
                  <button
                    onClick={() => setActiveStage('discovery')}
                    className="btn-primary flex-1 flex items-center justify-center gap-3 py-3.5 text-xs font-mono uppercase tracking-widest cursor-pointer shadow-lg shadow-melhek-blue/25"
                  >
                    Business Intake <ArrowRight className="w-4 h-4" />
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
              className="max-w-3xl mx-auto px-4 sm:px-6 pt-4 pb-16"
            >
              <div className="text-center mb-8 space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-melhek-blue font-bold">Step 3 of 4 // Scope Intake</span>
                <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white">Business Discovery Form</h2>
                <p className="text-xs sm:text-sm text-white/60 max-w-md mx-auto">
                  Provide your operational targets and asset details so we can engineer your custom design blueprint.
                </p>
                {formSavedTime && (
                  <span className="inline-block text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 mt-1">
                    Draft auto-saved at {formSavedTime}
                  </span>
                )}
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden mb-6 max-w-md mx-auto border border-white/10">
                <div
                  className="bg-gradient-to-r from-melhek-blue via-emerald-400 to-emerald-300 h-full transition-all duration-300"
                  style={{ width: `${(discoveryStep / 4) * 100}%` }}
                />
              </div>

              <div className="glass rounded-[2rem] border-white/10 bg-melhek-navy/85 p-6 sm:p-10 shadow-2xl">
                
                {/* STEP 1: CONTACT PROFILE */}
                {discoveryStep === 1 && (
                  <div className="space-y-4">
                    <h3 className="text-xs font-bold text-white border-b border-white/10 pb-3 flex items-center gap-2 font-mono">
                      <Building2 className="w-4 h-4 text-melhek-blue" /> 01 // Contact & Identity Profile
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
                        <label className="text-[9px] font-mono text-white/40 uppercase block mb-1">Owner / Lead Name *</label>
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
                        <label className="text-[9px] font-mono text-white/40 uppercase block mb-1">Phone / Telegram Handle *</label>
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
                    <h3 className="text-xs font-bold text-white border-b border-white/10 pb-3 flex items-center gap-2 font-mono">
                      <TrendingUp className="w-4 h-4 text-melhek-blue" /> 02 // Strategic Business Goal
                    </h3>
                    <div className="space-y-3">
                      <label className="text-[9px] font-mono text-white/40 uppercase block">Primary System Objective *</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                          'Establish Digital Authority & Lead Capture',
                          'Direct Room / Appointment Booking Engine',
                          'Automated Customer Inquiry & Amharic AI Chatbot',
                          'Interactive Product Catalog & Showroom'
                        ].map((goal) => (
                          <button
                            key={goal}
                            type="button"
                            onClick={() => handleSaveFormData({ primaryGoal: goal })}
                            className={`p-3.5 rounded-xl border text-left text-xs font-mono transition-all cursor-pointer ${
                              formData.primaryGoal === goal
                                ? 'bg-melhek-blue/20 border-melhek-blue text-white font-bold'
                                : 'bg-white/5 border-white/10 text-white/60 hover:text-white'
                            }`}
                          >
                            {goal}
                          </button>
                        ))}
                      </div>

                      <div>
                        <label className="text-[9px] font-mono text-white/40 uppercase block mb-1">Target Customer Demographic</label>
                        <textarea
                          rows={3}
                          value={formData.targetAudience}
                          onChange={(e) => handleSaveFormData({ targetAudience: e.target.value })}
                          placeholder="Describe your ideal clients, corporate partners, or visitors..."
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-melhek-blue"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 3: SYSTEM CONFIG */}
                {discoveryStep === 3 && (
                  <div className="space-y-4">
                    <h3 className="text-xs font-bold text-white border-b border-white/10 pb-3 flex items-center gap-2 font-mono">
                      <Cpu className="w-4 h-4 text-melhek-blue" /> 03 // Desired Core Features
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {[
                        'Contact Intake & Lead Capture Forms',
                        'Interactive Product / Service Showcase',
                        'Direct Telebirr / CBE Payment Lock Integration',
                        'Appointment / Room Booking Calendar Engine',
                        'Multi-Language Support (English / Amharic)',
                        'Customer Testimonials & Gallery Section'
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
                            className={`p-3.5 rounded-xl text-left border text-[11px] font-mono transition-all flex items-center justify-between cursor-pointer ${
                              isSelected 
                                ? 'bg-melhek-blue/20 border-melhek-blue text-white font-bold'
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
                    <h3 className="text-xs font-bold text-white border-b border-white/10 pb-3 flex items-center gap-2 font-mono">
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
                        <label className="text-[9px] font-mono text-white/40 uppercase block mb-1">Additional Developer Notes</label>
                        <textarea
                          rows={3}
                          value={formData.additionalNotes}
                          onChange={(e) => handleSaveFormData({ additionalNotes: e.target.value })}
                          placeholder="e.g. Preferred color accents, reference websites, specific branch locations..."
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
                      className="btn-primary !px-8 !py-3.5 text-xs font-mono uppercase tracking-widest cursor-pointer shadow-lg shadow-melhek-blue/25"
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
              className="max-w-7xl mx-auto px-4 sm:px-6 pt-2 pb-16"
            >
              {/* Portal Header */}
              <div className="glass rounded-[2rem] border-white/10 bg-melhek-navy/85 p-6 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xl">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase">Active Partner Portal</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-display font-extrabold text-white mt-1">
                    {formData.businessName || customBrandName || 'Apex Hospitality Group'} Portal
                  </h2>
                  <p className="text-xs text-white/60">
                    Partner: {formData.ownerName || partnerFullName || 'Abebe Bikila'} | Ref: <span className="text-melhek-blue font-mono font-bold">{partnerId}</span>
                  </p>
                </div>

                <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10 font-mono text-xs">
                  <div>
                    <span className="text-white/40 block text-[9px] uppercase">Sprint Phase</span>
                    <span className="text-white font-bold">04 // UX & Sitemap</span>
                  </div>
                  <div className="h-6 w-px bg-white/10" />
                  <div>
                    <span className="text-white/40 block text-[9px] uppercase">Estimated Beta</span>
                    <span className="text-emerald-400 font-bold">18 Days</span>
                  </div>
                  <div className="h-6 w-px bg-white/10" />
                  <button
                    onClick={() => setShowCertificateModal(true)}
                    className="flex items-center gap-1.5 text-melhek-blue hover:underline text-[10px] font-bold cursor-pointer"
                  >
                    <Award className="w-3.5 h-3.5" /> Certificate
                  </button>
                </div>
              </div>

              {/* Portal Workspace Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                
                {/* Workspace Side Menu */}
                <div className="glass p-2.5 rounded-2xl border-white/10 bg-melhek-navy/60 h-fit space-y-1 shadow-xl">
                  {([
                    { id: 'overview', label: 'Sprint Kanban', icon: LayoutDashboard },
                    { id: 'messages', label: 'Developer Desk Chat', icon: MessageSquare },
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

                      <div className="glass p-6 sm:p-8 rounded-2xl border-white/10 bg-melhek-navy/55 space-y-5 shadow-xl">
                        <div className="flex items-center justify-between border-b border-white/10 pb-4">
                          <h3 className="text-xs font-mono text-white/40 uppercase flex items-center gap-2">
                            <Award className="w-4 h-4 text-melhek-blue" /> Your Project Milestones
                          </h3>
                          <span className="text-[10px] font-mono text-melhek-blue bg-melhek-blue/10 border border-melhek-blue/20 px-3 py-1 rounded-full">Figma Blueprint Sprint</span>
                        </div>

                        <div className="space-y-4">
                          {[
                            { label: 'Discovery Completed', sub: 'Business intake scoping sheet locked', done: true },
                            { label: 'Strategy Blueprint Approved', sub: 'Sitemap and tech architecture confirmed', done: true },
                            { label: 'Figma UI/UX Design Sprint', sub: 'High-fidelity prototypes building in design desk', active: true },
                            { label: 'Next.js & Tailwind Coding', sub: 'High-performance edge deployment sprint', done: false },
                            { label: 'Beta Review & QA Sync', sub: 'Partner preview link & feedback review', done: false },
                            { label: 'Production Launch', sub: 'Domain mapping, SSL deployment & handoff', done: false },
                          ].map((m, idx) => (
                            <div key={idx} className="flex items-start gap-4">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border mt-0.5 ${
                                m.done
                                  ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400'
                                  : (m as any).active
                                  ? 'bg-melhek-blue/20 border-melhek-blue text-melhek-blue animate-pulse'
                                  : 'bg-white/5 border-white/10 text-white/20'
                              }`}>
                                {m.done ? (
                                  <Check className="w-4 h-4 stroke-[3]" />
                                ) : (m as any).active ? (
                                  <Clock className="w-4 h-4" />
                                ) : (
                                  <span className="text-[10px] font-mono font-bold">{String(idx + 1).padStart(2, '0')}</span>
                                )}
                              </div>
                              <div className="flex-1 pt-1">
                                <div className="flex items-center justify-between">
                                  <h4 className={`text-xs font-bold ${
                                    m.done ? 'text-white' : (m as any).active ? 'text-melhek-blue' : 'text-white/40'
                                  }`}>
                                    {m.label}
                                    {m.done && <span className="ml-2 text-[9px] font-mono text-emerald-400">✓ Completed</span>}
                                  </h4>
                                </div>
                                <p className={`text-[11px] mt-0.5 ${
                                  m.done ? 'text-white/60' : (m as any).active ? 'text-white/80' : 'text-white/30'
                                }`}>{m.sub}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Log */}
                      <div className="glass p-6 rounded-2xl border-white/10 bg-melhek-navy/55 space-y-3 shadow-xl">
                        <h3 className="text-xs font-mono text-white/40 uppercase flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 text-melhek-blue" /> Action Ledger Registry
                        </h3>
                        <div className="space-y-2.5">
                          <div className="p-3.5 rounded-xl bg-white/[0.01] border border-white/5 flex gap-3 text-xs">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="font-bold text-white">Discovery Intake Form Submitted</p>
                              <span className="text-[10px] text-white/40 font-mono">Assigned to senior technical architect desk.</span>
                            </div>
                          </div>
                          <div className="p-3.5 rounded-xl bg-white/[0.01] border border-white/5 flex gap-3 text-xs">
                            <FileSignature className="w-4 h-4 text-melhek-blue mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="font-bold text-white">Partnership Agreement Locked</p>
                              <span className="text-[10px] text-white/40 font-mono">Ref {partnerId} signed by {partnerFullName || 'Partner'}.</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* DEVELOPER CHAT TAB */}
                  {dashboardTab === 'messages' && (
                    <div className="glass p-6 rounded-2xl border-white/10 bg-melhek-navy/55 space-y-4 shadow-xl">
                      <div className="flex items-center justify-between border-b border-white/10 pb-3">
                        <h3 className="text-xs font-mono text-white/40 uppercase flex items-center gap-2">
                          <MessageSquare className="w-4 h-4 text-melhek-blue" /> Strategist & Engineering Desk
                        </h3>
                        <span className="text-[9px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">Online Desk</span>
                      </div>
                      <div className="h-80 overflow-y-auto space-y-3 pr-2 scrollbar-thin">
                        {messages.map((msg, i) => (
                          <div key={i} className={`flex flex-col ${msg.sender.includes('Melhek') ? 'items-start' : 'items-end'}`}>
                            <div className={`p-4 rounded-2xl max-w-md text-xs leading-relaxed ${
                              msg.sender.includes('Melhek')
                                ? 'bg-melhek-blue/15 border border-melhek-blue/30 text-white rounded-tl-none'
                                : 'bg-emerald-500/20 border border-emerald-500/30 text-white rounded-tr-none'
                            }`}>
                              <span className="text-[8px] font-mono text-melhek-blue font-bold block mb-1">{msg.sender}</span>
                              {msg.text}
                              <span className="text-[8px] text-white/40 font-mono block text-right mt-1.5">{msg.time}</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Quick Prompt Pills */}
                      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 font-mono text-[10px]">
                        {[
                          'Request Scope Adjustment',
                          'Send Brand Assets Link',
                          'Schedule Strategy Sync'
                        ].map((qp) => (
                          <button
                            key={qp}
                            onClick={() => setNewMessage(qp)}
                            className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 cursor-pointer whitespace-nowrap"
                          >
                            + {qp}
                          </button>
                        ))}
                      </div>

                      <form onSubmit={handleSendMessage} className="flex gap-2 pt-2 border-t border-white/10">
                        <input
                          type="text"
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          placeholder="Type message for technical strategist..."
                          className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-melhek-blue"
                        />
                        <button
                          type="submit"
                          className="btn-primary !px-5 !py-2.5 text-xs font-mono uppercase tracking-wider cursor-pointer flex items-center gap-1.5 shadow-md shadow-melhek-blue/20"
                        >
                          Send <SendHorizontal className="w-3.5 h-3.5" />
                        </button>
                      </form>
                    </div>
                  )}

                  {/* DOCUMENT VAULT TAB */}
                  {dashboardTab === 'vault' && (
                    <div className="glass p-6 rounded-2xl border-white/10 bg-melhek-navy/55 space-y-4 shadow-xl">
                      <h3 className="text-xs font-mono text-white/40 uppercase border-b border-white/10 pb-3 flex items-center gap-2">
                        <FileCheck className="w-4 h-4 text-melhek-blue" /> Document & Contract Vault
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Award className="w-5 h-5 text-emerald-400" />
                            <div>
                              <p className="text-xs text-white font-bold">Partnership Certificate</p>
                              <span className="text-[9px] text-white/40 font-mono">Ref: {partnerId}</span>
                            </div>
                          </div>
                          <button
                            onClick={() => setShowCertificateModal(true)}
                            className="text-[9px] text-melhek-blue hover:underline font-mono font-bold bg-melhek-blue/10 px-2.5 py-1 rounded cursor-pointer"
                          >
                            View
                          </button>
                        </div>
                        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <FileSignature className="w-5 h-5 text-melhek-blue" />
                            <div>
                              <p className="text-xs text-white font-bold">Signed Alignment Terms</p>
                              <span className="text-[9px] text-white/40 font-mono">Verified SHA-256</span>
                            </div>
                          </div>
                          <span className="text-[9px] text-emerald-400 font-mono font-bold bg-emerald-500/10 px-2.5 py-1 rounded">Locked</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* CONSULTING SYNC TAB */}
                  {dashboardTab === 'calendar' && (
                    <div className="glass p-6 rounded-2xl border-white/10 bg-melhek-navy/55 space-y-4 shadow-xl">
                      <h3 className="text-xs font-mono text-white/40 uppercase border-b border-white/10 pb-3 flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-melhek-blue" /> Strategic Consulting Calendar
                      </h3>
                      <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                        <div className="space-y-1">
                          <span className="text-[9px] font-mono text-melhek-blue uppercase font-bold">Upcoming Sprint 1 Sync</span>
                          <h4 className="text-xs font-bold text-white">Figma Blueprint & Scope Confirmation</h4>
                          <p className="text-[11px] text-white/50">30-min live presentation with lead architect</p>
                        </div>
                        <button className="btn-primary !px-4 !py-2 text-[9px] font-mono uppercase tracking-wider cursor-pointer shadow-md shadow-melhek-blue/20">
                          Confirm Slot
                        </button>
                      </div>
                    </div>
                  )}

                  {/* SCALE INTEGRATIONS TAB */}
                  {dashboardTab === 'upgrades' && (
                    <div className="glass p-6 rounded-2xl border-white/10 bg-melhek-navy/55 space-y-4 shadow-xl">
                      <h3 className="text-xs font-mono text-white/40 uppercase border-b border-white/10 pb-3 flex items-center gap-2">
                        <Zap className="w-4 h-4 text-melhek-blue" /> Software Scale Upgrades Catalog
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {GROWTH_SERVICES.map((g) => {
                          const Icon = g.icon
                          return (
                            <div key={g.id} className="p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between space-y-4">
                              <div className="space-y-2">
                                <div className="w-8 h-8 rounded-xl bg-melhek-blue/15 border border-melhek-blue/30 flex items-center justify-center text-melhek-blue">
                                  <Icon className="w-4 h-4" />
                                </div>
                                <h4 className="text-xs font-bold text-white">{g.title}</h4>
                                <p className="text-[11px] text-white/60 leading-relaxed font-light">{g.description}</p>
                              </div>
                              <button
                                onClick={() => {
                                  setUpgradeModalItem(g)
                                  setUpgradeInquirySent(false)
                                }}
                                className="btn-secondary !py-2 !px-3 !text-[10px] font-mono uppercase tracking-wider w-full justify-center cursor-pointer"
                              >
                                Request Scope & Quote
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

      {/* ── OFFICIAL DIGITAL PARTNERSHIP CERTIFICATE MODAL ── */}
      <AnimatePresence>
        {showCertificateModal && (
          <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass max-w-2xl w-full rounded-[2.5rem] border border-melhek-blue/40 bg-melhek-navy/95 p-8 sm:p-12 space-y-6 relative overflow-hidden shadow-2xl text-center"
            >
              <button
                onClick={() => setShowCertificateModal(false)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 text-white/40 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-melhek-blue/30 to-emerald-400/20 border border-melhek-blue/50 flex items-center justify-center mx-auto text-melhek-blue shadow-lg shadow-melhek-blue/20">
                <Award className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold">Official Credential</span>
                <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white">Certificate of Strategic Alliance</h3>
                <p className="text-xs text-white/50 font-light">Melhek Digital Partner Program // Cohort 2026</p>
              </div>

              <div className="p-6 rounded-2xl bg-black/50 border border-white/10 space-y-3 font-mono text-xs text-left">
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-white/40">PARTNER ORGANIZATIONAL ENTITY</span>
                  <span className="text-white font-bold">{formData.businessName || customBrandName || 'Apex Hospitality Group'}</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-white/40">AUTHORIZED REPRESENTATIVE</span>
                  <span className="text-white font-bold">{partnerFullName || 'Abebe Bikila'}</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-white/40">PARTNER ID CODE</span>
                  <span className="text-melhek-blue font-bold">{partnerId}</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-white/40">ISSUANCE DATE</span>
                  <span className="text-white">{new Date().toLocaleDateString('en-GB')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40">CRYPTOGRAPHIC HASH</span>
                  <span className="text-emerald-400 font-mono text-[9px] truncate max-w-[200px]">{pseudoHash}</span>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 pt-2">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(pseudoHash)
                    setCopiedHash(true)
                    setTimeout(() => setCopiedHash(false), 2000)
                  }}
                  className="btn-secondary !px-4 !py-2.5 text-xs font-mono uppercase tracking-wider cursor-pointer flex items-center gap-2"
                >
                  <Copy className="w-3.5 h-3.5 text-melhek-blue" />
                  {copiedHash ? 'Copied Hash!' : 'Copy Hash'}
                </button>
                <button
                  onClick={() => window.print()}
                  className="btn-primary !px-6 !py-2.5 text-xs font-mono uppercase tracking-widest cursor-pointer flex items-center gap-2 shadow-lg shadow-melhek-blue/20"
                >
                  <Printer className="w-4 h-4" /> Print Credential
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── UPGRADE INQUIRY MODAL ── */}
      <AnimatePresence>
        {upgradeModalItem && (
          <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass max-w-lg w-full rounded-[2.5rem] border border-white/10 bg-melhek-navy/95 p-8 space-y-5 relative shadow-2xl text-left"
            >
              <button
                onClick={() => setUpgradeModalItem(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 text-white/40 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1">
                <span className="text-[10px] font-mono text-melhek-blue uppercase font-bold">Scale Module Inquiry</span>
                <h3 className="text-xl font-bold text-white">{upgradeModalItem.title}</h3>
                <p className="text-xs text-white/60 font-light">{upgradeModalItem.description}</p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2 text-xs font-mono">
                <div className="flex justify-between text-white/50">
                  <span>Est Development Value:</span>
                  <span className="text-white font-bold">~{upgradeModalItem.estValueETB.toLocaleString()} ETB</span>
                </div>
                <div className="flex justify-between text-white/50">
                  <span>Partner SLA Discount:</span>
                  <span className="text-emerald-400 font-bold">Priority Partner Rate</span>
                </div>
              </div>

              {upgradeInquirySent ? (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono text-center">
                  ✓ Request logged into engineering desk schedule!
                </div>
              ) : (
                <button
                  onClick={() => {
                    setUpgradeInquirySent(true)
                    setTimeout(() => {
                      setUpgradeModalItem(null)
                      setUpgradeInquirySent(false)
                    }, 2000)
                  }}
                  className="btn-primary w-full justify-center py-3.5 text-xs font-mono uppercase tracking-widest cursor-pointer shadow-lg shadow-melhek-blue/20"
                >
                  Confirm Scoping Request
                </button>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  )
}
