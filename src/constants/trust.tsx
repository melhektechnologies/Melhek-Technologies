import { Anchor, Layers, Handshake } from 'lucide-react';
import { ReactNode } from 'react';

export interface TrustReason {
  id: string;
  icon: ReactNode;
  title: string;
  desc: string;
  benefit: string;
  builtOn: string[];
}

export const TRUST_REASONS: TrustReason[] = [
  {
    id: "reliability",
    icon: <Anchor className="w-10 h-10" />,
    title: "Anchor Reliability",
    benefit: "Dependable, stable solutions your business can count on day in and day out.",
    builtOn: ["Security First", "Performance Driven"],
    desc: "Melhek represents unshakeable stability. We design systems that run smoothly under heavy use and keep client data safe, so your business never goes offline."
  },
  {
    id: "scalability",
    icon: <Layers className="w-10 h-10" />,
    title: "Scalable Growth",
    benefit: "Technology systems engineered to support your future expansion.",
    builtOn: ["Scalable Architecture", "Future-Ready Systems"],
    desc: "We build layouts and database systems prepared for growth. As you open new branches or add services, our software adapts without needing to be rebuilt from scratch."
  },
  {
    id: "partnership",
    icon: <Handshake className="w-10 h-10" />,
    title: "Long-Term Partnership",
    benefit: "A dedicated technology partner that grows alongside your organization.",
    builtOn: ["Business-Focused Design", "Mobile-First Accessibility"],
    desc: "We play the long game. Melhek acts as your technical guide, keeping your systems updated, secure, and aligned with your real-world business outcomes."
  },
];
