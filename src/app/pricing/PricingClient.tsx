'use client'

import { motion } from 'framer-motion'
import { Calendar, Layers, ShieldAlert, Cpu, BarChart3, Landmark, CheckCircle2 } from 'lucide-react'
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
    desc: 'Connecting standard platforms with local payment gateways (Chapa, Telebirr) or external branch APIs.',
    icon: Cpu,
  },
  {
    title: 'Concurrency & Volume',
    desc: 'The size of your database and expected traffic load during checkout rushes or peak tourist bookings.',
    icon: BarChart3,
  },
  {
    title: 'Security Auditing',
    desc: 'Specialized protocols, database field encryption, and pentesting compliance benchmarks.',
    icon: ShieldAlert,
  },
]

const INVESTMENT_TIERS = [
  {
    title: 'Business Websites',
    starting: '35,000 ETB+',
    range: '35,000 – 120,000 ETB',
    description: 'Corporate informational homepages, attorney showcases, organizational calendars, and inquiry forms.'
  },
  {
    title: 'Professional Platforms',
    starting: '60,000 ETB+',
    range: '60,000 – 300,000 ETB',
    description: 'Interactive dashboards, client portals, customized APIs, and automated notifications.'
  },
  {
    title: 'Digital Menu Systems',
    starting: '15,000 ETB+',
    range: '15,000 – 150,000 ETB',
    description: 'Interactive dining menus, table ordering coordinates, POS sync, and kitchen displays.'
  },
  {
    title: 'Business Management Systems',
    starting: '100,000 ETB+',
    range: '100,000 – 800,000 ETB',
    description: 'Pharmacy inventory trackers, barcode cashier desks, gym memberships, and database sync.'
  },
  {
    title: 'Hospitality Tech Solutions',
    starting: 'Custom Pricing',
    range: 'Custom Quoted',
    description: 'Hotel room booking engines, booking site commission bypass, and central property manager portals.'
  },
  {
    title: 'Enterprise Platforms',
    starting: 'Custom Pricing',
    range: 'Custom Quoted',
    description: 'High-volume concurrent transaction networks, secure data systems, and enterprise architecture.'
  },
  {
    title: 'AI Solutions & Automation',
    starting: 'Custom Pricing',
    range: 'Custom Quoted',
    description: 'Task automation scripts, localized search databases, and predictive analytics dashboards.'
  }
]

const TIMELINE_CARDS = [
  {
    title: 'Business Websites',
    timeline: '2 – 6 Weeks',
    description: 'Design and deployment of highly optimized, conversion-oriented informational corporate portals.',
    outcome: 'Establish digital authority'
  },
  {
    title: 'Professional Platforms',
    timeline: '4 – 12 Weeks',
    description: 'Core engineering of interactive user dashboards, API integrations, and client portals.',
    outcome: 'Streamline client interactions'
  },
  {
    title: 'Business Systems',
    timeline: '6 – 16 Weeks',
    description: 'Full-scope database design, multi-branch replication protocols, and inventory control setups.',
    outcome: 'Automate physical registers'
  },
  {
    title: 'Enterprise Solutions',
    timeline: 'Custom Timeline',
    description: 'Complete multi-phased deployment plan tailored to organizational compliance and audit grids.',
    outcome: 'Ultimate operational security'
  }
]

export default function PricingClient() {
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
          Melhek Technologies builds custom-engineered technology solutions for Ethiopian enterprises. 
          To eliminate uncertainty and maintain visual excellence, we outline indicative project investments 
          and timelines mapping directly to system scale, integration scopes, and complexity.
        </motion.p>
      </motion.div>

      {/* Indicative Investment Ranges */}
      <section className="space-y-16">
        <div className="max-w-3xl">
          <h2 className="text-2xl md:text-4xl font-display font-extrabold text-white mb-4">
            Indicative Project Investments
          </h2>
          <p className="text-white/40 text-xs md:text-sm leading-relaxed max-w-2xl">
            We reject the cheap, cookie-cutter approach of flat packages. The pricing structures below reflect 
            typical investments for tailor-made, high-end business systems built in Ethiopian Birr (ETB).
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
                    {tier.starting}
                  </span>
                  {tier.range !== 'Custom Quoted' && (
                    <span className="text-xs text-white/40 font-mono">
                      (Typical: {tier.range})
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

        <ProjectEstimator />
      </section>

      {/* Categorized FAQs Section */}
      <section className="pb-16 border-b border-white/5">
        <FaqSection />
      </section>
    </div>
  )
}
