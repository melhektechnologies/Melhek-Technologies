'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import {
  Cpu, Server, Monitor, Terminal, Globe, RotateCcw, X, Play, Pause, Volume2, VolumeX, Activity, Eye
} from 'lucide-react'

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
    top: '42%',
    left: '38%',
    title: 'Core Anchor Shield Hub',
    desc: 'The central engineering hub. Coordinates distributed replication servers and system status nodes across all divisions.',
    icon: Cpu
  },
  {
    id: 2,
    top: '50%',
    left: '86%',
    title: 'Mainframe Server Rack',
    desc: 'Maintains low-latency cloud deployments, database synchronization nodes, and client-facing POS caching servers.',
    icon: Server
  },
  {
    id: 3,
    top: '62%',
    left: '15%',
    title: 'Engineering Operations Desk',
    desc: 'Dedicated workstations where consulting engineers review project blueprints, compile code, and run client intake workflows.',
    icon: Monitor
  }
]

const SYSTEM_LOGS = [
  'Main server replication health: 100% stable.',
  'Active connections from hotel booking nodes routing successfully.',
  'POS stock inventory database synced at 0.00ms latency.',
  'AI intake model weights verified: online and ready.',
  'Local firewall grid scanning for vulnerabilities: 0 threats.',
  'Melhek Digital client portals building via Next.js Turbopack...',
  'System load: 0.12 CPU / 4.1 GB Memory usage.',
  'Edge CDN cache refreshed. Serving 99.99% uptime globally.',
  'All 6 ecosystem nodes reporting green status.',
]

function formatTime(seconds: number): string {
  if (isNaN(seconds)) return '0:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

export default function Hero() {
  const [isPreviewActive, setIsPreviewActive] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    'Initializing Melhek core mainframe connection...',
    'Secure SSL handshake completed. Code 200.',
    'Establishing remote camera stream feed...'
  ])

  const containerRef = useRef(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  // Use springs for smoother scroll-based movement
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 }
  const y1Raw = useTransform(scrollYProgress, [0, 1], [0, 200])
  const y2Raw = useTransform(scrollYProgress, [0, 1], [0, -150])
  
  const y1 = useSpring(y1Raw, springConfig)
  const y2 = useSpring(y2Raw, springConfig)
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0])

  // Play/Pause background video
  const handlePlayPause = useCallback(() => {
    if (!videoRef.current) return
    if (isPlaying) {
      videoRef.current.pause()
      setIsPlaying(false)
    } else {
      videoRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false))
    }
  }, [isPlaying])

  // Volume toggle
  const toggleMute = useCallback(() => {
    if (!videoRef.current) return
    const newMuted = !isMuted
    videoRef.current.muted = newMuted
    setIsMuted(newMuted)
  }, [isMuted])

  // Seek handler
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return
    const t = parseFloat(e.target.value)
    videoRef.current.currentTime = t
    setCurrentTime(t)
  }

  // Telemetry log ticker simulation
  useEffect(() => {
    const interval = setInterval(() => {
      const log = SYSTEM_LOGS[Math.floor(Math.random() * SYSTEM_LOGS.length)]
      setTerminalLogs(prev => [...prev.slice(-4), `[${new Date().toLocaleTimeString()}] ${log}`])
    }, 4500)
    return () => clearInterval(interval)
  }, [])

  // Manage video playback state when toggling preview mode
  const enterPreviewMode = () => {
    setIsPreviewActive(true)
    if (videoRef.current) {
      videoRef.current.muted = false
      setIsMuted(false)
      videoRef.current.play()
        .then(() => setIsPlaying(true))
    }
  }

  const exitPreviewMode = () => {
    setIsPreviewActive(false)
    setActiveHotspot(null)
    if (videoRef.current) {
      videoRef.current.muted = true
      setIsMuted(true)
    }
  }

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <section 
      ref={containerRef} 
      id="hero" 
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-40 pb-20 text-center bg-melhek-dark"
      aria-labelledby="hero-headline"
    >
      {/* ── LIVING BACKGROUND VIDEO (At the blurred logo place) ── */}
      <div 
        className="absolute inset-0 z-0 overflow-hidden transition-all duration-1000 ease-in-out"
        style={{
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, black 40%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, black 40%, transparent 100%)'
        }}
      >
        <video
          ref={videoRef}
          src="/office-showcase.mp4"
          className={`w-full h-full object-cover transition-all duration-1000 ease-in-out mix-blend-screen pointer-events-none select-none ${
            isPreviewActive ? 'opacity-55 blur-none scale-100' : 'opacity-10 blur-[4px] scale-105'
          }`}
          playsInline
          loop
          muted={isMuted}
          onTimeUpdate={() => setCurrentTime(videoRef.current?.currentTime ?? 0)}
          onLoadedMetadata={() => setDuration(videoRef.current?.duration ?? 0)}
        />
        {/* Ambient Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-melhek-dark via-transparent to-melhek-dark/80 z-0 pointer-events-none" />
      </div>

      {/* Animated Orbs */}
      <motion.div 
        style={{ y: y1 }} 
        className="absolute w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,_rgba(127,169,255,0.18)_0%,_transparent_70%)] top-[-200px] left-1/2 -translate-x-1/2 animate-orb-float pointer-events-none will-change-transform z-0" 
        aria-hidden="true"
      />
      <motion.div 
        style={{ y: y2 }} 
        className="absolute w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,_rgba(1,11,61,0.7)_0%,_rgba(127,169,255,0.08)_70%)] bottom-[100px] right-[-100px] animate-orb-float pointer-events-none will-change-transform z-0" 
        aria-hidden="true"
      />
      
      {/* Digital Grid */}
      <div className="digital-grid z-0" aria-hidden="true" />

      {/* Standard Watermark Shield (Hidden in preview mode) */}
      <AnimatePresence>
        {!isPreviewActive && (
          <motion.div
            initial={{ opacity: 0.03 }}
            exit={{ opacity: 0 }}
            style={{ y: y1 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] pointer-events-none z-0 overflow-hidden"
          >
            <Image 
              src="/logo-light.png" 
              alt="Melhek Watermark" 
              fill
              sizes="100vw"
              className="object-contain filter grayscale brightness-200 blur-[2px]" 
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── STANDARD HERO CONTENT ── */}
      <AnimatePresence mode="wait">
        {!isPreviewActive ? (
          <motion.div 
            key="standard-hero"
            style={{ opacity }} 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="container mx-auto px-6 relative z-10"
          >
            <header className="max-w-5xl mx-auto">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-white/10 mb-10"
              >
                <span className="w-1.5 h-1.5 bg-melhek-blue rounded-full animate-pulse shadow-[0_0_8px_#7FA9FF]" />
                <span className="text-[11px] font-mono font-semibold uppercase tracking-[0.12em] text-melhek-blue">
                  Technology Partner · Dependable Solutions
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                id="hero-headline"
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                className="font-syne font-extrabold text-[clamp(42px,7vw,88px)] leading-[1.0] tracking-[-0.03em] mb-8 text-white"
              >
                <span className="block">Your Digital Anchor in a</span>
                <span className="text-gradient block">Rapidly Evolving World.</span>
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="text-[clamp(16px,2vw,20px)] text-melhek-steel/70 mb-12 max-w-3xl mx-auto leading-[1.7] font-light"
              >
                Melhek Technologies builds dependable business websites, simple management systems, and automated operations tools. We serve as your digital anchor, securing stability and driving growth.
              </motion.p>

              {/* Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                className="flex flex-wrap items-center justify-center gap-4"
              >
                <Link
                  href="/contact"
                  className="btn-primary px-8 py-4 text-sm font-bold uppercase tracking-widest focus-visible:ring-2 ring-melhek-blue outline-none transition-all"
                >
                  Start Project →
                </Link>
                <Link
                  href="/#ecosystem"
                  className="btn-secondary px-8 py-4 text-sm font-bold uppercase tracking-widest focus-visible:ring-2 ring-melhek-blue outline-none transition-all"
                >
                  Explore Ecosystem
                </Link>
                <button
                  onClick={enterPreviewMode}
                  className="btn-secondary px-8 py-4 text-sm font-bold uppercase tracking-widest focus-visible:ring-2 ring-melhek-blue outline-none transition-all flex items-center gap-2 cursor-pointer bg-white/5 border-white/10 hover:bg-white/10"
                >
                  <Eye className="w-4 h-4 text-melhek-blue" />
                  Enter Preview Mode
                </button>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                className="mt-16 flex flex-wrap justify-center gap-8 text-[11px] font-medium uppercase tracking-[0.08em] text-melhek-blue/40"
              >
                {[
                  "Company Websites",
                  "Hospitality Systems",
                  "Store Management",
                  "Automated Operations"
                ].map((text) => (
                  <div key={text} className="flex items-center gap-2 font-mono">
                    <div className="w-1 h-1 bg-melhek-blue rounded-full" />
                    {text}
                  </div>
                ))}
              </motion.div>
            </header>
          </motion.div>
        ) : (
          /* ── ADVANCED INTERACTIVE PREVIEW HUD OVERLAY ── */
          <motion.div
            key="preview-hud"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-20 flex flex-col justify-between p-6 sm:p-10"
          >
            {/* Top Navigation / Stats bar */}
            <div className="flex items-center justify-between w-full relative z-30">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1.5 rounded-full bg-melhek-blue/15 border border-melhek-blue/30 text-[10px] font-mono font-bold text-melhek-blue flex items-center gap-2 uppercase tracking-widest backdrop-blur-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-melhek-blue animate-pulse" />
                  Mainframe Telemetry Grid
                </span>
                <span className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[9px] font-mono text-white/50 backdrop-blur-md">
                  FEED STATUS: <span className="text-emerald-400 font-bold">ONLINE</span>
                </span>
              </div>

              <button
                onClick={exitPreviewMode}
                className="p-3 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white/80 hover:text-white transition-all cursor-pointer flex items-center gap-2 text-xs font-mono backdrop-blur-md uppercase tracking-wider"
                aria-label="Exit preview mode"
              >
                <X className="w-4 h-4" />
                Exit Preview
              </button>
            </div>

            {/* Interactive Workspace Hotspots */}
            <div className="absolute inset-0 z-20 pointer-events-none">
              {HOTSPOTS.map(spot => {
                const Icon = spot.icon
                const isActive = activeHotspot?.id === spot.id
                return (
                  <div
                    key={spot.id}
                    className="absolute pointer-events-auto"
                    style={{ top: spot.top, left: spot.left }}
                  >
                    <button
                      onMouseEnter={() => setActiveHotspot(spot)}
                      onMouseLeave={() => setActiveHotspot(null)}
                      onClick={() => setActiveHotspot(isActive ? null : spot)}
                      className="relative w-9 h-9 flex items-center justify-center cursor-pointer group"
                      aria-label={`Inspect ${spot.title}`}
                    >
                      <span className="absolute w-9 h-9 bg-melhek-blue/30 rounded-full animate-ping group-hover:bg-melhek-blue/50" />
                      <span className="absolute w-6 h-6 bg-melhek-navy rounded-full flex items-center justify-center border border-melhek-blue/50 shadow-[0_0_15px_rgba(127,169,255,0.7)] group-hover:border-melhek-blue transition-colors">
                        <Icon className="w-3.5 h-3.5 text-melhek-blue" />
                      </span>
                    </button>

                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          className="absolute z-50 bottom-12 left-1/2 -translate-x-1/2 w-64 glass p-4 rounded-xl border-white/10 pointer-events-none shadow-2xl bg-melhek-navy/95 text-left"
                        >
                          <h5 className="text-xs font-bold text-white flex items-center gap-1.5 mb-1.5 font-display uppercase tracking-wider">
                            <Icon className="w-4 h-4 text-melhek-blue" />
                            {spot.title}
                          </h5>
                          <p className="text-[10px] text-melhek-steel/70 leading-relaxed font-light">
                            {spot.desc}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>

            {/* Bottom Panel with system diagnostic details */}
            <div className="w-full flex flex-col md:flex-row items-end justify-between gap-6 relative z-30 pointer-events-auto">
              {/* Telemetry Console (bottom-left) */}
              <div className="w-full md:w-80 glass p-4 rounded-2xl border-white/5 bg-melhek-navy/85 backdrop-blur-md text-left">
                <div className="flex items-center gap-2 mb-2 pb-1.5 border-b border-white/5 text-white/40 text-[9px] font-mono uppercase tracking-wider font-bold">
                  <Terminal className="w-3.5 h-3.5 text-melhek-blue" />
                  Mainframe Console Logs
                </div>
                <div className="font-mono text-[9px] text-white/50 space-y-1">
                  {terminalLogs.map((log, idx) => (
                    <div key={idx} className="truncate select-none">{log}</div>
                  ))}
                </div>
              </div>

              {/* Central Player controls overlay */}
              <div className="glass px-4 py-2.5 rounded-full border-white/10 bg-melhek-navy/90 backdrop-blur-md flex items-center gap-4">
                <button
                  onClick={handlePlayPause}
                  className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/5 text-white transition-all cursor-pointer"
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={toggleMute}
                  className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/5 text-white transition-all cursor-pointer"
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                </button>

                {/* Micro Seek bar */}
                <div className="relative w-24 h-1 group cursor-pointer">
                  <div className="absolute inset-0 bg-white/20 rounded-full" />
                  <div
                    className="absolute inset-y-0 left-0 bg-melhek-blue rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                  <input
                    type="range"
                    min={0}
                    max={duration || 100}
                    step={0.1}
                    value={currentTime}
                    onChange={handleSeek}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    aria-label="Seek Video"
                  />
                </div>

                <span className="text-[10px] font-mono text-white/50 tabular-nums">
                  {formatTime(currentTime)}
                </span>
              </div>

              {/* Status parameters (bottom-right) */}
              <div className="glass p-4 rounded-2xl border-white/5 bg-melhek-navy/85 backdrop-blur-md w-full md:w-48 text-left flex flex-col gap-1.5">
                <div className="flex items-center gap-2 text-[10px] font-mono text-melhek-blue font-bold uppercase tracking-wider">
                  <Globe className="w-3.5 h-3.5" />
                  System Diagnostics
                </div>
                <div className="flex justify-between text-[9px] font-mono text-white/40">
                  <span>SSL HANDSHAKE:</span>
                  <span className="text-emerald-400 font-bold">SUCCESS</span>
                </div>
                <div className="flex justify-between text-[9px] font-mono text-white/40">
                  <span>CAMERA LATENCY:</span>
                  <span className="text-white">0.02ms</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Status Cards (Faded out in preview mode) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <motion.div
          style={{ y: y1 }}
          animate={{ opacity: isPreviewActive ? 0 : 1, y: isPreviewActive ? 50 : 0 }}
          transition={{ duration: 0.5 }}
          className="absolute top-[30%] left-[6%] hidden xl:block"
        >
          <div className="glass p-5 rounded-2xl border-white/10 max-w-[180px] animate-float will-change-transform">
            <div className="text-[10px] font-mono text-melhek-blue/50 uppercase tracking-widest mb-1">System Uptime</div>
            <div className="text-2xl font-syne font-bold text-melhek-blue">99.99%</div>
            <div className="text-[11px] text-white/30 mt-1">Dependable and online</div>
          </div>
        </motion.div>

        <motion.div
          style={{ y: y2 }}
          animate={{ opacity: isPreviewActive ? 0 : 1, y: isPreviewActive ? -50 : 0 }}
          transition={{ duration: 0.5 }}
          className="absolute top-[25%] right-[6%] hidden xl:block"
        >
          <div className="glass p-5 rounded-2xl border-white/10 max-w-[180px] animate-float [animation-delay:-3s] will-change-transform">
            <div className="text-[10px] font-mono text-melhek-blue/50 uppercase tracking-widest mb-1">Delivered Systems</div>
            <div className="text-2xl font-syne font-bold text-melhek-blue">50+</div>
            <div className="text-[11px] text-white/30 mt-1">For local organizations</div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator (Hidden in preview mode) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isPreviewActive ? 0 : 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-10"
        aria-hidden="true"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-melhek-blue to-transparent animate-[scroll-line_2s_ease-in-out_infinite]" />
        <span className="text-[10px] uppercase tracking-[0.15em] text-white/30 font-mono">Scroll</span>
      </motion.div>
    </section>
  )
}
