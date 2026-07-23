'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Calendar, User, Plus, Check, Play, ShoppingCart, 
  Tag, CreditCard, Scale, FileText, CheckCircle2, 
  MapPin, ShieldAlert, Key, Dumbbell, PlayCircle, X
} from 'lucide-react'

interface SandboxDemoProps {
  slug: string
  onClose: () => void
}

export default function SandboxDemo({ slug, onClose }: SandboxDemoProps) {
  return (
    <div className="absolute inset-0 bg-[#060b16] z-40 flex flex-col text-left">
      {/* Sandbox Header */}
      <div className="h-10 bg-[#0d1527] border-b border-white/10 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-melhek-blue animate-pulse" />
          <span className="text-[10px] font-mono font-bold text-melhek-blue uppercase tracking-widest">
            Interactive Test-Drive // {slug}
          </span>
        </div>
        <button
          onClick={onClose}
          className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-[9px] font-mono text-white/50 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
        >
          Exit Demo
        </button>
      </div>

      {/* Demo Viewport Wrapper */}
      <div className="flex-1 p-6 overflow-y-auto relative bg-[#040812]">
        {(() => {
          switch (slug) {
            case 'healthcare-booking':
              return <HappyOpticsDemo />
            case 'pharmacy-management':
              return <PharmacyManagementDemo />
            case 'belete-tasew-law':
              return <LawFirmDemo />
            case 'gym-management':
              return <GymManagementDemo />
            case 'car-sales-showroom':
              return <CarShowroomDemo />
            default:
              return (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                  <PlayCircle className="w-12 h-12 text-white/25" />
                  <p className="text-xs text-white/40 font-mono">
                    Simulation interface in development for this category profile.
                  </p>
                </div>
              )
          }
        })()}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   1. HAPPY OPTICS CLINIC SCHEDULER DEMO
   ───────────────────────────────────────────────────────────────────────────── */
function HappyOpticsDemo() {
  const [appointments, setAppointments] = useState([
    { id: 1, patient: 'Abebe Tadesse', doctor: 'Dr. Abraham H.', time: '09:00 AM', type: 'Eye Exam' },
    { id: 2, patient: 'Marta Hailu', doctor: 'Dr. Helen K.', time: '11:30 AM', type: 'Lens Fitting' }
  ])
  const [patientName, setPatientName] = useState('')
  const [selectedDoctor, setSelectedDoctor] = useState('Dr. Abraham H.')
  const [selectedTime, setSelectedTime] = useState('02:00 PM')
  const [selectedType, setSelectedType] = useState('Eye Exam')

  const handleAddBooking = (e: React.FormEvent) => {
    e.preventDefault()
    if (!patientName.trim()) return
    const newBooking = {
      id: Date.now(),
      patient: patientName,
      doctor: selectedDoctor,
      time: selectedTime,
      type: selectedType
    }
    setAppointments([...appointments, newBooking])
    setPatientName('')
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-full text-white">
      {/* Form Left */}
      <div className="md:col-span-5 bg-white/[0.02] border border-white/5 p-5 rounded-2xl flex flex-col justify-between">
        <form onSubmit={handleAddBooking} className="space-y-4">
          <h4 className="text-xs uppercase tracking-wider font-mono text-melhek-blue font-bold">
            Clinic Patient Registrar
          </h4>
          
          <div className="space-y-1">
            <label className="text-[9px] font-mono text-white/40 uppercase">Patient Full Name</label>
            <div className="relative">
              <input 
                type="text"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                placeholder="Abebe Kebede"
                className="w-full bg-white/5 border border-white/10 focus:border-melhek-blue focus:outline-none rounded-xl px-4 py-2.5 text-xs text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[9px] font-mono text-white/40 uppercase">Assigned Opthalmologist</label>
              <select 
                value={selectedDoctor}
                onChange={(e) => setSelectedDoctor(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white/80 focus:outline-none"
              >
                <option value="Dr. Abraham H.">Dr. Abraham H.</option>
                <option value="Dr. Helen K.">Dr. Helen K.</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[9px] font-mono text-white/40 uppercase">Available Slots</label>
              <select 
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white/80 focus:outline-none"
              >
                <option value="09:00 AM">09:00 AM</option>
                <option value="11:30 AM">11:30 AM</option>
                <option value="02:00 PM">02:00 PM</option>
                <option value="04:30 PM">04:30 PM</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[9px] font-mono text-white/40 uppercase">Consultation Profile</label>
            <div className="grid grid-cols-2 gap-2">
              {['Eye Exam', 'Lens Fitting'].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setSelectedType(type)}
                  className={`py-2 px-3 border rounded-xl text-[10px] font-mono transition-all cursor-pointer ${
                    selectedType === type ? 'bg-melhek-blue border-melhek-blue text-melhek-navy font-bold' : 'bg-white/5 border-white/10 text-white/50 hover:border-white/20'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full btn-primary justify-center text-[10px] py-3 uppercase tracking-widest font-mono"
          >
            Add Appointment <Plus className="w-3.5 h-3.5 ml-1" />
          </button>
        </form>
      </div>

      {/* Live Log Right */}
      <div className="md:col-span-7 bg-white/[0.01] border border-white/5 rounded-2xl p-5 flex flex-col overflow-hidden">
        <h4 className="text-xs uppercase tracking-wider font-mono text-white/40 font-bold mb-4 pb-2 border-b border-white/5 flex justify-between items-center">
          Active Patient Queue
          <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-normal">
            {appointments.length} Active Slots
          </span>
        </h4>
        <div className="flex-1 space-y-2 overflow-y-auto max-h-[200px] pr-1 scrollbar-thin">
          <AnimatePresence initial={false}>
            {appointments.map((appt) => (
              <motion.div
                key={appt.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="p-3 bg-white/5 border border-white/5 rounded-xl flex items-center justify-between hover:border-white/10 transition-colors"
              >
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <User className="w-3 h-3 text-melhek-blue" />
                    {appt.patient}
                  </div>
                  <div className="text-[10px] text-white/40 mt-0.5">
                    Assigned: <span className="text-white/60">{appt.doctor}</span> | Profile: <span className="text-white/60">{appt.type}</span>
                  </div>
                </div>
                <div className="text-right flex items-center gap-2">
                  <div className="text-[10px] font-mono px-2.5 py-1 bg-melhek-blue/10 border border-melhek-blue/20 text-melhek-blue rounded-lg font-bold">
                    {appt.time}
                  </div>
                  <button
                    onClick={() => setAppointments(appointments.filter(a => a.id !== appt.id))}
                    className="text-white/20 hover:text-red-400 p-1 transition-colors"
                    title="Remove"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   2. PHARMACY MANAGEMENT POS CASHIER CHECKOUT DEMO
   ───────────────────────────────────────────────────────────────────────────── */
interface CartItem {
  id: string
  name: string
  price: number
  qty: number
}

function PharmacyManagementDemo() {
  const MEDICATIONS = [
    { id: 'm1', name: 'Amoxicillin 500mg', price: 140, type: 'Antibiotic' },
    { id: 'm2', name: 'Paracetamol 500mg', price: 20, type: 'Analgesic' },
    { id: 'm3', name: 'Loratadine 10mg', price: 85, type: 'Antihistamine' },
    { id: 'm4', name: 'Metformin 850mg', price: 110, type: 'Antidiabetic' }
  ]

  const [cart, setCart] = useState<CartItem[]>([])
  const [salesComplete, setSalesComplete] = useState(false)
  const [printLogs, setPrintLogs] = useState<string[]>([])

  const addToCart = (med: typeof MEDICATIONS[0]) => {
    setSalesComplete(false)
    const exists = cart.find(item => item.id === med.id)
    if (exists) {
      setCart(cart.map(item => item.id === med.id ? { ...item, qty: item.qty + 1 } : item))
    } else {
      setCart([...cart, { id: med.id, name: med.name, price: med.price, qty: 1 }])
    }
  }

  const subtotal = cart.reduce((acc, curr) => acc + (curr.price * curr.qty), 0)

  const handleCheckout = () => {
    if (cart.length === 0) return
    setSalesComplete(true)
    setPrintLogs([
      `--- INVOICE LOG #${Math.floor(Math.random() * 90000 + 10000)} ---`,
      `Date: ${new Date().toLocaleTimeString()}`,
      `Store Node: Branch 01 (Addis Ababa)`,
      `Items Purchased:`,
      ...cart.map(item => `  - ${item.name} x${item.qty} (${item.price * item.qty} ETB)`),
      `Total Paid: ${subtotal} ETB`,
      `Payment Node: Mobile Wallet approved`,
      `--- INVENTORY SYNCED AT 0.00ms ---`
    ])
    setCart([])
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-full text-white">
      {/* Med List Left */}
      <div className="md:col-span-5 space-y-4">
        <h4 className="text-xs uppercase tracking-wider font-mono text-melhek-blue font-bold">
          Sales Register Products
        </h4>
        <div className="grid grid-cols-1 gap-2.5">
          {MEDICATIONS.map(med => (
            <button
              key={med.id}
              onClick={() => addToCart(med)}
              className="p-3 bg-white/5 border border-white/5 rounded-xl flex items-center justify-between hover:border-melhek-blue/30 text-left hover:bg-melhek-blue/[0.02] cursor-pointer group transition-all"
            >
              <div>
                <span className="text-[9px] font-mono text-white/40 uppercase tracking-wider block mb-0.5">{med.type}</span>
                <span className="text-xs font-bold text-white group-hover:text-melhek-blue transition-colors">{med.name}</span>
              </div>
              <span className="text-xs font-mono font-bold text-melhek-blue">{med.price} ETB</span>
            </button>
          ))}
        </div>
      </div>

      {/* POS Cart Right */}
      <div className="md:col-span-7 bg-white/[0.01] border border-white/5 rounded-2xl p-5 flex flex-col justify-between min-h-[220px]">
        {salesComplete ? (
          <div className="flex-1 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold mb-3">
                <CheckCircle2 className="w-4 h-4" /> Transaction Processed
              </div>
              <pre className="text-[10px] font-mono bg-[#02050d] p-4 border border-white/5 rounded-xl leading-relaxed text-emerald-400/90 max-h-[140px] overflow-y-auto">
                {printLogs.join('\n')}
              </pre>
            </div>
            <button
              onClick={() => setSalesComplete(false)}
              className="w-full py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-mono uppercase tracking-wider hover:bg-white/10 transition-all cursor-pointer mt-4"
            >
              New Sale Screen
            </button>
          </div>
        ) : (
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h4 className="text-xs uppercase tracking-wider font-mono text-white/40 font-bold mb-4 flex items-center justify-between pb-2 border-b border-white/5">
                Cart Inventory
                <ShoppingCart className="w-4 h-4 text-melhek-blue" />
              </h4>

              {cart.length === 0 ? (
                <p className="text-[11px] text-white/30 text-center py-6 font-light">
                  Tap medications on the left to scan them.
                </p>
              ) : (
                <div className="space-y-2 max-h-[120px] overflow-y-auto pr-1">
                  {cart.map(item => (
                    <div key={item.id} className="flex justify-between items-center text-xs">
                      <span className="text-white/80 font-light">{item.name} <span className="text-white/30 font-mono">x{item.qty}</span></span>
                      <span className="text-white font-bold">{item.price * item.qty} ETB</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t border-white/5 pt-4 mt-4 space-y-4">
              <div className="flex justify-between items-baseline">
                <span className="text-xs text-white/40 uppercase font-mono">Total Cart Amount:</span>
                <span className="text-xl font-display font-extrabold text-white">{subtotal} ETB</span>
              </div>
              <button
                onClick={handleCheckout}
                disabled={cart.length === 0}
                className="w-full btn-primary justify-center text-[10px] py-3 uppercase tracking-widest font-mono disabled:opacity-30 disabled:pointer-events-none"
              >
                Process Checkout & Print Receipt <CreditCard className="w-3.5 h-3.5 ml-1" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   3. LAW FIRM WEBSITE CONSULTATION WIZARD DEMO
   ───────────────────────────────────────────────────────────────────────────── */
function LawFirmDemo() {
  const [step, setStep] = useState(1)
  const [caseType, setCaseType] = useState('Corporate Contract Audit')
  const [details, setDetails] = useState('')
  const [report, setReport] = useState<string[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setReport([
      `--- INTAKE CONSULTATION BRIEF ---`,
      `Legal Division: Corporate & Business Law`,
      `Category Selected: ${caseType}`,
      `Project Brief: "${details || 'No details provided.'}"`,
      `Outcome Blueprint: We will review documents, flag discrepancies, and draft an audit report.`,
      `Estimated Hours: 6 – 12 hours`,
      `Estimated SOW Consultation Cost: Flat Quoted`
    ])
    setStep(2)
  }

  return (
    <div className="max-w-md mx-auto bg-white/[0.01] border border-white/5 rounded-2xl p-5 text-white">
      {step === 1 ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center gap-2 text-melhek-blue mb-1">
            <Scale className="w-4 h-4" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider">Case Intake Registry</span>
          </div>
          <h4 className="text-sm font-syne font-bold">Select Consultation Sector</h4>
          
          <div className="space-y-2">
            {['Corporate Contract Audit', 'Tax Advisory', 'Intellectual Property Protection'].map(t => (
              <button
                key={t}
                type="button"
                onClick={() => setCaseType(t)}
                className={`w-full py-2.5 px-4 text-left border rounded-xl text-[11px] font-mono transition-all flex justify-between items-center cursor-pointer ${
                  caseType === t ? 'border-melhek-blue bg-melhek-blue/5 text-white font-bold' : 'border-white/5 bg-white/5 text-white/50 hover:border-white/10'
                }`}
              >
                {t}
                {caseType === t && <Check className="w-3.5 h-3.5 text-melhek-blue" />}
              </button>
            ))}
          </div>

          <div className="space-y-1">
            <label className="text-[9px] font-mono text-white/40 uppercase">Provide Brief Operational Scope</label>
            <textarea
              rows={2}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Explain the background of the contracts or intellectual assets..."
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs focus:border-melhek-blue focus:outline-none resize-none"
            />
          </div>

          <button 
            type="submit"
            className="w-full btn-primary justify-center text-[10px] py-3 uppercase tracking-widest font-mono"
          >
            Generate Case Blueprint <FileText className="w-3.5 h-3.5 ml-1" />
          </button>
        </form>
      ) : (
        <div className="space-y-4 text-center">
          <div className="w-12 h-12 bg-melhek-blue/10 rounded-full flex items-center justify-center border border-melhek-blue/20 mx-auto">
            <CheckCircle2 className="w-6 h-6 text-melhek-blue" />
          </div>
          <h4 className="text-xs uppercase tracking-wider font-mono text-white/40">Technical Brief Generated</h4>
          <pre className="text-[10px] font-mono text-emerald-400 bg-black/40 border border-white/5 p-4 rounded-xl text-left leading-relaxed">
            {report.join('\n')}
          </pre>
          <button
            onClick={() => { setStep(1); setDetails(''); }}
            className="w-full py-2.5 border border-white/10 rounded-xl text-[10px] font-mono uppercase tracking-wider hover:bg-white/5 transition-all cursor-pointer"
          >
            Restart Inquiry
          </button>
        </div>
      )}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   4. GYM DOOR CHECK-IN TURNSTILE GATE SIMULATOR DEMO
   ───────────────────────────────────────────────────────────────────────────── */
function GymManagementDemo() {
  const [gateStatus, setGateStatus] = useState<'Locked' | 'Opened' | 'Alarm'>('Locked')
  const [statusLogs, setStatusLogs] = useState<string[]>([
    '[SYSTEM] Local turnstile node: ONLINE.',
    '[SYSTEM] Awaiting card scan transceivers...'
  ])

  const MEMBERS = [
    { name: 'Marta Hailu', tier: 'Premium Tier', status: 'Active', color: 'text-emerald-400' },
    { name: 'Davit Tsegaye', tier: 'Standard Tier', status: 'Card Expired', color: 'text-rose-400' },
    { name: 'Samuel Kassahun', tier: 'Basic Tier', status: 'Unpaid Balance', color: 'text-yellow-400' }
  ]

  const triggerScan = (member: typeof MEMBERS[0]) => {
    setGateStatus('Locked')
    const timestamp = new Date().toLocaleTimeString()
    
    if (member.status === 'Active') {
      setGateStatus('Opened')
      setStatusLogs([
        ...statusLogs,
        `[${timestamp}] SCAN: ${member.name} (${member.tier})`,
        `[${timestamp}] RESULT: ACCESS APPROVED. Gate opened.`,
        `[${timestamp}] ---`
      ])
      // Relock gate after 3 seconds
      setTimeout(() => setGateStatus('Locked'), 3000)
    } else {
      setGateStatus('Alarm')
      setStatusLogs([
        ...statusLogs,
        `[${timestamp}] SCAN: ${member.name} (${member.tier})`,
        `[${timestamp}] RESULT: ACCESS DENIED (${member.status.toUpperCase()}). Gate remains locked.`,
        `[${timestamp}] WARNING: Audit logged.`,
        `[${timestamp}] ---`
      ])
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-full text-white">
      {/* Keycards Left */}
      <div className="md:col-span-5 space-y-4">
        <h4 className="text-xs uppercase tracking-wider font-mono text-melhek-blue font-bold">
          Mock Gym RFID Keycards
        </h4>
        <div className="space-y-2">
          {MEMBERS.map(m => (
            <button
              key={m.name}
              onClick={() => triggerScan(m)}
              className="w-full p-3 bg-white/5 border border-white/5 hover:border-white/10 rounded-xl text-left flex items-center justify-between cursor-pointer hover:bg-white/[0.01] transition-all group"
            >
              <div>
                <span className="text-[10px] font-mono text-white/40 block">{m.tier}</span>
                <span className="text-xs font-bold text-white group-hover:text-melhek-blue transition-colors">{m.name}</span>
              </div>
              <span className={`text-[10px] font-mono uppercase font-bold ${m.color}`}>
                {m.status}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Turnstile View Right */}
      <div className="md:col-span-7 bg-[#02050c] border border-white/5 rounded-2xl p-5 flex flex-col justify-between min-h-[220px]">
        <div>
          <h4 className="text-xs uppercase tracking-wider font-mono text-white/40 font-bold mb-4 flex items-center justify-between pb-2 border-b border-white/5">
            Turnstile Gate Node Status
            <Dumbbell className="w-4 h-4 text-melhek-blue" />
          </h4>

          {/* Gate status screen */}
          <div className="flex items-center justify-center p-4 bg-black/40 border border-white/5 rounded-xl mb-4">
            <div className="text-center">
              <span className="text-[9px] uppercase tracking-widest font-mono text-white/30 block mb-1">Gate physical state</span>
              <span className={`text-xl font-display font-extrabold uppercase ${
                gateStatus === 'Opened' ? 'text-emerald-400' : gateStatus === 'Alarm' ? 'text-rose-500 animate-pulse' : 'text-white/60'
              }`}>
                {gateStatus}
              </span>
            </div>
          </div>
        </div>

        {/* Live system logs */}
        <div className="flex-1 space-y-1">
          <span className="text-[9px] uppercase font-mono text-white/30 block mb-1.5">Gate Controller Console Log:</span>
          <pre className="text-[9px] font-mono text-white/50 leading-relaxed max-h-[80px] overflow-y-auto bg-black/50 p-3 rounded-lg border border-white/5 scrollbar-thin">
            {statusLogs.slice(-5).join('\n')}
          </pre>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   5. CAR SHOWROOM IMPORT VEHICLES ESTIMATOR DEMO
   ───────────────────────────────────────────────────────────────────────────── */
function CarShowroomDemo() {
  const CARS = [
    { name: 'Toyota RAV4 Hybrid 2024', basePrice: '$32,000 USD', fuel: 'Hybrid', portDelay: '12 days' },
    { name: 'Hyundai Elantra EV 2024', basePrice: '$34,500 USD', fuel: 'Electric', portDelay: '14 days' },
    { name: 'Suzuki Dzire GLX 2023', basePrice: '$16,000 USD', fuel: 'Gasoline', portDelay: '10 days' }
  ]

  const [selectedCar, setSelectedCar] = useState(CARS[0])
  const [deliveryStep, setDeliveryStep] = useState(2)

  const STEPS = [
    { label: 'Djibouti Port', desc: 'Container unloaded & customs clearance node initiated.' },
    { label: 'Galafi Border', desc: 'Freight manifest validation & road transport sync.' },
    { label: 'Modjo Dry Port', desc: 'Central warehousing, cargo decanting & final assessment.' },
    { label: 'Addis Showroom', desc: 'Vehicle diagnostic check and keys handed over.' }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-full text-white">
      {/* Car Selection Left */}
      <div className="md:col-span-4 space-y-4">
        <h4 className="text-xs uppercase tracking-wider font-mono text-melhek-blue font-bold">
          Car Catalog Registry
        </h4>
        <div className="space-y-2">
          {CARS.map(car => (
            <button
              key={car.name}
              onClick={() => { setSelectedCar(car); setDeliveryStep(Math.floor(Math.random() * 3 + 1)); }}
              className={`w-full p-3 border text-left rounded-xl flex flex-col justify-between cursor-pointer transition-all hover:bg-white/[0.01] ${
                selectedCar.name === car.name ? 'border-melhek-blue bg-melhek-blue/5' : 'border-white/5 bg-white/5'
              }`}
            >
              <span className="text-[10px] font-mono text-white/40 block mb-0.5">{car.fuel} Engine</span>
              <span className="text-xs font-bold text-white leading-tight">{car.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Shipment Tracker Right */}
      <div className="md:col-span-8 bg-[#02050c] border border-white/5 rounded-2xl p-5 flex flex-col justify-between min-h-[220px]">
        <div>
          <h4 className="text-xs uppercase tracking-wider font-mono text-white/40 font-bold mb-4 flex items-center justify-between pb-2 border-b border-white/5">
            Active Import Delivery Tracker
            <MapPin className="w-4 h-4 text-melhek-blue animate-bounce" />
          </h4>

          {/* Shipment details */}
          <div className="grid grid-cols-3 gap-3 text-[10px] mb-6 font-mono border-b border-white/5 pb-4">
            <div>
              <span className="text-white/30 block">Base FOB:</span>
              <span className="text-white font-bold">{selectedCar.basePrice}</span>
            </div>
            <div>
              <span className="text-white/30 block">Port Transit:</span>
              <span className="text-white font-bold">{selectedCar.portDelay}</span>
            </div>
            <div>
              <span className="text-white/30 block">Active Status:</span>
              <span className="text-emerald-400 font-bold">In Route</span>
            </div>
          </div>
        </div>

        {/* Vertical shipping timeline */}
        <div className="flex-1 space-y-4">
          {STEPS.map((s, idx) => {
            const isCompleted = idx < deliveryStep
            const isActive = idx === deliveryStep

            return (
              <div key={s.label} className="flex gap-4 items-start relative select-none">
                {idx < STEPS.length - 1 && (
                  <div className={`absolute left-[7px] top-[14px] bottom-[-22px] w-[2px] ${
                    idx < deliveryStep - 1 ? 'bg-melhek-blue' : 'bg-white/5'
                  }`} />
                )}
                
                <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center mt-1 z-10 shrink-0 ${
                  isCompleted ? 'bg-melhek-blue border-melhek-blue text-melhek-navy' : isActive ? 'bg-melhek-navy border-melhek-blue text-melhek-blue animate-pulse' : 'bg-transparent border-white/10'
                }`}>
                  {isCompleted && <Check className="w-2.5 h-2.5" />}
                </div>

                <div>
                  <h5 className={`text-xs font-bold leading-none ${isCompleted || isActive ? 'text-white' : 'text-white/30'}`}>
                    {s.label}
                  </h5>
                  {(isActive || (idx === STEPS.length - 1 && deliveryStep === STEPS.length - 1)) && (
                    <p className="text-[10px] text-white/50 mt-1 max-w-md leading-relaxed font-light">
                      {s.desc}
                    </p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
