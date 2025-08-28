'use client';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import React, { useRef } from 'react';
import './SectionAbout.css';

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

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1]
      }
    })
  };

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
  
      {/* Dark Background Overlay */}
      <div className="absolute inset-0 bg-black opacity-20 z-20 pointer-events-none" />  

      {/* Content */}
      <motion.div
        className="relative z-50 max-w-6xl px-4 w-full"
        style={{ y, opacity }}
      >
        <h2 className="text-4xl sm:text-5xl font-bold font-headline mb-5">
          Thinks Deeper. Moves Faster. Deploys Intelligently.
        </h2>


        {/* Main Subheadline */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={cardVariants}
          custom={0}
          className="mb-16"
        >
          <h3 className="text-2xl sm:text-3xl font-bold mb-8 leading-tight">
            NovaThink is building the <strong className="text-cyan-400">cognitive operating system</strong> for the AI era.
          </h3>
        </motion.div>

        {/* Cards Container */}
        <div className="flex flex-col lg:flex-row gap-8 mb-16 justify-center">
          {/* Card 1 */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
            custom={1}
            className="glassmorphic-card flex-1 max-w-lg"
          >
            <h4 className="text-lg font-bold text-cyan-400 mb-4 tracking-wide uppercase">
              The Cognitive OS Layer Between LLMs and Execution
            </h4>
            <p className="mb-6 text-lg leading-relaxed">
              Where today&apos;s large language models offer raw capacity, NovaThink provides the <em className="text-cyan-300">meta-layer</em> that unlocks their full potential — transforming reactive tools into <strong className="text-white">adaptive, persistent intelligences</strong> capable of reasoning, remembering, and orchestrating action at scale.
            </p>
            <p className="text-lg leading-relaxed">
              Today&apos;s LLMs are not bottlenecked by training data or compute. They are bottlenecked by lack of structure — missing the <strong className="text-white">multi-step reasoning frameworks</strong> and <strong className="text-white">cognitive persistence</strong> required to sustain real-world complexity in domains like strategy, research, policy, defense, and executive operations.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
            custom={2}
            className="glassmorphic-card flex-1 max-w-lg"
          >
            <h4 className="text-lg font-bold text-cyan-400 mb-4 tracking-wide uppercase">
              Built for Mission-Critical Cognitive Infrastructure
            </h4>
            <p className="mb-6 text-base leading-relaxed">
              NovaThink closes this gap. We embed recursive logic frameworks, adaptive cognition patterns, and domain-specific reasoning protocols — creating stateful AI systems that <strong className="text-white">think beyond the prompt window</strong> and carry objectives forward with continuity, depth, and adaptive learning over time.
            </p>
            <p className="mb-4 text-base leading-relaxed">
              All of this is delivered through <strong className="text-white">enterprise-grade infrastructure</strong>:
            </p>
            <ul className="text-left space-y-2 text-sm leading-relaxed text-slate-200">
              <li>• Fully isolated, encrypted VPC deployments for uncompromising data security</li>
              <li>• Multi-model backends (OpenAI, Anthropic, open-source) for continuity and resilience</li>
              <li>• Compliance engineered from the ground up — SOC 2, ISO 27001, and beyond</li>
            </ul>
          </motion.div>
        </div>

        {/* Closing Subheadline */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={cardVariants}
          custom={3}
          className="mb-8"
        >
          <h3 className="text-2xl sm:text-3xl font-bold mb-4 leading-tight">
            <strong className="text-cyan-400">NovaThink is something fundamentally new:</strong>
          </h3>
          <p className="text-xl leading-relaxed max-w-4xl mx-auto">
            An LLM-agnostic cognitive OS — the intelligence amplification layer that will define how humans and AI collaborate over the next decade.
          </p>
        </motion.div>
      </motion.div>

      {/* Cyan Accent Line */}
      <div className="h-[3px] mx-auto mt-12 bg-cyan-400 rounded-full shadow-[0_0_20px_5px_rgba(34,211,238,0.5)] w-1/4 z-60" />
    </section>
  );
}