'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function PartnerRedirectPage() {
  const router = useRouter()

  useEffect(() => {
    const savedId = localStorage.getItem('melhek_partner_id') || 'MDP-2026-001'
    router.replace(`/partner/${savedId}`)
  }, [router])

  return (
    <div className="min-h-screen bg-melhek-dark flex items-center justify-center text-white font-mono text-sm">
      <div className="flex items-center gap-3">
        <span className="w-4 h-4 border-2 border-melhek-blue border-t-transparent rounded-full animate-spin" />
        <span>Loading Partner Portal…</span>
      </div>
    </div>
  )
}
