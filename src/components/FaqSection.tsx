'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HelpCircle, ChevronDown, Folder, Landmark, Wrench, ShieldCheck, HeartHandshake, Layers } from 'lucide-react'

interface FaqItem {
  q: string
  a: string
}

interface FaqCategory {
  id: string
  name: string
  icon: any
  items: FaqItem[]
}

const FAQ_DATA: FaqCategory[] = [
  {
    id: 'projects',
    name: 'Projects & Scope',
    icon: Layers,
    items: [
      {
        q: 'Can Melhek build what my business needs?',
        a: 'Yes. We structure development under specialized divisions: digital websites, hospitality POS/ordering, and operations management tools. If your project involves databases, custom APIs, user accounts, or automated notifications, our engineers can build it. We specialize in custom business solutions rather than cookie-cutter templates.'
      },
      {
        q: 'What does the blueprint phase involve?',
        a: 'Before writing any code, we design the exact data schema and wireframes. This is our Blueprint Phase. You see exactly how the database operates, how information flows, and how layouts look. This eliminates guesswork and ensures alignment before engineering begins.'
      },
      {
        q: 'Can we migrate data from our existing old systems?',
        a: 'Absolutely. We build custom data-migration scripts to safely move patient files, inventory histories, hotel room records, or cashier logs from your legacy spreadsheets and old databases to the new Melhek platform.'
      }
    ]
  },
  {
    id: 'pricing',
    name: 'Pricing & Licensing',
    icon: Landmark,
    items: [
      {
        q: 'Why is there no fixed price list on your website?',
        a: 'Flat rates force agencies to either cut corners to protect margins or charge clients for features they don\'t need. We price relative to actual complexity, integrations, and database size. This ensures you pay only for the exact business value delivered.'
      },
      {
        q: 'Are there any hidden recurring fees?',
        a: 'No. You own the software license and intellectual property. The only recurring costs are standard hosting (e.g. Vercel, AWS) and domain registrations, which we set up transparently under your own accounts. We don\'t charge maintenance markup fees.'
      },
      {
        q: 'What is your billing schedule for new projects?',
        a: 'We generally divide billing into transparent, milestone-based installments: 40% to initiate the architecture blueprint, 40% during the core engineering phase, and 20% upon successful security auditing and deployment.'
      }
    ]
  },
  {
    id: 'support',
    name: 'Complimentary Support',
    icon: HeartHandshake,
    items: [
      {
        q: 'What happens after the system goes live?',
        a: 'We provide 30 days of complimentary hyper-care support covering bug fixes, speed tuning, and staff onboarding. Long-term operations SLA support is optional.'
      },
      {
        q: 'How do you handle backups and data safety?',
        a: 'Every Melhek Business System and database includes automated daily cloud backups and SSL encryption protocols as standard baseline configurations.'
      }
    ]
  },
  {
    id: 'hospitality',
    name: 'Hospitality Tech',
    icon: Wrench,
    items: [
      {
        q: 'Can you connect restaurant tables to our kitchen displays?',
        a: 'Yes. Our hospitality ordering platform routes orders placed on digital menus directly to kitchen screens, eliminating cashier delays and order errors.'
      },
      {
        q: 'How does the direct hotel booking engine save us money?',
        a: 'By allowing guests to browse rooms and reserve stays directly on your website, you bypass booking platform commissions (which typically range from 15% to 25%).'
      }
    ]
  },
  {
    id: 'business',
    name: 'Business Systems',
    icon: ShieldCheck,
    items: [
      {
        q: 'Can you sync inventory stock levels across multiple branch locations?',
        a: 'Yes. We build database configurations that automatically update central databases in real time, so cashier desks in different branches see active stock.'
      },
      {
        q: 'Does the checkout register system support barcode scanners?',
        a: 'Absolutely. We build systems that interface directly with standard hardware barcode scanners, cash drawers, and thermal receipt printers.'
      }
    ]
  },
  {
    id: 'general',
    name: 'General Inquiries',
    icon: Folder,
    items: [
      {
        q: 'Where is Melhek Technologies based?',
        a: 'Our engineering operations are based in Addis Ababa, Ethiopia. We serve enterprises across East Africa and work with international corporate partners.'
      },
      {
        q: 'How do we get started on a project?',
        a: 'You can use our Interactive Estimator to design a baseline setup, fill out our contact form, or schedule a remote discovery meeting or consultation session with our team.'
      }
    ]
  }
]

export default function FaqSection() {
  const [activeCategory, setActiveCategory] = useState('projects')
  const [openAccordion, setOpenAccordion] = useState<number | null>(0)

  const handleCategoryChange = (catId: string) => {
    setActiveCategory(catId)
    setOpenAccordion(0) // Open first item by default in new category
  }

  const toggleAccordion = (idx: number) => {
    setOpenAccordion(prev => prev === idx ? null : idx)
  }

  const selectedCategoryData = FAQ_DATA.find(c => c.id === activeCategory)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Category Tabs (Sidebar) */}
      <div className="lg:col-span-4 space-y-2 lg:sticky lg:top-28">
        <div className="flex items-center gap-2 text-melhek-blue mb-4">
          <HelpCircle className="w-5 h-5" />
          <span className="text-xs uppercase tracking-[0.3em] font-mono font-bold">Client Support Desk</span>
        </div>
        <h3 className="text-xl font-display font-extrabold text-white mb-6">
          Frequently Answered Inquiries
        </h3>

        <nav className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible gap-2 pb-4 lg:pb-0" aria-label="FAQ Categories">
          {FAQ_DATA.map(category => {
            const Icon = category.icon
            const isActive = activeCategory === category.id
            return (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-xs font-mono font-bold tracking-wide transition-all uppercase whitespace-nowrap cursor-pointer ${
                  isActive 
                    ? 'bg-melhek-blue text-melhek-navy border-melhek-blue shadow-[0_4px_20px_rgba(127,169,255,0.2)]' 
                    : 'bg-white/5 border-white/5 text-white/50 hover:text-white hover:border-white/10'
                }`}
              >
                <Icon className="w-4 h-4" />
                {category.name}
              </button>
            )
          })}
        </nav>
      </div>

      {/* Accordion List (Right) */}
      <div className="lg:col-span-8 space-y-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="space-y-4"
          >
            {selectedCategoryData?.items.map((item, idx) => {
              const isOpen = openAccordion === idx
              return (
                <div 
                  key={idx}
                  className={`rounded-2xl border transition-all overflow-hidden ${
                    isOpen 
                      ? 'border-melhek-blue bg-melhek-blue/[0.02]' 
                      : 'border-white/5 bg-white/[0.01] hover:border-white/10'
                  }`}
                >
                  <button
                    onClick={() => toggleAccordion(idx)}
                    className="w-full flex items-center justify-between p-6 text-left cursor-pointer transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm font-bold text-white pr-4">
                      {item.q}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border transition-all ${
                        isOpen ? 'bg-melhek-blue/10 border-melhek-blue/20 text-melhek-blue' : 'bg-white/5 border-white/5 text-white/40'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                      >
                        <div className="px-6 pb-6 text-xs text-white/60 leading-relaxed border-t border-white/5 pt-4">
                          {item.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
