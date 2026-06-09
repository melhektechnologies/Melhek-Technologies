'use client'

import { motion } from 'framer-motion'
import { Hotel, Activity, ShoppingBag, Car, BookOpen, Scale, Users, Cpu, Layers } from 'lucide-react'

const industries = [
  {
    icon: <Hotel className="w-8 h-8" />,
    name: "Hospitality",
    desc: "Unified Property Management Systems (PMS), direct-booking engines, and automated digital concierge services designed to drive reservations."
  },
  {
    icon: <Activity className="w-8 h-8" />,
    name: "Healthcare",
    desc: "Secure patient calendars, electronic prescription managers, and automated appointment alerts built under strict data compliance policies."
  },
  {
    icon: <ShoppingBag className="w-8 h-8" />,
    name: "Retail",
    desc: "Real-time stock synchronization pipelines, local POS offline-resilience layers, and automated inventory reconciliation engines."
  },
  {
    icon: <Car className="w-8 h-8" />,
    name: "Automotive",
    desc: "High-asset interactive digital showrooms, import milestone notification queues, and automated client CRM pipelines."
  },
  {
    icon: <BookOpen className="w-8 h-8" />,
    name: "Education",
    desc: "Custom student administration databases, curriculum scheduling modules, and digital examination verification tools."
  },
  {
    icon: <Scale className="w-8 h-8" />,
    name: "Professional Services",
    desc: "Polished corporate platforms, case management integrations, secure client file vaults, and automated scheduling funnels."
  },
  {
    icon: <Users className="w-8 h-8" />,
    name: "Religious Organizations",
    desc: "High-capacity serverless media streaming integrations, secure multi-currency tithes payment interfaces, and member portals."
  },
  {
    icon: <Cpu className="w-8 h-8" />,
    name: "SMEs",
    desc: "Operational automation systems, CRM setups, billing integrations, and lightweight ERP modules designed to fuel business growth."
  },
  {
    icon: <Layers className="w-8 h-8" />,
    name: "Enterprises",
    desc: "Multi-branch data warehouses, telemetry streaming dashboards, cloud migration pipelines, and custom security audits."
  }
]

export default function Industries() {
  return (
    <section id="industries" className="py-24 relative overflow-hidden bg-melhek-dark">
      {/* Decorative Orbs */}
      <div className="absolute w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,_rgba(127,169,255,0.05)_0%,_transparent_70%)] bottom-[-200px] left-[-200px] pointer-events-none" />

      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="px-4 py-1 rounded-full glass border-white/10 text-[10px] font-mono font-bold text-melhek-blue uppercase tracking-[0.2em] inline-block mb-6"
          >
            Sectors Empowered
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[clamp(36px,5vw,64px)] font-syne font-extrabold text-white mb-6 leading-[1.1]"
          >
            Systems Engineered For<br />
            <span className="text-gradient">Critical Verticals.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[17px] text-melhek-steel/50 leading-relaxed max-w-2xl mx-auto font-light"
          >
            We deploy specialized software architectures and database designs tailored to the operational demands of diverse industries.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((ind, i) => (
            <motion.div
              key={ind.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="glass p-8 rounded-2xl border-white/5 hover:border-melhek-blue/30 transition-all duration-300 hover:-translate-y-1 group flex gap-6"
            >
              <div className="text-melhek-blue shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300">
                {ind.icon}
              </div>
              <div>
                <h3 className="text-lg font-syne font-bold text-white mb-2 group-hover:text-melhek-blue transition-colors">
                  {ind.name}
                </h3>
                <p className="text-[13px] text-melhek-steel/40 leading-relaxed">
                  {ind.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
