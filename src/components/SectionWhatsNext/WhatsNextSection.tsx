import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProductOrb } from "./ProductOrb";
import { productsData } from "./productsData";

const WhatsNextSection: React.FC = () => {
  const [expandedProductId, setExpandedProductId] = useState<string | null>(null);
  const [showContent, setShowContent] = useState(false);
  const [textVisible, setTextVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Simple intersection observer to trigger content
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !showContent) {
          setShowContent(true);
          // Simple delay before showing text and orbs
          setTimeout(() => setTextVisible(true), 800);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [showContent]);

  // Upward V-shaped arc - curves up and out from center
  const getOrbPosition = (index: number) => {
    const totalOrbs = productsData.length;
    const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const screenHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
    
    const centerX = screenWidth / 2;
    const centerY = screenHeight / 2;
    
    // Create a V-shape that curves upward from center
    const arcWidth = Math.min(screenWidth * 0.8, 1300);
    const arcHeight = 100; // How much the ends lift up
    const baseY = centerY + 160; // Moved down by about one orb length (80px more)
    
    const progress = index / (totalOrbs - 1); // 0 to 1
    const x = centerX - arcWidth / 2 + progress * arcWidth;
    
    // V-shape: distance from center determines height
    const distanceFromCenter = Math.abs(progress - 0.5) * 2; // 0 at center, 1 at edges
    const y = baseY - arcHeight * distanceFromCenter;
    
    return { x, y };
  };

  const handleOrbClick = (productId: string) => {
    setExpandedProductId(expandedProductId === productId ? null : productId);
  };

  const toggleTextExpansion = () => {
    // Removed - not needed
  };

  const renderText = () => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={textVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <p style={{
          fontSize: 'clamp(1rem, 2vw, 1.2rem)',
          color: 'rgba(255, 255, 255, 0.85)',
          lineHeight: 1.6,
          margin: '0 0 1rem 0',
          fontWeight: 400
        }}>
          The future of AI isn&apos;t more apps. It&apos;s the emergence of a cognitive operating system - a new layer of intelligence that makes strategy, execution, and adaptation seamless across every domain.
        </p>
        <p style={{
          fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)',
          color: 'rgba(255, 255, 255, 0.75)',
          lineHeight: 1.6,
          margin: 0,
          fontWeight: 400
        }}>
          That&apos;s what NovaThink is building. Not tools, but the scaffolding for an entirely new relationship between human and synthetic intelligence.
        </p>
      </motion.div>
    );
  };

  return (
    <section
      ref={sectionRef}
      className="whats-next-section"
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        isolation: 'isolate',
        zIndex: 1
      }}
    >
      
      {/* Earth Background Video */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1
      }}>
        <video
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            minWidth: '100%',
            minHeight: '100%',
            transform: 'translate(-50%, -50%)',
            objectFit: 'cover',
            willChange: 'auto'
          }}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src="/images/SectionWhatsNextMedia/WhatsNext.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Background overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.4) 0%, rgba(15, 23, 42, 0.6) 50%, rgba(0, 0, 0, 0.5) 100%)',
        zIndex: 2
      }} />

      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={showContent ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        style={{
          position: 'absolute',
          top: '60px',
          left: 0,
          right: 0,
          zIndex: 10,
          textAlign: 'center',
          width: '100%'
        }}
      >
        <h2 className="text-4xl sm:text-5xl font-bold font-headline mb-5" style={{
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          fontWeight: 800,
          color: '#ffffff',
          margin: '0 0 1.5rem 0',
          background: 'linear-gradient(135deg, #ffffff 0%, rgba(6, 182, 212, 0.9) 50%, #ffffff 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '0 0 30px rgba(6, 182, 212, 0.3)',
          letterSpacing: '-0.02em'
        }}>
          What&apos;s Next at NovaThink
        </h2>
        
        {/* Streaming intro text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={showContent ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: '0 2rem'
          }}
        >
          {renderText()}
        </motion.div>
      </motion.div>

      {/* Product Orbs - Show after text appears */}
      <AnimatePresence>
        {showContent && textVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              zIndex: 10
            }}
          >
            {productsData.map((product, index) => {
              const position = getOrbPosition(index);
              return (
                <ProductOrb
                  key={product.id}
                  product={product}
                  position={position}
                  isExpanded={expandedProductId === product.id}
                  hasExpandedCard={expandedProductId !== null}
                  onClick={() => handleOrbClick(product.id)}
                  index={index}
                />
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default WhatsNextSection;