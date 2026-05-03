'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useActionState, useTransition } from 'react'
import { subscribeToNewsletter, NewsletterState } from '@/app/actions/newsletter'
import { FOOTER_LINKS } from '@/constants/footer'
import { CheckCircle2, AlertCircle, Send } from 'lucide-react'
import { cn } from '@/lib/utils'

const SocialIcons = [
  {
    name: 'X',
    href: 'https://x.com',
    icon: (props: any) => (
      <svg viewBox="0 0 24 24" {...props} fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
    )
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com',
    icon: (props: any) => (
      <svg viewBox="0 0 24 24" {...props} fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
    )
  },
  {
    name: 'GitHub',
    href: 'https://github.com',
    icon: (props: any) => (
      <svg viewBox="0 0 24 24" {...props} fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
    )
  }
]

export default function Footer() {
  const initialState: NewsletterState = {}
  const [state, formAction, isPending] = useActionState(subscribeToNewsletter, initialState)

  return (
    <footer className="bg-melhek-dark pt-24 pb-12 relative overflow-hidden" role="contentinfo">
      {/* Decorative Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[300px] bg-melhek-blue/5 blur-[120px] -z-10" aria-hidden="true" />

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-8" aria-label="Melhek Technologies Home">
              <div className="relative w-12 h-12">
                <Image 
                  src="/logo-light.png" 
                  alt="" 
                  fill 
                  sizes="48px"
                  className="object-contain" 
                />
              </div>
              <span className="text-xl font-syne font-bold tracking-tighter text-white">
                MELHEK<span className="text-melhek-blue">TECH</span>
              </span>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed mb-8 max-w-xs font-light">
              Engineering the next generation of intelligent digital infrastructure. Your digital anchor in a rapidly evolving world.
            </p>
            <nav className="flex gap-4" aria-label="Social Media">
              {SocialIcons.map((social) => (
                <a 
                  key={social.name} 
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full glass flex items-center justify-center text-white/40 hover:text-melhek-blue hover:border-melhek-blue/50 transition-all focus-visible:ring-2 ring-melhek-blue outline-none" 
                  aria-label={`Follow us on ${social.name}`}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </nav>
          </div>

          <nav aria-labelledby="footer-ecosystem">
            <h4 id="footer-ecosystem" className="text-white font-bold mb-8">Ecosystem</h4>
            <ul className="space-y-4 text-sm text-white/40">
              {FOOTER_LINKS.ecosystem.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-melhek-blue transition-colors focus-visible:text-melhek-blue outline-none">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-company">
            <h4 id="footer-company" className="text-white font-bold mb-8">Company</h4>
            <ul className="space-y-4 text-sm text-white/40">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-melhek-blue transition-colors focus-visible:text-melhek-blue outline-none">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <section aria-labelledby="footer-newsletter">
            <h4 id="footer-newsletter" className="text-white font-bold mb-8">Newsletter</h4>
            <p className="text-sm text-white/40 mb-6 leading-relaxed">Stay updated with our latest infrastructure breakthroughs.</p>
            
            <form action={formAction} className="relative group">
              <input 
                name="email"
                type="email" 
                required
                placeholder="Engineering Email" 
                className={cn(
                  "w-full bg-white/5 border rounded-full px-6 py-3.5 text-sm focus:outline-none transition-all outline-none pr-14",
                  state.error ? "border-red-500/50" : "border-white/10 focus:border-melhek-blue"
                )} 
                aria-describedby={state.error ? "newsletter-error" : state.success ? "newsletter-success" : undefined}
                disabled={isPending || state.success}
              />
              <button 
                type="submit"
                disabled={isPending || state.success}
                className="absolute right-2 top-1.5 bottom-1.5 w-10 h-10 bg-melhek-blue text-melhek-navy rounded-full flex items-center justify-center hover:bg-white transition-all disabled:opacity-50 disabled:hover:bg-melhek-blue"
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
                  Transmission successful.
                </motion.p>
              )}
            </div>
          </section>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-mono text-white/20 uppercase tracking-widest">
            © 2026 Melhek Technologies. All rights reserved. Precision Engineered.
          </p>
          <nav className="flex gap-8 text-[10px] font-mono text-white/20 uppercase tracking-widest" aria-label="Legal">
            {FOOTER_LINKS.legal.map((link) => (
              <Link key={link.label} href={link.href} className="hover:text-white transition-colors">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  )
}

