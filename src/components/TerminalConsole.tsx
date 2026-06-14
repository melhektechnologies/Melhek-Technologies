'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Terminal, X, ChevronRight, Minimize2, Maximize2 } from 'lucide-react'

interface TerminalLine {
  text: string
  type: 'input' | 'output' | 'error' | 'system'
}

export default function TerminalConsole() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMaximized, setIsMaximized] = useState(false)
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [inputVal, setInputVal] = useState('')
  const [consoleLines, setConsoleLines] = useState<TerminalLine[]>([
    { text: 'Melhek Core Operations Console [Version 1.0.4]', type: 'system' },
    { text: '(c) 2026 Melhek Technologies. All rights virtualized.', type: 'system' },
    { text: 'Type "help" for a list of available operations commands.', type: 'system' },
    { text: '', type: 'system' }
  ])

  const inputRef = useRef<HTMLInputElement>(null)
  const bufferEndRef = useRef<HTMLDivElement>(null)

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 200)
    }
  }, [isOpen])

  // Scroll to bottom on updates
  useEffect(() => {
    bufferEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [consoleLines])

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = inputVal.trim()
    if (!trimmed) return

    const newLines = [...consoleLines, { text: `guest@melhek:~# ${trimmed}`, type: 'input' as const }]
    const command = trimmed.toLowerCase().split(' ')[0]
    
    // Track history
    setHistory(prev => [trimmed, ...prev.slice(0, 19)])
    setHistoryIndex(-1)
    setInputVal('')

    let response: TerminalLine[] = []

    switch (command) {
      case 'help':
        response = [
          { text: 'Available Core Commands:', type: 'system' },
          { text: '  about        - Explains Melhek\'s design philosophy & name origin', type: 'output' },
          { text: '  divisions    - Lists our specialized active engineering divisions', type: 'output' },
          { text: '  projects     - Lists past system builds and case studies', type: 'output' },
          { text: '  contact      - Prints email, WhatsApp, and location parameters', type: 'output' },
          { text: '  clear        - Clears the terminal screen buffer', type: 'output' },
          { text: '  exit         - Closes the active console interface', type: 'output' }
        ]
        break
      case 'about':
        response = [
          { text: 'Melhek Technologies is a premium technology engineering partner.', type: 'system' },
          { text: 'The name "Melhek" (derived from the Semitic root for "Anchor") defines our mission: serving as an unshakeable digital anchor for ambitious corporate clients.', type: 'output' },
          { text: 'We specialize in custom web portals, high-volume inventory networks, hotel booking systems, and AI automation.', type: 'output' }
        ]
        break
      case 'divisions':
        response = [
          { text: 'Melhek Technologies Divisions Grid:', type: 'system' },
          { text: '  [01] Melhek Digital      - High-performance Next.js web applications', type: 'output' },
          { text: '  [02] Melhek Hospitality  - POS reservation systems and digital menus', type: 'output' },
          { text: '  [03] Melhek Business     - Multi-branch cashier inventory engines', type: 'output' },
          { text: '  [04] Melhek AI Labs      - Custom database search models & automators', type: 'output' },
          { text: '  [05] Melhek Secure       - Client data audits and field hashing encryption', type: 'output' },
          { text: '  [06] Melhek Infra        - Corporate remote setup nodes', type: 'output' }
        ]
        break
      case 'projects':
        response = [
          { text: 'Active Case Studies Registry:', type: 'system' },
          { text: '  - happy-optics        [Healthcare] - Clinic Appointment Database', type: 'output' },
          { text: '  - pharmacy-management [Healthcare] - Multi-branch Checkout Register', type: 'output' },
          { text: '  - amen-car-sales      [Automotive] - Import Gallery Funnel', type: 'output' },
          { text: '  - belete-tasew-law    [Professional] - Legal Authority Site', type: 'output' },
          { text: '  - gym-management      [Fitness] - Door Check-In & Billing Tracker', type: 'output' }
        ]
        break
      case 'contact':
        response = [
          { text: 'Remote Delivery Operations Node:', type: 'system' },
          { text: '  • Location : Addis Ababa, Ethiopia (Independent Remote Workspace)', type: 'output' },
          { text: '  • Email    : melhektechnologies@gmail.com', type: 'output' },
          { text: '  • Tel/WA   : +251 972 23 7318', type: 'output' }
        ]
        break
      case 'clear':
        setConsoleLines([])
        return
      case 'exit':
        setIsOpen(false)
        return
      default:
        response = [{ text: `bash: command not recognized: "${command}". Type "help" for instructions.`, type: 'error' as const }]
    }

    setConsoleLines([...newLines, ...response, { text: '', type: 'system' as const }])
  }

  // Key navigation for terminal command history
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (historyIndex < history.length - 1) {
        const nextIdx = historyIndex + 1
        setHistoryIndex(nextIdx)
        setInputVal(history[nextIdx])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1
        setHistoryIndex(nextIdx)
        setInputVal(history[nextIdx])
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        setInputVal('')
      }
    }
  }

  return (
    <>
      {/* Floating Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-melhek-navy/90 border border-white/10 hover:border-melhek-blue/50 text-melhek-blue hover:text-white flex items-center justify-center shadow-[0_4px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_0_25px_rgba(127,169,255,0.4)] backdrop-blur-md cursor-pointer transition-all duration-300"
          aria-label="Open Melhek Terminal Console"
        >
          <Terminal className="w-6 h-6 animate-pulse" />
        </button>
      </div>

      {/* Terminal Modal Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className={`fixed bottom-24 right-6 z-50 bg-[#02050e] border border-emerald-500/20 rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.8),0_0_30px_rgba(16,185,129,0.05)] overflow-hidden flex flex-col font-mono text-xs ${
              isMaximized ? 'w-[calc(100vw-3rem)] h-[calc(100vh-8rem)]' : 'w-full max-w-lg h-[400px]'
            }`}
          >
            {/* Terminal Window Header */}
            <div className="h-10 bg-[#060d1b] border-b border-emerald-500/15 flex items-center justify-between px-4 select-none">
              <div className="flex items-center gap-2 text-emerald-400">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-[10px] uppercase tracking-wider font-bold">melhek@mainframe:~#</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsMaximized(!isMaximized)}
                  className="text-white/40 hover:text-white transition-colors cursor-pointer"
                  title={isMaximized ? 'Minimize' : 'Maximize'}
                >
                  {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/40 hover:text-red-400 transition-colors cursor-pointer"
                  title="Close Console"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Terminal screen buffer */}
            <div 
              className="flex-1 p-6 overflow-y-auto space-y-2.5 scrollbar-thin scrollbar-thumb-emerald-500/20 scrollbar-track-transparent bg-black/40 relative"
              onClick={() => inputRef?.current?.focus()}
            >
              {/* Retro scanline screen effect */}
              <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,_rgba(0,0,0,0.25)_50%),_linear-gradient(90deg,_rgba(255,0,0,0.06),_rgba(0,255,0,0.02),_rgba(0,0,255,0.06))] bg-[size:100%_4px,_6px_100%] opacity-20" />

              {consoleLines.map((line, i) => {
                let colorClass = 'text-white/80'
                if (line.type === 'input') colorClass = 'text-emerald-400 font-bold'
                else if (line.type === 'error') colorClass = 'text-rose-400 font-semibold'
                else if (line.type === 'system') colorClass = 'text-sky-400/90 font-bold'

                return (
                  <div key={i} className={`whitespace-pre-wrap leading-relaxed ${colorClass}`}>
                    {line.text}
                  </div>
                )
              })}
              <div ref={bufferEndRef} />
            </div>

            {/* Command Entry Input Form */}
            <form onSubmit={handleCommandSubmit} className="h-10 bg-[#040812] border-t border-emerald-500/10 flex items-center px-4 gap-2 relative">
              <span className="text-emerald-400 font-bold flex items-center">
                guest@melhek:~# <ChevronRight className="w-3 h-3 text-emerald-400 animate-pulse ml-1" />
              </span>
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent border-none outline-none text-emerald-400 caret-emerald-400 text-xs font-mono py-2 w-full focus:ring-0 focus:border-none focus:outline-none"
                placeholder="Type a command..."
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
              />
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
