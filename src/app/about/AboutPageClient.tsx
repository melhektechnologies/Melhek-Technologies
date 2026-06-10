'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import {
  Anchor, Compass, Shield, Clock,
  ArrowRight, Globe, Layers, Lock,
  Wifi, Brain, Building2
} from 'lucide-react'

/* ─── Reusable fade-up wrapper ───────────────────── */
function FadeUp({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ─── Section label chip ─────────────────────────── */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block px-4 py-1.5 rounded-full glass border-white/10 text-[10px] font-mono font-bold text-melhek-blue uppercase tracking-[0.25em] mb-6">
      {children}
    </span>
  )
}

/* ─── Data ───────────────────────────────────────── */
const ANCHOR_PILLARS = [
  {
    icon: <Anchor className="w-5 h-5" />,
    label: 'Stability',
    desc: 'Systems that stay online, perform under pressure, and hold firm when conditions become unpredictable.',
  },
  {
    icon: <Shield className="w-5 h-5" />,
    label: 'Trust',
    desc: 'Relationships built through consistent delivery, transparency, and honesty in every interaction.',
  },
  {
    icon: <Compass className="w-5 h-5" />,
    label: 'Direction',
    desc: 'Not just building tools — guiding businesses through complex technology decisions with clarity.',
  },
  {
    icon: <Lock className="w-5 h-5" />,
    label: 'Security',
    desc: 'Protecting what matters most: your records, your customers, and your reputation.',
  },
  {
    icon: <Clock className="w-5 h-5" />,
    label: 'Long-Term Thinking',
    desc: 'Every decision considers not only today\'s need but the demands of tomorrow and the years that follow.',
  },
  {
    icon: <Globe className="w-5 h-5" />,
    label: 'Reliability',
    desc: 'Businesses depend on us the same way ships depend on their anchor — completely and without question.',
  },
]

const PHILOSOPHY = [
  {
    num: '01',
    title: 'Technology Should Serve People',
    body: 'The measure of any system is not its complexity — it is how clearly it solves a human problem. We build software that feels obvious to use, regardless of how sophisticated it is underneath.',
  },
  {
    num: '02',
    title: 'Think Long-Term',
    body: 'Short-term shortcuts create long-term debt. We design foundations that absorb growth rather than crack under it. Every architecture decision is measured against where you will be in five years.',
  },
  {
    num: '03',
    title: 'Clarity Over Complexity',
    body: 'A hospital director should not need a technical manual to check their inventory report. Sophisticated systems should still feel intuitive to the people using them daily.',
  },
  {
    num: '04',
    title: 'Trust Is Earned',
    body: 'Every interaction, every system, and every experience is an opportunity to strengthen confidence or erode it. We treat each project as if our entire reputation depends on it — because it does.',
  },
]

const PROCESS = [
  {
    step: '01',
    label: 'Discover',
    body: 'We begin by listening. Understanding the real challenge behind the stated request. The surface problem is rarely the root problem. We ask until we find it.',
  },
  {
    step: '02',
    label: 'Design',
    body: 'Architecture before aesthetics. We design systems the way engineers design bridges — load-bearing first, elegant second. Structure must support what follows.',
  },
  {
    step: '03',
    label: 'Engineer',
    body: 'Precision-built software. Every function written with clarity, security, and long-term performance as the primary concern. No shortcuts. No unnecessary complexity.',
  },
  {
    step: '04',
    label: 'Evolve',
    body: 'We stay. We monitor, adapt, and grow with our clients. The relationship does not end at delivery — it begins there. Systems are living things that require continued care.',
  },
]

const DIVISIONS = [
  { icon: <Globe className="w-5 h-5" />, title: 'Melhek Digital', desc: 'Professional web presence and customer-facing portals.' },
  { icon: <Building2 className="w-5 h-5" />, title: 'Melhek Hospitality', desc: 'Hotels, restaurants, and café technology systems.' },
  { icon: <Layers className="w-5 h-5" />, title: 'Melhek Business Systems', desc: 'Inventory, billing, and operational dashboards.' },
  { icon: <Brain className="w-5 h-5" />, title: 'Melhek AI Labs', desc: 'Intelligent automation and data-driven decision tools.' },
  { icon: <Lock className="w-5 h-5" />, title: 'Melhek Secure', desc: 'Security protocols and threat protection services.' },
  { icon: <Wifi className="w-5 h-5" />, title: 'Melhek Infrastructure', desc: 'Physical networks, cabling, and smart building systems.' },
]

/* ─── Main client page ───────────────────────────── */
export default function AboutPageClient() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '28%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])

  return (
    <main className="relative bg-melhek-dark overflow-x-hidden">

      {/* ══════════════════════════════════════════════
          SECTION 1 — HERO STORY
      ══════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background ambience */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[650px] bg-melhek-blue/[0.06] blur-[160px] rounded-full pointer-events-none" aria-hidden />
        <div className="absolute bottom-0 right-0 w-[600px] h-[500px] bg-melhek-navy/70 blur-[120px] rounded-full pointer-events-none" aria-hidden />

        {/* Grid */}
        <div className="digital-grid absolute inset-0" aria-hidden />

        {/* Giant logo watermark that parallaxes */}
        <motion.div
          style={{ y: heroY, opacity: 0.04 }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          aria-hidden
        >
          <div className="relative w-[70vw] h-[70vw] max-w-[800px] max-h-[800px]">
            <Image
              src="/logo-light.png"
              alt=""
              fill
              sizes="70vw"
              className="object-contain"
            />
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 container mx-auto px-6 text-center max-w-5xl pt-32 pb-20"
        >
          <FadeUp>
            <SectionLabel>Our Origin · Our Direction · Our Promise</SectionLabel>
          </FadeUp>

          <FadeUp delay={0.08}>
            <h1 className="text-[clamp(40px,7vw,92px)] font-syne font-extrabold text-white leading-[1.0] mb-8 tracking-[-0.03em]">
              More Than Technology.
              <br />
              <span className="text-gradient">A Foundation for<br />What Comes Next.</span>
            </h1>
          </FadeUp>

          <FadeUp delay={0.18}>
            <p className="text-[clamp(16px,2vw,21px)] text-white/40 font-light leading-[1.9] max-w-3xl mx-auto mb-14">
              In a world where technology changes daily, businesses need more than websites,
              software, or digital tools.{' '}
              <span className="text-white/60">They need clarity. They need reliability. They need a trusted foundation.</span>
            </p>
          </FadeUp>

          <FadeUp delay={0.26}>
            <div className="flex items-center justify-center gap-5 flex-wrap">
              <Link href="/contact" className="btn-primary">
                Start a Conversation <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="#anchor" className="btn-secondary">
                The Anchor Story ↓
              </a>
            </div>
          </FadeUp>
        </motion.div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-25" aria-hidden>
          <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-white">Scroll</span>
          <div className="w-[1px] h-14 bg-gradient-to-b from-melhek-blue to-transparent" />
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 2 — WHY MELHEK EXISTS
      ══════════════════════════════════════════════ */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-20 items-center">

            {/* Left: story */}
            <FadeUp>
              <SectionLabel>Why We Started</SectionLabel>
              <h2 className="text-[clamp(32px,4.5vw,58px)] font-syne font-extrabold text-white leading-[1.1] mb-10 tracking-[-0.03em]">
                Technology Should<br />Create{' '}
                <span className="text-gradient">Confidence.</span>
                <br />Not Confusion.
              </h2>
              <div className="space-y-5 text-white/50 text-[17px] leading-[1.9] font-light">
                <p>
                  Many businesses invest heavily in technology and are left with disconnected tools, outdated systems, and software that creates more problems than it solves.
                </p>
                <p>
                  That gap is what Melhek was built to close.
                </p>
                <p>
                  We were founded on a single belief:{' '}
                  <strong className="text-white/80 font-medium">
                    businesses deserve systems that are dependable, scalable, and designed with purpose from day one.
                  </strong>
                </p>
                <p>
                  Our goal is not simply to build software. Our goal is to help organizations build stronger digital foundations — the kind that hold firm when everything else is changing.
                </p>
              </div>
            </FadeUp>

            {/* Right: stat card stack */}
            <FadeUp delay={0.12}>
              <div className="relative">
                <div className="absolute -top-5 -right-5 w-full h-full glass rounded-[2rem] opacity-25 border-white/5" aria-hidden />
                <div className="absolute -top-2.5 -right-2.5 w-full h-full glass rounded-[2rem] opacity-50 border-white/5" aria-hidden />
                <div className="glass rounded-[2rem] p-12 border-white/8 relative">
                  <div className="space-y-0 divide-y divide-white/5">
                    {[
                      { label: 'Founded', value: '2022', sub: 'Addis Ababa, Ethiopia' },
                      { label: 'Mission', value: 'Digital Anchor', sub: 'Stability for every business' },
                      { label: 'Approach', value: 'Long-Term', sub: 'Not short-term convenience' },
                      { label: 'Market', value: 'Africa First', sub: 'Starting with Ethiopia' },
                    ].map((item) => (
                      <div key={item.label} className="flex items-start gap-6 py-7 first:pt-0 last:pb-0">
                        <div className="text-[9px] font-mono text-white/20 uppercase tracking-widest mt-1 w-14 shrink-0">
                          {item.label}
                        </div>
                        <div>
                          <div className="text-xl font-syne font-extrabold text-white">{item.value}</div>
                          <div className="text-xs text-white/30 mt-0.5 font-light">{item.sub}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 3 — THE MEANING OF THE ANCHOR
      ══════════════════════════════════════════════ */}
      <section id="anchor" className="py-32 relative overflow-hidden scroll-mt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-melhek-navy/15 to-transparent pointer-events-none" aria-hidden />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-melhek-blue/[0.04] blur-[200px] rounded-full pointer-events-none" aria-hidden />

        <div className="container mx-auto px-6 max-w-6xl">

          {/* Heading */}
          <div className="text-center mb-20">
            <FadeUp><SectionLabel>Brand Etymology</SectionLabel></FadeUp>
            <FadeUp delay={0.06}>
              <h2 className="text-[clamp(34px,5.5vw,74px)] font-syne font-extrabold text-white leading-[1.05] mb-6 tracking-[-0.03em]">
                Melhek Means{' '}
                <span className="text-gradient">Anchor.</span>
              </h2>
            </FadeUp>
            <FadeUp delay={0.12}>
              <p className="text-[18px] text-white/40 font-light max-w-xl mx-auto">
                Derived from the classical Semitic root, it represents our core engineering philosophy: serving as a stable digital anchor for business operations.
              </p>
            </FadeUp>
          </div>

          {/* Giant animated anchor centerpiece */}
          <FadeUp delay={0.06}>
            <div className="relative flex items-center justify-center mb-20">
              <div className="absolute w-72 h-72 bg-melhek-blue/10 blur-[100px] rounded-full" aria-hidden />
              {/* Concentric rings */}
              <div className="absolute w-56 h-56 rounded-full border border-melhek-blue/[0.12] animate-pulse" aria-hidden />
              <div className="absolute w-80 h-80 rounded-full border border-melhek-blue/[0.07]" aria-hidden />
              <div className="absolute w-[420px] h-[420px] rounded-full border border-melhek-blue/[0.03]" aria-hidden />

              {/* Anchor icon */}
              <motion.div
                animate={{ rotate: [0, 4, -4, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                className="relative z-10"
              >
                <div className="w-44 h-44 rounded-full glass border-melhek-blue/25 flex items-center justify-center shadow-[0_0_80px_rgba(127,169,255,0.18)]">
                  <Anchor className="w-22 h-22 text-melhek-blue" strokeWidth={1} style={{ width: '5.5rem', height: '5.5rem' }} />
                </div>
              </motion.div>
            </div>
          </FadeUp>

          {/* Narrative paragraphs */}
          <FadeUp delay={0.1}>
            <div className="max-w-3xl mx-auto text-center space-y-5 text-[18px] text-white/45 font-light leading-[1.9] mb-20">
              <p>For centuries, anchors have been the symbol of stability in uncertain conditions.</p>
              <p>They do not stop the storm. They hold the ship steady{' '}<em className="text-white/70 not-italic">through</em> it.</p>
              <p>
                Technology today feels much the same. Businesses face constant change, endless competing tools, and increasing complexity with every passing year.
              </p>
              <p className="text-[20px] text-white/80 font-medium leading-[1.7]">
                Melhek exists to be that anchor — holding your business steady while you move confidently toward the future.
              </p>
            </div>
          </FadeUp>

          {/* Pillars grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {ANCHOR_PILLARS.map((pillar, i) => (
              <FadeUp key={pillar.label} delay={i * 0.07}>
                <motion.div
                  whileHover={{ y: -6, borderColor: 'rgba(127,169,255,0.3)' }}
                  className="glass p-8 rounded-2xl border-white/5 transition-all duration-500 group cursor-default"
                >
                  <div className="w-10 h-10 rounded-xl glass flex items-center justify-center text-melhek-blue mb-6 group-hover:shadow-[0_0_24px_rgba(127,169,255,0.35)] transition-all duration-500">
                    {pillar.icon}
                  </div>
                  <h3 className="text-lg font-syne font-extrabold text-white mb-3">{pillar.label}</h3>
                  <p className="text-sm text-white/40 leading-relaxed font-light">{pillar.desc}</p>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 4 — OUR PHILOSOPHY
      ══════════════════════════════════════════════ */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid lg:grid-cols-[280px_1fr] gap-20 items-start">

            {/* Sticky label column */}
            <div className="lg:sticky lg:top-32">
              <FadeUp>
                <SectionLabel>Our Principles</SectionLabel>
                <h2 className="text-[clamp(36px,3.5vw,52px)] font-syne font-extrabold text-white leading-[1.05] tracking-[-0.03em]">
                  Built<br /><span className="text-gradient">Differently.</span>
                </h2>
                <p className="text-white/35 text-[15px] leading-relaxed mt-5 font-light">
                  The principles that guide every system, every relationship, and every decision we make.
                </p>
              </FadeUp>
            </div>

            {/* Philosophy cards */}
            <div className="space-y-5">
              {PHILOSOPHY.map((item, i) => (
                <FadeUp key={item.num} delay={i * 0.08}>
                  <motion.div
                    whileHover={{ x: 6 }}
                    className="glass p-10 rounded-2xl border-white/5 hover:border-melhek-blue/25 transition-all duration-500 group cursor-default"
                  >
                    <div className="flex gap-8 items-start">
                      <span className="text-[10px] font-mono text-melhek-blue/40 font-bold tracking-widest shrink-0 mt-1.5">
                        {item.num}
                      </span>
                      <div>
                        <h3 className="text-xl font-syne font-extrabold text-white mb-3 group-hover:text-melhek-blue transition-colors duration-300">
                          {item.title}
                        </h3>
                        <p className="text-white/45 leading-[1.85] text-[15px] font-light">{item.body}</p>
                      </div>
                    </div>
                  </motion.div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 5 — HOW WE THINK (PROCESS)
      ══════════════════════════════════════════════ */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-melhek-navy/12 to-transparent pointer-events-none" aria-hidden />

        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-20">
            <FadeUp><SectionLabel>Our Methodology</SectionLabel></FadeUp>
            <FadeUp delay={0.07}>
              <h2 className="text-[clamp(32px,5vw,64px)] font-syne font-extrabold text-white leading-[1.05] tracking-[-0.03em]">
                The <span className="text-gradient">Melhek Approach.</span>
              </h2>
            </FadeUp>
            <FadeUp delay={0.13}>
              <p className="text-white/40 text-[17px] mt-6 max-w-2xl mx-auto font-light leading-relaxed">
                We do not just explain technologies. We explain thinking. How we think determines what we build.
              </p>
            </FadeUp>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 relative">
            {/* Connector line */}
            <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-melhek-blue/20 to-transparent" aria-hidden />

            {PROCESS.map((item, i) => (
              <FadeUp key={item.step} delay={i * 0.1}>
                <div className="glass rounded-2xl p-8 border-white/5 hover:border-melhek-blue/25 transition-all duration-500 group relative h-full flex flex-col">
                  <div className="w-10 h-10 rounded-full glass border-melhek-blue/20 flex items-center justify-center text-[11px] font-mono font-bold text-melhek-blue mb-8 group-hover:bg-melhek-blue group-hover:text-melhek-navy transition-all duration-300 shrink-0">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-syne font-extrabold text-white mb-4">{item.label}</h3>
                  <p className="text-sm text-white/40 leading-relaxed font-light flex-1">{item.body}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 6 — WHAT WE ARE BUILDING
      ══════════════════════════════════════════════ */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-20 items-start">

            {/* Left */}
            <FadeUp>
              <SectionLabel>The Ecosystem</SectionLabel>
              <h2 className="text-[clamp(32px,4.5vw,60px)] font-syne font-extrabold text-white leading-[1.1] mb-8 tracking-[-0.03em]">
                Building<br /><span className="text-gradient">Beyond Today.</span>
              </h2>
              <div className="space-y-5 text-white/50 text-[17px] leading-[1.9] font-light mb-10">
                <p>
                  Melhek is not a single product or a single team. It is growing into a broader technology ecosystem — a collection of specialized divisions, each focused on a distinct area of business life.
                </p>
                <p>
                  These are not services. They are the future pillars of the company we are building.
                </p>
                <p>
                  Each division shares the same DNA: precise engineering, business-first thinking, and an unwavering commitment to long-term reliability.
                </p>
              </div>
              <Link href="/#ecosystem" className="btn-secondary text-sm">
                Explore All Divisions <ArrowRight className="w-4 h-4" />
              </Link>
            </FadeUp>

            {/* Right: division cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {DIVISIONS.map((div, i) => (
                <FadeUp key={div.title} delay={i * 0.07}>
                  <motion.div
                    whileHover={{ y: -5, borderColor: 'rgba(127,169,255,0.25)' }}
                    className="glass p-6 rounded-2xl border-white/5 transition-all duration-500 group h-full"
                  >
                    <div className="text-melhek-blue mb-4 group-hover:scale-110 transition-transform duration-300">
                      {div.icon}
                    </div>
                    <h3 className="font-syne font-bold text-white text-[14px] mb-2">{div.title}</h3>
                    <p className="text-[12px] text-white/35 leading-relaxed font-light">{div.desc}</p>
                  </motion.div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 7 — THE FUTURE VISION
      ══════════════════════════════════════════════ */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[600px] bg-melhek-blue/[0.05] blur-[180px] rounded-full pointer-events-none" aria-hidden />

        <div className="container mx-auto px-6 max-w-5xl text-center">
          <FadeUp><SectionLabel>The Road Ahead</SectionLabel></FadeUp>
          <FadeUp delay={0.06}>
            <h2 className="text-[clamp(32px,5.5vw,72px)] font-syne font-extrabold text-white leading-[1.05] mb-16 tracking-[-0.03em]">
              We Are at the Beginning<br />
              <span className="text-gradient">of a Long Journey.</span>
            </h2>
          </FadeUp>

          <div className="grid md:grid-cols-3 gap-5 mb-16">
            {[
              {
                headline: 'A Trusted Technology Partner',
                body: 'Becoming the company that business owners call first when they need clarity in a complex technical world — not just a vendor, but a partner with a stake in their success.',
              },
              {
                headline: "Africa's Digital Infrastructure Builder",
                body: 'Playing a meaningful role in laying the technological foundations for Ethiopian and African enterprises for decades to come. We are at the beginning of that mission.',
              },
              {
                headline: 'Intelligent Systems Creator',
                body: 'Moving beyond services into building intelligent systems that learn, adapt, and serve businesses automatically — reducing operational burden and increasing precision.',
              },
            ].map((item, i) => (
              <FadeUp key={item.headline} delay={i * 0.1}>
                <div className="glass p-8 rounded-2xl border-white/5 hover:border-melhek-blue/20 transition-all text-left h-full flex flex-col">
                  <div className="w-6 h-6 rounded-full bg-melhek-blue/15 mb-6 flex items-center justify-center shrink-0">
                    <div className="w-2 h-2 rounded-full bg-melhek-blue" />
                  </div>
                  <h3 className="text-[16px] font-syne font-extrabold text-white mb-4 leading-snug">{item.headline}</h3>
                  <p className="text-[13px] text-white/40 leading-relaxed font-light flex-1">{item.body}</p>
                </div>
              </FadeUp>
            ))}
          </div>

          {/* Pull quote */}
          <FadeUp delay={0.12}>
            <div className="glass rounded-3xl p-12 border-melhek-blue/10 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-melhek-blue/5 via-transparent to-transparent pointer-events-none" aria-hidden />
              <p className="relative text-[19px] text-white/55 font-light leading-[1.85] max-w-3xl mx-auto">
                The ambition is significant. The pace is deliberate. We are not racing to grow — we are growing to endure. The businesses we serve today should still be our partners a decade from now, because we built something worth staying loyal to.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 8 — CLOSING MANIFESTO
      ══════════════════════════════════════════════ */}
      <section className="py-40 relative overflow-hidden">
        {/* Top border */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-melhek-blue/20 to-transparent" aria-hidden />
        {/* Dramatic bottom glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1400px] h-[500px] bg-melhek-blue/[0.07] blur-[200px] rounded-full pointer-events-none" aria-hidden />

        <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">

          <FadeUp><SectionLabel>Our Commitment</SectionLabel></FadeUp>

          {/* Staggered manifesto lines */}
          <div className="space-y-4 mb-16 text-[clamp(26px,4vw,52px)] font-syne font-extrabold leading-[1.15] tracking-[-0.02em]">
            {[
              { text: 'Technology will continue to evolve.', opacity: 'text-white/20', delay: 0.1 },
              { text: 'Industries will continue to change.', opacity: 'text-white/40', delay: 0.2 },
              { text: 'New challenges will emerge.', opacity: 'text-white/60', delay: 0.3 },
              { text: 'Through every stage of that journey,', opacity: 'text-white/80', delay: 0.42 },
              { text: 'our mission remains the same.', opacity: 'text-white', delay: 0.54 },
            ].map((line) => (
              <motion.p
                key={line.text}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: line.delay, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                className={line.opacity}
              >
                {line.text}
              </motion.p>
            ))}
          </div>

          {/* Supporting statement */}
          <FadeUp delay={0.6}>
            <p className="text-[17px] text-white/45 font-light leading-[1.9] max-w-2xl mx-auto mb-20">
              To provide the stability, direction, and dependable innovation that businesses need to move forward — not just today, but for every year that follows.
            </p>
          </FadeUp>

          {/* Final brand stamp */}
          <FadeUp delay={0.65}>
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
              className="inline-flex flex-col items-center gap-5 mb-16"
            >
              <div className="relative w-28 h-28 rounded-full glass border-melhek-blue/20 flex items-center justify-center shadow-[0_0_100px_rgba(127,169,255,0.25)] overflow-hidden">
                <Image
                  src="/logo-light.png"
                  alt="Melhek Technologies Logo"
                  fill
                  sizes="112px"
                  className="object-contain p-3 filter brightness-110"
                />
              </div>
              <div className="text-center">
                <div className="text-3xl font-syne font-extrabold text-white tracking-tight">
                  Melhek Technologies
                </div>
                <div className="text-sm text-melhek-blue font-mono tracking-[0.3em] uppercase mt-2">
                  Your Digital Anchor.
                </div>
              </div>
            </motion.div>
          </FadeUp>

          {/* CTA buttons */}
          <FadeUp delay={0.75}>
            <div className="flex items-center justify-center gap-5 flex-wrap">
              <Link href="/contact" className="btn-primary">
                Begin Your Journey <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/portfolio" className="btn-secondary">
                View Our Work
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

    </main>
  )
}
