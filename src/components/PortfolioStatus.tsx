import { motion } from 'framer-motion'

export function PortfolioSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="aspect-[4/3] rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden">
          <div className="h-8 bg-white/5 border-b border-white/10" />
          <div className="p-8 space-y-4">
             <div className="h-4 w-3/4 bg-white/5 rounded-full animate-pulse" />
             <div className="h-3 w-1/2 bg-white/5 rounded-full animate-pulse" />
             <div className="flex-1 h-32 border border-white/5 bg-white/5 rounded-xl animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  )
}

export function PortfolioError({ error, onRetry }: { error: string, onRetry: () => void }) {
  return (
    <div className="py-20 flex flex-col items-center justify-center text-center space-y-6">
      <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20">
        <span className="text-red-500 text-2xl font-bold">!</span>
      </div>
      <div className="max-w-md">
        <h3 className="text-xl font-syne font-bold text-white mb-2">Sync Interrupted</h3>
        <p className="text-white/60 text-sm">{error}</p>
      </div>
      <button 
        onClick={onRetry}
        className="btn-primary py-2 px-8 text-xs font-bold uppercase tracking-widest"
      >
        Retry Connection
      </button>
    </div>
  )
}
