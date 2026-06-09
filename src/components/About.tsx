'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Anchor, Compass, Zap, Shield, Warehouse, Brain, Globe, Rocket } from 'lucide-react'

const pillars = [
  { icon: <Anchor />, label: "Stability", desc: "Consistent systems that keep your business running smoothly" },
  { icon: <Compass />, label: "Guidance", desc: "Navigating digital choices with clear, simple advice" },
  { icon: <Shield />, label: "Security", desc: "Protecting your customer details and database records" },
  { icon: <Zap />, label: "Reliability", desc: "Long-lasting software built to handle daily store operations" }
]

const values = [
  { icon: <Warehouse />, label: "Simple Operations", desc: "Software that is easy for your team to learn and manage" },
  { icon: <Brain />, label: "Task Automation", desc: "Saving time by handling repetitive tasks automatically" },
  { icon: <Globe />, label: "Local Excellence", desc: "World-class business solutions built by local engineers" },
  { icon: <Rocket />, label: "Growth Ready", desc: "Systems prepared to support your future business expansion" }
]

export default function About() {
  return (
    <section id="about" className="py-24 relative overflow-hidden bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,_rgba(1,11,61,0.3)_0%,_transparent_70%)]">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          {/* Visual Pillars */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative order-2 lg:order-1"
          >
            <div className="aspect-square glass rounded-[3rem] p-10 flex items-center justify-center relative overflow-hidden group">
               {/* Digital Mesh */}
               <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(var(--electric) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
               
               {/* Pillars Grid */}
               <div className="grid grid-cols-2 gap-4 relative z-10 w-full">
                {pillars.map((pillar, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.05, borderColor: 'rgba(127,169,255,0.4)' }}
                    className="glass p-8 rounded-2xl flex flex-col items-center text-center gap-3 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
                  >
                    <div className="text-melhek-blue mb-1 w-8 h-8 flex items-center justify-center">
                      {pillar.icon}
                    </div>
                    <div className="text-[13px] font-syne font-bold text-white uppercase tracking-wider">{pillar.label}</div>
                    <div className="text-[10px] text-melhek-steel/40 leading-relaxed font-medium">{pillar.desc}</div>
                  </motion.div>
                ))}
              </div>

              {/* Large Watermark Shield */}
              <Image 
                src="/logo-light.png" 
                alt="Melhek Shield" 
                fill
                sizes="(max-width: 1024px) 80vw, 40vw"
                className="opacity-[0.02] object-contain absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none group-hover:scale-110 transition-transform duration-[2s] grayscale" 
              />
            </div>
          </motion.div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="px-4 py-1.5 rounded-full glass border-white/10 text-[10px] font-mono font-bold text-melhek-blue uppercase tracking-[0.2em] inline-block mb-6"
            >
              Our Foundation
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[clamp(36px,5vw,64px)] font-syne font-extrabold text-white mb-8 leading-[1.05]"
            >
              Anchored in <br />
              <span className="text-gradient">Innovation.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-[17px] text-melhek-steel/60 leading-[1.8] mb-12 font-light"
            >
              Melhek Technologies was founded to help organizations build stable, reliable, and easy-to-use digital tools. In a fast-changing business world, we believe you deserve software systems that work without errors. We combine clean design with precise development so you can manage your operations with complete confidence.
            </motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {values.map((value, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + (i * 0.1) }}
                  className="flex items-center gap-5 p-6 glass rounded-2xl hover:border-melhek-blue/30 transition-all duration-300 group"
                >
                  <div className="text-melhek-blue w-6 h-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    {value.icon}
                  </div>
                  <div>
                    <div className="text-[12px] font-syne font-bold text-white uppercase tracking-wider">{value.label}</div>
                    <div className="text-[10px] text-melhek-steel/40 font-medium uppercase tracking-widest mt-1">{value.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 flex flex-wrap gap-4">
              <Link href="/contact" className="btn-primary text-sm">
                Partner with Melhek
              </Link>
              <Link href="/#ecosystem" className="btn-secondary text-sm">
                Explore divisions
              </Link>
              <Link href="/about" className="btn-secondary text-sm">
                Mission page
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
