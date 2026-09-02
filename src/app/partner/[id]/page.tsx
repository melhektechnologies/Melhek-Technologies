'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import {
  CheckCircle2,
  Clock,
  ChevronRight,
  ShieldCheck,
  Building2,
  UserCheck,
  Mail,
  Phone,
  MessageSquare,
  Calendar,
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  FileCheck,
  Layers,
  Wrench,
  Rocket,
  Search,
} from 'lucide-react'

interface PartnerState {
  partnerId: string
  name: string
  company: string
  position: string
  phone: string
  email: string
  signed: boolean
  signedDate: string
  discoveryCompleted: boolean
  discoveryData?: any
}

export default function PartnerDashboardPage() {
  const params = useParams()
  const rawId = params?.id ? (Array.isArray(params.id) ? params.id[0] : params.id) : ''
  const partnerId = decodeURIComponent(rawId || 'MDP-2026-001')

  const [partner, setPartner] = useState<PartnerState>({
    partnerId: partnerId,
    name: '',
    company: '',
    position: '',
    phone: '',
    email: '',
    signed: false,
    signedDate: '',
    discoveryCompleted: false,
  })

  useEffect(() => {
    // Attempt to load partner state from local storage or defaults
    const localSigned = localStorage.getItem('melhek_partner_signed') === 'true'
    const localId = localStorage.getItem('melhek_partner_id') || partnerId
    const localName = localStorage.getItem('melhek_partner_name') || 'Partner'
    const localCompany = localStorage.getItem('melhek_partner_company') || localStorage.getItem('melhek_partner_business') || 'Partner Business'
    const localPosition = localStorage.getItem('melhek_partner_position') || 'Executive / Owner'
    const localPhone = localStorage.getItem('melhek_partner_phone') || ''
    const localEmail = localStorage.getItem('melhek_partner_email') || ''
    const localSignedDate = localStorage.getItem('melhek_partner_signed_date') || new Date().toLocaleDateString('en-GB')
    const localDiscoveryCompleted = localStorage.getItem('melhek_discovery_completed') === 'true'
    
    let localDiscoveryData = undefined
    try {
      const d = localStorage.getItem('melhek_discovery_form')
      if (d) localDiscoveryData = JSON.parse(d)
    } catch {
      /* ignore */
    }

    setPartner({
      partnerId: partnerId || localId,
      name: localName,
      company: localCompany,
      position: localPosition,
      phone: localPhone,
      email: localEmail,
      signed: localSigned || true,
      signedDate: localSignedDate,
      discoveryCompleted: localDiscoveryCompleted,
      discoveryData: localDiscoveryData,
    })
  }, [partnerId])

  const stages = [
    {
      id: 'partnership',
      label: 'Partnership',
      status: partner.signed ? 'completed' : 'upcoming',
      statusText: 'Accepted',
      desc: 'Digital Partnership Agreement executed.',
      icon: FileCheck,
    },
    {
      id: 'discovery',
      label: 'Discovery',
      status: partner.discoveryCompleted ? 'completed' : 'in_progress',
      statusText: partner.discoveryCompleted ? 'Submitted' : 'Action required',
      desc: partner.discoveryCompleted
        ? 'Business discovery form submitted.'
        : 'Complete your Business Discovery intake form.',
      icon: Search,
      action: !partner.discoveryCompleted ? '/partnership' : undefined,
    },
    {
      id: 'strategy',
      label: 'Strategy',
      status: 'upcoming',
      statusText: 'Upcoming',
      desc: 'Information architecture, sitemap, & page layout strategy.',
      icon: Layers,
    },
    {
      id: 'design',
      label: 'Design',
      status: 'upcoming',
      statusText: 'Upcoming',
      desc: 'Custom UI/UX brand layout design (max 5 pages).',
      icon: Sparkles,
    },
    {
      id: 'development',
      label: 'Development',
      status: 'upcoming',
      statusText: 'Upcoming',
      desc: 'Responsive web engineering, basic SEO, & contact form.',
      icon: Wrench,
    },
    {
      id: 'review',
      label: 'Review',
      status: 'upcoming',
      statusText: 'Upcoming',
      desc: 'Partner preview and final scope refinements.',
      icon: CheckCircle2,
    },
    {
      id: 'launch',
      label: 'Launch',
      status: 'upcoming',
      statusText: 'Upcoming',
      desc: 'Live production release on *.vercel.app subdomain.',
      icon: Rocket,
    },
  ]

  return (
    <div className="min-h-screen bg-melhek-dark text-white selection:bg-melhek-blue selection:text-melhek-navy font-sans relative overflow-x-hidden">
      <div className="grain-overlay" aria-hidden />
      <div className="digital-grid" aria-hidden />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-melhek-navy/90 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-18 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-9 h-9 rounded-xl bg-melhek-blue/15 border border-melhek-blue/40 flex items-center justify-center text-melhek-blue">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="leading-tight">
              <span className="font-display font-extrabold text-sm tracking-tight block">Melhek</span>
              <span className="text-[10px] font-mono text-white/45 uppercase tracking-wider">Partner Portal</span>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <span className="text-[11px] font-mono px-3 py-1.5 rounded-lg border border-white/10 bg-black/40 text-melhek-blue font-bold">
              {partner.partnerId}
            </span>
            <Link
              href="/partnership"
              className="text-xs font-mono text-white/60 hover:text-white transition-colors hidden sm:block"
            >
              /partnership
            </Link>
          </div>
        </div>
      </header>

      <main className="pt-28 sm:pt-32 pb-24 max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Top Partner Welcome Header */}
        <div className="glass rounded-[2rem] border-white/10 bg-gradient-to-br from-melhek-navy/90 via-melhek-navy/70 to-melhek-blue/10 p-6 sm:p-10 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-[11px] font-mono uppercase tracking-wider font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Active Strategic Partner
              </div>
              <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
                {partner.company || 'Partnership Workspace'}
              </h1>
              <p className="text-sm text-white/60 font-light flex flex-wrap items-center gap-x-4 gap-y-1">
                <span>Representative: <strong className="text-white font-medium">{partner.name || 'Partner'}</strong></span>
                {partner.position && <span>• Role: <strong className="text-white/80 font-medium">{partner.position}</strong></span>}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/40 p-4 sm:p-5 flex flex-col gap-1 min-w-[220px]">
              <span className="text-[10px] font-mono text-white/40 uppercase">Partner Reference</span>
              <span className="text-xl font-mono font-bold text-melhek-blue">{partner.partnerId}</span>
              <span className="text-[11px] font-mono text-white/50 mt-1">Accepted: {partner.signedDate}</span>
            </div>
          </div>
        </div>

        {/* Roadmap / Timeline status list */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-display font-bold text-white">Partnership Delivery Roadmap</h2>
              <p className="text-xs text-white/55 font-light">Track real-time status as your digital foundation progresses.</p>
            </div>
            <span className="text-xs font-mono text-melhek-blue bg-melhek-blue/10 border border-melhek-blue/20 px-3 py-1 rounded-full font-semibold">
              Stage {partner.discoveryCompleted ? '2 of 7' : '1 of 7'}
            </span>
          </div>

          <div className="glass rounded-[2rem] border-white/10 bg-melhek-navy/80 p-6 sm:p-8 space-y-4">
            {stages.map((st, idx) => {
              const Icon = st.icon
              const isCompleted = st.status === 'completed'
              const isInProgress = st.status === 'in_progress'

              return (
                <div
                  key={st.id}
                  className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl border transition-all ${
                    isCompleted
                      ? 'bg-emerald-500/5 border-emerald-500/20'
                      : isInProgress
                      ? 'bg-melhek-blue/10 border-melhek-blue/40 shadow-lg shadow-melhek-blue/5'
                      : 'bg-white/[0.02] border-white/5 opacity-60'
                  }`}
                >
                  <div className="flex items-start sm:items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
                        isCompleted
                          ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
                          : isInProgress
                          ? 'bg-melhek-blue/20 border-melhek-blue text-melhek-blue'
                          : 'bg-white/5 border-white/10 text-white/40'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold text-white">{st.label}</h3>
                        <span className="text-xs font-mono text-white/30">Step 0{idx + 1}</span>
                      </div>
                      <p className="text-xs text-white/60 font-light mt-0.5">{st.desc}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-0 border-white/5">
                    <span
                      className={`text-xs font-mono px-3 py-1.5 rounded-full font-bold flex items-center gap-1.5 ${
                        isCompleted
                          ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                          : isInProgress
                          ? 'bg-melhek-blue/20 text-melhek-blue border border-melhek-blue/40 animate-pulse'
                          : 'bg-white/5 text-white/40 border border-white/10'
                      }`}
                    >
                      {isCompleted && <CheckCircle2 className="w-3.5 h-3.5" />}
                      {isInProgress && <Clock className="w-3.5 h-3.5" />}
                      {!isCompleted && !isInProgress && <span className="w-2 h-2 rounded-full bg-white/20" />}
                      {st.statusText}
                    </span>

                    {isInProgress && st.action && (
                      <Link
                        href={st.action}
                        className="btn-primary !px-4 !py-1.5 text-xs font-mono uppercase tracking-wider inline-flex items-center gap-1"
                      >
                        Complete Form <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Human Touchpoint Banner — Strategic Partnership Philosophy */}
        <div className="glass rounded-[2rem] border-melhek-blue/30 bg-gradient-to-br from-melhek-blue/15 via-melhek-navy/80 to-transparent p-6 sm:p-8 space-y-6">
          <div className="space-y-3">
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-melhek-blue font-bold">
              Human Relationship First
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
              The portal creates clarity. You and Melhek create strategy.
            </h2>
            <p className="text-sm text-white/75 font-light leading-relaxed max-w-3xl">
              We built this portal to eliminate repetitive paperwork—never to replace personal contact.
              Every strategic partnership is anchored in direct human communication with our leadership.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 py-2">
            {[
              { title: 'Trust', desc: 'Personal relationship' },
              { title: 'Clarity', desc: 'Portal education' },
              { title: 'Commitment', desc: 'Digital agreement' },
              { title: 'Information', desc: 'Discovery intake' },
              { title: 'Strategy', desc: 'Human partnership' },
            ].map((step, i) => (
              <div key={step.title} className="p-3 rounded-xl bg-white/[0.04] border border-white/8 text-center space-y-1">
                <span className="text-[10px] font-mono text-melhek-blue uppercase block">Step 0{i + 1}</span>
                <span className="text-xs font-bold text-white block">{step.title}</span>
                <span className="text-[10px] text-white/50 block font-light">{step.desc}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 pt-2 border-t border-white/10">
            <a
              href="mailto:melhektechnologies@gmail.com?subject=Strategic%20Partnership%20Strategy%20Session"
              className="btn-primary !px-6 !py-3 text-xs font-mono uppercase tracking-wider inline-flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" /> Book Strategy Call
            </a>
            <a
              href="https://t.me/MelhekTech"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary !px-6 !py-3 text-xs font-mono uppercase tracking-wider inline-flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-melhek-blue" /> Direct Telegram <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
            </a>
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center pt-4">
          <Link href="/partnership" className="text-xs font-mono text-white/50 hover:text-white transition-colors inline-flex items-center gap-2">
            ← Return to Partnership Program overview
          </Link>
        </div>
      </main>
    </div>
  )
}
