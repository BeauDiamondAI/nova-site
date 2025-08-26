import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProductOrb } from "./ProductOrb";
import { MouseHalo } from "./MouseHalo";
import { productsData } from "./productsData";
import "./WhatsNextSection.css";

const WhatsNextSection: React.FC = () => {
  const [expandedProductId, setExpandedProductId] = useState<string | null>(null);
  const [showIntroText, setShowIntroText] = useState(false);
  const [introTextExpanded, setIntroTextExpanded] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);
  const [showOrbs, setShowOrbs] = useState(false);
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

  // Intersection Observer to trigger intro text when section comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !showIntroText && !introComplete) {
          setShowIntroText(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [showIntroText, introComplete]);

  // Handle intro text completion sequence
  useEffect(() => {
    if (showIntroText && !introComplete) {
      // Calculate total typing duration
      const totalLines = introLines.length;
      const typingDuration = totalLines * 0.8 * 1000 + 3000; // Lines * delay + buffer

      const timer = setTimeout(() => {
        setIntroComplete(true);
        setShowIntroText(false);
        
        // Show orbs after intro text retracts
        setTimeout(() => {
          setShowOrbs(true);
        }, 800); // Delay for text retraction animation
      }, typingDuration);

      return () => clearTimeout(timer);
    }
  }, [showIntroText, introComplete]);

  const handleOrbClick = (productId: string) => {
    // Close currently expanded orb if clicking a different one
    if (expandedProductId && expandedProductId !== productId) {
      setExpandedProductId(null);
      // Brief delay before opening new orb
      setTimeout(() => {
        setExpandedProductId(productId);
      }, 300);
    } else {
      setExpandedProductId(expandedProductId === productId ? null : productId);
    }
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
          <source src="/images/SectionWhatsNextMedia/WhatsNext.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Background overlay for better contrast */}
      <div className="background-overlay" />

      {/* Orbital rings visualization - only show when orbs are visible */}
      <AnimatePresence>
        {showOrbs && (
          <motion.div
            className="orbital-rings"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="orbital-ring ring-1" />
            <div className="orbital-ring ring-2" />
            <div className="orbital-ring ring-3" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Section Header */}
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="section-title">{`What's Next at NovaThink`}</h2>
      </motion.div>

      {/* Typing Animation Intro Text - Only show during typing phase */}
      <AnimatePresence>
        {showIntroText && !introComplete && (
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

      {/* Compact intro text expander - Show after intro is complete and orbs are visible */}
      <AnimatePresence>
        {introComplete && showOrbs && !introTextExpanded && (
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

      {/* Product Orbs - Only show after intro is complete */}
      <AnimatePresence>
        {showOrbs && (
          <motion.div
            className="orbital-constellation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
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
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mouse Halo Effect - Only active when orbs are visible */}
      {showOrbs && (
        <MouseHalo
          targetElements={orbRefs.current.filter(Boolean)}
          isActive={mouseHaloActive && !expandedProductId}
        />
      )}
    </section>
  );
};

export default WhatsNextSection;