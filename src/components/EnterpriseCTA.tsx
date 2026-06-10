'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Zap, Shield, Globe } from 'lucide-react'

const PARTICLES = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2 + 1,
  delay: Math.random() * 5,
  duration: Math.random() * 4 + 4,
}))

const highlights = [
  { icon: Zap, label: 'Fast Delivery' },
  { icon: Shield, label: 'Enterprise Grade' },
  { icon: Globe, label: 'Globally Ready' },
]

export default function EnterpriseCTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-[4rem] overflow-hidden"
        >
          {/* Animated border glow */}
          <div className="absolute inset-0 rounded-[4rem] p-[1px] z-0">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute -inset-[100%] bg-conic-gradient opacity-40"
              style={{
                background: 'conic-gradient(from 0deg, transparent 60%, rgba(127,169,255,0.8) 80%, transparent 100%)',
              }}
            />
            <div className="absolute inset-[1px] rounded-[4rem] bg-melhek-navy" />
          </div>

          {/* Static border as fallback */}
          <div className="absolute inset-0 rounded-[4rem] border border-melhek-blue/20 z-0" />

          {/* Main background */}
          <div className="relative z-10 glass rounded-[4rem] p-12 md:p-24 text-center overflow-hidden border-melhek-blue/20">

            {/* Gradient mesh background */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-melhek-blue/10 via-melhek-navy/60 to-melhek-dark" />
              {/* Pulsing glow orbs */}
              <motion.div
                animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-1/2 -left-1/4 w-[70%] h-[70%] bg-melhek-blue/20 blur-[120px] rounded-full"
              />
              <motion.div
                animate={{ scale: [1, 1.4, 1], opacity: [0.15, 0.3, 0.15] }}
                transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
                className="absolute -bottom-1/2 -right-1/4 w-[60%] h-[60%] bg-melhek-blue/15 blur-[100px] rounded-full"
              />

              {/* Animated particle dots */}
              {PARTICLES.map((p) => (
                <motion.div
                  key={p.id}
                  className="absolute rounded-full bg-melhek-blue/60"
                  style={{
                    left: `${p.x}%`,
                    top: `${p.y}%`,
                    width: p.size,
                    height: p.size,
                  }}
                  animate={{
                    opacity: [0, 0.8, 0],
                    scale: [0.5, 1.5, 0.5],
                    y: [0, -20, 0],
                  }}
                  transition={{
                    duration: p.duration,
                    delay: p.delay,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              ))}

              {/* Grid pattern */}
              <div
                className="absolute inset-0 opacity-[0.025]"
                style={{
                  backgroundImage: 'linear-gradient(rgba(127,169,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(127,169,255,0.5) 1px, transparent 1px)',
                  backgroundSize: '60px 60px'
                }}
              />
            </div>

            {/* Top badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-melhek-blue/30 mb-10"
            >
              <span className="w-1.5 h-1.5 bg-melhek-blue rounded-full animate-pulse shadow-[0_0_8px_#7FA9FF]" />
              <span className="text-[11px] font-mono font-bold uppercase tracking-[0.15em] text-melhek-blue">
                Ready to Begin?
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-7xl font-syne font-extrabold mb-6 text-white leading-[1.05] tracking-[-0.03em]"
            >
              Ready to Build Your <br />
              <span className="text-gradient">Digital Anchor?</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="text-lg text-white/50 mb-10 max-w-2xl mx-auto leading-relaxed font-light"
            >
              Join the circle of businesses powered by Melhek Technologies. 
              Let&apos;s engineer your future, on time, on budget, and built to last.
            </motion.p>

            {/* Highlight pills */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap items-center justify-center gap-4 mb-12"
            >
              {highlights.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/60 text-[12px] font-mono uppercase tracking-wider"
                >
                  <Icon className="w-3.5 h-3.5 text-melhek-blue" />
                  {label}
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
            >
              <Link href="/contact" className="btn-primary flex items-center gap-3 text-base px-8 py-4">
                Consult with Engineering <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/pricing" className="btn-secondary text-base px-8 py-4">
                Calculate Project Cost
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
