'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { TRUST_REASONS } from '@/constants/trust'

export default function WhyTrust() {
  return (
    <section id="trust" className="py-24 relative overflow-hidden bg-melhek-dark" aria-labelledby="trust-heading">
      {/* Background Ambient Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-melhek-blue/5 blur-[120px] -z-10" aria-hidden="true" />

      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="px-4 py-1 rounded-full glass border-white/10 text-[10px] font-mono font-bold text-melhek-blue uppercase tracking-[0.2em] inline-block mb-6"
          >
            Pillars of Partnership
          </motion.div>
          <motion.h2
            id="trust-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[clamp(36px,5vw,64px)] font-syne font-extrabold text-white mb-6 leading-[1.1]"
          >
            Why Businesses <br />
            <span className="text-gradient">Choose Melhek.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[17px] text-melhek-steel/50 leading-relaxed max-w-2xl mx-auto font-light"
          >
            We deliver uncompromising systems engineering, reliable operational metrics, and dedicated technical leadership.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TRUST_REASONS.map((reason, i) => (
            <motion.article
              key={reason.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative p-12 rounded-[24px] glass border-white/5 hover:border-melhek-blue/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_24px_80px_rgba(0,0,0,0.4)] flex flex-col h-full"
            >
              {/* Border Glow */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-melhek-blue to-transparent opacity-0 group-hover:opacity-40 transition-opacity" aria-hidden="true" />
              
              <div className="text-melhek-blue mb-8 group-hover:scale-110 transition-transform duration-500" aria-hidden="true">
                {reason.icon}
              </div>

              <h3 className="text-[22px] font-syne font-bold text-white mb-4 group-hover:text-melhek-blue transition-colors leading-tight">
                {reason.title}
              </h3>
              <p className="text-[15px] text-melhek-steel/40 leading-relaxed font-medium">
                {reason.desc}
              </p>
            </motion.article>
          ))}
        </div>

        <div className="mt-16 flex flex-wrap justify-center gap-4">
          <Link href="/engineering" className="btn-secondary text-sm inline-flex">
            Engineering standards
          </Link>
          <Link href="/contact" className="btn-primary text-sm inline-flex">
            Validate with our team
          </Link>
        </div>
      </div>
    </section>
  )
}

