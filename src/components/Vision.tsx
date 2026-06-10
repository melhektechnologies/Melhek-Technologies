'use client'

import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { CheckCircle2, Clock, Rocket } from 'lucide-react'

const milestones = [
  {
    year: '2026',
    title: 'Advanced Digital Systems',
    description: 'Architecting high-availability corporate platforms, local-first database operations, and initial AI Labs setups for enterprise clients.',
    status: 'current',
    icon: Rocket,
  },
  {
    year: '2027',
    title: 'Hospitality Expansion',
    description: 'Rolling out unified booking systems, PMS integration pipelines, and smart concierge solutions globally across hotel chains.',
    status: 'upcoming',
    icon: Clock,
  },
  {
    year: '2028',
    title: 'Enterprise Infrastructure',
    description: 'Launching Melhek Infrastructure. Bridging local network cabling, edge nodes, and SDN software controllers under one division.',
    status: 'upcoming',
    icon: Clock,
  },
  {
    year: '2029',
    title: 'Secure Systems',
    description: 'Inauguration of Melhek Secure. Deploying vulnerability scanners, role-based access identity management, and encrypted tunnels.',
    status: 'upcoming',
    icon: Clock,
  },
  {
    year: '2030',
    title: 'Intelligent Infrastructure',
    description: 'Realization of a self-optimizing technology ecosystem. Fully autonomous software agents managing infrastructure operations.',
    status: 'upcoming',
    icon: Clock,
  },
]

export default function Vision() {
  const lineRef = useRef(null)
  const lineInView = useInView(lineRef, { once: true, margin: '-100px' })

  return (
    <section id="vision" className="py-24 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[400px] bg-melhek-blue/4 blur-[120px] rounded-full" />
      </div>

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
            className="text-5xl md:text-7xl font-syne font-extrabold text-white mb-6 tracking-[-0.03em]"
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

        <div className="relative" ref={lineRef}>
          {/* Animated horizontal track */}
          <div className="absolute top-[42px] left-0 right-0 h-[1px] bg-white/5 hidden lg:block" />
          <motion.div
            className="absolute top-[42px] left-0 h-[1px] bg-gradient-to-r from-melhek-blue via-melhek-blue/60 to-transparent hidden lg:block"
            initial={{ width: '0%' }}
            animate={lineInView ? { width: '22%' } : { width: '0%' }}
            transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-4">
            {milestones.map((milestone, i) => {
              const Icon = milestone.icon
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="relative flex flex-col items-center lg:items-start text-center lg:text-left"
                >
                  {/* Year Label */}
                  <div className={`text-3xl font-syne font-extrabold mb-4 lg:mb-8 ${milestone.status === 'current' ? 'text-melhek-blue' : 'text-white/30'}`}>
                    {milestone.year}
                  </div>

                  {/* Status Indicator */}
                  <div className="relative mb-8 flex items-center justify-center">
                    {milestone.status === 'current' ? (
                      <>
                        {/* Outer pulse ring 1 */}
                        <span className="absolute w-10 h-10 rounded-full border border-melhek-blue/30 animate-ping" />
                        {/* Outer pulse ring 2 */}
                        <span className="absolute w-7 h-7 rounded-full bg-melhek-blue/20 animate-pulse" />
                        {/* Core dot */}
                        <div className="w-4 h-4 rounded-full bg-melhek-blue shadow-[0_0_20px_rgba(127,169,255,0.9)] border-2 border-white/60 z-10 relative" />
                      </>
                    ) : (
                      <div className="w-4 h-4 rounded-full bg-white/10 border border-white/20 z-10 relative" />
                    )}
                  </div>

                  {/* Card */}
                  <motion.div
                    whileHover={{ y: -4, borderColor: 'rgba(127,169,255,0.25)' }}
                    className={`glass p-6 rounded-2xl border-white/5 transition-all duration-500 w-full group cursor-default ${
                      milestone.status === 'current'
                        ? 'border-melhek-blue/15 shadow-[0_0_40px_rgba(127,169,255,0.08)]'
                        : ''
                    }`}
                  >
                    {milestone.status === 'current' && (
                      <div className="flex items-center gap-1.5 mb-3">
                        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                        <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold">Active Now</span>
                      </div>
                    )}
                    <h3 className={`text-base font-syne font-bold mb-3 transition-colors ${
                      milestone.status === 'current' ? 'text-melhek-blue' : 'text-white group-hover:text-melhek-blue'
                    }`}>
                      {milestone.title}
                    </h3>
                    <p className="text-[11px] text-white/45 leading-relaxed">
                      {milestone.description}
                    </p>
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        </div>

        <div className="mt-20 text-center">
          <Link href="/contact" className="btn-primary text-sm inline-flex">
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
