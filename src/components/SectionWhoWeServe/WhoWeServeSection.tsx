import React, { useState } from "react";
import { motion } from "framer-motion";
import { AudienceCard } from "./AudienceCard";
import "./SectionWhoWeServe.css";


const audienceData = [
  {
    icon: "🚀",
    title: "FOUNDERS & CREATORS",
    description:
      "Operational clarity, positioning precision, and business frameworks that think with you — and execute for you.",
  },
  {
    icon: "🧠",
    title: "OPERATORS & TEAMS",
    description:
      "Streamlined decision-making, performance visibility, and hands-off systems to scale your impact.",
  },
  {
    icon: "🏢",
    title: "ENTERPRISES",
    description:
      "Next-gen capability development, risk-managed innovation, and intelligence infrastructure.",
  },
  {
    icon: "🛡️",
    title: "PRIVACY-FIRST COMPANIES",
    description:
      "Guardrails, guarantees, and governance baked in — without sacrificing power or precision.",
  },
  {
    icon: "🪐",
    title: "FUTURE-FACING INNOVATORS",
    description:
      "Whether you're building ahead of the curve or breaking it, we provide executional edge.",
  },
];

const SectionWhoWeServe = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section
      className="relative bg-gradient-to-br from-gray-900 via-gray-950 to-black text-white py-24 px-6 sm:px-12"
      id="who-we-serve"
    >
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-white font-orbitron">
          Who We Serve
        </h2>
        <h3 className="text-xl mt-4 font-semibold text-gray-300 font-orbitron">
          Deployable Intelligence for Builders, Strategists, and Scaling Teams
        </h3>
        <p className="mt-4 text-gray-400 max-w-3xl mx-auto text-base sm:text-lg">
          We’re building cognitive engines powered by an entirely new class of
          intelligence — systems operating at an altitude beyond conventional
          AI. They bring adaptive reasoning, end-to-end automation, multi-agent
          orchestration, and execution clarity that were simply not possible
          until now.
        </p>
      </div>

      <div className="mt-16 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.12,
              },
            },
          }}
        >
          {audienceData.map((audience, index) => (
            <AudienceCard
              key={index}
              {...audience}
              index={index}
              isActive={activeIndex === index}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SectionWhoWeServe;
