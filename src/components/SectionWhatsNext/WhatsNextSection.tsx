import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProductOrb } from "./ProductOrb";
import { MouseHalo } from "./MouseHalo";
import { productsData } from "./productsData";
import "./WhatsNextSection.css";

const WhatsNextSection: React.FC = () => {
  const [expandedProductId, setExpandedProductId] = useState<string | null>(null);
  const [showIntroText, setShowIntroText] = useState(true);
  const [introTextExpanded, setIntroTextExpanded] = useState(false);
  const [mouseHaloActive, setMouseHaloActive] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const orbRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Walker Delta orbital positioning calculation
  const calculateOrbitalPositions = () => {
    const centerX = typeof window !== 'undefined' ? window.innerWidth / 2 : 400;
    const centerY = typeof window !== 'undefined' ? window.innerHeight / 2 : 300;
    const totalOrbs = productsData.length;
    const positions: Array<{x: number, y: number, ring: number}> = [];

    // Create orbital rings with varying radii
    const rings = [
      { radius: 180, orbs: 3 },
      { radius: 280, orbs: 3 },
      { radius: 380, orbs: Math.max(1, totalOrbs - 6) }
    ];

    let orbIndex = 0;
    rings.forEach((ring, ringIndex) => {
      for (let i = 0; i < ring.orbs && orbIndex < totalOrbs; i++) {
        const angle = (360 / ring.orbs) * i + (ringIndex * 60); // Phase offset per ring
        const x = Math.cos((angle * Math.PI) / 180) * ring.radius;
        const y = Math.sin((angle * Math.PI) / 180) * ring.radius;
        
        positions.push({
          x: centerX + x,
          y: centerY + y,
          ring: ringIndex
        });
        orbIndex++;
      }
    });

    return positions;
  };

  const [orbitalPositions, setOrbitalPositions] = useState(calculateOrbitalPositions());

  // Responsive orbital positioning
  useEffect(() => {
    const handleResize = () => {
      setOrbitalPositions(calculateOrbitalPositions());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-retract intro text after typing animation completes
  useEffect(() => {
    if (showIntroText) {
      const timer = setTimeout(() => {
        setShowIntroText(false);
      }, 6000); // Adjust based on typing animation duration
      return () => clearTimeout(timer);
    }
  }, [showIntroText]);

  const handleOrbClick = (productId: string) => {
    setExpandedProductId(expandedProductId === productId ? null : productId);
    setMouseHaloActive(expandedProductId !== productId);
  };

  const handleExpandIntroText = () => {
    setIntroTextExpanded(true);
  };

  const handleCloseIntroText = () => {
    setIntroTextExpanded(false);
  };

  // Clean intro text content with proper characters
  const introLines = [
    "The future of AI isn't more apps.",
    "It's the emergence of a cognitive operating system - a new layer of intelligence",
    "that makes strategy, execution, and adaptation seamless across every domain.",
    "",
    "That's what NovaThink is building. Not tools, but the scaffolding for an entirely",
    "new relationship between human and synthetic intelligence.",
    "",
    "Our next phase is about scale:",
    "• Expanding the architectures that let AI sustain memory, logic, and autonomy over time.",
    "• Deploying stateful intelligence engines inside secure enterprise environments.",
    "• Evolving frameworks where AI doesn't just assist - it collaborates, learns, and builds alongside you.",
    "",
    "The horizon is clear: an era where cognition itself becomes deployable infrastructure.",
    "And NovaThink is already laying its foundation."
  ];

  return (
    <section
      ref={sectionRef}
      id="whats-next"
      className="whats-next-section"
    >
      {/* Earth Background Video */}
      <div className="earth-background">
        <video
          className="earth-video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src="/images/SectionWhatsNext/WhatsNext.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Background overlay for better contrast */}
      <div className="background-overlay" />

      {/* Orbital rings visualization */}
      <div className="orbital-rings">
        <div className="orbital-ring ring-1" />
        <div className="orbital-ring ring-2" />
        <div className="orbital-ring ring-3" />
      </div>

      {/* Section Header */}
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="section-title">What's Next at NovaThink</h2>
      </motion.div>

      {/* Typing Animation Intro Text */}
      <AnimatePresence>
        {showIntroText && (
          <motion.div
            className="intro-text-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
          >
            <div className="intro-text">
              {introLines.map((line, index) => (
                <motion.div
                  key={index}
                  className="intro-line"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    delay: index * 0.8,
                    duration: 0.1
                  }}
                >
                  {line.split('').map((char, charIndex) => (
                    <motion.span
                      key={charIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        delay: index * 0.8 + charIndex * 0.05,
                        duration: 0.1
                      }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Compact intro text expander */}
      <AnimatePresence>
        {!showIntroText && !introTextExpanded && (
          <motion.button
            className="intro-expander"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={handleExpandIntroText}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="expander-text">View Introduction</span>
            <span className="expander-icon">↓</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Expanded intro text overlay */}
      <AnimatePresence>
        {introTextExpanded && (
          <motion.div
            className="intro-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseIntroText}
          >
            <motion.div
              className="intro-expanded-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="close-intro" onClick={handleCloseIntroText}>
                ×
              </button>
              <div className="intro-text-full">
                {introLines.map((line, index) => (
                  <p key={index} className="intro-line-static">
                    {line}
                  </p>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Product Orbs */}
      <div className="orbital-constellation">
        {productsData.map((product, index) => (
          <ProductOrb
            key={product.id}
            ref={(el: HTMLDivElement | null) => {
              orbRefs.current[index] = el;
            }}
            product={product}
            position={orbitalPositions[index] || { x: 0, y: 0, ring: 0 }}
            isExpanded={expandedProductId === product.id}
            onClick={() => handleOrbClick(product.id)}
            index={index}
          />
        ))}
      </div>

      {/* Mouse Halo Effect */}
      <MouseHalo
        targetElements={orbRefs.current.filter(Boolean)}
        isActive={mouseHaloActive && !expandedProductId}
      />
    </section>
  );
};

export default WhatsNextSection;