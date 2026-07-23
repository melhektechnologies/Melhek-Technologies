'use client'

import { useState, useActionState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { 
  ArrowRight, Shield, Zap, Globe, Cpu, Users, BarChart3, 
  Layers, Check, ChevronDown, Download, Phone, Calendar, 
  FileText, Briefcase, Plus, X, Server, MessageSquare, Clipboard,
  Key, Terminal, Send, CreditCard, LogOut, RefreshCw, AlertCircle, 
  Lock, CheckCircle, type LucideIcon
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
      'SEO audit performance scores of 100/100',
      'Contact collection & CRM integrations',
      'Fully responsive, multi-language system options'
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
      'Clustered databases with daily replication',
      'Role-based permissions & manager gates',
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
    techStack: ['Next.js', 'PostgreSQL', 'TailwindCSS', 'Barcode Scanner APIs'],
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
      'Deposit processing integration',
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
    tagline: 'Intelligent support chatbots answering FAQ and pre-qualifying leads.',
    specifications: [
      'Vector databases storing company documentation',
      'Natural language parsing matching user queries',
      'Lead qualifying intake forwarding names/emails to CRM',
      'Multi-channel deployment (Web, WhatsApp, Telegram)'
    ],
    techStack: ['Next.js', 'Langchain', 'OpenAI API / Gemini API', 'Pinecone DB'],
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
  },
  {
    id: 'custom_software',
    title: 'Custom Software',
    icon: Server,
    tagline: 'Bespoke infrastructure engineered for highly specialized user flows.',
    specifications: [
      'Enterprise database architecture built to scale',
      'Custom API development with deep authorization gates',
      'Vulnerability scanning compliance audits',
      'Robust deployment setups on AWS/GCP'
    ],
    techStack: ['TypeScript', 'Node.js', 'Go', 'Docker', 'AWS / Google Cloud'],
    duration: '8 – 24 Weeks',
    useCase: 'Deploying highly proprietary logic systems with strict security requirements.'
  }
]

// Comparison table criteria
const COMPARISON_TABLE = [
  { criterion: 'Client Ownership', referral: 'Melhek handles client directly', whiteLabel: 'Agency owns relationship & contract', strategic: 'Shared joint enterprise contract' },
  { criterion: 'Communication', referral: 'Melhek project manager led', whiteLabel: 'Agency interface; Melhek is silent', strategic: 'Joint consulting team meetings' },
  { criterion: 'Brand Visibility', referral: '100% Melhek branded', whiteLabel: '100% Agency white-labeled (under your logo)', strategic: 'Co-branded solution (Melhek + Agency)' },
  { criterion: 'Commission / Margin', referral: '10% Cash Referral Bonus', whiteLabel: 'Agency sets own client margin (typically 25-50% markup)', strategic: 'Custom profit-share / equity split' },
  { criterion: 'Pricing Flexibility', referral: 'Standard Melhek parameters', whiteLabel: 'Agency controls pricing entirely', strategic: 'Value-based custom pricing models' },
  { criterion: 'Technical Support', referral: 'Direct client support contract', whiteLabel: 'Escalated support (Melhek backs Agency)', strategic: 'Joint SLA infrastructure support' }
]

// FAQ Items (20+ Intelligent Qs)
const FAQ_ITEMS = [
  {
    q: 'How does the White Label partnership work in practice?',
    a: 'In a white-label arrangement, Melhek Technologies acts as your internal engineering team. We stay behind the scenes. We never contact your client directly, use our company email, or display our branding. All system reviews and communications are coordinated through your agency email, Slack workspace, or account managers.'
  },
  {
    q: 'What is the referral commission structure for client intros?',
    a: 'For agencies who prefer to refer clients directly to Melhek, we pay a 10% cash commission of the initial contract value upon project kickoff. Alternatively, this 10% can be passed directly to your client as a partner discount.'
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
    q: 'Can Melhek assist with project sales pitches and client scoping meetings?',
    a: 'Yes. Under the White Label model, we can join your client discovery calls as "Senior Technical Architects" from your agency. We help explain backend structures, database scales, and security systems to help you secure the project.'
  },
  {
    q: 'Do you offer ongoing system maintenance and post-launch SLAs?',
    a: 'Absolutely. We provide dedicated post-launch support SLA packages. Under White Label, we act as your Level 2 support desk—resolving any server, API, or system issues while your account manager handles the client interface.'
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
    q: 'Is there a minimum client budget for projects to qualify?',
    a: 'We focus on custom, high-value engineering solutions. While we do not enforce strict minimum budgets, our project setups are tailored for businesses seeking reliable, custom-engineered systems rather than cheap templates.'
  },
  {
    q: 'How do you ensure project timelines and delivery dates are met?',
    a: 'We utilize strict agile project milestones. Every project has a dedicated Scrum timeline. By utilizing modular components, pre-tested auth modules, and AI-accelerated frameworks, we consistently deliver projects on or ahead of schedule.'
  },
  {
    q: 'Do you integrate with local payment options like Telebirr and CBE Birr?',
    a: 'Yes. We are experts in Ethiopian payment systems. We integrate local APIs (such as Chapa, Telebirr Partner APIs, CBE Birr) alongside global systems (Stripe, PayPal) to ensure seamless local currency checkouts.'
  },
  {
    q: 'Are your systems built to handle high user volume and database traffic?',
    a: 'Yes. We design backend databases using Prisma and PostgreSQL with query indexing, connection pooling, and caching (Redis) to ensure instant response speeds even during checkout rushes or concurrent bookings.'
  },
  {
    q: 'Can you update or refactor legacy codebases owned by our clients?',
    a: 'Yes. After an initial Codebase Audit where we evaluate database schemas and API stability, we can refactor, optimize, or build additional system integrations on existing codebases.'
  },
  {
    q: 'What types of agencies are best suited for Melhek Partnerships?',
    a: 'We partner with marketing agencies who want to sell custom portals/databases without hiring full-time devs, branding agencies seeking high-end web execution, business consultants coordinating ERP setups, and SaaS companies looking for dev capacity.'
  },
  {
    q: 'Where is the Melhek engineering team located?',
    a: 'Our core engineering office is located in Addis Ababa, Ethiopia. This allows us to provide localized support, coordinate on-site system assessments, and understand the unique requirements of the Ethiopian business market.'
  },
  {
    q: 'What is the payment schedule for white-label development contracts?',
    a: 'We typically operate on a milestone payment structure: 40% initial commitment upon agreement signing, 40% upon beta review validation, and 20% upon final testing approval and deployment kickoff.'
  },
  {
    q: 'Can we set custom client markups under our white-label contract?',
    a: 'Yes. We bill your agency a fixed partner rate. You have absolute pricing flexibility. You can bundle our engineering with your strategy/design services and bill your client whatever markup fits your margin targets.'
  },
  {
    q: 'Do you provide design files (Figma) or do you build from our designs?',
    a: 'We can work either way. We can build custom user interfaces directly from your Figma design files, or our design desk can create custom UI layouts based on your brand strategy.'
  },
  {
    q: 'How do we submit a new client project to start?',
    a: 'Simply fill out the "Submit Opportunity" form below, or schedule a partnership meeting. We will organize an intake review and return a proposal within 24 hours.'
  }
]

export default function PartnersClient() {
  const [activeModalCard, setActiveModalCard] = useState<BuildCard | null>(null)
  const [activeFaq, setActiveFaq] = useState<number | null>(null)

  // Forms State (Landing Page Actions)
  const initialAppState: PartnerActionState = {}
  const [appState, appAction, isAppPending] = useActionState(submitPartnerApplication, initialAppState)

  const initialOppState: PartnerActionState = {}
  const [oppState, oppAction, isOppPending] = useActionState(submitPartnerOpportunity, initialOppState)

  // ── NEW PRODUCTION WORKSPACE STATE ──
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
  const [dashboardTab, setDashboardTab] = useState<'overview' | 'pipeline' | 'payouts' | 'support' | 'sandbox'>('overview')

  // Opportunities state (holds default + new ones)
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
    },
    {
      id: 'TKT-3942',
      client: 'Happy Optics Bole',
      subject: 'Prescription Cyndrical SPH calculation rounding logic',
      priority: 'medium',
      status: 'Investigating',
      date: '2026-07-08',
      lastUpdate: 'Scrum team checking PostgreSQL decimal column precision.'
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
    },
    {
      id: 'TXN-4921',
      date: '2026-05-05',
      amount: 12000,
      channel: 'CBE Birr (100018******89)',
      status: 'Disbursed & Settled',
      refHash: 'cb2083ba891fcd012a'
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

  // Support ticket form inputs
  const [ticketClient, setTicketClient] = useState('')
  const [ticketSubject, setTicketSubject] = useState('')
  const [ticketPriority, setTicketPriority] = useState('medium')
  const [ticketDesc, setTicketDesc] = useState('')
  const [ticketSuccess, setTicketSuccess] = useState(false)

  // Live Chat assistant simulated state
  const [chatMessages, setChatMessages] = useState([
    { sender: 'support', text: 'Welcome to the Melhek Partner Support Desk! How can we assist you with your active client builds today?', time: '09:00 AM' }
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

  // Developer Sandbox states
  const [webhookUrl, setWebhookUrl] = useState('https://apex-marketing.com/api/melhek-hook')
  const [isWebhookModalOpen, setIsWebhookModalOpen] = useState(false)
  const [webhookSecret] = useState('whsec_melhek_8f0a2ba19e830cd1e459')
  const [webhookLogs, setWebhookLogs] = useState<Array<{ timestamp: string, event: string, status: number, payload: string }>>([])
  const [isGeneratingKey, setIsGeneratingKey] = useState(false)
  const [apiKeyCopied, setApiKeyCopied] = useState(false)

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
        agencyName: loginEmail.includes('apex') ? 'Apex Marketing Addis' : 'Yonas Creative Studio',
        contactPerson: loginEmail.includes('apex') ? 'Yonas K.' : 'Makeda T.',
        tier: 'Gold Tier - 12% Payout',
        rate: 12,
        apiKey: 'mk_live_512b90ce8fa9b0cd18e3902ba984',
        clientId: 'cli_9041283',
        balance: 85000,
        withdrawn: 21000
      })
      setIsLoggingIn(false)
    }, 800)
  }

  const handleQuickDemoLogin = () => {
    setLoginError('')
    setIsLoggingIn(true)
    setTimeout(() => {
      setPartnerSession({
        email: 'apex@marketingaddis.com',
        agencyName: 'Apex Marketing Addis',
        contactPerson: 'Yonas K.',
        tier: 'Gold Tier - 12% Payout',
        rate: 12,
        apiKey: 'mk_live_512b90ce8fa9b0cd18e3902ba984',
        clientId: 'cli_9041283',
        balance: 85000,
        withdrawn: 21000
      })
      setIsLoggingIn(false)
    }, 500)
  }

  const handleNewOppSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newOppClient || !newOppIndustry || !newOppBudget || !newOppTimeline || !newOppDesc) return
    setIsOppSubmitting(true)
    setTimeout(() => {
      const budgetLabels: Record<string, string> = {
        standard: 'Standard (Web portals/menu integrations)',
        medium: 'Medium (Ledger / POS sync / Hotel planners)',
        enterprise: 'Enterprise (Clustered databases / custom ERP)'
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
    }, 1000)
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
      }, 2000)
    }, 1200)
  }

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!ticketClient || !ticketSubject || !ticketDesc) return
    const newTkt = {
      id: `TKT-${Math.floor(1000 + Math.random() * 9000)}`,
      client: ticketClient,
      subject: ticketSubject,
      priority: ticketPriority,
      status: 'Open',
      date: new Date().toISOString().split('T')[0],
      lastUpdate: 'Ticket logged. System architect assigned to investigate.'
    }
    setSupportTickets(prev => [newTkt, ...prev])
    setTicketSuccess(true)
    setTicketClient('')
    setTicketSubject('')
    setTicketDesc('')
    setTimeout(() => setTicketSuccess(false), 3000)
  }

  const handleSendChatMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!chatInput.trim()) return
    const userMsg = { sender: 'user', text: chatInput, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    setChatMessages(prev => [...prev, userMsg])
    const promptText = chatInput
    setChatInput('')

    // Simulated Representative Typing & Reply
    setTimeout(() => {
      let replyText = "Understood. Let me forward this detail to our SLA engineering group. An engineer will follow up shortly."
      const lower = promptText.toLowerCase()
      if (lower.includes('telebirr') || lower.includes('chapa') || lower.includes('payment')) {
        replyText = "We are currently investigating Telebirr API callbacks on our Bole gateway instances. Our latest deployment resolves checkout hashing discrepancies."
      } else if (lower.includes('timeline') || lower.includes('delivery') || lower.includes('when')) {
        replyText = "The sprint scope blueprint is locked. Typically, our engineering runs take 6-12 weeks for database-backed systems. You can check the active statuses in your Pipeline Tab."
      } else if (lower.includes('commission') || lower.includes('withdraw') || lower.includes('payout')) {
        replyText = "Withdrawals are disbursed to Telebirr or CBE accounts within 6 business hours of requesting. You will receive a transaction hash in your payout ledger."
      }
      setChatMessages(prev => [...prev, {
        sender: 'support',
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }])
    }, 1000)
  }

  const handleTestWebhook = () => {
    setIsWebhookModalOpen(true)
    const newLog = {
      timestamp: new Date().toISOString(),
      event: 'milestone.completed',
      status: 200,
      payload: JSON.stringify({
        event: 'milestone.completed',
        timestamp: new Date().toISOString(),
        partner: {
          clientId: partnerSession?.clientId || 'cli_9041283',
          agencyName: partnerSession?.agencyName || 'Apex Marketing Addis'
        },
        project: {
          clientName: 'Hilton Addis Ababa',
          milestone: 'Sprint 2 QA Passed',
          estLaunch: 'Aug 12, 2026',
          commissionAccrued: '11,400 ETB'
        }
      }, null, 2)
    }
    setWebhookLogs(prev => [newLog, ...prev])
  }

  const handleCopyRefLink = () => {
    const link = `https://melhek.com/ref?partner=${referralUtm}`
    navigator.clipboard.writeText(link).then(() => {
      setShowCopyTooltip(true)
      setTimeout(() => setShowCopyTooltip(false), 2000)
    })
  }

  const handleCopyApiKey = () => {
    if (!partnerSession) return
    navigator.clipboard.writeText(partnerSession.apiKey).then(() => {
      setApiKeyCopied(true)
      setTimeout(() => setApiKeyCopied(false), 2000)
    })
  }

  const handleRollApiKey = () => {
    if (!partnerSession) return
    setIsGeneratingKey(true)
    setTimeout(() => {
      const array = new Uint8Array(16)
      crypto.getRandomValues(array)
      const newKey = 'mk_live_' + Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('')
      setPartnerSession(prev => prev ? { ...prev, apiKey: newKey } : null)
      setIsGeneratingKey(false)
    }, 1000)
  }

  return (
    <>
      {/* ── CUSTOM PARTNER PORTAL HEADER ── */}
      <nav className="fixed top-4 left-[5vw] right-[5vw] z-[1000] glass rounded-full px-6 py-3 flex items-center justify-between bg-melhek-navy/80 border-white/10 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8 flex items-center justify-center">
            <img src="/logo-light.png" alt="Melhek Logo" className="object-contain w-8 h-8" />
          </div>
          <button 
            onClick={() => setIsDashboardActive(false)}
            className="text-xs sm:text-sm font-syne font-extrabold tracking-tight text-white cursor-pointer bg-transparent border-none text-left"
          >
            Melhek <span className="text-melhek-blue">Partner Portal</span>
          </button>
        </div>
        
        {/* Nav Links */}
        <div className="hidden lg:flex items-center gap-6">
          {!isDashboardActive ? (
            <>
              <a href="#why" className="text-[11px] font-mono font-bold uppercase tracking-wider text-white/50 hover:text-melhek-blue transition-colors">Benefits</a>
              <a href="#capabilities" className="text-[11px] font-mono font-bold uppercase tracking-wider text-white/50 hover:text-melhek-blue transition-colors">Capabilities</a>
              <a href="#models" className="text-[11px] font-mono font-bold uppercase tracking-wider text-white/50 hover:text-melhek-blue transition-colors">Models</a>
              <a href="#faqs" className="text-[11px] font-mono font-bold uppercase tracking-wider text-white/50 hover:text-melhek-blue transition-colors">FAQs</a>
              <a href="#resources" className="text-[11px] font-mono font-bold uppercase tracking-wider text-white/50 hover:text-melhek-blue transition-colors">Resources</a>
            </>
          ) : (
            <>
              <button 
                onClick={() => setDashboardTab('overview')} 
                className={`text-[11px] font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer ${dashboardTab === 'overview' ? 'text-melhek-blue' : 'text-white/50 hover:text-white'}`}
              >
                Overview
              </button>
              <button 
                onClick={() => setDashboardTab('pipeline')} 
                className={`text-[11px] font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer ${dashboardTab === 'pipeline' ? 'text-melhek-blue' : 'text-white/50 hover:text-white'}`}
              >
                Pipeline
              </button>
              <button 
                onClick={() => setDashboardTab('payouts')} 
                className={`text-[11px] font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer ${dashboardTab === 'payouts' ? 'text-melhek-blue' : 'text-white/50 hover:text-white'}`}
              >
                Ledger
              </button>
              <button 
                onClick={() => setDashboardTab('support')} 
                className={`text-[11px] font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer ${dashboardTab === 'support' ? 'text-melhek-blue' : 'text-white/50 hover:text-white'}`}
              >
                SLA Desk
              </button>
              <button 
                onClick={() => setDashboardTab('sandbox')} 
                className={`text-[11px] font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer ${dashboardTab === 'sandbox' ? 'text-melhek-blue' : 'text-white/50 hover:text-white'}`}
              >
                Sandbox
              </button>
            </>
          )}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {isDashboardActive ? (
            <button
              onClick={() => setIsDashboardActive(false)}
              className="btn-secondary !px-4 !py-2 !text-[10px] font-mono uppercase tracking-wider cursor-pointer"
            >
              Program Info
            </button>
          ) : (
            <button
              onClick={() => setIsDashboardActive(true)}
              className="btn-secondary !px-4 !py-2 !text-[10px] font-mono uppercase tracking-wider cursor-pointer animate-pulse"
            >
              Sign In Dashboard
            </button>
          )}
          {partnerSession ? (
            <div className="hidden sm:flex items-center gap-2 bg-melhek-blue/10 border border-melhek-blue/20 rounded-full py-1.5 px-3">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-mono text-white/80 font-bold max-w-[120px] truncate">{partnerSession.agencyName}</span>
            </div>
          ) : (
            <button
              onClick={() => setIsDashboardActive(true)}
              className="btn-primary !px-4 !py-2 !text-[10px] font-mono uppercase tracking-wider cursor-pointer"
            >
              Apply / Login
            </button>
          )}
        </div>
      </nav>

      {/* ── CONDITIONAL WORKSPACE AREA ── */}
      {isDashboardActive ? (
        <div className="grain-overlay" aria-hidden />
      ) : null}

      {isDashboardActive ? (
        // ── WORKSPACE CORE INTERFACES ──
        <div className="relative bg-melhek-dark overflow-x-hidden pt-32 pb-16 min-h-screen">
          
          {partnerSession === null ? (
            // ── SECURE LOGIN OVERLAY ──
            <div className="container mx-auto px-6 max-w-md pt-12 pb-20">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass rounded-[2.5rem] border-white/5 bg-melhek-navy/80 p-8 sm:p-10 shadow-2xl text-left relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-melhek-blue/5 blur-[50px] rounded-full -z-10" />
                
                <div className="text-center mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-melhek-blue/10 border border-melhek-blue/20 flex items-center justify-center mx-auto text-melhek-blue mb-4">
                    <Lock className="w-5 h-5" />
                  </div>
                  <span className="text-[9px] uppercase tracking-widest font-mono text-melhek-blue font-bold">Secure Gateway</span>
                  <h2 className="text-2xl font-display font-extrabold text-white mt-1">B2B Partner Portal</h2>
                  <p className="text-xs text-white/40 mt-1 font-light leading-relaxed">
                    Access client project pipelines, commission balances, and developer API keys.
                  </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                  {loginError && (
                    <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-[11px] font-mono flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      {loginError}
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-wider font-mono text-white/40 ml-2">Partner Email</label>
                    <input
                      type="email"
                      required
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="agency@company.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-xs text-white focus:outline-none focus:border-melhek-blue transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-wider font-mono text-white/40 ml-2">Passcode</label>
                    <input
                      type="password"
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-xs text-white focus:outline-none focus:border-melhek-blue transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoggingIn}
                    className="w-full btn-primary justify-center text-xs uppercase tracking-widest font-mono py-3.5 mt-4"
                  >
                    {isLoggingIn ? (
                      <div className="w-5 h-5 border-2 border-melhek-navy border-t-transparent rounded-full animate-spin" />
                    ) : (
                      'Secure Sign In'
                    )}
                  </button>
                </form>

                <div className="relative flex py-5 items-center">
                  <div className="flex-grow border-t border-white/5"></div>
                  <span className="flex-shrink mx-4 text-[9px] font-mono text-white/20 uppercase tracking-widest">Or Explore Sandbox</span>
                  <div className="flex-grow border-t border-white/5"></div>
                </div>

                <button
                  type="button"
                  onClick={handleQuickDemoLogin}
                  disabled={isLoggingIn}
                  className="w-full bg-melhek-blue/10 border border-melhek-blue/20 hover:bg-melhek-blue/20 transition-all text-melhek-blue font-mono font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Shield className="w-4 h-4" /> Enter Demo Workspace
                </button>
              </motion.div>
            </div>
          ) : (
            // ── SECURE B2B WORKSPACE DASHBOARD ──
            <div className="container mx-auto px-6 max-w-7xl">
              
              {/* Workspace Header Panel */}
              <div className="glass rounded-[2.5rem] border-white/5 bg-melhek-navy/40 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8 text-left relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-melhek-blue/5 blur-[80px] rounded-full -z-10 animate-pulse" />
                
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono px-3 py-1 rounded bg-melhek-blue/10 border border-melhek-blue/20 text-melhek-blue font-bold">
                      B2B Control Panel
                    </span>
                    <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-mono">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      API Gateway: Connected
                    </div>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
                    {partnerSession.agencyName}
                  </h2>
                  <p className="text-xs text-white/40 font-light">
                    Managing Partner: <span className="text-white/60 font-medium">{partnerSession.contactPerson}</span> • Email: <span className="text-white/60 font-medium">{partnerSession.email}</span> • Client ID: <span className="text-white/60 font-mono font-medium">{partnerSession.clientId}</span>
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <div className="text-left md:text-right">
                    <span className="text-[10px] text-white/30 uppercase tracking-widest font-mono block">Tier Level</span>
                    <span className="text-xs font-bold text-white font-mono">{partnerSession.tier}</span>
                  </div>
                  <div className="h-8 w-px bg-white/5 hidden md:block" />
                  <button
                    onClick={() => {
                      setPartnerSession(null)
                      setIsDashboardActive(false)
                    }}
                    className="px-4 py-2.5 bg-white/5 hover:bg-red-500/10 border border-white/10 hover:border-red-500/20 text-white/60 hover:text-red-400 rounded-xl text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" /> Sign Out
                  </button>
                </div>
              </div>

              {/* Grid Dashboard */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                
                {/* Dashboard Sidebar Navigation */}
                <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible gap-2 p-1.5 bg-white/[0.01] border border-white/5 rounded-3xl lg:h-fit scrollbar-none">
                  {([
                    { id: 'overview', label: 'Overview Metrics', icon: Globe },
                    { id: 'pipeline', label: 'Pipeline Projects', icon: Layers },
                    { id: 'payouts', label: 'Commissions & Ledger', icon: CreditCard },
                    { id: 'support', label: 'SLA Support Desk', icon: MessageSquare },
                    { id: 'sandbox', label: 'Developer Sandbox', icon: Terminal }
                  ] as const).map(tab => {
                    const TabIcon = tab.icon
                    const isActive = dashboardTab === tab.id
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setDashboardTab(tab.id)}
                        className={`flex items-center gap-3 px-5 py-3.5 rounded-xl text-xs font-mono font-bold transition-all text-left whitespace-nowrap cursor-pointer flex-1 lg:flex-initial ${
                          isActive 
                            ? 'bg-melhek-blue text-melhek-navy shadow-lg shadow-melhek-blue/15'
                            : 'text-white/50 hover:text-white hover:bg-white/5'
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
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={dashboardTab}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-8"
                    >
                      {/* ── OVERVIEW TAB ── */}
                      {dashboardTab === 'overview' && (
                        <div className="space-y-8">
                          
                          {/* Financial and Project Stats */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="glass p-6 rounded-2xl border-white/5 bg-white/[0.01] flex flex-col justify-between min-h-[120px]">
                              <span className="text-[10px] text-white/40 uppercase tracking-wider font-mono">Pending Commission</span>
                              <span className="text-xl sm:text-2xl font-display font-extrabold text-melhek-blue font-mono">{partnerSession.balance.toLocaleString()} ETB</span>
                              <button 
                                onClick={() => setIsWithdrawModalOpen(true)}
                                className="text-[10px] font-mono text-emerald-400 hover:text-white transition-colors text-left flex items-center gap-1 mt-2"
                              >
                                Withdraw Funds <ArrowRight className="w-3 h-3" />
                              </button>
                            </div>
                            <div className="glass p-6 rounded-2xl border-white/5 bg-white/[0.01] flex flex-col justify-between min-h-[120px]">
                              <span className="text-[10px] text-white/40 uppercase tracking-wider font-mono">Total Paid Out</span>
                              <span className="text-xl sm:text-2xl font-display font-extrabold text-white font-mono">{partnerSession.withdrawn.toLocaleString()} ETB</span>
                              <span className="text-[9px] text-white/30 font-mono mt-2">Disbursed to Telebirr/CBE</span>
                            </div>
                            <div className="glass p-6 rounded-2xl border-white/5 bg-white/[0.01] flex flex-col justify-between min-h-[120px]">
                              <span className="text-[10px] text-white/40 uppercase tracking-wider font-mono">Conversion rate</span>
                              <span className="text-xl sm:text-2xl font-display font-extrabold text-white font-mono">75.0%</span>
                              <span className="text-[9px] text-emerald-400 font-mono mt-2">▲ 4.2% Above Average</span>
                            </div>
                            <div className="glass p-6 rounded-2xl border-white/5 bg-white/[0.01] flex flex-col justify-between min-h-[120px]">
                              <span className="text-[10px] text-white/40 uppercase tracking-wider font-mono">Active Pipelines</span>
                              <span className="text-xl sm:text-2xl font-display font-extrabold text-white font-mono">
                                {opportunities.filter(o => o.statusCode !== 'active').length} Projects
                              </span>
                              <span className="text-[9px] text-white/30 font-mono mt-2">In engineering loop</span>
                            </div>
                          </div>

                          {/* Referral custom link */}
                          <div className="glass p-6 sm:p-8 rounded-[2rem] border-white/5 bg-white/[0.01] space-y-4">
                            <div>
                              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                                <Globe className="w-4 h-4 text-melhek-blue" />
                                Live Referral Link Generator
                              </h3>
                              <p className="text-xs text-white/40 font-light mt-1">
                                Share your custom referral links. Direct signups or site views track to your account, giving you a 10% commission on convert automatically.
                              </p>
                            </div>
                            <div className="flex flex-col sm:flex-row items-stretch gap-3">
                              <div className="relative flex-1">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-mono text-white/30">melhek.com/ref?partner=</span>
                                <input
                                  type="text"
                                  value={referralUtm}
                                  onChange={(e) => setReferralUtm(e.target.value.replace(/[^a-zA-Z0-9_-]/g, ''))}
                                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-40 pr-4 py-3 text-xs text-white font-mono focus:outline-none focus:border-melhek-blue"
                                />
                              </div>
                              <button
                                onClick={handleCopyRefLink}
                                className="px-6 py-3 bg-melhek-blue hover:bg-melhek-blue/90 text-melhek-navy font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer relative"
                              >
                                <Clipboard className="w-4 h-4" /> Copy Referral Link
                                {showCopyTooltip && (
                                  <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-emerald-500 text-white font-mono text-[9px] px-2 py-1 rounded shadow-lg">
                                    Link Copied!
                                  </span>
                                )}
                              </button>
                            </div>
                          </div>

                          {/* Recent logs */}
                          <div className="glass p-6 sm:p-8 rounded-[2rem] border-white/5 bg-white/[0.01] space-y-4">
                            <h3 className="text-sm font-bold text-white flex items-center gap-2">
                              <Terminal className="w-4 h-4 text-melhek-blue" />
                              System Audit Log
                            </h3>
                            <div className="overflow-hidden border border-white/5 rounded-xl">
                              <table className="w-full text-left border-collapse">
                                <thead>
                                  <tr className="bg-white/[0.02] border-b border-white/5 text-[9px] font-mono uppercase tracking-wider text-white/40">
                                    <th className="p-4">Timestamp</th>
                                    <th className="p-4">Event Source</th>
                                    <th className="p-4">System Event Log</th>
                                    <th className="p-4">Outcome</th>
                                  </tr>
                                </thead>
                                <tbody className="text-xs font-light text-white/60 font-mono">
                                  <tr className="border-b border-white/5">
                                    <td className="p-4 text-[10px]">2026-07-10 22:04</td>
                                    <td className="p-4 text-melhek-blue">Webhook Dispatch</td>
                                    <td className="p-4">event milestone.completed logged to Apex webhook</td>
                                    <td className="p-4 text-emerald-400">200 OK</td>
                                  </tr>
                                  <tr className="border-b border-white/5">
                                    <td className="p-4 text-[10px]">2026-07-08 16:30</td>
                                    <td className="p-4 text-white/40">Prisma Client</td>
                                    <td className="p-4">Prescription items indexing query optimized in client schema</td>
                                    <td className="p-4 text-white/50">Successful</td>
                                  </tr>
                                  <tr className="border-b border-white/5">
                                    <td className="p-4 text-[10px]">2026-07-05 10:15</td>
                                    <td className="p-4 text-emerald-400">Commission Ledger</td>
                                    <td className="p-4">Milestone payout disbursed: Happy Optics (TXN-9041)</td>
                                    <td className="p-4 text-emerald-400">Paid out</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>

                        </div>
                      )}

                      {/* ── PIPELINE TAB ── */}
                      {dashboardTab === 'pipeline' && (
                        <div className="space-y-8">
                          
                          {/* Log New Opportunity */}
                          <div className="glass p-6 sm:p-8 rounded-[2rem] border-white/5 bg-white/[0.01] space-y-6">
                            <div>
                              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                                <Plus className="w-4.5 h-4.5 text-melhek-blue" />
                                Register Client Opportunity
                              </h3>
                              <p className="text-xs text-white/40 font-light mt-1">
                                Secure technical scoping blueprints and pricing cards for your clients. Submission triggers internal scoping runs within 12 hours.
                              </p>
                            </div>

                            {newOppSuccess ? (
                              <div className="p-6 rounded-xl bg-melhek-blue/5 border border-melhek-blue/20 text-center space-y-2">
                                <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto" />
                                <h4 className="text-xs font-bold text-white">Project Logged Successful</h4>
                                <p className="text-[11px] text-white/40">The client opportunity has been added to your live pipeline and scoped.</p>
                              </div>
                            ) : (
                              <form onSubmit={handleNewOppSubmit} className="space-y-4">
                                <div className="grid md:grid-cols-2 gap-4">
                                  <div className="space-y-1">
                                    <label className="text-[9px] uppercase tracking-wider font-mono text-white/40 ml-2">Client Name / Alias *</label>
                                    <input
                                      type="text"
                                      required
                                      value={newOppClient}
                                      onChange={(e) => setNewOppClient(e.target.value)}
                                      placeholder="e.g. Bole Pharmacy Group"
                                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-melhek-blue"
                                    />
                                  </div>
                                  <div className="space-y-1">
                                    <label className="text-[9px] uppercase tracking-wider font-mono text-white/40 ml-2">Client Industry *</label>
                                    <select
                                      required
                                      value={newOppIndustry}
                                      onChange={(e) => setNewOppIndustry(e.target.value)}
                                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white/80 focus:outline-none focus:border-melhek-blue appearance-none bg-melhek-dark"
                                    >
                                      <option value="" disabled>Select Sector</option>
                                      <option value="Hospitality">Hospitality & Dining</option>
                                      <option value="Healthcare">Healthcare & Clinics</option>
                                      <option value="Retail">Retail & POS Systems</option>
                                      <option value="Automotive">Automotive & Import</option>
                                      <option value="Services">Professional Services</option>
                                      <option value="Other">Other Sector</option>
                                    </select>
                                  </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                  <div className="space-y-1">
                                    <label className="text-[9px] uppercase tracking-wider font-mono text-white/40 ml-2">Budget tier *</label>
                                    <select
                                      required
                                      value={newOppBudget}
                                      onChange={(e) => setNewOppBudget(e.target.value)}
                                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white/80 focus:outline-none focus:border-melhek-blue appearance-none bg-melhek-dark"
                                    >
                                      <option value="" disabled>Select Budget Tier</option>
                                      <option value="standard">Standard (Web portals/menu integrations)</option>
                                      <option value="medium">Medium (Ledger / POS sync / Hotel planners)</option>
                                      <option value="enterprise">Enterprise (Clustered databases / custom ERP)</option>
                                    </select>
                                  </div>
                                  <div className="space-y-1">
                                    <label className="text-[9px] uppercase tracking-wider font-mono text-white/40 ml-2">Timeline expectation *</label>
                                    <select
                                      required
                                      value={newOppTimeline}
                                      onChange={(e) => setNewOppTimeline(e.target.value)}
                                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white/80 focus:outline-none focus:border-melhek-blue appearance-none bg-melhek-dark"
                                    >
                                      <option value="" disabled>Select Timeline</option>
                                      <option value="speed">Speed delivery (2 – 4 Weeks)</option>
                                      <option value="standard">Standard Delivery (6 – 10 Weeks)</option>
                                      <option value="enterprise">Multi-phase deployment (3+ Months)</option>
                                    </select>
                                  </div>
                                </div>

                                <div className="space-y-1">
                                  <label className="text-[9px] uppercase tracking-wider font-mono text-white/40 ml-2">Project Scope Description *</label>
                                  <textarea
                                    required
                                    rows={3}
                                    value={newOppDesc}
                                    onChange={(e) => setNewOppDesc(e.target.value)}
                                    placeholder="Specify details, databases, local APIs (Telebirr, CBE) and special logic gates..."
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-xs text-white focus:outline-none focus:border-melhek-blue resize-none"
                                  />
                                </div>

                                <button
                                  type="submit"
                                  disabled={isOppSubmitting}
                                  className="w-full btn-primary justify-center text-xs uppercase tracking-widest font-mono py-3 mt-2"
                                >
                                  {isOppSubmitting ? (
                                    <div className="w-5 h-5 border-2 border-melhek-navy border-t-transparent rounded-full animate-spin" />
                                  ) : (
                                    'Submit Project Scope to Scoping Room →'
                                  )}
                                </button>
                              </form>
                            )}
                          </div>

                          {/* Opportunities Pipelines */}
                          <div className="space-y-4">
                            <h3 className="text-sm font-bold text-white flex items-center gap-2">
                              <Layers className="w-4.5 h-4.5 text-melhek-blue" />
                              Active Project Pipelines
                            </h3>

                            {opportunities.map((opp) => (
                              <div key={opp.id} className="glass p-6 rounded-3xl border-white/5 bg-white/[0.01] space-y-4">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                  <div>
                                    <div className="flex items-center gap-2.5">
                                      <h4 className="text-base font-bold text-white">{opp.clientName}</h4>
                                      <span className={`text-[9px] font-mono px-2 py-0.5 rounded border ${
                                        opp.statusCode === 'active' 
                                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                          : opp.statusCode === 'qa'
                                          ? 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                                          : opp.statusCode === 'dev'
                                          ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                                          : 'bg-orange-500/10 text-orange-400 border-orange-500/20'
                                      }`}>
                                        {opp.status}
                                      </span>
                                    </div>
                                    <p className="text-[11px] text-white/40 font-mono mt-0.5">
                                      Industry: {opp.industry} • Budget: {opp.budgetLabel} • Submitted: {opp.dateAdded}
                                    </p>
                                  </div>
                                  <div className="text-left sm:text-right">
                                    <span className="text-[9px] text-white/30 font-mono block">Estimated Launch</span>
                                    <span className="text-xs font-bold text-white font-mono">{opp.estLaunch}</span>
                                  </div>
                                </div>

                                <p className="text-xs text-white/60 font-light leading-relaxed">
                                  {opp.description}
                                </p>

                                {/* Visual pipeline pipeline */}
                                <div className="pt-2">
                                  <span className="text-[9px] text-white/30 uppercase tracking-widest font-mono block mb-2.5">
                                    Milestone Progression Pipeline
                                  </span>
                                  <div className="grid grid-cols-6 gap-1 text-center font-mono text-[8px] text-white/40">
                                    {[
                                      { name: 'Scoping', active: true },
                                      { name: 'Blueprint', active: ['dev', 'qa', 'active'].includes(opp.statusCode) },
                                      { name: 'Dev Sprints', active: ['dev', 'qa', 'active'].includes(opp.statusCode) },
                                      { name: 'QA Verify', active: ['qa', 'active'].includes(opp.statusCode) },
                                      { name: 'Production', active: opp.statusCode === 'active' },
                                      { name: 'SLA Support', active: opp.statusCode === 'active' }
                                    ].map((step, i) => (
                                      <div key={i} className="space-y-1">
                                        <div className={`h-1.5 rounded-full ${
                                          step.active 
                                            ? 'bg-melhek-blue shadow-[0_0_8px_rgba(127,169,255,0.4)]' 
                                            : 'bg-white/5'
                                        }`} />
                                        <span className={step.active ? 'text-melhek-blue font-bold' : ''}>{step.name}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                                  <span className="text-white/30">Client SLA: Yes (L2 Silent support)</span>
                                  <span className="text-emerald-400 font-bold">Commission Accrued: {opp.commission}</span>
                                </div>
                              </div>
                            ))}
                          </div>

                        </div>
                      )}

                      {/* ── PAYOUTS TAB ── */}
                      {dashboardTab === 'payouts' && (
                        <div className="space-y-8">
                          
                          {/* Financial Ledger card */}
                          <div className="glass p-6 sm:p-8 rounded-[2rem] border-white/5 bg-white/[0.01] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                            <div className="space-y-1">
                              <span className="text-[10px] text-white/40 uppercase tracking-wider font-mono">Total Ledger Balance</span>
                              <h3 className="text-3xl font-display font-extrabold text-white font-mono">
                                {(partnerSession.balance + partnerSession.withdrawn).toLocaleString()} ETB
                              </h3>
                              <p className="text-xs text-white/40 font-light">
                                Balance pending cash withdrawal: <span className="text-melhek-blue font-bold font-mono">{partnerSession.balance.toLocaleString()} ETB</span>
                              </p>
                            </div>
                            <button
                              onClick={() => {
                                setWithdrawError('')
                                setIsWithdrawModalOpen(true)
                              }}
                              className="px-6 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-melhek-navy font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-lg shadow-emerald-500/10"
                            >
                              <CreditCard className="w-4 h-4" /> Request Cash Out
                            </button>
                          </div>

                          {/* Payout History Ledger */}
                          <div className="glass p-6 sm:p-8 rounded-[2rem] border-white/5 bg-white/[0.01] space-y-4">
                            <h3 className="text-sm font-bold text-white flex items-center gap-2">
                              <CreditCard className="w-4.5 h-4.5 text-melhek-blue" />
                              Commission Disbursements Ledger
                            </h3>

                            <div className="overflow-hidden border border-white/5 rounded-xl">
                              <table className="w-full text-left border-collapse">
                                <thead>
                                  <tr className="bg-white/[0.02] border-b border-white/5 text-[9px] font-mono uppercase tracking-wider text-white/40">
                                    <th className="p-4">Transaction ID</th>
                                    <th className="p-4">Disbursement Date</th>
                                    <th className="p-4">Withdrawal Channel</th>
                                    <th className="p-4">Amount</th>
                                    <th className="p-4">Verification Status</th>
                                    <th className="p-4">Reference Hash</th>
                                  </tr>
                                </thead>
                                <tbody className="text-xs text-white/60 font-mono">
                                  {payouts.map((txn) => (
                                    <tr key={txn.id} className="border-b border-white/5 hover:bg-white/[0.01] transition-colors">
                                      <td className="p-4 font-bold text-white">{txn.id}</td>
                                      <td className="p-4">{txn.date}</td>
                                      <td className="p-4 text-white/50">{txn.channel}</td>
                                      <td className="p-4 text-white font-bold">{txn.amount.toLocaleString()} ETB</td>
                                      <td className="p-4">
                                        <span className={`text-[9px] px-2 py-0.5 rounded font-mono ${
                                          txn.status === 'Disbursed & Settled'
                                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                            : 'bg-orange-500/10 text-orange-400 border border-orange-500/20 animate-pulse'
                                        }`}>
                                          {txn.status}
                                        </span>
                                      </td>
                                      <td className="p-4 text-[10px] text-white/40 truncate max-w-[120px]" title={txn.refHash}>
                                        {txn.refHash}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>

                        </div>
                      )}

                      {/* ── SUPPORT TAB ── */}
                      {dashboardTab === 'support' && (
                        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                          
                          {/* SLA support and ticket logs */}
                          <div className="lg:col-span-3 space-y-6">
                            
                            {/* Log ticket */}
                            <div className="glass p-6 sm:p-8 rounded-[2rem] border-white/5 bg-white/[0.01] space-y-5">
                              <div>
                                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                                  <Briefcase className="w-4.5 h-4.5 text-melhek-blue" />
                                  Log SLA Support Ticket
                                </h3>
                                <p className="text-xs text-white/40 font-light mt-1">
                                  File system bugs, database overrides or local API failures. Melhek logs level-2 response runs within 4 hours.
                                </p>
                              </div>

                              {ticketSuccess ? (
                                <div className="p-5 rounded-xl bg-melhek-blue/5 border border-melhek-blue/20 text-center space-y-2">
                                  <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto" />
                                  <h4 className="text-xs font-bold text-white">Ticket Filed</h4>
                                  <p className="text-[11px] text-white/40">Our L2 engineer has been assigned and is running tests.</p>
                                </div>
                              ) : (
                                <form onSubmit={handleTicketSubmit} className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                      <label className="text-[9px] uppercase tracking-wider font-mono text-white/40 ml-2">Active Client *</label>
                                      <input
                                        type="text"
                                        required
                                        value={ticketClient}
                                        onChange={(e) => setTicketClient(e.target.value)}
                                        placeholder="e.g. Hilton Addis"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-melhek-blue"
                                      />
                                    </div>
                                    <div className="space-y-1">
                                      <label className="text-[9px] uppercase tracking-wider font-mono text-white/40 ml-2">Priority *</label>
                                      <select
                                        required
                                        value={ticketPriority}
                                        onChange={(e) => setTicketPriority(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white/80 focus:outline-none focus:border-melhek-blue appearance-none bg-melhek-dark"
                                      >
                                        <option value="low">Low (General Scoping)</option>
                                        <option value="medium">Medium (Dashboard anomalies)</option>
                                        <option value="high">High (API/Checkout Blockers)</option>
                                      </select>
                                    </div>
                                  </div>

                                  <div className="space-y-1">
                                    <label className="text-[9px] uppercase tracking-wider font-mono text-white/40 ml-2">Subject Header *</label>
                                    <input
                                      type="text"
                                      required
                                      value={ticketSubject}
                                      onChange={(e) => setTicketSubject(e.target.value)}
                                      placeholder="e.g. Telebirr API callback timeouts"
                                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-melhek-blue"
                                    />
                                  </div>

                                  <div className="space-y-1">
                                    <label className="text-[9px] uppercase tracking-wider font-mono text-white/40 ml-2">Detailed Bug report *</label>
                                    <textarea
                                      required
                                      rows={3}
                                      value={ticketDesc}
                                      onChange={(e) => setTicketDesc(e.target.value)}
                                      placeholder="Describe the anomalies, console errors and steps to reproduce..."
                                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-xs text-white focus:outline-none focus:border-melhek-blue resize-none"
                                    />
                                  </div>

                                  <button
                                    type="submit"
                                    className="w-full btn-primary justify-center text-xs uppercase tracking-widest font-mono py-3 mt-1"
                                  >
                                    Disptach SLA Support Ticket →
                                  </button>
                                </form>
                              )}
                            </div>

                            {/* Ticket history */}
                            <div className="space-y-3">
                              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white/50 pl-2">Support Ticket Logs</h4>
                              {supportTickets.map((tkt) => (
                                <div key={tkt.id} className="glass p-5 rounded-2xl border-white/5 bg-white/[0.01] space-y-2">
                                  <div className="flex items-center justify-between text-xs font-mono">
                                    <span className="font-bold text-white">{tkt.id} • {tkt.client}</span>
                                    <span className={`text-[9px] px-2 py-0.5 rounded border ${
                                      tkt.status === 'Resolved'
                                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                        : 'bg-orange-500/10 text-orange-400 border-orange-500/20 animate-pulse'
                                    }`}>
                                      {tkt.status}
                                    </span>
                                  </div>
                                  <h5 className="text-xs text-white font-medium">{tkt.subject}</h5>
                                  <div className="pt-2 border-t border-white/5 text-[10px] text-white/40 font-mono">
                                    <span className="text-melhek-blue block">Engineer Update:</span>
                                    <p className="mt-0.5 leading-relaxed font-light">{tkt.lastUpdate}</p>
                                  </div>
                                </div>
                              ))}
                            </div>

                          </div>

                          {/* Live simulated console chat */}
                          <div className="lg:col-span-2 glass rounded-[2rem] border-white/5 bg-white/[0.01] flex flex-col h-[520px] overflow-hidden">
                            <div className="p-4 bg-white/[0.02] border-b border-white/5 text-left">
                              <div className="flex items-center gap-2">
                                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                                <div>
                                  <span className="text-xs font-bold text-white block">Melhek Partner Manager</span>
                                  <span className="text-[9px] font-mono text-white/40 block">Response loop: Active</span>
                                </div>
                              </div>
                            </div>

                            {/* Chat messages */}
                            <div className="flex-1 p-4 overflow-y-auto space-y-3.5 flex flex-col">
                              {chatMessages.map((msg, i) => (
                                <div 
                                  key={i} 
                                  className={`max-w-[85%] rounded-2xl p-3.5 text-xs text-left ${
                                    msg.sender === 'support' 
                                      ? 'bg-white/5 text-white/80 self-start border border-white/5'
                                      : 'bg-melhek-blue text-melhek-navy font-medium self-end'
                                  }`}
                                >
                                  <p className="leading-relaxed">{msg.text}</p>
                                  <span className={`text-[8px] font-mono block mt-1 text-right ${msg.sender === 'support' ? 'text-white/30' : 'text-melhek-navy/55'}`}>
                                    {msg.time}
                                  </span>
                                </div>
                              ))}
                            </div>

                            {/* Chat input */}
                            <form onSubmit={handleSendChatMessage} className="p-3 border-t border-white/5 bg-black/20 flex gap-2">
                              <input
                                type="text"
                                value={chatInput}
                                onChange={(e) => setChatInput(e.target.value)}
                                placeholder="Type a message or keyword..."
                                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-melhek-blue"
                              />
                              <button
                                type="submit"
                                className="w-10 h-10 rounded-xl bg-melhek-blue hover:bg-melhek-blue/90 text-melhek-navy flex items-center justify-center flex-shrink-0 cursor-pointer"
                              >
                                <Send className="w-4 h-4" />
                              </button>
                            </form>
                          </div>

                        </div>
                      )}

                      {/* ── SANDBOX TAB ── */}
                      {dashboardTab === 'sandbox' && (
                        <div className="space-y-8">
                          
                          {/* API keys credentials */}
                          <div className="glass p-6 sm:p-8 rounded-[2rem] border-white/5 bg-white/[0.01] space-y-4">
                            <div>
                              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                                <Key className="w-4.5 h-4.5 text-melhek-blue" />
                                API Credentials & Sandbox Authorization
                              </h3>
                              <p className="text-xs text-white/40 font-light mt-1">
                                Secure partner credentials for querying active project metrics or integrating client CRM sync systems.
                              </p>
                            </div>
                            
                            <div className="space-y-3 pt-2">
                              <div className="space-y-1">
                                <span className="text-[9px] uppercase tracking-wider font-mono text-white/40 ml-1">Live Partner API Token</span>
                                <div className="flex gap-2">
                                  <input
                                    type="text"
                                    readOnly
                                    value={partnerSession.apiKey}
                                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white font-mono select-all focus:outline-none"
                                  />
                                  <button
                                    onClick={handleCopyApiKey}
                                    className="px-5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer relative"
                                  >
                                    <Clipboard className="w-4 h-4" /> Copy
                                    {apiKeyCopied && (
                                      <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-emerald-500 text-white font-mono text-[9px] px-2 py-1 rounded shadow-lg">
                                        Copied!
                                      </span>
                                    )}
                                  </button>
                                  <button
                                    onClick={handleRollApiKey}
                                    disabled={isGeneratingKey}
                                    className="px-5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer relative disabled:opacity-50"
                                    title="Regenerate API Token"
                                  >
                                    <RefreshCw className={`w-4 h-4 ${isGeneratingKey ? 'animate-spin' : ''}`} />
                                    {isGeneratingKey ? 'Rolling...' : 'Roll Key'}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Webhooks configuration */}
                          <div className="glass p-6 sm:p-8 rounded-[2rem] border-white/5 bg-white/[0.01] space-y-6">
                            <div>
                              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                                <Terminal className="w-4.5 h-4.5 text-melhek-blue" />
                                Active Webhook Config
                              </h3>
                              <p className="text-xs text-white/40 font-light mt-1">
                                Register webhooks to capture system events (e.g. milestone check-ins, launch approvals) dispatched to your agency database.
                              </p>
                            </div>

                            <div className="space-y-4">
                              <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                  <span className="text-[9px] uppercase tracking-wider font-mono text-white/40 ml-1">Webhook Endpoint URL</span>
                                  <input
                                    type="url"
                                    value={webhookUrl}
                                    onChange={(e) => setWebhookUrl(e.target.value)}
                                    placeholder="https://agency.com/api/melhek-webhook"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-xs text-white font-mono focus:outline-none focus:border-melhek-blue"
                                  />
                                </div>
                                <div className="space-y-1">
                                  <span className="text-[9px] uppercase tracking-wider font-mono text-white/40 ml-1">Signing Secret (Auto-generated)</span>
                                  <input
                                    type="text"
                                    readOnly
                                    value={webhookSecret}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-xs text-white font-mono select-all focus:outline-none opacity-60"
                                  />
                                </div>
                              </div>

                              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                                <span className="text-[10px] text-white/30 font-mono">Payload format: JSON POST request with HMAC-SHA256 headers.</span>
                                <button
                                  type="button"
                                  onClick={handleTestWebhook}
                                  className="px-6 py-3 bg-melhek-blue hover:bg-melhek-blue/90 text-melhek-navy font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                                >
                                  <RefreshCw className="w-4 h-4" /> Trigger Test Payload
                                </button>
                              </div>
                            </div>

                            {/* Webhook logs */}
                            {webhookLogs.length > 0 && (
                              <div className="space-y-3 pt-4 border-t border-white/5">
                                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white/50 pl-1">Webhook Event Logs</h4>
                                <div className="overflow-hidden border border-white/5 rounded-xl">
                                  <table className="w-full text-left border-collapse">
                                    <thead>
                                      <tr className="bg-white/[0.02] border-b border-white/5 text-[9px] font-mono uppercase tracking-wider text-white/40">
                                        <th className="p-4">Timestamp</th>
                                        <th className="p-4">Event Code</th>
                                        <th className="p-4">Dispatch Status</th>
                                        <th className="p-4 text-right">Details</th>
                                      </tr>
                                    </thead>
                                    <tbody className="text-xs text-white/60 font-mono">
                                      {webhookLogs.map((log, i) => (
                                        <tr key={i} className="border-b border-white/5 hover:bg-white/[0.01] transition-colors">
                                          <td className="p-4 text-[10px]">{log.timestamp}</td>
                                          <td className="p-4 font-bold text-white">{log.event}</td>
                                          <td className="p-4 text-emerald-400">200 OK (Resolved)</td>
                                          <td className="p-4 text-right">
                                            <button 
                                              onClick={() => setIsWebhookModalOpen(true)}
                                              className="text-[10px] font-mono text-melhek-blue hover:text-white transition-colors cursor-pointer"
                                            >
                                              Inspect Payload →
                                            </button>
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            )}

                          </div>

                        </div>
                      )}

                    </motion.div>
                  </AnimatePresence>
                </div>

              </div>

            </div>
          )}

          {/* ── CASH WITHDRAWAL GATEWAY MODAL ── */}
          <AnimatePresence>
            {isWithdrawModalOpen && (
              <div className="fixed inset-0 z-[99999] flex items-center justify-center px-4">
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsWithdrawModalOpen(false)}
                  className="absolute inset-0 bg-black/85 backdrop-blur-sm"
                />
                
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  className="relative w-full max-w-md glass border-white/15 rounded-[2.5rem] bg-melhek-navy/95 p-8 shadow-2xl z-10 text-left"
                >
                  <button
                    onClick={() => setIsWithdrawModalOpen(false)}
                    className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors cursor-pointer"
                    aria-label="Close modal"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <div className="flex items-center gap-3.5 mb-6">
                    <div className="w-11 h-11 rounded-xl bg-melhek-blue/15 border border-melhek-blue/25 flex items-center justify-center text-melhek-blue">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[9px] uppercase tracking-widest font-mono text-melhek-blue font-bold">Payout Gateway</span>
                      <h3 className="text-xl font-display font-extrabold text-white leading-none">Commission Cash Out</h3>
                    </div>
                  </div>

                  {withdrawSuccess ? (
                    <div className="p-6 rounded-2xl bg-melhek-blue/5 border border-melhek-blue/20 text-center space-y-4">
                      <div className="w-12 h-12 rounded-full bg-melhek-blue/10 flex items-center justify-center mx-auto text-melhek-blue">
                        <Check className="w-6 h-6 animate-bounce" />
                      </div>
                      <h4 className="text-base font-bold text-white">Disbursement Initiated</h4>
                      <p className="text-xs text-white/40 max-w-sm mx-auto leading-relaxed font-light">
                        Withdrawal transaction logged successfully. Cash payouts transfer to your designated wallet within 6 business hours.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleWithdrawalSubmit} className="space-y-4">
                      {withdrawError && (
                        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-mono">
                          {withdrawError}
                        </div>
                      )}

                      <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-xs text-white/40 font-mono flex justify-between">
                        <span>Ledger Balance:</span>
                        <span className="text-white font-bold">{partnerSession?.balance.toLocaleString()} ETB</span>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[9px] uppercase tracking-wider font-mono text-white/40 ml-2">Transfer Amount (ETB) *</label>
                        <input
                          type="number"
                          required
                          value={withdrawAmount}
                          onChange={(e) => setWithdrawAmount(e.target.value)}
                          placeholder="e.g. 15000"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-melhek-blue"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[9px] uppercase tracking-wider font-mono text-white/40 ml-2">Withdrawal Channel *</label>
                        <select
                          value={withdrawChannel}
                          onChange={(e) => setWithdrawChannel(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white/80 focus:outline-none focus:border-melhek-blue appearance-none bg-melhek-navy"
                        >
                          <option value="telebirr">Telebirr Wallet</option>
                          <option value="cbe">CBE Birr Account</option>
                          <option value="chapa">Chapa Payout Direct</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[9px] uppercase tracking-wider font-mono text-white/40 ml-2">Wallet / Account Number *</label>
                        <input
                          type="text"
                          required
                          value={withdrawAccount}
                          onChange={(e) => setWithdrawAccount(e.target.value)}
                          placeholder={withdrawChannel === 'telebirr' ? '+2519...' : 'Account number...'}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-melhek-blue"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isWithdrawPending}
                        className="w-full btn-primary justify-center text-xs uppercase tracking-widest font-mono py-3.5 mt-2"
                      >
                        {isWithdrawPending ? (
                          <div className="w-5 h-5 border-2 border-melhek-navy border-t-transparent rounded-full animate-spin" />
                        ) : (
                          'Confirm Cash Disbursement →'
                        )}
                      </button>
                    </form>
                  )}
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* ── WEBHOOK PAYLOAD INSPECTION MODAL ── */}
          <AnimatePresence>
            {isWebhookModalOpen && (
              <div className="fixed inset-0 z-[99999] flex items-center justify-center px-4">
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsWebhookModalOpen(false)}
                  className="absolute inset-0 bg-black/85 backdrop-blur-sm"
                />
                
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  className="relative w-full max-w-lg glass border-white/15 rounded-[2.5rem] bg-melhek-navy/95 p-8 shadow-2xl z-10 text-left"
                >
                  <button
                    onClick={() => setIsWebhookModalOpen(false)}
                    className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors cursor-pointer"
                    aria-label="Close modal"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <div className="flex items-center gap-3.5 mb-6">
                    <div className="w-11 h-11 rounded-xl bg-melhek-blue/15 border border-melhek-blue/25 flex items-center justify-center text-melhek-blue">
                      <Terminal className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[9px] uppercase tracking-widest font-mono text-melhek-blue font-bold">API Logs</span>
                      <h3 className="text-xl font-display font-extrabold text-white leading-none">Webhook Dispatch Payload</h3>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <p className="text-xs text-white/50 leading-relaxed font-light">
                      This JSON payload is dispatched as a <code className="bg-white/5 px-1.5 py-0.5 rounded text-white font-mono text-[10px]">POST</code> request to your webhook endpoint with security header signatures:
                    </p>

                    <div className="bg-black/40 border border-white/5 rounded-2xl p-5 overflow-x-auto max-h-[300px]">
                      <pre className="text-[10px] text-melhek-blue font-mono leading-relaxed">
                        {webhookLogs[0]?.payload || `{ "status": "no event logs recorded" }`}
                      </pre>
                    </div>

                    <div className="pt-2 flex items-center justify-between text-[10px] font-mono text-white/40">
                      <span>Header: x-melhek-signature-256</span>
                      <span className="text-emerald-400">Response Code: 200 OK</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

        </div>
      ) : (
        // ── ORIGINAL PROGRAM OVERVIEW (LANDING PAGE VIEW) ──
        <div className="container mx-auto px-6 space-y-36 pt-16">
        
        {/* ── HERO SECTION ── */}
        <section className="relative pt-12 pb-20 flex flex-col lg:flex-row items-center justify-between gap-12 max-w-7xl mx-auto">
          <div className="digital-grid -z-10" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-melhek-blue/10 blur-[130px] rounded-full -z-10 animate-pulse" />
          
          <div className="flex-1 space-y-8 text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 text-melhek-blue border border-melhek-blue/20 bg-melhek-blue/5 rounded-full px-4 py-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-melhek-blue animate-pulse" />
              <span className="text-[10px] uppercase tracking-[0.35em] font-mono font-bold">Agency Partner Network</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold text-white tracking-tight leading-[1.1]">
              Scale Your Agency <br />
              <span className="text-gradient">Without Expanding</span> <br />
              Your Technical Team.
            </h1>

            <p className="text-white/50 text-sm sm:text-base leading-relaxed font-light">
              Melhek Technologies acts as your elite engineering arm. We deliver premium corporate websites, inventory management databases, direct booking systems, and custom AI tools—fully white-labeled under your brand.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4">
              <a 
                href="#apply" 
                className="btn-primary flex items-center gap-2.5 text-xs uppercase tracking-widest font-mono py-4 px-8 w-full sm:w-auto justify-center"
              >
                Become a Partner <ArrowRight className="w-4 h-4" />
              </a>
              <button 
                onClick={() => setIsDashboardActive(true)} 
                className="btn-secondary text-xs uppercase tracking-widest font-mono py-4 px-8 w-full sm:w-auto text-center cursor-pointer"
              >
                Access Partner Workspace
              </button>
            </div>
          </div>

          {/* Hero Vector Illustration */}
          <div className="flex-1 w-full max-w-lg lg:max-w-xl h-[350px] sm:h-[450px] relative flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-tr from-melhek-blue/5 to-transparent rounded-[3rem] border border-white/5" />
            <svg className="w-4/5 h-4/5 text-white/5" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="grid-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#7FA9FF" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#7FA9FF" stopOpacity="0.02" />
                </linearGradient>
              </defs>
              {/* Background Grid Mesh */}
              <circle cx="100" cy="100" r="80" stroke="url(#grid-grad)" strokeWidth="1" strokeDasharray="4 4" />
              <circle cx="100" cy="100" r="50" stroke="url(#grid-grad)" strokeWidth="1" />
              
              {/* Interconnecting Lines */}
              <line x1="30" y1="100" x2="170" y2="100" stroke="url(#grid-grad)" strokeWidth="1.5" />
              <line x1="100" y1="30" x2="100" y2="170" stroke="url(#grid-grad)" strokeWidth="1.5" />
              <line x1="50" y1="50" x2="150" y2="150" stroke="url(#grid-grad)" strokeWidth="1" />
              <line x1="150" y1="50" x2="50" y2="150" stroke="url(#grid-grad)" strokeWidth="1" />

              {/* Glowing Active Nodes */}
              <circle cx="100" cy="100" r="6" fill="#7FA9FF" className="animate-ping" style={{ transformOrigin: 'center' }} />
              <circle cx="100" cy="100" r="4" fill="#7FA9FF" />

              <circle cx="50" cy="50" r="3" fill="#7FA9FF" />
              <circle cx="150" cy="50" r="3" fill="#7FA9FF" />
              <circle cx="150" cy="150" r="3" fill="#7FA9FF" />
              <circle cx="50" cy="150" r="3" fill="#7FA9FF" />

              <circle cx="30" cy="100" r="3" fill="#7FA9FF" />
              <circle cx="170" cy="100" r="3" fill="#7FA9FF" />
            </svg>

            {/* Floating badge cards */}
            <div className="absolute top-8 left-8 glass border-white/10 rounded-2xl p-4 flex items-center gap-3 shadow-2xl animate-bounce" style={{ animationDuration: '6s' }}>
              <div className="w-8 h-8 rounded-lg bg-melhek-blue/15 flex items-center justify-center text-melhek-blue">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[9px] uppercase tracking-widest font-mono text-white/40 block">Quality Standard</span>
                <span className="text-xs font-bold text-white block">White-Label Delivery</span>
              </div>
            </div>

            <div className="absolute bottom-8 right-8 glass border-white/10 rounded-2xl p-4 flex items-center gap-3 shadow-2xl animate-bounce" style={{ animationDuration: '8s', animationDelay: '1s' }}>
              <div className="w-8 h-8 rounded-lg bg-[#061b11] border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Zap className="w-4 h-4 animate-pulse" />
              </div>
              <div>
                <span className="text-[9px] uppercase tracking-widest font-mono text-white/40 block">Velocity Scale</span>
                <span className="text-xs font-bold text-white block">AI-Assisted Uptime</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── WHY AGENCIES PARTNER SECTION ── */}
        <section id="why" className="space-y-16 max-w-7xl mx-auto scroll-mt-28">
          <div className="max-w-3xl">
            <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-white mb-4">
              Why Agencies Align with Melhek
            </h2>
            <p className="text-white/40 text-xs sm:text-sm leading-relaxed max-w-2xl font-light">
              We operate as a silent, specialized engine. By matching your client relationship with our technical systems, you lock in higher margins, eliminate hiring bottlenecks, and build trust.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { 
                title: 'White Label Delivery', 
                icon: Shield, 
                desc: 'All platforms are designed under your logo. We use your project templates, Slack channels, or email domains. Your client never knows Melhek is involved.' 
              },
              { 
                title: 'Business System Expertise', 
                icon: Layers, 
                desc: 'We bypass generic website configurations. We build robust booking engines, cashier ledgers, internal employee panels, and specialized POS integrations.' 
              },
              { 
                title: 'AI Accelerated Development', 
                icon: Cpu, 
                desc: 'We utilize pre-tested architecture skeletons and modern AI testing suites to prototype and build systems at twice the speed of traditional agencies.' 
              },
              { 
                title: 'Fast & Reliable Delivery', 
                icon: Zap, 
                desc: 'No vague deadlines. We provide detailed scope specifications with fixed timeline delivery dates. If we promise a portal in 6 weeks, it launches in 6 weeks.' 
              },
              { 
                title: 'Transparent Communication', 
                icon: MessageSquare, 
                desc: 'Direct communication channels with your account manager and technical lead. No agency speak—just clear milestone check-ins and direct status logs.' 
              },
              { 
                title: 'Dedicated Technical Support', 
                icon: Server, 
                desc: 'We back you up with robust post-launch SLA contracts. We act as your Level 2 developer desk, maintaining servers and APIs silently behind the scenes.' 
              }
            ].map((item, index) => {
              const Icon = item.icon
              return (
                <div 
                  key={index} 
                  className="glass rounded-3xl border-white/5 p-8 flex flex-col justify-between min-h-[220px] hover:border-melhek-blue/30 transition-all group"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-melhek-blue/10 border border-melhek-blue/20 flex items-center justify-center text-melhek-blue mb-6 group-hover:bg-melhek-blue group-hover:text-melhek-navy transition-all duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-xs text-white/40 leading-relaxed font-light">{item.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* ── WHAT WE BUILD (INTERACTIVE MODALS) ── */}
        <section id="capabilities" className="space-y-16 max-w-7xl mx-auto scroll-mt-28">
          <div className="max-w-3xl">
            <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-white mb-4">
              System & Scope Capabilities
            </h2>
            <p className="text-white/40 text-xs sm:text-sm leading-relaxed max-w-2xl font-light">
              We engineer high-performance systems for a wide variety of business operations. Click on any capability card below to explore technical stacks, specifications, and typical timelines.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {BUILD_CARDS.map((card) => {
              const Icon = card.icon
              return (
                <button
                  key={card.id}
                  type="button"
                  onClick={() => setActiveModalCard(card)}
                  className="text-left p-6 rounded-2xl glass border-white/5 hover:border-melhek-blue/30 transition-all flex flex-col justify-between h-[180px] cursor-pointer group"
                >
                  <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/80 group-hover:text-melhek-blue group-hover:border-melhek-blue/20 transition-all">
                    <Icon className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white mb-1">{card.title}</h4>
                    <p className="text-[10px] text-white/40 line-clamp-2 leading-relaxed font-light">{card.tagline}</p>
                  </div>
                  <div className="text-[9px] font-mono text-melhek-blue/50 flex items-center gap-1 group-hover:text-melhek-blue transition-colors">
                    View Specifications <ArrowRight className="w-3 h-3" />
                  </div>
                </button>
              )
            })}
          </div>

          {/* Modal Overlay */}
          <AnimatePresence>
            {activeModalCard && (
              <div className="fixed inset-0 z-[99999] flex items-center justify-center px-4">
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setActiveModalCard(null)}
                  className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                />
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  className="relative w-full max-w-2xl glass border-white/15 rounded-[2.5rem] bg-melhek-navy/95 p-8 sm:p-10 shadow-2xl overflow-y-auto max-h-[90vh] z-10"
                >
                  <button
                    onClick={() => setActiveModalCard(null)}
                    className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors cursor-pointer"
                    aria-label="Close modal"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-melhek-blue/15 border border-melhek-blue/25 flex items-center justify-center text-melhek-blue">
                      {(() => {
                        const Icon = activeModalCard.icon
                        return <Icon className="w-6 h-6" />
                      })()}
                    </div>
                    <div>
                      <span className="text-[9px] uppercase tracking-widest font-mono text-melhek-blue font-bold">System Blueprint</span>
                      <h3 className="text-xl sm:text-2xl font-display font-extrabold text-white leading-none">{activeModalCard.title}</h3>
                    </div>
                  </div>

                  <p className="text-sm text-white/60 mb-6 font-light leading-relaxed">{activeModalCard.tagline}</p>

                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div className="space-y-4">
                      <h5 className="text-[10px] uppercase tracking-wider font-mono text-white/40 border-b border-white/5 pb-1">Features & Specs</h5>
                      <ul className="space-y-2.5">
                        {activeModalCard.specifications.map((spec, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-xs text-white/80 leading-relaxed font-light">
                            <Check className="w-3.5 h-3.5 text-melhek-blue flex-shrink-0 mt-0.5" />
                            {spec}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-6">
                      <div className="space-y-3">
                        <h5 className="text-[10px] uppercase tracking-wider font-mono text-white/40 border-b border-white/5 pb-1">Technology Stack</h5>
                        <div className="flex flex-wrap gap-2">
                          {activeModalCard.techStack.map((tech, i) => (
                            <span key={i} className="px-2.5 py-1 rounded bg-white/5 border border-white/5 text-[10px] font-mono text-white/60">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h6 className="text-[9px] uppercase tracking-wider font-mono text-white/40">Est. Timeline</h6>
                          <span className="text-sm font-bold text-white">{activeModalCard.duration}</span>
                        </div>
                        <div>
                          <h6 className="text-[9px] uppercase tracking-wider font-mono text-white/40">Primary Target</h6>
                          <span className="text-xs text-white/80 line-clamp-2 leading-tight">{activeModalCard.useCase.split(' ')[0]} Business</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center gap-4 justify-between">
                    <span className="text-[10px] text-white/30 font-mono">White-label options available for all modules.</span>
                    <a 
                      href="#apply"
                      onClick={() => setActiveModalCard(null)}
                      className="btn-primary text-[10px] uppercase tracking-wider font-mono py-3 px-6 w-full sm:w-auto text-center"
                    >
                      Discuss Capability Setup →
                    </a>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </section>

        {/* ── INDUSTRIES GRID ── */}
        <section className="space-y-16 max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-white mb-4">
              Vertical Solutions Matrix
            </h2>
            <p className="text-white/40 text-xs sm:text-sm leading-relaxed max-w-2xl font-light">
              We design backend solutions tailored for key retail, hospitality, health, and services business sectors in Ethiopia.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Hotels', label: 'PMS & booking engines' },
              { name: 'Restaurants', label: 'QR menu order sync' },
              { name: 'Cafes', label: 'POS & billing scripts' },
              { name: 'Healthcare', label: 'Clinic CRM & database' },
              { name: 'Retail', label: 'Inventory sync ledgers' },
              { name: 'Automotive', label: 'Car import & stock pages' },
              { name: 'Education', label: 'Student intake portal' },
              { name: 'Services', label: 'Client booking engines' }
            ].map((ind, i) => (
              <div 
                key={i}
                className="p-6 rounded-2xl glass border-white/5 flex flex-col justify-between h-[130px] hover:border-melhek-blue/20 transition-all text-left"
              >
                <span className="text-sm font-bold text-white block">{ind.name}</span>
                <div>
                  <span className="text-[9px] uppercase tracking-widest font-mono text-white/30 block">Target Module</span>
                  <span className="text-xs text-melhek-blue font-mono font-medium block">{ind.label}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── FEATURED PORTFOLIO CASE STUDIES ── */}
        <section className="space-y-16 max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-white mb-4">
              Proven Operations Deployments
            </h2>
            <p className="text-white/40 text-xs sm:text-sm leading-relaxed max-w-2xl font-light">
              Review case study profiles of active business systems engineered by Melhek for Ethiopian market leaders.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[
              {
                title: 'Happy Optics CRM',
                tagline: 'Prescription DB & Multibranch Ledger',
                prob: 'Managing lens prescriptions, lens lab order statuses, and frame counts across multiple clinics via manual paperwork.',
                sol: 'Designed a cloud-based CRM with centralized optical measurement cards, real-time lab ticket pipelines, and branch stock sync.',
                outcome: 'Reduced lab order delivery errors to zero and automated patient intake history cards.'
              },
              {
                title: 'Amen Car Import Backend',
                tagline: 'Custom Stock Sheets & Lead Managers',
                prob: 'Updating car import listings manually and tracking prospective client deposits in disorganized WhatsApp lists.',
                sol: 'Built a secure database managing imports, featuring status tracking (Transit, Custom Office, Showroom) and customer reservation portals.',
                outcome: 'Uptime of 100% and structured customer deposit tracking.'
              },
              {
                title: 'Dine-In QR POS Sync',
                tagline: 'Restaurant Order Routing System',
                prob: 'Waiters taking incorrect order details and cashier bottlenecks during checkout rushes.',
                sol: 'Developed a table QR ordering system syncing menus with kitchen screens and cashiers.',
                outcome: 'Reduced checkout time by 30% and increased direct beverage sales via instant ordering.'
              },
              {
                title: 'Lobby Reservation Engine',
                tagline: 'Direct Hotel Booking Calendar',
                prob: 'Paying 15-20% booking commissions to global booking agents and dealing with double-booking conflicts.',
                sol: 'Created a direct booking website with room reservation calendars, payment gates, and front desk occupancy status dashboards.',
                outcome: 'Increased direct booking revenue by 40% and eliminated reservation double-booking.'
              },
              {
                title: 'Pharmacy Stock Ledger',
                tagline: 'Expiration Alert inventory portal',
                prob: 'Manually keeping track of drug expiration dates and stock shortages across multiple stores.',
                sol: 'Built a specialized POS ledger featuring automated inventory counts, shelf logs, and alert triggers.',
                outcome: 'Reduced expired medicine write-offs by 80%.'
              },
              {
                title: 'Gym Membership Gate Sync',
                tagline: 'Barcode Check-in Dashboard',
                prob: 'Non-members gaining entry and trainers manually tracking attendance records on paper logs.',
                sol: 'Developed a scanner validation check-in, tracking memberships and active subscriptions.',
                outcome: 'Eliminated unauthorized gym entry and automated trainer session invoicing.'
              }
            ].map((caseStudy, index) => (
              <div 
                key={index}
                className="glass rounded-[2rem] border-white/5 p-8 flex flex-col justify-between min-h-[350px] hover:border-melhek-blue/15 transition-all text-left space-y-6"
              >
                <div>
                  <span className="text-[9px] uppercase tracking-widest font-mono text-melhek-blue font-bold">Case Study 0{index + 1}</span>
                  <h3 className="text-xl font-display font-extrabold text-white mt-1">{caseStudy.title}</h3>
                  <span className="text-xs font-mono text-white/30 block mb-4">{caseStudy.tagline}</span>

                  <div className="space-y-3.5 text-xs">
                    <p className="text-white/40 leading-relaxed font-light">
                      <strong className="text-white/60 font-medium">Problem:</strong> {caseStudy.prob}
                    </p>
                    <p className="text-white/40 leading-relaxed font-light">
                      <strong className="text-white/60 font-medium">Solution:</strong> {caseStudy.sol}
                    </p>
                    <p className="text-emerald-400/90 leading-relaxed font-light">
                      <strong className="text-emerald-400 font-bold">Outcome:</strong> {caseStudy.outcome}
                    </p>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[10px] text-white/20 font-mono">Production Active</span>
                  <button 
                    onClick={() => {
                      setIsDashboardActive(true)
                      setDashboardTab('pipeline')
                    }}
                    className="text-xs font-mono text-melhek-blue flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer bg-transparent border-none"
                  >
                    Submit Similar Scope <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── TIMELINE: HOW IT WORKS ── */}
        <section className="space-y-16 max-w-5xl mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-white mb-4">
              Partnership Operations Pipeline
            </h2>
            <p className="text-white/40 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto font-light">
              We structure our delivery process under clean milestones, ensuring that timelines are met with absolute predictability.
            </p>
          </div>

          <div className="relative border-l border-white/5 pl-8 ml-4 space-y-12">
            {[
              { step: '01', title: 'Agency Receives Client Inquiry', desc: 'Your client outlines a project scope needing custom databases, portals, or bookings.' },
              { step: '02', title: 'Partner Submission via CRM Portal', desc: 'Submit the basic details through our partner opportunity portal or schedule a call.' },
              { step: '03', title: 'Technical Discovery Call', desc: 'We align on requirements, data models, payment integrations, and design guidelines.' },
              { step: '04', title: 'Scope Proposal & Blueprint Delivery', desc: 'We return a complete technical roadmap containing wireframe models, stack specifications, and fixed timelines.' },
              { step: '05', title: 'Sprint-Based System Development', desc: 'Our engineers build the platform using private Git repositories with continuous delivery builds.' },
              { step: '06', title: 'Beta Review & QA Testing', desc: 'You and your client test the staging portal to audit speeds, dashboard metrics, and checkout links.' },
              { step: '07', title: 'Production Launch & DNS Kickoff', desc: 'We launch the system on client servers, wire up domain names, and hand over access keys.' },
              { step: '08', title: 'SLA Support Infrastructure', desc: 'Our post-launch SLA desk monitors server uptimes and updates APIs behind the scenes.' }
            ].map((item, i) => (
              <div key={i} className="relative text-left">
                {/* Timeline dot */}
                <div className="absolute -left-[45px] top-1.5 w-6 h-6 rounded-full bg-melhek-navy border-2 border-melhek-blue flex items-center justify-center shadow-[0_0_10px_rgba(127,169,255,0.4)]">
                  <span className="text-[8px] font-mono font-bold text-melhek-blue">{item.step}</span>
                </div>
                <h3 className="text-sm font-bold text-white mb-1.5">{item.title}</h3>
                <p className="text-xs text-white/40 leading-relaxed max-w-xl font-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── PARTNERSHIP MODELS COMPARISON ── */}
        <section id="models" className="space-y-16 max-w-7xl mx-auto scroll-mt-28">
          <div className="max-w-3xl">
            <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-white mb-4">
              Partnership Engagement Tiers
            </h2>
            <p className="text-white/40 text-xs sm:text-sm leading-relaxed max-w-2xl font-light">
              Choose the model that matches your agency workflow and communication preference.
            </p>
          </div>

          <div className="overflow-x-auto glass rounded-3xl border-white/5">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02]">
                  <th className="p-6 text-[10px] uppercase font-mono tracking-wider text-white/40">Engagement Criteria</th>
                  <th className="p-6 text-sm font-bold text-melhek-blue">Referral Model</th>
                  <th className="p-6 text-sm font-bold text-white">White Label Model</th>
                  <th className="p-6 text-sm font-bold text-white">Strategic Alliance</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_TABLE.map((row, i) => (
                  <tr key={i} className="border-b border-white/5 hover:bg-white/[0.01] transition-colors">
                    <td className="p-6 text-xs font-bold text-white/80">{row.criterion}</td>
                    <td className="p-6 text-xs text-white/50 leading-relaxed font-light">{row.referral}</td>
                    <td className="p-6 text-xs text-white/50 leading-relaxed font-light font-medium">{row.whiteLabel}</td>
                    <td className="p-6 text-xs text-white/50 leading-relaxed font-light">{row.strategic}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── FINANCIAL BENEFITS ── */}
        <section className="space-y-16 max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-white mb-4">
              B2B Commercial Structures
            </h2>
            <p className="text-white/40 text-xs sm:text-sm leading-relaxed max-w-2xl font-light">
              Maximize your agency margins by utilizing our streamlined developer network.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Referral Bonus', val: '10% Payout', desc: 'Intros that convert receive 10% commission on kickoff, or can be passed to the client as a discount.' },
              { title: 'Partner Discounts', val: 'Wholesale pricing', desc: 'Registered partners unlock reduced baseline quotes, leaving plenty of margin room for agency markups.' },
              { title: 'Margin Optimization', val: 'Markup Freedom', desc: 'Under White Label contracts, you bill the client directly with total freedom on pricing and billing schedules.' },
              { title: 'Recurring SLAs', val: 'Support split', desc: 'Partner agencies can secure recurring monthly margins by co-signing post-launch support SLA tickets.' }
            ].map((item, i) => (
              <div key={i} className="glass p-6 rounded-2xl border-white/5 hover:border-melhek-blue/15 transition-all text-left flex flex-col justify-between min-h-[180px]">
                <div>
                  <h4 className="text-xs font-mono font-bold text-white/30 uppercase tracking-wide block mb-1">{item.title}</h4>
                  <span className="text-lg font-display font-extrabold text-melhek-blue block mb-3">{item.val}</span>
                  <p className="text-[11px] text-white/40 leading-relaxed font-light">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── PARTNER TESTIMONIALS ── */}
        <section className="space-y-16 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-white mb-4">
              Partner Testimonials
            </h2>
            <p className="text-white/40 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto font-light">
              Read what other creative, design, and business consultancies say about their experience working with Melhek.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            {[
              {
                quote: "Partnering with Melhek allowed us to pitch complex hotel reservations and inventory POS portals to our largest clients with absolute confidence. Their white-label execution is completely silent and incredibly prompt.",
                author: "Yonas K.",
                role: "Creative Director, Peak Design Studio"
              },
              {
                quote: "Before finding Melhek, we struggled to hire stable developers in Addis Ababa. Now, our agency handles client strategies while Melhek manages all API sync systems and database structures behind the scenes. Outstanding partner.",
                author: "Helen T.",
                role: "Co-Founder, Elevate B2B Consulting"
              }
            ].map((item, i) => (
              <div key={i} className="glass p-8 rounded-3xl border-white/5 relative flex flex-col justify-between">
                <p className="text-sm text-white/60 italic leading-relaxed font-light mb-6">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <div>
                  <span className="text-xs font-bold text-white block">{item.author}</span>
                  <span className="text-[10px] font-mono text-melhek-blue/70 uppercase tracking-widest block">{item.role}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── FAQ SECTION (20 ACCORDIONS) ── */}
        <section id="faqs" className="space-y-16 max-w-5xl mx-auto text-left scroll-mt-28">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-white mb-4">
              Partnership Intelligence FAQ
            </h2>
            <p className="text-white/40 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto font-light">
              Comprehensive answers addressing legal, technical, and commercial partnership structures.
            </p>
          </div>

          <div className="space-y-4">
            {FAQ_ITEMS.map((item, i) => {
              const isOpen = activeFaq === i
              return (
                <div 
                  key={i} 
                  className="glass rounded-2xl border-white/5 overflow-hidden transition-colors hover:border-white/10"
                >
                  <button
                    type="button"
                    onClick={() => setActiveFaq(isOpen ? null : i)}
                    className="w-full p-6 flex justify-between items-center text-left cursor-pointer"
                  >
                    <span className="text-xs sm:text-sm font-bold text-white pr-4">{item.q}</span>
                    <ChevronDown className={`w-4 h-4 text-white/40 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                      >
                        <div className="p-6 pt-0 border-t border-white/5 text-xs text-white/50 leading-relaxed font-light">
                          {item.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </section>

        {/* ── DOWNLOAD RESOURCES ── */}
        <section id="resources" className="space-y-16 max-w-7xl mx-auto scroll-mt-28">
          <div className="max-w-3xl">
            <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-white mb-4">
              Partner Download Center
            </h2>
            <p className="text-white/40 text-xs sm:text-sm leading-relaxed max-w-2xl font-light">
              Access brochures, portfolio sheets, and white-label sales guides to pitch custom systems to your clients.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { title: 'Company Profile', format: 'PDF (2.4 MB)' },
              { title: 'Hospitality Portfolio', format: 'PDF (4.8 MB)' },
              { title: 'Healthcare Portfolio', format: 'PDF (3.1 MB)' },
              { title: 'Agency Guide', format: 'PDF (1.8 MB)' },
              { title: 'Pricing Guide', format: 'PDF (1.2 MB)' },
              { title: 'Brand Assets', format: 'ZIP (8.5 MB)' }
            ].map((item, i) => (
              <div 
                key={i}
                className="p-5 rounded-2xl glass border-white/5 flex flex-col justify-between h-[150px] hover:border-melhek-blue/20 transition-all text-left"
              >
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/40">
                  <FileText className="w-4.5 h-4.5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-white block truncate mb-1">{item.title}</span>
                  <button 
                    onClick={() => {
                      const link = document.createElement('a')
                      link.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(`Melhek Technologies Partner Resource: ${item.title}\nFormat: ${item.format}\n\nThis is a simulation of the partner resource download. This file contains white-label sales decks and portfolio specifications for Ethiopian operations.`)
                      link.setAttribute('download', `${item.title.toLowerCase().replace(/ /g, '_')}_guide.txt`)
                      document.body.appendChild(link)
                      link.click()
                      document.body.removeChild(link)
                    }}
                    className="flex items-center gap-1 text-[9px] font-mono text-melhek-blue/80 hover:text-white transition-colors cursor-pointer bg-transparent border-none"
                  >
                    <Download className="w-3 h-3" /> {item.format}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── BECOME A PARTNER (APPLICATION FORM) ── */}
        <section id="apply" className="py-12 max-w-4xl mx-auto scroll-mt-24">
          <div className="glass rounded-[3rem] border-white/5 p-8 sm:p-12 text-left">
            <div className="text-center max-w-xl mx-auto mb-10">
              <span className="text-[9px] uppercase tracking-widest font-mono text-melhek-blue font-bold">Secure Verification</span>
              <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white mt-1">Become a registered Partner</h3>
              <p className="text-xs text-white/40 mt-1 font-light leading-relaxed">
                Register your agency details to unlock technical scoping resources, client pitching assistance, and wholesale rates.
              </p>
            </div>

            {appState.success ? (
              <div className="p-8 rounded-2xl bg-melhek-blue/5 border border-melhek-blue/20 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-melhek-blue/10 flex items-center justify-center mx-auto text-melhek-blue">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-white">Application Received</h4>
                <p className="text-xs text-white/40 max-w-sm mx-auto leading-relaxed font-light">
                  Thank you for applying. Our agency partnership manager will review your submission and schedule a meeting link within 12 business hours.
                </p>
              </div>
            ) : (
              <form action={appAction} className="space-y-6">
                {appState.error && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono">
                    {appState.error}
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label htmlFor="agencyName" className="text-[10px] uppercase tracking-wider font-mono text-white/40 ml-2">Agency Name *</label>
                    <input
                      id="agencyName"
                      name="agencyName"
                      type="text"
                      required
                      placeholder="e.g. Peak Design Studio"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-xs text-white focus:outline-none focus:border-melhek-blue transition-colors"
                    />
                    {appState.fieldErrors?.agencyName && <span className="text-[10px] text-red-400 block ml-2">{appState.fieldErrors.agencyName}</span>}
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="contactPerson" className="text-[10px] uppercase tracking-wider font-mono text-white/40 ml-2">Contact Person *</label>
                    <input
                      id="contactPerson"
                      name="contactPerson"
                      type="text"
                      required
                      placeholder="Full Name"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-xs text-white focus:outline-none focus:border-melhek-blue transition-colors"
                    />
                    {appState.fieldErrors?.contactPerson && <span className="text-[10px] text-red-400 block ml-2">{appState.fieldErrors.contactPerson}</span>}
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-1.5">
                    <label htmlFor="website" className="text-[10px] uppercase tracking-wider font-mono text-white/40 ml-2">Website (Optional)</label>
                    <input
                      id="website"
                      name="website"
                      type="url"
                      placeholder="https://..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-xs text-white focus:outline-none focus:border-melhek-blue transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="phone" className="text-[10px] uppercase tracking-wider font-mono text-white/40 ml-2">Phone Number *</label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      placeholder="+251..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-xs text-white focus:outline-none focus:border-melhek-blue transition-colors"
                    />
                    {appState.fieldErrors?.phone && <span className="text-[10px] text-red-400 block ml-2">{appState.fieldErrors.phone}</span>}
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-[10px] uppercase tracking-wider font-mono text-white/40 ml-2">Work Email *</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="name@agency.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-xs text-white focus:outline-none focus:border-melhek-blue transition-colors"
                    />
                    {appState.fieldErrors?.email && <span className="text-[10px] text-red-400 block ml-2">{appState.fieldErrors.email}</span>}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label htmlFor="services" className="text-[10px] uppercase tracking-wider font-mono text-white/40 ml-2">Core Services Offered *</label>
                    <input
                      id="services"
                      name="services"
                      type="text"
                      required
                      placeholder="e.g. Branding, Marketing, Social Media, IT Consultancy"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-xs text-white focus:outline-none focus:border-melhek-blue transition-colors"
                    />
                    {appState.fieldErrors?.services && <span className="text-[10px] text-red-400 block ml-2">{appState.fieldErrors.services}</span>}
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="partnershipInterest" className="text-[10px] uppercase tracking-wider font-mono text-white/40 ml-2">Partnership Interest Model *</label>
                    <select
                      id="partnershipInterest"
                      name="partnershipInterest"
                      required
                      defaultValue=""
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-xs text-white/80 focus:outline-none focus:border-melhek-blue transition-colors appearance-none"
                    >
                      <option value="" disabled className="bg-melhek-dark text-white">Select Model</option>
                      <option value="white-label" className="bg-melhek-dark text-white">White Label (Silent Dev Partner)</option>
                      <option value="referral" className="bg-melhek-dark text-white">Referral Model (10% Cash Commission)</option>
                      <option value="strategic" className="bg-melhek-dark text-white">Strategic Alliance (Co-Branded)</option>
                    </select>
                    {appState.fieldErrors?.partnershipInterest && <span className="text-[10px] text-red-400 block ml-2">{appState.fieldErrors.partnershipInterest}</span>}
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-1.5">
                    <label htmlFor="yearsInBusiness" className="text-[10px] uppercase tracking-wider font-mono text-white/40 ml-2">Years in Business *</label>
                    <input
                      id="yearsInBusiness"
                      name="yearsInBusiness"
                      type="text"
                      required
                      placeholder="e.g. 2 years"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-xs text-white focus:outline-none focus:border-melhek-blue transition-colors"
                    />
                    {appState.fieldErrors?.yearsInBusiness && <span className="text-[10px] text-red-400 block ml-2">{appState.fieldErrors.yearsInBusiness}</span>}
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="currentClients" className="text-[10px] uppercase tracking-wider font-mono text-white/40 ml-2">Current Client Volume *</label>
                    <input
                      id="currentClients"
                      name="currentClients"
                      type="text"
                      required
                      placeholder="e.g. 10+ active accounts"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-xs text-white focus:outline-none focus:border-melhek-blue transition-colors"
                    />
                    {appState.fieldErrors?.currentClients && <span className="text-[10px] text-red-400 block ml-2">{appState.fieldErrors.currentClients}</span>}
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="industries" className="text-[10px] uppercase tracking-wider font-mono text-white/40 ml-2">Target Industries *</label>
                    <input
                      id="industries"
                      name="industries"
                      type="text"
                      required
                      placeholder="e.g. Hotels, Retail, Clinics"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-xs text-white focus:outline-none focus:border-melhek-blue transition-colors"
                    />
                    {appState.fieldErrors?.industries && <span className="text-[10px] text-red-400 block ml-2">{appState.fieldErrors.industries}</span>}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isAppPending}
                  className="w-full btn-primary justify-center text-xs uppercase tracking-widest font-mono py-4 mt-4 animate-bounce"
                >
                  {isAppPending ? (
                    <div className="w-5 h-5 border-2 border-melhek-navy border-t-transparent rounded-full animate-spin" />
                  ) : (
                    'Submit Partnership Application →'
                  )}
                </button>
              </form>
            )}
          </div>
        </section>

        {/* ── SUBMIT OPPORTUNITY (CRM STYLE FORM) ── */}
        <section id="submit-opportunity" className="py-12 max-w-4xl mx-auto scroll-mt-24">
          <div className="glass rounded-[3rem] border-white/5 p-8 sm:p-12 text-left bg-white/[0.01]">
            <div className="text-center max-w-xl mx-auto mb-10">
              <span className="text-[9px] uppercase tracking-widest font-mono text-melhek-blue font-bold">Pipeline Register</span>
              <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white mt-1">Submit Client Opportunity</h3>
              <p className="text-xs text-white/40 mt-1 font-light leading-relaxed">
                Register active client projects needing technical scopes, timelines, or backend code bases.
              </p>
            </div>

            {oppState.success ? (
              <div className="p-8 rounded-2xl bg-melhek-blue/5 border border-melhek-blue/20 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-melhek-blue/10 flex items-center justify-center mx-auto text-melhek-blue">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-white">Opportunity Logged</h4>
                <p className="text-xs text-white/40 max-w-sm mx-auto leading-relaxed font-light">
                  Project logs received. Our senior architect will review the system parameters and draft a technical blueprint document within 24 hours.
                </p>
              </div>
            ) : (
              <form action={oppAction} className="space-y-6">
                {oppState.error && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono">
                    {oppState.error}
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label htmlFor="opp-agencyName" className="text-[10px] uppercase tracking-wider font-mono text-white/40 ml-2">Your Agency Name *</label>
                    <input
                      id="opp-agencyName"
                      name="agencyName"
                      type="text"
                      required
                      placeholder="Registered Agency Name"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-xs text-white focus:outline-none focus:border-melhek-blue transition-colors"
                    />
                    {oppState.fieldErrors?.agencyName && <span className="text-[10px] text-red-400 block ml-2">{oppState.fieldErrors.agencyName}</span>}
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="clientName" className="text-[10px] uppercase tracking-wider font-mono text-white/40 ml-2">Client Name / Alias *</label>
                    <input
                      id="clientName"
                      name="clientName"
                      type="text"
                      required
                      placeholder="e.g. Hospitality Group"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-xs text-white focus:outline-none focus:border-melhek-blue transition-colors"
                    />
                    {oppState.fieldErrors?.clientName && <span className="text-[10px] text-red-400 block ml-2">{oppState.fieldErrors.clientName}</span>}
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-1.5">
                    <label htmlFor="industry" className="text-[10px] uppercase tracking-wider font-mono text-white/40 ml-2">Client Industry *</label>
                    <select
                      id="industry"
                      name="industry"
                      required
                      defaultValue=""
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-xs text-white/80 focus:outline-none focus:border-melhek-blue transition-colors appearance-none"
                    >
                      <option value="" disabled className="bg-melhek-dark text-white">Select Sector</option>
                      <option value="Hospitality" className="bg-melhek-dark text-white">Hospitality & Dining</option>
                      <option value="Healthcare" className="bg-melhek-dark text-white">Healthcare & Clinics</option>
                      <option value="Retail" className="bg-melhek-dark text-white">Retail & POS Systems</option>
                      <option value="Automotive" className="bg-melhek-dark text-white">Automotive & Import</option>
                      <option value="Services" className="bg-melhek-dark text-white">Professional Services</option>
                      <option value="Other" className="bg-melhek-dark text-white">Other Sector</option>
                    </select>
                    {oppState.fieldErrors?.industry && <span className="text-[10px] text-red-400 block ml-2">{oppState.fieldErrors.industry}</span>}
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="budget" className="text-[10px] uppercase tracking-wider font-mono text-white/40 ml-2">Expected Client Budget *</label>
                    <select
                      id="budget"
                      name="budget"
                      required
                      defaultValue=""
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-xs text-white/80 focus:outline-none focus:border-melhek-blue transition-colors appearance-none"
                    >
                      <option value="" disabled className="bg-melhek-dark text-white">Select Budget Tier</option>
                      <option value="standard" className="bg-melhek-dark text-white">Standard (Web portals/menu integrations)</option>
                      <option value="medium" className="bg-melhek-dark text-white">Medium (Ledger / POS sync / Hotel planners)</option>
                      <option value="enterprise" className="bg-melhek-dark text-white">Enterprise (Clustered databases / custom ERP)</option>
                    </select>
                    {oppState.fieldErrors?.budget && <span className="text-[10px] text-red-400 block ml-2">{oppState.fieldErrors.budget}</span>}
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="timeline" className="text-[10px] uppercase tracking-wider font-mono text-white/40 ml-2">Delivery Deadline *</label>
                    <select
                      id="timeline"
                      name="timeline"
                      required
                      defaultValue=""
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-xs text-white/80 focus:outline-none focus:border-melhek-blue transition-colors appearance-none"
                    >
                      <option value="" disabled className="bg-melhek-dark text-white">Select Timeline</option>
                      <option value="speed" className="bg-melhek-dark text-white">Speed delivery (2 – 4 Weeks)</option>
                      <option value="standard" className="bg-melhek-dark text-white">Standard Delivery (6 – 10 Weeks)</option>
                      <option value="enterprise" className="bg-melhek-dark text-white">Multi-phase deployment (3+ Months)</option>
                    </select>
                    {oppState.fieldErrors?.timeline && <span className="text-[10px] text-red-400 block ml-2">{oppState.fieldErrors.timeline}</span>}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="description" className="text-[10px] uppercase tracking-wider font-mono text-white/40 ml-2">Project Scope Details *</label>
                  <textarea
                    id="description"
                    name="description"
                    required
                    rows={4}
                    placeholder="Detail any timeline limits, required database capacities, integrations (e.g. Telebirr, SMS alerts)..."
                    className="w-full bg-white/5 border border-white/10 rounded-3xl px-5 py-3.5 text-xs text-white focus:outline-none focus:border-melhek-blue transition-colors resize-none"
                  />
                  {oppState.fieldErrors?.description && <span className="text-[10px] text-red-400 block ml-2">{oppState.fieldErrors.description}</span>}
                </div>

                <button
                  type="submit"
                  disabled={isOppPending}
                  className="w-full btn-primary justify-center text-xs uppercase tracking-widest font-mono py-4 mt-4"
                >
                  {isOppPending ? (
                    <div className="w-5 h-5 border-2 border-melhek-navy border-t-transparent rounded-full animate-spin" />
                  ) : (
                    'Submit Project Opportunity →'
                  )}
                </button>
              </form>
            )}
          </div>
        </section>

        {/* ── BOOKING MEETING SCHEDULE ── */}
        <section id="book" className="py-12 max-w-4xl mx-auto scroll-mt-24">
          <div className="glass rounded-[3rem] border-white/5 p-8 sm:p-12 text-left bg-gradient-to-br from-melhek-blue/5 to-transparent">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex-1 space-y-4">
                <div className="w-10 h-10 rounded-xl bg-melhek-blue/15 flex items-center justify-center text-melhek-blue">
                  <Calendar className="w-5 h-5" />
                </div>
                <h3 className="text-xl sm:text-2xl font-display font-extrabold text-white">Book Partnership Meeting</h3>
                <p className="text-xs text-white/40 font-light leading-relaxed">
                  Schedule a 20-minute video consult with our agency partnership manager to review White-Label scopes, pricing tables, and SLA contracts.
                </p>
                <div className="space-y-2 pt-2 text-xs">
                  <div className="flex items-center gap-2 text-white/60 font-light">
                    <Check className="w-4 h-4 text-emerald-400" />
                    NDA templates ready for signature
                  </div>
                  <div className="flex items-center gap-2 text-white/60 font-light">
                    <Check className="w-4 h-4 text-emerald-400" />
                    Engineering leads join client scoping
                  </div>
                  <div className="flex items-center gap-2 text-white/60 font-light">
                    <Check className="w-4 h-4 text-emerald-400" />
                    Flexible onboarding schedules
                  </div>
                </div>
              </div>

              <div className="flex-shrink-0 w-full md:w-auto flex flex-col items-center gap-3">
                <a 
                  href="mailto:melhektechnologies@gmail.com?subject=Partnership%20Meeting%20Request"
                  className="btn-primary flex items-center gap-2 text-xs uppercase tracking-widest font-mono py-4 px-8 w-full text-center justify-center animate-bounce"
                >
                  Schedule via Email <Phone className="w-4 h-4" />
                </a>
                <span className="text-[10px] text-white/30 font-mono">Response within 6 hours</span>
              </div>
            </div>
          </div>
        </section>

        </div>
      )}

      {/* ── CUSTOM PORTAL FOOTER ── */}
      <footer className="py-12 mt-36 border-t border-white/5 bg-black/40 text-center">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 justify-center">
            <div className="relative w-6 h-6">
              <img src="/logo-light.png" alt="Melhek" className="w-6 h-6 object-contain" />
            </div>
            <span className="text-xs font-mono text-white/50">© {new Date().getFullYear()} Melhek Technologies. Partner Portal.</span>
          </div>
          <div className="flex items-center gap-6 text-[10px] font-mono text-white/30 justify-center">
            <Link href="/" className="hover:text-melhek-blue transition-colors">Main Website</Link>
            <Link href="/privacy" className="hover:text-melhek-blue transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-melhek-blue transition-colors">Terms of Service</Link>
            <Link href="/contact" className="hover:text-melhek-blue transition-colors">Direct Support</Link>
          </div>
        </div>
      </footer>
    </>
  )
}
