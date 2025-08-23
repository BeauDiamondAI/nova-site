// components/SectionWhoWeServe/WhoWeServeSection.tsx

"use client";

import React, { useState } from "react";
import AudienceCard from "./AudienceCard";
import "./AudienceCard.css";

const audienceData = [
  {
    id: "founders",
    icon: "🚀",
    headline: "Founders & Creators",
    description:
      "Operational clarity, positioning precision, and business frameworks that think with you — and execute for you.",
  },
  {
    id: "operators",
    icon: "🧠",
    headline: "Operators & Teams",
    description:
      "Cognitive engines for real-time execution, workflow orchestration, and cross-domain decisioning.",
  },
  {
    id: "enterprises",
    icon: "🏢",
    headline: "Enterprises",
    description:
      "Deployable self-optimizing intelligence that integrates directly into core infrastructure — revolutionizing strategy and execution across every dimension.",
  },
  {
    id: "privacy",
    icon: "🛡️",
    headline: "Privacy-First Companies",
    description:
      "Zero-trust compatible deployments with VPC integration — data discretion by design.",
  },
  {
    id: "innovators",
    icon: "🌌",
    headline: "Future-Facing Innovators",
    description:
      "Soon: branded intelligence + marketing systems engineered for elite precision, creative excellence, and explosive growth.",
  },
];

export default function WhoWeServeSection() {
  const [activeId, setActiveId] = useState<string | null>(null);

  const handleCardClick = (id: string) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="relative z-10 py-20 px-4 sm:px-8 lg:px-24 overflow-hidden">
      {/* Background Video Layer */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      >
        <source src="/images/SectionWhoWeServeMedia/Network.mp4" type="video/mp4" />
      </video>

      {/* Overlay Layer */}
      <div className="absolute inset-0 bg-black bg-opacity-60 z-0" />

      {/* Content Layer */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <h2 className="text-center text-3xl md:text-4xl font-bold text-white mb-12 font-orbitron">
          Who We Serve
        </h2>

        <div className="flex flex-wrap justify-center gap-6">
          {audienceData.map(({ id, icon, headline, description }) => (
            <AudienceCard
              key={id}
              id={id}
              icon={icon}
              headline={headline}
              description={description}
              isActive={activeId === id}
              onClick={() => handleCardClick(id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
