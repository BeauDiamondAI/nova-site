// src/components/SectionWhoWeServe/audienceData.ts

export interface AudienceData {
  icon: string;
  title: string;
  description: string;
  color: {
    primary: string;
    glow: string;
    accent: string;
  };
}

export const audienceData: AudienceData[] = [
  {
    icon: "🚀",
    title: "Founders & Creators",
    description: "Operational clarity and frameworks that think with you — but execute for you, turning vision into autonomous action.",
    color: {
      primary: "rgba(59, 130, 246, 0.15)",  // Blue
      glow: "rgba(59, 130, 246, 0.4)",
      accent: "#3B82F6"
    }
  },
  {
    icon: "🎯",
    title: "Operators & Teams",
    description: "Cognitive engines for real-time execution — eliminating friction through orchestration and decision-making across product, marketing, and ops.",
    color: {
      primary: "rgba(168, 85, 247, 0.15)",  // Purple
      glow: "rgba(168, 85, 247, 0.4)",
      accent: "#A855F7"
    }
  },
  {
    icon: "💻",
    title: "Tech & Data Teams",
    description: "Zero-trust cognitive systems with VPC integration — orchestrating intelligence securely across your entire stack.",
    color: {
      primary: "rgba(34, 197, 94, 0.15)",   // Green
      glow: "rgba(34, 197, 94, 0.4)",
      accent: "#22C55E"
    }
  },
  {
    icon: "🏢",
    title: "Enterprises",
    description: "Deployable self-optimizing intelligence that integrates directly into core infrastructure — revolutionizing strategy and execution across every dimension.",
    color: {
      primary: "rgba(251, 146, 60, 0.15)",  // Orange
      glow: "rgba(251, 146, 60, 0.4)",
      accent: "#FB923C"
    }
  },
  {
    icon: "📈",
    title: "Scaling Organizations",
    description: "Branded intelligence and marketing systems engineered for precision, scale, and growth that matches ambition.",
    color: {
      primary: "rgba(236, 72, 153, 0.15)",  // Pink
      glow: "rgba(236, 72, 153, 0.4)",
      accent: "#EC4899"
    }
  }
];