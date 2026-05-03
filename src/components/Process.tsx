'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const steps = [
  { step: "01", title: "Discovery", desc: "Deep architectural audit and business intelligence gathering." },
  { step: "02", title: "Engineering", desc: "Precision development using our elite technology infrastructure." },
  { step: "03", title: "Testing", desc: "Rigorous security and performance validation protocols." },
  { step: "04", title: "Deployment", desc: "Seamless integration into your digital ecosystem." },
  { step: "05", title: "Expansion", desc: "Continuous evolution and intelligent scaling." }
]

export default function Process() {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Our <span className="text-melhek-blue">Workflow.</span></h2>
          <p className="text-white/40 max-w-xl mx-auto">A systematic approach to engineering world-class digital infrastructure.</p>
        </div>

        <div className="grid md:grid-cols-5 gap-12">
          {steps.map((item, i) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative group"
            >
              <div className="text-6xl font-black text-white/[0.03] mb-4 group-hover:text-melhek-blue/10 transition-colors">
                {item.step}
              </div>
              <h4 className="text-lg font-bold text-white mb-3">{item.title}</h4>
              <p className="text-sm text-white/40 leading-relaxed">{item.desc}</p>
              
              {/* Connector Line */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 -right-6 w-12 h-[1px] bg-white/10" />
              )}
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center flex flex-wrap justify-center gap-4">
          <Link href="/contact" className="btn-primary text-sm">
            Start discovery
          </Link>
          <Link href="/portfolio" className="btn-secondary text-sm">
            See delivered work
          </Link>
        </div>
      </div>
    </section>
  )
}
