'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { getProjects } from '@/app/actions/projects'
import { Project } from '@/types/project'
import { IconMap, IconType } from '@/lib/icons'
import { PortfolioSkeleton, PortfolioError } from './PortfolioStatus'

// ─── Project Card ────────────────────────────────────────────────────────────

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      className="group relative h-full rounded-2xl"
    >
      <Link
        href={`/portfolio/${project.slug}`}
        className="block h-full rounded-2xl outline-none focus-visible:ring-2 ring-melhek-blue"
        aria-label={`Open case study: ${project.name}`}
      >
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 bg-melhek-dark transition-all duration-500 group-hover:border-melhek-blue/50 group-hover:-translate-y-2 group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
          
          {/* Browser-style Topbar */}
          <div className="relative z-30 h-8 bg-black/60 backdrop-blur-sm border-b border-white/10 flex items-center px-4 gap-1.5">
            <div className="w-2 h-2 rounded-full bg-[#ff5f57]" aria-hidden="true" />
            <div className="w-2 h-2 rounded-full bg-[#febc2e]" aria-hidden="true" />
            <div className="w-2 h-2 rounded-full bg-[#28c840]" aria-hidden="true" />
            <span className="ml-3 text-[9px] font-mono text-white/25 uppercase tracking-widest truncate max-w-[140px]">
              melhek.tech / {project.slug}
            </span>
            {project.link && (
              <span className="ml-auto flex items-center gap-1 text-[8px] font-mono text-emerald-400/80 uppercase tracking-wide">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                Live
              </span>
            )}
          </div>

          {/* Screenshot or Fallback Mockup */}
          <div className="absolute inset-0 top-8">
            {project.image ? (
              <Image
                src={project.image}
                alt={`${project.name} screenshot`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                priority={index < 3}
              />
            ) : (
              <div className={`w-full h-full bg-gradient-to-br ${project.gradient} flex items-center justify-center p-8`}>
                <div className="w-full h-full bg-white/5 rounded-xl border border-white/10 p-6 flex flex-col gap-4">
                  <div className="h-4 w-3/4 bg-white/10 rounded-full" />
                  <div className="h-3 w-1/2 bg-white/5 rounded-full" />
                  <div className="flex-1 border border-white/5 bg-white/5 rounded-lg flex items-center justify-center text-melhek-blue opacity-50 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700">
                    {IconMap[project.iconName as IconType]}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Gradient scrim for default label */}
          <div className="absolute inset-0 top-8 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 group-hover:opacity-0 transition-opacity duration-300" />

          {/* Hover Overlay */}
          <div className="absolute inset-0 top-8 bg-melhek-navy/95 backdrop-blur-sm flex flex-col justify-end p-7 translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-20">
            <div className="text-melhek-blue font-mono text-[9px] font-bold uppercase tracking-widest mb-1.5">
              {project.category}
            </div>
            <h4 className="text-xl font-syne font-bold text-white mb-3 leading-tight">
              {project.name}
            </h4>
            <p className="text-white/55 text-[13px] leading-relaxed mb-4">
              {project.description}
            </p>
            {project.tags && project.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 bg-white/5 border border-melhek-blue/20 rounded-full text-[9px] font-mono text-melhek-blue/70 uppercase tracking-wider"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <span className="flex items-center gap-2 text-melhek-blue font-bold text-[11px] uppercase tracking-wider">
              View Case Study
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" aria-hidden />
            </span>
          </div>

          {/* Default Persistent Label */}
          <div className="absolute bottom-0 left-0 right-0 p-5 z-10 group-hover:opacity-0 transition-opacity duration-300">
            <div className="text-white/35 font-mono text-[9px] font-bold uppercase tracking-widest mb-1">
              {project.category}
            </div>
            <h4 className="text-base font-syne font-bold text-white">
              {project.name}
            </h4>
          </div>

        </div>
      </Link>
    </motion.article>
  )
}

// ─── Section ─────────────────────────────────────────────────────────────────

export default function Portfolio() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProjects = useCallback(async () => {
    setLoading(true)
    setError(null)
    const { data, error: fetchError } = await getProjects()
    if (fetchError) {
      setError(fetchError)
    } else if (data) {
      setProjects(data)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchProjects()
  }, [fetchProjects])

  return (
    <section
      id="portfolio"
      className="py-24 relative overflow-hidden"
      aria-labelledby="portfolio-heading"
    >
      <div className="container mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-melhek-blue font-mono text-xs font-bold tracking-[0.2em] uppercase mb-4"
            >
              Real Client Work · Addis Ababa, Ethiopia
            </motion.div>
            <motion.h2
              id="portfolio-heading"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl font-syne font-extrabold text-white leading-tight"
            >
              Platforms That <br />
              <span className="text-gradient">Move Industries.</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Link
              href="/portfolio"
              className="btn-secondary inline-flex font-syne uppercase tracking-wider text-xs focus-visible:ring-2 ring-melhek-blue outline-none"
            >
              View Full Portfolio →
            </Link>
          </motion.div>
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <PortfolioSkeleton />
            </motion.div>
          ) : error ? (
            <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <PortfolioError error={error} onRetry={fetchProjects} />
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {projects.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  )
}
