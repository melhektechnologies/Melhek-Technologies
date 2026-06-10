'use client'

import type { DivisionIconId } from '@/constants/divisions'

interface EcosystemDiagramProps {
  iconId: DivisionIconId
}

export default function EcosystemDiagram({ iconId }: EcosystemDiagramProps) {
  switch (iconId) {
    case 'monitor':
      return <DigitalDiagram />
    case 'hotel':
      return <HospitalityDiagram />
    case 'construction':
      return <BusinessSystemsDiagram />
    case 'brain':
      return <AiLabsDiagram />
    case 'shield':
      return <SecureDiagram />
    case 'server':
      return <InfrastructureDiagram />
    default:
      return null
  }
}

// 1. MELHEK DIGITAL DIAGRAM (Web Presence / Forms / Databases)
function DigitalDiagram() {
  return (
    <div className="w-full h-32 flex items-center justify-center relative select-none">
      <svg className="w-full h-full max-w-[280px]" viewBox="0 0 280 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <style>{`
          @keyframes dash-digital {
            to { stroke-dashoffset: -40; }
          }
          .path-digital {
            stroke-dasharray: 6 4;
            animation: dash-digital 4s linear infinite;
          }
          .group:hover .path-digital {
            animation: dash-digital 1.5s linear infinite;
            stroke: #7FA9FF;
          }
          .pulse-dot {
            animation: pulse-op 2s infinite ease-in-out;
          }
          @keyframes pulse-op {
            0%, 100% { opacity: 0.2; }
            50% { opacity: 0.8; }
          }
        `}</style>

        {/* Client Interface Wireframe (Left) */}
        <rect x="15" y="25" width="75" height="50" rx="6" fill="#010B3D" stroke="currentColor" className="stroke-white/10 group-hover:stroke-melhek-blue/30 transition-colors duration-500" strokeWidth="1.5" />
        <rect x="23" y="33" width="22" height="6" rx="2" fill="currentColor" className="text-white/15 group-hover:text-melhek-blue/20 transition-colors" />
        <rect x="50" y="33" width="32" height="6" rx="2" fill="currentColor" className="text-white/10 group-hover:text-melhek-steel/20 transition-colors" />
        <rect x="23" y="45" width="59" height="22" rx="3" fill="#050816" stroke="currentColor" className="stroke-white/5" />
        {/* Form fields skeleton */}
        <line x1="28" y1="51" x2="48" y2="51" stroke="currentColor" strokeWidth="1.5" className="stroke-white/20" />
        <line x1="28" y1="57" x2="68" y2="57" stroke="currentColor" strokeWidth="1.5" className="stroke-white/10" />
        
        {/* Connection Pathway */}
        <path d="M90 50 C 130 50, 150 50, 190 50" stroke="currentColor" strokeWidth="1.5" className="stroke-white/10 path-digital" strokeLinecap="round" />
        
        {/* Central Router / Gateway Node */}
        <circle cx="140" cy="50" r="14" fill="#050816" stroke="currentColor" className="stroke-white/10 group-hover:stroke-melhek-blue/50 transition-colors" strokeWidth="1.5" />
        <circle cx="140" cy="50" r="6" fill="#7FA9FF" className="pulse-dot" />

        {/* Cloud/Server Stack (Right) */}
        <g transform="translate(195, 20)">
          {/* Server Unit 1 */}
          <rect x="5" y="5" width="65" height="15" rx="3" fill="#010B3D" stroke="currentColor" className="stroke-white/10 group-hover:stroke-melhek-blue/40 transition-colors" strokeWidth="1" />
          <circle cx="15" cy="12.5" r="2.5" fill="#7FA9FF" className="group-hover:animate-ping" />
          <line x1="25" y1="12.5" x2="60" y2="12.5" stroke="currentColor" strokeWidth="1.5" className="stroke-white/20" />
          
          {/* Server Unit 2 */}
          <rect x="5" y="25" width="65" height="15" rx="3" fill="#010B3D" stroke="currentColor" className="stroke-white/10 group-hover:stroke-melhek-blue/40 transition-colors" strokeWidth="1" />
          <circle cx="15" cy="32.5" r="2.5" fill="#7FA9FF" />
          <line x1="25" y1="32.5" x2="60" y2="32.5" stroke="currentColor" strokeWidth="1.5" className="stroke-white/20" />
          
          {/* Server Unit 3 */}
          <rect x="5" y="45" width="65" height="15" rx="3" fill="#010B3D" stroke="currentColor" className="stroke-white/10 group-hover:stroke-melhek-blue/40 transition-colors" strokeWidth="1" />
          <circle cx="15" cy="52.5" r="2.5" fill="#7FA9FF" className="pulse-dot" />
          <line x1="25" y1="52.5" x2="60" y2="52.5" stroke="currentColor" strokeWidth="1.5" className="stroke-white/20" />
        </g>
      </svg>
    </div>
  )
}

// 2. MELHEK HOSPITALITY DIAGRAM (Hotel / Bookings / Calendars)
function HospitalityDiagram() {
  return (
    <div className="w-full h-32 flex items-center justify-center relative select-none">
      <svg className="w-full h-full max-w-[280px]" viewBox="0 0 280 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <style>{`
          @keyframes booking-packet {
            0% { transform: translate(0, 0); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translate(110px, 0); opacity: 0; }
          }
          .hosp-packet {
            animation: booking-packet 3s infinite cubic-bezier(0.4, 0, 0.2, 1);
          }
          .group:hover .hosp-packet {
            animation-duration: 1.2s;
          }
          .grid-block {
            transition: all 0.3s;
          }
          .group:hover .grid-block-active {
            fill: rgba(127, 169, 255, 0.25);
            stroke: #7FA9FF;
          }
        `}</style>

        {/* Guest Mobile Screen (Left) */}
        <rect x="20" y="20" width="50" height="80" rx="8" fill="#010B3D" stroke="currentColor" className="stroke-white/10 group-hover:stroke-melhek-blue/30" strokeWidth="1.5" />
        {/* Screen Content */}
        <rect x="28" y="28" width="34" height="24" rx="3" fill="#050816" stroke="currentColor" className="stroke-white/5" />
        <circle cx="45" cy="40" r="5" fill="#7FA9FF" className="opacity-40" />
        <rect x="28" y="58" width="34" height="6" rx="1.5" fill="currentColor" className="text-white/10" />
        <rect x="28" y="68" width="34" height="12" rx="3" fill="#7FA9FF" className="opacity-70 group-hover:opacity-100 transition-opacity" />
        <line x1="36" y1="74" x2="54" y2="74" stroke="#010B3D" strokeWidth="1.5" />

        {/* Data Transfer Channel */}
        <line x1="78" y1="60" x2="182" y2="60" stroke="currentColor" className="stroke-white/10" strokeWidth="1.5" strokeDasharray="4 4" />
        
        {/* Animated Booking ticket flying */}
        <g className="hosp-packet" transform="translate(75, 52)">
          <rect width="18" height="14" rx="2" fill="#7FA9FF" />
          <line x1="4" y1="5" x2="14" y2="5" stroke="#010B3D" strokeWidth="1" />
          <line x1="4" y1="9" x2="10" y2="9" stroke="#010B3D" strokeWidth="1" />
        </g>

        {/* Room Grid / Calendar Scheduler (Right) */}
        <g transform="translate(185, 20)">
          {/* Header row */}
          <rect width="75" height="14" rx="3" fill="currentColor" className="text-white/5" />
          <line x1="5" y1="7" x2="70" y2="7" stroke="currentColor" strokeWidth="1.5" className="stroke-white/10" />

          {/* Calendar Slots Grid */}
          {/* Day 1 */}
          <rect x="0" y="20" width="22" height="16" rx="2.5" fill="#050816" stroke="currentColor" className="stroke-white/5" />
          <rect x="26" y="20" width="22" height="16" rx="2.5" fill="#010B3D" stroke="currentColor" className="stroke-white/10 grid-block grid-block-active" />
          <rect x="52" y="20" width="22" height="16" rx="2.5" fill="#050816" stroke="currentColor" className="stroke-white/5" />

          {/* Day 2 */}
          <rect x="0" y="42" width="22" height="16" rx="2.5" fill="#050816" stroke="currentColor" className="stroke-white/5" />
          <rect x="26" y="42" width="22" height="16" rx="2.5" fill="#050816" stroke="currentColor" className="stroke-white/5" />
          <rect x="52" y="42" width="22" height="16" rx="2.5" fill="#010B3D" stroke="currentColor" className="stroke-white/10 grid-block grid-block-active" />

          {/* Day 3 */}
          <rect x="0" y="64" width="22" height="16" rx="2.5" fill="#010B3D" stroke="currentColor" className="stroke-white/10 grid-block grid-block-active" />
          <rect x="26" y="64" width="22" height="16" rx="2.5" fill="#050816" stroke="currentColor" className="stroke-white/5" />
          <rect x="52" y="64" width="22" height="16" rx="2.5" fill="#050816" stroke="currentColor" className="stroke-white/5" />
        </g>
      </svg>
    </div>
  )
}

// 3. MELHEK BUSINESS SYSTEMS (Sales & Inventory POS Sync)
function BusinessSystemsDiagram() {
  return (
    <div className="w-full h-32 flex items-center justify-center relative select-none">
      <svg className="w-full h-full max-w-[280px]" viewBox="0 0 280 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <style>{`
          @keyframes sync-flow-up {
            0% { stroke-dashoffset: 0; }
            100% { stroke-dashoffset: -30; }
          }
          .branch-link {
            stroke-dasharray: 5 5;
            animation: sync-flow-up 5s linear infinite;
          }
          .group:hover .branch-link {
            animation-duration: 1.5s;
            stroke: #7FA9FF;
          }
          .store-register {
            transition: all 0.3s;
          }
          .group:hover .store-register {
            stroke: rgba(127, 169, 255, 0.4);
            fill: #010B3D;
          }
        `}</style>

        {/* Central Cloud HQ Database (Center Top) */}
        <g transform="translate(110, 10)">
          <rect x="5" y="5" width="50" height="36" rx="6" fill="#050816" stroke="currentColor" className="stroke-white/10 group-hover:stroke-melhek-blue/40 transition-colors" strokeWidth="1.5" />
          {/* DB cylinders */}
          <ellipse cx="30" cy="17" rx="14" ry="4" fill="#010B3D" stroke="currentColor" className="stroke-white/20" />
          <path d="M16 17 V24 C 16 26, 44 26, 44 24 V17" fill="none" stroke="currentColor" className="stroke-white/20" />
          <path d="M16 24 V31 C 16 33, 44 33, 44 31 V24" fill="none" stroke="currentColor" className="stroke-white/20" />
          <ellipse cx="30" cy="17" rx="8" ry="2.5" fill="#7FA9FF" className="opacity-80 group-hover:animate-pulse" />
        </g>

        {/* Store Branch A (Left Bottom) */}
        <g transform="translate(25, 70)">
          <rect width="60" height="34" rx="4" fill="#050816" stroke="currentColor" className="stroke-white/5 store-register" strokeWidth="1" />
          <rect x="8" y="8" width="20" height="12" rx="2" fill="#010B3D" stroke="currentColor" className="stroke-white/10" />
          <line x1="8" y1="26" x2="52" y2="26" stroke="currentColor" className="stroke-white/10" strokeWidth="1.5" />
          <circle cx="44" cy="14" r="3.5" fill="#7FA9FF" className="opacity-50" />
          <text x="32" y="24" fill="currentColor" className="text-white/20 text-[6px] font-mono font-bold">POS A</text>
        </g>

        {/* Store Branch B (Right Bottom) */}
        <g transform="translate(195, 70)">
          <rect width="60" height="34" rx="4" fill="#050816" stroke="currentColor" className="stroke-white/5 store-register" strokeWidth="1" />
          <rect x="8" y="8" width="20" height="12" rx="2" fill="#010B3D" stroke="currentColor" className="stroke-white/10" />
          <line x1="8" y1="26" x2="52" y2="26" stroke="currentColor" className="stroke-white/10" strokeWidth="1.5" />
          <circle cx="44" cy="14" r="3.5" fill="#7FA9FF" className="opacity-50" />
          <text x="32" y="24" fill="currentColor" className="text-white/20 text-[6px] font-mono font-bold">POS B</text>
        </g>

        {/* Branch sync lines to HQ */}
        {/* Line from A to HQ */}
        <path d="M55 70 C 55 46, 110 46, 110 32" stroke="currentColor" strokeWidth="1.5" className="stroke-white/10 branch-link" fill="none" />
        
        {/* Line from B to HQ */}
        <path d="M225 70 C 225 46, 170 46, 160 32" stroke="currentColor" strokeWidth="1.5" className="stroke-white/10 branch-link" fill="none" />
      </svg>
    </div>
  )
}

// 4. MELHEK AI LABS (Task Automation & Unstructured Summaries)
function AiLabsDiagram() {
  return (
    <div className="w-full h-32 flex items-center justify-center relative select-none">
      <svg className="w-full h-full max-w-[280px]" viewBox="0 0 280 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <style>{`
          @keyframes process-glow {
            0%, 100% { transform: scale(1); filter: drop-shadow(0 0 4px rgba(127,169,255,0.2)); }
            50% { transform: scale(1.08); filter: drop-shadow(0 0 15px rgba(127,169,255,0.6)); }
          }
          .ai-core {
            transform-origin: 140px 60px;
            animation: process-glow 3s infinite ease-in-out;
          }
          @keyframes node-ping {
            0% { transform: scale(0.6); opacity: 1; }
            100% { transform: scale(1.6); opacity: 0; }
          }
          .core-pulse {
            transform-origin: 140px 60px;
            animation: node-ping 2s infinite linear;
          }
          .data-stream {
            stroke-dasharray: 4 4;
            animation: flow-right 8s linear infinite;
          }
          @keyframes flow-right {
            to { stroke-dashoffset: -50; }
          }
          .group:hover .data-stream {
            animation-duration: 2s;
            stroke: #7FA9FF;
          }
        `}</style>

        {/* Input Document Nodes (Left) */}
        <g transform="translate(20, 30)">
          <rect x="5" y="5" width="22" height="28" rx="3" fill="#010B3D" stroke="currentColor" className="stroke-white/10 group-hover:stroke-melhek-blue/30" />
          <line x1="9" y1="12" x2="23" y2="12" stroke="currentColor" className="stroke-white/15" strokeWidth="1" />
          <line x1="9" y1="18" x2="19" y2="18" stroke="currentColor" className="stroke-white/15" strokeWidth="1" />
          <line x1="9" y1="24" x2="21" y2="24" stroke="currentColor" className="stroke-white/15" strokeWidth="1" />
          
          <rect x="18" y="24" width="22" height="28" rx="3" fill="#050816" stroke="currentColor" className="stroke-white/5" />
          <line x1="22" y1="31" x2="36" y2="31" stroke="currentColor" className="stroke-white/10" strokeWidth="1" />
          <line x1="22" y1="37" x2="32" y2="37" stroke="currentColor" className="stroke-white/10" strokeWidth="1" />
          <line x1="22" y1="43" x2="34" y2="43" stroke="currentColor" className="stroke-white/10" strokeWidth="1" />
        </g>

        {/* Flow Paths to AI Core */}
        <path d="M65 60 L115 60" stroke="currentColor" strokeWidth="1.5" className="stroke-white/10 data-stream" />
        <path d="M165 60 L215 60" stroke="currentColor" strokeWidth="1.5" className="stroke-white/10 data-stream" />

        {/* Central AI Processor Core */}
        <circle cx="140" cy="60" r="26" fill="#010B3D" stroke="currentColor" className="stroke-white/5" />
        <circle cx="140" cy="60" r="16" fill="none" stroke="#7FA9FF" className="core-pulse" />
        <g className="ai-core">
          <circle cx="140" cy="60" r="14" fill="#050816" stroke="#7FA9FF" strokeWidth="2" />
          {/* stylized network lines inside processor */}
          <line x1="134" y1="54" x2="146" y2="66" stroke="#7FA9FF" strokeWidth="1.5" />
          <line x1="146" y1="54" x2="134" y2="66" stroke="#7FA9FF" strokeWidth="1.5" />
          <circle cx="134" cy="54" r="2" fill="#F4F7FF" />
          <circle cx="146" cy="66" r="2" fill="#F4F7FF" />
          <circle cx="146" cy="54" r="2" fill="#F4F7FF" />
          <circle cx="134" cy="66" r="2" fill="#F4F7FF" />
        </g>

        {/* Output Insight Data Objects (Right) */}
        <g transform="translate(220, 35)">
          <circle cx="12" cy="12" r="5" fill="#7FA9FF" className="opacity-80" />
          <circle cx="38" cy="16" r="6" fill="#7FA9FF" className="opacity-40" />
          <circle cx="22" cy="38" r="4" fill="#7FA9FF" className="opacity-60" />
          
          <line x1="12" y1="12" x2="38" y2="16" stroke="currentColor" className="stroke-white/10" strokeWidth="1.5" />
          <line x1="12" y1="12" x2="22" y2="38" stroke="currentColor" className="stroke-white/10" strokeWidth="1.5" />
          <line x1="38" y1="16" x2="22" y2="38" stroke="currentColor" className="stroke-white/10" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  )
}

// 5. MELHEK SECURE DIAGRAM (Firewall deflections & Database protection)
function SecureDiagram() {
  return (
    <div className="w-full h-32 flex items-center justify-center relative select-none">
      <svg className="w-full h-full max-w-[280px]" viewBox="0 0 280 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <style>{`
          @keyframes rotate-scan {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          .secure-ring {
            transform-origin: 140px 60px;
            animation: rotate-scan 12s linear infinite;
          }
          .secure-ring-reverse {
            transform-origin: 140px 60px;
            animation: rotate-scan 8s linear infinite reverse;
          }
          @keyframes threat-deflect {
            0% { transform: translate(-80px, -20px); opacity: 0; }
            10% { opacity: 1; }
            45% { transform: translate(0, 0); opacity: 1; }
            50% { transform: translate(-15px, 30px); opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translate(-30px, 60px); opacity: 0; }
          }
          .threat-line {
            animation: threat-deflect 3.5s infinite ease-in-out;
          }
          .group:hover .threat-line {
            animation-duration: 1.5s;
          }
        `}</style>

        {/* Threat Origin (Top Left) */}
        <g className="threat-line" transform="translate(140, 60)">
          <circle cx="0" cy="0" r="3.5" fill="#EF4444" />
          <line x1="0" y1="0" x2="-20" y2="-5" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="3 3" />
        </g>

        {/* Central Core Data Storage */}
        <circle cx="140" cy="60" r="16" fill="#010B3D" stroke="currentColor" className="stroke-white/10" />
        {/* Core database icon */}
        <g transform="translate(133, 50)">
          <rect width="14" height="20" rx="2" fill="#7FA9FF" className="opacity-90" />
          <line x1="3" y1="5" x2="11" y2="5" stroke="#010B3D" strokeWidth="1.5" />
          <line x1="3" y1="10" x2="11" y2="10" stroke="#010B3D" strokeWidth="1.5" />
          <line x1="3" y1="15" x2="8" y2="15" stroke="#010B3D" strokeWidth="1.5" />
        </g>

        {/* Rotating Security Shield Enclosure */}
        <circle cx="140" cy="60" r="28" fill="none" stroke="currentColor" className="stroke-white/5" />
        <circle cx="140" cy="60" r="38" fill="none" stroke="currentColor" className="stroke-white/5" />
        
        {/* Scan arcs */}
        <path d="M102 60 A 38 38 0 0 1 140 22" stroke="#7FA9FF" strokeWidth="2" className="secure-ring" strokeLinecap="round" />
        <path d="M178 60 A 38 38 0 0 1 140 98" stroke="#7FA9FF" strokeWidth="1" className="secure-ring" strokeLinecap="round" opacity="0.4" />
        
        <path d="M112 60 A 28 28 0 0 0 140 88" stroke="#F4F7FF" strokeWidth="1.5" className="secure-ring-reverse" strokeLinecap="round" />
      </svg>
    </div>
  )
}

// 6. MELHEK INFRASTRUCTURE (Local Routers / Cable Networks / Generators)
function InfrastructureDiagram() {
  return (
    <div className="w-full h-32 flex items-center justify-center relative select-none">
      <svg className="w-full h-full max-w-[280px]" viewBox="0 0 280 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <style>{`
          @keyframes pulse-signal {
            0%, 100% { opacity: 0.15; stroke-width: 1; }
            50% { opacity: 0.8; stroke-width: 2.5; stroke: #7FA9FF; }
          }
          .network-cable {
            transition: stroke 0.3s;
          }
          .group:hover .network-cable {
            animation: pulse-signal 2s infinite ease-in-out;
          }
          .network-terminal {
            transition: all 0.3s;
          }
          .group:hover .network-terminal {
            fill: #010B3D;
            stroke: #7FA9FF;
          }
        `}</style>

        {/* Central Router Hub (Center) */}
        <g transform="translate(125, 45)">
          <rect width="30" height="30" rx="15" fill="#010B3D" stroke="currentColor" className="stroke-white/10 group-hover:stroke-melhek-blue/40" strokeWidth="1.5" />
          <circle cx="15" cy="15" r="5" fill="#7FA9FF" className="group-hover:animate-ping" />
          <circle cx="15" cy="15" r="2.5" fill="#F4F7FF" />
          {/* Antennas */}
          <line x1="15" y1="0" x2="15" y2="8" stroke="currentColor" className="stroke-white/20" />
        </g>

        {/* Terminal 1: Workspace Desk (Left Bottom) */}
        <g transform="translate(35, 75)">
          <rect width="36" height="24" rx="4" fill="#050816" stroke="currentColor" className="stroke-white/5 network-terminal" />
          <line x1="8" y1="18" x2="28" y2="18" stroke="currentColor" className="stroke-white/10" />
          <circle cx="28" cy="8" r="2.5" fill="#7FA9FF" className="opacity-40" />
        </g>

        {/* Terminal 2: Wall Mounted Access Point (Left Top) */}
        <g transform="translate(45, 15)">
          <rect width="20" height="20" rx="10" fill="#050816" stroke="currentColor" className="stroke-white/5 network-terminal" />
          <circle cx="10" cy="10" r="3" fill="#7FA9FF" className="opacity-60" />
        </g>

        {/* Terminal 3: Server Storage Rack (Right Bottom) */}
        <g transform="translate(205, 70)">
          <rect width="40" height="36" rx="4" fill="#050816" stroke="currentColor" className="stroke-white/5 network-terminal" />
          <rect x="5" y="6" width="30" height="6" rx="1" fill="#010B3D" />
          <circle cx="30" cy="9" r="1.5" fill="#10B981" />
          <rect x="5" y="15" width="30" height="6" rx="1" fill="#010B3D" />
          <circle cx="30" cy="18" r="1.5" fill="#10B981" />
          <rect x="5" y="24" width="30" height="6" rx="1" fill="#010B3D" />
          <circle cx="30" cy="27" r="1.5" fill="#7FA9FF" />
        </g>

        {/* Terminal 4: Backup Power Inverter (Right Top) */}
        <g transform="translate(210, 15)">
          <rect width="30" height="22" rx="3" fill="#050816" stroke="currentColor" className="stroke-white/5 network-terminal" />
          <path d="M10 7 L20 7 L12 15 L20 15" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        {/* Interconnection Lines */}
        {/* Router to Desk */}
        <path d="M125 60 C 85 60, 75 70, 71 75" stroke="currentColor" strokeWidth="1.5" className="stroke-white/10 network-cable" fill="none" />
        
        {/* Router to AP */}
        <path d="M125 50 C 95 40, 75 35, 65 30" stroke="currentColor" strokeWidth="1.5" className="stroke-white/10 network-cable" fill="none" />

        {/* Router to Rack */}
        <path d="M155 60 C 185 60, 195 65, 205 70" stroke="currentColor" strokeWidth="1.5" className="stroke-white/10 network-cable" fill="none" />

        {/* Router to Power */}
        <path d="M155 50 C 185 45, 195 35, 210 28" stroke="currentColor" strokeWidth="1.5" className="stroke-white/10 network-cable" fill="none" />
      </svg>
    </div>
  )
}
