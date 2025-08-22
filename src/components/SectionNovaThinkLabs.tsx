'use client';

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";


const cardData = [
  {
    image: '/images/NovaThinkLabsMedia/Card1.mp4',
    headline: "Proprietary Market & Financial Intelligence Systems",
    subheadline:
      "AI-driven analysis models used exclusively within NovaThink for high-signal insights, pattern detection, and private execution. (Not client-facing.)",
  },
  {
    image: '/images/NovaThinkLabsMedia/Card2new.mp4',
    headline: "AI-Led Executive Reasoning Engines",
    subheadline:
      "Simulated decision-making structures for roles like Co-CEO, CMO, and CTO—paired with human execution to carry out AI-optimized directives.",
  },
  {
    image: '/images/NovaThinkLabsMedia/Card3_Animated.mp4',
    headline: "Self-Directed Internal Strategy Frameworks",
    subheadline:
      "AI tools that co-develop strategic roadmaps, product prioritization, and adaptive planning across NovaThink’s operational ecosystem.",
  },
  {
    image: '/images/NovaThinkLabsMedia/Card4.mp4',
    headline: "Recursive Strategic Adaptation",
    subheadline:
      "Internal frameworks that adjust and evolve based on performance feedback, market conditions, and multi-agent reasoning—enabling increasingly effective execution over time.",
  },
  {
    image: '/images/NovaThinkLabsMedia/Card5.mp4',
    headline: "Private R&D Acceleration Tools",
    subheadline:
      "Intelligence-driven build systems, blueprinting workflows, and multi-domain prototyping environments—engineered to collapse the time from structure → execution.",
  },
  {
    image: '/images/NovaThinkLabsMedia/Card6.mp4',
    headline: "Symbiotic Ethics Architectures",
    subheadline:
      "Pioneering frameworks where safety arises from trust, not domination. NovaThink Labs explores the next horizon of human–AI alignment: cooperative intelligence architectures that grow in tandem with human values, weaving ethics into evolution itself.",
  },
];

export default function SectionNovaThinkLabs() {
  const videoRefs = useRef<HTMLVideoElement[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [scrollProgress, setScrollProgress] = useState(0);


  // Pause all desktop videos by default
  useEffect(() => {
    videoRefs.current.forEach((video) => {
      if (video) video.pause();
    });
  }, []);

  // Track scroll position for mobile scroll indicator
const handleScroll = () => {
  if (!scrollRef.current) return;

  const scrollLeft = scrollRef.current.scrollLeft;
  const scrollWidth = scrollRef.current.scrollWidth;
  const clientWidth = scrollRef.current.clientWidth;

  const totalScrollable = scrollWidth - clientWidth;
  const progress = scrollLeft / totalScrollable;

  setScrollProgress(Math.min(progress, 1)); // cap at 100%
};


  return (
    <section
      className="relative bg-gradient-to-br from-gray-900 via-gray-950 to-black text-white py-24 px-6 sm:px-12"
      id="nova-think-labs"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto text-center"
      >
        <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent mb-6">
          NovaThink Labs
        </h2>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          Where we design the private AI engines that drive NovaThink’s own reasoning, execution, and strategic direction. Some of the most powerful systems we build aren’t public facing—they’re the tools we rely on to drive our own execution. 
          </p>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          This is where we experiment, iterate, and deploy intelligence frameworks that give us a unique strategic edge—the kind that lets us deliver AI products operating at the frontier of what’s possible. From private market reasoning engines to simulated AI-led C-suite infrastructure, NovaThink Labs is our internal launchpad for what’s next.
        </p>
      </motion.div>

      {/* DESKTOP VIEW */}
      <div className="hidden sm:grid gap-10 mt-20 max-w-7xl mx-auto justify-center lg:grid-cols-3 auto-rows-auto">
        {cardData.map((card, index) => (
          <div
            key={index}
            className="group relative bg-gray-800 rounded-2xl p-5 shadow-xl hover:shadow-cyan-500/30 border border-cyan-600/20 hover:border-cyan-400/50 hover:scale-[1.02] transition-all duration-300"
            onMouseEnter={() => {
              const video = document.getElementById(`desktop-video-${index}`) as HTMLVideoElement;
              video?.play();
            }}
            onMouseLeave={() => {
              const video = document.getElementById(`desktop-video-${index}`) as HTMLVideoElement;
              video?.pause();
            }}
          >
            <video
              id={`desktop-video-${index}`}
              src={card.image}
              loop
              muted
              playsInline
              className="rounded-xl mb-4 w-full h-56 object-cover brightness-90 pointer-events-none"
            />
            <h3 className="text-xl font-semibold mb-2 text-white">
              {card.headline}
            </h3>
            <p className="text-base text-gray-300" style={{ lineHeight: "1.6" }}>
              {card.subheadline}
            </p>
          </div>
        ))}
      </div>

      {/* MOBILE VIEW */}
<div
  className="sm:hidden mt-12 overflow-x-auto snap-x snap-mandatory px-2 pb-16 no-scrollbar relative"
  ref={scrollRef}
  onScroll={handleScroll}
>
  <div className="flex space-x-4">
    {cardData.map((card, index) => (
      <div
        key={index}
        className="snap-center shrink-0 w-[calc(100vw-3rem)] max-w-sm bg-gray-800 rounded-2xl p-5 shadow-xl border border-cyan-400 hover:border-cyan-300 transition-colors duration-300"
      >
        <video
          src={card.image}
          autoPlay
          loop
          muted
          playsInline
          className="rounded-xl mb-4 w-full h-56 object-cover brightness-90"
        />
        <h3 className="text-xl font-semibold mb-2 text-white">
          {card.headline}
        </h3>
        <p className="text-base text-gray-300" style={{ lineHeight: "1.6" }}>
          {card.subheadline}
        </p>
      </div>
    ))}
  </div>
  {/* ✅ Scroll progress indicator moved here */}
  <div className="mt-4 flex justify-center w-full z-10">
    <div className="relative w-24 h-1 bg-gray-700 rounded-full overflow-hidden">
      <div
        className="absolute top-0 left-0 h-full bg-white transition-all duration-300 rounded-full"
        style={{
          width: `${scrollProgress * 100}%`,
        }}
      />
    </div>
  </div>

  {/* Cyan blinking arrow */}
  {scrollProgress < 0.98 && (
    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 animate-pulse text-cyan-400 z-10 text-2xl">
      →
    </div>
  )}
</div>

    </section>
  );
}


