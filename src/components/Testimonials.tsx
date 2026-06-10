'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Quote, Star } from 'lucide-react'

// Static testimonials for the marquee (no server call needed for this pattern)
const ALL_TESTIMONIALS = [
  {
    id: 't1',
    quote: "Melhek Technologies didn't just build us a website — they built us a digital command center. Their precision is unmatched.",
    author: 'Samuel K.',
    role: 'CEO, Luxury Hospitality Group',
    rating: 5,
  },
  {
    id: 't2',
    quote: "The stability and security of our new infrastructure gave us the confidence to scale globally. A true digital anchor.",
    author: 'Elena R.',
    role: 'Director of Operations, SecureNet',
    rating: 5,
  },
  {
    id: 't3',
    quote: "Working with Melhek feels like looking into the future of engineering. Elite in every sense of the word.",
    author: 'David O.',
    role: 'Founder, AI Ventures',
    rating: 5,
  },
  {
    id: 't4',
    quote: "Our hotel booking system has been flawless since launch. Zero downtime, instant support — exactly what a growing business needs.",
    author: 'Fatima A.',
    role: 'General Manager, Grand Addis Hotel',
    rating: 5,
  },
  {
    id: 't5',
    quote: "The inventory management system they delivered cut our stock errors by 80%. The ROI was visible within the first month.",
    author: 'Yohannes B.',
    role: 'Operations Director, Sunrise Supermarkets',
    rating: 5,
  },
  {
    id: 't6',
    quote: "From design to deployment, every interaction was professional, fast, and clear. I finally have a website I'm proud to show the world.",
    author: 'Miriam T.',
    role: 'Founder, Ethio Consulting Group',
    rating: 5,
  },
]

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="w-3 h-3 text-amber-400 fill-amber-400" />
      ))}
    </div>
  )
}

function TestimonialCard({ t }: { t: typeof ALL_TESTIMONIALS[0] }) {
  return (
    <div className="flex-shrink-0 w-[340px] md:w-[420px] glass p-8 rounded-3xl border-white/5 hover:border-melhek-blue/20 transition-all duration-500 group relative overflow-hidden mx-4">
      {/* Corner glow */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-melhek-blue/5 blur-2xl rounded-full translate-x-10 -translate-y-10 group-hover:bg-melhek-blue/10 transition-colors" />

      <div className="flex items-start justify-between mb-5">
        <Quote className="w-6 h-6 text-melhek-blue/30 flex-shrink-0" />
        <StarRating count={t.rating} />
      </div>

      <p className="text-[15px] text-white/70 italic mb-7 leading-relaxed relative z-10 line-clamp-4">
        &ldquo;{t.quote}&rdquo;
      </p>

      <div className="relative z-10 flex items-center gap-3">
        {/* Avatar placeholder with initials */}
        <div className="w-9 h-9 rounded-full bg-melhek-blue/20 border border-melhek-blue/30 flex items-center justify-center flex-shrink-0">
          <span className="text-[11px] font-syne font-bold text-melhek-blue">
            {t.author.split(' ').map(n => n[0]).join('')}
          </span>
        </div>
        <div>
          <div className="font-bold text-white text-sm group-hover:text-melhek-blue transition-colors">
            {t.author}
          </div>
          <div className="text-[10px] font-mono uppercase tracking-[0.15em] text-white/30 mt-0.5">
            {t.role}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Testimonials() {
  const [isPaused, setIsPaused] = useState(false)
  const marqueeRef = useRef<HTMLDivElement>(null)
  const animRef = useRef<number>(0)
  const posRef = useRef(0)
  const speedRef = useRef(0.6) // px per frame

  // Clone for seamless loop
  const doubled = [...ALL_TESTIMONIALS, ...ALL_TESTIMONIALS]

  useEffect(() => {
    const el = marqueeRef.current
    if (!el) return

    const step = () => {
      if (!isPaused) {
        posRef.current -= speedRef.current
        // Reset when first set scrolled out
        const halfWidth = el.scrollWidth / 2
        if (Math.abs(posRef.current) >= halfWidth) {
          posRef.current = 0
        }
        el.style.transform = `translateX(${posRef.current}px)`
      }
      animRef.current = requestAnimationFrame(step)
    }

    animRef.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(animRef.current)
  }, [isPaused])

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden" aria-labelledby="testimonials-heading">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[300px] bg-melhek-blue/4 blur-[100px] rounded-full" />
      </div>

      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Quote className="w-10 h-10 text-melhek-blue/20 mx-auto mb-5" aria-hidden="true" />
          <h2
            id="testimonials-heading"
            className="text-4xl md:text-5xl font-syne font-bold mb-4 text-white tracking-[-0.03em]"
          >
            Trusted by <span className="text-melhek-blue">Visionaries.</span>
          </h2>
          <p className="text-white/40 max-w-xl mx-auto text-sm leading-relaxed">
            Leading organisations rely on our engineering precision to anchor their digital transformations.
          </p>
        </motion.div>
      </div>

      {/* Infinite Marquee Strip */}
      <div
        className="relative overflow-hidden py-4"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-melhek-dark to-transparent z-10 pointer-events-none" />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-melhek-dark to-transparent z-10 pointer-events-none" />

        <div ref={marqueeRef} className="flex will-change-transform">
          {doubled.map((t, i) => (
            <TestimonialCard key={`${t.id}-${i}`} t={t} />
          ))}
        </div>
      </div>

      <div className="mt-14 text-center">
        <p className="text-white/35 text-sm mb-6 font-mono uppercase tracking-widest">
          Ready for the same precision?
        </p>
        <Link href="/contact" className="btn-primary text-sm inline-flex">
          Start a project
        </Link>
      </div>
    </section>
  )
}
