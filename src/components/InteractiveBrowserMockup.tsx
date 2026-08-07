'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Play } from 'lucide-react'
import { Project } from '@/types/project'
import SandboxDemo from './SandboxDemo'

interface InteractiveBrowserMockupProps {
  project: Project
  icon: React.ReactNode
}

export default function InteractiveBrowserMockup({ project, icon }: InteractiveBrowserMockupProps) {
  const [isSandboxOpen, setIsSandboxOpen] = useState(false)

  // Only show sandbox for supported simulation slugs
  const isSandboxSupported = [
    'healthcare-booking',
    'pharmacy-management',
    'belete-tasew-law',
    'gym-management',
    'car-sales-showroom'
  ].includes(project.slug)

  return (
    <div className="relative rounded-[2rem] border border-white/10 overflow-hidden bg-melhek-dark mb-12 shadow-[0_24px_80px_-20px_rgba(127,169,255,0.15)] select-none">
      {/* Browser top bar */}
      <div className="h-10 bg-black/60 backdrop-blur-sm border-b border-white/5 flex items-center px-6 gap-2 relative z-30">
        <div className="w-3 h-3 rounded-full bg-[#ff5f57]" aria-hidden="true" />
        <div className="w-3 h-3 rounded-full bg-[#febc2e]" aria-hidden="true" />
        <div className="w-3 h-3 rounded-full bg-[#28c840]" aria-hidden="true" />
        <span className="ml-4 text-[10px] font-mono text-white/35 uppercase tracking-widest truncate max-w-[280px]">
          {project.link
            ? project.link.replace(/^https?:\/\//, '').replace(/\/$/, '')
            : `melhek.tech / ${project.slug}`}
        </span>
        {project.status ? (
          <span className="ml-auto px-2 py-0.5 bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 rounded text-[9px] uppercase tracking-wide font-mono">
            {project.status}
          </span>
        ) : (
          <span className="ml-auto flex items-center gap-1.5 text-[9px] font-mono text-emerald-400/80 uppercase tracking-wider font-bold">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_8px_#4ade80]" />
            Active Node
          </span>
        )}
      </div>

      {/* Viewport content */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-melhek-navy flex items-center justify-center group">
        {project.image ? (
          <Image
            src={project.image}
            alt={`${project.name} system showcase`}
            fill
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-cover object-top"
            priority
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${project.gradient} flex items-center justify-center p-16`}>
            <div className="w-full h-full bg-white/5 rounded-3xl border border-white/10 p-8 flex flex-col gap-6 max-w-lg mx-auto">
              <div className="h-6 w-3/4 bg-white/10 rounded-full animate-pulse" />
              <div className="h-4 w-1/2 bg-white/5 rounded-full animate-pulse" />
              <div className="flex-1 border border-white/5 bg-white/5 rounded-2xl flex items-center justify-center text-melhek-blue opacity-50 scale-[1.5]">
                {icon}
              </div>
            </div>
          </div>
        )}
        
        {/* Subtle bottom shadow gradient to lift content */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none z-10" />

        {/* Enter Sandbox Call-To-Action Overlay */}
        {isSandboxSupported && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
            <button 
              onClick={() => setIsSandboxOpen(true)}
              className="btn-primary flex items-center gap-2 text-[10px] uppercase tracking-widest font-mono py-3 px-5 shadow-[0_0_35px_rgba(127,169,255,0.4)] cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current" /> Test Drive System Demo
            </button>
            <span className="text-[9px] text-white/50 font-mono tracking-wider">Simulate operations dashboard in real-time</span>
          </div>
        )}
      </div>

      {/* Sandbox Active Panel */}
      {isSandboxOpen && (
        <SandboxDemo slug={project.slug} onClose={() => setIsSandboxOpen(false)} />
      )}
    </div>
  )
}
