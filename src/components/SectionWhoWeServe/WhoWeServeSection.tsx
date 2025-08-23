import React, { useState } from "react";
import { motion } from "framer-motion";
import { AudienceCard } from "./AudienceCard";
import { audienceData } from "./audienceData"; // Externalized data
import "./SectionWhoWeServe.css";

const SectionWhoWeServe = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section
      className="relative bg-gradient-to-br from-gray-900 via-gray-950 to-black text-white py-24 px-6 sm:px-12"
      id="who-we-serve"
    >
      {/* Section Header */}
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

      {/* Pillars */}
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
