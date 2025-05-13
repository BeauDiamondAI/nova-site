import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
      'Our infrastructure starts from zero trust - encrypted, isolated, and fortified for high-sensitivity deployments.',
    image: '/images/cards/Security-FirstArchitecture.webp',
  },
  {
    tag: 'insight_at_velocity',
    title: 'Dynamic Data Intelligence',
    paragraph:
      'Our models adapt to real-world signals - fusing behavioral, contextual, and operational data into fluid intelligence layers.',
    image: '/images/cards/DynamicDataIntelligence.webp',
  },
  {
    tag: 'superior_intelligence_core',
    title: 'Proprietary Reasoning Engines',
    paragraph:
      'Beyond outputs - these are logic frameworks that reason, orchestrate, and drive decision-making across domains.',
    image: '/images/cards/ProprietaryReasoningEngines.webp',
  },
  {
    tag: 'modular_scale',
    title: 'Scalable Cloud Framework',
    paragraph:
      'Elastic, modular, and built for scale - with zero-overhead deployment and enterprise-grade performance boundaries.',
    image: '/images/cards/ScalableCloudFramework.webp',
  },
  {
    tag: 'mission_ready',
    title: 'Deployment Ready by Design',
    paragraph:
      "These systems don't just demo well - they operate in the wild. Built for execution, not just experimentation.",
    image: '/images/cards/DeploymentReadybyDesign.webp',
  },
];

export default function SectionCorePillars() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % cards.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    containerRef.current?.scrollTo({
      left: containerRef.current.offsetWidth * index,
      behavior: 'smooth',
    });
  }, [index]);

  const scrollLeft = () => {
    setIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };
  const scrollRight = () => {
    setIndex((prev) => (prev + 1) % cards.length);
  };

  return (
    <section className="py-16 bg-black text-white relative">
      <div className="flex justify-between items-center px-4 md:px-16 mb-6">
        <h2 className="text-3xl md:text-5xl font-headline font-bold">
          What We're Building
        </h2>
        <div className="hidden md:flex gap-2">
          <button
            onClick={scrollLeft}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-full"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={scrollRight}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-full"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
  
      <div
        ref={containerRef}
        className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide px-4 md:px-16 min-h-[50rem]"
      >
        {cards.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            className="snap-start shrink-0 w-[95vw] md:w-[28rem] h-[80vh] md:h-[26rem] relative rounded-xl overflow-hidden shadow-lg mx-2 bg-black"
          >
            <Image
              src={card.image}
              alt={card.title}
              fill
              className="object-cover opacity-70"
            />
  
            {/* Tag in top-left */}
            <div className="absolute top-4 left-4 bg-black/60 px-3 py-1 rounded-md text-xs text-teal-400 font-[monospace] tracking-wide"
                 style={{ textTransform: 'none' }}
            >
              {card.tag}
            </div>
  
            {/* Gradient overlay for title + paragraph */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/27 p-6 flex flex-col justify-end">
              <h3 className="text-xl md:text-2xl font-bold mb-2">
                {card.title}
              </h3>
              <p className="text-base md:text-lg text-white/90 leading-snug">
                {card.paragraph}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}