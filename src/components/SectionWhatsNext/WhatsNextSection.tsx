import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProductOrb } from "./ProductOrb";
import { productsData } from "./productsData";

const WhatsNextSection: React.FC = () => {
  const [expandedProductId, setExpandedProductId] = useState<string | null>(null);
  const [showContent, setShowContent] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Simple intersection observer to trigger content
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !showContent) {
          setShowContent(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [showContent]);

  // Clean orbital positioning - simple horizontal arc
  const getOrbPosition = (index: number) => {
    const totalOrbs = productsData.length;
    const containerWidth = typeof window !== 'undefined' ? Math.min(window.innerWidth * 0.9, 1200) : 1200;
    const startX = (typeof window !== 'undefined' ? window.innerWidth : 1200) / 2 - containerWidth / 2;
    
    const spacing = containerWidth / (totalOrbs - 1);
    const x = startX + (index * spacing);
    const y = 480; // Fixed Y position - no complex curves

    return { x, y };
  };

  const handleOrbClick = (productId: string) => {
    setExpandedProductId(expandedProductId === productId ? null : productId);
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
        isolation: 'isolate', // Prevent layout bleeding
        zIndex: 1 // Lower than previous sections
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
          top: '80px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          textAlign: 'center'
        }}
      >
        <h2 style={{
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          fontWeight: 800,
          color: '#ffffff',
          margin: 0,
          background: 'linear-gradient(135deg, #ffffff 0%, rgba(6, 182, 212, 0.9) 50%, #ffffff 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '0 0 30px rgba(6, 182, 212, 0.3)',
          letterSpacing: '-0.02em'
        }}>
          What&apos;s Next at NovaThink
        </h2>
      </motion.div>

      {/* Product Orbs - Simple, clean positioning */}
      <AnimatePresence>
        {showContent && (
          <div style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            zIndex: 10
          }}>
            {productsData.map((product, index) => {
              const position = getOrbPosition(index);
              return (
                <ProductOrb
                  key={product.id}
                  product={product}
                  position={position}
                  isExpanded={expandedProductId === product.id}
                  onClick={() => handleOrbClick(product.id)}
                  index={index}
                />
              );
            })}
          </div>
        )}
      </AnimatePresence>

      {/* Background blur when card is expanded */}
      <AnimatePresence>
        {expandedProductId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.6)',
              backdropFilter: 'blur(8px)',
              zIndex: 40
            }}
            onClick={() => setExpandedProductId(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default WhatsNextSection;