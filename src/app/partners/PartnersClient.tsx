'use client'

import { useState, useActionState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowRight, Shield, Zap, Globe, Cpu, Users, BarChart3, 
  Layers, Check, ChevronDown, Download, Phone, Calendar, 
  FileText, Briefcase, Plus, X, Server, MessageSquare, Clipboard
} from 'lucide-react'
import { submitPartnerApplication, submitPartnerOpportunity, type PartnerActionState } from '@/app/actions/partners'

// What We Build detailed modal specifications
interface BuildCard {
  id: string
  title: string
  icon: any
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

  // Forms State
  const initialAppState: PartnerActionState = {}
  const [appState, appAction, isAppPending] = useActionState(submitPartnerApplication, initialAppState)

  const initialOppState: PartnerActionState = {}
  const [oppState, oppAction, isOppPending] = useActionState(submitPartnerOpportunity, initialOppState)

  return (
    <>
      {/* ── CUSTOM PARTNER PORTAL HEADER ── */}
      <nav className="fixed top-4 left-[5vw] right-[5vw] z-[1000] glass rounded-full px-6 py-3 flex items-center justify-between bg-melhek-navy/80 border-white/10 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8 flex items-center justify-center">
            <img src="/logo-light.png" alt="Melhek Logo" className="object-contain w-8 h-8" />
          </div>
          <span className="text-xs sm:text-sm font-syne font-extrabold tracking-tight text-white">
            Melhek <span className="text-melhek-blue">Partner Portal</span>
          </span>
        </div>
        
        {/* Nav Links */}
        <div className="hidden lg:flex items-center gap-6">
          <a href="#why" className="text-[11px] font-mono font-bold uppercase tracking-wider text-white/50 hover:text-melhek-blue transition-colors">Benefits</a>
          <a href="#capabilities" className="text-[11px] font-mono font-bold uppercase tracking-wider text-white/50 hover:text-melhek-blue transition-colors">Capabilities</a>
          <a href="#models" className="text-[11px] font-mono font-bold uppercase tracking-wider text-white/50 hover:text-melhek-blue transition-colors">Models</a>
          <a href="#faqs" className="text-[11px] font-mono font-bold uppercase tracking-wider text-white/50 hover:text-melhek-blue transition-colors">FAQs</a>
          <a href="#resources" className="text-[11px] font-mono font-bold uppercase tracking-wider text-white/50 hover:text-melhek-blue transition-colors">Resources</a>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <a href="#submit-opportunity" className="btn-secondary !px-4 !py-2 !text-[10px] font-mono uppercase tracking-wider">
            Log Opportunity
          </a>
          <a href="#apply" className="btn-primary !px-4 !py-2 !text-[10px] font-mono uppercase tracking-wider">
            Apply Now
          </a>
        </div>
      </nav>

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
            <a 
              href="#book" 
              className="btn-secondary text-xs uppercase tracking-widest font-mono py-4 px-8 w-full sm:w-auto text-center"
            >
              Book Partnership Meeting
            </a>
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
                <a 
                  href="#submit-opportunity" 
                  className="text-xs font-mono text-melhek-blue flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  Submit Similar Scope <ArrowRight className="w-3.5 h-3.5" />
                </a>
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
                  onClick={() => alert(`Download simulated for: ${item.title}`)}
                  className="flex items-center gap-1 text-[9px] font-mono text-melhek-blue/80 hover:text-white transition-colors cursor-pointer"
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
                className="w-full btn-primary justify-center text-xs uppercase tracking-widest font-mono py-4 mt-4"
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
                className="btn-primary flex items-center gap-2 text-xs uppercase tracking-widest font-mono py-4 px-8 w-full text-center justify-center"
              >
                Schedule via Email <Phone className="w-4 h-4" />
              </a>
              <span className="text-[10px] text-white/30 font-mono">Response within 6 hours</span>
            </div>
          </div>
        </div>
      </section>

      </div>

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
            <a href="/" className="hover:text-melhek-blue transition-colors">Main Website</a>
            <a href="/privacy" className="hover:text-melhek-blue transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-melhek-blue transition-colors">Terms of Service</a>
            <a href="/contact" className="hover:text-melhek-blue transition-colors">Direct Support</a>
          </div>
        </div>
      </footer>
    </>
  )
}
