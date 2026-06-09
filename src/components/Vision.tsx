'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const milestones = [
  {
    year: "2026",
    title: "Advanced Digital Systems",
    description: "Architecting high-availability corporate platforms, local-first database operations, and initial AI Labs setups for enterprise clients.",
    status: "current"
  },
  {
    year: "2027",
    title: "Hospitality Expansion",
    description: "Rolling out unified booking systems, PMS integration pipelines, and smart concierges globally across hotel chains.",
    status: "upcoming"
  },
  {
    year: "2028",
    title: "Enterprise Infrastructure",
    description: "Launching Melhek Infrastructure. Bridging local network cabling, edge nodes, and SDN software controllers under one division.",
    status: "upcoming"
  },
  {
    year: "2029",
    title: "Secure Systems",
    description: "Inauguration of Melhek Secure. Deploying vulnerability scanners, role-based access identity management, and encrypted tunnels.",
    status: "upcoming"
  },
  {
    year: "2030",
    title: "Intelligent Infrastructure",
    description: "Realization of a self-optimizing technology ecosystem. Fully autonomous software agents managing infrastructure operations.",
    status: "upcoming"
  }
]

export default function Vision() {
  return (
    <section id="vision" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-melhek-blue font-mono text-xs font-bold tracking-[0.2em] uppercase mb-4"
          >
            Building Tomorrow
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-syne font-extrabold text-white mb-6"
          >
            Our Strategic <br />
            <span className="text-gradient">Roadmap.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/60 leading-relaxed max-w-2xl mx-auto"
          >
            A disciplined roadmap toward building the continent&apos;s most dependable digital infrastructure ecosystem.
          </motion.p>
        </div>

        <div className="relative">
          {/* Roadmap Track Line */}
          <div className="absolute top-[42px] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-melhek-blue to-transparent opacity-20 hidden lg:block" />

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-4">
            {milestones.map((milestone, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative flex flex-col items-center lg:items-start text-center lg:text-left"
              >
                {/* Year Label */}
                <div className="text-3xl font-syne font-extrabold text-melhek-blue mb-4 lg:mb-8">
                  {milestone.year}
                </div>

                {/* Status Dot */}
                <div className="relative mb-8">
                  <div className={`w-4 h-4 rounded-full border-2 border-melhek-dark z-10 relative ${milestone.status === 'completed' ? 'bg-melhek-blue shadow-[0_0_15px_rgba(127,169,255,0.8)]' : milestone.status === 'current' ? 'bg-white shadow-[0_0_20px_rgba(255,255,255,0.5)]' : 'bg-white/10'}`} />
                  {milestone.status === 'current' && (
                    <div className="absolute inset-0 w-4 h-4 bg-white/40 rounded-full animate-ping" />
                  )}
                </div>

                {/* Milestone Card */}
                <div className="glass p-6 rounded-2xl border-white/5 hover:border-white/10 transition-colors w-full group">
                   <h3 className="text-base font-syne font-bold text-white mb-3 group-hover:text-melhek-blue transition-colors">
                     {milestone.title}
                   </h3>
                   <p className="text-[11px] text-white/45 leading-relaxed">
                     {milestone.description}
                   </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-20 text-center">
          <Link
            href="/contact"
            className="btn-primary text-sm inline-flex"
          >
            Align your roadmap with ours
          </Link>
          <div className="mt-6">
            <Link href="/engineering" className="text-[11px] font-mono text-melhek-blue/70 hover:text-melhek-blue uppercase tracking-widest">
              How we ship →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
