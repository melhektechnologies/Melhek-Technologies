'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { name: 'About', href: '/about' },
  { name: 'Ecosystem', href: '/#ecosystem' },
  { name: 'Pricing & FAQs', href: '/pricing' },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'Why Us', href: '/#trust' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
      className={`fixed left-[5vw] right-[5vw] z-[1000] transition-all duration-500 ${
        isScrolled ? 'top-4 py-2' : 'top-8 py-0'
      }`}
    >
      <div className={`relative glass rounded-full px-8 py-3 flex items-center justify-between transition-all duration-500 ${
        isScrolled ? 'bg-melhek-navy/80 border-white/10 shadow-2xl' : 'bg-white/[0.03] border-white/5 shadow-none'
      }`}>
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group" aria-label="Melhek Home">
          <div className="relative w-11 h-11 group-hover:rotate-[15deg] transition-transform duration-500">
            <Image 
              src="/logo-light.png" 
              alt="Melhek Logo" 
              fill
              sizes="44px"
              className="object-contain filter brightness-110" 
            />
          </div>
          <span className="text-[17px] font-syne font-extrabold tracking-[-0.03em] text-white">
            Melhek
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-[13px] font-bold text-white/50 hover:text-melhek-blue transition-colors duration-300 font-mono tracking-wider uppercase"
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/contact"
            className="btn-primary !px-6 !py-2.5 !text-[13px] font-syne uppercase tracking-wider shadow-none hover:shadow-melhek-blue/20"
          >
            Start Project →
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden text-white w-10 h-10 flex items-center justify-center rounded-full glass border-white/10"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close Menu" : "Open Menu"}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="absolute top-full left-0 right-0 mt-4 lg:hidden"
          >
            <div className="glass rounded-[32px] p-8 flex flex-col gap-6 text-center border-white/10 shadow-3xl">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-2xl font-syne font-bold text-white hover:text-melhek-blue transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/contact"
                className="btn-primary !w-full justify-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Start Project →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
