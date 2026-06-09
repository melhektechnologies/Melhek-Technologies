'use client'

import type { ReactNode } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Monitor, Hotel, Shield, Construction, Brain, Server } from 'lucide-react'
import { DIVISIONS, type DivisionIconId } from '@/constants/divisions'
import { PROJECTS_DATA } from '@/data/projects'

const ICONS: Record<DivisionIconId, ReactNode> = {
  monitor: <Monitor className="w-10 h-10" />,
  hotel: <Hotel className="w-10 h-10" />,
  shield: <Shield className="w-10 h-10" />,
  construction: <Construction className="w-10 h-10" />,
  brain: <Brain className="w-10 h-10" />,
  server: <Server className="w-10 h-10" />,
}

export default function Ecosystem() {
  return (
    <section id="ecosystem" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="px-4 py-1 rounded-full glass border-white/10 text-[10px] font-mono font-bold text-melhek-blue uppercase tracking-[0.2em] inline-block mb-6"
          >
            Melhek Ecosystem
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[clamp(36px,5vw,64px)] font-syne font-extrabold text-white mb-6 leading-[1.1]"
          >
            Solutions Built to<br />
            <span className="text-gradient">Simplify Your Business.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[17px] text-melhek-steel/50 leading-relaxed max-w-2xl mx-auto font-light"
          >
            Six practical divisions dedicated to helping companies establish credibility online, serve guests better, track sales inventory, and secure business operations.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DIVISIONS.map((division) => {
            const featuredProjects = PROJECTS_DATA.filter((p) =>
              division.projectSlugs.includes(p.slug)
            )

            return (
              <motion.div
                key={division.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: division.delay }}
                className={`group relative glass p-10 rounded-[24px] border-white/5 hover:border-melhek-blue/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_24px_80px_rgba(0,0,0,0.5)] flex flex-col justify-between ${
                  division.span ? 'lg:col-span-2' : ''
                }`}
              >
                <div>
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-melhek-blue to-transparent opacity-0 group-hover:opacity-40 transition-opacity" />

                  <div className="font-mono text-[11px] text-white/20 font-bold tracking-widest mb-8">
                    {division.id}
                  </div>

                  <div className="text-melhek-blue mb-8 group-hover:scale-110 transition-transform duration-500">
                    {ICONS[division.iconId]}
                  </div>

                  <h3 className="text-2xl font-syne font-extrabold text-white mb-2">
                    {division.title}
                  </h3>
                  <div className="text-[11px] font-mono font-bold text-melhek-blue uppercase tracking-[0.15em] mb-6">
                    {division.sub}
                  </div>
                  <p className="text-[14px] text-melhek-steel/40 leading-relaxed mb-8 font-medium">
                    {division.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {division.tags.map((tag, j) => (
                      <span
                        key={j}
                        className="px-2.5 py-0.5 bg-white/5 border border-white/10 rounded-full text-[9px] font-mono text-white/30 uppercase tracking-tighter"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Featured Projects Inline Showcase */}
                  {featuredProjects.length > 0 && (
                    <div className="mt-6 pt-6 border-t border-white/5">
                      <span className="text-[9px] font-mono font-bold text-white/20 uppercase tracking-widest block mb-3">
                        Featured Projects
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {featuredProjects.map((proj) => (
                          <Link
                            key={proj.slug}
                            href={`/portfolio/${proj.slug}`}
                            className="px-2.5 py-1 bg-white/5 border border-white/10 hover:border-melhek-blue/30 rounded-xl text-[11px] font-semibold text-white/70 hover:text-white transition-all flex items-center gap-1.5"
                          >
                            {proj.status === "In Development" && (
                              <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-pulse" title="In Development" />
                            )}
                            {proj.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-8 mt-8 border-t border-white/5 flex items-center justify-between">
                  <Link
                    href={`/ecosystem/${division.slug}`}
                    className="text-[11px] font-mono font-bold text-melhek-blue/80 uppercase tracking-[0.2em] hover:text-melhek-blue transition-colors outline-none focus-visible:ring-1 ring-melhek-blue"
                  >
                    Division Details →
                  </Link>
                  <div className="w-8 h-[1px] bg-white/10 group-hover:w-16 group-hover:bg-melhek-blue transition-all duration-500" />
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
