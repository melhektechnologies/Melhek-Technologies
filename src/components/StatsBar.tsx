'use client'

import Link from 'next/link'
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect, useRef } from 'react'

const stats = [
  { label: 'Projects Delivered', value: 50, suffix: '+', href: '/portfolio', desc: 'Across all divisions' },
  { label: 'Industries Served', value: 9, suffix: '', href: '/#portfolio', desc: 'Sectors we power' },
  { label: 'Technology Divisions', value: 6, suffix: '', href: '/#ecosystem', desc: 'Full-stack ecosystem' },
  { label: 'Client Satisfaction', value: 100, suffix: '%', href: '/#testimonials', desc: 'Zero compromise' },
]

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const count = useMotionValue(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(count, target, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = Math.floor(v) + suffix
      }
    })
    return controls.stop
  }, [inView, count, target, suffix])

  return (
    <span ref={ref} className="tabular-nums">
      0{suffix}
    </span>
  )
}

export default function StatsBar() {
  return (
    <div className="relative z-20 border-y border-white/5 bg-melhek-dark/60 backdrop-blur-3xl py-16 overflow-hidden">
      {/* Top glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-[1px] bg-gradient-to-r from-transparent via-melhek-blue/40 to-transparent" />
      {/* Bottom glow line */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-[1px] bg-gradient-to-r from-transparent via-melhek-blue/20 to-transparent" />
      {/* Ambient center glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] bg-melhek-blue/5 blur-[80px] rounded-full" />
      </div>

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className={`relative text-center px-6 py-2 ${i < stats.length - 1 ? 'md:border-r border-white/[0.06]' : ''}`}
            >
              <Link
                href={stat.href}
                className="block group outline-none focus-visible:ring-2 ring-melhek-blue rounded-lg py-2"
              >
                {/* Glow on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                  <div className="absolute inset-0 bg-melhek-blue/5 rounded-xl blur-xl" />
                </div>

                <div className="text-[56px] font-syne font-extrabold text-melhek-blue leading-[1.0] tracking-[-0.04em] mb-1 group-hover:text-white transition-colors duration-500 relative">
                  <CountUp target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-[12px] uppercase tracking-[0.1em] text-white/70 font-mono font-bold group-hover:text-melhek-blue/80 transition-colors mb-1">
                  {stat.label}
                </div>
                <div className="text-[10px] text-white/25 font-mono tracking-wider">
                  {stat.desc}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
