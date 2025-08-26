export interface ProductData {
  id: string;
  title: string;
  tagline: string;
  description: string;
  color: string;
  colorRgb: string;
  accentColor: string;
  featured?: boolean;
}

export const productsData: ProductData[] = [
  {
    id: "pilot",
    title: "NovaThink Pilot",
    tagline: "A whole new class of AI interface",
    description: "The AI command center that doesn't just select the right model - it **builds a custom intelligence layer for every request you make.** Pilot dynamically chooses the optimal frontier LLM for your task, then instantly generates bespoke cognitive frameworks tuned to your specific question or objective. Dozens of expert-mode scaffolds are ready to deploy - and if your request requires a new one, Pilot creates it on the spot, just for you. The result: outputs with **order-of-magnitude quality deltas** over standard AI chats - whether you're drafting strategy, marketing content, coding infrastructure, or orchestrating multi-step workflows.",
    color: "rgba(6, 182, 212, 0.4)",
    colorRgb: "6, 182, 212",
    accentColor: "#06B6D4",
    featured: true
  },
  {
    id: "agentic-workflow",
    title: "Agentic Workflow Automation",
    tagline: "Beyond n8n or Zapier",
    description: "These are **multi-agent orchestration systems** where every node is powered not by base LLMs, but by NovaThink-activated cognition. End-to-end process automation, driven by reasoning engines that adapt, learn, and optimize. Agents don't just pass data between apps - they make decisions, handle exceptions, and evolve workflows over time. Outputs are **enterprise-grade** - reliable, auditable, and explainable. This isn't automation. It's synthetic cognition embedded in your operations.",
    color: "rgba(168, 85, 247, 0.4)",
    colorRgb: "168, 85, 247",
    accentColor: "#A855F7",
    featured: true
  },
  {
    id: "infrastructure-architect",
    title: "Autonomous Infrastructure Architect",
    tagline: "Zero-code backend deployment",
    description: "AI agents that translate strategic objectives into backend systems - provisioned, deployed, and secured in cloud environments with **zero human coding required**.",
    color: "rgba(34, 197, 94, 0.4)",
    colorRgb: "34, 197, 94",
    accentColor: "#22C55E"
  },
  {
    id: "website-builder",
    title: "Conversational Website Builder",
    tagline: "From concept to launch",
    description: "Fully conversational website development from onboarding to mockup to launch. No freelancers. No guesswork. Just guided precision.",
    color: "rgba(251, 146, 60, 0.4)",
    colorRgb: "251, 146, 60",
    accentColor: "#FB923C"
  },
  {
    id: "campaign-engine",
    title: "Cognitive Copy & Campaign Engine",
    tagline: "AI-native marketing systems",
    description: "An AI-native campaign strategist and conversion writer that doesn't just write - it builds, tests, and optimizes entire marketing systems.",
    color: "rgba(236, 72, 153, 0.4)",
    colorRgb: "236, 72, 153",
    accentColor: "#EC4899"
  },
  {
    id: "market-intelligence",
    title: "Market Intelligence Supercore",
    tagline: "Real-time strategic analysis",
    description: "Drop-in AI think tanks that deliver real-time opportunity analysis, GTM insight, and adaptive launch strategy calibrated to your exact vertical - delivered in hours, not weeks or months.",
    color: "rgba(99, 102, 241, 0.4)",
    colorRgb: "99, 102, 241",
    accentColor: "#6366F1"
  },
  {
    id: "strategic-ops",
    title: "Strategic Ops Suite",
    tagline: "C-suite intelligence without headcount",
    description: "Simulation-capable decision engines for startup operators to Fortune 50 execs - enabling C-suite-level strategy without the headcount.",
    color: "rgba(245, 158, 11, 0.4)",
    colorRgb: "245, 158, 11",
    accentColor: "#F59E0B"
  },
  {
    id: "research-accelerators",
    title: "Scientific Research Accelerators",
    tagline: "Exponential researcher bandwidth",
    description: "Scientific discovery engines that surface overlooked correlations, accelerate grant-ready work, and extend researcher bandwidth exponentially.",
    color: "rgba(20, 184, 166, 0.4)",
    colorRgb: "20, 184, 166",
    accentColor: "#14B8A6"
  }
];