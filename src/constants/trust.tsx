import { Anchor, Target, Brain, Layout, Globe, Handshake } from 'lucide-react';
import { ReactNode } from 'react';

export interface TrustReason {
  id: string;
  icon: ReactNode;
  title: string;
  desc: string;
}

export const TRUST_REASONS: TrustReason[] = [
  {
    id: "anchor",
    icon: <Anchor className="w-10 h-10" />,
    title: "Anchor Reliability",
    desc: "Like our namesake, we provide unshakeable stability. Systems built by Melhek are engineered for 99.9%+ uptime and built to withstand the demands of real enterprise environments.",
  },
  {
    id: "precision",
    icon: <Target className="w-10 h-10" />,
    title: "Precision Engineering",
    desc: "Every pixel and line of code is deliberate. We operate with the discipline of aerospace engineering applied to digital product development.",
  },
  {
    id: "ai-native",
    icon: <Brain className="w-10 h-10" />,
    title: "AI-Native Thinking",
    desc: "We don't bolt AI onto existing systems. Our platforms are designed from the ground up to leverage machine intelligence for automation, analytics, and adaptive experiences.",
  },
  {
    id: "design",
    icon: <Layout className="w-10 h-10" />,
    title: "Elite Design Standards",
    desc: "Visual quality that competes on a global stage. We measure our design work against the best in the world — Stripe, Apple, Linear — because our clients deserve nothing less.",
  },
  {
    id: "full-spectrum",
    icon: <Globe className="w-10 h-10" />,
    title: "Full-Spectrum Capability",
    desc: "From a startup's first platform to an enterprise's infrastructure overhaul — our five divisions cover every dimension of digital business technology under one roof.",
  },
  {
    id: "partnership",
    icon: <Handshake className="w-10 h-10" />,
    title: "Long-Term Partnership",
    desc: "We invest in the businesses we serve. Melhek operates as a technology partner, not a vendor — growing alongside clients as their digital needs evolve and scale.",
  },
];
