'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, X, Send, Sparkles, User, ArrowRight, Check, CornerDownLeft } from 'lucide-react'
import { getAiResponse, AiResponse } from '@/lib/ai-assistant-engine'
import { submitAssistantLead } from '@/app/actions/leads'

interface Message {
  id: string
  sender: 'user' | 'assistant'
  text: string
  timestamp: Date
  isSystem?: boolean
}

type IntakeState = 'idle' | 'waiting_name' | 'waiting_email' | 'waiting_description' | 'submitting' | 'completed'

export default function AiAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: 'Welcome to Melhek Technologies. I am your AI Assistant. Ask me anything about our divisions, portfolio, custom estimators, or execution timelines. Or click the option below to start your project blueprint.',
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([
    'Explain Ecosystem Divisions',
    'How are project timelines structured?',
    'Let\'s start a project'
  ])

  // Lead Intake Form State
  const [intakeState, setIntakeState] = useState<IntakeState>('idle')
  const [leadData, setLeadData] = useState({
    name: '',
    email: '',
    projectDescription: ''
  })

  const chatEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const addMessage = (sender: 'user' | 'assistant', text: string, isSystem = false) => {
    const newMessage: Message = {
      id: Math.random().toString(),
      sender,
      text,
      timestamp: new Date(),
      isSystem
    }
    setMessages(prev => [...prev, newMessage])
  }

  // Handle Free-text Message Submission
  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return

    const query = textToSend.trim()
    addMessage('user', query)
    setInputValue('')
    setSuggestions([])

    // If we are in the middle of lead intake
    if (intakeState !== 'idle') {
      handleIntakeStep(query)
      return
    }

    // Normal AI chat flow
    setIsTyping(true)
    
    // Simulate thinking delay
    setTimeout(async () => {
      const response: AiResponse = getAiResponse(query)
      setIsTyping(false)
      
      // If user typed something matching lead collection intent
      if (response.intent === 'lead_start' || query.toLowerCase().includes('start a project') || query.toLowerCase().includes('get a quote')) {
        setIntakeState('waiting_name')
        addMessage('assistant', 'I would be happy to help qualify your project inquiry! Let\'s collect a few basic details so our engineering desk can review them. First, what is your name?')
        setSuggestions(['Cancel Intake'])
      } else {
        addMessage('assistant', response.text)
        setSuggestions(response.suggestions || [])
      }
    }, 800)
  }

  // Step-by-step Lead Intake flow in chat
  const handleIntakeStep = async (input: string) => {
    if (input.toLowerCase() === 'cancel intake' || input.toLowerCase() === 'cancel') {
      setIntakeState('idle')
      setLeadData({ name: '', email: '', projectDescription: '' })
      addMessage('assistant', 'Project intake cancelled. How else can I assist you today?')
      setSuggestions(['Explain Ecosystem Divisions', 'How much do services cost?', 'Let\'s start a project'])
      return
    }

    if (intakeState === 'waiting_name') {
      setLeadData(prev => ({ ...prev, name: input }))
      setIntakeState('waiting_email')
      setIsTyping(true)
      setTimeout(() => {
        setIsTyping(false)
        addMessage('assistant', `Nice to meet you, ${input}! What is your best contact email address?`)
        setSuggestions(['Cancel Intake'])
      }, 600)
    } 
    else if (intakeState === 'waiting_email') {
      // Simple email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(input)) {
        addMessage('assistant', 'That email address doesn\'t seem valid. Please enter a correct email (e.g. name@company.com):')
        setSuggestions(['Cancel Intake'])
        return
      }

      setLeadData(prev => ({ ...prev, email: input }))
      setIntakeState('waiting_description')
      setIsTyping(true)
      setTimeout(() => {
        setIsTyping(false)
        addMessage('assistant', 'Thank you. Finally, please share a brief description of what you want us to build (e.g., project goals, key features, or division needed):')
        setSuggestions(['Cancel Intake'])
      }, 600)
    } 
    else if (intakeState === 'waiting_description') {
      const desc = input
      setIsTyping(true)
      setIntakeState('submitting')
      
      const finalData = {
        ...leadData,
        projectDescription: desc
      }

      // Trigger server action to register chatbot lead
      const result = await submitAssistantLead(finalData)
      setIsTyping(false)

      if (result.success) {
        setIntakeState('completed')
        addMessage('assistant', '✅ Intake complete!')
        addMessage('assistant', `Excellent, ${leadData.name}. I have queued your project brief directly into our engineering backlog. A lead partner from Melhek will contact you at ${leadData.email} within 6 business hours.`)
        setLeadData({ name: '', email: '', projectDescription: '' })
        setIntakeState('idle')
      } else {
        addMessage('assistant', `I apologize, but I encountered an issue saving your request: ${result.error || 'Server error'}. Please try again or email us directly at melhektechnologies@gmail.com.`)
        setIntakeState('idle')
      }

      setSuggestions(['Explain Ecosystem Divisions', 'How much do services cost?', 'Let\'s start a project'])
    }
  }

  // Handle Suggestion Chip click
  const handleSuggestionClick = (suggestion: string) => {
    if (suggestion === 'Let\'s start a project') {
      addMessage('user', suggestion)
      setIntakeState('waiting_name')
      setIsTyping(true)
      setTimeout(() => {
        setIsTyping(false)
        addMessage('assistant', 'I would be happy to help qualify your project inquiry! Let\'s collect a few basic details so our engineering desk can review them. First, what is your name?')
        setSuggestions(['Cancel Intake'])
      }, 600)
    } else if (suggestion === 'Open Project Estimator') {
      addMessage('user', suggestion)
      setIsTyping(true)
      setTimeout(() => {
        setIsTyping(false)
        addMessage('assistant', 'You can open our Interactive Project Estimator tool directly on our timelines page to generate custom system blueprints and timeline projections.')
        addMessage('assistant', 'Click the link here to visit: [Timelines & Estimator](/pricing).')
        setSuggestions(['Explain Ecosystem Divisions', 'How are project timelines structured?', 'Let\'s start a project'])
      }, 600)
    } else {
      handleSendMessage(suggestion)
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-[9999] font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="w-[360px] md:w-[400px] h-[550px] rounded-3xl glass border-white/10 shadow-2xl flex flex-col overflow-hidden mb-4 bg-melhek-navy/95"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-melhek-blue/10 flex items-center justify-center border border-melhek-blue/20">
                  <Bot className="w-5 h-5 text-melhek-blue" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white font-display tracking-wide">Melhek AI Assistant</h4>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] text-white/40 uppercase tracking-widest font-mono font-bold">Online & Ready</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full glass hover:text-melhek-blue transition-colors flex items-center justify-center border-white/5"
                aria-label="Close Assistant"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div 
                  key={msg.id}
                  className={`flex gap-3 max-w-[85%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
                >
                  {msg.sender === 'assistant' && (
                    <div className="w-7 h-7 rounded-full bg-melhek-blue/10 flex-shrink-0 flex items-center justify-center border border-melhek-blue/20 text-[10px] text-melhek-blue font-bold font-mono">
                      M
                    </div>
                  )}
                  {msg.sender === 'user' && (
                    <div className="w-7 h-7 rounded-full bg-white/5 flex-shrink-0 flex items-center justify-center border border-white/10 text-[10px] text-white/60 font-bold font-mono">
                      U
                    </div>
                  )}
                  <div className={`rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                    msg.sender === 'user' 
                      ? 'bg-gradient-to-br from-melhek-blue/20 to-melhek-steel/15 text-white border border-melhek-blue/10 rounded-tr-none'
                      : 'bg-white/5 text-white/90 border border-white/5 rounded-tl-none'
                  }`}>
                    {/* Render markdown links as clickable links */}
                    {msg.text.includes('[') && msg.text.includes('](') ? (
                      (() => {
                        const parts = msg.text.split(/(\[[^\]]+\]\([^)]+\))/g)
                        return parts.map((part, index) => {
                          const match = part.match(/\[([^\]]+)\]\(([^)]+)\)/)
                          if (match) {
                            return (
                              <a 
                                key={index} 
                                href={match[2]} 
                                className="text-melhek-blue font-bold underline hover:text-white transition-colors"
                              >
                                {match[1]}
                              </a>
                            )
                          }
                          return part
                        })
                      })()
                    ) : (
                      msg.text.split('\n').map((line, i) => (
                        <p key={i} className={i > 0 ? 'mt-1.5' : ''}>{line}</p>
                      ))
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-3 max-w-[85%]">
                  <div className="w-7 h-7 rounded-full bg-melhek-blue/10 flex-shrink-0 flex items-center justify-center border border-melhek-blue/20 text-[10px] text-melhek-blue font-bold font-mono">
                    M
                  </div>
                  <div className="rounded-2xl rounded-tl-none px-4 py-3 bg-white/5 text-white/50 border border-white/5 text-xs flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Suggestions */}
            {suggestions.length > 0 && (
              <div className="px-4 py-2 flex flex-wrap gap-2 border-t border-white/5 bg-white/[0.01]">
                {suggestions.map((suggestion, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="text-[11px] px-3 py-1.5 rounded-full bg-white/5 border border-white/5 hover:bg-melhek-blue/10 hover:border-melhek-blue/30 text-white/70 hover:text-melhek-blue transition-all"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}

            {/* Input Form */}
            <form 
              onSubmit={(e) => {
                e.preventDefault()
                handleSendMessage(inputValue)
              }}
              className="p-4 border-t border-white/5 bg-white/[0.02] flex items-center gap-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={
                  intakeState === 'waiting_name' ? 'Enter your name...' : 
                  intakeState === 'waiting_email' ? 'Enter your email...' : 
                  intakeState === 'waiting_description' ? 'Describe your project...' : 
                  'Ask about timelines, portfolio, divisions...'
                }
                className="flex-1 bg-white/5 border border-white/5 focus:border-melhek-blue focus:outline-none rounded-full px-4 py-2.5 text-xs text-white placeholder-white/30 transition-all"
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="w-9 h-9 rounded-full bg-melhek-blue text-melhek-navy flex items-center justify-center hover:bg-white transition-all disabled:opacity-30 disabled:hover:bg-melhek-blue"
                aria-label="Send Message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-[0_8px_32px_rgba(127,169,255,0.3)] transition-all ${
          isOpen 
            ? 'bg-white text-melhek-navy rotate-90' 
            : 'bg-gradient-to-br from-melhek-blue to-melhek-steel text-melhek-navy hover:shadow-[0_12px_40px_rgba(127,169,255,0.5)]'
        }`}
        aria-label="Toggle AI Assistant"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Bot className="w-6 h-6" />}
      </motion.button>
    </div>
  )
}
