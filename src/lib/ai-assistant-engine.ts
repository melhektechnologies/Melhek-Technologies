// Melhek Technologies AI Assistant - Client-Side NLP Knowledge Engine

export interface AiResponse {
  text: string;
  suggestions?: string[];
  intent?: "general" | "pricing" | "timeline" | "divisions" | "projects" | "contact" | "lead_start";
}

const KNOWLEDGE_BASE = {
  about: {
    keywords: ["about", "who are you", "what is melhek", "meaning of", "anchor", "origin", "philosophy", "story", "ethiopia", "addis"],
    response: "Melhek Technologies is Addis Ababa's premium engineering partner. 'Melhek' (meaning 'Anchor' in Ge'ez/Amharic) represents our core philosophy: serving as a dependable, stable digital anchor for businesses navigating technological complexity. We don't just write code; we design robust digital infrastructure that scales. Our leadership and engineering teams are focused on elevating Ethiopian business standards.",
    suggestions: ["Explain Ecosystem Divisions", "Tell me about your portfolio", "How much do services cost?"]
  },
  divisions: {
    keywords: ["division", "ecosystem", "service", "what do you do", "digital", "hospitality", "business systems", "ai labs", "secure", "infrastructure"],
    response: "Melhek Technologies operates through six specialized divisions:\n\n" +
      "1. **Melhek Digital**: High-performance corporate websites and customer portals.\n" +
      "2. **Melhek Hospitality**: End-to-end hotel room booking engines, POS ordering, and kitchen coordinators.\n" +
      "3. **Melhek Business Systems**: Inventory management, cashier screens, billing, and multi-branch database sync.\n" +
      "4. **Melhek AI Labs**: Automation of administrative tasks, document processing, and business analytics.\n" +
      "5. **Melhek Secure** (Future): Enterprise security auditing and private database encryption.\n" +
      "6. **Melhek Infrastructure** (Future): Local Wi-Fi networking, cabling, and backup power grids.",
    suggestions: ["Tell me about your portfolio", "Explain Hospitality", "How long does a website take?"]
  },
  pricing: {
    keywords: ["price", "cost", "how much", "rate", "fee", "budget", "pricing", "cheap", "expensive", "payment", "etb", "birr"],
    response: "At Melhek Technologies, we align project investments with custom operational value rather than flat packages. Every solution is tailored to your workflow and requirements.\n\n" +
      "Indicative Investment Ranges (in ETB):\n" +
      "• **Business Websites**: 35,000 – 120,000 ETB\n" +
      "• **Professional Websites**: 60,000 – 300,000 ETB\n" +
      "• **Digital Menu Systems**: 15,000 – 150,000 ETB\n" +
      "• **Business Management Systems**: 100,000 – 800,000 ETB\n" +
      "• **Hospitality & AI Systems**: Custom Quoted\n\n" +
      "You can design an estimate using our **Interactive Estimator** tool on our Pricing page.",
    suggestions: ["Open Project Estimator", "How long does a project take?", "Let's start a project"]
  },
  timeline: {
    keywords: ["time", "duration", "how long", "weeks", "months", "schedule", "deadline", "timeline", "delivery"],
    response: "Project timelines depend on the scale of integration required:\n\n" +
      "• **Business Websites**: 2 – 6 Weeks\n" +
      "• **Professional Platforms**: 4 – 12 Weeks\n" +
      "• **Business Systems**: 6 – 16 Weeks\n" +
      "• **Enterprise Solutions**: Custom Timeline\n\n" +
      "Each engagement begins with a complete Architecture Blueprint phase to map out all requirements before coding.",
    suggestions: ["Explain your process", "How much do systems cost?", "Let's start a project"]
  },
  process: {
    keywords: ["process", "methodology", "how do you work", "phases", "step", "next", "blueprint", "audit", "security"],
    response: "We structure engagements into three distinct phases to ensure perfect delivery:\n\n" +
      "1. **Phase 1: Blueprint & Architecture (Weeks 1-2)**: We design the exact database models, page wireframes, and API structures before writing a single line of code.\n" +
      "2. **Phase 2: Core Engineering & Sync (Weeks 3-8)**: Our developers implement the database, UI, and custom software integrations.\n" +
      "3. **Phase 3: Security & Stability (Weeks 8+)**: We perform rigorous penetration testing, run user-acceptance checks, and launch your system.",
    suggestions: ["How long does it take?", "Who are you?", "Let's start a project"]
  },
  portfolio: {
    keywords: ["portfolio", "project", "work", "past", "track record", "build", "client", "case study", "showcase", "experience"],
    response: "Our engineering portfolio spans several successful business systems built for Ethiopian enterprises, including:\n\n" +
      "• **Happy Optics**: A unified patient record scheduler and eye prescription database.\n" +
      "• **Amen Car Sales**: A premium digital import showroom and delivery tracker.\n" +
      "• **Luxury Hotel Management**: Operations scheduler and check-in calendar.\n" +
      "• **Belete Tasew Law Firm**: Clean, authoritative digital presence for legal client acquisition.\n" +
      "• **Pharmacy Management System**: High-volume sales checkout, barcode scan, and inventory alerts dashboard.\n\n" +
      "Visit our Portfolio page for full sector breakdowns and outcomes.",
    suggestions: ["Tell me about Happy Optics", "Explain Hospitality", "How much does a project cost?"]
  },
  hospitalityDetail: {
    keywords: ["hospitality", "hotel", "restaurant", "cafe", "pos", "booking", "menu", "order", "kitchen"],
    response: "Our **Melhek Hospitality** division is specifically tailored for Ethiopian lodging and dining venues. We build direct reservation systems to bypass booking agent commissions, room managers to coordinate check-ins, and digital order-routing systems to connect restaurant dining tables directly to kitchen screens.",
    suggestions: ["Tell me about your portfolio", "How long does a hotel portal take?", "How much does a project cost?"]
  },
  businessSystemsDetail: {
    keywords: ["business system", "retail", "supermarket", "pharmacy", "gym", "inventory", "stock", "sales", "billing", "barcode"],
    response: "Our **Melhek Business Systems** division builds internal management tools. We replace slow spreadsheets with interactive dashboards for sales logging, barcode scanning checkout lanes, real-time inventory count alerts, and multi-branch data synchronization.",
    suggestions: ["Tell me about Pharmacy Management", "Explain AI Labs", "Let's start a project"]
  },
  aiDetail: {
    keywords: ["ai labs", "artificial intelligence", "automation", "predictive", "summary", "analytics", "database search"],
    response: "Our **Melhek AI Labs** division designs smart operations software. We build systems that automate high-volume data-entry, extract summaries from unstructured PDF libraries, and analyze transaction history to help executives find operational waste.",
    suggestions: ["Explain Ecosystem Divisions", "Can we schedule a call?", "How much does a project cost?"]
  },
  contact: {
    keywords: ["contact", "email", "phone", "address", "office", "location", "hire", "meet", "schedule", "call", "start", "quote", "proposal"],
    response: "Let's build your system! You can start a project by filling out our **Contact Intake Form**, calculating an estimate on our **Project Estimator**, or emailing our engineering desk at `engineering@melhek.tech`.\n\nWould you like to start qualifying your project right here? Tell me: what kind of project are you planning?",
    suggestions: ["Let's start a project", "Open Project Estimator", "Where is your office?"]
  },
  location: {
    keywords: ["office", "location", "addis ababa", "where", "ethiopia", "physical", "address"],
    response: "Our physical operations are centered in Addis Ababa, Ethiopia. We serve clients throughout East Africa and provide remote delivery to international partners. Meetings can be scheduled at our headquarters, your corporate office, or online.",
    suggestions: ["Can we schedule a call?", "Who are you?", "Let's start a project"]
  },
  leadStart: {
    keywords: ["start a project", "get a quote", "hire you", "build my project", "qualify", "intake"],
    response: "I'd be glad to qualify your project inquiry! Let's get started. First: what is your name?",
    suggestions: ["Cancel Inquiry"]
  }
};

const SPECIFIC_PROJECTS = {
  optics: {
    keywords: ["happy optics", "optics", "eye", "clinic"],
    response: "**Happy Optics Clinic Scheduler**: A client-side register and patient file database built for modern clinics. Business Outcome: Reduced patient wait times by 25% and unified optical lens prescriptions across doctor schedules."
  },
  car: {
    keywords: ["amen car", "car sales", "import", "showroom"],
    response: "**Amen Car Sales**: A premium vehicle specifications showroom and order funnel. Optimized to load fast under low-bandwidth mobile networks, generating high-value customer inquiries."
  },
  hotel: {
    keywords: ["luxury hotel", "front desk", "booking engine"],
    response: "**Luxury Hotel Management System**: Tracks room availability, manages guest profiles, coordinates cleaning rosters, and runs direct booking engines that save on booking site commission fees."
  },
  law: {
    keywords: ["belete tasew", "law firm", "attorney"],
    response: "**Belete Tasew Law Firm**: Clean, authoritative homepage for corporate client acquisition. Integrates secure consult scheduling and legal intake questionnaires."
  },
  pharmacy: {
    keywords: ["pharmacy", "medicine", "expir"],
    response: "**Pharmacy Management System**: Real-time sales checkout, barcode scanners, and automated notifications for low stock or upcoming medication expiration dates."
  }
};

export function getAiResponse(query: string): AiResponse {
  const normalized = query.toLowerCase().trim();

  if (!normalized) {
    return {
      text: "Hello, I am the Melhek AI Assistant. Ask me about our divisions, timelines, indicative pricing, portfolio projects, or how to start an engagement.",
      suggestions: ["Explain Ecosystem Divisions", "How much do services cost?", "Who are you?"],
      intent: "general"
    };
  }

  // Check specific projects first
  for (const [_, data] of Object.entries(SPECIFIC_PROJECTS)) {
    if (data.keywords.some(kw => normalized.includes(kw))) {
      return {
        text: data.response,
        suggestions: ["Explain Ecosystem Divisions", "How much does a project cost?", "Let's start a project"],
        intent: "projects"
      };
    }
  }

  // Check general knowledge items
  let bestMatch: keyof typeof KNOWLEDGE_BASE | null = null;
  let maxMatches = 0;

  for (const [key, data] of Object.entries(KNOWLEDGE_BASE) as [keyof typeof KNOWLEDGE_BASE, typeof KNOWLEDGE_BASE[keyof typeof KNOWLEDGE_BASE]][]) {
    const matches = data.keywords.filter(kw => normalized.includes(kw)).length;
    if (matches > maxMatches) {
      maxMatches = matches;
      bestMatch = key;
    }
  }

  if (bestMatch && maxMatches > 0) {
    const matchData = KNOWLEDGE_BASE[bestMatch];
    
    // Explicit intents mapping
    let intent: AiResponse["intent"] = "general";
    if (bestMatch === "pricing") intent = "pricing";
    else if (bestMatch === "timeline" || bestMatch === "process") intent = "timeline";
    else if (bestMatch === "divisions" || bestMatch === "hospitalityDetail" || bestMatch === "businessSystemsDetail" || bestMatch === "aiDetail") intent = "divisions";
    else if (bestMatch === "portfolio") intent = "projects";
    else if (bestMatch === "contact" || bestMatch === "location") intent = "contact";
    else if (bestMatch === "leadStart") intent = "lead_start";

    return {
      text: matchData.response,
      suggestions: matchData.suggestions,
      intent
    };
  }

  // Fallback response
  return {
    text: "I want to make sure you get the exact information you need. I can answer questions about:\n" +
      "• **Ecosystem Divisions** (Digital, Hospitality, Business Systems, AI Automation)\n" +
      "• **Expected Project Timelines** (from 2 to 16 weeks)\n" +
      "• **Indicative Pricing Structure** (transparent value-based estimates)\n" +
      "• **Our Active Projects** (like Happy Optics or Luxury Hotel booking)\n\n" +
      "What can I clarify for you, or would you like to start qualifying a project directly?",
    suggestions: ["Explain Ecosystem Divisions", "How much do services cost?", "Let's start a project"],
    intent: "general"
  };
}
