'use client';
import { motion } from 'framer-motion';
import React from 'react';

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export default function SectionAbout() {
  return (
    <section className="relative w-full text-white pt-32 pb-16 sm:pb-32 px-6 flex flex-col items-center justify-center text-center overflow-visible">
      {/* Background Image Layer */}
      <div
        className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
        style={{
          backgroundImage: `url('/images/SectionAboutBluewave.webp')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.4,
        }}
      ></div>

      {/* Divider Glow */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-full w-px bg-cyan-400 opacity-20 blur-xl z-10" />

      {/* Content Layer */}
      <motion.div
        className="relative z-20 max-w-4xl"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.h2
          className="text-4xl sm:text-5xl font-bold font-headline mb-3"
          variants={fadeUp}
        >
          Thinks Deeper. Moves Faster. Deploys Intelligently.
        </motion.h2>

        <motion.p
          className="text-sm text-slate-400 tracking-wide uppercase mb-8"
          variants={fadeUp}
        >
          Built for mission-critical cognitive infrastructure.
        </motion.p>

        <motion.p className="text-lg mb-6" variants={fadeUp}>
          NovaThink is a U.S.-based AI infrastructure company engineering secure,
          enterprise-grade systems for reasoning, analysis, and strategic intelligence.
        </motion.p>

        <motion.p className="text-lg mb-6" variants={fadeUp}>
          We’re building advanced cognitive architectures that blend multi-step logic
          frameworks with large language models — primarily OpenAI GPT models via API —
          unlocking advanced systems for real-time decision intelligence and autonomous
          execution—purpose-built for operators, analysts, researchers, and executives
          alike.
        </motion.p>

        <motion.p className="text-lg mb-6" variants={fadeUp}>
          To ensure resilience and continuity, NovaThink’s systems are also designed to
          interface with select open-source models, enabling multi-model redundancy across
          critical operations.
        </motion.p>

        <motion.p className="text-lg mb-6" variants={fadeUp}>
          All AI interactions are executed securely inside a fully isolated, encrypted
          Virtual Private Cloud (VPC), ensuring end-to-end privacy, compliance, and
          control.
        </motion.p>

        <motion.p className="text-lg" variants={fadeUp}>
          Our infrastructure is built from the ground up to meet SOC 2 and ISO 27001
          compliance standards — and beyond.
        </motion.p>
      </motion.div>

      {/* Cyan Accent Line */}
      <div className="h-[3px] mx-auto mt-12 bg-cyan-400 rounded-full shadow-[0_0_20px_5px_rgba(34,211,238,0.5)] w-1/2" />
    </section>
  );
}
