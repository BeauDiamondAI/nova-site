import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProductOrb } from "./ProductOrb";
import { MouseHalo } from "./MouseHalo";
import { productsData } from "./productsData";
import "./WhatsNextSection.css";

const WhatsNextSection: React.FC = () => {
  const [expandedProductId, setExpandedProductId] = useState<string | null>(null);
  const [showIntroText, setShowIntroText] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);
  const [showIntroPreview, setShowIntroPreview] = useState(false);
  const [showOrbs, setShowOrbs] = useState(false);
  const [mouseHaloActive, setMouseHaloActive] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const orbRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Walker Delta orbital positioning calculation
  const calculateOrbitalPositions = () => {
    const centerX = typeof window !== 'undefined' ? window.innerWidth / 2 : 800;
    const centerY = typeof window !== 'undefined' ? window.innerHeight / 2 : 400;
    const totalOrbs = productsData.length;
    const positions: Array<{x: number, y: number, ring: number}> = [];

    // Create a wide arc across the screen width
    const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1600;
    const arcWidth = Math.min(screenWidth * 0.8, 1200); // 80% of screen width, max 1200px
    const arcHeight = 100; // Subtle upward curve
    
    for (let i = 0; i < totalOrbs; i++) {
      const progress = i / (totalOrbs - 1); // 0 to 1
      const x = centerX - arcWidth / 2 + progress * arcWidth;
      // Create upward arc using inverted parabolic curve
      const normalizedProgress = (progress - 0.5) * 2; // -1 to 1
      const y = centerY + arcHeight * (1 - normalizedProgress * normalizedProgress); // Changed to + for upward arc
      
      positions.push({
        x,
        y,
        ring: 0 // Single arc, no rings
      });
    }

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

    const currentSection = sectionRef.current;
    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, [showIntroText, introComplete]);

  // Handle intro text completion sequence
  useEffect(() => {
    if (showIntroText && !introComplete) {
      // Calculate total typing duration
      const totalLines = introLines.length;
      const typingDuration = totalLines * 1.5 * 1000 + 4000; // Updated timing calculation

      const timer = setTimeout(() => {
        setIntroComplete(true);
        // Don't hide intro text, just set it as complete
        // Show orbs after intro completes
        setTimeout(() => {
          setShowOrbs(true);
        }, 800);
      }, typingDuration);

      return () => clearTimeout(timer);
    }
  }, [showIntroText, introComplete]);

  const handleOrbClick = (productId: string) => {
    // Close currently expanded orb if clicking a different one
    if (expandedProductId && expandedProductId !== productId) {
      setExpandedProductId(null);
      // Brief delay before opening new orb to ensure complete retraction
      setTimeout(() => {
        setExpandedProductId(productId);
      }, 600);
    } else {
      setExpandedProductId(expandedProductId === productId ? null : productId);
    }
    setMouseHaloActive(!expandedProductId);
  };

  const handleExpandIntroText = () => {
    setShowIntroPreview(false);
    setShowIntroText(true);
    setIntroComplete(false); // Reset to show full text
  };

  const handleCollapseIntroText = () => {
    setShowIntroText(false);
    setTimeout(() => {
      setShowIntroPreview(true);
    }, 500);
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
        <h2 className="section-title text-4xl sm:text-5xl font-bold font-headline">{`What's Next at NovaThink`}</h2>
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
                    delay: index * 1.5, // Increased delay between lines
                    duration: 0.3
                  }}
                >
                  {line.split('').map((char, charIndex) => (
                    <motion.span
                      key={charIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        delay: index * 1.5 + charIndex * 0.02, // Slower character typing within each line
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
        {introComplete && showOrbs && showIntroPreview && (
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
        {showIntroText && introComplete && (
          <motion.div
            className="intro-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCollapseIntroText}
          >
            <motion.div
              className="intro-expanded-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="close-intro" onClick={handleCollapseIntroText}>
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