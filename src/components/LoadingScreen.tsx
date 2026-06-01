'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import Image from 'next/image'

const MotionImage = motion.create(Image)

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      setLoading(false)
      return
    }

    const timer = window.setTimeout(() => setLoading(false), 3500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] bg-melhek-dark flex flex-col items-center justify-center"
        >
          {/* Background Ambient Glow */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.3, 0.1]
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-melhek-blue/10 blur-[120px] rounded-full" 
            />
          </div>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="relative z-10"
          >
            {/* The Logo Container */}
            <div className="w-32 h-32 relative">
              <MotionImage 
                src="/logo-light.png" 
                alt="Melhek Technologies" 
                fill
                priority
                sizes="128px"
                className="object-contain"
                initial={{ filter: 'brightness(0) invert(1)' }}
                animate={{ filter: 'brightness(1) invert(0)' }}
                transition={{ duration: 2, delay: 0.5 }}
              />
              
              {/* Scanning Effect */}
              <motion.div
                initial={{ top: "-10%" }}
                animate={{ top: "110%" }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 right-0 h-[2px] bg-melhek-blue/50 blur-[2px] z-20"
              />
            </div>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 2.5, ease: "easeInOut" }}
              className="absolute -bottom-12 left-0 h-[1px] bg-gradient-to-r from-transparent via-melhek-blue to-transparent"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="mt-16 text-[10px] uppercase tracking-[0.6em] text-white/40 font-bold"
          >
            Precision Infrastructure Initializing
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
