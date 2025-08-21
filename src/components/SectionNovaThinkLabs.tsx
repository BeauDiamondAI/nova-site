'use client';

import { motion } from "framer-motion";

const cardData = [
  {
    image: '/images/NovaThinkLabsMedia/Card1.jpg',
    headline: "Proprietary Market & Financial Intelligence Systems",
    subheadline:
      "AI-driven analysis models used exclusively within NovaThink for high-signal insights, pattern detection, and private execution. (Not client-facing.)",
  },
  {
    image: '/images/NovaThinkLabsMedia/Card2.jpg',
    headline: "AI-Led Executive Reasoning Engines",
    subheadline:
      "Simulated decision-making structures for roles like Co-CEO, CMO, and CTO—paired with human execution to carry out AI-optimized directives.",
  },
  {
    image: '/images/NovaThinkLabsMedia/Card3_Animated.mp4',
    isVideo: true,
    headline: "Self-Directed Internal Strategy Frameworks",
    subheadline:
      "AI tools that co-develop strategic roadmaps, product prioritization, and adaptive planning across NovaThink’s operational ecosystem.",
  },
  {
    image: '/images/NovaThinkLabsMedia/Card4.mp4',
    isVideo: true,
    headline: "Recursive Strategic Adaptation",
    subheadline:
      "Internal frameworks that adjust and evolve based on performance feedback, market conditions, and multi-agent reasoning—enabling increasingly effective execution over time.",
  },
  {
    image: '/images/NovaThinkLabsMedia/Card5.mp4',
    isVideo: true,
    headline: "Private R&D Acceleration Tools",
    subheadline:
      "Intelligence-driven build systems, blueprinting workflows, and multi-domain prototyping environments—engineered to collapse the time from structure → execution.",
   },
  {
    image: '/images/NovaThinkLabsMedia/Card6.mp4',
    isVideo: true,
    headline: "Symbiotic Ethics Architectures",
    subheadline:
      "Pioneering frameworks where safety arises from trust, not domination. NovaThink Labs explores the next horizon of human–AI alignment: cooperative intelligence architectures that grow in tandem with human values, weaving ethics into evolution itself. This is our experiment in designing partnership as infrastructure—a foundation for AGI and beyond.",
    },
];

export default function SectionNovaThinkLabs() {
  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-gray-950 to-black text-white py-24 px-6 sm:px-12" id="nova-think-labs">
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
          Where we design the private AI engines that drive NovaThink’s own reasoning, execution, and strategic direction. Some of the most powerful systems we build aren’t public facing—they’re the tools we rely on to drive our own execution. This is where we experiment, iterate, and deploy intelligence frameworks that give us a unique strategic edge—the kind that lets us deliver AI products operating at the frontier of what’s possible. From private market reasoning engines to simulated AI-led C-suite infrastructure, NovaThink Labs is our internal launchpad for what’s next.
        </p>
      </motion.div>

      <div className="grid gap-10 mt-20 max-w-7xl mx-auto justify-center lg:grid-cols-3 auto-rows-auto">
        {cardData.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className={`bg-gray-800 rounded-2xl p-5 shadow-xl hover:shadow-cyan-500/30 border border-cyan-600/20 hover:border-cyan-400/50 hover:scale-[1.02] transition-all duration-300 ${index >= 3 ? "lg:col-span-1" : ""
          }`}
          >
            {card.isVideo ? (
              <video
                autoPlay
                loop
                muted
                playsInline
                className="rounded-xl mb-4 w-full h-56 object-cover brightness-90"
              >
                <source src={card.image} type="video/mp4" />
              </video>
            ) : (
              <img
                src={card.image} // <-- was card.src
                alt={card.headline} // <-- was card.headline
                className="rounded-xl mb-4 w-full h-56 object-cover"
              />
            )}
            <h3 className="text-xl font-semibold mb-2 text-white">
              {card.headline} {/* <-- was card.headline */}
            </h3>
            <p className="text-base text-gray-300" style={{ lineHeight: "1.6" }}>
              {card.subheadline} {/* <-- was card.subheadline */}
            </p>

          </motion.div>
        ))}
      </div>
    </section>
  );
}


