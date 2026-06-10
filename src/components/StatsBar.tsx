'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const stats = [
  { label: 'Projects Delivered', value: '50+', href: '/portfolio' },
  { label: 'Industries Served', value: '9', href: '/#portfolio' },
  { label: 'Technology Divisions', value: '6', href: '/#ecosystem' },
  { label: 'Client Satisfaction %', value: '100', href: '/#testimonials' },
]

export default function StatsBar() {
  return (
    <div className="relative z-20 border-y border-white/5 bg-melhek-dark/40 backdrop-blur-3xl py-14">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className="text-center md:border-r last:border-none border-white/5"
            >
              <Link
                href={stat.href}
                className="block group outline-none focus-visible:ring-2 ring-melhek-blue rounded-lg"
              >
                <div className="text-[52px] font-syne font-extrabold text-melhek-blue leading-[1.0] tracking-[-0.03em] mb-2 group-hover:text-white transition-colors">
                  {stat.value}
                </div>
                <div className="text-[11px] uppercase tracking-[0.08em] text-melhek-steel/50 font-mono font-bold group-hover:text-melhek-blue/80 transition-colors">
                  {stat.label}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
