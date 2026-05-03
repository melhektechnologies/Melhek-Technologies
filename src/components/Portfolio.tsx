'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { getProjects } from '@/app/actions/projects'
import { Project } from '@/types/project'
import { IconMap, IconType } from '@/lib/icons'
import { PortfolioSkeleton, PortfolioError } from './PortfolioStatus'

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
    <section id="portfolio" className="py-24 relative overflow-hidden" aria-labelledby="portfolio-heading">
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-melhek-blue font-mono text-xs font-bold tracking-[0.2em] uppercase mb-4"
            >
              Featured Work
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
              View All 40+ Projects
            </Link>
          </motion.div>
        </div>

        {/* Content Section */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <PortfolioSkeleton />
            </motion.div>
          ) : error ? (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
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

function ProjectCard({ project, index }: { project: Project, index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group relative h-full rounded-2xl"
    >
      <Link
        href={`/portfolio/${project.slug}`}
        className="block h-full rounded-2xl outline-none focus-visible:ring-2 ring-melhek-blue"
        aria-label={`Open case study: ${project.name}`}
      >
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 bg-melhek-dark transition-all duration-500 group-hover:border-melhek-blue/50 group-hover:-translate-y-2 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        {/* Browser-style Topbar */}
        <div className="h-8 bg-white/5 border-b border-white/10 flex items-center px-4 gap-1.5">
          <div className="w-2 h-2 rounded-full bg-[#ff5f57]" aria-hidden="true" />
          <div className="w-2 h-2 rounded-full bg-[#febc2e]" aria-hidden="true" />
          <div className="w-2 h-2 rounded-full bg-[#28c840]" aria-hidden="true" />
          <span className="ml-auto text-[8px] font-mono text-white/20 uppercase tracking-widest">{project.slug}</span>
        </div>

        {/* Mockup Content */}
        <div className={`absolute inset-0 top-8 bg-gradient-to-br ${project.gradient} flex items-center justify-center p-8`}>
           <div className="w-full h-full bg-white/5 rounded-xl border border-white/10 p-6 flex flex-col gap-4 overflow-hidden">
              <div className="h-4 w-3/4 bg-white/10 rounded-full" />
              <div className="h-3 w-1/2 bg-white/5 rounded-full" />
              <div className="flex-1 border border-white/5 bg-white/5 rounded-lg flex items-center justify-center text-melhek-blue opacity-50 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700">
                {IconMap[project.iconName as IconType]}
              </div>
           </div>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-melhek-navy/95 flex flex-col justify-end p-8 translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-20">
          <header>
            <div className="text-melhek-blue font-mono text-[10px] font-bold uppercase tracking-widest mb-2">
              {project.category}
            </div>
            <h4 className="text-2xl font-syne font-bold text-white mb-4">
              {project.name}
            </h4>
          </header>
          <p className="text-white/60 text-sm leading-relaxed mb-6">
            {project.description}
          </p>
          <span className="flex items-center gap-2 text-melhek-blue font-bold text-xs uppercase tracking-wider group-hover:text-white transition-colors">
            Explore Case Study 
            <ExternalLink className="w-3 h-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" aria-hidden />
          </span>
        </div>

        {/* Default Label */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-melhek-navy to-transparent group-hover:opacity-0 transition-opacity z-10">
          <div className="text-white/40 font-mono text-[9px] font-bold uppercase tracking-widest mb-1">
            {project.category}
          </div>
          <h4 className="text-lg font-syne font-bold text-white">
            {project.name}
          </h4>
        </div>
      </div>
      </Link>
    </motion.article>
  )
}

