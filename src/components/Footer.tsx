'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useActionState, type ComponentProps } from 'react'
import { subscribeToNewsletter, NewsletterState } from '@/app/actions/newsletter'
import { FOOTER_LINKS } from '@/constants/footer'
import { CheckCircle2, AlertCircle, Send, Globe, MapPin } from 'lucide-react'
import { cn } from '@/lib/utils'

const SocialIcons = [
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/company/melhektechnologies',
    icon: (props: ComponentProps<'svg'>) => (
      <svg viewBox="0 0 24 24" {...props} fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
    )
  },
  {
    name: 'Facebook',
    href: 'https://facebook.com/melhektechnologies',
    icon: (props: ComponentProps<'svg'>) => (
      <svg viewBox="0 0 24 24" {...props} fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
    )
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com/melhektechnologies',
    icon: (props: ComponentProps<'svg'>) => (
      <svg viewBox="0 0 24 24" {...props} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
    )
  },
  {
    name: 'Telegram',
    href: 'https://t.me/melhektechnologies',
    icon: (props: ComponentProps<'svg'>) => (
      <svg viewBox="0 0 24 24" {...props} fill="currentColor"><path d="M20.665 3.717l-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701-.33 4.955c.488 0 .705-.223.974-.483l2.33-2.27 4.85 3.58c.893.492 1.532.24 1.754-.832l3.18-14.99c.325-1.307-.503-1.91-1.36-.153z"></path></svg>
    )
  },
  {
    name: 'TikTok',
    href: 'https://tiktok.com/@melhektechnologies',
    icon: (props: ComponentProps<'svg'>) => (
      <svg viewBox="0 0 24 24" {...props} fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-3.53.06-7.06.13-10.59z"></path></svg>
    )
  }
]

const quickStats = [
  { value: '50+', label: 'Projects' },
  { value: '9', label: 'Industries' },
  { value: '6', label: 'Divisions' },
  { value: '100%', label: 'Satisfaction' },
]

export default function Footer() {
  const initialState: NewsletterState = {}
  const [state, formAction, isPending] = useActionState(subscribeToNewsletter, initialState)

  return (
    <footer className="bg-melhek-dark pt-20 pb-8 relative overflow-hidden" role="contentinfo">
      {/* Decorative Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[350px] bg-melhek-blue/4 blur-[140px] -z-10" aria-hidden="true" />
      {/* Top border line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-melhek-blue/20 to-transparent" />

      <div className="container mx-auto px-6">

        {/* ── Top Banner: Quick Stats ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 p-6 glass rounded-3xl border-white/5"
        >
          {quickStats.map((s, i) => (
            <div key={s.label} className={`text-center py-2 ${i < quickStats.length - 1 ? 'md:border-r border-white/5' : ''}`}>
              <div className="text-2xl font-syne font-extrabold text-melhek-blue">{s.value}</div>
              <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest mt-1">{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* ── Main Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6" aria-label="Melhek Technologies Home">
              <div className="relative w-12 h-12">
                <Image
                  src="/logo-light.png"
                  alt=""
                  fill
                  sizes="48px"
                  className="object-contain"
                />
              </div>
              <div>
                <span className="text-lg font-syne font-bold tracking-tighter text-white block">
                  Melhek <span className="text-melhek-blue">Technologies</span>
                </span>
                <span className="text-[9px] font-mono text-white/25 uppercase tracking-widest">Your Digital Anchor</span>
              </div>
            </Link>

            <p className="text-white/40 text-[13px] leading-relaxed mb-6 font-light">
              A world-class technology partner delivering dependable websites, smart management systems, and automated operations — built for ambitious organisations across Africa and beyond.
            </p>

            {/* Location badges */}
            <div className="flex flex-wrap gap-2 mb-7">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-white/40">
                <MapPin className="w-3 h-3 text-melhek-blue" />
                Addis Ababa, Ethiopia
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-white/40">
                <Globe className="w-3 h-3 text-melhek-blue" />
                Global Delivery
              </div>
            </div>

            {/* Live system status */}
            <div className="flex items-center gap-2 mb-7 px-4 py-2.5 rounded-full glass border-white/5 w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#4ade80]" />
              <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold">All Systems Operational</span>
            </div>

            <nav className="flex gap-3" aria-label="Social Media">
              {SocialIcons.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full glass flex items-center justify-center text-white/40 hover:text-melhek-blue hover:border-melhek-blue/50 transition-all focus-visible:ring-2 ring-melhek-blue outline-none"
                  aria-label={`Follow us on ${social.name}`}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </nav>
          </div>

          {/* Ecosystem Links */}
          <nav aria-labelledby="footer-ecosystem">
            <h4 id="footer-ecosystem" className="text-white font-syne font-bold mb-6 text-sm uppercase tracking-wider">Ecosystem</h4>
            <ul className="space-y-3 text-sm text-white/40">
              {FOOTER_LINKS.ecosystem.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-melhek-blue transition-colors focus-visible:text-melhek-blue outline-none flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-melhek-blue/40 group-hover:bg-melhek-blue transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company Links */}
          <nav aria-labelledby="footer-company">
            <h4 id="footer-company" className="text-white font-syne font-bold mb-6 text-sm uppercase tracking-wider">Company</h4>
            <ul className="space-y-3 text-sm text-white/40">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-melhek-blue transition-colors focus-visible:text-melhek-blue outline-none flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-melhek-blue/40 group-hover:bg-melhek-blue transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Newsletter */}
          <section aria-labelledby="footer-newsletter">
            <h4 id="footer-newsletter" className="text-white font-syne font-bold mb-6 text-sm uppercase tracking-wider">Stay Updated</h4>
            <p className="text-[13px] text-white/40 mb-5 leading-relaxed">
              Get our latest technology insights, product launches, and engineering updates.
            </p>

            <form action={formAction} className="relative group">
              <input
                name="email"
                type="email"
                required
                placeholder="Your email address"
                className={cn(
                  "w-full bg-white/5 border rounded-full px-5 py-3.5 text-sm focus:outline-none transition-all outline-none pr-14",
                  state.error ? "border-red-500/50" : "border-white/10 focus:border-melhek-blue"
                )}
                aria-describedby={state.error ? "newsletter-error" : state.success ? "newsletter-success" : undefined}
                disabled={isPending || state.success}
              />
              <button
                type="submit"
                disabled={isPending || state.success}
                className="absolute right-2 top-1.5 bottom-1.5 w-10 h-10 bg-melhek-blue text-melhek-navy rounded-full flex items-center justify-center hover:bg-white transition-all disabled:opacity-50 disabled:hover:bg-melhek-blue cursor-pointer"
                aria-label="Subscribe"
              >
                {isPending ? (
                  <div className="w-4 h-4 border-2 border-melhek-navy border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </button>
            </form>

            <div className="mt-3 min-h-[20px]">
              {state.error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  id="newsletter-error"
                  className="text-[11px] text-red-500 flex items-center gap-1.5 font-medium"
                >
                  <AlertCircle className="w-3 h-3" />
                  {state.error}
                </motion.p>
              )}
              {state.success && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  id="newsletter-success"
                  className="text-[11px] text-melhek-blue flex items-center gap-1.5 font-medium"
                >
                  <CheckCircle2 className="w-3 h-3" />
                  You&apos;re on the list. Welcome aboard.
                </motion.p>
              )}
            </div>
          </section>
        </div>

        {/* ── Bottom Bar ── */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <p className="text-[10px] font-mono text-white/20 uppercase tracking-widest">
              © 2026 Melhek Technologies · Precision Engineered
            </p>
            <span className="hidden md:block text-white/10">·</span>
            <p className="text-[10px] font-mono text-white/15 uppercase tracking-widest">
              Built with Next.js · Deployed on Vercel
            </p>
          </div>
          <nav className="flex gap-6 text-[10px] font-mono text-white/20 uppercase tracking-widest" aria-label="Legal">
            {FOOTER_LINKS.legal.map((link) => (
              <Link key={link.label} href={link.href} className="hover:text-white/50 transition-colors">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  )
}
