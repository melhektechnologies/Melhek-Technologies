import { motion } from 'framer-motion'
import { AlertCircle, RefreshCw } from 'lucide-react'

export function GridSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className={`grid md:grid-cols-${count} gap-8 w-full`}>
      {[...Array(count)].map((_, i) => (
        <div key={i} className="glass p-10 rounded-[2.5rem] border-white/5 space-y-6">
          <div className="h-4 bg-white/5 rounded-full w-full animate-pulse" />
          <div className="h-4 bg-white/5 rounded-full w-5/6 animate-pulse" />
          <div className="h-4 bg-white/5 rounded-full w-4/6 animate-pulse" />
          <div className="pt-4 space-y-2">
            <div className="h-4 bg-white/10 rounded-full w-1/3 animate-pulse" />
            <div className="h-2 bg-white/5 rounded-full w-1/4 animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  )
}

export function ErrorState({ error, onRetry }: { error: string, onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-red-500/5 rounded-[2.5rem] border border-red-500/10">
      <AlertCircle className="w-12 h-12 text-red-500/50 mb-4" />
      <h3 className="text-lg font-bold text-white mb-2">Service Disruption</h3>
      <p className="text-white/40 text-sm mb-6 max-w-sm">{error}</p>
      <button 
        onClick={onRetry}
        className="flex items-center gap-2 px-6 py-2 bg-white/5 hover:bg-white/10 rounded-full text-xs font-bold uppercase tracking-widest transition-all"
      >
        <RefreshCw className="w-3 h-3" />
        Reconnect
      </button>
    </div>
  )
}
