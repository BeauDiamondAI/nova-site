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
    description: "Clarity, strategy, and execution frameworks that help align vision with action, turning innovation into traction.",
    color: {
      primary: "rgba(59, 130, 246, 0.15)",  // Blue
      glow: "rgba(59, 130, 246, 0.4)",
      accent: "#3B82F6"
    }
  },
  {
    icon: "🎯",
    title: "Operators & Teams",
    description: "End-to-end process automation and decision support that eliminates friction, bottlenecks, and coordination drag.",
    color: {
      primary: "rgba(168, 85, 247, 0.15)",  // Purple
      glow: "rgba(168, 85, 247, 0.4)",
      accent: "#A855F7"
    }
  },
  {
    icon: "📊",
    title: "Consultants & Strategists",
    description: "Powerful white-labeled thinking tools that enhance client work, automate deliverables, and unlock new revenue streams.",
    color: {
      primary: "rgba(34, 197, 94, 0.15)",   // Green
      glow: "rgba(34, 197, 94, 0.4)",
      accent: "#22C55E"
    }
  },
  {
    icon: "⚡",
    title: "Tech & Data Teams",
    description: "Augmented cognitive systems that bring visibility, automation, and orchestration across data, workflows, and agents.",
    color: {
      primary: "rgba(251, 146, 60, 0.15)",  // Orange
      glow: "rgba(251, 146, 60, 0.4)",
      accent: "#FB923C"
    }
  },
  {
    icon: "📈",
    title: "Scaling Organizations",
    description: "Evolving systems that grow with you, delivering cohesion, clarity, and execution power across complex orgs.",
    color: {
      primary: "rgba(236, 72, 153, 0.15)",  // Pink
      glow: "rgba(236, 72, 153, 0.4)",
      accent: "#EC4899"
    }
  }
];