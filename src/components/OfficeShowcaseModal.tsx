'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X, Play, Pause, Volume2, VolumeX, Maximize, Minimize,
  Cpu, Server, Monitor, Terminal, Globe, RotateCcw
} from 'lucide-react'

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
    desc: 'The central engineering hub. Coordinates distributed replication servers and system status nodes across all divisions.',
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

export default function OfficeShowcaseModal({ isOpen, onClose }: OfficeShowcaseModalProps) {
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

  const handlePlayPause = useCallback(() => {
    if (!videoRef.current) return
    if (isPlaying) {
      videoRef.current.pause()
      setIsPlaying(false)
      setShowControls(true)
    } else {
      videoRef.current.play()
      setIsPlaying(true)
      resetControlsTimer()
    }
  }, [isPlaying, resetControlsTimer])

  const toggleMute = useCallback(() => {
    if (!videoRef.current) return
    const newMuted = !isMuted;
    (videoRef.current as any).muted = newMuted
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

  // Autoplay on open
  useEffect(() => {
    if (!isOpen || !videoRef.current) return
    videoRef.current.currentTime = 0;
    (videoRef.current as any).muted = true
    videoRef.current.play()
      .then(() => setIsPlaying(true))
      .catch(() => setIsPlaying(false))
    setShowControls(true)
  }, [isOpen])

  // Pause & reset on close
  useEffect(() => {
    if (!isOpen && videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
      setIsPlaying(false)
      setCurrentTime(0)
    }
  }, [isOpen])

  // ESC key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (document.fullscreenElement) {
          document.exitFullscreen()
        } else {
          onClose()
        }
      }
      if (e.key === ' ' || e.key === 'k') {
        e.preventDefault()
        handlePlayPause()
      }
      if (e.key === 'm') toggleMute()
      if (e.key === 'f') toggleFullscreen()
    }
    if (isOpen) window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, isPlaying, isMuted])

  // Terminal log ticker
  useEffect(() => {
    if (!isOpen) return
    const interval = setInterval(() => {
      const log = SYSTEM_LOGS[Math.floor(Math.random() * SYSTEM_LOGS.length)]
      setTerminalLogs(prev => [...prev.slice(-4), `[${new Date().toLocaleTimeString()}] ${log}`])
    }, 4000)
    return () => clearInterval(interval)
  }, [isOpen])

  // Fullscreen change listener
  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement)
    document.addEventListener('fullscreenchange', handler)
    return () => document.removeEventListener('fullscreenchange', handler)
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
    setIsPlaying(true)
    resetControlsTimer()
  }

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/90 p-4 md:p-8 backdrop-blur-md"
          onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
        >
          {/* Modal Container */}
          <motion.div
            ref={containerRef}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 180 }}
            className="relative w-full max-w-6xl bg-black rounded-3xl overflow-hidden border border-white/10 shadow-[0_24px_100px_rgba(127,169,255,0.3)] flex flex-col"
            onMouseMove={resetControlsTimer}
            style={{ aspectRatio: '16/9' }}
          >
            {/* ── THE VIDEO ── */}
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
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none z-10" />

            {/* ── TOP BAR ── */}
            <AnimatePresence>
              {showControls && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-0 inset-x-0 h-16 z-30 px-5 flex items-center justify-between"
                >
                  <div className="px-3 py-1.5 rounded-full bg-melhek-blue/15 border border-melhek-blue/30 text-[10px] font-mono font-bold text-melhek-blue flex items-center gap-2 uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-melhek-blue animate-pulse" />
                    HQ Cinematic Experience
                  </div>

                  <button
                    onClick={onClose}
                    className="p-2 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white/80 hover:text-white transition-all cursor-pointer"
                    aria-label="Close modal"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── HOTSPOTS ── */}
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
                      className="relative w-8 h-8 flex items-center justify-center cursor-pointer group"
                    >
                      <span className="absolute w-8 h-8 bg-melhek-blue/30 rounded-full animate-ping group-hover:bg-melhek-blue/50" />
                      <span className="absolute w-5 h-5 bg-melhek-blue/70 rounded-full flex items-center justify-center border border-white/40 shadow-[0_0_12px_rgba(127,169,255,0.8)]">
                        <Icon className="w-3 h-3 text-melhek-navy" />
                      </span>
                    </button>

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

            {/* ── SYSTEM TERMINAL (bottom-left) ── */}
            <div className="absolute bottom-20 left-5 z-20 w-72 glass p-3 rounded-xl border-white/5 bg-melhek-navy/80 hidden sm:block">
              <div className="flex items-center gap-2 mb-2 pb-1.5 border-b border-white/5 text-white/40 text-[9px] font-mono uppercase tracking-wider font-bold">
                <Terminal className="w-3 h-3 text-melhek-blue" />
                System Diagnostics Monitor
              </div>
              <div className="font-mono text-[9px] text-white/50 space-y-1">
                {terminalLogs.map((log, idx) => (
                  <div key={idx} className="truncate select-none">{log}</div>
                ))}
              </div>
            </div>

            {/* ── HQ STATUS BADGE (bottom-right) ── */}
            <div className="absolute bottom-20 right-5 z-20 w-44 glass p-3 rounded-xl border-white/5 bg-melhek-navy/80 flex flex-col gap-1.5">
              <div className="flex items-center gap-2 text-[10px] font-mono text-melhek-blue font-bold uppercase tracking-wider">
                <Globe className="w-3 h-3" />
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

            {/* ── CENTER PLAY BUTTON (when paused) ── */}
            <AnimatePresence>
              {!isPlaying && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={handlePlayPause}
                  className="absolute inset-0 m-auto z-25 w-20 h-20 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all cursor-pointer shadow-[0_0_40px_rgba(127,169,255,0.4)]"
                  style={{ width: 80, height: 80, top: '50%', left: '50%', transform: 'translate(-50%,-50%)', position: 'absolute' }}
                >
                  <Play className="w-8 h-8 text-white ml-1" />
                </motion.button>
              )}
            </AnimatePresence>

            {/* ── BOTTOM CONTROLS BAR ── */}
            <AnimatePresence>
              {showControls && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute bottom-0 inset-x-0 z-30 px-5 pb-4 pt-2 bg-gradient-to-t from-black/80 to-transparent"
                >
                  {/* Seek bar */}
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
                      aria-label="Video seek bar"
                    />
                  </div>

                  {/* Buttons row */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {/* Play / Pause */}
                      <button
                        onClick={handlePlayPause}
                        className="p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white transition-all cursor-pointer"
                        aria-label={isPlaying ? 'Pause' : 'Play'}
                      >
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </button>

                      {/* Restart */}
                      <button
                        onClick={handleRestart}
                        className="p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white transition-all cursor-pointer"
                        aria-label="Restart"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>

                      {/* Mute */}
                      <button
                        onClick={toggleMute}
                        className="p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white transition-all cursor-pointer"
                        aria-label={isMuted ? 'Unmute' : 'Mute'}
                      >
                        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      </button>

                      {/* Time */}
                      <span className="text-[11px] font-mono text-white/50 tabular-nums">
                        {formatTime(currentTime)} / {formatTime(duration)}
                      </span>
                    </div>

                    {/* Fullscreen */}
                    <button
                      onClick={toggleFullscreen}
                      className="p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white transition-all cursor-pointer"
                      aria-label={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
                    >
                      {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
