'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Layers, ShieldAlert, Cpu, BarChart3, CheckCircle2 } from 'lucide-react'
import ProjectEstimator from '@/components/ProjectEstimator'
import FaqSection from '@/components/FaqSection'

const PRICING_DRIVERS = [
  {
    title: 'Functional Requirements',
    desc: 'The total number of operational flows, database models, and screen layouts required by your team.',
    icon: Layers,
  },
  {
    title: 'Custom Integrations',
    desc: 'Connecting standard platforms with global payment processors, local mobile wallets, or external company APIs.',
    icon: Cpu,
  },
  {
    title: 'Concurrency & Volume',
    desc: 'The size of your database and expected traffic load during checkout rushes or peak guest bookings.',
    icon: BarChart3,
  },
  {
    title: 'Security Auditing',
    desc: 'Specialized protocols, database field encryption, and complete vulnerability testing benchmarks.',
    icon: ShieldAlert,
  },
]

const INVESTMENT_TIERS = [
  {
    title: 'Business Websites',
    etbStarting: '35,000 ETB+',
    etbRange: '35,000 – 120,000 ETB',
    usdStarting: '$300+',
    usdRange: '$300 – $1,000 USD',
    description: 'Corporate informational homepages, showcase portfolios, organization details, and simple contact forms.'
  },
  {
    title: 'Interactive Web Portals',
    etbStarting: '60,000 ETB+',
    etbRange: '60,000 – 300,000 ETB',
    usdStarting: '$500+',
    usdRange: '$500 – $2,500 USD',
    description: 'Interactive client dashboards, custom logins, database tables, and automated notifications.'
  },
  {
    title: 'Digital Menu Systems',
    etbStarting: '15,000 ETB+',
    etbRange: '15,000 – 150,000 ETB',
    usdStarting: '$125+',
    usdRange: '$125 – $1,250 USD',
    description: 'Interactive restaurant menus, QR codes, sales desk sync, and kitchen display views.'
  },
  {
    title: 'Sales & Inventory Systems (POS)',
    etbStarting: '100,000 ETB+',
    etbRange: '100,000 – 800,000 ETB',
    usdStarting: '$850+',
    usdRange: '$850 – $6,600 USD',
    description: 'Store stock tracking, cashier checkouts, barcode scanning, client registers, and sales reports.'
  },
  {
    title: 'Hotel Booking & Ordering Systems',
    etbStarting: 'Custom Quoted',
    etbRange: 'Custom Quoted',
    usdStarting: 'Custom Quoted',
    usdRange: 'Custom Quoted',
    description: 'Hotel room booking engines, front desk calendars, and unified guest management controls.'
  },
  {
    title: 'Multi-branch Custom Networks',
    etbStarting: 'Custom Quoted',
    etbRange: 'Custom Quoted',
    usdStarting: 'Custom Quoted',
    usdRange: 'Custom Quoted',
    description: 'High-volume concurrent transaction networks, enterprise databases, and maximum security compliance.'
  },
  {
    title: 'AI Assistants & Automators',
    etbStarting: 'Custom Quoted',
    etbRange: 'Custom Quoted',
    usdStarting: 'Custom Quoted',
    usdRange: 'Custom Quoted',
    description: 'Automated task script routines, text database summaries, and custom AI chatbots.'
  }
]

const TIMELINE_CARDS = [
  {
    title: 'Business Websites',
    timeline: '2 – 6 Weeks',
    description: 'Design and deployment of highly optimized, conversion-oriented informational corporate layouts.',
    outcome: 'Establish digital authority'
  },
  {
    title: 'Interactive Web Portals',
    timeline: '4 – 12 Weeks',
    description: 'Core engineering of interactive user dashboards, API integrations, and client logins.',
    outcome: 'Streamline client interactions'
  },
  {
    title: 'Sales & Inventory Systems',
    timeline: '6 – 16 Weeks',
    description: 'Full-scope database design, multi-store stock replication, and inventory control panels.',
    outcome: 'Automate store sales'
  },
  {
    title: 'Custom Enterprise Networks',
    timeline: 'Custom Timeline',
    description: 'Complete multi-phased deployment plan tailored to high-volume security and audit requirements.',
    outcome: 'Ultimate database stability'
  }
]

export default function PricingClient() {
  const [currency, setCurrency] = useState<'ETB' | 'USD'>('ETB')

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] },
    },
  }

  return (
    <div className="container mx-auto px-6 space-y-32">
      {/* Hero Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative py-20 flex flex-col items-center text-center max-w-4xl mx-auto"
      >
        <div className="digital-grid -z-10" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-melhek-blue/10 blur-[120px] rounded-full -z-10" />

        <motion.div 
          variants={itemVariants}
          className="flex items-center gap-2 text-melhek-blue mb-4 border border-melhek-blue/20 bg-melhek-blue/5 rounded-full px-4 py-1.5"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-melhek-blue animate-pulse" />
          <span className="text-[10px] uppercase tracking-[0.35em] font-mono font-bold">Investment Guide</span>
        </motion.div>

        <motion.h1 
          variants={itemVariants}
          className="text-4xl md:text-6xl font-display font-extrabold text-white tracking-tight leading-[1.1]"
        >
          Understanding Project <br />
          <span className="text-gradient">Investments & Timelines</span>
        </motion.h1>

        <motion.p 
          variants={itemVariants}
          className="text-white/50 text-sm md:text-base leading-relaxed mt-6 max-w-2xl font-light"
        >
          Melhek Technologies builds custom-engineered technology solutions for global businesses and local market leaders. 
          To eliminate uncertainty and maintain visual excellence, we outline indicative project investments 
          and timelines mapping directly to system scale, integration scopes, and complexity.
        </motion.p>
      </motion.div>

      {/* Currency Switcher Overlay */}
      <div className="flex justify-end max-w-7xl mx-auto -mb-24 relative z-50">
        <div className="glass p-1 rounded-xl border-white/10 flex items-center gap-1 bg-white/[0.02]">
          <button
            onClick={() => setCurrency('ETB')}
            className={`px-4 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
              currency === 'ETB'
                ? 'bg-melhek-blue text-melhek-navy shadow-[0_0_15px_rgba(127,169,255,0.3)] font-extrabold'
                : 'text-white/60 hover:text-white'
            }`}
          >
            ETB (Birr)
          </button>
          <button
            onClick={() => setCurrency('USD')}
            className={`px-4 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
              currency === 'USD'
                ? 'bg-melhek-blue text-melhek-navy shadow-[0_0_15px_rgba(127,169,255,0.3)] font-extrabold'
                : 'text-white/60 hover:text-white'
            }`}
          >
            USD (Dollar)
          </button>
        </div>
      </div>

      {/* Indicative Investment Ranges */}
      <section className="space-y-16">
        <div className="max-w-3xl">
          <h2 className="text-2xl md:text-4xl font-display font-extrabold text-white mb-4">
            Indicative Project Investments
          </h2>
          <p className="text-white/40 text-xs md:text-sm leading-relaxed max-w-2xl">
            We reject the cheap, cookie-cutter approach of flat packages. The pricing structures below reflect 
            typical investments for tailor-made, high-end business systems in your chosen currency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INVESTMENT_TIERS.map((tier, index) => (
            <div 
              key={index}
              className="glass rounded-2xl border-white/5 p-6 hover:border-melhek-blue/30 transition-all flex flex-col justify-between h-[230px]"
            >
              <div>
                <span className="text-[10px] font-mono text-white/30 uppercase tracking-wider block mb-1">
                  {tier.title}
                </span>
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-lg font-display font-extrabold text-white">
                    {currency === 'ETB' ? tier.etbStarting : tier.usdStarting}
                  </span>
                  {tier.etbRange !== 'Custom Quoted' && (
                    <span className="text-xs text-white/40 font-mono">
                      (Typical: {currency === 'ETB' ? tier.etbRange : tier.usdRange})
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-white/40 leading-relaxed">{tier.description}</p>
              </div>

              <div className="flex items-center gap-1.5 text-[9px] font-mono text-melhek-blue/70 pt-4 border-t border-white/5">
                <CheckCircle2 className="w-3 h-3" />
                <span>Value-driven implementation</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Drivers */}
      <section className="space-y-16">
        <div className="max-w-3xl">
          <h2 className="text-2xl md:text-4xl font-display font-extrabold text-white mb-4">
            Architectural Investment Parameters
          </h2>
          <p className="text-white/40 text-xs md:text-sm leading-relaxed max-w-2xl">
            Every project has a unique blueprint. Final investments scale proportionally based on structural drivers, ensuring your capital goes strictly towards code and capability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRICING_DRIVERS.map((driver, index) => {
            const Icon = driver.icon
            return (
              <div 
                key={index}
                className="glass rounded-2xl border-white/5 p-6 hover:border-melhek-blue/30 transition-all flex flex-col justify-between h-[200px]"
              >
                <div className="w-10 h-10 rounded-lg bg-melhek-blue/10 border border-melhek-blue/20 flex items-center justify-center text-melhek-blue mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white mb-2">{driver.title}</h3>
                  <p className="text-[11px] text-white/40 leading-relaxed">{driver.desc}</p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Expected Project Timelines */}
      <section className="space-y-16">
        <div className="max-w-3xl">
          <h2 className="text-2xl md:text-4xl font-display font-extrabold text-white mb-4">
            Expected Development Timelines
          </h2>
          <p className="text-white/40 text-xs md:text-sm leading-relaxed max-w-2xl">
            Our engineering phases are organized to minimize time-to-market while guaranteeing strict database stability, security compliance, and robust execution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TIMELINE_CARDS.map((card, index) => (
            <div 
              key={index}
              className="glass rounded-2xl border-white/5 p-6 flex flex-col justify-between h-[250px] relative overflow-hidden group hover:border-melhek-blue/20 transition-colors"
            >
              <div>
                <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest font-bold block mb-1">
                  Target timeline
                </span>
                <div className="flex items-center gap-2 text-melhek-blue mb-4">
                  <Calendar className="w-4.5 h-4.5" />
                  <span className="text-lg font-display font-bold">{card.timeline}</span>
                </div>
                <h3 className="text-sm font-bold text-white mb-2">{card.title}</h3>
                <p className="text-[11px] text-white/40 leading-relaxed line-clamp-3">{card.description}</p>
              </div>

              <div className="flex items-center gap-1.5 text-[10px] font-mono text-melhek-blue border-t border-white/5 pt-4">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{card.outcome}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Project Estimator Section */}
      <section id="estimator" className="space-y-12 scroll-mt-24">
        <div className="max-w-3xl">
          <h2 className="text-2xl md:text-4xl font-display font-extrabold text-white mb-4">
            Interactive Project Estimator
          </h2>
          <p className="text-white/40 text-xs md:text-sm leading-relaxed max-w-2xl">
            Design your baseline software layout. Select your target system category, operational sector, and key integration modules to calculate indicative budgets and request a blueprint review session.
          </p>
        </div>

        <ProjectEstimator currency={currency} exchangeRate={120} />
      </section>

      {/* Categorized FAQs Section */}
      <section className="pb-16 border-b border-white/5">
        <FaqSection />
      </section>
    </div>
  )
}
