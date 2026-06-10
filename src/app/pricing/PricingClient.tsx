'use client'

import { motion } from 'framer-motion'
import { Calendar, Layers, ShieldAlert, Cpu, BarChart3, HelpCircle, CheckCircle2 } from 'lucide-react'
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

const TIMELINE_CARDS = [
  {
    title: 'Business Websites',
    timeline: '2 – 6 Weeks',
    description: 'Corporate homepages, attorney showcase profiles, organization calendars, and consultation booking setups.',
    outcome: 'Establish digital authority'
  },
  {
    title: 'Custom Business Systems',
    timeline: '4 – 12 Weeks',
    description: 'Pharmacy inventories, cashier billing lanes, gym registrations, and central data synchronizers.',
    outcome: 'Automate daily registers'
  },
  {
    title: 'Hospitality Platforms',
    timeline: '6 – 16 Weeks',
    description: 'Front-desk hotel calendars, direct reservation engines, restaurant digital menus, and kitchen displays.',
    outcome: 'Cut middleman agency fees'
  },
  {
    title: 'Enterprise Platforms',
    timeline: 'Custom Timeline',
    description: 'Multi-region supply sync, secure health databases, or deep artificial intelligence automation models.',
    outcome: 'Complete operational control'
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
          <span className="text-[10px] uppercase tracking-[0.35em] font-mono font-bold">Transparent Engineering</span>
        </motion.div>

        <motion.h1 
          variants={itemVariants}
          className="text-4xl md:text-6xl font-display font-extrabold text-white tracking-tight leading-[1.1]"
        >
          Value-Aligned <br />
          <span className="text-gradient">Pricing & Timelines</span>
        </motion.h1>

        <motion.p 
          variants={itemVariants}
          className="text-white/50 text-sm md:text-base leading-relaxed mt-6 max-w-2xl font-light"
        >
          We build robust, high-performance software systems tailored to Ethiopian enterprises. 
          By aligning costs with complexity and business outcomes, we eliminate guesswork and guarantee returns on your technology investment.
        </motion.p>
      </motion.div>

      {/* Transparent Pricing Factors Section */}
      <section className="space-y-16">
        <div className="max-w-3xl">
          <h2 className="text-2xl md:text-4xl font-display font-extrabold text-white mb-4">
            How We Price Projects
          </h2>
          <p className="text-white/40 text-xs md:text-sm leading-relaxed max-w-2xl">
            We don&apos;t hide pricing, nor do we charge flat rates that inflate budgets. Every engagement is quoted based on four key architectural parameters to ensure transparency and flexibility.
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

        {/* Value statement banner */}
        <div className="glass rounded-[24px] border-white/10 p-6 bg-gradient-to-r from-melhek-navy/80 via-white/[0.01] to-melhek-navy/80 flex flex-col md:flex-row items-center gap-6 justify-between">
          <div className="space-y-1 max-w-xl text-center md:text-left">
            <h4 className="text-sm font-bold text-white">Looking for Indicative Budget Ranges?</h4>
            <p className="text-[11px] text-white/40 leading-normal">
              Typical client entries range from $1,200 (basic corporate presence) up to $15,000+ (complex AI systems and multi-branch POS integrations). Use our blueprint tool below to calculate your estimate.
            </p>
          </div>
          <button 
            onClick={() => {
              const el = document.getElementById('estimator')
              el?.scrollIntoView({ behavior: 'smooth', block: 'center' })
            }}
            className="btn-primary !py-3 !text-xs font-mono uppercase tracking-widest whitespace-nowrap"
          >
            Launch Estimator →
          </button>
        </div>
      </section>

      {/* Project Timelines Section */}
      <section className="space-y-16">
        <div className="max-w-3xl">
          <h2 className="text-2xl md:text-4xl font-display font-extrabold text-white mb-4">
            Expected Development Timelines
          </h2>
          <p className="text-white/40 text-xs md:text-sm leading-relaxed max-w-2xl">
            Software engineering is structured to minimize time-to-market without sacrificing system stability or security. Timelines scale directly with feature volume and testing criteria.
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
            Dynamic Calculation Grid
          </h2>
          <p className="text-white/40 text-xs md:text-sm leading-relaxed max-w-2xl">
            Configure your exact system blueprint. Select your industry sectors, select complexity thresholds, and add integration modules to view indicative costs and request a dedicated timeline review.
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
