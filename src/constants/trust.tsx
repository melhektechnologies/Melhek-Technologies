import { Anchor, MessageSquare, Cpu, Zap, Layers, Handshake } from 'lucide-react';
import { ReactNode } from 'react';

export interface TrustReason {
  id: string;
  icon: ReactNode;
  title: string;
  desc: string;
}

export const TRUST_REASONS: TrustReason[] = [
  {
    id: "reliability",
    icon: <Anchor className="w-10 h-10" />,
    title: "Anchor Reliability",
    desc: "Melhek represents stability. We build zero-fragility architectures that operate with 99.99% uptime, serving as an unshakeable anchor for enterprise operations.",
  },
  {
    id: "communication",
    icon: <MessageSquare className="w-10 h-10" />,
    title: "Proactive Communication",
    desc: "We practice transparent engineering. Real-time updates, clear milestone reviews, and structured documentation ensure you are never in the dark about your system's progress.",
  },
  {
    id: "engineering",
    icon: <Cpu className="w-10 h-10" />,
    title: "Uncompromising Engineering",
    desc: "We write clean, strictly-typed code adhering to strict security audits and performance tests. Every module is built for observability and maintainability.",
  },
  {
    id: "performance",
    icon: <Zap className="w-10 h-10" />,
    title: "Sub-Second Performance",
    desc: "Speed is a core capability. We optimize assets, design efficient database queries, and leverage edge-native serving to achieve world-class execution times.",
  },
  {
    id: "scalability",
    icon: <Layers className="w-10 h-10" />,
    title: "Scalable Infrastructure",
    desc: "We design software to grow. Our systems utilize stateless layers, bounded microservices, and flexible schemas to handle traffic surges smoothly.",
  },
  {
    id: "partnership",
    icon: <Handshake className="w-10 h-10" />,
    title: "Long-Term Partnership",
    desc: "We play the long game. Melhek aligns its success with yours, providing ongoing engineering updates, security patches, and strategic growth consultations.",
  },
];
