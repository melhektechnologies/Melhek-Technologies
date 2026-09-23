'use client';

import { ClientDetails, IndustryType, BusinessSize, LeadSource, PrimaryBusinessValue } from '@/lib/pricing/types';
import { User, Building, MapPin, Phone, Mail, Award, Target, FileText } from 'lucide-react';

interface StepClientProps {
  client: ClientDetails;
  onChange: (updated: ClientDetails) => void;
}

const INDUSTRIES: IndustryType[] = [
  'Hotel',
  'Restaurant',
  'Café',
  'Retail',
  'Supermarket',
  'Pharmacy',
  'Gym',
  'Law Firm',
  'School',
  'Clinic',
  'NGO',
  'Religious Organization',
  'Real Estate',
  'Automotive',
  'Professional Services',
  'Startup',
  'Other'
];

const BUSINESS_SIZES: BusinessSize[] = [
  'Individual / Micro',
  'Small Business',
  'Medium Business',
  'Large Business',
  'Enterprise'
];

const LEAD_SOURCES: LeadSource[] = [
  'Direct Outreach',
  'Referral',
  'Website',
  'Social Media',
  'Event / Exhibition',
  'Existing Client',
  'Partner',
  'Other'
];

const BUSINESS_VALUES: { value: PrimaryBusinessValue; desc: string }[] = [
  { value: 'Operational Efficiency', desc: 'Reduce manual work & save employee hours' },
  { value: 'Revenue Growth', desc: 'Directly increase sales volume & lead conversion' },
  { value: 'Cost Reduction', desc: 'Eliminate financial leakage & overhead waste' },
  { value: 'Customer Experience', desc: 'Elevate client satisfaction & booking retention' },
  { value: 'Management Visibility', desc: 'Real-time financial & operational analytics' },
  { value: 'Automation', desc: 'Auto-pilot inventory, receipts & workflows' },
  { value: 'Digital Presence', desc: 'Establish brand authority & online discovery' },
  { value: 'Risk Reduction', desc: 'Audit trails, role security & compliance' },
  { value: 'Scalability', desc: 'Multi-branch & multi-unit expansion readiness' }
];

export default function StepClient({ client, onChange }: StepClientProps) {
  const handleChange = (field: keyof ClientDetails, value: any) => {
    onChange({
      ...client,
      [field]: value
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-syne font-bold text-white flex items-center gap-2">
          <User className="w-5 h-5 text-melhek-blue" />
          Step 01 — Client Profile & Value Intelligence
        </h3>
        <p className="text-xs text-white/50 mt-1">
          Capture client details and primary commercial drivers. This grounds pricing around target business outcomes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-mono text-white/70 mb-1.5 flex items-center gap-1.5">
            <Building className="w-3.5 h-3.5 text-melhek-blue" /> Business / Organization Name *
          </label>
          <input
            type="text"
            placeholder="e.g. Radisson Blu Addis / Queen Supermarket"
            value={client.businessName}
            onChange={(e) => handleChange('businessName', e.target.value)}
            className="w-full bg-navy/90 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:border-melhek-blue outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-mono text-white/70 mb-1.5 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-melhek-blue" /> Contact Person / Stakeholder *
          </label>
          <input
            type="text"
            placeholder="e.g. Ato Dawit Kebede (General Manager)"
            value={client.contactPerson}
            onChange={(e) => handleChange('contactPerson', e.target.value)}
            className="w-full bg-navy/90 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:border-melhek-blue outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-mono text-white/70 mb-1.5">
            Industry / Sector *
          </label>
          <select
            value={client.industry}
            onChange={(e) => handleChange('industry', e.target.value as IndustryType)}
            className="w-full bg-navy/90 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:border-melhek-blue outline-none transition-all"
          >
            {INDUSTRIES.map((ind) => (
              <option key={ind} value={ind} className="bg-melhek-navy text-white">
                {ind}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-mono text-white/70 mb-1.5">
            Business Size Scale *
          </label>
          <select
            value={client.businessSize}
            onChange={(e) => handleChange('businessSize', e.target.value as BusinessSize)}
            className="w-full bg-navy/90 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:border-melhek-blue outline-none transition-all"
          >
            {BUSINESS_SIZES.map((size) => (
              <option key={size} value={size} className="bg-melhek-navy text-white">
                {size}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-mono text-white/70 mb-1.5 flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-melhek-blue" /> Email Address
          </label>
          <input
            type="email"
            placeholder="contact@business.et"
            value={client.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className="w-full bg-navy/90 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:border-melhek-blue outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-mono text-white/70 mb-1.5 flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-melhek-blue" /> Phone Number
          </label>
          <input
            type="text"
            placeholder="+251 911 000 000"
            value={client.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            className="w-full bg-navy/90 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:border-melhek-blue outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-mono text-white/70 mb-1.5 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-melhek-blue" /> Physical Location / City
          </label>
          <input
            type="text"
            placeholder="Bole, Addis Ababa, Ethiopia"
            value={client.location}
            onChange={(e) => handleChange('location', e.target.value)}
            className="w-full bg-navy/90 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:border-melhek-blue outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-mono text-white/70 mb-1.5 flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-melhek-blue" /> Lead Source Channel
          </label>
          <select
            value={client.leadSource}
            onChange={(e) => handleChange('leadSource', e.target.value as LeadSource)}
            className="w-full bg-navy/90 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:border-melhek-blue outline-none transition-all"
          >
            {LEAD_SOURCES.map((src) => (
              <option key={src} value={src} className="bg-melhek-navy text-white">
                {src}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Strategic Business Value Selection */}
      <div className="pt-2 border-t border-white/5">
        <label className="block text-xs font-mono font-bold text-melhek-blue uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <Target className="w-4 h-4" /> Primary Business Value Driver (Strategic Framing)
        </label>
        <p className="text-[11px] text-white/40 mb-3">
          Select what this software system primarily achieves for the business. This anchors the proposal around ROI rather than lines of code.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
          {BUSINESS_VALUES.map((item) => {
            const isSelected = client.primaryValue === item.value;
            return (
              <button
                key={item.value}
                type="button"
                onClick={() => handleChange('primaryValue', item.value)}
                className={`p-3 rounded-xl text-left border transition-all ${
                  isSelected
                    ? 'bg-melhek-blue/15 border-melhek-blue text-white shadow-[0_0_15px_rgba(127,169,255,0.2)]'
                    : 'bg-navy/70 border-white/10 text-white/70 hover:border-white/25 hover:text-white'
                }`}
              >
                <div className="text-xs font-bold font-syne">{item.value}</div>
                <div className="text-[10px] text-white/40 mt-0.5 line-clamp-1">{item.desc}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Internal Notes */}
      <div>
        <label className="block text-xs font-mono text-white/70 mb-1.5 flex items-center gap-1.5">
          <FileText className="w-3.5 h-3.5 text-melhek-blue" /> Internal Discovery & Negotiation Notes (Confidential)
        </label>
        <textarea
          rows={3}
          placeholder="Client budget constraints, decision-making timeline, special owner requests, legacy software context..."
          value={client.notes}
          onChange={(e) => handleChange('notes', e.target.value)}
          className="w-full bg-navy/90 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:border-melhek-blue outline-none transition-all"
        />
      </div>
    </div>
  );
}
