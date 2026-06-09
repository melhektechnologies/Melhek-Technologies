'use client'

import { motion } from 'framer-motion'
import { ShieldCheck, Zap, Layers, Smartphone, Eye, Award } from 'lucide-react'

const principles = [
  {
    step: "01",
    icon: <ShieldCheck className="w-6 h-6" />,
    title: "Security First",
    desc: "We build defense into every layer. From role-based credential controls and data hashing to threat modeling and isolated data stores, security is never a afterthought.",
    spec: "AES-256 Encryption · OWASP Hardened"
  },
  {
    step: "02",
    icon: <Zap className="w-6 h-6" />,
    title: "Performance Driven",
    desc: "Speed directly impacts user retention and processing costs. We target sub-second response times using static generation, edge caching, and fine-tuned database indexing.",
    spec: "Sub-100ms API Response · edge CDN"
  },
  {
    step: "03",
    icon: <Layers className="w-6 h-6" />,
    title: "Scalable Architecture",
    desc: "We design for high availability and low coupling. Bounded contexts, stateless server layers, and clean microservices ensure that your platform scales smoothly.",
    spec: "Stateless Layers · Dynamic Autoscaling"
  },
  {
    step: "04",
    icon: <Smartphone className="w-6 h-6" />,
    title: "Mobile First",
    desc: "Most systems in emerging economies run on mobile devices. We design lightweight, offline-resilient, and mobile-optimized layouts that load fast over local connections.",
    spec: "Progressive Web Ready · Network Resilient"
  },
  {
    step: "05",
    icon: <Eye className="w-6 h-6" />,
    title: "Future Ready Systems",
    desc: "We protect you from legacy rot. By adopting strict types, modular interfaces, and automated documentation, systems remain easy to refactor as your business models shift.",
    spec: "TypeScript Strict · Automated CI/CD"
  },
  {
    step: "06",
    icon: <Award className="w-6 h-6" />,
    title: "Business Focused Design",
    desc: "We do not write code for its own sake. Every component, pipeline, and API is engineered to optimize real-world business indicators, automate workflows, and reduce cost.",
    spec: "Workflow Optimization · Direct ROI Focus"
  }
]

export default function EngineeringPrinciples() {
  return (
    <section id="engineering-principles" className="py-24 relative overflow-hidden bg-melhek-dark">
      {/* Mesh background grid lines */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(127,169,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(127,169,255,0.1) 1px, transparent 1px)', backgroundSize: '100px 100px' }} />

      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="px-4 py-1 rounded-full glass border-white/10 text-[10px] font-mono font-bold text-melhek-blue uppercase tracking-[0.2em] inline-block mb-6"
          >
            Engineering Standards
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[clamp(36px,5vw,64px)] font-syne font-extrabold text-white mb-6 leading-[1.1]"
          >
            Our Uncompromising<br />
            <span className="text-gradient">Engineering Principles.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[17px] text-melhek-steel/50 leading-relaxed max-w-2xl mx-auto font-light"
          >
            Melhek operates under strict technical protocols to construct digital systems that remain secure, performant, and stable for years to come.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {principles.map((pr, i) => (
            <motion.div
              key={pr.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass p-10 rounded-2xl border-white/5 hover:border-melhek-blue/30 transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between h-full group"
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="text-melhek-blue bg-white/5 border border-white/10 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    {pr.icon}
                  </div>
                  <div className="text-4xl font-mono font-bold text-white/[0.03] group-hover:text-melhek-blue/10 transition-colors">
                    {pr.step}
                  </div>
                </div>

                <h3 className="text-xl font-syne font-bold text-white mb-4 group-hover:text-melhek-blue transition-colors">
                  {pr.title}
                </h3>
                <p className="text-[14px] text-melhek-steel/40 leading-relaxed mb-6 font-medium">
                  {pr.desc}
                </p>
              </div>

              <div className="pt-6 border-t border-white/5 text-[9px] font-mono text-melhek-blue/60 uppercase tracking-widest">
                {pr.spec}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
