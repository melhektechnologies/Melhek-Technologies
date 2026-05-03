'use client'

import { useEffect } from 'react'
import type Lenis from 'lenis'
import { usePathname } from 'next/navigation'
import { useLenis } from '@/components/SmoothScroll'

function scrollIfHash(lenis: Lenis) {
  const hash = window.location.hash
  if (!hash || hash === '#') return
  const el = document.querySelector(hash)
  if (el instanceof HTMLElement) {
    lenis.scrollTo(el, { offset: -100, duration: 1.15 })
  }
}

/**
 * When the home page loads with a hash (e.g. /#trust), the hash changes, or same-page
 * `/#section` links are clicked, scroll using Lenis (native hash scroll fights Lenis).
 */
export function HashScroll() {
  const pathname = usePathname()
  const lenis = useLenis()

  useEffect(() => {
    if (pathname !== '/' || !lenis) return

    const scrollToHash = () => scrollIfHash(lenis)

    const t = window.setTimeout(scrollToHash, 80)
    window.addEventListener('hashchange', scrollToHash)

    const onClickCapture = (e: Event) => {
      const t = e.target as HTMLElement | null
      const a = t?.closest('a')
      if (!a?.getAttribute('href')?.includes('#')) return
      window.setTimeout(scrollToHash, 0)
    }
    document.addEventListener('click', onClickCapture, true)

    return () => {
      window.clearTimeout(t)
      window.removeEventListener('hashchange', scrollToHash)
      document.removeEventListener('click', onClickCapture, true)
    }
  }, [pathname, lenis])

  return null
}
