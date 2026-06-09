'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send } from 'lucide-react'
import { submitContact, type ContactState } from '@/app/actions/contact'
import { DIVISIONS } from '@/constants/divisions'

const initialState: ContactState = {}

export default function Contact() {
  const [state, formAction, isPending] = useActionState(submitContact, initialState)

  return (
    <section id="contact" className="py-24 relative bg-melhek-navy/10">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-display font-bold mb-8"
            >
              Let&apos;s Secure Your <br />
              <span className="text-melhek-blue">Digital Future.</span>
            </motion.h2>
            <p className="text-lg text-white/50 mb-12">
              Ready to build the next generation of your business infrastructure? Reach out to our elite engineering team.
            </p>

            <div className="space-y-8">
              {[
                { icon: Mail, label: "Email Us", val: "melhektechnologies@gmail.com", href: "mailto:melhektechnologies@gmail.com" },
                { icon: Phone, label: "Call Us", val: "+251 972 23 7318", href: "tel:+251972237318" },
                { icon: Phone, label: "WhatsApp", val: "+251 721 23 7318", href: "https://wa.me/251721237318" },
                { icon: MapPin, label: "Visit Us", val: "Addis Ababa, Ethiopia", href: "https://maps.google.com/?q=Addis+Ababa+Ethiopia" },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-6 group"
                >
                  <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-melhek-blue group-hover:bg-melhek-blue group-hover:text-melhek-navy transition-all duration-300">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-white/30 font-bold mb-1">{item.label}</div>
                    <div className="text-xl font-medium text-white group-hover:text-melhek-blue transition-colors">{item.val}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass p-10 rounded-[3rem] border-white/5"
          >
            {state.success ? (
              <div className="text-center py-8 space-y-6" role="status">
                <p className="text-melhek-blue font-mono text-sm">
                  Transmission received. Our team will respond shortly.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/" className="btn-secondary inline-flex text-sm justify-center">
                    Return home
                  </Link>
                  <button
                    type="button"
                    className="btn-primary text-sm"
                    onClick={() => window.location.reload()}
                  >
                    Send another message
                  </button>
                </div>
              </div>
            ) : (
            <form action={formAction} className="space-y-6">
              {state.error ? (
                <p className="text-red-400 text-sm" role="alert">{state.error}</p>
              ) : null}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="contact-name" className="text-xs uppercase tracking-widest font-bold text-white/40 ml-4">Full Name</label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    className={`w-full bg-white/5 border rounded-2xl px-6 py-4 focus:outline-none focus:border-melhek-blue transition-colors text-white ${state.fieldErrors?.name ? 'border-red-500/50' : 'border-white/10'}`}
                    placeholder="John Doe"
                    aria-invalid={!!state.fieldErrors?.name}
                    aria-describedby={state.fieldErrors?.name ? 'err-name' : undefined}
                  />
                  {state.fieldErrors?.name ? (
                    <p id="err-name" className="text-red-400 text-xs ml-4">{state.fieldErrors.name}</p>
                  ) : null}
                </div>
                <div className="space-y-2">
                  <label htmlFor="contact-email" className="text-xs uppercase tracking-widest font-bold text-white/40 ml-4">Email Address</label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    className={`w-full bg-white/5 border rounded-2xl px-6 py-4 focus:outline-none focus:border-melhek-blue transition-colors text-white ${state.fieldErrors?.email ? 'border-red-500/50' : 'border-white/10'}`}
                    placeholder="john@company.com"
                    aria-invalid={!!state.fieldErrors?.email}
                    aria-describedby={state.fieldErrors?.email ? 'err-email' : undefined}
                  />
                  {state.fieldErrors?.email ? (
                    <p id="err-email" className="text-red-400 text-xs ml-4">{state.fieldErrors.email}</p>
                  ) : null}
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="contact-division" className="text-xs uppercase tracking-widest font-bold text-white/40 ml-4">Subject / Division</label>
                <select
                  id="contact-division"
                  name="division"
                  required
                  defaultValue=""
                  className={`w-full bg-white/5 border rounded-2xl px-6 py-4 focus:outline-none focus:border-melhek-blue transition-colors text-white appearance-none ${state.fieldErrors?.division ? 'border-red-500/50' : 'border-white/10'}`}
                  aria-invalid={!!state.fieldErrors?.division}
                  aria-describedby={state.fieldErrors?.division ? 'err-division' : undefined}
                >
                  <option value="" disabled className="bg-melhek-dark text-white">Select Division</option>
                  {DIVISIONS.map((d) => (
                    <option key={d.slug} value={d.slug} className="bg-melhek-dark text-white">{d.title}</option>
                  ))}
                </select>
                {state.fieldErrors?.division ? (
                  <p id="err-division" className="text-red-400 text-xs ml-4">{state.fieldErrors.division}</p>
                ) : null}
              </div>
              <div className="space-y-2">
                <label htmlFor="contact-message" className="text-xs uppercase tracking-widest font-bold text-white/40 ml-4">Project Details</label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  className={`w-full bg-white/5 border rounded-3xl px-6 py-4 focus:outline-none focus:border-melhek-blue transition-colors text-white h-40 ${state.fieldErrors?.message ? 'border-red-500/50' : 'border-white/10'}`}
                  placeholder="Tell us about your vision..."
                  aria-invalid={!!state.fieldErrors?.message}
                  aria-describedby={state.fieldErrors?.message ? 'err-message' : undefined}
                />
                {state.fieldErrors?.message ? (
                  <p id="err-message" className="text-red-400 text-xs ml-4">{state.fieldErrors.message}</p>
                ) : null}
              </div>
              <button type="submit" disabled={isPending} className="w-full btn-primary flex items-center justify-center gap-3 disabled:opacity-60">
                {isPending ? (
                  <span className="w-5 h-5 border-2 border-melhek-navy border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    Send Transmission <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
