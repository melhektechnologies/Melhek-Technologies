'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Play, RotateCcw, Cpu, Globe, Server, Terminal, Monitor } from 'lucide-react'
import Image from 'next/image'

interface OfficeShowcaseModalProps {
  isOpen: boolean
  onClose: () => void
}

interface Hotspot {
  id: number
  top: string
  left: string
  title: string
  desc: string
  icon: any
}

const HOTSPOTS: Hotspot[] = [
  {
    id: 1,
    top: '40%',
    left: '36%',
    title: 'Core Anchor Shield Hub',
    desc: 'The central engineering hub displaying our illuminated chrome anchor. Coordinates distributed replication servers and system status nodes.',
    icon: Cpu
  },
  {
    id: 2,
    top: '48%',
    left: '88%',
    title: 'Mainframe Server Rack',
    desc: 'Maintains low-latency cloud deployments, database synchronization nodes, and client-facing POS caching servers.',
    icon: Server
  },
  {
    id: 3,
    top: '60%',
    left: '12%',
    title: 'Engineering Operations Desk',
    desc: 'Dedicated workstations where consulting engineers review project blueprints, compile code, and run client intake workflows.',
    icon: Monitor
  }
]

export default function OfficeShowcaseModal({ isOpen, onClose }: OfficeShowcaseModalProps) {
  const [isPlaying, setIsPlaying] = useState(true)
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null)
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    'Initializing Melhek core mainframe connection...',
    'Secure SSL handshake completed. Code 200.',
  ])

  // ESC key close listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  // Simulate terminal logs printing
  useEffect(() => {
    if (!isOpen) return
    const logInterval = setInterval(() => {
      const logs = [
        'Main server replication health: 100% stable.',
        'Active connections from hotel booking nodes routing successfully.',
        'POS stock inventory database synced at 0.00ms latency.',
        'AI intake model weights verified: online and ready.',
        'Local firewall grid scanning for vulnerabilities: 0 threats.',
        'Melhek Digital client portals building via Next.js Turbopack...',
        'System load: 0.12 CPU / 4.1GB Memory usage.'
      ]
      const randomLog = logs[Math.floor(Math.random() * logs.length)]
      setTerminalLogs(prev => [...prev.slice(-4), `[${new Date().toLocaleTimeString()}] ${randomLog}`])
    }, 4000)

    return () => clearInterval(logInterval)
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-melhek-dark/90 p-4 md:p-8 backdrop-blur-md"
        >
          {/* Main Modal Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 180 }}
            className="relative w-full max-w-6xl aspect-[16/10] bg-melhek-navy rounded-3xl overflow-hidden border border-white/10 shadow-[0_24px_100px_rgba(127,169,255,0.25)] flex flex-col"
          >
            {/* Header controls overlay */}
            <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-melhek-dark/80 to-transparent z-30 px-6 flex items-center justify-between pointer-events-none">
              <div className="flex items-center gap-3 pointer-events-auto">
                <div className="px-3 py-1 rounded-full bg-melhek-blue/15 border border-melhek-blue/30 text-[10px] font-mono font-bold text-melhek-blue flex items-center gap-1.5 uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-melhek-blue animate-pulse" />
                  HQ Cinematic Experience
                </div>
              </div>

              <div className="flex items-center gap-3 pointer-events-auto">
                {/* Play/Pause camera button */}
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-2 rounded-full glass border-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
                  title={isPlaying ? 'Pause Camera' : 'Play Camera'}
                >
                  {isPlaying ? <X className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>

                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="p-2 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white/80 hover:text-white transition-all cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-4.5 h-4.5" />
                </button>
              </div>
            </div>

            {/* Immersive View Area */}
            <div className="flex-1 relative overflow-hidden bg-black flex items-center justify-center">
              {/* Cinematic Ken Burns visual */}
              <motion.div
                animate={isPlaying ? {
                  scale: [1, 1.05, 1],
                  x: [0, -10, 0],
                  y: [0, -5, 0]
                } : {}}
                transition={{
                  duration: 25,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                className="absolute inset-0 w-full h-full"
              >
                <Image
                  src="/office-showcase.png"
                  alt="Melhek Technologies Office Interior Cinematic AI View"
                  fill
                  sizes="100vw"
                  className="object-cover opacity-85 select-none"
                  priority
                />
              </motion.div>

              {/* Ambient Blue Neon Glow overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-melhek-dark/70 via-transparent to-melhek-dark/10 pointer-events-none" />

              {/* Hotspots layer */}
              <div className="absolute inset-0 z-20">
                {HOTSPOTS.map(spot => {
                  const Icon = spot.icon
                  const isActive = activeHotspot?.id === spot.id
                  return (
                    <div
                      key={spot.id}
                      className="absolute"
                      style={{ top: spot.top, left: spot.left }}
                    >
                      {/* Pulse Circle Trigger */}
                      <button
                        onMouseEnter={() => setActiveHotspot(spot)}
                        onMouseLeave={() => setActiveHotspot(null)}
                        className="relative w-8 h-8 flex items-center justify-center cursor-pointer group"
                      >
                        <span className="absolute w-8 h-8 bg-melhek-blue/30 rounded-full animate-ping group-hover:bg-melhek-blue/50" />
                        <span className="absolute w-5 h-5 bg-melhek-blue/70 rounded-full flex items-center justify-center border border-white/40 shadow-[0_0_12px_rgba(127,169,255,0.8)]">
                          <Icon className="w-3 h-3 text-melhek-navy" />
                        </span>
                      </button>

                      {/* Hotspot Card Overlay */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className="absolute z-50 bottom-10 left-1/2 -translate-x-1/2 w-64 glass p-4 rounded-xl border-white/10 pointer-events-none shadow-xl bg-melhek-navy/95"
                          >
                            <h5 className="text-xs font-bold text-white flex items-center gap-1.5 mb-1 font-display uppercase tracking-wider">
                              <Icon className="w-3.5 h-3.5 text-melhek-blue" />
                              {spot.title}
                            </h5>
                            <p className="text-[10px] text-white/60 leading-relaxed font-light">
                              {spot.desc}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                })}
              </div>

              {/* Real-time System Status terminal logs (Bottom Left) */}
              <div className="absolute bottom-6 left-6 z-20 w-80 glass p-4 rounded-xl border-white/5 bg-melhek-navy/80 hidden sm:block">
                <div className="flex items-center gap-2 mb-2 pb-1.5 border-b border-white/5 text-white/40 text-[9px] font-mono uppercase tracking-wider font-bold">
                  <Terminal className="w-3.5 h-3.5 text-melhek-blue" />
                  System Diagnostics Monitor
                </div>
                <div className="font-mono text-[9px] text-white/50 space-y-1">
                  {terminalLogs.map((log, idx) => (
                    <div key={idx} className="truncate select-none">{log}</div>
                  ))}
                </div>
              </div>

              {/* HQ details badge (Bottom Right) */}
              <div className="absolute bottom-6 right-6 z-20 w-48 glass p-4 rounded-xl border-white/5 bg-melhek-navy/80 flex flex-col gap-1.5">
                <div className="flex items-center gap-2 text-[10px] font-mono text-melhek-blue font-bold uppercase tracking-wider">
                  <Globe className="w-3.5 h-3.5" />
                  Mainframe Status
                </div>
                <div className="flex justify-between text-[9px] font-mono text-white/40">
                  <span>Environment:</span>
                  <span className="text-emerald-400 font-bold">PRODUCTION</span>
                </div>
                <div className="flex justify-between text-[9px] font-mono text-white/40">
                  <span>Active Nodes:</span>
                  <span className="text-white">6 Ecosystems</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
