'use client'

import Link from 'next/link'
import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Quote } from 'lucide-react'
import { getTestimonials } from '@/app/actions/testimonials'
import { Testimonial } from '@/types/testimonial'
import { GridSkeleton, ErrorState } from './ui/StatusStates'

export default function Testimonials() {
  const [data, setData] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const syncTestimonials = useCallback(async () => {
    setLoading(true)
    setError(null)
    const { data: fetchResult, error: fetchError } = await getTestimonials()
    
    if (fetchError) {
      setError(fetchError)
    } else if (fetchResult) {
      setData(fetchResult)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    const load = async () => {
      await Promise.resolve()
      syncTestimonials()
    }
    load()
  }, [syncTestimonials])

  return (
    <section id="testimonials" className="py-24 bg-white/[0.01]" aria-labelledby="testimonials-heading">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <Quote className="w-12 h-12 text-melhek-blue/20 mx-auto mb-6" aria-hidden="true" />
          <h2 id="testimonials-heading" className="text-4xl md:text-5xl font-syne font-bold mb-6 text-white">
            Trusted by <span className="text-melhek-blue">Visionaries.</span>
          </h2>
          <p className="text-white/40 max-w-xl mx-auto text-sm leading-relaxed">
            Leading enterprises rely on our engineering precision to anchor their digital transformations.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <GridSkeleton count={3} />
            </motion.div>
          ) : error ? (
            <motion.div 
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ErrorState error={error} onRetry={syncTestimonials} />
            </motion.div>
          ) : (
            <motion.div 
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid md:grid-cols-3 gap-8"
            >
              {data.map((t, i) => (
                <TestimonialCard key={t.id} testimonial={t} index={i} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-16 text-center">
          <p className="text-white/35 text-sm mb-6 font-mono uppercase tracking-widest">
            Ready for the same precision?
          </p>
          <Link href="/contact" className="btn-primary text-sm inline-flex">
            Start a project
          </Link>
        </div>
      </div>
    </section>
  )
}

function TestimonialCard({ testimonial, index }: { testimonial: Testimonial, index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="glass p-10 rounded-[2.5rem] border-white/5 hover:border-melhek-blue/20 transition-all group relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-melhek-blue/5 blur-3xl rounded-full translate-x-12 -translate-y-12 group-hover:bg-melhek-blue/10 transition-colors" />
      
      <p className="text-lg text-white/70 italic mb-10 leading-relaxed relative z-10">
        &ldquo;{testimonial.quote}&rdquo;
      </p>
      
      <footer className="relative z-10">
        <div className="font-bold text-white group-hover:text-melhek-blue transition-colors">
          {testimonial.author}
        </div>
        <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/30 mt-1">
          {testimonial.role}
        </div>
      </footer>
    </motion.article>
  )
}

