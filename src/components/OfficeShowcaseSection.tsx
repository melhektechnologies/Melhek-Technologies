'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Play, Pause, Volume2, VolumeX, Maximize, Minimize,
  Cpu, Server, Monitor, Terminal, Globe, RotateCcw, Activity
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

export default function OfficeShowcaseSection() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [showControls, setShowControls] = useState(true)
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null)
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    'Initializing Melhek core mainframe connection...',
    'Secure SSL handshake completed. Code 200.',
    'Establishing remote camera stream feed...'
  ])
  const controlsTimerRef = useRef<NodeJS.Timeout | null>(null)

  // Auto-hide controls
  const resetControlsTimer = useCallback(() => {
    setShowControls(true)
    if (controlsTimerRef.current) clearTimeout(controlsTimerRef.current)
    controlsTimerRef.current = setTimeout(() => {
      if (isPlaying) setShowControls(false)
    }, 3000)
  }, [isPlaying])

  // Autoplay and loop configuration
  useEffect(() => {
    if (!videoRef.current) return
    videoRef.current.muted = true
    videoRef.current.play()
      .then(() => setIsPlaying(true))
      .catch(() => setIsPlaying(false))
  }, [])

  // Terminal log ticker simulation
  useEffect(() => {
    const interval = setInterval(() => {
      const log = SYSTEM_LOGS[Math.floor(Math.random() * SYSTEM_LOGS.length)]
      setTerminalLogs(prev => [...prev.slice(-5), `[${new Date().toLocaleTimeString()}] ${log}`])
    }, 4500)
    return () => clearInterval(interval)
  }, [])

  // Fullscreen change listener
  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement)
    document.addEventListener('fullscreenchange', handler)
    return () => document.removeEventListener('fullscreenchange', handler)
  }, [])

  const handlePlayPause = useCallback(() => {
    if (!videoRef.current) return
    if (isPlaying) {
      videoRef.current.pause()
      setIsPlaying(false)
      setShowControls(true)
    } else {
      videoRef.current.play()
        .then(() => {
          setIsPlaying(true)
          resetControlsTimer()
        })
        .catch(() => setIsPlaying(false))
    }
  }, [isPlaying, resetControlsTimer])

  const toggleMute = useCallback(() => {
    if (!videoRef.current) return
    const newMuted = !isMuted
    videoRef.current.muted = newMuted
    setIsMuted(newMuted)
  }, [isMuted])

  const toggleFullscreen = useCallback(() => {
    if (!containerRef.current) return
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
  }, [])

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return
    const t = parseFloat(e.target.value)
    videoRef.current.currentTime = t
    setCurrentTime(t)
  }

  const handleRestart = () => {
    if (!videoRef.current) return
    videoRef.current.currentTime = 0
    videoRef.current.play()
      .then(() => {
        setIsPlaying(true)
        resetControlsTimer()
      })
  }

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <section id="showcase-section" className="py-24 relative overflow-hidden bg-melhek-dark">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-[radial-gradient(circle,_rgba(127,169,255,0.05)_0%,_transparent_70%)] pointer-events-none -z-10" />

      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border-white/10 mb-6"
          >
            <Activity className="w-3.5 h-3.5 text-melhek-blue animate-pulse" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.15em] text-melhek-blue">
              HQ Mainframe Operations
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[clamp(32px,4vw,56px)] font-syne font-extrabold text-white mb-6 leading-tight"
          >
            Inside Our <span className="text-gradient">Command Center.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-base text-melhek-steel/60 leading-[1.7] font-light"
          >
            Explore our physical operations floor in Addis Ababa where we design, build, and deploy elite digital products. Click hotspots to inspect specific nodes or monitor real-time system logs.
          </motion.p>
        </div>

        {/* Cinematic Showcase Section Board */}
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative w-full max-w-5xl mx-auto aspect-video rounded-3xl overflow-hidden border border-white/10 bg-black shadow-[0_24px_80px_-20px_rgba(127,169,255,0.25)] group/container"
          onMouseMove={resetControlsTimer}
        >
          {/* ── THE VIDEO FEED ── */}
          <video
            ref={videoRef}
            src="/office-showcase.mp4"
            className="absolute inset-0 w-full h-full object-cover"
            playsInline
            loop
            muted={isMuted}
            onTimeUpdate={() => setCurrentTime(videoRef.current?.currentTime ?? 0)}
            onLoadedMetadata={() => setDuration(videoRef.current?.duration ?? 0)}
            onClick={handlePlayPause}
            style={{ cursor: 'pointer' }}
          />

          {/* Cinematic vignette overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/25 pointer-events-none z-10" />

          {/* ── TOP BADGE / STREAM STATUS ── */}
          <AnimatePresence>
            {showControls && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-0 inset-x-0 h-16 z-30 px-6 flex items-center justify-between"
              >
                <div className="px-3 py-1.5 rounded-full bg-melhek-navy/80 border border-white/10 text-[9px] font-mono font-bold text-white/80 flex items-center gap-2 uppercase tracking-widest backdrop-blur-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  Live Workroom Stream
                </div>

                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-melhek-navy/80 border border-white/10 text-[9px] font-mono text-white/50 backdrop-blur-md">
                  FPS: <span className="text-melhek-blue font-bold">60.00</span>
                  <span className="w-1 h-1 bg-white/30 rounded-full" />
                  RES: <span className="text-melhek-blue font-bold">1080P</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── INTERACTIVE BLUEPRINT HOTSPOTS ── */}
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
                    className="relative w-8 h-8 flex items-center justify-center cursor-pointer group"
                    aria-label={`Inspect ${spot.title}`}
                  >
                    <span className="absolute w-8 h-8 bg-melhek-blue/30 rounded-full animate-ping group-hover:bg-melhek-blue/50" />
                    <span className="absolute w-5 h-5 bg-melhek-navy/95 rounded-full flex items-center justify-center border border-melhek-blue/50 shadow-[0_0_12px_rgba(127,169,255,0.6)] group-hover:border-melhek-blue transition-colors">
                      <Icon className="w-3 h-3 text-melhek-blue" />
                    </span>
                  </button>

                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute z-50 bottom-10 left-1/2 -translate-x-1/2 w-64 glass p-4 rounded-xl border-white/10 pointer-events-none shadow-2xl bg-melhek-navy/90"
                      >
                        <h5 className="text-xs font-bold text-white flex items-center gap-1.5 mb-1.5 font-display uppercase tracking-wider">
                          <Icon className="w-3.5 h-3.5 text-melhek-blue" />
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

          {/* ── REAL-TIME SYSTEM LOGS PANELS ── */}
          {/* Console Output Panel (bottom-left) */}
          <div className="absolute bottom-20 left-6 z-20 w-72 glass p-3 rounded-xl border-white/5 bg-melhek-navy/80 hidden lg:block backdrop-blur-md opacity-0 group-hover/container:opacity-100 transition-opacity duration-500">
            <div className="flex items-center gap-2 mb-2 pb-1.5 border-b border-white/5 text-white/40 text-[9px] font-mono uppercase tracking-wider font-bold">
              <Terminal className="w-3 h-3 text-melhek-blue" />
              Mainframe Diagnostics
            </div>
            <div className="font-mono text-[9px] text-white/50 space-y-1">
              {terminalLogs.map((log, idx) => (
                <div key={idx} className="truncate select-none">{log}</div>
              ))}
            </div>
          </div>

          {/* System Environment Monitor (bottom-right) */}
          <div className="absolute bottom-20 right-6 z-20 w-44 glass p-3 rounded-xl border-white/5 bg-melhek-navy/80 hidden lg:flex flex-col gap-1.5 backdrop-blur-md opacity-0 group-hover/container:opacity-100 transition-opacity duration-500">
            <div className="flex items-center gap-2 text-[10px] font-mono text-melhek-blue font-bold uppercase tracking-wider">
              <Globe className="w-3 h-3" />
              Telemetry Status
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

          {/* ── PLAY BUTTON OVERLAY (when paused) ── */}
          <AnimatePresence>
            {!isPlaying && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={handlePlayPause}
                className="absolute inset-0 m-auto z-25 w-20 h-20 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all cursor-pointer shadow-[0_0_40px_rgba(127,169,255,0.4)]"
                style={{ width: 70, height: 70 }}
                aria-label="Play video"
              >
                <Play className="w-6 h-6 text-white ml-1" />
              </motion.button>
            )}
          </AnimatePresence>

          {/* ── BOTTOM CINEMATIC CONTROLS ── */}
          <AnimatePresence>
            {showControls && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute bottom-0 inset-x-0 z-30 px-6 pb-4 pt-2 bg-gradient-to-t from-black/95 to-transparent"
              >
                {/* Seek Bar */}
                <div className="relative w-full h-1 mb-3 group">
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
                    aria-label="Seek bar"
                  />
                </div>

                {/* Control Action Buttons */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* Play/Pause Button */}
                    <button
                      onClick={handlePlayPause}
                      className="p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white transition-all cursor-pointer"
                      aria-label={isPlaying ? 'Pause' : 'Play'}
                    >
                      {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    </button>

                    {/* Restart Button */}
                    <button
                      onClick={handleRestart}
                      className="p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white transition-all cursor-pointer"
                      aria-label="Restart Video"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>

                    {/* Volume Mute Toggle */}
                    <button
                      onClick={toggleMute}
                      className="p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white transition-all cursor-pointer"
                      aria-label={isMuted ? 'Unmute' : 'Mute'}
                    >
                      {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                    </button>

                    {/* Current Time Display */}
                    <span className="text-[11px] font-mono text-white/50 tabular-nums">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>

                  {/* Fullscreen Button */}
                  <button
                    onClick={toggleFullscreen}
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white transition-all cursor-pointer"
                    aria-label={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
                  >
                    {isFullscreen ? <Minimize className="w-3.5 h-3.5" /> : <Maximize className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
