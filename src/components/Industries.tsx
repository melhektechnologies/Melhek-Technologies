'use client'

import { motion } from 'framer-motion'
import { Hotel, Activity, ShoppingBag, Car, BookOpen, Scale, Users, Cpu, Layers, type LucideIcon } from 'lucide-react'

interface Industry {
  icon: LucideIcon
  name: string
  desc: string
}

const industries: Industry[] = [
  {
    icon: Hotel,
    name: "Hospitality",
    desc: "Direct online room bookings, front desk guest calendars, and digital café ordering systems to increase bookings and improve guest service."
  },
  {
    icon: Activity,
    name: "Healthcare",
    desc: "Simple patient appointment schedules, eye clinic databases, and secure medical office registers to cut waiting room times."
  },
  {
    icon: ShoppingBag,
    name: "Retail",
    desc: "Easy barcode scanning checkouts, automatic low-stock notifications, and real-time sales summaries to manage multiple store branches."
  },
  {
    icon: Car,
    name: "Automotive",
    desc: "High-quality vehicle showcase pages, automated vehicle import tracking, and simplified customer contact routing."
  },
  {
    icon: BookOpen,
    name: "Education",
    desc: "Student registration databases, school calendars, and digital schedules for classroom administration."
  },
  {
    icon: Scale,
    name: "Professional Services",
    desc: "Authority-building websites, client consultation request forms, and company portfolios for legal and consulting practices."
  },
  {
    icon: Users,
    name: "Religious Organizations",
    desc: "Community homepages, live broadcast video streaming, and secure online tithes and donation forms to connect with members abroad."
  },
  {
    icon: Cpu,
    name: "SMEs & Startups",
    desc: "Billing programs, customer contact sheets, and simple sales trackers built to help new businesses establish operations."
  },
  {
    icon: Layers,
    name: "Growing Enterprises",
    desc: "Multi-branch sales managers, operational dashboards, and database security checks to coordinate large organizations."
  }
]

export default function Industries() {
  return (
    <section id="industries" className="py-16 sm:py-20 lg:py-24 relative overflow-hidden bg-melhek-dark">
      {/* Decorative Orbs */}
      <div className="absolute w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,_rgba(127,169,255,0.05)_0%,_transparent_70%)] bottom-[-200px] left-[-200px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="px-4 py-1 rounded-full glass border-white/10 text-[10px] font-mono font-bold text-melhek-blue uppercase tracking-[0.2em] inline-block mb-6"
          >
            Sectors Empowered
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[clamp(30px,5vw,64px)] font-syne font-extrabold text-white mb-6 leading-[1.1]"
          >
            Systems Engineered For<br />
            <span className="text-gradient">Modern Businesses.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[15px] sm:text-[17px] text-melhek-steel/50 leading-relaxed max-w-2xl mx-auto font-light"
          >
            We build and deploy reliable software tools tailored to the daily needs of diverse business organizations.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {industries.map((ind, i) => {
            const Icon = ind.icon
            return (
              <motion.div
                key={ind.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="glass p-6 sm:p-8 rounded-2xl border-white/5 hover:border-melhek-blue/30 transition-all duration-300 hover:-translate-y-1 group flex gap-5 sm:gap-6"
              >
                <div className="text-melhek-blue shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-7 h-7 sm:w-8 sm:h-8" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-syne font-bold text-white mb-1.5 sm:mb-2 group-hover:text-melhek-blue transition-colors">
                    {ind.name}
                  </h3>
                  <p className="text-[12px] sm:text-[13px] text-melhek-steel/40 leading-relaxed">
                    {ind.desc}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
