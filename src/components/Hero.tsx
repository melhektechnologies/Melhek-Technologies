'use client'

import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Hero() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  // Use springs for smoother scroll-based movement
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 }
  const y1Raw = useTransform(scrollYProgress, [0, 1], [0, 200])
  const y2Raw = useTransform(scrollYProgress, [0, 1], [0, -150])
  
  const y1 = useSpring(y1Raw, springConfig)
  const y2 = useSpring(y2Raw, springConfig)
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0])

  return (
    <section 
      ref={containerRef} 
      id="hero" 
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-40 pb-20 text-center"
      aria-labelledby="hero-headline"
    >
      {/* Background System */}
      <div className="hero-bg absolute inset-0 z-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_10%,_rgba(1,11,61,0.9)_0%,_#050816_70%)]" aria-hidden="true" />
      
      {/* Animated Orbs */}
      <motion.div 
        style={{ y: y1 }} 
        className="absolute w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,_rgba(127,169,255,0.18)_0%,_transparent_70%)] top-[-200px] left-1/2 -translate-x-1/2 animate-orb-float pointer-events-none will-change-transform" 
        aria-hidden="true"
      />
      <motion.div 
        style={{ y: y2 }} 
        className="absolute w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,_rgba(1,11,61,0.7)_0%,_rgba(127,169,255,0.08)_70%)] bottom-[100px] right-[-100px] animate-orb-float pointer-events-none will-change-transform" 
        aria-hidden="true"
      />
      
      {/* Digital Grid */}
      <div className="digital-grid" aria-hidden="true" />

      {/* Official Brand Anchor - Watermark */}
      <motion.div
        style={{ y: y1, opacity: 0.05 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] pointer-events-none z-0 overflow-hidden"
      >
        <Image 
          src="/logo-light.png" 
          alt="Melhek Watermark" 
          fill
          sizes="100vw"
          className="object-contain filter grayscale brightness-200 blur-[2px]" 
        />
      </motion.div>

      {/* Main Content */}
      <motion.div style={{ opacity }} className="container mx-auto px-6 relative z-10">
        <header className="max-w-5xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-white/10 mb-10"
          >
            <span className="w-1.5 h-1.5 bg-melhek-blue rounded-full animate-pulse shadow-[0_0_8px_#7FA9FF]" />
            <span className="text-[11px] font-mono font-semibold uppercase tracking-[0.12em] text-melhek-blue">
              Advanced Digital Infrastructure · Est. 2024
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            id="hero-headline"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="font-syne font-extrabold text-[clamp(42px,7vw,88px)] leading-[1.0] tracking-[-0.03em] mb-8 text-white"
          >
            <span className="block">Engineering Intelligent</span>
            <span className="text-gradient block">Digital Infrastructure.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-[clamp(16px,2vw,20px)] text-melhek-steel/70 mb-12 max-w-2xl mx-auto leading-[1.7] font-light"
          >
            Melhek Technologies is your digital anchor — building precision technology systems, intelligent platforms, and future-ready infrastructure for visionary businesses.
          </motion.p>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              href="/contact"
              className="btn-primary px-8 py-4 text-sm font-bold uppercase tracking-widest focus-visible:ring-2 ring-melhek-blue outline-none transition-all"
            >
              Start Project →
            </Link>
            <Link
              href="/#ecosystem"
              className="btn-secondary px-8 py-4 text-sm font-bold uppercase tracking-widest focus-visible:ring-2 ring-melhek-blue outline-none transition-all"
            >
              Explore Ecosystem
            </Link>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="mt-16 flex flex-wrap justify-center gap-8 text-[11px] font-medium uppercase tracking-[0.08em] text-melhek-blue/40"
          >
            {[
              "Enterprise Ready",
              "AI-Powered Systems",
              "Future Infrastructure",
              "Precision Engineered"
            ].map((text) => (
              <div key={text} className="flex items-center gap-2 font-mono">
                <div className="w-1 h-1 bg-melhek-blue rounded-full" />
                {text}
              </div>
            ))}
          </motion.div>
        </header>
      </motion.div>

      {/* Floating Status Cards */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <motion.div
          style={{ y: y1 }}
          className="absolute top-[30%] left-[6%] hidden xl:block"
        >
          <div className="glass p-5 rounded-2xl border-white/10 max-w-[180px] animate-float will-change-transform">
            <div className="text-[10px] font-mono text-melhek-blue/50 uppercase tracking-widest mb-1">System Uptime</div>
            <div className="text-2xl font-syne font-bold text-melhek-blue">99.97%</div>
            <div className="text-[11px] text-white/30 mt-1">All systems operational</div>
          </div>
        </motion.div>

        <motion.div
          style={{ y: y2 }}
          className="absolute top-[25%] right-[6%] hidden xl:block"
        >
          <div className="glass p-5 rounded-2xl border-white/10 max-w-[180px] animate-float [animation-delay:-3s] will-change-transform">
            <div className="text-[10px] font-mono text-melhek-blue/50 uppercase tracking-widest mb-1">Projects Delivered</div>
            <div className="text-2xl font-syne font-bold text-melhek-blue">40+</div>
            <div className="text-[11px] text-white/30 mt-1">Across 8 industries</div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        aria-hidden="true"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-melhek-blue to-transparent animate-[scroll-line_2s_ease-in-out_infinite]" />
        <span className="text-[10px] uppercase tracking-[0.15em] text-white/30 font-mono">Scroll</span>
      </motion.div>
    </section>
  )
}

