import React, { useState } from "react";
import { motion } from "framer-motion";
import { audienceData } from "./audienceData";
import { AudienceCard } from "./AudienceCard";

const SectionWhoWeServe: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <section
      id="who-we-serve"
      className="relative w-full py-24 px-6 sm:px-12 overflow-hidden bg-black text-white"
    >
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        autoPlay
        muted
        loop
        playsInline
      >
        <source
          src="/images/SectionWhoWeServeMedia/Network.mp4"
          type="video/mp4"
        />
      </video>

      {/* Grain Overlay */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-10 mix-blend-overlay opacity-20 pointer-events-none"
        autoPlay
        muted
        loop
        playsInline
      >
        <source
          src="/images/SectionWhoWeServeMedia/Grain.mp4"
          type="video/mp4"
        />
      </video>

      {/* Text Content */}
      <div className="relative z-20 max-w-3xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white font-orbitron">
          Who We Serve
        </h2>
        <p className="text-lg font-semibold text-gray-300 mt-4">
          Deployable Intelligence for Builders, Strategists, and Scaling Teams
        </p>
        <p className="text-md text-gray-400 mt-2">
          We’re building cognitive engines powered by an entirely new class of
          intelligence — systems operating at an altitude beyond conventional
          AI. They bring adaptive reasoning, end-to-end automation, multi-agent
          orchestration, and execution clarity that were simply not possible
          until now.
        </p>
      </div>

      {/* Audience Cards */}
      <motion.div
        className="relative z-20 flex flex-wrap justify-center gap-6 mt-12"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
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
    </section>
  );
};

export default SectionWhoWeServe;
