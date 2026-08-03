'use client'

import { useState, useActionState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { 
  ArrowRight, Shield, Zap, Globe, Cpu, Users, BarChart3, 
  Layers, Check, ChevronDown, Download, Phone, Calendar, 
  FileText, Briefcase, Plus, X, Server, MessageSquare, Clipboard,
  Key, Terminal, Send, CreditCard, LogOut, RefreshCw, AlertCircle, 
  Lock, CheckCircle, type LucideIcon, Search, Sliders, Copy, Printer,
  CheckSquare, Award, Sparkles, Building2, TrendingUp, ChevronRight, HelpCircle
} from 'lucide-react'
import { submitPartnerApplication, submitPartnerOpportunity, type PartnerActionState } from '@/app/actions/partners'

// What We Build detailed modal specifications
interface BuildCard {
  id: string
  title: string
  icon: LucideIcon
  tagline: string
  specifications: string[]
  techStack: string[]
  duration: string
  useCase: string
}

const BUILD_CARDS: BuildCard[] = [
  {
    id: 'business_websites',
    title: 'Business Websites',
    icon: Globe,
    tagline: 'High-converting informational corporate layouts with flawless edge loading.',
    specifications: [
      'Multi-page content management via headless CMS',
      'SEO audit performance scores of 95+/100',
      'Contact collection & CRM intake forms',
      'Fully responsive, multi-language system options (English / Amharic)'
    ],
    techStack: ['Next.js', 'React', 'TailwindCSS', 'Framer Motion', 'Sanity/Strapi'],
    duration: '2 – 4 Weeks',
    useCase: 'Attracting clients and building digital authority for premium brands.'
  },
  {
    id: 'management_systems',
    title: 'Management Systems',
    icon: Layers,
    tagline: 'Custom administrative systems designed to manage users, ledgers, and logs.',
    specifications: [
      'Clustered databases with daily automated backups',
      'Role-based permissions & manager approval gates',
      'Activity logging logs for compliance auditing',
      'Exportable spreadsheets & custom PDF invoicing'
    ],
    techStack: ['React', 'Next.js', 'PostgreSQL', 'Prisma', 'Node.js'],
    duration: '6 – 12 Weeks',
    useCase: 'Internal company backends replacing complex spreadsheets and paper folders.'
  },
  {
    id: 'hotel_platforms',
    title: 'Hotel Platforms',
    icon: Server,
    tagline: 'Room scheduling booking engines bypassing OTA agent commission models.',
    specifications: [
      'Live booking calendar with reservation locks',
      'Front desk admin manager checking guests in/out',
      'Local mobile payment integrations (Telebirr, CBE Birr)',
      'Cleaning staff schedule logs & room occupancy updates'
    ],
    techStack: ['Next.js', 'PostgreSQL', 'TailwindCSS', 'Chapa API', 'Prisma'],
    duration: '8 – 14 Weeks',
    useCase: 'Accepting direct room bookings online while coordinating lobby check-ins.'
  },
  {
    id: 'restaurant_qr',
    title: 'Restaurant QR Systems',
    icon: Zap,
    tagline: 'Digital dining menu ordering synced directly with physical kitchen screens.',
    specifications: [
      'Unique table-mapped QR codes loading fast menus',
      'Instant order routing directly to kitchen display tablets',
      'Table bill consolidation & splits',
      'Real-time cash ledger summaries for the cashier'
    ],
    techStack: ['Next.js', 'Socket.io', 'Node.js', 'MongoDB', 'React Native'],
    duration: '4 – 8 Weeks',
    useCase: 'Modernizing table ordering to eliminate cashier delay errors.'
  },
  {
    id: 'clinic_systems',
    title: 'Clinic Systems',
    icon: Shield,
    tagline: 'Patient electronic record storage, schedule planners, and billing systems.',
    specifications: [
      'Secure patient intake files and digital medical history',
      'Doctor appointment calendars with SMS/Telegram notifications',
      'Pharmacy stock integration checking dosage levels',
      'Multi-step billing templates with insurance claim exports'
    ],
    techStack: ['React', 'Next.js', 'PostgreSQL', 'Docker', 'Redis'],
    duration: '8 – 16 Weeks',
    useCase: 'Standardizing medical center workflows and patient booking histories.'
  },
  {
    id: 'optical_systems',
    title: 'Optical Systems',
    icon: BarChart3,
    tagline: 'Specialized eye clinic client databases tracking lens measurements.',
    specifications: [
      'Left/Right eye prescription history tracking (SPH, CYL, AXIS)',
      'Frame inventory and lens lab order statuses',
      'Customer reminder SMS triggers for pick-ups',
      'Multi-branch stock transfers and cashier records'
    ],
    techStack: ['Next.js', 'PostgreSQL', 'Prisma', 'SmsGlobal API'],
    duration: '6 – 10 Weeks',
    useCase: 'Coordinating lens orders, patient details, and frame sales in one place.'
  },
  {
    id: 'gym_systems',
    title: 'Gym Systems',
    icon: Users,
    tagline: 'Member check-in card portals, subscription packages, and gate integrations.',
    specifications: [
      'Digital barcode scanner check-ins at gym entrance',
      'Membership status checkers with auto-locks on expiration',
      'Trainer appointment schedulers',
      'Monthly recurring billing analytics'
    ],
    techStack: ['Next.js', 'PostgreSQL', 'TailwindCSS', 'Barcode APIs'],
    duration: '4 – 8 Weeks',
    useCase: 'Automating fitness center check-ins and tracking membership fees.'
  },
  {
    id: 'booking_systems',
    title: 'Booking Systems',
    icon: Calendar,
    tagline: 'Flexible appointment booking engines with real-time slot locking.',
    specifications: [
      'Dynamic calendar scheduler preventing double bookings',
      'Custom intake forms captured before confirmation',
      'Deposit processing integration (Telebirr, CBE Birr)',
      'Google Calendar sync via API integration'
    ],
    techStack: ['Next.js', 'React', 'Google Calendar API', 'PostgreSQL'],
    duration: '4 – 6 Weeks',
    useCase: 'Consultancies, car rentals, and spas scheduling guest slots.'
  },
  {
    id: 'ai_chatbots',
    title: 'AI Chatbots',
    icon: Cpu,
    tagline: 'Intelligent support chatbots answering FAQs and pre-qualifying leads.',
    specifications: [
      'Vector databases storing company documentation',
      'Natural language parsing matching user queries in English & Amharic',
      'Lead qualifying intake forwarding names/emails to CRM',
      'Multi-channel deployment (Web, WhatsApp, Telegram)'
    ],
    techStack: ['Next.js', 'Langchain', 'Gemini API / OpenAI API', 'Pinecone DB'],
    duration: '3 – 5 Weeks',
    useCase: 'Automating client support replies and collecting pre-qualified inquiries 24/7.'
  },
  {
    id: 'business_automation',
    title: 'Business Automation',
    icon: Zap,
    tagline: 'Custom pipelines eliminating manual copy-pasting of admin data.',
    specifications: [
      'Automated intake document parsing to extract details',
      'Slack/Telegram webhook alert channels',
      'Multi-system sync mapping database updates across tools',
      'Scheduled background reporting jobs'
    ],
    techStack: ['Python', 'Node.js', 'REST APIs', 'Cloud Scheduler'],
    duration: '3 – 6 Weeks',
    useCase: 'Connecting isolated office spreadsheets with centralized servers automatically.'
  }
]

// Comparison table criteria
const COMPARISON_TABLE = [
  { criterion: 'Client Ownership', referral: 'Melhek handles client directly', whiteLabel: 'Agency owns relationship & contract (100% White-Label)', strategic: 'Shared joint enterprise contract' },
  { criterion: 'Communication', referral: 'Melhek project manager led', whiteLabel: 'Agency interface; Melhek is silent engineering desk', strategic: 'Joint consulting team meetings' },
  { criterion: 'Brand Visibility', referral: '100% Melhek branded', whiteLabel: '100% Agency white-labeled (under your agency logo)', strategic: 'Co-branded solution (Melhek + Agency)' },
  { criterion: 'Commission / Margin', referral: '10% Cash Referral Bonus', whiteLabel: 'Agency sets own client margin (typically 25–50% markup)', strategic: 'Custom profit-share / equity split' },
  { criterion: 'Pricing Flexibility', referral: 'Standard Melhek parameters', whiteLabel: 'Agency controls client pricing entirely', strategic: 'Value-based custom pricing models' },
  { criterion: 'Technical Support', referral: 'Direct client support contract', whiteLabel: 'Level-2 escalated support (Melhek backs Agency)', strategic: 'Joint SLA infrastructure support' }
]

// FAQ Items (20+ Intelligent Qs)
const FAQ_ITEMS = [
  {
    q: 'How does the White Label partnership work for digital marketing agencies?',
    a: 'In a white-label arrangement, Melhek Technologies acts as your secret engineering backroom. We stay 100% behind the scenes. We never contact your client directly, use our company email, or display our branding. All system reviews and communications are coordinated through your agency email, Slack, or account managers.'
  },
  {
    q: 'What is the referral commission structure for client intros?',
    a: 'For agencies who prefer to refer clients directly to Melhek, we pay a 10% cash commission of the initial contract value upon project kickoff via Telebirr or CBE Birr. Alternatively, this 10% can be passed directly to your client as a partner discount.'
  },
  {
    q: 'How do you handle Non-Disclosure Agreements (NDAs)?',
    a: 'Before sharing any project specifications or agency files, we sign a standard bilateral NDA. This legally binds Melhek Technologies to protect your agency templates, client lists, and proprietary code assets. Your IP is completely secure.'
  },
  {
    q: 'Who owns the intellectual property and source code of built systems?',
    a: 'Upon project launch and contract completion, the intellectual property and full source code belong entirely to either your agency or your client (depending on your internal agreements). We do not charge licensing fees or keep source code locked.'
  },
  {
    q: 'How are project scopes, estimates, and timelines determined?',
    a: 'Agencies use our custom estimator tools to map out baseline capabilities, or we schedule a technical scoping call. Within 24 hours, we return a detailed PDF outline mapping out timelines, technical components, and blueprint scopes.'
  },
  {
    q: 'Can Melhek assist with project sales pitches and client discovery calls?',
    a: 'Yes! Under the White Label model, we can join your client discovery calls as "Senior Technical Architects" from your agency. We help explain backend structures, database scales, and security systems to help you secure high-value projects.'
  },
  {
    q: 'Do you offer ongoing system maintenance and post-launch SLAs?',
    a: 'Yes. We provide dedicated post-launch support SLA packages. Under White Label, we act as your Level 2 support desk—resolving any server, API, or system issues while your account manager handles the client interface.'
  },
  {
    q: 'What technologies and frameworks do your engineers specialize in?',
    a: 'Our core stack focuses on high-performance frameworks including Next.js, React, Node.js, PostgreSQL, MongoDB, TypeScript, Go, Python, and Docker. We choose stable, enterprise-grade tools that guarantee maximum security and uptime.'
  },
  {
    q: 'How do you coordinate project handoff and deployment?',
    a: 'We deploy systems to your agency server, the client server, or managed cloud accounts (Vercel, AWS, Google Cloud). We provide full documentation, clean codebase handoffs via private Git repositories, and onboarding training sessions for your team.'
  },
  {
    q: 'Do you integrate with local payment options like Telebirr and CBE Birr?',
    a: 'Yes. We are experts in Ethiopian payment systems. We integrate local APIs (such as Chapa, Telebirr Partner APIs, CBE Birr) alongside global systems (Stripe, PayPal) to ensure seamless local currency checkouts.'
  }
]

export default function PartnersClient() {
  const [activeModalCard, setActiveModalCard] = useState<BuildCard | null>(null)
  const [activeFaq, setActiveFaq] = useState<number | null>(0)
  const [faqCategory, setFaqCategory] = useState<string>('All')
  const [faqSearch, setFaqSearch] = useState('')

  // Interactive Margin Calculator State
  const [calcProjectCount, setCalcProjectCount] = useState<number>(5)
  const [calcSelectedTypes, setCalcSelectedTypes] = useState<string[]>([
    'web_app', 'telebirr_cbe', 'ai_chatbot'
  ])

  // Interactive Proposal Builder State
  const [propClientName, setPropClientName] = useState('')
  const [propIndustry, setPropIndustry] = useState('Hospitality & Tourism')
  const [propMarkup, setPropMarkup] = useState<number>(35) // 35% default markup
  const [propModules, setPropModules] = useState<string[]>([
    'core_nextjs', 'telebirr_checkout', 'ai_concierge'
  ])
  const [proposalCopied, setProposalCopied] = useState(false)

  // Forms State (Landing Page Actions)
  const initialAppState: PartnerActionState = {}
  const [appState, appAction, isAppPending] = useActionState(submitPartnerApplication, initialAppState)

  const initialOppState: PartnerActionState = {}
  const [oppState, oppAction, isOppPending] = useActionState(submitPartnerOpportunity, initialOppState)

  // Production Workspace State
  const [isDashboardActive, setIsDashboardActive] = useState<boolean>(false)
  const [partnerSession, setPartnerSession] = useState<{
    email: string
    agencyName: string
    contactPerson: string
    tier: string
    rate: number
    apiKey: string
    clientId: string
    balance: number
    withdrawn: number
  } | null>(null)

  // Simulated Login fields
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [isLoggingIn, setIsLoggingIn] = useState(false)

  // Dashboard Active Tab
  const [dashboardTab, setDashboardTab] = useState<'overview' | 'proposal' | 'pipeline' | 'payouts' | 'support' | 'sandbox'>('overview')

  // Opportunities state
  const [opportunities, setOpportunities] = useState([
    {
      id: 'opp-1',
      clientName: 'Hilton Addis Ababa',
      industry: 'Hospitality',
      budget: 'medium',
      budgetLabel: 'Medium (95,000 ETB)',
      timeline: 'standard',
      timelineLabel: 'Standard (6-10 Weeks)',
      description: 'Room scheduling booking calendar integration and Telebirr payment checkout gates.',
      status: 'Development Pipeline',
      statusCode: 'dev',
      dateAdded: '2026-06-10',
      estLaunch: 'Aug 12, 2026',
      commission: '11,400 ETB',
      isPaid: false
    },
    {
      id: 'opp-2',
      clientName: 'Happy Optics Bole',
      industry: 'Healthcare',
      budget: 'standard',
      budgetLabel: 'Standard (75,000 ETB)',
      timeline: 'speed',
      timelineLabel: 'Speed (2-4 Weeks)',
      description: 'Eye clinic SPH/CYL prescription DB inventory tracking and customer SMS pick-up alerts.',
      status: 'Production Active',
      statusCode: 'active',
      dateAdded: '2026-05-15',
      estLaunch: 'Jun 15, 2026',
      commission: '9,000 ETB',
      isPaid: true
    },
    {
      id: 'opp-3',
      clientName: 'Amen Car Importer',
      industry: 'Automotive',
      budget: 'standard',
      budgetLabel: 'Standard (55,000 ETB)',
      timeline: 'speed',
      timelineLabel: 'Speed (2-4 Weeks)',
      description: 'Stock sheet database displaying car status (Transit, Custom, Showroom) with deposit log.',
      status: 'QA & Verification',
      statusCode: 'qa',
      dateAdded: '2026-06-28',
      estLaunch: 'Jul 28, 2026',
      commission: '6,600 ETB',
      isPaid: false
    }
  ])

  // Support Tickets state
  const [supportTickets, setSupportTickets] = useState([
    {
      id: 'TKT-8291',
      client: 'Hilton Addis Ababa',
      subject: 'Telebirr checkout signature mismatch',
      priority: 'high',
      status: 'Resolved',
      date: '2026-07-02',
      lastUpdate: 'API signature keys refreshed; transaction locks cleared.'
    }
  ])

  // Payout Transaction History state
  const [payouts, setPayouts] = useState([
    {
      id: 'TXN-9041',
      date: '2026-06-20',
      amount: 9000,
      channel: 'Telebirr (+251911***432)',
      status: 'Disbursed & Settled',
      refHash: 'cbe8928ad02ba9c836'
    }
  ])

  // Opportunities form inputs
  const [newOppClient, setNewOppClient] = useState('')
  const [newOppIndustry, setNewOppIndustry] = useState('')
  const [newOppBudget, setNewOppBudget] = useState('')
  const [newOppTimeline, setNewOppTimeline] = useState('')
  const [newOppDesc, setNewOppDesc] = useState('')
  const [newOppSuccess, setNewOppSuccess] = useState(false)
  const [isOppSubmitting, setIsOppSubmitting] = useState(false)

  // Live Chat assistant simulated state
  const [chatMessages, setChatMessages] = useState([
    { sender: 'support', text: 'Welcome to the Melhek Agency SLA Support Desk! How can we assist your technical team today?', time: '09:00 AM' }
  ])
  const [chatInput, setChatInput] = useState('')

  // Referral URL tool
  const [referralUtm, setReferralUtm] = useState('apex_addis')
  const [showCopyTooltip, setShowCopyTooltip] = useState(false)

  // Withdrawal modal states
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false)
  const [withdrawAmount, setWithdrawAmount] = useState('')
  const [withdrawChannel, setWithdrawChannel] = useState('telebirr')
  const [withdrawAccount, setWithdrawAccount] = useState('')
  const [withdrawError, setWithdrawError] = useState('')
  const [isWithdrawPending, setIsWithdrawPending] = useState(false)
  const [withdrawSuccess, setWithdrawSuccess] = useState(false)

  // Actions handlers
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError('')
    setIsLoggingIn(true)
    setTimeout(() => {
      if (!loginEmail || !loginPassword) {
        setLoginError('Email and Passcode are required.')
        setIsLoggingIn(false)
        return
      }
      setPartnerSession({
        email: loginEmail,
        agencyName: loginEmail.includes('apex') ? 'Apex Digital Marketing' : 'Yonas Creative Studio',
        contactPerson: loginEmail.includes('apex') ? 'Yonas K.' : 'Makeda T.',
        tier: 'Gold Agency Tier - 12% Payout',
        rate: 12,
        apiKey: 'mk_live_512b90ce8fa9b0cd18e3902ba984',
        clientId: 'cli_9041283',
        balance: 85000,
        withdrawn: 21000
      })
      setIsLoggingIn(false)
    }, 600)
  }

  const handleQuickDemoLogin = () => {
    setLoginError('')
    setIsLoggingIn(true)
    setTimeout(() => {
      setPartnerSession({
        email: 'apex@marketingaddis.com',
        agencyName: 'Apex Digital Marketing',
        contactPerson: 'Yonas K.',
        tier: 'Gold Agency Tier - 12% Payout',
        rate: 12,
        apiKey: 'mk_live_512b90ce8fa9b0cd18e3902ba984',
        clientId: 'cli_9041283',
        balance: 85000,
        withdrawn: 21000
      })
      setIsLoggingIn(false)
    }, 400)
  }

  const handleNewOppSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newOppClient || !newOppIndustry || !newOppBudget || !newOppTimeline || !newOppDesc) return
    setIsOppSubmitting(true)
    setTimeout(() => {
      const budgetLabels: Record<string, string> = {
        standard: 'Standard (55,000 ETB)',
        medium: 'Medium (95,000 ETB)',
        enterprise: 'Enterprise (150,000+ ETB)'
      }
      const timelineLabels: Record<string, string> = {
        speed: 'Speed delivery (2 – 4 Weeks)',
        standard: 'Standard Delivery (6 – 10 Weeks)',
        enterprise: 'Multi-phase deployment (3+ Months)'
      }
      const newOpp = {
        id: `opp-${Math.floor(1000 + Math.random() * 9000)}`,
        clientName: newOppClient,
        industry: newOppIndustry,
        budget: newOppBudget,
        budgetLabel: budgetLabels[newOppBudget] || newOppBudget,
        timeline: newOppTimeline,
        timelineLabel: timelineLabels[newOppTimeline] || newOppTimeline,
        description: newOppDesc,
        status: 'Scoping Review',
        statusCode: 'scoping',
        dateAdded: new Date().toISOString().split('T')[0],
        estLaunch: 'Calculating...',
        commission: 'TBD (12% tier)',
        isPaid: false
      }
      setOpportunities(prev => [newOpp, ...prev])
      setIsOppSubmitting(false)
      setNewOppSuccess(true)
      setNewOppClient('')
      setNewOppIndustry('')
      setNewOppBudget('')
      setNewOppTimeline('')
      setNewOppDesc('')
      setTimeout(() => setNewOppSuccess(false), 3000)
    }, 800)
  }

  const handleWithdrawalSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setWithdrawError('')
    const amt = parseFloat(withdrawAmount)
    if (!withdrawAmount || isNaN(amt) || amt <= 0) {
      setWithdrawError('Please enter a valid amount.')
      return
    }
    if (partnerSession && amt > partnerSession.balance) {
      setWithdrawError('Requested amount exceeds your pending balance.')
      return
    }
    if (!withdrawAccount) {
      setWithdrawError('Account identifier or wallet number is required.')
      return
    }
    
    setIsWithdrawPending(true)
    setTimeout(() => {
      if (partnerSession) {
        setPartnerSession({
          ...partnerSession,
          balance: partnerSession.balance - amt,
          withdrawn: partnerSession.withdrawn + amt
        })
        const newTxn = {
          id: `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
          date: new Date().toISOString().split('T')[0],
          amount: amt,
          channel: `${withdrawChannel === 'telebirr' ? 'Telebirr' : withdrawChannel === 'cbe' ? 'CBE Birr' : 'Chapa'} (${withdrawAccount})`,
          status: 'Processing Verification',
          refHash: 'Pending Hash...'
        }
        setPayouts(prev => [newTxn, ...prev])
      }
      setIsWithdrawPending(false)
      setWithdrawSuccess(true)
      setTimeout(() => {
        setWithdrawSuccess(false)
        setIsWithdrawModalOpen(false)
        setWithdrawAmount('')
        setWithdrawAccount('')
      }, 1500)
    }, 1000)
  }

  const handleSendChatMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!chatInput.trim()) return
    const userMsg = { sender: 'user', text: chatInput, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    setChatMessages(prev => [...prev, userMsg])
    const promptText = chatInput
    setChatInput('')

    setTimeout(() => {
      let replyText = "Understood. Our lead technical architect has received this update and logged it into your agency sprint file."
      const lower = promptText.toLowerCase()
      if (lower.includes('telebirr') || lower.includes('payment') || lower.includes('cbe')) {
        replyText = "We integrate Telebirr Partner APIs directly into Next.js server endpoints, featuring instant QR generation and webhook verification."
      } else if (lower.includes('proposal') || lower.includes('quote') || lower.includes('pricing')) {
        replyText = "You can use our White-Label Proposal Builder tab to generate custom client quotes with your agency's markup percentage applied."
      }
      setChatMessages(prev => [...prev, {
        sender: 'support',
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }])
    }, 800)
  }

  const handleCopyRefLink = () => {
    const link = `https://www.melhek.com.et/partners?ref=${referralUtm}`
    navigator.clipboard.writeText(link).then(() => {
      setShowCopyTooltip(true)
      setTimeout(() => setShowCopyTooltip(false), 2000)
    })
  }

  // Calculate Agency Profit
  const calculateAgencyMargin = () => {
    let baseWholesalePerProject = 40000
    if (calcSelectedTypes.includes('telebirr_pos')) baseWholesalePerProject += 18000
    if (calcSelectedTypes.includes('ai_chatbot')) baseWholesalePerProject += 25000
    if (calcSelectedTypes.includes('booking_crm')) baseWholesalePerProject += 22000

    const totalWholesale = baseWholesalePerProject * calcProjectCount
    const recommendedClientRetail = totalWholesale * 1.45 // 45% markup
    const netAgencyProfit = recommendedClientRetail - totalWholesale

    return {
      wholesaleTotal: Math.round(totalWholesale),
      retailTotal: Math.round(recommendedClientRetail),
      agencyProfit: Math.round(netAgencyProfit),
      marginPct: 45
    }
  }

  // Calculate Proposal Price
  const calculateProposalPrice = () => {
    let baseWholesale = 45000
    if (propModules.includes('telebirr_checkout')) baseWholesale += 20000
    if (propModules.includes('ai_concierge')) baseWholesale += 30000
    if (propModules.includes('booking_engine')) baseWholesale += 25000
    if (propModules.includes('crm_dashboard')) baseWholesale += 28000

    const agencyRetailPrice = Math.round(baseWholesale * (1 + propMarkup / 100))
    const agencyProfit = agencyRetailPrice - baseWholesale

    return {
      baseWholesale,
      agencyRetailPrice,
      agencyProfit
    }
  }

  const marginStats = calculateAgencyMargin()
  const proposalStats = calculateProposalPrice()

  return (
    <div className="min-h-screen bg-melhek-dark text-white selection:bg-melhek-blue selection:text-melhek-navy font-sans relative overflow-x-hidden">
      <div className="grain-overlay" aria-hidden />
      <div className="digital-grid" aria-hidden />

      {/* ── CUSTOM PARTNER PORTAL HEADER ── */}
      <nav className="fixed top-4 left-[4vw] right-[4vw] z-[1000] glass rounded-full px-6 py-3 flex items-center justify-between bg-melhek-navy/85 border-white/10 shadow-2xl backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5 group cursor-pointer">
            <div className="w-8 h-8 rounded-xl bg-melhek-blue/15 border border-melhek-blue/40 flex items-center justify-center text-melhek-blue group-hover:scale-105 transition-transform">
              <Briefcase className="w-4 h-4" />
            </div>
            <span className="text-xs sm:text-sm font-display font-extrabold tracking-tight text-white">
              Melhek <span className="text-melhek-blue">Agency Partner Center</span>
            </span>
          </Link>
        </div>
        
        {/* Nav Links */}
        <div className="hidden lg:flex items-center gap-6 font-mono text-[11px] uppercase tracking-wider">
          {!isDashboardActive ? (
            <>
              <a href="#agency-calculator" className="text-white/60 hover:text-melhek-blue transition-colors">Margin Calculator</a>
              <a href="#proposal-builder" className="text-white/60 hover:text-melhek-blue transition-colors">Proposal Builder</a>
              <a href="#capabilities" className="text-white/60 hover:text-melhek-blue transition-colors">System Capabilities</a>
              <a href="#models" className="text-white/60 hover:text-melhek-blue transition-colors">Partnership Models</a>
              <a href="#faqs" className="text-white/60 hover:text-melhek-blue transition-colors">Agency FAQs</a>
            </>
          ) : (
            <>
              <button onClick={() => setDashboardTab('overview')} className={`cursor-pointer ${dashboardTab === 'overview' ? 'text-melhek-blue font-bold' : 'text-white/60 hover:text-white'}`}>Overview</button>
              <button onClick={() => setDashboardTab('proposal')} className={`cursor-pointer ${dashboardTab === 'proposal' ? 'text-melhek-blue font-bold' : 'text-white/60 hover:text-white'}`}>Quote Builder</button>
              <button onClick={() => setDashboardTab('pipeline')} className={`cursor-pointer ${dashboardTab === 'pipeline' ? 'text-melhek-blue font-bold' : 'text-white/60 hover:text-white'}`}>Pipeline</button>
              <button onClick={() => setDashboardTab('payouts')} className={`cursor-pointer ${dashboardTab === 'payouts' ? 'text-melhek-blue font-bold' : 'text-white/60 hover:text-white'}`}>Payout Ledger</button>
              <button onClick={() => setDashboardTab('support')} className={`cursor-pointer ${dashboardTab === 'support' ? 'text-melhek-blue font-bold' : 'text-white/60 hover:text-white'}`}>SLA Desk</button>
            </>
          )}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {isDashboardActive ? (
            <button
              onClick={() => setIsDashboardActive(false)}
              className="btn-secondary !px-4 !py-1.5 !text-[10px] font-mono uppercase tracking-wider cursor-pointer"
            >
              Program Overview
            </button>
          ) : (
            <button
              onClick={handleQuickDemoLogin}
              className="btn-primary !px-4 !py-1.5 !text-[10px] font-mono uppercase tracking-wider cursor-pointer shadow-md shadow-melhek-blue/20"
            >
              Instant Demo Portal
            </button>
          )}
          {partnerSession ? (
            <div className="hidden sm:flex items-center gap-2 bg-melhek-blue/15 border border-melhek-blue/30 rounded-full py-1 px-3">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-mono text-white font-bold max-w-[120px] truncate">{partnerSession.agencyName}</span>
            </div>
          ) : (
            <button
              onClick={() => setIsDashboardActive(true)}
              className="btn-secondary !px-4 !py-1.5 !text-[10px] font-mono uppercase tracking-wider cursor-pointer"
            >
              Sign In
            </button>
          )}
        </div>
      </nav>

      {/* ── CONDITIONAL WORKSPACE AREA ── */}
      {isDashboardActive ? (
        <main className="pt-28 pb-20 min-h-screen">
          {partnerSession === null ? (
            /* SECURE LOGIN OVERLAY */
            <div className="container mx-auto px-6 max-w-md pt-8 pb-20">
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass rounded-[2.5rem] border-white/10 bg-melhek-navy/85 p-8 sm:p-10 shadow-2xl text-left relative overflow-hidden"
              >
                <div className="text-center mb-6 space-y-2">
                  <div className="w-12 h-12 rounded-2xl bg-melhek-blue/15 border border-melhek-blue/30 flex items-center justify-center mx-auto text-melhek-blue">
                    <Lock className="w-5 h-5" />
                  </div>
                  <span className="text-[9px] uppercase tracking-widest font-mono text-melhek-blue font-bold">Agency Access Gateway</span>
                  <h2 className="text-2xl font-display font-extrabold text-white">Agency Partner Portal</h2>
                  <p className="text-xs text-white/50 font-light leading-relaxed">
                    Access client project pipelines, Telebirr/CBE payout balances, and developer SLA support.
                  </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                  {loginError && (
                    <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-[11px] font-mono flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      {loginError}
                    </div>
                  )}

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider font-mono text-white/40 ml-1">Agency Email</label>
                    <input
                      type="email"
                      required
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="agency@company.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-melhek-blue"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider font-mono text-white/40 ml-1">Passcode</label>
                    <input
                      type="password"
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-melhek-blue"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoggingIn}
                    className="w-full btn-primary justify-center text-xs uppercase tracking-widest font-mono py-3.5 mt-2 cursor-pointer shadow-lg shadow-melhek-blue/20"
                  >
                    {isLoggingIn ? 'Verifying Credentials...' : 'Secure Sign In'}
                  </button>
                </form>

                <div className="relative flex py-4 items-center">
                  <div className="flex-grow border-t border-white/10"></div>
                  <span className="flex-shrink mx-4 text-[9px] font-mono text-white/30 uppercase tracking-widest">Instant Demo Access</span>
                  <div className="flex-grow border-t border-white/10"></div>
                </div>

                <button
                  type="button"
                  onClick={handleQuickDemoLogin}
                  className="w-full bg-melhek-blue/15 border border-melhek-blue/30 hover:bg-melhek-blue/25 transition-all text-melhek-blue font-mono font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Shield className="w-4 h-4" /> Enter Interactive Demo Workspace
                </button>
              </motion.div>
            </div>
          ) : (
            /* SECURE B2B WORKSPACE DASHBOARD */
            <div className="container mx-auto px-4 sm:px-6 max-w-7xl space-y-6">
              
              {/* Workspace Header Panel */}
              <div className="glass rounded-[2rem] border-white/10 bg-melhek-navy/85 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xl">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-melhek-blue/15 border border-melhek-blue/30 text-melhek-blue font-bold">
                      Agency Partner Hub
                    </span>
                    <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-mono">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Wholesale Rate Locked
                    </div>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
                    {partnerSession.agencyName}
                  </h2>
                  <p className="text-xs text-white/60 font-light">
                    Managing Partner: <span className="text-white font-medium">{partnerSession.contactPerson}</span> • Email: <span className="text-white font-medium">{partnerSession.email}</span> • Client ID: <span className="text-melhek-blue font-mono font-bold">{partnerSession.clientId}</span>
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-4 font-mono text-xs">
                  <div className="text-left md:text-right">
                    <span className="text-[9px] text-white/40 uppercase block">Partner Tier</span>
                    <span className="text-xs font-bold text-emerald-400">{partnerSession.tier}</span>
                  </div>
                  <div className="h-8 w-px bg-white/10 hidden md:block" />
                  <button
                    onClick={() => {
                      setPartnerSession(null)
                      setIsDashboardActive(false)
                    }}
                    className="px-4 py-2 bg-white/5 hover:bg-red-500/10 border border-white/10 hover:border-red-500/20 text-white/60 hover:text-red-400 rounded-xl text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" /> Sign Out
                  </button>
                </div>
              </div>

              {/* Grid Dashboard */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                
                {/* Sidebar Navigation */}
                <div className="glass p-2.5 rounded-2xl border-white/10 bg-melhek-navy/60 h-fit space-y-1 shadow-xl">
                  {([
                    { id: 'overview', label: 'Overview Metrics', icon: Globe },
                    { id: 'proposal', label: 'White-Label Quote Builder', icon: FileText },
                    { id: 'pipeline', label: 'Client Pipelines', icon: Layers },
                    { id: 'payouts', label: 'Payouts & Ledger', icon: CreditCard },
                    { id: 'support', label: 'Developer SLA Desk', icon: MessageSquare },
                    { id: 'sandbox', label: 'API Sandbox', icon: Terminal }
                  ] as const).map(tab => {
                    const TabIcon = tab.icon
                    const isActive = dashboardTab === tab.id
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setDashboardTab(tab.id)}
                        className={`w-full flex items-center gap-3 px-4.5 py-3 rounded-xl text-xs font-mono font-bold transition-all text-left cursor-pointer ${
                          isActive 
                            ? 'bg-melhek-blue text-melhek-navy shadow-md shadow-melhek-blue/15'
                            : 'text-white/60 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <TabIcon className="w-4 h-4 flex-shrink-0" />
                        {tab.label}
                      </button>
                    )
                  })}
                </div>

                {/* Dashboard Panels */}
                <div className="lg:col-span-3 text-left">
                  
                  {/* OVERVIEW TAB */}
                  {dashboardTab === 'overview' && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="glass p-6 rounded-2xl border-white/10 bg-white/[0.01] flex flex-col justify-between space-y-2">
                          <span className="text-[10px] text-white/40 uppercase font-mono">Pending Commission</span>
                          <span className="text-2xl font-display font-extrabold text-melhek-blue font-mono">{partnerSession.balance.toLocaleString()} ETB</span>
                          <button 
                            onClick={() => setIsWithdrawModalOpen(true)}
                            className="text-[10px] font-mono text-emerald-400 hover:underline flex items-center gap-1 pt-1 cursor-pointer"
                          >
                            Withdraw Funds <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                        <div className="glass p-6 rounded-2xl border-white/10 bg-white/[0.01] flex flex-col justify-between space-y-2">
                          <span className="text-[10px] text-white/40 uppercase font-mono">Total Disbursed</span>
                          <span className="text-2xl font-display font-extrabold text-white font-mono">{partnerSession.withdrawn.toLocaleString()} ETB</span>
                          <span className="text-[9px] text-white/40 font-mono">Settled via Telebirr/CBE</span>
                        </div>
                        <div className="glass p-6 rounded-2xl border-white/10 bg-white/[0.01] flex flex-col justify-between space-y-2">
                          <span className="text-[10px] text-white/40 uppercase font-mono">Active Client Builds</span>
                          <span className="text-2xl font-display font-extrabold text-white font-mono">
                            {opportunities.filter(o => o.statusCode !== 'active').length} Projects
                          </span>
                          <span className="text-[9px] text-emerald-400 font-mono">In Engineering Sprint</span>
                        </div>
                        <div className="glass p-6 rounded-2xl border-white/10 bg-white/[0.01] flex flex-col justify-between space-y-2">
                          <span className="text-[10px] text-white/40 uppercase font-mono">Wholesale Rate Discount</span>
                          <span className="text-2xl font-display font-extrabold text-emerald-400 font-mono">35% OFF</span>
                          <span className="text-[9px] text-white/40 font-mono">Partner Rate Tier</span>
                        </div>
                      </div>

                      {/* Referral UTM Link Generator */}
                      <div className="glass p-6 sm:p-8 rounded-[2rem] border-white/10 bg-melhek-navy/55 space-y-4 shadow-xl">
                        <h3 className="text-xs font-mono text-white/40 uppercase flex items-center gap-2">
                          <Globe className="w-4 h-4 text-melhek-blue" /> Custom Agency Referral Link
                        </h3>
                        <p className="text-xs text-white/60 font-light">
                          Share your custom referral URL with prospective clients. Leads are automatically tagged to your agency profile.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center gap-3">
                          <input
                            type="text"
                            readOnly
                            value={`https://www.melhek.com.et/partners?ref=${referralUtm}`}
                            className="flex-1 w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xs font-mono text-melhek-blue focus:outline-none"
                          />
                          <button
                            onClick={handleCopyRefLink}
                            className="btn-primary !px-6 !py-3 text-xs font-mono uppercase tracking-wider cursor-pointer w-full sm:w-auto text-center"
                          >
                            {showCopyTooltip ? 'Copied Link!' : 'Copy Link'}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* PROPOSAL TAB */}
                  {dashboardTab === 'proposal' && (
                    <div className="glass p-6 sm:p-8 rounded-[2rem] border-white/10 bg-melhek-navy/55 space-y-6 shadow-xl">
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-melhek-blue uppercase font-bold">White-Label Quote Generator</span>
                        <h3 className="text-xl font-bold text-white">Generate Client Proposal Specs</h3>
                        <p className="text-xs text-white/60 font-light">
                          Build custom client quotes on the fly with your agency margin included.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-[9px] font-mono text-white/40 uppercase block mb-1">Client Name / Alias</label>
                          <input
                            type="text"
                            value={propClientName}
                            onChange={(e) => setPropClientName(e.target.value)}
                            placeholder="e.g. Kuriftu Resort Scoping"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-melhek-blue font-mono"
                          />
                        </div>
                        <div>
                          <label className="text-[9px] font-mono text-white/40 uppercase block mb-1">Agency Markup Percentage</label>
                          <select
                            value={propMarkup}
                            onChange={(e) => setPropMarkup(Number(e.target.value))}
                            className="w-full bg-melhek-navy border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none font-mono"
                          >
                            <option value={25}>25% Agency Markup</option>
                            <option value={35}>35% Agency Markup (Standard)</option>
                            <option value={50}>50% Agency Markup (High Margin)</option>
                          </select>
                        </div>
                      </div>

                      {/* Proposal Output Box */}
                      <div className="p-6 rounded-2xl bg-black/50 border border-white/10 space-y-4 font-mono text-xs">
                        <div className="flex justify-between border-b border-white/10 pb-3">
                          <span className="text-white/40">Melhek Wholesale Rate:</span>
                          <span className="text-white font-bold">{proposalStats.baseWholesale.toLocaleString()} ETB</span>
                        </div>
                        <div className="flex justify-between border-b border-white/10 pb-3">
                          <span className="text-emerald-400">Your Agency Net Profit:</span>
                          <span className="text-emerald-400 font-bold">+{proposalStats.agencyProfit.toLocaleString()} ETB</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-melhek-blue font-bold">Client Retail Quote Price:</span>
                          <span className="text-melhek-blue font-extrabold text-lg">{proposalStats.agencyRetailPrice.toLocaleString()} ETB</span>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          const summary = `WHITE-LABEL PROPOSAL DRAFT (${partnerSession?.agencyName})\nClient: ${propClientName || 'Client'}\nRetail Quote: ${proposalStats.agencyRetailPrice.toLocaleString()} ETB\nNet Agency Margin: ${proposalStats.agencyProfit.toLocaleString()} ETB`
                          navigator.clipboard.writeText(summary)
                          setProposalCopied(true)
                          setTimeout(() => setProposalCopied(false), 2000)
                        }}
                        className="btn-primary w-full py-3.5 text-xs font-mono uppercase tracking-widest cursor-pointer justify-center shadow-lg shadow-melhek-blue/20"
                      >
                        {proposalCopied ? 'Proposal Summary Copied!' : 'Copy Proposal Summary to Clipboard'}
                      </button>
                    </div>
                  )}

                  {/* PIPELINE TAB */}
                  {dashboardTab === 'pipeline' && (
                    <div className="glass p-6 sm:p-8 rounded-[2rem] border-white/10 bg-melhek-navy/55 space-y-6 shadow-xl">
                      <div className="flex items-center justify-between border-b border-white/10 pb-4">
                        <div>
                          <h3 className="text-xs font-mono text-white/40 uppercase">Active Client Projects</h3>
                          <p className="text-xs text-white font-bold">Track Scoping & Engineering Sprints</p>
                        </div>
                        <button
                          onClick={() => {
                            setNewOppClient('')
                            setNewOppDesc('')
                          }}
                          className="btn-primary !px-4 !py-2 text-[10px] font-mono uppercase tracking-wider cursor-pointer"
                        >
                          + Submit New Client
                        </button>
                      </div>

                      <div className="space-y-3">
                        {opportunities.map((opp) => (
                          <div key={opp.id} className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-2">
                              <div>
                                <h4 className="text-sm font-bold text-white">{opp.clientName}</h4>
                                <span className="text-[10px] text-white/40 font-mono">{opp.industry} • {opp.budgetLabel}</span>
                              </div>
                              <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-melhek-blue/15 border border-melhek-blue/30 text-melhek-blue font-bold self-start sm:self-auto">
                                {opp.status}
                              </span>
                            </div>
                            <p className="text-xs text-white/60 font-light leading-relaxed">{opp.description}</p>
                            <div className="flex justify-between items-center text-[10px] font-mono text-white/40 pt-1">
                              <span>Est Launch: {opp.estLaunch}</span>
                              <span className="text-emerald-400 font-bold">Commission: {opp.commission}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* PAYOUTS TAB */}
                  {dashboardTab === 'payouts' && (
                    <div className="glass p-6 sm:p-8 rounded-[2rem] border-white/10 bg-melhek-navy/55 space-y-6 shadow-xl">
                      <div className="flex items-center justify-between border-b border-white/10 pb-4">
                        <div>
                          <h3 className="text-xs font-mono text-white/40 uppercase">Commissions & Payout Ledger</h3>
                          <p className="text-xs text-white font-bold">Telebirr & CBE Birr Disbursal Log</p>
                        </div>
                        <button
                          onClick={() => setIsWithdrawModalOpen(true)}
                          className="btn-primary !px-5 !py-2 text-[10px] font-mono uppercase tracking-wider cursor-pointer"
                        >
                          Request Payout
                        </button>
                      </div>

                      <div className="space-y-3">
                        {payouts.map((p) => (
                          <div key={p.id} className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between font-mono text-xs">
                            <div>
                              <p className="font-bold text-white">{p.amount.toLocaleString()} ETB</p>
                              <span className="text-[10px] text-white/40">{p.channel} • {p.date}</span>
                            </div>
                            <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                              {p.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* SLA SUPPORT DESK TAB */}
                  {dashboardTab === 'support' && (
                    <div className="glass p-6 rounded-2xl border-white/10 bg-melhek-navy/55 space-y-4 shadow-xl">
                      <div className="flex items-center justify-between border-b border-white/10 pb-3">
                        <h3 className="text-xs font-mono text-white/40 uppercase flex items-center gap-2">
                          <MessageSquare className="w-4 h-4 text-melhek-blue" /> Direct Developer SLA Desk
                        </h3>
                        <span className="text-[9px] font-mono text-emerald-400 font-bold">Level 2 Support Desk</span>
                      </div>
                      <div className="h-80 overflow-y-auto space-y-3 pr-2 scrollbar-thin">
                        {chatMessages.map((msg, i) => (
                          <div key={i} className={`flex flex-col ${msg.sender === 'support' ? 'items-start' : 'items-end'}`}>
                            <div className={`p-4 rounded-2xl max-w-md text-xs leading-relaxed ${
                              msg.sender === 'support'
                                ? 'bg-melhek-blue/15 border border-melhek-blue/30 text-white rounded-tl-none'
                                : 'bg-emerald-500/20 border border-emerald-500/30 text-white rounded-tr-none'
                            }`}>
                              {msg.text}
                              <span className="text-[8px] text-white/40 font-mono block text-right mt-1.5">{msg.time}</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      <form onSubmit={handleSendChatMessage} className="flex gap-2 pt-2 border-t border-white/10">
                        <input
                          type="text"
                          value={chatInput}
                          onChange={(e) => setChatInput(e.target.value)}
                          placeholder="Type notes or technical questions for Melhek lead architects..."
                          className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-melhek-blue"
                        />
                        <button
                          type="submit"
                          className="btn-primary !px-5 !py-2.5 text-xs font-mono uppercase tracking-wider cursor-pointer"
                        >
                          Send
                        </button>
                      </form>
                    </div>
                  )}

                  {/* API SANDBOX TAB */}
                  {dashboardTab === 'sandbox' && (
                    <div className="glass p-6 sm:p-8 rounded-[2rem] border-white/10 bg-melhek-navy/55 space-y-6 shadow-xl">
                      <h3 className="text-xs font-mono text-white/40 uppercase border-b border-white/10 pb-3 flex items-center gap-2">
                        <Terminal className="w-4 h-4 text-melhek-blue" /> Developer API & Webhook Sandbox
                      </h3>
                      <div className="p-4 rounded-2xl bg-black/50 border border-white/10 space-y-2 font-mono text-xs">
                        <span className="text-white/40 block text-[10px]">API Production Key</span>
                        <div className="flex items-center justify-between">
                          <span className="text-melhek-blue font-bold">{partnerSession.apiKey}</span>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(partnerSession.apiKey)
                              alert('API Key Copied!')
                            }}
                            className="text-[10px] text-white/60 hover:text-white underline cursor-pointer"
                          >
                            Copy
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </div>
          )}
        </main>
      ) : (
        /* ── LANDING PAGE VIEW tailored for DIGITAL MARKETING AGENCIES ── */
        <main className="pt-24 pb-20">
          
          {/* HERO SECTION FOR DIGITAL MARKETING AGENCIES */}
          <section className="container mx-auto px-4 sm:px-6 max-w-7xl pt-6 pb-16">
            <div className="text-center max-w-3xl mx-auto space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border-melhek-blue/30 text-melhek-blue text-[10px] font-mono uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> B2B Partner Portal for Digital Marketing Agencies
              </div>
              <h1 className="text-4xl sm:text-6xl font-display font-extrabold tracking-tight text-white leading-[1.1]">
                Scale Agency Revenue <br />
                <span className="text-gradient">Without Developer Overhead</span>
              </h1>
              <p className="text-base sm:text-lg text-white/70 font-light leading-relaxed">
                Partner with Melhek Technologies to deliver custom Next.js web applications, Telebirr/CBE payment checkout engines, CRMs, and AI chatbots directly to your clients — <span className="text-emerald-400 font-semibold">100% White-Labeled under your agency brand</span> or via <span className="text-melhek-blue font-semibold">10% cash referral commissions</span>.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                <a
                  href="#agency-calculator"
                  className="btn-primary flex items-center justify-center gap-3 px-8 py-3.5 text-xs font-mono uppercase tracking-widest cursor-pointer w-full sm:w-auto shadow-lg shadow-melhek-blue/25"
                >
                  Calculate Agency Margin <ArrowRight className="w-4 h-4" />
                </a>
                <button
                  onClick={handleQuickDemoLogin}
                  className="btn-secondary flex items-center justify-center gap-2 px-8 py-3.5 text-xs font-mono uppercase tracking-widest cursor-pointer w-full sm:w-auto"
                >
                  Enter Agency Portal Demo
                </button>
              </div>
            </div>
          </section>

          {/* INTERACTIVE COMPONENT 1: AGENCY PROFIT & MARGIN CALCULATOR */}
          <section id="agency-calculator" className="container mx-auto px-4 sm:px-6 max-w-7xl py-12 scroll-mt-28">
            <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
              <span className="text-[10px] font-mono text-melhek-blue uppercase tracking-widest font-bold">Interactive Tool</span>
              <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-white">Agency Margin & Profit Estimator</h2>
              <p className="text-xs sm:text-sm text-white/60 font-light">
                See how much net margin your marketing agency generates per year by white-labeling software development with Melhek.
              </p>
            </div>

            <div className="glass p-6 sm:p-10 rounded-[2.5rem] border-white/10 bg-melhek-navy/80 space-y-8 shadow-2xl">
              
              {/* Slider Controls */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-mono text-white/40 uppercase">Annual Client Software Projects</label>
                  <span className="text-lg font-display font-extrabold text-melhek-blue">{calcProjectCount} Projects / Year</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={15}
                  value={calcProjectCount}
                  onChange={(e) => setCalcProjectCount(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-melhek-blue"
                />
              </div>

              {/* Module Selection Pills */}
              <div className="space-y-2">
                <label className="text-[10px] font-mono text-white/40 uppercase block">Selected Software Stack Capabilities</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {[
                    { id: 'web_app', title: 'Enterprise Web Application', rate: '40,000 ETB' },
                    { id: 'telebirr_pos', title: 'Telebirr & CBE Payment Checkout', rate: '+18,000 ETB' },
                    { id: 'ai_chatbot', title: 'Amharic AI Customer Chatbot', rate: '+25,000 ETB' },
                    { id: 'booking_crm', title: 'Smart Booking & CRM Ledger', rate: '+22,000 ETB' }
                  ].map((mod) => {
                    const isSelected = calcSelectedModules.includes(mod.id)
                    return (
                      <button
                        key={mod.id}
                        onClick={() => {
                          setCalcSelectedModules(prev =>
                            isSelected ? prev.filter(x => x !== mod.id) : [...prev, mod.id]
                          )
                        }}
                        className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                          isSelected 
                            ? 'bg-melhek-blue/20 border-melhek-blue text-white font-bold' 
                            : 'bg-white/5 border-white/10 text-white/40 hover:text-white'
                        }`}
                      >
                        <span className="text-xs font-mono">{mod.title}</span>
                        <span className="text-[10px] font-mono text-emerald-400 mt-2">{mod.rate}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Live Financial Breakdown */}
              <div className="p-6 rounded-2xl bg-black/60 border border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                <div className="space-y-1">
                  <span className="text-[9px] font-mono text-white/40 uppercase">Total Client Revenue</span>
                  <span className="text-2xl font-display font-extrabold text-white block">~{marginStats.retailTotal.toLocaleString()} ETB</span>
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] font-mono text-white/40 uppercase">Melhek Partner Wholesale Cost</span>
                  <span className="text-2xl font-display font-extrabold text-melhek-blue block">~{marginStats.wholesaleTotal.toLocaleString()} ETB</span>
                </div>
                <div className="space-y-1 border-t sm:border-t-0 sm:border-l border-white/10 pt-4 sm:pt-0">
                  <span className="text-[9px] font-mono text-emerald-400 uppercase font-bold">Your Agency Net Margin</span>
                  <span className="text-3xl font-display font-extrabold text-emerald-400 block">+{marginStats.agencyProfit.toLocaleString()} ETB</span>
                  <span className="text-[9px] font-mono text-emerald-400/80 block">Zero Developer Payroll</span>
                </div>
              </div>
            </div>
          </section>

          {/* INTERACTIVE COMPONENT 2: WHITE-LABEL PROPOSAL & QUOTE BUILDER */}
          <section id="proposal-builder" className="container mx-auto px-4 sm:px-6 max-w-7xl py-12 scroll-mt-28">
            <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
              <span className="text-[10px] font-mono text-melhek-blue uppercase tracking-widest font-bold">Interactive Tool</span>
              <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-white">White-Label Proposal Builder</h2>
              <p className="text-xs sm:text-sm text-white/60 font-light">
                Generate presentation-ready client proposals with your agency markup included.
              </p>
            </div>

            <div className="glass p-6 sm:p-10 rounded-[2.5rem] border-white/10 bg-melhek-navy/80 space-y-6 shadow-2xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[9px] font-mono text-white/40 uppercase block mb-1">Client Name / Project Title</label>
                  <input
                    type="text"
                    value={propClientName}
                    onChange={(e) => setPropClientName(e.target.value)}
                    placeholder="e.g. Bole Medhanialem Clinic"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-melhek-blue font-mono"
                  />
                </div>
                <div>
                  <label className="text-[9px] font-mono text-white/40 uppercase block mb-1">Desired Agency Markup %</label>
                  <select
                    value={propMarkup}
                    onChange={(e) => setPropMarkup(Number(e.target.value))}
                    className="w-full bg-melhek-navy border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none font-mono"
                  >
                    <option value={25}>25% Markup</option>
                    <option value={35}>35% Markup (Standard)</option>
                    <option value={50}>50% Markup (High Value)</option>
                  </select>
                </div>
              </div>

              {/* Proposal Specs Box */}
              <div className="p-6 rounded-2xl bg-black/60 border border-white/10 space-y-4 font-mono text-xs">
                <div className="flex justify-between border-b border-white/10 pb-3">
                  <span className="text-white/40">Melhek Wholesale Rate:</span>
                  <span className="text-white font-bold">{proposalStats.baseWholesale.toLocaleString()} ETB</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-3">
                  <span className="text-emerald-400">Your Agency Margin:</span>
                  <span className="text-emerald-400 font-bold">+{proposalStats.agencyProfit.toLocaleString()} ETB</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-melhek-blue font-bold">Client Retail Quote Price:</span>
                  <span className="text-melhek-blue font-extrabold text-lg">{proposalStats.agencyRetailPrice.toLocaleString()} ETB</span>
                </div>
              </div>
            </div>
          </section>

          {/* INTERACTIVE COMPONENT 3: PARTNERSHIP MODELS & COMPARISON MATRIX */}
          <section id="models" className="container mx-auto px-4 sm:px-6 max-w-7xl py-12 scroll-mt-28">
            <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
              <span className="text-[10px] font-mono text-melhek-blue uppercase tracking-widest font-bold">Flexible Collaboration</span>
              <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-white">Agency Partnership Models</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: '100% White Label', badge: 'Most Popular for Agencies', desc: 'Melhek acts as your hidden engineering backroom. You control client communication, billing, and margin.', icon: Lock, highlight: true },
                { title: 'Direct Referral (10%)', badge: '10% Instant Cash', desc: 'Refer clients directly to Melhek. We handle discovery, billing, and support while you earn 10% cash commission.', icon: CreditCard, highlight: false },
                { title: 'Joint Enterprise Alliance', badge: 'Co-Branded Solutons', desc: 'Collaborate on complex enterprise RFPs. We join pitches as technical architects under a joint contract.', icon: Building2, highlight: false }
              ].map((m, i) => {
                const Icon = m.icon
                return (
                  <div key={i} className={`p-8 rounded-[2.5rem] glass border space-y-4 flex flex-col justify-between transition-all ${
                    m.highlight ? 'border-melhek-blue/50 bg-melhek-navy/90 shadow-2xl scale-[1.02]' : 'border-white/10 bg-white/[0.01]'
                  }`}>
                    <div className="space-y-3">
                      <div className="w-12 h-12 rounded-2xl bg-melhek-blue/15 border border-melhek-blue/30 flex items-center justify-center text-melhek-blue">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase block">{m.badge}</span>
                      <h3 className="text-xl font-bold text-white">{m.title}</h3>
                      <p className="text-xs text-white/60 font-light leading-relaxed">{m.desc}</p>
                    </div>
                    <button
                      onClick={handleQuickDemoLogin}
                      className="btn-primary w-full py-3 text-xs font-mono uppercase tracking-widest justify-center cursor-pointer"
                    >
                      Select Model
                    </button>
                  </div>
                )
              })}
            </div>
          </section>

          {/* INTERACTIVE COMPONENT 4: SYSTEM CAPABILITY CARDS */}
          <section id="capabilities" className="container mx-auto px-4 sm:px-6 max-w-7xl py-12 scroll-mt-28">
            <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
              <span className="text-[10px] font-mono text-melhek-blue uppercase tracking-widest font-bold">Engineering Capabilities</span>
              <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-white">What We Build for Your Agency</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {BUILD_CARDS.map((card) => {
                const Icon = card.icon
                return (
                  <div
                    key={card.id}
                    onClick={() => setActiveModalCard(card)}
                    className="p-6 rounded-[2rem] glass border border-white/10 bg-white/[0.01] hover:border-melhek-blue/40 transition-all space-y-4 cursor-pointer group shadow-lg"
                  >
                    <div className="w-10 h-10 rounded-2xl bg-melhek-blue/15 border border-melhek-blue/30 flex items-center justify-center text-melhek-blue group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">{card.title}</h3>
                      <p className="text-xs text-white/50 font-light mt-1 leading-relaxed">{card.tagline}</p>
                    </div>
                    <div className="flex items-center justify-between text-[10px] font-mono text-melhek-blue font-bold pt-2 border-t border-white/5">
                      <span>Est: {card.duration}</span>
                      <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">Specs <ChevronRight className="w-3 h-3" /></span>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

          {/* INTERACTIVE COMPONENT 5: FAQ REGISTRY */}
          <section id="faqs" className="container mx-auto px-4 sm:px-6 max-w-5xl py-12 scroll-mt-28">
            <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
              <span className="text-[10px] font-mono text-melhek-blue uppercase tracking-widest font-bold">Agency Registry FAQs</span>
              <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-white">Frequently Asked Questions</h2>
            </div>

            <div className="space-y-3">
              {FAQ_ITEMS.map((item, idx) => {
                const isOpen = activeFaq === idx
                return (
                  <div key={idx} className="glass rounded-2xl border-white/10 bg-white/[0.01] overflow-hidden transition-all duration-300">
                    <button
                      onClick={() => setActiveFaq(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between p-5 text-left text-xs sm:text-sm font-bold text-white hover:bg-white/5 transition-colors cursor-pointer"
                    >
                      <span className="flex items-center gap-3">
                        <HelpCircle className="w-4 h-4 text-melhek-blue flex-shrink-0" />
                        {item.q}
                      </span>
                      <ChevronDown className={`w-4 h-4 text-white/40 transition-transform duration-300 ${isOpen ? 'rotate-180 text-melhek-blue' : ''}`} />
                    </button>
                    {isOpen && (
                      <div className="p-5 pt-0 text-xs text-white/60 leading-relaxed pl-12 border-t border-white/5 bg-black/20">
                        {item.a}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </section>

        </main>
      )}

      {/* ── CARD SPECIFICATION MODAL ── */}
      <AnimatePresence>
        {activeModalCard && (
          <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass max-w-xl w-full rounded-[2.5rem] border border-white/10 bg-melhek-navy/95 p-8 space-y-6 relative shadow-2xl text-left"
            >
              <button
                onClick={() => setActiveModalCard(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 text-white/40 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1">
                <span className="text-[10px] font-mono text-melhek-blue uppercase font-bold">System Specification</span>
                <h3 className="text-2xl font-bold text-white">{activeModalCard.title}</h3>
                <p className="text-xs text-white/60 font-light">{activeModalCard.tagline}</p>
              </div>

              <div className="space-y-2">
                <label className="text-[9px] font-mono text-white/40 uppercase block">Technical Specifications & Features</label>
                <ul className="space-y-2 text-xs text-white/80 font-light">
                  {activeModalCard.specifications.map((spec, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs font-mono">
                <span className="text-white/40">Build Sprint Duration:</span>
                <span className="text-emerald-400 font-bold">{activeModalCard.duration}</span>
              </div>

              <button
                onClick={() => {
                  setActiveModalCard(null)
                  handleQuickDemoLogin()
                }}
                className="btn-primary w-full justify-center py-3.5 text-xs font-mono uppercase tracking-widest cursor-pointer shadow-lg shadow-melhek-blue/20"
              >
                Request White-Label Quote for This System
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── WITHDRAWAL MODAL ── */}
      <AnimatePresence>
        {isWithdrawModalOpen && (
          <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass max-w-md w-full rounded-[2.5rem] border border-white/10 bg-melhek-navy/95 p-8 space-y-5 relative shadow-2xl text-left"
            >
              <button
                onClick={() => setIsWithdrawModalOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 text-white/40 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1">
                <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold">Commission Payout</span>
                <h3 className="text-xl font-bold text-white">Withdraw Earnings</h3>
                <p className="text-xs text-white/60 font-light">Disburse funds directly to your Telebirr or CBE Birr account.</p>
              </div>

              <form onSubmit={handleWithdrawalSubmit} className="space-y-4">
                {withdrawError && (
                  <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono">
                    {withdrawError}
                  </div>
                )}

                <div>
                  <label className="text-[9px] font-mono text-white/40 uppercase block mb-1">Amount (ETB)</label>
                  <input
                    type="number"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    placeholder="e.g. 25000"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-melhek-blue font-mono"
                  />
                </div>

                <div>
                  <label className="text-[9px] font-mono text-white/40 uppercase block mb-1">Payout Channel</label>
                  <select
                    value={withdrawChannel}
                    onChange={(e) => setWithdrawChannel(e.target.value)}
                    className="w-full bg-melhek-navy border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none font-mono"
                  >
                    <option value="telebirr">Telebirr Wallet</option>
                    <option value="cbe">CBE Birr Account</option>
                  </select>
                </div>

                <div>
                  <label className="text-[9px] font-mono text-white/40 uppercase block mb-1">Account Number / Phone</label>
                  <input
                    type="text"
                    value={withdrawAccount}
                    onChange={(e) => setWithdrawAccount(e.target.value)}
                    placeholder="+251 911 234 567"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-melhek-blue font-mono"
                  />
                </div>

                {withdrawSuccess ? (
                  <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono text-center">
                    ✓ Payout Request Verified & Disbursed!
                  </div>
                ) : (
                  <button
                    type="submit"
                    disabled={isWithdrawPending}
                    className="btn-primary w-full justify-center py-3.5 text-xs font-mono uppercase tracking-widest cursor-pointer shadow-lg shadow-melhek-blue/20"
                  >
                    {isWithdrawPending ? 'Processing Settlement...' : 'Confirm Withdrawal'}
                  </button>
                )}
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  )
}
