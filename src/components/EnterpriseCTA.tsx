'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function EnterpriseCTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-[4rem] p-12 md:p-24 text-center relative overflow-hidden border-melhek-blue/20"
        >
          {/* Animated Background Effect */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-melhek-blue/10 via-transparent to-melhek-navy/50" />
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-1/2 -left-1/2 w-full h-full bg-melhek-blue/20 blur-[120px] rounded-full"
            />
          </div>

          <h2 className="text-4xl md:text-7xl font-display font-bold mb-8 text-white leading-tight">
            Ready to Build Your <br />
            <span className="text-gradient">Digital Anchor?</span>
          </h2>
          <p className="text-xl text-white/50 mb-12 max-w-2xl mx-auto">
            Join the elite circle of businesses powered by Melhek Technologies. Let&apos;s engineer your future together.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/contact" className="btn-primary flex items-center gap-3">
              Consult with Engineering <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/portfolio" className="btn-secondary">
              View Case Studies
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
