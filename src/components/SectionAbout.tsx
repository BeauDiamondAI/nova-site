'use client';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import React, { useRef } from 'react';

export default function SectionAbout() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useSpring(useTransform(scrollYProgress, [0, 1], [75, -75]), {
    stiffness: 40,
    damping: 12,
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.3, 1], [0.2, 1, 1]);

  const lineHeight = useTransform(scrollYProgress, [0, 1], [1.8, 1.2]);

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
        className="pointer-events-none absolute inset-0 w-full h-full z-10"
        style={{
          backgroundImage: `url('/images/SectionAboutBlueWave.webp')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.2,
        }}
      ></div>
  
      {/* Dark Background Overlay - moved to lower z-index and reduced opacity */}
      <div className="absolute inset-0 bg-black opacity-20 z-20 pointer-events-none" />  

      {/* Content - now at highest z-index */}
      <motion.div
        className="relative z-50 max-w-4xl px-4"
        style={{ y, opacity, lineHeight }}
      >
        <h2 className="text-4xl sm:text-5xl font-bold font-headline mb-5">
          Thinks Deeper. Moves Faster. Deploys Intelligently.
        </h2>

        <p className="text-sm text-slate-400 tracking-wide uppercase mb-10">
          Built for mission-critical cognitive infrastructure.
        </p>

        <p className="mb-6 text-base" style={{ lineHeight: `${lineHeight}px` }}>
          NovaThink is building the <strong>cognitive operating system</strong> for the AI era.
        </p>

        <p className="mb-6 text-base" style={{ lineHeight: `${lineHeight}px` }}>
          Where today&apos;s large language models offer raw capacity, NovaThink provides the <em>meta-layer</em> that unlocks their full potential — transforming reactive tools into <strong>adaptive, persistent intelligences</strong> capable of reasoning, remembering, and orchestrating action at scale.
        </p>

        <p className="mb-6 text-base" style={{ lineHeight: `${lineHeight}px` }}>
          Today&apos;s LLMs are not bottlenecked by training data or compute. They are bottlenecked by lack of structure — missing the <strong>multi-step reasoning frameworks</strong> and <strong>cognitive persistence</strong> required to sustain real-world complexity in domains like strategy, research, policy, defense, and executive operations.
        </p>

        <p className="mb-6 text-base" style={{ lineHeight: `${lineHeight}px` }}>
          NovaThink closes this gap. We embed recursive logic frameworks, cognitive memory patterns, and domain-specific reasoning protocols — creating stateful AI systems that <strong>think beyond the prompt window</strong> and carry objectives forward with continuity, depth, and adaptive learning over time.
        </p>

        <p className="mb-6 text-base" style={{ lineHeight: `${lineHeight}px` }}>
          All of this is delivered through <strong>enterprise-grade infrastructure</strong>:
        </p>

        <ul className="mb-6 text-base text-left max-w-3xl mx-auto space-y-3" style={{ lineHeight: `${lineHeight}px` }}>
          <li>• Fully isolated, encrypted VPC deployments for uncompromising data security</li>
          <li>• Multi-model backends (OpenAI, Anthropic, open-source) for continuity and resilience</li>
          <li>• Compliance engineered from the ground up — SOC 2, ISO 27001, and beyond</li>
        </ul>

        <p className="mb-6 text-base" style={{ lineHeight: `${lineHeight}px` }}>
          We&apos;re not another AI product. We&apos;re building the <strong>cognitive OS</strong> — the intelligence amplification layer that will define how humans and AI collaborate across the next decade.
        </p>
      </motion.div>

      {/* Cyan Accent Line */}
      <div className="h-[3px] mx-auto mt-12 bg-cyan-400 rounded-full shadow-[0_0_20px_5px_rgba(34,211,238,0.5)] w-1/4 z-60" />
    </section>
  );
}