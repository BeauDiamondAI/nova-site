'use client';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import React, { useRef } from 'react';

export default function SectionAbout() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useSpring(useTransform(scrollYProgress, [0, 1], [50, -50]), {
    stiffness: 60,
    damping: 20,
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 1], [0.2, 1, 1]);

  const lineHeight = useTransform(scrollYProgress, [0, 1], [2.2, 1.6]);

  return (
    <section
      ref={ref}
      className="relative w-full text-white min-h-screen pt-32 pb-16 sm:pb-32 px-6 flex flex-col items-center justify-center text-center overflow-visible"
    >
      {/* Flicker Video Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-25"
        >
          <source
            src="/images/SectionAboutMedia/SectionAboutVideo2.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      {/* Background Image Layer */}
      <div
        className="pointer-events-none absolute inset-0 w-full h-full z-0"
        style={{
          backgroundImage: `url('/images/SectionAboutBlueWave.webp')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.4,
        }}
      ></div>

      {/* Divider Glow */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-full w-[55%] bg-cyan-400 opacity-20 blur-xl z-40" />

      {/* Content */}
      <motion.div
        className="relative z-30 max-w-4xl px-4"
        style={{ y, opacity, lineHeight }}
      >
        <h2 className="text-4xl sm:text-5xl font-bold font-headline mb-5">
          Thinks Deeper. Moves Faster. Deploys Intelligently.
        </h2>

        <p className="text-sm text-slate-400 tracking-wide uppercase mb-10">
          Built for mission-critical cognitive infrastructure.
        </p>

        <p className="text-lg mb-6">
          NovaThink is a U.S.-based AI infrastructure company engineering secure,
          enterprise-grade systems for reasoning, analysis, and strategic intelligence.
        </p>

        <p className="text-lg mb-6">
          We’re building advanced cognitive architectures that blend multi-step logic
          frameworks with large language models — primarily OpenAI GPT models via API —
          unlocking advanced systems for real-time decision intelligence and autonomous
          execution—purpose-built for operators, analysts, researchers, and executives
          alike.
        </p>

        <p className="text-lg mb-6">
          To ensure resilience and continuity, NovaThink’s systems are also designed to
          interface with select open-source models, enabling multi-model redundancy across
          critical operations.
        </p>

        <p className="text-lg mb-6">
          All AI interactions are executed securely inside a fully isolated, encrypted
          Virtual Private Cloud (VPC), ensuring end-to-end privacy, compliance, and
          control.
        </p>

        <p className="text-lg">
          Our infrastructure is built from the ground up to meet SOC 2 and ISO 27001
          compliance standards — and beyond.
        </p>
      </motion.div>

      {/* Cyan Accent Line */}
      <div className="h-[3px] mx-auto mt-12 bg-cyan-400 rounded-full shadow-[0_0_20px_5px_rgba(34,211,238,0.5)] w-1/4 z-50" />
    </section>
  );
}
