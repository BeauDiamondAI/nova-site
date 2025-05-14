'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';

interface Card {
  tag: string;
  title: string;
  paragraph: string;
  image: string;
}

const cards: Card[] = [
  {
    tag: 'zero_trust',
    title: 'Security-First Architecture',
    paragraph:
      'Our infrastructure starts from zero trust — encrypted, isolated, and fortified for high-sensitivity deployments.',
    image: '/images/cards/Security-FirstArchitecture.webp',
  },
  {
    tag: 'data_intelligence',
    title: 'Dynamic Data Intelligence',
    paragraph:
      'NovaThink systems ingest and reason over real-time market, behavioral, and operational signals — built for strategic action.',
    image: '/images/cards/Data-Intelligence.webp',
  },
  {
    tag: 'reasoning_engines',
    title: 'Proprietary Reasoning Engines',
    paragraph:
      'We deploy domain-specific logic stacks — AI agents tuned to think, decide, and act in your operational context.',
    image: '/images/cards/Proprietary-ReasoningEngines.webp',
  },
  {
    tag: 'cloud_framework',
    title: 'Scalable Cloud Framework',
    paragraph:
      'Modular infrastructure for inference, execution, and secure model deployment — designed to evolve as you scale.',
    image: '/images/cards/Scalable-CloudFramework.webp',
  },
  {
    tag: 'mission_ready',
    title: 'Deployment-Ready by Design',
    paragraph:
      'We don’t ship prototypes. We ship live systems — secure endpoints, cloud-native, and field-tested.',
    image: '/images/cards/Deployment-Ready.webp',
  },
];

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
      ease: [0.33, 0.1, 0.5, 1],
    },
  },
};

export default function SectionCorePillars() {
  return (
    <section className="relative w-full bg-black text-white py-24 px-6 overflow-hidden">
      <motion.div
        className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {cards.map((card) => (
          <motion.div
            key={card.tag}
            className="bg-[#0f1116] border border-slate-800 rounded-2xl p-6 flex flex-col justify-between min-h-[32rem] shadow-lg hover:shadow-cyan-500/10 transition-shadow duration-300"
            variants={fadeUp}
          >
            <div className="mb-6">
              <div className="text-xs text-cyan-400 font-mono uppercase tracking-wide mb-2">
                {card.tag.replace(/_/g, ' ')}
              </div>
              <h3 className="text-xl font-semibold mb-3">{card.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{card.paragraph}</p>
            </div>
            <div className="relative w-full h-48 rounded-lg overflow-hidden">
              <Image
                src={card.image}
                alt={card.title}
                fill
                className="object-cover object-center rounded-md"
              />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
